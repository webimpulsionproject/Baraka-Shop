import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de sécurité :
 * - Protège /admin et /api/commandes (GET) par token admin
 * - Ajoute les headers de sécurité sur toutes les réponses
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // En-têtes de sécurité sur toutes les réponses
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Protection de la route admin (page et API)
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAPI = pathname === "/api/commandes" && request.method === "GET";

  if (isAdminPage || isAdminAPI) {
    const adminSecret = process.env.ADMIN_SECRET;

    // En dev sans secret configuré, on laisse passer avec un warning
    if (!adminSecret) {
      console.warn("[SECURITY] ADMIN_SECRET non configuré — route admin non protégée !");
      return response;
    }

    // Vérification par cookie de session ou header Authorization
    const sessionToken = request.cookies.get("admin_session")?.value;
    const authHeader = request.headers.get("Authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (sessionToken !== adminSecret && bearerToken !== adminSecret) {
      if (isAdminPage) {
        return NextResponse.redirect(new URL("/connexion?redirect=admin", request.url));
      }
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/commandes",
    "/((?!_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
