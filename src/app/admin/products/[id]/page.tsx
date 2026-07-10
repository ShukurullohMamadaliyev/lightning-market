import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "../ProductForm";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Mahsulotni tahrirlash</h1>
      <ProductForm
        action={boundUpdate}
        categories={categories}
        submitLabel="Saqlash"
        initial={{
          name: product.name,
          description: product.description,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          categoryId: product.categoryId,
          isActive: product.isActive,
          images: product.images,
        }}
      />
    </div>
  );
}
