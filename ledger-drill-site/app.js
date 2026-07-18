/* ================================================================
   APP.JS — the drill engine, router, and screen renderers.
   ----------------------------------------------------------------
   You should not need to edit this file when adding formulas or
   subjects. It reads everything it needs from registry.js and the
   data/*.js files, which are loaded before this one in index.html.
   ================================================================ */

/* ============================================================
   ENGINE STATE
   ============================================================ */
let FORMULAS = [];
let order = [];
let qIdx = 0;
let correctCount = 0;
let attempted = 0;
let placed = {};
let poolItems = [];
let selectedChip = null;
let checked = false;

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function buildOrder(){
  order = shuffle(FORMULAS.map((_,i)=>i));
  qIdx = 0;
}
function currentFormula(){ return FORMULAS[order[qIdx]]; }

function zonesFor(f){
  if(f.type === 'fraction'){
    return [
      { key:'numerator',   label:'Numerator',   terms: f.numerator },
      { key:'denominator', label:'Denominator', terms: f.denominator },
    ];
  }
  return [ { key:'numerator', label:'Formula', terms: f.terms } ];
}

function findTermById(f, id){
  if(f.type === 'fraction'){
    return f.numerator.find(t=>t.id===id) || f.denominator.find(t=>t.id===id) || f.distractors.find(t=>t.id===id);
  }
  return f.terms.find(t=>t.id===id) || f.distractors.find(t=>t.id===id);
}

/* ============================================================
   4. ROUTER
   ============================================================ */
function navigate(path){ location.hash = '#/' + path; }
function parseHash(){ return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean); }
function route(){
  const parts = parseHash();
  if(parts.length === 0) renderLevels();
  else if(parts.length === 1) renderSubjects(parts[0]);
  else renderDrill(parts[0], parts[1]);
}

/* ============================================================
   5. SCREEN: LEVEL SELECT
   ============================================================ */
function renderLevels(){
  const app = document.getElementById('app');
  document.getElementById('footerNote').textContent = 'Pick a level to see its subjects.';
  app.innerHTML = `
    <p class="screen-kicker">Choose your level</p>
    <div class="level-grid" id="levelGrid"></div>
  `;
  const grid = document.getElementById('levelGrid');
  LEVELS.forEach(lvl => {
    const liveSubjects = SUBJECTS.filter(s => DATA[lvl.key] && DATA[lvl.key][s.key] && DATA[lvl.key][s.key].length);
    const card = document.createElement('div');
    card.className = 'level-card';
    card.innerHTML = `
      <div class="level-roman">${lvl.roman}</div>
      <div class="level-name">${lvl.label}</div>
      <div class="level-caption">${liveSubjects.length} of ${SUBJECTS.length} subjects live</div>
    `;
    card.addEventListener('click', () => navigate(lvl.key));
    grid.appendChild(card);
  });
}

/* ============================================================
   6. SCREEN: SUBJECT GRID
   ============================================================ */
