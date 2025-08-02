"use client";
import { useConfigStore } from "@/store/config-store";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ConfigContextState {
  isSounded: boolean;
  setIsSounded: Dispatch<SetStateAction<boolean>>;
  isUseQuestionTime: boolean;
  setIsUseQuesTionTime: Dispatch<SetStateAction<boolean>>;
  timerConfig: number;
  setTimerConfig: Dispatch<SetStateAction<number>>;
  totalQuiz: number;
  setTotalQuiz: Dispatch<SetStateAction<number>>;
  saveConfig: () => void;
  enableTime: boolean;
  setEnableTime: Dispatch<SetStateAction<boolean>>;
}

const ConfigContext = createContext<ConfigContextState>(
  {} as ConfigContextState
);

interface ConfigProviderProps {
  children: React.ReactNode;
}

export default function ConfigProvider({ children }: ConfigProviderProps) {
  // Initial Config
  const {
    timer,
    sound,
    useQuestionTime,
    setSound,
    setTimer,
    setUseQuestionTime,
    setTotalQuestion,
    totalQuestion,
    useTime,
    setUseTime,
  } = useConfigStore();

  //   Config Options
  const [isSounded, setIsSounded] = useState<boolean>(sound);
  const [isUseQuestionTime, setIsUseQuesTionTime] =
    useState<boolean>(useQuestionTime);
  const [timerConfig, setTimerConfig] = useState<number>(timer);
  const [totalQuiz, setTotalQuiz] = useState<number>(totalQuestion);
  const [enableTime, setEnableTime] = useState<boolean>(useTime);

  //   Config Action
  const saveConfig = () => {
    setSound(isSounded);
    setTimer(timerConfig);
    setUseQuestionTime(isUseQuestionTime);
    setTotalQuestion(totalQuiz);
    setUseTime(enableTime);
  };

  const value: ConfigContextState = {
    isSounded,
    isUseQuestionTime,
    setIsSounded,
    setIsUseQuesTionTime,
    setTimerConfig,
    timerConfig,
    saveConfig,
    setTotalQuiz,
    totalQuiz,
    enableTime,
    setEnableTime,
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export const useConfigData = () => useContext(ConfigContext);
