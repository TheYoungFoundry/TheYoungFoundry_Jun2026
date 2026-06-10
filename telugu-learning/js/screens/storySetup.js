import { state } from '../app.js';
import { showScreen } from '../router.js';
import {
  initStorySetup, selectStoryTheme, selectStoryChar,
  setStoryLength, generateAndShowStory, storyState
} from '../engines/stories/storyEngine.js';

let _storySetupWired = false;

export function initStorySetupScreen() {
  // Refresh the theme and character grids (they depend on current state.grade)
  initStorySetup(state);

  if (_storySetupWired) return;
  _storySetupWired = true;

  document.getElementById('storyThemeGrid')?.addEventListener('click', e => {
    const card = e.target.closest('[data-theme]');
    if (card) selectStoryTheme(card.dataset.theme);
  });

  document.getElementById('storyCharPick')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-char-idx]');
    if (btn) selectStoryChar(parseInt(btn.dataset.charIdx));
  });

  document.getElementById('storyLengthPick')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-len]');
    if (!btn) return;
    document.querySelectorAll('#storyLengthPick .dur-btn').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    setStoryLength(btn.dataset.len);
  });

  document.getElementById('generateStoryBtn')?.addEventListener('click', () =>
    generateAndShowStory(state, showScreen)
  );
}
