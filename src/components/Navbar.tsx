"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/#magasin", label: "Notre magasin" },
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xl mr-1" aria-hidden="true">🥩</span>
            <span className="font-playfair text-xl font-bold text-[#1A6B47]">Baraka</span>
            <span className="font-playfair text-xl font-bold text-[#C9922A]">Shop</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  isActive(link.href)
                    ? "text-[#E8401C] font-semibold"
                    : "text-gray-700 hover:text-[#1A6B47]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#E8401C] transition-all duration-200 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Connexion — desktop only */}
            <Link
              href="/connexion"
              className="hidden md:inline-flex items-center gap-1.5 border border-[#1A6B47] text-[#1A6B47] hover:bg-[#1A6B47] hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Connexion
            </Link>

            {/* Cart */}
            <Link
              href="/panier"
              className="relative p-2 text-gray-700 hover:text-[#E8401C] transition-colors duration-200"
              aria-label={`Panier — ${totalItems} article${totalItems > 1 ? "s" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E8401C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#1A6B47] transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-[#E8401C]/10 text-[#E8401C] font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#1A6B47]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2 px-1">
                <Link
                  href="/connexion"
                  onClick={() => setOpen(false)}
                  className="block text-center border border-[#1A6B47] text-[#1A6B47] font-semibold py-2.5 rounded-xl text-sm"
                >
                  Connexion
                </Link>
                <Link
                  href="/catalogue"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-[#E8401C] text-white font-semibold py-2.5 rounded-xl text-sm"
                >
                  Voir les viandes →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
