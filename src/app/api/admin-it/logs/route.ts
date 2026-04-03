import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100", 10), 500);

  const logs = await prisma.loginLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const total   = await prisma.loginLog.count();
  const failed  = await prisma.loginLog.count({ where: { success: false } });
  const success = await prisma.loginLog.count({ where: { success: true } });

  // Dernière tentative échouée par IP
  const suspiciousIps = await prisma.loginLog.groupBy({
    by: ["ip"],
    where: { success: false },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  return NextResponse.json({ logs, stats: { total, failed, success, suspiciousIps } });
}
