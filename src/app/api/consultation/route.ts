import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTelegramMessage } from "@/lib/telegram";

const schema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(5),
  interest: z.string().trim().min(1),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Barcha maydonlarni to'g'ri to'ldiring" }, { status: 400 });
  }
  const { name, phone, interest } = parsed.data;

  const text = [
    "🆕 Yangi ariza — Bepul konsultatsiya",
    "",
    `👤 Ism: ${name}`,
    `📞 Telefon: ${phone}`,
    `🎯 Yo'nalish: ${interest}`,
  ].join("\n");

  const sent = await sendTelegramMessage(text);
  if (!sent) {
    return NextResponse.json(
      { error: "Yuborishda xatolik. Iltimos, birozdan so'ng qayta urinib ko'ring." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
