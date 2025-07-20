import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { QuizQuestion } from "@/@types/quiz";

export const quizColumns: ColumnDef<QuizQuestion>[] = [
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
            <span className="font-semibold">{String.fromCharCode(65 + i)}.</span> {opt}
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
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // navigasi edit
              window.location.href = `/admin/manage-questions/${id}`;
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              // konfirmasi & delete
              if (confirm("Yakin ingin menghapus soal ini?")) {
                // panggil fungsi hapus
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
    size: 100,
  },
];
