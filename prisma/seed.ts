import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const STEAK    = "1529694157872-4e0c0f3b238b";
const GROUND   = "1568901346375-23c9450c58cd";
const RIBS     = "1544025162-d76694265947";
const SAUSAGE  = "1565299507177-b0ac66763828";
const LAMB     = "1529692236671-f1f6cf9683ba";
const CHICKEN  = "1587593810167-a84920ea0781";
const CHICKENP = "1598103442097-8b74394b95c7";
const SKEWER   = "1555939594-58d7cb561ad1";
const OLIVEOIL = "1474979266404-7eaacbcd87c5";
const SPICES   = "1596040033229-a9821ebd058d";

const IMG = (id: string, crop = "entropy") =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&crop=${crop}&auto=format&q=80`;
const fp = (id: string, x: number, y: number) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&auto=format&q=80`;

async function main() {
  console.log("Nettoyage des anciennes données...");
  await prisma.review.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  console.log("Insertion des produits...");
  await prisma.product.createMany({
    data: [
      // ── Bœuf & Veau ──────────────────────────────────────────────
      { name: "Entrecôte Charolaise",            slug: "entrecote-charolaise",  category: "Bœuf & Veau",   price: 28.90, weight: "env. 300g",          image: IMG(STEAK),             description: "Entrecôte persillée de race Charolaise française. Tendre et savoureuse, découpée à la demande par notre boucher.",  badge: "Bestseller", inStock: true, stock: 15, decoupeOptions: true, origin: "🇫🇷 France" },
      { name: "Steak Haché Pur Bœuf",            slug: "steak-hache",           category: "Bœuf & Veau",   price: 14.90, weight: "200g/pièce",          image: IMG(GROUND),            description: "Steak haché façonné à la main, 100% pur bœuf français. Sans additif ni conservateur.",                             badge: "Bestseller", inStock: true, stock: 30, origin: "🇫🇷 France" },
      { name: "Côte de Bœuf Blonde d'Aquitaine", slug: "cote-de-boeuf",         category: "Bœuf & Veau",   price: 32.50, weight: "env. 600g",           image: IMG(RIBS),              description: "Côte de bœuf de race d'exception, texture fine et goût délicat. La pièce maîtresse de notre étal.",                badge: "Nouveau",    inStock: true, stock: 8,  decoupeOptions: true, origin: "🇫🇷 France" },
      { name: "Merguez Artisanales Maison",       slug: "merguez-maison",        category: "Bœuf & Veau",   price: 9.50,  promoPrice: 7.90, promoEndDate: "2026-04-30T23:59:59Z", weight: "500g",         image: IMG(SAUSAGE),           description: "Préparées chaque matin avec un mélange d'épices traditionnel du Maghreb. Recette maison exclusive.",               badge: "Promo",      inStock: true, stock: 8 },
      { name: "Bavette d'Aloyau",                 slug: "bavette-aloyau",        category: "Bœuf & Veau",   price: 22.00, weight: "env. 250g",           image: fp(STEAK, 0.7, 0.4),    description: "Bavette marinée aux herbes fraîches, idéale pour le barbecue ou la plancha. Fibre longue, goût prononcé.",           inStock: true, stock: 12, decoupeOptions: true, origin: "🇫🇷 France" },
      { name: "Escalope de Veau",                 slug: "escalope-veau",         category: "Bœuf & Veau",   price: 24.90, weight: "env. 150g",           image: fp(RIBS, 0.3, 0.6),     description: "Escalopes de veau fines, idéales à la milanaise ou à la crème. Fraîcheur quotidienne garantie.",                    inStock: true, stock: 10, origin: "🇫🇷 France" },

      // ── Agneau ───────────────────────────────────────────────────
      { name: "Gigot d'Agneau Entier",            slug: "gigot-agneau",          category: "Agneau & Mouton",        price: 22.90, weight: "env. 2kg",            image: IMG(LAMB),              description: "Gigot d'agneau de qualité supérieure, désossé ou avec os selon votre préférence. Découpe sur demande.",              badge: "Bestseller", inStock: true, stock: 12, decoupeOptions: true },
      { name: "Côtelettes d'Agneau",              slug: "cotelettes-agneau",     category: "Agneau & Mouton",        price: 24.90, weight: "env. 120g/pièce",     image: fp(LAMB, 0.6, 0.35),    description: "Côtelettes tendres et parfumées, idéales au grill ou à la plancha. Marinade maison disponible.",                    inStock: true, stock: 20, decoupeOptions: true },
      { name: "Épaule d'Agneau Désossée",         slug: "epaule-agneau",         category: "Agneau & Mouton",        price: 23.90, promoPrice: 19.90, promoEndDate: "2026-04-30T23:59:59Z", weight: "env. 1,2kg",   image: fp(LAMB, 0.25, 0.65),   description: "Épaule ficelée par notre boucher, fondante au four. Idéale pour les repas de famille.",                             badge: "Promo",      inStock: true, stock: 6,  decoupeOptions: true },
      { name: "Souris d'Agneau",                  slug: "souris-agneau",         category: "Agneau & Mouton",        price: 18.50, weight: "env. 400g",           image: fp(SKEWER, 0.4, 0.5),   description: "Souris d'agneau confite, chair ultra-fondante. Idéale en tajine ou au four avec légumes.",                          inStock: true, stock: 15 },
      { name: "Collier d'Agneau",                 slug: "collier-agneau",        category: "Agneau & Mouton",        price: 12.90, weight: "env. 500g",           image: fp(GROUND, 0.5, 0.35),  description: "Idéal pour les tajines et plats mijotés. Chair gélatineuse et savoureuse, fondante à la cuisson.",                   inStock: true, stock: 18 },
      { name: "Pack Découpe Aïd el-Adha",         slug: "pack-aide",             category: "Agneau & Mouton",        price: 55.00, promoPrice: 45.00, promoEndDate: "2026-06-10T23:59:59Z", weight: "service complet", image: fp(LAMB, 0.8, 0.25),  description: "Mouton entier avec découpe complète sur place. Service premium avec emballage sous vide.",                          badge: "Aïd",        inStock: true, stock: 20, decoupeOptions: true },

      // ── Volaille ─────────────────────────────────────────────────
      { name: "Poulet Fermier Entier",            slug: "poulet-fermier",        category: "Volaille",      price: 11.90, promoPrice: 9.50, promoEndDate: "2026-04-15T23:59:59Z", weight: "env. 1,5kg",   image: IMG(CHICKEN),           description: "Poulet élevé en plein air, saveur authentique et chair tendre. Découpé à la demande.",                             badge: "Promo",      inStock: true, stock: 25, decoupeOptions: true },
      { name: "Blanc de Poulet Frais",            slug: "blanc-poulet",          category: "Volaille",      price: 13.90, weight: "500g",                image: IMG(CHICKENP),          description: "Filets frais sans os ni peau, prêts à cuisiner. Parfaits pour wok, grill ou escalopes.",                            inStock: true, stock: 30 },
      { name: "Cuisses Marinées au Barbecue",     slug: "cuisses-poulet",        category: "Volaille",      price: 9.90,  weight: "env. 250g/pièce",     image: fp(CHICKENP, 0.6, 0.4), description: "Marinées aux épices orientales, pour le four ou le barbecue. Recette maison parfumée.",                              badge: "Nouveau",    inStock: true, stock: 20 },
      { name: "Escalope de Dinde",                slug: "escalope-dinde",        category: "Volaille",      price: 12.50, weight: "200g",                image: fp(CHICKEN, 0.3, 0.6),  description: "Escalopes fines de dinde fermière, parfaites pour une cuisine légère et rapide.",                                    inStock: true, stock: 15 },

      // ── Traiteur ─────────────────────────────────────────────────
      { name: "Brochettes Maison Mixtes",         slug: "brochettes-maison",     category: "Traiteur & Marinés",      price: 18.90, weight: "env. 150g/brochette", image: IMG(SKEWER),            description: "Bœuf & agneau marinés aux herbes fraîches, préparées chaque matin par notre boucher.",                              badge: "Bestseller", inStock: true, stock: 20 },
      { name: "Colis Barbecue Premium",           slug: "colis-barbecue",        category: "Traiteur & Marinés",      price: 59.90, promoPrice: 49.90, promoEndDate: "2026-05-01T23:59:59Z", weight: "~2kg",         image: fp(SKEWER, 0.6, 0.55),  description: "Merguez, brochettes, côtelettes et steaks hachés. Parfait pour 4 à 6 personnes.",                                  badge: "Promo",      inStock: true, stock: 10 },
      { name: "Kefta Maison",                     slug: "kefta-maison",          category: "Traiteur & Marinés",      price: 15.90, weight: "env. 100g/pièce",     image: fp(SAUSAGE, 0.4, 0.6),  description: "Bœuf et agneau mélangés, parfumée au cumin et persil frais. Façonnée à la main.",                                   badge: "Bestseller", inStock: true, stock: 15 },
      { name: "Tajine d'Agneau Prêt à Cuire",     slug: "tajine-agneau",         category: "Traiteur & Marinés",      price: 18.50, weight: "pour 2 pers.",         image: fp(LAMB, 0.5, 0.7),     description: "Tajine mariné aux épices marocaines avec légumes du marché. Prêt à mettre au four.",                                inStock: true, stock: 8 },

      // ── Épicerie Vrac ─────────────────────────────────────────────
      { name: "Ras el Hanout Premium",            slug: "ras-el-hanout",         category: "Épicerie", price: 6.90,  weight: "100g",                image: IMG(SPICES),            description: "Mélange marocain authentique de 25 épices. Idéal pour tajines, couscous et marinades.",                             badge: "Bestseller", inStock: true, origin: "🇲🇦 Maroc" },
      { name: "Cumin Entier Bio",                 slug: "cumin-entier",          category: "Épicerie", price: 4.50,  weight: "100g",                image: fp(SPICES, 0.65, 0.35), description: "Cumin entier de qualité premium, arôme intense et naturel. Idéal pour merguez et tajines.",                         inStock: true, origin: "🇮🇳 Inde" },
      { name: "Lentilles Vertes du Puy",          slug: "lentilles-vertes",      category: "Épicerie", price: 3.90,  weight: "500g",                image: fp(SPICES, 0.3, 0.65),  description: "Lentilles vertes AOP du Puy, riches en protéines et fibres. Label Rouge.",                                          inStock: true, origin: "🇫🇷 France" },
      { name: "Huile d'Olive Extra Vierge",       slug: "huile-olive",           category: "Épicerie", price: 12.90, weight: "500ml",               image: IMG(OLIVEOIL),          description: "Huile d'olive tunisienne première pression à froid. Goût fruité, acidité <0,5%.",                                   inStock: true, origin: "🇹🇳 Tunisie" },
      { name: "Thé Vert Gunpowder",               slug: "the-vert",              category: "Épicerie", price: 5.90,  weight: "100g",                image: fp(OLIVEOIL, 0.3, 0.4), description: "Thé vert roulé en billes, base traditionnelle du thé à la menthe. Saveur douce et légèrement boisée.",               inStock: true, origin: "🇨🇳 Chine" },
    ],
  });

  console.log("Insertion des codes promo...");
  await prisma.promoCode.createMany({
    data: [
      { code: "BARAKA10",  type: "percent", value: 10, label: "-10% sur votre commande",         active: true },
      { code: "AID2025",   type: "percent", value: 15, label: "-15% sur les packs Aïd",          active: true },
      { code: "BIENVENUE", type: "fixed",   value: 5,  label: "-5€ sur votre première commande", active: true },
    ],
  });

  console.log("Insertion des avis...");
  await prisma.review.createMany({
    data: [
      { author: "Ahmed B.",   rating: 5, text: "Excellente boucherie ! Les merguez maison sont incroyables, je reviens chaque semaine.", date: "15 mars 2025",  verified: true },
      { author: "Fatima K.",  rating: 5, text: "Click & Collect super pratique, commande prête en 25 min. Toujours frais !",             date: "10 mars 2025",  verified: true },
      { author: "Youssef M.", rating: 5, text: "Le gigot d'agneau pour l'Aïd était parfait. Découpe impeccable et service aux petits soins.", date: "5 mars 2025", verified: true },
      { author: "Sara D.",    rating: 4, text: "Très bons produits halal certifiés, personnel accueillant. Je recommande vivement.",      date: "28 fév 2025",   verified: true },
      { author: "Karim A.",   rating: 5, text: "Le colis BBQ est top ! Parfait pour nos soirées d'été, tout le monde s'est régalé.",      date: "20 fév 2025",   verified: true },
      { author: "Nadia B.",   rating: 5, text: "Meilleure boucherie halal du secteur. Produits frais chaque jour, tarifs honnêtes.",      date: "15 fév 2025",   verified: true },
    ],
  });

  console.log("Création du compte admin Le Boucher...");
  await prisma.adminUser.deleteMany();
  const passwordHash = await bcrypt.hash("Baraka@59!", 12);
  await prisma.adminUser.create({
    data: {
      username:    "leboucher",
      passwordHash,
      displayName: "Le Boucher",
      role:        "boucher",
      active:      true,
    },
  });

  const count = await prisma.product.count();
  console.log(`✅ ${count} produits insérés avec succès.`);
  console.log("✅ Compte Le Boucher créé.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
