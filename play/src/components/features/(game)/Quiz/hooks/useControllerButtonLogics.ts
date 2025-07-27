import { useConfigStore } from "@/store/config-store";
import { useQuizData } from "../Provider";
import { SoundEffects } from "@/lib/audio/sound-effects";

export function useControllerButtonLogics() {
  const { setQuizState, stopwatch, timer } = useQuizData();
  const { sound } = useConfigStore();

  const { seconds, minutes, pause: pauseStopwatch } = stopwatch;
  const { pause: pauseTimer } = timer;

  const pauseHandler = () => {
    if (sound) SoundEffects.click();
    setQuizState((prev) => ({ ...prev, isPausedUser: true }));
    pauseTimer();
    pauseStopwatch();
  };

  const configHandler = () => {
    if (sound) SoundEffects.click();
    setQuizState((prev) => ({ ...prev, isConfig: true }));
    pauseTimer();
    pauseStopwatch();
  };

  const stopwatchTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return { pauseHandler, configHandler, stopwatchTime };
}
