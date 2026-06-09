export const KB = {
  vowels: ["అ","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ","ఎ","ఏ","ఐ","ఒ","ఓ","ఔ","అం","అః"],
  matras: ["","ా","ి","ీ","ు","ూ","ృ","ె","ే","ై","ొ","ో","ౌ","ం","ః"],
  matraNames: ["(అ)","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ","ఎ","ఏ","ఐ","ఒ","ఓ","ఔ","అం","అః"],
  consonantGroups: [
    {label:"క వర్గం (Ka-group)",       chars:["క","ఖ","గ","ఘ","ఙ"]},
    {label:"చ వర్గం (Ca-group)",       chars:["చ","ఛ","జ","ఝ","ఞ"]},
    {label:"ట వర్గం (Ta-group)",       chars:["ట","ఠ","డ","ఢ","ణ"]},
    {label:"త వర్గం (ta-group)",       chars:["త","థ","ద","ధ","న"]},
    {label:"ప వర్గం (Pa-group)",       chars:["ప","ఫ","బ","భ","మ"]},
    {label:"అంతస్థాలు (Semivowels)",   chars:["య","ర","ల","వ"]},
    {label:"ఊష్మాలు (Sibilants+H)",   chars:["శ","ష","స","హ"]},
    {label:"విశేషాలు (Specials)",      chars:["ా","క్ష","ఱ"]}
  ],
  vatthulu: ["క్","ఖ్","గ్","ఘ్","చ్","జ్","ట్","డ్","త్","థ్","ద్","ధ్","న్","ప్","బ్","భ్","మ్","య్","ర్","ల్","వ్","శ్","ష్","స్","హ్","ా్","ణ్","ఞ్"],
  conjuncts: ["క్క","చ్చ","ట్ట","ద్ద","న్న","ప్ప","బ్బ","మ్మ","ల్ల","స్స","జ్ఞ","శ్ర","స్త","న్త","క్త","ప్ర","బ్ర","గ్ర","ద్ర","ప్ర"],
  numerals: ["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],
  dwithva: ["క్క","ఖ్ఖ","గ్గ","చ్చ","జ్జ","ట్ట","డ్డ","ణ్ణ","త్త","థ్థ","ద్ద","ధ్ధ","న్న","ప్ప","ఫ్ఫ","బ్బ","భ్భ","మ్మ","య్య","ర్ర","ల్ల","వ్వ","శ్శ","ష్ష","స్స","హ్హ","ా్ా"],
  others: ["।","॥","్","ఽ","ం","ః","ఁ"]
};

function buildMatraExamples() {
  const exCons = ["క","చ","త","న","ప","మ","ర","స","వ","హ"];
  const marks  = {"అ":"","ఆ":"ా","ఇ":"ి","ఈ":"ీ","ఉ":"ు","ఊ":"ూ","ఋ":"ృ","ఎ":"ె","ఏ":"ే","ఐ":"ై","ఒ":"ొ","ఓ":"ో","ఔ":"ౌ","అం":"ం","అః":"ః"};
  const vowels = Object.keys(marks);
  const examples = [];
  exCons.forEach(c => vowels.forEach(v => examples.push(c + marks[v])));
  return examples;
}

export function buildKeyboardUI() {
  document.getElementById('kbr-vowels').innerHTML =
    KB.vowels.map(v => `<button class="kb-btn vowel" data-char="${v}" title="${v}">${v}</button>`).join('');

  const conEl = document.getElementById('kbr-consonants');
  conEl.innerHTML = KB.consonantGroups.map(grp =>
    `<div class="kb-group-label">${grp.label}</div>
     <div class="kb-row">${grp.chars.map(c =>
       `<button class="kb-btn" data-char="${c}" title="${c}">${c}</button>`
     ).join('')}</div>`
  ).join('');

  document.getElementById('kbr-matras').innerHTML =
    KB.matras.map((m, i) => {
      const display = m === '' ? 'అ' : 'క' + m;
      const label = KB.matraNames[i];
      const char = m === '' ? 'అ' : m;
      return `<button class="kb-btn matra" data-char="${char}" title="${label} matra: ${display}">${display}<br><span style="font-size:.6rem;color:rgba(134,239,172,.6)">${label}</span></button>`;
    }).join('');

  const matraExamples = buildMatraExamples();
  document.getElementById('kbr-matra-examples').innerHTML =
    matraExamples.map(s =>
      `<button class="kb-btn matra" data-char="${s}" style="font-size:1rem;min-width:42px" title="${s}">${s}</button>`
    ).join('');

  document.getElementById('kbr-vatthulu').innerHTML =
    KB.vatthulu.map(v => `<button class="kb-btn vatt" data-char="${v}" title="${v} (half consonant)">${v}</button>`).join('');
  document.getElementById('kbr-conjuncts').innerHTML =
    KB.conjuncts.map(v => `<button class="kb-btn vatt" data-char="${v}" style="font-size:1rem" title="${v}">${v}</button>`).join('');

  document.getElementById('kbr-numerals').innerHTML =
    KB.numerals.map(n => `<button class="kb-btn spec" data-char="${n}" title="Telugu numeral ${n}">${n}</button>`).join('');
  document.getElementById('kbr-dwithva').innerHTML =
    KB.dwithva.map(d => `<button class="kb-btn vatt" data-char="${d}" title="${d}" style="font-size:.95rem">${d}</button>`).join('');
  document.getElementById('kbr-others').innerHTML =
    KB.others.map(o => `<button class="kb-btn spec" data-char="${o}" title="${o}">${o}</button>`).join('');

  // Event delegation — one listener on the keyboard element
  document.getElementById('teluguKeyboard').addEventListener('click', e => {
    const btn = e.target.closest('[data-char]');
    if (btn) kbType(btn.dataset.char);
  });
}

let kbActiveInput = null;

export function showKeyboard(inputEl) {
  kbActiveInput = inputEl;
  updateKbDisplay();
  document.getElementById('teluguKeyboard').classList.add('show');
  const qc = document.querySelector('.q-container');
  if (qc) qc.classList.add('kb-open');
  setTimeout(() => inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
}

export function closeKeyboard() {
  document.getElementById('teluguKeyboard').classList.remove('show');
  const qc = document.querySelector('.q-container');
  if (qc) qc.classList.remove('kb-open');
}

export function switchKbTab(tab) {
  const tabs = ['vowels', 'consonants', 'matras', 'vatthulu', 'specials'];
  document.querySelectorAll('.kb-tab').forEach((t, i) => t.classList.toggle('active', tabs[i] === tab));
  document.querySelectorAll('.kb-section').forEach(s => s.classList.remove('active'));
  document.getElementById('kb-' + tab).classList.add('active');
}

export function kbType(char) {
  const inp = kbActiveInput || document.getElementById('qInput');
  if (!inp) return;
  const start = inp.selectionStart ?? inp.value.length;
  const end   = inp.selectionEnd   ?? inp.value.length;
  inp.value = inp.value.substring(0, start) + char + inp.value.substring(end);
  const newPos = start + char.length;
  inp.selectionStart = inp.selectionEnd = newPos;
  updateKbDisplay();
}

export function kbBackspace() {
  const inp = kbActiveInput || document.getElementById('qInput');
  if (!inp || !inp.value) return;
  const chars = [...inp.value];
  chars.pop();
  inp.value = chars.join('');
  updateKbDisplay();
}

export function updateKbDisplay() {
  const inp = kbActiveInput || document.getElementById('qInput');
  const el = document.getElementById('kbCurrentText');
  if (el) el.textContent = inp ? inp.value : '';
}

export function submitFromKeyboard(checkTextInputFn) {
  closeKeyboard();
  if (checkTextInputFn) checkTextInputFn();
}

export function attachKeyboard(checkTextInputFn) {
  const inp = document.getElementById('qInput');
  if (inp) {
    inp.addEventListener('focus', () => showKeyboard(inp));
    inp.addEventListener('input', updateKbDisplay);
    inp.classList.add('q-input-kb');
  }
  const submitBtn = document.getElementById('kbSubmitBtn');
  if (submitBtn) submitBtn.addEventListener('click', () => submitFromKeyboard(checkTextInputFn));
}
