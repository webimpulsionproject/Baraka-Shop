import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";
import PromoTopBar from "@/components/PromoTopBar";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Baraka Shop — Boucherie Halal Premium | Mons-en-Barœul",
  description: "Boucherie halal certifiée, traiteur et épicerie vrac à Mons-en-Barœul. Click & Collect en 30 min. Viandes fraîches du jour.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAFAF8] font-dm antialiased text-[#1A1A1A]">
        <CartProvider>
          <PromoTopBar />
          <Navbar />
          <main>{children}</main>
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
