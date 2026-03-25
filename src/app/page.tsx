import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-[#2E7D32] overflow-hidden min-h-[620px] flex items-center">
      {/* Formes décoratives subtiles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-black/5" />
        <div className="absolute top-0 right-0 w-2/5 h-full bg-[#1B5E20]/30 skew-x-[-10deg] translate-x-24" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ☪ Boucherie Halal Certifiée — Mons-en-Barœul
            </div>

            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-[1.15] mb-5">
              La Meilleure{" "}
              <span className="text-[#C9922A]">Viande Halal</span>
              <br />
              <span className="text-white/80 text-3xl sm:text-4xl lg:text-[2.5rem]">
                de la région
              </span>
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Races françaises d&apos;exception, découpées à la demande.{" "}
              <strong className="text-white font-semibold">Click & Collect en 30 min</strong>{" "}
              ou livraison locale. Tout 100 % halal certifié.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link href="/catalogue" className="btn-primary text-base px-8 py-3.5">
                Voir nos viandes →
              </Link>
              <Link href="#collecte" className="btn-outline-white text-base px-8 py-3.5">
                Click & Collect
              </Link>
            </div>

            {/* Chiffres clés */}
            <div className="flex flex-wrap gap-8">
              {[
                { val: "4,6 ★", sub: "109 avis clients" },
                { val: "100%", sub: "Halal certifié" },
                { val: "6j/7", sub: "Ouvert (sf lundi)" },
                { val: "30 min", sub: "Click & Collect" },
              ].map((s) => (
                <div key={s.sub}>
                  <p className="font-playfair text-2xl font-bold text-[#C9922A]">{s.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo hero */}
          <div className="hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=640&h=480&fit=crop&auto=format"
              alt="Boucherie Halal Baraka Shop"
              className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Barre de confiance ────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "☪", title: "100% Halal Certifié", sub: "Contrôlé et certifié" },
    { icon: "🏪", title: "Click & Collect 30 min", sub: "Commandez en ligne" },
    { icon: "🚚", title: "Livraison Locale", sub: "Mons-en-Barœul et alentours" },
    { icon: "🕐", title: "Ouvert 6j/7", sub: "Sauf lundi" },
  ];
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-tight">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Catégories ────────────────────────────────────────────────────────────────
function Categories() {
  const cats = [
    { icon: "🥩", name: "Bœuf & Veau",          sub: "Charolais, Merguez, Découpé",       bg: "#2E7D32" },
    { icon: "🐑", name: "Agneau",                sub: "Gigot, Épaule, Côtelettes",         bg: "#E64A19" },
    { icon: "🍗", name: "Volaille",              sub: "Poulet fermier, Dinde",              bg: "#C62828" },
    { icon: "🔥", name: "Traiteur & Épicerie",   sub: "Brochettes, Colis BBQ, Épices",     bg: "#C9922A" },
  ];
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Nos Rayons</h2>
          <p className="text-gray-500 mt-2">Boucherie · Traiteur · Épicerie vrac — tout en un</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c) => (
            <Link
              key={c.name}
              href="/catalogue"
              style={{ backgroundColor: c.bg }}
              className="text-white rounded-xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg group"
            >
              <span className="text-4xl">{c.icon}</span>
              <div>
                <h3 className="font-playfair font-bold text-base leading-tight">{c.name}</h3>
                <p className="text-white/75 text-xs mt-1 leading-snug">{c.sub}</p>
              </div>
              <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sm">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Produits vedettes ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const featured = products.filter((p) => p.badge === "Bestseller").slice(0, 6);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="section-title">Nos Produits du Moment</h2>
            <p className="text-gray-500 mt-1 text-sm">Fraîcheur du jour, qualité garantie.</p>
          </div>
          <Link href="/catalogue" className="text-[#E64A19] font-semibold hover:text-[#BF360C] transition-colors whitespace-nowrap text-sm group">
            Tout le catalogue{" "}
            <span className="group-hover:translate-x-0.5 inline-block transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Click & Collect vs Livraison ──────────────────────────────────────────────
function DeliverySection() {
  return (
    <section id="collecte" className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Commandez Facilement</h2>
          <p className="text-gray-500 mt-2">Deux options pour recevoir vos produits halal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Click & Collect */}
          <div className="bg-[#2E7D32] text-white rounded-2xl p-8">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="font-playfair text-2xl font-bold mb-1">Click & Collect</h3>
            <p className="text-white/65 text-sm mb-6">Prêt en 30 minutes · Gratuit</p>
            <ol className="space-y-3 mb-8">
              {[
                "Choisissez vos produits en ligne",
                "Sélectionnez votre créneau horaire",
                "Récupérez au 17 rue Corneille",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="w-5 h-5 rounded-full bg-[#C9922A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md text-sm">
              Commander pour récupérer →
            </Link>
          </div>

          {/* Livraison */}
          <div className="bg-[#E64A19] text-white rounded-2xl p-8">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-playfair text-2xl font-bold mb-1">Livraison à Domicile</h3>
            <p className="text-white/65 text-sm mb-6">Zone locale · Gratuite dès 50 €</p>
            <ol className="space-y-3 mb-8">
              {[
                "Commandez avant 11h",
                "Livraison entre 16h et 19h",
                "Paiement possible à la livraison",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <Link href="/catalogue" className="inline-flex items-center gap-2 bg-white text-[#E64A19] hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md text-sm">
              Commander en livraison →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Section magasin + Google Maps ─────────────────────────────────────────────
function MagasinSection() {
  return (
    <section id="magasin" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Notre Magasin</h2>
          <p className="text-gray-500 mt-2">17 rue Corneille, 59370 Mons-en-Barœul</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Infos */}
          <div className="space-y-5">
            <div className="card p-6 space-y-5">
              {[
                {
                  icon: "📍",
                  title: "Adresse",
                  content: <p className="text-gray-600 text-sm">17 rue Corneille<br />59370 Mons-en-Barœul, Nord</p>,
                },
                {
                  icon: "🕐",
                  title: "Horaires",
                  content: (
                    <table className="text-sm w-full">
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { day: "Lundi", hours: "Fermé", closed: true },
                          { day: "Mardi – Samedi", hours: "8h30 – 20h00" },
                          { day: "Dimanche", hours: "9h30 – 20h00" },
                        ].map((r) => (
                          <tr key={r.day}>
                            <td className="py-1.5 text-gray-500 pr-4 text-xs">{r.day}</td>
                            <td className={`py-1.5 font-semibold text-xs ${r.closed ? "text-[#C62828]" : "text-[#2E7D32]"}`}>
                              {r.hours}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ),
                },
                {
                  icon: "📞",
                  title: "Contact",
                  content: (
                    <div className="space-y-0.5">
                      <a href="tel:0952291306" className="block text-sm text-[#2E7D32] hover:underline">09 52 29 13 06</a>
                      <a href="mailto:contact.barakashop@gmail.com" className="block text-sm text-[#2E7D32] hover:underline">contact.barakashop@gmail.com</a>
                    </div>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#2E7D32]/8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="https://maps.google.com/?q=17+rue+Corneille+59370+Mons-en-Baroeul"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-sm flex-1 justify-center py-3"
              >
                📍 Itinéraire Google Maps
              </a>
              <a
                href="https://www.facebook.com/Barakashop17/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all"
              >
                📘 Facebook
              </a>
            </div>
          </div>

          {/* Carte Google Maps — unique sur la page */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[420px]">
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
