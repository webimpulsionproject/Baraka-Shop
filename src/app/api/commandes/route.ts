import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { clientName, email, phone, mode, slot, address, items, total, discount, promoCode } = body;

  if (!clientName || !email || !mode || !items?.length) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  const reference = `#BS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;

  const order = await prisma.order.create({
    data: {
      reference,
      clientName,
      email,
      phone,
      mode,
      slot,
      address,
      total,
      discount: discount ?? 0,
      promoCode,
      items: {
        create: items.map((item: { productId: number; name: string; price: number; qty: number }) => ({
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
}
