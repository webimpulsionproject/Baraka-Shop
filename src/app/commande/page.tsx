"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { promoCodes } from "@/lib/data";
import Footer from "@/components/Footer";

const SLOTS = ["9h00–9h30","9h30–10h00","10h00–10h30","14h00–14h30","15h00–15h30","16h00–16h30","17h00–17h30","18h00–18h30"];

export default function CommandePage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [slot, setSlot] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ label: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [ordered, setOrdered] = useState(false);

  const applyPromo = () => {
    const found = promoCodes.find(c => c.code.toUpperCase() === promoInput.trim().toUpperCase());
    if (!found) { setPromoError("Code invalide."); setAppliedPromo(null); return; }
    const discount = found.type === "percent" ? totalPrice * (found.value / 100) : Math.min(found.value, totalPrice);
    setAppliedPromo({ label: found.label, discount });
    setPromoError("");
  };

  const finalTotal = Math.max(0, totalPrice - (appliedPromo?.discount ?? 0));

  const handleOrder = () => {
    if (!slot) { alert("Veuillez choisir un créneau Click & Collect."); return; }
    setOrdered(true);
    clearCart();
  };

  if (ordered) return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="font-playfair text-2xl font-bold text-[#1B5E20] mb-3">Commande confirmée !</h1>
          <p className="text-gray-600 mb-2">Votre commande sera prête au créneau {slot}.</p>
          <p className="text-gray-500 text-sm mb-8">17 rue Corneille, Mons-en-Barœul</p>
          <Link href="/produits" className="btn-primary w-full justify-center">Continuer mes achats</Link>
        </div>
      </div>
      <Footer />
    </>
  );

  if (items.length === 0) return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="font-playfair text-2xl font-bold text-gray-800 mb-3">Votre commande est vide</h1>
          <p className="text-gray-500 mb-8">Ajoutez des produits depuis notre catalogue.</p>
          <Link href="/produits" className="btn-primary">Voir nos produits →</Link>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-playfair text-3xl font-bold text-gray-900">Ma commande <span className="text-[#E64A19] text-2xl">({totalItems})</span></h1>
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-[#E64A19] transition-colors">Vider</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-5">
              {/* Items */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image src={product.image} alt={product.name} fill unoptimized className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}{product.weight && ` · ${product.weight}`}</p>
                      <p className="text-[#1B5E20] font-bold text-sm mt-0.5">{product.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center">−</button>
                      <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center">+</button>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[70px]">
                      <p className="font-bold text-gray-900 text-sm">{(product.price * quantity).toFixed(2)} €</p>
                      <button onClick={() => removeItem(product.id)} className="text-gray-300 hover:text-[#E64A19] text-xs transition-colors">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Créneaux */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2">Click & Collect 🏪</h2>
                <p className="text-sm text-gray-500 mb-4">17 rue Corneille, Mons-en-Barœul — Prêt en 30 min</p>
                <p className="text-sm font-semibold text-gray-700 mb-3">Choisissez votre créneau :</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setSlot(s)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${slot === s ? "bg-[#1B5E20] text-white border-[#1B5E20]" : "border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20]"}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {slot && <p className="mt-3 text-sm text-[#1B5E20] font-medium">✓ Créneau : {slot}</p>}
              </div>

              {/* Code promo */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-4">Code promotionnel</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="BARAKA10, AID2025, BIENVENUE..."
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                    className="input-field flex-1"
                  />
                  <button onClick={applyPromo} className="btn-green text-sm px-5 py-0 flex-shrink-0">Appliquer</button>
                </div>
                {promoError && <p className="text-[#C62828] text-sm mt-2">{promoError}</p>}
                {appliedPromo && (
                  <div className="mt-2 flex items-center gap-2 text-[#1B5E20] text-sm font-medium bg-green-50 px-3 py-2 rounded-lg">
                    <span>✓</span>
                    <span>{appliedPromo.label} — Réduction : {appliedPromo.discount.toFixed(2)} €</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-5">Récapitulatif</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-[#1B5E20]">
                      <span>Réduction</span>
                      <span className="font-semibold">-{appliedPromo.discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Click & Collect</span>
                    <span className="font-semibold text-[#1B5E20]">Gratuit</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total TTC</span>
                    <span className="font-bold text-xl text-[#1B5E20]">{finalTotal.toFixed(2)} €</span>
                  </div>
                </div>
                <button onClick={handleOrder} className="btn-primary w-full justify-center text-base py-4 mb-4">
                  Valider ma commande →
                </button>
                <p className="text-xs text-gray-400 text-center mb-4">Paiement en boutique</p>
                <div className="flex flex-col gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">🔒 Commande sécurisée</div>
                  <div className="flex items-center gap-2">☪ Produits 100% Halal certifiés</div>
                  <div className="flex items-center gap-2">🥩 Viandes fraîches du jour</div>
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
