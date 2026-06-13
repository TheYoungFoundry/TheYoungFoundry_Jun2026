import { StoryParagraph, VocabularyWord, ComprehensionQuestion } from '@/types';
import { STORY_CHARACTERS, COLORS, FRUITS } from '@/data/stories';

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function extractVocabulary(paras: StoryParagraph[]): VocabularyWord[] {
  const vocab: VocabularyWord[] = [];
  const seen = new Set<string>();

  paras.forEach((p) => {
    const matches = p.text.matchAll(/\[\[([^|]+)\|([^|]+)\|([^\]]+)\]\]/g);
    for (const m of matches) {
      const word = m[1];
      if (!seen.has(word)) {
        seen.add(word);
        vocab.push({ tel: word, eng: m[2], em: m[3] });
      }
    }
  });

  return vocab.slice(0, 12);
}

export function buildComprehensionQuestions(
  paragraphs: StoryParagraph[],
  grade: number,
  theme: string
): ComprehensionQuestion[] {
  const qs: ComprehensionQuestion[] = [];

  paragraphs.forEach((p) => {
    if (p.q) qs.push(p.q);
  });

  const themeQuestions: Record<string, ComprehensionQuestion[]> = {
    jungle: [
      { t: 'కథలో హీరో ఎవరు?', opts: ['జంతువు', 'మనిషి', 'పక్షి', 'చేపము'], ans: 0 },
      { t: 'కథ ముగింపు (ending) ఎలా ఉంది?', opts: ['సంతోషంగా', 'దుఃఖంగా', 'భయంగా', 'అనిర్ణీతంగా'], ans: 0 },
    ],
    school: [
      { t: 'ఉపాధ్యాయుడు దేనిని సిఖరించారు?', opts: ['చదువు', 'ఆడిక', 'నిద్ర', 'భోజనం'], ans: 0 },
      { t: 'హీరో ఎంత మార్కులు వచ్చాయని ఆశించారు?', opts: ['100', '50', '75', '25'], ans: 0 },
    ],
  };

  if (theme in themeQuestions) {
    const themeQs = themeQuestions[theme];
    while (qs.length < 6 && themeQs.length > 0) {
      qs.push(themeQs.shift()!);
    }
  }

  return qs.slice(0, grade <= 2 ? 3 : grade <= 4 ? 5 : 6);
}

export function renderStoryText(text: string, grade: number): string {
  return text.replace(/\[\[([^\|]+)\|([^\|]+)\|([^\]]+)\]\]/g, (_, tel, eng, em) => {
    const showHint = grade <= 2 ? `<small style="font-size:.65em;color:#999;font-weight:400"> (${eng})</small>` : '';
    return `<span class="story-word" data-tel="${tel}" data-eng="${eng}" data-em="${em}">${tel}${showHint}</span>`;
  });
}

export function getRandomCharacter() {
  return pickRandom(STORY_CHARACTERS);
}

export function getRandomColor() {
  return pickRandom(COLORS);
}

export function getRandomFruit() {
  return pickRandom(FRUITS);
}

export function getRandomFriend(hero: (typeof STORY_CHARACTERS)[0]) {
  const friends = STORY_CHARACTERS.filter((c) => c.t !== hero.t);
  return pickRandom(friends);
}
