import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ConfigState {
  sound: boolean;
  setSound: (enabled: boolean) => void;

  timer: number;
  setTimer: (time: number) => void;

  useQuestionTime: boolean;
  setUseQuestionTime: (value: boolean) => void;

  useTime: boolean;
  setUseTime: (value: boolean) => void;

  totalQuestion: number;
  setTotalQuestion: (total: number) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      sound: true,
      timer: 15,
      useQuestionTime: true,
      totalQuestion: 10,
      useTime: true,
      setSound: (enabled) => set({ sound: enabled }),
      setTimer: (time) => set({ timer: time }),
      setUseQuestionTime: (value) => set({ useQuestionTime: value }),
      setTotalQuestion: (question) => set({ totalQuestion: question }),
      setUseTime: (value) => set({ useTime: value }),
    }),
    {
      name: "quiz-config",
    }
  )
);
