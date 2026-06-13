'use client';

import React, { useState } from 'react';
import { useStoryStore } from '@/store/storyStore';

interface Props {
  onBack: () => void;
  onHome: () => void;
}

export default function StoryComprehension({ onBack, onHome }: Props) {
  const { comprehensionQs } = useStoryStore();
  const [answers, setAnswers] = useState<number[]>(new Array(comprehensionQs.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[qIdx] = optIdx;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    const newScores = comprehensionQs.map((q, idx) => answers[idx] === q.ans);
    setScores(newScores);
    setSubmitted(true);
  };

  if (comprehensionQs.length === 0) {
    return <div className="container">No comprehension questions available</div>;
  }

  const correct = scores.filter((s) => s).length;
  const total = comprehensionQs.length;
  const percentage = submitted ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="container" style={{ paddingTop: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px' }}>📝 అవగాహన ప్రశ్నలు (Comprehension Quiz)</h2>

        {comprehensionQs.map((q, qIdx) => (
          <div
            key={qIdx}
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '2px solid #eceef1',
            }}
          >
            <div style={{ marginBottom: '4px', fontSize: '12px', color: '#999', fontWeight: '700' }}>
              Question {qIdx + 1} of {total}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>{q.t}</div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {q.opts.map((opt, oIdx) => {
                const isSelected = answers[qIdx] === oIdx;
                const isCorrect = oIdx === q.ans;
                const showResult = submitted && isSelected;
                const isWrong = showResult && !isCorrect;

                let borderColor = '#eceef1';
                let background = '#fff';

                if (submitted) {
                  if (isCorrect) {
                    borderColor = '#43a047';
                    background = '#e8f5e9';
                  } else if (isWrong) {
                    borderColor = '#e53935';
                    background = '#ffebee';
                  }
                } else if (isSelected) {
                  borderColor = '#1e88e5';
                  background = '#e3f2fd';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                    disabled={submitted}
                    style={{
                      padding: '12px 16px',
                      background,
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      cursor: submitted ? 'default' : 'pointer',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: '0.2s',
                    }}
                  >
                    <span style={{ color: '#999', marginRight: '8px' }}>{['A', 'B', 'C', 'D'][oIdx]}.</span>
                    {opt}
                    {submitted && isCorrect && <span style={{ marginLeft: '8px', color: '#43a047' }}>✓</span>}
                    {submitted && isWrong && <span style={{ marginLeft: '8px', color: '#e53935' }}>✗</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted && (
          <button
            onClick={handleSubmit}
            className="btn green"
            style={{ width: '100%', padding: '14px', fontSize: '16px', marginTop: '24px', marginBottom: '24px' }}
          >
            ✓ సమర్పించు (Submit)
          </button>
        )}

        {submitted && (
          <div
            style={{
              background: '#fff3e0',
              padding: '32px 24px',
              borderRadius: '16px',
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '24px',
              border: '2px solid #ffa726',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {percentage === 100 ? '🌟' : percentage >= 80 ? '👍' : '📚'}
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#ffa726' }}>
              {correct}/{total}
            </div>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>
              {'⭐'.repeat(Math.ceil(percentage / 20))}
            </div>
            <div style={{ fontSize: '16px', marginBottom: '24px', color: '#2d3748' }}>
              {percentage === 100
                ? '🌟 అద్భుతం! Perfect score! You understood every word!'
                : percentage >= 80
                  ? '👍 చాలా బాగు! Great comprehension!'
                  : percentage >= 60
                    ? '😊 మంచి ప్రయత్నం! Good try — read once more!'
                    : '📖 మళ్ళీ చదవండి! Read the story again — you can do it!'}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={onHome} className="btn green">
                🔄 కొత్త కథ (New Story)
              </button>
              <button onClick={onHome} className="btn blue">
                📚 హోమ్ (Home)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
