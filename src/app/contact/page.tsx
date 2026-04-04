"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [form, setForm]       = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => { setForm((p) => ({ ...p, [k]: e.target.value })); setError(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="font-playfair text-4xl font-bold text-[#1B5E20]">Nous Contacter</h1>
            <p className="text-gray-500 mt-2">Une question ? Un renseignement ? Écrivez-nous.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-[#1B5E20]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                  <p className="text-gray-500 text-sm">Nous vous répondrons dans les plus brefs délais à <strong>{form.email}</strong>.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="btn-green mt-6 text-sm"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                      <input
                        value={form.name}
                        onChange={set("name")}
                        className="input-field"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        className="input-field"
                        placeholder="06 12 34 56 78"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className="input-field"
                      placeholder="vous@exemple.fr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet</label>
                    <select value={form.subject} onChange={set("subject")} className="input-field">
                      <option value="">Sélectionner…</option>
                      <option>Commande / Click & Collect</option>
                      <option>Livraison à domicile</option>
                      <option>Produits & disponibilités</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Votre message…"
                      required
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {error}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées
                    par Baraka Shop conformément à notre{" "}
                    <Link href="/politique-de-confidentialite" className="text-[#1B5E20] underline hover:text-[#2E7D32]">
                      politique de confidentialité
                    </Link>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours…
                      </span>
                    ) : "Envoyer →"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                {[
                  {
                    title: "Adresse",
                    val: "17 rue Corneille\n59370 Mons-en-Barœul",
                    icon: (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Téléphone",
                    val: "09 52 29 13 06",
                    icon: (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Email",
                    val: "contact.barakashop@gmail.com",
                    icon: (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Horaires",
                    val: "Mar–Sam : 8h30–20h00\nDim : 9h30–20h00\nLun : Fermé",
                    icon: (
                      <svg className="w-5 h-5 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1B5E20]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 whitespace-pre-line">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <iframe
                  src="https://maps.google.com/maps?q=17+rue+Corneille,+59370+Mons-en-Baroeul,+France&output=embed&hl=fr&z=17"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Baraka Shop — 17 rue Corneille, Mons-en-Barœul"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
