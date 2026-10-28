/* =====================================================================
   AMAKNA IDLE — INTERFACE v2
   Barre latérale (navigation + groupe), scènes de combat, poupée
   d'équipement, inventaire en cases avec inspecteur.
   ===================================================================== */
const LS_KEY = 'amakna-idle-save-v1';
const LS_UI = 'amakna-idle-ui2';
const VIEWS = [
  ['combat', 'Combats', 'Tes héros combattent seuls tant que la page est ouverte.'],
  ['heros', 'Héros', 'Équipement, caractéristiques et sorts de chaque héros.'],
  ['carte', 'Carte', 'Choisis où envoyer chaque héros.'],
  ['inventaire', 'Inventaire', 'Ressources et équipements partagés par tout le groupe.'],
  ['recolte', 'Récolte', 'Envoie un héros travailler la terre plutôt que combattre.'],
  ['ateliers', 'Ateliers', 'Transforme tes ressources en équipements.'],
  ['options', 'Options', 'Sauvegarde, statistiques et choix de l’interface.'],
];
const STAT_HINT = { vit: '1 pt = +1 PV', sag: '1 pt = +0,5 % XP', deg: '1 pt = +1 % dégâts et soins' };
const STAT_COLOR = { xpPct: 'var(--xp)', dmgPct: 'var(--hp)', dodge: 'var(--air)', regen: 'var(--win)', speed: 'var(--gold-2)', kamas: 'var(--gold-2)', rxp: 'var(--xp)', rqty: 'var(--win)', rspd: 'var(--gold-2)', vit: 'var(--vit)', sag: 'var(--sag)', deg: 'var(--hp)', for: 'var(--terre)', int: 'var(--feu)', cha: 'var(--eau)', agi: 'var(--air)', crit: 'var(--hp)', pp: 'var(--eau)', res: 'var(--muted)', soin: 'var(--win)', dmg: 'var(--fg)', pa: 'var(--eau)' };

/* Ambiance des scènes : [ciel, sol] par région */
const THEME = {
  Incarnam: ['#8ec5dc', '#86b86c'], Astrub: ['#a9cf8f', '#6d9a45'], Amakna: ['#5f8a4a', '#3d5a2c'],
  Cania: ['#d6be8d', '#a07f4c'], Koalak: ['#79a466', '#466b36'], Sidimote: ['#8a7a9e', '#4a3e58'],
  harvest: ['#ecd58e', '#b89140'], idle: ['#7a8a96', '#4f5a44'],
};

const IC = d => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONS = {
  combat: IC('<path d="M4 4l10 10M11.5 16.5l5-5M15 15l4.5 4.5M20 4 10 14M7.5 11.5l5 5M9 15l-4.5 4.5"/>'),
  heros: IC('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c.6-4 3.6-6.4 7.5-6.4s6.9 2.4 7.5 6.4"/>'),
  carte: IC('<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z"/><path d="M9 4v13.5M15 6.5V20"/>'),
  inventaire: IC('<path d="M5 8.5h14l-1.2 11.5H6.2Z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/><path d="M9.5 12.5h5"/>'),
  recolte: IC('<path d="M12 21V8"/><path d="M12 8c-2.2-.9-3.2-2.8-3.2-5 2.2.9 3.2 2.8 3.2 5Zm0 0c2.2-.9 3.2-2.8 3.2-5-2.2.9-3.2 2.8-3.2 5Z"/><path d="M12 13.5c-2.3-.7-3.7-2.4-3.9-4.6 2.3.6 3.7 2.4 3.9 4.6Zm0 0c2.3-.7 3.7-2.4 3.9-4.6-2.3.6-3.7 2.4-3.9 4.6Z"/>'),
  ateliers: IC('<path d="M14.5 3.5 20.5 9.5 17.5 12.5 11.5 6.5Z"/><path d="M13 8 4 17l3 3 9-9"/>'),
  options: IC('<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'),
};
const eggSvg = id => `<svg class="egg" viewBox="0 0 32 32" aria-hidden="true"><defs><radialGradient id="${id}" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fff2c4"/><stop offset=".45" stop-color="#e8aa2e"/><stop offset="1" stop-color="#8a5a0c"/></radialGradient></defs><path d="M16 2.5c6.2 0 10.5 9.5 10.5 16a10.5 10.5 0 0 1-21 0c0-6.5 4.3-16 10.5-16Z" fill="url(#${id})" stroke="#3a2506" stroke-width="1"/><path d="M6.3 17.5c3.2 1.6 6.3 2.3 9.7 2.3s6.5-.7 9.7-2.3" fill="none" stroke="#4f8a3a" stroke-width="2.2"/><ellipse cx="12" cy="9" rx="2.2" ry="3.4" fill="#fff8" transform="rotate(-20 12 9)"/></svg>`;

let st;
const ui = {
  view: 'combat', hero: null, job: 'tailleur', invFilter: 'all', sel: null, slot: null, hslot: null, eqTab: 'combat',
  rtab: 'combat', onlyCraft: false, gjob: 'paysan', place: null, zoneTier: {}, openMons: {}, resetStep: 0, sellUid: null,
  recruitCls: 'iop', recruitName: '', recruitOpen: false, importMsg: '', detailHidden: false, lastSig: '',
};
const UI_KEEP = ['view', 'hero', 'job', 'invFilter', 'eqTab', 'rtab', 'onlyCraft', 'gjob', 'place', 'zoneTier'];
let pointerDown = false;
let lastScroll = 0;
document.addEventListener('scroll', () => { lastScroll = Date.now(); }, true);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = s => document.querySelector(s);
const pct = v => { const p = v * 100; return (p >= 10 ? p.toFixed(0) : p >= 1 ? p.toFixed(1) : p.toFixed(2)).replace('.', ',') + ' %'; };
const short = n => n >= 100000 ? Math.round(n / 1000) + 'k' : n >= 10000 ? (n / 1000).toFixed(1).replace('.', ',') + 'k' : String(n);

/* ---------------------------- Persistance ---------------------------- */
function saveGame() {
  try { localStorage.setItem(LS_KEY, serialize(st)); } catch (e) {}
  try { localStorage.setItem(LS_UI, JSON.stringify(Object.fromEntries(UI_KEEP.map(k => [k, ui[k]])))); } catch (e) {}
}
function loadGame(snapshot) {
  let raw = snapshot || null;
  if (!raw) { try { raw = localStorage.getItem(LS_KEY); } catch (e) {} }
  try { Object.assign(ui, JSON.parse(localStorage.getItem(LS_UI) || '{}')); } catch (e) {}
  if (raw) { try { return migrate(JSON.parse(raw)); } catch (e) { console.warn('Sauvegarde illisible', e); } }
  return newState();
}

