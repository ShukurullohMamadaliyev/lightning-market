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
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Kirish</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="siz@misol.uz"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Parol
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {isPending ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-neutral-600">
        Akkauntingiz yo&apos;qmi?{" "}
        <Link href="/register" className="font-medium text-neutral-900 underline">
          Ro&apos;yxatdan o&apos;tish
        </Link>
      </p>
    </div>
  );
}
