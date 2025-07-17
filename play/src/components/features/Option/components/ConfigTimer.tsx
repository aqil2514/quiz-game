import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useConfigStore } from "@/store/config-store";
import { TimerIcon } from "lucide-react";

export default function ConfigTimer() {
  const { timer, setTimer, useQuestionTime, setUseQuestionTime } = useConfigStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <TimerIcon className="text-orange-300 w-6 h-6" />
        <Label className="text-white text-lg">Pengaturan Waktu</Label>
      </div>

      <div className="flex items-center justify-between">
        <Label className="text-gray-200">Gunakan waktu dari soal</Label>
        <Switch checked={useQuestionTime} onCheckedChange={setUseQuestionTime} />
      </div>

      {!useQuestionTime && (
        <div className="space-y-2">
          <Label className="text-white">Batas Waktu Soal ({timer} Detik)</Label>
          <Slider
            value={[timer]}
            min={5}
            max={60}
            step={5}
            onValueChange={([val]) => setTimer(val)}
          />
        </div>
      )}
    </div>
  );
}
