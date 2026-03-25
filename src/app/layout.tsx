import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const playfairDisplay = Playfair_Display({
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
  title: "Baraka Shop - Épicerie Halal Premium",
  description:
    "Découvrez notre sélection de produits halal premium : épices, thés, huiles et miels du monde entier. Qualité certifiée, saveurs authentiques.",
  keywords: "halal, épices, thés, huiles, miel, produits bio, épicerie halal, certifié halal",
  openGraph: {
    title: "Baraka Shop - Épicerie Halal Premium",
    description:
      "Découvrez notre sélection de produits halal premium : épices, thés, huiles et miels du monde entier.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAF8F3] font-dm antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
