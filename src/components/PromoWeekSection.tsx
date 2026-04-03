"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountdownTimer from "@/components/CountdownTimer";

type PromoProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  promoPrice: number;
  promoEndDate?: string | null;
  weight?: string | null;
  image: string;
  stock?: number | null;
};

export default function PromoWeekSection() {
  const [products, setProducts] = useState<PromoProduct[]>([]);

  useEffect(() => {
    fetch("/api/produits?promo=true")
      .then((r) => r.json())
      .then((data: PromoProduct[]) => {
        const promos = data
          .filter((p) => p.promoPrice && p.promoPrice < p.price)
          .slice(0, 4);
        setProducts(promos);
      })
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C9922A] mb-3">Promotions</p>
            <h2 className="font-playfair text-4xl font-bold text-gray-900">Offres de la semaine</h2>
            <p className="text-gray-400 mt-2 text-sm">Duree limitee — Profitez-en avant la fin</p>
          </div>
          <div className="flex items-center gap-2 self-start border border-[#C62828]/30 text-[#C62828] text-xs font-semibold px-4 py-1.5 rounded-full">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Offres limitees
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((product) => {
            const discount = Math.round(((product.price - product.promoPrice) / product.price) * 100);
            const savings = (product.price - product.promoPrice).toFixed(2);
            const isLowStock = product.stock !== undefined && product.stock !== null && product.stock <= 8;

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
                  <div className="absolute top-3 left-3 bg-[#C62828] text-white text-sm font-bold px-3 py-1 rounded-lg shadow-sm">
                    -{discount}%
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#C62828] rounded-lg p-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
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
                      {product.promoPrice.toFixed(2)} €
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
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mb-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      Plus que {product.stock} en stock
                    </div>
                  )}

                  <Link
                    href={`/produits/${product.slug}`}
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#8E0000] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                    Commander
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
