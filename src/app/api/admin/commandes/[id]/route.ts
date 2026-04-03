import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH — mettre à jour le statut d'une commande
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    const order = await prisma.order.update({
      where: { id: parseInt(params.id) },
      data: { status },
      include: { items: true },
    });
    return NextResponse.json(order);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
