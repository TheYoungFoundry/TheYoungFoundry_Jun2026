import { loadData } from '../../data/loader.js';
import { pick, shuffle, makeOptions, scrambleWord } from '../../utils.js';

// ─── Data helpers ─────────────────────────────────────────────────────────────────────

const FILE_MAP = {
  numbers:'numbers', animals:'animals', birds:'birds', fruits:'fruits',
  vegetables:'vegetables', colors:'colors', bodyParts:'body-parts',
  professions:'professions', school:'school', seasons:'seasons',
  festivals:'festivals', weekdays:'weekdays-months', emotions:'emotions',
  verbs:'verbs', adjectives:'adjectives', nature:'nature',
  places:'places', vehicles:'vehicles', academicValues:'academic-values',
  sentences:'sentences', idioms:'idioms',
  singularPluralQ:'singular-plural', months:'weekdays-months',
  consonants:'consonants', vowels:'vowels', guninthalu:'guninthalu',
  vatthulu:'vatthulu', genders:'genders',
  jokes:'jokes-puzzles',
  dwithvaksharalu:'dwithvaksharalu', samyukthaksharalu:'samyukthaksharalu'
};

async function getItems(topicId) {
  const file = FILE_MAP[topicId] || topicId;
  const raw = await loadData(file);
  if (Array.isArray(raw)) return raw.filter(d => d.t && d.e);
  if (raw.weekdays) return [...raw.weekdays, ...(raw.months || [])].filter(d => d.t && d.e);
  return [];
}

function mcq(topic, typeName, question, hint, options, answer, engAnswer) {
  return { type: 'mcq', topic, typeName, question, hint, options: makeOptions(answer, options), answer, engAnswer };
}

// ─── MCQ (Telugu ↔ English) ───────────────────────────────────────────────────────────────────────────────

export async function genMCQ(topic, grade) {
  const data = await getItems(topic.id);
  if (data.length < 4) return null;
  const item = pick(data);
  if (Math.random() > .4) {
    return mcq(topic.name, 'అర్థం చెప్పండి',
      item.em ? `${item.em} ${item.t}` : item.t,
      'దీని ఆంగ్ల అర్థం ఏమిటి? (English meaning?)',
      data.map(d => d.e), item.e, `English: ${item.e}`);
  }
  return mcq(topic.name, 'తెలుగు పదం',
    item.em ? `${item.em} ${item.e}` : item.e,
    'దీని తెలుగు అర్థం ఏమిటి?',
    data.map(d => d.t), item.t, `తెలుగు: ${item.t}`);
}

// ─── Match the Word ─────────────────────────────────────────────────────────────────────────────────────
// Returns a type:'matching' question — 4 pairs shown, one highlighted

export async function genMatching(topic, grade) {
  const data = await getItems(topic.id);
  if (data.length < 4) return null;
  const pairs = shuffle([...data]).slice(0, 4);
  const target = pick(pairs);
  return {
    type: 'matching', topic: topic.name, typeName: 'జత కలపండి (Match)',
    question: `"${target.t}" — దీనికి సరైన అర్థం ఏమిటి?`,
    hint: `Match the Telugu word with its meaning`,
    pairs,
    answer: target.e,
    options: pairs.map(p => p.e),
    engAnswer: `${target.t} = ${target.e}`
  };
}

// ─── Vowel Quiz ────────────────────────────────────────────────────────────────────────────────────────

export async function genVowelQ(topic, grade) {
  const raw = await loadData('vowels');
  const vowels = raw.vowels || [];
  if (!vowels.length) return null;
  const marks = raw.marks || {};
  const pairs = vowels.map(v => ({ v, mark: marks[v] || '–' }));
  const item = pick(pairs);

  if (Math.random() > .5) {
    const opts = pairs.map(p => p.v);
    return mcq(topic.name, 'అచ్చు గుర్తించు',
      `ఈ గుర్తు (matra) ఏ అచ్చుకు చెందినది? → "${item.mark || '(no mark)'}"`,
      `Telugu vowel mark / matra`,
      opts, item.v, `Vowel: ${item.v}, Matra: ${item.mark || 'none'}`);
  }
  const opts = pairs.map(p => p.mark || '(none)');
  const answer = item.mark || '(none)';
  return mcq(topic.name, 'గుర్తు చెప్పండి',
    `"${item.v}" — దీని గుణింత గుర్తు (matra) ఏమిటి?`,
    `Vowel mark for ${item.v}`,
    opts, answer, `${item.v} → matra: ${answer}`);
}

