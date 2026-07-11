import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Kutilmoqda",
  CONFIRMED: "Tasdiqlandi",
  SHIPPED: "Yo'lda",
  DELIVERED: "Yetkazildi",
  CANCELLED: "Bekor qilindi",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Buyurtmalarim</h1>

      {success && (
        <div className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Buyurtmangiz qabul qilindi! Tez orada siz bilan bog&apos;lanamiz.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center text-neutral-500">
          <p>Hali buyurtmalar yo&apos;q.</p>
          <Link href="/catalog" className="mt-4 inline-block text-neutral-900 underline">
            Xarid qilishni boshlash
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-neutral-500">
                  {order.createdAt.toLocaleDateString("uz-UZ")}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
              <ul className="space-y-1">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm text-neutral-700">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>{formatPrice(item.priceAtOrder * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 text-sm font-semibold text-neutral-900">
                <span>Jami</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
