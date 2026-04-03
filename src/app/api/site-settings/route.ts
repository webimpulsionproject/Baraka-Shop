import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULTS = { mode_aid: "false", mode_ramadan: "false" };

export async function GET() {
  const rows = await prisma.siteSettings.findMany();
  const settings: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) settings[row.key] = row.value;
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "no-store" },
  });
}
