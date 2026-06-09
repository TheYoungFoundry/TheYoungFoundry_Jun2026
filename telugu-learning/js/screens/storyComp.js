import { state } from '../app.js';
import { showScreen } from '../router.js';
import {
  selectCompAns, submitComprehension, generateAndShowStory
} from '../engines/stories/storyEngine.js';

export function wireComprehension() {
  const cont = document.getElementById('compQuestionsContainer');
  const res  = document.getElementById('compResultsContainer');

  cont?.addEventListener('click', e => {
    const opt = e.target.closest('.comp-opt[data-qi]');
    if (opt) selectCompAns(parseInt(opt.dataset.qi), parseInt(opt.dataset.oi));
  });

  document.getElementById('submitCompBtn')?.addEventListener('click', () =>
    submitComprehension(showScreen)
  );

  res?.addEventListener('click', e => {
    if (e.target.id === 'compNewStoryBtn')   { generateAndShowStory(state, showScreen); return; }
    if (e.target.id === 'compStoryMenuBtn')  { showScreen('screenStorySetup'); return; }
    if (e.target.id === 'compMainMenuBtn')   { showScreen('screenSetup'); return; }
  });
}
