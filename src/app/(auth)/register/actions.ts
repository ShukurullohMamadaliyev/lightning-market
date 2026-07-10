"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth";

export async function register(
  _prevState: string | undefined,
  formData: FormData,
) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return "Barcha majburiy maydonlarni to'ldiring";
  }
  if (password.length < 6) {
    return "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return "Bu email bilan foydalanuvchi allaqachon mavjud";
  }

  await db.user.create({
    data: {
      name,
      email,
      phone: phone || null,
      passwordHash: await bcrypt.hash(password, 10),
      role: "CUSTOMER",
    },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Ro'yxatdan o'tildi, lekin avtomatik kirishda xatolik. Iltimos, qayta kiring.";
    }
    throw error;
  }
}
