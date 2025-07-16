import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ConfigState {
  sound: boolean;
  setSound: (enabled: boolean) => void;
  timer: number;
  setTimer: (time: number) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      sound: true,
      timer: 15,
      setSound: (enabled) => set({ sound: enabled }),
      setTimer: (time) => set({ timer: time }),
    }),
    {
      name: "quiz-config",
    }
  )
);
