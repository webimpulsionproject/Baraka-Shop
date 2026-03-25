"use client";

import { useState, useMemo } from "react";
import { products, categories, ProductCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function CataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "Tous"
  >("Tous");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const allCategories: (ProductCategory | "Tous")[] = ["Tous", ...categories];

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Page Header */}
      <div className="bg-[#1A6B47] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <span>🥩</span>
            <span>Boucherie · Traiteur · Épicerie — 100% Halal</span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Notre Catalogue
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto">
            Viandes fraîches du jour, brochettes maison, colis barbecue et
            épicerie vrac. Découpé à la demande.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-16 z-30 bg-white border-b border-[#E8E4DB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full sm:max-w-xs">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
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
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8E4DB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A6B47]/30 focus:border-[#1A6B47] bg-[#FAF8F3] text-gray-800 placeholder-gray-400 transition-shadow"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Effacer la recherche"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#1A6B47] text-white shadow-sm"
                      : "border border-[#E8E4DB] text-gray-700 hover:border-[#1A6B47] hover:text-[#1A6B47] bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filteredProducts.length === 0 ? (
              "Aucun produit trouvé"
            ) : (
              <>
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                produit{filteredProducts.length > 1 ? "s" : ""} trouvé
                {filteredProducts.length > 1 ? "s" : ""}
                {selectedCategory !== "Tous" && (
                  <>
                    {" "}
                    dans{" "}
                    <span className="font-medium text-[#1A6B47]">
                      {selectedCategory}
                    </span>
                  </>
                )}
                {searchQuery && (
                  <>
                    {" "}
                    pour &quot;
                    <span className="font-medium text-[#1A6B47]">
                      {searchQuery}
                    </span>
                    &quot;
                  </>
                )}
              </>
            )}
          </p>

          {(searchQuery || selectedCategory !== "Tous") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
              className="text-sm text-[#C9922A] hover:text-[#A87520] font-medium transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-[#F0EDE4] rounded-full flex items-center justify-center mb-5">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-500 max-w-sm mb-6">
              Nous n&apos;avons pas trouvé de produit correspondant à votre
              recherche. Essayez avec d&apos;autres termes ou réinitialisez les
              filtres.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
              className="bg-[#1A6B47] hover:bg-[#14533A] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Voir tous les produits
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
