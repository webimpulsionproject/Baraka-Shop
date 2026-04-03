import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Identifiants manquants" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { username } });
    if (!admin || !admin.active) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const response = NextResponse.json({
      ok: true,
      displayName: admin.displayName,
      role: admin.role,
    });

    response.cookies.set("admin_session", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8h
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return response;
}
