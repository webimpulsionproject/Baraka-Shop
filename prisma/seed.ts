import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed promo codes
  await prisma.promoCode.createMany({
    data: [
      { code: "BARAKA10", type: "percent", value: 10, label: "-10% sur votre commande" },
      { code: "AID2025",  type: "percent", value: 15, label: "-15% sur les packs Aïd" },
      { code: "BIENVENUE",type: "fixed",   value: 5,  label: "-5€ sur votre première commande" },
    ],
  });

  // Seed products
  await prisma.product.createMany({
    data: [
      { name: "Entrecôte Charolaise", slug: "entrecote-charolaise", category: "Bœuf & Veau", price: 28.9, weight: "500g", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400", description: "Entrecôte persillée issue de race Charolaise française.", badge: "Bestseller", inStock: true, origin: "France" },
      { name: "Côte de Bœuf Blonde d'Aquitaine", slug: "cote-boeuf-blonde-aquitaine", category: "Bœuf & Veau", price: 34.5, weight: "700g", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", description: "Côte de bœuf exceptionnelle, race Blonde d'Aquitaine.", badge: "Premium", inStock: true, origin: "France" },
      { name: "Faux-Filet Bœuf", slug: "faux-filet-boeuf", category: "Bœuf & Veau", price: 26.9, weight: "400g", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", description: "Faux-filet tendre et savoureux, idéal pour la plancha.", inStock: true, origin: "France" },
      { name: "Escalope de Veau", slug: "escalope-veau", category: "Bœuf & Veau", price: 22.5, weight: "400g", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400", description: "Escalope de veau française, découpée à la demande.", inStock: true, origin: "France", decoupeOptions: true },
      { name: "Gigot d'Agneau Entier", slug: "gigot-agneau-entier", category: "Agneau", price: 18.9, weight: "par kg", image: "https://images.unsplash.com/photo-1612871689307-4bdf8a76e4e7?w=400", description: "Gigot entier ou en tranches, agneau de qualité supérieure.", badge: "Aïd", inStock: true, decoupeOptions: true },
      { name: "Côtelettes d'Agneau", slug: "cotelettes-agneau", category: "Agneau", price: 21.9, weight: "500g", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400", description: "Côtelettes d'agneau marinées ou nature, grillades parfaites.", inStock: true },
      { name: "Épaule d'Agneau", slug: "epaule-agneau", category: "Agneau", price: 16.5, weight: "par kg", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", description: "Épaule d'agneau idéale pour les tajines et ragoûts.", badge: "Promo", promoPrice: 13.9, promoEndDate: "2026-04-05T23:59:00", inStock: true },
      { name: "Merguez Artisanales", slug: "merguez-artisanales", category: "Traiteur", price: 13.9, weight: "500g (x8)", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400", description: "Merguez maison préparées par notre boucher, épices sélectionnées.", badge: "Maison", inStock: true },
      { name: "Brochettes Marinées Bœuf", slug: "brochettes-marines-boeuf", category: "Traiteur", price: 16.9, weight: "500g (x6)", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", description: "Brochettes de bœuf marinées 24h, prêtes à griller.", badge: "Bestseller", inStock: true },
      { name: "Colis Barbecue Premium", slug: "colis-barbecue-premium", category: "Traiteur", price: 49.9, promoPrice: 42.9, promoEndDate: "2026-04-01T23:59:00", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400", description: "Colis complet : merguez, brochettes bœuf et agneau, côtelettes.", badge: "Promo", inStock: true, stock: 15 },
      { name: "Poulet Fermier Entier", slug: "poulet-fermier-entier", category: "Volaille", price: 12.9, weight: "1,4-1,8kg", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400", description: "Poulet fermier halal, élevé en plein air, chair savoureuse.", inStock: true },
      { name: "Cuisses de Poulet x4", slug: "cuisses-poulet", category: "Volaille", price: 9.9, weight: "800g", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=400", description: "Cuisses de poulet fermier, parfaites pour le four ou le barbecue.", badge: "Bestseller", inStock: true },
      { name: "Filets de Poulet", slug: "filets-poulet", category: "Volaille", price: 14.5, weight: "500g", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400", description: "Filets de poulet tendres, sans os, idéaux pour la cuisine rapide.", inStock: true },
      { name: "Pack Aïd Agneau Complet", slug: "pack-aid-agneau-complet", category: "Aïd", price: 159.0, promoPrice: 139.0, promoEndDate: "2026-04-15T23:59:00", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400", description: "Agneau entier découpé : gigot, épaule, côtelettes, collier.", badge: "Aïd", inStock: true, stock: 8 },
      { name: "Pack Aïd Barbecue Famille", slug: "pack-aid-barbecue", category: "Aïd", price: 89.0, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400", description: "Merguez, brochettes bœuf et agneau, côtelettes marinées.", badge: "Aïd", inStock: true, stock: 20 },
      { name: "Ras el Hanout Maison", slug: "ras-el-hanout", category: "Épicerie Vrac", price: 4.9, weight: "100g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", description: "Mélange d'épices maison pour tajines et couscous.", inStock: true },
      { name: "Cumin en Grains", slug: "cumin-grains", category: "Épicerie Vrac", price: 3.5, weight: "100g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", description: "Cumin entier de qualité premium, arôme intense.", inStock: true },
      { name: "Paprika Fumé", slug: "paprika-fume", category: "Épicerie Vrac", price: 3.9, weight: "100g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", description: "Paprika fumé espagnol, parfait pour marinades et sauces.", inStock: true },
      { name: "Harissa Artisanale", slug: "harissa-artisanale", category: "Épicerie Vrac", price: 5.5, weight: "200g", image: "https://images.unsplash.com/photo-1627735336882-82a6f0700ede?w=400", description: "Harissa maison préparée avec des piments frais.", badge: "Maison", inStock: true },
      { name: "Huile d'Olive Extra Vierge", slug: "huile-olive", category: "Épicerie Vrac", price: 12.9, weight: "500ml", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400", description: "Huile d'olive tunisienne première pression à froid.", inStock: true },
    ],
  });

  // Seed reviews
  await prisma.review.createMany({
    data: [
      { author: "Fatima B.", rating: 5, text: "Viande de qualité exceptionnelle, toujours fraîche. Je recommande vivement !", date: "mars 2025", verified: true },
      { author: "Karim D.", rating: 5, text: "Meilleure boucherie halal de Mons. Les brochettes sont incomparables !", date: "fév. 2025", verified: true },
      { author: "Sarah M.", rating: 4, text: "Très bon service, personnel accueillant. Les merguez maison sont excellentes.", date: "jan. 2025", verified: true },
      { author: "Youssef T.", rating: 5, text: "J'y vais depuis 5 ans. Qualité constante, prix honnêtes.", date: "déc. 2024", verified: true },
      { author: "Nadia K.", rating: 5, text: "Le Click & Collect est super pratique. Commande prête en 30 min !", date: "mars 2025", verified: false },
      { author: "Mohamed A.", rating: 4, text: "Colis Aïd reçu parfaitement préparé. Merci Baraka Shop !", date: "avr. 2024", verified: true },
    ],
  });

  console.log("✅ Seed terminé");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
