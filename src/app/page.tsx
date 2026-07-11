import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { CandlestickPattern, NetworkPattern } from "@/components/marketing/patterns";

const INTRO_CARDS = [
  {
    title: "Trading yo'nalishi",
    description: "Forex, kripto va fond bozorlarida amaliy savdo strategiyalari.",
    href: "/#kurslar",
    pattern: "chart",
  },
  {
    title: "Sun'iy intellekt yo'nalishi",
    description: "Machine Learning, ChatGPT va zamonaviy AI vositalari.",
    href: "/#kurslar",
    pattern: "network",
  },
  {
    title: "Ustozlarimiz",
    description: "Soha mutaxassislaridan bevosita tajriba va bilim.",
    href: "/#ustozlar",
    pattern: "chart",
  },
] as const;

const COURSES = [
  {
    name: "Trading Asoslari",
    tag: "BOSHLANG'ICH DARAJA",
    description: "Valyuta va kripto bozorlarida savdoning fundamental asoslari.",
    pattern: "chart",
  },
  {
    name: "Professional Trader",
    tag: "CHUQURLASHTIRILGAN",
    description: "Strategiya, risk-menejment va portfel boshqaruvi.",
    pattern: "chart",
  },
  {
    name: "Sun'iy Intellekt Asoslari",
    tag: "BOSHLANG'ICH DARAJA",
    description: "Machine Learning va Data Science ga kirish.",
    pattern: "network",
  },
  {
    name: "ChatGPT va Prompt Engineering",
    tag: "AMALIY KURS",
    description: "AI vositalaridan ish va biznesda professional foydalanish.",
    pattern: "network",
  },
] as const;

const TEACHERS = [
  {
    initials: "SA",
    name: "Sardor Aliyev",
    role: "Trading bo'yicha bosh instruktor",
    bio: "8 yillik amaliy savdo va portfel boshqaruvi tajribasi.",
  },
  {
    initials: "MY",
    name: "Malika Yusupova",
    role: "Sun'iy intellekt va Data Science ustozi",
    bio: "Xalqaro IT kompaniyalarida ML muhandisi sifatida ishlagan.",
  },
  {
    initials: "JK",
    name: "Javlon Karimov",
    role: "Kripto va forex bozorlari mutaxassisi",
    bio: "Institutsional treyding va risk-menejment bo'yicha ekspert.",
  },
  {
    initials: "NR",
    name: "Nodira Rashidova",
    role: "Machine Learning muhandisi",
    bio: "AI kurslari dasturini ishlab chiquvchi va asosiy ustoz.",
  },
] as const;

function PatternBg({ pattern, className }: { pattern: "chart" | "network"; className?: string }) {
  return pattern === "chart" ? (
    <CandlestickPattern className={className} />
  ) : (
    <NetworkPattern className={className} />
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0b0d]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14171c] via-[#0a0b0d] to-[#0a0b0d]" />
        <PatternBg pattern="chart" className="absolute inset-0 h-full w-full text-[#3d4a63]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-[#0a0b0d]/60" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <LogoMark variant="light" className="mb-8 h-14 w-14" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b9ab5]">
            X Academy
          </p>
          <h1 className="text-3xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-5xl">
            Trading va sun&apos;iy intellekt bo&apos;yicha professional ta&apos;lim
          </h1>
          <p className="mt-6 max-w-xl text-balance text-sm text-white/60 sm:text-base">
            Nazariyadan amaliyotgacha — tajribali ustozlar bilan onlayn guruh darslarida
            zamonaviy trading va sun&apos;iy intellekt ko&apos;nikmalarini egallang.
          </p>
          <Link
            href="/#kurslar"
            className="mt-10 rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-[#0a0b0d]"
          >
            Kurslarni ko&apos;rish
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40">
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Intro / about */}
      <section id="biz-haqimizda" className="scroll-mt-20 bg-[#0a0b0d] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            X Academy haqida
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {INTRO_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-6"
              >
                <PatternBg
                  pattern={card.pattern}
                  className="absolute inset-0 h-full w-full text-[#3d4a63]/40 transition group-hover:text-[#3d4a63]/60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/40 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{card.description}</p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-[#8b9ab5] transition group-hover:text-white">
                    Batafsil →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Course catalog */}
      <section id="kurslar" className="scroll-mt-20 bg-[#0d0f12] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Kurslarimiz
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {COURSES.map((course) => (
              <div
                key={course.name}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-8"
              >
                <PatternBg
                  pattern={course.pattern}
                  className="absolute inset-0 h-full w-full text-[#3d4a63]/40 transition group-hover:text-[#3d4a63]/60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent" />
                <div className="relative z-10">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#8b9ab5]">
                    {course.tag}
                  </p>
                  <h3 className="text-2xl font-semibold text-white">{course.name}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/60">{course.description}</p>
                  <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-widest text-white/80 transition group-hover:text-white">
                    Batafsil →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#0a0b0d] px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#111318]">
          <div className="grid sm:grid-cols-2">
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#14171c]">
              <NetworkPattern className="absolute inset-0 h-full w-full text-[#3d4a63]/40" />
            </div>
            <div className="flex flex-col justify-center p-10">
              <h3 className="text-xl font-semibold uppercase tracking-wide text-white sm:text-2xl">
                Guruhda onlayn darslar
              </h3>
              <p className="mt-4 text-sm text-white/60">
                Kichik guruhlarda, jonli efirda ustozlar bilan bevosita muloqotda o&apos;qing —
                savollaringizga darhol javob oling va amaliy tajriba orttiring.
              </p>
              <Link
                href="/register"
                className="mt-8 w-fit rounded-full bg-[#3d4a63] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#5b6f94]"
              >
                Ro&apos;yxatdan o&apos;tish
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="ustozlar" className="scroll-mt-20 bg-[#0d0f12] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            Ustozlarimiz
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEACHERS.map((teacher) => (
              <div
                key={teacher.name}
                className="rounded-2xl border border-white/10 bg-[#111318] p-6 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#3d4a63] to-[#20293a] text-lg font-semibold text-white">
                  {teacher.initials}
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{teacher.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#8b9ab5]">
                  {teacher.role}
                </p>
                <p className="mt-3 text-sm text-white/60">{teacher.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
