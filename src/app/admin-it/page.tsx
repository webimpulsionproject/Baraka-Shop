"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

// ── Types ────────────────────────────────────────────────────────────────────

type CheckStatus = "ok" | "warning" | "error";
type GlobalStatus = "healthy" | "warning" | "degraded" | "loading";
type Tab = "overview" | "performance" | "database" | "security" | "api" | "config";

interface Check {
  status: CheckStatus;
  message: string;
  latency?: number;
  details?: Record<string, unknown>;
}

interface HealthData {
  status: GlobalStatus;
  timestamp: string;
  checks: Record<string, Check>;
  build: { nodeVersion: string; nextVersion: string; environment: string };
}

// ── Constants ────────────────────────────────────────────────────────────────

const IT_EMAIL = "it@barakashop.fr";
const IT_PASSWORD = "IT2026!";

const NAV: { id: Tab; label: string; Icon: React.ComponentType }[] = [
  { id: "overview",    label: "Vue d'ensemble", Icon: IconGrid   },
  { id: "performance", label: "Performance",    Icon: IconBolt   },
  { id: "database",    label: "Base de données",Icon: IconDB     },
  { id: "security",    label: "Sécurité",       Icon: IconShield },
  { id: "api",         label: "API & Routes",   Icon: IconApi    },
  { id: "config",      label: "Configuration",  Icon: IconCog    },
];

const API_ROUTES = [
  { path: "/api/produits",           method: "GET",  auth: false, description: "Liste des produits" },
  { path: "/api/commandes",          method: "GET",  auth: true,  description: "Liste des commandes (admin)" },
  { path: "/api/commandes",          method: "POST", auth: false, description: "Créer une commande" },
  { path: "/api/promo-codes",        method: "GET",  auth: false, description: "Codes promo actifs" },
  { path: "/api/promo-codes",        method: "POST", auth: false, description: "Créer un code promo" },
  { path: "/api/promo-codes/verifier", method: "POST", auth: false, description: "Vérifier un code" },
  { path: "/api/avis",               method: "GET",  auth: false, description: "Avis clients" },
  { path: "/api/avis",               method: "POST", auth: false, description: "Soumettre un avis" },
  { path: "/api/admin-it/health",    method: "GET",  auth: true,  description: "Health check IT" },
];

