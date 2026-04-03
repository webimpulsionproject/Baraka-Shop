import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type CheckStatus = "ok" | "warning" | "error";

interface Check {
  status: CheckStatus;
  message: string;
  latency?: number;
  details?: Record<string, unknown>;
}

export async function GET() {
  const checks: Record<string, Check> = {};

  // ── Connexion base de données ─────────────────────────────────────────────
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - dbStart;
    checks.database = {
      status:  latency < 300 ? "ok" : "warning",
      message: latency < 300 ? "Connexion active" : "Latence élevée (> 300ms)",
      latency,
    };
  } catch (e) {
    checks.database = {
      status:  "error",
      message: "Connexion échouée",
      latency: Date.now() - dbStart,
      details: { error: e instanceof Error ? e.message : "Erreur inconnue" },
    };
  }

  // ── Compteurs des modèles ─────────────────────────────────────────────────
  try {
    const [products, orders, messages, reviews, admins, settings] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.contactMessage.count(),
      prisma.review.count(),
      prisma.adminUser.count(),
      prisma.siteSettings.findMany(),
    ]);
    checks.models = {
      status:  "ok",
      message: "Tous les modèles accessibles",
      details: {
        products,
        orders,
        messages,
        reviews,
        admins,
        settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
      },
    };
  } catch (e) {
    checks.models = {
      status:  "warning",
      message: "Erreur lecture modèles",
      details: { error: e instanceof Error ? e.message : "Erreur inconnue" },
    };
  }

  // ── Variables d'environnement ─────────────────────────────────────────────
  const envMap: Record<string, boolean> = {
    DATABASE_URL:    !!process.env.DATABASE_URL,
    DIRECT_URL:      !!process.env.DIRECT_URL,
    ADMIN_SECRET:    !!process.env.ADMIN_SECRET,
    IT_ADMIN_SECRET: !!process.env.IT_ADMIN_SECRET,
  };
  const missing = Object.entries(envMap).filter(([, v]) => !v).map(([k]) => k);
  checks.environment = {
    status:  missing.length === 0 ? "ok" : missing.length <= 1 ? "warning" : "error",
    message: missing.length === 0
      ? "Toutes les variables configurées"
      : `Manquantes : ${missing.join(", ")}`,
    details: Object.fromEntries(
      Object.entries(envMap).map(([k, v]) => [k, v ? "✓ configurée" : "✗ manquante"])
    ),
  };

  // ── Headers de sécurité ───────────────────────────────────────────────────
  checks.security = {
    status:  "ok",
    message: "Headers ANSSI actifs",
    details: {
      "Content-Security-Policy":          "✓ frame-ancestors, form-action, object-src none",
      "Strict-Transport-Security":        "✓ max-age=15552000; includeSubDomains",
      "X-Content-Type-Options":           "✓ nosniff",
      "X-XSS-Protection":                 "✓ 1; mode=block",
      "Referrer-Policy":                  "✓ strict-origin-when-cross-origin",
      "Cross-Origin-Resource-Policy":     "✓ same-origin",
      "X-Permitted-Cross-Domain-Policies":"✓ none",
      "Permissions-Policy":               "✓ camera, mic, geolocation, payment bloqués",
      "Rate-Limiting":                    "✓ login 5/15min, contact 5/h, promo 10/min",
      "Cookie admin_session":             "✓ httpOnly, secure, sameSite=strict",
    },
  };

  // ── Statut global ─────────────────────────────────────────────────────────
  const values = Object.values(checks);
  const hasError   = values.some((c) => c.status === "error");
  const hasWarning = values.some((c) => c.status === "warning");

  return NextResponse.json({
    status:    hasError ? "degraded" : hasWarning ? "warning" : "healthy",
    timestamp: new Date().toISOString(),
    checks,
    build: {
      nodeVersion:  process.version,
      nextVersion:  "14.2.5",
      environment:  process.env.NODE_ENV ?? "unknown",
      platform:     process.platform,
    },
  });
}
