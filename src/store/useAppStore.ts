import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  currency: string;
  setCurrency: (currency: string) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      setTimezone: (timezone) => set({ timezone }),
    }),
    {
      name: "mawallet-app-storage",
    }
  )
);
