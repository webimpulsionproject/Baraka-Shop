"use client";

import { useState } from "react";
import { products as initialProducts, Product, ProductCategory, categories } from "@/lib/products";

type Tab = "dashboard" | "produits" | "commandes" | "clients";
type OrderStatus = "En attente" | "En préparation" | "Prête" | "Livrée";

interface Order {
  id: string;
  client: string;
  date: string;
  items: string;
  total: number;
  status: OrderStatus;
  mode: string;
}

const MOCK_ORDERS: Order[] = [
  { id: "#BS-042", client: "Ahmed Benali", date: "25 mars 2025", items: "Entrecôte x2, Merguez x1", total: 74.7, status: "Livrée", mode: "Livraison" },
  { id: "#BS-041", client: "Fatima Karimi", date: "25 mars 2025", items: "Gigot d'Agneau x1", total: 45.8, status: "En préparation", mode: "Click & Collect" },
  { id: "#BS-040", client: "Youssef Martin", date: "24 mars 2025", items: "Colis BBQ x1, Brochettes x2", total: 87.7, status: "Prête", mode: "Click & Collect" },
  { id: "#BS-039", client: "Sara Dupont", date: "24 mars 2025", items: "Poulet Fermier x2, Épices x1", total: 30.7, status: "En attente", mode: "Livraison" },
  { id: "#BS-038", client: "Karim Alaoui", date: "23 mars 2025", items: "Côte de Bœuf x1", total: 32.5, status: "Livrée", mode: "Click & Collect" },
  { id: "#BS-037", client: "Nadia Brahim", date: "23 mars 2025", items: "Côtelettes d'Agneau x3", total: 74.7, status: "Livrée", mode: "Livraison" },
  { id: "#BS-036", client: "Omar Chakir", date: "22 mars 2025", items: "Brochettes Maison x2, Kefta x1", total: 54.7, status: "Livrée", mode: "Click & Collect" },
  { id: "#BS-035", client: "Leila Mansour", date: "22 mars 2025", items: "Blanc de Poulet x2", total: 27.8, status: "Livrée", mode: "Livraison" },
];

