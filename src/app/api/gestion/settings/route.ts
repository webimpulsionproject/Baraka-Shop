import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const DEFAULTS: Record<string, string> = {
  mode_aid:     "false",
  mode_ramadan: "false",
};

// Seules ces clés peuvent être modifiées — évite l'injection de clés arbitraires
const ALLOWED_KEYS = new Set(Object.keys(DEFAULTS));

const SettingsSchema = z.record(
  z.string().max(50),
  z.enum(["true", "false"])
);

export async function GET() {
  const rows = await prisma.siteSettings.findMany();
  const settings: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) settings[row.key] = row.value;
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = SettingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    }

    // Filtrer les clés non autorisées
    const allowed = Object.entries(parsed.data).filter(([key]) => ALLOWED_KEYS.has(key));
    if (allowed.length === 0) {
      return NextResponse.json({ error: "Aucune clé valide" }, { status: 422 });
    }

    for (const [key, value] of allowed) {
      await prisma.siteSettings.upsert({
        where:  { key },
        update: { value },
        create: { key, value },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
