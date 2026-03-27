import type { CartItem } from "./cart-context";

/** Calcule le total TTC du panier */
export function computeCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

/** Calcule le nombre total d'articles */
export function computeItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

/** Applique un code promo et retourne le montant de la réduction */
export function applyPromo(
  total: number,
  promo: { type: "percent" | "fixed"; value: number }
): number {
  if (promo.type === "percent") {
    return Math.min(total, (total * promo.value) / 100);
  }
  return Math.min(total, promo.value);
}

/** Calcule le prix au kilo (pour affichage) */
export function pricePerKg(price: number, weightGrams: number): number {
  if (weightGrams <= 0) return 0;
  return (price / weightGrams) * 1000;
}

/** Vérifie si un créneau de livraison est disponible */
export function isSlotAvailable(slot: string, bookedSlots: string[]): boolean {
  return !bookedSlots.includes(slot);
}

/** Formate un prix en euros avec 2 décimales */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
