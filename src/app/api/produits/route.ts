import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const promo = searchParams.get("promo");

  const products = await prisma.product.findMany({
    where: {
      ...(category && category !== "Tous" ? { category } : {}),
      ...(promo === "true" ? { promoPrice: { not: null } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
              { category: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
