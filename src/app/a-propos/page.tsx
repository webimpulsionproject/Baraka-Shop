import Link from "next/link";
import Footer from "@/components/Footer";

export default function AProposPage() {
  return (
    <>
      <div className="min-h-screen bg-[#FAF8F3]">
        {/* Hero */}
        <div className="bg-[#1A6B47] py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
              Notre Histoire
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">
              Une boucherie familiale halal au cœur de Mons-en-Barœul depuis plus de 10 ans.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              <strong className="text-[#1A6B47]">Baraka Shop</strong> est né d&apos;une passion pour la viande de qualité
              et d&apos;un engagement envers la communauté locale. Fondée au 17 rue Corneille à
              Mons-en-Barœul, notre boucherie halal s&apos;est rapidement imposée comme une
              référence dans le quartier et au-delà.
            </p>
            <p>
              Notre boucher sélectionne chaque matin les meilleures pièces de races françaises
              reconnues pour leur excellence : <strong>Charolais</strong>, <strong>Blonde d&apos;Aquitaine</strong>,
              agneau et volaille fermière. Chaque découpe est réalisée à la demande, selon vos
              besoins et vos envies.
            </p>
            <p>
              Au fil des années, nous avons développé notre offre avec un service traiteur maison
              (brochettes marinées, merguez artisanales, colis barbecue) et une épicerie vrac
              proposant épices, condiments et spécialités orientales soigneusement sélectionnées.
            </p>
          </div>

          {/* Values */}
          <div className="mt-16">
            <h2 className="font-playfair text-3xl font-bold text-[#1A6B47] mb-8 text-center">
              Nos Valeurs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: "☪", title: "Halal certifié", desc: "Toutes nos viandes sont abattues selon le rite islamique. Notre certification est vérifiable à tout moment." },
                { icon: "🏆", title: "Qualité premium", desc: "Races françaises d'exception, fraîcheur quotidienne et découpe artisanale par notre boucher." },
                { icon: "🤝", title: "Ancrage local", desc: "Nous faisons partie du tissu social de Mons-en-Barœul. Votre satisfaction est notre priorité absolue." },
              ].map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-playfair font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-[#1A6B47] rounded-2xl p-10">
            <h2 className="font-playfair text-2xl font-bold text-white mb-3">
              Venez nous rendre visite
            </h2>
            <p className="text-white/75 mb-6">17 rue Corneille, 59370 Mons-en-Barœul</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogue" className="btn-orange">
                Voir le catalogue →
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
