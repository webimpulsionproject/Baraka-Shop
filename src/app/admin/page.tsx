"use client";

import { useState, useEffect } from "react";
import { products as initialProducts, Product, ProductCategory, categories, promoCodes as initialPromoCodes, PromoCode } from "@/lib/data";
import Logo from "@/components/Logo";
import Link from "next/link";

type Tab = "dashboard" | "produits" | "commandes" | "clients" | "promotions";
type OrderStatus = "En attente" | "En préparation" | "Prête" | "Livrée" | "Annulée";

interface Order {
  id: string; client: string; date: string;
  items: string; total: number; status: OrderStatus; mode: string;
}

const MOCK_ORDERS: Order[] = [
  { id: "#BS-042", client: "Ahmed Benali",   date: "25 mars 2025", items: "Entrecôte x2, Merguez x1",         total: 74.70, status: "Livrée",         mode: "Click & Collect" },
  { id: "#BS-041", client: "Fatima Karimi",  date: "25 mars 2025", items: "Gigot d'Agneau x1",               total: 45.80, status: "En préparation", mode: "Click & Collect" },
  { id: "#BS-040", client: "Youssef Martin", date: "24 mars 2025", items: "Colis BBQ x1, Brochettes x2",     total: 87.70, status: "Prête",           mode: "Click & Collect" },
  { id: "#BS-039", client: "Sara Dupont",    date: "24 mars 2025", items: "Poulet Fermier x2, Épices x1",    total: 30.70, status: "En attente",      mode: "Click & Collect" },
  { id: "#BS-038", client: "Karim Alaoui",   date: "23 mars 2025", items: "Côte de Bœuf x1",                total: 32.50, status: "Livrée",           mode: "Click & Collect" },
  { id: "#BS-037", client: "Nadia Brahim",   date: "23 mars 2025", items: "Côtelettes d'Agneau x3",          total: 74.70, status: "Livrée",           mode: "Click & Collect" },
  { id: "#BS-036", client: "Omar Chakir",    date: "22 mars 2025", items: "Brochettes x2, Kefta x1",         total: 54.70, status: "Livrée",           mode: "Click & Collect" },
  { id: "#BS-035", client: "Leila Mansour",  date: "22 mars 2025", items: "Blanc de Poulet x2",              total: 27.80, status: "Livrée",           mode: "Click & Collect" },
];

const MOCK_CLIENTS = [
  { name: "Ahmed Benali",   email: "ahmed@exemple.fr",   tel: "06 11 22 33 44", orders: 8,  total: 412.50, since: "Jan 2024" },
  { name: "Fatima Karimi",  email: "fatima@exemple.fr",  tel: "06 55 66 77 88", orders: 5,  total: 256.30, since: "Fév 2024" },
  { name: "Youssef Martin", email: "youssef@exemple.fr", tel: "07 00 11 22 33", orders: 12, total: 634.80, since: "Oct 2023" },
  { name: "Sara Dupont",    email: "sara@exemple.fr",    tel: "06 99 88 77 66", orders: 3,  total: 98.40,  since: "Mar 2025" },
  { name: "Karim Alaoui",   email: "karim@exemple.fr",   tel: "07 44 55 66 77", orders: 7,  total: 378.20, since: "Nov 2023" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  "En attente":      "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "En préparation":  "bg-blue-50 text-blue-700 border border-blue-200",
  "Prête":           "bg-green-50 text-[#1B5E20] border border-green-200",
  "Livrée":          "bg-gray-50 text-gray-500 border border-gray-200",
  "Annulée":         "bg-red-50 text-red-600 border border-red-200",
};

const EMPTY_PRODUCT = {
  name: "", price: "", originalPrice: "", category: "Bœuf & Veau" as ProductCategory,
  weight: "", image: "", description: "", badge: "",
};

const EMPTY_PROMO = { code: "", type: "percent" as "percent" | "fixed", value: "", maxUses: "", expiry: "" };

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard",   label: "Dashboard",    icon: "📊" },
  { id: "produits",    label: "Produits",     icon: "🥩" },
  { id: "commandes",   label: "Commandes",    icon: "📦" },
  { id: "clients",     label: "Clients",      icon: "👥" },
  { id: "promotions",  label: "Promotions",   icon: "🔥" },
];

