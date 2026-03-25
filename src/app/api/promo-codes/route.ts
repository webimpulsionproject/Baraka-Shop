import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const codes = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(codes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { code, type, value, label } = body;

  if (!code || !type || !value || !label) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  const existing = await prisma.promoCode.findUnique({ where: { code: code.toUpperCase() } });
  if (existing) {
    return NextResponse.json({ error: "Ce code existe déjà" }, { status: 409 });
  }

  const promoCode = await prisma.promoCode.create({
    data: { code: code.toUpperCase(), type, value: parseFloat(value), label },
  });

  return NextResponse.json(promoCode, { status: 201 });
}
