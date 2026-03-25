import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-[#1A6B47] overflow-hidden min-h-[640px] flex items-center">
      {/* Shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#E8401C]/10 -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#228B5C]/20 skew-x-[-8deg] translate-x-32" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9922A]/60 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span>☪</span>
              <span>Boucherie Halal Certifiée — Mons-en-Barœul</span>
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5">
              La Meilleure{" "}
              <span className="text-[#C9922A]">Viande Halal</span>
              <br />
              de la région
            </h1>

            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
              Viandes fraîches de race française découpées à la demande, brochettes
              maison et traiteur halal.{" "}
              <strong className="text-white">Click & Collect en 30 min</strong>{" "}
              ou livraison locale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/catalogue" className="btn-orange text-base px-8 py-4">
                Voir nos viandes →
              </Link>
              <Link href="#collecte" className="btn-outline-white text-base px-8 py-4">
                Click & Collect
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { val: "4,6★", sub: "109 avis clients" },
                { val: "100%", sub: "Halal certifié" },
                { val: "7j/7", sub: "Ouvert (sf lundi)" },
                { val: "30 min", sub: "Click & Collect" },
              ].map((s) => (
                <div key={s.sub} className="text-center">
                  <p className="font-playfair text-2xl font-bold text-[#E0A83A]">{s.val}</p>
                  <p className="text-white/55 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=640&h=500&fit=crop&auto=format"
              alt="Boucherie Halal Baraka Shop"
              className="w-full h-[440px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Trust Bar ─────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "☪", title: "100% Halal Certifié", sub: "Contrôlé et certifié" },
    { icon: "🏪", title: "Click & Collect 30 min", sub: "Commandez en ligne" },
    { icon: "🚚", title: "Livraison Locale", sub: "Mons-en-Barœul et alentours" },
    { icon: "🕐", title: "Ouvert 7j/7", sub: "Sauf lundi" },
  ];
  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F3] transition-colors">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────
function Categories() {
  const cats = [
    { icon: "🥩", name: "Bœuf & Veau", sub: "Charolais, Blonde d'Aquitaine, Merguez", bg: "bg-[#1A6B47] hover:bg-[#14533A]" },
    { icon: "🐑", name: "Agneau", sub: "Gigot, Épaule, Côtelettes, Souris", bg: "bg-[#228B5C] hover:bg-[#1A6B47]" },
    { icon: "🍗", name: "Volaille", sub: "Poulet fermier, Dinde, Escalopes", bg: "bg-[#C9922A] hover:bg-[#A87520]" },
    { icon: "🔥", name: "Traiteur & Épicerie", sub: "Brochettes, Colis BBQ, Épices", bg: "bg-[#E8401C] hover:bg-[#C43516]" },
  ];
  return (
    <section className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Nos Rayons</h2>
          <p className="text-gray-500 text-lg mt-1">Boucherie · Traiteur · Épicerie vrac — tout en un</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c) => (
            <Link
              key={c.name}
              href="/catalogue"
              className={`${c.bg} text-white rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
            >
              <span className="text-5xl">{c.icon}</span>
              <div>
                <h3 className="font-playfair font-bold text-lg leading-tight">{c.name}</h3>
                <p className="text-white/75 text-xs mt-1 leading-snug">{c.sub}</p>
              </div>
              <span className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Products ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const featured = products.filter((p) => p.badge === "Bestseller").slice(0, 6);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="section-title">Nos Produits du Moment</h2>
            <p className="text-gray-500 mt-1">Fraîcheur du jour, qualité garantie.</p>
          </div>
          <Link href="/catalogue" className="text-[#E8401C] font-semibold hover:text-[#C43516] transition-colors whitespace-nowrap group">
            Tout voir <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Click & Collect + Livraison ───────────────────────────────────────────────
function DeliverySection() {
  return (
    <section id="collecte" className="py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Commandez Facilement</h2>
          <p className="text-gray-500 text-lg mt-1">Deux options pour recevoir vos commandes halal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Click & Collect */}
          <div className="bg-[#1A6B47] text-white rounded-2xl p-8">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="font-playfair text-2xl font-bold mb-1">Click & Collect</h3>
            <p className="text-white/70 text-sm mb-6 font-medium">Prêt en 30 minutes · Gratuit</p>
            <ol className="space-y-3 mb-8">
              {[
                "Choisissez vos produits en ligne",
                "Sélectionnez votre créneau horaire",
                "Récupérez en boutique au 17 rue Corneille",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9922A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/85 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-sm">
              Commander pour récupérer →
            </Link>
          </div>

          {/* Livraison */}
          <div className="bg-[#E8401C] text-white rounded-2xl p-8">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="font-playfair text-2xl font-bold mb-1">Livraison à Domicile</h3>
            <p className="text-white/70 text-sm mb-6 font-medium">Zone locale · Gratuite dès 50 €</p>
            <ol className="space-y-3 mb-8">
              {[
                "Commandez avant 11h",
                "Livraison entre 16h et 19h",
                "Paiement possible à la livraison",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/85 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-white text-[#E8401C] hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-sm">
              Commander en livraison →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Magasin + Map ─────────────────────────────────────────────────────────────
function MagasinSection() {
  return (
    <section id="magasin" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Notre Magasin</h2>
          <p className="text-gray-500 mt-1">Venez nous rendre visite à Mons-en-Barœul</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <div className="space-y-6">
            <div className="bg-[#FAF8F3] rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1A6B47]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Adresse</p>
                  <p className="text-gray-600 text-sm mt-0.5">17 rue Corneille<br />59370 Mons-en-Barœul, Nord</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1A6B47]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🕐</span>
                </div>
                <div className="w-full">
                  <p className="font-semibold text-gray-900 mb-2">Horaires</p>
                  <table className="text-sm w-full">
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { day: "Lundi", hours: "Fermé", closed: true },
                        { day: "Mardi – Samedi", hours: "8h30 – 20h00" },
                        { day: "Dimanche", hours: "9h30 – 20h00" },
                      ].map((r) => (
                        <tr key={r.day}>
                          <td className="py-1.5 text-gray-600 pr-4">{r.day}</td>
                          <td className={`py-1.5 font-medium ${r.closed ? "text-[#E8401C]" : "text-[#1A6B47]"}`}>
                            {r.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1A6B47]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contact</p>
                  <a href="tel:0952291306" className="text-[#1A6B47] text-sm hover:underline block mt-0.5">09 52 29 13 06</a>
                  <a href="mailto:contact.barakashop@gmail.com" className="text-[#1A6B47] text-sm hover:underline block">contact.barakashop@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://maps.google.com/?q=17+rue+Corneille+59370+Mons-en-Baroeul"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-sm flex-1 justify-center"
              >
                📍 Itinéraire
              </a>
              <a
                href="https://www.facebook.com/Barakashop17/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all flex-1"
              >
                📘 Facebook
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5!2d3.1!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+rue+Corneille+Mons-en-Bar%C5%93ul!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baraka Shop — 17 rue Corneille, Mons-en-Barœul"
            />
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
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <DeliverySection />
      <MagasinSection />
      <Footer />
    </>
  );
}
