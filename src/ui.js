/* =====================================================================
   AMAKNA IDLE — INTERFACE
   ===================================================================== */
const LS_KEY = 'amakna-idle-save-v1';
const LS_UI = 'amakna-idle-ui';
const VIEWS = [
  ['combat', 'Combats'], ['heros', 'Héros'], ['carte', 'Carte'], ['inventaire', 'Inventaire'],
  ['recolte', 'Récolte'], ['ateliers', 'Ateliers'], ['options', 'Options'],
];
const STAT_COLOR = { xpPct: 'var(--xp)', dmgPct: 'var(--hp)', dodge: 'var(--air)', regen: 'var(--win)', speed: 'var(--gold2)', kamas: 'var(--gold2)', rxp: 'var(--xp)', rqty: 'var(--win)', rspd: 'var(--gold2)', vit: 'var(--vit)', sag: 'var(--sag)', for: 'var(--terre)', int: 'var(--feu)', cha: 'var(--eau)', agi: 'var(--air)', pui: 'var(--gold2)', crit: 'var(--hp)', pp: 'var(--eau)', res: 'var(--muted)', soin: 'var(--win)', dmg: 'var(--fg)', pa: 'var(--eau)' };

let st;
const ui = { view: 'combat', hero: null, job: 'tailleur', inv: 'res', resetStep: 0, sellUid: null, recruitCls: 'iop', recruitName: '', modal: null, lastSig: '', importMsg: '' };
let pointerDown = false;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = s => document.querySelector(s);

/* ---------------------------- Persistance ---------------------------- */
function saveGame() {
  try { localStorage.setItem(LS_KEY, serialize(st)); } catch (e) {}
  try { localStorage.setItem(LS_UI, JSON.stringify({ view: ui.view, hero: ui.hero, job: ui.job, inv: ui.inv })); } catch (e) {}
}
function loadGame(snapshot) {
  let raw = snapshot || null;
  if (!raw) { try { raw = localStorage.getItem(LS_KEY); } catch (e) {} }
  try { Object.assign(ui, JSON.parse(localStorage.getItem(LS_UI) || '{}')); } catch (e) {}
  if (raw) { try { return migrate(JSON.parse(raw)); } catch (e) { console.warn('Sauvegarde illisible', e); } }
  return newState();
}

/* ---------------------------- Évènements live ---------------------------- */
const liveEv = {
  log(h, text, cls) { h.log.push({ t: text, c: cls }); if (h.log.length > 30) h.log.splice(0, h.log.length - 30); },
  levelup(h, spells) {
    toast(`${h.name} passe niveau ${h.lvl} !` + (spells.length ? ` Nouveau sort : ${spells.map(s => s.name).join(', ')}.` : ''), 'lvl');
  },
  reward(h, xp, k, loot, gear = []) { for (const g of gear) toast(ITEMS[g.id].relic ? `RELIQUE ! ${h.name} a trouvé ${ITEMS[g.id].name} !` : g.stasis ? `${h.name} a trouvé ${ITEMS[g.id].name} STASIFIÉ ! Stats ×2 du jet max.` : `${h.name} a trouvé ${ITEMS[g.id].name} (jet ${Math.round(itemQuality(g) * 100)} %) !`, ITEMS[g.id].relic || g.stasis ? 'stasis' : 'rare'); for (const r of Object.keys(loot)) if (RESOURCES[r].rare) toast(`${h.name} obtient ${RESOURCES[r].icon} ${RESOURCES[r].name} !`, 'rare'); },
  dungeonDone(h, p) { toast(`${h.name} a vaincu ${p.name} !`, 'quest'); },
  jobup(j, lv) { toast(`${GATHER_JOBS[j].name} passe niveau ${lv} !`, 'lvl'); },
  stopped(h, why) { toast(`${h.name} s'arrête : ${why}.`, 'warn'); },
  defeat() {},
};

/* Petite bulle flottante près du clic, après une fabrication */
function craftPop(r, made, xp) {
  const { x, y } = ui.click || { x: innerWidth / 2, y: innerHeight / 2 };
  let html;
  if (RESOURCES[r.out]) html = `<b>${RESOURCES[r.out].icon} ${made.length > 1 ? made.length + '× ' : ''}${esc(RESOURCES[r.out].name)}</b>`;
  else {
    const gs = made.map(m => m.gear).filter(Boolean);
    const best = gs.reduce((a, b) => (itemQuality(b) > itemQuality(a) ? b : a));
    const q = Math.round(itemQuality(best) * 100);
    const cls = q > 80 ? 'q-high' : q > 40 ? 'q-mid' : 'q-low';
    html = `<b>${itemIcon(best.id)} ${gs.length > 1 ? gs.length + '× ' : ''}${esc(ITEMS[best.id].name)}</b>
      <span class="pop-q ${cls}">${gs.length > 1 ? 'Meilleur jet' : 'Jet'} ${q} %</span>
      <span class="pop-stats">${Object.entries(best.stats).map(([k, v]) => `<i style="color:${STAT_COLOR[k]}">+${v} ${STAT_SHORT[k]}</i>`).join(' ')}</span>`;
    if (gs.length > 1) html += `<span class="pop-stats">Jets : ${gs.map(g => Math.round(itemQuality(g) * 100) + ' %').join(', ')}</span>`;
  }
  html += `<span class="pop-xp">+${xp} XP</span>`;
  const el = document.createElement('div'); el.className = 'craft-pop'; el.innerHTML = html;
  document.body.appendChild(el);
  const w = el.offsetWidth, h = el.offsetHeight;
  el.style.left = clamp(x - w / 2, 8, innerWidth - w - 8) + 'px';
  el.style.top = clamp(y - h - 14, 8, innerHeight - h - 8) + 'px';
  setTimeout(() => el.remove(), 2600);
}

function toast(text, cls = '') {
  const box = $('#toasts'); if (!box) return;
  const el = document.createElement('div'); el.className = 'toast ' + cls; el.textContent = text;
  box.appendChild(el);
  while (box.children.length > 4) box.firstChild.remove();
  setTimeout(() => el.remove(), 4500);
}

/* ---------------------------- Petits composants ---------------------------- */
/* Emblèmes de classe : motifs originaux dessinés en SVG (épée, arc, cœur, goutte, pièce, croissant) */
const CLASS_GLYPH = {
  iop: '<path d="M19.5 3.5 20.5 4.5 11 14 9.5 14.5 10 13Z" fill="currentColor"/><path d="M19.5 3.5 21 3 20.5 4.5" fill="currentColor"/><path d="M7 11.5l5.5 5.5M9.8 14.2 5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="4.3" cy="19.7" r="1.4" fill="currentColor"/>',
  cra: '<path d="M8 3.5c6 .5 12 6.5 12.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M8 3.5 20.5 16" stroke="currentColor" stroke-width=".9" opacity=".7" fill="none"/><path d="M3.5 20.5 17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M18.5 5.5 14.5 6.3 17.7 9.5Z" fill="currentColor"/><path d="M3.5 20.5l.2-3M3.5 20.5l3-.2M5 19l.2-3M5 19l3-.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>',
  eniripsa: '<path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" fill="currentColor"/><path d="M12 10.5v6M9 13.5h6" stroke="var(--c)" stroke-width="2" stroke-linecap="round"/><path d="M4.7 12.2C2.6 12.4 1 10.9 1 8.8c1.3.9 2.6 1 3.6.7M4.9 14.6c-1.8.4-3.2-.5-3.6-2.1M19.3 12.2c2.1.2 3.7-1.3 3.7-3.4-1.3.9-2.6 1-3.6.7M19.1 14.6c1.8.4 3.2-.5 3.6-2.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none" opacity=".85"/>',
  sacrieur: '<path d="M12 2.8s6.3 7.2 6.3 11.4a6.3 6.3 0 0 1-12.6 0C5.7 10 12 2.8 12 2.8Z" fill="currentColor"/><path d="M9.3 12.5l2 3.5M12 11.5l1.4 4.8M14.7 12.5l-.6 3.6" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round"/>',
  enutrof: '<ellipse cx="12" cy="17.5" rx="7" ry="2.6" fill="currentColor" opacity=".55"/><ellipse cx="12" cy="14.5" rx="7" ry="2.6" fill="currentColor" opacity=".8"/><circle cx="12" cy="9" r="5.8" fill="currentColor"/><circle cx="12" cy="9" r="3.9" fill="none" stroke="var(--c)" stroke-width="1.2"/><path d="M12 6.6l1.6 2.4-1.6 2.4-1.6-2.4Z" fill="var(--c)"/>',
  sram: '<path d="M14.5 3.2A8.8 8.8 0 1 0 20.8 16 7 7 0 1 1 14.5 3.2Z" fill="currentColor"/><path d="M17.5 5.5 12 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M19.2 3.8l1-1M16.3 4.3l3.4 3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
};
function emblem(cls, size) {
  const c = CLASSES[cls];
  return `<span class="emblem${size ? ' ' + (size === true ? 'sm' : size) : ''}" style="--c:${c.color}" data-cls="${cls}" title="${c.name}" aria-hidden="true"><svg viewBox="0 0 24 24">${CLASS_GLYPH[cls] || ''}</svg></span>`;
}
function bar(kind, val, max, extra = '') { const p = max > 0 ? clamp(val / max * 100, 0, 100) : 0; return `<div class="bar ${kind} ${extra}"><i style="width:${p.toFixed(1)}%"></i></div>`; }
function kamas(n) { return `<span class="row" style="gap:5px;display:inline-flex"><span class="kama"></span><b class="num">${fmt(n)}</b></span>`; }
function statLine(k, v) { return `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--fg)'}">${v > 0 ? '+' : ''}${v} ${STAT_LABEL[k]}</div>`; }
function itemIcon(id) { return itemArt(id); }
function heroById(id) { return st.heroes.find(h => h.id === id); }
function selHero() { let h = heroById(ui.hero); if (!h && st.heroes.length) { h = st.heroes[0]; ui.hero = h.id; } return h; }
function placeName(act) { if (!act) return ''; const p = findPlace(act.type, act.id); return p ? subName(p, act) : ''; }
function qualityTag(g) {
  if (g.stasis) return '<span class="quality q-stasis">Stasifié · ×2 max</span>';
  const q = itemQuality(g); const p = Math.round(q * 100);
  return `<span class="quality ${q > 0.8 ? 'q-high' : q > 0.4 ? 'q-mid' : 'q-low'}">Jet ${p} %</span>`;
}