/* ---------------------------- Notifications ---------------------------- */
const liveEv = {
  log(h, text, cls) { h.log.push({ t: text, c: cls }); if (h.log.length > 30) h.log.splice(0, h.log.length - 30); },
  levelup(h, spells) { toast(`${h.name} passe niveau ${h.lvl} !` + (spells.length ? ` Nouveau sort : ${spells.map(s => s.name).join(', ')}.` : ''), 'lvl'); },
  reward(h, xp, k, loot, gear = []) {
    for (const g of gear) toast(ITEMS[g.id].relic ? `RELIQUE ! ${h.name} a trouvé ${ITEMS[g.id].name} !` : g.stasis ? `${h.name} a trouvé ${ITEMS[g.id].name} STASIFIÉ ! Stats ×2 du jet max.` : `${h.name} a trouvé ${ITEMS[g.id].name} (jet ${Math.round(itemQuality(g) * 100)} %) !`, ITEMS[g.id].relic ? 'relic' : g.stasis ? 'stasis' : 'rare');
    for (const r of Object.keys(loot)) if (RESOURCES[r].rare) toast(`${h.name} obtient ${RESOURCES[r].icon} ${RESOURCES[r].name} !`, 'rare');
  },
  dungeonDone(h, p) { toast(`${h.name} a vaincu ${p.name} !`, 'quest'); },
  jobup(j, lv) { toast(`${GATHER_JOBS[j].name} passe niveau ${lv} !`, 'lvl'); },
  foodEnd(h) { toast(`L’effet du repas de ${h.name} est terminé.`, 'warn'); },
  stopped(h, why) { toast(`${h.name} s'arrête : ${why}.`, 'warn'); },
  archiFound(h, mid) { toast(`👹 Archimonstre repéré : ${MONSTERS[mid].name} ! Bouton en haut à droite.`, 'quest'); },
  defeat() {},
};
function toast(text, cls = '') {
  const box = $('#toasts'); if (!box) return;
  const el = document.createElement('div'); el.className = 'toast ' + cls; el.textContent = text;
  box.appendChild(el);
  while (box.children.length > 4) box.firstChild.remove();
  setTimeout(() => el.remove(), 4500);
}
function craftPop(r, made, xp) {
  const { x, y } = ui.click || { x: innerWidth / 2, y: innerHeight / 2 };
  let html;
  if (RESOURCES[r.out]) html = `<b>${RESOURCES[r.out].icon} ${made.length > 1 ? made.length + '× ' : ''}${esc(RESOURCES[r.out].name)}</b>`;
  else {
    const gs = made.map(m => m.gear).filter(Boolean);
    const best = gs.reduce((a, b) => (itemQuality(b) > itemQuality(a) ? b : a));
    const q = Math.round(itemQuality(best) * 100);
    html = `<b>${itemIcon(best.id)} ${gs.length > 1 ? gs.length + '× ' : ''}${esc(ITEMS[best.id].name)}</b>
      <span class="pop-q ${qClass(best)}">${gs.length > 1 ? 'Meilleur jet' : 'Jet'} ${q} %</span>
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

/* ---------------------------- Petits composants ---------------------------- */
const CLASS_GLYPH = {
  iop: '<path d="M19.5 3.5 20.5 4.5 11 14 9.5 14.5 10 13Z" fill="currentColor"/><path d="M19.5 3.5 21 3 20.5 4.5" fill="currentColor"/><path d="M7 11.5l5.5 5.5M9.8 14.2 5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="4.3" cy="19.7" r="1.4" fill="currentColor"/>',
  cra: '<path d="M8 3.5c6 .5 12 6.5 12.5 12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M8 3.5 20.5 16" stroke="currentColor" stroke-width=".9" opacity=".7" fill="none"/><path d="M3.5 20.5 17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M18.5 5.5 14.5 6.3 17.7 9.5Z" fill="currentColor"/><path d="M3.5 20.5l.2-3M3.5 20.5l3-.2M5 19l.2-3M5 19l3-.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none"/>',
  zobal: '<path d="M12 2.8C7 2.8 3.8 6.6 3.8 11.2c0 5.2 3.5 9.8 8.2 9.8s8.2-4.6 8.2-9.8c0-4.6-3.2-8.4-8.2-8.4Z" fill="currentColor"/><path d="M7.4 10.6q2-2.4 3.8 0M12.8 10.6q2-2.4 3.8 0M8 15.2q4 3.4 8 0" stroke="var(--c)" stroke-width="1.9" fill="none" stroke-linecap="round"/>',
  sacrieur: '<path d="M12 2.8s6.3 7.2 6.3 11.4a6.3 6.3 0 0 1-12.6 0C5.7 10 12 2.8 12 2.8Z" fill="currentColor"/><path d="M9.3 12.5l2 3.5M12 11.5l1.4 4.8M14.7 12.5l-.6 3.6" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round"/>',
  enutrof: '<ellipse cx="12" cy="17.5" rx="7" ry="2.6" fill="currentColor" opacity=".55"/><ellipse cx="12" cy="14.5" rx="7" ry="2.6" fill="currentColor" opacity=".8"/><circle cx="12" cy="9" r="5.8" fill="currentColor"/><circle cx="12" cy="9" r="3.9" fill="none" stroke="var(--c)" stroke-width="1.2"/><path d="M12 6.6l1.6 2.4-1.6 2.4-1.6-2.4Z" fill="var(--c)"/>',
  ecaflip: '<path d="M4.2 3.8 9 7.9c1.9-.6 4.1-.6 6 0l4.8-4.1.5 8.7c0 4.6-3.6 7.7-8.3 7.7S3.7 17.1 3.7 12.5Z" fill="currentColor"/><path d="M7.6 12.2c.9-1.1 2.1-1.1 2.8 0M13.6 12.2c.9-1.1 2.1-1.1 2.8 0" stroke="var(--c)" stroke-width="1.6" stroke-linecap="round" fill="none"/><path d="M12 14.1l-1.3 1.3h2.6Z" fill="var(--c)"/><path d="M12 15.4v1.1M9.9 16.7c.8.5 1.5.5 2.1 0 .6.5 1.3.5 2.1 0" stroke="var(--c)" stroke-width=".9" stroke-linecap="round" fill="none"/><path d="M1.4 12.6l3.6.8M1.7 16l3.4-.9M22.6 12.6l-3.6.8M22.3 16l-3.4-.9" stroke="currentColor" stroke-width=".9" stroke-linecap="round"/>',
  xelor: '<path d="M6.5 3h11M6.5 21h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M8 3.5c0 4.6 3.6 5.8 3.6 8.5S8 15.9 8 20.5h8c0-4.6-3.6-5.8-3.6-8.5S16 7.1 16 3.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.6 19.6c.6-1.9 1.5-2.6 2.4-2.6s1.8.7 2.4 2.6ZM10 6.2h4c-.5 1.4-1.2 2.1-2 2.6-.8-.5-1.5-1.2-2-2.6Z" fill="currentColor"/><circle cx="12" cy="13.4" r=".7" fill="currentColor"/>',
  sram: '<path d="M14.5 3.2A8.8 8.8 0 1 0 20.8 16 7 7 0 1 1 14.5 3.2Z" fill="currentColor"/><path d="M17.5 5.5 12 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M19.2 3.8l1-1M16.3 4.3l3.4 3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
};
function emblem(cls, size) {
  const c = CLASSES[cls];
  return `<span class="emblem${size ? ' ' + (size === true ? 'sm' : size) : ''}" style="--c:${c.color}" title="${c.name}" aria-hidden="true"><svg viewBox="0 0 24 24">${CLASS_GLYPH[cls] || ''}</svg></span>`;
}
function bar(kind, val, max) { const p = max > 0 ? clamp(val / max * 100, 0, 100) : 0; return `<div class="bar ${kind}"><i style="width:${p.toFixed(1)}%"></i></div>`; }
function setBar(el, val, max) { const i = el && el.querySelector('.bar > i'); if (i) i.style.width = (max > 0 ? clamp(val / max * 100, 0, 100) : 0).toFixed(1) + '%'; }
const coin = '<span class="kama" aria-hidden="true"></span>';
function kamasHtml(n) { return `<span class="kamas">${coin}<b class="num">${fmt(n)}</b></span>`; }
function itemIcon(id) { return itemArt(id); }
function heroById(id) { return st.heroes.find(h => h.id === id); }
function selHero() { let h = heroById(ui.hero); if (!h && st.heroes.length) { h = st.heroes[0]; ui.hero = h.id; } return h; }
function placeName(act) { if (!act) return ''; const p = findPlace(act.type, act.id); return p ? subName(p, act) : ''; }
function mmss(ms) { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
function foodChip(h) { if (!h.food || h.food.left <= 0) return ''; const r = RESOURCES[h.food.id]; return `${r.icon} ${r.food.speed ? `Vitesse ×${1 + r.food.speed / 100}` : r.name} · ${mmss(h.food.left)}`; }
function themeStyle(th) { return `--sky:${th[0]};--ground:${th[1]}`; }
function qClass(g) {
  if (ITEMS[g.id].relic) return 'q-relic';
  if (g.stasis) return 'q-stasis';
  const q = itemQuality(g); return q > 0.8 ? 'q-high' : q > 0.4 ? 'q-mid' : 'q-low';
}
function qualityTag(g) {
  if (ITEMS[g.id].relic) return '<span class="qtag q-relic">Relique</span>';
  if (g.stasis) return '<span class="qtag q-stasis">Stasifié ×2</span>';
  return `<span class="qtag ${qClass(g)}">Jet ${Math.round(itemQuality(g) * 100)} %</span>`;
}
function statusOf(h) {
  if (!h.act) return ['idle', 'Inactif'];
  if (h.act.type === 'harvest') return ['harvest', 'Récolte'];
  if (h.resting) return ['resting', h.hp <= 0 ? `KO · ${Math.ceil(h.wait / 1000)} s` : `Repos ${Math.ceil(h.wait / 1000)} s`];
  if (h.fight) return ['fighting', `Combat · tour ${h.fight.turn}`];
  return ['resting', 'En route'];
}
function actLabel(h) { return !h.act ? '' : h.act.type === 'dungeon' ? 'Donjon' : h.act.type === 'harvest' ? 'Récolte' : 'Zone'; }
function arenaTheme(h) {
  if (!h.act) return THEME.idle;
  if (h.act.type === 'harvest') return THEME.harvest;
  const p = findPlace(h.act.type, h.act.id); return THEME[p.region] || THEME.idle;
}
function heroChip(h, attrs, label, extraCls = '') {
  return `<button class="send-chip ${extraCls}" ${attrs} style="--c:${CLASSES[h.cls].color}">${emblem(h.cls, true)}<span class="sc-t"><b>${esc(h.name)}</b><small>${label}</small></span><span class="lvl">${h.lvl}</span></button>`;
}

/* ---------------------------- Coquille de l'application ---------------------------- */
function shell() {
  const nav = VIEWS.map(([id, l]) => `<button class="nav-btn" data-act="view" data-v="${id}">${ICONS[id]}<span>${l}</span></button>`).join('');
  $('#app').innerHTML = `
  <aside class="side">
    <div class="brand">${eggSvg('egg-a')}<div><b class="display">Amakna</b><small>Idle · fan-game</small></div></div>
    <nav class="nav" aria-label="Sections du jeu">${nav}</nav>
    <div class="party" id="party"></div>
  </aside>
  <div class="page">
    <header class="topbar">
      <div class="tb-brand">${eggSvg('egg-b')}</div>
      <div class="tb-title" id="tbtitle"></div>
      <div class="wallet" id="wallet"></div>
    </header>
    <main id="main"></main>
    <footer class="foot">Jeu de fan non officiel et gratuit, inspiré de l'univers de Dofus. Dofus et tous les noms associés appartiennent à Ankama Games. Aucune image du jeu original n'est utilisée.</footer>
  </div>
  <nav class="bottom-nav" aria-label="Sections du jeu">${nav}</nav>
  <button class="chat-fab" data-act="chattoggle" aria-label="Ouvrir le chat Général">💬 <span>Général</span><i class="chat-badge" id="chatbadge" hidden></i></button>
  <section class="chat-panel" id="chat" hidden aria-label="Chat Général">
    <header class="chat-h"><b class="display">Général</b><button type="button" class="chat-st" id="chatst" data-act="chatplayers" aria-expanded="false">Connexion…</button><button class="btn sm ghost" data-act="chattoggle" aria-label="Fermer le chat">✕</button></header>
    <div class="chat-players" id="chatplayers" hidden></div>
    <div class="chat-list" id="chatlist"></div>
    <form class="chat-form" id="chatform">
      <div class="chat-name" id="chatnamebox"><label class="label" for="chatname">Ton pseudo</label><input id="chatname" type="text" maxlength="20" autocomplete="nickname" placeholder="Pseudo visible par tous"></div>
      <div class="chat-row"><input id="chatmsg" type="text" maxlength="240" autocomplete="off" placeholder="Écris un message…"><button class="btn sm gold" type="submit">Envoyer</button></div>
    </form>
  </section>`;
}
function updateChrome() {
  for (const b of document.querySelectorAll('.nav-btn')) { const cur = String(ui.view === b.dataset.v); if (b.getAttribute('aria-current') !== cur) b.setAttribute('aria-current', cur); }
  const v = VIEWS.find(x => x[0] === ui.view) || VIEWS[0];
  const tt = `<h1 class="display">${v[1]}</h1><p>${v[2]}</p>`;
  if (tt !== ui._tt) { $('#tbtitle').innerHTML = tt; ui._tt = tt; }
  const active = st.heroes.filter(h => h.act).length;
  const w = `<span class="wchip gold" title="Kamas">${coin}<b class="num">${fmt(st.kamas)}</b></span>
    <span class="wchip" title="Héros en activité"><small>Actifs</small><b class="num">${active}/${st.heroes.length}</b></span>
    ${acc.token ? `<button class="wchip acc-chip hide-sm" data-act="goaccount" title="Compte connecté">${avatarHtml(acc.name, acc.avatarAt, 'sm')}<b>${esc(acc.name)}</b></button>` : ''}
    <span class="wchip hide-sm" title="Monstres vaincus"><small>Vaincus</small><b class="num">${fmt(st.stats.totalKills)}</b></span>`;
  if (w !== ui._wallet) { $('#wallet').innerHTML = w; ui._wallet = w; }
  renderParty();
}
function renderParty() {
  const box = $('#party'); if (!box) return;
  const more = st.heroes.length < RECRUIT_COST.length;
  const sig = st.heroes.map(h => [h.id, h.name, h.lvl, h.cls, h.capital > 0].join(':')).join('|') + `|${ui.view}|${ui.hero}|${more}|${st.heroes.length}`;
  if (sig !== ui._psig) {
    ui._psig = sig;
    box.innerHTML = `<div class="party-h"><span>Groupe</span><small>${st.heroes.length}/${RECRUIT_COST.length}</small></div>`
      + st.heroes.map(h => `<button class="pm${ui.view === 'heros' && ui.hero === h.id ? ' on' : ''}" data-act="gohero" data-hero="${h.id}" data-pm="${h.id}" style="--c:${CLASSES[h.cls].color}">${emblem(h.cls, true)}
        <span class="pm-t"><b>${esc(h.name)}${h.capital ? ' <i class="pm-pts" title="Points à répartir">+</i>' : ''}</b><small class="pst" data-pk="st"></small><span class="pm-hp"><i data-pk="hp"></i></span></span><span class="lvl">${h.lvl}</span></button>`).join('')
      + (more && st.heroes.length ? `<button class="pm add" data-act="recruitnav"><span class="plus">＋</span><span class="pm-t"><b>Recruter</b><small>${fmt(RECRUIT_COST[st.heroes.length])} kamas</small></span></button>` : '');
  }
  for (const h of st.heroes) {
    const el = box.querySelector(`[data-pm="${h.id}"]`); if (!el) continue;
    const [sc] = statusOf(h); const s = el.querySelector('[data-pk="st"]');
    const label = h.act ? placeName(h.act) : 'Inactif';
    if (s.textContent !== label) s.textContent = label;
    if (s.className !== 'pst ' + sc) s.className = 'pst ' + sc;
    const hb = el.querySelector('[data-pk="hp"]'); const t = heroTotals(st, h);
    hb.style.width = clamp(displayHp(st, h) / t.maxHp * 100, 0, 100).toFixed(1) + '%';
  }
}

/* ---------------------------- Vue : Combats ---------------------------- */
function heroSig(h) { return h.id + ':' + (h.act ? h.act.type + h.act.id + h.act.room : '-') + ':' + (h.fight ? h.fight.mons.map(m => m.mid).join(',') : '-') + ':' + h.lvl + ':' + (h.capital > 0); }
function combatSig() { return st.heroes.map(heroSig).join('|'); }
/* Seules les cartes dont le contenu a changé sont redessinées : les ennemis morts de l'autre héros ne rejouent plus leur chute */
function redrawCards() {
  const cards = [...document.querySelectorAll('[data-hero-card]')];
  if (cards.length !== st.heroes.length || !ui.lastHs) return false;
  for (const h of st.heroes) {
    const sg = heroSig(h); if (ui.lastHs[h.id] === sg) continue;
    const old = document.querySelector(`[data-hero-card="${h.id}"]`); if (!old) return false;
    const tmp = document.createElement('div'); tmp.innerHTML = fightCard(h); old.replaceWith(tmp.firstElementChild);
  }
  ui.lastHs = Object.fromEntries(st.heroes.map(h => [h.id, heroSig(h)])); ui.lastSig = combatSig(); return true;
}
function renderCombat() {
  if (!st.heroes.length) return renderRecruit(true);
  const more = st.heroes.length < RECRUIT_COST.length;
  const cost = RECRUIT_COST[st.heroes.length];
  return `<div class="fights">${st.heroes.map(fightCard).join('')}</div>
    ${more ? `<div class="hint-band"><span>Ton groupe peut accueillir un héros de plus${st.kamas >= cost ? '.' : ` (${fmt(cost)} kamas).`}</span><button class="btn sm ${st.kamas >= cost ? 'gold' : ''}" data-act="recruitnav">Recruter un héros</button></div>` : ''}`;
}
function passiveHtml(c) {
  const p = c.passive;
  const body = p.points ? `<ul class="pv-list">${p.points.map(([ic, t, d]) => `<li><span class="pv-ic" aria-hidden="true">${ic}</span><div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>` : `<span>${p.desc}</span>`;
  return `<div class="passive" style="--c:${c.color}"><span class="label">Passif · ${p.name}</span>${body}</div>`;
}
const SAC_RAGE = {};
/* Transformation en Berserk : onde rouge, gouttes de sang, secousse, texte */
function sacBerserk(card, fu) {
  const sp = fu.querySelector('.sprite'), scene = card.querySelector('.scene');
  ecaState(fu, 'sac-trans', 1250); ecaText(card, 'BERSERK !', '', 'sac');
  if (!FX_OK() || !sp) return;
  for (let k = 0; k < 2; k++) { const r = document.createElement('i'); r.className = 'sc-ring'; r.style.setProperty('--d', k * 220 + 'ms'); sp.appendChild(r); setTimeout(() => r.remove(), 1500); }
  for (let i = 0; i < 16; i++) {
    const e = document.createElement('i'); e.className = 'sc-drop'; e.style.left = '45%'; const a = -Math.PI * (.05 + Math.random() * .9);
    e.style.cssText += `--dx:${(Math.cos(a) * (30 + Math.random() * 60)).toFixed(0)}px;--dy:${(Math.sin(a) * (30 + Math.random() * 50)).toFixed(0)}px;--s:${(3 + Math.random() * 5).toFixed(1)}px;--d:${(Math.random() * 300).toFixed(0)}ms`;
    sp.appendChild(e); setTimeout(() => e.remove(), 1600);
  }
  if (scene) { scene.classList.remove('cb-shake'); void scene.offsetWidth; scene.classList.add('cb-shake'); setTimeout(() => scene.classList.remove('cb-shake'), 800); }
}
function stigHtml(h) { const f = h.fight, n = (f && f.stig) || 0; return `🩸 ${'◆'.repeat(n)}${'◇'.repeat(SAC_STIG_MAX - n)}${f && f.martyr ? ' · ☠✗' : ''}`; }
const COLOSSE_ICON = `<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M20 2C20 2 6 18 6 28a14 14 0 0 0 28 0C34 18 20 2 20 2Z" fill="#c81420" stroke="#2a0306" stroke-width="2" stroke-linejoin="round"/><path d="M12 22q2-8 8-15" fill="none" stroke="#ff9a8a" stroke-width="1.6" stroke-linecap="round" opacity=".8"/><rect x="12" y="22" width="16" height="11" rx="3.6" fill="#f3e2c2" stroke="#2a0306" stroke-width="1.5"/><path d="M16 22v6M20 22v6M24 22v6" stroke="#2a0306" stroke-width="1.3" stroke-linecap="round"/><path d="M12 28q-3 0-3 3t4 3" fill="none" stroke="#2a0306" stroke-width="1.5" stroke-linecap="round"/></svg>`;
function bloodGauge(h) {
  const p = clamp((h.blood || 0) / SAC_BLOOD_MAX, 0, 1);
  return `<div class="fury blood${p >= 1 ? ' full' : ''}" data-k="blood" title="Sang versé : ${Math.floor(h.blood || 0)} / ${SAC_BLOOD_MAX}. Chaque PV perdu remplit la jauge. Pleine, déclenche le Colosse de Sang !"><span class="fury-fill" style="--p:${p.toFixed(3)}"></span><span class="fury-lbl">${p >= 1 ? 'COLOSSE !' : 'Sang ' + Math.floor(p * 100) + ' %'}</span></div>`;
}
function fervHtml(h) { const n = h.fight ? Math.min(ZOB_FERV_MAX, h.fight.ferv || 1) : 0; return `🎭 ${'●'.repeat(n)}${'○'.repeat(ZOB_FERV_MAX - n)}`; }
const ZOB_TIPS = { rire: 'Masque Rieur : +12 % de dégâts (+4 % par point de Ferveur).', larme: 'Masque Pleureur : −10 % de dégâts subis et un peu de soin à chaque tour (+4 % par point de Ferveur).', farce: 'Masque Farceur : 15 % de chances de lancer un sort offensif deux fois (+4 % par point de Ferveur).' };
function zobMasks(h) { return `<div class="zmasks" data-k="zmasks" role="group" aria-label="Masque porté">${Object.entries(ZOB_MASKS).map(([id, m]) => `<button class="zmask${zobMask(h) === id ? ' on' : ''}" data-act="zmask" data-hero="${h.id}" data-mask="${id}" title="${m.name} — ${ZOB_TIPS[id]} Changer de masque en combat déclenche une Rupture." aria-label="${m.name}" aria-pressed="${zobMask(h) === id}">${m.icon}</button>`).join('')}</div>`; }
/* Rupture : des éclats du masque brisé filent vers chaque ennemi */
function zobShards(card) {
  const scene = card.querySelector('.scene'), sp = card.querySelector('[data-k="fighter"] .sprite'); if (!scene || !sp || !FX_OK()) return;
  const a = relPos(sp, scene), cols = ['#ffd24a', '#8ec4f4', '#9ae860', '#c58aff', '#ff6aa8'];
  [...card.querySelectorAll('.unit.mon .sprite')].forEach(m => { const b = relPos(m, scene);
    for (let i = 0; i < 9; i++) { const e = document.createElement('i'); e.className = 'zb-shard'; e.style.cssText = `left:${a.x}px;top:${a.y - 10}px;background:${cols[i % cols.length]};clip-path:polygon(50% 0,100% 70%,10% 100%)`; scene.appendChild(e);
      const mx = (b.x - a.x) * .5 + (Math.random() - .5) * 50, my = -40 - Math.random() * 60;
      e.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${mx}px,${my}px) rotate(180deg)`, opacity: 1, offset: .45 }, { transform: `translate(${b.x - a.x + (Math.random() - .5) * 30}px,${b.y - a.y}px) rotate(540deg) scale(.5)`, opacity: .9 }], { duration: 650 + Math.random() * 250, delay: i * 40, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'both' }).onfinish = () => e.remove(); } });
}
function grainsHtml(h) { const g = (h.fight && h.fight.grains) || 0; return `⏳ ${g}/12${h.fight && h.fight.paradox ? ' · ✗' : ''}`; }
function rateChips(list) { return list.map(([l, v]) => `<span class="rate" title="Moyenne des 2 dernières minutes"><small>${l}</small><b class="num">${v}</b></span>`).join(''); }
function fightRates(h) {
  const s = h.session; if (!s) return '';
  const r = sessionRates(h);
  if (h.act.type === 'harvest') return rateChips([['XP métier / h', fmt(r.xp)], ['Récolte / h', fmt(r.n)], ['Récoltés', fmt(s.kills)]]);
  return rateChips([['XP / h', fmt(r.xp)], ['Kamas / h', fmt(r.kamas)], [h.act.type === 'dungeon' ? 'Donjons' : 'Vaincus', fmt(h.act.type === 'dungeon' ? s.runs : s.kills)]]);
}
function fightCard(h) {
  const t = heroTotals(st, h); const hp = displayHp(st, h);
  const place = h.act ? findPlace(h.act.type, h.act.id) : null;
  const [sc, stxt] = statusOf(h);
  const room = place && h.act.type === 'dungeon' ? `<span class="sub">${h.act.room < place.rooms.length ? `Salle ${h.act.room + 1}/${place.rooms.length + 1}` : 'Salle du boss'}</span>` : '';
  const harvest = h.act && h.act.type === 'harvest';
  let stage;
  if (harvest) {
    const c = place; const job = st.jobs[c.job]; const [qa, qb] = cropQty(st, c); const p = clamp(1 - h.wait / harvestMs(st, h), 0, 1);
    stage = `<div class="vs"><span class="vs-ic">${ICONS.recolte}</span><small>${GATHER_JOBS[c.job].name} ${job.lvl}</small></div>
      <div class="field"><div class="crops" data-k="crops" style="--g:${p.toFixed(2)}">${Array.from({ length: 6 }, () => `<span>${c.icon}</span>`).join('')}</div>
        <div class="field-info"><b>${c.name}</b><span data-k="stock">${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}</span></div>
        <div data-k="hprog">${bar('job', p, 1)}</div>
        <div class="field-xp"><span>XP ${GATHER_JOBS[c.job].name}</span><span class="num" data-k="jxt">${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}</span></div>
        <div data-k="jxb">${bar('xp thin', job.xp, jobXpToNext(job.lvl))}</div></div>`;
  } else {
    let foes = `<div class="scene-empty">${h.act ? 'Récupère avant le prochain combat…' : 'Attend tes ordres au zaap d’Astrub.'}</div>`;
    if (h.fight) foes = h.fight.mons.map((m, i) => { const d = MONSTERS[m.mid];
      const cra = h.cls === 'cra', prey = cra && h.fight.mark === i && m.hp > 0;
      return `<div class="unit mon${m.hp <= 0 ? ' dead still' : ''}${d.boss ? ' boss' : ''}${d.archi ? ' archi' : ''}${cra ? ' huntable' : ''}${prey ? ' prey' : ''}" data-mon="${i}" data-hp="${m.hp}"${cra ? ` data-act="cramark" data-hero="${h.id}" data-i="${i}" role="button" tabindex="0" aria-label="Traquer ${esc(d.name)}"` : ''}>
        ${cra ? reticleHtml(h) : ''}${h.cls === 'enutrof' ? `<span class="treasure${h.fight.treasure === i && m.hp > 0 ? ' on' : ''}" data-k="treasure" title="Il cache un trésor !" aria-hidden="true">💰</span>` : ''}${h.cls === 'sram' ? `<span class="trap${h.fight.trap === i && m.hp > 0 ? ' armed' : ''}" data-k="trap" aria-hidden="true">${TRAP_SVG}</span>` : ''}
        <div class="u-name" title="${esc(d.name)}">${esc(d.name)} <small>${d.lvl}</small></div>${bar('hp', m.hp, m.max)}<div class="u-hp num" data-k="mhp">${fmt(m.hp)}</div>
        <div class="sprite${MON_ART[m.mid] ? ' has-art' : ''}" aria-hidden="true">${monSprite(m.mid, d.icon)}</div></div>`; }).join('');
    stage = `<div class="vs"><span>VS</span><small data-k="turn">${h.fight ? `Tour ${h.fight.turn}` : ''}</small>${h.cls === 'sram' ? `<small class="invis-chip" data-k="invis"${h.fight && h.fight.invis ? '' : ' hidden'}>👁️ Invisible</small>` : ''}${h.cls === 'ecaflip' ? `<small class="cat${(h.clover || 0) >= ECA_CLOVER_MAX ? ' full' : ''}" data-k="clover" title="Pile ou Face chaque tour. Pile donne un Trèfle (+3 % crit, +4 % de Face). À 6 : Quitte ou Double.">${cloverHtml(h)}</small>` : ''}${h.cls === 'enutrof' ? `<small class="purse${(h.purse || 0) >= ENU_PURSE_MAX ? ' full' : ''}" data-k="purse" title="Bourse : à 10 pièces, Jackpot. À 5 pièces ou plus, un Pot-de-vin peut t’éviter le coup fatal.">${purseHtml(h)}</small>` : ''}${h.cls === 'cra' ? `<small class="focus" data-k="focus" title="Concentration : à 5, Tir Parfait">${focusHtml(h)}</small>` : ''}${h.cls === 'sacrieur' ? `<small class="stig${h.fight && h.fight.stig >= SAC_STIG_MAX ? ' full' : ''}" data-k="stig" title="Stigmates : +8 % de dégâts chacun. Une fois par combat, le Martyre évite le coup fatal.">${stigHtml(h)}</small>` : ''}${h.cls === 'zobal' ? `<small class="ferv${h.fight && h.fight.ferv >= ZOB_FERV_MAX ? ' full' : ''}" data-k="ferv" title="Ferveur : +4 % d'effet du masque par point (5 max = Apothéose, +15 % de critique). Changer de masque = Rupture.">${fervHtml(h)}</small>${zobMasks(h)}` : ''}${h.cls === 'xelor' ? `<small class="grains" data-k="grains" title="Grains du sablier : à 12, le Xélor rejoue un tour">${grainsHtml(h)}</small>` : ''}</div><div class="foes">${foes}</div>`;
  }
  return `<article class="fc" data-hero-card="${h.id}" style="--c:${CLASSES[h.cls].color}">
    <header class="fc-head">
      ${emblem(h.cls)}
      <div class="fc-who"><b class="fc-name">${esc(h.name)}</b><span class="fc-sub">${CLASSES[h.cls].name} · <span class="lvl">Niv. ${h.lvl}</span>${h.capital ? ` · <button class="link" data-act="gohero" data-hero="${h.id}">${h.capital} pts à répartir</button>` : ''}</span></div>
      <div class="fc-where">${place ? `<span class="tag">${actLabel(h)}</span><b>${esc(subName(place, h.act))}</b>${room}` : '<span class="sub">Aucune activité</span>'}</div>
      <span class="buff" data-k="buff"${h.food ? '' : ' hidden'}>${foodChip(h)}</span>
      <span class="status ${sc}" data-k="status">${stxt}</span>
      ${place ? `<button class="btn sm ghost" data-act="stop" data-hero="${h.id}">Arrêter</button>` : `<button class="btn sm gold" data-act="gomap" data-hero="${h.id}">Choisir une zone</button>`}
    </header>
    <div class="fc-body">
      <div class="scene${harvest ? ' harvest' : ''}${(h.cls === 'iop' || h.cls === 'sacrieur') && !harvest ? ' has-fury' : ''}${h.cls === 'xelor' && !harvest ? ' has-chrono' : ''}" style="${themeStyle(arenaTheme(h))}" data-fx="${(h.fight && h.fight.fxSeq) || 0}" data-rw="${(h.fight && h.fight.rewinds) || 0}" data-px="${h.fight && h.fight.paradox ? 1 : 0}" data-pf="${(h.fight && h.fight.perfect && h.fight.perfect.n) || 0}" data-tr="${(h.fight && h.fight.trapFx && h.fight.trapFx.n) || 0}" data-vn="${(h.fight && h.fight.vanishSeq) || 0}" data-ms="${(h.fight && h.fight.missSeq) || 0}" data-ch="${(h.fight && h.fight.chestSeq) || 0}" data-jk="${(h.fight && h.fight.jackSeq) || 0}" data-bb="${(h.fight && h.fight.bribeSeq) || 0}" data-co="${(h.fight && h.fight.coinSeq) || 0}" data-gm="${(h.fight && h.fight.gambleSeq) || 0}" data-nv="${(h.fight && h.fight.lifeSeq) || 0}" data-dg="${(h.fight && h.fight.dodgeSeq) || 0}" data-mt="${(h.fight && h.fight.martyrSeq) || 0}" data-rp="${(h.fight && h.fight.ruptSeq) || 0}" data-ma="${(h.fight && h.fight.monAct && h.fight.monAct.n) || 0}">
        <div class="unit hero${h.hp <= 0 && h.resting ? ' dead still' : ''}${h.fight ? ' active' : ''}${h.cls === 'sram' && h.fight && h.fight.invis ? ' invis' : ''}" data-k="fighter" data-hp="${hp}"${h.cls === 'zobal' ? ` data-mask="${zobMask(h)}"` : ''}>
          <div class="u-name">${esc(h.name)}</div><div data-k="hpb">${bar('hp', hp, t.maxHp)}</div><div class="u-hp num" data-k="hpt">${fmt(hp)} / ${fmt(t.maxHp)}</div>
          ${h.cls === 'iop' ? furyGauge(h) : ''}
          ${h.cls === 'iop' ? `<button class="fury-btn" data-act="iopfury" data-hero="${h.id}" data-k="furybtn" title="Déclencher la Colère de Iop !" aria-label="Déclencher la Colère de Iop"${furyReady(h) && h.fight ? '' : ' hidden'}>${COLERE_ICON}</button>` : ''}
          ${h.cls === 'sacrieur' ? bloodGauge(h) : ''}
          ${h.cls === 'sacrieur' ? `<button class="fury-btn blood-btn" data-act="sacolosse" data-hero="${h.id}" data-k="bloodbtn" title="Déclencher le Colosse de Sang !" aria-label="Déclencher le Colosse de Sang"${bloodReady(h) && h.fight ? '' : ' hidden'}>${COLOSSE_ICON}</button>` : ''}
          ${h.cls === 'xelor' ? chronoBtn(h) : ''}
          <div class="sprite${hasHeroArt(h.cls) ? ' has-art' : ''}">${heroSprite(h.cls)}</div></div>
        ${stage}
        ${harvest ? '' : '<button type="button" class="wchip archi-btn in-scene" data-act="archifight" data-k="archibtn" hidden></button>'}
      </div>
      <div class="fc-log" data-k="log">${logHtml(h)}</div>
    </div>
    <footer class="fc-foot">
      <div class="xpline"><span class="lbl">XP</span><div class="grow" data-k="xpb">${bar('xp thin', h.xp, xpToNext(h.lvl))}</div><span class="num" data-k="xpt">${h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`}</span></div>
      <div class="rates" data-k="rates">${fightRates(h)}</div>
    </footer>
  </article>`;
}
/* ---------------------- Ombre & Pièges du Sram ---------------------- */
const TRAP_SVG = `<svg viewBox="0 0 40 16"><ellipse cx="20" cy="10" rx="17" ry="5" fill="#1a0f2a" stroke="#9b7bff" stroke-width="1.2"/><path d="M8 10l3-6 3 6M16 10l4-8 4 8M26 10l3-6 3 6" fill="#c8b8ff" stroke="#3a2a6a" stroke-width=".8"/><circle cx="20" cy="10" r="1.6" fill="#ff5ad8"/></svg>`;
function smokePuff(el, big) {
  if (!el) return;
  for (let i = 0; i < (big ? 12 : 7); i++) { const s = document.createElement('span'); s.className = 'smoke';
    const a = Math.random() * Math.PI * 2, r = 18 + Math.random() * (big ? 34 : 22);
    s.style.cssText = `--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r * .6 - 12).toFixed(0)}px;--s:${(16 + Math.random() * 18).toFixed(0)}px;animation-delay:${(Math.random() * 120).toFixed(0)}ms`;
    el.appendChild(s); setTimeout(() => s.remove(), 1100); }
}
function trapBoom(card, fx) {
  const mon = card.querySelector(`[data-mon="${fx.i}"]`); if (!mon) return;
  const b = document.createElement('div'); b.className = 'trap-boom';
  b.innerHTML = `<i></i><i></i><i></i><i></i><i></i><i></i><i></i><b>PIÈGE !</b>`;
  mon.appendChild(b); setTimeout(() => b.remove(), 1300);
  mon.classList.remove('trapped'); void mon.offsetWidth; mon.classList.add('trapped'); setTimeout(() => mon.classList.remove('trapped'), 900);
}
/* ---------------------- Fièvre de l'Or de l'Enutrof ---------------------- */
function purseHtml(h) { const n = h.purse || 0; return n >= ENU_PURSE_MAX ? '🎰 JACKPOT' : `🪙 ${Array.from({ length: ENU_PURSE_MAX }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}`; }
function coinBurst(el, n, sym) {
  if (!el || !FX_OK()) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span'); s.className = 'coin-pop'; s.textContent = sym || '🪙';
    const a = (i / n) * Math.PI * 2;
    s.style.cssText = `--dx:${(Math.cos(a) * (24 + Math.random() * 26)).toFixed(0)}px;--dy:${(Math.sin(a) * (18 + Math.random() * 16) - 18).toFixed(0)}px;animation-delay:${(Math.random() * 140).toFixed(0)}ms`;
    el.appendChild(s); setTimeout(() => s.remove(), 1100);
  }
}
function goldFx(card, text, burstTarget, n) {
  const fg = card.querySelector('[data-k="fighter"]'); if (!fg) return;
  const t = document.createElement('span'); t.className = 'fnum gold'; t.textContent = text; fg.appendChild(t); setTimeout(() => t.remove(), 1000);
  coinBurst(burstTarget || fg, n || 8);
}
/* ---------------------- Chance du Matou de l'Ecaflip ---------------------- */
function cloverHtml(h) {
  const f = h.fight, n = h.clover || 0;
  const side = f && f.coin === 'face' ? '😼' : f && f.coin === 'pile' ? '🙀' : '🪙';
  return n >= ECA_CLOVER_MAX ? `${side} 🎲 QUITTE OU DOUBLE` : `${side} 🍀 ${Array.from({ length: ECA_CLOVER_MAX }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}`;
}
/* Classe d'état temporaire sur le héros (animation de passif) */
function ecaState(el, cls, ms) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); clearTimeout(el['_t' + cls]); el['_t' + cls] = setTimeout(() => el.classList.remove(cls), ms); }
/* Neuf Vies : neuf petits esprits de chat s'élèvent autour du héros */
function ecaSpirits(sp) {
  if (!sp || !FX_OK()) return;
  for (let i = 0; i < 9; i++) {
    const s = document.createElement('span'); s.className = 'eca-spirit'; s.textContent = '🐱';
    const a = (i / 9) * Math.PI * 2;
    s.style.cssText = `--dx:${(Math.cos(a) * 46).toFixed(0)}px;--dy:${(Math.sin(a) * 30 - 46).toFixed(0)}px;animation-delay:${i * 70}ms`;
    sp.appendChild(s); setTimeout(() => s.remove(), 1700);
  }
}
function ecaText(card, text, cls, who = 'eca') {
  const fg = card.querySelector('[data-k="fighter"]'); if (!fg) return;
  const t = document.createElement('span'); t.className = 'fnum ' + who + ' ' + (cls || ''); t.textContent = text; fg.appendChild(t); setTimeout(() => t.remove(), 1000);
}
function coinFlip(card, face) {
  if (!FX_OK()) { ecaText(card, face ? 'FACE !' : 'PILE !', face ? 'face' : 'pile'); return; }
  const fg = card.querySelector('[data-k="fighter"]'); if (!fg) return;
  const c = document.createElement('div'); c.className = 'flip ' + (face ? 'face' : 'pile');
  c.innerHTML = `<div class="flip-coin"><b class="fr">😼</b><b class="bk">🙀</b></div><span>${face ? 'FACE !' : 'PILE !'}</span>`;
  fg.appendChild(c); setTimeout(() => c.remove(), 1700);
  const sp = fg.querySelector('.sprite'); if (sp) { sp.classList.remove('eca-glow-face', 'eca-glow-pile'); void sp.offsetWidth; sp.classList.add(face ? 'eca-glow-face' : 'eca-glow-pile'); setTimeout(() => sp.classList.remove('eca-glow-face', 'eca-glow-pile'), 1500); }
}
function gambleFx(card, scene, win) {
  ecaText(card, win ? '🎲 DOUBLE !' : '🎲 PERDU…', win ? 'face' : 'pile');
  if (win) { coinBurst(card.querySelector('[data-k="fighter"]'), 14, '🍀'); scene.classList.remove('gold-flash'); void scene.offsetWidth; scene.classList.add('gold-flash'); setTimeout(() => scene.classList.remove('gold-flash'), 900); }
}

/* Jackpot : machine à sous, rayons d'or, pluie de pièces et impacts sur chaque ennemi (≈ 2,7 s) */
function playJackpot(card, fx) {
  const scene = card.querySelector('.scene'); if (!scene) return;
  if (!FX_OK()) { goldFx(card, 'JACKPOT !', scene, 0); return; }
  const H = scene.clientHeight || 220;
  const sym = ['🍒', '🔔', '💎', '🍀', '🪙', '<b class="s7">7</b>'];
  const strip = sym.concat(sym).map(x => `<span>${x}</span>`).join('');
  const reels = [0, 1, 2].map(() => `<div class="jp-reel"><div class="jp-strip">${strip}</div></div>`).join('');
  const bulbs = Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
  const coins = Array.from({ length: 44 }, () => `<i style="left:${(Math.random() * 100).toFixed(1)}%;--t:${(800 + Math.random() * 600).toFixed(0)}ms;--d:${(1080 + Math.random() * 650).toFixed(0)}ms;--s:${(.8 + Math.random() * .8).toFixed(2)};--r:${(Math.random() * 360).toFixed(0)}deg"></i>`).join('');
  const ov = document.createElement('div'); ov.className = 'jp'; ov.style.setProperty('--fall', (H + 40) + 'px');
  ov.innerHTML = `<div class="jp-dim"></div><div class="jp-rays"></div>
    <div class="jp-machine"><div class="jp-bulbs">${bulbs}</div><div class="jp-reels">${reels}</div></div>
    <div class="jp-title"><span>JACKPOT</span><small>PLUIE D’OR</small></div><div class="jp-rain">${coins}</div>`;
  scene.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('go'));
  const reelEls = ov.querySelectorAll('.jp-reel');
  [560, 840, 1120].forEach((ms, k) => setTimeout(() => reelEls[k].classList.add('stop'), ms));
  const hero = card.querySelector('[data-k="fighter"]');
  const heroCls = card.querySelector('[data-k="fighter"] .hs') ? 'jp-pose' : 'jp-hero'; // dessin animé : pose de victoire, sinon simple halo
  if (hero) hero.classList.add(heroCls); // le personnage entre dans la danse dès le lancement des rouleaux
  setTimeout(() => { ov.classList.add('win'); scene.classList.add('gold-flash'); }, 1150);
  setTimeout(() => {
    scene.classList.add('cl-shake');
    ((fx && fx.hits) || []).forEach((hit, k) => setTimeout(() => {
      const mon = card.querySelector(`[data-mon="${hit.i}"]`); if (!mon) return;
      mon.classList.remove('jp-hit'); void mon.offsetWidth; mon.classList.add('jp-hit');
      const n = document.createElement('span'); n.className = 'jp-num'; n.textContent = '−' + fmt(hit.v) + (hit.crit ? ' !' : ''); mon.appendChild(n);
      coinBurst(mon.querySelector('.sprite') || mon, 9);
      setTimeout(() => { n.remove(); mon.classList.remove('jp-hit'); }, 1300);
    }, k * 110));
  }, 1500);
  setTimeout(() => { scene.classList.remove('cl-shake'); scene.classList.remove('gold-flash'); }, 2300);
  setTimeout(() => { if (hero) hero.classList.remove(heroCls); }, 2750);
  setTimeout(() => ov.remove(), 2800);
}
function missFx(card) { const fg = card.querySelector('[data-k="fighter"]'); if (!fg) return; const n = document.createElement('span'); n.className = 'fnum miss'; n.textContent = 'Raté !'; fg.appendChild(n); setTimeout(() => n.remove(), 950); }

/* ---------------------- Traque du Cra ---------------------- */
function focusHtml(h) { const n = h.focus || 0; return `🔭 ${Array.from({ length: CRA_FOCUS_MAX }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}`; }
function reticleHtml(h) {
  const n = h.focus || 0; let segs = '';
  for (let i = 0; i < CRA_FOCUS_MAX; i++) { const a0 = -90 + i * 72 + 6, a1 = a0 + 60, r = 26, p = a => [32 + r * Math.cos(a * Math.PI / 180), 32 + r * Math.sin(a * Math.PI / 180)].map(x => x.toFixed(1)).join(' ');
    segs += `<path class="seg${i < n ? ' on' : ''}" d="M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}"/>`; }
  return `<svg class="reticle${n >= CRA_FOCUS_MAX ? ' ready' : ''}" data-k="ret" viewBox="0 0 64 64" aria-hidden="true">${segs}<path class="cross" d="M32 2v10M32 52v10M2 32h10M52 32h10"/><circle class="dot" cx="32" cy="32" r="2"/></svg>`;
}
/* Tir Parfait : ~3,4 s. L'archère se penche en arrière, bande l'arc au maximum (il tremble), se redresse, vise, puis lâche au bout de 2,1 s ;
   pendant ce temps le combat est figé (FURY_ANIM) et l'affichage des monstres retenu (PF_HOLD) jusqu'à l'impact de la flèche. */
const PF_MS = 3400, PF_REL = 2100, PF_ARROW = 300, PF_HOLD = {};
function playPerfect(card, p, onImpact) {
  const scene = card.querySelector('.scene');
  const hero = card.querySelector('[data-k="fighter"] .sprite'), tgt = card.querySelector(`[data-mon="${p.t}"] .sprite`);
  if (!scene || !hero || !tgt) { if (onImpact) onImpact(); return; }
  const a = relPos(hero, scene), b = relPos(tgt, scene);
  if (hero.querySelector('.hs-cra')) { a.x += hero.offsetWidth * .39; a.y += hero.offsetHeight * .06; }
  const pi = p.pierce && card.querySelector(`[data-mon="${p.pierce.i}"] .sprite`); const c = pi ? relPos(pi, scene) : null;
  const end = c || { x: b.x + (b.x - a.x) * .6 + 40, y: b.y + (b.y - a.y) * .6 };
  const ang = Math.atan2(end.y - a.y, end.x - a.x) * 180 / Math.PI, len = Math.hypot(end.x - a.x, end.y - a.y), hit = Math.min(1, Math.hypot(b.x - a.x, b.y - a.y) / len);
  const tHit = Math.round(PF_REL + PF_ARROW * hit);
  const reduced = !FX_OK();
  const num = (el, txt, cls, delay) => setTimeout(() => { if (!el || !el.parentElement) return; const n = document.createElement('span'); n.className = 'pf-num ' + cls; n.textContent = txt; el.parentElement.appendChild(n); setTimeout(() => n.remove(), 1500); }, delay);
  if (reduced) { // mouvement réduit : pas de cinématique, juste les chiffres
    setTimeout(() => { if (onImpact) onImpact(); }, 200);
    num(tgt, '−' + fmt(p.v), 'main', 260); if (pi) num(pi, '−' + fmt(p.pierce.v), 'pierce', 340);
    return;
  }
  let motes = ''; // étincelles d'énergie aspirées par la flèche pendant que l'arc se bande
  for (let i = 0; i < 28; i++) { const g = Math.random() * Math.PI * 2, r = 44 + Math.random() * 50; motes += `<i style="--dx:${(Math.cos(g) * r).toFixed(0)}px;--dy:${(Math.sin(g) * r).toFixed(0)}px;--d:${(620 + Math.random() * 1250).toFixed(0)}ms;--t:${(360 + Math.random() * 280).toFixed(0)}ms"></i>`; }
  const ov = document.createElement('div'); ov.className = 'perfect';
  ov.style.cssText = `--ax:${a.x}px;--ay:${a.y}px;--bx:${b.x}px;--by:${b.y}px;--ang:${ang}deg;--len:${len}px;--hit:${hit}`;
  ov.innerHTML = `<div class="pf-dim"></div><div class="pf-vig"></div>
    <div class="pf-scope"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="30" class="in"/><path d="M50 0v38M50 62v38M0 50h38M62 50h38"/><path class="tick" d="M50 20v6M50 74v6M20 50h6M74 50h6"/></svg></div>
    <div class="pf-title">TIR PARFAIT</div>
    <div class="pf-charge"><b class="r r1"></b><b class="r r2"></b><b class="r r3"></b><b class="core"></b>${motes}</div>
    <div class="pf-shot"><div class="pf-trail t2"></div><div class="pf-trail"></div><div class="pf-arrow"><svg viewBox="0 0 60 12"><path d="M0 6h46" stroke="#e8ffd0" stroke-width="2.4"/><path d="M44 1 L60 6 L44 11 L48 6 Z" fill="#f4ffe8" stroke="#2a4a14" stroke-width=".8"/><path d="M0 6 L-0 1 L8 6 L0 11 Z M4 6 L4 1 L12 6 L4 11 Z" fill="#8fd45a"/></svg></div></div>
    <div class="pf-wave"></div><div class="pf-wave w2"></div>
    <div class="pf-burst" style="left:var(--bx);top:var(--by)"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b class="ring"></b></div>
    <div class="pf-flash"></div><div class="pf-flash hit"></div>`;
  scene.appendChild(ov);
  const ox = a.x + (b.x - a.x) * .3, oy = a.y + (b.y - a.y) * .3; // caméra : on zoome sur le contenu de la scène (pas sur la scène elle-même), autour d'un point proche de l'archère
  const kids = [...scene.children]; kids.forEach(el => { el.style.transformOrigin = `${(ox - el.offsetLeft).toFixed(0)}px ${(oy - el.offsetTop).toFixed(0)}px`; });
  scene.classList.add('pf-on', 'pf-cam'); // le monde se fige et la caméra s'approche
  requestAnimationFrame(() => ov.classList.add('go'));
  setTimeout(() => { // impact : la caméra se détend d'un coup, les monstres réagissent
    scene.classList.remove('pf-cam', 'pf-on'); scene.classList.add('pf-kick');
    if (onImpact) onImpact();
  }, tHit);
  num(tgt, '−' + fmt(p.v), 'main', tHit + 40);
  if (pi) num(pi, '−' + fmt(p.pierce.v), 'pierce', tHit + 150);
  setTimeout(() => scene.classList.remove('pf-kick'), tHit + 700);
  setTimeout(() => { ov.remove(); scene.classList.remove('pf-on', 'pf-cam', 'pf-kick'); kids.forEach(el => { el.style.transformOrigin = ''; }); }, PF_MS + 100);
}
/* Déroulé d'un tour qui contient le Tir Parfait : les tirs d'avant se jouent normalement, puis la cinématique ; ceux d'après attendent la fin.
   Tant qu'elle dure, plus personne n'agit dans le combat. */
function startPerfect(h, card, scene, fresh) {
  const p = h.fight.perfect, k = fresh.findIndex(c => c.pf);
  const pre = (k >= 0 ? fresh.slice(0, k) : []).slice(-3), post = (k >= 0 ? fresh.slice(k + 1) : fresh).slice(-3);
  const quick = !FX_OK();
  let t = 0, end = 0;
  pre.forEach(c => { const st = Math.max(t, end); setTimeout(() => playSpellFx(card, c), st); end = st + (CRA_SHOT[c.id] || CRA_SHOT.fleche_magique)[2]; t = st + 280; });
  const T0 = pre.length ? end + 120 : 80, dur = quick ? 600 : PF_MS;
  PF_HOLD[h.id] = {}; card.querySelectorAll('.unit.mon').forEach(el => { PF_HOLD[h.id][+el.dataset.mon] = +el.dataset.hp; }); // les PV affichés ne bougent qu'à l'impact
  FURY_ANIM[h.id] = 1;
  setTimeout(() => {
    const fu = card.querySelector('[data-k="fighter"]'); if (fu && !quick) ecaState(fu, 'cra-perfect', PF_MS + 40);
    playPerfect(card, p, () => {
      delete PF_HOLD[h.id];
      [p.t, p.pierce && p.pierce.i].forEach(i => { if (i == null) return; const el = card.querySelector(`[data-mon="${i}"]`), m = h.fight && h.fight.mons[i]; if (el && m) { el.dataset.hp = m.hp; el.classList.add('hit'); setTimeout(() => el.classList.remove('hit'), 320); } }); // le chiffre est celui de la cinématique
      patchCombat();
    });
  }, T0);
  post.forEach((c, j) => setTimeout(() => playSpellFx(card, c), T0 + dur + 150 + j * 280));
  setTimeout(() => { delete FURY_ANIM[h.id]; delete PF_HOLD[h.id]; if (h.fight) h.wait = Math.max(h.wait, 700); }, T0 + dur + 250 + post.length * 280);
}
/* ---------------------- Xélor : Éclat du temps ----------------------
   Chaque Rembobinage remplit le sablier au-dessus de la tête du Xélor. Plein, un clic le brise : 10 combats d'un coup (XP, kamas, butin). */
const CHRONO_SVG = `<svg viewBox="0 0 40 52" aria-hidden="true"><path class="cs-glass" d="M9 7Q9 22 20 26Q9 30 9 45H31Q31 30 20 26Q31 22 31 7Z"/><path class="cs-u" d="M12 10Q12 21 20 25Q28 21 28 10Z"/><path class="cs-d" d="M20 29Q12 33 12 43H28Q28 33 20 29Z"/><path class="cs-drip" d="M20 25V43"/><rect class="cs-cap" x="5" y="2" width="30" height="5" rx="2"/><rect class="cs-cap" x="5" y="45" width="30" height="5" rx="2"/><path class="cs-shine" d="M12 10Q12 18 16 22"/></svg>`;
function chronoBtn(h) {
  const c = Math.min(CHRONO_MAX, h.chrono || 0);
  return `<button class="chrono-btn${c >= CHRONO_MAX ? ' full' : ''}" data-act="xelchrono" data-hero="${h.id}" data-k="chrono" style="--p:${(c / CHRONO_MAX).toFixed(2)}" title="Éclat du temps : chaque Rembobinage remplit le sablier. Plein, clique dessus : 10 combats d’un coup !" aria-label="Éclat du temps">${CHRONO_SVG}<b>${c}/${CHRONO_MAX}</b></button>`;
}
const CB_MS = 6200;
function playChrono(card, h, sum, done) {
  const scene = card.querySelector('.scene'), fu = card.querySelector('[data-k="fighter"]'), sp = fu && fu.querySelector('.sprite');
  const N = sum.n;
  const lootPanel = () => {
    const chips = [`<span class="cl-chip xp">⭐ +${fmt(sum.xp)} XP</span>`, `<span class="cl-chip k">💰 +${fmt(sum.kamas)} K</span>`];
    for (const [r, c] of Object.entries(sum.loot)) chips.push(`<span class="cl-chip${RESOURCES[r].rare ? ' rare' : ''}">${RESOURCES[r].icon} ${c}× ${esc(RESOURCES[r].name)}</span>`);
    for (const g of sum.gear) chips.push(`<span class="cl-chip gear">${itemIcon(g.id)} ${esc(ITEMS[g.id].name)}${g.stasis ? ' ✦' : ''}</span>`);
    if (sum.lvlUps > 0) chips.push(`<span class="cl-chip lvl">⬆ Niveau +${sum.lvlUps}</span>`);
    const p = document.createElement('div'); p.className = 'cb-loot'; p.innerHTML = `<div class="cb-lt">⌛ ${N} combats gagnés</div><div class="cb-chips">${chips.map((c, i) => c.replace('<span ', `<span style="--i:${i}" `)).join('')}</div>`;
    scene.appendChild(p); setTimeout(() => p.classList.add('out'), 7000); setTimeout(() => p.remove(), 7700);
  };
  if (!scene || !sp || !FX_OK()) { if (scene) lootPanel(); setTimeout(done, 300); return; }
  const hp = relPos(sp, scene), sw = sp.offsetWidth, sh = sp.offsetHeight, W = hp.w, H = hp.h, cx = W / 2, cy = H / 2;
  const btn = fu.querySelector('[data-k="chrono"]'), bp = btn ? relPos(btn, scene) : { x: hp.x, y: hp.y - 60 };
  const gs = Math.max(130, Math.round(H * .8)); // hauteur du grand sablier
  // 10 repères horaires autour du sablier : un s'allume à chaque combat
  let pips = '';
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2 - Math.PI / 2, r = gs * .72; pips += `<i class="cb-pip" style="left:${(cx + Math.cos(a) * r * 1.35).toFixed(0)}px;top:${(cy + Math.sin(a) * r * .78).toFixed(0)}px"></i>`; }
  let grains = '';
  for (let i = 0; i < 70; i++) { const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 190; grains += `<i class="cb-grain" style="--dx:${(Math.cos(a) * r * 1.4).toFixed(0)}px;--dy:${(Math.sin(a) * r * .8).toFixed(0)}px;--s:${(3 + Math.random() * 6).toFixed(1)}px;--d:${(Math.random() * 160).toFixed(0)}ms"></i>`; }
  let shards = '';
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + Math.random() * .3, r = 90 + Math.random() * 170, z = 34 + Math.random() * 56;
    const pt = () => `${(Math.random() * 100).toFixed(0)}% ${(Math.random() * 100).toFixed(0)}%`;
    shards += `<i class="cb-shard" style="width:${z.toFixed(0)}px;height:${z.toFixed(0)}px;clip-path:polygon(${pt()},${pt()},${pt()},${pt()});--dx:${(Math.cos(a) * r * 1.45).toFixed(0)}px;--dy:${(Math.sin(a) * r * .85).toFixed(0)}px;--rot:${(Math.random() * 900 - 450).toFixed(0)}deg"></i>`;
  }
  const letters = 'ÉCLAT DU TEMPS'.split('').map((c, i) => `<span style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  const crackSvg = CHRONO_SVG.replace('</svg>', '<path class="cs-crack" d="M20 26L12 14M20 26L29 17M20 26L15 38M20 26L27 40M12 14L9 9M29 17L33 11M15 38L11 44"/></svg>');
  // montage : les combats s'accélèrent
  const T0 = 1050; let t = T0; const beats = [];
  for (let i = 0; i < N; i++) { beats.push(t); t += Math.round(300 - i * 17); }
  const TB = t + 260, spin = TB - T0 + 200;
  const ov = document.createElement('div'); ov.className = 'cburst';
  ov.style.cssText = `--gs:${gs}px;--spin:${spin}ms;--ox:${(bp.x - cx).toFixed(0)}px;--oy:${(bp.y - cy).toFixed(0)}px;--cs:${Math.round(gs * 2.3)}px`;
  ov.innerHTML = `<div class="cb-dim"></div><div class="cb-tint"></div><div class="cb-rays"></div><div class="cb-clock">${RW_CLOCK}</div><div class="cb-vig"></div>
    <div class="cb-bar t"></div><div class="cb-bar b"></div>${pips}
    <div class="cb-ring"></div><div class="cb-ring r2"></div>
    <div class="cb-glass" style="--p:1"><div class="cb-spin">${crackSvg}</div></div>
    <div class="cb-count"><span class="n">0</span><small>/ ${N} combats</small></div>
    <div class="cb-tick"><b class="xp">+0 XP</b><b class="k">+0 K</b></div>
    <div class="cb-burst">${grains}${shards}</div>
    <div class="cb-title">${letters}<small>${N} combats d’un coup</small></div><div class="cb-flash"></div>`;
  scene.appendChild(ov); scene.classList.add('cb-on');
  ecaState(fu, 'xel-chrono', CB_MS + 100);
  requestAnimationFrame(() => ov.classList.add('go'));
  const q1 = k => ov.querySelector(k), nEl = q1('.cb-count .n'), xpEl = q1('.cb-tick .xp'), kEl = q1('.cb-tick .k'), cnt = q1('.cb-count'), pipEls = [...ov.querySelectorAll('.cb-pip')];
  const mons = [...card.querySelectorAll('.unit.mon .sprite')], svg = sp.querySelector('.hs-xelor');
  const icons = ['⭐', '💰', '⭐', ...Object.keys(sum.loot).map(r => RESOURCES[r].icon)];
  const add = (cls, style, ms, html = '') => { const e = document.createElement(cls[0] === '#' ? 'span' : 'i'); e.className = cls.replace('#', ''); e.style.cssText = style; if (html) e.textContent = html; ov.appendChild(e); setTimeout(() => e.remove(), ms); return e; };
  beats.forEach((bt, i) => setTimeout(() => {
    if (!ov.isConnected) return;
    const f = (i + 1) / N; nEl.textContent = i + 1; xpEl.textContent = '+' + fmt(Math.round(sum.xp * f)) + ' XP'; kEl.textContent = '+' + fmt(Math.round(sum.kamas * f)) + ' K';
    cnt.classList.remove('beat'); void cnt.offsetWidth; cnt.classList.add('beat');
    if (pipEls[i]) pipEls[i].classList.add('lit');
    add('cb-pulse', '', 700);
    add('cb-slash', `top:${(Math.random() * H).toFixed(0)}px;--r:${(Math.random() * 50 - 25).toFixed(0)}deg`, 420);
    if (svg) { const g = document.createElement('div'); g.className = 'cb-echo'; const y = (Math.random() - .5) * H * .5;
      g.style.cssText = `left:${(hp.x - sw / 2).toFixed(0)}px;top:${(hp.y - sh / 2 + y).toFixed(0)}px;width:${sw}px;height:${sh}px;--tx:${(W * (.38 + Math.random() * .34)).toFixed(0)}px`;
      const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c); ov.appendChild(g); setTimeout(() => g.remove(), 720); }
    const m = mons.length ? mons[i % mons.length] : null; const mp = m ? relPos(m, scene) : { x: cx + 60, y: cy };
    if (m) ecaState(m.closest('.unit'), 'cb-zap', 240);
    add('cb-pop', `left:${mp.x.toFixed(0)}px;top:${(mp.y - 14).toFixed(0)}px`, 600, '✦');
    for (let k = 0; k < 3; k++) add('cb-fly', `--x0:${(mp.x + Math.random() * 30 - 15).toFixed(0)}px;--y0:${(mp.y + Math.random() * 20 - 10).toFixed(0)}px;--x1:${cx.toFixed(0)}px;--y1:${cy.toFixed(0)}px;animation-delay:${k * 70}ms`, 1000, icons[(i * 3 + k) % icons.length]);
  }, bt));
  setTimeout(() => ov.isConnected && ov.classList.add('crack'), TB - 420); // le sablier se fissure sous la pression
  setTimeout(() => { // éclatement
    if (!ov.isConnected) return; ov.classList.add('boom');
    nEl.textContent = N; xpEl.textContent = '+' + fmt(sum.xp) + ' XP'; kEl.textContent = '+' + fmt(sum.kamas) + ' K';
    scene.classList.add('cb-shake'); setTimeout(() => scene.classList.remove('cb-shake'), 800);
    for (let k = 0; k < 3; k++) add('cb-pulse big', `animation-delay:${k * 150}ms`, 1300);
  }, TB);
  setTimeout(lootPanel, TB + 1700);
  setTimeout(() => ov.isConnected && ov.classList.add('out'), CB_MS - 300);
  setTimeout(() => { ov.remove(); scene.classList.remove('cb-on'); done(); }, CB_MS + 250);
}
/* ---------------------- Xélor : Rembobinage ----------------------
   Au 12e grain, le Xélor renverse son sablier : le temps recule (les monstres abattus se relèvent, leurs PV remontent), puis il rejoue son tour.
   Les sorts du premier jet se jouent, la cinématique prend le relais en figeant tout le combat, puis le tour rejoué suit. */
const RW_MS = 3300, RW_MID = 1500;
const RW_ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
const RW_CLOCK = (() => {
  const p = (a, r) => { const t = (a - 90) * Math.PI / 180; return [100 + r * Math.cos(t), 100 + r * Math.sin(t)]; };
  let ticks = '', nums = '';
  for (let i = 0; i < 60; i++) { const [x1, y1] = p(i * 6, 86), [x2, y2] = p(i * 6, i % 5 ? 90 : 93); ticks += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${i % 5 ? '#bfe0ff' : '#ffe08a'}" stroke-width="${i % 5 ? 1 : 2.4}" stroke-linecap="round"/>`; }
  RW_ROMAN.forEach((n, i) => { const [x, y] = p(i * 30, 72); nums += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="800" font-family="Georgia,serif" fill="#ffe9a0">${n}</text>`; });
  return `<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="97" fill="#0a1a5a33" stroke="#ffe08a" stroke-width="3"/><circle cx="100" cy="100" r="82" fill="none" stroke="#bfe0ff" stroke-width="1" stroke-dasharray="3 5" opacity=".7"/>
  <g class="ring">${ticks}${nums}</g>
  <g class="hh"><path d="M100 108V58" stroke="#ffe08a" stroke-width="6" stroke-linecap="round"/><path d="M100 50l-6 12h12z" fill="#ffe08a"/></g>
  <g class="mh"><path d="M100 114V22" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><path d="M100 14l-5 11h10z" fill="#fff"/></g>
  <circle cx="100" cy="100" r="7" fill="#ffd24a" stroke="#6a4208" stroke-width="2"/><circle cx="100" cy="100" r="2.6" fill="#c8301a"/></svg>`;
})();
function playRewind(card, scene) {
  const fu = card.querySelector('[data-k="fighter"]'), sp = fu && fu.querySelector('.sprite'); if (!sp) return;
  const hp = relPos(sp, scene), hx = hp.x + sp.offsetWidth * .23, hy = hp.y - sp.offsetHeight * .37; // le sablier au bout du bâton aspire les grains
  let grains = '';
  const add = (x0, y0, d) => { grains += `<i class="rw-grain" style="--x0:${x0.toFixed(0)}px;--y0:${y0.toFixed(0)}px;--x1:${(hx + Math.random() * 8 - 4).toFixed(0)}px;--y1:${(hy + Math.random() * 8 - 4).toFixed(0)}px;--d:${d.toFixed(0)}ms;--t:${(650 + Math.random() * 500).toFixed(0)}ms;--s:${(3 + Math.random() * 4).toFixed(1)}px"></i>`; };
  card.querySelectorAll('.unit.mon .sprite').forEach(el => { const m = relPos(el, scene); for (let i = 0; i < 9; i++) add(m.x + Math.random() * 50 - 25, m.y + Math.random() * 60 - 30, 450 + Math.random() * 1500); });
  for (let i = 0; i < 12; i++) add(Math.random() * hp.w, Math.random() * hp.h, 300 + Math.random() * 1700);
  const ov = document.createElement('div'); ov.className = 'rewind';
  ov.style.cssText = `--cs:${Math.max(240, Math.round(hp.h * 1.2))}px;--hx:${hx.toFixed(0)}px;--hy:${hy.toFixed(0)}px`;
  ov.innerHTML = `<div class="rw-dim"></div><div class="rw-tint"></div><div class="rw-clock">${RW_CLOCK}</div><div class="rw-scan"></div>
    <div class="rw-band" style="top:18%;--d:0ms"></div><div class="rw-band" style="top:46%;--d:380ms"></div><div class="rw-band" style="top:72%;--d:700ms"></div>${grains}
    <div class="rw-ring" style="--d:0ms"></div><div class="rw-ring" style="--d:${RW_MID - 120}ms"></div><div class="rw-ring" style="--d:${RW_MS - 700}ms"></div>
    <div class="rw-title">◀◀ REMBOBINAGE<small>le temps recule</small></div><div class="rw-flash"></div>`;
  scene.appendChild(ov); scene.classList.add('rw-on'); ecaState(fu, 'xel-rewind', RW_MS + 40);
  requestAnimationFrame(() => ov.classList.add('go'));
  setTimeout(() => { ov.remove(); scene.classList.remove('rw-on'); }, RW_MS + 60);
}
function startRewind(h, card, scene, fresh) {
  const info = h.fight.rwInfo, quick = !FX_OK();
  const p1 = fresh.filter(c => c.n <= info.at).slice(-3), p2 = fresh.filter(c => c.n > info.at).slice(-3);
  const hold = o => { const r = {}; (o || []).forEach((v, i) => { r[i] = v; }); return r; };
  PF_HOLD[h.id] = hold(info.mid); // le premier jet frappe, les monstres tombent aux PV « du milieu »
  FURY_ANIM[h.id] = 1;
  p1.forEach((c, j) => setTimeout(() => playSpellFx(card, c), 60 + j * 280));
  const T0 = p1.length ? 60 + (p1.length - 1) * 280 + 820 : 120, dur = quick ? 1200 : RW_MS;
  setTimeout(() => {
    if (quick) sceneFx(scene, 'rewind', 'Rembobinage !'); else playRewind(card, scene);
    setTimeout(() => { PF_HOLD[h.id] = hold(info.pre); patchCombat(); }, quick ? 300 : RW_MID); // à mi-course : le temps a reculé, les PV remontent, les morts se relèvent
  }, T0);
  const T1 = T0 + dur + 100;
  setTimeout(() => { delete PF_HOLD[h.id]; ecaText(card, 'TOUR REJOUÉ !', '', 'xel'); patchCombat(); }, T1);
  p2.forEach((c, j) => setTimeout(() => playSpellFx(card, c), T1 + 160 + j * 280));
  setTimeout(() => { delete FURY_ANIM[h.id]; delete PF_HOLD[h.id]; if (h.fight) h.wait = Math.max(h.wait, 700); }, T1 + 260 + p2.length * 280);
}
/* ---------------------- Colère de Iop : jauge + cinématique ---------------------- */
const FURY_ANIM = {};
let FURY_FREEZE = 0; // > 0 pendant la cinématique de la Colère de Iop : plus personne n'agit (héros, ennemis, autres joueurs)
const COLERE_ICON = `<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="cfb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset="1" stop-color="#ffc94a"/></linearGradient></defs><path d="M16 2 L19 6 L19 20 L13 20 L13 6 Z" fill="url(#cfb)" stroke="#5a1408" stroke-width="1.2"/><path d="M16 4 L16 19" stroke="#e8a52a" stroke-width="1"/><path d="M8 20 Q16 23 24 20 L24 22.5 Q16 25.5 8 22.5 Z" fill="#ffb62e" stroke="#5a1408" stroke-width="1.1"/><rect x="14.4" y="23" width="3.2" height="5" rx="1" fill="#7a2410" stroke="#3a0c04" stroke-width=".8"/><circle cx="16" cy="29.3" r="1.9" fill="#ff3b22" stroke="#3a0c04" stroke-width=".8"/></svg>`;
function furyGauge(h) {
  const p = clamp((h.fury || 0) / FURY_MAX, 0, 1);
  return `<div class="fury${p >= 1 ? ' full' : ''}" data-k="fury" title="Jauge de Fureur : ${Math.floor(h.fury || 0)} / ${FURY_MAX}"><span class="fury-fill" style="--p:${p.toFixed(3)}"></span><span class="fury-lbl">${p >= 1 ? 'FUREUR !' : 'Fureur ' + Math.floor(p * 100) + ' %'}</span></div>`;
}
const COLERE_SWORD = `<svg class="cl-sword-svg" viewBox="0 0 120 400" aria-hidden="true"><defs>
  <linearGradient id="clBlade" x1="0" x2="1"><stop offset="0" stop-color="#9fb4c8"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".55" stop-color="#e9f3ff"/><stop offset="1" stop-color="#6f849a"/></linearGradient>
  <linearGradient id="clGold" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#f2b233"/><stop offset="1" stop-color="#9a5a0e"/></linearGradient>
  <radialGradient id="clGem"><stop offset="0" stop-color="#ffd0c0"/><stop offset=".4" stop-color="#ff3b22"/><stop offset="1" stop-color="#6a0a02"/></radialGradient>
  <filter id="clGlow" x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <g filter="url(#clGlow)">
    <rect x="52" y="6" width="16" height="44" rx="5" fill="#5a1a0c" stroke="#2a0802" stroke-width="2"/>
    <path d="M52 14h16M52 24h16M52 34h16M52 44h16" stroke="#a8401c" stroke-width="2"/>
    <circle cx="60" cy="6" r="9" fill="url(#clGold)" stroke="#3a1c04" stroke-width="2"/><circle cx="60" cy="6" r="4" fill="url(#clGem)"/>
    <path d="M6 58 Q30 44 60 52 Q90 44 114 58 L108 68 Q84 60 60 66 Q36 60 12 68 Z" fill="url(#clGold)" stroke="#3a1c04" stroke-width="2.4"/>
    <circle cx="60" cy="60" r="8" fill="url(#clGem)" stroke="#3a1c04" stroke-width="2"/>
    <path d="M40 68 L80 68 L76 350 L60 396 L44 350 Z" fill="url(#clBlade)" stroke="#2c3a4a" stroke-width="2.4"/>
    <path d="M60 72 L60 372" stroke="#8aa0b8" stroke-width="3"/><path d="M57 80 L57 340" stroke="#ffffffaa" stroke-width="1.5"/>
    <path d="M46 120 L52 112 M74 160 L68 152 M48 230 L54 222" stroke="#ff5a2a" stroke-width="2.5" opacity=".8"/>
  </g></svg>`;
function relPos(el, scene) { const a = el.getBoundingClientRect(), b = scene.getBoundingClientRect(), k = b.width && scene.offsetWidth ? scene.offsetWidth / b.width : 1; /* scène dézoomée : retour à ses pixels */ return { x: (a.left - b.left + a.width / 2) * k, y: (a.top - b.top + a.height / 2) * k, w: b.width * k, h: b.height * k }; }
function playColere(card, h, done) {
  const scene = card.querySelector('.scene'); const hero = card.querySelector('[data-k="fighter"]');
  if (!scene || !hero) { done(); return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = reduced ? { title: 0, leap: 100, drop: 150, impact: 300, end: 900 } : { title: 380, leap: 650, drop: 1250, impact: 1700, end: 3200 };
  const mons = [...card.querySelectorAll('.unit.mon:not(.dead)')];
  const hp = relPos(hero.querySelector('.sprite') || hero, scene);
  const foes = mons.length ? mons.map(m => relPos(m.querySelector('.sprite') || m, scene)) : [{ x: hp.w * .72, y: hp.h * .6 }];
  const cx = foes.reduce((s, p) => s + p.x, 0) / foes.length, gy = Math.max(...foes.map(p => p.y)) + 18;
  const ov = document.createElement('div'); ov.className = 'colere'; ov.style.setProperty('--hx', hp.x + 'px'); ov.style.setProperty('--hy', hp.y + 'px'); ov.style.setProperty('--cx', cx + 'px'); ov.style.setProperty('--gy', gy + 'px');
  let parts = '';
  for (let i = 0; i < 16; i++) { const a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 60; parts += `<i class="cl-in" style="--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r * .7).toFixed(0)}px;--d:${(Math.random() * 380).toFixed(0)}ms"></i>`; }
  let embers = '';
  for (let i = 0; i < 26; i++) { const a = -Math.PI * (0.05 + Math.random() * 0.9), r = 60 + Math.random() * 150; embers += `<i class="cl-ember" style="--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r).toFixed(0)}px;--s:${(3 + Math.random() * 5).toFixed(1)}px;--d:${(Math.random() * 120).toFixed(0)}ms"></i>`; }
  let rocks = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI * (0.1 + Math.random() * 0.8), r = 40 + Math.random() * 90; rocks += `<i class="cl-rock" style="--dx:${(Math.cos(a) * r).toFixed(0)}px;--dy:${(Math.sin(a) * r).toFixed(0)}px;--r:${(Math.random() * 720 - 360).toFixed(0)}deg"></i>`; }
  ov.innerHTML = `<div class="cl-dark"></div>
    <div class="cl-aura"><svg class="cl-rune" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44"/><circle cx="50" cy="50" r="34" class="r2"/><path d="M50 6 L58 50 L50 94 L42 50 Z M6 50 L50 42 L94 50 L50 58 Z" class="r3"/></svg>${parts}</div>
    <div class="cl-title"><span>COLÈRE</span><b>DE IOP</b></div>
    <div class="cl-speed"></div>
    <div class="cl-beam"></div>
    <div class="cl-sword">${COLERE_SWORD}</div>
    <div class="cl-impact"><div class="cl-wave"></div><div class="cl-wave w2"></div><div class="cl-wave w3"></div>
      <svg class="cl-crack" viewBox="-100 -20 200 40"><path d="M0 0 L-30 6 L-52 2 L-80 10 M0 0 L26 8 L48 3 L84 11 M0 0 L-14 14 M0 0 L12 16 L22 14 M-30 6 L-38 16 M48 3 L56 -6"/></svg>
      ${embers}${rocks}</div>
    <div class="cl-bigslash"><i></i><i class="b2"></i></div>
    <div class="cl-flash"></div>`;
  scene.appendChild(ov);
  scene.classList.add('cl-on'); hero.classList.add('cl-charge');
  requestAnimationFrame(() => ov.classList.add('s1'));
  setTimeout(() => ov.classList.add('s2'), T.title);
  setTimeout(() => { // le Iop bondit : images fantômes qui suivent son vrai mouvement
    hero.classList.remove('cl-charge'); hero.classList.add('cl-leap'); ov.classList.add('s25');
    const sp = hero.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-iop');
    if (!svg || reduced) return;
    const gh = setInterval(() => {
      const r = sp.getBoundingClientRect(), b = scene.getBoundingClientRect(); const g = document.createElement('div'); g.className = 'cl-ghost';
      const k = b.width && scene.offsetWidth ? scene.offsetWidth / b.width : 1; g.style.cssText = `left:${(r.left - b.left) * k}px;top:${(r.top - b.top) * k}px;width:${r.width * k}px;height:${r.height * k}px`;
      const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c); ov.appendChild(g); setTimeout(() => g.remove(), 600);
    }, 70);
    setTimeout(() => clearInterval(gh), T.impact - T.leap + 120);
  }, T.leap);
  setTimeout(() => ov.classList.add('s3'), T.drop);
  setTimeout(() => {
    ov.classList.add('s4'); scene.classList.add('cl-shake');
    const hits = done();
    if (hits) mons.forEach(m => { const i = +m.dataset.mon; const x = hits[i]; if (!x) return;
      const n = document.createElement('span'); n.className = 'cl-num' + (x.crit ? ' crit' : ''); n.textContent = '−' + fmt(x.v); m.appendChild(n); setTimeout(() => n.remove(), 1700);
      m.classList.add('cl-hit'); setTimeout(() => m.classList.remove('cl-hit'), 900); });
  }, T.impact);
  setTimeout(() => scene.classList.remove('cl-shake'), T.impact + 520);
  setTimeout(() => { ov.classList.add('s5'); }, T.end - 450);
  setTimeout(() => { ov.remove(); scene.classList.remove('cl-on'); hero.classList.remove('cl-leap'); }, T.end);
}
/* ---------------------- Sacrieur : Colosse de Sang ----------------------
   ~5 s : un sceau de sang se grave sous ses pieds, des arcs de sang jaillissent de sa poitrine et dessinent un second sceau sous les ennemis ;
   le Sacrieur paie son tribut (PV), passe en Berserk, et un colosse spectral — son propre reflet, géant — se dresse derrière lui, arme son poing
   puis l'abat sur les ennemis : onde de choc, lances de sang, pluie écarlate. Le sang des vaincus lui revient (Soif de sang). */
const CC_SEAL = (() => {
  let ticks = '', runes = '';
  for (let i = 0; i < 36; i++) { const a = i * 10 * Math.PI / 180, r1 = 83, r2 = i % 3 ? 87 : 91; ticks += `M${(100 + r1 * Math.sin(a)).toFixed(1)} ${(100 - r1 * Math.cos(a)).toFixed(1)}L${(100 + r2 * Math.sin(a)).toFixed(1)} ${(100 - r2 * Math.cos(a)).toFixed(1)}`; }
  for (let i = 0; i < 6; i++) runes += `<path transform="rotate(${i * 60} 100 100)" d="M100 28v14M94 31l6 6 6-6M96 46h8"/>`;
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><g class="sp" fill="none" stroke="#ff3a2a" stroke-linecap="round" stroke-linejoin="round">
    <circle class="dr" cx="100" cy="100" r="95" pathLength="100" stroke-width="3.4"/><circle class="dr" cx="100" cy="100" r="78" pathLength="100" stroke-width="1.8"/>
    <path class="fd" d="${ticks}" stroke-width="1.6"/>
    <path class="dr" pathLength="100" d="M100 24L166 138H34Z" stroke-width="2.6"/><path class="dr" pathLength="100" d="M100 176L34 62H166Z" stroke-width="2.6"/>
    <circle class="dr" cx="100" cy="100" r="46" pathLength="100" stroke-width="2"/>
    <g class="fd" stroke-width="2.2">${runes}</g>
    <circle class="fd" cx="100" cy="100" r="9" fill="#ff3a2a" stroke="none"/></g></svg>`;
})();
function playColosse(card, h, k) {
  const scene = card.querySelector('.scene'), fu = card.querySelector('[data-k="fighter"]'), sp = fu && fu.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-sacrieur');
  const mons = [...card.querySelectorAll('.unit.mon:not(.dead)')];
  let res = null;
  const nums = () => { const hits = res && res.hits; if (!hits) return; mons.forEach(m => { const x = hits[+m.dataset.mon]; if (!x) return;
    const n = document.createElement('span'); n.className = 'cl-num' + (x.crit ? ' crit' : ''); n.textContent = '−' + fmt(x.v); m.appendChild(n); setTimeout(() => n.remove(), 1700);
    m.classList.add('cl-hit'); setTimeout(() => m.classList.remove('cl-hit'), 900); }); };
  if (!scene || !sp || !svg || !FX_OK()) { // mouvement réduit : pas de cinématique, juste les effets de jeu
    setTimeout(() => { res = k.pay(); }, 150); setTimeout(() => { k.impact(); nums(); }, 500); setTimeout(() => k.heal(), 900); setTimeout(k.done, 1300);
    return;
  }
  const T = { pay: 950, rise: 1050, title: 1250, wind: 2100, slam: 2600, hit: 2830, end: 5000 };
  const hp = relPos(sp, scene), sw = sp.offsetWidth, sh = sp.offsetHeight, W = hp.w, H = hp.h;
  const foes = mons.length ? mons.map(m => { const s = m.querySelector('.sprite') || m, p = relPos(s, scene); return { x: p.x, y: p.y, g: p.y + s.offsetHeight * .42, el: m }; }) : [{ x: W * .72, y: H * .6, g: H * .8, el: null }];
  const fx = foes.reduce((a, p) => a + p.x, 0) / foes.length, fy = foes.reduce((a, p) => a + p.y, 0) / foes.length, gy = Math.max(...foes.map(p => p.g));
  const hg = hp.y + sh * .42, chest = { x: hp.x + sw * .03, y: hp.y - sh * .04 };
  const cs = Math.round(Math.min(H * 1.3, W * .58)), ox = cs * .4, oy = cs * .9, bodyX = Math.max(hp.x + sw * .5, cs * .44), cl = Math.round(bodyX - cs * 62 / 128), ct = Math.round(6 - cs * .09);
  const FX = cs * 105 / 128, FY = cs * 76 / 128, rest = { x: cl + FX, y: ct + FY }, tgt = { x: fx - 22, y: (fy * 2 + gy) / 3 - 4 }, sh0 = { x: cl + cs * 84 / 128, y: ct + cs * 58 / 128 }; // poing au repos, cible de l'impact, épaule du colosse
  const tx = Math.round(tgt.x - rest.x), ty = Math.round(tgt.y - rest.y);
  const ov = document.createElement('div'); ov.className = 'colosse'; ov.style.cssText = `--ch:${H}px`;
  const sealBox = (cx, cy, w) => `left:${(cx - w / 2).toFixed(0)}px;top:${(cy - w * .17).toFixed(0)}px;width:${w.toFixed(0)}px;height:${(w * .34).toFixed(0)}px`;
  const spread = foes.length > 1 ? Math.max(...foes.map(p => p.x)) - Math.min(...foes.map(p => p.x)) : 0;
  const arcs = foes.map((p, i) => { const x1 = p.x, y1 = p.g - 4, dx = x1 - chest.x; return `M${chest.x.toFixed(0)} ${chest.y.toFixed(0)}C${(chest.x + dx * .25).toFixed(0)} ${(chest.y - H * .5).toFixed(0)} ${(x1 - dx * .25).toFixed(0)} ${(chest.y - H * .55).toFixed(0)} ${x1.toFixed(0)} ${y1.toFixed(0)}`; });
  ov.innerHTML = `<div class="cc-dark"></div><div class="cc-beat"></div>
    <div class="cc-seal h" style="${sealBox(hp.x, hg, sw * 2.3)}">${CC_SEAL}</div>
    <div class="cc-seal f" style="${sealBox(fx, gy, Math.max(sw * 3, spread + sw * 2.4))}">${CC_SEAL}</div>
    <svg class="cc-arcs" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${arcs.map(d => `<path class="o" pathLength="100" d="${d}"/><path class="r" pathLength="100" d="${d}"/><path class="l" pathLength="100" d="${d}"/>`).join('')}</svg>
    <div class="cc-col hero sac-rage" style="left:${cl}px;top:${ct}px;width:${cs}px;height:${cs}px;transform-origin:${ox}px ${oy}px;--st:1"></div>
    <svg class="cc-arm" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="o" stroke-width="${Math.round(cs * .12) + 8}"/><path class="r" stroke-width="${Math.round(cs * .12)}"/><path class="l" stroke-width="${Math.round(cs * .04)}"/></svg>
    <div class="cc-fist hero sac-rage" style="left:${cl}px;top:${ct}px;width:${cs}px;height:${cs}px;transform-origin:${FX}px ${FY}px;--st:1"><i class="cc-fm" style="left:${FX}px;top:${FY}px"></i></div>
    <div class="cc-title" style="--fs:${Math.round(Math.min(H * .2, W * .1))}px"><span>COLOSSE</span><b>DE SANG</b></div><div class="cc-flash"></div>`;
  const col = ov.querySelector('.cc-col'), fist = ov.querySelector('.cc-fist'), fm = ov.querySelector('.cc-fm'), armSvg = ov.querySelector('.cc-arm'), c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); col.appendChild(c); fist.appendChild(c.cloneNode(true));
  scene.appendChild(ov); scene.classList.add('cc-on');
  const live = () => ov.isConnected, at = (ms, fn) => setTimeout(() => { if (live()) fn(); }, ms);
  const an = (el, kf, o) => el.animate(kf, Object.assign({ duration: 400, fill: 'forwards', easing: 'ease-out' }, o));
  const add = (cls, css, ms, html) => { const e = document.createElement('i'); e.className = cls; e.style.cssText = css; if (html) e.innerHTML = html; ov.appendChild(e); if (ms) setTimeout(() => e.remove(), ms); return e; };
  const q = s => ov.querySelector(s), qa = s => [...ov.querySelectorAll(s)];
  ecaState(fu, 'sac-cast', T.slam - 50);
  an(q('.cc-dark'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600 });
  [250, 700, 1150].forEach((t, i) => at(t, () => { an(q('.cc-beat'), [{ opacity: 0, transform: 'scale(.9)' }, { opacity: .6 - i * .08, transform: 'scale(1.04)', offset: .3 }, { opacity: 0, transform: 'scale(1)' }], { duration: 420, fill: 'none' }); }));
  // sceaux de sang : se gravent sous le Sacrieur puis sous les ennemis
  const seal = (el, delay, dur) => { el.classList.add('on'); qa('.cc-seal.' + el.classList[1] + ' .dr').forEach((p, i) => an(p, [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: dur, delay: delay + i * 70, fill: 'both' })); an(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay }); };
  seal(q('.cc-seal.h'), 0, 800); seal(q('.cc-seal.f'), 650, 800);
  // arcs de sang qui partent de la poitrine
  qa('.cc-arcs path').forEach((p, i) => { const f = Math.floor(i / 3); p.style.strokeDasharray = '100'; an(p, [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: 720, delay: 280 + f * 90, easing: 'cubic-bezier(.3,.6,.3,1)', fill: 'both' }); });
  at(T.pay, () => { // le tribut : PV perdus, Berserk, gerbe de sang
    res = k.pay();
    for (let i = 0; i < 30; i++) { const a = -Math.PI * (.02 + Math.random() * .96), r = 40 + Math.random() * 110; add('cc-drop', `left:${chest.x.toFixed(0)}px;top:${chest.y.toFixed(0)}px;--dx:${(Math.cos(a) * r * 1.3).toFixed(0)}px;--dy:${(Math.sin(a) * r).toFixed(0)}px;--s:${(3 + Math.random() * 6).toFixed(1)}px;--d:${(Math.random() * 220).toFixed(0)}ms`, 1700); }
    add('cc-ring', `left:${chest.x}px;top:${chest.y}px`, 1000);
    an(q('.cc-flash'), [{ opacity: .4 }, { opacity: 0 }], { duration: 380 });
  });
  // le colosse se dresse
  at(T.rise, () => an(col, [{ transform: `translate(-34px,${(cs * .55).toFixed(0)}px) scale(.82)`, opacity: 0 }, { transform: 'translate(0,0) scale(1)', opacity: .9 }], { duration: 950, easing: 'cubic-bezier(.2,.8,.2,1)' }));
  at(T.rise + 100, () => { scene.classList.add('cc-rumble'); setTimeout(() => scene.classList.remove('cc-rumble'), 850); });
  at(T.title, () => an(q('.cc-title'), [{ opacity: 0, transform: 'translate(-50%,0) scale(3.2)', filter: 'blur(10px)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1)', filter: 'blur(0)', offset: .55 }, { opacity: 1, transform: 'translate(-50%,0) scale(1.04)' }], { duration: 1250, easing: 'cubic-bezier(.2,1.3,.4,1)' }));
  // il arme son poing : le poing se détache du colosse (un bras de sang le retient) et recule…
  const beam = () => { if (!live()) return; const m = relPos(fm, scene), dd = `M${sh0.x.toFixed(0)} ${sh0.y.toFixed(0)}Q${((sh0.x + m.x) / 2).toFixed(0)} ${((sh0.y + m.y) / 2 - H * .2).toFixed(0)} ${m.x.toFixed(0)} ${m.y.toFixed(0)}`; armSvg.querySelectorAll('path').forEach(pp => pp.setAttribute('d', dd)); requestAnimationFrame(beam); };
  at(T.wind, () => {
    col.classList.add('arm-off'); fist.style.opacity = 1; armSvg.style.opacity = 1; beam();
    an(col, [{ transform: 'translate(0,0) rotate(0deg)' }, { transform: `translate(${(-cs * .03).toFixed(0)}px,0) rotate(-5deg)` }], { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)' });
    an(fist, [{ transform: 'translate(0,0) scale(1) rotate(0deg)' }, { transform: `translate(${(-cs * .1).toFixed(0)}px,${(-cs * .2).toFixed(0)}px) scale(1.4) rotate(-18deg)` }], { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)' });
  });
  // …puis s'abat sur les ennemis
  at(T.slam, () => {
    an(col, [{ transform: `translate(${(-cs * .03).toFixed(0)}px,0) rotate(-5deg)` }, { transform: `translate(${(cs * .05).toFixed(0)}px,${(cs * .03).toFixed(0)}px) rotate(7deg)` }], { duration: T.hit - T.slam, easing: 'cubic-bezier(.7,0,1,.5)' });
    an(fist, [{ transform: `translate(${(-cs * .1).toFixed(0)}px,${(-cs * .2).toFixed(0)}px) scale(1.4) rotate(-18deg)`, filter: 'blur(0)' }, { transform: `translate(${tx}px,${ty}px) scale(2.5) rotate(12deg)`, filter: 'blur(0)' }], { duration: T.hit - T.slam, easing: 'cubic-bezier(.7,0,1,.45)' });
    heroGesture(fu, 'atk');
  });
  at(T.hit - 60, () => { an(q('.cc-title'), [{ opacity: 1 }, { opacity: 0, transform: 'translate(-50%,-14px) scale(1.35)' }], { duration: 300 }); });
  at(T.hit, () => { // IMPACT
    k.impact(); nums();
    scene.classList.remove('cl-shake'); void scene.offsetWidth; scene.classList.add('cl-shake'); setTimeout(() => scene.classList.remove('cl-shake'), 560);
    an(q('.cc-flash'), [{ opacity: .8 }, { opacity: 0 }], { duration: 340, easing: 'ease-out' });
    qa('.cc-arcs path').forEach(p => an(p, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 }));
    for (let n = 0; n < 3; n++) add('cc-wave', `left:${fx.toFixed(0)}px;top:${(gy).toFixed(0)}px;--w:${Math.round(Math.max(sw * 2.4, spread + sw * 2))}px;animation-delay:${n * 120}ms`, 1300);
    add('cc-crack', `left:${(fx - 170).toFixed(0)}px;top:${(gy - 16).toFixed(0)}px`, 2600, `<svg viewBox="-100 -20 200 40" width="340" height="68"><path pathLength="100" d="M0 0L-30 6L-52 2L-80 10M0 0L26 8L48 3L84 11M0 0L-14 14M0 0L12 16L22 14M-30 6L-38 16M48 3L56-6"/></svg>`);
    foes.forEach((p, i) => { // lances de sang sous chaque ennemi
      [[0, 1, 1], [-.55, .62, .66], [.55, .62, .66], [-1.05, .36, .5], [1.05, .36, .5]].forEach(([ox2, hh, ww], j) => {
        const wd = Math.round(sw * .34 * ww), ht = Math.round(H * .78 * hh * (.85 + Math.random() * .3));
        const e = add('cc-spike', `left:${(p.x + ox2 * sw * .42 - wd / 2).toFixed(0)}px;top:${(p.g - ht).toFixed(0)}px;width:${wd}px;height:${ht}px`, 1900);
        an(e, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1.06)', offset: .55 }, { transform: 'scaleY(1)', offset: .7 }, { transform: 'scaleY(1)', opacity: 1, offset: .8 }, { transform: 'scaleY(.3)', opacity: 0 }], { duration: 1500, delay: j * 40 + i * 50, easing: 'cubic-bezier(.1,.8,.3,1)' });
      });
      for (let n = 0; n < 16; n++) { const a = -Math.PI * (.05 + Math.random() * .9), r = 40 + Math.random() * 110; add('cc-drop big', `left:${p.x.toFixed(0)}px;top:${(p.g - 6).toFixed(0)}px;--dx:${(Math.cos(a) * r * 1.2).toFixed(0)}px;--dy:${(Math.sin(a) * r * 1.2).toFixed(0)}px;--s:${(4 + Math.random() * 8).toFixed(1)}px;--d:${(Math.random() * 120).toFixed(0)}ms`, 1700); }
    });
    for (let n = 0; n < 46; n++) add('cc-rain', `left:${(Math.random() * W).toFixed(0)}px;--len:${(10 + Math.random() * 20).toFixed(0)}px;--fall:${(H + 50)}px;animation-delay:${(80 + Math.random() * 700).toFixed(0)}ms;animation-duration:${(520 + Math.random() * 420).toFixed(0)}ms`, 1900);
  });
  at(T.hit + 420, () => { an(col, [{ opacity: .95 }, { opacity: 0, filter: 'blur(7px)' }], { duration: 950, easing: 'ease-in' }); [fist, armSvg].forEach(e => an(e, [{ opacity: 1 }, { opacity: 0, filter: 'blur(6px)' }], { duration: 800, easing: 'ease-in' })); });
  // le sang des vaincus revient au Sacrieur
  at(T.hit + 900, () => {
    const heal = (res && res.heal) || 0; if (heal <= 0) return;
    foes.forEach((p, i) => { for (let n = 0; n < 5; n++) { const e = add('cc-fly', `left:${(p.x + Math.random() * 30 - 15).toFixed(0)}px;top:${(p.y + Math.random() * 30 - 10).toFixed(0)}px;--s:${(5 + Math.random() * 5).toFixed(0)}px`, 1500);
      an(e, [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${((chest.x - p.x) * .5 + (Math.random() - .5) * 60).toFixed(0)}px,${(-60 - Math.random() * 50).toFixed(0)}px) scale(1.2)`, opacity: 1, offset: .45 }, { transform: `translate(${(chest.x - p.x).toFixed(0)}px,${(chest.y - p.y).toFixed(0)}px) scale(.4)`, opacity: .9 }], { duration: 820, delay: n * 70 + i * 60, easing: 'cubic-bezier(.5,0,.6,1)' }); } });
    at(1000, () => { k.heal(); ecaState(fu, 'sac-absorb', 900); });
  });
  at(T.end - 450, () => { an(q('.cc-dark'), [{ opacity: 1 }, { opacity: 0 }], { duration: 450 }); qa('.cc-seal').forEach(e => an(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 450 })); });
  setTimeout(() => { ov.remove(); scene.classList.remove('cc-on', 'cc-rumble'); fu.classList.remove('sac-cast'); k.done(); }, T.end);
}
function logHtml(h) { return h.log.slice(-9).reverse().map(l => `<div class="${l.c || ''}">${esc(l.t)}</div>`).join(''); }
function floatNum(el, txt, cls) {
  const f = document.createElement('span'); f.className = 'fnum ' + cls; f.textContent = txt;
  el.appendChild(f); setTimeout(() => f.remove(), 950);
  if (cls === 'dmg') { el.classList.add('hit'); setTimeout(() => el.classList.remove('hit'), 300); }
}
/* Effets visuels des passifs (Xélor) posés par-dessus la scène */
function sceneFx(scene, kind, text, icon = '⏳') {
  if (!scene) return;
  const fx = document.createElement('div'); fx.className = 'fx fx-' + kind;
  fx.innerHTML = `<div class="fx-ring"></div><div class="fx-ring r2"></div><div class="fx-icon">${icon}</div>${text ? `<div class="fx-text">${text}</div>` : ''}`;
  scene.appendChild(fx);
  scene.classList.remove('fx-' + kind + '-on'); void scene.offsetWidth; scene.classList.add('fx-' + kind + '-on');
  setTimeout(() => { fx.remove(); scene.classList.remove('fx-' + kind + '-on'); }, 1500);
}
function iceBurst(el) {
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('span'); s.className = 'ice'; s.textContent = '❄';
    const a = (i / 6) * Math.PI * 2; s.style.setProperty('--dx', Math.cos(a) * 34 + 'px'); s.style.setProperty('--dy', Math.sin(a) * 26 - 10 + 'px');
    el.appendChild(s); setTimeout(() => s.remove(), 800);
  }
  el.classList.remove('freeze-pop'); void el.offsetWidth; el.classList.add('freeze-pop');
}
/* Bouton « Combattre l'archimonstre » : dans la scène du héros qui se trouve dans la zone, en haut à droite */
function updateArchiBtn() {
  const btns = document.querySelectorAll('[data-k="archibtn"]'); if (!btns.length) return;
  const a = st.archi, ar = a && MONSTERS[a.mid];
  let tgt = null, state = 0;
  if (ar) {
    tgt = st.heroes.find(x => x.fight && x.fight.archi); if (tgt) state = 2;
    if (!tgt) { tgt = st.heroes.find(x => x.nextArchi); if (tgt) state = 1; }
    if (!tgt) { const inZone = x => x.act && x.act.type === 'zone' && x.act.id === a.zone; tgt = [heroById(a.hero), ...st.heroes].find(x => x && inZone(x)); }
  }
  for (const btn of btns) {
    const card = btn.closest('[data-hero-card]'), mine = !!(tgt && card && card.dataset.heroCard === String(tgt.id));
    const sg = mine ? state + ':' + a.mid : '';
    if (btn.dataset.s === sg) continue;
    btn.dataset.s = sg; btn.hidden = !mine; btn.classList.toggle('queued', state > 0);
    btn.innerHTML = mine ? `<span class="ab-ic">👹</span><b>${state === 2 ? 'Combat contre l’archimonstre…' : state === 1 ? 'Archimonstre au prochain combat…' : 'Combattre l’archimonstre'}</b><small>${esc(ar.name)}</small>` : '';
    btn.title = mine ? ar.name : '';
  }
}
function patchCombat() {
  for (const h of st.heroes) {
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) continue;
    const t = heroTotals(st, h); const hp = displayHp(st, h);
    const q = k => card.querySelector(`[data-k="${k}"]`);
    const [sc, stxt] = statusOf(h);
    const scene = card.querySelector('.scene');
    if (h.fight && scene) {
      const seen = +(scene.dataset.fx || 0);
      const fresh = (h.fight.fx || []).filter(c => c.n > seen);
      let lead = 0; // l'Ecaflip lance sa pièce (ou joue son Quitte ou Double) AVANT de frapper
      if (h.cls === 'ecaflip') { const cf0 = h.fight.coinFx, gf0 = h.fight.gambleFx; if (gf0 && gf0.n > +(scene.dataset.gm || 0)) lead = 1300; else if (cf0 && cf0.n > +(scene.dataset.co || 0)) lead = 450; }
      const rwNew = h.cls === 'xelor' && !!h.fight.rwInfo && (h.fight.rewinds || 0) > +(scene.dataset.rw || 0) && fresh.length > 0;
      const pfNew = h.cls === 'cra' && h.fight.perfect && h.fight.perfect.n > +(scene.dataset.pf || 0);
      if (fresh.length) scene.dataset.fx = fresh[fresh.length - 1].n;
      if (pfNew) { scene.dataset.pf = h.fight.perfect.n; startPerfect(h, card, scene, fresh); } // Tir Parfait : cinématique, combat figé
      else if (rwNew) startRewind(h, card, scene, fresh); // Rembobinage : cinématique, combat figé, puis le tour est rejoué
      else if (fresh.length) fresh.slice(-6).forEach((c, i) => setTimeout(() => playSpellFx(card, c), lead + i * 280));
      const rw = h.fight.rewinds || 0, px = h.fight.paradox ? 1 : 0;
      const ma = h.fight.monAct; if (ma && ma.n > +(scene.dataset.ma || 0)) { scene.dataset.ma = ma.n; const el = card.querySelector(`[data-mon="${ma.i}"]`); if (el) { el.classList.remove('atk'); void el.offsetWidth; el.classList.add('atk'); setTimeout(() => el.classList.remove('atk'), 520); } }
      if (h.cls === 'sram') {
        const tf = h.fight.trapFx; if (tf && tf.n > +(scene.dataset.tr || 0)) { scene.dataset.tr = tf.n; trapBoom(card, tf); }
        const vn = h.fight.vanishSeq || 0; if (vn > +(scene.dataset.vn || 0)) { scene.dataset.vn = vn; smokePuff(card.querySelector('[data-k="fighter"] .sprite'), true); }
        const ms = h.fight.missSeq || 0; if (ms > +(scene.dataset.ms || 0)) { scene.dataset.ms = ms; missFx(card); }
      }
      if (h.cls === 'ecaflip') {
        const cf = h.fight.coinFx; if (cf && cf.n > +(scene.dataset.co || 0)) { scene.dataset.co = cf.n; coinFlip(card, cf.face); }
        const gf = h.fight.gambleFx; if (gf && gf.n > +(scene.dataset.gm || 0)) { scene.dataset.gm = gf.n; setTimeout(() => gambleFx(card, scene, gf.win), 200); ecaState(card.querySelector('[data-k="fighter"]'), gf.win ? 'ecg-win' : 'ecg-lose', 1500); }
        const nv = h.fight.lifeSeq || 0; if (nv > +(scene.dataset.nv || 0)) { scene.dataset.nv = nv; ecaText(card, '🐾 NEUF VIES !', 'face'); coinBurst(card.querySelector('[data-k="fighter"]'), 8, '🐾'); ecaState(card.querySelector('[data-k="fighter"]'), 'ecg-life', 1700); ecaSpirits(card.querySelector('[data-k="fighter"] .sprite')); }
        const dg = h.fight.dodgeSeq || 0; if (dg > +(scene.dataset.dg || 0)) { scene.dataset.dg = dg; ecaState(card.querySelector('[data-k="fighter"]'), 'eca-dodge', 520); ecaText(card, 'ESQUIVE !', 'pile'); }
      }
      if (h.cls === 'enutrof') {
        const ch = h.fight.chestSeq || 0; if (ch > +(scene.dataset.ch || 0)) { scene.dataset.ch = ch; goldFx(card, 'Coffre !', card.querySelector(`[data-mon="${h.fight.treasure}"] .sprite`), 12); }
        const jk = h.fight.jackSeq || 0; if (jk > +(scene.dataset.jk || 0)) { scene.dataset.jk = jk; playJackpot(card, h.fight.jackFx); }
        const bb = h.fight.bribeSeq || 0; if (bb > +(scene.dataset.bb || 0)) { scene.dataset.bb = bb; goldFx(card, 'Pot-de-vin !', scene, 16); }
      }
      if (+(scene.dataset.rw || 0) < rw && !rwNew) sceneFx(scene, 'rewind', 'Rembobinage !');
      if (+(scene.dataset.px || 0) < px) sceneFx(scene, 'paradox', 'Paradoxe !');
      const mt = h.fight.martyrSeq || 0; if (+(scene.dataset.mt || 0) < mt) { sceneFx(scene, 'martyr', 'MARTYRE !', '☠️'); ecaState(card.querySelector('[data-k="fighter"]'), 'sac-martyr', 1300); } scene.dataset.mt = mt;
      scene.dataset.rw = rw; scene.dataset.px = px;
    }
    const s1 = q('status'); if (s1) { if (s1.textContent !== stxt) s1.textContent = stxt; s1.className = 'status ' + sc; }
    const fg = q('fighter');
    if (fg) {
      const prev = +fg.dataset.hp;
      if (h.fight && !isNaN(prev) && hp !== prev) {
        if (hp < prev) floatNum(fg, '−' + fmt(prev - hp), 'dmg');
        else if (h.fight.turn > 1) floatNum(fg, '+' + fmt(hp - prev), 'heal');
      }
      fg.dataset.hp = hp;
      const isDead = h.hp <= 0 && h.resting; fg.classList.toggle('dead', isDead); if (!isDead) fg.classList.remove('still'); fg.classList.toggle('active', !!h.fight); // 'still' : déjà à terre, on ne rejoue pas la chute quand la carte est redessinée
    }
    const hpt = q('hpt'); if (hpt) hpt.textContent = `${fmt(hp)} / ${fmt(t.maxHp)}`;
    setBar(q('hpb'), hp, t.maxHp);
    q('xpt').textContent = h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`; setBar(q('xpb'), h.xp, xpToNext(h.lvl));
    const held = PF_HOLD[h.id]; // Tir Parfait en cours : les monstres gardent leurs PV d'avant jusqu'à l'impact
    if (h.fight) h.fight.mons.forEach((m, i) => {
      const el = card.querySelector(`[data-mon="${i}"]`); if (!el) return;
      const mhp = held && held[i] != null ? held[i] : m.hp;
      const prev = +el.dataset.hp;
      if (!isNaN(prev) && mhp < prev) floatNum(el, '−' + fmt(prev - mhp), 'dmg');
      el.dataset.hp = mhp;
      el.classList.toggle('dead', mhp <= 0); if (mhp > 0) el.classList.remove('still');
      if (m.frozen && mhp > 0 && !el.classList.contains('frozen')) iceBurst(el);
      el.classList.toggle('frozen', !!m.frozen && mhp > 0);
      setBar(el, mhp, m.max);
      el.querySelector('[data-k="mhp"]').textContent = fmt(mhp);
    });
    const lg = q('log'); const lk = h.log.length + ':' + (h.log.length ? h.log[h.log.length - 1].t : '');
    if (lg && lg.dataset.lk !== lk && !held) { lg.innerHTML = logHtml(h); lg.dataset.lk = lk; }
    const bf = q('buff'); if (bf) { const tx = foodChip(h); bf.hidden = !tx; if (bf.textContent !== tx) bf.textContent = tx; }
    if (h.cls === 'iop') { const sp = fg && fg.querySelector('.sprite'); if (sp) sp.style.setProperty('--rage', clamp(((h.fight && h.fight.rage) || 0) / 5 + (furyReady(h) ? .25 : 0), 0, 1).toFixed(2)); } // l'aura de flammes grandit avec la Rage
    if (h.cls === 'sram') {
      const inv = !!(h.fight && h.fight.invis); if (fg) fg.classList.toggle('invis', inv);
      const ic = q('invis'); if (ic && ic.hidden === inv) ic.hidden = !inv;
      if (h.fight) card.querySelectorAll('.unit.mon').forEach(el => { const i = +el.dataset.mon, m = h.fight.mons[i], tr = el.querySelector('[data-k="trap"]'); if (tr) tr.classList.toggle('armed', !!m && m.hp > 0 && h.fight.trap === i); });
    }
    if (h.cls === 'ecaflip') { // l'allure du chat suit ses passifs : Face / Pile, Trèfles, Quitte ou Double
      const sp = fg && fg.querySelector('.sprite'), fo = h.fight;
      if (sp) sp.dataset.clv = Math.min(ECA_CLOVER_MAX, h.clover || 0);
      if (fg) { fg.classList.toggle('eca-face', !!(fo && fo.coin === 'face')); fg.classList.toggle('eca-pile', !!(fo && fo.coin === 'pile')); fg.classList.toggle('eca-double', !!(fo && fo.double)); }
    }
    if (h.cls === 'ecaflip') { const cl = q('clover'); if (cl) { const tx = cloverHtml(h); if (cl.innerHTML !== tx) cl.innerHTML = tx; cl.classList.toggle('full', (h.clover || 0) >= ECA_CLOVER_MAX); } }
    if (h.cls === 'enutrof') {
      const pu = q('purse'); if (pu) { const tx = purseHtml(h); if (pu.innerHTML !== tx) pu.innerHTML = tx; pu.classList.toggle('full', (h.purse || 0) >= ENU_PURSE_MAX); }
      if (h.fight) card.querySelectorAll('.unit.mon').forEach(el => { const i = +el.dataset.mon, m = h.fight.mons[i], tr = el.querySelector('[data-k="treasure"]'); if (tr) tr.classList.toggle('on', !!m && m.hp > 0 && h.fight.treasure === i); });
    }
    if (h.cls === 'cra') {
      const fu = card.querySelector('[data-k="fighter"]'), fsp = fu && fu.querySelector('.sprite'), fv = clamp((h.focus || 0) / CRA_FOCUS_MAX, 0, 1).toFixed(2);
      if (fsp && fsp.style.getPropertyValue('--focus') !== fv) fsp.style.setProperty('--focus', fv); // l'aura, la lentille et le faucon suivent la Concentration
      if (fu) fu.classList.toggle('cra-ready', !!h.fight && (h.focus || 0) >= CRA_FOCUS_MAX && h.fight.mons.some(m => m.hp > 0)); // Concentration pleine : l'arc reste bandé
      if (h.fight && scene) { const dg = h.fight.dodgeSeq || 0; if (dg > +(scene.dataset.dg || 0)) { ecaState(fu, 'cra-dodge', 540); ecaText(card, 'ESQUIVE !', '', 'cra'); } scene.dataset.dg = dg; }
      const fo = q('focus'); if (fo) { const tx = focusHtml(h); if (fo.innerHTML !== tx) fo.innerHTML = tx; fo.classList.toggle('full', (h.focus || 0) >= CRA_FOCUS_MAX); }
      if (h.fight) card.querySelectorAll('.unit.mon').forEach(el => { const i = +el.dataset.mon, m = h.fight.mons[i]; el.classList.toggle('prey', !!m && m.hp > 0 && h.fight.mark === i);
        const r = el.querySelector('[data-k="ret"]'); if (r) { const n = h.focus || 0; r.classList.toggle('ready', n >= CRA_FOCUS_MAX); r.querySelectorAll('.seg').forEach((s, k) => s.classList.toggle('on', k < n)); } });
    }
    if (h.cls === 'xelor') { // le cadran fantôme, le sablier et l'aura suivent les grains
      const fu = card.querySelector('[data-k="fighter"]'), fsp = fu && fu.querySelector('.sprite'), g = h.fight ? Math.min(12, h.fight.grains || 0) : 0, gv = (g / 12).toFixed(2);
      if (fsp) { if (fsp.style.getPropertyValue('--gr') !== gv) { fsp.style.setProperty('--gr', gv); fsp.querySelectorAll('.p-pip').forEach((el, i) => el.classList.toggle('lit', i < g)); } }
      if (fu) fu.classList.toggle('xel-full', g >= 12 && !!h.fight && h.fight.mons.some(m => m.hp > 0));
      const cb = q('chrono');
      if (cb && !FURY_ANIM[h.id]) { // le sablier se remplit après le Rembobinage (la cinématique garde l'affichage figé)
        const c = Math.min(CHRONO_MAX, h.chrono || 0), pv = (c / CHRONO_MAX).toFixed(2);
        if (cb.style.getPropertyValue('--p') !== pv) { const up = +pv > +cb.style.getPropertyValue('--p'); cb.style.setProperty('--p', pv); cb.querySelector('b').textContent = `${c}/${CHRONO_MAX}`; if (up) { cb.classList.remove('gain'); void cb.offsetWidth; cb.classList.add('gain'); setTimeout(() => cb.classList.remove('gain'), 1300); } }
        cb.classList.toggle('full', c >= CHRONO_MAX);
      }
    }
    const fu = q('fury'); if (fu) { const p = clamp((h.fury || 0) / FURY_MAX, 0, 1); fu.firstElementChild.style.setProperty('--p', p.toFixed(3)); fu.classList.toggle('full', p >= 1); const lb = fu.lastElementChild, tx = p >= 1 ? 'FUREUR !' : 'Fureur ' + Math.floor(p * 100) + ' %'; if (lb.textContent !== tx) lb.textContent = tx; }
    const fb = q('furybtn'); if (fb) { const show = furyReady(h) && !!h.fight && !FURY_ANIM[h.id] && h.fight.mons.some(m => m.hp > 0); if (fb.hidden === show) fb.hidden = !show; }
    const bl = q('blood'); if (bl) { const p = clamp((h.blood || 0) / SAC_BLOOD_MAX, 0, 1); bl.firstElementChild.style.setProperty('--p', p.toFixed(3)); bl.classList.toggle('full', p >= 1); const lb = bl.lastElementChild, tx = p >= 1 ? 'COLOSSE !' : 'Sang ' + Math.floor(p * 100) + ' %'; if (lb.textContent !== tx) lb.textContent = tx; }
    const bb = q('bloodbtn'); if (bb) { const show = bloodReady(h) && !!h.fight && !FURY_ANIM[h.id] && h.fight.mons.some(m => m.hp > 0); if (bb.hidden === show) bb.hidden = !show; }
    if (h.cls === 'zobal') { // masque porté, aura de Ferveur, Rupture
      const fu = card.querySelector('[data-k="fighter"]'), fsp = fu && fu.querySelector('.sprite'), mk = zobMask(h), n = h.fight ? Math.min(ZOB_FERV_MAX, h.fight.ferv || 1) : 0;
      if (fu) { if (fu.dataset.mask !== mk) { const had = fu.dataset.mask; fu.dataset.mask = mk; if (had) ecaState(fu, 'zob-swap', 700); } fu.classList.toggle('zob-apo', n >= ZOB_FERV_MAX); }
      if (fsp) fsp.style.setProperty('--fv', (n / ZOB_FERV_MAX).toFixed(2));
      card.querySelectorAll('.zmask').forEach(b => { const on = b.dataset.mask === mk; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      const rp = h.fight ? h.fight.ruptSeq || 0 : 0; if (scene && +(scene.dataset.rp || 0) < rp) { sceneFx(scene, 'rupt', 'RUPTURE !', '🎭'); zobShards(card); } if (scene) scene.dataset.rp = rp;
      const fv = q('ferv'); if (fv) { const tx = fervHtml(h); if (fv.textContent !== tx) fv.textContent = tx; fv.classList.toggle('full', n >= ZOB_FERV_MAX); }
    }
    if (h.cls === 'sacrieur') { // les runes-cicatrices s'allument avec les Stigmates ; au maximum : BERSERK
      const fu = card.querySelector('[data-k="fighter"]'), fsp = fu && fu.querySelector('.sprite'), n = h.fight ? Math.min(SAC_STIG_MAX, h.fight.stig || 0) : 0, v = (n / SAC_STIG_MAX).toFixed(2);
      if (fsp && fsp.style.getPropertyValue('--st') !== v) { fsp.style.setProperty('--st', v); fsp.querySelectorAll('.p-rune').forEach((el, i) => el.classList.toggle('lit', i < n)); }
      const rage = !!h.fight && n >= SAC_STIG_MAX && !(h.hp <= 0);
      if (fu) { fu.classList.toggle('sac-rage', rage); if (rage && !SAC_RAGE[h.id]) sacBerserk(card, fu); SAC_RAGE[h.id] = rage; }
    }
    const sg = q('stig'); if (sg) { const tx = stigHtml(h); if (sg.textContent !== tx) sg.textContent = tx; sg.classList.toggle('full', !!(h.fight && h.fight.stig >= SAC_STIG_MAX)); }
    const gr = q('grains'); if (gr) { const tx = grainsHtml(h); if (gr.textContent !== tx) gr.textContent = tx; gr.classList.toggle('full', !!(h.fight && h.fight.grains >= 12)); }
    const tn = q('turn'); if (tn) tn.textContent = h.fight ? `Tour ${h.fight.turn}` : '';
    const r = q('rates'); if (r) { const html = fightRates(h); if (r.innerHTML !== html) r.innerHTML = html; }
    if (h.act && h.act.type === 'harvest') {
      const c = findPlace('harvest', h.act.id); const job = st.jobs[c.job]; const p = clamp(1 - h.wait / harvestMs(st, h), 0, 1);
      setBar(q('hprog'), p, 1);
      const cr = q('crops'); if (cr) cr.style.setProperty('--g', p.toFixed(2));
      const sk = q('stock'); if (sk) { const [qa, qb] = cropQty(st, c); const tx = `${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}`; if (sk.textContent !== tx) sk.textContent = tx; }
      const jx = q('jxt'); if (jx) jx.textContent = `${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}`;
      setBar(q('jxb'), job.xp, jobXpToNext(job.lvl));
    }
  }
  updateArchiBtn();
}

/* ---------------------------- Recrutement ---------------------------- */
function renderRecruit(first) {
  if (st.heroes.length >= RECRUIT_COST.length) return '<div class="empty">Ton groupe est complet.</div>';
  if (!ui.recruitName) ui.recruitName = HERO_NAMES[irnd(0, HERO_NAMES.length - 1)];
  const cost = RECRUIT_COST[st.heroes.length]; const c = CLASSES[ui.recruitCls];
  return `<section class="panel recruit">
    <div><h2 class="display big-title">${first ? 'Bienvenue dans le Monde des Douze' : 'Recruter un héros'}</h2>
      <p class="sub" style="margin:4px 0 0">${first ? 'Choisis la classe de ton premier héros. Il combattra seul dans les zones que tu choisis, tant que le jeu est ouvert.' : `Héros ${st.heroes.length + 1} sur ${RECRUIT_COST.length}. Chaque héros a sa propre activité et son propre équipement.`}</p></div>
    <div class="cls-grid">${Object.entries(CLASSES).map(([id, k]) => `<button class="cls-card" data-act="rcls" data-cls="${id}" aria-pressed="${ui.recruitCls === id}" style="--c:${k.color}">${emblem(id, 'big')}<b>${k.name}</b><small>${k.role}</small><span class="cls-elem">Élément ${STAT_ELEM[k.elem] || '—'}</span></button>`).join('')}</div>
    <div class="recruit-detail" style="--c:${c.color}">
      ${emblem(ui.recruitCls, 'xl')}
      <div class="rd-main"><h3 class="display">${c.name} <small>${c.role}</small></h3><p>${c.desc}</p>
        ${passiveHtml(c)}
        <div class="rd-spells">${c.spells.map(sp => `<span class="chip">${sp.name} <small>niv. ${sp.lvl}</small></span>`).join('')}</div>
      </div>
    </div>
    <div class="recruit-foot"><label class="label" for="rname">Nom</label>
      <input id="rname" type="text" maxlength="18" value="${esc(ui.recruitName)}" data-input="rname">
      <button class="btn sm ghost" data-act="rrandom">Au hasard</button><span class="grow"></span>
      ${first && !acc.token ? '<button class="btn ghost" data-act="goaccount">J’ai déjà un compte</button>' : ''}
      ${!first ? '<button class="btn ghost" data-act="recruitclose">Annuler</button>' : ''}
      <button class="btn gold lg" data-act="recruit" ${st.kamas < cost ? 'disabled' : ''}>${cost ? `Recruter · ${fmt(cost)} kamas` : 'Commencer l’aventure'}</button>
    </div>
  </section>`;
}

/* ---------------------------- Vue : Héros ---------------------------- */
function heroTabs(h) {
  const more = st.heroes.length < RECRUIT_COST.length;
  return `<div class="hero-tabs">${st.heroes.map(x => `<button class="htab" data-act="selhero" data-hero="${x.id}" aria-pressed="${!ui.recruitOpen && x.id === h.id}" style="--c:${CLASSES[x.cls].color}">${emblem(x.cls, true)}<span><b>${esc(x.name)}</b><small>${CLASSES[x.cls].name} · niv. ${x.lvl}</small></span>${x.capital ? `<i class="dot-badge" title="Points à répartir">${x.capital}</i>` : ''}</button>`).join('')}
    ${more ? `<button class="htab add" data-act="recruitopen" aria-pressed="${ui.recruitOpen}"><span class="plus">＋</span><span><b>Recruter</b><small>${fmt(RECRUIT_COST[st.heroes.length])} kamas</small></span></button>` : ''}</div>`;
}
function renderHeros() {
  const h = selHero(); if (!h) return renderRecruit(true);
  if (ui.recruitOpen) return heroTabs(h) + renderRecruit(false);
  const tab = ['combat', 'recolte', 'relique'].includes(ui.eqTab) ? ui.eqTab : 'combat';
  const seg = `<div class="seg">${[['combat', 'Équipement'], ['recolte', 'Récolte'], ['relique', 'Relique']].map(([v, l]) => `<button data-act="eqtab" data-v="${v}" aria-pressed="${tab === v}">${l}</button>`).join('')}</div>`;
  return `${heroTabs(h)}<div class="hero-grid">
    <section class="panel">${seg}${tab === 'recolte' ? harvestGear(h) : tab === 'relique' ? relicPanel(h) : combatGear(h)}</section>
    <section class="panel">${statsPanel(h)}</section></div>`;
}
function slotTile(h, slot) {
  const g = h.equip[slot] && gearById(st, h.equip[slot]); const sel = ui.slot === slot;
  const ic = SLOT_ICON[slot.startsWith('anneau') ? 'anneau' : slot];
  return `<button class="slot-t ${g ? qClass(g) : 'empty'}${sel ? ' sel' : ''}" data-act="pickslot" data-slot="${slot}" aria-pressed="${sel}" title="${g ? esc(ITEMS[g.id].name) : SLOT_LABEL[slot] + ' : vide'}">${g ? itemIcon(g.id) : `<span class="ph">${ic}</span>`}<span class="st-l">${SLOT_LABEL[slot]}</span></button>`;
}
/* Valeur globale d'un objet pour trier ses exemplaires (somme des stats, stasifié en tête) */
function gearScore(g) { if (!g) return 0; return Object.entries(g.stats).reduce((s, [k, v]) => s + v * (k === 'vit' ? .5 : k === 'sag' ? .6 : ['res', 'crit', 'dodge'].includes(k) ? 3 : k === 'pp' ? .8 : 1), 0) + (g.stasis ? 1e6 : 0); }
function compareTarget(h, g) {
  const sl = slotsFor(ITEMS[g.id].slot);
  const slot = ui.slot && sl.includes(ui.slot) ? ui.slot : sl.find(s => !h.equip[s]) || sl[0];
  return h.equip[slot] && gearById(st, h.equip[slot]);
}
function statDiff(g, cur) {
  const keys = [...new Set([...Object.keys(g.stats), ...Object.keys(cur ? cur.stats : {})])];
  return keys.map(k => { const v = g.stats[k] || 0; const d = v - ((cur && cur.stats[k]) || 0);
    return `<span class="sd" style="--c:${STAT_COLOR[k] || 'var(--fg)'}">${v > 0 ? '+' : ''}${v} ${STAT_SHORT[k]}${cur && cur.uid !== g.uid && d ? `<i class="${d > 0 ? 'up' : 'down'}">${d > 0 ? '▲' : '▼'}${Math.abs(d)}</i>` : ''}</span>`; }).join('');
}
function setBlock(setId, h) {
  const n = h ? (setCounts(st, h)[setId] || 0) : 0;
  return `<div class="set-block"><b>${SETS[setId].name}</b>${h ? ` <small>${n} pièce${n > 1 ? 's' : ''} équipée${n > 1 ? 's' : ''}</small>` : ''}
    <div class="set-tiers">${Object.entries(SETS[setId].bonus).map(([k, b]) => `<span class="${h && n >= +k ? 'on' : ''}">${k} pièces : ${Object.entries(b).map(([s, v]) => `+${v} ${STAT_SHORT[s]}`).join(', ')}</span>`).join('')}</div></div>`;
}
function combatGear(h) {
  if (!SLOTS.includes(ui.slot)) ui.slot = null;
  const t = heroTotals(st, h); const hp = displayHp(st, h); const c = CLASSES[h.cls];
  const rel = h.relic && gearById(st, h.relic);
  const doll = `<div class="doll" style="--hc:${c.color}">
    <div class="doll-col">${['coiffe', 'cape', 'amulette', 'ceinture'].map(s => slotTile(h, s)).join('')}</div>
    <div class="doll-mid">
      <div class="portrait">${emblem(h.cls, 'xl')}</div>
      <b class="display">${esc(h.name)}</b><small>${c.name} · <span class="lvl">Niv. ${h.lvl}</span></small>
      <div class="mini-bars"><div>${bar('hp', hp, t.maxHp)}<small class="num">${fmt(hp)} / ${fmt(t.maxHp)} PV</small></div>
        <div>${bar('xp thin', h.xp, xpToNext(h.lvl))}<small class="num">${h.lvl >= MAX_LEVEL ? 'Niveau max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))} XP`}</small></div></div>
      <button class="relic-mini${rel ? ' on' : ''}" data-act="eqtab" data-v="relique" title="Relique">${rel ? itemIcon(rel.id) : '<span class="ph">🔮</span>'}<small>${rel ? esc(ITEMS[rel.id].name) : 'Aucune relique'}</small></button>
      <div class="activity">${h.act ? `<span><span class="tag">${actLabel(h)}</span> <b>${esc(placeName(h.act))}</b></span>` : '<span class="sub">Inactif</span>'}
        <div class="row-btns">${h.act ? `<button class="btn sm ghost" data-act="stop" data-hero="${h.id}">Arrêter</button>` : ''}<button class="btn sm" data-act="gomap" data-hero="${h.id}">Carte</button></div></div>
    </div>
    <div class="doll-col">${['anneau1', 'anneau2', 'bottes', 'arme'].map(s => slotTile(h, s)).join('')}</div>
  </div>`;
  const sets = Object.keys(setCounts(st, h)).map(id => setBlock(id, h)).join('');
  const curG = ui.slot && h.equip[ui.slot] && gearById(st, h.equip[ui.slot]);
  let detail = '';
  if (curG) {
    const d = ITEMS[curG.id];
    detail = ui.detailHidden
      ? `<button class="detail-bar ${qClass(curG)}" data-act="toggledetail"><span>${itemIcon(curG.id)} ${esc(d.name)}</span><span class="sub">Afficher les stats ▾</span></button>`
      : `<div class="slot-detail ${qClass(curG)}">
        <div class="sdh"><div class="tile md ${qClass(curG)}">${itemIcon(curG.id)}</div><div class="sdh-t"><b class="display">${esc(d.name)}</b><small>Niveau ${d.lvl} · ${SLOT_LABEL[ui.slot]}</small>${qualityTag(curG)}</div>
          <div class="sdh-btns"><button class="btn sm ghost" data-act="toggledetail">Réduire ▴</button><button class="btn sm danger" data-act="unequip" data-slot="${ui.slot}">Retirer</button></div></div>
        <div class="insp-stats">${Object.entries(curG.stats).map(([k, v]) => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--fg)'}"><span>+${v} ${STAT_LABEL[k]}</span><small>${d.stats[k][0]}–${d.stats[k][1]}</small></div>`).join('')}</div>
        ${d.set ? setBlock(d.set, h) : ''}</div>`;
  }
  const typeOf = s => (s && s.startsWith('anneau') ? 'anneau' : s);
  const free = st.gear.filter(g => !ITEMS[g.id].harvest && !ITEMS[g.id].relic).filter(g => { const by = equippedBy(st, g.uid); return !(by && by.id === h.id); });
  let body;
  if (!ui.slot) {
    // Vue d'ensemble : un bouton par type d'objet, avec le nombre et le meilleur gain possible
    const types = ['coiffe', 'cape', 'amulette', 'anneau', 'ceinture', 'bottes', 'arme'];
    body = `<div class="type-grid">${types.map(ty => {
      const items = free.filter(g => ITEMS[g.id].slot === ty); const slot = ty === 'anneau' ? 'anneau1' : ty;
      const up = items.some(g => h.lvl >= ITEMS[g.id].lvl && gearScore(g) > gearScore(compareTarget(h, g)));
      return `<button class="type-btn${items.length ? '' : ' none'}" data-act="pickslot" data-slot="${slot}" ${items.length ? '' : 'disabled'}><span class="tb-ic">${SLOT_ICON[ty]}</span><span class="tb-t"><b>${SLOT_LABEL[slot]}${ty === 'anneau' ? 'x' : 's'}</b><small>${items.length ? `${items.length} objet${items.length > 1 ? 's' : ''}` : 'aucun'}</small></span>${up ? '<i class="tb-up" title="Un objet meilleur que celui porté est disponible">▲</i>' : ''}</button>`;
    }).join('')}</div>`;
  } else {
    // Objets du type choisi, regroupés par modèle : le meilleur jet en avant, les autres repliés
    const pool = free.filter(g => ITEMS[g.id].slot === typeOf(ui.slot));
    const groups = {};
    for (const g of pool) (groups[g.id] = groups[g.id] || []).push(g);
    const list = Object.values(groups).map(gs => gs.sort((a, b) => gearScore(b) - gearScore(a)))
      .sort((A, B) => (h.lvl >= ITEMS[B[0].id].lvl) - (h.lvl >= ITEMS[A[0].id].lvl) || ITEMS[B[0].id].lvl - ITEMS[A[0].id].lvl);
    ui.openGroups = ui.openGroups || {};
    const row = (g, small) => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = h.lvl >= d.lvl;
      return `<div class="bag-r ${qClass(g)}${small ? ' sub-r' : ''}"><div class="tile sm ${qClass(g)}">${itemIcon(g.id)}</div>
        <div class="br-main"><div class="br-top">${small ? '' : `<b>${esc(d.name)}</b><small class="sub">niv. ${d.lvl}</small>`}${qualityTag(g)}${by ? `<small class="eqby">porté par ${esc(by.name)}</small>` : ''}</div>
        <div class="sd-list">${statDiff(g, compareTarget(h, g))}</div></div>
        <button class="btn sm gold" data-act="equip" data-uid="${g.uid}" data-slot="${ui.slot}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Niv. ${d.lvl}`}</button></div>`; };
    body = list.length ? `<div class="bag-list">${list.map(gs => {
      const id = gs[0].id, more = gs.length - 1, open = !!ui.openGroups[id];
      const extra = gs.slice(1).filter(g => !equippedBy(st, g.uid) && !g.stasis);
      return `<div class="bag-group">${row(gs[0])}
        ${more ? `<div class="bg-tools"><button class="link" data-act="togglegroup" data-id="${id}">${open ? '▴ Masquer' : `▾ ${more} autre${more > 1 ? 's' : ''} exemplaire${more > 1 ? 's' : ''}`}</button>
          ${extra.length ? (ui.sellDup === id ? `<button class="btn sm danger" data-act="selldup" data-id="${id}">Confirmer · +${fmt(extra.reduce((s, g) => s + itemValue(g), 0))} K</button><button class="btn sm ghost" data-act="selldupcancel">Annuler</button>`
            : `<button class="btn sm ghost" data-act="selldupask" data-id="${id}">Vendre les ${extra.length} moins bons</button>`) : ''}</div>` : ''}
        ${open ? `<div class="bg-more">${gs.slice(1).map(g => row(g, true)).join('')}</div>` : ''}</div>`;
    }).join('')}</div>` : `<div class="empty sm">Aucun objet de type ${SLOT_LABEL[ui.slot].toLowerCase()} dans le sac. <button class="btn sm" data-act="view" data-v="ateliers">Aller aux Ateliers</button></div>`;
  }
  const bestBtn = `<div class="best-row"><button class="btn gold best-btn" data-act="bestequip" title="Équipe automatiquement, pour chaque emplacement, l'objet qui rend ${esc(h.name)} le plus puissant">⚡ Meilleur équipement</button></div>`;
  return `${doll}${bestBtn}${detail}${sets ? `<div class="sets">${sets}</div>` : ''}
    <div class="list-h"><span class="label">${ui.slot ? `Sac · ${SLOT_LABEL[ui.slot]}` : 'Sac · choisis un type d’objet'}</span>
      ${ui.slot ? '<button class="btn sm ghost" data-act="pickslot" data-slot="">◂ Tous les types</button>' : '<span class="hint">▲ = un objet meilleur que celui porté</span>'}</div>
    ${body}`;
}
function statsPanel(h) {
  const t = heroTotals(st, h); const c = CLASSES[h.cls];
  const rows = STATS.map(s => { const bonus = t[s] - h.base[s]; const off = h.capital < STAT_COST[s] ? 'disabled' : '';
    return `<div class="srow"><span class="dot" style="--c:${STAT_COLOR[s]}"></span><span class="sname">${STAT_LABEL[s]}<small>${STAT_HINT[s]}</small>${STAT_COST[s] > 1 ? `<small>${STAT_COST[s]} pts</small>` : ''}</span>
      <span class="sval num"><b>${t[s]}</b>${bonus ? `<small>${h.base[s]} + ${bonus} équip.</small>` : ''}</span>
      <span class="sbtns"><button class="btn sm" data-act="alloc" data-stat="${s}" data-n="1" ${off} aria-label="+1 ${STAT_LABEL[s]}">+1</button><button class="btn sm" data-act="alloc" data-stat="${s}" data-n="10" ${off} aria-label="+10 ${STAT_LABEL[s]}">+10</button></span></div>`; }).join('');
  const cs = [['Points de vie', fmt(t.maxHp)], ['PA', t.pa], ['Dégâts', '+' + t.deg + ' %'], ['Critique', t.critPct.toFixed(1).replace('.', ',') + ' %'], ['Esquive', t.dodgePct.toFixed(1).replace('.', ',') + ' %'],
    ['Résistance', t.resPct + ' %'], ['Prospection', t.ppTotal], ['Bonus XP', '+' + t.xpBonus + ' %'], ...(t.kamas ? [['Bonus kamas', '+' + t.kamas + ' %']] : []), ...(t.dmgPct ? [['Dégâts finaux', '+' + t.dmgPct + ' %']] : []), ...(t.speed ? [['Vitesse combat', '+' + t.speed + ' %']] : []), ...(t.regen ? [['Régén. / tour', t.regen + ' %']] : [])];
  const spells = spellsOf(h).map(sp => {
    const p = sp.type === 'buff' ? null : spellPower(h, t, null, sp);
    const eff = sp.type === 'buff' ? Object.entries(sp.buff).map(([k, v]) => `+${v} ${STAT_LABEL[k]}`).join(', ') + ` pendant ${sp.turns} tours`
      : `${sp.type === 'heal' ? 'Soigne' : 'Inflige'} ~${fmt(p.avg)}${sp.type === 'aoe' ? ' à tous les ennemis' : sp.type === 'poison' ? ` par tour pendant ${sp.turns} tours` : sp.type === 'drain' ? ' et vole la moitié en PV' : ''}`;
    const lim = [sp.freeze ? `+${sp.freeze} % de chance de figer` : '', sp.grains ? `+${sp.grains} grains` : '', sp.cd ? `recharge ${sp.cd} t` : '', sp.max_ ? `${sp.max_}×/tour` : ''].filter(Boolean).join(' · ');
    const locked = h.lvl < sp.lvl;
    return `<div class="spell${locked ? ' locked' : ''}"><span class="pa" title="Points d'action">${sp.pa}</span>
      <div><b>${sp.name}</b>${sp.stat && STAT_ELEM[sp.stat] ? ` <span class="elem" style="--c:${STAT_COLOR[sp.stat]}">${STAT_ELEM[sp.stat]}</span>` : ''}<div class="desc">${eff}${lim ? ' · ' + lim : ''}</div></div>
      <span class="sub">${locked ? `🔒 niv. ${sp.lvl}` : ''}</span></div>`;
  }).join('');
  return `<div class="panel-h"><h3 class="display">Caractéristiques</h3>${h.capital ? `<span class="cap">${h.capital} points à répartir</span>` : '<span class="sub">Aucun point à répartir</span>'}</div>
    <div class="stat-tools"><label class="sub" for="auto">Répartition auto</label>
      <select id="auto" data-change="auto">${['', ...STATS].map(s => `<option value="${s}" ${h.auto === s || (!h.auto && !s) ? 'selected' : ''}>${s ? STAT_LABEL[s] : 'Manuelle'}</option>`).join('')}</select>
      <button class="btn sm ghost" data-act="resetstats">Réinitialiser</button></div>
    <div class="stat-rows">${rows}</div>
    <p class="hint">Chaque niveau donne ${CAPITAL_PER_LEVEL} points. En mode auto, ils sont placés dans la caractéristique choisie.</p>
    <div class="cstats">${cs.map(([l, v]) => `<div class="cs"><small>${l}</small><b class="num">${v}</b></div>`).join('')}</div>
    ${passiveHtml(c)}
    ${h.food ? `<div class="food-on"><span class="fo-ic">${RESOURCES[h.food.id].icon}</span><div><b>${RESOURCES[h.food.id].name}</b><small>${RESOURCES[h.food.id].food.desc} · encore ${mmss(h.food.left)}</small></div></div>`
      : Object.keys(st.res).some(id => RESOURCES[id].food && st.res[id] > 0) ? `<div class="food-off"><span class="sub">Aucun repas actif.</span>${Object.keys(st.res).filter(id => RESOURCES[id].food && st.res[id] > 0).map(id => `<button class="btn sm gold" data-act="eat" data-id="${id}" data-hero="${h.id}">${RESOURCES[id].icon} Manger ${RESOURCES[id].name} (${st.res[id]})</button>`).join('')}</div>` : ''}
    <div class="panel-h"><h3 class="display">Sorts</h3><span class="sub">${spellsOf(h).filter(sp => h.lvl >= sp.lvl).length}/${spellsOf(h).length} appris</span></div>
    <div class="spells">${spells}</div>`;
}
function harvestGear(h) {
  h.hequip = h.hequip || {};
  const ht = harvestTotals(st, h); const pl = st.jobs.paysan.lvl;
  if (!HARVEST_SLOTS.includes(ui.hslot)) ui.hslot = null;
  const slots = HARVEST_SLOTS.map(s => { const g = h.hequip[s] && gearById(st, h.hequip[s]); const sel = ui.hslot === s;
    return `<div class="hslot"><button class="slot-t ${g ? qClass(g) : 'empty'}${sel ? ' sel' : ''}" data-act="hslot" data-slot="${s}" aria-pressed="${sel}">${g ? itemIcon(g.id) : `<span class="ph">${SLOT_ICON[s]}</span>`}<span class="st-l">${HARVEST_SLOT_LABEL[s]}</span></button>
      <small>${g ? esc(ITEMS[g.id].name) : 'Vide'}</small></div>`; }).join('');
  const cur = ui.hslot && h.hequip[ui.hslot] && gearById(st, h.hequip[ui.hslot]);
  const pool = st.gear.filter(g => ITEMS[g.id].harvest && (!ui.hslot || ITEMS[g.id].slot === ui.hslot)).filter(g => { const by = equippedBy(st, g.uid); return !(by && by.id === h.id); })
    .sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  return `<div class="hslots">${slots}</div>
    <div class="cstats"><div class="cs"><small>XP de récolte</small><b>+${ht.rxp} %</b></div><div class="cs"><small>Quantité +1</small><b>${ht.rqty} %</b></div><div class="cs"><small>Vitesse</small><b>+${ht.rspd} %</b></div><div class="cs"><small>Temps / récolte</small><b>${(harvestMs(st, h) / 1000).toFixed(1).replace('.', ',')} s</b></div></div>
    <div class="list-h"><span class="label">${ui.hslot ? HARVEST_SLOT_LABEL[ui.hslot] + ' disponibles' : 'Outils de récolte du sac'}</span>
      ${cur ? `<button class="btn sm danger" data-act="hunequip" data-slot="${ui.hslot}">Retirer ${esc(ITEMS[cur.id].name)}</button>` : ''}</div>
    ${pool.length ? `<div class="bag-list">${pool.map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = pl >= d.lvl;
      return `<div class="bag-r ${qClass(g)}"><div class="tile sm ${qClass(g)}">${itemIcon(g.id)}</div>
        <div class="br-main"><div class="br-top"><b>${esc(d.name)}</b><small class="sub">Paysan ${d.lvl}</small>${qualityTag(g)}${by ? `<small class="eqby">porté par ${esc(by.name)}</small>` : ''}</div>
        <div class="sd-list">${Object.entries(g.stats).map(([k, v]) => `<span class="sd" style="--c:${STAT_COLOR[k]}">+${v} ${STAT_LABEL[k]}</span>`).join('')}</div></div>
        <button class="btn sm gold" data-act="equip" data-uid="${g.uid}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Paysan ${d.lvl}`}</button></div>`; }).join('')}</div>`
    : `<div class="empty sm">Aucun outil de récolte. Le Forgeron fabrique les faux, le Tailleur les gants et les sacs, à partir de céréales. <button class="btn sm" data-act="view" data-v="ateliers">Aller aux Ateliers</button></div>`}`;
}
function relicSources(id) { return Object.entries(RELIC_DROPS).filter(([, l]) => l.some(([r]) => r === id)).map(([m, l]) => `${monIcon(m)} ${MONSTERS[m].name} (${pct(l.find(([r]) => r === id)[1])})`).join(', '); }
function relicPanel(h) {
  const cur = h.relic && gearById(st, h.relic);
  const owned = st.gear.filter(g => ITEMS[g.id].relic && g.uid !== h.relic).sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl);
  const ownedIds = new Set(st.gear.filter(g => ITEMS[g.id].relic).map(g => g.id));
  return `<p class="hint">Une seule relique par héros. Elles ne se fabriquent pas : elles tombent très rarement de certains monstres et boss.</p>
    <div class="relic-slot${cur ? ' filled' : ''}">${cur ? `<div class="relic-art">${itemIcon(cur.id)}</div><div class="rs-main"><b class="display">${esc(ITEMS[cur.id].name)}</b>
      <div class="insp-stats">${Object.entries(cur.stats).map(([k, v]) => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--relic)'}"><span>+${v} ${STAT_LABEL[k]}</span></div>`).join('')}</div>
      <div><button class="btn sm danger" data-act="unrelic">Retirer</button></div></div>` : `<div class="relic-art empty">🔮</div><div class="rs-main"><b>Aucune relique équipée</b><span class="sub">Équipe-en une depuis la liste ci-dessous.</span></div>`}</div>
    ${owned.length ? `<div class="list-h"><span class="label">Reliques du sac</span></div><div class="bag-list">${owned.map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = h.lvl >= d.lvl;
      return `<div class="bag-r q-relic"><div class="tile sm q-relic">${itemIcon(g.id)}</div><div class="br-main"><div class="br-top"><b>${esc(d.name)}</b><small class="sub">niv. ${d.lvl}</small>${by ? `<small class="eqby">portée par ${esc(by.name)}</small>` : ''}</div>
        <div class="sd-list">${Object.entries(g.stats).map(([k, v]) => `<span class="sd" style="--c:${STAT_COLOR[k] || 'var(--relic)'}">+${v} ${STAT_SHORT[k]}</span>`).join('')}</div></div>
        <button class="btn sm gold" data-act="equip" data-uid="${g.uid}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Niv. ${d.lvl}`}</button></div>`; }).join('')}</div>` : ''}
    <div class="list-h"><span class="label">Codex des reliques · ${ownedIds.size}/${Object.keys(ITEMS).filter(id => ITEMS[id].relic).length}</span></div>
    <div class="relic-codex">${Object.keys(ITEMS).filter(id => ITEMS[id].relic).map(id => { const d = ITEMS[id]; const has = ownedIds.has(id);
      return `<div class="relic-entry${has ? ' has' : ''}"><div class="relic-mini-ic">${itemIcon(id)}</div><div class="re-main"><b>${has ? esc(d.name) : '???'}</b> <small class="sub">niv. ${d.lvl}</small>
        <div class="sub">${Object.entries(d.stats).map(([k, [a, b]]) => `${a}–${b} ${STAT_SHORT[k]}`).join(' · ')}</div><div class="re-src">${relicSources(id)}</div></div></div>`; }).join('')}</div>`;
}

/* ---------------------------- Vue : Carte ---------------------------- */
function defaultPlace() {
  const h = selHero();
  if (h && h.act && h.act.type !== 'harvest') return { type: h.act.type, id: h.act.id };
  const lv = h ? h.lvl : 1;
  const z = [...ZONES].reverse().find(x => lv >= x.lvl[0]) || ZONES[0];
  return { type: 'zone', id: z.id };
}
function placeMons(p, type) { return type === 'dungeon' ? [...new Set([...p.rooms.flat(), ...p.boss])] : p.monsters; }
function renderCarte() {
  if (!ui.place || !findPlace(ui.place.type, ui.place.id)) ui.place = defaultPlace();
  const row = (p, type) => {
    const here = st.heroes.filter(h => h.act && h.act.type === type && h.act.id === p.id);
    const sel = ui.place.type === type && ui.place.id === p.id;
    const mons = placeMons(p, type);
    const icon = monIcon(type === 'dungeon' ? p.boss[0] : mons[0]);
    return `<button class="mrow${sel ? ' sel' : ''}${type === 'dungeon' ? ' dj' : ''}" data-act="place" data-type="${type}" data-id="${p.id}" style="${themeStyle(THEME[p.region] || THEME.idle)}">
      <span class="mr-art" aria-hidden="true">${icon}</span><span class="mr-main"><b>${p.name}</b><small>${type === 'dungeon' ? 'Donjon · ' : ''}${p.region} · niv. ${p.lvl[0]}–${p.lvl[1]}</small></span>
      ${here.length ? `<span class="mr-here">${here.map(h => emblem(h.cls, true)).join('')}</span>` : ''}</button>`;
  };
  return `<div class="map-layout">
    <aside class="map-list"><div class="ml-h">Zones</div>${ZONES.map(z => row(z, 'zone')).join('')}<div class="ml-h">Donjons</div>${DUNGEONS.map(d => row(d, 'dungeon')).join('')}</aside>
    <section class="panel map-detail">${placeDetail(findPlace(ui.place.type, ui.place.id), ui.place.type)}</section></div>`;
}
function placeDetail(p, type) {
  const mons = placeMons(p, type);
  const keyN = type === 'dungeon' ? (st.res[p.key] || 0) : 0;
  const tier = type === 'zone' ? ((ui.zoneTier || {})[p.id] || 0) : 0; const T = SUBZONES[tier];
  const best = st.heroes.reduce((m, h) => Math.max(m, heroTotals(st, h).ppTotal), 100);
  const rows = (type === 'zone' && ARCHIS[p.id] ? [...mons, ARCHIS[p.id]] : mons).map(mid => {
    const d = MONSTERS[mid]; const ar = !!d.archi, src = d.base || mid, ab = ar ? 3 : 1; const gd = GEAR_DROPS[src] || []; const ms = monsterStats(mid);
    const gr = gd.length ? (d.boss || ar ? GEAR_DROP_RATE_BOSS : GEAR_DROP_RATE) * T.drop / gd.length : 0;
    const key = p.id + ':' + mid; const mo = !!(ui.openMons || {})[key];
    const rl = (RELIC_DROPS[src] || []).map(([r, c]) => [r, c * T.drop * (ar ? 20 : 1)]);
    const detail = mo ? `<tr class="dr-detail"><td colspan="5"><div class="dr-items">
      ${d.drops.map(([r, c]) => `<div class="dr-item"><span class="dr-ii">${RESOURCES[r].icon}</span><div><b>${RESOURCES[r].name}</b><div class="sub">Ressource · ${RESOURCES[r].value} K pièce</div></div><b class="dr-pc">${pct(Math.min(1, c * ab))}</b></div>`).join('')}
      ${rl.map(([r, c]) => `<div class="dr-item relic"><span class="dr-ii">${itemIcon(r)}</span><div><b>${ITEMS[r].name}</b> <span class="sub">Relique · niv. ${ITEMS[r].lvl}</span>
        <div class="sub">${Object.entries(ITEMS[r].stats).map(([k, [a, b2]]) => `${a}–${b2} ${STAT_SHORT[k]}`).join(' · ')}</div></div><b class="dr-pc relic">${pct(c)}</b></div>`).join('')}
      ${gd.map(i => { const it = ITEMS[i]; return `<div class="dr-item gear"><span class="dr-ii">${itemIcon(i)}</span><div><b>${it.name}</b> <span class="sub">niv. ${it.lvl}</span>
        <div class="sub">${Object.entries(it.stats).map(([k, [a, b2]]) => `<span style="color:${STAT_COLOR[k]}">${a}–${b2} ${STAT_SHORT[k]}</span>`).join(' · ')}</div>
        <div class="sub dr-stasis-line">Stasifié : ${Object.entries(it.stats).map(([k, [, b2]]) => `${b2 * 2} ${STAT_SHORT[k]}`).join(' · ')}</div></div>
        <div class="dr-pcs"><b class="dr-pc gold">${pct(gr)}</b><b class="dr-pc stasis">${pct(STASIS_RATE * T.drop)}</b></div></div>`; }).join('')}
    </div></td></tr>` : '';
    return `<tr class="dr-row${mo ? ' open' : ''}${ar ? ' archi-row' : ''}" data-act="togglemon" data-k="${key}" tabindex="0" title="Voir les objets">
      <td><div class="dr-mon"><span class="chev" aria-hidden="true">▸</span><span class="dr-ico" aria-hidden="true">${monIcon(mid)}</span><div><b>${ar ? '👑 ' : ''}${d.name}</b> <span class="sub">${d.lvl}${d.boss ? ' · Boss' : ''}${ar ? ' · Archimonstre' : ''}</span>
        <div class="dr-meta">${fmt(ms.hp * T.hp)} PV · ${fmt(ms.dmin * T.dmg)}–${fmt(ms.dmax * T.dmg)} dégâts</div>${ar ? `<div class="dr-archi">👹 ${pct(ARCHI_RATE)} d’apparition après chaque combat de zone</div>` : ''}</div></div></td>
      <td><div class="dr-chips">${d.drops.map(([r, c]) => `<span title="${RESOURCES[r].name}">${RESOURCES[r].icon}<b>${pct(Math.min(1, c * ab))}</b></span>`).join('')}</div></td>
      <td>${gd.length ? `<div class="dr-chips"><span class="dr-gold" title="${gd.map(i => ITEMS[i].name).join(', ')}">${gd.map(i => itemIcon(i)).join('')}<b>${pct(gr)}</b></span></div>` : '<span class="dim">—</span>'}</td>
      <td>${gd.length ? `<span class="dr-stasis">${pct(STASIS_RATE * T.drop)}</span>` : '<span class="dim">—</span>'}</td>
      <td>${rl.length ? rl.map(([r, c]) => `<span class="dr-relic" title="${ITEMS[r].name}">${itemIcon(r)}<b>${pct(c)}</b></span>`).join('') : '<span class="dim">—</span>'}</td>
    </tr>${detail}`;
  }).join('');
  const sends = st.heroes.length ? st.heroes.map(h => {
    const there = h.act && h.act.type === type && h.act.id === p.id && (type !== 'zone' || (h.act.tier || 0) === tier);
    const low = h.lvl < p.lvl[0] - 3;
    const label = there ? 'Est ici' : low ? `Niveau conseillé ${p.lvl[0]}` : h.act ? `Quitte ${placeName(h.act)}` : 'Disponible';
    return heroChip(h, `data-act="send" data-hero="${h.id}" data-type="${type}" data-id="${p.id}" data-t="${tier}" ${there || (type === 'dungeon' && !keyN) ? 'disabled' : ''}`, esc(label), (there ? 'here' : '') + (low ? ' low' : ''));
  }).join('') : '<span class="sub">Recrute un héros d’abord.</span>';
  return `<div class="place-banner" style="${themeStyle(THEME[p.region] || THEME.idle)}">
      <div class="pb-txt"><span class="label">${type === 'dungeon' ? 'Donjon · ' : ''}${p.region}</span><h2>${type === 'zone' ? `${p.name} ${tier + 1}` : p.name}</h2><p>${p.text}</p></div>
      <div class="pb-side"><span class="lvl-badge">Niv. ${p.lvl[0]}–${p.lvl[1]}</span><div class="pb-mons" aria-hidden="true">${mons.slice(0, 4).map(m => `<span>${monIcon(m)}</span>`).join('')}</div></div>
    </div>
    ${type === 'zone' ? `<div class="tiers">${SUBZONES.map((s, i) => { const n = st.heroes.filter(h => h.act && h.act.type === 'zone' && h.act.id === p.id && (h.act.tier || 0) === i).length;
      return `<button data-act="ztier" data-id="${p.id}" data-t="${i}" aria-pressed="${i === tier}"><b>${p.name} ${i + 1}</b><span>${i ? `PV ×${s.hp} · Dégâts ×${String(s.dmg).replace('.', ',')} · Équip. ×${s.drop}` : 'Difficulté normale'}</span>${n ? `<i>${n} héros</i>` : ''}</button>`; }).join('')}</div>`
      : `<div class="keybox"><span>${RESOURCES[p.key].icon} ${RESOURCES[p.key].name}</span><b style="color:${keyN ? 'var(--win)' : 'var(--hp)'}">${keyN} en stock</b><span class="sub">· 3 salles puis le boss · XP ×${p.bonusXp} · une clef par entrée</span>${keyN ? '' : '<button class="btn sm" data-act="gocraftkey">Fabriquer des clefs</button>'}</div>`}
    <div><div class="label" style="margin-bottom:6px">Envoyer un héros</div><div class="send-list">${sends}</div></div>
    <div class="drop-wrap"><table class="drop-table"><thead><tr><th>Monstre</th><th>Ressources</th><th>Équipement</th><th>Stasifié</th><th>Relique</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="hint">Taux par monstre vaincu pour 100 de prospection (ta meilleure : ${best}, soit ×${(best / 100).toFixed(2).replace('.', ',')}). Équipement et stasifié : taux par objet. <span style="color:var(--relic)">En jaune</span> : reliques. Clique sur un monstre pour le détail.</p>`;
}

/* ---------------------------- Vue : Inventaire ---------------------------- */
const INV_FILTERS = [['all', 'Tout'], ['gear', 'Équipements'], ['res', 'Ressources'], ['harvest', 'Outils de récolte'], ['relic', 'Reliques']];
const gearKind = g => (ITEMS[g.id].relic ? 'relic' : ITEMS[g.id].harvest ? 'harvest' : 'gear');
function gearTile(g) {
  const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const sel = ui.sel && ui.sel.k === 'gear' && ui.sel.uid === g.uid;
  return `<button class="tile ${qClass(g)}${sel ? ' sel' : ''}${by ? ' worn' : ''}"${by ? ` style="--c:${CLASSES[by.cls].color}"` : ''} data-act="pick" data-kind="gear" data-uid="${g.uid}" title="${esc(d.name)}${by ? ' · porté par ' + esc(by.name) : ''}">${itemIcon(g.id)}<span class="t-lv">${d.lvl}</span>${by ? `<span class="t-by" aria-label="Porté par ${esc(by.name)}">${emblem(by.cls, true)}<b>${esc(by.name.slice(0, 1).toUpperCase())}</b></span>` : ''}</button>`;
}
function resTile(id) {
  const r = RESOURCES[id]; const sel = ui.sel && ui.sel.k === 'res' && ui.sel.id === id;
  return `<button class="tile res${r.rare || r.key ? ' q-high' : ''}${sel ? ' sel' : ''}" data-act="pick" data-kind="res" data-id="${id}" title="${esc(r.name)} ×${fmt(st.res[id])}"><span class="t-emo">${r.icon}</span><span class="t-n num">${short(st.res[id])}</span></button>`;
}
function renderInventaire() {
  const f = INV_FILTERS.some(x => x[0] === ui.invFilter) ? ui.invFilter : 'all';
  const resIds = Object.keys(st.res).filter(id => st.res[id] > 0).sort((a, b) => RESOURCES[b].value - RESOURCES[a].value);
  const gs = [...st.gear].sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  const counts = { all: resIds.length + gs.length, res: resIds.length, gear: 0, harvest: 0, relic: 0 };
  for (const g of gs) counts[gearKind(g)]++;
  const tiles = [];
  if (f !== 'res') for (const g of gs) if (f === 'all' || gearKind(g) === f) tiles.push(gearTile(g));
  if (f === 'all' || f === 'res') for (const id of resIds) tiles.push(resTile(id));
  const total = resIds.reduce((s, id) => s + st.res[id] * RESOURCES[id].value, 0);
  return `<div class="inv-layout"><section class="panel">
    <div class="chips-row">${INV_FILTERS.map(([v, l]) => `<button class="fchip" data-act="invf" data-v="${v}" aria-pressed="${f === v}">${l}<small>${counts[v]}</small></button>`).join('')}</div>
    <div class="inv-tools"><span class="sub">Valeur des ressources au marchand : ${kamasHtml(total)}</span><button class="btn sm" data-act="sellallres" ${resIds.length ? '' : 'disabled'}>Vendre les ressources communes</button></div>
    ${tiles.length ? `<div class="tiles">${tiles.join('')}</div>` : `<div class="empty">Rien ici pour l’instant. Les ressources tombent des monstres, les équipements se fabriquent dans les Ateliers.</div>`}
    <p class="hint">Bordure grise, blanche ou dorée : qualité du jet. Violet : stasifié. Jaune : relique. Le badge en haut à droite (classe + initiale) et le liseré de couleur indiquent quel héros porte l’objet ; sans badge, il est libre.</p>
  </section><aside class="panel inspector">${inspector()}</aside></div>`;
}
function inspector() {
  const s = ui.sel;
  if (s && s.k === 'gear') { const g = gearById(st, s.uid); if (g) return gearInspector(g); }
  if (s && s.k === 'res' && st.res[s.id] > 0) return resInspector(s.id);
  return `<div class="insp-empty">${ICONS.inventaire}<b>Sélectionne un objet</b><p class="sub">Clique sur une case pour voir ses détails, l’équiper sur un héros ou le vendre.</p></div>`;
}
function gearInspector(g) {
  const d = ITEMS[g.id]; const by = equippedBy(st, g.uid);
  const type = d.relic ? 'Relique' : d.harvest ? `Outil de récolte · ${HARVEST_SLOT_LABEL[d.slot]}` : SLOT_LABEL[d.slot === 'anneau' ? 'anneau1' : d.slot];
  const req = d.harvest ? `Paysan ${d.lvl}` : `Niveau ${d.lvl}`;
  const canFor = h => (d.harvest ? st.jobs.paysan.lvl >= d.lvl : h.lvl >= d.lvl);
  return `<div class="insp-head"><div class="tile lg ${qClass(g)}">${itemIcon(g.id)}</div><div class="ih-t"><b class="display">${esc(d.name)}</b><small>${type} · ${req}</small>${qualityTag(g)}</div></div>
    <div class="insp-stats">${Object.entries(g.stats).map(([k, v]) => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--fg)'}"><span>+${v} ${STAT_LABEL[k]}</span><small>${d.stats[k][0]}–${d.stats[k][1]}</small></div>`).join('')}</div>
    ${d.set ? setBlock(d.set, by) : ''}
    ${by ? `<div class="eqby-line">${emblem(by.cls, true)}<span>Porté par <b>${esc(by.name)}</b></span><button class="btn sm ghost" data-act="unequipuid" data-uid="${g.uid}">Retirer</button></div>` : ''}
    ${st.heroes.length ? `<div class="label">Équiper sur</div><div class="send-list">${st.heroes.map(h => { const on = by && by.id === h.id; const ok = canFor(h);
      return heroChip(h, `data-act="equipon" data-uid="${g.uid}" data-hero="${h.id}" ${on || !ok ? 'disabled' : ''}`, on ? 'Le porte déjà' : ok ? 'Équiper' : `${req} requis`, (on ? 'here' : '') + ' sm'); }).join('')}</div>` : ''}
    <div class="insp-sell">${by ? '<span class="sub">Retire l’objet pour pouvoir le vendre.</span>' : ui.sellUid === g.uid
      ? `<button class="btn danger" data-act="sellgear" data-uid="${g.uid}">Confirmer la vente · ${fmt(itemValue(g))} K</button><button class="btn ghost" data-act="sellcancel">Annuler</button>`
      : `<button class="btn ghost" data-act="sellask" data-uid="${g.uid}">Vendre · ${fmt(itemValue(g))} kamas</button>`}</div>`;
}
function resInspector(id) {
  const r = RESOURCES[id]; const n = st.res[id];
  const uses = RECIPES.filter(rc => rc.ing[id]).map(rc => { const o = RESOURCES[rc.out] || ITEMS[rc.out];
    return `<button class="use" data-act="gorecipe" data-job="${rc.job}" data-h="${ITEMS[rc.out] && ITEMS[rc.out].harvest ? 1 : 0}">${RESOURCES[rc.out] ? o.icon : itemIcon(rc.out)}<span>${o.name}</span><small>${JOBS[rc.job].name} ${rc.lvl} · ×${rc.ing[id]}</small></button>`; });
  const from = Object.entries(MONSTERS).filter(([, m]) => !m.archi && m.drops.some(([x]) => x === id)).map(([mid, m]) => `<span class="use">${monIcon(mid)}<span>${m.name}</span><small>${pct(Math.min(1, m.drops.find(([x]) => x === id)[1]))}</small></span>`);
  const crop = CROPS.find(c => c.id === id);
  return `<div class="insp-head"><div class="tile lg res"><span class="t-emo">${r.icon}</span></div><div class="ih-t"><b class="display">${r.name}</b><small>${r.key ? 'Clef de donjon' : r.food ? 'Consommable' : r.crop ? 'Céréale' : r.rare ? 'Ressource rare' : 'Ressource'}</small><span class="qty num">×${fmt(n)}</span></div></div>
    <div class="cstats two"><div class="cs"><small>Prix unitaire</small><b>${r.value} K</b></div><div class="cs"><small>Valeur du stock</small><b class="num">${fmt(r.value * n)} K</b></div></div>
    ${r.food ? `<div class="food-desc">${r.icon} ${r.food.desc}. Manger un nouveau repas remplace l’effet en cours.</div>
      <div class="label">Faire manger à</div><div class="send-list">${st.heroes.map(h => heroChip(h, `data-act="eat" data-id="${id}" data-hero="${h.id}"`, h.food ? `En cours · ${mmss(h.food.left)}` : 'Manger', 'sm')).join('')}</div>` : ''}
    <div class="insp-sell"><button class="btn sm" data-act="sellres" data-id="${id}" data-n="1">Vendre 1</button><button class="btn sm" data-act="sellres" data-id="${id}" data-n="10" ${n < 10 ? 'disabled' : ''}>Vendre 10</button><button class="btn sm danger" data-act="sellres" data-id="${id}" data-n="all">Tout vendre</button></div>
    ${uses.length ? `<div class="label">Utilisé dans</div><div class="uses">${uses.join('')}</div>` : ''}
    ${from.length || crop ? `<div class="label">Où l’obtenir</div><div class="uses">${crop ? `<span class="use">${crop.icon}<span>Récolte</span><small>${GATHER_JOBS[crop.job].name} ${crop.lvl}</small></span>` : ''}${from.join('')}</div>` : ''}`;
}

/* ---------------------------- Vue : Récolte ---------------------------- */
function renderRecolte() {
  const jid = GATHER_JOBS[ui.gjob] ? ui.gjob : Object.keys(GATHER_JOBS)[0];
  const jobs = Object.entries(GATHER_JOBS).map(([id, j]) => { const s = st.jobs[id]; const n = st.heroes.filter(h => h.act && h.act.type === 'harvest' && findPlace('harvest', h.act.id).job === id).length;
    return `<button class="jrow" data-act="gjob" data-v="${id}" aria-pressed="${jid === id}"><span class="jr-top"><b>${j.icon} ${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span><small>${j.makes}${n ? ` · ${n} au travail` : ''}</small>${bar('job thin', s.xp, jobXpToNext(s.lvl))}</button>`; }).join('');
  const job = st.jobs[jid];
  const rows = CROPS.filter(c => c.job === jid).map(c => {
    const locked = job.lvl < c.lvl; const [qa, qb] = cropQty(st, c);
    const sends = locked ? `<span class="lockt">🔒 ${GATHER_JOBS[c.job].name} niveau ${c.lvl}</span>` : st.heroes.length ? st.heroes.map(h => { const there = h.act && h.act.type === 'harvest' && h.act.id === c.id;
      return heroChip(h, `data-act="send" data-hero="${h.id}" data-type="harvest" data-id="${c.id}" ${there ? 'disabled' : ''}`, there ? 'Récolte ici' : h.act ? `Quitte ${esc(placeName(h.act))}` : 'Disponible', (there ? 'here' : '') + ' sm'); }).join('') : '<span class="sub">Recrute un héros d’abord.</span>';
    return `<article class="crow${locked ? ' locked' : ''}"><div class="tile res"><span class="t-emo">${c.icon}</span><span class="t-n num">${short(st.res[c.id] || 0)}</span></div>
      <div class="cr-main"><b>${c.name}</b><span class="badge-lv">Niv. ${c.lvl}</span><small class="sub">${c.where} · +${c.xp} XP · ${locked ? 'verrouillé' : `${qa === qb ? qa : `${qa}–${qb}`} par récolte`} · ${c.value} K pièce</small></div>
      <div class="cr-send">${sends}</div></article>`;
  }).join('');
  return `<div class="split"><aside class="joblist">${jobs}</aside><section class="panel">
    <div class="panel-h"><h3 class="display">${GATHER_JOBS[jid].icon} ${GATHER_JOBS[jid].name} <span class="lvl">Niv. ${job.lvl}</span></h3><span class="sub num">${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))} XP</span></div>
    ${bar('xp', job.xp, jobXpToNext(job.lvl))}
    <p class="hint">${GATHER_JOBS[jid].text} Une récolte toutes les ${HARVEST_MS / 1000} s, plus vite avec des outils (onglet Héros › Récolte). La quantité augmente de 1 tous les 10 niveaux au-dessus du palier.</p>
    <div class="crop-rows">${rows}</div></section></div>`;
}

/* ---------------------------- Vue : Ateliers ---------------------------- */
function renderAteliers() {
  if (!JOBS[ui.job]) ui.job = 'tailleur';
  const isH = r => !!(ITEMS[r.out] && ITEMS[r.out].harvest);
  const jobs = Object.entries(JOBS).map(([id, j]) => { const s = st.jobs[id]; const ready = RECIPES.filter(r => r.job === id && canCraft(st, r)).length;
    return `<button class="jrow" data-act="job" data-v="${id}" aria-pressed="${ui.job === id}"><span class="jr-top"><b>${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span><small>${j.makes}</small>${bar('job thin', s.xp, jobXpToNext(s.lvl))}${ready ? `<i class="ready-n" title="Recettes fabricables">${ready}</i>` : ''}</button>`; }).join('');
  const js = st.jobs[ui.job];
  const nH = RECIPES.filter(r => r.job === ui.job && isH(r)).length, nC = RECIPES.filter(r => r.job === ui.job && !isH(r)).length;
  if (ui.rtab === 'recolte' && !nH) ui.rtab = 'combat';
  let list = RECIPES.map((r, i) => [r, i]).filter(([r]) => r.job === ui.job && (ui.rtab === 'recolte' ? isH(r) : !isH(r)));
  if (ui.onlyCraft) list = list.filter(([r]) => canCraft(st, r));
  const rows = list.map(([r, i]) => {
    const locked = js.lvl < r.lvl; const max = maxCraftable(st, r);
    const isRes = !!RESOURCES[r.out]; const d = isRes ? RESOURCES[r.out] : ITEMS[r.out];
    const meta = isRes ? `${d.food ? `Consommable · ${d.food.desc}` : 'Clef de donjon'} · en stock : ${st.res[r.out] || 0}` : d.harvest ? `Outil de récolte · ${HARVEST_SLOT_LABEL[d.slot]} · Paysan ${d.lvl}` : `${SLOT_LABEL[d.slot === 'anneau' ? 'anneau1' : d.slot]} · niveau ${d.lvl}${d.set ? ' · ' + SETS[d.set].name : ''}`;
    return `<article class="rrow${locked ? ' locked' : ''}${max > 0 && !locked ? ' ready' : ''}">
      <div class="tile${isRes ? ' res' : ''}">${isRes ? `<span class="t-emo">${d.icon}</span>` : itemIcon(r.out)}</div>
      <div class="rr-main"><b>${esc(d.name)}</b><small class="sub">${meta}</small>${isRes ? '' : `<div class="rr-stats">${Object.entries(d.stats).map(([k, [a, b]]) => `<span style="--c:${STAT_COLOR[k]}">${a === b ? a : `${a}–${b}`} ${STAT_SHORT[k]}</span>`).join('')}</div>`}</div>
      <div class="rr-ing">${Object.entries(r.ing).map(([id, n]) => { const have = st.res[id] || 0; return `<span class="ing ${have >= n ? 'ok' : 'no'}" title="${RESOURCES[id].name}">${RESOURCES[id].icon}<span class="ing-n">${RESOURCES[id].name}</span><b class="num">${fmt(have)}</b>/${n}</span>`; }).join('')}</div>
      <div class="rr-act">${locked ? `<span class="lockt">🔒 ${JOBS[r.job].name} ${r.lvl}</span>` : `<button class="btn sm gold" data-act="craft" data-i="${i}" data-n="1" ${max < 1 ? 'disabled' : ''}>Fabriquer</button>
        <button class="btn sm" data-act="craft" data-i="${i}" data-n="10" ${max < 2 ? 'disabled' : ''}>×${Math.min(10, Math.max(max, 2))}</button>`}
        ${!locked && max > 0 ? `<small class="sub">${max} possible${max > 1 ? 's' : ''}</small>` : ''}</div>
    </article>`;
  }).join('');
  return `<div class="split"><aside class="joblist">${jobs}</aside><section class="panel">
    <div class="panel-h"><h3 class="display">${JOBS[ui.job].name} <span class="lvl">Niv. ${js.lvl}</span></h3><span class="sub num">${fmt(js.xp)} / ${fmt(jobXpToNext(js.lvl))} XP</span></div>
    ${bar('job', js.xp, jobXpToNext(js.lvl))}
    <div class="tools-row"><div class="seg"><button data-act="rtab" data-v="combat" aria-pressed="${ui.rtab !== 'recolte'}">Équipements de combat · ${nC}</button><button data-act="rtab" data-v="recolte" aria-pressed="${ui.rtab === 'recolte'}" ${nH ? '' : 'disabled'}>Métiers de récolte · ${nH}</button></div>
      <button class="toggle" data-act="onlycraft" aria-pressed="${!!ui.onlyCraft}"><span class="tg" aria-hidden="true"></span>Seulement fabricables</button></div>
    <div class="recipes">${rows || `<div class="empty sm">${ui.onlyCraft ? 'Aucune recette fabricable avec ton stock actuel.' : 'Aucune recette ici pour ce métier.'}</div>`}</div>
    <p class="hint">Chaque objet reçoit un jet aléatoire dans sa fourchette. Le métier gagne de l’expérience à chaque fabrication.</p></section></div>`;
}

/* ---------------------------- Vue : Options ---------------------------- */
function renderOptions() {
  const s = st.stats;
  return `<div class="opt-grid">
    ${accountCard()}
    <section class="panel"><h3 class="display">Format d’affichage</h3>
      <p class="sub" style="margin:0">Choisis comment le jeu s’affiche sur cet appareil.</p>
      <div class="skin-pick three">${[['auto', 'Automatique', 'S’adapte à la taille de l’écran'], ['mobile', 'Téléphone', 'Une colonne, navigation en bas'], ['pc', 'PC', 'Barre latérale, plusieurs colonnes']].map(([v, l, d]) => `<button class="skin${LAYOUT === v ? ' on' : ''}" data-act="layout" data-v="${v}" ${LAYOUT === v ? 'disabled' : ''}><b>${l}</b><small>${d}</small></button>`).join('')}</div></section>
    <section class="panel"><h3 class="display">Statistiques</h3>
      <div class="cstats">${[['Combats gagnés', fmt(s.fights)], ['Défaites', fmt(s.deaths)], ['Monstres vaincus', fmt(s.totalKills)], ['Objets fabriqués', fmt(s.crafted)], ['Kamas gagnés', fmt(s.kamasEarned)], ['Récoltés', fmt(s.harvested || 0)], ['Partie commencée', new Date(st.created).toLocaleDateString('fr-FR')]].map(([l, v]) => `<div class="cs"><small>${l}</small><b class="num">${v}</b></div>`).join('')}</div></section>
    <section class="panel"><h3 class="display">Exporter</h3><p class="sub" style="margin:0">La partie est sauvegardée automatiquement dans ce navigateur. Copie ce texte pour la garder ailleurs ou changer d’appareil.</p>
      <textarea id="exportbox" readonly>${exportSave(st)}</textarea>
      <div class="row-btns left"><button class="btn" data-act="copyexport">Copier</button><span class="sub" id="copymsg"></span></div></section>
    <section class="panel"><h3 class="display">Importer</h3>
      <textarea id="importbox" placeholder="Colle ici une sauvegarde exportée"></textarea>
      <div class="row-btns left"><button class="btn gold" data-act="import">Charger cette sauvegarde</button><span class="sub">${esc(ui.importMsg)}</span></div></section>
    <section class="panel"><h3 class="display">Recommencer</h3><p class="sub" style="margin:0">Efface définitivement la partie de ce navigateur.</p>
      <div class="row-btns left">${ui.resetStep ? '<button class="btn danger" data-act="reset">Oui, tout effacer</button><button class="btn ghost" data-act="resetcancel">Annuler</button>' : '<button class="btn danger" data-act="resetask">Effacer la partie</button>'}</div></section>
  </div>`;
}

/* ---------------------------- Rendu principal ---------------------------- */
const RENDER = { combat: renderCombat, heros: renderHeros, carte: renderCarte, inventaire: renderInventaire, recolte: renderRecolte, ateliers: renderAteliers, options: renderOptions };
function canRebuild() {
  if (pointerDown || Date.now() - lastScroll < 800) return false;
  const a = document.activeElement;
  return !(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && $('#main').contains(a));
}
function renderMain(force) {
  if (!force && !canRebuild()) return;
  // Les listes défilantes gardent leur position quand la vue est redessinée
  const keep = ['.map-list', '.joblist', '.drop-wrap', '.chips-row'].map(s => { const el = $(s); return el ? [s, el.scrollLeft, el.scrollTop] : null; }).filter(Boolean);
  // La page garde sa hauteur et sa position pendant le redessin : sans ça, le défilement saute quand le contenu change de taille
  const main = $('#main'), sy = window.scrollY, mh = main.offsetHeight; main.style.minHeight = mh + 'px';
  main.innerHTML = (RENDER[ui.view] || renderCombat)();
  try { window.scrollTo(0, sy); } catch (e) {}
  requestAnimationFrame(() => { main.style.minHeight = ''; try { if (Math.abs(window.scrollY - sy) > 2 && document.documentElement.scrollHeight > sy) window.scrollTo(0, sy); } catch (e) {} });
  for (const [s, l, t] of keep) { const el = $(s); if (el) { el.scrollLeft = l; el.scrollTop = t; } }
  if (ui.view === 'combat') { ui.lastSig = combatSig(); ui.lastHs = Object.fromEntries(st.heroes.map(h => [h.id, heroSig(h)])); updateArchiBtn(); }
}
let lastSlow = 0;
function render(force) {
  updateChrome();
  const now = Date.now();
  if (force) { renderMain(true); lastSlow = now; return; }
  if (ui.view === 'combat' && st.heroes.length) {
    if (combatSig() !== ui.lastSig && !Object.keys(FURY_ANIM).length) { if (!redrawCards()) renderMain(); patchCombat(); } else patchCombat();
  } else if (now - lastSlow > 1500 && ui.view !== 'options') {
    renderMain(); lastSlow = now;
  }
}
function scrollTop() { try { window.scrollTo(0, 0); } catch (e) {} }

/* ---------------------------- Actions ---------------------------- */
const ACTIONS = {
  view(d) { ui.view = d.v; ui.resetStep = 0; ui.sellUid = null; ui.recruitOpen = false; scrollTop(); },
  gohero(d) { ui.view = 'heros'; ui.hero = d.hero; ui.recruitOpen = false; scrollTop(); },
  gomap(d) { ui.view = 'carte'; if (d.hero) ui.hero = d.hero; ui.place = null; scrollTop(); },
  recruitnav() { ui.view = 'heros'; ui.recruitOpen = true; scrollTop(); },
  recruitopen() { ui.recruitOpen = true; },
  recruitclose() { ui.recruitOpen = false; },
  place(d) { ui.place = { type: d.type, id: d.id }; },
  gocraftkey() { ui.view = 'ateliers'; ui.job = 'bricoleur'; ui.rtab = 'combat'; scrollTop(); },
  gorecipe(d) { ui.view = 'ateliers'; ui.job = d.job; ui.rtab = d.h === '1' ? 'recolte' : 'combat'; scrollTop(); },
  send(d) { const h = heroById(d.hero); setActivity(st, h, d.type, d.id, +d.t || 0); toast(`${h.name} part pour ${placeName(h.act)}.`); },
  stop(d) { const h = heroById(d.hero); setActivity(st, h, null); },
  cramark(d) {
    const h = heroById(d.hero); if (!h) return 'keep';
    if (setPrey(h, +d.i)) { toast(`${h.name} traque ${MONSTERS[h.fight.mons[+d.i].mid].name} (Concentration remise à 0).`, 'info'); saveGame(); const cu = document.querySelector(`[data-hero-card="${h.id}"] [data-k="fighter"]`); ecaState(cu, 'cra-mark', 720); }
    patchCombat(); return 'keep';
  },
  archifight() {
    const a = st.archi; if (!a) return;
    if (st.heroes.some(x => x.nextArchi || (x.fight && x.fight.archi))) return;
    const inZone = x => x.act && x.act.type === 'zone' && x.act.id === a.zone;
    const h = [heroById(a.hero), ...st.heroes].find(x => x && inZone(x));
    if (!h) { const z = findPlace('zone', a.zone); toast(`Envoie un héros dans ${z ? z.name : 'la zone de l’archimonstre'} pour le combattre.`, 'warn'); return; }
    h.nextArchi = a.mid; toast(`${h.name} affrontera ${MONSTERS[a.mid].name} dès son prochain combat !`, 'quest'); saveGame();
  },
  iopfury(d) {
    const h = heroById(d.hero); if (!h || !furyReady(h) || !h.fight || FURY_ANIM[h.id]) return 'keep';
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) return 'keep';
    FURY_ANIM[h.id] = true; FURY_FREEZE++;
    const btn = card.querySelector('[data-k="furybtn"]'); if (btn) btn.hidden = true;
    playColere(card, h, () => {
      const hits = unleashFury(st, h, liveEv);
      patchCombat(); saveGame();
      return hits;
    });
    setTimeout(() => { delete FURY_ANIM[h.id]; FURY_FREEZE = Math.max(0, FURY_FREEZE - 1); h.wait = Math.max(h.wait, 600); }, 3300);
    return 'keep';
  },
  zmask(d) { const h = heroById(d.hero); if (h && setMask(h, d.mask)) { patchCombat(); saveGame(); } return 'keep'; },
  sacolosse(d) {
    const h = heroById(d.hero); if (!h || !bloodReady(h) || !h.fight || FURY_ANIM[h.id]) return 'keep';
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) return 'keep';
    FURY_ANIM[h.id] = true; FURY_FREEZE++;
    const btn = card.querySelector('[data-k="bloodbtn"]'); if (btn) btn.hidden = true;
    PF_HOLD[h.id] = {}; card.querySelectorAll('.unit.mon').forEach(el => { PF_HOLD[h.id][+el.dataset.mon] = +el.dataset.hp; }); // les PV des ennemis ne bougent qu'à l'impact
    playColosse(card, h, {
      pay: () => { const r = unleashColosse(st, h, liveEv); patchCombat(); return r; },
      impact: () => { delete PF_HOLD[h.id]; card.querySelectorAll('.unit.mon').forEach(el => { const m = h.fight && h.fight.mons[+el.dataset.mon]; if (m) el.dataset.hp = m.hp; }); patchCombat(); },
      heal: () => { const r = colosseHeal(st, h); patchCombat(); return r; },
      done: () => { colosseHeal(st, h); delete PF_HOLD[h.id]; delete FURY_ANIM[h.id]; FURY_FREEZE = Math.max(0, FURY_FREEZE - 1); h.wait = Math.max(h.wait, 700); patchCombat(); saveGame(); },
    });
    return 'keep';
  },
  xelchrono(d) {
    const h = heroById(d.hero); if (!h || h.cls !== 'xelor' || FURY_ANIM[h.id]) return 'keep';
    if ((h.chrono || 0) < CHRONO_MAX) { toast(`Le sablier se remplit à chaque Rembobinage (${h.chrono || 0}/${CHRONO_MAX}).`, 'warn'); return 'keep'; }
    if (!chronoReady(h)) { toast('Envoie le Xélor dans une zone pour libérer l’Éclat du temps.', 'warn'); return 'keep'; }
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) return 'keep';
    FURY_ANIM[h.id] = true; FURY_FREEZE++;
    const sum = chronoBurst(st, h, liveEv); saveGame();
    playChrono(card, h, sum, () => { delete FURY_ANIM[h.id]; FURY_FREEZE = Math.max(0, FURY_FREEZE - 1); h.wait = Math.max(h.wait, 600); patchCombat(); saveGame(); });
    return 'keep';
  },
  selhero(d) { ui.hero = d.hero; ui.recruitOpen = false; },
  alloc(d) { allocate(selHero(), d.stat, +d.n); },
  resetstats() { resetStats(st, selHero()); selHero().auto = ''; },
  equip(d) { const err = equip(st, selHero(), d.uid, d.slot || null); if (err) toast(err, 'warn'); },
  equipon(d) { const h = heroById(d.hero); const err = equip(st, h, d.uid, null); if (err) toast(err, 'warn'); else toast(`${ITEMS[gearById(st, d.uid).id].name} équipé sur ${h.name}.`); },
  bestequip() { const h = selHero(), n = bestEquip(st, h); toast(n ? `${n} pièce${n > 1 ? 's' : ''} d’équipement changée${n > 1 ? 's' : ''} sur ${h.name}.` : `${h.name} porte déjà le meilleur équipement disponible.`, n ? undefined : 'info'); saveGame(); },
  unequip(d) { unequipSlot(st, selHero(), d.slot); },
  unequipuid(d) { const by = equippedBy(st, d.uid); if (by) unequipUid(by, d.uid); },
  toggledetail() { ui.detailHidden = !ui.detailHidden; },
  unrelic() { selHero().relic = null; },
  eqtab(d) { ui.eqTab = d.v; },
  hslot(d) { ui.hslot = ui.hslot === d.slot ? null : d.slot; },
  hunequip(d) { const h = selHero(); if (h.hequip) delete h.hequip[d.slot]; },
  pickslot(d) { ui.slot = d.slot && ui.slot !== d.slot ? d.slot : null; },
  togglegroup(d) { ui.openGroups = ui.openGroups || {}; ui.openGroups[d.id] = !ui.openGroups[d.id]; },
  selldupask(d) { ui.sellDup = d.id; },
  selldupcancel() { ui.sellDup = null; },
  selldup(d) {
    const h = selHero(); const gs = st.gear.filter(g => g.id === d.id && !(equippedBy(st, g.uid))).sort((a, b) => gearScore(b) - gearScore(a));
    const keep = st.gear.filter(g => g.id === d.id).sort((a, b) => gearScore(b) - gearScore(a))[0];
    let k = 0, n = 0; for (const g of gs) if (g !== keep && !g.stasis) { k += sellGear(st, g.uid); n++; }
    ui.sellDup = null; if (n) toast(`${n} exemplaire${n > 1 ? 's' : ''} vendu${n > 1 ? 's' : ''} pour ${fmt(k)} kamas. Le meilleur est gardé.`);
  },
  togglemon(d) { ui.openMons = ui.openMons || {}; ui.openMons[d.k] = !ui.openMons[d.k]; },
  ztier(d) { ui.zoneTier = ui.zoneTier || {}; ui.zoneTier[d.id] = +d.t; },
  pick(d) {
    ui.sel = d.kind === 'gear' ? { k: 'gear', uid: d.uid } : { k: 'res', id: d.id }; ui.sellUid = null;
    if (innerWidth < 1000) setTimeout(() => { const el = $('.inspector'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 30);
  },
  invf(d) { ui.invFilter = d.v; },
  sellres(d) { const k = sellRes(st, d.id, d.n === 'all' ? Infinity : +d.n); if (k) toast(`+${fmt(k)} kamas`); },
  sellallres() { let k = 0; for (const id of Object.keys(st.res)) if (!RESOURCES[id].rare && !RESOURCES[id].key) k += sellRes(st, id, Infinity); if (k) toast(`Vendu pour ${fmt(k)} kamas`); },
  sellask(d) { ui.sellUid = d.uid; },
  sellcancel() { ui.sellUid = null; },
  sellgear(d) { const k = sellGear(st, d.uid); ui.sellUid = null; if (ui.sel && ui.sel.uid === d.uid) ui.sel = null; if (k) toast(`Vendu pour ${fmt(k)} kamas`); },
  job(d) { ui.job = d.v; },
  rtab(d) { ui.rtab = d.v; },
  onlycraft() { ui.onlyCraft = !ui.onlyCraft; },
  gjob(d) { ui.gjob = d.v; },
  craft(d) {
    const r = RECIPES[+d.i]; const n = Math.min(+d.n, maxCraftable(st, r)); let last, lv = false, xp = 0;
    const made = [];
    for (let i = 0; i < n; i++) { last = craft(st, r); if (!last) break; xp += last.xp; lv = lv || last.lvUp; made.push(last); }
    if (!last) return;
    craftPop(r, made, xp);
    if (lv) toast(`${JOBS[r.job].name} passe niveau ${st.jobs[r.job].lvl} !`, 'lvl');
  },
  eat(d) { const h = heroById(d.hero); const err = eat(st, h, d.id); if (err) toast(err, 'warn'); else toast(`${h.name} mange ${RESOURCES[d.id].name} : ${RESOURCES[d.id].food.desc}.`, 'quest'); },
  closeaway() { const b = $('#modal'); b.hidden = true; b.innerHTML = ''; return 'keep'; },
  layout(d) { applyLayout(d.v); ui._psig = ''; scrollTop(); },
  chatplayers() { if (chat.ok) { chat.showPlayers = !chat.showPlayers; renderChat(); } return 'keep'; },
  chattoggle() {
    chat.open = !chat.open; $('#chat').hidden = !chat.open; document.body.classList.toggle('chat-open', chat.open);
    if (chat.open) { chat.unread = 0; chatFetch(); const l = $('#chatlist'); l.scrollTop = l.scrollHeight; setTimeout(() => (chatName() ? $('#chatmsg') : $('#chatname')).focus(), 30); }
    renderChat(); return 'keep';
  },
  accregister() { accRun('register'); return 'keep'; },
  acclogin() { accRun('login'); return 'keep'; },
  accsave() { acc.msg = ''; accCloudSave().then(() => { if (!acc.err) acc.msg = 'Partie sauvegardée en ligne.'; render(true); }); return 'keep'; },
  acclogout() { const t = { action: 'logout', name: acc.name, token: acc.token }; accCloudSave().finally(() => { accCall(t).catch(() => {}); accLocalLogout(); acc.msg = ''; render(true); toast('Déconnecté. Ta partie reste aussi sur cet appareil.'); }); return 'keep'; },
  accnophoto() { accSetAvatar(null); return 'keep'; },
  goaccount() { ui.view = 'options'; scrollTop(); },
  rcls(d) { ui.recruitCls = d.cls; },
  rrandom() { ui.recruitName = HERO_NAMES[irnd(0, HERO_NAMES.length - 1)]; },
  recruit() {
    const name = (ui.recruitName || '').trim().slice(0, 18) || CLASSES[ui.recruitCls].name;
    const r = recruit(st, name, ui.recruitCls);
    if (typeof r === 'string') { toast(r, 'warn'); return; }
    ui.hero = r.id; ui.recruitName = ''; ui.recruitOpen = false;
    toast(`${r.name} rejoint l'aventure !`, 'quest');
    if (st.heroes.length === 1) { setActivity(st, r, 'zone', 'incarnam'); ui.view = 'combat'; }
    else { ui.view = 'carte'; ui.place = null; }
  },
  copyexport() {
    const ta = $('#exportbox'); const msg = $('#copymsg');
    const fallback = () => { ta.focus(); ta.select(); msg.textContent = 'Sélectionné : copie avec Ctrl+C.'; };
    try { navigator.clipboard.writeText(ta.value).then(() => { msg.textContent = 'Copié.'; }, fallback); } catch (e) { fallback(); }
    return 'keep';
  },
  import() {
    try { st = importSave($('#importbox').value); ui.importMsg = 'Sauvegarde chargée.'; ui.hero = null; ui._psig = ''; saveGame(); toast('Sauvegarde chargée.', 'quest'); }
    catch (e) { ui.importMsg = 'Ce texte n’est pas une sauvegarde valide. Vérifie que tu l’as copié en entier.'; }
  },
  resetask() { ui.resetStep = 1; },
  resetcancel() { ui.resetStep = 0; },
  reset() { st = newState(); ui.resetStep = 0; ui.hero = null; ui.view = 'combat'; ui._psig = ''; saveGame(); toast('Nouvelle partie.'); },
};
document.addEventListener('click', e => {
  ui.click = { x: e.clientX, y: e.clientY };
  const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
  const fn = ACTIONS[el.dataset.act]; if (!fn) return;
  const r = fn(el.dataset);
  if (r !== 'keep') { saveGame(); render(true); }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('tr[data-act], [role="button"][data-act]')) { e.preventDefault(); e.target.click(); }
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.change === 'auto') { const h = selHero(); h.auto = el.value; if (h.auto) autoAllocate(h); el.blur(); saveGame(); render(true); }
});
document.addEventListener('input', e => { if (e.target.dataset.input === 'rname') ui.recruitName = e.target.value; });
document.addEventListener('pointerdown', e => {
  pointerDown = true;
  const t = e.target.closest('.nav-btn[data-act="view"]');
  if (t && e.button === 0 && t.dataset.v !== ui.view) { ACTIONS.view(t.dataset); saveGame(); pointerDown = false; render(true); }
}, true);
document.addEventListener('pointerup', () => setTimeout(() => { pointerDown = false; }, 0), true);
document.addEventListener('pointercancel', () => { pointerDown = false; }, true);

