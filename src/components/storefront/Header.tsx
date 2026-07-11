"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { useConsultationModalStore } from "@/lib/consultation-modal-store";

const NAV_LINKS = [
  { href: "/#kurslar", label: "Kurslar" },
  { href: "/#ustozlar", label: "Ustozlar" },
  { href: "/#biz-haqimizda", label: "Biz haqimizda" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openConsultation = useConsultationModalStore((s) => s.open);

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
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo variant="light" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/80 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 transition hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <button
          onClick={openConsultation}
          className="ml-auto hidden shrink-0 rounded-full border border-[#3d4a63] bg-[#3d4a63] px-5 py-2 text-xs font-medium text-white transition-all duration-300 hover:bg-[#5b6f94] hover:shadow-[0_8px_24px_-6px_rgba(91,111,148,0.6)] md:block"
        >
          Bepul konsultatsiya
        </button>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0a0b0d] md:hidden"
          >
            <nav className="flex flex-col gap-5 px-6 py-6 text-sm font-semibold uppercase tracking-widest text-white/80">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openConsultation();
                }}
                className="w-fit rounded-full border border-[#3d4a63] bg-[#3d4a63] px-5 py-2 normal-case tracking-normal text-white transition hover:bg-[#5b6f94]"
              >
                Bepul konsultatsiya
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
