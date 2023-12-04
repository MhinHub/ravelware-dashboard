import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  realtimeMessages: any[];
  carUsageMessages: any[];
  fuelUsageMessages: any[];
  setRealtimeMessages: (message: any[]) => void;
  setCarUsageMessages: (message: any[]) => void;
  setFuelUsageMessages: (message: any[]) => void;
}

export const useStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        realtimeMessages: [],
        carUsageMessages: [],
        fuelUsageMessages: [],
        setRealtimeMessages: (message: any[]) =>
          set(() => ({
            realtimeMessages: message,
          })),
        setCarUsageMessages: (message: any[]) =>
          set(() => ({
            carUsageMessages: message,
          })),
        setFuelUsageMessages: (message: any[]) =>
          set(() => ({
            fuelUsageMessages: message,
          })),
      }),
      { name: "zustand-store" }
    )
  )
);
