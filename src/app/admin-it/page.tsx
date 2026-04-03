"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type CheckStatus  = "ok" | "warning" | "error";
type GlobalStatus = "healthy" | "warning" | "degraded" | "loading";
type Tab = "systeme" | "securite" | "base-de-donnees" | "api" | "build" | "logs";

interface LoginLogEntry {
  id: number;
  type: string;
  username: string | null;
  success: boolean;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}
interface LogStats {
  total: number;
  failed: number;
  success: number;
  suspiciousIps: { ip: string | null; _count: { id: number } }[];
}
interface LogsData { logs: LoginLogEntry[]; stats: LogStats; }

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
  build: { nodeVersion: string; nextVersion: string; environment: string; platform: string };
}

// ── Navigation ────────────────────────────────────────────────────────────────
const NAV: { id: Tab; label: string }[] = [
  { id: "systeme",          label: "Système"         },
  { id: "securite",         label: "Sécurité"        },
  { id: "base-de-donnees",  label: "Base de données" },
  { id: "api",              label: "API & Routes"    },
  { id: "build",            label: "Build & Env"     },
  { id: "logs",             label: "Logs connexion"  },
];

const API_ROUTES = [
  { path: "/api/produits",              method: "GET",  auth: false, desc: "Catalogue produits" },
  { path: "/api/avis",                  method: "GET",  auth: false, desc: "Avis clients" },
  { path: "/api/avis",                  method: "POST", auth: false, desc: "Soumettre un avis", rateLimit: "5/h" },
  { path: "/api/contact",               method: "POST", auth: false, desc: "Formulaire de contact", rateLimit: "5/h" },
  { path: "/api/promo-codes/verifier",  method: "POST", auth: false, desc: "Vérifier un code promo", rateLimit: "10/min" },
  { path: "/api/gestion/login",         method: "POST", auth: false, desc: "Login back-office", rateLimit: "5/15min" },
  { path: "/api/gestion/me",            method: "GET",  auth: true,  desc: "Session courante" },
  { path: "/api/gestion/produits",      method: "GET",  auth: true,  desc: "Liste produits (admin)" },
  { path: "/api/gestion/produits",      method: "POST", auth: true,  desc: "Créer produit" },
  { path: "/api/gestion/commandes",     method: "GET",  auth: true,  desc: "Liste commandes" },
  { path: "/api/gestion/messages",      method: "GET",  auth: true,  desc: "Messages contact" },
  { path: "/api/gestion/settings",      method: "GET",  auth: true,  desc: "Paramètres site" },
  { path: "/api/gestion/settings",      method: "PUT",  auth: true,  desc: "Modifier paramètres" },
  { path: "/api/site-settings",         method: "GET",  auth: false, desc: "Modes Aïd/Ramadan (public, no-store)" },
  { path: "/api/admin-it/health",       method: "GET",  auth: true,  desc: "Health check IT" },
];