/* ---------------------------- Compte joueur (sauvegarde cloud) ----------------------------
   Fonction serveur /api/account (voir functions/api/account.js). */
const ACC_URL = '/api/account';
const ACC_KEY = 'amakna-account';
const acc = { avatarAt: 0, name: '', token: '', at: 0, busy: false, msg: '', err: '' };
try { Object.assign(acc, JSON.parse(localStorage.getItem(ACC_KEY) || '{}')); } catch (e) {}
function accPersist() { try { localStorage.setItem(ACC_KEY, JSON.stringify({ name: acc.name, token: acc.token, at: acc.at, avatarAt: acc.avatarAt })); } catch (e) {} }
async function accCall(body, keepalive) {
  let r;
  try { r = await fetch(ACC_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), keepalive: !!keepalive }); }
  catch (e) { throw new Error('Connexion impossible. Les comptes fonctionnent sur le site en ligne.'); }
  let d = null; try { d = await r.json(); } catch (e) {}
  if (!d) throw new Error('Les comptes fonctionnent sur le site en ligne (Netlify), pas dans cet aperçu.');
  if (!r.ok) { const er = new Error(d.error || 'Erreur du serveur.'); er.status = r.status; throw er; }
  return d;
}
function accAdopt(saveStr, savedAt) {
  st = migrate(JSON.parse(saveStr)); st.lastTick = Date.now();
  ui.hero = null; ui._psig = ''; ui.sel = null; ui.lastSig = '';
  acc.at = savedAt; accPersist(); saveGame();
}
function accLocalLogout() { acc.name = ''; acc.token = ''; acc.at = 0; acc.avatarAt = 0; accPersist(); }
function avatarHtml(name, av, cls = '') {
  return av ? `<img class="av ${cls}" src="/api/avatar?n=${encodeURIComponent(name)}&v=${av}" alt="" loading="lazy">`
    : `<span class="av letter ${cls}" style="background:${nameColor(name)}" aria-hidden="true">${esc((name || '?').slice(0, 1).toUpperCase())}</span>`;
}
/* Redimensionne la photo choisie en carré 128×128 (JPEG léger) avant l'envoi */
function shrinkImage(file) {
  return new Promise((ok, ko) => {
    const rd = new FileReader();
    rd.onerror = () => ko(new Error('Lecture du fichier impossible.'));
    rd.onload = () => { const img = new Image();
      img.onerror = () => ko(new Error('Ce fichier n’est pas une image lisible.'));
      img.onload = () => { const S = 128, cv = document.createElement('canvas'); cv.width = cv.height = S;
        const k = Math.max(S / img.width, S / img.height), w = img.width * k, h = img.height * k;
        const cx = cv.getContext('2d'); cx.fillStyle = '#1d2218'; cx.fillRect(0, 0, S, S); cx.drawImage(img, (S - w) / 2, (S - h) / 2, w, h);
        ok(cv.toDataURL('image/jpeg', 0.82)); };
      img.src = rd.result; };
    rd.readAsDataURL(file);
  });
}
async function accSetAvatar(file) {
  acc.busy = true; acc.err = ''; acc.msg = ''; render(true);
  try {
    const data = file ? await shrinkImage(file) : '';
    const d = await accCall({ action: 'avatar', name: acc.name, token: acc.token, avatar: data });
    acc.avatarAt = d.avatarAt; accPersist(); acc.msg = file ? 'Photo mise à jour.' : 'Photo retirée.';
    ui._wallet = ''; const l = $('#chatlist'); if (l) l.dataset.h = ''; renderChat();
  } catch (e) { acc.err = e.message; }
  acc.busy = false; render(true);
}
document.addEventListener('change', e => { if (e.target.id === 'accphoto' && e.target.files[0]) accSetAvatar(e.target.files[0]); });
async function accCloudSave(keepalive) {
  if (!acc.token || acc.busy) return;
  try { const d = await accCall({ action: 'save', name: acc.name, token: acc.token, save: serialize(st) }, keepalive); acc.at = d.savedAt; acc.err = ''; accPersist(); }
  catch (e) { acc.err = e.message; if (e.status === 401) { accLocalLogout(); toast('Ta session a expiré : reconnecte-toi dans Options.', 'warn'); } }
}
async function accSync() {
  if (!acc.token) return;
  try {
    const d = await accCall({ action: 'load', name: acc.name, token: acc.token });
    if (typeof d.avatarAt === 'number' && d.avatarAt !== acc.avatarAt) { acc.avatarAt = d.avatarAt; accPersist(); ui._wallet = ''; }
    if (d.save && d.savedAt > acc.at) { accAdopt(d.save, d.savedAt); toast(`Partie de ${acc.name} récupérée depuis ton compte.`, 'quest'); render(true); }
    else accCloudSave();
  } catch (e) { acc.err = e.message; if (e.status === 401) accLocalLogout(); }
}
async function accRun(kind) {
  const name = ($('#accname') || {}).value || ''; const pass = ($('#accpass') || {}).value || '';
  acc.busy = true; acc.msg = ''; acc.err = ''; render(true);
  try {
    if (kind === 'register') {
      const d = await accCall({ action: 'register', name: name.trim(), pass, save: serialize(st) });
      Object.assign(acc, { name: d.name, token: d.token, at: d.savedAt }); accPersist();
      acc.msg = 'Compte créé. Ta partie est sauvegardée en ligne.'; toast(`Compte ${d.name} créé !`, 'quest');
    } else {
      const d = await accCall({ action: 'login', name: name.trim(), pass });
      Object.assign(acc, { name: d.name, token: d.token, avatarAt: d.avatarAt || 0 }); acc.busy = false;
      if (d.save) { accAdopt(d.save, d.savedAt); acc.msg = 'Connecté. Ta partie a été chargée.'; }
      else { acc.at = 0; accPersist(); await accCloudSave(); acc.msg = 'Connecté. Ta partie actuelle est maintenant liée au compte.'; }
      toast(`Bon retour, ${d.name} !`, 'quest');
    }
  } catch (e) { acc.err = e.message; }
  acc.busy = false; render(true);
}
function accountCard() {
  const when = acc.at ? new Date(acc.at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '—';
  if (acc.token) return `<section class="panel acc-card"><h3 class="display">Compte</h3>
    <div class="acc-on">${avatarHtml(acc.name, acc.avatarAt, 'xl')}<div><b>${esc(acc.name)}</b><small>Dernière sauvegarde en ligne : ${when}</small>
      <div class="row-btns left" style="margin-top:6px"><label class="btn sm${acc.busy ? ' is-busy' : ''}" for="accphoto">${acc.avatarAt ? 'Changer la photo' : 'Ajouter une photo'}</label><input id="accphoto" type="file" accept="image/*" hidden ${acc.busy ? 'disabled' : ''}>
      ${acc.avatarAt ? '<button class="btn sm ghost" data-act="accnophoto">Retirer</button>' : ''}</div></div></div>
    <p class="hint">Ta partie est sauvegardée en ligne toutes les minutes et quand tu quittes le jeu. Connecte-toi avec ce pseudo sur un autre appareil pour la retrouver.</p>
    ${acc.err ? `<p class="acc-err">${esc(acc.err)}</p>` : ''}${acc.msg ? `<p class="acc-ok">${esc(acc.msg)}</p>` : ''}
    <div class="row-btns left"><button class="btn gold" data-act="accsave">Sauvegarder maintenant</button><button class="btn ghost" data-act="acclogout">Se déconnecter</button></div></section>`;
  return `<section class="panel acc-card"><h3 class="display">Compte</h3>
    <p class="sub" style="margin:0">Crée un compte pour sauvegarder ta partie en ligne et la retrouver sur n’importe quel appareil.</p>
    <div class="acc-form"><label class="label" for="accname">Pseudo</label><input id="accname" type="text" maxlength="20" autocomplete="username" placeholder="3 à 20 caractères">
      <label class="label" for="accpass">Mot de passe</label><input id="accpass" type="password" autocomplete="current-password" placeholder="4 caractères minimum"></div>
    ${acc.err ? `<p class="acc-err">${esc(acc.err)}</p>` : ''}
    <div class="row-btns left"><button class="btn gold" data-act="acclogin" ${acc.busy ? 'disabled' : ''}>Se connecter</button><button class="btn" data-act="accregister" ${acc.busy ? 'disabled' : ''}>Créer un compte</button></div>
    <p class="hint">Se connecter remplace la partie de cet appareil par celle du compte. Créer un compte enregistre ta partie actuelle.</p></section>`;
}

/* ---------------------------- Chat « Général » ----------------------------
   Messages partagés via la fonction serveur /api/chat (voir functions/api/chat.js).
   Hors du site Netlify (aperçu Claude, fichier local), le chat s'affiche hors ligne. */
const CHAT_URL = '/api/chat';
const CHAT_CID = (() => { try { let c = sessionStorage.getItem('amakna-cid'); if (!c) { c = Math.random().toString(36).slice(2, 12); sessionStorage.setItem('amakna-cid', c); } return c; } catch (e) { return Math.random().toString(36).slice(2, 12); } })();
const chat = { players: [], anonymous: 0, showPlayers: false, online: 0, open: false, msgs: [], last: 0, unread: 0, ok: null, loaded: false, sending: false };
function chatName() { if (acc.name) return acc.name; try { return localStorage.getItem('amakna-pseudo') || ''; } catch (e) { return ''; } }
function setChatName(n) { try { localStorage.setItem('amakna-pseudo', n); } catch (e) {} }
function nameColor(n) { let h = 0; for (const ch of n) h = (h * 31 + ch.charCodeAt(0)) % 360; return `hsl(${h} 70% 70%)`; }
async function chatFetch() {
  try {
    const r = await fetch(`${CHAT_URL}?since=${chat.last}&cid=${CHAT_CID}&n=${encodeURIComponent(chatName())}`, { cache: 'no-store' });
    if (!r.ok || !(r.headers.get('content-type') || '').includes('json')) throw new Error('indisponible');
    const d = await r.json(); chat.ok = true; if (typeof d.online === 'number') chat.online = d.online; if (Array.isArray(d.players)) { chat.players = d.players; chat.anonymous = d.anonymous || 0; }
    const fresh = (d.messages || []).filter(m => m.t > chat.last);
    if (fresh.length) {
      chat.msgs = chat.msgs.concat(fresh).slice(-150);
      chat.last = Math.max(chat.last, ...fresh.map(m => m.t));
      if (chat.loaded && !chat.open) chat.unread += fresh.filter(m => m.n !== chatName()).length;
    }
    chat.loaded = true;
  } catch (e) { chat.ok = false; }
  renderChat();
}
function renderChat() {
  const st = $('#chatst'); if (!st) return;
  st.textContent = chat.ok === null ? 'Connexion…' : chat.ok ? `En ligne · ${chat.online || 1} joueur${(chat.online || 1) > 1 ? 's' : ''}` : 'Hors ligne';
  st.title = chat.ok ? 'Voir les joueurs connectés' : '';
  st.className = 'chat-st ' + (chat.ok ? 'on' : chat.ok === false ? 'off' : '');
  st.setAttribute('aria-expanded', String(chat.showPlayers && !!chat.ok));
  const pl = $('#chatplayers'); pl.hidden = !(chat.showPlayers && chat.ok);
  if (!pl.hidden) {
    const me = chatName();
    const html = `<div class="cp-h">Joueurs connectés</div>`
      + (chat.players.length ? `<ul>${chat.players.map(n => `<li>${avatarHtml(n, 0, 'sm')}<span>${esc(n)}</span>${n === me ? '<small>toi</small>' : ''}</li>`).join('')}</ul>` : '')
      + (chat.anonymous ? `<p class="cp-anon">+ ${chat.anonymous} joueur${chat.anonymous > 1 ? 's' : ''} sans pseudo</p>` : '')
      + (!chat.players.length && !chat.anonymous ? '<p class="cp-anon">Personne pour l’instant.</p>' : '');
    if (pl.dataset.h !== html) { pl.innerHTML = html; pl.dataset.h = html; }
  }
  const badge = $('#chatbadge'); const n = chat.unread > 99 ? '99+' : String(chat.unread);
  badge.hidden = !chat.unread; if (badge.textContent !== n) { badge.textContent = n; badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop'); }
  $('.chat-fab').classList.toggle('has-new', !!chat.unread);
  $('.chat-fab').setAttribute('aria-label', chat.unread ? `Ouvrir le chat Général, ${n} nouveau${chat.unread > 1 ? 'x' : ''} message${chat.unread > 1 ? 's' : ''}` : 'Ouvrir le chat Général');
  document.title = chat.unread ? `(${n}) Amakna Idle` : 'Amakna Idle';
  const nb = $('#chatnamebox'); nb.hidden = !!chatName();
  const list = $('#chatlist');
  const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40;
  const me = chatName();
  const html = chat.ok === false
    ? '<div class="chat-empty">Le chat fonctionne sur le site en ligne (Netlify). Ici, il est hors ligne.</div>'
    : chat.msgs.length ? chat.msgs.map(m => { const d = new Date(m.t);
        return `<div class="msg-row${m.n === me ? ' me' : ''}">${avatarHtml(m.n, m.av)}<div class="msg${m.n === me ? ' me' : ''}"><div class="msg-h"><b style="color:${nameColor(m.n)}">${esc(m.n)}</b><time>${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}</time></div><p>${esc(m.x)}</p></div></div>`; }).join('')
    : '<div class="chat-empty">Aucun message pour l’instant. Dis bonjour !</div>';
  if (list.dataset.h !== html) { list.innerHTML = html; list.dataset.h = html; if (atBottom || !list.dataset.init) { list.scrollTop = list.scrollHeight; list.dataset.init = 1; } }
  const off = chat.ok === false;
  for (const el of document.querySelectorAll('#chatform input, #chatform button')) el.disabled = off || chat.sending;
  const ch = $('.chat-h b'); if (ch && me) ch.title = `Ton pseudo : ${me}`;
}
let chatAt = 0;
function chatLoop() {
  chatFetch(); chatAt = Date.now();
  setInterval(() => { if (Date.now() - chatAt >= (chat.open ? 3000 : 8000)) { chatAt = Date.now(); chatFetch(); } }, 1000);
}
async function chatSend() {
  const msgEl = $('#chatmsg'); const nameEl = $('#chatname');
  const x = msgEl.value.trim(); let n = chatName();
  if (!n) { n = nameEl.value.trim().slice(0, 20); if (!n) { nameEl.focus(); toast('Choisis un pseudo pour parler dans le chat.', 'warn'); return; } setChatName(n); }
  if (!x) return;
  chat.sending = true; renderChat();
  try {
    const h = st.heroes[0];
    const r = await fetch(CHAT_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ n, x, c: h ? h.cls : '', token: acc.name && acc.name.toLowerCase() === n.toLowerCase() ? acc.token : undefined }) });
    if (!r.ok) { const t = await r.text(); throw new Error(r.status === 403 ? t : ''); }
    msgEl.value = '';
    await chatFetch();
  } catch (e) { toast(e.message || 'Message non envoyé. Vérifie ta connexion et réessaie.', 'warn'); if (e.message && !acc.token) { setChatName(''); } }
  chat.sending = false; renderChat(); msgEl.focus();
}
document.addEventListener('submit', e => { if (e.target.id === 'chatform') { e.preventDefault(); chatSend(); } });