// ─── Consonant Quiz ───────────────────────────────────────────────────────────────────────────────────

export async function genConsonantQ(topic, grade) {
  const data = await loadData('consonants');
  if (!data.length) return null;
  const item = pick(data);
  const allConsonants = data.map(d => d.c);

  if (Math.random() > .5 && item.words?.length) {
    const wordOpts = data.filter(d => d.words?.length).map(d => pick(d.words));
    const answer = pick(item.words);
    return mcq(topic.name, 'వ్యంజనం',
      `"${item.c}" తో మొదలయ్యే పదం ఏది?`,
      `Which word starts with this consonant?`,
      wordOpts, answer, `${item.c} → ${answer}`);
  }
  const word = pick(item.words || [item.c]);
  return mcq(topic.name, 'మొదటి అక్షరం',
    `"${word}" — ఈ పదం ఏ వ్యంజనంతో మొదలవుతుంది?`,
    `Which consonant starts this word?`,
    allConsonants, item.c, `${word} starts with ${item.c}`);
}

// ─── Guninthalu (Vowel+Consonant combos) ────────────────────────────────────────────────────────────

export async function genGuninthaluQ(topic, grade) {
  const raw = await loadData('guninthalu');
  const wordBank = raw.wordBank || {};
  const cons = Object.keys(wordBank).filter(c => wordBank[c]?.length >= 2);
  if (!cons.length) return null;

  const c = pick(cons);
  const words = wordBank[c];
  const answer = pick(words);

  const wrongWords = shuffle(
    Object.values(wordBank).flat().filter(w => !wordBank[c].includes(w))
  ).slice(0, 3);

  return mcq(topic.name, 'గుణింతం గుర్తించు',
    `"${c}" తో మొదలయ్యే పదం ఏది?`,
    `Find a word starting with the gunintham "${c}"`,
    [...wrongWords, answer], answer,
    `${c} → ${answer}`);
}

// ─── Gunintham matching (find matching gunintham for a word) ──────────────────────────────────────────────

export async function genGuninthamMatch(topic, grade) {
  const raw = await loadData('guninthalu');
  const vowels = raw.vowels || [];
  const marks = raw.marks || {};
  const wordBank = raw.wordBank || {};
  const cons = Object.keys(wordBank).filter(c => wordBank[c]?.length);
  if (!cons.length || !vowels.length) return null;

  const c = pick(cons);
  const v = pick(vowels.filter(x => marks[x]));
  const mark = marks[v];
  const combo = c + mark;

  const words = (wordBank[c] || []).filter(w => w.startsWith(combo));
  const example = words.length ? pick(words) : combo;

  const allCombos = vowels.filter(x => marks[x]).map(x => c + marks[x]).slice(0, 8);
  const opts = shuffle(allCombos).slice(0, 4);
  if (!opts.includes(combo)) { opts[0] = combo; }

  return mcq(topic.name, 'గుణింతం కలపండి',
    `"${c}" + "${v}" = ?`,
    `Combine the consonant with the vowel mark (${example})`,
    opts, combo, `${c} + ${v} = ${combo}`);
}

// ─── Vatthulu ─────────────────────────────────────────────────────────────────────────────────────────

export async function genVatthuQ(topic, grade) {
  const data = await loadData('vatthulu');
  const items = data.filter(d => d.words?.length);
  if (!items.length) return null;
  const item = pick(items);
  const word = pick(item.words);
  const allWords = items.flatMap(d => d.words || []);
  const wrongWords = shuffle(allWords.filter(w => !item.words.includes(w))).slice(0, 3);
  return mcq(topic.name, 'వత్తు గుర్తించు',
    `"${item.vatthu}" వత్తు ఉన్న పదం ఏది?`,
    `Which word contains the half-consonant "${item.vatthu}"?`,
    [...wrongWords, word], word, `${item.vatthu} → ${word}`);
}

// ─── Genders ─────────────────────────────────────────────────────────────────────────────────────

export async function genGenderQ(topic, grade) {
  const data = await loadData('genders');
  if (data.length < 4) return null;
  const item = pick(data);
  if (Math.random() > .5) {
    return mcq(topic.name, 'స్త్రీలింగం (Feminine)',
      `${item.em || ''} "${item.m}" — ఆడ రూపం ఏమిటి?`,
      `${item.ee} — What is the feminine form?`,
      data.map(d => d.f), item.f, `Feminine: ${item.f}`);
  }
  return mcq(topic.name, 'పుంలింగం (Masculine)',
    `${item.em || ''} "${item.f}" — మగ రూపం ఏమిటి?`,
    `${item.ee} — What is the masculine form?`,
    data.map(d => d.m), item.m, `Masculine: ${item.m}`);
}

