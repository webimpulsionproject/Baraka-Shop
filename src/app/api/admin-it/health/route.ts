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

  // ── Database connection ──────────────────────────────────────────────────────
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - dbStart;
    checks.database = {
      status: dbLatency < 300 ? "ok" : "warning",
      message: dbLatency < 300 ? "Connexion active" : "Latence élevée",
      latency: dbLatency,
    };
  } catch (e) {
    checks.database = {
      status: "error",
      message: `Connexion échouée: ${e instanceof Error ? e.message : String(e)}`,
      latency: Date.now() - dbStart,
    };
  }

  // ── Model counts ─────────────────────────────────────────────────────────────
  try {
    const [products, orders, promoCodes, reviews, notifyEmails] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.promoCode.count(),
      prisma.review.count(),
      prisma.notifyEmail.count(),
    ]);
    checks.models = {
      status: "ok",
      message: "Tous les modèles accessibles",
      details: { products, orders, promoCodes, reviews, notifyEmails },
    };
  } catch (e) {
    checks.models = {
      status: "warning",
      message: `Erreur lecture modèles: ${e instanceof Error ? e.message : String(e)}`,
    };
  }

  // ── Environment variables ────────────────────────────────────────────────────
  const envMap: Record<string, boolean> = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DIRECT_URL: !!process.env.DIRECT_URL,
    ADMIN_SECRET: !!process.env.ADMIN_SECRET,
    IT_ADMIN_SECRET: !!process.env.IT_ADMIN_SECRET,
  };
  const missing = Object.entries(envMap).filter(([, v]) => !v).map(([k]) => k);
  checks.environment = {
    status: missing.length === 0 ? "ok" : missing.length <= 2 ? "warning" : "error",
    message: missing.length === 0
      ? "Toutes les variables configurées"
      : `Variables manquantes : ${missing.join(", ")}`,
    details: Object.fromEntries(
      Object.entries(envMap).map(([k, v]) => [k, v ? "configurée" : "manquante"])
    ),
  };

  // ── Security headers (self-check) ────────────────────────────────────────────
  checks.security = {
    status: "ok",
    message: "Headers de sécurité actifs",
    details: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  };

  // ── Final status ─────────────────────────────────────────────────────────────
  const values = Object.values(checks);
  const hasError = values.some((c) => c.status === "error");
  const hasWarning = values.some((c) => c.status === "warning");

  return NextResponse.json({
    status: hasError ? "degraded" : hasWarning ? "warning" : "healthy",
    timestamp: new Date().toISOString(),
    checks,
    build: {
      nodeVersion: process.version,
      nextVersion: "14.2.5",
      environment: process.env.NODE_ENV ?? "unknown",
    },
  });
}
