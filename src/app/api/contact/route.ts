import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().max(20).optional(),
  subject: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = ContactSchema.safeParse(body);

    if (!data.success) {
      return NextResponse.json(
        { error: "Données invalides", details: data.error.flatten() },
        { status: 422 }
      );
    }

    // TODO: intégrer un service email (Resend, SendGrid, Nodemailer)
    // Pour l'instant on log et on retourne success
    console.log("[CONTACT]", {
      from: data.data.email,
      name: data.data.name,
      subject: data.data.subject,
      preview: data.data.message.slice(0, 60),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
