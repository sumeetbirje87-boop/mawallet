import { create } from "zustand";

interface UIState {
  isTransactionModalOpen: boolean;
  setTransactionModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTransactionModalOpen: false,
  setTransactionModalOpen: (open) => set({ isTransactionModalOpen: open }),
}));
