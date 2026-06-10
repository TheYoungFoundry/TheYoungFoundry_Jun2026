import { state } from '../app.js';
import { showScreen } from '../router.js';
import { launchConfetti, speak } from '../utils.js';
import { saveSession } from '../engines/dashboard/dashboardEngine.js';

let scrambleItems = [];

export function renderQuestion() {
  if (state.qIndex >= state.questions.length) { endSession(); return; }
  state.answered = false;
  state.scrambleSelected = [];
  scrambleItems = [];

  const q = state.questions[state.qIndex];
  const total = state.questions.length;
  const pct = (state.qIndex / total * 100).toFixed(0);

  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('qCounter').textContent = (state.qIndex + 1) + '/' + total;

  const card = document.getElementById('questionCard');
  let html = `
    <span class="q-type-badge">${q.typeName || q.type}</span>
    <span class="q-topic-badge">${q.topic}</span>
    <div class="q-text">${q.question} <button class="speak-q-btn" title="Listen to question">🔊</button></div>
    <div class="q-hint">${q.hint || ''}</div>
  `;

  if (q.type === 'readingComp') {
    html += `<div class="passage-box">${q.passage}<div class="passage-eng">${q.passageEng || ''}</div></div>`;
    html += `<div class="options-grid">` +
      q.options.map(o =>
        `<button class="opt-btn" data-opt="${encodeURIComponent(o)}">${o}</button>`
      ).join('') + `</div>`;
  } else if (q.type === 'mcq' || q.type === 'matching') {
    if (q.type === 'matching') {
      html += `<div class="match-note">💡 పై పదానికి సరైన జతను ఎంచుకొండి (Pick the correct match)</div>`;
    }
    html += `<div class="options-grid">` +
      q.options.map(o =>
        `<button class="opt-btn" data-opt="${encodeURIComponent(o)}">${o}</button>`
      ).join('') + `</div>`;
  } else if (q.type === 'scrambledWord') {
    const letterBtns = q.letters.map((l, i) =>
      `<span class="chip" data-idx="${i}">${l}</span>`
    ).join('');
    html += `
      <div class="answer-slots" id="answerSlots"></div>
      <div class="word-chips">${letterBtns}</div>
      <div class="chip-actions">
        <button class="submit-btn" id="scrambleSubmit">✓ సమర్పించు</button>
        <button class="clear-btn" id="scrambleClear">↺ Clear</button>
      </div>`;
  } else if (q.type === 'scrambledSentence') {
    const wordBtns = q.words.map((w, i) =>
      `<span class="chip" data-widx="${i}">${w}</span>`
    ).join('');
    html += `
      <div class="answer-slots" id="answerSlots"></div>
      <div class="word-chips">${wordBtns}</div>
      <div class="chip-actions">
        <button class="submit-btn" id="sentenceSubmit">✓ సమర్పించు</button>
        <button class="clear-btn" id="scrambleClear">↺ Clear</button>
      </div>`;
  } else if (q.type === 'extraWords') {
    const wordBtns = q.wordBank.map((w, i) =>
      `<span class="chip" data-widx="${i}">${w}</span>`
    ).join('');
    html += `
      <div class="answer-slots" id="answerSlots"></div>
      <div class="word-chips">${wordBtns}</div>
      <div class="chip-actions">
        <button class="submit-btn" id="extraWordsSubmit">✓ సమర్పించు</button>
        <button class="clear-btn" id="scrambleClear">↺ Clear</button>
      </div>`;
  } else {
    html += `<div class="options-grid"><button class="opt-btn" data-opt="${encodeURIComponent(q.answer)}">${q.answer}</button></div>`;
  }

  html += `
    <div class="feedback" id="feedbackBox"></div>
    <button class="next-btn" id="nextBtn">తదుపరి ప్రశ్న →</button>
  `;
  card.innerHTML = html;

  card.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => checkMCQ(btn, decodeURIComponent(btn.dataset.opt), q.answer));
  });
  card.querySelector('.speak-q-btn')?.addEventListener('click', () => speak(q.question));
  setTimeout(() => speak(q.question), 400);
  card.querySelector('#scrambleSubmit')?.addEventListener('click', checkScramble);
  card.querySelector('#sentenceSubmit')?.addEventListener('click', checkSentence);
  card.querySelector('#extraWordsSubmit')?.addEventListener('click', checkExtraWords);
  card.querySelector('#scrambleClear')?.addEventListener('click', clearScramble);
  card.querySelector('#nextBtn')?.addEventListener('click', nextQuestion);
  card.querySelectorAll('.chip[data-idx]')?.forEach(el =>
    el.addEventListener('click', () => addLetter(el, el.textContent, parseInt(el.dataset.idx)))
  );
  card.querySelectorAll('.chip[data-widx]')?.forEach(el =>
    el.addEventListener('click', () => addWord(el, el.textContent, parseInt(el.dataset.widx)))
  );

  document.getElementById('teluguKeyboard')?.classList.remove('show');

  const cfg = (window.TeluguVeluguConfig || {}).openai;
  const aiBtn = document.getElementById('aiHintBtn');
  if (aiBtn) aiBtn.className = cfg?.apiKey ? 'ai-hint-btn visible' : 'ai-hint-btn';
  const aiText = document.getElementById('aiHintText');
  if (aiText) aiText.className = 'ai-hint-text';
}

