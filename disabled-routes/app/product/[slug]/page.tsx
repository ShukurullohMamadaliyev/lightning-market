import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { AddToCartSection } from "@/components/storefront/AddToCartSection";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true,
      images: { orderBy: { order: "asc" } },
    },
  });

  if (!product) notFound();

  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;
  const displayPrice = product.discountPrice ?? product.price;
  const primaryImage = product.images[0]?.url ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-neutral-500">
        <Link href="/catalog" className="hover:underline">Katalog</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:underline">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              Rasm yo&apos;q
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">{product.name}</h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-neutral-900">
              {formatPrice(displayPrice)}
            </span>
            {hasDiscount && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mt-4 whitespace-pre-line text-neutral-700">
            {product.description}
          </p>

          <div className="mt-6">
            <AddToCartSection
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                discountPrice: product.discountPrice,
                stock: product.stock,
                image: primaryImage,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
