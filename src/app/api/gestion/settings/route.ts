import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const DEFAULTS: Record<string, string> = {
  mode_aid:     "false",
  mode_ramadan: "false",
};

const ALLOWED_KEYS = new Set(Object.keys(DEFAULTS));

// Schéma strict : uniquement "true" ou "false"
const SettingsUpdateSchema = z.object({
  mode_aid:     z.enum(["true", "false"]).optional(),
  mode_ramadan: z.enum(["true", "false"]).optional(),
});

export async function GET() {
  const rows = await prisma.siteSettings.findMany();
  const settings: Record<string, string> = { ...DEFAULTS };
  for (const row of rows) settings[row.key] = row.value;
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsed = SettingsUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    }

    const entries = Object.entries(parsed.data).filter(
      ([key, val]) => ALLOWED_KEYS.has(key) && val !== undefined
    ) as [string, string][];

    if (entries.length === 0) {
      return NextResponse.json({ error: "Aucune clé valide" }, { status: 422 });
    }

    for (const [key, value] of entries) {
      await prisma.siteSettings.upsert({
        where:  { key },
        update: { value },
        create: { key, value },
      });
    }

    // Invalide le cache Next.js → la homepage relit la DB au prochain chargement
    revalidatePath("/");
    revalidatePath("/produits");
    revalidatePath("/epicerie");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
