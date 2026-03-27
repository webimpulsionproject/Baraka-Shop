"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/",         label: "Accueil" },
  { href: "/produits", label: "Nos Produits" },
  { href: "/epicerie", label: "Epicerie" },
  { href: "/#magasin", label: "Nous trouver" },
];

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const pathname                  = usePathname();
  const { totalItems }            = useCart();
  const prevTotal                 = useRef(totalItems);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cart bounce */
  useEffect(() => {
    if (totalItems > prevTotal.current) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 500);
    }
    prevTotal.current = totalItems;
  }, [totalItems]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.07)]" : "border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 mr-12">
            <Logo size={44} />
            <div className="hidden sm:block">
              <div className="flex items-baseline gap-1">
                <span className="font-playfair text-xl font-bold text-[#1B5E20] tracking-tight">Baraka</span>
                <span className="font-playfair text-xl font-bold text-[#C9922A] tracking-tight">Shop</span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400 mt-0.5">Boucherie Halal Premium</p>
            </div>
          </Link>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold tracking-wider uppercase transition-colors duration-200 relative group pb-0.5 ${
                  isActive(link.href)
                    ? "text-[#C9922A]"
                    : "text-gray-500 hover:text-[#1B5E20]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#C9922A] rounded-full transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Droite */}
          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/connexion"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-gray-500 hover:text-[#1B5E20] px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Connexion
            </Link>

            <Link
              href="/produits"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#1B5E20] hover:bg-[#154818] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              Commander
            </Link>

            {/* Panier */}
            <Link
              href="/commande"
              className="relative p-2.5 text-gray-500 hover:text-[#1B5E20] transition-colors"
              aria-label={`Panier — ${totalItems} article${totalItems !== 1 ? "s" : ""}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute top-1 right-1 bg-[#C9922A] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center ${
                    cartBounce ? "animate-cart-bounce" : ""
                  }`}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Burger mobile */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-[#1B5E20] transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {open && (
          <div className="md:hidden border-t border-gray-100 py-4 pb-6 animate-slide-up">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive(link.href)
                      ? "text-[#C9922A] bg-[#C9922A]/5"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#1B5E20]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-4 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  href="/connexion"
                  onClick={() => setOpen(false)}
                  className="block text-center border border-gray-200 text-gray-600 font-semibold py-3 rounded-lg text-xs tracking-wider uppercase hover:border-[#1B5E20] hover:text-[#1B5E20] transition-all"
                >
                  Connexion
                </Link>
                <Link
                  href="/produits"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-[#1B5E20] text-white font-semibold py-3 rounded-lg text-xs tracking-wider uppercase hover:bg-[#154818] transition-colors"
                >
                  Voir nos produits
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
