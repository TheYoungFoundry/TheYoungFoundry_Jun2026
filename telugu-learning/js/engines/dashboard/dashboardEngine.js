export function loadProgress() {
  try { return JSON.parse(localStorage.getItem('tv_progress') || '{}'); }
  catch (e) { return {}; }
}

export function saveProgress(data) {
  localStorage.setItem('tv_progress', JSON.stringify(data));
}

export function saveSession(appState) {
  const child = appState.currentChild || 'My Child';
  const total = appState.correct + appState.wrong;
  const pct   = total > 0 ? Math.round(appState.correct / total * 100) : 0;
  const prog  = loadProgress();
  if (!prog[child]) prog[child] = { sessions: [] };
  prog[child].sessions.unshift({
    date:     new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    grade:    appState.grade,
    duration: appState.duration,
    topics:   [...new Set(appState.questions.map(q => q.topic))],
    correct:  appState.correct,
    wrong:    appState.wrong,
    total,
    pct
  });
  prog[child].sessions = prog[child].sessions.slice(0, 50);
  saveProgress(prog);
  return pct;
}

export function computeStats(sessions) {
  if (!sessions || !sessions.length) return { count: 0, avgPct: 0, bestPct: 0, totalTime: 0 };
  return {
    count:     sessions.length,
    avgPct:    Math.round(sessions.reduce((s, x) => s + x.pct, 0) / sessions.length),
    bestPct:   Math.max(...sessions.map(s => s.pct)),
    totalTime: sessions.reduce((s, x) => s + x.duration, 0)
  };
}

export function getChildren() {
  return Object.keys(loadProgress());
}

export function ensureChild(name) {
  const prog = loadProgress();
  if (!prog[name]) prog[name] = { sessions: [] };
  saveProgress(prog);
}
