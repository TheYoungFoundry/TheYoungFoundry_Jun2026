import { state } from '../app.js';
import { showScreen } from '../router.js';
import { buildQuestions, preloadTopicData } from '../engines/quiz/quizEngine.js';
import { loadData } from '../data/loader.js';
import { speak } from '../utils.js';
import * as sessionModule from './session.js';

export const TOPICS = [
  {id:"vowels",         name:"అచ్చులు",          eng:"Vowels",           em:"అఆ", grades:[1,2,3],       level:"beg"},
  {id:"consonants",     name:"వ్యంజనాలు",        eng:"Consonants",       em:"కఖ", grades:[1,2,3],       level:"beg"},
  {id:"guninthalu",     name:"గుణింతాలు",        eng:"Guninthalu",       em:"కా", grades:[1,2,3],       level:"beg"},
  {id:"vatthulu",       name:"వత్తులు",          eng:"Vatthulu",         em:"క్", grades:[2,3],         level:"beg"},
  {id:"numbers",        name:"సంఖ్యలు",         eng:"Numbers",          em:"🔢", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"colors",         name:"రంగులు",           eng:"Colors",           em:"🎨", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"animals",        name:"జంతువులు",         eng:"Animals",          em:"🐘", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"birds",          name:"పక్షులు",          eng:"Birds",            em:"🦜", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"fruits",         name:"పండ్లు",           eng:"Fruits",           em:"🥭", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"bodyParts",      name:"శరీర భాగాలు",     eng:"Body Parts",       em:"👁️", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"weekdays",       name:"వారాలు-నెలలు",    eng:"Weekdays & Months", em:"📅", grades:[1,2,3,4,5,6], level:"beg"},
  {id:"vegetables",     name:"కూరగాయలు",        eng:"Vegetables",       em:"🥦", grades:[2,3,4,5,6],   level:"beg"},
  {id:"school",         name:"పాఠశాల",           eng:"School",           em:"🏫", grades:[2,3,4,5,6],   level:"beg"},
  {id:"nature",         name:"ప్రకృతి",          eng:"Nature",           em:"🌳", grades:[2,3,4,5,6],   level:"beg"},
  {id:"professions",    name:"వృత్తులు",         eng:"Professions",      em:"👷", grades:[2,3,4,5,6],   level:"int"},
  {id:"seasons",        name:"ఋతువులు",          eng:"Seasons",          em:"🌸", grades:[2,3,4,5,6],   level:"int"},
  {id:"festivals",      name:"పండుగలు",          eng:"Festivals",        em:"🪔", grades:[2,3,4,5,6],   level:"int"},
  {id:"jokes",          name:"పొడుపులు",          eng:"Puzzles",          em:"🧩", grades:[2,3,4,5,6],   level:"int"},
  {id:"emotions",       name:"భావాలు",           eng:"Emotions",         em:"😊", grades:[3,4,5,6],     level:"int"},
  {id:"genders",        name:"లింగాలు",          eng:"Genders",          em:"👨👩", grades:[3,4,5,6],   level:"int"},
  {id:"singularPluralQ",name:"ఏకవచనం-బహువచనం", eng:"Singular-Plural",   em:"1️⃣🔢",grades:[3,4,5,6],  level:"int"},
  {id:"adjectives",     name:"విశేషణాలు",        eng:"Adjectives",       em:"✨", grades:[3,4,5,6],     level:"adv"},
  {id:"verbs",          name:"క్రియలు",          eng:"Verbs",            em:"🏃", grades:[4,5,6],       level:"adv"},
  {id:"idioms",            name:"నానుడులు",            eng:"Idioms",              em:"💬", grades:[4,5,6],       level:"adv"},
  {id:"dwithvaksharalu",   name:"ద్విత్వాక్షరాలు",   eng:"Double Consonants",   em:"క్క", grades:[3,4,5],      level:"int"},
  {id:"samyukthaksharalu", name:"సంయుక్తాక్షరాలు",  eng:"Conjunct Consonants",  em:"క్ష", grades:[3,4,5],      level:"int"},
];

