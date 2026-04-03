import { z } from "zod";

/** Schéma de validation pour la création d'une commande */
export const OrderSchema = z.object({
  clientName: z.string().min(2, "Nom trop court").max(100).trim(),
  email: z.string().email("Email invalide").max(254),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{8})$/, "Numéro de téléphone invalide").optional().or(z.literal("")),
  mode: z.enum(["Click & Collect", "Livraison"], { message: "Mode de livraison invalide" }),
  slot: z.string().max(100).optional(),
  address: z.string().max(300).optional(),
  promoCode: z.string().max(50).optional(),
  discount: z.number().min(0).max(10000).optional(),
  total: z.number().positive("Le total doit être positif").max(100000),
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        name: z.string().min(1).max(200),
        price: z.number().positive().max(10000),
        qty: z.number().int().positive().max(100),
      })
    )
    .min(1, "Le panier est vide"),
});

/** Schéma pour la création d'un avis client */
export const ReviewSchema = z.object({
  author: z.string().min(2, "Nom trop court").max(100).trim(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10, "Avis trop court").max(1000).trim(),
  date: z.string().max(50).optional(),
});

/** Schéma pour la vérification d'un code promo */
export const PromoVerifySchema = z.object({
  code: z.string().min(1).max(50).trim().toUpperCase(),
});

/** Schéma pour la création d'un produit (admin) */
export const ProductSchema = z.object({
  name: z.string().min(2).max(200).trim(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres, tirets)").max(200),
  category: z.string().min(1).max(100),
  price: z.number().positive().max(10000),
  promoPrice: z.number().positive().max(10000).optional().nullable(),
  weight: z.string().max(50).optional(),
  image: z.string().url("URL d'image invalide").max(500),
  description: z.string().max(1000).optional(),
  badge: z.string().max(50).optional().nullable(),
  inStock: z.boolean().optional(),
  stock: z.number().int().min(0).optional(),
  origin: z.string().max(100).optional(),
  decoupeOptions: z.boolean().optional(),
});

/**
 * Schéma pour les routes admin (inputs du formulaire HTML — strings coercées).
 * Utilisé dans POST /api/gestion/produits et PUT /api/gestion/produits/[id]
 */
const VALID_CATEGORIES = [
  "Bœuf & Veau",
  "Agneau & Mouton",
  "Volaille",
  "Traiteur & Marinés",
  "Épicerie",
] as const;

const VALID_BADGES = ["Nouveau", "Promo", "Bestseller", "Aïd", ""] as const;

export const ProductInputSchema = z.object({
  name:           z.string().min(2).max(200).trim(),
  slug:           z.string().regex(/^[a-z0-9-]+$/).max(200).optional(),
  category:       z.enum(VALID_CATEGORIES),
  price:          z.coerce.number().positive("Prix invalide").max(10000),
  promoPrice:     z.coerce.number().positive().max(10000).nullable().optional(),
  promoEndDate:   z.string().max(50).optional().nullable(),
  weight:         z.string().max(50).optional().nullable(),
  image:          z.string().url("URL d'image invalide").max(500),
  description:    z.string().max(1000).optional(),
  badge:          z.enum(VALID_BADGES).optional().nullable(),
  inStock:        z.boolean().optional().default(true),
  stock:          z.coerce.number().int().min(0).optional().nullable(),
  origin:         z.string().max(100).optional().nullable(),
  decoupeOptions: z.boolean().optional().default(false),
});

/** ID de ressource — valide un entier positif extrait depuis params */
export function parseId(raw: string): number | null {
  const id = parseInt(raw, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export type OrderInput   = z.infer<typeof OrderSchema>;
export type ReviewInput  = z.infer<typeof ReviewSchema>;
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductInputData = z.infer<typeof ProductInputSchema>;
