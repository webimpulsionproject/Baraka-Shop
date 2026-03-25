export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Header */}
      <div className="bg-[#1A6B47] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez-Nous
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Une question ? N&apos;hésitez pas à nous contacter, nous vous
            répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E4DB]">
            <h2 className="font-playfair text-2xl font-bold text-[#1A6B47] mb-6">
              Envoyez-nous un message
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Votre prénom"
                    className="w-full px-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 placeholder-gray-400 transition-shadow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Votre nom"
                    className="w-full px-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 placeholder-gray-400 transition-shadow"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 placeholder-gray-400 transition-shadow"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 transition-shadow"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="commande">Question sur une commande</option>
                  <option value="produit">Renseignement produit</option>
                  <option value="halal">Certification halal</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Votre message..."
                  className="w-full px-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 placeholder-gray-400 transition-shadow resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A6B47] hover:bg-[#14533A] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#1A6B47] mb-6">
                Informations de contact
              </h2>
            </div>

            {[
              {
                icon: "📍",
                title: "Adresse",
                content: "123 Rue des Saveurs Halal\n75010 Paris, France",
              },
              {
                icon: "📞",
                title: "Téléphone",
                content: "+33 (0)1 23 45 67 89",
              },
              {
                icon: "✉️",
                title: "Email",
                content: "contact@baraka-shop.fr",
              },
              {
                icon: "🕐",
                title: "Horaires",
                content:
                  "Lun-Ven : 9h00 – 19h30\nSamedi : 9h00 – 20h00\nDimanche : 10h00 – 17h00",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4DB] flex gap-4"
              >
                <div className="w-10 h-10 bg-[#1A6B47]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Social links placeholder */}
            <div className="bg-[#1A6B47] rounded-2xl p-6 text-white">
              <h3 className="font-playfair font-bold text-lg mb-2">
                Suivez-nous
              </h3>
              <p className="text-white/70 text-sm mb-4">
                Retrouvez-nous sur les réseaux sociaux pour nos dernières
                actualités et promotions.
              </p>
              <div className="flex gap-3">
                {["Facebook", "Instagram", "WhatsApp"].map((social) => (
                  <button
                    key={social}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
