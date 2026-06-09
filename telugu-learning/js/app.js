import { showScreen } from './router.js';
import { buildKeyboardUI, closeKeyboard, switchKbTab, kbBackspace } from './engines/keyboard/keyboardEngine.js';
import { initSetup } from './screens/setup.js';
import { stopQTimer } from './screens/session.js';
import { getAIHint } from './screens/session.js';
import { downloadProgress, tryAgain } from './screens/results.js';
import { addChild, closeModal } from './screens/dashboard.js';
import { initStorySetupScreen } from './screens/storySetup.js';
import { wireStoryReader } from './screens/storyRead.js';
import { wireComprehension } from './screens/storyComp.js';
import { stopReadAloud, storyState } from './engines/stories/storyEngine.js';

export const state = {
  grade: null,
  duration: 15,
  selectedTopics: [],
  selectedActs: [],
  questions: [],
  qIndex: 0,
  correct: 0,
  wrong: 0,
  timerSecs: 0,
  timerMax: 0,
  timerInterval: null,
  qTimerSecs: 30,
  qTimerInterval: null,
  currentChild: null,
  answered: false,
  scrambleSelected: []
};

function goBack() {
  stopQTimer();
  clearInterval(state.timerInterval);
  clearInterval(storyState.readTimerInterval);
  stopReadAloud();
  document.getElementById('backBtn').style.display = 'none';
  showScreen('screenSetup');
}

document.addEventListener('DOMContentLoaded', () => {
  buildKeyboardUI();
  initSetup();
  wireStoryReader();
  wireComprehension();

  document.getElementById('backBtn')?.addEventListener('click', goBack);
  document.getElementById('kbCloseBtn')?.addEventListener('click', closeKeyboard);
  document.getElementById('kbBackspaceBtn')?.addEventListener('click', kbBackspace);

  document.querySelectorAll('.kb-tab').forEach(tab => {
    tab.addEventListener('click', () => switchKbTab(tab.dataset.tab));
  });

  document.getElementById('downloadProgressBtn')?.addEventListener('click', downloadProgress);
  document.getElementById('tryAgainBtn')?.addEventListener('click', tryAgain);
  document.getElementById('goHomeBtn')?.addEventListener('click', () => showScreen('screenSetup'));

  // Story and Dashboard nav (footer cards + any nav buttons)
  document.getElementById('navDashboard')?.addEventListener('click', () => showScreen('screenDash'));
  document.getElementById('navStory')?.addEventListener('click',     () => showScreen('screenStorySetup'));

  document.addEventListener('screenEnter:screenStorySetup', initStorySetupScreen);

  document.getElementById('addChildBtn')?.addEventListener('click', addChild);
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.querySelector('#addChildModal')?.addEventListener('click', e => {
    if (e.target.id === 'addChildModal') closeModal();
  });

  document.getElementById('aiHintBtn')?.addEventListener('click', getAIHint);

  showScreen('screenSetup');
});
