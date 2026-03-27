"use client";
import { useState, useEffect } from "react";

const MESSAGES = [
  "Epaule d'Agneau — 17% de remise cette semaine",
  "Offre du jour : Merguez Maison 500g a 7,90 € au lieu de 9,50 €",
  "Packs Aid el-Adha disponibles — Reservez maintenant, stocks limites",
  "Premiere commande : -10% avec le code BARAKA10",
  "Click & Collect disponible en 30 minutes — Commandez en ligne",
];

export default function PromoTopBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("promo-bar-closed") === "1") setVisible(false);
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem("promo-bar-closed", "1");
  };

  if (!visible) return null;

  return (
    <div className="bg-[#1A1A1A] text-white/70 h-9 flex items-center overflow-hidden relative">
      <div className="flex-1 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 35s linear infinite" }}
        >
          {[...MESSAGES, ...MESSAGES].map((msg, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8 text-xs tracking-wide">
              <span className="w-1 h-1 rounded-full bg-[#C9922A] flex-shrink-0" />
              {msg}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={close}
        className="flex-shrink-0 px-4 hover:bg-white/5 h-full flex items-center transition-colors"
        aria-label="Fermer"
      >
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
