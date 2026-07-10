import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CategoryNav } from "@/components/storefront/CategoryNav";
import { ProductCard } from "@/components/storefront/ProductCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, category] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { createdAt: "desc" },
          include: { images: { orderBy: { order: "asc" }, take: 1 } },
        },
      },
    }),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-xl font-semibold text-neutral-900">
        {category.name}
      </h1>

      <div className="mb-8">
        <CategoryNav categories={categories} activeSlug={category.slug} />
      </div>

      {category.products.length === 0 ? (
        <p className="text-neutral-500">Bu kategoriyada hozircha mahsulot yo&apos;q.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {category.products.map((p) => (
            <ProductCard
              key={p.id}
              product={{
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: p.price,
                discountPrice: p.discountPrice,
                stock: p.stock,
                image: p.images[0]?.url ?? null,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
