"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Nos Produits" },
  { href: "/epicerie", label: "Épicerie" },
  { href: "/#magasin", label: "Nous trouver" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 mr-10">
            <Logo size={48} />
            <div className="hidden sm:flex items-baseline gap-1">
              <span className="font-playfair text-2xl font-bold text-[#1B5E20]">Baraka</span>
              <span className="font-playfair text-2xl font-bold text-[#C9922A]">Shop</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative group pb-0.5 ${
                  isActive(link.href) ? "text-[#E64A19] font-semibold" : "text-gray-600 hover:text-[#1B5E20]"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E64A19] rounded-full transition-all duration-200 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/connexion"
              className="hidden md:inline-flex items-center gap-1.5 border border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Connexion
            </Link>
            <Link
              href="/commande"
              className="relative p-2 text-gray-600 hover:text-[#E64A19] transition-colors"
              aria-label={`Ma commande — ${totalItems} article${totalItems !== 1 ? "s" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C62828] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-gray-600 hover:text-[#1B5E20] transition-colors rounded-lg"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-5">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href) ? "bg-[#E64A19]/8 text-[#E64A19] font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-[#1B5E20]"}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 px-1">
                <Link href="/connexion" onClick={() => setOpen(false)} className="block text-center border border-[#1B5E20] text-[#1B5E20] font-semibold py-2.5 rounded-lg text-sm hover:bg-[#1B5E20] hover:text-white transition-all">Connexion</Link>
                <Link href="/produits" onClick={() => setOpen(false)} className="block text-center bg-[#E64A19] text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-[#BF360C] transition-colors">Voir nos produits →</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
