import Link from "next/link";
import Footer from "@/components/Footer";
import ResetCookiesButton from "@/components/ResetCookiesButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Baraka Shop",
  description: "Politique de confidentialité et protection des données personnelles de Baraka Shop, conformément au RGPD.",
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="font-playfair text-xl font-bold text-[#1B5E20] mb-3 pb-2 border-b border-gray-100">{title}</h2>
    <div className="text-gray-600 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function PolitiqueConfidentialitePage() {
  const updated = "25 mars 2026";
  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Header */}
        <div className="bg-[#1B5E20] py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Légal · RGPD</p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
              Politique de Confidentialité
            </h1>
            <p className="text-white/70 text-sm">
              Mise à jour le {updated} — Baraka Shop s'engage à protéger vos données personnelles.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Sommaire */}
          <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Sommaire</p>
            <ol className="space-y-1.5">
              {[
                ["responsable", "1. Responsable du traitement"],
                ["donnees", "2. Données collectées"],
                ["finalites", "3. Finalités et bases légales"],
                ["conservation", "4. Durée de conservation"],
                ["droits", "5. Vos droits (RGPD)"],
                ["cookies", "6. Politique de cookies"],
                ["tiers", "7. Partage avec des tiers"],
                ["securite", "8. Sécurité des données"],
                ["contact-dpo", "9. Contact et réclamations"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-[#1B5E20] hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            <Section id="responsable" title="1. Responsable du traitement">
              <p>
                Le responsable du traitement de vos données personnelles est :{" "}
                <strong className="text-gray-900">Baraka Shop</strong>, entreprise individuelle.
              </p>
              <ul className="list-none space-y-1">
                <li><strong>Adresse :</strong> 17 rue Corneille, 59370 Mons-en-Barœul, France</li>
                <li><strong>Téléphone :</strong> 09 52 29 13 06</li>
                <li><strong>Email :</strong>{" "}
                  <a href="mailto:contact.barakashop@gmail.com" className="text-[#1B5E20] underline">
                    contact.barakashop@gmail.com
                  </a>
                </li>
              </ul>
            </Section>

            <Section id="donnees" title="2. Données collectées">
              <p>Nous collectons les données suivantes, uniquement lorsque vous nous les fournissez :</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold text-gray-700">Donnée</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Collectée lors de</th>
                      <th className="text-left p-3 font-semibold text-gray-700">Obligatoire ?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ["Nom & Prénom", "Inscription, commande", "Oui"],
                      ["Adresse email", "Inscription, contact", "Oui"],
                      ["Numéro de téléphone", "Inscription, commande", "Non"],
                      ["Adresse de livraison", "Commande avec livraison", "Oui si livraison"],
                      ["Historique de commandes", "Passation de commande", "Oui"],
                      ["Messages envoyés", "Formulaire de contact", "Oui"],
                      ["Données de navigation (cookies)", "Visite du site (avec consentement)", "Non"],
                    ].map(([d, c, o]) => (
                      <tr key={d} className="bg-white">
                        <td className="p-3 text-gray-900">{d}</td>
                        <td className="p-3 text-gray-600">{c}</td>
                        <td className="p-3">{o === "Oui" ? <span className="text-red-600 font-medium">{o}</span> : <span className="text-gray-500">{o}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Nous ne collectons <strong>jamais</strong> de données bancaires directement — les paiements
                éventuels sont gérés par des prestataires certifiés PCI-DSS.
              </p>
            </Section>

            <Section id="finalites" title="3. Finalités et bases légales">
              <p>Nous traitons vos données pour les finalités suivantes :</p>
              <ul className="space-y-2">
                {[
                  ["Gestion des commandes (Click & Collect)", "Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Création et gestion de votre compte", "Exécution du contrat (art. 6.1.b RGPD)"],
                  ["Réponse à vos messages de contact", "Intérêt légitime (art. 6.1.f RGPD)"],
                  ["Envoi d'informations sur nos promotions (si accord)", "Consentement (art. 6.1.a RGPD)"],
                  ["Amélioration du site (analyse de trafic anonyme)", "Consentement (art. 6.1.a RGPD)"],
                  ["Respect de nos obligations légales et comptables", "Obligation légale (art. 6.1.c RGPD)"],
                ].map(([f, b]) => (
                  <li key={f} className="flex gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#1B5E20] mt-1.5" />
                    <span><strong className="text-gray-800">{f}</strong> — {b}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="conservation" title="4. Durée de conservation">
              <p>Vos données sont conservées uniquement le temps nécessaire :</p>
              <ul className="space-y-1.5">
                {[
                  ["Données de compte client", "3 ans après la dernière activité"],
                  ["Données de commandes", "10 ans (obligation comptable légale)"],
                  ["Messages de contact", "1 an après clôture de la demande"],
                  ["Données de navigation (cookies analytiques)", "13 mois maximum (recommandation CNIL)"],
                  ["Cookies fonctionnels", "6 mois"],
                ].map(([d, d2]) => (
                  <li key={d} className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-800 font-medium">{d}</span>
                    <span className="text-gray-500 text-right">{d2}</span>
                  </li>
                ))}
              </ul>
              <p>À l'expiration de ces délais, vos données sont supprimées ou anonymisées.</p>
            </Section>

            <Section id="droits" title="5. Vos droits (RGPD)">
              <p>
                Conformément au Règlement Européen 2016/679 (RGPD) et à la loi Informatique et Libertés,
                vous disposez des droits suivants sur vos données :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "👁", right: "Droit d'accès", desc: "Obtenir une copie de vos données personnelles détenues." },
                  { icon: "✏️", right: "Droit de rectification", desc: "Faire corriger des données inexactes ou incomplètes." },
                  { icon: "🗑", right: "Droit à l'effacement", desc: "Demander la suppression de vos données (« droit à l'oubli »)." },
                  { icon: "⏸", right: "Droit à la limitation", desc: "Suspendre temporairement le traitement de vos données." },
                  { icon: "📦", right: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré et lisible." },
                  { icon: "🚫", right: "Droit d'opposition", desc: "Vous opposer au traitement fondé sur l'intérêt légitime ou à des fins de prospection." },
                  { icon: "🔔", right: "Retrait du consentement", desc: "Retirer votre consentement à tout moment, sans rétroactivité." },
                  { icon: "📋", right: "Droit de réclamation", desc: "Introduire une plainte auprès de la CNIL (www.cnil.fr)." },
                ].map((r) => (
                  <div key={r.right} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{r.icon} {r.right}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#1B5E20]/5 border border-[#1B5E20]/20 rounded-xl p-4">
                <p className="font-semibold text-[#1B5E20] text-sm mb-1">Comment exercer vos droits ?</p>
                <p>
                  Envoyez votre demande par email à{" "}
                  <a href="mailto:contact.barakashop@gmail.com" className="text-[#1B5E20] underline font-medium">
                    contact.barakashop@gmail.com
                  </a>{" "}
                  en précisant l'objet « Exercice de droit RGPD » et en joignant une copie de votre
                  pièce d'identité. Nous répondrons sous <strong>30 jours</strong>.
                </p>
              </div>
            </Section>

            <Section id="cookies" title="6. Politique de cookies">
              <p>
                Un cookie est un petit fichier texte déposé sur votre appareil lors de votre visite.
                Conformément aux recommandations de la CNIL, nous vous demandons votre consentement
                avant tout dépôt de cookies non essentiels.
              </p>
              <div className="space-y-2">
                {[
                  {
                    name: "Cookies nécessaires",
                    color: "text-[#1B5E20]",
                    bg: "bg-[#1B5E20]/5",
                    consent: "Aucun consentement requis",
                    desc: "Session utilisateur, panier, sécurité CSRF. Indispensables au fonctionnement du site.",
                    examples: "baraka-cart, baraka-user",
                  },
                  {
                    name: "Cookies fonctionnels",
                    color: "text-blue-700",
                    bg: "bg-blue-50",
                    consent: "Consentement requis",
                    desc: "Mémorisent vos préférences d'affichage (fermeture de la barre promo, choix de cookies).",
                    examples: "baraka-cookie-consent, promo-bar-closed",
                  },
                  {
                    name: "Cookies d'analyse",
                    color: "text-purple-700",
                    bg: "bg-purple-50",
                    consent: "Consentement requis",
                    desc: "Mesure d'audience anonyme pour améliorer notre site. Durée max 13 mois.",
                    examples: "Données anonymisées uniquement",
                  },
                ].map((c) => (
                  <div key={c.name} className={`rounded-xl p-4 border border-transparent ${c.bg}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className={`font-semibold text-sm ${c.color}`}>{c.name}</p>
                      <span className="text-xs text-gray-500">{c.consent}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{c.desc}</p>
                    <p className="text-xs text-gray-400">Exemples : {c.examples}</p>
                  </div>
                ))}
              </div>
              <p>
                Vous pouvez modifier vos préférences de cookies à tout moment en{" "}
                <ResetCookiesButton />
                .
              </p>
            </Section>

            <Section id="tiers" title="7. Partage avec des tiers">
              <p>
                Nous <strong>ne vendons jamais</strong> vos données personnelles à des tiers. Vos données
                peuvent cependant être transmises dans les cas suivants :
              </p>
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-[#1B5E20]">→</span> <span><strong>Hébergeur :</strong> Vercel Inc. (hébergement Next.js) — serveurs en UE/US, contrat de sous-traitance signé.</span></li>
                <li className="flex gap-2"><span className="text-[#1B5E20]">→</span> <span><strong>Google Maps :</strong> Iframe d'affichage de carte — données transmises à Google selon leur propre politique.</span></li>
                <li className="flex gap-2"><span className="text-[#1B5E20]">→</span> <span><strong>Autorités légales :</strong> Sur réquisition judiciaire ou obligation légale uniquement.</span></li>
              </ul>
              <p>
                Tout sous-traitant est lié par un accord de traitement de données conforme à l'article
                28 du RGPD.
              </p>
            </Section>

            <Section id="securite" title="8. Sécurité des données">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                protéger vos données contre tout accès non autorisé, perte ou destruction :
              </p>
              <ul className="space-y-1">
                <li className="flex gap-2"><span className="text-[#1B5E20]">✓</span> Connexion chiffrée HTTPS/TLS sur l'ensemble du site</li>
                <li className="flex gap-2"><span className="text-[#1B5E20]">✓</span> Mots de passe hachés (bcrypt)</li>
                <li className="flex gap-2"><span className="text-[#1B5E20]">✓</span> Accès aux données limité au personnel habilité</li>
                <li className="flex gap-2"><span className="text-[#1B5E20]">✓</span> Sauvegardes régulières de la base de données</li>
              </ul>
              <p>
                En cas de violation de données susceptible d'engendrer un risque pour vos droits, nous
                vous en informerons dans les 72h conformément à l'article 33 du RGPD.
              </p>
            </Section>

            <Section id="contact-dpo" title="9. Contact et réclamations">
              <p>Pour toute question relative à cette politique ou pour exercer vos droits :</p>
              <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
                <p><strong>Email :</strong>{" "}
                  <a href="mailto:contact.barakashop@gmail.com" className="text-[#1B5E20] underline">
                    contact.barakashop@gmail.com
                  </a>
                </p>
                <p><strong>Courrier :</strong> Baraka Shop — 17 rue Corneille, 59370 Mons-en-Barœul</p>
                <p><strong>Téléphone :</strong> 09 52 29 13 06</p>
              </div>
              <p>
                Si votre demande n'est pas traitée de manière satisfaisante, vous avez le droit de
                déposer une réclamation auprès de la{" "}
                <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :{" "}
                <span className="text-gray-500">3 place de Fontenoy, 75007 Paris — www.cnil.fr</span>
              </p>
            </Section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <p className="text-xs text-gray-400">Dernière mise à jour : {updated}</p>
            <div className="flex gap-4 text-sm">
              <Link href="/mentions-legales" className="text-[#1B5E20] hover:underline">Mentions légales</Link>
              <Link href="/cgv" className="text-[#1B5E20] hover:underline">CGV</Link>
              <Link href="/" className="text-[#1B5E20] hover:underline">Accueil</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
