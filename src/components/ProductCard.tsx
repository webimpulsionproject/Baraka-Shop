import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";

const badgeColors: Record<string, string> = {
  Nouveau:    "bg-[#1B5E20] text-white",
  Promo:      "bg-[#C62828] text-white",
  Bestseller: "bg-[#C9922A] text-white",
  "Aïd":      "bg-[#1B5E20] text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const activePrice = product.promoPrice ?? product.price;
  const isPromo = !!product.promoPrice && product.promoPrice < product.price;
  const savings = isPromo ? (product.price - product.promoPrice!).toFixed(2) : null;
  const discountPct = isPromo
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : null;

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border flex flex-col
        ${isPromo ? "border-[#C62828]/25 hover:border-[#C62828]/50" : "border-gray-100 hover:border-[#1B5E20]/30"}
        hover:shadow-lg hover:-translate-y-1`}
    >
      {/* Image */}
      <Link href={`/produits/${product.slug}`} className="relative h-52 w-full overflow-hidden bg-gray-50 block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Discount badge */}
        {discountPct && (
          <div className="absolute top-3 left-3 bg-[#C62828] text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow-md">
            -{discountPct}%
          </div>
        )}
        {/* Halal badge */}
        <div className="absolute top-3 right-3 bg-[#1B5E20]/90 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-md">
          Halal ✓
        </div>
        {/* Optional badge */}
        {product.badge && product.badge !== "Promo" && (
          <div className={`absolute bottom-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm ${badgeColors[product.badge]}`}>
            {product.badge}
          </div>
        )}
        {/* Out of stock overlay */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full">
              Rupture de stock
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
          {product.category}
        </span>
        <Link href={`/produits/${product.slug}`} className="font-playfair font-bold text-gray-900 text-base leading-snug hover:text-[#1B5E20] transition-colors duration-200 block">
          {product.name}
        </Link>
        {product.weight && (
          <span className="text-xs text-gray-400">{product.weight}</span>
        )}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          {isPromo ? (
            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#C62828]">
                  {activePrice.toFixed(2)} €
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price.toFixed(2)} €
                </span>
              </div>
              <span className="text-xs text-[#C62828] font-medium">
                Économisez {savings} €
              </span>
            </div>
          ) : (
            <div className="mb-2">
              <span className="text-xl font-bold text-[#1B5E20]">
                {activePrice.toFixed(2)} €
              </span>
            </div>
          )}

          <Link
            href={`/produits/${product.slug}`}
            className={`w-full flex items-center justify-center gap-1.5 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95
              ${isPromo ? "bg-[#C62828] hover:bg-[#8E0000]" : "bg-[#1B5E20] hover:bg-[#154818]"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  );
}
