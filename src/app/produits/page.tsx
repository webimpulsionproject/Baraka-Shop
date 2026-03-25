"use client";
import { useState, useMemo } from "react";
import { products, categories, ProductCategory } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

type FilterCat = ProductCategory | "Tous" | "Promos";

export default function ProduitsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<FilterCat>("Tous");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const isPromo = !!p.promoPrice && p.promoPrice < p.price;
      if (cat === "Promos") return isPromo;
      const matchCat = cat === "Tous" || p.category === cat;
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  const promoCount = products.filter(p => p.promoPrice && p.promoPrice < p.price).length;
  const allFilters: FilterCat[] = ["Tous", "Promos", ...categories];

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">
        {/* Header */}
        <div className="bg-[#1B5E20] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-3">
                  🥩 Boucherie · Traiteur · Épicerie — 100% Halal
                </div>
                <h1 className="font-playfair text-4xl font-bold text-white">Nos Produits</h1>
                <p className="text-white/70 mt-1 text-sm">{products.length} produits — viandes fraîches, traiteur et épicerie</p>
              </div>
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/90 text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Promo bandeau */}
        {promoCount > 0 && (
          <div className="bg-gradient-to-r from-[#C62828] to-[#E64A19] text-white py-3.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
              <p className="font-semibold text-sm">
                🔥 {promoCount} produits en promotion cette semaine — Jusqu&apos;à -20%
              </p>
              <button
                onClick={() => setCat("Promos")}
                className="flex-shrink-0 bg-white text-[#C62828] font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Voir les promos
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {allFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setCat(f)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                    cat === f
                      ? f === "Promos"
                        ? "bg-[#C62828] text-white shadow-sm"
                        : "bg-[#1B5E20] text-white shadow-sm"
                      : f === "Promos"
                      ? "border border-[#C62828]/40 text-[#C62828] hover:bg-[#C62828]/5"
                      : "border border-gray-200 text-gray-700 hover:border-[#1B5E20] hover:text-[#1B5E20] bg-white"
                  }`}
                >
                  {f === "Promos" ? `🔥 Promos (${promoCount})` : f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""}
              {cat !== "Tous" && <> — <span className="text-[#1B5E20] font-medium">{cat}</span></>}
            </p>
            {(search || cat !== "Tous") && (
              <button onClick={() => { setSearch(""); setCat("Tous"); }} className="text-sm text-[#E64A19] hover:text-[#BF360C] font-medium">
                Réinitialiser
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">Aucun produit trouvé</h3>
              <button onClick={() => { setSearch(""); setCat("Tous"); }} className="btn-green mt-4">Voir tous les produits</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
