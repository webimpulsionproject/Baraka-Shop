import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// ── Content Security Policy ──────────────────────────────────────────────────
// Next.js App Router requiert 'unsafe-inline' et 'unsafe-eval' pour son runtime.
// La protection principale vient de frame-ancestors, form-action et object-src.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://source.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// ── Configuration rate limiting ─────────────────────────────────────────────
// [limit, windowMs]
const RATE_LIMITS: Record<string, [number, number]> = {
  "/api/gestion/login":         [5,  15 * 60 * 1000], // 5 tentatives / 15 min (brute force)
  "/api/contact":               [5,  60 * 60 * 1000], // 5 messages / heure (spam)
  "/api/avis":                  [5,  60 * 60 * 1000], // 5 avis / heure
  "/api/promo-codes/verifier":  [10,      60 * 1000], // 10 vérifications / minute (énumération)
};

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // ── Rate limiting sur les endpoints sensibles (POST uniquement) ──────────
  if (method === "POST" && pathname in RATE_LIMITS) {
    const [limit, windowMs] = RATE_LIMITS[pathname];
    const ip = getClientIp(request);
    const key = `${pathname}:${ip}`;
    const { allowed, remaining, resetAt } = rateLimit(key, limit, windowMs);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: "Trop de requêtes. Réessayez plus tard." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // Passer les headers de rate limit à la réponse
    const response = NextResponse.next();
    applySecurityHeaders(response, pathname);
    response.headers.set("X-RateLimit-Limit", String(limit));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    // Continuer le traitement auth ci-dessous
    return checkAuthAndReturn(request, pathname, response);
  }

  // ── Headers de sécurité (toutes les réponses) ────────────────────────────
  const response = NextResponse.next();
  applySecurityHeaders(response, pathname);

  return checkAuthAndReturn(request, pathname, response);
}

function applySecurityHeaders(response: NextResponse, pathname: string) {
  // Défenses de base
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // HSTS (HTTPS obligatoire — ANSSI recommande min 6 mois)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=15552000; includeSubDomains"
  );

  // CSP (remplace aussi X-Frame-Options via frame-ancestors)
  response.headers.set("Content-Security-Policy", CSP);

  // Pas de cache sur les pages d'admin
  if (pathname.startsWith("/gestion") || pathname.startsWith("/api/gestion")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  }
}

function checkAuthAndReturn(
  request: NextRequest,
  pathname: string,
  response: NextResponse
): NextResponse {
  // ── Helper: vérifier un token ────────────────────────────────────────────
  function isAuthorized(secret: string | undefined, cookieKey: string): boolean {
    if (!secret) return true; // Dev sans secret → laisse passer avec warning
    const sessionToken = request.cookies.get(cookieKey)?.value;
    const authHeader   = request.headers.get("Authorization");
    const bearerToken  = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    return sessionToken === secret || bearerToken === secret;
  }

  // ── Protection APIs gestion ──────────────────────────────────────────────
  const isGestionAPI =
    (pathname === "/api/commandes" && request.method === "GET") ||
    (pathname.startsWith("/api/gestion/") && pathname !== "/api/gestion/login") ||
    (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login");

  if (isGestionAPI) {
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      console.warn("[SECURITY] ADMIN_SECRET non configuré — APIs gestion non protégées !");
      return response;
    }
    if (!isAuthorized(adminSecret, "admin_session")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  // ── Protection IT Admin ──────────────────────────────────────────────────
  const isITAdminPage = pathname.startsWith("/admin-it");
  const isITAdminAPI  = pathname.startsWith("/api/admin-it") && pathname !== "/api/admin-it/login";

  if (isITAdminPage || isITAdminAPI) {
    const itSecret = process.env.IT_ADMIN_SECRET;
    if (!itSecret) {
      console.warn("[SECURITY] IT_ADMIN_SECRET non configuré — /admin-it non protégé !");
      return response;
    }
    if (!isAuthorized(itSecret, "it_admin_session")) {
      // La page gère son propre écran de login (comme /gestion)
      if (isITAdminAPI) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      // Pour la page, laisser passer — le composant React gère l'état non-authentifié
      return response;
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin-it/:path*",
    "/api/commandes",
    "/api/admin/:path*",
    "/api/gestion/:path*",
    "/api/admin-it/:path*",
    "/api/contact",
    "/api/avis",
    "/api/promo-codes/verifier",
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|logo.jpg).*)",
  ],
};
