import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// PATCH — modifier un compte (displayName, password, active)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};
    if (body.displayName) data.displayName = body.displayName;
    if (body.active !== undefined) data.active = body.active;
    if (body.password) data.passwordHash = await bcrypt.hash(body.password, 12);

    const admin = await prisma.adminUser.update({
      where: { id: parseInt(params.id) },
      data,
      select: { id: true, username: true, displayName: true, role: true, active: true, createdAt: true },
    });
    return NextResponse.json(admin);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE — supprimer un compte
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.adminUser.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
