import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

// ── Hero Boucherie ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative bg-[#1A6B47] overflow-hidden min-h-[620px] flex items-center">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-[#C9922A]/10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#228B5C]/20 skew-x-[-12deg] translate-x-24" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9922A]/60 via-transparent to-transparent" />
        {/* Meat pattern hint */}
        <div className="absolute top-12 right-12 text-white/5 text-[200px] leading-none select-none hidden lg:block">🥩</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span>☪</span>
            <span>Boucherie Halal — Mons-en-Baroeul</span>
          </div>

          {/* Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Boucherie Halal{" "}
            <span className="text-[#E0A83A]">Premium</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/80">
              Traiteur · Épicerie Vrac
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Viandes fraîches de race française (Charolais, Blonde d&apos;Aquitaine),
            découpées à la demande. Brochettes maison, colis barbecue,
            agneau et volaille — tout 100% halal certifié.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] text-base"
            >
              Voir nos viandes →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/10 text-base"
            >
              Nous contacter
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { num: "4.6★", label: "109+ avis clients" },
              { num: "100%", label: "Halal certifié" },
              { num: "Sur mesure", label: "Découpe à la demande" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-playfair text-2xl font-bold text-[#E0A83A]">
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

// ── Trust Bar ──────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "☪", label: "100% Halal Certifié", desc: "Viandes abattues rituellement" },
    { icon: "🥩", label: "Races Françaises", desc: "Charolais, Blonde d'Aquitaine" },
    { icon: "🔪", label: "Découpe sur Mesure", desc: "À votre demande" },
    { icon: "⭐", label: "4.6/5 — 109 avis", desc: "Meilleure boucherie halal" },
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

// ── Nos Viandes (races) ────────────────────────────────────────────────────────
function NosViandes() {
  const races = [
    {
      icon: "🐄",
      name: "Bœuf Charolais",
      desc: "Race à viande française emblématique. Chair tendre, persillée et savoureuse.",
      color: "bg-[#1A6B47]",
    },
    {
      icon: "🐄",
      name: "Blonde d'Aquitaine",
      desc: "Viande maigre à la texture fine et au goût délicat. Idéale en rôti ou grillée.",
      color: "bg-[#228B5C]",
    },
    {
      icon: "🐑",
      name: "Agneau de qualité",
      desc: "Gigots, épaules et côtelettes. Découpés à la demande pour chaque occasion.",
      color: "bg-[#C9922A]",
    },
    {
      icon: "🐔",
      name: "Volaille Fermière",
      desc: "Poulets élevés en plein air, entiers ou découpés selon vos besoins.",
      color: "bg-[#A87520]",
    },
  ];

  return (
    <section className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A6B47] mb-3">
            Nos Viandes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des races françaises d&apos;exception, sélectionnées pour leur qualité.
            Toutes nos viandes sont 100% halal et fraîches chaque jour.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {races.map((race) => (
            <Link
              key={race.name}
              href="/catalogue"
              className={`${race.color} text-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
            >
              <span className="text-4xl" aria-hidden="true">{race.icon}</span>
              <div>
                <h3 className="font-playfair font-bold text-lg leading-tight">
                  {race.name}
                </h3>
                <p className="text-white/80 text-sm mt-1 leading-snug">{race.desc}</p>
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

// ── Colis Barbecue ─────────────────────────────────────────────────────────────
function ColsBarbecue() {
  return (
    <section className="py-16 bg-[#14533A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#E0A83A] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🔥 Offre Spéciale
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Colis Barbecue Maison
            </h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              Notre boucher prépare chaque matin des colis barbecue complets :
              brochettes marinées, merguez artisanales, côtelettes d&apos;agneau
              et steaks hachés.{" "}
              <strong className="text-white">Tout halal, tout frais.</strong>
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Brochettes bœuf & agneau marinées",
                "Merguez artisanales épicées",
                "Côtelettes d'agneau",
                "Steaks hachés pur bœuf",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80">
                  <span className="w-5 h-5 bg-[#C9922A] rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg text-base"
            >
              Commander un colis →
            </Link>
          </div>

          {/* Price card */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-white text-center backdrop-blur-sm">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Colis Premium</p>
            <p className="font-playfair text-6xl font-bold text-[#E0A83A] mb-1">49.90€</p>
            <p className="text-white/50 line-through text-lg mb-4">59.90€</p>
            <p className="text-white/80 mb-6">Pour 4 à 6 personnes</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { val: "~2 kg", label: "de viandes" },
                { val: "4 types", label: "de pièces" },
                { val: "Frais", label: "du jour" },
                { val: "Halal", label: "certifié" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3">
                  <p className="font-bold text-white text-base">{item.val}</p>
                  <p className="text-white/60 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Produits Vedettes ──────────────────────────────────────────────────────────
function FeaturedProducts() {
  // Show 3 boucherie products
  const featured = products.filter((p) => p.category === "Boucherie").slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A6B47] mb-2">
              À la Boucherie ce Jour
            </h2>
            <p className="text-gray-600">Viandes fraîches découpées chaque matin.</p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-[#1A6B47] font-semibold hover:text-[#C9922A] transition-colors duration-200 group whitespace-nowrap"
          >
            Tout le catalogue
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
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

// ── Section Catégories ────────────────────────────────────────────────────────
function CategoryGrid() {
  const categories = [
    { icon: "🥩", name: "Boucherie", desc: "Bœuf, Merguez, Découpe", bg: "bg-[#1A6B47]", hover: "hover:bg-[#14533A]" },
    { icon: "🐑", name: "Agneau", desc: "Gigot, Épaule, Côtelettes", bg: "bg-[#228B5C]", hover: "hover:bg-[#1A6B47]" },
    { icon: "🍗", name: "Volaille", desc: "Poulet fermier entier", bg: "bg-[#C9922A]", hover: "hover:bg-[#A87520]" },
    { icon: "🔥", name: "Traiteur", desc: "Brochettes & Colis BBQ", bg: "bg-[#A87520]", hover: "hover:bg-[#C9922A]" },
  ];

  return (
    <section className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A6B47] mb-3">
            Nos Rayons
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Boucherie, traiteur et épicerie vrac — tout en un seul endroit.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/catalogue"
              className={`${cat.bg} ${cat.hover} text-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
            >
              <span className="text-4xl" aria-hidden="true">{cat.icon}</span>
              <div>
                <h3 className="font-playfair font-bold text-lg leading-tight">{cat.name}</h3>
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

// ── Store Section ──────────────────────────────────────────────────────────────
function StoreSection() {
  return (
    <section className="py-16 bg-[#1A6B47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div className="text-white">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Venez Nous Rendre Visite
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Notre boucherie est ouverte 6 jours sur 7 à Mons-en-Baroeul.
              Venez découvrir nos viandes fraîches, nos brochettes maison et
              notre épicerie vrac.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="font-semibold mb-0.5">Adresse</p>
                  <p className="text-white/70 text-sm">
                    17 Rue Corneille
                    <br />
                    59370 Mons-en-Baroeul, Nord
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">🕐</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Horaires d&apos;ouverture</p>
                  <div className="text-white/70 text-sm space-y-0.5">
                    <p className="text-white/40">Lundi : Fermé</p>
                    <p>Mardi – Samedi : 8h30 – 20h00</p>
                    <p>Dimanche : 9h30 – 20h00</p>
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
                    <p>09 52 29 13 06</p>
                    <a
                      href="https://www.facebook.com/Barakashop17/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E0A83A] hover:text-white transition-colors"
                    >
                      Facebook : Baraka Shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps embed placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-[420px] bg-[#14533A] flex flex-col items-center justify-center border border-white/10 gap-4">
            <span className="text-6xl">🗺️</span>
            <div className="text-center text-white/80 px-8">
              <p className="font-playfair font-semibold text-white text-lg mb-1">
                17 Rue Corneille
              </p>
              <p className="text-sm text-white/60">59370 Mons-en-Baroeul</p>
            </div>
            <a
              href="https://maps.google.com/?q=17+Rue+Corneille+59370+Mons-en-Baroeul"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm mt-2"
            >
              Ouvrir dans Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
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
              <span className="font-playfair text-xl font-bold text-white">Baraka</span>
              <span className="font-playfair text-xl font-bold text-[#C9922A]">Shop</span>
            </div>
            <p className="text-sm leading-relaxed">
              Boucherie Halal · Traiteur · Épicerie Vrac
              <br />
              Mons-en-Baroeul, Nord
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/catalogue", label: "Catalogue" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-sm">
              <li>📍 17 Rue Corneille, Mons-en-Baroeul</li>
              <li>📞 09 52 29 13 06</li>
              <li>
                <a
                  href="https://www.facebook.com/Barakashop17/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E0A83A] hover:text-white transition-colors"
                >
                  📘 Facebook : Baraka Shop
                </a>
              </li>
              <li className="text-white/50 text-xs pt-1">
                Mar–Sam : 8h30–20h00 · Dim : 9h30–20h00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {currentYear} Baraka Shop. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white/80 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white/80 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <NosViandes />
      <FeaturedProducts />
      <ColsBarbecue />
      <CategoryGrid />
      <StoreSection />
      <Footer />
    </>
  );
}