// ─── Singular ↔ Plural ───────────────────────────────────────────────────────────────────────────────────

export async function genSingularPlural(topic, grade) {
  const data = await loadData('singular-plural');
  if (data.length < 4) return null;
  const item = pick(data);
  if (Math.random() > .5) {
    return mcq(topic.name, 'బహువచనం',
      `"${item.s}" — బహువచనం (plural) ఏమిటి?`,
      `Make it plural (${item.e})`,
      data.map(d => d.p), item.p, `Plural: ${item.p}`);
  }
  return mcq(topic.name, 'ఏకవచనం',
    `"${item.p}" — ఏకవచనం (singular) ఏమిటి?`,
    `Make it singular (${item.e})`,
    data.map(d => d.s), item.s, `Singular: ${item.s}`);
}

// ─── Synonym / Antonym ───────────────────────────────────────────────────────────────────────────────

export async function genSynonymAntonym(topic, grade) {
  const file = FILE_MAP[topic.id] || 'adjectives';
  const allData = await loadData(file.includes('/') ? 'adjectives' : file);
  const pool = (Array.isArray(allData) ? allData : []).filter(d => d.syn && d.ant);
  if (pool.length < 4) {
    const adj = await loadData('adjectives');
    const p2 = adj.filter(d => d.syn && d.ant);
    if (p2.length < 4) return null;
    return _buildSynAnt(p2, topic.name);
  }
  return _buildSynAnt(pool, topic.name);
}

function _buildSynAnt(pool, topicName) {
  const item = pick(pool);
  const isSyn = Math.random() > .4;
  const answer = isSyn ? item.syn : item.ant;
  if (!answer) return null;
  const opts = pool.map(d => isSyn ? d.syn : d.ant).filter(Boolean);
  return mcq(topicName, isSyn ? 'పర్యాయపదం' : 'వ్యతిరేకపదం',
    isSyn ? `"${item.t}" యొక్క పర్యాయపదం (synonym) ఏమిటి?`
           : `"${item.t}" యొక్క వ్యతిరేకపదం (antonym) ఏమిటి?`,
    `(${item.e})`, opts, answer,
    isSyn ? `Synonym of ${item.e}: ${answer}` : `Antonym of ${item.e}: ${answer}`);
}

// ─── Idiom (always MCQ) ────────────────────────────────────────────────────────────────────────────────

export async function genIdiomComplete(topic, grade) {
  const data = await loadData('idioms');
  if (data.length < 4) return null;
  const item = pick(data);
  if (Math.random() > .5) {
    return mcq(topic.name, 'నానుడి అర్థం',
      `"${item.i}" — దీని అర్థం ఏమిటి?`,
      `What does this idiom mean?`,
      data.map(d => d.m), item.m, `Meaning: ${item.m}`);
  }
  return mcq(topic.name, 'నానుడి గుర్తించు',
    `"${item.m}" — ఇది ఏ నానుడి?`,
    `Which idiom means this?`,
    data.map(d => d.i), item.i, `Idiom: ${item.i}`);
}

// ─── Scrambled Word (chip drag, no typing) ───────────────────────────────────────────────────

export async function genScrambledWord(topic, grade) {
  const data = await getItems(topic.id);
  const filtered = data.filter(d => [...d.t].length >= 3);
  if (!filtered.length) return null;
  const item = pick(filtered);
  return {
    type: 'scrambledWord', topic: topic.name, typeName: 'అక్షరాలు అమర్చు',
    question: `అక్షరాలు సరైన క్రమంలో అమర్చి పదం తయారు చేయండి:`,
    hint: `Hint: ${item.e} ${item.em || ''}`,
    letters: shuffle([...item.t]), answer: item.t,
    engAnswer: item.e
  };
}

// ─── Scrambled Sentence (chip drag, no typing) ───────────────────────────────────────────────

