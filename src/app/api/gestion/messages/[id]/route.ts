import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH — marquer comme lu/non lu
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { read } = await request.json();
    const msg = await prisma.contactMessage.update({
      where: { id: parseInt(params.id) },
      data: { read },
    });
    return NextResponse.json(msg);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — supprimer un message
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.contactMessage.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
