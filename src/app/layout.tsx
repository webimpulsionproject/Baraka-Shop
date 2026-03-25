import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baraka Shop — Boucherie Halal Premium | Mons-en-Barœul",
  description:
    "Boucherie halal certifiée, traiteur et épicerie vrac à Mons-en-Barœul. Click & Collect en 30 min, livraison locale. Viandes fraîches du jour.",
  keywords:
    "boucherie halal, viande halal, mons-en-baroeul, click and collect, traiteur, agneau, volaille",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAF8F3] font-dm antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
