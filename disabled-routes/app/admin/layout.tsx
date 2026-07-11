import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
      <aside className="w-48 shrink-0">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Admin panel
        </h2>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/admin" className="rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100">
            Dashboard
          </Link>
          <Link href="/admin/products" className="rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100">
            Mahsulotlar
          </Link>
          <Link href="/admin/categories" className="rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100">
            Kategoriyalar
          </Link>
          <Link href="/admin/orders" className="rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100">
            Buyurtmalar
          </Link>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