/* ---------------------------- Header ---------------------------- */
function renderTop() {
  const active = st.heroes.filter(h => h.act).length;
  const w = `
    <span class="chip" title="Kamas">${kamas(st.kamas)}</span>
    <span class="chip" title="Héros en activité"><span class="sub">Héros</span><b>${active}/${st.heroes.length}</b></span>
    <span class="chip" title="Monstres vaincus"><span class="sub">Vaincus</span><b>${fmt(st.stats.totalKills)}</b></span>`;
  if (w !== ui._wallet) { $('#wallet').innerHTML = w; ui._wallet = w; }
  // Les onglets sont construits une seule fois puis mis à jour en place :
  // reconstruire leur DOM toutes les 200 ms faisait perdre des clics.
  const tabs = $('#tabs');
  if (!tabs.children.length) tabs.innerHTML = VIEWS.map(([id, label]) =>
    `<button class="tab" data-act="view" data-v="${id}">${label}</button>`).join('');
  for (const b of tabs.children) {
    const cur = String(ui.view === b.dataset.v);
    if (b.getAttribute('aria-current') !== cur) b.setAttribute('aria-current', cur);
    const badge = b.querySelector('.badge');
  }
}

/* ---------------------------- Vue : Combats ---------------------------- */
function heroStatus(h) {
  if (!h.act) return ['idle', 'Inactif'];
  if (h.act.type === 'harvest') return ['harvest', 'Récolte'];
  if (h.resting) return ['resting', h.hp <= 0 ? `KO · ${Math.ceil(h.wait / 1000)} s` : `Repos ${Math.ceil(h.wait / 1000)} s`];
  if (h.fight) return ['fighting', `Tour ${h.fight.turn}`];
  return ['resting', 'En route'];
}
function combatSig() { return st.heroes.map(h => h.id + ':' + (h.act ? h.act.id + h.act.room : '-') + ':' + (h.fight ? h.fight.mons.map(m => m.mid).join(',') : '-')).join('|'); }

function renderCombat() {
  if (!st.heroes.length) return renderRecruit(true);
  return `
  <div class="section-head"><div><h2 class="h2">Combats en cours</h2>
  <p class="lead">Tes héros enchaînent les combats tout seuls, tant que la page est ouverte. Envoie-les sur la carte et équipe-les pour aller plus loin.</p></div></div>
  <div class="fights">${st.heroes.map(fightCard).join('')}</div>`;
}
function fightCard(h) {
  const t = heroTotals(st, h); const hp = displayHp(st, h);
  const place = h.act ? findPlace(h.act.type, h.act.id) : null;
  const [sc, stxt] = heroStatus(h);
  let where = '<span>Aucune activité.</span> <button class="btn small gold" data-act="view" data-v="carte">Choisir une zone</button>';
  if (place) {
    const room = h.act.type === 'dungeon' ? ` · ${h.act.room < place.rooms.length ? `Salle ${h.act.room + 1}/${place.rooms.length + 1}` : 'Salle du boss'}` : '';
    where = `<span>${h.act.type === 'dungeon' ? 'Donjon' : h.act.type === 'harvest' ? 'Récolte' : 'Zone'} :</span><b>${esc(subName(place, h.act))}</b><span>${room}</span>
      <button class="btn small ghost" data-act="stop" data-hero="${h.id}" style="margin-left:auto">Arrêter</button>`;
  }
  const s = h.session; const el = s ? Math.max(1, Date.now() - s.start) : 1; const perH = v => fmt(v / el * 3600000);
  // Champ de bataille horizontal : le héros à gauche, les monstres alignés à droite
  let foes = `<div class="arena-empty">${h.act ? 'Le héros récupère avant le prochain combat…' : 'En attente d’ordres au zaap d’Astrub.'}</div>`;
  if (h.fight) foes = h.fight.mons.map((m, i) => {
    const d = MONSTERS[m.mid];
    return `<div class="mon${m.hp <= 0 ? ' dead' : ''}${d.boss ? ' boss' : ''}" data-mon="${i}">
      <div class="ico" aria-hidden="true">${d.icon}</div><div class="mn" title="${esc(d.name)}">${esc(d.name)}</div>
      ${bar('hp', m.hp, m.max)}<div class="ml num" data-k="mhp">${fmt(m.hp)} / ${fmt(m.max)}</div></div>`;
  }).join('');
  const turn = h.fight ? `Tour ${h.fight.turn}` : '';
  return `<article class="card fight-card" data-hero-card="${h.id}" style="--c:${CLASSES[h.cls].color}">
    <div class="fc-side">
      <div class="fight-head">${emblem(h.cls)}
        <div class="who"><div class="row between"><span class="name">${esc(h.name)}</span><span class="status ${sc}" data-k="status">${stxt}</span></div>
        <div class="sub">${CLASSES[h.cls].name} · <span class="lvl">Niv. ${h.lvl}</span>${h.capital ? ` · <b style="color:var(--gold2)">${h.capital} pts</b>` : ''}</div></div>
      </div>
      <div><div class="bar-label"><span>Expérience</span><span data-k="xpt">${h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`}</span></div><div data-k="xpb">${bar('xp thin', h.xp, xpToNext(h.lvl))}</div></div>
      <div class="where">${where}</div>
      ${s ? `<div class="rates" data-k="rates">
        ${h.act.type === 'harvest' ? `<div class="rate"><span>XP métier / h</span><b>${perH(s.xp)}</b></div>
        <div class="rate"><span>Récolte / h</span><b>${perH(s.kills)}</b></div>
        <div class="rate"><span>Récoltés</span><b>${fmt(s.kills)}</b></div>` : `<div class="rate"><span>XP / h</span><b>${perH(s.xp)}</b></div>
        <div class="rate"><span>Kamas / h</span><b>${perH(s.kamas)}</b></div>
        <div class="rate"><span>${h.act.type === 'dungeon' ? 'Donjons' : 'Vaincus'}</span><b>${fmt(h.act.type === 'dungeon' ? s.runs : s.kills)}</b></div>`}</div>` : ''}
    </div>
    <div class="arena" data-k="arena">
      <div class="fighter${h.hp <= 0 && h.resting ? ' dead' : ''}${h.fight ? ' fighting-glow' : ''}" data-k="fighter">
        ${emblem(h.cls, 'big')}
        <div class="mn">${esc(h.name)}</div>
        <div data-k="hpb">${bar('hp', hp, t.maxHp)}</div><div class="ml num" data-k="hpt">${fmt(hp)} / ${fmt(t.maxHp)}</div>
      </div>
      ${h.act && h.act.type === 'harvest' ? (() => { const c = place; const job = st.jobs[c.job]; const [qa, qb] = cropQty(st, c); const p = clamp(1 - h.wait / HARVEST_MS, 0, 1);
        return `<div class="vs"><span class="sickle">⚒</span><small>${GATHER_JOBS[c.job].name} ${job.lvl}</small></div>
        <div class="field"><div class="crops" data-k="crops" style="--g:${p.toFixed(2)}">${Array.from({ length: 5 }, () => `<span>${c.icon}</span>`).join('')}</div>
          <div class="field-info"><b>${c.name}</b> <span class="sub" data-k="stock">· ${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}</span></div>
          <div data-k="hprog">${bar('job', p, 1)}</div>
          <div class="bar-label" style="margin:0"><span>XP ${GATHER_JOBS[c.job].name}</span><span data-k="jxt">${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}</span></div>
          <div data-k="jxb">${bar('xp thin', job.xp, jobXpToNext(job.lvl))}</div></div>`; })()
      : `<div class="vs"><span>VS</span><small data-k="turn">${turn}</small></div>
      <div class="foes">${foes}</div>`}
    </div>
    <div class="log" data-k="log">${logHtml(h)}</div>
  </article>`;
}
function logHtml(h) { return h.log.slice(-8).reverse().map(l => `<div class="${l.c || ''}">${esc(l.t)}</div>`).join(''); }

/* Mise à jour en place des cartes de combat (pas de reconstruction du DOM) */
function patchCombat() {
  for (const h of st.heroes) {
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) continue;
    const t = heroTotals(st, h); const hp = displayHp(st, h);
    const q = k => card.querySelector(`[data-k="${k}"]`);
    const [sc, stxt] = heroStatus(h);
    const s1 = q('status'); s1.className = 'status ' + sc; s1.textContent = stxt;
    q('hpt').textContent = `${fmt(hp)} / ${fmt(t.maxHp)}`; q('hpb').innerHTML = bar('hp', hp, t.maxHp);
    q('xpt').textContent = h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`; q('xpb').innerHTML = bar('xp thin', h.xp, xpToNext(h.lvl));
    if (h.fight) h.fight.mons.forEach((m, i) => {
      const el = card.querySelector(`[data-mon="${i}"]`); if (!el) return;
      el.classList.toggle('dead', m.hp <= 0);
      el.querySelector('.bar > i').style.width = clamp(m.hp / m.max * 100, 0, 100).toFixed(1) + '%';
      el.querySelector('[data-k="mhp"]').textContent = `${fmt(m.hp)} / ${fmt(m.max)}`;
    });
    q('log').innerHTML = logHtml(h);
    if (h.act && h.act.type === 'harvest') {
      const c = findPlace('harvest', h.act.id); const job = st.jobs[c.job]; const p = clamp(1 - h.wait / HARVEST_MS, 0, 1);
      const hp2 = q('hprog'); if (hp2) hp2.innerHTML = bar('job', p, 1);
      const cr = q('crops'); if (cr) cr.style.setProperty('--g', p.toFixed(2));
      const sk = q('stock'); if (sk) { const [qa, qb] = cropQty(st, c); sk.textContent = `· ${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}`; }
      const jx = q('jxt'); if (jx) jx.textContent = `${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}`;
      const jb = q('jxb'); if (jb) jb.innerHTML = bar('xp thin', job.xp, jobXpToNext(job.lvl));
      const r = q('rates'); if (r && h.session) { const el = Math.max(1, Date.now() - h.session.start); const b = r.querySelectorAll('b');
        b[0].textContent = fmt(h.session.xp / el * 3600000); b[1].textContent = fmt(h.session.kills / el * 3600000); b[2].textContent = fmt(h.session.kills); }
      continue;
    }
    const tn = q('turn'); if (tn) tn.textContent = h.fight ? `Tour ${h.fight.turn}` : '';
    const fg = q('fighter'); if (fg) { fg.classList.toggle('dead', h.hp <= 0 && h.resting); fg.classList.toggle('fighting-glow', !!h.fight); }
    const r = q('rates'); if (r && h.session) {
      const el = Math.max(1, Date.now() - h.session.start); const b = r.querySelectorAll('b');
      b[0].textContent = fmt(h.session.xp / el * 3600000); b[1].textContent = fmt(h.session.kamas / el * 3600000);
      b[2].textContent = fmt(h.act.type === 'dungeon' ? h.session.runs : h.session.kills);
    }
  }
}

