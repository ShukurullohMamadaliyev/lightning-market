import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { CategoryNav } from "@/components/storefront/CategoryNav";
import { ProductCard } from "@/components/storefront/ProductCard";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(category ? { category: { slug: category } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        }
      : {}),
  };

  const [categories, products] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-xl font-semibold text-neutral-900">
        {q ? `"${q}" bo'yicha qidiruv natijalari` : "Katalog"}
      </h1>

      <div className="mb-8">
        <CategoryNav categories={categories} activeSlug={category} />
      </div>

      {products.length === 0 ? (
        <p className="text-neutral-500">Hech qanday mahsulot topilmadi.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
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
