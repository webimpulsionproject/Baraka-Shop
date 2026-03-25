export type ProductCategory =
  | "Boucherie"
  | "Agneau"
  | "Volaille"
  | "Traiteur"
  | "Épicerie";

export type ProductBadge = "Nouveau" | "Promo" | "Bestseller";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  badge?: ProductBadge;
  isHalal: true;
  unit?: string; // ex: "/ kg", "/ pièce"
}

export const products: Product[] = [
  // ── Boucherie ─────────────────────────────────────────────────────────────
  {
    id: 1,
    name: "Entrecôte Bœuf Charolais",
    category: "Boucherie",
    price: 28.90,
    image: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&h=400&fit=crop",
    description: "Entrecôte persillée de race Charolaise, tendre et savoureuse. Découpe sur mesure selon votre demande.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 2,
    name: "Steak Haché Pur Bœuf",
    category: "Boucherie",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    description: "Steak haché façonné à la main, 100% pur bœuf français. Idéal pour le barbecue ou la poêle.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 3,
    name: "Côte de Bœuf Blonde d'Aquitaine",
    category: "Boucherie",
    price: 32.50,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
    description: "Côte de bœuf de race Blonde d'Aquitaine, viande à la texture fine et au goût délicat.",
    badge: "Nouveau",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 4,
    name: "Merguez Artisanales Maison",
    category: "Boucherie",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&h=400&fit=crop",
    description: "Merguez préparées artisanalement chaque matin avec un mélange d'épices traditionnel du Maghreb.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ kg",
  },
  // ── Agneau ────────────────────────────────────────────────────────────────
  {
    id: 5,
    name: "Gigot d'Agneau Entier",
    category: "Agneau",
    price: 22.90,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=400&fit=crop",
    description: "Gigot d'agneau entier de qualité supérieure. Parfait pour les grandes occasions et le méchoui.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 6,
    name: "Côtelettes d'Agneau",
    category: "Agneau",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=400&fit=crop",
    description: "Côtelettes d'agneau finement parées, tendres et goûteuses. Cuisson idéale au grill ou à la plancha.",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 7,
    name: "Épaule d'Agneau Désossée",
    category: "Agneau",
    price: 19.90,
    originalPrice: 23.90,
    image: "https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400&h=400&fit=crop",
    description: "Épaule d'agneau désossée et ficelée par notre boucher. Idéale pour un rôti fondant au four.",
    badge: "Promo",
    isHalal: true,
    unit: "/ kg",
  },
  // ── Volaille ──────────────────────────────────────────────────────────────
  {
    id: 8,
    name: "Poulet Fermier Entier",
    category: "Volaille",
    price: 11.90,
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop",
    description: "Poulet fermier élevé en plein air, saveur authentique. Découpé à la demande par notre boucher.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ pièce",
  },
  {
    id: 9,
    name: "Blanc de Poulet Frais",
    category: "Volaille",
    price: 13.90,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
    description: "Filets de blanc de poulet sans os ni peau, prêts à cuisiner. Polyvalents et pauvres en matières grasses.",
    isHalal: true,
    unit: "/ kg",
  },
  // ── Traiteur ──────────────────────────────────────────────────────────────
  {
    id: 10,
    name: "Brochettes Maison (Bœuf & Agneau)",
    category: "Traiteur",
    price: 18.90,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop",
    description: "Brochettes préparées chaque matin par notre boucher, marinées aux herbes et épices orientales.",
    badge: "Bestseller",
    isHalal: true,
    unit: "/ kg",
  },
  {
    id: 11,
    name: "Colis Barbecue Premium",
    category: "Traiteur",
    price: 49.90,
    originalPrice: 59.90,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=400&fit=crop",
    description: "Colis complet : merguez, brochettes, côtelettes d'agneau et steaks hachés. Parfait pour 4 à 6 personnes.",
    badge: "Promo",
    isHalal: true,
    unit: "/ colis",
  },
  // ── Épicerie ──────────────────────────────────────────────────────────────
  {
    id: 12,
    name: "Épices pour Méchoui",
    category: "Épicerie",
    price: 6.90,
    image: "https://images.unsplash.com/photo-1506905516-0e0b7c269e37?w=400&h=400&fit=crop",
    description: "Mélange d'épices traditionnel pour méchoui et grillades : cumin, paprika, coriandre, ail et herbes.",
    badge: "Nouveau",
    isHalal: true,
    unit: "/ sachet",
  },
];

export const categories: ProductCategory[] = [
  "Boucherie",
  "Agneau",
  "Volaille",
  "Traiteur",
  "Épicerie",
];
