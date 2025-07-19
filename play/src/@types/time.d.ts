export interface GameTime {
  init: number;
  accumulate: number;
  current: number;
  next: number;
  rest: number;
  distance?: number;
}