export const ACT_TYPES = [
  {id:"mcq",              name:"Multiple Choice",      grades:[1,2,3,4,5,6]},
  {id:"matching",         name:"Match the Meaning",    grades:[1,2,3,4,5,6]},
  {id:"vowelQ",           name:"Vowel Recognition",    grades:[1,2,3]},
  {id:"consonantQ",       name:"Consonant Quiz",       grades:[1,2,3]},
  {id:"guninthaluQ",      name:"Guninthalu",           grades:[1,2,3]},
  {id:"guninthamMatch",   name:"Gunintham Matching",   grades:[1,2,3]},
  {id:"vatthuQ",          name:"Vatthulu",             grades:[2,3]},
  {id:"genderQ",          name:"Genders",              grades:[3,4,5,6]},
  {id:"scrambledWord",    name:"Scrambled Word",       grades:[2,3,4,5,6]},
  {id:"singularPluralQ",  name:"Singular / Plural",    grades:[3,4,5,6]},
  {id:"synonymAntonym",   name:"Synonym / Antonym",    grades:[4,5,6]},
  {id:"idiomComplete",    name:"Idiom Meaning",        grades:[4,5,6]},
  {id:"sentenceFormation",name:"Sentence Formation",   grades:[2,3,4,5,6]},
  {id:"readingComp",      name:"Reading Comprehension",grades:[1,2,3,4,5,6]},
  {id:"extraWords",       name:"Pick Correct Words",   grades:[3,4,5,6]},
  {id:"scrambledSentence",name:"Scrambled Sentence",      grades:[4,5,6]},
  {id:"jokePuzzle",       name:"Riddles/Puzzles",        grades:[2,3,4,5,6]},
  {id:"dwithvaQ",         name:"Double Consonants",      grades:[3,4,5]},
  {id:"samyukthaQ",       name:"Conjunct Consonants",    grades:[3,4,5]}
];

const GRADE_ACTS = {
  1: ['mcq', 'matching', 'vowelQ', 'consonantQ', 'guninthaluQ', 'guninthamMatch', 'readingComp'],
  2: ['mcq', 'matching', 'vowelQ', 'consonantQ', 'guninthaluQ', 'guninthamMatch', 'vatthuQ', 'scrambledWord', 'sentenceFormation', 'readingComp', 'jokePuzzle'],
  3: ['mcq', 'matching', 'guninthaluQ', 'guninthamMatch', 'vatthuQ', 'scrambledWord', 'singularPluralQ', 'genderQ', 'sentenceFormation', 'extraWords', 'readingComp', 'jokePuzzle', 'dwithvaQ', 'samyukthaQ'],
  4: ['mcq', 'matching', 'genderQ', 'scrambledWord', 'singularPluralQ', 'synonymAntonym', 'idiomComplete', 'sentenceFormation', 'extraWords', 'scrambledSentence', 'readingComp', 'jokePuzzle', 'dwithvaQ', 'samyukthaQ'],
  5: ['mcq', 'matching', 'scrambledWord', 'singularPluralQ', 'synonymAntonym', 'idiomComplete', 'sentenceFormation', 'extraWords', 'scrambledSentence', 'readingComp', 'jokePuzzle', 'dwithvaQ', 'samyukthaQ'],
  6: ['mcq', 'matching', 'singularPluralQ', 'synonymAntonym', 'idiomComplete', 'sentenceFormation', 'extraWords', 'scrambledSentence', 'readingComp', 'jokePuzzle']
};

