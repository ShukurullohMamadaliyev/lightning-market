"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/brand/Logo";
import { NetworkPattern } from "@/components/marketing/patterns";
import { DottedSurface } from "@/components/marketing/DottedSurface";
import { ConsultationButton } from "@/components/marketing/ConsultationButton";
import { Reveal } from "@/components/marketing/Reveal";
import { TradingIllustration } from "@/components/marketing/illustrations/TradingIllustration";
import { AIIllustration } from "@/components/marketing/illustrations/AIIllustration";

type Topic = "trading" | "ai";

const INTRO_CARDS = [
  {
    title: "Trading yo'nalishi",
    description: "Forex, kripto va fond bozorlarida amaliy savdo strategiyalari.",
    href: "/#kurslar",
    topic: "trading" as Topic,
  },
  {
    title: "Sun'iy intellekt yo'nalishi",
    description: "Machine Learning, ChatGPT va zamonaviy AI vositalari.",
    href: "/#kurslar",
    topic: "ai" as Topic,
  },
  {
    title: "Ustozlarimiz",
    description: "Soha mutaxassislaridan bevosita tajriba va bilim.",
    href: "/#ustozlar",
    topic: "trading" as Topic,
  },
] as const;

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
    description: "Machine Learning va Data Science ga kirish.",
    topic: "ai" as Topic,
  },
  {
    name: "ChatGPT va Prompt Engineering",
    tag: "AMALIY KURS",
    description: "AI vositalaridan ish va biznesda professional foydalanish.",
    topic: "ai" as Topic,
  },
] as const;

const TEACHERS = [
  {
    seed: "Sardor Aliyev",
    name: "Sardor Aliyev",
    role: "Trading bo'yicha bosh instruktor",
    bio: "8 yillik amaliy savdo va portfel boshqaruvi tajribasi.",
  },
  {
    seed: "Malika Yusupova",
    name: "Malika Yusupova",
    role: "Sun'iy intellekt va Data Science ustozi",
    bio: "Xalqaro IT kompaniyalarida ML muhandisi sifatida ishlagan.",
  },
  {
    seed: "Javlon Karimov",
    name: "Javlon Karimov",
    role: "Kripto va forex bozorlari mutaxassisi",
    bio: "Institutsional treyding va risk-menejment bo'yicha ekspert.",
  },
  {
    seed: "Nodira Rashidova",
    name: "Nodira Rashidova",
    role: "Machine Learning muhandisi",
    bio: "AI kurslari dasturini ishlab chiquvchi va asosiy ustoz.",
  },
] as const;

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
              className="mt-10 inline-block rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:border-white hover:bg-white hover:text-[#0a0b0d]"
            >
              Kurslarni ko&apos;rish
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </section>

      {/* Intro / about */}
      <section id="biz-haqimizda" className="scroll-mt-20 bg-[#0a0b0d] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              X Academy haqida
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {INTRO_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.15}>
                <Link
                  href={card.href}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-6"
                >
                  <TopicIllustration
                    topic={card.topic}
                    className="absolute inset-0 h-full w-full scale-110 opacity-70 transition duration-500 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/50 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{card.description}</p>
                    <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-[#8b9ab5] transition group-hover:text-white">
                      Batafsil →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Course catalog */}
      <section id="kurslar" className="scroll-mt-20 bg-[#0d0f12] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Kurslarimiz
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {COURSES.map((course, i) => (
              <Reveal key={course.name} delay={(i % 2) * 0.2}>
                <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-8">
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
                    <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-widest text-white/80 transition group-hover:text-white">
                      Batafsil →
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-[#0a0b0d] px-6 py-24">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#111318]">
          <div className="grid sm:grid-cols-2">
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#14171c]">
              <NetworkPattern className="absolute inset-0 h-full w-full text-[#3d4a63]/40" />
            </div>
            <div className="flex flex-col justify-center p-10">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
                Guruhda onlayn darslar
              </h3>
              <p className="mt-4 text-sm text-white/60">
                Kichik guruhlarda, jonli efirda ustozlar bilan bevosita muloqotda o&apos;qing —
                savollaringizga darhol javob oling va amaliy tajriba orttiring.
              </p>
              <ConsultationButton className="mt-8 w-fit rounded-full bg-[#3d4a63] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#5b6f94]">
                Ro&apos;yxatdan o&apos;tish
              </ConsultationButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Teachers */}
      <section id="ustozlar" className="scroll-mt-20 bg-[#0d0f12] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Ustozlarimiz
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEACHERS.map((teacher, i) => (
              <Reveal key={teacher.name} delay={i * 0.12}>
                <div className="rounded-2xl border border-white/10 bg-[#111318] p-6 text-center">
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-[#3d4a63] to-[#20293a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(teacher.seed)}&backgroundColor=3d4a63,20293a`}
                      alt={teacher.name}
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="font-display mt-4 text-base font-bold text-white">{teacher.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#8b9ab5]">
                    {teacher.role}
                  </p>
                  <p className="mt-3 text-sm text-white/60">{teacher.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
