"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CheckoutForm({ defaultPhone }: { defaultPhone: string }) {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(defaultPhone);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return <p className="text-neutral-500">Savat bo&apos;sh. Avval mahsulot qo&apos;shing.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryAddress: address,
          phone,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Buyurtma yaratishda xatolik yuz berdi");
        setIsSubmitting(false);
        return;
      }

      clear();
      router.push("/orders?success=1");
    } catch {
      setError("Tarmoq xatoligi. Qayta urinib ko'ring.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Yetkazib berish manzili
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="Viloyat, tuman, ko'cha, uy raqami"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Telefon raqam
          </label>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            placeholder="+998 90 123 45 67"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
        </button>
        <p className="text-xs text-neutral-500">
          To&apos;lov yetkazib berilganda naqd yoki karta orqali amalga oshiriladi.
        </p>
      </form>

      <div className="h-fit rounded-xl border border-neutral-200 p-4">
        <h2 className="mb-3 text-sm font-semibold text-neutral-900">Buyurtma tarkibi</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between text-sm">
              <span className="text-neutral-700">
                {item.name} × {item.quantity}
              </span>
              <span className="text-neutral-900">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-900">
          <span>Jami</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}
