"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCartStore } from "@/lib/cart-store";

export function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = (form.get("q") as string)?.trim();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="shrink-0 text-xl font-bold text-neutral-900">
          Online<span className="text-emerald-600">Savdo</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1">
          <input
            name="q"
            type="search"
            placeholder="Mahsulot qidirish..."
            className="w-full rounded-full border border-neutral-300 px-4 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </form>

        <nav className="flex shrink-0 items-center gap-4 text-sm">
          <Link href="/catalog" className="hidden text-neutral-700 hover:text-neutral-900 sm:block">
            Katalog
          </Link>

          <Link href="/cart" className="relative text-neutral-700 hover:text-neutral-900">
            Savat
            {mounted && totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-medium text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/orders" className="hidden text-neutral-700 hover:text-neutral-900 sm:block">
                Buyurtmalarim
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="text-neutral-700 hover:text-neutral-900">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-neutral-700 hover:text-neutral-900"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-neutral-700 hover:text-neutral-900">
              Kirish
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