const GRADE_INFO = {
  1: { label:'Grade 1', level:'Beginner',     desc:'Vowels, consonants, basic words & MCQs', color:'#22c55e' },
  2: { label:'Grade 2', level:'Beginner',     desc:'Guninthalu, vatthulu, vocabulary & scrambled words', color:'#3b82f6' },
  3: { label:'Grade 3', level:'Intermediate', desc:'Plurals, genders, grammar & comprehension', color:'#f59e0b' },
  4: { label:'Grade 4', level:'Intermediate', desc:'Verbs, adjectives, sentences & idioms', color:'#a855f7' },
  5: { label:'Grade 5', level:'Advanced',     desc:'Idioms, synonyms, complex grammar & writing', color:'#ef4444' },
  6: { label:'Grade 6', level:'Advanced',     desc:'Full language mastery & composition', color:'#0ea5e9' }
};

const FILE_MAP = {
  numbers:'numbers', animals:'animals', birds:'birds', fruits:'fruits',
  vegetables:'vegetables', colors:'colors', bodyParts:'body-parts',
  professions:'professions', school:'school', seasons:'seasons',
  festivals:'festivals', weekdays:'weekdays-months', emotions:'emotions',
  verbs:'verbs', adjectives:'adjectives', nature:'nature', places:'places',
  vehicles:'vehicles', sentences:'sentences', idioms:'idioms',
  singularPluralQ:'singular-plural', months:'weekdays-months',
  consonants:'consonants', vowels:'vowels',
  guninthalu:'guninthalu', vatthulu:'vatthulu', genders:'genders',
  academicValues:'academic-values',
  jokes:'jokes-puzzles',
  dwithvaksharalu:'dwithvaksharalu', samyukthaksharalu:'samyukthaksharalu'
};

const GRADE_EMOJIS = { 1:'🌱', 2:'🌿', 3:'🌻', 4:'🌟', 5:'🔥', 6:'🏆' };

export function initSetup() {
  buildGradeCards();
  buildDurGrid();

  document.getElementById('hubBackBtn')?.addEventListener('click', showGradePick);
  document.getElementById('mixedBtn')?.addEventListener('click', startMixedPractice);
  document.getElementById('learnClose')?.addEventListener('click', closeLearnModal);
  document.getElementById('learnModal')?.addEventListener('click', e => {
    if (e.target.id === 'learnModal') closeLearnModal();
  });
}

function buildGradeCards() {
  const grid = document.getElementById('gradeCardsGrid');
  if (!grid) return;
  grid.innerHTML = [1,2,3,4,5,6].map(g => {
    const info = GRADE_INFO[g];
    const realCount = TOPICS.filter(t => t.grades.includes(g)).length;
    return `
      <div class="grade-big-card g${g}" data-grade="${g}">
        <div class="g-num">${GRADE_EMOJIS[g]}</div>
        <div class="g-label">${info.label}</div>
        <span class="g-level">${info.level}</span>
        <div class="g-desc">${info.desc}</div>
        <div class="g-topics">${realCount} topics · ${GRADE_ACTS[g].length} activity types</div>
      </div>`;
  }).join('');
  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-grade]');
    if (card) selectGrade(parseInt(card.dataset.grade));
  });
}

function buildDurGrid() {
  const el = document.getElementById('durGrid');
  if (!el) return;
  [10,15,20,30].forEach(d => {
    const btn = document.createElement('button');
    btn.className = 'dur-mini-btn' + (d === 15 ? ' sel' : '');
    btn.dataset.dur = d;
    btn.textContent = d + 'm';
    btn.addEventListener('click', () => {
      state.duration = d;
      el.querySelectorAll('.dur-mini-btn').forEach(b => b.classList.toggle('sel', b === btn));
    });
    el.appendChild(btn);
  });
  state.duration = 15;
}

export function selectGrade(g) {
  state.grade = g;
  const info = GRADE_INFO[g];

  const badge = document.getElementById('hubGradeBadge');
  const desc  = document.getElementById('hubGradeDesc');
  if (badge) badge.textContent = `${GRADE_EMOJIS[g]} ${info.label} — ${info.level}`;
  if (desc)  desc.textContent  = info.desc;

  document.getElementById('gradePickView').style.display  = 'none';
  document.getElementById('topicHubView').style.display   = 'block';

  buildTopicGrid(g);
  buildActivityHub(g);
}

