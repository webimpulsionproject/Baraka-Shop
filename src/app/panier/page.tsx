import Link from "next/link";
import Footer from "@/components/Footer";

export default function PanierPage() {
  return (
    <>
      <main className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF8] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </div>
          <span className="inline-block bg-gray-200 text-gray-500 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            Prochainement
          </span>
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            Commande en ligne<br />bientot disponible
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Notre systeme de commande en ligne est en cours de preparation.
            En attendant, retrouvez-nous directement en boutique au
            17 rue Corneille, Mons-en-Baroeul.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center gap-2 bg-[#1B5E20] hover:bg-[#154818] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all"
            >
              Voir nos produits
            </Link>
            <a
              href="tel:0952291306"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-[#1B5E20] hover:text-[#1B5E20] font-semibold px-6 py-3 rounded-lg text-sm transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              09 52 29 13 06
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
