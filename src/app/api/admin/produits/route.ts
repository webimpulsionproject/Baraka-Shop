import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — liste tous les produits
export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

// POST — créer un produit
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const product = await prisma.product.create({
      data: {
        name:           body.name,
        slug:           body.slug || slug,
        category:       body.category,
        price:          parseFloat(body.price),
        promoPrice:     body.promoPrice ? parseFloat(body.promoPrice) : null,
        promoEndDate:   body.promoEndDate || null,
        weight:         body.weight || null,
        image:          body.image,
        description:    body.description,
        badge:          body.badge || null,
        inStock:        body.inStock ?? true,
        stock:          body.stock ? parseInt(body.stock) : null,
        origin:         body.origin || null,
        decoupeOptions: body.decoupeOptions ?? false,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
