import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const LoginSchema = z.object({
  password: z.string().min(1).max(200),
});

function getIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip        = getIp(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;

  try {
    const body = await request.json();
    const { password } = LoginSchema.parse(body);

    const secret = process.env.IT_ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "IT_ADMIN_SECRET non configuré" }, { status: 500 });
    }

    if (password !== secret) {
      await prisma.loginLog.create({
        data: { type: "it", username: null, success: false, ip, userAgent },
      });
      return NextResponse.json({ error: "Accès refusé" }, { status: 401 });
    }

    await prisma.loginLog.create({
      data: { type: "it", username: "it-admin", success: true, ip, userAgent },
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set("it_admin_session", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 4, // 4h
      path: "/",
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("it_admin_session", "", { maxAge: 0, path: "/" });
  return response;
}
