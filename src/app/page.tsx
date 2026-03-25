import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

// ── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "🌿", label: "100% Halal Certifié", desc: "Tous nos produits sont certifiés" },
    { icon: "🚚", label: "Livraison Rapide", desc: "Expédition sous 24-48h" },
    { icon: "⭐", label: "Produits Premium", desc: "Sélection rigoureuse" },
    { icon: "💚", label: "Satisfaction Garantie", desc: "Retour facile 30 jours" },
  ];

  return (
    <section className="bg-white border-b border-[#E8E4DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors duration-200"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Category Grid ─────────────────────────────────────────────────────────────
function CategoryGrid() {
  const categories = [
    {
      icon: "🌶️",
      name: "Épices",
      desc: "Mélanges authentiques",
      bg: "bg-[#1A6B47]",
      hover: "hover:bg-[#14533A]",
    },
    {
      icon: "🍵",
      name: "Thés & Infusions",
      desc: "Du monde entier",
      bg: "bg-[#228B5C]",
      hover: "hover:bg-[#1A6B47]",
    },
    {
      icon: "🫒",
      name: "Huiles",
      desc: "Première pression",
      bg: "bg-[#C9922A]",
      hover: "hover:bg-[#A87520]",
    },
    {
      icon: "🍯",
      name: "Miel & Sucres",
      desc: "Naturels et purs",
      bg: "bg-[#A87520]",
      hover: "hover:bg-[#C9922A]",
    },
  ];

  return (
    <section className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A6B47] mb-3">
            Nos Catégories
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Explorez notre sélection de produits halal soigneusement choisis
            pour vous.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/catalogue"
              className={`${cat.bg} ${cat.hover} text-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
            >
              <span className="text-4xl" aria-hidden="true">
                {cat.icon}
              </span>
              <div>
                <h3 className="font-playfair font-bold text-lg leading-tight">
                  {cat.name}
                </h3>
                <p className="text-white/80 text-sm mt-1">{cat.desc}</p>
              </div>
              <span className="mt-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Products ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const featured = products.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A6B47] mb-2">
              Nos Produits Vedettes
            </h2>
            <p className="text-gray-600">
              Les incontournables de notre épicerie halal.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-[#1A6B47] font-semibold hover:text-[#C9922A] transition-colors duration-200 group whitespace-nowrap"
          >
            Voir tout le catalogue
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Store Section ─────────────────────────────────────────────────────────────
function StoreSection() {
  return (
    <section className="py-16 bg-[#1A6B47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div className="text-white">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Visitez Notre Boutique
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Retrouvez nous dans notre épicerie physique pour découvrir
              l&apos;intégralité de nos produits et bénéficier de conseils
              personnalisés.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="font-semibold mb-0.5">Adresse</p>
                  <p className="text-white/70 text-sm">
                    123 Rue des Saveurs Halal
                    <br />
                    75010 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">🕐</span>
                </div>
                <div>
                  <p className="font-semibold mb-0.5">Horaires</p>
                  <div className="text-white/70 text-sm space-y-0.5">
                    <p>Lundi – Vendredi : 9h00 – 19h30</p>
                    <p>Samedi : 9h00 – 20h00</p>
                    <p>Dimanche : 10h00 – 17h00</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <p className="font-semibold mb-0.5">Contact</p>
                  <div className="text-white/70 text-sm space-y-0.5">
                    <p>+33 (0)1 23 45 67 89</p>
                    <p>contact@baraka-shop.fr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96 bg-[#14533A] flex items-center justify-center border border-white/10">
            <div className="text-center text-white/60 px-8">
              <span className="text-6xl mb-4 block">🗺️</span>
              <p className="font-semibold text-white/80 mb-1">Carte interactive</p>
              <p className="text-sm">
                Intégrez votre API Google Maps ici
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14533A] text-white/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-sm mr-1">☪</span>
              <span className="font-playfair text-xl font-bold text-white">
                Baraka
              </span>
              <span className="font-playfair text-xl font-bold text-[#C9922A]">
                Shop
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Votre épicerie halal premium, des saveurs authentiques du monde
              entier.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-white transition-colors"
                >
                  Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>📍 123 Rue des Saveurs, Paris</li>
              <li>📞 +33 (0)1 23 45 67 89</li>
              <li>✉️ contact@baraka-shop.fr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {currentYear} Baraka Shop. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/80 transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative bg-[#1A6B47] overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-[#C9922A]/10" />
        <div className="absolute top-8 left-1/4 w-32 h-32 rounded-full bg-white/5" />
        {/* Geometric accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#228B5C]/20 skew-x-[-12deg] translate-x-24" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9922A]/50 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>☪</span>
            <span>Épicerie Halal Premium</span>
          </div>

          {/* Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Saveurs du Monde,{" "}
            <span className="text-[#E0A83A]">Certifiées Halal</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Découvrez notre sélection exclusive d&apos;épices, thés, huiles et
            miels du monde entier, soigneusement choisis pour leur qualité et
            leur authenticité.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] text-base"
            >
              Découvrir le catalogue
              <span>→</span>
            </Link>
            <Link
              href="/a-propos"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/10 text-base"
            >
              En savoir plus
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { num: "12+", label: "Produits sélectionnés" },
              { num: "100%", label: "Certifiés Halal" },
              { num: "4", label: "Catégories" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-playfair text-3xl font-bold text-[#E0A83A]">
                  {stat.num}
                </p>
                <p className="text-white/60 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <StoreSection />
      <Footer />
    </>
  );
}
