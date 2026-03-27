import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReviewSchema } from "@/lib/validation";
import { ZodError } from "zod";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = ReviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        author: data.author,
        rating: data.rating,
        text: data.text,
        date: data.date ?? new Date().toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: err.issues.map((e) => e.message) },
        { status: 422 }
      );
    }
    console.error("[POST /api/avis]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
