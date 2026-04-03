"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { categories } from "@/lib/data";
import type { ProductCategory } from "@/lib/data";
import Link from "next/link";

type Tab = "tableau-de-bord" | "produits" | "commandes" | "clients" | "messages" | "comptes";
type OrderStatus = "En attente" | "En préparation" | "Prête" | "Livrée" | "Annulée";

interface DBProduct {
  id: number; name: string; slug: string; category: string; price: number;
  promoPrice: number | null; promoEndDate: string | null; weight: string | null;
  image: string; description: string; badge: string | null;
  inStock: boolean; stock: number | null; origin: string | null; decoupeOptions: boolean;
}
interface DBOrder {
  id: number; reference: string; clientName: string; email: string; phone: string | null;
  mode: string; total: number; status: string; createdAt: string;
  items: { id: number; name: string; qty: number; price: number }[];
}
interface DBPromoCode { id: number; code: string; type: string; value: number; label: string; active: boolean; }
interface DBAdmin { id: number; username: string; active: boolean; }
interface DBMessage { id: number; name: string; email: string; phone: string | null; subject: string | null; message: string; read: boolean; createdAt: string; }
interface SiteSettings { mode_aid: string; mode_ramadan: string; }

const PRESET_IMAGES = [
  { label: "Steak / Entrecôte",    url: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Viande hachée",        url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Côte de bœuf",         url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Merguez / Saucisses",  url: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Agneau / Gigot",       url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Poulet entier",        url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Morceaux de poulet",   url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Brochettes",           url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Épices",               url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=450&fit=crop&auto=format&q=80" },
  { label: "Huile d'olive",        url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=450&fit=crop&auto=format&q=80" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  "En attente":     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "En préparation": "bg-blue-50 text-blue-700 border border-blue-200",
  "Prête":          "bg-green-50 text-[#1B5E20] border border-green-200",
  "Livrée":         "bg-gray-50 text-gray-500 border border-gray-200",
  "Annulée":        "bg-red-50 text-red-600 border border-red-200",
};

const NAV: { id: Tab; label: string }[] = [
  { id: "tableau-de-bord", label: "Tableau de bord" },
  { id: "produits",        label: "Produits" },
  { id: "commandes",       label: "Commandes" },
  { id: "clients",         label: "Clients" },
  { id: "messages",        label: "Boîte mail" },
  { id: "comptes",         label: "Comptes" },
];

const EMPTY_PROD = {
  name: "", price: "", promoPrice: "", weight: "", image: "",
  description: "", badge: "", category: "Bœuf & Veau" as ProductCategory,
  inStock: true, stock: "", origin: "", decoupeOptions: false,
};

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${on ? "bg-[#1B5E20]" : "bg-gray-200"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function LoginScreen({ onLogin }: { onLogin: (name: string) => void }) {
  const [username, setUsername] = useState("");
  const [pw, setPw]             = useState("");
  const [err, setErr]           = useState("");
  const [loading, setLoading]   = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const res  = await fetch("/api/gestion/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: pw }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Identifiants invalides"); return; }
      onLogin(data.displayName);
    } catch { setErr("Erreur de connexion"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#1B5E20] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Baraka Shop" className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-md" />
          <h1 className="text-xl font-bold text-gray-900">Espace de gestion</h1>
          <p className="text-gray-400 text-sm mt-1">Baraka Shop — Accès privé</p>
        </div>

        {err && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Nom d&apos;utilisateur</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input type="text" placeholder="leboucher" value={username}
                onChange={(e) => { setUsername(e.target.value); setErr(""); }}
                className="input-field pl-9" autoComplete="username" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Mot de passe</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type="password" placeholder="••••••••" value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(""); }}
                className="input-field pl-9" autoComplete="current-password" required />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#1B5E20] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#145214] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Connexion...
              </>
            ) : "Se connecter"}
          </button>
        </form>

        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs text-gray-300">Session de 30 minutes</p>
          <Link href="/" className="text-xs text-gray-400 hover:text-[#1B5E20] transition-colors">← Retour au site</Link>
        </div>
      </div>
    </div>
  );
}

