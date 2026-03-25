export type ProductCategory = "Bœuf & Veau" | "Agneau" | "Volaille" | "Traiteur" | "Épicerie Vrac" | "Aïd";
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

// Photo IDs Unsplash curatés — viandes, traiteur, épices
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop&auto=format&q=80`;

export const products: Product[] = [
  // ── Bœuf & Veau ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Entrecôte Charolaise",
    slug: "entrecote-charolaise",
    category: "Bœuf & Veau",
    price: 28.90,
    weight: "env. 300g",
    // Beau steak grillé de face, fumant
    image: IMG("1529694157872-4e0c0f3b238b"),
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
    // Steak haché cru bien formé sur planche
    image: IMG("1607623814075-e51df1bdc82f"),
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
    // Côte de bœuf épaisse avec os
    image: IMG("1544025162-d76694265947"),
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
    // Merguez grillées sur barbecue
    image: IMG("1565299507177-b0ac66763828"),
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
    // Bavette crue sur planche bois
    image: IMG("1611515949946-b82f35b7e3c1"),
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
    // Escalope fine panée/nature
    image: IMG("1558030006-450675393462"),
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
    category: "Agneau",
    price: 22.90,
    weight: "env. 2kg",
    // Gigot d'agneau rôti entier
    image: IMG("1603360946369-dc9bb6258143"),
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
    category: "Agneau",
    price: 24.90,
    weight: "env. 120g/pièce",
    // Côtelettes d'agneau grillées
    image: IMG("1529692236671-f1f6cf9683ba"),
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
    category: "Agneau",
    price: 23.90,
    promoPrice: 19.90,
    promoEndDate: "2026-04-30T23:59:59Z",
    weight: "env. 1,2kg",
    // Épaule d'agneau ficelée prête à rôtir
    image: IMG("1567521464027-f127ff144326"),
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
    category: "Agneau",
    price: 18.50,
    weight: "env. 400g",
    // Souris d'agneau confite en cocotte
    image: IMG("1432139555190-58524dae6a55"),
    description: "Souris d'agneau confite, chair ultra-fondante. Idéale en tajine ou au four avec légumes.",
    isHalal: true,
    inStock: true,
    stock: 15,
  },
  {
    id: 11,
    name: "Collier d'Agneau",
    slug: "collier-agneau",
    category: "Agneau",
    price: 12.90,
    weight: "env. 500g",
    // Agneau en morceaux pour mijoté
    image: IMG("1504674900247-0877df9cc836"),
    description: "Idéal pour les tajines et plats mijotés. Chair gélatineuse et savoureuse, fondante à la cuisson.",
    isHalal: true,
    inStock: true,
    stock: 18,
  },
  {
    id: 12,
    name: "Pack Découpe Aïd el-Adha",
    slug: "pack-aide",
    category: "Agneau",
    price: 55.00,
    promoPrice: 45.00,
    promoEndDate: "2026-06-10T23:59:59Z",
    weight: "service complet",
    // Agneau entier prêt à découper
    image: IMG("1448043552756-e747b7a2b2b8"),
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
    // Poulet entier doré rôti
    image: IMG("1587593810167-a84920ea0781"),
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
    // Filets de poulet crus sur planche
    image: IMG("1604503468506-a8da13d82791"),
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
    // Cuisses de poulet grillées bien dorées
    image: IMG("1598103442097-8b74394b95c7"),
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
    // Escalopes de dinde fines
    image: IMG("1604909052743-afa2ab2bfe73"),
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
    category: "Traiteur",
    price: 18.90,
    weight: "env. 150g/brochette",
    // Brochettes bœuf-agneau sur braises
    image: IMG("1555939594-58d7cb561ad1"),
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
    category: "Traiteur",
    price: 59.90,
    promoPrice: 49.90,
    promoEndDate: "2026-05-01T23:59:59Z",
    weight: "~2kg",
    // Plateau barbecue complet viandes
    image: IMG("1529193591184-b1d58069ecdd"),
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
    category: "Traiteur",
    price: 15.90,
    weight: "env. 100g/pièce",
    // Kefta/boulettes viande grillées
    image: IMG("1599599710792-88e3354fcf89"),
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
    category: "Traiteur",
    price: 18.50,
    weight: "pour 2 pers.",
    // Tajine marocain fumant avec légumes
    image: IMG("1541518763669-27ffa9818e24"),
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
    category: "Épicerie Vrac",
    price: 6.90,
    weight: "100g",
    // Épices colorées mélangées ras el hanout
    image: IMG("1596040033229-a9821ebd058d"),
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
    category: "Épicerie Vrac",
    price: 4.50,
    weight: "100g",
    // Graines de cumin en vrac
    image: IMG("1506905516-0e0b7c269e37"),
    description: "Cumin entier de qualité premium, arôme intense et naturel. Idéal pour merguez et tajines.",
    isHalal: true,
    inStock: true,
    origin: "🇮🇳 Inde",
  },
  {
    id: 23,
    name: "Lentilles Vertes du Puy",
    slug: "lentilles-vertes",
    category: "Épicerie Vrac",
    price: 3.90,
    weight: "500g",
    // Lentilles vertes en vrac
    image: IMG("1554200876-56c2f25224fa"),
    description: "Lentilles vertes AOP du Puy, riches en protéines et fibres. Label Rouge.",
    isHalal: true,
    inStock: true,
    origin: "🇫🇷 France",
  },
  {
    id: 24,
    name: "Huile d'Olive Extra Vierge",
    slug: "huile-olive",
    category: "Épicerie Vrac",
    price: 12.90,
    weight: "500ml",
    // Bouteille d'huile d'olive avec olives
    image: IMG("1474979266404-7eaacbcd87c5"),
    description: "Huile d'olive tunisienne première pression à froid. Goût fruité, acidité <0,5%.",
    isHalal: true,
    inStock: true,
    origin: "🇹🇳 Tunisie",
  },
  {
    id: 25,
    name: "Thé Vert Gunpowder",
    slug: "the-vert",
    category: "Épicerie Vrac",
    price: 5.90,
    weight: "100g",
    // Tasse de thé vert à la menthe
    image: IMG("1564890369478-c89ca6d9cde9"),
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

export const categories = ["Bœuf & Veau", "Agneau", "Volaille", "Traiteur", "Épicerie Vrac", "Aïd"] as const;
