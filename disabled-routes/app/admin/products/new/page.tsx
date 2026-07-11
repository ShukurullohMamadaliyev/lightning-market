import { db } from "@/lib/db";
import { ProductForm } from "../ProductForm";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Yangi mahsulot</h1>
      <ProductForm action={createProduct} categories={categories} submitLabel="Qo'shish" />
    </div>
  );
}
