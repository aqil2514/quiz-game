import { GameTime } from "@/@types/time";

export function getAccumulateTime(gameTime: GameTime) {
  const init = gameTime.init;
  const current = gameTime.current / Number(gameTime.distance?.toFixed());
  const accumulate = init - current;

  return accumulate;
}
