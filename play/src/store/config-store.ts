import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ConfigState {
  sound: boolean;
  setSound: (enabled: boolean) => void;

  timer: number;
  setTimer: (time: number) => void;

  useQuestionTime: boolean;
  setUseQuestionTime: (value: boolean) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      sound: true,
      timer: 15,
      useQuestionTime: true,
      setSound: (enabled) => set({ sound: enabled }),
      setTimer: (time) => set({ timer: time }),
      setUseQuestionTime: (value) => set({ useQuestionTime: value }),
    }),
    {
      name: "quiz-config",
    }
  )
);
