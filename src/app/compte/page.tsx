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

const STATUS_COLORS: Record<string, string> = {
  "En attente":     "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "En préparation": "bg-blue-50 text-blue-700 border border-blue-200",
  "Prête":          "bg-[#1B5E20]/8 text-[#1B5E20] border border-[#1B5E20]/20",
  "Livrée":         "bg-gray-100 text-gray-500 border border-gray-200",
  "Annulée":        "bg-red-50 text-red-600 border border-red-200",
};

const TABS: { id: Tab; label: string }[] = [
  { id: "commandes", label: "Mes commandes" },
  { id: "infos",     label: "Mes informations" },
  { id: "adresses",  label: "Mes adresses" },
];

export default function ComptePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [tab, setTab]   = useState<Tab>("commandes");
  const [editMode, setEditMode]   = useState(false);
  const [editForm, setEditForm]   = useState<UserData | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("baraka-user");
      if (stored) {
        const parsed = JSON.parse(stored) as UserData;
        setUser(parsed);
        setEditForm(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("baraka-user");
    router.push("/");
  };

  const handleSaveInfos = () => {
    if (!editForm) return;
    localStorage.setItem("baraka-user", JSON.stringify(editForm));
    setUser(editForm);
    setEditMode(false);
  };

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-3">Accès réservé</h1>
            <p className="text-gray-500 mb-8">Connectez-vous pour accéder à votre compte.</p>
            <Link href="/connexion" className="btn-primary">
              Se connecter →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-gray-900">
                  Bonjour, {user.name}
                </h1>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-[#E64A19] border border-gray-200 hover:border-[#E64A19] px-4 py-2 rounded-xl transition-all"
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
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-[#1B5E20] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Commandes */}
          {tab === "commandes" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 className="font-semibold text-gray-900 mb-2">Historique des commandes</h2>
              <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                Vos commandes apparaîtront ici une fois la base de données connectée.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/produits" className="btn-primary text-sm">
                  Commander maintenant →
                </Link>
                <Link href="/panier" className="btn-outline text-sm">
                  Mon panier
                </Link>
              </div>
              {/* Status reference */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">Statuts de commande</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(STATUS_COLORS).map(([status, cls]) => (
                    <span key={status} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
                      {status}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Infos */}
          {tab === "infos" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-xl font-bold text-gray-900">Mes informations</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-sm text-[#1B5E20] font-medium hover:underline"
                  >
                    Modifier
                  </button>
                )}
              </div>

              {editMode && editForm ? (
                <div className="space-y-4">
                  {(["name", "email", "tel", "adresse"] as (keyof UserData)[]).map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {field === "name" ? "Nom complet" : field === "email" ? "Email" : field === "tel" ? "Téléphone" : "Adresse"}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={editForm[field] ?? ""}
                        onChange={(e) => setEditForm((p) => p ? { ...p, [field]: e.target.value } : p)}
                        className="input-field"
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleSaveInfos} className="btn-green text-sm">
                      Enregistrer
                    </button>
                    <button
                      onClick={() => { setEditMode(false); setEditForm(user); }}
                      className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-200 rounded-lg transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {[
                    { label: "Nom complet", value: user.name },
                    { label: "Email",       value: user.email },
                    { label: "Téléphone",   value: user.tel || "Non renseigné" },
                    { label: "Adresse",     value: user.adresse || "Non renseignée" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{f.label}</span>
                      <span className={`font-medium ${!f.value.startsWith("Non") ? "text-gray-900" : "text-gray-400 italic"}`}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Adresses */}
          {tab === "adresses" && (
            <div className="space-y-4">
              {user.adresse ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">Adresse principale</p>
                    <span className="text-xs bg-[#1B5E20]/8 text-[#1B5E20] border border-[#1B5E20]/20 px-2.5 py-1 rounded-full font-medium">
                      Par défaut
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{user.adresse}</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                  <p className="text-gray-400 text-sm mb-4">Aucune adresse enregistrée.</p>
                  <button
                    onClick={() => setTab("infos")}
                    className="btn-outline text-sm"
                  >
                    Ajouter une adresse →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick links */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
            <Link href="/produits" className="text-sm text-[#1B5E20] hover:underline font-medium">
              Voir nos produits →
            </Link>
            <Link href="/panier" className="text-sm text-[#C9922A] hover:underline font-medium">
              Mon panier →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
