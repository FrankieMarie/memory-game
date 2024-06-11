export const gameOverMessage = (accuracy: number) => {
  if (accuracy <= 25) {
    return 'Ouch, that was rough.';
  } else if (accuracy >= 26 && accuracy <= 60) {
    return 'You can do better.';
  } else if (accuracy >= 61 && accuracy <= 80) {
    return 'Not too shabby.';
  } else if (accuracy >= 81 && accuracy <= 99) {
    return 'Right on!';
  } else {
    return 'Perfect Score!';
  }
};
