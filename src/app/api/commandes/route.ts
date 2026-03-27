import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = OrderSchema.parse(body);

    // Référence unique basée sur timestamp pour éviter les collisions
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
    const reference = `#BS-${new Date().getFullYear()}-${ts.slice(-4)}${rand}`;

    const order = await prisma.order.create({
      data: {
        reference,
        clientName: data.clientName,
        email: data.email,
        phone: data.phone ?? null,
        mode: data.mode,
        slot: data.slot ?? null,
        address: data.address ?? null,
        total: data.total,
        discount: data.discount ?? 0,
        promoCode: data.promoCode ?? null,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: err.issues.map((e) => e.message) },
        { status: 422 }
      );
    }
    console.error("[POST /api/commandes]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