/* ---------------------------- Hors-ligne (20 min max) ---------------------------- */
function offline(ms) {
  if (!st.heroes.some(h => h.act)) return;
  const s = simulateOffline(st, ms);
  if (!s.kills && !Object.keys(s.harvest).length) return;
  s.real = ms; showAway(s); saveGame();
}
function showAway(s) {
  const box = $('#modal'); box.hidden = false;
  const loot = Object.entries({ ...s.loot, ...s.harvest }).sort((a, b) => b[1] - a[1]).slice(0, 10);
  box.innerHTML = `<div class="panel away" role="dialog" aria-label="Pendant ton absence">
    <span class="label">Pendant ton absence · ${fmtDur(s.real)}${s.real > OFFLINE_CAP_MS ? ` (20 min comptées au maximum)` : ''}</span>
    <h2 class="display big-title">Tes héros ont continué</h2>
    <div class="cstats"><div class="cs"><small>XP</small><b class="num">${fmt(s.xp)}</b></div><div class="cs"><small>Kamas</small><b class="num">${fmt(s.kamas)}</b></div><div class="cs"><small>Vaincus</small><b class="num">${fmt(s.kills)}</b></div>${s.runs ? `<div class="cs"><small>Donjons</small><b>${s.runs}</b></div>` : ''}</div>
    ${Object.entries(s.levels).map(([n, [a, b]]) => `<div class="sub"><b style="color:var(--fg)">${esc(n)}</b> : niveau ${a} → <b class="lvl">${b}</b></div>`).join('')}
    ${(s.jobs || []).map(([k, a, b]) => `<div class="sub">${(JOBS[k] || GATHER_JOBS[k]).name} : niveau ${a} → <b class="lvl">${b}</b></div>`).join('')}
    ${s.gear.length ? `<div class="away-gear">${s.gear.map(g => `<span class="tile sm ${qClass(g)}" title="${esc(ITEMS[g.id].name)}">${itemIcon(g.id)}</span>`).join('')}</div>` : ''}
    ${loot.length ? `<div class="rr-ing">${loot.map(([r, n]) => `<span class="ing ok">${RESOURCES[r].icon}<span class="ing-n">${RESOURCES[r].name}</span><b class="num">×${fmt(n)}</b></span>`).join('')}</div>` : ''}
    ${s.deaths ? `<div class="sub">Défaites : ${s.deaths}</div>` : ''}
    <button class="btn gold lg" data-act="closeaway">Récupérer</button></div>`;
}

/* ---------------------------- Boucle ---------------------------- */
function loop() {
  const now = Date.now(); let dt = now - st.lastTick; st.lastTick = now;
  if (dt < 0) dt = 0;
  if (dt <= 15000) { // le temps se fige pendant la Colère de Iop : plus personne n'agit
    if (!FURY_FREEZE) for (const h of st.heroes) if (!FURY_ANIM[h.id]) tickHero(st, h, dt, liveEv);
  } else offline(dt); // onglet en veille : rattrapage, 20 min maximum
  render();
}
function start(data) {
  st = loadGame(data && data.save);
  if (!RENDER[ui.view]) ui.view = 'combat';
  const away = Date.now() - (st.lastTick || Date.now());
  st.lastTick = Date.now();
  shell();
  if (away > 15000) offline(away);
  render(true);
  chatLoop();
  accSync();
  setInterval(() => accCloudSave(), 60000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) accCloudSave(true); });
  setInterval(loop, 200);
  setInterval(saveGame, 10000);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame(); });
  window.addEventListener('pagehide', saveGame);
  window.claude?.hot?.snapshot?.(() => ({ save: serialize(st) }));
  window.__game = { get st() { return st; }, ui, liveEv, render, fx: playSpellFx }; // accès de débogage (console)
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