/* ---------------------------- Vue : Recrutement ---------------------------- */
function renderRecruit(first) {
  if (!ui.recruitName) ui.recruitName = HERO_NAMES[irnd(0, HERO_NAMES.length - 1)];
  const cost = RECRUIT_COST[st.heroes.length];
  const full = st.heroes.length >= RECRUIT_COST.length;
  if (full) return '';
  const c = CLASSES[ui.recruitCls];
  return `<section class="card stack" style="gap:14px">
    <div><h2 class="h2">${first ? 'Bienvenue dans le Monde des Douze' : 'Recruter un héros'}</h2>
    <p class="lead" style="margin:0">${first ? 'Crée ton premier héros. Il combattra seul dans les zones que tu choisis et progressera tant que le jeu est ouvert.' : `Héros ${st.heroes.length + 1} sur ${RECRUIT_COST.length}. Chaque héros farme sa propre zone en parallèle.`}</p></div>
    <div class="classes">${Object.entries(CLASSES).map(([id, k]) => `
      <button class="cls" data-act="rcls" data-cls="${id}" aria-pressed="${ui.recruitCls === id}">${emblem(id, true)}
      <span><b>${k.name}</b><p>${k.role} · ${STAT_LABEL[k.main]}</p><p class="cls-passive">${k.passive.name}</p></span></button>`).join('')}</div>
    <p class="sub" style="margin:0">${c.desc}</p>
    <div class="passive"><span class="label">Passif</span><b>${c.passive.name}</b><span>${c.passive.desc}</span></div>
    <div class="row wrap">
      <label class="label" for="rname">Nom</label>
      <input id="rname" type="text" maxlength="18" value="${esc(ui.recruitName)}" data-input="rname">
      <button class="btn small ghost" data-act="rrandom">Au hasard</button>
      <button class="btn gold" data-act="recruit" ${st.kamas < cost ? 'disabled' : ''}>${cost ? `Recruter · ${fmt(cost)} kamas` : 'Commencer l’aventure'}</button>
    </div>
  </section>`;
}