const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export default function GestionPage() {
  const [authed, setAuthed]           = useState(false);
  const [checking, setChecking]       = useState(true); // vérifie la session au montage
  const [displayName, setDisplayName] = useState("");
  const [tab, setTab]                 = useState<Tab>("tableau-de-bord");
  const timeoutRef                    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [prods, setProds]             = useState<DBProduct[]>([]);
  const [orders, setOrders]           = useState<DBOrder[]>([]);
  const [codes, setCodes]             = useState<DBPromoCode[]>([]);
  const [admins, setAdmins]           = useState<DBAdmin[]>([]);
  const [messages, setMessages]       = useState<DBMessage[]>([]);
  const [settings, setSettings]       = useState<SiteSettings>({ mode_aid: "false", mode_ramadan: "false" });
  const [saving, setSaving]           = useState(false);

  const [showProdForm, setShowProdForm]     = useState(false);
  const [editProd, setEditProd]             = useState<DBProduct | null>(null);
  const [prodForm, setProdForm]             = useState(EMPTY_PROD);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [prodTab, setProdTab]               = useState<"liste" | "promos">("liste");
  const [promoForm, setPromoForm]           = useState({ code: "", type: "percent" as "percent" | "fixed", value: "" });
  const [selectedMsg, setSelectedMsg]       = useState<DBMessage | null>(null);
  const [newAdmin, setNewAdmin]             = useState({ username: "", password: "" });

  // ── Vérifier la session au montage (persist après refresh) ───────────────
  useEffect(() => {
    fetch("/api/gestion/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.ok) { setDisplayName(data.displayName); setAuthed(true); }
      })
      .finally(() => setChecking(false));
  }, []);

  // ── Timeout 30 min d'inactivité ───────────────────────────────────────────
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      await fetch("/api/gestion/login", { method: "DELETE" });
      setAuthed(false);
    }, TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (!authed) return;
    resetTimeout();
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach(e => window.addEventListener(e, resetTimeout));
    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimeout));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [authed, resetTimeout]);

  const load = useCallback(async () => {
    const [p, o, c, a, m, s] = await Promise.all([
      fetch("/api/gestion/produits").then(r => r.json()),
      fetch("/api/gestion/commandes").then(r => r.json()),
      fetch("/api/promo-codes").then(r => r.json()),
      fetch("/api/gestion/comptes").then(r => r.json()),
      fetch("/api/gestion/messages").then(r => r.json()),
      fetch("/api/gestion/settings").then(r => r.json()),
    ]);
    setProds(Array.isArray(p) ? p : []);
    setOrders(Array.isArray(o) ? o : []);
    setCodes(Array.isArray(c) ? c : []);
    setAdmins(Array.isArray(a) ? a : []);
    setMessages(Array.isArray(m) ? m : []);
    setSettings(s);
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const logout = async () => {
    await fetch("/api/gestion/login", { method: "DELETE" });
    setAuthed(false);
  };

  const saveProd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editProd) {
        await fetch(`/api/gestion/produits/${editProd.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(prodForm),
        });
      } else {
        await fetch("/api/gestion/produits", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(prodForm),
        });
      }
      await load(); setShowProdForm(false); setEditProd(null); setProdForm(EMPTY_PROD); setShowImagePicker(false);
    } finally { setSaving(false); }
  };

  const deleteProd = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/gestion/produits/${id}`, { method: "DELETE" });
    await load();
  };

  const editProduct = (p: DBProduct) => {
    setEditProd(p);
    setProdForm({
      name: p.name, price: String(p.price), promoPrice: p.promoPrice ? String(p.promoPrice) : "",
      weight: p.weight || "", image: p.image, description: p.description,
      badge: p.badge || "", category: p.category as ProductCategory,
      inStock: p.inStock, stock: p.stock ? String(p.stock) : "",
      origin: p.origin || "", decoupeOptions: p.decoupeOptions,
    });
    setShowProdForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeStatus = async (id: number, status: string) => {
    await fetch(`/api/gestion/commandes/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }),
    });
    await load();
  };

  const addPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const label = promoForm.type === "percent" ? `-${promoForm.value}% sur votre commande` : `-${promoForm.value}€ de réduction`;
    await fetch("/api/promo-codes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promoForm.code.toUpperCase(), type: promoForm.type, value: promoForm.value, label }),
    });
    await load(); setPromoForm({ code: "", type: "percent", value: "" });
  };

  const deletePromo = async (id: number) => {
    if (!confirm("Supprimer ce code ?")) return;
    await fetch(`/api/promo-codes/${id}`, { method: "DELETE" });
    await load();
  };

  const markRead = async (id: number, read: boolean) => {
    await fetch(`/api/gestion/messages/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ read }),
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read } : m));
  };

  const deleteMsg = async (id: number) => {
    await fetch(`/api/gestion/messages/${id}`, { method: "DELETE" });
    setSelectedMsg(null); await load();
  };

  const toggleSetting = async (key: string) => {
    const newVal = settings[key as keyof SiteSettings] === "true" ? "false" : "true";
    setSettings(prev => ({ ...prev, [key]: newVal }));
    await fetch("/api/gestion/settings", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [key]: newVal }),
    });
  };

  const addAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/gestion/comptes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newAdmin.username, password: newAdmin.password, displayName: newAdmin.username, role: "boucher" }),
    });
    await load(); setNewAdmin({ username: "", password: "" });
  };

  const toggleAdmin = async (id: number, active: boolean) => {
    await fetch(`/api/gestion/comptes/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !active }),
    });
    await load();
  };

  const deleteAdmin = async (id: number) => {
    if (!confirm("Supprimer ce compte ?")) return;
    await fetch(`/api/gestion/comptes/${id}`, { method: "DELETE" });
    await load();
  };

  const today       = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const todayCA     = todayOrders.reduce((s, o) => s + o.total, 0);
  const pending     = orders.filter(o => o.status === "En attente").length;
  const unreadMsgs  = messages.filter(m => !m.read).length;
  const promoProds  = prods.filter(p => p.promoPrice && p.promoPrice < p.price);

  const clientsMap = new Map<string, { name: string; email: string; orders: number; total: number; since: string }>();
  for (const o of orders) {
    const ex = clientsMap.get(o.email);
    if (ex) { ex.orders++; ex.total += o.total; }
    else clientsMap.set(o.email, { name: o.clientName, email: o.email, orders: 1, total: o.total, since: new Date(o.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) });
  }
  const clients = Array.from(clientsMap.values()).sort((a, b) => b.total - a.total);

  if (checking) return (
    <div className="min-h-screen bg-[#1B5E20] flex items-center justify-center">
      <svg className="animate-spin w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );

  if (!authed) return <LoginScreen onLogin={(n) => { setDisplayName(n); setAuthed(true); resetTimeout(); }} />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-44 bg-[#1B5E20] flex flex-col flex-shrink-0 hidden lg:flex">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-semibold text-sm">Gestion Baraka</p>
          <p className="text-white/40 text-xs mt-0.5">{displayName}</p>
        </div>
        <nav className="flex-1 py-3 px-2">
          {NAV.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all ${
                tab === item.id ? "bg-white/15 text-white font-medium" : "text-white/60 hover:bg-white/8 hover:text-white/90"
              }`}>
              {item.label}
              {item.id === "commandes" && pending > 0 && (
                <span className="bg-[#E64A19] text-white text-[10px] font-bold rounded-full h-4 px-1.5 flex items-center">{pending}</span>
              )}
              {item.id === "messages" && unreadMsgs > 0 && (
                <span className="bg-blue-400 text-white text-[10px] font-bold rounded-full h-4 px-1.5 flex items-center">{unreadMsgs}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="w-full text-xs text-white/40 hover:text-white/70 py-2 transition-colors text-left px-1">Déconnexion →</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile nav */}
            <div className="lg:hidden">
              <select value={tab} onChange={e => setTab(e.target.value as Tab)}
                className="text-sm font-semibold text-gray-900 bg-transparent border-0 outline-none cursor-pointer">
                {NAV.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            <h1 className="font-semibold text-gray-900 hidden lg:block">
              {NAV.find(n => n.id === tab)?.label}
            </h1>
          </div>
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">← Voir le site</Link>
        </header>

        <main className="flex-1 p-5 overflow-auto">

          {/* ── Tableau de bord ── */}
          {tab === "tableau-de-bord" && (
            <div className="space-y-5">
              {/* Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "mode_aid",     label: "Mode Aïd el-Adha", desc: "Active les bannières et produits spéciaux Aïd", emoji: "🐑" },
                  { key: "mode_ramadan", label: "Mode Ramadan",      desc: "Active les promotions et bannières du Ramadan", emoji: "🌙" },
                ].map(({ key, label, desc, emoji }) => {
                  const on = settings[key as keyof SiteSettings] === "true";
                  return (
                    <div key={key} className={`bg-white rounded-xl p-5 border-2 transition-all ${on ? "border-[#1B5E20]/40" : "border-gray-100"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span>{emoji}</span>
                          <p className="font-semibold text-gray-900 text-sm">{label}</p>
                        </div>
                        <Toggle on={on} onChange={() => toggleSetting(key)} />
                      </div>
                      <p className="text-xs text-gray-400 ml-6">{desc}</p>
                      <p className={`text-xs font-medium mt-2 ml-6 ${on ? "text-[#1B5E20]" : "text-gray-300"}`}>
                        {on ? "Activé — visible sur le site" : "Désactivé"}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Commandes aujourd'hui", val: todayOrders.length, color: "text-[#1B5E20]" },
                  { label: "CA du jour",            val: `${todayCA.toFixed(2)} €`, color: "text-[#C9922A]" },
                  { label: "En attente",            val: pending, color: "text-[#E64A19]" },
                  { label: "Produits en stock",     val: prods.filter(p => p.inStock).length, color: "text-gray-700" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Dernières commandes */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <p className="font-semibold text-gray-900 text-sm">Dernières commandes</p>
                </div>
                {orders.length === 0 ? (
                  <p className="px-5 py-8 text-center text-gray-300 text-sm">Aucune commande pour l&apos;instant.</p>
                ) : (
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.reference}</td>
                          <td className="px-5 py-3 font-medium text-gray-900">{o.clientName}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-right">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${STATUS_COLORS[o.status as OrderStatus] || ""}`}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ── Produits ── */}
          {tab === "produits" && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {(["liste", "promos"] as const).map(t => (
                  <button key={t} onClick={() => setProdTab(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${prodTab === t ? "bg-[#1B5E20] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-[#1B5E20]"}`}>
                    {t === "liste" ? `Produits (${prods.length})` : `Promotions (${promoProds.length})`}
                  </button>
                ))}
                {prodTab === "liste" && (
                  <button onClick={() => { setShowProdForm(v => !v); setEditProd(null); setProdForm(EMPTY_PROD); setShowImagePicker(false); }}
                    className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-[#1B5E20] text-white hover:bg-[#145214] transition-colors">
                    {showProdForm && !editProd ? "Annuler" : "+ Ajouter"}
                  </button>
                )}
              </div>

              {prodTab === "liste" && showProdForm && (
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm">{editProd ? `Modifier — ${editProd.name}` : "Nouveau produit"}</h3>

                  {/* Sélecteur image */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Photo</label>
                    {prodForm.image && (
                      <div className="mb-3 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={prodForm.image} alt="apercu" className="w-14 h-14 rounded-lg object-cover border border-gray-100" />
                        <p className="text-xs text-gray-400">Image sélectionnée</p>
                      </div>
                    )}
                    <button type="button" onClick={() => setShowImagePicker(v => !v)}
                      className="text-xs text-[#1B5E20] border border-[#1B5E20]/30 px-3 py-1.5 rounded-lg hover:bg-[#1B5E20]/5 transition-colors">
                      {showImagePicker ? "Masquer" : "Choisir une image"}
                    </button>
                    {showImagePicker && (
                      <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {PRESET_IMAGES.map(img => (
                          <button key={img.url} type="button"
                            onClick={() => { setProdForm(f => ({ ...f, image: img.url })); setShowImagePicker(false); }}
                            className={`rounded-lg overflow-hidden border-2 transition-all text-left ${prodForm.image === img.url ? "border-[#1B5E20]" : "border-transparent hover:border-gray-300"}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.url} alt={img.label} className="w-full h-14 object-cover" />
                            <p className="text-[9px] text-center text-gray-500 py-1 px-1 leading-tight">{img.label}</p>
                          </button>
                        ))}
                        <label className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center h-14 cursor-pointer hover:border-[#1B5E20] transition-colors">
                          <span className="text-xs text-gray-400">+ Fichier</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => setProdForm(f => ({ ...f, image: ev.target?.result as string }));
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      </div>
                    )}
                    <input value={prodForm.image} onChange={e => setProdForm(f => ({ ...f, image: e.target.value }))}
                      className="input-field text-xs mt-2" placeholder="Ou coller une URL..." />
                  </div>

                  <form onSubmit={saveProd} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Nom *</label>
                      <input value={prodForm.name} onChange={e => setProdForm(f => ({ ...f, name: e.target.value }))} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Prix (€) *</label>
                      <input type="number" step="0.01" value={prodForm.price} onChange={e => setProdForm(f => ({ ...f, price: e.target.value }))} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Prix promo (€)</label>
                      <input type="number" step="0.01" value={prodForm.promoPrice} onChange={e => setProdForm(f => ({ ...f, promoPrice: e.target.value }))} className="input-field" placeholder="Vide = aucune promo" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Catégorie</label>
                      <select value={prodForm.category} onChange={e => setProdForm(f => ({ ...f, category: e.target.value as ProductCategory }))} className="input-field">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Badge</label>
                      <select value={prodForm.badge} onChange={e => setProdForm(f => ({ ...f, badge: e.target.value }))} className="input-field">
                        <option value="">Aucun</option>
                        <option>Nouveau</option><option>Promo</option><option>Bestseller</option><option>Aïd</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Poids / Quantité</label>
                      <input value={prodForm.weight} onChange={e => setProdForm(f => ({ ...f, weight: e.target.value }))} className="input-field" placeholder="ex: 500g, par kg" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Stock disponible</label>
                      <input type="number" value={prodForm.stock} onChange={e => setProdForm(f => ({ ...f, stock: e.target.value }))} className="input-field" placeholder="Quantité" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Description</label>
                      <textarea rows={2} value={prodForm.description} onChange={e => setProdForm(f => ({ ...f, description: e.target.value }))} className="input-field resize-none" />
                    </div>
                    <div className="flex items-center gap-5">
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={prodForm.inStock} onChange={e => setProdForm(f => ({ ...f, inStock: e.target.checked }))} className="w-4 h-4 accent-[#1B5E20]" />
                        En stock
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input type="checkbox" checked={prodForm.decoupeOptions} onChange={e => setProdForm(f => ({ ...f, decoupeOptions: e.target.checked }))} className="w-4 h-4 accent-[#1B5E20]" />
                        Options découpe
                      </label>
                    </div>
                    <div className="sm:col-span-2 flex gap-3 pt-1">
                      <button type="submit" disabled={saving}
                        className="bg-[#1B5E20] text-white text-sm py-2.5 px-6 rounded-lg font-medium hover:bg-[#145214] transition-colors disabled:opacity-60">
                        {saving ? "Enregistrement..." : editProd ? "Enregistrer" : "Ajouter le produit"}
                      </button>
                      <button type="button" onClick={() => { setShowProdForm(false); setEditProd(null); }}
                        className="text-sm text-gray-500 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50">Annuler</button>
                    </div>
                  </form>
                </div>
              )}

              {prodTab === "liste" && (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50/80">
                        <tr className="text-xs text-gray-400 uppercase tracking-wide">
                          <th className="px-5 py-3 text-left">Produit</th>
                          <th className="px-5 py-3 text-left hidden md:table-cell">Catégorie</th>
                          <th className="px-5 py-3 text-right">Prix</th>
                          <th className="px-5 py-3 text-center">Stock</th>
                          <th className="px-5 py-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {prods.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50/50">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{p.name}</p>
                                  {p.badge && <p className="text-[10px] text-gray-400">{p.badge}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{p.category}</td>
                            <td className="px-5 py-3 text-right">
                              <p className="font-semibold text-[#1B5E20] text-sm">{p.price.toFixed(2)} €</p>
                              {p.promoPrice && <p className="text-xs text-[#C62828]">Promo: {p.promoPrice.toFixed(2)} €</p>}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <span className={`text-xs font-medium px-2 py-1 rounded-md ${p.inStock ? "bg-green-50 text-[#1B5E20] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                                {p.inStock ? (p.stock ? `${p.stock} en stock` : "En stock") : "Rupture"}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-center">
                              <div className="flex items-center justify-center gap-3">
                                <button onClick={() => editProduct(p)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Modifier</button>
                                <button onClick={() => deleteProd(p.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Supprimer</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {prodTab === "promos" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <p className="font-semibold text-gray-900 text-sm">Produits en promotion ({promoProds.length})</p>
                    </div>
                    {promoProds.length === 0 ? (
                      <p className="px-5 py-8 text-center text-gray-300 text-sm">Aucun produit en promotion. Modifiez un produit et ajoutez un prix promo.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50/80">
                          <tr className="text-xs text-gray-400 uppercase tracking-wide">
                            <th className="px-5 py-3 text-left">Produit</th>
                            <th className="px-5 py-3 text-right">Prix normal</th>
                            <th className="px-5 py-3 text-right">Prix promo</th>
                            <th className="px-5 py-3 text-center">Remise</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {promoProds.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3 font-medium text-gray-900 text-sm">{p.name}</td>
                              <td className="px-5 py-3 text-right text-gray-400 line-through text-xs">{p.price.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-right font-bold text-[#C62828]">{p.promoPrice!.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-center">
                                <span className="bg-red-50 text-[#C62828] text-xs font-bold px-2 py-0.5 rounded-md">
                                  -{Math.round(((p.price - p.promoPrice!) / p.price) * 100)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-50">
                      <p className="font-semibold text-gray-900 text-sm">Codes promo ({codes.length})</p>
                    </div>
                    {codes.length > 0 && (
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50/80">
                          <tr className="text-xs text-gray-400 uppercase tracking-wide">
                            <th className="px-5 py-3 text-left">Code</th>
                            <th className="px-5 py-3 text-left hidden sm:table-cell">Description</th>
                            <th className="px-5 py-3 text-center">Valeur</th>
                            <th className="px-5 py-3 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {codes.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3">
                                <span className="font-mono font-bold text-[#1B5E20] bg-[#1B5E20]/8 px-2 py-1 rounded text-xs">{c.code}</span>
                              </td>
                              <td className="px-5 py-3 text-gray-400 text-xs hidden sm:table-cell">{c.label}</td>
                              <td className="px-5 py-3 text-center font-bold text-gray-700 text-sm">{c.type === "percent" ? `${c.value}%` : `${c.value} €`}</td>
                              <td className="px-5 py-3 text-center">
                                <button onClick={() => deletePromo(c.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Supprimer</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <div className="px-5 pb-5 pt-4 border-t border-gray-50">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Ajouter un code</p>
                      <form onSubmit={addPromo} className="flex flex-wrap gap-3 items-end">
                        <input value={promoForm.code} onChange={e => setPromoForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                          className="input-field w-28" placeholder="CODE" required />
                        <select value={promoForm.type} onChange={e => setPromoForm(f => ({ ...f, type: e.target.value as "percent" | "fixed" }))} className="input-field w-28">
                          <option value="percent">%</option>
                          <option value="fixed">€ fixe</option>
                        </select>
                        <input type="number" step="0.01" value={promoForm.value} onChange={e => setPromoForm(f => ({ ...f, value: e.target.value }))}
                          className="input-field w-20" placeholder="10" required />
                        <button type="submit" className="bg-[#1B5E20] text-white text-sm py-2.5 px-5 rounded-lg font-medium hover:bg-[#145214] transition-colors">Créer</button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Commandes ── */}
          {tab === "commandes" && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <p className="font-semibold text-gray-900 text-sm">Commandes ({orders.length})</p>
                <p className="text-xs text-gray-400">{pending} en attente</p>
              </div>
              {orders.length === 0 ? (
                <p className="px-5 py-10 text-center text-gray-300 text-sm">Aucune commande pour l&apos;instant.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-400 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">N°</th>
                        <th className="px-5 py-3 text-left">Client</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Date</th>
                        <th className="px-5 py-3 text-left hidden lg:table-cell">Articles</th>
                        <th className="px-5 py-3 text-right">Total</th>
                        <th className="px-5 py-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.reference}</td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-gray-900 text-sm">{o.clientName}</p>
                            <p className="text-xs text-gray-400">{o.email}</p>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">
                            {new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs max-w-[160px] truncate hidden lg:table-cell">
                            {o.items.map(i => `${i.name} x${i.qty}`).join(", ")}
                          </td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-center">
                            <select value={o.status} onChange={e => changeStatus(o.id, e.target.value)}
                              className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer outline-none ${STATUS_COLORS[o.status as OrderStatus] || ""}`}>
                              {(["En attente","En préparation","Prête","Livrée","Annulée"] as OrderStatus[]).map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Clients ── */}
          {tab === "clients" && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <p className="font-semibold text-gray-900 text-sm">Clients ({clients.length})</p>
              </div>
              {clients.length === 0 ? (
                <p className="px-5 py-10 text-center text-gray-300 text-sm">Aucun client pour l&apos;instant.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-400 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">Nom</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Email</th>
                        <th className="px-5 py-3 text-center">Commandes</th>
                        <th className="px-5 py-3 text-right">Total dépensé</th>
                        <th className="px-5 py-3 text-center hidden sm:table-cell">Depuis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {clients.map(c => (
                        <tr key={c.email} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{c.email}</td>
                          <td className="px-5 py-3 text-center font-semibold text-gray-700">{c.orders}</td>
                          <td className="px-5 py-3 text-right font-semibold text-[#1B5E20]">{c.total.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-center text-gray-400 text-xs hidden sm:table-cell">{c.since}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Boîte mail ── */}
          {tab === "messages" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <p className="font-semibold text-gray-900 text-sm">Messages ({messages.length})</p>
                  {unreadMsgs > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{unreadMsgs} non lus</span>}
                </div>
                {messages.length === 0 ? (
                  <p className="px-5 py-10 text-center text-gray-300 text-sm">Aucun message.</p>
                ) : (
                  <div className="divide-y divide-gray-50 max-h-[65vh] overflow-y-auto">
                    {messages.map(m => (
                      <button key={m.id} onClick={() => { setSelectedMsg(m); if (!m.read) markRead(m.id, true); }}
                        className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${selectedMsg?.id === m.id ? "bg-gray-50" : ""}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                              <p className={`text-sm truncate ${!m.read ? "font-semibold text-gray-900" : "text-gray-600"}`}>{m.name}</p>
                            </div>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{m.subject || m.message.slice(0, 35)}</p>
                          </div>
                          <p className="text-[10px] text-gray-300 flex-shrink-0">
                            {new Date(m.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 lg:col-span-2">
                {!selectedMsg ? (
                  <div className="flex items-center justify-center h-48 text-gray-300 text-sm">Sélectionnez un message</div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-5 gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedMsg.subject || "(Sans objet)"}</h3>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <p className="text-sm text-gray-700 font-medium">{selectedMsg.name}</p>
                          <a href={`mailto:${selectedMsg.email}`} className="text-xs text-blue-600 hover:underline">{selectedMsg.email}</a>
                          {selectedMsg.phone && <p className="text-xs text-gray-400">{selectedMsg.phone}</p>}
                        </div>
                        <p className="text-xs text-gray-300 mt-1">
                          {new Date(selectedMsg.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => markRead(selectedMsg.id, !selectedMsg.read)}
                          className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                          {selectedMsg.read ? "Non lu" : "Marquer lu"}
                        </button>
                        <button onClick={() => deleteMsg(selectedMsg.id)}
                          className="text-xs text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50">Supprimer</button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</div>
                    <a href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject || "Votre message"}`}
                      className="inline-flex mt-4 bg-[#1B5E20] text-white text-sm py-2.5 px-5 rounded-lg font-medium hover:bg-[#145214] transition-colors">
                      Répondre par email
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Comptes ── */}
          {tab === "comptes" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-50">
                  <p className="font-semibold text-gray-900 text-sm">Comptes ({admins.length})</p>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/80">
                    <tr className="text-xs text-gray-400 uppercase tracking-wide">
                      <th className="px-5 py-3 text-left">Nom d&apos;utilisateur</th>
                      <th className="px-5 py-3 text-center">Statut</th>
                      <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {admins.map(a => (
                      <tr key={a.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 font-mono text-sm text-gray-700">{a.username}</td>
                        <td className="px-5 py-3 text-center">
                          <span className={`text-xs font-medium px-2 py-1 rounded-md ${a.active ? "bg-green-50 text-[#1B5E20] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                            {a.active ? "Actif" : "Désactivé"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => toggleAdmin(a.id, a.active)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                              {a.active ? "Désactiver" : "Activer"}
                            </button>
                            <button onClick={() => deleteAdmin(a.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Supprimer</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-900 text-sm mb-4">Ajouter un compte</p>
                <form onSubmit={addAdmin} className="flex flex-wrap gap-3 items-end">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nom d&apos;utilisateur</label>
                    <input value={newAdmin.username} onChange={e => setNewAdmin(a => ({ ...a, username: e.target.value }))}
                      className="input-field w-44" placeholder="boucher2" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Mot de passe</label>
                    <input type="password" value={newAdmin.password} onChange={e => setNewAdmin(a => ({ ...a, password: e.target.value }))}
                      className="input-field w-44" required />
                  </div>
                  <button type="submit" className="bg-[#1B5E20] text-white text-sm py-2.5 px-5 rounded-lg font-medium hover:bg-[#145214] transition-colors">
                    Créer
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
