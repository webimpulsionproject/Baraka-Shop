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

type Mode = "collect" | "livraison";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [mode, setMode] = useState<Mode>("collect");
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [ordered, setOrdered] = useState(false);

  const deliveryFee = mode === "livraison" ? (totalPrice >= 50 ? 0 : 3) : 0;
  const total = totalPrice + deliveryFee;

  const handleOrder = () => {
    if (mode === "collect" && !slot) {
      alert("Veuillez choisir un créneau horaire.");
      return;
    }
    if (mode === "livraison" && !address.trim()) {
      alert("Veuillez saisir votre adresse de livraison.");
      return;
    }
    setOrdered(true);
    clearCart();
  };

  if (ordered) {
    return (
      <>
        <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="font-playfair text-2xl font-bold text-[#1A6B47] mb-3">
              Commande confirmée !
            </h1>
            <p className="text-gray-600 mb-2">
              {mode === "collect"
                ? `Votre commande sera prête au créneau ${slot} au 17 rue Corneille.`
                : `Votre commande sera livrée au ${address}.`}
            </p>
            <p className="text-gray-500 text-sm mb-8">Un email de confirmation vous sera envoyé.</p>
            <Link href="/catalogue" className="btn-orange w-full justify-center">
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
        <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="font-playfair text-2xl font-bold text-gray-800 mb-3">Votre panier est vide</h1>
            <p className="text-gray-500 mb-8">Ajoutez des produits depuis notre catalogue.</p>
            <Link href="/catalogue" className="btn-orange">
              Voir le catalogue →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F3] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-playfair text-3xl font-bold text-gray-900">
              Mon Panier{" "}
              <span className="text-[#E8401C] text-2xl">({totalItems})</span>
            </h1>
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-[#E8401C] transition-colors">
              Vider le panier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: items + delivery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
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
                      <p className="text-[#1A6B47] font-bold text-sm mt-0.5">{product.price.toFixed(2)} €</p>
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
                        className="text-gray-300 hover:text-[#E8401C] text-xs mt-1 transition-colors"
                        aria-label="Supprimer"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mode livraison */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-4">Mode de récupération</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {(["collect", "livraison"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        mode === m
                          ? "border-[#1A6B47] bg-[#1A6B47]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">{m === "collect" ? "🏪" : "🚚"}</div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {m === "collect" ? "Click & Collect" : "Livraison à domicile"}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {m === "collect" ? "Prêt en 30 min — Gratuit" : "Zone locale — Gratuit dès 50 €"}
                      </p>
                    </button>
                  ))}
                </div>

                {mode === "collect" && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-3">Choisissez votre créneau :</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                            slot === s
                              ? "bg-[#1A6B47] text-white border-[#1A6B47]"
                              : "border-gray-200 text-gray-700 hover:border-[#1A6B47] hover:text-[#1A6B47]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {slot && (
                      <p className="mt-3 text-sm text-[#1A6B47] font-medium">
                        ✓ Créneau sélectionné : {slot} — 17 rue Corneille, Mons-en-Barœul
                      </p>
                    )}
                  </div>
                )}

                {mode === "livraison" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse de livraison
                    </label>
                    <input
                      type="text"
                      placeholder="12 rue de la Paix, 59370 Mons-en-Barœul"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-field"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">Zone de livraison : Mons-en-Barœul et communes limitrophes</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-5">Récapitulatif</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                    <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Livraison</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? "text-[#1A6B47]" : "text-gray-900"}`}>
                      {deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total TTC</span>
                    <span className="font-bold text-xl text-[#1A6B47]">{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  className="btn-orange w-full justify-center text-base py-4 mb-4"
                >
                  Passer la commande →
                </button>

                <p className="text-xs text-gray-400 text-center mb-4">
                  Paiement en boutique ou à la livraison
                </p>

                <div className="flex flex-col gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>🔒</span>
                    <span>Commande sécurisée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>☪</span>
                    <span>Tous les produits sont Halal certifiés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🥩</span>
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