const SENTENCES = [
  { sc:"రాము పాఠశాల కి వెళ్ళాడు", e:"Ramu went to school" },
  { sc:"తాజా పండ్లు ఆరోగ్యకరంగా ఉంటాయి", e:"Fresh fruits are healthy" },
  { sc:"కాకి చెట్టుపై కూర్చుంది", e:"A crow sat on the tree" },
  { sc:"అమ్మ మంచి వంట చేసింది", e:"Mother cooked good food" },
  { sc:"సూర్యుడు తూర్పున ఉదయిస్తాడు", e:"The sun rises in the east" },
  { sc:"తోటలో పూలు అందంగా ఉన్నాయి", e:"Flowers are beautiful in the garden" },
  { sc:"పిల్లలు పాఠశాలలో చదువుతారు", e:"Children study in school" },
  { sc:"నది నీళ్ళు ప్రవహిస్తాయి", e:"River water flows" },
  { sc:"గుర్రం వేగంగా పరిగెత్తింది", e:"The horse ran fast" },
  { sc:"మేక పాలు ఇస్తుంది", e:"The goat gives milk" }
];

export async function genScrambledSentence(topic, grade) {
  const s = pick(SENTENCES);
  const words = s.sc.split(' ');
  return {
    type: 'scrambledSentence', topic: topic.name, typeName: 'వాక్యం అమర్చు',
    question: 'పదాలను సరైన క్రమంలో అమర్చండి:',
    hint: `(${s.e})`,
    words: shuffle([...words]), answer: s.sc,
    engAnswer: s.e
  };
}

// ─── Sentence Formation (curated sentence-blanks.json database) ────────────────────────────────────────────

export async function genSentenceFormation(topic, grade) {
  const db = await loadData('sentence-blanks');
  const entries = db[topic.id] || [];
  if (entries.length >= 4) {
    const entry = pick(entries);
    const wrongOpts = shuffle(entries.filter(e => e.a !== entry.a)).slice(0, 3).map(e => e.a);
    if (wrongOpts.length < 3) {
      const vocab = await getItems(topic.id);
      const extra = shuffle(vocab.filter(d => d.t !== entry.a)).slice(0, 3 - wrongOpts.length).map(d => d.t);
      wrongOpts.push(...extra);
    }
    return mcq(topic.name, 'వాక్యం పూర్తి చేయి',
      entry.q.replace(entry.a, '_____'),
      `Fill the blank (${entry.e})`,
      [...wrongOpts, entry.a], entry.a, `Answer: ${entry.a} (${entry.e})`);
  }
  const data = await getItems(topic.id);
  if (data.length < 4) return null;
  const item = pick(data);
  const wrongOpts = shuffle(data.filter(d => d.t !== item.t)).slice(0, 3).map(d => d.t);
  return mcq(topic.name, 'వాక్యం పూర్తి చేయి',
    `నాకు _____ అంటే చాలా ఇష్టం.`,
    `I like _____ very much. (${item.e})`,
    [...wrongOpts, item.t], item.t, `Answer: ${item.t} (${item.e})`);
}

// ─── Double Consonants (Dwithvaksharalu) ──────────────────────────────────────────────────────────────

export async function genDwithvaQ(topic, grade) {
  const raw = await loadData('dwithvaksharalu');
  const dwithva = raw.dwithva || {};
  const entries = Object.entries(dwithva).filter(([,ws]) => ws.length >= 2);
  if (!entries.length) return null;
  const [combo, words] = pick(entries);
  const answer = pick(words);
  const allWords = Object.values(dwithva).flat();
  const wrongWords = shuffle(allWords.filter(w => !words.includes(w))).slice(0, 3);
  return mcq(topic.name, 'ద్విత్వాక్షరం గుర్తించు',
    `ద్విత్వాక్షరం "${combo}" ఉన్న పదం ఏది?`,
    `Which word contains the double consonant "${combo}"?`,
    [...wrongWords, answer], answer, `${combo} → ${answer}`);
}

// ─── Conjunct Consonants (Samyukthaksharalu) ──────────────────────────────────────────────────────────

