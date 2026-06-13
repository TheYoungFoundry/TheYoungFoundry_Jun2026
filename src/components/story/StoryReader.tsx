'use client';

import React, { useState, useEffect } from 'react';
import { useStoryStore } from '@/store/storyStore';
import { STORY_MORALS } from '@/data/stories';

interface Props {
  onComprehensionStart: () => void;
  onBack: () => void;
}

export default function StoryReader({ onComprehensionStart, onBack }: Props) {
  const { title, paragraphs, vocabulary, theme } = useStoryStore();
  const [readSeconds, setReadSeconds] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setReadSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleReadAloud = () => {
    if (!isSpeaking && 'speechSynthesis' in window) {
      const text = paragraphs.map((p) => p.text).join('. ');
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'te-IN';
      utter.rate = 0.85;
      utter.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utter);
      setIsSpeaking(true);
    } else if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const moral = STORY_MORALS[theme || 'jungle'] || 'మంచి పని చేయడమే మనిషి ధర్మం.';

  return (
    <div className="container" style={{ paddingTop: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e88e5 0%, #1e88e5 100%)',
            color: '#fff',
            padding: '24px',
            borderRadius: '16px',
            marginBottom: '24px',
          }}
        >
          <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>{title}</h1>
          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', marginBottom: '16px' }}>
            <span>⏱️ {formatTime(readSeconds)}</span>
            <span>📖 {paragraphs.length} పేరాలు (Paragraphs)</span>
            <span>📚 {vocabulary.length} కొత్త పదాలు (New Words)</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={toggleReadAloud}
              style={{
                background: '#fff',
                color: '#1e88e5',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {isSpeaking ? '⏹ Stop' : '🔊 Read Aloud'}
            </button>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px' }}>Text:</span>
              <button
                onClick={() => setFontSize(Math.max(0.8, fontSize - 0.2))}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '4px 8px', cursor: 'pointer', color: '#fff', borderRadius: '4px' }}
              >
                A−
              </button>
              <button
                onClick={() => setFontSize(1)}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '4px 8px', cursor: 'pointer', color: '#fff', borderRadius: '4px' }}
              >
                A
              </button>
              <button
                onClick={() => setFontSize(Math.min(1.4, fontSize + 0.2))}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', padding: '4px 8px', cursor: 'pointer', color: '#fff', borderRadius: '4px' }}
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Vocabulary Spotlight */}
        {vocabulary.length > 0 && (
          <div
            style={{
              background: '#fff3e0',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              border: '2px solid #ffa726',
            }}
          >
            <h4 style={{ marginBottom: '12px' }}>💡 కొత్త పదాలు నేర్చుకోండి (Word Spotlight)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
              {vocabulary.slice(0, 6).map((word, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#fff',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid #ffa726',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{word.em}</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>{word.tel}</div>
                  <div style={{ fontSize: '10px', color: '#999' }}>{word.eng}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Paragraphs */}
        {paragraphs.map((para, idx) => (
          <div key={idx} style={{ marginBottom: '24px' }}>
            <div
              className="story-para"
              style={{
                fontSize: `${fontSize}em`,
                lineHeight: '1.8',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{para.scene}</div>
              <div style={{ color: '#2d3748', marginBottom: '16px' }}>
                {para.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              {para.q && (
                <div
                  style={{
                    background: '#e3f2fd',
                    padding: '16px',
                    borderRadius: '8px',
                    marginTop: '16px',
                    border: '2px solid #1e88e5',
                  }}
                >
                  <div style={{ fontWeight: '700', marginBottom: '12px' }}>❓ {para.q.t}</div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {para.q.opts.map((opt, oidx) => (
                      <button
                        key={oidx}
                        style={{
                          padding: '10px 12px',
                          background: '#fff',
                          border: '2px solid #1e88e5',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#e3f2fd';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Moral */}
        <div
          style={{
            background: '#fff3e0',
            padding: '20px',
            borderRadius: '12px',
            border: '2px solid #ffa726',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌟</div>
          <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', fontFamily: 'var(--head)' }}>
            నైతికం — Moral
          </div>
          <div style={{ fontSize: '14px', color: '#2d3748' }}>{moral}</div>
        </div>

        {/* Vocabulary Bank */}
        {vocabulary.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '12px' }}>📚 నా పద సంపద (Vocabulary Bank)</h4>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {vocabulary.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#e8f5e9',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: '1px solid #43a047',
                    cursor: 'pointer',
                  }}
                >
                  {word.em} {word.tel}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px', marginBottom: '32px' }}>
          <button onClick={onComprehensionStart} className="btn green" style={{ flex: 1 }}>
            📝 అవగాహన ప్రశ్నలు (Comprehension Quiz) →
          </button>
          <button onClick={onBack} className="btn ghost">
            ← వెనుకకు (Back)
          </button>
        </div>
      </div>
    </div>
  );
}
