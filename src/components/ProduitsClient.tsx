"use client";
import { useState, useMemo } from "react";
import ProductCard, { CardProduct } from "@/components/ProductCard";

type Props = {
  products: CardProduct[];
  categories: string[];
};

export default function ProduitsClient({ products, categories }: Props) {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState<string>("Tous");

  const promoCount = useMemo(
    () => products.filter((p) => p.promoPrice && p.promoPrice < p.price).length,
    [products]
  );

  const allFilters = ["Tous", "Promos", ...categories];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const isPromo = !!p.promoPrice && p.promoPrice < p.price;
      if (cat === "Promos") return isPromo;
      const matchCat    = cat === "Tous" || p.category === cat;
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, cat, products]);

  return (
    <>
      {/* Bandeau promos */}
      {promoCount > 0 && (
        <div className="bg-[#C62828] text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <p className="text-sm font-medium">
              <span className="font-bold">{promoCount} produits</span> en promotion cette semaine
            </p>
            <button
              onClick={() => setCat("Promos")}
              className="flex-shrink-0 bg-white text-[#C62828] font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors tracking-wide uppercase"
            >
              Voir les promos
            </button>
          </div>
        </div>
      )}

      {/* Filtres sticky */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {allFilters.map((f) => (
              <button
                key={f}
                onClick={() => setCat(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all flex-shrink-0 ${
                  cat === f
                    ? f === "Promos" ? "bg-[#C62828] text-white" : "bg-[#1B5E20] text-white"
                    : f === "Promos"
                      ? "border border-[#C62828]/40 text-[#C62828] hover:bg-[#C62828]/5"
                      : "border border-gray-200 text-gray-500 hover:border-[#1B5E20] hover:text-[#1B5E20] bg-white"
                }`}
              >
                {f === "Promos" ? `Promos (${promoCount})` : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-700">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""}
            {cat !== "Tous" && <> — <span className="text-[#1B5E20] font-medium">{cat}</span></>}
          </p>
          {(search || cat !== "Tous") && (
            <button
              onClick={() => { setSearch(""); setCat("Tous"); }}
              className="text-xs text-gray-400 hover:text-gray-700 font-medium tracking-wide uppercase transition-colors"
            >
              Reinitialiser
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-700 mb-2">Aucun produit trouve</h3>
            <p className="text-gray-400 text-sm mb-6">Essayez un autre terme ou reinitialiser les filtres</p>
            <button onClick={() => { setSearch(""); setCat("Tous"); }} className="btn-green">
              Voir tous les produits
            </button>
          </div>
        )}
      </div>

      {/* Barre de recherche flottante */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
        <div className="relative bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 text-sm focus:outline-none bg-transparent text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>
    </>
  );
}