function addLetter(el, char, idx) {
  if (el.classList.contains('used')) return;
  el.classList.add('used');
  scrambleItems.push({ text: char, srcIdx: idx, isWord: false });
  renderSlots();
}

function addWord(el, word, idx) {
  if (el.classList.contains('used')) return;
  el.classList.add('used');
  scrambleItems.push({ text: word, srcIdx: idx, isWord: true });
  renderSlots();
}

function renderSlots() {
  const slotsEl = document.getElementById('answerSlots');
  if (!slotsEl) return;
  slotsEl.innerHTML = scrambleItems.map((item, i) =>
    `<span class="slot-chip" data-slot="${i}">${item.text}</span>`
  ).join('');
  slotsEl.querySelectorAll('[data-slot]').forEach(el =>
    el.addEventListener('click', () => removeSlot(parseInt(el.dataset.slot)))
  );
}

function removeSlot(i) {
  const item = scrambleItems[i];
  scrambleItems.splice(i, 1);
  renderSlots();
  const chips = document.querySelectorAll(item.isWord ? '[data-widx]' : '[data-idx]');
  chips.forEach(c => {
    const id = item.isWord ? c.dataset.widx : c.dataset.idx;
    if (parseInt(id) === item.srcIdx) c.classList.remove('used');
  });
}

function clearScramble() {
  scrambleItems = [];
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('used'));
  renderSlots();
}

function checkExtraWords() {
  const q = state.questions[state.qIndex];
  const selected = scrambleItems.map(x => x.text);
  const correct = q.correctWords &&
    selected.length === q.correctWords.length &&
    q.correctWords.every(w => selected.includes(w));
  checkCorrect(correct, selected.join(' '), q.correctWords?.join(' ') || q.answer);
}

function checkScramble() {
  const q = state.questions[state.qIndex];
  checkCorrect(scrambleItems.map(x => x.text).join('') === q.answer,
    scrambleItems.map(x => x.text).join(''), q.answer);
}

function checkSentence() {
  const q = state.questions[state.qIndex];
  const typed = scrambleItems.map(x => x.text).join(' ');
  const norm = s => s.trim().replace(/\s+/g, ' ');
  checkCorrect(norm(typed) === norm(q.answer), typed, q.answer);
}

function checkMCQ(btn, selected, answer) {
  if (state.answered) return;
  state.answered = true;
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
  if (selected === answer) {
    btn.classList.add('correct');
    checkCorrect(true);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.opt-btn').forEach(b => {
      if (decodeURIComponent(b.dataset.opt) === answer) b.classList.add('correct');
    });
    checkCorrect(false, selected, answer);
  }
}


function checkCorrect(isCorrect, given, expected) {
  state.answered = true;
  if (isCorrect) {
    state.correct++;
    const s = document.getElementById('scoreDisplay');
    if (s) s.textContent = state.correct;
  } else {
    state.wrong++;
    const w = document.getElementById('wrongDisplay');
    if (w) w.textContent = state.wrong;
  }
  const fb = document.getElementById('feedbackBox');
  if (fb) {
    fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'wrong');
    const q = state.questions[state.qIndex];
    const engHint = q?.engAnswer
      ? `<div style="font-size:.85rem;margin-top:6px;color:#1d4ed8">📘 ${q.engAnswer}</div>`
      : '';
    fb.innerHTML = isCorrect
      ? `✅ చాలా బాగు! సరైన సమాధానం! 🎉${engHint}`
      : `❌ సరైన సమాధానం: <strong>${expected || ''}</strong>${engHint}`;
  }
  const nb = document.getElementById('nextBtn');
  if (nb) nb.className = 'next-btn show';
  if (isCorrect && state.correct % 5 === 0) launchConfetti();
  stopQTimer();
}