/* ---------------------------- Vue : Héros ---------------------------- */
function renderHeros() {
  const h = selHero();
  if (!h) return renderRecruit(true);
  const t = heroTotals(st, h);
  const pick = `<div class="hero-pick">${st.heroes.map(x => `<button data-act="selhero" data-hero="${x.id}" aria-pressed="${x.id === h.id}">${emblem(x.cls, true)}${esc(x.name)} <span class="lvl">${x.lvl}</span></button>`).join('')}</div>`;
  const statRows = STATS.map(s => {
    const bonus = t[s] - h.base[s];
    return `<div class="stat-row"><div class="stat-name"><span class="dot" style="--c:${STAT_COLOR[s]}"></span>${STAT_LABEL[s]}${STAT_ELEM[s] ? ` <span class="sub">${STAT_ELEM[s]}</span>` : ''}</div>
      <div class="stat-val">${h.base[s]}${bonus ? ` <small>+${bonus}</small>` : ''}</div>
      <div class="stat-btns"><button class="btn small" data-act="alloc" data-stat="${s}" data-n="1" ${h.capital < STAT_COST[s] ? 'disabled' : ''} aria-label="+1 ${STAT_LABEL[s]}">+1</button>
      <button class="btn small" data-act="alloc" data-stat="${s}" data-n="10" ${h.capital < STAT_COST[s] ? 'disabled' : ''} aria-label="+10 ${STAT_LABEL[s]}">+10</button></div></div>`;
  }).join('');
  const sets = Object.entries(setCounts(st, h)).map(([id, n]) => {
    const b = setBonus(id, n);
    return `<div class="sub"><b style="color:var(--gold2)">${SETS[id].name}</b> (${n} pièces)${Object.keys(b).length ? ' : ' + Object.entries(b).map(([k, v]) => `+${v} ${STAT_SHORT[k]}`).join(', ') : ''}</div>`;
  }).join('');
  if (!SLOTS.includes(ui.slot)) ui.slot = null;
  const slots = SLOTS.map(slot => {
    const g = h.equip[slot] && gearById(st, h.equip[slot]);
    const icon = SLOT_ICON[slot.startsWith('anneau') ? 'anneau' : slot];
    const sel = ui.slot === slot;
    return `<button class="slot${g ? ' filled' : ''}${g && g.stasis ? ' stasis' : ''}${sel ? ' selected' : ''}" data-act="pickslot" data-slot="${slot}" aria-pressed="${sel}">
      <span class="sl">${icon} ${SLOT_LABEL[slot]}</span>${g ? `<span class="si">${itemIcon(g.id)} ${esc(ITEMS[g.id].name)}</span>` : '<span class="hint">Vide</span>'}</button>`;
  }).join('');
  const slotType = s => (s && s.startsWith('anneau') ? 'anneau' : s);
  const pool = st.gear.filter(g => !ITEMS[g.id].harvest && !ITEMS[g.id].relic).filter(g => !ui.slot || ITEMS[g.id].slot === slotType(ui.slot))
    .filter(g => { const by = equippedBy(st, g.uid); return !(by && by.id === h.id); })
    .sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  const curG = ui.slot && h.equip[ui.slot] && gearById(st, h.equip[ui.slot]);
  const spells = spellsOf(h).map(sp => {
    const p = sp.type === 'buff' ? null : spellPower(h, t, null, sp);
    const eff = sp.type === 'buff' ? Object.entries(sp.buff).map(([k, v]) => `+${v} ${STAT_LABEL[k]}`).join(', ') + ` pendant ${sp.turns} tours`
      : `${sp.type === 'heal' ? 'Soigne' : 'Inflige'} ~${fmt(p.avg)}${sp.type === 'aoe' ? ' à tous les ennemis' : sp.type === 'poison' ? ` par tour pendant ${sp.turns} tours` : sp.type === 'drain' ? ' et vole la moitié en PV' : ''}`;
    const lim = [sp.cd ? `recharge ${sp.cd} t` : '', sp.max_ ? `${sp.max_}×/tour` : ''].filter(Boolean).join(' · ');
    return `<div class="spell${h.lvl < sp.lvl ? ' locked' : ''}"><span class="pa" title="Points d'action">${sp.pa}</span>
      <div><b>${sp.name}</b> <span class="sub">${h.lvl < sp.lvl ? `· niveau ${sp.lvl}` : sp.stat ? `· ${STAT_ELEM[sp.stat] || ''}` : ''}</span><div class="desc">${eff}${lim ? ' · ' + lim : ''}</div></div><span></span></div>`;
  }).join('');
  return `${pick}
  <div class="hero-layout">
    <section class="card stack">
      <div class="row">${emblem(h.cls)}<div style="flex:1;min-width:0"><h3>${esc(h.name)}</h3><div class="sub">${CLASSES[h.cls].name} · ${CLASSES[h.cls].role} · <span class="lvl">Niveau ${h.lvl}</span></div></div></div>
      <div><div class="bar-label"><span>Expérience</span><span>${h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`}</span></div>${bar('xp', h.xp, xpToNext(h.lvl))}</div>
      <div class="passive" style="--c:${CLASSES[h.cls].color}"><span class="label">Passif</span><b>${CLASSES[h.cls].passive.name}</b><span>${CLASSES[h.cls].passive.desc}</span></div>
      <div class="where">${h.act ? `En activité : <b>${esc(placeName(h.act))}</b> <button class="btn small ghost" data-act="stop" data-hero="${h.id}">Arrêter</button>` : 'Inactif.'} <button class="btn small" data-act="view" data-v="carte">Carte</button></div>
      <div class="row between wrap"><span class="label">Caractéristiques · ${h.capital} points</span>
        <span class="row" style="gap:6px"><label class="sub" for="auto">Auto</label>
        <select id="auto" data-change="auto">${['', ...STATS].map(s => `<option value="${s}" ${h.auto === s || (!h.auto && !s) ? 'selected' : ''}>${s ? STAT_LABEL[s] : 'Manuel'}</option>`).join('')}</select>
        <button class="btn small ghost" data-act="resetstats">Réinitialiser</button></span></div>
      <div>${statRows}</div>
      <p class="sub" style="margin:0">La Sagesse coûte 3 points. Chaque niveau donne ${CAPITAL_PER_LEVEL} points. En mode auto, ils sont placés dans la caractéristique choisie.</p>
      <div class="label">Statistiques de combat</div>
      <div class="kv">
        <div><span>Points de vie</span><b>${fmt(t.maxHp)}</b></div>
        <div><span>Points d'action</span><b>${t.pa}</b></div>
        <div><span>Puissance</span><b>${t.pui}</b></div>
        <div><span>Critique</span><b>${t.critPct.toFixed(1)} %</b></div>
        <div><span>Esquive</span><b>${t.dodgePct.toFixed(1)} %</b></div>
        <div><span>Résistance</span><b>${t.resPct} %</b></div>
        <div><span>Prospection</span><b>${t.ppTotal}</b></div>
        <div><span>Bonus XP</span><b>+${t.xpBonus} %</b></div>
        ${t.kamas ? `<div><span>Bonus kamas</span><b>+${t.kamas} %</b></div>` : ''}
      </div>
    </section>
    <section class="stack" style="gap:14px">
      <div class="card stack">
        <div class="eq-tabs" role="tablist"><button role="tab" data-act="eqtab" data-v="combat" aria-selected="${ui.eqTab !== 'recolte'}">Équipement</button><button role="tab" data-act="eqtab" data-v="recolte" aria-selected="${ui.eqTab === 'recolte'}">Équipement de récolte</button><button role="tab" data-act="eqtab" data-v="relique" aria-selected="${ui.eqTab === 'relique'}">Relique</button></div>
        ${ui.eqTab === 'recolte' ? renderHarvestGear(h) : ui.eqTab === 'relique' ? renderRelic(h) : `
        <div class="slots">${slots}</div>
        ${curG ? (() => { const d = ITEMS[curG.id]; const sc = d.set ? (setCounts(st, h)[d.set] || 0) : 0;
          if (ui.detailHidden) return `<button class="slot-detail-bar${curG.stasis ? ' stasis' : ''}" data-act="toggledetail"><span>${itemIcon(curG.id)} ${esc(d.name)}</span><span class="sub">Afficher les stats ▾</span></button>`;
          return `<div class="slot-detail${curG.stasis ? ' stasis' : ''}">
            <button class="detail-close" data-act="toggledetail" title="Réduire">Réduire ▴</button>
            <div class="item-head"><div style="min-width:0"><div class="item-name">${itemIcon(curG.id)} ${esc(d.name)}</div>
            <div class="item-meta">Niveau ${d.lvl} · ${SLOT_LABEL[ui.slot]}${d.set ? ` · ${SETS[d.set].name} (${sc} équipée${sc > 1 ? 's' : ''})` : ''}</div></div>${qualityTag(curG)}</div>
            <div class="stats-list">${Object.entries(curG.stats).map(([k, v]) => `<div class="s" style="--c:${STAT_COLOR[k]}">+${v} ${STAT_LABEL[k]} <span class="r">(${d.stats[k][0]}–${d.stats[k][1]})</span></div>`).join('')}</div>
            ${d.set ? `<div class="sub">Bonus de panoplie : ${Object.entries(SETS[d.set].bonus).map(([n, b]) => `<span style="${sc >= +n ? 'color:var(--gold2)' : ''}">${n} pièces : ${Object.entries(b).map(([k, v]) => `+${v} ${STAT_SHORT[k]}`).join(', ')}</span>`).join(' · ')}</div>` : ''}
          </div>`; })() : ''}
        ${sets}
        <div class="row between wrap" style="margin-top:4px"><span class="label">${ui.slot ? `${SLOT_LABEL[ui.slot]}s disponibles` : 'Tous les objets du sac'}</span>
          <span class="row" style="gap:6px">${curG ? `<button class="btn small danger" data-act="unequip" data-slot="${ui.slot}">Retirer ${esc(ITEMS[curG.id].name)}</button>` : ''}
          ${ui.slot ? '<button class="btn small ghost" data-act="pickslot" data-slot="">Tout afficher</button>' : '<span class="sub">Clique sur un emplacement pour filtrer</span>'}</span></div>
        ${pool.length ? `<div class="stack" style="gap:6px">${pool.slice(0, ui.slot ? 50 : 15).map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = h.lvl >= d.lvl;
          return `<div class="row between bag-row${g.stasis ? ' stasis' : ''}" style="border-bottom:1px solid #ffffff0a;padding-bottom:6px"><div style="min-width:0"><b>${itemIcon(g.id)} ${esc(d.name)}</b> <span class="sub">niv. ${d.lvl}</span> ${qualityTag(g)}
          <div class="sub">${Object.entries(g.stats).map(([k, v]) => `+${v} ${STAT_SHORT[k]}`).join(' · ')}${by ? ` · <span class="equipped-by">porté par ${esc(by.name)}</span>` : ''}</div></div>
          <button class="btn small gold" data-act="equip" data-uid="${g.uid}" data-slot="${ui.slot || ''}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Niv. ${d.lvl}`}</button></div>`; }).join('')}</div>`
          : `<p class="sub" style="margin:0">${ui.slot ? `Aucun objet de type ${SLOT_LABEL[ui.slot].toLowerCase()} dans le sac.` : 'Aucun objet dans le sac.'} Fabrique-en dans les <button class="btn small" data-act="view" data-v="ateliers">Ateliers</button></p>`}`}
      </div>
      <div class="card"><div class="label">Sorts</div>${spells}</div>
    </section>
  </div>
  <div style="margin-top:14px">${renderRecruit(false)}</div>`;
}