function showGradePick() {
  document.getElementById('gradePickView').style.display  = 'block';
  document.getElementById('topicHubView').style.display   = 'none';
}

function buildTopicGrid(grade) {
  const grid = document.getElementById('topicGrid');
  if (!grid) return;

  const topics = TOPICS.filter(t => t.grades.includes(grade));
  grid.innerHTML = topics.map(t => `
    <div class="tcard">
      <div class="tcard-em">${t.em}</div>
      <div class="tcard-tel">${t.name}</div>
      <div class="tcard-eng">${t.eng}</div>
      <span class="tcard-lvl lvl-${t.level}">${t.level === 'beg' ? '🟢 Beginner' : t.level === 'int' ? '🟡 Medium' : '🔴 Advanced'}</span>
      <div class="tcard-btns">
        <button class="btn-l" data-topic="${t.id}" data-name="${t.name}" data-eng="${t.eng}">📖 Learn</button>
        <button class="btn-p" data-topic="${t.id}">🎯 Practice</button>
      </div>
    </div>
  `).join('');

  grid.addEventListener('click', e => {
    const lb = e.target.closest('.btn-l');
    const pb = e.target.closest('.btn-p');
    if (lb) openLearnModal(lb.dataset.topic, lb.dataset.name, lb.dataset.eng);
    if (pb) startTopicPractice(pb.dataset.topic);
  });
}

