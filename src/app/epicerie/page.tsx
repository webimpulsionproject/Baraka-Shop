"use client";
import { useState } from "react";
import Image from "next/image";
import { products } from "@/lib/data";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

const weights = ["100g", "250g", "500g", "1kg"];

export default function EpiceriePage() {
  const epicerie = products.filter(p => p.category === "Épicerie Vrac");
  const { addItem } = useCart();
  const [selectedWeights, setSelectedWeights] = useState<Record<number, string>>({});

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="bg-[#1B5E20] py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm px-4 py-1.5 rounded-full mb-4">🌿 Produits du monde</div>
          <h1 className="font-playfair text-4xl font-bold text-white mb-2">Notre Épicerie Vrac</h1>
          <p className="text-white/70 text-sm">Épices · Légumineuses · Huiles · Thés</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {epicerie.map((p) => {
              const w = selectedWeights[p.id] || "100g";
              return (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                  <div className="relative h-44">
                    <Image src={p.image} alt={p.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="25vw" />
                    <div className="absolute top-3 right-3 bg-[#1B5E20] text-white text-xs font-semibold px-2 py-0.5 rounded-md">Halal ✓</div>
                    {p.origin && <div className="absolute bottom-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-md">{p.origin}</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {weights.map((wt) => (
                        <button key={wt} onClick={() => setSelectedWeights(prev => ({ ...prev, [p.id]: wt }))}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${w === wt ? "bg-[#1B5E20] text-white border-[#1B5E20]" : "border-gray-200 text-gray-600 hover:border-[#1B5E20]"}`}>
                          {wt}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#1B5E20]">{p.price.toFixed(2)} €</span>
                      <button onClick={() => addItem(p)} className="btn-primary text-xs py-2 px-4">Commander</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
