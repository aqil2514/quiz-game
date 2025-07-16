import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useConfigStore } from "@/store/config-store";
import { TimerIcon } from "lucide-react";

export default function ConfigTimer() {
  const { timer, setTimer } = useConfigStore();
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <TimerIcon className="text-orange-300 w-6 h-6" />
        <Label htmlFor="timer" className="text-white text-lg">
          Batas Waktu Soal ({timer} Detik)
        </Label>
      </div>
      <Slider
        id="timer"
        value={[timer]}
        min={5}
        max={60}
        step={5}
        onValueChange={([value]) => setTimer(value)}
      />
    </div>
  );
}
