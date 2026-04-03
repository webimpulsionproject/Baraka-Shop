"use client";

import { useState, useEffect, useCallback } from "react";
import { categories } from "@/lib/data";
import type { ProductCategory } from "@/lib/data";
import Logo from "@/components/Logo";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = "dashboard" | "produits" | "commandes" | "clients" | "promotions" | "comptes";
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

interface DBPromoCode {
  id: number; code: string; type: string; value: number; label: string; active: boolean;
}

interface DBAdmin {
  id: number; username: string; displayName: string; role: string; active: boolean; createdAt: string;
}

// ── Constantes ────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<OrderStatus, string> = {
  "En attente":     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "En préparation": "bg-blue-50 text-blue-700 border border-blue-200",
  "Prête":          "bg-green-50 text-[#1B5E20] border border-green-200",
  "Livrée":         "bg-gray-50 text-gray-500 border border-gray-200",
  "Annulée":        "bg-red-50 text-red-600 border border-red-200",
};

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard",   label: "Dashboard",   icon: "⊞" },
  { id: "produits",    label: "Produits",    icon: "◈" },
  { id: "commandes",   label: "Commandes",   icon: "⊡" },
  { id: "clients",     label: "Clients",     icon: "◉" },
  { id: "promotions",  label: "Promotions",  icon: "◆" },
  { id: "comptes",     label: "Comptes",     icon: "◎" },
];

const EMPTY_PRODUCT = {
  name: "", price: "", promoPrice: "", weight: "", image: "",
  description: "", badge: "", category: "Bœuf & Veau" as ProductCategory,
  inStock: true, stock: "", origin: "", decoupeOptions: false,
};

const EMPTY_PROMO = { code: "", type: "percent" as "percent" | "fixed", value: "" };

