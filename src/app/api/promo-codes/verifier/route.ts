import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json({ error: "Code manquant" }, { status: 400 });
  }

  const promoCode = await prisma.promoCode.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!promoCode || !promoCode.active) {
    return NextResponse.json({ error: "Code invalide ou expiré" }, { status: 404 });
  }

  return NextResponse.json(promoCode);
}
