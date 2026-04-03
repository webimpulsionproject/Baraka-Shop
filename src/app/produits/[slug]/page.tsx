import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";
import ProductCard, { CardProduct } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const badgeColors: Record<string, string> = {
  Nouveau:    "bg-[#1B5E20] text-white",
  Promo:      "bg-[#C62828] text-white",
  Bestseller: "bg-[#C9922A] text-white",
  "Aïd":      "bg-[#1B5E20] text-white",
};

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, related] = await Promise.all([
    prisma.product.findUnique({ where: { slug: params.slug } }),
    prisma.product.findMany({
      where: { slug: { not: params.slug } },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  if (!product) notFound();

  const isPromo     = !!product.promoPrice && product.promoPrice < product.price;
  const activePrice = product.promoPrice ?? product.price;
  const discountPct = isPromo
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : null;

  // Fetch related from same category after we have the product
  const sameCategory = await prisma.product.findMany({
    where: { category: product.category, slug: { not: params.slug } },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  const relatedProducts: CardProduct[] = (sameCategory.length >= 2 ? sameCategory : related).slice(0, 4);

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
                {product.badge && (
                  <div className={`absolute bottom-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm ${badgeColors[product.badge] ?? ""}`}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-8 flex flex-col gap-5">

                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                    {product.category}
                  </span>
                  <h1 className="font-playfair text-3xl font-bold text-gray-900 mt-1 leading-snug">
                    {product.name}
                  </h1>
                </div>

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

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.origin && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg font-medium">
                      {product.origin}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-[#1B5E20] bg-[#1B5E20]/8 px-2.5 py-1 rounded-lg font-medium">
                    100% Halal certifie
                  </span>
                  {product.decoupeOptions && (
                    <span className="inline-flex items-center gap-1 text-xs text-[#C9922A] bg-[#C9922A]/10 px-2.5 py-1 rounded-lg font-medium">
                      Decoupe sur demande
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium ${
                    product.inStock ? "text-[#1B5E20] bg-[#1B5E20]/8" : "text-red-600 bg-red-50"
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

                {product.decoupeOptions && (
                  <div className="bg-[#C9922A]/8 rounded-xl p-4 text-sm text-[#7A5000]">
                    <p className="font-semibold mb-1">Decoupe sur demande</p>
                    <p className="text-xs leading-relaxed text-[#7A5000]/80">
                      Precisez vos preferences lors de votre visite en boutique. Notre boucher s&apos;adapte a vos besoins.
                    </p>
                  </div>
                )}

                {/* CTA vitrine */}
                <div className="mt-auto pt-2 space-y-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">Commande en ligne <span className="font-semibold text-gray-700">prochainement</span></p>
                    <p className="text-xs text-gray-400">Retrouvez ce produit au 17 rue Corneille, Mons-en-Baroeul</p>
                  </div>
                  <a
                    href="tel:0952291306"
                    className="w-full flex items-center justify-center gap-2 bg-[#1B5E20] hover:bg-[#154818] text-white font-semibold py-3 rounded-xl text-sm transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Appeler la boutique
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Vous aimerez aussi</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
