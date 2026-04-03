import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PromoWeekSection from "@/components/PromoWeekSection";

export const dynamic = "force-dynamic";

/* ── Icones SVG inline ────────────────────────────────────────── */
function IconHalal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconKnife() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75l9 9-1.5 1.5-3-3L9 15l-1.5-1.5 3.75-3.75-3-3L6 9l-1.5-1.5 3-3z" />
    </svg>
  );
}
function IconStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}
function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

/* ── Banniere Aid ─────────────────────────────────────────────── */
function AidBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <section className="bg-[#5D3A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white text-sm text-center sm:text-left">
            <strong>Special Aid el-Adha</strong>
            <span className="text-white/70"> — Reservez votre mouton, stocks limites · Decoupe sur place incluse</span>
          </p>
          <Link
            href="/produits?categorie=aid"
            className="flex-shrink-0 border border-[#C9922A] text-[#C9922A] hover:bg-[#C9922A] hover:text-white text-xs font-semibold px-4 py-1.5 rounded transition-all"
          >
            Reserver
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative bg-[#0F3D15] overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=1400&h=800&fit=crop&auto=format&q=80"
          alt="Boucherie Baraka Shop"
          fill
          className="object-cover opacity-25"
          priority
          unoptimized
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 border border-[#C9922A]/50 text-[#C9922A] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <IconHalal />
            Certifie Halal ACMF
          </div>

          {/* Titre */}
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            La Meilleure<br />
            <span className="text-[#C9922A]">Viande Halal</span><br />
            du Nord
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
            Boucherie artisanale, traiteur et epicerie vrac a Mons-en-Baroeul.
            Viandes fraiches decoupees a la demande. Click &amp; Collect en 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 bg-[#C9922A] hover:bg-[#A87520] text-white font-semibold px-8 py-4 rounded-lg transition-all text-sm tracking-wide"
            >
              Voir nos produits
              <IconArrow />
            </Link>
            <Link
              href="#collecte"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-all text-sm tracking-wide"
            >
              Click &amp; Collect
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/10">
            {[
              { val: "4.6", sub: "Note moyenne · 109 avis" },
              { val: "100%", sub: "Halal certifie" },
              { val: "6j/7", sub: "Ouvert" },
              { val: "+10 ans", sub: "d'experience" },
            ].map((s) => (
              <div key={s.sub}>
                <p className="font-playfair text-3xl font-bold text-[#C9922A]">{s.val}</p>
                <p className="text-white/40 text-xs mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Bar ────────────────────────────────────────────────── */
function TrustBar() {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "100% Halal Certifie",
      sub: "Controle ACMF",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
        </svg>
      ),
      title: "Click & Collect 30 min",
      sub: "Commandez en ligne",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      title: "Decoupe sur demande",
      sub: "Service inclus",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Ouvert 6j/7",
      sub: "Sauf lundi",
    },
  ];
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-4 px-6 py-4 bg-white">
              <div className="w-10 h-10 rounded-xl bg-[#1B5E20]/8 flex items-center justify-center text-[#1B5E20] flex-shrink-0">
                {item.icon}
              </div>
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

/* ── Categories ───────────────────────────────────────────────── */
function Categories() {
  const cats = [
    {
      name: "Boeuf & Veau",
      sub: "Charolais, Merguez, Rosbif",
      bg: "bg-[#1B5E20]",
      href: "/produits?categorie=boeuf",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
    },
    {
      name: "Agneau",
      sub: "Gigot, Cotelettes, Souris",
      bg: "bg-[#E64A19]",
      href: "/produits?categorie=agneau",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
    },
    {
      name: "Volaille",
      sub: "Poulet fermier, Dinde",
      bg: "bg-[#C62828]",
      href: "/produits?categorie=volaille",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
    },
    {
      name: "Traiteur",
      sub: "Couscous, Tajines, BBQ",
      bg: "bg-[#C9922A]",
      href: "/produits?categorie=traiteur",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 4.5v5.25m6-5.25v5.25m6-5.25v1.5a3 3 0 01-3 3H9a3 3 0 01-3-3v-1.5" />
        </svg>
      ),
    },
    {
      name: "Epicerie Vrac",
      sub: "Epices, Legumineuses, Huiles",
      bg: "bg-[#2E7D32]",
      href: "/epicerie",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Nos rayons</p>
          <h2 className="font-playfair text-4xl font-bold text-gray-900">
            Boucherie · Traiteur · Epicerie
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {cats.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className={`${c.bg} text-white rounded-2xl p-6 flex flex-col gap-4 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 group`}
            >
              <div className="opacity-80">{c.icon}</div>
              <div>
                <h3 className="font-playfair font-bold text-sm leading-tight">{c.name}</h3>
                <p className="text-white/60 text-xs mt-1 leading-snug">{c.sub}</p>
              </div>
              <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <IconArrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Decoupe ──────────────────────────────────────────────────── */
function CoupeSection({ showAid }: { showAid: boolean }) {
  const options = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: "Decoupe Standard",
      desc: "Incluse gratuitement avec votre achat.",
      tag: "Gratuit",
      tagClass: "bg-[#1B5E20] text-white",
      show: true,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      ),
      title: "Decoupe Personnalisee",
      desc: "Morceaux sur mesure selon vos preferences.",
      tag: "+2€/kg",
      tagClass: "bg-[#C9922A] text-white",
      show: true,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H18v-.008zm0 2.25h.008v.008H18V15z" />
        </svg>
      ),
      title: "Service Aid",
      desc: "Mouton entier, mise sous vide disponible.",
      tag: "Sur reservation",
      tagClass: "bg-[#C62828] text-white",
      show: showAid,
    },
  ].filter((o) => o.show);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Artisanat</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-5">
              La decoupe,<br />c&apos;est notre metier
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Chaque morceau est prepare par nos bouchers artisans selon vos exigences.
              Nous travaillons uniquement des viandes halal certifiees, fraiches du jour.
            </p>
            <Link href="/produits" className="inline-flex items-center gap-2 text-[#1B5E20] font-semibold text-sm hover:gap-3 transition-all">
              Voir nos produits
              <IconArrow />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {options.map((o) => (
              <div key={o.title} className="flex items-start gap-5 p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center text-[#1B5E20] flex-shrink-0">
                  {o.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{o.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o.tagClass}`}>{o.tag}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Featured Products ────────────────────────────────────────── */
function FeaturedProducts({ featured }: { featured: Product[] }) {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Selection</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900">Nos Incontournables</h2>
            <p className="text-gray-400 mt-2 text-sm">Fraicheur du jour, qualite garantie</p>
          </div>
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-[#1B5E20] font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap"
          >
            Tous les produits
            <IconArrow />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Livraison ────────────────────────────────────────────────── */
function DeliverySection() {
  return (
    <section id="collecte" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Livraison</p>
          <h2 className="font-playfair text-4xl font-bold text-gray-900">Commandez Facilement</h2>
          <p className="text-gray-400 mt-2 text-sm">Deux options pour recevoir vos produits</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl">
          {/* Click & Collect — Bientot */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <IconStore />
              </div>
              <span className="bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">Bientot</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-400 mb-1">Click &amp; Collect</h3>
            <p className="text-gray-400 text-sm mb-8">Pret en 30 minutes · Gratuit</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Commandez en ligne et recuperez vos produits en boutique sous 30 minutes.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
              />
              <button className="bg-gray-200 text-gray-500 font-semibold px-4 py-3 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                M&apos;alerter
              </button>
            </div>
          </div>

          {/* Livraison — Bientot */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <IconTruck />
              </div>
              <span className="bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-full">Bientot</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-400 mb-1">Livraison a domicile</h3>
            <p className="text-gray-400 text-sm mb-8">Zone locale · En cours de preparation</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Laissez votre email pour etre parmi les premiers a en beneficier.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
              />
              <button className="bg-gray-200 text-gray-500 font-semibold px-4 py-3 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                M&apos;alerter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Packs Aid ────────────────────────────────────────────────── */
function AidPacks({ show }: { show: boolean }) {
  if (!show) return null;
  const packs = [
    {
      name: "Pack Famille",
      desc: "Mouton entier + decoupe complete",
      price: "des 280€",
      badge: "Aid el-Adha",
    },
    {
      name: "Pack Duo",
      desc: "Demi-mouton + decoupe sur place",
      price: "des 150€",
      badge: "Populaire",
    },
    {
      name: "Pack Decoupe",
      desc: "Service decoupe uniquement",
      price: "des 45€",
      badge: "Service",
    },
  ];

  return (
    <section className="py-20 bg-[#0F3D15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Reservation</p>
          <h2 className="font-playfair text-4xl font-bold text-white mb-2">Nos Packs Aid</h2>
          <p className="text-white/40 text-sm">Stocks limites — Reservez des maintenant</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
          {packs.map((p) => (
            <div
              key={p.name}
              className="border border-white/10 rounded-2xl p-7 hover:border-[#C9922A]/50 hover:bg-white/5 transition-all"
            >
              <span className="inline-block border border-[#C9922A]/50 text-[#C9922A] text-xs font-semibold px-3 py-1 rounded-full mb-5">
                {p.badge}
              </span>
              <h3 className="font-playfair font-bold text-xl text-white mb-2">{p.name}</h3>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">{p.desc}</p>
              <p className="font-playfair text-3xl font-bold text-[#C9922A] mb-6">{p.price}</p>
              <Link
                href="/commande"
                className="inline-flex items-center gap-2 border border-white/20 text-white hover:border-[#C9922A] hover:text-[#C9922A] font-semibold px-5 py-2.5 rounded-lg text-sm transition-all"
              >
                Reserver
                <IconArrow />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Avis ─────────────────────────────────────────────────────── */
type DisplayReview = { id: number; author: string; rating: number; text: string; date: string };

function ReviewsSection({ reviews }: { reviews: DisplayReview[] }) {
  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";
  return (
    <section className="py-20 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-playfair text-5xl font-bold text-[#C9922A]">{avg}</span>
              <div>
                <div className="flex gap-0.5 text-[#C9922A]">
                  {[...Array(5)].map((_, i) => <IconStar key={i} />)}
                </div>
                <p className="text-white/30 text-xs mt-1">{reviews.length} avis verifies</p>
              </div>
            </div>
            <h2 className="font-playfair text-4xl font-bold text-white">Ce que disent nos clients</h2>
          </div>
          <button className="self-start border border-white/15 text-white/60 hover:text-white hover:border-white/30 font-semibold px-6 py-3 rounded-lg text-sm transition-all whitespace-nowrap">
            Laisser un avis
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white/5 border border-white/8 rounded-xl p-6 hover:border-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5 text-[#C9922A]">
                  {[...Array(r.rating)].map((_, i) => <IconStar key={i} />)}
                </div>
                <span className="text-white/25 text-xs">{r.date}</span>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <p className="text-white font-semibold text-sm">{r.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Magasin ──────────────────────────────────────────────────── */
function MagasinSection() {
  return (
    <section id="magasin" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Localisation</p>
          <h2 className="font-playfair text-4xl font-bold text-gray-900">Nous trouver</h2>
          <p className="text-gray-400 mt-2 text-sm">17 rue Corneille, 59370 Mons-en-Baroeul</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {/* Adresse */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-[#1B5E20]/8 rounded-lg flex items-center justify-center text-[#1B5E20] flex-shrink-0">
                <IconPin />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Adresse</p>
                <p className="text-gray-500 text-sm leading-relaxed">17 rue Corneille<br />59370 Mons-en-Baroeul, Nord</p>
              </div>
            </div>

            {/* Horaires */}
            <div className="p-5 rounded-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-[#1B5E20]/8 rounded-lg flex items-center justify-center text-[#1B5E20] flex-shrink-0">
                  <IconClock />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Horaires</p>
              </div>
              <table className="text-sm w-full">
                <tbody className="divide-y divide-gray-50">
                  {[
                    { day: "Lundi", h: "Ferme", closed: true },
                    { day: "Mardi – Samedi", h: "8h30 – 20h00" },
                    { day: "Dimanche", h: "9h30 – 20h00" },
                  ].map((r) => (
                    <tr key={r.day}>
                      <td className="py-2 text-gray-400 text-xs pr-4">{r.day}</td>
                      <td className={`py-2 font-semibold text-xs ${r.closed ? "text-[#C62828]" : "text-[#1B5E20]"}`}>{r.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-[#1B5E20]/8 rounded-lg flex items-center justify-center text-[#1B5E20] flex-shrink-0">
                <IconPhone />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 text-sm mb-2">Contact</p>
                <a href="tel:0952291306" className="flex items-center gap-2 text-sm text-[#1B5E20] hover:underline">
                  09 52 29 13 06
                </a>
                <a href="mailto:contact.barakashop@gmail.com" className="flex items-center gap-2 text-sm text-[#1B5E20] hover:underline">
                  contact.barakashop@gmail.com
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <a
                href="https://maps.google.com/?q=17+rue+Corneille+59370+Mons-en-Baroeul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1B5E20] hover:bg-[#154818] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all"
              >
                <IconPin />
                Itineraire
              </a>
              <a
                href="https://www.facebook.com/Barakashop17/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Carte */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 h-[460px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.5!2d3.1!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s17+rue+Corneille+Mons-en-Bar%C5%93ul!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="460"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baraka Shop — 17 rue Corneille"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default async function HomePage() {
  const [dbProducts, dbReviews, modeAid] = await Promise.all([
    prisma.product.findMany({
      where: { badge: "Bestseller", inStock: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.siteSettings.findUnique({ where: { key: "mode_aid" } }),
  ]);

  const featured = dbProducts.map((p) => ({ ...p, isHalal: true as const })) as unknown as Product[];
  const showAid = modeAid?.value === "true";

  return (
    <>
      <AidBanner show={showAid} />
      <Hero />
      <TrustBar />
      <PromoWeekSection />
      <Categories />
      <CoupeSection showAid={showAid} />
      <FeaturedProducts featured={featured} />
      <DeliverySection />
      <AidPacks show={showAid} />
      <ReviewsSection reviews={dbReviews} />
      <MagasinSection />
      <Footer />
    </>
  );
}
