import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session || session !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Retourne le premier admin actif trouvé (session partagée par secret)
    // En prod réel on utiliserait un JWT avec le username
    const admin = await prisma.adminUser.findFirst({
      where: { active: true },
      select: { displayName: true, username: true, role: true },
    });

    if (!admin) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    return NextResponse.json({ ok: true, displayName: admin.displayName, username: admin.username });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
