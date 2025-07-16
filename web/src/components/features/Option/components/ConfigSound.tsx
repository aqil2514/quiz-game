import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useConfigStore } from "@/store/config-store";
import { Volume2Icon } from "lucide-react";

export default function ConfigSound() {
  const { setSound, sound } = useConfigStore();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Volume2Icon className="text-teal-300 w-6 h-6" />
        <Label htmlFor="sound" className="text-white text-lg">
          Suara
        </Label>
      </div>
      <Switch
        id="sound"
        checked={sound}
        onCheckedChange={() => setSound(!sound)}
      />
    </div>
  );
}
