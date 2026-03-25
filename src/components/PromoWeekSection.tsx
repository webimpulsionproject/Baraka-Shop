"use client";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import { products } from "@/lib/data";

export default function PromoWeekSection() {
  const promoProducts = products.filter(p => p.promoPrice && p.promoPrice < p.price).slice(0, 4);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#C62828]/8 border border-[#C62828]/20 text-[#C62828] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🔥 Offres limitées
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
            🔥 Offres de la semaine
          </h2>
          <p className="text-gray-500 text-sm">Profitez de nos promotions exclusives — Durée limitée</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {promoProducts.map((product) => {
            const discount = Math.round(((product.price - product.promoPrice!) / product.price) * 100);
            const savings = (product.price - product.promoPrice!).toFixed(2);
            const isLowStock = product.stock !== undefined && product.stock <= 8;

            return (
              <div key={product.id} className="bg-white border-2 border-[#C62828]/30 hover:border-[#C62828] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 group">
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#C62828] text-white text-base font-bold px-3 py-1 rounded-lg shadow-md">
                    -{discount}%
                  </div>
                </div>
                {/* Body */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                  <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug mb-1">{product.name}</h3>
                  {product.weight && <p className="text-xs text-gray-400 mb-2">{product.weight}</p>}
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-bold text-[#C62828]">{product.promoPrice!.toFixed(2)} €</span>
                    <span className="text-sm text-gray-400 line-through">{product.price.toFixed(2)} €</span>
                  </div>
                  <p className="text-xs text-[#C62828] font-medium mb-2">Économisez {savings} €</p>
                  {/* Timer */}
                  {product.promoEndDate && (
                    <div className="mb-2">
                      <CountdownTimer endDate={product.promoEndDate} />
                    </div>
                  )}
                  {/* Low stock */}
                  {isLowStock && (
                    <p className="text-xs text-[#C62828] font-semibold mb-2">⚠️ Plus que {product.stock} en stock</p>
                  )}
                  {/* CTA */}
                  <Link href="/produits" className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#C62828] hover:bg-[#8E0000] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all hover:shadow-md">
                    Commander maintenant →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
