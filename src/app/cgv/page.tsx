import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Baraka Shop",
  description: "Conditions générales de vente de Baraka Shop : Click & Collect, tarifs, livraison, remboursements.",
};

const Art = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 className="font-playfair text-lg font-bold text-[#1B5E20] mb-4">
      Article {n} — {title}
    </h2>
    <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function CGVPage() {
  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="bg-[#1B5E20] py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Légal</p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
              Conditions Générales de Vente
            </h1>
            <p className="text-white/70 text-sm">
              Applicables à toutes les ventes effectuées via barakashop.fr — Dernière mise à jour : 25 mars 2026
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">
          {/* Préambule */}
          <div className="bg-[#1B5E20]/5 border border-[#1B5E20]/20 rounded-2xl p-6 text-sm text-gray-700 leading-relaxed">
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations
              commerciales entre <strong>Baraka Shop</strong> (ci-après « le vendeur ») et tout client
              passant commande via le site <strong>barakashop.fr</strong> (ci-après « l'acheteur »).
            </p>
            <p className="mt-2">
              Toute commande implique l'acceptation pleine et entière des présentes CGV. Ces conditions
              prévalent sur toute autre condition générale ou particulière non expressément agréée par Baraka Shop.
            </p>
          </div>

          <Art n={1} title="Identification du vendeur">
            <p><strong>Baraka Shop</strong> — Boucherie Halal Premium</p>
            <p>17 rue Corneille, 59370 Mons-en-Barœul, France</p>
            <p>Téléphone : 09 52 29 13 06 — Email : contact.barakashop@gmail.com</p>
          </Art>

          <Art n={2} title="Produits">
            <p>
              Baraka Shop propose à la vente des viandes fraîches halal (bœuf, veau, agneau, volaille),
              des préparations traiteur maison (merguez, brochettes, kefta) et des produits d'épicerie vrac.
            </p>
            <p>
              <strong>Certification halal :</strong> Toutes nos viandes sont abattues selon le rite islamique,
              conformément aux normes en vigueur. Notre certification est disponible sur demande en magasin.
            </p>
            <p>
              <strong>Fraîcheur :</strong> Nos produits sont frais et préparés quotidiennement. Les photos
              présentées sur le site sont indicatives et peuvent légèrement différer du produit réel en raison
              de la variabilité naturelle des denrées.
            </p>
            <p>
              <strong>Disponibilité :</strong> Les stocks affichés sont indicatifs. En cas de rupture, Baraka
              Shop vous contactera dans les plus brefs délais pour proposer un produit de substitution ou
              l'annulation de la commande.
            </p>
          </Art>

          <Art n={3} title="Prix">
            <p>
              Les prix sont indiqués en euros TTC (toutes taxes comprises), conformément à la réglementation
              française. Baraka Shop se réserve le droit de modifier ses prix à tout moment.
            </p>
            <p>
              Le prix applicable est celui en vigueur au moment de la validation de la commande.
            </p>
            <p>
              <strong>Codes promotionnels :</strong> Les codes promo sont valables sous réserve des conditions
              mentionnées lors de leur communication. Un seul code peut être utilisé par commande. Ils ne sont
              pas cumulables sauf mention contraire.
            </p>
          </Art>

          <Art n={4} title="Commande et Click & Collect">
            <p>
              La commande est finalisée lorsque l'acheteur valide son panier et sélectionne un créneau de
              retrait. Une confirmation de commande lui est adressée par email.
            </p>
            <p>
              <strong>Créneau de retrait :</strong> L'acheteur s'engage à récupérer sa commande dans le créneau
              sélectionné. En cas de retard ou d'empêchement, il doit en informer Baraka Shop au plus tôt par
              téléphone (09 52 29 13 06).
            </p>
            <p>
              Les commandes non récupérées dans les <strong>2 heures suivant le créneau</strong> peuvent être
              remises en vente, les denrées fraîches ne pouvant être stockées indéfiniment.
            </p>
            <p>
              <strong>Horaires de retrait :</strong> Mardi–Samedi 8h30–20h00 · Dimanche 9h30–20h00 · Lundi fermé.
            </p>
          </Art>

          <Art n={5} title="Paiement">
            <p>
              Le paiement s'effectue <strong>en magasin</strong> lors du retrait de la commande (espèces, carte
              bancaire, chèque). Le paiement en ligne n'est pas encore disponible.
            </p>
            <p>
              Aucune donnée bancaire n'est collectée ou stockée via le site internet.
            </p>
          </Art>

          <Art n={6} title="Livraison à domicile">
            <p>
              La livraison à domicile est en cours de déploiement sur notre zone de chalandise. Elle n'est
              pas encore disponible à la commande en ligne.
            </p>
            <p>
              Contactez-nous directement par téléphone ou email pour connaître les conditions de livraison
              éventuellement disponibles selon votre localisation.
            </p>
          </Art>

          <Art n={7} title="Droit de rétractation">
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation{" "}
              <strong>ne s'applique pas</strong> aux denrées alimentaires périssables, notamment :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Viandes fraîches et produits de boucherie</li>
              <li>Préparations traiteur (merguez, brochettes, kefta)</li>
              <li>Épicerie conditionnée dont l'emballage a été ouvert</li>
            </ul>
            <p>
              En revanche, si la commande n'a pas encore été préparée, vous pouvez l'annuler en nous
              contactant au plus tôt.
            </p>
          </Art>

          <Art n={8} title="Réclamations et satisfaction client">
            <p>
              Toute réclamation doit être formulée dans les <strong>24h suivant le retrait</strong> de la commande,
              en contactant Baraka Shop par téléphone ou email, accompagnée d'une description du problème et
              si possible d'une photo.
            </p>
            <p>
              En cas de produit non conforme, Baraka Shop s'engage à proposer un remplacement ou un avoir
              sur la prochaine commande.
            </p>
            <p>
              En cas de litige non résolu, l'acheteur peut recourir à un médiateur de la consommation
              conformément aux articles L616-1 et R616-1 du Code de la consommation.
            </p>
          </Art>

          <Art n={9} title="Données personnelles">
            <p>
              Les données collectées lors de la commande sont traitées conformément à notre{" "}
              <Link href="/politique-de-confidentialite" className="text-[#1B5E20] underline font-medium">
                politique de confidentialité
              </Link>
              , dans le respect du RGPD et de la loi Informatique et Libertés.
            </p>
          </Art>

          <Art n={10} title="Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable
              sera recherchée en priorité. À défaut, les tribunaux compétents seront ceux du ressort de
              Mons-en-Barœul (59).
            </p>
          </Art>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between items-center border-t border-gray-200">
            <p className="text-xs text-gray-400">Version en vigueur depuis le 25 mars 2026</p>
            <div className="flex gap-4 text-sm">
              <Link href="/mentions-legales" className="text-[#1B5E20] hover:underline">Mentions légales</Link>
              <Link href="/politique-de-confidentialite" className="text-[#1B5E20] hover:underline">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
