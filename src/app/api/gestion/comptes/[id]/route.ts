import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseId } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { z } from "zod";

const PatchSchema = z.object({
  displayName: z.string().min(2).max(100).trim().optional(),
  active:      z.boolean().optional(),
  password:    z.string().min(8).max(100).optional(),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    const body = await request.json();
    const parsed = PatchSchema.parse(body);

    const data: Record<string, unknown> = {};
    if (parsed.displayName !== undefined) data.displayName = parsed.displayName;
    if (parsed.active !== undefined)      data.active = parsed.active;
    if (parsed.password)                  data.passwordHash = await bcrypt.hash(parsed.password, 12);

    const admin = await prisma.adminUser.update({
      where: { id },
      data,
      select: { id: true, username: true, displayName: true, role: true, active: true, createdAt: true },
    });
    return NextResponse.json(admin);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "ID invalide" }, { status: 400 });

  try {
    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
