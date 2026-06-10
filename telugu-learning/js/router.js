import { state } from './app.js';
import { stopQTimer } from './screens/session.js';
import { renderDashboard } from './screens/dashboard.js';

const lifecycleHooks = {};

export function registerHook(screenId, hooks) {
  lifecycleHooks[screenId] = { ...lifecycleHooks[screenId], ...hooks };
}

export function showScreen(id) {
  const prev = document.querySelector('.screen.active');
  const prevId = prev?.id;

  if (prevId && lifecycleHooks[prevId]?.onLeave) {
    lifecycleHooks[prevId].onLeave();
  }

  // Hide keyboard whenever screen changes
  document.getElementById('teluguKeyboard')?.classList.remove('show');

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const next = document.getElementById(id);
  if (next) next.classList.add('active');

  const backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.style.display = id === 'screenSetup' ? 'none' : 'inline-block';

  if (id === 'screenSetup') {
    stopQTimer();
    clearInterval(state.timerInterval);
    const pick = document.getElementById('gradePickView');
    const hub  = document.getElementById('topicHubView');
    if (pick) pick.style.display = 'block';
    if (hub)  hub.style.display  = 'none';
  }

  if (id === 'screenDash') renderDashboard();

  if (lifecycleHooks[id]?.onEnter) {
    lifecycleHooks[id].onEnter();
  }

  // Dispatch screen-enter event for any listeners (e.g. story setup)
  document.dispatchEvent(new CustomEvent('screenEnter:' + id));
}