function relicSources(id) { return Object.entries(RELIC_DROPS).filter(([, l]) => l.some(([r]) => r === id)).map(([m, l]) => `${MONSTERS[m].icon} ${MONSTERS[m].name} (${pct(l.find(([r]) => r === id)[1])})`).join(', '); }
function renderRelic(h) {
  const cur = h.relic && gearById(st, h.relic);
  const owned = st.gear.filter(g => ITEMS[g.id].relic && g.uid !== h.relic).sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl);
  const ownedIds = new Set(st.gear.filter(g => ITEMS[g.id].relic).map(g => g.id));
  return `<p class="sub" style="margin:0">Une seule relique par héros. Elles ne se fabriquent pas : elles tombent extrêmement rarement de certains monstres et boss.</p>
    <div class="relic-slot${cur ? ' filled' : ''}">${cur ? `<div class="relic-art">${itemIcon(cur.id)}</div><div style="min-width:0"><div class="item-name">${esc(ITEMS[cur.id].name)}</div>
      <div class="stats-list">${Object.entries(cur.stats).map(([k, v]) => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--stasis-fg)'}">+${v} ${STAT_LABEL[k]}</div>`).join('')}</div>
      <button class="btn small danger" data-act="unrelic" style="margin-top:6px">Retirer</button></div>` : `<div class="relic-art empty">🔮</div><div><b>Aucune relique équipée</b><div class="sub">Équipe-en une depuis la liste ci-dessous.</div></div>`}</div>
    ${owned.length ? `<div class="label">Reliques du sac</div><div class="stack" style="gap:6px">${owned.map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = h.lvl >= d.lvl;
      return `<div class="row between bag-row relic-row"><div style="min-width:0"><b>${itemIcon(g.id)} ${esc(d.name)}</b> <span class="sub">niv. ${d.lvl}</span>
      <div class="sub">${Object.entries(g.stats).map(([k, v]) => `+${v} ${STAT_LABEL[k]}`).join(' · ')}${by ? ` · <span class="equipped-by">portée par ${esc(by.name)}</span>` : ''}</div></div>
      <button class="btn small gold" data-act="equip" data-uid="${g.uid}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Niv. ${d.lvl}`}</button></div>`; }).join('')}</div>` : ''}
    <div class="label">Codex des reliques</div>
    <div class="relic-codex">${Object.keys(ITEMS).filter(id => ITEMS[id].relic).map(id => { const d = ITEMS[id]; const has = ownedIds.has(id);
      return `<div class="relic-entry${has ? ' has' : ''}"><div class="relic-mini">${itemIcon(id)}</div><div style="min-width:0"><b>${has ? esc(d.name) : '???'}</b> <span class="sub">niv. ${d.lvl}</span>
        <div class="sub">${Object.entries(d.stats).map(([k, [a, b]]) => `${a}–${b} ${STAT_SHORT[k]}`).join(' · ')}</div><div class="sub relic-src">${relicSources(id)}</div></div></div>`; }).join('')}</div>`;
}

function renderHarvestGear(h) {
  h.hequip = h.hequip || {};
  const ht = harvestTotals(st, h); const pl = st.jobs.paysan.lvl;
  if (!HARVEST_SLOTS.includes(ui.hslot)) ui.hslot = null;
  const slots = HARVEST_SLOTS.map(s => { const g = h.hequip[s] && gearById(st, h.hequip[s]); const sel = ui.hslot === s;
    return `<button class="slot${g ? ' filled' : ''}${sel ? ' selected' : ''}" data-act="hslot" data-slot="${s}" aria-pressed="${sel}"><span class="sl">${SLOT_ICON[s]} ${HARVEST_SLOT_LABEL[s]}</span>${g ? `<span class="si">${itemIcon(g.id)} ${esc(ITEMS[g.id].name)}</span><span class="hint">${Object.entries(g.stats).map(([k, v]) => `+${v} ${STAT_SHORT[k]}`).join(' · ')}</span>` : '<span class="hint">Vide</span>'}</button>`; }).join('');
  const cur = ui.hslot && h.hequip[ui.hslot] && gearById(st, h.hequip[ui.hslot]);
  const pool = st.gear.filter(g => ITEMS[g.id].harvest && (!ui.hslot || ITEMS[g.id].slot === ui.hslot)).filter(g => { const by = equippedBy(st, g.uid); return !(by && by.id === h.id); })
    .sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  return `<div class="slots h3">${slots}</div>
    <div class="kv"><div><span>XP de récolte</span><b>+${ht.rxp} %</b></div><div><span>Quantité (+1)</span><b>${ht.rqty} %</b></div><div><span>Vitesse</span><b>+${ht.rspd} %</b></div><div><span>Temps / récolte</span><b>${(harvestMs(st, h) / 1000).toFixed(1).replace('.', ',')} s</b></div></div>
    <div class="row between wrap"><span class="label">${ui.hslot ? HARVEST_SLOT_LABEL[ui.hslot] + ' disponibles' : 'Équipements de récolte du sac'}</span>
      ${cur ? `<button class="btn small danger" data-act="hunequip" data-slot="${ui.hslot}">Retirer ${esc(ITEMS[cur.id].name)}</button>` : ''}</div>
    ${pool.length ? `<div class="stack" style="gap:6px">${pool.map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = pl >= d.lvl;
      return `<div class="row between bag-row" style="border-bottom:1px solid #ffffff0a;padding-bottom:6px"><div style="min-width:0"><b>${itemIcon(g.id)} ${esc(d.name)}</b> <span class="sub">Paysan ${d.lvl}</span> ${qualityTag(g)}
      <div class="sub">${Object.entries(g.stats).map(([k, v]) => `+${v} ${STAT_LABEL[k]}`).join(' · ')}${by ? ` · <span class="equipped-by">porté par ${esc(by.name)}</span>` : ''}</div></div>
      <button class="btn small gold" data-act="equip" data-uid="${g.uid}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Paysan ${d.lvl}`}</button></div>`; }).join('')}</div>`
    : `<p class="sub" style="margin:0">Aucun équipement de récolte. Le Forgeron fabrique les faux, le Tailleur les gants et les sacs, à partir de céréales. <button class="btn small" data-act="view" data-v="ateliers">Ateliers</button></p>`}`;
}

/* ---------------------------- Vue : Carte ---------------------------- */
const pct = v => { const p = v * 100; return (p >= 10 ? p.toFixed(0) : p >= 1 ? p.toFixed(1) : p.toFixed(2)).replace('.', ',') + ' %'; };
function placeCard(p, type) {
  const here = st.heroes.filter(h => h.act && h.act.id === p.id);
  const mons = type === 'dungeon' ? [...new Set([...p.rooms.flat(), ...p.boss])] : p.monsters;
  const keyN = type === 'dungeon' ? (st.res[p.key] || 0) : 0;
  const open = !!(ui.openZones || {})[p.id];
  ui.zoneTier = ui.zoneTier || {};
  const tier = type === 'zone' ? (ui.zoneTier[p.id] || 0) : 0; const T = SUBZONES[tier];
  const best = st.heroes.reduce((m, h) => Math.max(m, heroTotals(st, h).ppTotal), 100);
  const head = `<button class="zone-head" data-act="togglezone" data-id="${p.id}" aria-expanded="${open}">
      <span class="chev" aria-hidden="true">▸</span>
      <span class="zh-main"><span class="label">${type === 'dungeon' ? 'Donjon · ' : ''}${p.region}</span><span class="zh-name">${p.name}</span>
        <span class="zh-icons" aria-hidden="true">${mons.map(m => MONSTERS[m].icon).join(' ')}</span></span>
      ${here.length ? `<span class="zh-here">${here.map(h => emblem(h.cls, true)).join('')}</span>` : ''}
      <span class="lvl-range">Niv. ${p.lvl[0]}–${p.lvl[1]}</span>
    </button>`;
  let body = '';
  if (open) {
    const rows = mons.map(mid => {
      const d = MONSTERS[mid]; const gd = GEAR_DROPS[mid] || []; const ms = monsterStats(mid);
      const gr = gd.length ? (d.boss ? GEAR_DROP_RATE_BOSS : GEAR_DROP_RATE) * T.drop / gd.length : 0;
      const key = p.id + ':' + mid; const mo = !!(ui.openMons || {})[key];
      const rl = (RELIC_DROPS[mid] || []).map(([r, c]) => [r, c * T.drop]);
      const detail = mo ? `<tr class="dr-detail"><td colspan="5"><div class="dr-items">
        ${d.drops.map(([r, c]) => `<div class="dr-item"><span class="dr-ii">${RESOURCES[r].icon}</span><div><b>${RESOURCES[r].name}</b><div class="sub">Ressource · ${RESOURCES[r].value} K pièce</div></div><b class="dr-pc">${pct(Math.min(1, c))}</b></div>`).join('')}
        ${rl.map(([r, c]) => `<div class="dr-item relic"><span class="dr-ii">${itemIcon(r)}</span><div><b>${ITEMS[r].name}</b> <span class="sub">Relique · niv. ${ITEMS[r].lvl}</span>
          <div class="sub">${Object.entries(ITEMS[r].stats).map(([k, [a, b2]]) => `${a}–${b2} ${STAT_SHORT[k]}`).join(' · ')}</div></div><b class="dr-pc relic">${pct(c)}</b></div>`).join('')}
        ${gd.map(i => { const it = ITEMS[i]; return `<div class="dr-item gear"><span class="dr-ii">${itemIcon(i)}</span><div><b>${it.name}</b> <span class="sub">niv. ${it.lvl}</span>
          <div class="sub">${Object.entries(it.stats).map(([k, [a, b2]]) => `<span style="color:${STAT_COLOR[k]}">${a}–${b2} ${STAT_SHORT[k]}</span>`).join(' · ')}</div>
          <div class="sub dr-stasis-line">Stasifié : ${Object.entries(it.stats).map(([k, [, b2]]) => `${b2 * 2} ${STAT_SHORT[k]}`).join(' · ')}</div></div>
          <div class="dr-pcs"><b class="dr-pc gold">${pct(gr)}</b><b class="dr-pc stasis">${pct(STASIS_RATE * T.drop)}</b></div></div>`; }).join('')}
      </div></td></tr>` : '';
      return `<tr class="dr-row${mo ? ' open' : ''}" data-act="togglemon" data-k="${key}" tabindex="0" title="Voir les objets">
        <td><div class="dr-mon"><span class="chev sm" aria-hidden="true">▸</span><span class="dr-ico" aria-hidden="true">${d.icon}</span><div><b>${d.name}</b> <span class="sub">${d.lvl}${d.boss ? ' · Boss' : ''}</span>
          <div class="dr-meta">${fmt(ms.hp * T.hp)} PV · ${fmt(ms.dmin * T.dmg)}–${fmt(ms.dmax * T.dmg)} dmg</div></div></div></td>
        <td><div class="dr-chips">${d.drops.map(([r, c]) => `<span title="${RESOURCES[r].name}">${RESOURCES[r].icon}<b>${pct(Math.min(1, c))}</b></span>`).join('')}</div></td>
        <td>${gd.length ? `<div class="dr-chips"><span class="dr-gold" title="${gd.map(i => ITEMS[i].name).join(', ')}">${gd.map(i => itemIcon(i)).join('')}<b>${pct(gr)}</b></span></div>` : '<span class="dim">—</span>'}</td>
        <td>${gd.length ? `<span class="dr-stasis">${pct(STASIS_RATE * T.drop)}</span>` : '<span class="dim">—</span>'}</td>
        <td>${rl.length ? rl.map(([r, c]) => `<span class="dr-relic" title="${ITEMS[r].name}">${itemIcon(r)}<b>${pct(c)}</b></span>`).join('') : '<span class="dim">—</span>'}</td>
      </tr>${detail}`;
    }).join('');
    const gearNames = [...new Set(mons.flatMap(m => GEAR_DROPS[m] || []))];
    body = `<div class="zone-body">
      <p class="sub" style="margin:0">${p.text}</p>
      ${type === 'dungeon' ? `<div class="keybox">${RESOURCES[p.key].icon} ${RESOURCES[p.key].name} : <b style="color:${keyN ? 'var(--win)' : 'var(--hp)'}">${keyN}</b> <span class="sub">· 3 salles puis le boss · XP ×${p.bonusXp}</span></div>` : ''}
      ${type === 'zone' ? `<div class="subzones" role="tablist">${SUBZONES.map((s, i) => { const n = st.heroes.filter(h => h.act && h.act.id === p.id && (h.act.tier || 0) === i).length;
        return `<button role="tab" data-act="ztier" data-id="${p.id}" data-t="${i}" aria-selected="${i === tier}"><b>${p.name} ${i + 1}</b><span>${i ? `PV ×${s.hp} · Dégâts ×${String(s.dmg).replace('.', ',')} · Équipements ×${s.drop}` : 'Difficulté normale'}</span>${n ? `<i>${n} héros</i>` : ''}</button>`; }).join('')}</div>` : ''}
      
      <div class="drop-wrap"><table class="drop-table">
        <thead><tr><th>Monstre</th><th>Ressources</th><th>Équipement</th><th>Stasifié</th><th>Relique</th></tr></thead><tbody>${rows}</tbody></table></div>

      <p class="sub" style="margin:0">Taux par monstre vaincu, pour 100 de prospection (ta meilleure : ${best}, soit ×${(best / 100).toFixed(2).replace('.', ',')}). Taux d’équipement et de stasifié : par objet. <span style="color:var(--relic)">En jaune</span> : reliques. Clique sur un monstre pour voir le détail de ses objets.</p>
      <div class="send">${st.heroes.length ? st.heroes.map(h => {
        const there = h.act && h.act.id === p.id && (type !== 'zone' || (h.act.tier || 0) === tier); const warn = h.lvl < p.lvl[0] - 3 ? ' ⚠' : '';
        return `<button class="btn small ${there ? '' : 'gold'}" data-act="send" data-hero="${h.id}" data-type="${type}" data-id="${p.id}" data-t="${tier}" ${there || (type === 'dungeon' && !keyN) ? 'disabled' : ''} title="${warn ? 'Niveau conseillé : ' + p.lvl[0] : ''}">${there ? `${esc(h.name)} est ici` : `Envoyer ${esc(h.name)} (${h.lvl})${warn}`}</button>`;
      }).join('') : '<span class="sub">Recrute un héros d’abord.</span>'}</div>
    </div>`;
  }
  return `<article class="card zone-card${type === 'dungeon' ? ' dungeon' : ''}${open ? ' open' : ''}">${head}${body}</article>`;
}
function renderCarte() {
  return `<div class="section-head"><div><h2 class="h2">Carte d'Amakna</h2>
    <p class="lead">Envoie chaque héros dans une zone adaptée à son niveau. Au-dessus de 10 niveaux d’écart, l’XP gagnée diminue. Les donjons consomment une clef par entrée et offrent des ressources rares.</p></div></div>
    <div class="zone-list">${ZONES.map(z => placeCard(z, 'zone')).join('')}</div>
    <h2 class="h2" style="margin-top:24px">Donjons</h2>
    <p class="lead">Les clefs se fabriquent chez le Bricoleur, dans les Ateliers.</p>
    <div class="zone-list">${DUNGEONS.map(d => placeCard(d, 'dungeon')).join('')}</div>`;
}

/* ---------------------------- Vue : Inventaire ---------------------------- */
function renderInventaire() {
  const tabs = `<div class="subtabs"><button data-act="inv" data-v="res" aria-pressed="${ui.inv === 'res'}">Ressources</button><button data-act="inv" data-v="gear" aria-pressed="${ui.inv === 'gear'}">Équipements (${st.gear.length})</button></div>`;
  let body;
  if (ui.inv === 'res') {
    const ids = Object.keys(st.res).filter(id => st.res[id] > 0);
    const total = ids.reduce((s, id) => s + st.res[id] * RESOURCES[id].value, 0);
    body = ids.length ? `<div class="row between wrap" style="margin-bottom:10px"><span class="sub">Valeur totale au marchand : ${kamas(total)}</span>
      <button class="btn small" data-act="sellallres">Tout vendre sauf clefs et rares</button></div>
      <div class="res-grid">${ids.map(id => { const r = RESOURCES[id]; return `<div class="res${r.rare || r.key ? ' rare' : ''}"><span class="ri" aria-hidden="true">${r.icon}</span>
      <div style="min-width:0"><div class="rn">${r.name}</div><div class="rq">×${fmt(st.res[id])} · ${r.value} K pièce</div></div>
      <div class="res-actions"><button class="btn small" data-act="sellres" data-id="${id}" data-n="1" title="Vendre 1">−1</button><button class="btn small" data-act="sellres" data-id="${id}" data-n="all" title="Tout vendre">Tout</button></div></div>`; }).join('')}</div>`
      : `<div class="empty">Ton sac est vide. Les ressources tombent des monstres vaincus.</div>`;
  } else {
    const list = [...st.gear].sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || ITEMS[a.id].name.localeCompare(ITEMS[b.id].name));
    const h = selHero();
    body = list.length ? `${h ? `<div class="hero-pick"><span class="label" style="align-self:center">Équiper sur</span>${st.heroes.map(x => `<button data-act="selhero" data-hero="${x.id}" aria-pressed="${x.id === h.id}">${emblem(x.cls, true)}${esc(x.name)} <span class="lvl">${x.lvl}</span></button>`).join('')}</div>` : ''}
      <div class="grid">${list.map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid);
      return `<article class="card item${g.stasis ? ' stasis' : ''}"><div class="item-head"><div style="min-width:0"><div class="item-name">${itemIcon(g.id)} ${esc(d.name)}</div>
        <div class="item-meta">Niveau ${d.lvl} · ${SLOT_LABEL[d.slot === 'anneau' ? 'anneau1' : d.slot]}${d.set ? ` · ${SETS[d.set].name}` : ''}</div></div>${qualityTag(g)}</div>
        <div class="stats-list">${Object.entries(g.stats).map(([k, v]) => statLine(k, v) .replace('</div>', ` <span class="r">(${d.stats[k][0]}–${d.stats[k][1]})</span></div>`)).join('')}</div>
        ${by ? `<div class="equipped-by">Équipé par ${esc(by.name)}</div>` : ''}
        <div class="row wrap">
          ${h ? (() => { const need = d.harvest ? st.jobs.paysan.lvl < d.lvl : h.lvl < d.lvl; return `<button class="btn small gold" data-act="equip" data-uid="${g.uid}" ${need || (by && by.id === h.id) ? 'disabled' : ''}>${need ? `${d.harvest ? 'Paysan' : 'Niveau'} ${d.lvl} requis` : `Équiper sur ${esc(h.name)}`}</button>`; })() : ''}
          ${by ? '' : ui.sellUid === g.uid ? `<button class="btn small danger" data-act="sellgear" data-uid="${g.uid}">Confirmer · ${fmt(itemValue(g))} K</button><button class="btn small ghost" data-act="sellcancel">Annuler</button>`
            : `<button class="btn small ghost" data-act="sellask" data-uid="${g.uid}">Vendre</button>`}
        </div></article>`; }).join('')}</div>`
      : `<div class="empty">Aucun équipement. Fabrique ta première panoplie dans les Ateliers.</div>`;
  }
  return `<div class="section-head"><div><h2 class="h2">Inventaire</h2><p class="lead">Ressources et équipements sont partagés entre tous tes héros.</p></div></div>${tabs}${body}`;
}

/* ---------------------------- Vue : Récolte ---------------------------- */
function renderRecolte() {
  ui.gjob = ui.gjob && GATHER_JOBS[ui.gjob] ? ui.gjob : null;
  const jobs = Object.entries(GATHER_JOBS).map(([id, j]) => { const s = st.jobs[id]; const n = st.heroes.filter(h => h.act && h.act.type === 'harvest' && findPlace('harvest', h.act.id).job === id).length;
    return `<button class="job" data-act="gjob" data-v="${id}" aria-pressed="${ui.gjob === id}"><span class="row between"><b>${j.icon} ${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span>
      <span class="sub">${j.makes}${n ? ` · <span style="color:var(--xp)">${n} héros au travail</span>` : ''}</span>${bar('job thin', s.xp, jobXpToNext(s.lvl))}<span class="sub num">${fmt(s.xp)} / ${fmt(jobXpToNext(s.lvl))} XP</span></button>`; }).join('');
  let body = `<div class="empty">Choisis un métier pour voir ses ressources et y envoyer un héros.</div>`;
  if (ui.gjob) {
    const job = st.jobs[ui.gjob];
    body = `<p class="lead">${GATHER_JOBS[ui.gjob].text} Une récolte toutes les ${HARVEST_MS / 1000} s. La quantité augmente de 1 tous les 10 niveaux au-dessus du palier.</p>
    <div class="crop-list">${CROPS.filter(c => c.job === ui.gjob).map(c => {
      const locked = job.lvl < c.lvl; const [qa, qb] = cropQty(st, c);
      const here = st.heroes.filter(h => h.act && h.act.type === 'harvest' && h.act.id === c.id);
      return `<article class="card crop${locked ? ' locked' : ''}">
        <div class="crop-ico" aria-hidden="true">${c.icon}</div>
        <div class="crop-main"><div class="row wrap" style="gap:8px"><h3>${c.name}</h3><span class="lvl-range">Niv. ${c.lvl}</span>${here.map(h => emblem(h.cls, true)).join('')}</div>
          <div class="sub">${c.where} · +${c.xp} XP par récolte · ${locked ? 'verrouillé' : `${qa === qb ? qa : `${qa}–${qb}`} par récolte`} · stock ${fmt(st.res[c.id] || 0)} · ${c.value} K pièce</div></div>
        <div class="send">${locked ? `<span class="sub">🔒 ${GATHER_JOBS[c.job].name} niveau ${c.lvl} requis</span>` : st.heroes.length ? st.heroes.map(h => { const there = h.act && h.act.type === 'harvest' && h.act.id === c.id;
          return `<button class="btn small ${there ? '' : 'gold'}" data-act="send" data-hero="${h.id}" data-type="harvest" data-id="${c.id}" ${there ? 'disabled' : ''}>${there ? `${esc(h.name)} récolte` : `Envoyer ${esc(h.name)}`}</button>`; }).join('') : '<span class="sub">Recrute un héros d’abord.</span>'}</div>
      </article>`; }).join('')}</div>`;
  }
  return `<div class="section-head"><div><h2 class="h2">Récolte</h2><p class="lead">Envoie un héros travailler la terre plutôt que combattre. Il récolte tant que le jeu est ouvert, et le métier progresse pour tout ton compte.</p></div></div>
    <div class="jobs">${jobs}</div>${body}`;
}

/* ---------------------------- Vue : Ateliers ---------------------------- */
function renderAteliers() {
  const jobs = Object.entries(JOBS).map(([id, j]) => { const s = st.jobs[id]; const ready = RECIPES.filter(r => r.job === id && canCraft(st, r)).length;
    return `<button class="job" data-act="job" data-v="${id}" aria-pressed="${ui.job === id}"><span class="row between"><b>${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span>
    <span class="sub">${j.makes}${ready ? ` · <span style="color:var(--win)">${ready} possible${ready > 1 ? 's' : ''}</span>` : ''}</span>${bar('job thin', s.xp, jobXpToNext(s.lvl))}</button>`; }).join('');
  const js = st.jobs[ui.job];
  const isH = r => !!(ITEMS[r.out] && ITEMS[r.out].harvest);
  const nH = RECIPES.filter(r => r.job === ui.job && isH(r)).length, nC = RECIPES.filter(r => r.job === ui.job && !isH(r)).length;
  if (ui.rtab === 'recolte' && !nH) ui.rtab = 'combat';
  const rtabs = `<div class="eq-tabs" role="tablist" style="margin-bottom:14px"><button role="tab" data-act="rtab" data-v="combat" aria-selected="${ui.rtab !== 'recolte'}">Équipements de combat (${nC})</button><button role="tab" data-act="rtab" data-v="recolte" aria-selected="${ui.rtab === 'recolte'}" ${nH ? '' : 'disabled'}>Métiers de récolte (${nH})</button></div>`;
  const recipes = RECIPES.map((r, i) => [r, i]).filter(([r]) => r.job === ui.job && (ui.rtab === 'recolte' ? isH(r) : !isH(r))).map(([r, i]) => {
    const locked = js.lvl < r.lvl; const max = maxCraftable(st, r);
    const isRes = !!RESOURCES[r.out]; const d = isRes ? RESOURCES[r.out] : ITEMS[r.out];
    const head = isRes ? `${d.icon} ${esc(d.name)}` : `${itemIcon(r.out)} ${esc(d.name)}`;
    const meta = isRes ? `${d.food ? 'Consommable' : 'Clef de donjon'} · en stock : ${st.res[r.out] || 0}` : d.harvest ? `Outil de récolte · ${HARVEST_SLOT_LABEL[d.slot]} · Paysan niveau ${d.lvl}` : `Équipement niveau ${d.lvl}${d.set ? ' · ' + SETS[d.set].name : ''}`;
    return `<article class="card item recipe${locked ? ' locked' : ''}">
      <div class="item-head"><div style="min-width:0"><div class="item-name">${head}</div><div class="item-meta">${meta}</div></div>
      <span class="quality">Métier ${r.lvl}</span></div>
      ${isRes ? '' : `<div class="stats-list">${Object.entries(d.stats).map(([k, [a, b]]) => `<div class="s" style="--c:${STAT_COLOR[k]}">${a === b ? a : `${a} à ${b}`} ${STAT_LABEL[k]}</div>`).join('')}</div>`}
      <div class="ing">${Object.entries(r.ing).map(([id, n]) => { const have = st.res[id] || 0; return `<span class="${have >= n ? 'ok' : 'no'}">${RESOURCES[id].icon} ${RESOURCES[id].name} ${fmt(have)}/${n}</span>`; }).join('')}</div>
      <div class="row wrap">${locked ? `<span class="sub">Requiert ${JOBS[r.job].name} niveau ${r.lvl}</span>` :
        `<button class="btn small gold" data-act="craft" data-i="${i}" data-n="1" ${max < 1 ? 'disabled' : ''}>Fabriquer</button>
         <button class="btn small" data-act="craft" data-i="${i}" data-n="10" ${max < 2 ? 'disabled' : ''}>×${Math.min(10, Math.max(max, 2))}</button>`}</div>
    </article>`;
  }).join('');
  return `<div class="section-head"><div><h2 class="h2">Ateliers</h2><p class="lead">Transforme les ressources en équipements. Chaque objet fabriqué reçoit un jet aléatoire dans sa fourchette de stats. Les métiers gagnent de l’expérience à chaque fabrication.</p></div></div>
    <div class="jobs">${jobs}</div>${rtabs}<div class="grid">${recipes || '<div class="empty">Aucune recette ici pour ce métier.</div>'}</div>`;
}


/* ---------------------------- Vue : Options ---------------------------- */
function renderOptions() {
  const s = st.stats;
  return `<div class="section-head"><div><h2 class="h2">Options</h2><p class="lead">La partie est sauvegardée automatiquement dans ce navigateur toutes les 10 secondes. Exporte-la pour la garder ailleurs ou changer d’appareil.</p></div></div>
  <div class="grid wide">
    <section class="card stack"><div class="label">Interface</div>
      <p class="sub" style="margin:0">Tu utilises l’interface classique. La nouvelle interface utilise la même partie.</p>
      <div class="row"><button class="btn gold" data-act="skin" data-v="new">Passer à la nouvelle interface</button></div>
      <p class="sub" style="margin:0">La page se recharge pour appliquer le changement.</p>
    </section>
    <section class="card stack"><div class="label">Format d’affichage</div>
      <div class="row wrap">${[['auto', 'Automatique'], ['mobile', 'Téléphone'], ['pc', 'PC']].map(([v, l]) => `<button class="btn ${LAYOUT === v ? 'gold' : ''}" data-act="layout" data-v="${v}">${l}</button>`).join('')}</div>
    </section>
    <section class="card stack"><div class="label">Statistiques</div>
      <div class="kv"><div><span>Combats gagnés</span><b>${fmt(s.fights)}</b></div><div><span>Défaites</span><b>${fmt(s.deaths)}</b></div>
      <div><span>Monstres vaincus</span><b>${fmt(s.totalKills)}</b></div><div><span>Objets fabriqués</span><b>${fmt(s.crafted)}</b></div>
      <div><span>Kamas gagnés</span><b>${fmt(s.kamasEarned)}</b></div><div><span>Partie commencée</span><b>${new Date(st.created).toLocaleDateString('fr-FR')}</b></div></div>
    </section>
    <section class="card stack"><div class="label">Exporter</div>
      <textarea id="exportbox" readonly>${exportSave(st)}</textarea>
      <div class="row"><button class="btn" data-act="copyexport">Copier</button><span class="sub" id="copymsg"></span></div>
    </section>
    <section class="card stack"><div class="label">Importer</div>
      <textarea id="importbox" placeholder="Colle ici une sauvegarde exportée"></textarea>
      <div class="row"><button class="btn gold" data-act="import">Charger cette sauvegarde</button><span class="sub">${esc(ui.importMsg)}</span></div>
    </section>
    <section class="card stack"><div class="label">Recommencer</div>
      <p class="sub" style="margin:0">Efface définitivement la partie de ce navigateur.</p>
      <div class="row">${ui.resetStep ? `<button class="btn danger" data-act="reset">Oui, tout effacer</button><button class="btn ghost" data-act="resetcancel">Annuler</button>` : `<button class="btn danger" data-act="resetask">Effacer la partie</button>`}</div>
    </section>
  </div>`;
}

/* ---------------------------- Rendu principal ---------------------------- */
const RENDER = { combat: renderCombat, recolte: renderRecolte, heros: renderHeros, carte: renderCarte, inventaire: renderInventaire, ateliers: renderAteliers, options: renderOptions };
function canRebuild() {
  if (pointerDown) return false;
  const a = document.activeElement;
  return !(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && $('#main').contains(a));
}
function renderMain(force) {
  if (!force && !canRebuild()) return;
  $('#main').innerHTML = (RENDER[ui.view] || renderCombat)();
  if (ui.view === 'combat') ui.lastSig = combatSig();
}
let lastSlow = 0;
function render(force) {
  renderTop();
  const now = Date.now();
  if (force) { renderMain(true); lastSlow = now; return; }
  if (ui.view === 'combat' && st.heroes.length) {
    if (combatSig() !== ui.lastSig) renderMain(); else patchCombat();
  } else if (now - lastSlow > 1500 && ui.view !== 'options') {
    renderMain(); lastSlow = now;
  }
}
function renderModal() {
  const m = ui.modal; const box = $('#modal');
  if (!m) { box.hidden = true; box.innerHTML = ''; return; }
  box.hidden = false;
  const loot = Object.entries(m.loot).sort((a, b) => b[1] - a[1]).slice(0, 8);
  box.innerHTML = `<div class="card modal stack" role="dialog" aria-label="Pendant ton absence">
    <p class="label" style="margin:0">Pendant ton absence · ${fmtDur(m.ms)}${m.ms >= OFFLINE_CAP_MS ? ' (max)' : ''}</p>
    <p class="big">Tes héros ont travaillé</p>
    <div class="summary"><div><b>${fmt(m.xp)}</b><span>XP</span></div><div><b>${fmt(m.kamas)}</b><span>Kamas</span></div><div><b>${fmt(m.kills)}</b><span>Vaincus</span></div></div>
    ${Object.entries(m.levels).map(([n, [a, b]]) => `<div class="sub"><b style="color:var(--fg)">${esc(n)}</b> : niveau ${a} → <b class="lvl">${b}</b></div>`).join('')}
    ${m.runs ? `<div class="sub">Donjons terminés : <b>${m.runs}</b></div>` : ''}
    ${m.deaths ? `<div class="sub">Défaites : ${m.deaths}</div>` : ''}
    ${loot.length ? `<div class="ing">${loot.map(([r, n]) => `<span>${RESOURCES[r].icon} ${RESOURCES[r].name} ×${fmt(n)}</span>`).join('')}</div>` : ''}
    <button class="btn gold" data-act="closemodal">Récupérer</button></div>`;
}

/* ---------------------------- Actions ---------------------------- */
const ACTIONS = {
  view(d) { ui.view = d.v; ui.resetStep = 0; ui.sellUid = null; window.scrollTo(0, 0); },
  send(d) { const h = heroById(d.hero); setActivity(st, h, d.type, d.id, +d.t || 0); toast(`${h.name} part pour ${placeName(h.act)}.`); ui.view = 'combat'; },
  stop(d) { const h = heroById(d.hero); setActivity(st, h, null); },
  selhero(d) { ui.hero = d.hero; },
  alloc(d) { allocate(selHero(), d.stat, +d.n); },
  resetstats() { resetStats(st, selHero()); selHero().auto = ''; },
  equip(d) { const err = equip(st, selHero(), d.uid, d.slot || null); if (err) toast(err, 'warn'); },
  unequip(d) { unequipSlot(st, selHero(), d.slot); },
  toggledetail() { ui.detailHidden = !ui.detailHidden; },
  gjob(d) { ui.gjob = ui.gjob === d.v ? null : d.v; },
  unrelic() { selHero().relic = null; },
  rtab(d) { ui.rtab = d.v; },
  eqtab(d) { ui.eqTab = d.v; },
  hslot(d) { ui.hslot = ui.hslot === d.slot ? null : d.slot; },
  hunequip(d) { const h = selHero(); if (h.hequip) delete h.hequip[d.slot]; },
  togglemon(d) { ui.openMons = ui.openMons || {}; ui.openMons[d.k] = !ui.openMons[d.k]; },
  ztier(d) { ui.zoneTier = ui.zoneTier || {}; ui.zoneTier[d.id] = +d.t; },
  togglezone(d) { ui.openZones = ui.openZones || {}; ui.openZones[d.id] = !ui.openZones[d.id]; },
  pickslot(d) { ui.slot = d.slot && ui.slot !== d.slot ? d.slot : null; },
  inv(d) { ui.inv = d.v; },
  sellres(d) { const k = sellRes(st, d.id, d.n === 'all' ? Infinity : +d.n); if (k) toast(`+${fmt(k)} kamas`); },
  sellallres() { let k = 0; for (const id of Object.keys(st.res)) if (!RESOURCES[id].rare && !RESOURCES[id].key) k += sellRes(st, id, Infinity); if (k) toast(`Vendu pour ${fmt(k)} kamas`); },
  sellask(d) { ui.sellUid = d.uid; },
  sellcancel() { ui.sellUid = null; },
  sellgear(d) { const k = sellGear(st, d.uid); ui.sellUid = null; if (k) toast(`Vendu pour ${fmt(k)} kamas`); },
  job(d) { ui.job = d.v; },
  craft(d) {
    const r = RECIPES[+d.i]; const n = Math.min(+d.n, maxCraftable(st, r)); let last, lv = false, xp = 0;
    const made = [];
    for (let i = 0; i < n; i++) { last = craft(st, r); if (!last) break; xp += last.xp; lv = lv || last.lvUp; made.push(last); }
    if (!last) return;
    craftPop(r, made, xp);
    const name = RESOURCES[r.out] ? RESOURCES[r.out].name : ITEMS[r.out].name;
    toast(`${n > 1 ? n + '× ' : ''}${name} fabriqué${n > 1 ? 's' : ''} · +${xp} XP ${JOBS[r.job].name}`, 'quest');
    if (lv) toast(`${JOBS[r.job].name} passe niveau ${st.jobs[r.job].lvl} !`, 'lvl');
  },
  rcls(d) { ui.recruitCls = d.cls; },
  rrandom() { ui.recruitName = HERO_NAMES[irnd(0, HERO_NAMES.length - 1)]; },
  recruit() {
    const name = (ui.recruitName || '').trim().slice(0, 18) || CLASSES[ui.recruitCls].name;
    const r = recruit(st, name, ui.recruitCls);
    if (typeof r === 'string') { toast(r, 'warn'); return; }
    ui.hero = r.id; ui.recruitName = '';
    toast(`${r.name} rejoint l'aventure !`, 'quest');
    if (st.heroes.length === 1) { setActivity(st, r, 'zone', 'incarnam'); ui.view = 'combat'; }
    else ui.view = 'carte';
  },
  copyexport() {
    const ta = $('#exportbox'); const msg = $('#copymsg');
    const fallback = () => { ta.focus(); ta.select(); msg.textContent = 'Sélectionné : copie avec Ctrl+C.'; };
    try { navigator.clipboard.writeText(ta.value).then(() => { msg.textContent = 'Copié.'; }, fallback); } catch (e) { fallback(); }
    return 'keep';
  },
  import() {
    try { st = importSave($('#importbox').value); ui.importMsg = 'Sauvegarde chargée.'; ui.hero = null; saveGame(); toast('Sauvegarde chargée.', 'quest'); }
    catch (e) { ui.importMsg = 'Ce texte n’est pas une sauvegarde valide. Vérifie que tu l’as copié en entier.'; }
  },
  resetask() { ui.resetStep = 1; },
  resetcancel() { ui.resetStep = 0; },
  reset() { st = newState(); ui.resetStep = 0; ui.hero = null; ui.view = 'combat'; saveGame(); toast('Nouvelle partie.'); },
  layout(d) { applyLayout(d.v); },
  skin(d) { saveGame(); setSkin(d.v); return 'keep'; },
  closemodal() { ui.modal = null; renderModal(); return 'keep'; },
};
document.addEventListener('click', e => {
  ui.click = { x: e.clientX, y: e.clientY };
  const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
  const fn = ACTIONS[el.dataset.act]; if (!fn) return;
  const r = fn(el.dataset);
  if (r !== 'keep') { saveGame(); render(true); }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.change === 'auto') { const h = selHero(); h.auto = el.value; if (h.auto) autoAllocate(h); el.blur(); saveGame(); render(true); }
});
document.addEventListener('input', e => { if (e.target.dataset.input === 'rname') ui.recruitName = e.target.value; });
document.addEventListener('pointerdown', e => {
  pointerDown = true;
  const t = e.target.closest('.tab[data-act="view"]');
  if (t && e.button === 0 && t.dataset.v !== ui.view) { ACTIONS.view(t.dataset); saveGame(); pointerDown = false; render(true); }
}, true);
document.addEventListener('pointerup', () => setTimeout(() => { pointerDown = false; }, 0), true);
document.addEventListener('pointercancel', () => { pointerDown = false; }, true);

/* ---------------------------- Boucle ---------------------------- */
function loop() {
  const now = Date.now(); let dt = now - st.lastTick; st.lastTick = now;
  if (dt < 0) dt = 0;
  if (dt > 15000) {
    const sum = simulateOffline(st, dt); if (sum.kills > 0) { ui.modal = sum; renderModal(); }
  } else {
    for (const h of st.heroes) tickHero(st, h, dt, liveEv);
  }
  render();
}

function start(data) {
  st = loadGame(data && data.save);
  if (!ui.view || !RENDER[ui.view]) ui.view = 'combat';
  // progression hors-ligne depuis la dernière visite
  const away = Date.now() - (st.lastTick || Date.now());
  st.lastTick = Date.now();
  if (away > 15000 && st.heroes.some(h => h.act)) { const sum = simulateOffline(st, away); if (sum.kills > 0) ui.modal = sum; }
  render(true); renderModal();
  setInterval(loop, 200);
  setInterval(saveGame, 10000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame(); });
  window.addEventListener('pagehide', saveGame);
  window.claude?.hot?.snapshot?.(() => ({ save: serialize(st) }));
  window.__game = { get st() { return st; }, ui, liveEv, render }; // accès de débogage (console)
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
