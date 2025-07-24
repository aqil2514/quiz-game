import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export interface DataSummaryItem {
  label: string;
  value: string | number;
}

interface DeleteDialogProps {
  title?: string;
  description?: string;
  dataSummary?: DataSummaryItem[];
  onConfirm?: () => Promise<void> | void;
  triggerIcon?: ReactNode;
}

export default function DeleteDialog({
  title = "Yakin hapus data ini?",
  description = "Aksi ini mungkin tidak bisa dibatalkan dan mungkin bersifat permanen.",
  dataSummary = [],
  onConfirm,
  triggerIcon = <Trash className="w-4 h-4" />,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
      setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="hover:opacity-85 hover:scale-95 cursor-pointer w-full"
        >
          {triggerIcon}
          Hapus Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {dataSummary.length > 0 && (
          <div className="border rounded-md p-3 bg-muted text-sm space-y-2">
            {dataSummary.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleConfirm}
            className="cursor-pointer hover:scale-95 duration-200"
          >
            {loading ? "Mengapus..." : "Konfirmasi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