async function openLearnModal(topicId, name, eng) {
  const modal = document.getElementById('learnModal');
  const grid  = document.getElementById('learnGrid');
  const title = document.getElementById('learnTitle');
  if (!modal) return;

  title.textContent = `${name} — ${eng}`;
  grid.innerHTML = '<div class="lm-msg">⏳ Loading vocabulary…</div>';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  try {
    const file = FILE_MAP[topicId] || topicId;
    const raw  = await loadData(file);
    let html = '';

    if (topicId === 'vowels') {
      const vowels = raw.vowels || [];
      const marks  = raw.marks  || {};
      html = vowels.map(v => `
        <div class="vc" data-speak="${v}">
          <button class="speak-btn" data-speak="${v}" title="Listen">🔊</button>
          <div class="vc-em" style="font-size:2rem">${v}</div>
          <div class="vc-tel">గుర్తు: ${marks[v] || '–'}</div>
          <div class="vc-eng">Vowel (అచ్చు)</div>
        </div>`).join('');
    } else if (topicId === 'consonants') {
      const gData = await loadData('guninthalu');
      grid.innerHTML = `
        <div id="lm-cons-list">
          <p style="font-size:.82rem;color:#6B7280;margin-bottom:12px">అన్ని వ్యంజనాలు — Click any consonant to see its guninthalu (🔊 to hear)</p>
          <div class="cons-grid">${raw.map(c => `<button class="cons-btn" data-c="${c.c}">${c.c}</button>`).join('')}</div>
        </div>
        <div id="lm-gun-view" style="display:none">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <button id="lm-gun-back">← అన్ని వ్యంజనాలు</button>
            <h4 id="lm-gun-title" style="margin:0;font-family:'Fredoka One';font-size:1.1rem;color:#0F1D32"></h4>
          </div>
          <div class="gun-table" id="lm-gun-table"></div>
        </div>`;
      grid.addEventListener('click', e => {
        if (e.target.id === 'lm-gun-back') {
          document.getElementById('lm-cons-list').style.display = '';
          document.getElementById('lm-gun-view').style.display = 'none';
          return;
        }
        if (e.target.classList.contains('speak-btn') || e.target.dataset.speak) {
          speak(e.target.dataset.speak || e.target.closest('[data-speak]')?.dataset.speak || '');
          return;
        }
        const btn = e.target.closest('.cons-btn');
        if (!btn) return;
        speak(btn.dataset.c);
        const c = btn.dataset.c;
        const forms = (gData.guninthaluTable || {})[c] || [];
        const words = (gData.wordBank || {})[c] || [];
        document.getElementById('lm-cons-list').style.display = 'none';
        document.getElementById('lm-gun-view').style.display = '';
        document.getElementById('lm-gun-title').textContent = `"${c}" గుణింతాలు`;
        document.getElementById('lm-gun-table').innerHTML = forms.map((form, i) =>
          `<div class="gun-cell" data-speak="${form}">
             <div class="gun-form">${form} <button class="speak-btn-sm" data-speak="${form}">🔊</button></div>
             <div class="gun-word">${words[i] || ''}</div>
           </div>`
        ).join('');
      });
      return;
    } else if (topicId === 'guninthalu') {
      const gData = raw;
      const cons = Object.keys(gData.guninthaluTable || {});
      grid.innerHTML = `
        <div id="lm-gun-pick">
          <p style="font-size:.82rem;color:#6B7280;margin-bottom:12px">వ్యంజనం ఎంచుకొండి — Choose a consonant to see its guninthalu</p>
          <div class="cons-grid">${cons.map(c => `<button class="cons-btn" data-c="${c}">${c}</button>`).join('')}</div>
        </div>
        <div id="lm-gun-detail" style="display:none">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <button id="lm-gun-pick-back">← అన్ని వ్యంజనాలు</button>
            <h4 id="lm-gun-detail-title" style="margin:0;font-family:'Fredoka One';font-size:1.1rem;color:#0F1D32"></h4>
          </div>
          <div class="gun-table" id="lm-gun-detail-table"></div>
        </div>`;
      grid.addEventListener('click', e => {
        if (e.target.id === 'lm-gun-pick-back') {
          document.getElementById('lm-gun-pick').style.display = '';
          document.getElementById('lm-gun-detail').style.display = 'none';
          return;
        }
        if (e.target.classList.contains('speak-btn-sm') || e.target.classList.contains('speak-btn')) {
          speak(e.target.dataset.speak || '');
          return;
        }
        const btn = e.target.closest('.cons-btn');
        if (!btn) return;
        speak(btn.dataset.c);
        const c = btn.dataset.c;
        const forms = (gData.guninthaluTable || {})[c] || [];
        const words = (gData.wordBank || {})[c] || [];
        document.getElementById('lm-gun-pick').style.display = 'none';
        document.getElementById('lm-gun-detail').style.display = '';
        document.getElementById('lm-gun-detail-title').textContent = `"${c}" గుణింతాలు`;
        document.getElementById('lm-gun-detail-table').innerHTML = forms.map((form, i) =>
          `<div class="gun-cell" data-speak="${form}">
             <div class="gun-form">${form} <button class="speak-btn-sm" data-speak="${form}">🔊</button></div>
             <div class="gun-word">${words[i] || ''}</div>
           </div>`
        ).join('');
      });
      return;
    } else if (topicId === 'vatthulu') {
      html = raw.map(v => `
        <div class="vc" data-speak="${v.vatthu}">
          <button class="speak-btn" data-speak="${v.vatthu}" title="Listen">🔊</button>
          <div class="vc-em" style="font-size:2rem">${v.vatthu}</div>
          <div class="vc-tel">${(v.words || []).slice(0,2).join(', ')}</div>
          <div class="vc-eng">వత్తు (Half-consonant)</div>
        </div>`).join('');
    } else if (topicId === 'genders') {
      html = raw.map(g => `
        <div class="vc" data-speak="${g.m}">
          <button class="speak-btn" data-speak="${g.m}" title="Listen">🔊</button>
          <div class="vc-em">${g.em || '👤'}</div>
          <div class="vc-tel">${g.m} / ${g.f}</div>
          <div class="vc-eng">${g.ee}</div>
        </div>`).join('');
    } else if (topicId === 'dwithvaksharalu') {
      const dwithva = raw.dwithva || {};
      html = Object.entries(dwithva).map(([combo, words]) => `
        <div class="vc" data-speak="${combo}">
          <button class="speak-btn" data-speak="${combo}" title="Listen">🔊</button>
          <div class="vc-em" style="font-size:2rem">${combo}</div>
          <div class="vc-tel">${words.slice(0,3).join(', ')}</div>
          <div class="vc-eng">Double Consonant</div>
        </div>`).join('');
    } else if (topicId === 'samyukthaksharalu') {
      const groups = raw.groups || [];
      html = groups.map(g => `
        <div class="vc" data-speak="${g.combo}">
          <button class="speak-btn" data-speak="${g.combo}" title="Listen">🔊</button>
          <div class="vc-em" style="font-size:2rem">${g.combo}</div>
          <div class="vc-tel">${(g.words || []).slice(0,3).join(', ')}</div>
          <div class="vc-eng">${g.pronunciation}</div>
        </div>`).join('');
    } else {
      let items = Array.isArray(raw)    ? raw
                : raw.weekdays          ? [...raw.weekdays, ...(raw.months || [])]
                : [];
      items = items.filter(d => d.t && d.e).slice(0, 60);
      html = items.map(it => `
        <div class="vc" data-speak="${it.t}">
          <button class="speak-btn" data-speak="${it.t}" title="Listen">🔊</button>
          ${it.em ? `<div class="vc-em">${it.em}</div>` : ''}
          <div class="vc-tel">${it.t}</div>
          <div class="vc-eng">${it.e}</div>
        </div>`).join('');
    }

    if (!html) {
      grid.innerHTML = '<div class="lm-msg">No vocabulary available for this topic.</div>';
      return;
    }
    grid.innerHTML = html;
    grid.querySelectorAll('.speak-btn').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); speak(btn.dataset.speak); })
    );
  } catch {
    grid.innerHTML = '<div class="lm-msg" style="color:#E53935">Could not load vocabulary.</div>';
  }
}

