export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = arr => [...arr].sort(() => Math.random() - .5);
export const pickN = (arr, n) => shuffle(arr).slice(0, n);

export function scrambleWord(word) {
  const chars = [...word];
  if (chars.length <= 2) return chars.reverse().join('');
  let s;
  do { s = shuffle(chars).join(''); } while (s === word);
  return s;
}

export function makeOptions(correct, pool, n = 4) {
  const opts = new Set([correct]);
  const others = shuffle(pool.filter(x => x !== correct));
  for (const o of others) { if (opts.size >= n) break; opts.add(o); }
  return shuffle([...opts]);
}

// ─── Text-to-Speech ──────────────────────────────────────────────────────────
//
// PRIMARY: Sarvam AI — bulbul:v1, speaker "ananya" (warm Telugu female voice)
//   1. Sign up free at https://dashboard.sarvam.ai
//   2. Copy your API key and paste it below.
//   500 requests/day free, no credit card needed.
//
// FALLBACK: Browser Web Speech API (Telugu voices only).

const SARVAM_API_KEY = 'sk_plo5njkh_2mNbHjeJQYzpLjuhblZZKkrF';
const SARVAM_SPEAKER = 'ananya';

const _ttsCache = new Map();

export async function speak(text) {
  if (!text) return;
  if (SARVAM_API_KEY) {
    await _speakSarvam(text);
  } else {
    _speakBrowser(text);
  }
}

async function _speakSarvam(text) {
  try {
    let blobUrl = _ttsCache.get(text);
    if (!blobUrl) {
      console.log('[TTS] Calling Sarvam AI for:', text);
      const res = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': SARVAM_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [text],
          target_language_code: 'te-IN',
          speaker: SARVAM_SPEAKER,
          model: 'bulbul:v1',
          pace: 0.85,
          codec: 'mp3',
        }),
      });
      if (!res.ok) {
        console.error('[TTS] Sarvam error:', res.status, await res.text());
        _speakBrowser(text); return;
      }
      const { audios } = await res.json();
      if (!audios?.[0]) { console.error('[TTS] Sarvam: no audio in response'); _speakBrowser(text); return; }
      const bytes = Uint8Array.from(atob(audios[0]), c => c.charCodeAt(0));
      blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'audio/mp3' }));
      _ttsCache.set(text, blobUrl);
      console.log('[TTS] Sarvam success');
    }
    new Audio(blobUrl).play();
  } catch (e) {
    console.error('[TTS] Sarvam exception:', e);
    _speakBrowser(text);
  }
}

function _speakBrowser(text) {
  if (!window.speechSynthesis) return;
  const doSpeak = () => {
    const voices = speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(text);
    const best = voices.find(v => v.lang === 'te-IN')
              || voices.find(v => v.lang.startsWith('te'))
              || null;
    if (best) { utt.voice = best; utt.lang = best.lang; }
    else { utt.lang = 'te-IN'; }
    utt.rate = 0.8;
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  };
  const v = speechSynthesis.getVoices();
  if (v.length) doSpeak();
  else { speechSynthesis.onvoiceschanged = () => { doSpeak(); speechSynthesis.onvoiceschanged = null; }; }
}

export function launchConfetti() {
  const area = document.getElementById('confettiArea');
  if (!area) return;
  const colors = ['#D4A828', '#E53935', '#43A047', '#1E88E5', '#8B5CF6', '#F97316'];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `left:${Math.random() * 100}%;background:${pick(colors)};
      animation-delay:${Math.random() * .5}s;transform:rotate(${Math.random() * 360}deg)`;
    area.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}
