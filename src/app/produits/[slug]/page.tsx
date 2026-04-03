"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import Footer from "@/components/Footer";

const badgeColors: Record<string, string> = {
  Nouveau:    "bg-[#1B5E20] text-white",
  Promo:      "bg-[#C62828] text-white",
  Bestseller: "bg-[#C9922A] text-white",
  "Aïd":      "bg-[#1B5E20] text-white",
};

function PromoCountdown({ endDate }: { endDate: string }) {
  const end  = new Date(endDate).getTime();
  const now  = Date.now();
  const diff = Math.max(0, end - now);

  const days  = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins  = Math.floor((diff % 3_600_000)  / 60_000);

  if (diff === 0) return null;

  return (
    <div className="inline-flex items-center gap-1.5 bg-[#C62828]/8 text-[#C62828] text-xs font-semibold px-3 py-1.5 rounded-lg">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Promo expire dans {days > 0 ? `${days}j ` : ""}{hours}h {mins}m
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug }        = useParams<{ slug: string }>();
  const router          = useRouter();
  const { addItem }     = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty]   = useState(1);

  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  const related = useMemo(() =>
    products
      .filter((p) => p.category === product?.category && p.slug !== slug)
      .slice(0, 4),
  [product, slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-lg">Produit introuvable.</p>
        <Link href="/produits" className="text-[#1B5E20] font-semibold underline underline-offset-4">
          Retour aux produits
        </Link>
      </div>
    );
  }

  const activePrice  = product.promoPrice ?? product.price;
  const isPromo      = !!product.promoPrice && product.promoPrice < product.price;
  const discountPct  = isPromo
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem({ ...product, price: activePrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#1B5E20] transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/produits" className="hover:text-[#1B5E20] transition-colors">Nos Produits</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate max-w-[180px]">{product.name}</span>
          </nav>
        </div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Image */}
              <div className="relative h-72 md:h-full min-h-[360px] bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {discountPct && (
                  <div className="absolute top-4 left-4 bg-[#C62828] text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-md">
                    -{discountPct}%
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-[#1B5E20]/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  Halal ✓
                </div>
                {product.badge && (
                  <div className={`absolute bottom-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm ${badgeColors[product.badge] ?? ""}`}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-8 flex flex-col gap-5">

                {/* Catégorie + nom */}
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                    {product.category}
                  </span>
                  <h1 className="font-playfair text-3xl font-bold text-gray-900 mt-1 leading-snug">
                    {product.name}
                  </h1>
                </div>

                {/* Promo countdown */}
                {product.promoEndDate && isPromo && (
                  <PromoCountdown endDate={product.promoEndDate} />
                )}

                {/* Prix */}
                <div className="flex items-baseline gap-3">
                  <span className={`text-4xl font-bold ${isPromo ? "text-[#C62828]" : "text-[#1B5E20]"}`}>
                    {activePrice.toFixed(2)} €
                  </span>
                  {isPromo && (
                    <span className="text-xl text-gray-400 line-through">{product.price.toFixed(2)} €</span>
                  )}
                  {product.weight && (
                    <span className="text-sm text-gray-400 ml-1">/ {product.weight}</span>
                  )}
                </div>

                {/* Badges infos */}
                <div className="flex flex-wrap gap-2">
                  {product.origin && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg font-medium">
                      {product.origin}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-[#1B5E20] bg-[#1B5E20]/8 px-2.5 py-1 rounded-lg font-medium">
                    100% Halal certifié
                  </span>
                  {product.decoupeOptions && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#C9922A] bg-[#C9922A]/10 px-2.5 py-1 rounded-lg font-medium">
                      Découpe sur demande
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${
                    product.inStock
                      ? "text-[#1B5E20] bg-[#1B5E20]/8"
                      : "text-red-600 bg-red-50"
                  }`}>
                    {product.inStock
                      ? `En stock${product.stock ? ` (${product.stock} restants)` : ""}`
                      : "Rupture de stock"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-5">
                  {product.description}
                </p>

                {/* Découpe info */}
                {product.decoupeOptions && (
                  <div className="bg-[#C9922A]/8 rounded-xl p-4 text-sm text-[#7A5000]">
                    <p className="font-semibold mb-1">Découpe sur demande</p>
                    <p className="text-xs leading-relaxed text-[#7A5000]/80">
                      Précisez vos préférences dans le champ commentaire lors de votre commande (épaisseur, mode de découpe, etc.). Notre boucher s&apos;adapte à vos besoins.
                    </p>
                  </div>
                )}

                {/* Quantité + Ajouter */}
                <div className="flex items-center gap-3 mt-auto pt-2">
                  {/* Qty */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-gray-900">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(product.stock ?? 99, q + 1))}
                      className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAdd}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                      ${added
                        ? "bg-[#1B5E20] scale-[0.98]"
                        : isPromo
                          ? "bg-[#C62828] hover:bg-[#8E0000] active:scale-95"
                          : "bg-[#E64A19] hover:bg-[#BF360C] active:scale-95"
                      }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Ajouté au panier
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Ajouter au panier
                      </>
                    )}
                  </button>
                </div>

                {/* Voir le panier après ajout */}
                {added && (
                  <Link
                    href="/panier"
                    className="text-center text-sm text-[#1B5E20] font-semibold underline underline-offset-4 hover:text-[#154818] transition-colors"
                  >
                    Voir le panier
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                Dans la même catégorie
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => {
                  const relActive  = p.promoPrice ?? p.price;
                  const relIsPromo = !!p.promoPrice && p.promoPrice < p.price;
                  const relDisc    = relIsPromo
                    ? Math.round(((p.price - p.promoPrice!) / p.price) * 100)
                    : null;

                  return (
                    <Link
                      key={p.slug}
                      href={`/produits/${p.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#1B5E20]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="relative h-36 bg-gray-50 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                          sizes="25vw"
                        />
                        {relDisc && (
                          <div className="absolute top-2 left-2 bg-[#C62828] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            -{relDisc}%
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#1B5E20] transition-colors">
                          {p.name}
                        </p>
                        <p className={`text-sm font-bold mt-1.5 ${relIsPromo ? "text-[#C62828]" : "text-[#1B5E20]"}`}>
                          {relActive.toFixed(2)} €
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
