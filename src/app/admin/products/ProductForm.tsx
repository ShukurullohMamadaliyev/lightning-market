"use client";

import { useActionState } from "react";
import Image from "next/image";

type Category = { id: string; name: string };

type ProductFormProps = {
  action: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;
  categories: Category[];
  submitLabel: string;
  initial?: {
    name: string;
    description: string;
    price: number;
    discountPrice: number | null;
    stock: number;
    categoryId: string;
    isActive: boolean;
    images: { url: string }[];
  };
};

export function ProductForm({ action, categories, submitLabel, initial }: ProductFormProps) {
  const [error, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-700">Nomi</label>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-700">Tavsif</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initial?.description}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Narxi (so&apos;m)</label>
          <input
            name="price"
            type="number"
            min={0}
            required
            defaultValue={initial?.price}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Chegirmali narx (ixtiyoriy)
          </label>
          <input
            name="discountPrice"
            type="number"
            min={0}
            defaultValue={initial?.discountPrice ?? undefined}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Ombordagi soni</label>
          <input
            name="stock"
            type="number"
            min={0}
            required
            defaultValue={initial?.stock}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Kategoriya</label>
          <select
            name="categoryId"
            required
            defaultValue={initial?.categoryId}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          >
            <option value="" disabled>
              Tanlang
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-700">
          Rasmlar {initial ? "(yangilarini qo'shish uchun tanlang)" : ""}
        </label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm"
        />
        {initial && initial.images.length > 0 && (
          <div className="mt-2 flex gap-2">
            {initial.images.map((img) => (
              <div key={img.url} className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                <Image src={img.url} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={initial?.isActive ?? true}
          className="h-4 w-4 rounded border-neutral-300"
        />
        Faol (saytda ko&apos;rinadi)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {isPending ? "Saqlanmoqda..." : submitLabel}
      </button>
    </form>
  );
}
