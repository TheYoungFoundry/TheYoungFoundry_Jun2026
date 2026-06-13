import { create } from 'zustand';
import { StoryState, StoryCharacter } from '@/types';
import { STORY_CHARACTERS } from '@/data/stories';

interface StoryStore extends StoryState {
  setTheme: (theme: string) => void;
  setParagraphs: (paragraphs: StoryState['paragraphs']) => void;
  setTitle: (title: string) => void;
  setHeroChar: (char: StoryCharacter) => void;
  setStoryLength: (length: 'short' | 'medium' | 'long') => void;
  setVocabulary: (vocab: StoryState['vocabulary']) => void;
  setComprehensionQs: (qs: StoryState['comprehensionQs']) => void;
  incrementWordsRead: () => void;
  incrementReadSeconds: () => void;
  setRating: (rating: number) => void;
  reset: () => void;
}

const initialState = {
  theme: null,
  paragraphs: [],
  title: '',
  vocabulary: [],
  comprehensionQs: [],
  heroChar: STORY_CHARACTERS[0],
  storyLength: 'medium' as const,
  readParas: 0,
  wordsRead: 0,
  readSeconds: 0,
  currentRating: 0,
};

export const useStoryStore = create<StoryStore>((set) => ({
  ...initialState,
  setTheme: (theme) => set({ theme }),
  setParagraphs: (paragraphs) => set({ paragraphs }),
  setTitle: (title) => set({ title }),
  setHeroChar: (heroChar) => set({ heroChar }),
  setStoryLength: (storyLength) => set({ storyLength }),
  setVocabulary: (vocabulary) => set({ vocabulary }),
  setComprehensionQs: (comprehensionQs) => set({ comprehensionQs }),
  incrementWordsRead: () => set((state) => ({ wordsRead: state.wordsRead + 1 })),
  incrementReadSeconds: () => set((state) => ({ readSeconds: state.readSeconds + 1 })),
  setRating: (currentRating) => set({ currentRating }),
  reset: () => set(initialState),
}));

interface UserStore {
  userId: string | null;
  childName: string;
  grade: number;
  setUserId: (id: string) => void;
  setChildName: (name: string) => void;
  setGrade: (grade: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  childName: '',
  grade: 3,
  setUserId: (userId) => set({ userId }),
  setChildName: (childName) => set({ childName }),
  setGrade: (grade) => set({ grade }),
}));

interface UIStore {
  showWordTooltip: boolean;
  currentWord: { tel: string; eng: string; em: string } | null;
  setShowWordTooltip: (show: boolean) => void;
  setCurrentWord: (word: UIStore['currentWord']) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  showWordTooltip: false,
  currentWord: null,
  setShowWordTooltip: (showWordTooltip) => set({ showWordTooltip }),
  setCurrentWord: (currentWord) => set({ currentWord }),
}));
