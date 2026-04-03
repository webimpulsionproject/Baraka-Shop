import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseId } from "@/lib/validation";
import { z } from "zod";

const VALID_STATUSES = ["En attente", "En préparation", "Prête", "Livrée", "Annulée"] as const;

const PatchSchema = z.object({
  status: z.enum(VALID_STATUSES, { message: "Statut invalide" }),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const body = await request.json();
    const { status } = PatchSchema.parse(body);

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    return NextResponse.json(order);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
