import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { author, rating, text, date } = body;

  if (!author || !rating || !text) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: { author, rating: parseInt(rating), text, date: date ?? new Date().toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) },
  });

  return NextResponse.json(review, { status: 201 });
}
