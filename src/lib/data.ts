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

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=300&fit=crop&auto=format`;

export const products: Product[] = [
  // ── Bœuf & Veau ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Entrecôte Charolaise",
    slug: "entrecote-charolaise",
    category: "Bœuf & Veau",
    price: 28.90,
    weight: "env. 300g",
    image: IMG("1529694157872-4e0c0f3b238b"),
    description: "Entrecôte persillée de race Charolaise, tendre et savoureuse. Découpée à la demande.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 15,
    decoupeOptions: true,
  },
  {
    id: 2,
    name: "Steak Haché Pur Bœuf",
    slug: "steak-hache",
    category: "Bœuf & Veau",
    price: 14.90,
    weight: "200g/pièce",
    image: IMG("1568901346375-23c9450c58cd"),
    description: "Steak haché façonné à la main, 100% pur bœuf français.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
    stock: 30,
  },
  {
    id: 3,
    name: "Côte de Bœuf Blonde d'Aquitaine",
    slug: "cote-de-boeuf",
    category: "Bœuf & Veau",
    price: 32.50,
    weight: "env. 600g",
    image: IMG("1544025162-d76694265947"),
    description: "Côte de bœuf de race d'exception, texture fine et goût délicat.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
    stock: 8,
    decoupeOptions: true,
  },
  {
    id: 4,
    name: "Merguez Artisanales Maison",
    slug: "merguez-maison",
    category: "Bœuf & Veau",
    price: 9.50,
    promoPrice: 7.90,
    promoEndDate: "2025-04-05T23:59:59Z",
    weight: "500g",
    image: IMG("1615361200141-f45040f367be"),
    description: "Préparées chaque matin avec un mélange d'épices traditionnel du Maghreb.",
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
    image: IMG("1432139555190-58524dae6a55"),
    description: "Bavette marinée aux herbes fraîches, idéale pour le barbecue.",
    isHalal: true,
    inStock: true,
    stock: 12,
    decoupeOptions: true,
  },
  {
    id: 6,
    name: "Escalope de Veau",
    slug: "escalope-veau",
    category: "Bœuf & Veau",
    price: 24.90,
    weight: "env. 150g",
    image: IMG("1558030006-1ccb22cfb6b1"),
    description: "Escalopes de veau fines, idéales à la milanaise ou à la crème.",
    isHalal: true,
    inStock: true,
    stock: 10,
  },

  // ── Agneau ───────────────────────────────────────────────────────────────
  {
    id: 7,
    name: "Gigot d'Agneau Entier",
    slug: "gigot-agneau",
    category: "Agneau",
    price: 22.90,
    weight: "env. 2kg",
    image: IMG("1603360946369-dc9bb6258143"),
    description: "Gigot d'agneau de qualité supérieure, découpé sur demande.",
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
    image: IMG("1448043552756-e747b7a2b2b8"),
    description: "Côtelettes tendres, idéales au grill ou à la plancha.",
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
    promoEndDate: "2025-04-07T23:59:59Z",
    weight: "env. 1,2kg",
    image: IMG("1448043552756-e747b7a2b2b8"),
    description: "Épaule ficelée par notre boucher, fondante au four.",
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
    image: IMG("1567521464027-f127ff144326"),
    description: "Souris d'agneau confite, chair ultra-fondante, idéale en tajine.",
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
    image: IMG("1601063476271-a159c71ab0b3"),
    description: "Idéal pour les tajines et plats mijotés. Chair gélatineuse et savoureuse.",
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
    promoEndDate: "2025-06-30T23:59:59Z",
    weight: "service complet",
    image: IMG("1603360946369-dc9bb6258143"),
    description: "Mouton entier avec découpe complète sur place. Service premium.",
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
    promoEndDate: "2025-04-03T23:59:59Z",
    weight: "env. 1,5kg",
    image: IMG("1587593810167-a84920ea0781"),
    description: "Poulet élevé en plein air, saveur authentique. Découpé à la demande.",
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
    image: IMG("1604503468506-a8da13d82791"),
    description: "Filets frais sans os ni peau, prêts à cuisiner.",
    isHalal: true,
    inStock: true,
    stock: 30,
  },
  {
    id: 15,
    name: "Cuisses Marinées",
    slug: "cuisses-poulet",
    category: "Volaille",
    price: 9.90,
    weight: "env. 250g/pièce",
    image: IMG("1555939594-58d7cb561ad1"),
    description: "Marinées aux épices orientales, pour le four ou le barbecue.",
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
    image: IMG("1568901346375-23c9450c58cd"),
    description: "Escalopes fines, parfaites pour une cuisine légère.",
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
    image: IMG("1555939594-58d7cb561ad1"),
    description: "Bœuf & agneau marinés aux herbes, préparées chaque matin.",
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
    promoEndDate: "2025-04-10T23:59:59Z",
    weight: "~2kg",
    image: IMG("1529193591184-b1d58069ecdd"),
    description: "Merguez, brochettes, côtelettes et steaks hachés. Pour 4 à 6 personnes.",
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
    image: IMG("1568901346375-23c9450c58cd"),
    description: "Bœuf et agneau mélangés, parfumée au cumin et persil.",
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
    image: IMG("1603360946369-dc9bb6258143"),
    description: "Tajine mariné aux épices marocaines, prêt à mettre au four.",
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
    image: IMG("1506905516-0e0b7c269e37"),
    description: "Mélange marocain authentique, idéal pour tajines et couscous.",
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
    image: IMG("1601063476271-a159c71ab0b3"),
    description: "Cumin entier de qualité premium, arôme intense.",
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
    image: IMG("1601063476271-a159c71ab0b3"),
    description: "Lentilles vertes AOP du Puy, riches en protéines.",
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
    image: IMG("1474979266404-7eaacbcd87c5"),
    description: "Huile d'olive première pression à froid, goût fruité.",
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
    image: IMG("1571934811356-5cc061b6821f"),
    description: "Thé vert roulé en billes, base du thé à la menthe.",
    isHalal: true,
    inStock: true,
    origin: "🇨🇳 Chine",
  },
];

export const promoCodes: PromoCode[] = [
  { code: "BARAKA10",   type: "percent", value: 10, label: "-10% sur votre commande" },
  { code: "AID2025",    type: "percent", value: 15, label: "-15% sur les packs Aïd" },
  { code: "BIENVENUE",  type: "fixed",   value: 5,  label: "-5€ sur votre première commande" },
];

export const reviews: Review[] = [
  { id: 1, name: "Ahmed B.",    rating: 5, comment: "Excellente boucherie ! Les merguez maison sont incroyables.", date: "15 mars 2025", product: "Merguez Artisanales" },
  { id: 2, name: "Fatima K.",   rating: 5, comment: "Click & Collect super pratique, commande prête en 25min.",   date: "10 mars 2025" },
  { id: 3, name: "Youssef M.", rating: 5, comment: "Le gigot d'agneau était parfait pour l'Aïd, découpe impeccable.", date: "5 mars 2025", product: "Gigot d'Agneau" },
  { id: 4, name: "Sara D.",     rating: 4, comment: "Très bons produits halal certifiés, je recommande vivement.", date: "28 fév 2025" },
  { id: 5, name: "Karim A.",    rating: 5, comment: "Le colis BBQ est top ! Parfait pour nos soirées d'été.",      date: "20 fév 2025", product: "Colis Barbecue" },
  { id: 6, name: "Nadia B.",    rating: 5, comment: "Meilleure boucherie halal du secteur, produits frais chaque jour.", date: "15 fév 2025" },
];

export const categories = ["Bœuf & Veau", "Agneau", "Volaille", "Traiteur", "Épicerie Vrac", "Aïd"] as const;
