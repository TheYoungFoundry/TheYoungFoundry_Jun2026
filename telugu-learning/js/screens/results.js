import { state } from '../app.js';
import { showScreen } from '../router.js';

export function downloadProgress() {
  const data = {
    date:     new Date().toISOString(),
    grade:    state.grade,
    duration: state.duration,
    correct:  state.correct,
    wrong:    state.wrong,
    total:    state.correct + state.wrong,
    pct:      Math.round(state.correct / (state.correct + state.wrong || 1) * 100),
    topics:   [...new Set(state.questions.map(q => q.topic))]
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `telugu-progress-${new Date().toLocaleDateString('en-IN').replace(/\//g,'-')}.json`;
  a.click();
}

export function tryAgain() {
  state.qIndex = 0; state.correct = 0; state.wrong = 0;
  state.scrambleSelected = [];
  showScreen('screenSetup');
}
