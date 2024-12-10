function calculateScore(timeSpent, keystrokes, linesAdded, linesRemoved) {
  // Simple scoring algorithm
  return timeSpent / 60 + keystrokes / 100 + linesAdded * 2 - linesRemoved;
}

module.exports = calculateScore;