export async function genSamyukthaQ(topic, grade) {
  const raw = await loadData('samyukthaksharalu');
  const groups = (raw.groups || []).filter(g => g.words?.length >= 2);
  if (!groups.length) return null;
  const group = pick(groups);
  const answer = pick(group.words);
  const allWords = (raw.groups || []).flatMap(g => g.words || []);
  const wrongWords = shuffle(allWords.filter(w => !group.words.includes(w))).slice(0, 3);
  if (Math.random() > .5) {
    return mcq(topic.name, 'సంయుక్తాక్షరం గుర్తించు',
      `సంయుక్తాక్షరం "${group.combo}" ఉన్న పదం ఏది? (${group.pronunciation})`,
      `Which word contains the conjunct "${group.combo}"?`,
      [...wrongWords, answer], answer, `${group.combo} → ${answer}`);
  }
  const comboOpts = shuffle((raw.groups || []).map(g => g.combo)).slice(0, 4);
  if (!comboOpts.includes(group.combo)) comboOpts[0] = group.combo;
  return mcq(topic.name, 'ఏ సంయుక్తాక్షరం?',
    `"${answer}" — ఇందులో ఉన్న సంయుక్తాక్షరం ఏది?`,
    `Which conjunct consonant is in this word?`,
    comboOpts, group.combo, `${answer} contains ${group.combo}`);
}

// ─── Reading Comprehension (passage + MCQ) ───────────────────────────────────────────────────

const PASSAGES = [
  {
    grade:[1,2,3,4,5,6],
    passage:`రాము ఒక మంచి పిల్లాడు. అతను రోజూ పాఠశాలకు వెళ్తాడు. అతని టీచర్ పేరు లక్ష్మి. రాము చాలా కష్టపడి చదువుతాడు.`,
    passageEng:`Ramu is a good boy. He goes to school every day. His teacher's name is Lakshmi. Ramu studies very hard.`,
    qs:[
      { q:`రాము ఎక్కడికి వెళ్తాడు?`, opts:[`పాఠశాలకు`,`ఇంటికి`,`మార్కెట్కు`,`తోటకు`], a:`పాఠశాలకు`, ae:`School` },
      { q:`రాము టీచర్ పేరు ఏమిటి?`, opts:[`సీత`,`లక్ష్మి`,`రాధ`,`సావిత్రి`], a:`లక్ష్మి`, ae:`Lakshmi` },
      { q:`రాము ఎలా చదువుతాడు?`, opts:[`ఆడుతూ`,`నిద్రిస్తూ`,`కష్టపడి`,`నవ్వుతూ`], a:`కష్టపడి`, ae:`Hardworking` }
    ]
  },
  {
    grade:[2,3,4,5,6],
    passage:`మా ఇంట్లో ఒక చిన్న తోట ఉంది. తోటలో పూలు, కూరగాయలు పెరుగుతాయి. అమ్మ రోజూ తోటకు నీళ్ళు పోస్తుంది. తోట చాలా అందంగా ఉంటుంది.`,
    passageEng:`There is a small garden at our home. Flowers and vegetables grow in the garden. Mother waters the garden every day. The garden is very beautiful.`,
    qs:[
      { q:`తోటలో ఏమి పెరుగుతాయి?`, opts:[`పూలు మాత్రమే`,`కూరగాయలు మాత్రమే`,`పూలు, కూరగాయలు`,`చెట్లు`], a:`పూలు, కూరగాయలు`, ae:`Flowers and vegetables` },
      { q:`తోటకు నీళ్ళు ఎవరు పోస్తారు?`, opts:[`నాన్న`,`అమ్మ`,`పిల్లలు`,`తాత`], a:`అమ్మ`, ae:`Mother` }
    ]
  },
  {
    grade:[3,4,5,6],
    passage:`వర్షాకాలంలో చెట్లు పచ్చగా ఉంటాయి. నదులు నిండుగా ప్రవహిస్తాయి. రైతులు పొలాలను దున్నుతారు. పిల్లలు వర్షంలో ఆడుతారు.`,
    passageEng:`In rainy season, trees are green. Rivers flow full. Farmers plough fields. Children play in the rain.`,
    qs:[
      { q:`వర్షాకాలంలో చెట్లు ఎలా ఉంటాయి?`, opts:[`ఎండిపోతాయి`,`పచ్చగా ఉంటాయి`,`పడిపోతాయి`,`పూస్తాయి`], a:`పచ్చగా ఉంటాయి`, ae:`Green` },
      { q:`వర్షాకాలంలో రైతులు ఏమి చేస్తారు?`, opts:[`పండుగ జరుపుతారు`,`ప్రయాణిస్తారు`,`పొలాలు దున్నుతారు`,`ఇళ్ళు కట్టుతారు`], a:`పొలాలు దున్నుతారు`, ae:`Plough fields` }
    ]
  }
];

