export type ProductCategory = "Bœuf & Veau" | "Agneau & Mouton" | "Volaille" | "Traiteur & Marinés" | "Épicerie" | "Aïd";
export type ProductBadge = "Nouveau" | "Promo" | "Bestseller" | "Aïd";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  promoPrice?: number;
  promoEndDate?: string;
  weight?: string;
  image: string;
  description: string;
  badge?: ProductBadge;
  isHalal: true;
  inStock: boolean;
  stock?: number;
  origin?: string;
  decoupeOptions?: boolean;
}

export interface PromoCode {
  code: string;
  type: "percent" | "fixed";
  value: number;
  label: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  product?: string;
}

// ─── IDs Unsplash 100% confirmés ───────────────────────────────────────────
// Chaque constante pointe vers une vraie photo vérifiée
const STEAK    = "1529694157872-4e0c0f3b238b"; // steak grillé vue de dessus
const GROUND   = "1568901346375-23c9450c58cd"; // viande hachée / patty
const RIBS     = "1544025162-d76694265947";    // côte de bœuf avec os
const SAUSAGE  = "1565299507177-b0ac66763828"; // saucisses / merguez sur grill
const LAMB     = "1529692236671-f1f6cf9683ba"; // côtelettes d'agneau grillées
const CHICKEN  = "1587593810167-a84920ea0781"; // poulet entier rôti doré
const CHICKENP = "1598103442097-8b74394b95c7"; // morceaux de poulet marinés
const SKEWER   = "1555939594-58d7cb561ad1";    // brochettes sur braises
const OLIVEOIL = "1474979266404-7eaacbcd87c5"; // bouteille d'huile d'olive
const SPICES   = "1596040033229-a9821ebd058d"; // épices colorées en vrac

// crop = "entropy" choisit la zone la plus intéressante → images visuellement distinctes
const IMG = (id: string, crop = "entropy") =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&crop=${crop}&auto=format&q=80`;

// Focal points pour varier un même ID sans répétition visuelle
const fp = (id: string, x: number, y: number) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&auto=format&q=80`;

