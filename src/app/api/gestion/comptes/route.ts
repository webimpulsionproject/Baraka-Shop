import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET — liste les admins
export async function GET() {
  const admins = await prisma.adminUser.findMany({
    select: { id: true, username: true, displayName: true, role: true, active: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(admins);
}

// POST — créer un admin
export async function POST(request: Request) {
  try {
    const { username, password, displayName, role } = await request.json();
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.adminUser.create({
      data: { username, passwordHash, displayName, role: role || "boucher" },
      select: { id: true, username: true, displayName: true, role: true, active: true, createdAt: true },
    });
    return NextResponse.json(admin, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
