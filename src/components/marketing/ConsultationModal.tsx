"use client";

import { useState } from "react";
import { useConsultationModalStore } from "@/lib/consultation-modal-store";

const INTERESTS = ["Trading", "Sun'iy intellekt", "Ikkalasi ham"];

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationModal() {
  const { isOpen, close } = useConsultationModalStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  function reset() {
    setName("");
    setPhone("");
    setInterest(INTERESTS[0]);
    setStatus("idle");
    setError(null);
  }

  function handleClose() {
    close();
    setTimeout(reset, 200);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, interest }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Xatolik yuz berdi. Qayta urinib ko'ring.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setError("Tarmoq xatoligi. Qayta urinib ko'ring.");
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111318] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" ? (
          <div className="py-6 text-center">
            <p className="font-display text-lg font-bold text-white">
              Arizangiz qabul qilindi!
            </p>
            <p className="mt-2 text-sm text-white/60">
              Tez orada mutaxassislarimiz siz bilan bog&apos;lanadi.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-full bg-[#3d4a63] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#5b6f94]"
            >
              Yopish
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Bepul konsultatsiya
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Ma&apos;lumotlaringizni qoldiring, mutaxassislarimiz siz bilan bog&apos;lanadi.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white/70">Ism</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#5b6f94] focus:outline-none"
                placeholder="Ismingiz"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white/70">
                Telefon raqam
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#5b6f94] focus:outline-none"
                placeholder="+998 90 123 45 67"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white/70">
                Yo&apos;nalish
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-[#5b6f94] focus:outline-none"
              >
                {INTERESTS.map((i) => (
                  <option key={i} value={i} className="bg-[#111318]">
                    {i}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex-1 rounded-full bg-[#3d4a63] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5b6f94] disabled:opacity-50"
              >
                {status === "submitting" ? "Yuborilmoqda..." : "Yuborish"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