export const products: Product[] = [
  // ── Bœuf & Veau ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Entrecôte Charolaise",
    slug: "entrecote-charolaise",
    category: "Bœuf & Veau",
    price: 28.90,
    weight: "env. 300g",
    image: IMG(STEAK),
    description: "Entrecôte persillée de race Charolaise française. Tendre et savoureuse, découpée à la demande par notre boucher.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 15,
    decoupeOptions: true,
    origin: "🇫🇷 France",
  },
  {
    id: 2,
    name: "Steak Haché Pur Bœuf",
    slug: "steak-hache",
    category: "Bœuf & Veau",
    price: 14.90,
    weight: "200g/pièce",
    image: IMG(GROUND),
    description: "Steak haché façonné à la main, 100% pur bœuf français. Sans additif ni conservateur.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 30,
    origin: "🇫🇷 France",
  },
  {
    id: 3,
    name: "Côte de Bœuf Blonde d'Aquitaine",
    slug: "cote-de-boeuf",
    category: "Bœuf & Veau",
    price: 32.50,
    weight: "env. 600g",
    image: IMG(RIBS),
    description: "Côte de bœuf de race d'exception, texture fine et goût délicat. La pièce maîtresse de notre étal.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
    stock: 8,
    decoupeOptions: true,
    origin: "🇫🇷 France",
  },
  {
    id: 4,
    name: "Merguez Artisanales Maison",
    slug: "merguez-maison",
    category: "Bœuf & Veau",
    price: 9.50,
    promoPrice: 7.90,
    promoEndDate: "2026-04-30T23:59:59Z",
    weight: "500g",
    image: IMG(SAUSAGE),
    description: "Préparées chaque matin avec un mélange d'épices traditionnel du Maghreb. Recette maison exclusive.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
    stock: 8,
  },
  {
    id: 5,
    name: "Bavette d'Aloyau",
    slug: "bavette-aloyau",
    category: "Bœuf & Veau",
    price: 22.00,
    weight: "env. 250g",
    image: fp(STEAK, 0.7, 0.4),
    description: "Bavette marinée aux herbes fraîches, idéale pour le barbecue ou la plancha. Fibre longue, goût prononcé.",
    isHalal: true,
    inStock: true,
    stock: 12,
    decoupeOptions: true,
    origin: "🇫🇷 France",
  },
  {
    id: 6,
    name: "Escalope de Veau",
    slug: "escalope-veau",
    category: "Bœuf & Veau",
    price: 24.90,
    weight: "env. 150g",
    image: fp(RIBS, 0.3, 0.6),
    description: "Escalopes de veau fines, idéales à la milanaise ou à la crème. Fraîcheur quotidienne garantie.",
    isHalal: true,
    inStock: true,
    stock: 10,
    origin: "🇫🇷 France",
  },

  // ── Agneau ───────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Gigot d'Agneau Entier",
    slug: "gigot-agneau",
    category: "Agneau & Mouton",
    price: 22.90,
    weight: "env. 2kg",
    image: IMG(LAMB),
    description: "Gigot d'agneau de qualité supérieure, désossé ou avec os selon votre préférence. Découpe sur demande.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 12,
    decoupeOptions: true,
  },
  {
    id: 8,
    name: "Côtelettes d'Agneau",
    slug: "cotelettes-agneau",
    category: "Agneau & Mouton",
    price: 24.90,
    weight: "env. 120g/pièce",
    image: fp(LAMB, 0.6, 0.35),
    description: "Côtelettes tendres et parfumées, idéales au grill ou à la plancha. Marinade maison disponible.",
    isHalal: true,
    inStock: true,
    stock: 20,
    decoupeOptions: true,
  },
  {
    id: 9,
    name: "Épaule d'Agneau Désossée",
    slug: "epaule-agneau",
    category: "Agneau & Mouton",
    price: 23.90,
    promoPrice: 19.90,
    promoEndDate: "2026-04-30T23:59:59Z",
    weight: "env. 1,2kg",
    image: fp(LAMB, 0.25, 0.65),
    description: "Épaule ficelée par notre boucher, fondante au four. Idéale pour les repas de famille.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
    stock: 6,
    decoupeOptions: true,
  },
  {
    id: 10,
    name: "Souris d'Agneau",
    slug: "souris-agneau",
    category: "Agneau & Mouton",
    price: 18.50,
    weight: "env. 400g",
    image: fp(SKEWER, 0.4, 0.5),
    description: "Souris d'agneau confite, chair ultra-fondante. Idéale en tajine ou au four avec légumes.",
    isHalal: true,
    inStock: true,
    stock: 15,
  },
  {
    id: 11,
    name: "Collier d'Agneau",
    slug: "collier-agneau",
    category: "Agneau & Mouton",
    price: 12.90,
    weight: "env. 500g",
    image: fp(GROUND, 0.5, 0.35),
    description: "Idéal pour les tajines et plats mijotés. Chair gélatineuse et savoureuse, fondante à la cuisson.",
    isHalal: true,
    inStock: true,
    stock: 18,
  },
  {
    id: 12,
    name: "Pack Découpe Aïd el-Adha",
    slug: "pack-aide",
    category: "Agneau & Mouton",
    price: 55.00,
    promoPrice: 45.00,
    promoEndDate: "2026-06-10T23:59:59Z",
    weight: "service complet",
    image: fp(LAMB, 0.8, 0.25),
    description: "Mouton entier avec découpe complète sur place. Service premium avec emballage sous vide.",
    badge: "Aïd",
    isHalal: true,
    inStock: true,
    stock: 20,
    decoupeOptions: true,
  },

  // ── Volaille ─────────────────────────────────────────────────────────────
  {
    id: 13,
    name: "Poulet Fermier Entier",
    slug: "poulet-fermier",
    category: "Volaille",
    price: 11.90,
    promoPrice: 9.50,
    promoEndDate: "2026-04-15T23:59:59Z",
    weight: "env. 1,5kg",
    image: IMG(CHICKEN),
    description: "Poulet élevé en plein air, saveur authentique et chair tendre. Découpé à la demande.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
    stock: 25,
    decoupeOptions: true,
  },
  {
    id: 14,
    name: "Blanc de Poulet Frais",
    slug: "blanc-poulet",
    category: "Volaille",
    price: 13.90,
    weight: "500g",
    image: IMG(CHICKENP),
    description: "Filets frais sans os ni peau, prêts à cuisiner. Parfaits pour wok, grill ou escalopes.",
    isHalal: true,
    inStock: true,
    stock: 30,
  },
  {
    id: 15,
    name: "Cuisses Marinées au Barbecue",
    slug: "cuisses-poulet",
    category: "Volaille",
    price: 9.90,
    weight: "env. 250g/pièce",
    image: fp(CHICKENP, 0.6, 0.4),
    description: "Marinées aux épices orientales, pour le four ou le barbecue. Recette maison parfumée.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
    stock: 20,
  },
  {
    id: 16,
    name: "Escalope de Dinde",
    slug: "escalope-dinde",
    category: "Volaille",
    price: 12.50,
    weight: "200g",
    image: fp(CHICKEN, 0.3, 0.6),
    description: "Escalopes fines de dinde fermière, parfaites pour une cuisine légère et rapide.",
    isHalal: true,
    inStock: true,
    stock: 15,
  },

  // ── Traiteur ─────────────────────────────────────────────────────────────
  {
    id: 17,
    name: "Brochettes Maison Mixtes",
    slug: "brochettes-maison",
    category: "Traiteur & Marinés",
    price: 18.90,
    weight: "env. 150g/brochette",
    image: IMG(SKEWER),
    description: "Bœuf & agneau marinés aux herbes fraîches, préparées chaque matin par notre boucher.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 20,
  },
  {
    id: 18,
    name: "Colis Barbecue Premium",
    slug: "colis-barbecue",
    category: "Traiteur & Marinés",
    price: 59.90,
    promoPrice: 49.90,
    promoEndDate: "2026-05-01T23:59:59Z",
    weight: "~2kg",
    image: fp(SKEWER, 0.6, 0.55),
    description: "Merguez, brochettes, côtelettes et steaks hachés. Parfait pour 4 à 6 personnes.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
    stock: 10,
  },
  {
    id: 19,
    name: "Kefta Maison",
    slug: "kefta-maison",
    category: "Traiteur & Marinés",
    price: 15.90,
    weight: "env. 100g/pièce",
    image: fp(SAUSAGE, 0.4, 0.6),
    description: "Bœuf et agneau mélangés, parfumée au cumin et persil frais. Façonnée à la main.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 15,
  },
  {
    id: 20,
    name: "Tajine d'Agneau Prêt à Cuire",
    slug: "tajine-agneau",
    category: "Traiteur & Marinés",
    price: 18.50,
    weight: "pour 2 pers.",
    image: fp(LAMB, 0.5, 0.7),
    description: "Tajine mariné aux épices marocaines avec légumes du marché. Prêt à mettre au four.",
    isHalal: true,
    inStock: true,
    stock: 8,
  },

  // ── Épicerie Vrac ─────────────────────────────────────────────────────────
  {
    id: 21,
    name: "Ras el Hanout Premium",
    slug: "ras-el-hanout",
    category: "Épicerie",
    price: 6.90,
    weight: "100g",
    image: IMG(SPICES),
    description: "Mélange marocain authentique de 25 épices. Idéal pour tajines, couscous et marinades.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    origin: "🇲🇦 Maroc",
  },
  {
    id: 22,
    name: "Cumin Entier Bio",
    slug: "cumin-entier",
    category: "Épicerie",
    price: 4.50,
    weight: "100g",
    image: fp(SPICES, 0.65, 0.35),
    description: "Cumin entier de qualité premium, arôme intense et naturel. Idéal pour merguez et tajines.",
    isHalal: true,
    inStock: true,
    origin: "🇮🇳 Inde",
  },
  {
    id: 23,
    name: "Lentilles Vertes du Puy",
    slug: "lentilles-vertes",
    category: "Épicerie",
    price: 3.90,
    weight: "500g",
    image: fp(SPICES, 0.3, 0.65),
    description: "Lentilles vertes AOP du Puy, riches en protéines et fibres. Label Rouge.",
    isHalal: true,
    inStock: true,
    origin: "🇫🇷 France",
  },
  {
    id: 24,
    name: "Huile d'Olive Extra Vierge",
    slug: "huile-olive",
    category: "Épicerie",
    price: 12.90,
    weight: "500ml",
    image: IMG(OLIVEOIL),
    description: "Huile d'olive tunisienne première pression à froid. Goût fruité, acidité <0,5%.",
    isHalal: true,
    inStock: true,
    origin: "🇹🇳 Tunisie",
  },
  {
    id: 25,
    name: "Thé Vert Gunpowder",
    slug: "the-vert",
    category: "Épicerie",
    price: 5.90,
    weight: "100g",
    image: fp(OLIVEOIL, 0.3, 0.4),
    description: "Thé vert roulé en billes, base traditionnelle du thé à la menthe. Saveur douce et légèrement boisée.",
    isHalal: true,
    inStock: true,
    origin: "🇨🇳 Chine",
  },
];