// ── Helpers visuels ───────────────────────────────────────────────────────────
const statusClasses = {
  ok:      { dot: "bg-emerald-400", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", text: "text-emerald-400", label: "OK" },
  warning: { dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",       text: "text-amber-400",   label: "Attention" },
  error:   { dot: "bg-red-400",     badge: "bg-red-500/15 text-red-400 border-red-500/25",             text: "text-red-400",     label: "Erreur" },
  healthy: { dot: "bg-emerald-400", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", text: "text-emerald-400", label: "Opérationnel" },
  degraded:{ dot: "bg-red-400",     badge: "bg-red-500/15 text-red-400 border-red-500/25",             text: "text-red-400",     label: "Dégradé" },
  loading: { dot: "bg-slate-400",   badge: "bg-slate-500/15 text-slate-400 border-slate-500/25",       text: "text-slate-400",   label: "Chargement" },
};

function StatusBadge({ status }: { status: CheckStatus | GlobalStatus }) {
  const c = statusClasses[status] ?? statusClasses.loading;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function PulsingDot({ status }: { status: GlobalStatus }) {
  const c = statusClasses[status] ?? statusClasses.loading;
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${c.dot}`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${c.dot}`} />
    </span>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]           = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-it/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Accès refusé");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      {/* Grille de fond */}
      <div className="fixed inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="relative w-full max-w-sm">
        {/* Badge IT */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Espace Technique IT
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-xl mb-4">
              <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-white">Baraka Shop — IT</h1>
            <p className="text-slate-500 text-sm mt-1">Accès restreint au personnel technique</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-5 text-center">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-widest">
                Clé d&apos;accès IT
              </label>
              <input
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setError(""); }}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-sm transition-all"
            >
              {loading ? "Authentification…" : "Accéder au tableau de bord"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-800">
            <p className="text-xs text-slate-600">Session 4 heures</p>
            <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard principal ───────────────────────────────────────────────────────
export default function ITPage() {
  const [authed, setAuthed]         = useState(false);
  const [checking, setChecking]     = useState(true);
  const [tab, setTab]               = useState<Tab>("systeme");
  const [health, setHealth]         = useState<HealthData | null>(null);
  const [logsData, setLogsData]     = useState<LogsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [uptime, setUptime]         = useState(0); // secondes depuis chargement

  // Vérification session via cookie (middleware)
  useEffect(() => {
    fetch("/api/admin-it/health")
      .then(r => { if (r.ok) setAuthed(true); })
      .finally(() => setChecking(false));
  }, []);

  // Compteur uptime
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(t);
  }, [authed]);

  const fetchHealth = useCallback(async () => {
    setRefreshing(true);
    try {
      const [healthRes, logsRes] = await Promise.all([
        fetch("/api/admin-it/health"),
        fetch("/api/admin-it/logs?limit=100"),
      ]);
      if (healthRes.ok) { setHealth(await healthRes.json()); setLastRefresh(new Date()); }
      if (logsRes.ok)   { setLogsData(await logsRes.json()); }
    } finally { setRefreshing(false); }
  }, []);

  useEffect(() => { if (authed) fetchHealth(); }, [authed, fetchHealth]);

  // Auto-refresh toutes les 30s
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(fetchHealth, 30_000);
    return () => clearInterval(t);
  }, [authed, fetchHealth]);

  const logout = async () => {
    await fetch("/api/admin-it/login", { method: "DELETE" });
    setAuthed(false);
  };

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return [h, m, sec].map(n => String(n).padStart(2, "0")).join(":");
  };

  if (checking) return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-500 text-sm">
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        Vérification de la session…
      </div>
    </div>
  );

  if (!authed) return <LoginScreen onLogin={() => { setAuthed(true); fetchHealth(); }} />;

  const globalStatus = health?.status ?? "loading";
  const dbCheck      = health?.checks.database;
  const modelsCheck  = health?.checks.models;
  const envCheck     = health?.checks.environment;
  const secCheck     = health?.checks.security;
  const counts       = modelsCheck?.details as Record<string, unknown> | undefined;
  const siteSettings = typeof counts?.settings === "object" && counts?.settings !== null
    ? counts.settings as Record<string, string>
    : null;

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-300 font-mono">

      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PulsingDot status={globalStatus} />
            <span className="text-white font-bold text-sm tracking-wide">Baraka Shop — IT</span>
            <span className="text-slate-600 text-xs hidden sm:block">/ Espace Technique</span>
          </div>
          {health && (
            <StatusBadge status={globalStatus} />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-slate-600 font-mono bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
            ⏱ {formatUptime(uptime)}
          </span>
          <button onClick={fetchHealth} disabled={refreshing}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
            <svg className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? "…" : "Rafraîchir"}
          </button>
          <Link href="/gestion" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg transition-all">
            Back-office
          </Link>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 border border-red-900/50 hover:border-red-700/50 px-3 py-1.5 rounded-lg transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 border-r border-slate-800 min-h-[calc(100vh-49px)] p-3 hidden lg:block flex-shrink-0">
          <nav className="space-y-0.5">
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                  tab === n.id
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/25"
                    : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
                }`}>
                <span>{n.label}</span>
                {n.id === "logs" && (logsData?.stats.failed ?? 0) > 0 && (
                  <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-500/25">
                    {logsData!.stats.failed}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {lastRefresh && (
            <div className="mt-6 px-3">
              <p className="text-[10px] text-slate-700 uppercase tracking-widest mb-1">Dernière synchro</p>
              <p className="text-[11px] text-slate-600 font-mono">
                {lastRefresh.toLocaleTimeString("fr-FR")}
              </p>
            </div>
          )}
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden w-full border-b border-slate-800 px-4 py-2">
          <select value={tab} onChange={e => setTab(e.target.value as Tab)}
            className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none">
            {NAV.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
          </select>
        </div>

        {/* Main */}
        <main className="flex-1 p-6 space-y-5 min-w-0">

          {/* ── Système ── */}
          {tab === "systeme" && (
            <div className="space-y-5">
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: "Produits",    val: counts?.products,  color: "text-blue-400" },
                  { label: "Commandes",   val: counts?.orders,    color: "text-emerald-400" },
                  { label: "Messages",    val: counts?.messages,  color: "text-amber-400" },
                  { label: "Admins actifs",val: counts?.admins,   color: "text-purple-400" },
                ].map(k => (
                  <div key={k.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className={`text-2xl font-bold ${k.color}`}>
                      {k.val !== undefined ? String(k.val) : "—"}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 uppercase tracking-wider">{k.label}</p>
                  </div>
                ))}
              </div>

              {/* Checks globaux */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">État des services</p>
                  {health && (
                    <p className="text-xs text-slate-600 font-mono">
                      {new Date(health.timestamp).toLocaleString("fr-FR")}
                    </p>
                  )}
                </div>
                <div className="divide-y divide-slate-800">
                  {health ? Object.entries(health.checks).map(([name, check]) => (
                    <div key={name} className="px-5 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${statusClasses[check.status]?.dot ?? "bg-slate-500"}`} />
                        <div>
                          <p className="text-sm text-slate-200 font-medium capitalize">{name}</p>
                          <p className="text-xs text-slate-600 mt-0.5">{check.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {check.latency !== undefined && (
                          <span className={`text-xs font-mono ${check.latency < 300 ? "text-emerald-500" : "text-amber-400"}`}>
                            {check.latency}ms
                          </span>
                        )}
                        <StatusBadge status={check.status} />
                      </div>
                    </div>
                  )) : (
                    <div className="px-5 py-8 text-center text-slate-700 text-sm">Chargement…</div>
                  )}
                </div>
              </div>

              {/* Modes site */}
              {siteSettings && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                  <p className="text-sm font-semibold text-white mb-3">Modes actifs (SiteSettings)</p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(siteSettings).map(([k, v]) => (
                      <div key={k} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium ${
                        v === "true"
                          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                          : "bg-slate-800/60 border-slate-700 text-slate-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${v === "true" ? "bg-emerald-400" : "bg-slate-600"}`} />
                        {k} = {v}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Sécurité ── */}
          {tab === "securite" && (
            <div className="space-y-5">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Headers de sécurité</p>
                    <StatusBadge status={secCheck?.status ?? "loading"} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Conformité ANSSI / ISO 27001</p>
                </div>
                <div className="divide-y divide-slate-800">
                  {secCheck?.details ? Object.entries(secCheck.details).map(([header, value]) => (
                    <div key={header} className="px-5 py-3.5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-slate-400">{header}</p>
                      </div>
                      <p className="text-xs text-slate-500 text-right flex-shrink-0 max-w-[60%]">{String(value)}</p>
                    </div>
                  )) : <div className="px-5 py-6 text-center text-slate-700 text-sm">Chargement…</div>}
                </div>
              </div>

              {/* Conformité CNIL */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-4">Conformité CNIL / RGPD</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Banneau consentement cookies", status: "ok" as CheckStatus, detail: "Composant CookieBanner — nécessaires / fonctionnels / analytiques" },
                    { label: "Politique de confidentialité", status: "ok" as CheckStatus, detail: "Page /politique-de-confidentialite" },
                    { label: "Cookie httpOnly + sameSite=strict", status: "ok" as CheckStatus, detail: "admin_session et it_admin_session" },
                    { label: "Données personnelles en DB", status: "warning" as CheckStatus, detail: "ContactMessage, Order — pas de TTL automatique" },
                    { label: "Fichier .env hors du dépôt git", status: "ok" as CheckStatus, detail: ".gitignore mis à jour + git rm --cached" },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusClasses[item.status].dot}`} />
                      <div>
                        <p className="text-xs text-slate-300">{item.label}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate limiting */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-4">Rate Limiting actif</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { endpoint: "POST /api/gestion/login",        limit: "5 / 15 min",  reason: "Anti brute-force" },
                    { endpoint: "POST /api/contact",               limit: "5 / heure",   reason: "Anti-spam" },
                    { endpoint: "POST /api/avis",                  limit: "5 / heure",   reason: "Anti-spam avis" },
                    { endpoint: "POST /api/promo-codes/verifier",  limit: "10 / minute", reason: "Anti-énumération" },
                  ].map(r => (
                    <div key={r.endpoint} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                      <p className="text-[11px] font-mono text-blue-400">{r.endpoint}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-slate-400">{r.limit}</span>
                        <span className="text-[10px] text-slate-600">{r.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Base de données ── */}
          {tab === "base-de-donnees" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Latence",  val: dbCheck?.latency !== undefined ? `${dbCheck.latency}ms` : "—", color: (dbCheck?.latency ?? 999) < 300 ? "text-emerald-400" : "text-amber-400" },
                  { label: "Statut",   val: dbCheck?.message ?? "—", color: statusClasses[dbCheck?.status ?? "loading"].text },
                  { label: "Provider", val: "Supabase (PostgreSQL)", color: "text-blue-400" },
                ].map(k => (
                  <div key={k.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className={`text-lg font-bold font-mono ${k.color}`}>{k.val}</p>
                    <p className="text-xs text-slate-600 mt-1 uppercase tracking-wider">{k.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800">
                  <p className="text-sm font-semibold text-white">Modèles Prisma</p>
                </div>
                <div className="divide-y divide-slate-800">
                  {counts ? [
                    { model: "Product",        count: counts.products,   desc: "Catalogue produits" },
                    { model: "Order",          count: counts.orders,     desc: "Commandes clients" },
                    { model: "ContactMessage", count: counts.messages,   desc: "Messages formulaire contact" },
                    { model: "Review",         count: counts.reviews,    desc: "Avis clients" },
                    { model: "AdminUser",      count: counts.admins,     desc: "Comptes administrateurs" },
                  ].map(m => (
                    <div key={m.model} className="px-5 py-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-slate-300">{m.model}</span>
                        <span className="text-xs text-slate-600 ml-3">{m.desc}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-200 font-mono">
                        {m.count !== undefined ? String(m.count) : "—"}
                      </span>
                    </div>
                  )) : <div className="px-5 py-6 text-center text-slate-700 text-sm">Chargement…</div>}
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-3">Variables d&apos;environnement</p>
                <div className="space-y-2">
                  {envCheck?.details ? Object.entries(envCheck.details).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">{k}</span>
                      <span className={`text-xs font-mono ${String(v).startsWith("✓") ? "text-emerald-500" : "text-red-400"}`}>{String(v)}</span>
                    </div>
                  )) : <p className="text-slate-700 text-sm text-center py-4">Chargement…</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── API & Routes ── */}
          {tab === "api" && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-800">
                <p className="text-sm font-semibold text-white">Routes API ({API_ROUTES.length})</p>
                <p className="text-xs text-slate-600 mt-0.5">Toutes les routes — authentification et rate limiting</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="border-b border-slate-800">
                    <tr className="text-slate-600 uppercase tracking-wider">
                      <th className="px-5 py-3 text-left font-medium">Endpoint</th>
                      <th className="px-4 py-3 text-center font-medium">Méthode</th>
                      <th className="px-4 py-3 text-center font-medium">Auth</th>
                      <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Limite</th>
                      <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {API_ROUTES.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-3 font-mono text-blue-400">{r.path}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-mono font-bold ${
                            r.method === "GET"    ? "text-emerald-400" :
                            r.method === "POST"   ? "text-blue-400"   :
                            r.method === "PUT"    ? "text-amber-400"  :
                            r.method === "DELETE" ? "text-red-400"    : "text-slate-400"
                          }`}>{r.method}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.auth
                            ? <span className="text-amber-500">🔒</span>
                            : <span className="text-slate-600">—</span>}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {r.rateLimit
                            ? <span className="text-purple-400 font-mono">{r.rateLimit}</span>
                            : <span className="text-slate-700">—</span>}
                        </td>
                        <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{r.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Build & Env ── */}
          {tab === "build" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {health?.build ? [
                  { label: "Node.js",       val: health.build.nodeVersion },
                  { label: "Next.js",       val: health.build.nextVersion },
                  { label: "Environnement", val: health.build.environment },
                  { label: "Platform",      val: health.build.platform },
                ].map(k => (
                  <div key={k.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className="text-sm font-bold text-white font-mono">{k.val}</p>
                    <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{k.label}</p>
                  </div>
                )) : <div className="col-span-4 text-center text-slate-700 py-6">Chargement…</div>}
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <p className="text-sm font-semibold text-white mb-4">Stack technique</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: "Next.js 14",         role: "Framework",        status: "ok" as CheckStatus },
                    { name: "Prisma 5",            role: "ORM",              status: "ok" as CheckStatus },
                    { name: "Supabase PostgreSQL", role: "Base de données",  status: "ok" as CheckStatus },
                    { name: "Zod",                 role: "Validation",       status: "ok" as CheckStatus },
                    { name: "bcryptjs",            role: "Hash passwords",   status: "ok" as CheckStatus },
                    { name: "Tailwind CSS",        role: "Styles",           status: "ok" as CheckStatus },
                    { name: "Vercel",              role: "Hébergement",      status: "ok" as CheckStatus },
                    { name: "TypeScript",          role: "Typage",           status: "ok" as CheckStatus },
                    { name: "Upstash Redis",       role: "Rate limit distribué", status: "warning" as CheckStatus },
                  ].map(dep => (
                    <div key={dep.name} className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusClasses[dep.status].dot}`} />
                        <span className="text-xs font-semibold text-slate-200">{dep.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-600">{dep.role}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-700 mt-3">
                  ⚠ Upstash Redis non configuré — rate limiting en mémoire (suffisant pour trafic faible)
                </p>
              </div>
            </div>
          )}

          {/* ── Logs connexion ── */}
          {tab === "logs" && (
            <div className="space-y-5">

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total",    val: logsData?.stats.total   ?? "—", color: "text-slate-200" },
                  { label: "Réussies", val: logsData?.stats.success ?? "—", color: "text-emerald-400" },
                  { label: "Échouées", val: logsData?.stats.failed  ?? "—", color: logsData?.stats.failed ? "text-red-400" : "text-slate-500" },
                ].map(k => (
                  <div key={k.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                    <p className={`text-2xl font-bold font-mono ${k.color}`}>{String(k.val)}</p>
                    <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{k.label}</p>
                  </div>
                ))}
              </div>

              {/* IPs suspectes */}
              {(logsData?.stats.suspiciousIps.length ?? 0) > 0 && (
                <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-5">
                  <p className="text-sm font-semibold text-red-400 mb-3">IPs avec tentatives échouées</p>
                  <div className="space-y-2">
                    {logsData!.stats.suspiciousIps.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">{entry.ip ?? "unknown"}</span>
                        <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md">
                          {entry._count.id} échec{entry._count.id > 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Journal des connexions</p>
                  <p className="text-xs text-slate-600">100 dernières entrées</p>
                </div>
                {!logsData || logsData.logs.length === 0 ? (
                  <p className="px-5 py-8 text-center text-slate-700 text-sm">Aucune entrée pour l&apos;instant.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="border-b border-slate-800">
                        <tr className="text-slate-600 uppercase tracking-wider">
                          <th className="px-5 py-3 text-left font-medium">Date / Heure</th>
                          <th className="px-4 py-3 text-center font-medium">Type</th>
                          <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Utilisateur</th>
                          <th className="px-4 py-3 text-left font-medium">IP</th>
                          <th className="px-4 py-3 text-center font-medium">Résultat</th>
                          <th className="px-4 py-3 text-left font-medium hidden lg:table-cell">User-Agent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {logsData.logs.map(log => (
                          <tr key={log.id} className={`hover:bg-slate-800/20 transition-colors ${!log.success ? "bg-red-900/5" : ""}`}>
                            <td className="px-5 py-3 font-mono text-slate-400 whitespace-nowrap">
                              {new Date(log.createdAt).toLocaleString("fr-FR", {
                                day: "2-digit", month: "2-digit",
                                hour: "2-digit", minute: "2-digit", second: "2-digit"
                              })}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                log.type === "gestion"
                                  ? "bg-[#1B5E20]/20 text-emerald-400 border-emerald-800/40"
                                  : "bg-blue-600/15 text-blue-400 border-blue-500/25"
                              }`}>
                                {log.type === "gestion" ? "Gestion" : "IT"}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-400 hidden sm:table-cell">
                              {log.username ?? <span className="text-slate-700">—</span>}
                            </td>
                            <td className="px-4 py-3 font-mono text-slate-400">
                              {log.ip ?? <span className="text-slate-700">—</span>}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {log.success
                                ? <span className="text-emerald-500 font-bold">✓</span>
                                : <span className="text-red-500 font-bold">✗</span>}
                            </td>
                            <td className="px-4 py-3 text-slate-700 max-w-[200px] truncate hidden lg:table-cell text-[10px]">
                              {log.userAgent ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
