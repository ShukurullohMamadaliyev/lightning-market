"use server";

import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData,
) {
  const ip = getClientIp(await headers());
  if (!rateLimit(`login:${ip}`, 10, 15 * 60 * 1000)) {
    return "Juda ko'p urinish. 15 daqiqadan so'ng qayta urinib ko'ring.";
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email yoki parol noto'g'ri";
        default:
          return "Kirishda xatolik yuz berdi";
      }
    }
    throw error;
  }
}
