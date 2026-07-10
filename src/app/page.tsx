import { db } from "@/lib/db";
import { CategoryNav } from "@/components/storefront/CategoryNav";
import { ProductCard } from "@/components/storefront/ProductCard";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 12,
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-10 text-white sm:px-10">
        <h1 className="text-2xl font-bold sm:text-3xl">
          O&apos;zbekiston bo&apos;ylab yetkazib beramiz
        </h1>
        <p className="mt-2 max-w-xl text-emerald-50">
          Minglab mahsulotlar, qulay narxlar va tez yetkazib berish — barchasi
          bir joyda.
        </p>
      </section>

      <section className="mb-8">
        <CategoryNav categories={categories} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Yangi mahsulotlar
        </h2>
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
      </section>
    </div>
  );
}
