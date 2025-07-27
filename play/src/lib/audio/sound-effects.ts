const playsound = (src: string) => {
  const audio = new Audio(src);
  audio.currentTime = 0;
  audio.play();
};

export const SoundEffects = {
  correct: () => playsound("/sound-effects/correct.mp3"),
  wrong: () => playsound("/sound-effects/wrong.mp3"),
  click: () => playsound("/sound-effects/click.mp3"),
  start: () => playsound("/sound-effects/start.mp3"),
  timePassing: () => playsound("/sound-effects/time-passing.mp3"),
  timeEnd: () => playsound("/sound-effects/time-end.mp3"),
  win: () => playsound("/sound-effects/win.mp3"),
  perfect: () => playsound("/sound-effects/perfect.mp3"),
  lose: () => playsound("/sound-effects/lose.mp3"),
};