function renderSubjects(levelKey){
  const lvl = LEVELS.find(l => l.key === levelKey);
  if(!lvl){ navigate(''); return; }
  document.getElementById('footerNote').textContent = 'Pick a subject to start drilling formulas.';
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="breadcrumb">
      <a data-nav-home>← Levels</a><span class="sep">/</span><span>${lvl.label}</span>
    </div>
    <p class="screen-kicker">Choose a subject</p>
    <div class="subject-grid" id="subjectGrid"></div>
  `;
  app.querySelector('[data-nav-home]').addEventListener('click', () => navigate(''));

  const grid = document.getElementById('subjectGrid');
  SUBJECTS.forEach(sub => {
    const formulas = (DATA[levelKey] && DATA[levelKey][sub.key]) || [];
    const available = formulas.length > 0;
    const tile = document.createElement('div');
    tile.className = 'subject-tile ' + (available ? 'available' : 'soon');
    tile.innerHTML = `
      <div class="subject-code">${sub.code}</div>
      <div class="subject-name">${sub.name}</div>
      <div class="subject-status ${available ? 'available' : 'soon'}">
        ${available ? formulas.length + ' formulas — start →' : 'Coming soon'}
      </div>
    `;
    if(available) tile.addEventListener('click', () => navigate(`${levelKey}/${sub.key}`));
    grid.appendChild(tile);
  });
}

/* ============================================================
   7. SCREEN: DRILL
   ============================================================ */
function renderSubjectTabs(levelKey, activeKey){
  const tabsEl = document.getElementById('subjectTabs');
  tabsEl.innerHTML = '';
  SUBJECTS.forEach(sub => {
    const formulas = (DATA[levelKey] && DATA[levelKey][sub.key]) || [];
    const available = formulas.length > 0;
    const tab = document.createElement('div');
    tab.className = 'tab' + (sub.key === activeKey ? ' active' : (available ? '' : ' soon'));
    tab.textContent = sub.code;
    tab.title = sub.name;
    if(available && sub.key !== activeKey){
      tab.style.cursor = 'pointer';
      tab.addEventListener('click', () => navigate(`${levelKey}/${sub.key}`));
    }
    tabsEl.appendChild(tab);
  });
}

function renderDrill(levelKey, subjectKey){
  const lvl = LEVELS.find(l => l.key === levelKey);
  const sub = SUBJECTS.find(s => s.key === subjectKey);
  const formulas = DATA[levelKey] && DATA[levelKey][subjectKey];
  if(!lvl || !sub || !formulas || !formulas.length){ navigate(levelKey || ''); return; }

  FORMULAS = formulas;
  correctCount = 0;
  attempted = 0;

  document.getElementById('footerNote').textContent = 'Drag a line item into a slot, or tap a chip then tap a slot.';
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="breadcrumb">
      <a data-nav-home>← Levels</a><span class="sep">/</span>
      <a data-nav-level>${lvl.label}</a><span class="sep">/</span>
      <span>${sub.name}</span>
    </div>
    <div class="drill-topbar">
      <nav class="subjects" id="subjectTabs"></nav>
      <div class="tally" id="tally">Correct <b>0</b> / <span id="attempted">0</span></div>
    </div>
    <div class="ledger-card" id="ledgerCard">
      <div class="stamp" id="stamp">VERIFIED</div>
      <p class="eyebrow" id="eyebrow"></p>
      <h1 class="formula-name" id="formulaName"></h1>
      <div class="equation" id="equation"></div>
      <p class="pool-label">Available line items</p>
      <div class="pool" id="pool"></div>
      <div class="controls">
        <button class="btn-primary" id="checkBtn" disabled>Check Entry</button>
        <button class="btn-secondary" id="clearBtn">Clear</button>
        <button class="btn-secondary" id="nextBtn" style="display:none;">Next Formula →</button>
      </div>
      <div class="reveal" id="reveal"></div>
    </div>
  `;
  app.querySelector('[data-nav-home]').addEventListener('click', () => navigate(''));
  app.querySelector('[data-nav-level]').addEventListener('click', () => navigate(levelKey));

  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('clearBtn').addEventListener('click', clearCurrent);
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);

  renderSubjectTabs(levelKey, subjectKey);
  buildOrder();
  loadQuestion();
}

function loadQuestion(){
  checked = false;
  selectedChip = null;
  const stampEl = document.getElementById('stamp');
  const revealEl = document.getElementById('reveal');
  stampEl.classList.remove('show','verified','rejected');
  revealEl.classList.remove('show');
  document.getElementById('nextBtn').style.display = 'none';
  document.getElementById('checkBtn').style.display = '';
  document.getElementById('checkBtn').disabled = true;
  document.getElementById('clearBtn').disabled = false;

  const f = currentFormula();
  document.getElementById('eyebrow').textContent = `Formula ${qIdx+1} of ${FORMULAS.length}`;
  document.getElementById('formulaName').textContent = f.name;

  const zones = zonesFor(f);
  placed = {};
  zones.forEach(z => { placed[z.key] = new Array(z.terms.length).fill(null); });

  let allTerms = [];
  zones.forEach(z => allTerms = allTerms.concat(z.terms));
  allTerms = allTerms.concat(f.distractors);
  poolItems = shuffle(allTerms.map(t => ({...t})));

  renderEquation(zones);
  renderPool();
}

function renderEquation(zones){
  const equationEl = document.getElementById('equation');
  equationEl.innerHTML = '';
  zones.forEach((z, zi) => {
    const block = document.createElement('div');
    block.className = 'zone-block';
    const label = document.createElement('div');
    label.className = 'zone-label';
    label.textContent = z.label;
    block.appendChild(label);

    const zoneDiv = document.createElement('div');
    zoneDiv.className = 'zone';
    zoneDiv.dataset.zone = z.key;

    z.terms.forEach((_, idx) => {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.zone = z.key;
      slot.dataset.index = idx;
      slot.textContent = '____________';
      attachSlotEvents(slot);
      zoneDiv.appendChild(slot);
    });

    block.appendChild(zoneDiv);
    equationEl.appendChild(block);

    if(zones.length === 2 && zi === 0){
      const divider = document.createElement('div');
      divider.className = 'divider-line';
      equationEl.appendChild(divider);
    }
  });
}

function renderPool(){
  const poolEl = document.getElementById('pool');
  poolEl.innerHTML = '';
  poolItems.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.draggable = true;
    chip.dataset.id = item.id;
    chip.textContent = item.label;
    attachChipEvents(chip, item);
    poolEl.appendChild(chip);
  });
}