const SECURITY_HEADERS = [
  { name: "X-Content-Type-Options",  value: "nosniff",                        ok: true },
  { name: "X-Frame-Options",         value: "DENY",                           ok: true },
  { name: "X-XSS-Protection",        value: "1; mode=block",                  ok: true },
  { name: "Referrer-Policy",         value: "strict-origin-when-cross-origin",ok: true },
  { name: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()", ok: true },
  { name: "Content-Security-Policy", value: "Non configuré",                  ok: false },
  { name: "Strict-Transport-Security", value: "Via Vercel (HTTPS)",           ok: true },
];

const PERF_TARGETS = [
  { metric: "LCP (Largest Contentful Paint)", target: "< 2.5s",  ideal: "< 1.2s",  status: "warning" as CheckStatus },
  { metric: "INP (Interaction to Next Paint)", target: "< 200ms", ideal: "< 100ms", status: "ok"      as CheckStatus },
  { metric: "CLS (Cumulative Layout Shift)",   target: "< 0.1",   ideal: "< 0.05",  status: "ok"      as CheckStatus },
  { metric: "TTFB (Time to First Byte)",       target: "< 800ms", ideal: "< 200ms", status: "ok"      as CheckStatus },
  { metric: "FCP (First Contentful Paint)",    target: "< 1.8s",  ideal: "< 0.9s",  status: "ok"      as CheckStatus },
  { metric: "TBT (Total Blocking Time)",       target: "< 200ms", ideal: "< 50ms",  status: "warning" as CheckStatus },
];

const OPTIM_TIPS = [
  { priority: "haute",   title: "Content Security Policy", desc: "Ajouter un header CSP pour prévenir les injections XSS avancées." },
  { priority: "haute",   title: "Images Next/Image",       desc: "Vérifier que toutes les images utilisent <Image> pour l'optimisation automatique." },
  { priority: "moyenne", title: "Promo codes API auth",    desc: "Protéger POST /api/promo-codes avec l'authentification admin." },
  { priority: "moyenne", title: "Session serveur",         desc: "Migrer de localStorage vers des sessions HTTP-only cookies (NextAuth)." },
  { priority: "basse",   title: "API Rate Limiting",       desc: "Ajouter un rate limit sur les routes publiques pour prévenir les abus." },
];

// ── Icons (inline SVG) ────────────────────────────────────────────────────────

function IconGrid() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconDB() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3M4 7v5c0 1.657 3.582 3 8 3s8-1.343 8-3V7M4 12v5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconApi() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function IconCog() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconRefresh({ spinning }: { spinning?: boolean }) {
  return (
    <svg className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

// ── Status helpers ────────────────────────────────────────────────────────────

function statusColor(s: CheckStatus | GlobalStatus) {
  if (s === "ok" || s === "healthy") return "text-emerald-600";
  if (s === "warning")               return "text-amber-500";
  return                                    "text-red-500";
}
function statusBg(s: CheckStatus | GlobalStatus) {
  if (s === "ok" || s === "healthy") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "warning")               return "bg-amber-50 text-amber-700 border-amber-200";
  return                                    "bg-red-50 text-red-700 border-red-200";
}
function statusDot(s: CheckStatus | GlobalStatus) {
  if (s === "ok" || s === "healthy") return "bg-emerald-500";
  if (s === "warning")               return "bg-amber-400";
  return                                    "bg-red-500";
}
function statusLabel(s: CheckStatus | GlobalStatus) {
  if (s === "ok" || s === "healthy") return "OK";
  if (s === "warning")               return "Attention";
  if (s === "loading")               return "Chargement…";
  return "Erreur";
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail]     = useState("");
  const [pw, setPw]           = useState("");
  const [error, setError]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === IT_EMAIL && pw === IT_PASSWORD) {
        localStorage.setItem("baraka-it", "true");
        onLogin();
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0h-1v40h1zM0 0v1h40V0zm0 40v-1h40v1z'/%3E%3C/g%3E%3C/svg%3E\")",
      }} />

      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-600/30">
            <IconShield />
          </div>
          <div className="flex justify-center mb-1">
            <Logo size={28} />
          </div>
          <h1 className="text-xl font-bold text-white mt-2">Administration IT</h1>
          <p className="text-slate-400 text-sm mt-1">Accès restreint — personnel autorisé</p>
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mt-3 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            IT Admin
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5 text-center">
            Identifiants incorrects.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="it@barakashop.fr"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(false); }}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm mt-1"
          >
            {loading ? "Authentification…" : "Accéder au panneau IT"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          <Link href="/" className="hover:text-slate-400 transition-colors">
            Retour au site public →
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminITPage() {
  const [authed, setAuthed]       = useState(false);
  const [checked, setChecked]     = useState(false);
  const [tab, setTab]             = useState<Tab>("overview");
  const [health, setHealth]       = useState<HealthData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    if (localStorage.getItem("baraka-it") === "true") setAuthed(true);
    setChecked(true);
  }, []);

  const fetchHealth = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin-it/health");
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
        setLastRefresh(new Date());
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchHealth();
  }, [authed, fetchHealth]);

  if (!checked) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const handleLogout = () => {
    localStorage.removeItem("baraka-it");
    setAuthed(false);
  };

  const globalStatus: GlobalStatus = health ? health.status : "loading";

  // ── Sidebar ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <div>
              <div className="text-white text-sm font-bold leading-tight">Baraka Shop</div>
              <div className="text-blue-400 text-[10px] font-semibold tracking-widest uppercase">IT Admin</div>
            </div>
          </div>
        </div>

        {/* Status pill */}
        <div className="px-5 py-3 border-b border-slate-800">
          <div className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${
            globalStatus === "healthy" ? "bg-emerald-500/10 text-emerald-400" :
            globalStatus === "warning" ? "bg-amber-500/10 text-amber-400" :
            globalStatus === "loading" ? "bg-slate-700 text-slate-400" :
                                          "bg-red-500/10 text-red-400"
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              globalStatus === "healthy" ? "bg-emerald-500 animate-pulse" :
              globalStatus === "warning" ? "bg-amber-400 animate-pulse" :
              globalStatus === "loading" ? "bg-slate-500" : "bg-red-500 animate-pulse"
            }`} />
            {globalStatus === "healthy" ? "Système opérationnel" :
             globalStatus === "warning" ? "Avertissements actifs" :
             globalStatus === "loading" ? "Vérification…" : "Incident détecté"}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                tab === id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800">
          <div className="text-xs text-slate-500 mb-3">
            <div className="font-medium text-slate-400">{IT_EMAIL}</div>
            <div className="mt-0.5">Connecté en tant qu&apos;IT Admin</div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="flex-1 text-center text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all"
            >
              Admin boucher
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 text-center text-xs text-red-400 hover:text-white hover:bg-red-600/20 px-3 py-2 rounded-lg transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              {NAV.find((n) => n.id === tab)?.label}
            </h1>
            {lastRefresh && (
              <p className="text-xs text-slate-400 mt-0.5">
                Dernière actualisation : {lastRefresh.toLocaleTimeString("fr-FR")}
              </p>
            )}
          </div>
          <button
            onClick={fetchHealth}
            disabled={refreshing}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            <IconRefresh spinning={refreshing} />
            Actualiser
          </button>
        </header>

        <div className="p-8">
          {/* ── TAB: Overview ─────────────────────────────────────────────── */}
          {tab === "overview" && (
            <div className="space-y-6 animate-slide-up">
              {/* Status cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Base de données", key: "database" },
                  { label: "Modèles",          key: "models" },
                  { label: "Environnement",    key: "environment" },
                  { label: "Sécurité",         key: "security" },
                ].map(({ label, key }) => {
                  const check = health?.checks[key];
                  const s = check?.status ?? "loading";
                  return (
                    <div key={key} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${s === "loading" ? "bg-slate-300" : statusDot(s as CheckStatus)}`} />
                      </div>
                      <div className={`text-sm font-bold ${s === "loading" ? "text-slate-400" : statusColor(s as CheckStatus)}`}>
                        {s === "loading" ? "Chargement…" : statusLabel(s as CheckStatus)}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 truncate">{check?.message ?? "—"}</div>
                      {check?.latency !== undefined && (
                        <div className="text-xs text-slate-300 mt-0.5">{check.latency} ms</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Global status banner */}
              {health && (
                <div className={`border rounded-xl px-6 py-4 flex items-center gap-4 ${statusBg(health.status)}`}>
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${statusDot(health.status)}`} />
                  <div>
                    <div className="font-semibold text-sm">
                      {health.status === "healthy" && "Tous les systèmes sont opérationnels"}
                      {health.status === "warning" && "Des avertissements nécessitent votre attention"}
                      {health.status === "degraded" && "Des incidents sont en cours — vérifiez les détails"}
                    </div>
                    <div className="text-xs mt-0.5 opacity-70">
                      Vérifié le {new Date(health.timestamp).toLocaleString("fr-FR")}
                    </div>
                  </div>
                </div>
              )}

              {/* Checks detail */}
              {health && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-900 text-sm">Détail des vérifications</h2>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {Object.entries(health.checks).map(([key, check]) => (
                      <div key={key} className="px-6 py-4 flex items-start gap-4">
                        <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${statusDot(check.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-900 capitalize">{key.replace("_", " ")}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusBg(check.status)}`}>
                              {statusLabel(check.status)}
                            </span>
                            {check.latency !== undefined && (
                              <span className="text-xs text-slate-400">{check.latency} ms</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Optimisation actions */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Actions recommandées</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {OPTIM_TIPS.slice(0, 3).map((tip, i) => (
                    <div key={i} className="px-6 py-4 flex items-start gap-4">
                      <span className={`mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                        tip.priority === "haute"   ? "bg-red-50 text-red-600" :
                        tip.priority === "moyenne" ? "bg-amber-50 text-amber-600" :
                                                     "bg-slate-100 text-slate-500"
                      }`}>
                        {tip.priority}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{tip.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{tip.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Performance ──────────────────────────────────────────── */}
          {tab === "performance" && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Core Web Vitals — Objectifs</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Seuils Google pour le classement SEO et l&apos;expérience utilisateur</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {PERF_TARGETS.map((t) => (
                    <div key={t.metric} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{t.metric}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Idéal : {t.ideal}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-slate-600">{t.target}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBg(t.status)}`}>
                          {statusLabel(t.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Recommandations performance</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {OPTIM_TIPS.map((tip, i) => (
                    <div key={i} className="px-6 py-4 flex items-start gap-4">
                      <span className={`mt-0.5 flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                        tip.priority === "haute"   ? "bg-red-50 text-red-600 border border-red-100" :
                        tip.priority === "moyenne" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                                     "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}>
                        {tip.priority}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{tip.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{tip.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Next.js App Router", desc: "Rendu hybride SSR/SSG", ok: true },
                  { label: "Tailwind CSS purge", desc: "CSS allégé en production", ok: true },
                  { label: "Prisma connection pool", desc: "À activer avec PgBouncer Neon", ok: false },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-2 h-2 rounded-full ${item.ok ? "bg-emerald-500" : "bg-amber-400"}`} />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        {item.ok ? "Actif" : "À configurer"}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Database ─────────────────────────────────────────────── */}
          {tab === "database" && (
            <div className="space-y-6 animate-slide-up">
              {/* Connection status */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Statut connexion</div>
                  <div className={`text-lg font-bold ${health?.checks.database ? statusColor(health.checks.database.status) : "text-slate-400"}`}>
                    {health?.checks.database ? statusLabel(health.checks.database.status) : "—"}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{health?.checks.database?.message ?? "Chargement…"}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Latence</div>
                  <div className="text-lg font-bold text-slate-900">
                    {health?.checks.database?.latency !== undefined ? `${health.checks.database.latency} ms` : "—"}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {health?.checks.database?.latency !== undefined
                      ? health.checks.database.latency < 100 ? "Excellent" :
                        health.checks.database.latency < 300 ? "Bon"       : "Lent"
                      : "—"}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Provider</div>
                  <div className="text-lg font-bold text-slate-900">Neon</div>
                  <div className="text-xs text-slate-400 mt-1">PostgreSQL serverless</div>
                </div>
              </div>

              {/* Model counts */}
              {health?.checks.models?.details && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-900 text-sm">Contenu de la base de données</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-100">
                    {Object.entries(health.checks.models.details).map(([model, count]) => (
                      <div key={model} className="bg-white px-6 py-5">
                        <div className="text-2xl font-bold text-slate-900">{String(count)}</div>
                        <div className="text-xs text-slate-400 mt-1 capitalize">{model}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schema info */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Schéma Prisma — Modèles</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { model: "Product",     fields: ["id", "name", "slug", "category", "price", "promoPrice", "inStock", "stock"], relations: ["OrderItem[]"] },
                    { model: "Order",       fields: ["id", "reference", "clientName", "email", "total", "status", "mode"],          relations: ["OrderItem[]"] },
                    { model: "OrderItem",   fields: ["id", "orderId", "productId", "name", "price", "qty"],                        relations: ["Order", "Product"] },
                    { model: "PromoCode",   fields: ["id", "code", "type", "value", "label", "active"],                           relations: [] },
                    { model: "Review",      fields: ["id", "author", "rating", "text", "verified"],                                relations: [] },
                    { model: "NotifyEmail", fields: ["id", "email", "createdAt"],                                                  relations: [] },
                  ].map(({ model, fields, relations }) => (
                    <div key={model} className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm font-bold text-blue-600">{model}</span>
                        {relations.length > 0 && (
                          <span className="text-xs text-slate-400">→ {relations.join(", ")}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {fields.map((f) => (
                          <span key={f} className="font-mono text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Security ─────────────────────────────────────────────── */}
          {tab === "security" && (
            <div className="space-y-6 animate-slide-up">
              {/* HTTP Headers */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Headers de sécurité HTTP</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Configurés dans <code className="font-mono text-xs bg-slate-100 px-1 rounded">src/middleware.ts</code></p>
                </div>
                <div className="divide-y divide-slate-50">
                  {SECURITY_HEADERS.map((h) => (
                    <div key={h.name} className="px-6 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${h.ok ? "bg-emerald-500" : "bg-amber-400"}`} />
                        <span className="font-mono text-sm text-slate-700">{h.name}</span>
                      </div>
                      <span className={`font-mono text-xs ${h.ok ? "text-slate-500" : "text-amber-600 font-semibold"}`}>
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Env vars status */}
              {health?.checks.environment?.details && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-900 text-sm">Variables d&apos;environnement</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Présence vérifiée — valeurs masquées</p>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {Object.entries(health.checks.environment.details).map(([key, val]) => (
                      <div key={key} className="px-6 py-3.5 flex items-center justify-between">
                        <span className="font-mono text-sm text-slate-700">{key}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          val === "configurée" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                 "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Auth architecture */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Architecture d&apos;authentification</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { role: "Client",     method: "localStorage (baraka-user)",  protection: "Frontend uniquement", risk: "moyen" },
                    { role: "Boucher",    method: "localStorage (baraka-admin)", protection: "Middleware + cookie",  risk: "moyen" },
                    { role: "IT Admin",   method: "localStorage (baraka-it)",    protection: "Middleware + cookie",  risk: "moyen" },
                    { role: "API Admin",  method: "Bearer token / cookie",       protection: "Middleware serveur",   risk: "faible" },
                  ].map((item) => (
                    <div key={item.role} className="px-6 py-4 grid grid-cols-4 gap-4 items-center">
                      <span className="font-semibold text-sm text-slate-900">{item.role}</span>
                      <span className="font-mono text-xs text-slate-500 col-span-1">{item.method}</span>
                      <span className="text-xs text-slate-500">{item.protection}</span>
                      <span className={`text-xs font-semibold text-right ${
                        item.risk === "faible" ? "text-emerald-600" :
                        item.risk === "moyen"  ? "text-amber-600"   : "text-red-600"
                      }`}>
                        Risque {item.risk}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                  <p className="text-xs text-amber-700">
                    <strong>Recommandation :</strong> Migrer vers NextAuth.js avec sessions HTTP-only pour éliminer les risques XSS sur le stockage localStorage.
                  </p>
                </div>
              </div>

              {/* RGPD checklist */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Conformité RGPD</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { item: "Bannière cookies consentement",          ok: true },
                    { item: "Politique de confidentialité publiée",   ok: true },
                    { item: "Mentions légales publiées",               ok: true },
                    { item: "CGV publiées",                            ok: true },
                    { item: "Droit à l'effacement (implémenté)",       ok: false },
                    { item: "Export des données utilisateur",          ok: false },
                    { item: "Registre des traitements",                ok: false },
                  ].map((item) => (
                    <div key={item.item} className="px-6 py-3 flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.ok ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <span className={`text-sm ${item.ok ? "text-slate-700" : "text-slate-400"}`}>{item.item}</span>
                      {!item.ok && <span className="text-xs text-slate-400 ml-auto">À implémenter</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: API & Routes ─────────────────────────────────────────── */}
          {tab === "api" && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Routes API</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{API_ROUTES.length} endpoints — Next.js App Router</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {API_ROUTES.map((route, i) => (
                    <div key={i} className="px-6 py-4 flex items-center gap-4">
                      <span className={`flex-shrink-0 font-mono text-xs font-bold px-2.5 py-1 rounded ${
                        route.method === "GET"  ? "bg-blue-50 text-blue-700" :
                        route.method === "POST" ? "bg-emerald-50 text-emerald-700" :
                                                  "bg-slate-100 text-slate-600"
                      }`}>
                        {route.method}
                      </span>
                      <span className="font-mono text-sm text-slate-700 flex-1">{route.path}</span>
                      <span className="text-xs text-slate-400 hidden md:block flex-1">{route.description}</span>
                      <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        route.auth
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}>
                        {route.auth ? "Auth requise" : "Public"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation schemas */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Schémas de validation (Zod)</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { schema: "OrderSchema",       fields: "clientName, email, phone, mode, slot, address, total, items[]",   used: "POST /api/commandes" },
                    { schema: "ReviewSchema",      fields: "author, rating (1-5), text, date?",                              used: "POST /api/avis" },
                    { schema: "PromoVerifySchema", fields: "code (min 1, max 50)",                                           used: "POST /api/promo-codes/verifier" },
                    { schema: "ProductSchema",     fields: "name, slug, price, category, image, description…",              used: "Admin CRUD produits" },
                  ].map((s) => (
                    <div key={s.schema} className="px-6 py-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-bold text-blue-600">{s.schema}</span>
                        <span className="text-xs text-slate-400">{s.used}</span>
                      </div>
                      <div className="font-mono text-xs text-slate-400">{s.fields}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Config ───────────────────────────────────────────────── */}
          {tab === "config" && (
            <div className="space-y-6 animate-slide-up">
              {/* Build info */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Framework",   value: "Next.js 14.2.5" },
                  { label: "Runtime",     value: health?.build.nodeVersion ?? "—" },
                  { label: "Environnement", value: health?.build.environment ?? "—" },
                  { label: "Base de données", value: "PostgreSQL (Neon)" },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{item.label}</div>
                    <div className="font-mono text-sm font-bold text-slate-900">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Stack technique</h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { layer: "Frontend",     tech: "Next.js 14 App Router",    version: "14.2.5",  status: "ok" as CheckStatus },
                    { layer: "UI",           tech: "TailwindCSS + DM Sans",     version: "3.4.1",   status: "ok" as CheckStatus },
                    { layer: "ORM",          tech: "Prisma Client",             version: "5.22.0",  status: "ok" as CheckStatus },
                    { layer: "DB",           tech: "PostgreSQL via Neon",       version: "—",       status: "warning" as CheckStatus },
                    { layer: "Validation",   tech: "Zod",                       version: "4.3.6",   status: "ok" as CheckStatus },
                    { layer: "Tests",        tech: "Vitest",                    version: "4.1.2",   status: "ok" as CheckStatus },
                    { layer: "Déploiement",  tech: "Vercel",                    version: "—",       status: "ok" as CheckStatus },
                    { layer: "Auth",         tech: "localStorage (temporaire)", version: "—",       status: "warning" as CheckStatus },
                  ].map((item) => (
                    <div key={item.layer} className="px-6 py-3.5 flex items-center gap-4">
                      <span className="text-xs text-slate-400 w-24 flex-shrink-0">{item.layer}</span>
                      <span className="text-sm font-medium text-slate-900 flex-1">{item.tech}</span>
                      <span className="font-mono text-xs text-slate-400 w-16 text-right">{item.version}</span>
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot(item.status)}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Route protection */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900 text-sm">Protection des routes (middleware)</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Fichier : <code className="font-mono bg-slate-100 px-1 rounded">src/middleware.ts</code></p>
                </div>
                <div className="divide-y divide-slate-50">
                  {[
                    { path: "/admin/*",           protection: "ADMIN_SECRET (cookie / Bearer)",    ok: true },
                    { path: "/admin-it/*",         protection: "IT_ADMIN_SECRET (cookie / Bearer)", ok: true },
                    { path: "/api/commandes (GET)", protection: "ADMIN_SECRET",                    ok: true },
                    { path: "/api/admin-it/*",     protection: "IT_ADMIN_SECRET",                  ok: true },
                    { path: "/*",                  protection: "Security headers (all routes)",     ok: true },
                  ].map((item) => (
                    <div key={item.path} className="px-6 py-3.5 flex items-center gap-4">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.ok ? "bg-emerald-500" : "bg-red-500"}`} />
                      <span className="font-mono text-sm text-slate-700 flex-1">{item.path}</span>
                      <span className="text-xs text-slate-400">{item.protection}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
