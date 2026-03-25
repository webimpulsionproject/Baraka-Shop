"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Consent = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
};

const STORAGE_KEY = "baraka-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (consent: Omit<Consent, "necessary" | "timestamp">) => {
    const full: Consent = {
      necessary: true,
      ...consent,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
    } catch { /* ignore */ }
    setVisible(false);
  };

  const acceptAll = () => save({ functional: true, analytics: true });
  const rejectAll = () => save({ functional: false, analytics: false });
  const saveChoice = () => save({ functional, analytics });

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 inset-x-0 z-[9999] bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {!expanded ? (
          /* ── Vue compacte ── */
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">Nous utilisons des cookies</span>{" "}
                pour améliorer votre expérience, mémoriser votre panier et analyser notre trafic.
                Conformément au{" "}
                <abbr title="Règlement Général sur la Protection des Données">RGPD</abbr> et aux
                recommandations de la{" "}
                <abbr title="Commission Nationale de l'Informatique et des Libertés">CNIL</abbr>,
                votre consentement est requis.{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="text-[#1B5E20] underline underline-offset-2 hover:text-[#2E7D32] font-medium"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setExpanded(true)}
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2 px-1"
              >
                Paramétrer
              </button>
              <button
                onClick={rejectAll}
                className="text-sm border border-gray-300 text-gray-700 hover:border-gray-400 px-4 py-2 rounded-xl transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={acceptAll}
                className="text-sm bg-[#1B5E20] text-white hover:bg-[#2E7D32] px-5 py-2 rounded-xl font-medium transition-colors"
              >
                Tout accepter
              </button>
            </div>
          </div>
        ) : (
          /* ── Vue détaillée ── */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-playfair font-bold text-gray-900 text-lg">
                Paramétrer mes préférences
              </h2>
              <button
                onClick={() => setExpanded(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                aria-label="Réduire"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {/* Nécessaires */}
              <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">Cookies nécessaires</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Indispensables au fonctionnement du site : panier, session, sécurité. Ne peuvent
                    pas être désactivés.
                  </p>
                </div>
                <span className="flex-shrink-0 mt-0.5 text-xs font-semibold text-[#1B5E20] bg-[#1B5E20]/10 px-2.5 py-1 rounded-full">
                  Toujours actif
                </span>
              </div>

              {/* Fonctionnels */}
              <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">Cookies fonctionnels</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Mémorisent vos préférences (langue, ville, fermeture des bannières) pour une
                    meilleure expérience.
                  </p>
                </div>
                <label className="flex-shrink-0 mt-0.5 inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={functional}
                    onChange={(e) => setFunctional(e.target.checked)}
                  />
                  <div className="relative w-10 h-5 bg-gray-300 peer-checked:bg-[#1B5E20] rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">Cookies d'analyse</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Mesure d'audience anonyme pour comprendre comment vous utilisez le site et
                    améliorer nos services. Aucune donnée vendue à des tiers.
                  </p>
                </div>
                <label className="flex-shrink-0 mt-0.5 inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                  <div className="relative w-10 h-5 bg-gray-300 peer-checked:bg-[#1B5E20] rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end border-t border-gray-100 pt-4">
              <button
                onClick={rejectAll}
                className="text-sm border border-gray-300 text-gray-700 hover:border-gray-400 px-4 py-2 rounded-xl transition-colors"
              >
                Tout refuser
              </button>
              <button
                onClick={saveChoice}
                className="text-sm bg-[#1B5E20] text-white hover:bg-[#2E7D32] px-5 py-2 rounded-xl font-medium transition-colors"
              >
                Enregistrer mes choix
              </button>
              <button
                onClick={acceptAll}
                className="text-sm bg-[#E64A19] text-white hover:bg-[#BF360C] px-5 py-2 rounded-xl font-medium transition-colors"
              >
                Tout accepter
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Vous pouvez modifier vos préférences à tout moment via notre{" "}
              <Link href="/politique-de-confidentialite" className="underline hover:text-gray-600">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
