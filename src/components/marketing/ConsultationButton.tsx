"use client";

import { useConsultationModalStore } from "@/lib/consultation-modal-store";

export function ConsultationButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const open = useConsultationModalStore((s) => s.open);
  return (
    <button onClick={open} className={className}>
      {children}
    </button>
  );
}
