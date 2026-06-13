export interface StoryTheme {
  id: string;
  name: string;
  eng: string;
  em: string;
  color: string;
  bg: string;
  special?: boolean;
}

export interface StoryCharacter {
  t: string;
  e: string;
  em: string;
  type: 'animal' | 'bird';
}

export interface ColorOption {
  t: string;
  e: string;
  em: string;
}

export interface FruitOption {
  t: string;
  e: string;
  em: string;
}

export interface VocabularyWord {
  tel: string;
  eng: string;
  em: string;
}

export interface GradeProfile {
  sentences: number;
  vocab: 'basic' | 'medium' | 'rich';
  adjectives: number;
  idioms: boolean;
  paraCount: number;
  compQ: number;
}

export interface StoryParagraph {
  scene: string;
  text: string;
  q?: {
    t: string;
    opts: string[];
    ans: number;
  };
}

export interface ComprehensionQuestion {
  t: string;
  opts: string[];
  ans: number;
}

export interface StoryState {
  theme: string | null;
  paragraphs: StoryParagraph[];
  title: string;
  vocabulary: VocabularyWord[];
  comprehensionQs: ComprehensionQuestion[];
  heroChar: StoryCharacter;
  storyLength: 'short' | 'medium' | 'long';
  readParas: number;
  wordsRead: number;
  readSeconds: number;
  currentRating: number;
}

export interface StoryJournalEntry {
  id?: string;
  user_id?: string;
  date: string;
  title: string;
  theme: string;
  grade: number;
  seconds: number;
  words: number;
  rating: number;
  childName: string;
  created_at?: string;
}

export interface UserProfile {
  id?: string;
  email?: string;
  childName: string;
  grade: number;
  preferredThemes?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface WordTooltip {
  tel: string;
  eng: string;
  em: string;
}
