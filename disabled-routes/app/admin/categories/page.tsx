import { db } from "@/lib/db";
import { CategoryForm } from "./CategoryForm";
import { DeleteCategoryButton } from "./DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Kategoriyalar</h1>

      <div className="mb-8 rounded-xl border border-neutral-200 p-4">
        <CategoryForm />
      </div>

      <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
        {categories.map((c) => (
          <li key={c.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">{c.name}</p>
              <p className="text-xs text-neutral-500">{c._count.products} ta mahsulot</p>
            </div>
            <DeleteCategoryButton categoryId={c.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