export const promoCodes: PromoCode[] = [
  { code: "BARAKA10",  type: "percent", value: 10, label: "-10% sur votre commande" },
  { code: "AID2025",   type: "percent", value: 15, label: "-15% sur les packs Aïd" },
  { code: "BIENVENUE", type: "fixed",   value: 5,  label: "-5€ sur votre première commande" },
];

export const reviews: Review[] = [
  { id: 1, name: "Ahmed B.",   rating: 5, comment: "Excellente boucherie ! Les merguez maison sont incroyables, je reviens chaque semaine.", date: "15 mars 2025", product: "Merguez Artisanales" },
  { id: 2, name: "Fatima K.",  rating: 5, comment: "Click & Collect super pratique, commande prête en 25 min. Toujours frais !", date: "10 mars 2025" },
  { id: 3, name: "Youssef M.", rating: 5, comment: "Le gigot d'agneau pour l'Aïd était parfait. Découpe impeccable et service aux petits soins.", date: "5 mars 2025", product: "Gigot d'Agneau" },
  { id: 4, name: "Sara D.",    rating: 4, comment: "Très bons produits halal certifiés, personnel accueillant. Je recommande vivement.", date: "28 fév 2025" },
  { id: 5, name: "Karim A.",   rating: 5, comment: "Le colis BBQ est top ! Parfait pour nos soirées d'été, tout le monde s'est régalé.", date: "20 fév 2025", product: "Colis Barbecue" },
  { id: 6, name: "Nadia B.",   rating: 5, comment: "Meilleure boucherie halal du secteur. Produits frais chaque jour, tarifs honnêtes.", date: "15 fév 2025" },
];

export const categories = ["Bœuf & Veau", "Agneau & Mouton", "Volaille", "Traiteur & Marinés", "Épicerie"] as const;
