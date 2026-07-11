import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS = [
  {
    title: "Kurslar",
    links: [
      { label: "Trading asoslari", href: "/#kurslar" },
      { label: "Professional Trader", href: "/#kurslar" },
      { label: "Sun'iy intellekt asoslari", href: "/#kurslar" },
      { label: "ChatGPT va Prompt Engineering", href: "/#kurslar" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/#biz-haqimizda" },
      { label: "Ustozlarimiz", href: "/#ustozlar" },
      { label: "Bog'lanish", href: "/#biz-haqimizda" },
    ],
  },
  {
    title: "Yordam",
    links: [
      { label: "Ko'p so'raladigan savollar", href: "#" },
      { label: "To'lov shartlari", href: "#" },
      { label: "Maxfiylik siyosati", href: "#" },
    ],
  },
  {
    title: "Ijtimoiy tarmoqlar",
    links: [
      { label: "Telegram", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0b0d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <Logo variant="light" />
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} X Academy. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
