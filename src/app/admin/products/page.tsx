import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900">Mahsulotlar</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          + Yangi mahsulot
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500">
            <tr>
              <th className="p-3">Rasm</th>
              <th className="p-3">Nomi</th>
              <th className="p-3">Kategoriya</th>
              <th className="p-3">Narxi</th>
              <th className="p-3">Ombor</th>
              <th className="p-3">Holati</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-neutral-100">
                    {p.images[0] && (
                      <Image src={p.images[0].url} alt="" fill className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="p-3 font-medium text-neutral-900">{p.name}</td>
                <td className="p-3 text-neutral-600">{p.category.name}</td>
                <td className="p-3 text-neutral-600">{formatPrice(p.discountPrice ?? p.price)}</td>
                <td className="p-3 text-neutral-600">{p.stock}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.isActive ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {p.isActive ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-sm text-neutral-700 hover:underline">
                      Tahrirlash
                    </Link>
                    <DeleteProductButton productId={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="p-6 text-center text-neutral-500">Hali mahsulot qo&apos;shilmagan.</p>
        )}
      </div>
    </div>
  );
}
