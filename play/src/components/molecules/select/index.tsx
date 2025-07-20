import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export interface FilterOptions {
  label: string;
  value: string;
}

export interface SelectFilterContext<TData> {
  selectLabel: string;
  filterSelect: FilterOptions[];
  retrieveHandler: (value: string) => TData | Promise<TData>;
  setData: Dispatch<SetStateAction<TData>>;
}

interface SelectFilterProps<TData> {
  context: SelectFilterContext<TData>;
}

export function SelectFilter<TData>({ context }: SelectFilterProps<TData>) {
  const { filterSelect, selectLabel, retrieveHandler, setData } = context;
  const [value, setValue] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const data = await retrieveHandler(value);
      setData(data);
      toast.success("Data berhasil diambil");
    } catch (error) {
      toast.error("Terjadi Kesalahan");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Select onValueChange={setValue} value={value} disabled={loading}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Pilih ${selectLabel}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            <SelectItem value="all">Semua</SelectItem>
            {filterSelect
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((value) => (
                <SelectItem value={value.value} key={value.value}>
                  {value.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Memuat..." : "Ambil Data"}
      </Button>
    </div>
  );
}
