import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { OrderStatusSelect } from "./OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, items: { include: { product: true } } },
  });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-neutral-900">Buyurtmalar</h1>

      {orders.length === 0 ? (
        <p className="text-neutral-500">Hali buyurtmalar yo&apos;q.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {order.user.name} · {order.phone}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {order.createdAt.toLocaleString("uz-UZ")} · {order.deliveryAddress}
                  </p>
                </div>
                <OrderStatusSelect orderId={order.id} status={order.status} />
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
