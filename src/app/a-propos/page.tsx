import Link from "next/link";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <div className="bg-[#1A6B47] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            À Propos de Nous
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Notre histoire, nos valeurs et notre engagement envers la qualité
            halal.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-[#1A6B47] mb-4">
              Notre Histoire
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Fondée avec la passion des saveurs authentiques et le respect des
              préceptes halal, Baraka Shop est née d&apos;un désir de rendre
              accessibles les meilleurs produits du monde entier.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chaque produit de notre catalogue est sélectionné avec soin pour
              garantir non seulement sa certification halal, mais aussi sa
              qualité nutritionnelle et son authenticité.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nous travaillons directement avec des producteurs et artisans
              locaux pour vous proposer le meilleur des épices, thés, huiles et
              miels du monde.
            </p>
          </div>

          <div className="bg-[#1A6B47]/5 rounded-2xl p-8 border border-[#1A6B47]/10">
            <div className="space-y-6">
              {[
                { icon: "🌿", title: "100% Halal", desc: "Tous nos produits sont certifiés conformes aux normes halal les plus strictes." },
                { icon: "🌍", title: "Sourcing Mondial", desc: "Nous sourçons nos produits directement auprès de producteurs de confiance." },
                { icon: "💚", title: "Qualité Premium", desc: "Chaque produit passe par une sélection rigoureuse avant d'entrer dans notre catalogue." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-[#1A6B47] mb-3">
            Nos Valeurs
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Ce qui nous guide au quotidien dans la sélection de nos produits et
            notre service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "🤝", title: "Confiance", desc: "La relation de confiance avec nos clients est notre priorité absolue." },
            { icon: "⭐", title: "Excellence", desc: "Nous ne sélectionnons que les meilleurs produits du monde entier." },
            { icon: "🌱", title: "Durabilité", desc: "Nous favorisons les producteurs respectueux de l'environnement." },
          ].map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E4DB] text-center hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-3 block">{val.icon}</span>
              <h3 className="font-playfair font-bold text-lg text-gray-900 mb-2">
                {val.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-[#1A6B47] hover:bg-[#14533A] text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
          >
            Découvrir nos produits →
          </Link>
        </div>
      </div>
    </div>
  );
}
