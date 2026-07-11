"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-neutral-900">Savat bo&apos;sh</h1>
        <p className="mt-2 text-neutral-500">Hali hech qanday mahsulot qo&apos;shilmagan.</p>
        <Link
          href="/catalog"
          className="mt-6 inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Katalogga o&apos;tish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Savat</h1>

      <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              ) : null}
            </div>
            <div className="flex-1">
              <Link href={`/product/${item.slug}`} className="text-sm font-medium text-neutral-900 hover:underline">
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center rounded-lg border border-neutral-300">
              <button
                onClick={() => setQuantity(item.productId, item.quantity - 1)}
                className="px-2.5 py-1.5 text-neutral-600 hover:text-neutral-900"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.productId, item.quantity + 1)}
                className="px-2.5 py-1.5 text-neutral-600 hover:text-neutral-900"
              >
                +
              </button>
            </div>
            <span className="w-24 text-right text-sm font-medium text-neutral-900">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-neutral-400 hover:text-red-600"
              aria-label="O'chirish"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-neutral-200 p-4">
        <span className="text-base font-medium text-neutral-900">Jami:</span>
        <span className="text-lg font-bold text-neutral-900">{formatPrice(totalPrice)}</span>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="mt-4 w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        Buyurtma berish
      </button>
    </div>
  );
}
