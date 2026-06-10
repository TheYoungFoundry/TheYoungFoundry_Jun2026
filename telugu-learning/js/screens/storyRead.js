import { state } from '../app.js';
import { showScreen } from '../router.js';
import {
  toggleReadAloud, changeFontSize, rateStory,
  showWordMeaning, checkParaQ, endStoryReading,
  saveCreativeWriting, generateAndShowStory, storyState
} from '../engines/stories/storyEngine.js';

export function wireStoryReader() {
  // finishReadingBtn is outside the container (in session-top bar), wire separately
  document.getElementById('finishReadingBtn')?.addEventListener('click', () => {
    endStoryReading(state, showScreen);
  });

  const container = document.getElementById('storyReaderContainer');
  if (!container) return;

  container.addEventListener('click', e => {
    // Read aloud
    if (e.target.id === 'readAloudBtn') { toggleReadAloud(); return; }

    // Font size
    if (e.target.closest('.font-size-ctrl')) {
      const btn = e.target.closest('button');
      if (!btn) return;
      const text = btn.textContent.trim();
      if (text === 'A-') changeFontSize(-1);
      else if (text === 'A')  changeFontSize(0);
      else if (text === 'A+') changeFontSize(1);
      return;
    }

    // Star rating
    const starBtn = e.target.closest('[data-rating]');
    if (starBtn) { rateStory(parseInt(starBtn.dataset.rating)); return; }

    // Clickable story words
    const sw = e.target.closest('.sw');
    if (sw) { showWordMeaning(sw); return; }

    // Para checkpoint options
    const paraOpt = e.target.closest('.para-opt[data-qi]');
    if (paraOpt) {
      checkParaQ(
        paraOpt,
        parseInt(paraOpt.dataset.oi),
        parseInt(paraOpt.dataset.ans),
        parseInt(paraOpt.dataset.qi)
      );
      return;
    }

    // End reading → comprehension
    if (e.target.id === 'endStoryReadingBtn') { endStoryReading(state, showScreen); return; }

    // New story
    if (e.target.id === 'newStoryBtn') { generateAndShowStory(state, showScreen); return; }

    // Back to setup
    if (e.target.id === 'backToStorySetupBtn') { showScreen('screenStorySetup'); return; }

    // Save creative writing
    if (e.target.id === 'saveCreativeBtn') { saveCreativeWriting(state); return; }
  });
}
