import Link from "next/link";
import { products, reviews } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PromoWeekSection from "@/components/PromoWeekSection";

function AidBanner() {
  return (
    <section className="bg-[#1B5E20] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="none" stroke="white" strokeWidth="1"/>
              <polygon points="30,15 45,23 45,37 30,45 15,37 15,23" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic)" />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-white font-semibold text-sm sm:text-base">
              🐑 <strong>Spécial Aïd el-Adha</strong> — Réservez votre mouton dès maintenant
            </p>
            <p className="text-white/65 text-xs mt-0.5">Découpe sur place incluse • Stocks limités</p>
          </div>
          <Link href="/produits?categorie=aid" className="flex-shrink-0 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all hover:shadow-md">
            Réserver →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative bg-[#1B5E20] overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-black/5" />
        <div className="absolute top-0 right-0 w-2/5 h-full bg-[#154818]/30 skew-x-[-10deg] translate-x-20" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✓ Certifié Halal ACMF
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] mb-5">
              La Meilleure{" "}
              <span className="text-[#C9922A]">Viande Halal</span>
              <br />de Mons-en-Barœul
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Boucherie artisanale, traiteur et épicerie vrac.{" "}
              <strong className="text-white">Viandes fraîches découpées à la demande.</strong>{" "}
              Click & Collect en 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link href="/produits" className="btn-primary text-base px-8 py-3.5">Voir nos produits →</Link>
              <Link href="#collecte" className="btn-outline-white text-base px-8 py-3.5">Click & Collect</Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {[
                { val: "4,6 ★", sub: "109 avis" },
                { val: "100%", sub: "Halal certifié" },
                { val: "6j/7", sub: "Ouvert" },
                { val: "+10 ans", sub: "d'expérience" },
              ].map((s) => (
                <div key={s.sub}>
                  <p className="font-playfair text-2xl font-bold text-[#C9922A]">{s.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&h=480&fit=crop&auto=format"
              alt="Boucherie Halal Baraka Shop"
              className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: "☪",  title: "100% Halal Certifié",      sub: "ACMF contrôlé" },
    { icon: "🕐", title: "Click & Collect 30 min",    sub: "Commandez en ligne" },
    { icon: "🔪", title: "Découpe sur demande",        sub: "Service inclus" },
    { icon: "🏪", title: "Ouvert 6j/7",               sub: "Sauf lundi" },
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

function Categories() {
  const cats = [
    { icon: "🥩", name: "Bœuf & Veau",       sub: "Charolais, Merguez, Rosbif",    color: "#1B5E20" },
    { icon: "🐑", name: "Agneau",             sub: "Gigot, Côtelettes, Souris",      color: "#E64A19" },
    { icon: "🍗", name: "Volaille",           sub: "Poulet fermier, Dinde",           color: "#C62828" },
    { icon: "🍲", name: "Traiteur",           sub: "Couscous, Tajines, BBQ",          color: "#C9922A" },
    { icon: "🌿", name: "Épicerie Vrac",      sub: "Épices, Légumineuses, Huiles",    color: "#2E7D32" },
  ];
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Nos Rayons</h2>
          <p className="text-gray-500 mt-2 text-sm">Boucherie · Traiteur · Épicerie vrac — tout en un</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {cats.map((c) => (
            <Link
              key={c.name}
              href="/produits"
              style={{ backgroundColor: c.color }}
              className="text-white rounded-xl p-5 flex flex-col items-center text-center gap-3 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg group"
            >
              <span className="text-4xl">{c.icon}</span>
              <div>
                <h3 className="font-playfair font-bold text-sm leading-tight">{c.name}</h3>
                <p className="text-white/70 text-xs mt-1 leading-snug">{c.sub}</p>
              </div>
              <span className="opacity-50 group-hover:opacity-100 text-sm">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoupeSection() {
  const options = [
    { icon: "🔪", title: "Découpe Standard",       desc: "Incluse gratuitement avec votre achat.",     tag: "Gratuit",   tagColor: "bg-[#1B5E20] text-white" },
    { icon: "⚙️", title: "Découpe Personnalisée", desc: "Morceaux sur mesure selon vos préférences.",  tag: "+2€/kg",    tagColor: "bg-[#C9922A] text-white" },
    { icon: "🐑", title: "Service Aïd",            desc: "Mouton entier, mise sous vide disponible.",  tag: "Sur réservation", tagColor: "bg-[#C62828] text-white" },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">La découpe, c&apos;est notre métier</h2>
          <p className="text-gray-500 mt-2 text-sm">Un service artisanal au service de vos besoins</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {options.map((o) => (
            <div key={o.title} className="card p-6 text-center">
              <div className="text-4xl mb-4">{o.icon}</div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${o.tagColor}`}>{o.tag}</span>
              <h3 className="font-playfair font-bold text-gray-900 text-base mb-2">{o.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.filter((p) => p.badge === "Bestseller").slice(0, 6);
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="section-title">Nos Incontournables</h2>
            <p className="text-gray-500 mt-1 text-sm">Fraîcheur du jour, qualité garantie.</p>
          </div>
          <Link href="/produits" className="text-[#E64A19] font-semibold hover:text-[#BF360C] transition-colors whitespace-nowrap text-sm group">
            Voir nos produits <span className="group-hover:translate-x-0.5 inline-block transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function DeliverySection() {
  return (
    <section id="collecte" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Commandez Facilement</h2>
          <p className="text-gray-500 mt-2 text-sm">Deux options pour recevoir vos produits halal</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Click & Collect — DISPONIBLE */}
          <div className="bg-[#1B5E20] text-white rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🏪</span>
              <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-full">✓ Disponible</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold mb-1">Click & Collect</h3>
            <p className="text-white/65 text-sm mb-6">Prêt en 30 minutes · Gratuit</p>
            <ol className="space-y-3 mb-8">
              {["Choisissez vos produits en ligne","Sélectionnez votre créneau","Récupérez au 17 rue Corneille"].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="w-5 h-5 rounded-full bg-[#C9922A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <Link href="/produits" className="inline-flex items-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm hover:shadow-md">
              Commander →
            </Link>
          </div>
          {/* Livraison — BIENTOT */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 opacity-70">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl grayscale">🚚</span>
              <span className="bg-gray-200 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">Bientôt disponible</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-500 mb-1">Livraison à domicile</h3>
            <p className="text-gray-400 text-sm mb-6">Zone locale · Bientôt disponible</p>
            <p className="text-gray-400 text-sm mb-6">Nous travaillons à la mise en place de la livraison à domicile. Laissez votre email pour être alerté en priorité.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="votre@email.fr" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none" />
              <button className="bg-gray-300 text-gray-600 font-semibold px-4 py-2.5 rounded-lg text-sm">M&apos;alerter</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AidPacks() {
  const packs = [
    { icon:"🐑", name:"Pack Famille",  desc:"Mouton entier + découpe complète",   price:"dès 280€", badge:"Aïd el-Adha" },
    { icon:"🐑", name:"Pack Duo",      desc:"Demi-mouton + découpe sur place",    price:"dès 150€", badge:"Populaire" },
    { icon:"🔪", name:"Pack Découpe",  desc:"Service découpe uniquement",         price:"dès 45€",  badge:"Service" },
  ];
  return (
    <section className="py-16 bg-[#1B5E20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/90 text-sm px-4 py-1.5 rounded-full mb-4">🐑 Spécial Aïd el-Adha</div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-2">Nos Packs Aïd</h2>
          <p className="text-white/60 text-sm">Réservez dès maintenant — Stocks limités</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {packs.map((p) => (
            <div key={p.name} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-white text-center">
              <div className="text-5xl mb-4">{p.icon}</div>
              <span className="inline-block bg-[#C9922A] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{p.badge}</span>
              <h3 className="font-playfair font-bold text-xl mb-2">{p.name}</h3>
              <p className="text-white/70 text-sm mb-4">{p.desc}</p>
              <p className="font-playfair text-2xl font-bold text-[#C9922A] mb-5">{p.price}</p>
              <Link href="/commande" className="btn-promo w-full justify-center text-sm py-2.5">Réserver →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <section className="py-16 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="font-playfair text-5xl font-bold text-[#C9922A]">{avgRating}</p>
            <div>
              <div className="flex gap-0.5 text-[#C9922A]">{"★".repeat(5)}</div>
              <p className="text-white/50 text-xs mt-0.5">{reviews.length} avis vérifiés</p>
            </div>
          </div>
          <h2 className="font-playfair text-3xl font-bold text-white mb-1">Ce que disent nos clients</h2>
          <p className="text-white/50 text-sm">La meilleure boucherie halal de Mons-en-Barœul</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5 text-[#C9922A] text-sm">{"★".repeat(r.rating)}</div>
                <span className="text-white/30 text-xs">{r.date}</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">&ldquo;{r.comment}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold text-sm">{r.name}</p>
                {r.product && <span className="text-white/40 text-xs">{r.product}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn-outline-white text-sm px-8 py-3">Laisser un avis →</button>
        </div>
      </div>
    </section>
  );
}

function MagasinSection() {
  return (
    <section id="magasin" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Nous trouver</h2>
          <p className="text-gray-500 mt-2 text-sm">17 rue Corneille, 59370 Mons-en-Barœul</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <div className="card p-6 space-y-5">
              {[
                { icon:"📍", title:"Adresse", content:<p className="text-gray-600 text-sm">17 rue Corneille<br />59370 Mons-en-Barœul, Nord</p> },
                { icon:"🕐", title:"Horaires", content:<table className="text-sm w-full"><tbody className="divide-y divide-gray-50">{[{day:"Lundi",h:"Fermé",c:true},{day:"Mar – Sam",h:"8h30 – 20h00"},{day:"Dimanche",h:"9h30 – 20h00"}].map(r=><tr key={r.day}><td className="py-1.5 text-gray-500 pr-4 text-xs">{r.day}</td><td className={`py-1.5 font-semibold text-xs ${r.c?"text-[#C62828]":"text-[#1B5E20]"}`}>{r.h}</td></tr>)}</tbody></table> },
                { icon:"📞", title:"Contact", content:<div className="space-y-0.5"><a href="tel:0952291306" className="block text-sm text-[#1B5E20] hover:underline">09 52 29 13 06</a><a href="mailto:contact.barakashop@gmail.com" className="block text-sm text-[#1B5E20] hover:underline">contact.barakashop@gmail.com</a></div> },
              ].map(item=>(
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-[#1B5E20]/8 rounded-lg flex items-center justify-center flex-shrink-0"><span>{item.icon}</span></div>
                  <div><p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>{item.content}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="https://maps.google.com/?q=17+rue+Corneille+59370+Mons-en-Baroeul" target="_blank" rel="noopener noreferrer" className="btn-green text-sm flex-1 justify-center py-3">📍 Itinéraire</a>
              <a href="https://www.facebook.com/Barakashop17/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all flex-1">📘 Facebook</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[420px]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5!2d3.1!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+rue+Corneille+Mons-en-Bar%C5%93ul!5e0!3m2!1sfr!2sfr!4v1" width="100%" height="420" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Baraka Shop" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <AidBanner />
      <Hero />
      <TrustBar />
      <PromoWeekSection />
      <Categories />
      <CoupeSection />
      <FeaturedProducts />
      <DeliverySection />
      <AidPacks />
      <ReviewsSection />
      <MagasinSection />
      <Footer />
    </>
  );
}
