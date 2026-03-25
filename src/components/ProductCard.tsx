"use client";

import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, string> = {
  Nouveau: "bg-[#1A6B47] text-white",
  Promo: "bg-red-500 text-white",
  Bestseller: "bg-[#C9922A] text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E4DB] flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-56 overflow-hidden bg-[#F0EDE4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {/* Halal Badge */}
          <span className="inline-flex items-center gap-1 bg-[#1A6B47] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Halal
          </span>

          {/* Optional Badge */}
          {product.badge && (
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${badgeStyles[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Discount badge */}
        {discountPercent && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Category */}
        <span className="text-xs font-medium text-[#C9922A] uppercase tracking-wider">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-playfair text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#1A6B47] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price & CTA */}
        <div className="pt-2 border-t border-[#F0EDE4] flex items-center justify-between gap-3">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#1A6B47]">
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className="flex items-center gap-1.5 bg-[#1A6B47] hover:bg-[#C9922A] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap shadow-sm"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
