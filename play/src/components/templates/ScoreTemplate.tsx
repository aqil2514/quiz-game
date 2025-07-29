"use client";
import { QuizScore } from "@/@types/quiz";
import MainContainer from "../layouts/Container/MainContainer";
import ScoreProfileSection from "../features/(game)/score/components/ProfileSection";
import NoScoreComponent from "../features/(game)/score/components/NoScoreComponent";
import ScoreProvider, { useScoreData } from "../features/(game)/score/provider";
import ScoreComponent from "../features/(game)/score/components/ScoreComponent";
import ScoreOptions from "../features/(game)/score/components/ScoreOptions";

export default function ScoreTemplate({ score }: { score: QuizScore[] }) {
  return (
    <ScoreProvider dbScore={score}>
      <MainContainer className="space-y-2">
        <ScoreProfileSection />

        <h2 className="text-2xl font-bold mb-4 mt-6">📊 Riwayat Skor Kamu</h2>
        <ScoreOptions />

        <FinalScoreComponent />
      </MainContainer>
    </ScoreProvider>
  );
}

const FinalScoreComponent = () => {
  const { filteredScore } = useScoreData();

  if (filteredScore.length === 0) return <NoScoreComponent />;

  return <ScoreComponent />;
};
