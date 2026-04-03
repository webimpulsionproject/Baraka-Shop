"use client";
import { useState, useEffect } from "react";

const BASE_MESSAGES = [
  "Premiere commande : -10% avec le code BARAKA10",
  "Viande halal certifiee — fraicheur quotidienne garantie",
  "Boucherie Baraka Shop — 17 rue Corneille, Mons-en-Baroeul",
];

const AID_MESSAGES = [
  "Mode Aid el-Adha — Packs Mouton entier disponibles, stocks limites !",
  "Aid Mubarak — Reservez votre agneau des maintenant",
  "Decoupe sur mesure pour l'Aid — Service premium avec emballage sous vide",
];

const RAMADAN_MESSAGES = [
  "Ramadan Mubarak — Promotions speciales tout le mois",
  "Livraison express pour vos repas du Ftour",
  "Brochettes, Merguez et Kefta Maison — Parfaits pour le Ramadan",
];

export default function PromoTopBar() {
  const [visible, setVisible]   = useState(true);
  const [messages, setMessages] = useState(BASE_MESSAGES);
  const [barColor, setBarColor] = useState("#1A1A1A");

  useEffect(() => {
    if (localStorage.getItem("promo-bar-closed") === "1") setVisible(false);

    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((s) => {
        if (s.mode_aid === "true") {
          setMessages([...AID_MESSAGES, ...BASE_MESSAGES]);
          setBarColor("#8B4513");
        } else if (s.mode_ramadan === "true") {
          setMessages([...RAMADAN_MESSAGES, ...BASE_MESSAGES]);
          setBarColor("#1B3A6B");
        }
      })
      .catch(() => {});
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem("promo-bar-closed", "1");
  };

  if (!visible) return null;

  return (
    <div className="text-white/80 h-9 flex items-center overflow-hidden relative transition-colors" style={{ backgroundColor: barColor }}>
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 40s linear infinite" }}>
          {[...messages, ...messages].map((msg, i) => (
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
