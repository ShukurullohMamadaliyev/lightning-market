import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTelegramMessage } from "@/lib/telegram";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  interest: z.enum(["Trading", "Sun'iy intellekt", "Ikkalasi ham"]),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!rateLimit(`consultation:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Juda ko'p urinish. Birozdan so'ng qayta urinib ko'ring." },
      { status: 429 },
    );
  }

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
