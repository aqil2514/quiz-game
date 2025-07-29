"use client";
import { QuizScore } from "@/@types/quiz";
import { getPublicScore } from "@/lib/local-storage/score";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ScoreContextState {
  dbScore: QuizScore[];
  localScore: QuizScore[];
  filteredScore: QuizScore[];
  setFilteredScore: Dispatch<SetStateAction<QuizScore[]>>;
}

const ScoreContext = createContext<ScoreContextState>({} as ScoreContextState);

interface ScoreProviderProps {
  children: ReactNode;
  dbScore: QuizScore[];
}

export default function ScoreProvider({
  children,
  dbScore,
}: ScoreProviderProps) {
  const localScore = getPublicScore();
  const [filteredScore, setFilteredScore] = useState<QuizScore[]>(
    dbScore ?? localScore
  );

  const value: ScoreContextState = {
    localScore,
    dbScore,
    filteredScore,
    setFilteredScore,
  };
  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

export const useScoreData = () => useContext(ScoreContext);
