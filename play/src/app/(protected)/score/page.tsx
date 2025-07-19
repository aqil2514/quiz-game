import { QuizScore } from "@/@types/quiz";
import { auth } from "@/auth";
import ScoreTemplate from "@/components/templates/ScoreTemplate";
import { endpointServer } from "@/lib/variables/endpoint";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Score",
};

const getUserScore = async () => {
  const session = await auth();
  let score: QuizScore[] = [];

  try {
    const { data } = await axios.get(
      `${endpointServer}/quiz/score?userId=${session?.user.userId}`
    );
    score = data.score;
  } catch (error) {
    console.error(error);
  }

  return score;
};

export default async function ScorePage() {
  const score = await getUserScore();

  return <ScoreTemplate score={score} />;
}
