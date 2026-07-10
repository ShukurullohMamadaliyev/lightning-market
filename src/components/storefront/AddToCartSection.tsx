"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";

export function AddToCartSection({
  product,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice: number | null;
    stock: number;
    image: string | null;
  };
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const displayPrice = product.discountPrice ?? product.price;

  if (product.stock === 0) {
    return (
      <p className="rounded-lg bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
        Hozircha mavjud emas
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-neutral-300">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-neutral-600 hover:text-neutral-900"
          >
            −
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="px-3 py-2 text-neutral-600 hover:text-neutral-900"
          >
            +
          </button>
        </div>
        <span className="text-sm text-neutral-500">{product.stock} ta mavjud</span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            addItem(
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: displayPrice,
                image: product.image,
                stock: product.stock,
              },
              quantity,
            );
            setAdded(true);
          }}
          className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Savatga qo&apos;shish
        </button>
        {added && (
          <button
            onClick={() => router.push("/cart")}
            className="rounded-lg border border-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
          >
            Savatni ko&apos;rish
          </button>
        )}
      </div>
    </div>
  );
}
