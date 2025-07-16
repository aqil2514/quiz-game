import { QuizQuestion } from "@/@types/quiz";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { shuffle } from "@/lib/utils";

// Nanti Rawnya dari server
const raw: QuizQuestion[] = [
  {
    id: "1",
    category: "general",
    question: "Apa ibukota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    answer: "Jakarta",
  },
  {
    id: "2",
    category: "general",
    question: "Siapa presiden pertama Indonesia?",
    options: ["Soekarno", "Soeharto", "BJ Habibie", "Gus Dur"],
    answer: "Soekarno",
  },
  {
    id: "3",
    category: "general",
    question: "Gunung tertinggi di Indonesia adalah?",
    options: ["Semeru", "Rinjani", "Puncak Jaya", "Kerinci"],
    answer: "Puncak Jaya",
  },
  {
    id: "4",
    category: "general",
    question: "Lambang sila pertama Pancasila adalah?",
    options: ["Bintang", "Rantai", "Pohon Beringin", "Banteng"],
    answer: "Bintang",
  },
  {
    id: "5",
    category: "general",
    question: "Sungai terpanjang di Indonesia adalah?",
    options: ["Kapuas", "Mahakam", "Bengawan Solo", "Musik"],
    answer: "Kapuas",
  },
  {
    id: "6",
    category: "general",
    question: "Siapa penemu bola lampu?",
    options: [
      "Isaac Newton",
      "Thomas Edison",
      "Nikola Tesla",
      "Albert Einstein",
    ],
    answer: "Thomas Edison",
  },
  {
    id: "7",
    category: "general",
    question: "Planet terbesar di tata surya adalah?",
    options: ["Saturnus", "Mars", "Jupiter", "Neptunus"],
    answer: "Jupiter",
  },
  {
    id: "8",
    category: "general",
    question: "Apa ibukota Jepang?",
    options: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
    answer: "Tokyo",
  },
  {
    id: "9",
    category: "general",
    question: "Bahasa resmi Brasil adalah?",
    options: ["Spanyol", "Portugis", "Prancis", "Italia"],
    answer: "Portugis",
  },
  {
    id: "10",
    category: "general",
    question: "Hari Kemerdekaan Indonesia diperingati setiap tanggal?",
    options: ["1 Juni", "17 Agustus", "10 November", "21 April"],
    answer: "17 Agustus",
  },
];

const shuffleQuestions = (raw: QuizQuestion[]) => {
  const questions = shuffle(raw).map((r) => {
    return {
      ...r,
      options: shuffle(r.options),
    };
  });

  return questions;
};

export default function QuizPage() {
  const questions = shuffleQuestions(raw);

  return <QuizTemplate questions={questions} />;
}
