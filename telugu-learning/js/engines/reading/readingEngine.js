import { loadData } from '../../data/loader.js';
import { pick } from '../../utils.js';
import { GRADE_PROFILE } from '../difficulty/difficultyManager.js';

export async function generateReadingCard(grade, topicId) {
  const cards = await loadData('reading-cards');
  const profile = GRADE_PROFILE[grade] || GRADE_PROFILE[3];

  let card;
  if (topicId && cards[topicId]) {
    card = pick(cards[topicId]);
  } else {
    const allKeys = Object.keys(cards);
    const key = pick(allKeys);
    card = pick(cards[key]);
  }

  return {
    ...card,
    grade,
    profile
  };
}

export function renderReadingCard(card, container) {
  if (!container || !card) return;
  container.innerHTML = `
    <div class="reading-card">
      <div class="rc-title">${card.title || ''}</div>
      <div class="rc-content">${card.content || card.text || ''}</div>
      ${card.examples ? `<div class="rc-examples">
        ${card.examples.map(e => `<span class="rc-example">${e}</span>`).join('')}
      </div>` : ''}
    </div>
  `;
}
