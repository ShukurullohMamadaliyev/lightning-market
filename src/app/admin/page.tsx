import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, orderCount, pendingOrders, revenue] =
    await Promise.all([
      db.product.count(),
      db.category.count(),
      db.order.count(),
      db.order.count({ where: { status: "PENDING" } }),
      db.order.aggregate({ _sum: { totalAmount: true } }),
    ]);

  const stats = [
    { label: "Mahsulotlar", value: productCount },
    { label: "Kategoriyalar", value: categoryCount },
    { label: "Buyurtmalar", value: orderCount },
    { label: "Kutilayotgan buyurtmalar", value: pendingOrders },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-neutral-200 p-4">
        <p className="text-sm text-neutral-500">Umumiy tushum</p>
        <p className="mt-1 text-2xl font-bold text-neutral-900">
          {formatPrice(revenue._sum.totalAmount ?? 0)}
        </p>
      </div>
    </div>
  );
}
