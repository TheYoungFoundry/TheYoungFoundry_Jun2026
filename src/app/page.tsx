'use client';

import React, { useState } from 'react';
import StorySetup from '@/components/story/StorySetup';
import StoryReader from '@/components/story/StoryReader';
import StoryComprehension from '@/components/story/StoryComprehension';
import TopBar from '@/components/TopBar';

type Screen = 'home' | 'setup' | 'reading' | 'comprehension';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');

  const handleStartStories = () => {
    setScreen('setup');
  };

  const handleStoryGenerated = () => {
    setScreen('reading');
  };

  const handleComprehensionStart = () => {
    setScreen('comprehension');
  };

  const handleBack = () => {
    setScreen('home');
  };

  return (
    <main>
      <TopBar />
      {screen === 'home' && <HomeScreen onStart={handleStartStories} />}
      {screen === 'setup' && (
        <StorySetup onStoryGenerated={handleStoryGenerated} onBack={handleBack} />
      )}
      {screen === 'reading' && (
        <StoryReader onComprehensionStart={handleComprehensionStart} onBack={handleBack} />
      )}
      {screen === 'comprehension' && (
        <StoryComprehension onBack={handleBack} onHome={handleBack} />
      )}
    </main>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px', fontFamily: 'var(--head)' }}>
          <span style={{ color: '#e53935' }}>T</span>
          <span style={{ color: '#43a047' }}>Y</span>
          <span style={{ color: '#1e88e5' }}>F</span>
        </h1>
        <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>The Young Foundry</h2>
        <p style={{ fontSize: '18px', color: '#7b8694', marginBottom: '32px', lineHeight: '1.6' }}>
          Interactive Telugu Language Learning for Kids
        </p>
        <button
          onClick={onStart}
          className="btn green"
          style={{ padding: '16px 32px', fontSize: '16px' }}
        >
          📖 Start Learning Stories
        </button>
        <p style={{ marginTop: '24px', color: '#999', fontSize: '14px' }}>
          Learn Telugu through interactive stories, word games, and comprehension exercises
        </p>
      </div>
    </div>
  );
}
