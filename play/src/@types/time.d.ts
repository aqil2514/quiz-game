export interface GameTime {
  init: number;
  accumulate: number;
  current: number;
  next: number;
  distance?: number;
}
