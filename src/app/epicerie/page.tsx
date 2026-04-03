import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function EpiceriePage() {
  const epicerie = await prisma.product.findMany({
    where: { category: "Épicerie" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">

        {/* En-tete */}
        <div className="bg-[#0F3D15] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="section-label text-[#C9922A]">Epicerie</span>
            <h1 className="font-playfair text-5xl font-bold text-white mt-2">Notre Epicerie</h1>
            <p className="text-white/50 text-sm mt-2 tracking-wide">Epices · Legumineuses · Huiles · Thes</p>
          </div>
        </div>

        {/* Grille produits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {epicerie.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-playfair text-2xl font-bold text-gray-700 mb-2">Aucun produit disponible</p>
              <p className="text-gray-400 text-sm">Revenez bientot</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {epicerie.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <Link href={`/produits/${p.slug}`} className="relative h-44 overflow-hidden bg-gray-50 block">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {p.origin && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
                        {p.origin}
                      </div>
                    )}
                  </Link>

                  {/* Corps */}
                  <div className="p-5">
                    <h3 className="font-playfair font-bold text-gray-900 mb-1 leading-snug">{p.name}</h3>
                    {p.weight && <p className="text-xs text-gray-400 mb-1">{p.weight}</p>}
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">{p.description}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-playfair text-xl font-bold text-[#1B5E20]">
                        {p.price.toFixed(2)} €
                      </span>
                      <Link
                        href={`/produits/${p.slug}`}
                        className="inline-flex items-center gap-1.5 border border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-lg transition-all"
                      >
                        Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
