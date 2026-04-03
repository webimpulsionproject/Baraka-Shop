import { prisma } from "@/lib/prisma";
import ProduitsClient from "@/components/ProduitsClient";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Bœuf & Veau", "Agneau & Mouton", "Volaille", "Traiteur & Marinés", "Épicerie"];

export default async function ProduitsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8]">

        {/* En-tete */}
        <div className="bg-[#0F3D15] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="section-label text-[#C9922A]">Boucherie · Traiteur · Epicerie — 100% Halal</span>
            <h1 className="font-playfair text-5xl font-bold text-white mt-2">Nos Produits</h1>
            <p className="text-white/40 mt-2 text-sm">{products.length} produits — viandes fraiches, traiteur et epicerie</p>
          </div>
        </div>

        <ProduitsClient products={products} categories={CATEGORIES} />
      </div>
      <Footer />
    </>
  );
}
