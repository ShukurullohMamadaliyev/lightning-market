import { create } from "zustand";

type ConsultationModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useConsultationModalStore = create<ConsultationModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
