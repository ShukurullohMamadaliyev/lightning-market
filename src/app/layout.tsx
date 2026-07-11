import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/storefront/Header";
import { Footer } from "@/components/storefront/Footer";

export const metadata: Metadata = {
  title: "X Academy — Trading va Sun'iy Intellekt bo'yicha professional ta'lim",
  description:
    "X Academy — Trading va sun'iy intellekt bo'yicha onlayn kurslar, tajribali ustozlar va jonli guruh darslari.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-[#0a0b0d] text-white">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
