"use client";
import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import { products } from "@/lib/data";

export default function PromoWeekSection() {
  const promoProducts = products.filter((p) => p.promoPrice && p.promoPrice < p.price).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Promotions</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900">Offres de la semaine</h2>
            <p className="text-gray-400 mt-2 text-sm">Duree limitee — Profitez-en avant la fin</p>
          </div>
          <span className="self-start border border-[#C62828]/30 text-[#C62828] text-xs font-semibold px-4 py-1.5 rounded-full">
            Offres limitees
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {promoProducts.map((product) => {
            const discount = Math.round(((product.price - product.promoPrice!) / product.price) * 100);
            const savings = (product.price - product.promoPrice!).toFixed(2);
            const isLowStock = product.stock !== undefined && product.stock <= 8;

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-100 hover:border-[#C62828]/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 bg-[#C62828] text-white text-sm font-bold px-3 py-1 rounded-lg">
                    -{discount}%
                  </div>
                </div>

                {/* Corps */}
                <div className="p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-playfair font-bold text-gray-900 text-base leading-snug mb-1">
                    {product.name}
                  </h3>
                  {product.weight && (
                    <p className="text-xs text-gray-400 mb-3">{product.weight}</p>
                  )}

                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-xl font-bold text-[#C62828]">
                      {product.promoPrice!.toFixed(2)} €
                    </span>
                    <span className="text-sm text-gray-300 line-through">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-xs text-[#C62828] font-medium mb-3">Economisez {savings} €</p>

                  {product.promoEndDate && (
                    <div className="mb-3">
                      <CountdownTimer endDate={product.promoEndDate} />
                    </div>
                  )}

                  {isLowStock && (
                    <p className="text-xs text-[#C62828] font-semibold mb-3">
                      Plus que {product.stock} en stock
                    </p>
                  )}

                  <Link
                    href="/produits"
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#8E0000] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all"
                  >
                    Commander maintenant
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
