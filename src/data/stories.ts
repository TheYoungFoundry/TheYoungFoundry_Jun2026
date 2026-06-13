import { StoryTheme, StoryCharacter, GradeProfile, ColorOption, FruitOption } from '@/types';

export const STORY_THEMES: StoryTheme[] = [
  { id: 'jungle', name: 'అడవి కథ', eng: 'Jungle', em: '🌳', color: '#166534', bg: '#dcfce7' },
  { id: 'school', name: 'పాఠశాల కథ', eng: 'School', em: '🏫', color: '#1e40af', bg: '#dbeafe' },
  { id: 'festival', name: 'పండుగ కథ', eng: 'Festival', em: '🪔', color: '#92400e', bg: '#fef3c7' },
  { id: 'farm', name: 'రైతు కథ', eng: 'Farm Life', em: '🌾', color: '#166534', bg: '#dcfce7' },
  { id: 'sea', name: 'సముద్రం కథ', eng: 'Sea Adventure', em: '🌊', color: '#1e40af', bg: '#dbeafe' },
  { id: 'sky', name: 'ఆకాశం కథ', eng: 'Sky & Birds', em: '🦅', color: '#4c1d95', bg: '#ede9fe' },
  { id: 'friendship', name: 'స్నేహం కథ', eng: 'Friendship', em: '💝', color: '#9f1239', bg: '#ffe4e6' },
  { id: 'courage', name: 'ధైర్యం కథ', eng: 'Courage', em: '🦁', color: '#7c2d12', bg: '#fed7aa' },
  { id: 'magic', name: 'మాయా కథ', eng: 'Magical', em: '✨', color: '#4c1d95', bg: '#ede9fe' },
  { id: 'village', name: 'ఊరి కథ', eng: 'Village Life', em: '🏡', color: '#166534', bg: '#dcfce7' },
  { id: 'surprise', name: 'Surprise Me!', eng: 'Random', em: '🎲', color: '#fff', bg: '#0F1D32', special: true },
];

export const STORY_CHARACTERS: StoryCharacter[] = [
  { t: 'కోతి', e: 'Monkey', em: '🐒', type: 'animal' },
  { t: 'గుర్రం', e: 'Horse', em: '🐎', type: 'animal' },
  { t: 'ఏనుగు', e: 'Elephant', em: '🐘', type: 'animal' },
  { t: 'కుందేలు', e: 'Rabbit', em: '🐇', type: 'animal' },
  { t: 'నెమలి', e: 'Peacock', em: '🦚', type: 'bird' },
  { t: 'చిలుక', e: 'Parrot', em: '🦜', type: 'bird' },
  { t: 'పిల్లి', e: 'Cat', em: '🐱', type: 'animal' },
  { t: 'కుక్క', e: 'Dog', em: '🐶', type: 'animal' },
];

export const GRADE_PROFILE: Record<number, GradeProfile> = {
  1: { sentences: 2, vocab: 'basic', adjectives: 1, idioms: false, paraCount: 4, compQ: 3 },
  2: { sentences: 3, vocab: 'basic', adjectives: 1, idioms: false, paraCount: 5, compQ: 3 },
  3: { sentences: 3, vocab: 'medium', adjectives: 2, idioms: false, paraCount: 6, compQ: 4 },
  4: { sentences: 4, vocab: 'medium', adjectives: 2, idioms: true, paraCount: 7, compQ: 5 },
  5: { sentences: 5, vocab: 'rich', adjectives: 3, idioms: true, paraCount: 8, compQ: 6 },
  6: { sentences: 5, vocab: 'rich', adjectives: 3, idioms: true, paraCount: 9, compQ: 6 },
};

export const COLORS: ColorOption[] = [
  { t: 'ఎరుపు', e: 'Red', em: '❤️' },
  { t: 'ఆకుపచ్చ', e: 'Green', em: '💚' },
  { t: 'నీలం', e: 'Blue', em: '💙' },
  { t: 'పసుపు', e: 'Yellow', em: '💛' },
  { t: 'నారింజ', e: 'Orange', em: '🧡' },
  { t: 'ఊదా', e: 'Purple', em: '💜' },
];

export const FRUITS: FruitOption[] = [
  { t: 'మామిడి', e: 'Mango', em: '🥭' },
  { t: 'అరటి', e: 'Banana', em: '🍌' },
  { t: 'ఎండు', e: 'Apple', em: '🍎' },
  { t: 'ద్రాక్ష', e: 'Grapes', em: '🍇' },
  { t: 'కేరీ', e: 'Papaya', em: '🧡' },
  { t: 'శరీఫా', e: 'Custard Apple', em: '🍎' },
];

export const STORY_MORALS: Record<string, string> = {
  jungle: 'పంచుకోవడం అందరికీ ఆనందాన్ని తెస్తుంది. Sharing brings joy to all.',
  school: 'కష్టపడితే విజయం తప్పదు. Hard work always pays off.',
  festival: 'పండుగలు అందరినీ కలిపే సందర్భాలు. Festivals unite everyone.',
  farm: 'రైతు శ్రమను గౌరవించాలి. Respect the farmer\'s hard work.',
  sea: 'ప్రకృతిని గౌరవించాలి. Respect nature always.',
  friendship: 'నిజమైన స్నేహితుడు సుఖదుఃఖాల్లో పక్కన ఉంటారు. True friends stand by you.',
  courage: 'భయాన్ని అధిగమించడమే ధైర్యం. Overcoming fear is true courage.',
  magic: 'పరోపకారమే నిజమైన మాయ. Helping others is true magic.',
  sky: 'కలలు రెక్కలు — నిన్ను ఎత్తిపడతాయి. Dreams are wings that lift you.',
  village: 'కలిసి బతకడమే జీవితం. Living together is true life.',
};

export const CREATIVE_PROMPTS = {
  5: [
    'ఈ కథకు కొనసాగింపు (continuation) రాయండి — What happens next?',
    'మీరు హీరో అయితే ఏమి చేసేవారు? What would you do if you were the hero?',
    'ఈ కథను మీ స్నేహితుడికి వివరించండి — Summarize this story in 3 sentences.',
    'కథలో మీకు నచ్చిన పాత్ర గురించి రాయండి — Write about your favourite character.',
  ],
};
