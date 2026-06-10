import { state } from '../app.js';
import { showScreen } from '../router.js';
import {
  loadProgress, saveProgress, computeStats, ensureChild
} from '../engines/dashboard/dashboardEngine.js';

export function renderDashboard() {
  const prog     = loadProgress();
  const children = Object.keys(prog);
  const child    = state.currentChild || children[0] || null;
  state.currentChild = child;

  const sel = document.getElementById('childSelector');
  if (sel) {
    sel.innerHTML = children.map(c =>
      `<button class="child-tab ${c === child ? 'active' : ''}" data-child="${c}">${c}</button>`
    ).join('') +
    `<button class="add-child-btn" id="showAddChildBtn">+ Add Child</button>`;

    sel.querySelectorAll('[data-child]').forEach(btn =>
      btn.addEventListener('click', () => switchChild(btn.dataset.child))
    );
    sel.querySelector('#showAddChildBtn')?.addEventListener('click', showAddChild);
  }

  if (!child || !prog[child]) {
    const statsEl = document.getElementById('dashStats');
    if (statsEl) statsEl.innerHTML = '';
    const sessEl = document.getElementById('dashSessions');
    if (sessEl) sessEl.innerHTML = `
      <div class="empty-state">
        <span class="big">📊</span>
        <p>No sessions yet! <span class="dash-link" id="goToSetupLink">Start a session →</span></p>
      </div>`;
    sessEl?.querySelector('#goToSetupLink')?.addEventListener('click', () => showScreen('screenSetup'));
    return;
  }

  const sessions = prog[child].sessions;
  const stats    = computeStats(sessions);

  const statsEl = document.getElementById('dashStats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="stat-card"><div class="stat-val">${stats.count}</div><div class="stat-lbl">Sessions</div></div>
      <div class="stat-card"><div class="stat-val">${stats.avgPct}%</div><div class="stat-lbl">Avg Score</div></div>
      <div class="stat-card"><div class="stat-val">${stats.bestPct}%</div><div class="stat-lbl">Best Score</div></div>
      <div class="stat-card"><div class="stat-val">${stats.totalTime}m</div><div class="stat-lbl">Time Spent</div></div>
    `;
  }

  const sessEl = document.getElementById('dashSessions');
  if (sessEl) {
    sessEl.innerHTML = `
      <h3>Recent Sessions</h3>
      ${sessions.slice(0, 20).map(s => `
        <div class="session-row">
          <span class="session-date">${s.date}</span>
          <span class="session-grade">Grade ${s.grade}</span>
          <div class="session-topics" style="flex:1">
            ${(s.topics || []).slice(0, 3).map(t =>
              `<span style="font-size:.8rem;background:#f3f4f6;padding:2px 8px;border-radius:8px;margin-right:4px">${t}</span>`
            ).join('')}
          </div>
          <div class="session-score ${s.pct < 50 ? 'low' : ''}">${s.pct}%</div>
          <div style="font-size:.8rem;color:var(--muted);min-width:70px;text-align:right">${s.correct}✓ ${s.wrong}✗</div>
        </div>
      `).join('') || '<div class="empty-state"><span class="big">📚</span><p>No sessions yet!</p></div>'}
    `;
  }
}

export function switchChild(name) {
  state.currentChild = name;
  renderDashboard();
}

export function showAddChild() {
  document.getElementById('addChildModal')?.classList.add('show');
  const inp = document.getElementById('childNameInput');
  if (inp) { inp.value = ''; inp.focus(); }
}

export function closeModal() {
  document.getElementById('addChildModal')?.classList.remove('show');
}

export function addChild() {
  const name = document.getElementById('childNameInput')?.value.trim();
  if (!name) return;
  ensureChild(name);
  state.currentChild = name;
  closeModal();
  renderDashboard();
}
