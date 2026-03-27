import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PromoVerifySchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = PromoVerifySchema.parse(body);

    const promoCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promoCode || !promoCode.active) {
      return NextResponse.json({ error: "Code invalide ou expiré" }, { status: 404 });
    }

    // Ne pas exposer l'ID interne
    return NextResponse.json({
      code: promoCode.code,
      type: promoCode.type,
      value: promoCode.value,
      label: promoCode.label,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: "Code invalide" }, { status: 422 });
    }
    console.error("[POST /api/promo-codes/verifier]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