function nextQuestion() {
  state.qIndex++;
  scrambleItems = [];
  if (state.qIndex >= state.questions.length) { endSession(); return; }
  renderQuestion();
  startQTimer();
}

export function startQTimer() {
  stopQTimer();
  const grade = state.grade;
  state.qTimerSecs = grade <= 2 ? 45 : grade <= 4 ? 35 : 30;
  const max = state.qTimerSecs;
  const circ = 2 * Math.PI * 26;

  state.qTimerInterval = setInterval(() => {
    state.qTimerSecs--;
    const pct = state.qTimerSecs / max;
    const offset = circ * (1 - pct);
    const ring = document.getElementById('timerRing');
    const disp = document.getElementById('timerDisplay');
    if (ring) {
      ring.style.strokeDashoffset = offset;
      ring.style.stroke = state.qTimerSecs <= 10 ? '#E53935' : '#D4A828';
    }
    if (disp) disp.textContent = state.qTimerSecs;
    if (state.qTimerSecs <= 0) {
      if (!state.answered) checkCorrect(false, '', state.questions[state.qIndex]?.answer || '');
      setTimeout(nextQuestion, 1200);
    }
  }, 1000);
}

export function stopQTimer() {
  clearInterval(state.qTimerInterval);
}

export function startSessionTimer() {
  clearInterval(state.timerInterval);
  state.timerSecs = state.duration * 60;
  state.timerMax  = state.timerSecs;
  state.timerInterval = setInterval(() => {
    state.timerSecs--;
    if (state.timerSecs <= 0) { clearInterval(state.timerInterval); endSession(); }
  }, 1000);
}

function endSession() {
  stopQTimer();
  clearInterval(state.timerInterval);
  document.getElementById('backBtn').style.display = 'none';

  const total = state.correct + state.wrong;
  const pct   = total > 0 ? Math.round(state.correct / total * 100) : 0;

  document.getElementById('scoreCircle').textContent = pct + '%';
  document.getElementById('rb_correct').textContent  = state.correct;
  document.getElementById('rb_wrong').textContent    = state.wrong;
  document.getElementById('rb_total').textContent    = total;

  let title, msg;
  if (pct >= 90)      { title = '🌟 అద్భుతం! చాలా బాగు!'; msg = 'Excellent! Keep it up! 🎉'; }
  else if (pct >= 70) { title = '👍 బాగా చేసారు!';        msg = 'Good job! Practice more! 💪'; }
  else if (pct >= 50) { title = '😊 ప్రయత్నించండి!';      msg = 'Keep trying! You can do it! 🌱'; }
  else                { title = '📚 ఇంకా చదవాలి!';        msg = 'Study more and try again! 📖'; }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent   = msg;

  const uniqueTopics = [...new Set(state.questions.map(q => q.topic))];
  document.getElementById('topicBadges').innerHTML = uniqueTopics
    .map(t => `<span class="topic-perf-badge" style="background:#f3f4f6;color:var(--navy)">${t}</span>`)
    .join('');

  if (pct >= 70) launchConfetti();
  showScreen('screenResults');
  saveSession(state);
}

export async function getAIHint() {
  const cfg = (window.TeluguVeluguConfig || {}).openai;
  if (!cfg?.apiKey) return;
  const q = state.questions[state.qIndex];
  if (!q) return;

  const textEl = document.getElementById('aiHintText');
  if (textEl) { textEl.className = 'ai-hint-text show'; textEl.textContent = '⏳ Loading hint...'; }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.apiKey },
      body: JSON.stringify({
        model: cfg.model || 'gpt-4o-mini',
        max_tokens: 80,
        messages: [
          { role: 'system', content: 'You are a friendly Telugu tutor helping Grade 1-6 kids. Give a short helpful hint (1-2 sentences) in simple Telugu + English. Be encouraging.' },
          { role: 'user',   content: `Question: ${q.question}\nAnswer context: ${q.hint}\nGive a brief hint:` }
        ]
      })
    });
    const json = await res.json();
    const hint = json.choices?.[0]?.message?.content;
    if (textEl && hint) textEl.textContent = hint;
  } catch (e) {
    if (textEl) textEl.textContent = 'Hint not available.';
  }
}
