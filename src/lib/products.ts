export type ProductCategory =
  | "Bœuf & Veau"
  | "Agneau"
  | "Volaille"
  | "Traiteur & Épicerie";

export type ProductBadge = "Nouveau" | "Promo" | "Bestseller";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  weight?: string;
  image: string;
  description: string;
  badge?: ProductBadge;
  isHalal: true;
  inStock: boolean;
}

// Images from images.unsplash.com (stable IDs)
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=300&fit=crop&auto=format`;

export const products: Product[] = [
  // ── Bœuf & Veau ──────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Entrecôte Charolaise",
    category: "Bœuf & Veau",
    price: 28.9,
    weight: "env. 300 g",
    image: IMG("1529694157872-4e0c0f3b238b"),
    description:
      "Entrecôte persillée de race Charolaise, tendre et savoureuse. Découpée à la demande par notre boucher.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Steak Haché Pur Bœuf",
    category: "Bœuf & Veau",
    price: 14.9,
    weight: "200 g la pièce",
    image: IMG("1568901346375-23c9450c58cd"),
    description:
      "Steak haché façonné à la main, 100 % pur bœuf français. Idéal pour le barbecue ou la poêle.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Côte de Bœuf Blonde d'Aquitaine",
    category: "Bœuf & Veau",
    price: 32.5,
    weight: "env. 600 g",
    image: IMG("1544025162-d76694265947"),
    description:
      "Côte de bœuf de race d'exception, texture fine et goût délicat. Parfaite pour une occasion spéciale.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
  },
  {
    id: 4,
    name: "Merguez Artisanales Maison",
    category: "Bœuf & Veau",
    price: 16.9,
    weight: "500 g",
    image: IMG("1615361200141-f45040f367be"),
    description:
      "Préparées chaque matin avec un mélange d'épices traditionnel du Maghreb.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 5,
    name: "Escalope de Veau",
    category: "Bœuf & Veau",
    price: 22.0,
    weight: "env. 150 g",
    image: IMG("1558030006-1ccb22cfb6b1"),
    description:
      "Escalopes de veau fines et tendres, idéales à la milanaise ou à la crème.",
    isHalal: true,
    inStock: true,
  },
  // ── Agneau ───────────────────────────────────────────────────────────────
  {
    id: 6,
    name: "Gigot d'Agneau Entier",
    category: "Agneau",
    price: 22.9,
    weight: "env. 2 kg",
    image: IMG("1603360946369-dc9bb6258143"),
    description:
      "Gigot d'agneau de qualité supérieure, découpé sur demande. Parfait pour le méchoui.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 7,
    name: "Côtelettes d'Agneau",
    category: "Agneau",
    price: 24.9,
    weight: "env. 120 g/pièce",
    image: IMG("1432139555190-58524dae6a55"),
    description:
      "Côtelettes tendres, idéales au grill ou à la plancha. Cuisson rapide, saveur intense.",
    isHalal: true,
    inStock: true,
  },
  {
    id: 8,
    name: "Épaule d'Agneau Désossée",
    category: "Agneau",
    price: 19.9,
    originalPrice: 23.9,
    weight: "env. 1,2 kg",
    image: IMG("1448043552756-e747b7a2b2b8"),
    description:
      "Épaule ficelée par notre boucher, fondante au four. Idéale pour les repas en famille.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
  },
  {
    id: 9,
    name: "Souris d'Agneau",
    category: "Agneau",
    price: 18.5,
    weight: "env. 400 g",
    image: IMG("1567521464027-f127ff144326"),
    description:
      "Souris d'agneau confite, chair ultra-fondante. Idéale en tajine ou au four.",
    isHalal: true,
    inStock: true,
  },
  {
    id: 10,
    name: "Collier d'Agneau",
    category: "Agneau",
    price: 12.9,
    weight: "env. 500 g",
    image: IMG("1601063476271-a159c71ab0b3"),
    description:
      "Idéal pour les tajines et les plats mijotés. Chair gélatineuse et savoureuse.",
    isHalal: true,
    inStock: true,
  },
  // ── Volaille ─────────────────────────────────────────────────────────────
  {
    id: 11,
    name: "Poulet Fermier Entier",
    category: "Volaille",
    price: 11.9,
    weight: "env. 1,5 kg",
    image: IMG("1587593810167-a84920ea0781"),
    description:
      "Poulet élevé en plein air, saveur authentique. Découpé à la demande par notre boucher.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 12,
    name: "Blanc de Poulet Frais",
    category: "Volaille",
    price: 13.9,
    weight: "500 g",
    image: IMG("1604503468506-a8da13d82791"),
    description:
      "Filets frais sans os ni peau, prêts à cuisiner. Polyvalents et pauvres en matières grasses.",
    isHalal: true,
    inStock: true,
  },
  {
    id: 13,
    name: "Cuisses de Poulet Marinées",
    category: "Volaille",
    price: 9.9,
    weight: "env. 250 g/pièce",
    image: IMG("1555939594-58d7cb561ad1"),
    description:
      "Marinées aux épices orientales, pour le four ou le barbecue. Prêtes à cuire.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
  },
  {
    id: 14,
    name: "Dinde Entière",
    category: "Volaille",
    price: 8.9,
    weight: "env. 3–4 kg",
    image: IMG("1529193591184-b1d58069ecdd"),
    description:
      "Dinde fermière halal, idéale pour les repas de fête. Commande sur mesure disponible.",
    isHalal: true,
    inStock: true,
  },
  {
    id: 15,
    name: "Escalope de Dinde",
    category: "Volaille",
    price: 12.5,
    weight: "200 g",
    image: IMG("1568901346375-23c9450c58cd"),
    description:
      "Escalopes fines, parfaites pour une cuisine rapide et légère au quotidien.",
    isHalal: true,
    inStock: true,
  },
  // ── Traiteur & Épicerie ──────────────────────────────────────────────────
  {
    id: 16,
    name: "Brochettes Maison Mixtes",
    category: "Traiteur & Épicerie",
    price: 18.9,
    weight: "env. 150 g/brochette",
    image: IMG("1555939594-58d7cb561ad1"),
    description:
      "Brochettes bœuf & agneau marinées aux herbes, préparées chaque matin.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
  {
    id: 17,
    name: "Colis Barbecue Premium",
    category: "Traiteur & Épicerie",
    price: 49.9,
    originalPrice: 59.9,
    weight: "~2 kg",
    image: IMG("1529193591184-b1d58069ecdd"),
    description:
      "Merguez, brochettes, côtelettes et steaks hachés. Pour 4 à 6 personnes.",
    badge: "Promo",
    isHalal: true,
    inStock: true,
  },
  {
    id: 18,
    name: "Épices Ras el Hanout",
    category: "Traiteur & Épicerie",
    price: 6.9,
    weight: "100 g",
    image: IMG("1506905516-0e0b7c269e37"),
    description:
      "Mélange marocain authentique, idéal pour tajines, couscous et marinades.",
    badge: "Nouveau",
    isHalal: true,
    inStock: true,
  },
  {
    id: 19,
    name: "Sauce Chermoula Maison",
    category: "Traiteur & Épicerie",
    price: 4.5,
    weight: "200 ml",
    image: IMG("1601063476271-a159c71ab0b3"),
    description:
      "Marinade fraîche aux herbes, préparée maison chaque jour. Idéale pour poissons et grillades.",
    isHalal: true,
    inStock: true,
  },
  {
    id: 20,
    name: "Kefta Maison",
    category: "Traiteur & Épicerie",
    price: 15.9,
    weight: "env. 100 g/pièce",
    image: IMG("1568901346375-23c9450c58cd"),
    description:
      "Kefta au bœuf et agneau mélangés, parfumée au cumin et au persil frais.",
    badge: "Bestseller",
    isHalal: true,
    inStock: true,
  },
];

export const categories: ProductCategory[] = [
  "Bœuf & Veau",
  "Agneau",
  "Volaille",
  "Traiteur & Épicerie",
];
