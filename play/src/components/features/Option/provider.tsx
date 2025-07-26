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
  saveConfig: () => void;
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
  } = useConfigStore();

  //   Config Options
  const [isSounded, setIsSounded] = useState<boolean>(sound);
  const [isUseQuestionTime, setIsUseQuesTionTime] =
    useState<boolean>(useQuestionTime);
  const [timerConfig, setTimerConfig] = useState<number>(timer);

  //   Config Action
  const saveConfig = () => {
    setSound(isSounded);
    setTimer(timerConfig);
    setUseQuestionTime(isUseQuestionTime);
  };

  const value: ConfigContextState = {
    isSounded,
    isUseQuestionTime,
    setIsSounded,
    setIsUseQuesTionTime,
    setTimerConfig,
    timerConfig,
    saveConfig,
  };
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export const useConfigData = () => useContext(ConfigContext);
