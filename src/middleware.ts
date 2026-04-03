import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de sécurité :
 * - Protège /admin et /api/commandes (GET) par ADMIN_SECRET
 * - Protège /admin-it et /api/admin-it par IT_ADMIN_SECRET
 * - Ajoute les headers de sécurité sur toutes les réponses
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Security headers (toutes les réponses) ─────────────────────────────────
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // ── Helper: vérifier un token ──────────────────────────────────────────────
  function isAuthorized(secret: string | undefined, cookieKey: string): boolean {
    if (!secret) return true; // Dev sans secret → laisse passer avec warning
    const sessionToken = request.cookies.get(cookieKey)?.value;
    const authHeader   = request.headers.get("Authorization");
    const bearerToken  = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    return sessionToken === secret || bearerToken === secret;
  }

  // ── Route Boucher Admin (/admin) ───────────────────────────────────────────
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin-it");
  const isAdminAPI  = (pathname === "/api/commandes" && request.method === "GET") ||
                      (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/login");

  if (isAdminPage || isAdminAPI) {
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      console.warn("[SECURITY] ADMIN_SECRET non configuré — /admin non protégé !");
      return response;
    }
    if (!isAuthorized(adminSecret, "admin_session")) {
      if (isAdminPage) return NextResponse.redirect(new URL("/connexion?redirect=admin", request.url));
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  // ── Route IT Admin (/admin-it) ─────────────────────────────────────────────
  const isITAdminPage = pathname.startsWith("/admin-it");
  const isITAdminAPI  = pathname.startsWith("/api/admin-it");

  if (isITAdminPage || isITAdminAPI) {
    const itSecret = process.env.IT_ADMIN_SECRET;
    if (!itSecret) {
      console.warn("[SECURITY] IT_ADMIN_SECRET non configuré — /admin-it non protégé !");
      return response;
    }
    if (!isAuthorized(itSecret, "it_admin_session")) {
      if (isITAdminPage) return NextResponse.redirect(new URL("/connexion?redirect=it", request.url));
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
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
    "/api/admin-it/:path*",
    "/((?!_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
