export type ProductCategory = "Épices" | "Thés & Infusions" | "Huiles" | "Miel & Sucres";
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
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ras el Hanout Premium",
    category: "Épices",
    price: 8.90,
    image: "https://images.unsplash.com/photo-1506905516-0e0b7c269e37?w=400&h=400&fit=crop",
    description: "Mélange d'épices marocaines soigneusement sélectionnées, idéal pour le tajine et le couscous.",
    badge: "Bestseller",
    isHalal: true,
  },
  {
    id: 2,
    name: "Thé à la Menthe Royale",
    category: "Thés & Infusions",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop",
    description: "Thé vert gunpowder mélangé à de la menthe fraîche séchée, préparation traditionnelle du Maghreb.",
    badge: "Bestseller",
    isHalal: true,
  },
  {
    id: 3,
    name: "Miel de Sidr Yéménite",
    category: "Miel & Sucres",
    price: 34.90,
    originalPrice: 42.00,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    description: "Le miel le plus précieux du monde, récolté dans les montagnes du Yémen. Propriétés médicinales reconnues.",
    badge: "Promo",
    isHalal: true,
  },
  {
    id: 4,
    name: "Huile d'Argan Alimentaire",
    category: "Huiles",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    description: "Huile d'argan pure, pressée à froid, idéale pour assaisonner couscous, salades et tajines.",
    badge: "Nouveau",
    isHalal: true,
  },
  {
    id: 5,
    name: "Herbes de Montagne Bio",
    category: "Thés & Infusions",
    price: 7.20,
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop",
    description: "Mélange d'herbes sauvages des montagnes du Maroc : romarin, thym, sarriette et origan.",
    isHalal: true,
  },
  {
    id: 6,
    name: "Café Turc Moulu",
    category: "Thés & Infusions",
    price: 12.90,
    originalPrice: 15.50,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop",
    description: "Café finement moulu à la turque, torréfaction médium, arôme intense avec notes de cardamome.",
    badge: "Promo",
    isHalal: true,
  },
  {
    id: 7,
    name: "Dattes Medjool Premium",
    category: "Miel & Sucres",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Dattes Medjool de calibre extra, charnues et sucrées, idéales pour la rupture du jeûne.",
    badge: "Bestseller",
    isHalal: true,
  },
  {
    id: 8,
    name: "Noix de Cajou & Amandes",
    category: "Miel & Sucres",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    description: "Mélange de noix de cajou et d'amandes grillées sans sel, riche en protéines et en bons lipides.",
    isHalal: true,
  },
  {
    id: 9,
    name: "Safran Pur de Kelaat M'Gouna",
    category: "Épices",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1601063476271-a159c71ab0b3?w=400&h=400&fit=crop",
    description: "Safran marocain de qualité supérieure, récolté à la main dans la vallée des roses. Arôme et couleur exceptionnels.",
    badge: "Nouveau",
    isHalal: true,
  },
  {
    id: 10,
    name: "Eau de Rose Naturelle",
    category: "Huiles",
    price: 9.90,
    image: "https://images.unsplash.com/photo-1615485925763-86db6c432520?w=400&h=400&fit=crop",
    description: "Eau de rose pure distillée à la vapeur, utilisée en cuisine orientale pour parfumer pâtisseries et boissons.",
    isHalal: true,
  },
  {
    id: 11,
    name: "Nigelle (Habba Sawda)",
    category: "Épices",
    price: 5.90,
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=400&fit=crop",
    description: "Graines de nigelle entières, surnommées la graine bénie. Utilisées en cuisine et pour leurs bienfaits naturels.",
    badge: "Bestseller",
    isHalal: true,
  },
  {
    id: 12,
    name: "Cardamome Verte Entière",
    category: "Épices",
    price: 13.50,
    originalPrice: 16.00,
    image: "https://images.unsplash.com/photo-1582576163090-d2e3e7d6e3e3?w=400&h=400&fit=crop",
    description: "Gousses de cardamome verte entières, parfum floral et citronné, indispensable pour le café arabe et les desserts.",
    badge: "Promo",
    isHalal: true,
  },
];

export const categories: ProductCategory[] = [
  "Épices",
  "Thés & Infusions",
  "Huiles",
  "Miel & Sucres",
];
