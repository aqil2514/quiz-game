import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScoreData } from "../provider";
import { useEffect, useState } from "react";

export default function ScoreOptions() {
  return (
    <div className="w-full bg-white flex gap-4 rounded-2xl p-2 md:p-4">
      <SourceOptions />
    </div>
  );
}

const SourceOptions = () => {
  const { setFilteredScore, dbScore, localScore } = useScoreData();
  const [source, setSource] = useState<string>("local");

  useEffect(() => {
    if (source === "local") {
      setFilteredScore(localScore);
    } else if (source === "db") {
      setFilteredScore(dbScore);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  return (
    <div className="flex gap-2">
      <Button
        variant={source === "local" ? "default" : "outline"}
        onClick={() => setSource("local")}
        className={cn(
          "",
          source === "local" && "cursor-default bg-sky-500 hover:bg-sky-500"
        )}
      >
        Lokal
      </Button>
      <Button
        variant={source === "db" ? "default" : "outline"}
        className={cn(
          "",
          source === "db" && "cursor-default bg-sky-500 hover:bg-sky-500"
        )}
        onClick={() => setSource("db")}
      >
        Akun
      </Button>
    </div>
  );
};
