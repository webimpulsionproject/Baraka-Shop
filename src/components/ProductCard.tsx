"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  Nouveau: "bg-[#2E7D32] text-white",
  Promo:   "bg-[#C62828] text-white",
  Bestseller: "bg-[#C9922A] text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 bg-[#2E7D32] text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
            ✓ Halal
          </span>
          {product.badge && (
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm ${badgeColors[product.badge]}`}>
              {product.badge}
            </span>
          )}
        </div>
        {discount && (
          <span className="absolute top-3 right-3 bg-[#C62828] text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
          {product.category}
        </span>
        <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug group-hover:text-[#2E7D32] transition-colors">
          {product.name}
        </h3>
        {product.weight && (
          <span className="text-xs text-gray-400">{product.weight}</span>
        )}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[#2E7D32]">
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
              added
                ? "bg-[#2E7D32] scale-95"
                : "bg-[#E64A19] hover:bg-[#BF360C] hover:shadow-sm"
            }`}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            {added ? (
              <>✓ Ajouté !</>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
