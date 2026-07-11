"use client";

import { deleteCategory } from "./actions";

export function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  return (
    <button
      onClick={() => {
        if (confirm("Kategoriyani o'chirishni tasdiqlaysizmi?")) {
          deleteCategory(categoryId);
        }
      }}
      className="text-sm text-red-600 hover:underline"
    >
      O&apos;chirish
    </button>
  );
}