const MOCK_CLIENTS = [
  { name: "Ahmed Benali", email: "ahmed@exemple.fr", tel: "06 11 22 33 44", orders: 8, total: 412.5, since: "Jan 2024" },
  { name: "Fatima Karimi", email: "fatima@exemple.fr", tel: "06 55 66 77 88", orders: 5, total: 256.3, since: "Fév 2024" },
  { name: "Youssef Martin", email: "youssef@exemple.fr", tel: "07 00 11 22 33", orders: 12, total: 634.8, since: "Oct 2023" },
  { name: "Sara Dupont", email: "sara@exemple.fr", tel: "06 99 88 77 66", orders: 3, total: 98.4, since: "Mar 2025" },
  { name: "Karim Alaoui", email: "karim@exemple.fr", tel: "07 44 55 66 77", orders: 7, total: 378.2, since: "Nov 2023" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  "En attente": "bg-yellow-100 text-yellow-700",
  "En préparation": "bg-blue-100 text-blue-700",
  "Prête": "bg-green-100 text-green-700",
  "Livrée": "bg-gray-100 text-gray-500",
};

const EMPTY_PRODUCT = {
  name: "", price: "", originalPrice: "", category: "Bœuf & Veau" as ProductCategory,
  weight: "", image: "", description: "", badge: "",
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [prods, setProds] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === "baraka2024") { setAuth(true); setPwError(false); }
    else setPwError(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const newProd: Product = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
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

  const changeStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#1A6B47] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h1 className="font-playfair text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-500 text-sm mt-1">Baraka Shop — Accès réservé</p>
          </div>
          {pwError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
              Mot de passe incorrect.
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Mot de passe administrateur"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="input-field"
              required
            />
            <button type="submit" className="btn-green w-full justify-center py-3">
              Accéder au back-office
            </button>
          </form>
        </div>
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "produits", label: "Produits", icon: "🥩" },
    { id: "commandes", label: "Commandes", icon: "📦" },
    { id: "clients", label: "Clients", icon: "👥" },
  ];

  const todayOrders = orders.filter((o) => o.date.includes("25 mars")).length;
  const todayCA = orders.filter((o) => o.date.includes("25 mars")).reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "En attente").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-[#1A6B47] text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥩</span>
          <span className="font-playfair text-lg font-bold">Baraka Shop</span>
          <span className="text-white/50 mx-2">|</span>
          <span className="text-white/80 text-sm">Administration</span>
        </div>
        <button
          onClick={() => setAuth(false)}
          className="text-white/70 hover:text-white text-sm transition-colors"
        >
          Déconnexion
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-[#E8401C] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#E8401C] hover:text-[#E8401C]"
              }`}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ── Dashboard ── */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "📦", label: "Commandes aujourd'hui", val: todayOrders, color: "text-[#1A6B47]" },
                { icon: "💶", label: "CA du jour", val: `${todayCA.toFixed(2)} €`, color: "text-[#C9922A]" },
                { icon: "⏳", label: "En attente", val: pending, color: "text-yellow-600" },
                { icon: "🥩", label: "Produits actifs", val: prods.filter((p) => p.inStock).length, color: "text-[#E8401C]" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-playfair text-xl font-bold text-gray-900 mb-4">Commandes récentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase border-b">
                      <th className="pb-3 text-left">N°</th>
                      <th className="pb-3 text-left">Client</th>
                      <th className="pb-3 text-left">Articles</th>
                      <th className="pb-3 text-right">Total</th>
                      <th className="pb-3 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id}>
                        <td className="py-3 font-mono text-xs text-gray-500">{o.id}</td>
                        <td className="py-3 font-medium text-gray-900">{o.client}</td>
                        <td className="py-3 text-gray-500 max-w-[200px] truncate">{o.items}</td>
                        <td className="py-3 text-right font-bold text-gray-900">{o.total.toFixed(2)} €</td>
                        <td className="py-3 text-center">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[o.status]}`}>
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-playfair text-xl font-bold text-gray-900">
                Produits ({prods.length})
              </h2>
              <button
                onClick={() => setShowForm((v) => !v)}
                className="btn-green text-sm py-2 px-5"
              >
                {showForm ? "Annuler" : "+ Ajouter un produit"}
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-5">Nouveau produit</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Entrecôte Charolaise" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€) *</label>
                    <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="28.90" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix barré (€)</label>
                    <input type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input-field" placeholder="32.90" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })} className="input-field">
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poids/Unité</label>
                    <input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="input-field" placeholder="env. 300 g" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                    <select value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="input-field">
                      <option value="">Aucun</option>
                      <option value="Nouveau">Nouveau</option>
                      <option value="Promo">Promo</option>
                      <option value="Bestseller">Bestseller</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Photo</label>
                    <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" placeholder="Description courte du produit" />
                  </div>
                  <div className="sm:col-span-2 flex gap-3">
                    <button type="submit" className="btn-orange py-2.5 px-6 text-sm">Ajouter le produit</button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline-white border-gray-300 text-gray-600 hover:bg-gray-50 py-2.5 px-6 text-sm">Annuler</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-gray-500 text-xs uppercase">
                      <th className="px-4 py-3 text-left">Produit</th>
                      <th className="px-4 py-3 text-left">Catégorie</th>
                      <th className="px-4 py-3 text-right">Prix</th>
                      <th className="px-4 py-3 text-center">Poids</th>
                      <th className="px-4 py-3 text-center">Stock</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {prods.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            <span className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{p.category}</td>
                        <td className="px-4 py-3 text-right font-bold text-[#1A6B47]">{p.price.toFixed(2)} €</td>
                        <td className="px-4 py-3 text-center text-gray-400 text-xs">{p.weight || "—"}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {p.inStock ? "En stock" : "Rupture"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Modifier</button>
                            <button
                              onClick={() => setProds((prev) => prev.filter((x) => x.id !== p.id))}
                              className="text-xs text-[#E8401C] hover:text-[#C43516] font-medium"
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-playfair text-xl font-bold text-gray-900">
                Commandes ({orders.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-gray-500 text-xs uppercase">
                    <th className="px-4 py-3 text-left">N°</th>
                    <th className="px-4 py-3 text-left">Client</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Articles</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-center">Mode</th>
                    <th className="px-4 py-3 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{o.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{o.client}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{o.date}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate text-xs">{o.items}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{o.total.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500">{o.mode}</td>
                      <td className="px-4 py-3 text-center">
                        <select
                          value={o.status}
                          onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[o.status]}`}
                        >
                          {(["En attente", "En préparation", "Prête", "Livrée"] as OrderStatus[]).map((s) => (
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
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-playfair text-xl font-bold text-gray-900">
                Clients ({MOCK_CLIENTS.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-gray-500 text-xs uppercase">
                    <th className="px-4 py-3 text-left">Nom</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Téléphone</th>
                    <th className="px-4 py-3 text-center">Commandes</th>
                    <th className="px-4 py-3 text-right">Total dépensé</th>
                    <th className="px-4 py-3 text-center">Membre depuis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_CLIENTS.map((c) => (
                    <tr key={c.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                      <td className="px-4 py-3 text-gray-500">{c.email}</td>
                      <td className="px-4 py-3 text-gray-500">{c.tel}</td>
                      <td className="px-4 py-3 text-center font-semibold text-gray-800">{c.orders}</td>
                      <td className="px-4 py-3 text-right font-bold text-[#1A6B47]">{c.total.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-center text-gray-400 text-xs">{c.since}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
