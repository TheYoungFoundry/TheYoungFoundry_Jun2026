'use client';

import React, { useState } from 'react';
import { STORY_THEMES, STORY_CHARACTERS, GRADE_PROFILE } from '@/data/stories';
import { useStoryStore, useUserStore } from '@/store/storyStore';
import { STORY_TEMPLATES } from '@/data/storyTemplates';
import {
  extractVocabulary,
  buildComprehensionQuestions,
  pickRandom,
  getRandomColor,
  getRandomFruit,
  getRandomFriend,
} from '@/lib/storyUtils';

interface Props {
  onStoryGenerated: () => void;
  onBack: () => void;
}

export default function StorySetup({ onStoryGenerated, onBack }: Props) {
  const {
    theme,
    setTheme,
    heroChar,
    setHeroChar,
    storyLength,
    setStoryLength,
    setParagraphs,
    setTitle,
    setVocabulary,
    setComprehensionQs,
  } = useStoryStore();

  const { grade, childName, setChildName } = useUserStore();
  const [localChildName, setLocalChildName] = useState(childName || 'రవి');

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
  };

  const handleCharacterSelect = (char: (typeof STORY_CHARACTERS)[0]) => {
    setHeroChar(char);
  };

  const handleGenerateStory = () => {
    let selectedTheme = theme;
    if (!selectedTheme) selectedTheme = pickRandom(STORY_THEMES.filter((t) => !t.special)).id;
    if (selectedTheme === 'surprise')
      selectedTheme = pickRandom(STORY_THEMES.filter((t) => !t.special)).id;

    const profile = GRADE_PROFILE[grade] || GRADE_PROFILE[3];
    const templateFn = STORY_TEMPLATES[selectedTheme]?.[0];

    if (!templateFn) return;

    const friend = getRandomFriend(heroChar);
    const fruit = getRandomFruit();
    const color = getRandomColor();

    const el = { hero: heroChar, friend, fruit, color, name: localChildName };
    let paragraphs = templateFn(el);

    const lengths = { short: 4, medium: 5, long: 6 };
    const targetLen = Math.min(paragraphs.length, lengths[storyLength] || 5);
    paragraphs = paragraphs.slice(0, targetLen);

    const themeMeta = STORY_THEMES.find((t) => t.id === selectedTheme);
    const title = `${heroChar.em} ${localChildName} కొత్త కథ`;

    setParagraphs(paragraphs);
    setTitle(title);
    setVocabulary(extractVocabulary(paragraphs));
    setComprehensionQs(buildComprehensionQuestions(paragraphs, grade, selectedTheme));

    setChildName(localChildName);
    onStoryGenerated();
  };

  return (
    <div className="container" style={{ paddingTop: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>📚 కథ సెటప్</h2>

          <div className="field">
            <label>బిడ్డ పేరు (Child's Name)</label>
            <input
              type="text"
              value={localChildName}
              onChange={(e) => setLocalChildName(e.target.value)}
              placeholder="పేరు ఇవ్వండి"
            />
          </div>

          <div className="field">
            <label>💾 తరగతి (Grade): {grade}</label>
            <p style={{ fontSize: '12px', color: '#999' }}>
              {grade <= 2
                ? '🟢 సాధారణం (Basic - Simple words)'
                : grade <= 4
                  ? '🟡 మధ్యస్థం (Intermediate)'
                  : '🔴 ఎలవెటెడ్ (Advanced - Rich vocabulary)'}
            </p>
          </div>

          <div className="field">
            <label>🎭 కథ థీమ్ (Theme)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              {STORY_THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeSelect(t.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: theme === t.id ? '3px solid #1e88e5' : '2px solid #eceef1',
                    background: t.bg,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: '0.2s',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>{t.em}</div>
                  <div style={{ fontSize: '12px', fontWeight: '600' }}>{t.eng}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>🦁 హీరో జంతువు (Hero Character)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '12px' }}>
              {STORY_CHARACTERS.map((char) => (
                <button
                  key={char.t}
                  onClick={() => handleCharacterSelect(char)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: heroChar.t === char.t ? '3px solid #43a047' : '2px solid #eceef1',
                    background: heroChar.t === char.t ? '#e8f5e9' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{char.em}</div>
                  <div style={{ fontSize: '11px', fontWeight: '700' }}>{char.e}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>📏 కథ పొడవు (Story Length)</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {(['short', 'medium', 'long'] as const).map((len) => (
                <button
                  key={len}
                  onClick={() => setStoryLength(len)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: storyLength === len ? '3px solid #1e88e5' : '2px solid #eceef1',
                    background: storyLength === len ? '#e3f2fd' : '#fff',
                    cursor: 'pointer',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                  }}
                >
                  {len === 'short' ? '🟢 చిన్న' : len === 'medium' ? '🟡 మధ్యస్థ' : '🔴 పెద్ద'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button onClick={handleGenerateStory} className="btn green" style={{ flex: 1 }}>
              ✨ కథను రూపొందించండి (Generate Story)
            </button>
            <button onClick={onBack} className="btn ghost">
              ← వెనుకకు (Back)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
