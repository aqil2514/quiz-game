import { ColumnDef } from "@tanstack/react-table";
import { QuizQuestion } from "@/@types/quiz";
import DropdownAdmin, {
  DropdownAdminContext,
} from "@/components/molecules/dropdown";
import { deleteQuestion } from "../utils/deleteQuestions";

export const quizColumns: ColumnDef<QuizQuestion>[] = [
  {
    accessorKey: "actions",
    header: "#",
    cell: ({ row }) => {
      const context: DropdownAdminContext = {
        label: `Soal Nomor ${row.index + 1}`,
        editLink: `/admin/manage-questions/edit/${row.original.id}`,
        dataSummary: [
          {
            label: "Soal",
            value: row.original.question,
          },
        ],
        async onConfirm() {
          return deleteQuestion(row.original.id as string)
        },
      };

      return <DropdownAdmin context={context} />;
    },
  },
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
    size: 50,
  },
  {
    accessorKey: "question",
    header: "Pertanyaan",
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-sm">{row.original.question}</div>
    ),
  },
  {
    accessorKey: "options",
    header: "Opsi",
    cell: ({ row }) => (
      <ul className="text-sm space-y-1">
        {row.original.options.map((opt, i) => (
          <li key={i}>
            <span className="font-semibold">
              {String.fromCharCode(65 + i)}.
            </span>{" "}
            {opt}
          </li>
        ))}
      </ul>
    ),
  },
  {
    accessorKey: "answer",
    header: "Jawaban Benar",
    cell: ({ row }) => {
      const index = row.original.options.indexOf(row.original.answer);
      const label = index >= 0 ? String.fromCharCode(65 + index) : "-";
      return <span className="font-bold text-green-600">{label}</span>;
    },
  },
  {
    accessorKey: "timeLimitSeconds",
    header: "Batas Waktu",
    cell: ({ row }) => <>{row.original.timeLimitSeconds}s</>,
  },
];
