"use client";

import { useState, useMemo } from "react";
import { products, categories, ProductCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

export default function CataloguePage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<ProductCategory | "Tous">("Tous");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = cat === "Tous" || p.category === cat;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, cat]);

  const allCats: (ProductCategory | "Tous")[] = ["Tous", ...categories];

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F3]">
        {/* Header */}
        <div className="bg-[#1A6B47] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-3">
                  🥩 Boucherie · Traiteur · Épicerie — 100% Halal
                </div>
                <h1 className="font-playfair text-4xl font-bold text-white">Notre Catalogue</h1>
                <p className="text-white/70 mt-1">Viandes fraîches, brochettes maison, épices et traiteur</p>
              </div>
              {/* Search */}
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
                  className="w-full pl-9 pr-9 py-3 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/90 text-gray-800 placeholder-gray-400"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label="Effacer"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters sticky */}
        <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
              {allCats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                    cat === c
                      ? "bg-[#E8401C] text-white shadow-sm"
                      : "border border-gray-200 text-gray-700 hover:border-[#E8401C] hover:text-[#E8401C] bg-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {filtered.length === 0 ? (
                "Aucun produit trouvé"
              ) : (
                <>
                  <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
                  produit{filtered.length > 1 ? "s" : ""}
                  {cat !== "Tous" && (
                    <> dans <span className="text-[#1A6B47] font-medium">{cat}</span></>
                  )}
                  {search && (
                    <> pour &ldquo;<span className="text-[#E8401C] font-medium">{search}</span>&rdquo;</>
                  )}
                </>
              )}
            </p>
            {(search || cat !== "Tous") && (
              <button
                onClick={() => { setSearch(""); setCat("Tous"); }}
                className="text-sm text-[#E8401C] hover:text-[#C43516] font-medium transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500 max-w-sm mb-6">
                Essayez avec d&apos;autres termes ou réinitialisez les filtres.
              </p>
              <button
                onClick={() => { setSearch(""); setCat("Tous"); }}
                className="btn-green"
              >
                Voir tous les produits
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