export async function genReadingComp(topic, grade) {
  const suitable = PASSAGES.filter(p => p.grade.includes(grade));
  if (!suitable.length) return null;
  const passage = pick(suitable);
  const q = pick(passage.qs);
  return {
    type: 'readingComp', topic: topic.name, typeName: 'పఠన అవగాహన',
    passage: passage.passage, passageEng: passage.passageEng,
    question: q.q, hint: `Read the passage carefully`,
    options: q.opts, answer: q.a, engAnswer: q.ae
  };
}

// ─── Extra Words / Sentence Making ──────────────────────────────────────────────────────────────────────

export async function genExtraWords(topic, grade) {
  const data = await getItems(topic.id);
  if (data.length < 6) return null;
  const correctItems = shuffle([...data]).slice(0, 3);
  const extraItems = shuffle([...data]).filter(d => !correctItems.includes(d)).slice(0, 2);
  const allWords = shuffle([...correctItems, ...extraItems]).map(d => d.t);
  const correctWords = correctItems.map(d => d.t);
  const hint = correctItems.map(d => d.e).join(', ');
  return {
    type: 'extraWords', topic: topic.name, typeName: 'సరైన పదాలు ఎంచుకో',
    question: `ఈ అర్థాలకు సరిపోయే తెలుగు పదాలను ఎంచుకొండి: ${hint}`,
    hint: `Select the ${correctWords.length} correct Telugu words (extra words are distractors)`,
    wordBank: allWords, correctWords,
    answer: correctWords.join(', '), engAnswer: hint
  };
}

// ─── Joke / Riddle Puzzle (MCQ) ────────────────────────────────────────────────────────────────────────────

export async function genJokePuzzle(topic, grade) {
  const data = await loadData('jokes-puzzles');
  if (!data || data.length < 4) return null;
  const item = pick(data);
  return mcq(topic.name, '🧩 పొడుపు కథ (Riddle)',
    item.q,
    '🤔 సరైన జవాబు ఎంచుకొండి',
    data.map(d => d.a), item.a,
    'Fun Telugu riddle! ' + item.a);
}

// ─── GEN_MAP ─────────────────────────────────────────────────────────────────────────────────────────

const GEN_MAP = {
  mcq:               genMCQ,
  matching:          genMatching,
  vowelQ:            genVowelQ,
  consonantQ:        genConsonantQ,
  guninthaluQ:       genGuninthaluQ,
  guninthamMatch:    genGuninthamMatch,
  vatthuQ:           genVatthuQ,
  genderQ:           genGenderQ,
  singularPluralQ:   genSingularPlural,
  synonymAntonym:    genSynonymAntonym,
  idiomComplete:     genIdiomComplete,
  scrambledWord:     genScrambledWord,
  scrambledSentence: genScrambledSentence,
  sentenceFormation: genSentenceFormation,
  readingComp:       genReadingComp,
  extraWords:        genExtraWords,
  jokePuzzle:        genJokePuzzle,
  dwithvaQ:          genDwithvaQ,
  samyukthaQ:        genSamyukthaQ
};

// ─── Preload Topic Data ───────────────────────────────────────────────────────────────────────────────────

export async function preloadTopicData(topicIds) {
  if (!Array.isArray(topicIds) || !topicIds.length) return;
  const alwaysLoad = ['sentence-blanks', 'idioms', 'jokes-puzzles', 'reading-cards'];
  const files = [
    ...topicIds.map(id => FILE_MAP[id]).filter(Boolean),
    ...alwaysLoad,
  ];
  await Promise.all([...new Set(files)].map(f => loadData(f).catch(() => null)));
}

// ─── Build Question Set ───────────────────────────────────────────────────────────────────────────────────

export async function buildQuestions(grade, selectedTopics, selectedActs, duration, topicDefs, actDefs) {
  await preloadTopicData(selectedTopics);
  const qCount = Math.ceil(duration * 1.2);
  const questions = [];

  const validTopics = topicDefs.filter(t => selectedTopics.includes(t.id) && t.grades.includes(grade));
  const validActs   = actDefs.filter(a => selectedActs.includes(a.id) && a.grades.includes(grade));
  if (!validTopics.length || !validActs.length) return questions;

  let attempts = 0;
  while (questions.length < qCount && attempts < qCount * 6) {
    attempts++;
    const topic = pick(validTopics);
    const act   = pick(validActs);
    const genFn = GEN_MAP[act.id];
    if (!genFn) continue;
    try {
      const q = await genFn(topic, grade);
      if (q) questions.push(q);
    } catch (_) {}
  }
  return questions.slice(0, qCount);
}
