"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

const badgeColors: Record<string, string> = {
  Nouveau:    "bg-[#1B5E20] text-white",
  Promo:      "bg-[#C62828] text-white",
  Bestseller: "bg-[#C9922A] text-white",
  "Aïd":      "bg-[#1B5E20] text-white",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [ripple, setRipple] = useState(false);

  const activePrice = product.promoPrice ?? product.price;
  const isPromo = !!product.promoPrice && product.promoPrice < product.price;
  const savings = isPromo ? (product.price - product.promoPrice!).toFixed(2) : null;
  const discountPct = isPromo
    ? Math.round(((product.price - product.promoPrice!) / product.price) * 100)
    : null;

  const handleAdd = () => {
    addItem({ ...product, price: activePrice } as Product);
    setAdded(true);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border flex flex-col
        ${isPromo ? "border-[#C62828]/25 hover:border-[#C62828]/50" : "border-gray-100 hover:border-[#1B5E20]/30"}
        hover:shadow-lg hover:-translate-y-1`}
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-50">
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
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
          {product.category}
        </span>
        <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug group-hover:text-[#1B5E20] transition-colors duration-200">
          {product.name}
        </h3>
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

          {/* Bouton avec micro-animation ripple */}
          <button
            onClick={handleAdd}
            disabled={product.inStock === false}
            aria-label={added ? "Produit ajouté au panier" : `Ajouter ${product.name} au panier`}
            className={`relative w-full overflow-hidden flex items-center justify-center gap-1.5 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              ${added
                ? "bg-[#1B5E20] scale-[0.98]"
                : isPromo
                  ? "bg-[#C62828] hover:bg-[#8E0000] active:scale-95"
                  : "bg-[#E64A19] hover:bg-[#BF360C] active:scale-95"
              }`}
          >
            {/* Ripple effect */}
            {ripple && (
              <span className="absolute inset-0 animate-ping rounded-xl bg-white opacity-20" />
            )}

            {added ? (
              <span className="flex items-center gap-1.5 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Ajouté !
              </span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
