"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Logo } from "@/components/brand/Logo";

const NAV_LINKS = [
  { href: "/#kurslar", label: "Kurslar" },
  { href: "/#ustozlar", label: "Ustozlar" },
  { href: "/#biz-haqimizda", label: "Biz haqimizda" },
];

export function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [scrolled]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-[#0a0b0d]/95 backdrop-blur"
          : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <Link href="/" className="shrink-0">
          <Logo variant="light" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-xs font-medium uppercase tracking-widest text-white/80 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-5 text-xs font-medium uppercase tracking-widest text-white/80 md:flex">
          {session?.user ? (
            <div className="flex items-center gap-5">
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="transition hover:text-white">
                  Admin
                </Link>
              )}
              <button onClick={() => signOut({ callbackUrl: "/" })} className="transition hover:text-white">
                Chiqish
              </button>
            </div>
          ) : (
            <Link href="/login" className="transition hover:text-white">
              Kirish
            </Link>
          )}
          <Link
            href="/register"
            className="rounded-full border border-[#3d4a63] bg-[#3d4a63] px-5 py-2 normal-case tracking-normal text-white transition hover:bg-[#5b6f94]"
          >
            Bepul konsultatsiya
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menyu"
          className="ml-auto flex h-9 w-9 items-center justify-center text-white md:hidden"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            {menuOpen ? (
              <path d="M1 1L21 15M21 1L1 15" stroke="currentColor" strokeWidth={1.5} />
            ) : (
              <>
                <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth={1.5} />
                <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth={1.5} />
                <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth={1.5} />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0a0b0d] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5 text-sm font-medium uppercase tracking-widest text-white/80">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-white">
                {link.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="hover:text-white">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-left hover:text-white"
                >
                  Chiqish
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-white">
                Kirish
              </Link>
            )}
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="w-fit rounded-full border border-[#3d4a63] bg-[#3d4a63] px-5 py-2 normal-case tracking-normal text-white transition hover:bg-[#5b6f94]"
            >
              Bepul konsultatsiya
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
