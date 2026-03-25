"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

type Tab = "commandes" | "infos" | "adresses";

interface UserData {
  name: string;
  email: string;
  tel?: string;
  adresse?: string;
}

const MOCK_ORDERS = [
  {
    id: "#BS-2024-042",
    date: "20 mars 2025",
    items: ["Entrecôte Charolaise x2", "Merguez Artisanales x1"],
    total: 74.7,
    status: "Livrée",
    mode: "Livraison",
  },
  {
    id: "#BS-2024-038",
    date: "14 mars 2025",
    items: ["Gigot d'Agneau Entier x1", "Côtelettes d'Agneau x2"],
    total: 72.7,
    status: "Livrée",
    mode: "Click & Collect",
  },
  {
    id: "#BS-2024-031",
    date: "5 mars 2025",
    items: ["Colis Barbecue Premium x1", "Poulet Fermier Entier x2"],
    total: 73.7,
    status: "Livrée",
    mode: "Click & Collect",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "En attente": "bg-yellow-100 text-yellow-700",
  "En préparation": "bg-blue-100 text-blue-700",
  Prête: "bg-[#1A6B47]/10 text-[#1A6B47]",
  Livrée: "bg-gray-100 text-gray-600",
};

export default function ComptePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [tab, setTab] = useState<Tab>("commandes");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("baraka-user");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("baraka-user");
    router.push("/");
  };

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
              Accès réservé
            </h1>
            <p className="text-gray-500 mb-8">Connectez-vous pour accéder à votre compte.</p>
            <Link href="/connexion" className="btn-orange">
              Se connecter →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "commandes", label: "Mes commandes", icon: "📦" },
    { id: "infos", label: "Mes informations", icon: "👤" },
    { id: "adresses", label: "Mes adresses", icon: "📍" },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F3] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-gray-900">
                Bonjour, {user.name} 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-[#E8401C] border border-gray-200 hover:border-[#E8401C] px-4 py-2 rounded-xl transition-all"
            >
              Déconnexion
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-[#1A6B47] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-[#1A6B47] hover:text-[#1A6B47]"
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Commandes */}
          {tab === "commandes" && (
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-400 mt-0.5">{order.date} · {order.mode}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                      <span className="font-bold text-[#1A6B47]">{order.total.toFixed(2)} €</span>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {order.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-[#C9922A]">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {MOCK_ORDERS.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center">
                  <p className="text-gray-500">Aucune commande pour l&apos;instant.</p>
                  <Link href="/catalogue" className="btn-orange mt-4 inline-flex">
                    Commander →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab: Infos */}
          {tab === "infos" && (
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-lg">
              <h2 className="font-playfair text-xl font-bold text-gray-900 mb-6">Mes informations</h2>
              <div className="space-y-4">
                {[
                  { label: "Nom complet", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Téléphone", value: user.tel || "Non renseigné" },
                  { label: "Adresse", value: user.adresse || "Non renseignée" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">{f.label}</span>
                    <span className="text-gray-900 font-medium">{f.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/inscription" className="btn-green mt-8 inline-flex text-sm">
                Modifier mes informations
              </Link>
            </div>
          )}

          {/* Tab: Adresses */}
          {tab === "adresses" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">Adresse principale</p>
                  <span className="text-xs bg-[#1A6B47]/10 text-[#1A6B47] px-2 py-1 rounded-full font-medium">
                    Par défaut
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {user.adresse || "17 rue Corneille, 59370 Mons-en-Barœul"}
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#E8401C] font-medium text-sm hover:underline">
                + Ajouter une adresse
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
