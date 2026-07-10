"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  image: string | null;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const addItem = useCartStore((s) => s.addItem);
  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-neutral-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">
            Rasm yo&apos;q
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            Chegirma
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white">
            Tugagan
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-medium text-neutral-900 hover:underline">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-base font-semibold text-neutral-900">
            {formatPrice(displayPrice)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <button
          disabled={product.stock === 0}
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: displayPrice,
              image: product.image,
              stock: product.stock,
            })
          }
          className="mt-1 w-full rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Savatga qo&apos;shish
        </button>
      </div>
    </div>
  );
}
