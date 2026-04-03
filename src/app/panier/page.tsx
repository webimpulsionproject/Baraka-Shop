"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import Footer from "@/components/Footer";

const SLOTS = [
  "9h00–9h30", "9h30–10h00", "10h00–10h30", "10h30–11h00",
  "14h00–14h30", "15h00–15h30", "16h00–16h30", "17h00–17h30",
  "18h00–18h30", "19h00–19h30",
];

// Jours disponibles : aujourd'hui + 6 prochains jours (sauf lundi)
function getAvailableDays() {
  const days: { label: string; date: Date }[] = [];
  const today = new Date();
  let d = new Date(today);
  while (days.length < 6) {
    if (d.getDay() !== 1) { // 1 = lundi (fermé)
      days.push({
        label: d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }),
        date: new Date(d),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

type Mode = "collect" | "livraison";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [mode, setMode]       = useState<Mode>("collect");
  const [day, setDay]         = useState("");
  const [slot, setSlot]       = useState("");
  const [address, setAddress] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const deliveryFee = mode === "livraison" ? (totalPrice >= 50 ? 0 : 3) : 0;
  const total       = totalPrice + deliveryFee;
  const days        = getAvailableDays();

  const handleOrder = () => {
    setFieldError(null);
    if (mode === "collect" && !day) {
      setFieldError("Veuillez choisir un jour.");
      return;
    }
    if (mode === "collect" && !slot) {
      setFieldError("Veuillez choisir un créneau horaire.");
      return;
    }
    if (mode === "livraison" && !address.trim()) {
      setFieldError("Veuillez saisir votre adresse de livraison.");
      return;
    }
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <>
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
            <div className="w-14 h-14 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-playfair text-2xl font-bold text-[#1B5E20] mb-3">
              Commande confirmée
            </h1>
            <p className="text-gray-600 mb-2">
              {mode === "collect"
                ? `Votre commande sera prête le ${day} au créneau ${slot} — 17 rue Corneille, Mons-en-Barœul.`
                : `Votre commande sera livrée au ${address}.`}
            </p>
            <p className="text-gray-400 text-sm mb-8">Un email de confirmation vous sera envoyé.</p>
            <Link href="/produits" className="btn-primary w-full justify-center">
              Continuer mes achats
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="font-playfair text-2xl font-bold text-gray-800 mb-3">Votre panier est vide</h1>
            <p className="text-gray-500 mb-8">Ajoutez des produits depuis notre catalogue.</p>
            <Link href="/produits" className="btn-primary">
              Voir nos produits →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-playfair text-3xl font-bold text-gray-900">
              Mon Panier{" "}
              <span className="text-[#C9922A] text-2xl">({totalItems})</span>
            </h1>
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-[#E64A19] transition-colors">
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: items + delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}{product.weight && ` · ${product.weight}`}</p>
                      <p className="text-[#1B5E20] font-bold text-sm mt-0.5">{product.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[70px]">
                      <p className="font-bold text-gray-900 text-sm">{(product.price * quantity).toFixed(2)} €</p>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-gray-300 hover:text-[#E64A19] text-xs mt-1 transition-colors"
                        aria-label="Supprimer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode livraison */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-4">Mode de récupération</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {(["collect", "livraison"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setFieldError(null); }}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        mode === m
                          ? "border-[#1B5E20] bg-[#1B5E20]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {m === "collect" ? (
                          <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17H5a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m2 4v6m0 0l-3-3m3 3l3-3M17 8h4" />
                          </svg>
                        )}
                        <p className="font-semibold text-gray-900 text-sm">
                          {m === "collect" ? "Click & Collect" : "Livraison à domicile"}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {m === "collect" ? "Prêt en 30 min — Gratuit" : "Zone locale — Gratuit dès 50 €"}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Click & Collect : sélection jour + créneau */}
                {mode === "collect" && (
                  <div className="space-y-4">
                    {/* Choix du jour */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Choisissez un jour :</p>
                      <div className="flex flex-wrap gap-2">
                        {days.map((d) => (
                          <button
                            key={d.label}
                            onClick={() => { setDay(d.label); setSlot(""); setFieldError(null); }}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              day === d.label
                                ? "bg-[#1B5E20] text-white border-[#1B5E20]"
                                : "border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choix du créneau */}
                    {day && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Choisissez un créneau :</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {SLOTS.map((s) => (
                            <button
                              key={s}
                              onClick={() => { setSlot(s); setFieldError(null); }}
                              className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                                slot === s
                                  ? "bg-[#1B5E20] text-white border-[#1B5E20]"
                                  : "border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {day && slot && (
                      <div className="flex items-center gap-2 text-sm text-[#1B5E20] font-medium bg-[#1B5E20]/5 border border-[#1B5E20]/20 px-4 py-2.5 rounded-lg">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {day} · {slot} — 17 rue Corneille, Mons-en-Barœul
                      </div>
                    )}
                  </div>
                )}

                {/* Livraison : adresse */}
                {mode === "livraison" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse de livraison
                    </label>
                    <input
                      type="text"
                      placeholder="12 rue de la Paix, 59370 Mons-en-Barœul"
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); setFieldError(null); }}
                      className="input-field"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">Zone : Mons-en-Barœul et communes limitrophes</p>
                  </div>
                )}

                {/* Inline error */}
                {fieldError && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {fieldError}
                  </div>
                )}
              </div>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-5">Récapitulatif</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                    <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Livraison</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? "text-[#1B5E20]" : "text-gray-900"}`}>
                      {deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total TTC</span>
                    <span className="font-bold text-xl text-[#1B5E20]">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="btn-green w-full justify-center text-sm py-4 mb-4"
                >
                  Passer la commande →
                </button>

                <p className="text-xs text-gray-400 text-center mb-4">
                  Paiement en boutique ou à la livraison
                </p>

                <div className="flex flex-col gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Commande sécurisée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Tous les produits Halal certifiés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Viandes fraîches du jour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
