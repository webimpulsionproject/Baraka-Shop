"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="font-playfair text-xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                  <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
                  <button onClick={() => setSent(false)} className="btn-green mt-6 text-sm">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                      <input value={form.name} onChange={set("name")} className="input-field" placeholder="Votre nom" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                      <input value={form.phone} onChange={set("phone")} className="input-field" placeholder="06 12 34 56 78" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={set("email")} className="input-field" placeholder="vous@exemple.fr" required />
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
                  <p className="text-xs text-gray-400 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées
                    par Baraka Shop pour répondre à votre demande, conformément à notre{" "}
                    <Link href="/politique-de-confidentialite" className="text-[#1B5E20] underline hover:text-[#2E7D32]">
                      politique de confidentialité
                    </Link>
                    . Vos données ne sont pas transmises à des tiers.
                  </p>
                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    Envoyer →
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                {[
                  { icon: "📍", title: "Adresse", val: "17 rue Corneille\n59370 Mons-en-Barœul" },
                  { icon: "📞", title: "Téléphone", val: "09 52 29 13 06" },
                  { icon: "✉️", title: "Email", val: "contact.barakashop@gmail.com" },
                  { icon: "🕐", title: "Horaires", val: "Mar–Sam : 8h30–20h00\nDim : 9h30–20h00\nLun : Fermé" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1B5E20]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-600 text-sm mt-0.5 whitespace-pre-line">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5!2d3.1!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+rue+Corneille+Mons-en-Bar%C5%93ul!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Baraka Shop"
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
