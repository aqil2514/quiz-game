import { Volume2Icon, TimerIcon } from "lucide-react";
import React from "react";

export const settingsConfig = [
  {
    id: "sound",
    label: "Suara",
    icon: <Volume2Icon className="text-teal-300 w-6 h-6" />,
    type: "switch",
  },
  {
    id: "timer",
    label: "Batas Waktu Soal (Detik)",
    icon: <TimerIcon className="text-orange-300 w-6 h-6" />,
    type: "slider",
    min: 5,
    max: 60,
    step: 5,
  },
] as const;
