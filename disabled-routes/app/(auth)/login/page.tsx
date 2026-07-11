"use client";

import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "./actions";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">Kirish</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/70">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#5b6f94] focus:outline-none"
            placeholder="siz@misol.uz"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/70">
            Parol
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#5b6f94] focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-[#3d4a63] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5b6f94] disabled:opacity-50"
        >
          {isPending ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-white/60">
        Akkauntingiz yo&apos;qmi?{" "}
        <Link href="/register" className="font-medium text-white underline">
          Ro&apos;yxatdan o&apos;tish
        </Link>
      </p>
    </div>
  );
}