function closeLearnModal() {
  const modal = document.getElementById('learnModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

async function launch(topicIds, durationMin, actsOverride) {
  const grade = state.grade || 1;
  const acts  = actsOverride || GRADE_ACTS[grade] || GRADE_ACTS[1];
  state.selectedTopics = topicIds;
  state.selectedActs   = acts;
  state.duration       = durationMin;

  try {
    state.questions = await buildQuestions(grade, topicIds, acts, durationMin, TOPICS, ACT_TYPES);
  } catch (e) {
    console.error(e);
    state.questions = [];
  }

  if (!state.questions.length) {
    alert('No questions available. Please try a different grade or topic.');
    return;
  }

  state.qIndex = 0; state.correct = 0; state.wrong = 0; state.scrambleSelected = [];
  showScreen('screenSession');
  document.getElementById('backBtn').style.display = 'block';
  sessionModule.startSessionTimer();
  sessionModule.renderQuestion();
  sessionModule.startQTimer();
}

const TOPIC_ACT_OVERRIDE = {
  jokes:  ['jokePuzzle'],
  idioms: ['idiomComplete'],
};

export async function startTopicPractice(topicId) {
  if (!state.grade) { alert('Please select a grade first!'); return; }
  await preloadTopicData([topicId]);
  await launch([topicId], 10, TOPIC_ACT_OVERRIDE[topicId] || null);
}

export async function startMixedPractice() {
  if (!state.grade) { alert('Please select a grade first!'); return; }
  const all = TOPICS.filter(t => t.grades.includes(state.grade)).map(t => t.id);
  await preloadTopicData(all);
  await launch(all, state.duration);
}

const ACTIVITY_META = [
  { id:'mcq',              icon:'❓', name:'MCQ Quiz',         desc:'4-option Telugu/English' },
  { id:'matching',         icon:'🔗', name:'Match Meaning',    desc:'Find the correct pair' },
  { id:'vowelQ',           icon:'అ',  name:'Vowels',           desc:'Identify vowels & matras' },
  { id:'consonantQ',       icon:'క',  name:'Consonants',       desc:'Consonant recognition' },
  { id:'guninthaluQ',      icon:'కా', name:'Guninthalu',       desc:'Vowel+consonant combos' },
  { id:'guninthamMatch',   icon:'కి', name:'Gunintham Match',  desc:'Combine letter + matra' },
  { id:'vatthuQ',          icon:'క్', name:'Vatthulu',         desc:'Half-consonant words' },
  { id:'genderQ',          icon:'👥', name:'Genders',          desc:'Masculine & feminine' },
  { id:'singularPluralQ',  icon:'🔢', name:'Singular/Plural',  desc:'ఏకవచనం-బహువచనం' },
  { id:'synonymAntonym',   icon:'⇔️', name:'Syn/Antonym',      desc:'Similar & opposite words' },
  { id:'idiomComplete',    icon:'💬', name:'Idioms',           desc:'నానుడులు meanings' },
  { id:'scrambledWord',    icon:'🔀', name:'Scramble Word',    desc:'Arrange letters' },
  { id:'scrambledSentence',icon:'📝', name:'Scramble Sentence',desc:'Arrange words' },
  { id:'sentenceFormation',icon:'✍️', name:'Sentence',         desc:'Complete the sentence' },
  { id:'readingComp',      icon:'📖', name:'Read & Answer',    desc:'Passage comprehension' },
  { id:'extraWords',       icon:'🎯', name:'Pick Words',       desc:'Choose correct words' },
  { id:'jokePuzzle',       icon:'🧩', name:'Riddles',           desc:'Telugu puzzles fun' },
  { id:'dwithvaQ',         icon:'క్క', name:'Double Cons.',    desc:'ద్విత్వాక్షరాలు' },
  { id:'samyukthaQ',       icon:'క్ష', name:'Conjunct Cons.',  desc:'సంయుక్తాక్షరాలు' },
];

function buildActivityHub(grade) {
  const hub = document.getElementById('activityHub');
  const row = document.getElementById('activityCardsRow');
  if (!row) return;
  if (hub) hub.classList.add('visible');
  const gradeActs = GRADE_ACTS[grade] || [];
  const validActs = ACT_TYPES.filter(a => gradeActs.includes(a.id) && a.grades.includes(grade));
  row.innerHTML = validActs.map(a => {
    const meta = ACTIVITY_META.find(m => m.id === a.id) || { icon:'🎯', name:a.name, desc:'' };
    return `<div class="act-card" data-act="${a.id}">
      <div class="act-card-icon">${meta.icon}</div>
      <div class="act-card-name">${meta.name}</div>
      <div class="act-card-desc">${meta.desc}</div>
    </div>`;
  }).join('');
  const fresh = row.cloneNode(false);
  fresh.innerHTML = row.innerHTML;
  row.replaceWith(fresh);
  fresh.addEventListener('click', e => {
    const card = e.target.closest('[data-act]');
    if (card) startActivityPractice(card.dataset.act);
  });
}

export async function startActivityPractice(actId) {
  if (!state.grade) return;
  const all = TOPICS.filter(t => t.grades.includes(state.grade)).map(t => t.id);
  const clicked = document.querySelector(`[data-act="${actId}"]`);
  if (clicked) { clicked.style.opacity = '0.5'; clicked.style.pointerEvents = 'none'; }
  await preloadTopicData(all);
  await launch(all, state.duration || 15, [actId]);
  if (clicked) { clicked.style.opacity = ''; clicked.style.pointerEvents = ''; }
}
