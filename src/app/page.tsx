"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";
import { DottedSurface } from "@/components/marketing/DottedSurface";
import { ConsultationButton } from "@/components/marketing/ConsultationButton";
import { Reveal } from "@/components/marketing/Reveal";
import { GrainOverlay } from "@/components/marketing/GrainOverlay";
import { TradingIllustration } from "@/components/marketing/illustrations/TradingIllustration";
import { AIIllustration } from "@/components/marketing/illustrations/AIIllustration";

type Topic = "trading" | "ai";

const COURSES = [
  {
    name: "Trading Asoslari",
    tag: "BOSHLANG'ICH DARAJA",
    description: "Valyuta va kripto bozorlarida savdoning fundamental asoslari.",
    topic: "trading" as Topic,
  },
  {
    name: "Professional Trader",
    tag: "CHUQURLASHTIRILGAN",
    description: "Strategiya, risk-menejment va portfel boshqaruvi.",
    topic: "trading" as Topic,
  },
  {
    name: "Sun'iy Intellekt Asoslari",
    tag: "BOSHLANG'ICH DARAJA",
    description: "Sun'iy intellekt siz uchun nimalarni qila olishi — imkoniyatlari va amaliy qo'llanilishi.",
    topic: "ai" as Topic,
  },
  {
    name: "Sun'iy Intellekt va Trading Botlari",
    tag: "AMALIY KURS",
    description: "Sun'iy intellekt yordamida kuchli dastur va botlar yaratib, tradingda foyda qiling.",
    topic: "ai" as Topic,
  },
] as const;

const TEACHER = {
  name: "Shukurulloh",
  role: "Asoschi va bosh instruktor",
  bio: "Sun'iy intellekt yordamida ish jarayonlarini avtomatlashtirib, qulay va samarali ishlashni yo'lga qo'ygan mutaxassis — trading uchun yordamchi botlar yaratadi va ulardan muvaffaqiyatli foydalanadi. Sun'iy intellekt sohasida 2 yillik, trading sohasida 4.5 yillik amaliy tajribaga ega. Umumiy qiymati 200 000 dollarga yaqin prop-treyding hisoblarida 7-10% foyda qayd etgan.",
  photo: "/team/shukurulloh.jpg",
} as const;

function TopicIllustration({ topic, className }: { topic: Topic; className?: string }) {
  return topic === "trading" ? (
    <TradingIllustration className={className} />
  ) : (
    <AIIllustration className={className} />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0b0d]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14171c] via-[#0a0b0d] to-[#0a0b0d]" />
        <DottedSurface className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(61,74,99,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-[#0a0b0d]/70" />
        <GrainOverlay className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay" />

        <motion.div
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <LogoMark variant="light" className="mb-8 h-14 w-14" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b9ab5]"
          >
            X Academy
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-display text-4xl font-bold uppercase leading-[1.1] tracking-wide text-white sm:text-6xl"
          >
            Trading va sun&apos;iy intellekt bo&apos;yicha professional ta&apos;lim
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 max-w-xl text-balance text-sm text-white/60 sm:text-base"
          >
            Nazariyadan amaliyotgacha — tajribali ustozlar bilan onlayn guruh darslarida
            zamonaviy trading va sun&apos;iy intellekt ko&apos;nikmalarini egallang.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link
              href="/#kurslar"
              className="mt-10 inline-block rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#0a0b0d] hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.35)]"
            >
              Kurslarni ko&apos;rish
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 1.1 },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
          }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </section>

      {/* Course catalog */}
      <section id="kurslar" className="relative scroll-mt-20 overflow-hidden bg-[#0d0f12] px-6 py-24">
        <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#8b5cf6]/10 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#34d399]/10 blur-[110px]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Kurslarimiz haqida
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {COURSES.map((course, i) => (
              <Reveal key={course.name} delay={(i % 2) * 0.2}>
                <a
                  href="#jamoa"
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5b6f94]/50 hover:shadow-[0_24px_60px_-20px_rgba(61,74,99,0.55)]"
                >
                  <TopicIllustration
                    topic={course.topic}
                    className="absolute inset-0 h-full w-full scale-110 opacity-80 transition duration-500 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/55 to-transparent" />
                  <div className="relative z-10">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#8b9ab5]">
                      {course.tag}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-white">{course.name}</h3>
                    <p className="mt-2 max-w-sm text-sm text-white/60">{course.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/80 transition group-hover:gap-2 group-hover:text-white">
                      Batafsil <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section id="jamoa" className="relative scroll-mt-20 overflow-hidden bg-[#0a0b0d] px-6 py-32">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3d4a63]/20 blur-[130px]"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b9ab5]">
              X Academy
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.15] tracking-wide text-white sm:text-5xl">
              Ishonch ustiga qurilgan jamoa
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <ConsultationButton className="mt-10 rounded-full bg-[#3d4a63] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#5b6f94] hover:shadow-[0_16px_40px_-10px_rgba(91,111,148,0.7)]">
              Hoziroq jamoaga qo&apos;shilish
            </ConsultationButton>
          </Reveal>
        </div>
      </section>

      {/* Teachers */}
      <section id="ustozlar" className="relative scroll-mt-20 overflow-hidden bg-[#0d0f12] px-6 py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#3d4a63]/10 blur-[110px]" />
        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-display mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Ustozlarimiz
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group flex flex-col items-center gap-10 rounded-3xl border border-white/10 bg-[#111318] p-8 text-center transition-all duration-300 hover:border-[#5b6f94]/50 hover:shadow-[0_30px_80px_-30px_rgba(61,74,99,0.55)] sm:flex-row sm:p-12 sm:text-left">
              <div className="aspect-[736/981] w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#3d4a63] to-[#20293a] transition-transform duration-300 group-hover:scale-105 sm:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TEACHER.photo}
                  alt={TEACHER.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{TEACHER.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#8b9ab5]">
                  {TEACHER.role}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{TEACHER.bio}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
