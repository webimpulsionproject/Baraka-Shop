"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { promoCodes } from "@/lib/data";
import Footer from "@/components/Footer";

const SLOTS = ["9h00–9h30","9h30–10h00","10h00–10h30","14h00–14h30","15h00–15h30","16h00–16h30","17h00–17h30","18h00–18h30"];

export default function CommandePage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  // Infos client
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Commande
  const [slot, setSlot] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ label: string; discount: number; code: string } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Pré-remplir depuis localStorage si connecté
  useEffect(() => {
    try {
      const stored = localStorage.getItem("baraka-user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name) setClientName(u.name);
        if (u.email) setClientEmail(u.email);
        if (u.tel) setClientPhone(u.tel);
      }
    } catch { /* ignore */ }
  }, []);

  const applyPromo = () => {
    const found = promoCodes.find(c => c.code.toUpperCase() === promoInput.trim().toUpperCase());
    if (!found) { setPromoError("Code invalide."); setAppliedPromo(null); return; }
    const discount = found.type === "percent"
      ? totalPrice * (found.value / 100)
      : Math.min(found.value, totalPrice);
    setAppliedPromo({ label: found.label, discount, code: found.code });
    setPromoError("");
  };

  const finalTotal = Math.max(0, totalPrice - (appliedPromo?.discount ?? 0));

  const handleOrder = async () => {
    if (!clientName.trim()) { setOrderError("Veuillez indiquer votre nom."); return; }
    if (!clientEmail.trim()) { setOrderError("Veuillez indiquer votre email."); return; }
    if (!slot) { setOrderError("Veuillez choisir un créneau Click & Collect."); return; }
    setOrderError("");
    setLoading(true);

    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          email: clientEmail.trim(),
          phone: clientPhone.trim(),
          mode: "click-collect",
          slot,
          total: finalTotal,
          discount: appliedPromo?.discount ?? 0,
          promoCode: appliedPromo?.code ?? null,
          items: items.map(({ product, quantity }) => ({
            productId: product.id,
            name: product.name,
            price: product.price,
            qty: quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      const order = await res.json();
      setOrderRef(order.reference);
      clearCart();
      setOrdered(true);
    } catch {
      setOrderError("Une erreur est survenue. Veuillez réessayer ou nous appeler au 09 52 29 13 06.");
    } finally {
      setLoading(false);
    }
  };

  if (ordered) return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-playfair text-2xl font-bold text-[#1B5E20] mb-3">Commande confirmée !</h1>
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Référence</p>
            <p className="font-mono text-lg font-bold text-gray-900">{orderRef}</p>
          </div>
          <p className="text-gray-600 mb-1">Votre commande sera prête au créneau <strong>{slot}</strong>.</p>
          <p className="text-gray-500 text-sm mb-2">17 rue Corneille, 59370 Mons-en-Barœul</p>
          <p className="text-gray-400 text-xs mb-8">Un récapitulatif vous sera communiqué en boutique.</p>
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
            <h1 className="font-playfair text-3xl font-bold text-gray-900">
              Ma commande <span className="text-[#E64A19] text-2xl">({totalItems})</span>
            </h1>
            <button onClick={clearCart} className="text-sm text-gray-400 hover:text-[#E64A19] transition-colors">
              Vider
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-5">
              {/* Articles */}
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

              {/* Informations client */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-4">
                  Vos informations <span className="text-[#E64A19] text-sm font-normal ml-1">*</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Nom complet *</label>
                    <input
                      type="text"
                      placeholder="Ahmed Benali"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Téléphone</label>
                    <input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      placeholder="vous@exemple.fr"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Créneaux Click & Collect */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-playfair text-lg font-bold text-gray-900 mb-2">Click & Collect 🏪</h2>
                <p className="text-sm text-gray-500 mb-4">17 rue Corneille, Mons-en-Barœul — Prêt en 30 min</p>
                <p className="text-sm font-semibold text-gray-700 mb-3">Choisissez votre créneau :</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SLOTS.map((s) => (
                    <button key={s} onClick={() => setSlot(s)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                        slot === s
                          ? "bg-[#1B5E20] text-white border-[#1B5E20]"
                          : "border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20]"
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
                {slot && <p className="mt-3 text-sm text-[#1B5E20] font-medium">✓ Créneau sélectionné : {slot}</p>}
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
                  <button onClick={applyPromo} className="btn-green text-sm px-5 py-0 flex-shrink-0">
                    Appliquer
                  </button>
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

            {/* Right: récapitulatif */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-5">Récapitulatif</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                    <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-[#1B5E20]">
                      <span>Réduction ({appliedPromo.code})</span>
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

                {orderError && (
                  <div className="mb-4 text-sm text-[#C62828] bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                    {orderError}
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="btn-primary w-full justify-center text-base py-4 mb-4 disabled:opacity-60"
                >
                  {loading ? "Validation…" : "Valider ma commande →"}
                </button>
                <p className="text-xs text-gray-400 text-center mb-4">Paiement en boutique à la collecte</p>
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
