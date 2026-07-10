import Link from "next/link";

export type CategoryNavItem = { id: string; name: string; slug: string };

export function CategoryNav({
  categories,
  activeSlug,
}: {
  categories: CategoryNavItem[];
  activeSlug?: string;
}) {
  return (
    <nav className="flex flex-wrap gap-2">
      <Link
        href="/catalog"
        className={`rounded-full border px-4 py-1.5 text-sm transition ${
          !activeSlug
            ? "border-neutral-900 bg-neutral-900 text-white"
            : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
        }`}
      >
        Barchasi
      </Link>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/category/${c.slug}`}
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            activeSlug === c.slug
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-700 hover:border-neutral-900"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