// ── Login ─────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (name: string) => void }) {
  const [username, setUsername] = useState("");
  const [pw, setPw]             = useState("");
  const [err, setErr]           = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: pw }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Identifiants invalides"); return; }
      onLogin(data.displayName);
    } catch {
      setErr("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B5E20] to-[#0D3B13] flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1B5E20]/10 rounded-xl mb-4">
            <Logo size={36} />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900">Espace Boucher</h1>
          <p className="text-gray-400 text-sm mt-1">Baraka Shop — Accès professionnel</p>
          <div className="inline-flex items-center gap-1.5 bg-[#1B5E20]/8 border border-[#1B5E20]/15 text-[#1B5E20] text-xs font-semibold px-3 py-1 rounded-full mt-3 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-[#1B5E20] rounded-full" />
            Back-office
          </div>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 text-center">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setErr(""); }}
            className="input-field"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(""); }}
            className="input-field"
            autoComplete="current-password"
            required
          />
          <button type="submit" disabled={loading} className="btn-green w-full justify-center py-3.5 text-sm mt-1 disabled:opacity-60">
            {loading ? "Connexion..." : "Accéder au back-office"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-6">
          <Link href="/" className="hover:text-gray-500 transition-colors">
            Retour au site public →
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]           = useState(false);
  const [displayName, setDisplayName] = useState("Le Boucher");
  const [tab, setTab]                 = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data
  const [prods, setProds]     = useState<DBProduct[]>([]);
  const [orders, setOrders]   = useState<DBOrder[]>([]);
  const [codes, setCodes]     = useState<DBPromoCode[]>([]);
  const [admins, setAdmins]   = useState<DBAdmin[]>([]);
  const [loading, setLoading] = useState(false);

  // Formulaires
  const [showProdForm, setShowProdForm] = useState(false);
  const [editProd, setEditProd]         = useState<DBProduct | null>(null);
  const [prodForm, setProdForm]         = useState(EMPTY_PRODUCT);
  const [promoForm, setPromoForm]       = useState(EMPTY_PROMO);
  const [newAdmin, setNewAdmin]         = useState({ username: "", password: "", displayName: "" });

  // ── Chargement des données ──────────────────────────────────────────────────
  const loadProducts = useCallback(async () => {
    const r = await fetch("/api/admin/produits");
    setProds(await r.json());
  }, []);

  const loadOrders = useCallback(async () => {
    const r = await fetch("/api/admin/commandes");
    setOrders(await r.json());
  }, []);

  const loadCodes = useCallback(async () => {
    const r = await fetch("/api/promo-codes");
    setCodes(await r.json());
  }, []);

  const loadAdmins = useCallback(async () => {
    const r = await fetch("/api/admin/comptes");
    setAdmins(await r.json());
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadProducts();
    loadOrders();
    loadCodes();
    loadAdmins();
  }, [authed, loadProducts, loadOrders, loadCodes, loadAdmins]);

  // ── Déconnexion ────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  };

  // ── Produits ───────────────────────────────────────────────────────────────
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...prodForm };
    try {
      if (editProd) {
        await fetch(`/api/admin/produits/${editProd.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/produits", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      await loadProducts();
      setShowProdForm(false);
      setEditProd(null);
      setProdForm(EMPTY_PRODUCT);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await fetch(`/api/admin/produits/${id}`, { method: "DELETE" });
    await loadProducts();
  };

  const handleEditProduct = (p: DBProduct) => {
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

  // ── Commandes ──────────────────────────────────────────────────────────────
  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`/api/admin/commandes/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await loadOrders();
  };

  // ── Codes promo ────────────────────────────────────────────────────────────
  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const label = promoForm.type === "percent"
      ? `-${promoForm.value}% sur votre commande`
      : `-${promoForm.value}€ de réduction`;
    await fetch("/api/promo-codes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: promoForm.code.toUpperCase(), type: promoForm.type, value: promoForm.value, label }),
    });
    await loadCodes();
    setPromoForm(EMPTY_PROMO);
  };

  const handleDeletePromo = async (id: number) => {
    if (!confirm("Supprimer ce code ?")) return;
    await fetch(`/api/promo-codes/${id}`, { method: "DELETE" });
    await loadCodes();
  };

  // ── Comptes admin ──────────────────────────────────────────────────────────
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/comptes", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAdmin, role: "boucher" }),
    });
    await loadAdmins();
    setNewAdmin({ username: "", password: "", displayName: "" });
  };

  const handleToggleAdmin = async (id: number, active: boolean) => {
    await fetch(`/api/admin/comptes/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    await loadAdmins();
  };

  const handleDeleteAdmin = async (id: number) => {
    if (!confirm("Supprimer ce compte ?")) return;
    await fetch(`/api/admin/comptes/${id}`, { method: "DELETE" });
    await loadAdmins();
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  const todayCA     = todayOrders.reduce((s, o) => s + o.total, 0);
  const pending     = orders.filter((o) => o.status === "En attente").length;

  // Clients agrégés depuis les commandes
  const clientsMap = new Map<string, { name: string; email: string; phone: string; orders: number; total: number; since: string }>();
  for (const o of orders) {
    const existing = clientsMap.get(o.email);
    if (existing) {
      existing.orders++;
      existing.total += o.total;
    } else {
      clientsMap.set(o.email, {
        name: o.clientName, email: o.email, phone: o.phone || "—",
        orders: 1, total: o.total,
        since: new Date(o.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      });
    }
  }
  const clients = Array.from(clientsMap.values()).sort((a, b) => b.total - a.total);

  const promoProducts = prods.filter((p) => p.promoPrice && p.promoPrice < p.price);

  if (!authed) return <LoginScreen onLogin={(name) => { setDisplayName(name); setAuthed(true); }} />;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-56 bg-[#1B5E20] flex flex-col transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <Logo size={32} />
          <div>
            <p className="font-playfair text-sm font-bold text-white leading-tight">Baraka Shop</p>
            <p className="text-white/50 text-[10px]">Administration</p>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                tab === item.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/8 hover:text-white/90"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {item.id === "commandes" && pending > 0 && (
                <span className="ml-auto bg-[#E64A19] text-white text-[10px] font-bold rounded-full h-4 px-1.5 flex items-center">
                  {pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2 px-1">Connecté en tant que</p>
          <p className="text-white/80 text-xs font-semibold px-1 mb-3">{displayName}</p>
          <button
            onClick={handleLogout}
            className="w-full text-xs text-white/50 hover:text-white/80 transition-colors py-2 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-playfair text-xl font-bold text-gray-900">
              {NAV_ITEMS.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ← Voir le site
          </Link>
        </header>

        <main className="flex-1 p-6 overflow-auto">

          {/* ── Dashboard ── */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Commandes aujourd'hui", val: todayOrders.length, color: "text-[#1B5E20]" },
                  { label: "CA du jour",            val: `${todayCA.toFixed(2)} €`, color: "text-[#C9922A]" },
                  { label: "En attente",            val: pending,            color: "text-[#E64A19]" },
                  { label: "Produits actifs",       val: prods.filter((p) => p.inStock).length, color: "text-[#C62828]" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="font-semibold text-gray-900">Commandes récentes</h2>
                </div>
                {orders.length === 0 ? (
                  <p className="px-6 py-10 text-center text-gray-400 text-sm">Aucune commande pour l&apos;instant.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50/80">
                        <tr className="text-xs text-gray-500 uppercase tracking-wide">
                          <th className="px-5 py-3 text-left">N°</th>
                          <th className="px-5 py-3 text-left">Client</th>
                          <th className="px-5 py-3 text-right">Total</th>
                          <th className="px-5 py-3 text-center">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-gray-50/50">
                            <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.reference}</td>
                            <td className="px-5 py-3 font-medium text-gray-900">{o.clientName}</td>
                            <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                            <td className="px-5 py-3 text-center">
                              <span className={`text-xs font-medium px-2 py-1 rounded-md ${STATUS_COLORS[o.status as OrderStatus] || ""}`}>
                                {o.status}
                              </span>
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

          {/* ── Produits ── */}
          {tab === "produits" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{prods.length} produits</p>
                <button
                  onClick={() => { setShowProdForm((v) => !v); setEditProd(null); setProdForm(EMPTY_PRODUCT); }}
                  className="btn-primary text-sm py-2 px-5"
                >
                  {showProdForm && !editProd ? "Annuler" : "+ Ajouter un produit"}
                </button>
              </div>

              {showProdForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">
                    {editProd ? `Modifier — ${editProd.name}` : "Nouveau produit"}
                  </h3>
                  <form onSubmit={handleSaveProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Nom *</label>
                      <input value={prodForm.name} onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Prix (€) *</label>
                      <input type="number" step="0.01" value={prodForm.price} onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Prix promo (€)</label>
                      <input type="number" step="0.01" value={prodForm.promoPrice} onChange={(e) => setProdForm({ ...prodForm, promoPrice: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Catégorie</label>
                      <select value={prodForm.category} onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as ProductCategory })} className="input-field">
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Badge</label>
                      <select value={prodForm.badge} onChange={(e) => setProdForm({ ...prodForm, badge: e.target.value })} className="input-field">
                        <option value="">Aucun</option>
                        <option>Nouveau</option><option>Promo</option><option>Bestseller</option><option>Aïd</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Poids</label>
                      <input value={prodForm.weight} onChange={(e) => setProdForm({ ...prodForm, weight: e.target.value })} className="input-field" placeholder="env. 300g" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Stock</label>
                      <input type="number" value={prodForm.stock} onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })} className="input-field" placeholder="20" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Origine</label>
                      <input value={prodForm.origin} onChange={(e) => setProdForm({ ...prodForm, origin: e.target.value })} className="input-field" placeholder="France" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">URL Photo</label>
                      <input value={prodForm.image} onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })} className="input-field" placeholder="https://..." />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Description</label>
                      <textarea rows={2} value={prodForm.description} onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })} className="input-field resize-none" />
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="inStock" checked={prodForm.inStock} onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })} className="w-4 h-4 accent-[#1B5E20]" />
                      <label htmlFor="inStock" className="text-sm text-gray-700">En stock</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="decoupe" checked={prodForm.decoupeOptions} onChange={(e) => setProdForm({ ...prodForm, decoupeOptions: e.target.checked })} className="w-4 h-4 accent-[#1B5E20]" />
                      <label htmlFor="decoupe" className="text-sm text-gray-700">Options de découpe</label>
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                      <button type="submit" disabled={loading} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
                        {loading ? "Enregistrement..." : editProd ? "Enregistrer" : "Ajouter"}
                      </button>
                      <button type="button" onClick={() => { setShowProdForm(false); setEditProd(null); }} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">Produit</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Catégorie</th>
                        <th className="px-5 py-3 text-right">Prix</th>
                        <th className="px-5 py-3 text-center">Stock</th>
                        <th className="px-5 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {prods.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                              <div>
                                <span className="font-medium text-gray-900 text-sm block">{p.name}</span>
                                {p.badge && <span className="text-[10px] text-gray-400">{p.badge}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{p.category}</td>
                          <td className="px-5 py-3 text-right">
                            <span className="font-semibold text-[#1B5E20]">{p.price.toFixed(2)} €</span>
                            {p.promoPrice && <span className="block text-xs text-[#C62828]">Promo: {p.promoPrice.toFixed(2)} €</span>}
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${p.inStock ? "bg-green-50 text-[#1B5E20] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                              {p.inStock ? `En stock${p.stock ? ` (${p.stock})` : ""}` : "Rupture"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button onClick={() => handleEditProduct(p)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">Modifier</button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="text-xs text-[#E64A19] hover:text-[#BF360C] font-medium">Supprimer</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Commandes ── */}
          {tab === "commandes" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Commandes ({orders.length})</h2>
                <p className="text-sm text-gray-400">{pending} en attente</p>
              </div>
              {orders.length === 0 ? (
                <p className="px-6 py-10 text-center text-gray-400 text-sm">Aucune commande pour l&apos;instant.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">N°</th>
                        <th className="px-5 py-3 text-left">Client</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Date</th>
                        <th className="px-5 py-3 text-left hidden lg:table-cell">Articles</th>
                        <th className="px-5 py-3 text-right">Total</th>
                        <th className="px-5 py-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.reference}</td>
                          <td className="px-5 py-3">
                            <p className="font-medium text-gray-900 text-sm">{o.clientName}</p>
                            <p className="text-xs text-gray-400">{o.email}</p>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">
                            {new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs max-w-[180px] truncate hidden lg:table-cell">
                            {o.items.map((i) => `${i.name} x${i.qty}`).join(", ")}
                          </td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-center">
                            <select
                              value={o.status}
                              onChange={(e) => handleStatusChange(o.id, e.target.value)}
                              className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer outline-none ${STATUS_COLORS[o.status as OrderStatus] || ""}`}
                            >
                              {(["En attente","En préparation","Prête","Livrée","Annulée"] as OrderStatus[]).map((s) => (
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-semibold text-gray-900">Clients ({clients.length})</h2>
              </div>
              {clients.length === 0 ? (
                <p className="px-6 py-10 text-center text-gray-400 text-sm">Aucun client pour l&apos;instant.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">Nom</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Email</th>
                        <th className="px-5 py-3 text-left hidden lg:table-cell">Téléphone</th>
                        <th className="px-5 py-3 text-center">Commandes</th>
                        <th className="px-5 py-3 text-right">Total dépensé</th>
                        <th className="px-5 py-3 text-center hidden sm:table-cell">Depuis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {clients.map((c) => (
                        <tr key={c.email} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{c.email}</td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell">{c.phone}</td>
                          <td className="px-5 py-3 text-center font-semibold text-gray-800">{c.orders}</td>
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

          {/* ── Promotions ── */}
          {tab === "promotions" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Promotions Produits ({promoProducts.length})</h2>
                </div>
                {promoProducts.length === 0 ? (
                  <p className="px-6 py-10 text-center text-gray-400 text-sm">Aucun produit en promotion.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50/80">
                        <tr className="text-xs text-gray-500 uppercase tracking-wide">
                          <th className="px-5 py-3 text-left">Produit</th>
                          <th className="px-5 py-3 text-right">Prix normal</th>
                          <th className="px-5 py-3 text-right">Prix promo</th>
                          <th className="px-5 py-3 text-center">Remise</th>
                          <th className="px-5 py-3 text-left hidden md:table-cell">Fin promo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {promoProducts.map((p) => {
                          const discPct = Math.round(((p.price - p.promoPrice!) / p.price) * 100);
                          return (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3 font-medium text-gray-900 text-sm">{p.name}</td>
                              <td className="px-5 py-3 text-right text-gray-400 line-through text-xs">{p.price.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-right font-bold text-[#C62828]">{p.promoPrice!.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-center">
                                <span className="bg-[#C62828]/10 text-[#C62828] text-xs font-bold px-2 py-0.5 rounded-md">-{discPct}%</span>
                              </td>
                              <td className="px-5 py-3 text-xs text-gray-400 hidden md:table-cell">
                                {p.promoEndDate ? new Date(p.promoEndDate).toLocaleDateString("fr-FR") : "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="font-semibold text-gray-900">Codes Promotionnels ({codes.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">Code</th>
                        <th className="px-5 py-3 text-left">Description</th>
                        <th className="px-5 py-3 text-center">Type</th>
                        <th className="px-5 py-3 text-center">Valeur</th>
                        <th className="px-5 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {codes.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3">
                            <span className="font-mono font-bold text-[#1B5E20] bg-[#1B5E20]/8 px-2 py-1 rounded-md text-xs">{c.code}</span>
                          </td>
                          <td className="px-5 py-3 text-gray-500 text-xs">{c.label}</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${c.type === "percent" ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"}`}>
                              {c.type === "percent" ? "%" : "Fixe (€)"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center font-bold text-gray-900">
                            {c.type === "percent" ? `${c.value}%` : `${c.value} €`}
                          </td>
                          <td className="px-5 py-3 text-center">
                            <button onClick={() => handleDeletePromo(c.id)} className="text-xs text-[#E64A19] hover:text-[#BF360C] font-medium">Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Ajouter un code promo</h3>
                <form onSubmit={handleAddPromo} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Code *</label>
                    <input value={promoForm.code} onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })} className="input-field" placeholder="PROMO20" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Type</label>
                    <select value={promoForm.type} onChange={(e) => setPromoForm({ ...promoForm, type: e.target.value as "percent" | "fixed" })} className="input-field">
                      <option value="percent">Pourcentage (%)</option>
                      <option value="fixed">Montant fixe (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Valeur *</label>
                    <input type="number" step="0.01" min="0" value={promoForm.value} onChange={(e) => setPromoForm({ ...promoForm, value: e.target.value })} className="input-field" placeholder={promoForm.type === "percent" ? "10" : "5"} required />
                  </div>
                  <div className="sm:col-span-3">
                    <button type="submit" className="btn-promo text-sm py-2.5 px-6 justify-center">+ Créer le code</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── Comptes ── */}
          {tab === "comptes" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="font-semibold text-gray-900">Comptes administrateurs ({admins.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">Nom affiché</th>
                        <th className="px-5 py-3 text-left">Username</th>
                        <th className="px-5 py-3 text-center hidden md:table-cell">Rôle</th>
                        <th className="px-5 py-3 text-center">Statut</th>
                        <th className="px-5 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {admins.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-medium text-gray-900">{a.displayName}</td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-500">{a.username}</td>
                          <td className="px-5 py-3 text-center hidden md:table-cell">
                            <span className="bg-[#1B5E20]/8 text-[#1B5E20] text-xs font-medium px-2 py-0.5 rounded-md">{a.role}</span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${a.active ? "bg-green-50 text-[#1B5E20] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                              {a.active ? "Actif" : "Désactivé"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button onClick={() => handleToggleAdmin(a.id, a.active)} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                {a.active ? "Désactiver" : "Activer"}
                              </button>
                              <button onClick={() => handleDeleteAdmin(a.id)} className="text-xs text-[#E64A19] hover:text-[#BF360C] font-medium">Supprimer</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Ajouter un compte</h3>
                <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Nom affiché *</label>
                    <input value={newAdmin.displayName} onChange={(e) => setNewAdmin({ ...newAdmin, displayName: e.target.value })} className="input-field" placeholder="Le Boucher 2" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Username *</label>
                    <input value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} className="input-field" placeholder="boucher2" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Mot de passe *</label>
                    <input type="password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} className="input-field" required />
                  </div>
                  <div className="sm:col-span-3">
                    <button type="submit" className="btn-primary text-sm py-2.5 px-6">+ Créer le compte</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
