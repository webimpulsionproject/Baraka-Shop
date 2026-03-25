"use client";
import { useState, useEffect } from "react";

const MESSAGES = [
  "🔥 Épaule d'Agneau -17% cette semaine",
  "⚡ Offre du jour : Merguez Maison 500g à 7,90€ au lieu de 9,50€",
  "🐑 Packs Aïd el-Adha disponibles — Réservez maintenant",
  "🎁 -10% sur votre première commande avec le code BARAKA10",
  "⏰ Click & Collect disponible en 30 min — Commandez maintenant",
];

export default function PromoTopBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const closed = localStorage.getItem("promo-bar-closed");
    if (closed === "1") setVisible(false);
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem("promo-bar-closed", "1");
  };

  if (!visible) return null;

  return (
    <div className="bg-[#C62828] text-white text-sm h-10 flex items-center overflow-hidden relative">
      {/* Marquee */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...MESSAGES, ...MESSAGES].map((msg, i) => (
            <span key={i} className="inline-block font-medium px-2">{msg}</span>
          ))}
        </div>
      </div>
      {/* Close */}
      <button
        onClick={close}
        className="flex-shrink-0 px-3 hover:bg-black/10 h-full flex items-center transition-colors"
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