function refreshSlotsUI(){
  const f = currentFormula();
  document.querySelectorAll('.slot').forEach(slotEl => {
    const zone = slotEl.dataset.zone;
    const idx = parseInt(slotEl.dataset.index, 10);
    const id = placed[zone][idx];
    slotEl.classList.remove('correct','incorrect','dragover');
    if(id){
      const term = findTermById(f, id);
      slotEl.textContent = term.label;
      slotEl.classList.add('filled');
    } else {
      slotEl.textContent = '____________';
      slotEl.classList.remove('filled');
    }
  });
  updateCheckBtnState();
}

function updateCheckBtnState(){
  const allFilled = Object.values(placed).every(arr => arr.every(v => v !== null));
  document.getElementById('checkBtn').disabled = !allFilled || checked;
}

function placeChip(id, zone, index){
  const f = currentFormula();
  const bumpedId = placed[zone][index];
  poolItems = poolItems.filter(p => p.id !== id);
  Object.keys(placed).forEach(z => {
    placed[z] = placed[z].map(v => v === id ? null : v);
  });
  placed[zone][index] = id;
  if(bumpedId && bumpedId !== id){
    poolItems.push(findTermById(f, bumpedId));
  }
  renderPool();
  refreshSlotsUI();
}

function returnChipToPool(zone, index){
  const f = currentFormula();
  const id = placed[zone][index];
  if(!id) return;
  placed[zone][index] = null;
  poolItems.push(findTermById(f, id));
  renderPool();
  refreshSlotsUI();
}

function attachChipEvents(chip, item){
  chip.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', item.id); });
  chip.addEventListener('click', () => {
    if(checked) return;
    if(selectedChip === item.id){
      selectedChip = null;
      chip.classList.remove('selected');
      return;
    }
    document.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));
    selectedChip = item.id;
    chip.classList.add('selected');
  });
}

function attachSlotEvents(slot){
  slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('dragover'); });
  slot.addEventListener('dragleave', () => slot.classList.remove('dragover'));
  slot.addEventListener('drop', e => {
    e.preventDefault();
    slot.classList.remove('dragover');
    if(checked) return;
    const id = e.dataTransfer.getData('text/plain');
    if(id) placeChip(id, slot.dataset.zone, parseInt(slot.dataset.index,10));
  });
  slot.addEventListener('click', () => {
    if(checked) return;
    const zone = slot.dataset.zone;
    const index = parseInt(slot.dataset.index, 10);
    if(placed[zone][index]){
      returnChipToPool(zone, index);
    } else if(selectedChip){
      placeChip(selectedChip, zone, index);
      selectedChip = null;
      document.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));
    }
  });
}

function checkAnswer(){
  const f = currentFormula();
  checked = true;
  attempted++;

  const zones = zonesFor(f);
  let allCorrect = true;

  zones.forEach(z => {
    const correctIds = new Set(z.terms.map(t=>t.id));
    const placedIds = placed[z.key];
    document.querySelectorAll(`.slot[data-zone="${z.key}"]`).forEach(slotEl => {
      const idx = parseInt(slotEl.dataset.index,10);
      const id = placedIds[idx];
      const isRight = id && correctIds.has(id);
      slotEl.classList.toggle('correct', !!isRight);
      slotEl.classList.toggle('incorrect', !isRight);
      if(!isRight) allCorrect = false;
    });
  });

  if(allCorrect) correctCount++;
  document.querySelector('#tally b').textContent = correctCount;
  document.getElementById('attempted').textContent = attempted;

  const stampEl = document.getElementById('stamp');
  stampEl.textContent = allCorrect ? 'Verified' : 'Rejected';
  stampEl.classList.add('show', allCorrect ? 'verified' : 'rejected');

  let revealText = '';
  if(f.type === 'fraction'){
    revealText = f.numerator.map(t=>t.label).join('  ') + '  ⁄  ' + f.denominator.map(t=>t.label).join('  ');
  } else {
    revealText = f.terms.map(t=>t.label).join('  ');
  }
  const revealEl = document.getElementById('reveal');
  revealEl.textContent = 'Correct entry: ' + revealText;
  revealEl.classList.add('show');

  document.getElementById('checkBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = '';
  document.getElementById('clearBtn').disabled = true;
}

function clearCurrent(){
  if(checked) return;
  const f = currentFormula();
  const zones = zonesFor(f);
  zones.forEach(z => {
    placed[z.key].forEach((id, idx) => {
      if(id){
        poolItems.push(findTermById(f, id));
        placed[z.key][idx] = null;
      }
    });
  });
  renderPool();
  refreshSlotsUI();
}

function nextQuestion(){
  qIdx++;
  if(qIdx >= order.length) buildOrder();
  loadQuestion();
}

/* ============================================================
   INIT
   ============================================================ */
document.getElementById('wordmark').addEventListener('click', () => navigate(''));
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
route();
