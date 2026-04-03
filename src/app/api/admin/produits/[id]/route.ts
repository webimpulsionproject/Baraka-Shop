import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT — modifier un produit
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        name:           body.name,
        slug:           body.slug,
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
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — supprimer un produit
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
