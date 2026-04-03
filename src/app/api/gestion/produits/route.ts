import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductInputSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ProductInputSchema.parse(body);

    // Génération du slug si absent
    const slug = data.slug || data.name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const product = await prisma.product.create({
      data: {
        name:           data.name,
        slug,
        category:       data.category,
        price:          data.price,
        promoPrice:     data.promoPrice ?? null,
        promoEndDate:   data.promoEndDate ?? null,
        weight:         data.weight ?? null,
        image:          data.image,
        description:    data.description ?? "",
        badge:          data.badge || null,
        inStock:        data.inStock ?? true,
        stock:          data.stock ?? null,
        origin:         data.origin ?? null,
        decoupeOptions: data.decoupeOptions ?? false,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: "Données invalides", details: e.flatten() }, { status: 422 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
