export const GRADE_PROFILE = {
  1: { sentences: 2, vocab: 'basic',  adjectives: 1, idioms: false, paraCount: 4, compQ: 3 },
  2: { sentences: 3, vocab: 'basic',  adjectives: 1, idioms: false, paraCount: 5, compQ: 3 },
  3: { sentences: 3, vocab: 'medium', adjectives: 2, idioms: false, paraCount: 6, compQ: 4 },
  4: { sentences: 4, vocab: 'medium', adjectives: 2, idioms: true,  paraCount: 7, compQ: 5 },
  5: { sentences: 5, vocab: 'rich',   adjectives: 3, idioms: true,  paraCount: 8, compQ: 6 },
  6: { sentences: 5, vocab: 'rich',   adjectives: 3, idioms: true,  paraCount: 9, compQ: 6 }
};

const _levels = {};

export const difficultyManager = {
  getLevel(studentId, topic) {
    const key = `${studentId}:${topic}`;
    return _levels[key] ?? 1;
  },

  increaseDifficulty(studentId, topic) {
    const key = `${studentId}:${topic}`;
    _levels[key] = Math.min((_levels[key] ?? 1) + 1, 6);
  },

  decreaseDifficulty(studentId, topic) {
    const key = `${studentId}:${topic}`;
    _levels[key] = Math.max((_levels[key] ?? 1) - 1, 1);
  },

  getParameters(level) {
    return GRADE_PROFILE[level] ?? GRADE_PROFILE[3];
  },

  calculateMastery(history) {
    if (!history || !history.length) return 0;
    const recent = history.slice(-10);
    const correct = recent.filter(h => h.correct).length;
    return Math.round((correct / recent.length) * 100);
  }
};
