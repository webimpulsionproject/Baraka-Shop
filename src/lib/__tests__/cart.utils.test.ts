import { describe, it, expect } from "vitest";
import {
  computeCartTotal,
  computeItemCount,
  applyPromo,
  pricePerKg,
  isSlotAvailable,
  formatPrice,
} from "../cart.utils";
import type { CartItem } from "../cart-context";
import type { Product } from "../data";

// Produit mock minimal
const makeProduct = (id: number, price: number): Product =>
  ({
    id,
    name: `Produit ${id}`,
    slug: `produit-${id}`,
    category: "Boeuf",
    price,
    image: "/test.jpg",
    description: "",
    inStock: true,
  } as Product);

const makeItem = (id: number, price: number, qty: number): CartItem => ({
  product: makeProduct(id, price),
  quantity: qty,
});

// ─── computeCartTotal ──────────────────────────────────────────────────────────
describe("computeCartTotal", () => {
  it("retourne 0 pour un panier vide", () => {
    expect(computeCartTotal([])).toBe(0);
  });

  it("calcule le total pour un seul article", () => {
    expect(computeCartTotal([makeItem(1, 10, 3)])).toBe(30);
  });

  it("calcule le total pour plusieurs articles", () => {
    const items = [makeItem(1, 15.5, 2), makeItem(2, 8, 1)];
    expect(computeCartTotal(items)).toBeCloseTo(39);
  });
});

// ─── computeItemCount ─────────────────────────────────────────────────────────
describe("computeItemCount", () => {
  it("retourne 0 pour un panier vide", () => {
    expect(computeItemCount([])).toBe(0);
  });

  it("additionne les quantités", () => {
    const items = [makeItem(1, 10, 2), makeItem(2, 5, 3)];
    expect(computeItemCount(items)).toBe(5);
  });
});

// ─── applyPromo ───────────────────────────────────────────────────────────────
describe("applyPromo", () => {
  it("applique une réduction en pourcentage", () => {
    expect(applyPromo(100, { type: "percent", value: 10 })).toBe(10);
  });

  it("applique une réduction fixe", () => {
    expect(applyPromo(100, { type: "fixed", value: 15 })).toBe(15);
  });

  it("ne dépasse pas le total pour une réduction fixe trop élevée", () => {
    expect(applyPromo(10, { type: "fixed", value: 999 })).toBe(10);
  });

  it("ne dépasse pas le total pour un pourcentage (100%)", () => {
    expect(applyPromo(50, { type: "percent", value: 100 })).toBe(50);
  });
});

// ─── pricePerKg ───────────────────────────────────────────────────────────────
describe("pricePerKg", () => {
  it("calcule le prix au kilo pour 500g", () => {
    expect(pricePerKg(12.5, 500)).toBeCloseTo(25);
  });

  it("retourne 0 si le poids est nul", () => {
    expect(pricePerKg(10, 0)).toBe(0);
  });

  it("retourne 0 si le poids est négatif", () => {
    expect(pricePerKg(10, -200)).toBe(0);
  });
});

// ─── isSlotAvailable ──────────────────────────────────────────────────────────
describe("isSlotAvailable", () => {
  const booked = ["10h-11h", "14h-15h"];

  it("retourne true si le créneau est libre", () => {
    expect(isSlotAvailable("11h-12h", booked)).toBe(true);
  });

  it("retourne false si le créneau est déjà réservé", () => {
    expect(isSlotAvailable("10h-11h", booked)).toBe(false);
  });

  it("retourne true si aucun créneau n'est réservé", () => {
    expect(isSlotAvailable("09h-10h", [])).toBe(true);
  });
});

// ─── formatPrice ──────────────────────────────────────────────────────────────
describe("formatPrice", () => {
  it("formate correctement un prix en euros", () => {
    // Le format fr-FR peut utiliser des espaces insécables — on compare le nombre
    const result = formatPrice(25.5);
    expect(result).toContain("25");
    expect(result).toContain("€");
  });

  it("gère le prix 0", () => {
    const result = formatPrice(0);
    expect(result).toContain("0");
  });
});
