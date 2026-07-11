"use client";

import { useActionState } from "react";
import { createCategory } from "./actions";

export function CategoryForm() {
  const [error, formAction, isPending] = useActionState(createCategory, undefined);

  return (
    <form action={formAction} className="flex items-end gap-3">
      <div className="flex-1">
        <label className="mb-1 block text-sm font-medium text-neutral-700">
          Yangi kategoriya nomi
        </label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          placeholder="Masalan: Sport buyumlari"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {isPending ? "Qo'shilmoqda..." : "Qo'shish"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
