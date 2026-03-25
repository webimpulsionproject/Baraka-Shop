import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Baraka Shop",
  description: "Mentions légales obligatoires de Baraka Shop, boucherie halal à Mons-en-Barœul.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="bg-[#1B5E20] py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Légal</p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
              Mentions Légales
            </h1>
            <p className="text-white/70 text-sm">
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          {[
            {
              title: "1. Éditeur du site",
              content: (
                <ul className="space-y-1.5">
                  <li><strong>Dénomination :</strong> Baraka Shop</li>
                  <li><strong>Forme juridique :</strong> Entreprise individuelle</li>
                  <li><strong>Adresse :</strong> 17 rue Corneille, 59370 Mons-en-Barœul, France</li>
                  <li><strong>Téléphone :</strong> 09 52 29 13 06</li>
                  <li><strong>Email :</strong>{" "}
                    <a href="mailto:contact.barakashop@gmail.com" className="text-[#1B5E20] underline">
                      contact.barakashop@gmail.com
                    </a>
                  </li>
                  <li><strong>SIRET :</strong> [Numéro SIRET à renseigner]</li>
                  <li><strong>N° TVA intracommunautaire :</strong> [À renseigner si applicable]</li>
                </ul>
              ),
            },
            {
              title: "2. Directeur de la publication",
              content: (
                <p>Le directeur de la publication est le gérant de Baraka Shop, joignable à l'adresse email ci-dessus.</p>
              ),
            },
            {
              title: "3. Hébergeur du site",
              content: (
                <ul className="space-y-1.5">
                  <li><strong>Société :</strong> Vercel Inc.</li>
                  <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
                  <li><strong>Site web :</strong> vercel.com</li>
                  <li className="text-gray-500 text-sm">
                    Vercel agit en qualité de sous-traitant au sens du RGPD. Un accord de traitement
                    des données est en place entre Baraka Shop et Vercel.
                  </li>
                </ul>
              ),
            },
            {
              title: "4. Propriété intellectuelle",
              content: (
                <>
                  <p>
                    L'ensemble du contenu de ce site (textes, images, logo, mise en page, code) est la
                    propriété exclusive de Baraka Shop ou de ses partenaires, et est protégé par les
                    lois françaises et internationales sur la propriété intellectuelle.
                  </p>
                  <p className="mt-2">
                    Toute reproduction, représentation, modification, publication ou adaptation de tout
                    ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                    interdite, sauf autorisation écrite préalable de Baraka Shop.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Les photographies de produits utilisées sur ce site proviennent de la bibliothèque
                    Unsplash (unsplash.com) sous licence libre d'utilisation.
                  </p>
                </>
              ),
            },
            {
              title: "5. Responsabilité",
              content: (
                <>
                  <p>
                    Les informations contenues sur ce site sont aussi précises que possible et le site
                    est régulièrement mis à jour. Baraka Shop ne peut être tenu responsable des
                    omissions, inexactitudes et carences dans la mise à jour.
                  </p>
                  <p className="mt-2">
                    Les disponibilités et prix des produits sont susceptibles de varier. En cas de
                    rupture de stock, Baraka Shop vous contactera dans les plus brefs délais.
                  </p>
                </>
              ),
            },
            {
              title: "6. Liens hypertextes",
              content: (
                <p>
                  Ce site peut contenir des liens vers d'autres sites (Facebook, Google Maps). Baraka
                  Shop n'assume aucune responsabilité quant au contenu de ces sites externes et ne peut
                  être tenu responsable des dommages résultant de leur utilisation.
                </p>
              ),
            },
            {
              title: "7. Droit applicable",
              content: (
                <p>
                  Les présentes mentions légales sont soumises au droit français. En cas de litige,
                  les tribunaux compétents sont ceux du ressort du siège social de Baraka Shop, sauf
                  disposition légale contraire.
                </p>
              ),
            },
          ].map(({ title, content }) => (
            <section key={title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-playfair text-lg font-bold text-[#1B5E20] mb-4">{title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed">{content}</div>
            </section>
          ))}

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center border-t border-gray-200">
            <p className="text-xs text-gray-400">Version en vigueur depuis le 25 mars 2026</p>
            <div className="flex gap-4 text-sm">
              <Link href="/politique-de-confidentialite" className="text-[#1B5E20] hover:underline">Confidentialité</Link>
              <Link href="/cgv" className="text-[#1B5E20] hover:underline">CGV</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