// ── Login guard ───────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@barakashop.fr" && pw === "admin123") {
      localStorage.setItem("baraka-admin", "true");
      onLogin();
    } else {
      setErr(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B5E20] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-7">
          <div className="flex justify-center mb-3"><Logo size={52} /></div>
          <h1 className="font-playfair text-2xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-500 text-sm mt-1">Baraka Shop — Accès réservé</p>
        </div>
        {err && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            Identifiants incorrects.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="admin@barakashop.fr"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErr(false); }}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            className="input-field"
            required
          />
          <button type="submit" className="btn-green w-full justify-center py-3 mt-1">
            Accéder au back-office
          </button>
        </form>
        <p className="text-center text-xs text-gray-300 mt-6">
          <Link href="/connexion" className="hover:text-gray-500 transition-colors">
            ← Retour à la connexion client
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Admin layout ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [prods, setProds] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codes, setCodes] = useState<PromoCode[]>(initialPromoCodes);
  const [promoForm, setPromoForm] = useState(EMPTY_PROMO);

  useEffect(() => {
    if (localStorage.getItem("baraka-admin") === "true") setAuthed(true);
  }, []);

  // Charger les commandes réelles depuis la DB dès que connecté
  useEffect(() => {
    if (!authed) return;
    fetch("/api/commandes")
      .then((r) => r.json())
      .then((data: Array<{
        id: number; reference: string; clientName: string;
        createdAt: string; items: Array<{ name: string; qty: number }>;
        total: number; status: string; mode: string;
      }>) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const mapped: Order[] = data.map((o) => ({
          id: o.reference,
          client: o.clientName,
          date: new Date(o.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
          items: o.items.map((i) => `${i.name} x${i.qty}`).join(", "),
          total: o.total,
          status: (o.status as OrderStatus) || "En attente",
          mode: o.mode === "click-collect" ? "Click & Collect" : "Livraison",
        }));
        setOrders(mapped);
      })
      .catch(() => { /* garde les MOCK_ORDERS en fallback */ });
  }, [authed]);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const handleLogout = () => {
    localStorage.removeItem("baraka-admin");
    setAuthed(false);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const newProd: Product = {
      id: Date.now(),
      name: form.name,
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),
      category: form.category,
      price: parseFloat(form.price),
      promoPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      weight: form.weight || undefined,
      image: form.image || "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&h=300&fit=crop",
      description: form.description,
      badge: (form.badge as Product["badge"]) || undefined,
      isHalal: true,
      inStock: true,
    };
    setProds((p) => [newProd, ...p]);
    setForm(EMPTY_PRODUCT);
    setShowForm(false);
  };

  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.code || !promoForm.value) return;
    const newCode: PromoCode = {
      code: promoForm.code.toUpperCase(),
      type: promoForm.type,
      value: parseFloat(promoForm.value),
      label: promoForm.type === "percent" ? `-${promoForm.value}% sur votre commande` : `-${promoForm.value}€ de réduction`,
    };
    setCodes(prev => [newCode, ...prev]);
    setPromoForm(EMPTY_PROMO);
  };

  const changeStatus = (id: string, status: OrderStatus) =>
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));

  const todayOrders = orders.filter((o) => o.date.includes("25 mars"));
  const todayCA = todayOrders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "En attente").length;
  const promoProducts = prods.filter(p => p.promoPrice && p.promoPrice < p.price);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-56 bg-[#1B5E20] flex flex-col transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <Logo size={32} />
          <div>
            <p className="font-playfair text-sm font-bold text-white leading-tight">Baraka Shop</p>
            <p className="text-white/50 text-[10px]">Administration</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                tab === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white/90"
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

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
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
        {/* Top bar */}
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

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">

          {/* ── Dashboard ── */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { icon: "📦", label: "Commandes aujourd'hui", val: todayOrders.length, color: "text-[#1B5E20]" },
                  { icon: "💶", label: "CA du jour",            val: `${todayCA.toFixed(2)} €`, color: "text-[#C9922A]" },
                  { icon: "⏳", label: "En attente",            val: pending,            color: "text-[#E64A19]" },
                  { icon: "🥩", label: "Produits actifs",       val: prods.filter((p) => p.inStock).length, color: "text-[#C62828]" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="text-2xl mb-3">{s.icon}</div>
                    <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                    <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="font-semibold text-gray-900">Commandes récentes</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50/80">
                      <tr className="text-xs text-gray-500 uppercase tracking-wide">
                        <th className="px-5 py-3 text-left">N°</th>
                        <th className="px-5 py-3 text-left">Client</th>
                        <th className="px-5 py-3 text-left hidden md:table-cell">Articles</th>
                        <th className="px-5 py-3 text-right">Total</th>
                        <th className="px-5 py-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/50">
                          <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                          <td className="px-5 py-3 font-medium text-gray-900">{o.client}</td>
                          <td className="px-5 py-3 text-gray-400 text-xs max-w-[200px] truncate hidden md:table-cell">{o.items}</td>
                          <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${STATUS_COLORS[o.status]}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Produits ── */}
          {tab === "produits" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{prods.length} produits</p>
                <button onClick={() => setShowForm((v) => !v)} className="btn-primary text-sm py-2 px-5">
                  {showForm ? "Annuler" : "+ Ajouter un produit"}
                </button>
              </div>

              {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Nouveau produit</h3>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Nom *</label>
                      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Entrecôte Charolaise" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Prix (€) *</label>
                      <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="28.90" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Prix promo (€)</label>
                      <input type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input-field" placeholder="24.90" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Catégorie</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })} className="input-field">
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Poids</label>
                      <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" placeholder="env. 300 g" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Badge</label>
                      <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="input-field">
                        <option value="">Aucun</option>
                        <option>Nouveau</option><option>Promo</option><option>Bestseller</option><option>Aïd</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">URL Photo</label>
                      <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Description</label>
                      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" placeholder="Description courte" />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                      <button type="submit" className="btn-primary text-sm py-2.5 px-6">Ajouter</button>
                      <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
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
                        <th className="px-5 py-3 text-center hidden lg:table-cell">Poids</th>
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
                              <span className="font-medium text-gray-900 truncate max-w-[160px] text-sm">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{p.category}</td>
                          <td className="px-5 py-3 text-right font-semibold text-[#1B5E20]">{p.price.toFixed(2)} €</td>
                          <td className="px-5 py-3 text-center text-gray-400 text-xs hidden lg:table-cell">{p.weight || "—"}</td>
                          <td className="px-5 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-md ${p.inStock ? "bg-green-50 text-[#1B5E20] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                              {p.inStock ? "En stock" : "Rupture"}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Modifier</button>
                              <button
                                onClick={() => setProds((prev) => prev.filter((x) => x.id !== p.id))}
                                className="text-xs text-[#E64A19] hover:text-[#BF360C] font-medium"
                              >
                                Supprimer
                              </button>
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/80">
                    <tr className="text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-5 py-3 text-left">N°</th>
                      <th className="px-5 py-3 text-left">Client</th>
                      <th className="px-5 py-3 text-left hidden md:table-cell">Date</th>
                      <th className="px-5 py-3 text-left hidden lg:table-cell">Articles</th>
                      <th className="px-5 py-3 text-right">Total</th>
                      <th className="px-5 py-3 text-center hidden sm:table-cell">Mode</th>
                      <th className="px-5 py-3 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                        <td className="px-5 py-3 font-medium text-gray-900 text-sm">{o.client}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{o.date}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs max-w-[180px] truncate hidden lg:table-cell">{o.items}</td>
                        <td className="px-5 py-3 text-right font-semibold text-gray-900">{o.total.toFixed(2)} €</td>
                        <td className="px-5 py-3 text-center text-xs text-gray-400 hidden sm:table-cell">{o.mode}</td>
                        <td className="px-5 py-3 text-center">
                          <select
                            value={o.status}
                            onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                            className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer outline-none ${STATUS_COLORS[o.status]}`}
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
            </div>
          )}

          {/* ── Clients ── */}
          {tab === "clients" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="font-semibold text-gray-900">Clients ({MOCK_CLIENTS.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50/80">
                    <tr className="text-xs text-gray-500 uppercase tracking-wide">
                      <th className="px-5 py-3 text-left">Nom</th>
                      <th className="px-5 py-3 text-left hidden md:table-cell">Email</th>
                      <th className="px-5 py-3 text-left hidden lg:table-cell">Téléphone</th>
                      <th className="px-5 py-3 text-center">Commandes</th>
                      <th className="px-5 py-3 text-right">Total dépensé</th>
                      <th className="px-5 py-3 text-center hidden sm:table-cell">Membre depuis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {MOCK_CLIENTS.map((c) => (
                      <tr key={c.email} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs hidden md:table-cell">{c.email}</td>
                        <td className="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell">{c.tel}</td>
                        <td className="px-5 py-3 text-center font-semibold text-gray-800">{c.orders}</td>
                        <td className="px-5 py-3 text-right font-semibold text-[#1B5E20]">{c.total.toFixed(2)} €</td>
                        <td className="px-5 py-3 text-center text-gray-400 text-xs hidden sm:table-cell">{c.since}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Promotions ── */}
          {tab === "promotions" && (
            <div className="space-y-6">

              {/* Promo produits */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Promotions Produits ({promoProducts.length})</h2>
                  <span className="text-xs text-gray-400">Produits avec prix promo actif</span>
                </div>
                {promoProducts.length === 0 ? (
                  <div className="px-6 py-10 text-center text-gray-400 text-sm">Aucun produit en promotion actuellement.</div>
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
                          <th className="px-5 py-3 text-center">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {promoProducts.map((p) => {
                          const discPct = Math.round(((p.price - p.promoPrice!) / p.price) * 100);
                          return (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100" />
                                  <span className="font-medium text-gray-900 text-sm truncate max-w-[150px]">{p.name}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3 text-right text-gray-400 line-through text-xs">{p.price.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-right font-bold text-[#C62828]">{p.promoPrice!.toFixed(2)} €</td>
                              <td className="px-5 py-3 text-center">
                                <span className="bg-[#C62828]/10 text-[#C62828] text-xs font-bold px-2 py-0.5 rounded-md">-{discPct}%</span>
                              </td>
                              <td className="px-5 py-3 text-xs text-gray-400 hidden md:table-cell">
                                {p.promoEndDate ? new Date(p.promoEndDate).toLocaleDateString("fr-FR") : "—"}
                              </td>
                              <td className="px-5 py-3 text-center">
                                <span className="bg-green-50 text-[#1B5E20] border border-green-200 text-xs font-medium px-2 py-0.5 rounded-md">Active</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Codes promo */}
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
                        <tr key={c.code} className="hover:bg-gray-50/50">
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
                            <button
                              onClick={() => setCodes(prev => prev.filter(x => x.code !== c.code))}
                              className="text-xs text-[#E64A19] hover:text-[#BF360C] font-medium"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ajouter un code */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Ajouter un code promo</h3>
                <form onSubmit={handleAddPromo} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Code *</label>
                    <input
                      value={promoForm.code}
                      onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                      className="input-field"
                      placeholder="PROMO20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Type</label>
                    <select
                      value={promoForm.type}
                      onChange={(e) => setPromoForm({ ...promoForm, type: e.target.value as "percent" | "fixed" })}
                      className="input-field"
                    >
                      <option value="percent">Pourcentage (%)</option>
                      <option value="fixed">Montant fixe (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
                      Valeur * {promoForm.type === "percent" ? "(%)" : "(€)"}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={promoForm.value}
                      onChange={(e) => setPromoForm({ ...promoForm, value: e.target.value })}
                      className="input-field"
                      placeholder={promoForm.type === "percent" ? "10" : "5"}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Utilisations max</label>
                    <input
                      type="number"
                      value={promoForm.maxUses}
                      onChange={(e) => setPromoForm({ ...promoForm, maxUses: e.target.value })}
                      className="input-field"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">Date d&apos;expiration</label>
                    <input
                      type="date"
                      value={promoForm.expiry}
                      onChange={(e) => setPromoForm({ ...promoForm, expiry: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="btn-promo text-sm py-3 w-full justify-center">
                      + Créer le code
                    </button>
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
