"use client";

import { deleteProduct } from "./actions";

export function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <button
      onClick={() => {
        if (confirm("Mahsulotni o'chirishni tasdiqlaysizmi?")) {
          deleteProduct(productId);
        }
      }}
      className="text-sm text-red-600 hover:underline"
    >
      O&apos;chirish
    </button>
  );
}
