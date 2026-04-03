import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductInputSchema, parseId } from "@/lib/validation";
import { ZodError } from "zod";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const body = await request.json();
    const data = ProductInputSchema.parse(body);

    const product = await prisma.product.update({
      where: { id },
      data: {
        name:           data.name,
        slug:           data.slug,
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
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json({ error: "Données invalides", details: e.flatten() }, { status: 422 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
