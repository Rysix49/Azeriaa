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
const STAT_COLOR = { xpPct: 'var(--xp)', dmgPct: 'var(--hp)', dodge: 'var(--air)', regen: 'var(--win)', speed: 'var(--gold-2)', kamas: 'var(--gold-2)', rxp: 'var(--xp)', rqty: 'var(--win)', rspd: 'var(--gold-2)', vit: 'var(--vit)', sag: 'var(--sag)', for: 'var(--terre)', int: 'var(--feu)', cha: 'var(--eau)', agi: 'var(--air)', pui: 'var(--gold-2)', crit: 'var(--hp)', pp: 'var(--eau)', res: 'var(--muted)', soin: 'var(--win)', dmg: 'var(--fg)', pa: 'var(--eau)' };

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
  eniripsa: '<path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" fill="currentColor"/><path d="M12 10.5v6M9 13.5h6" stroke="var(--c)" stroke-width="2" stroke-linecap="round"/><path d="M4.7 12.2C2.6 12.4 1 10.9 1 8.8c1.3.9 2.6 1 3.6.7M4.9 14.6c-1.8.4-3.2-.5-3.6-2.1M19.3 12.2c2.1.2 3.7-1.3 3.7-3.4-1.3.9-2.6 1-3.6.7M19.1 14.6c1.8.4 3.2-.5 3.6-2.1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" fill="none" opacity=".85"/>',
  sacrieur: '<path d="M12 2.8s6.3 7.2 6.3 11.4a6.3 6.3 0 0 1-12.6 0C5.7 10 12 2.8 12 2.8Z" fill="currentColor"/><path d="M9.3 12.5l2 3.5M12 11.5l1.4 4.8M14.7 12.5l-.6 3.6" stroke="var(--c)" stroke-width="1.5" stroke-linecap="round"/>',
  enutrof: '<ellipse cx="12" cy="17.5" rx="7" ry="2.6" fill="currentColor" opacity=".55"/><ellipse cx="12" cy="14.5" rx="7" ry="2.6" fill="currentColor" opacity=".8"/><circle cx="12" cy="9" r="5.8" fill="currentColor"/><circle cx="12" cy="9" r="3.9" fill="none" stroke="var(--c)" stroke-width="1.2"/><path d="M12 6.6l1.6 2.4-1.6 2.4-1.6-2.4Z" fill="var(--c)"/>',
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
function combatSig() { return st.heroes.map(h => h.id + ':' + (h.act ? h.act.type + h.act.id + h.act.room : '-') + ':' + (h.fight ? h.fight.mons.map(m => m.mid).join(',') : '-') + ':' + h.lvl + ':' + (h.capital > 0)).join('|'); }
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
      return `<div class="unit mon${m.hp <= 0 ? ' dead' : ''}${d.boss ? ' boss' : ''}" data-mon="${i}" data-hp="${m.hp}">
        <div class="u-name" title="${esc(d.name)}">${esc(d.name)} <small>${d.lvl}</small></div>${bar('hp', m.hp, m.max)}<div class="u-hp num" data-k="mhp">${fmt(m.hp)}</div>
        <div class="sprite" aria-hidden="true">${d.icon}</div></div>`; }).join('');
    stage = `<div class="vs"><span>VS</span><small data-k="turn">${h.fight ? `Tour ${h.fight.turn}` : ''}</small>${h.cls === 'xelor' ? `<small class="grains" data-k="grains" title="Grains du sablier : à 12, le Xélor rejoue un tour">${grainsHtml(h)}</small>` : ''}</div><div class="foes">${foes}</div>`;
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
      <div class="scene${harvest ? ' harvest' : ''}" style="${themeStyle(arenaTheme(h))}" data-rw="${(h.fight && h.fight.rewinds) || 0}" data-px="${h.fight && h.fight.paradox ? 1 : 0}">
        <div class="unit hero${h.hp <= 0 && h.resting ? ' dead' : ''}${h.fight ? ' active' : ''}" data-k="fighter" data-hp="${hp}">
          <div class="u-name">${esc(h.name)}</div><div data-k="hpb">${bar('hp', hp, t.maxHp)}</div><div class="u-hp num" data-k="hpt">${fmt(hp)} / ${fmt(t.maxHp)}</div>
          <div class="sprite">${emblem(h.cls, 'big')}</div></div>
        ${stage}
      </div>
      <div class="fc-log" data-k="log">${logHtml(h)}</div>
    </div>
    <footer class="fc-foot">
      <div class="xpline"><span class="lbl">XP</span><div class="grow" data-k="xpb">${bar('xp thin', h.xp, xpToNext(h.lvl))}</div><span class="num" data-k="xpt">${h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`}</span></div>
      <div class="rates" data-k="rates">${fightRates(h)}</div>
    </footer>
  </article>`;
}
function logHtml(h) { return h.log.slice(-9).reverse().map(l => `<div class="${l.c || ''}">${esc(l.t)}</div>`).join(''); }
function floatNum(el, txt, cls) {
  const f = document.createElement('span'); f.className = 'fnum ' + cls; f.textContent = txt;
  el.appendChild(f); setTimeout(() => f.remove(), 950);
  if (cls === 'dmg') { el.classList.add('hit'); setTimeout(() => el.classList.remove('hit'), 300); }
}
/* Effets visuels des passifs (Xélor) posés par-dessus la scène */
function sceneFx(scene, kind, text) {
  if (!scene) return;
  const fx = document.createElement('div'); fx.className = 'fx fx-' + kind;
  fx.innerHTML = `<div class="fx-ring"></div><div class="fx-ring r2"></div><div class="fx-icon">⏳</div>${text ? `<div class="fx-text">${text}</div>` : ''}`;
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
function patchCombat() {
  for (const h of st.heroes) {
    const card = document.querySelector(`[data-hero-card="${h.id}"]`); if (!card) continue;
    const t = heroTotals(st, h); const hp = displayHp(st, h);
    const q = k => card.querySelector(`[data-k="${k}"]`);
    const [sc, stxt] = statusOf(h);
    const scene = card.querySelector('.scene');
    if (h.fight && scene) {
      const rw = h.fight.rewinds || 0, px = h.fight.paradox ? 1 : 0;
      if (+(scene.dataset.rw || 0) < rw) sceneFx(scene, 'rewind', 'Rembobinage !');
      if (+(scene.dataset.px || 0) < px) sceneFx(scene, 'paradox', 'Paradoxe !');
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
      fg.classList.toggle('dead', h.hp <= 0 && h.resting); fg.classList.toggle('active', !!h.fight);
    }
    const hpt = q('hpt'); if (hpt) hpt.textContent = `${fmt(hp)} / ${fmt(t.maxHp)}`;
    setBar(q('hpb'), hp, t.maxHp);
    q('xpt').textContent = h.lvl >= MAX_LEVEL ? 'Max' : `${fmt(h.xp)} / ${fmt(xpToNext(h.lvl))}`; setBar(q('xpb'), h.xp, xpToNext(h.lvl));
    if (h.fight) h.fight.mons.forEach((m, i) => {
      const el = card.querySelector(`[data-mon="${i}"]`); if (!el) return;
      const prev = +el.dataset.hp;
      if (!isNaN(prev) && m.hp < prev) floatNum(el, '−' + fmt(prev - m.hp), 'dmg');
      el.dataset.hp = m.hp;
      el.classList.toggle('dead', m.hp <= 0);
      if (m.frozen && m.hp > 0 && !el.classList.contains('frozen')) iceBurst(el);
      el.classList.toggle('frozen', !!m.frozen && m.hp > 0);
      setBar(el, m.hp, m.max);
      el.querySelector('[data-k="mhp"]').textContent = fmt(m.hp);
    });
    const lg = q('log'); const lk = h.log.length + ':' + (h.log.length ? h.log[h.log.length - 1].t : '');
    if (lg && lg.dataset.lk !== lk) { lg.innerHTML = logHtml(h); lg.dataset.lk = lk; }
    const bf = q('buff'); if (bf) { const tx = foodChip(h); bf.hidden = !tx; if (bf.textContent !== tx) bf.textContent = tx; }
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
}

/* ---------------------------- Recrutement ---------------------------- */
function renderRecruit(first) {
  if (st.heroes.length >= RECRUIT_COST.length) return '<div class="empty">Ton groupe est complet.</div>';
  if (!ui.recruitName) ui.recruitName = HERO_NAMES[irnd(0, HERO_NAMES.length - 1)];
  const cost = RECRUIT_COST[st.heroes.length]; const c = CLASSES[ui.recruitCls];
  return `<section class="panel recruit">
    <div><h2 class="display big-title">${first ? 'Bienvenue dans le Monde des Douze' : 'Recruter un héros'}</h2>
      <p class="sub" style="margin:4px 0 0">${first ? 'Choisis la classe de ton premier héros. Il combattra seul dans les zones que tu choisis, tant que le jeu est ouvert.' : `Héros ${st.heroes.length + 1} sur ${RECRUIT_COST.length}. Chaque héros a sa propre activité et son propre équipement.`}</p></div>
    <div class="cls-grid">${Object.entries(CLASSES).map(([id, k]) => `<button class="cls-card" data-act="rcls" data-cls="${id}" aria-pressed="${ui.recruitCls === id}" style="--c:${k.color}">${emblem(id, 'big')}<b>${k.name}</b><small>${k.role}</small><span class="cls-elem">${STAT_ELEM[k.main] || ''} · ${STAT_LABEL[k.main]}</span></button>`).join('')}</div>
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
  const pool = st.gear.filter(g => !ITEMS[g.id].harvest && !ITEMS[g.id].relic && (!ui.slot || ITEMS[g.id].slot === typeOf(ui.slot)))
    .filter(g => { const by = equippedBy(st, g.uid); return !(by && by.id === h.id); })
    .sort((a, b) => (h.lvl >= ITEMS[b.id].lvl) - (h.lvl >= ITEMS[a.id].lvl) || ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  const list = pool.length ? `<div class="bag-list">${pool.slice(0, ui.slot ? 60 : 20).map(g => { const d = ITEMS[g.id]; const by = equippedBy(st, g.uid); const ok = h.lvl >= d.lvl;
      return `<div class="bag-r ${qClass(g)}"><div class="tile sm ${qClass(g)}">${itemIcon(g.id)}</div>
        <div class="br-main"><div class="br-top"><b>${esc(d.name)}</b><small class="sub">niv. ${d.lvl}</small>${qualityTag(g)}${by ? `<small class="eqby">porté par ${esc(by.name)}</small>` : ''}</div>
        <div class="sd-list">${statDiff(g, compareTarget(h, g))}</div></div>
        <button class="btn sm gold" data-act="equip" data-uid="${g.uid}" data-slot="${ui.slot || ''}" ${ok ? '' : 'disabled'}>${ok ? 'Équiper' : `Niv. ${d.lvl}`}</button></div>`; }).join('')}</div>`
    : `<div class="empty sm">${ui.slot ? `Aucun objet de type ${SLOT_LABEL[ui.slot].toLowerCase()} dans le sac.` : 'Aucun objet dans le sac.'} <button class="btn sm" data-act="view" data-v="ateliers">Aller aux Ateliers</button></div>`;
  return `${doll}${detail}${sets ? `<div class="sets">${sets}</div>` : ''}
    <div class="list-h"><span class="label">${ui.slot ? `Sac · ${SLOT_LABEL[ui.slot]}` : 'Sac · tous les équipements'}</span>
      ${ui.slot ? '<button class="btn sm ghost" data-act="pickslot" data-slot="">Tout afficher</button>' : '<span class="hint">Clique sur un emplacement pour filtrer et comparer</span>'}</div>
    ${list}`;
}
function statsPanel(h) {
  const t = heroTotals(st, h); const c = CLASSES[h.cls];
  const rows = STATS.map(s => { const bonus = t[s] - h.base[s]; const off = h.capital < STAT_COST[s] ? 'disabled' : '';
    return `<div class="srow"><span class="dot" style="--c:${STAT_COLOR[s]}"></span><span class="sname">${STAT_LABEL[s]}${STAT_ELEM[s] ? `<small>${STAT_ELEM[s]}</small>` : ''}${STAT_COST[s] > 1 ? `<small>${STAT_COST[s]} pts</small>` : ''}</span>
      <span class="sval num"><b>${t[s]}</b>${bonus ? `<small>${h.base[s]} + ${bonus} équip.</small>` : ''}</span>
      <span class="sbtns"><button class="btn sm" data-act="alloc" data-stat="${s}" data-n="1" ${off} aria-label="+1 ${STAT_LABEL[s]}">+1</button><button class="btn sm" data-act="alloc" data-stat="${s}" data-n="10" ${off} aria-label="+10 ${STAT_LABEL[s]}">+10</button></span></div>`; }).join('');
  const cs = [['Points de vie', fmt(t.maxHp)], ['PA', t.pa], ['Puissance', t.pui], ['Critique', t.critPct.toFixed(1).replace('.', ',') + ' %'], ['Esquive', t.dodgePct.toFixed(1).replace('.', ',') + ' %'],
    ['Résistance', t.resPct + ' %'], ['Prospection', t.ppTotal], ['Bonus XP', '+' + t.xpBonus + ' %'], ...(t.kamas ? [['Bonus kamas', '+' + t.kamas + ' %']] : []), ...(t.dmgPct ? [['Dégâts', '+' + t.dmgPct + ' %']] : []), ...(t.speed ? [['Vitesse combat', '+' + t.speed + ' %']] : []), ...(t.regen ? [['Régén. / tour', t.regen + ' %']] : [])];
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
function relicSources(id) { return Object.entries(RELIC_DROPS).filter(([, l]) => l.some(([r]) => r === id)).map(([m, l]) => `${MONSTERS[m].icon} ${MONSTERS[m].name} (${pct(l.find(([r]) => r === id)[1])})`).join(', '); }
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
    const icon = MONSTERS[type === 'dungeon' ? p.boss[0] : mons[0]].icon;
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
      <td><div class="dr-mon"><span class="chev" aria-hidden="true">▸</span><span class="dr-ico" aria-hidden="true">${d.icon}</span><div><b>${d.name}</b> <span class="sub">${d.lvl}${d.boss ? ' · Boss' : ''}</span>
        <div class="dr-meta">${fmt(ms.hp * T.hp)} PV · ${fmt(ms.dmin * T.dmg)}–${fmt(ms.dmax * T.dmg)} dégâts</div></div></div></td>
      <td><div class="dr-chips">${d.drops.map(([r, c]) => `<span title="${RESOURCES[r].name}">${RESOURCES[r].icon}<b>${pct(Math.min(1, c))}</b></span>`).join('')}</div></td>
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
      <div class="pb-side"><span class="lvl-badge">Niv. ${p.lvl[0]}–${p.lvl[1]}</span><div class="pb-mons" aria-hidden="true">${mons.slice(0, 4).map(m => `<span>${MONSTERS[m].icon}</span>`).join('')}</div></div>
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
  return `<button class="tile ${qClass(g)}${sel ? ' sel' : ''}" data-act="pick" data-kind="gear" data-uid="${g.uid}" title="${esc(d.name)}${by ? ' · porté par ' + esc(by.name) : ''}">${itemIcon(g.id)}<span class="t-lv">${d.lvl}</span>${by ? `<span class="t-by" style="--c:${CLASSES[by.cls].color}"></span>` : ''}</button>`;
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
    <p class="hint">Bordure grise, blanche ou dorée : qualité du jet. Violet : stasifié. Jaune : relique. La pastille de couleur indique quel héros porte l’objet.</p>
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
  const from = Object.entries(MONSTERS).filter(([, m]) => m.drops.some(([x]) => x === id)).map(([, m]) => `<span class="use">${m.icon}<span>${m.name}</span><small>${pct(Math.min(1, m.drops.find(([x]) => x === id)[1]))}</small></span>`);
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
  $('#main').innerHTML = (RENDER[ui.view] || renderCombat)();
  for (const [s, l, t] of keep) { const el = $(s); if (el) { el.scrollLeft = l; el.scrollTop = t; } }
  if (ui.view === 'combat') ui.lastSig = combatSig();
}
let lastSlow = 0;
function render(force) {
  updateChrome();
  const now = Date.now();
  if (force) { renderMain(true); lastSlow = now; return; }
  if (ui.view === 'combat' && st.heroes.length) {
    if (combatSig() !== ui.lastSig) renderMain(); else patchCombat();
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
  selhero(d) { ui.hero = d.hero; ui.recruitOpen = false; },
  alloc(d) { allocate(selHero(), d.stat, +d.n); },
  resetstats() { resetStats(st, selHero()); selHero().auto = ''; },
  equip(d) { const err = equip(st, selHero(), d.uid, d.slot || null); if (err) toast(err, 'warn'); },
  equipon(d) { const h = heroById(d.hero); const err = equip(st, h, d.uid, null); if (err) toast(err, 'warn'); else toast(`${ITEMS[gearById(st, d.uid).id].name} équipé sur ${h.name}.`); },
  unequip(d) { unequipSlot(st, selHero(), d.slot); },
  unequipuid(d) { const by = equippedBy(st, d.uid); if (by) unequipUid(by, d.uid); },
  toggledetail() { ui.detailHidden = !ui.detailHidden; },
  unrelic() { selHero().relic = null; },
  eqtab(d) { ui.eqTab = d.v; },
  hslot(d) { ui.hslot = ui.hslot === d.slot ? null : d.slot; },
  hunequip(d) { const h = selHero(); if (h.hequip) delete h.hequip[d.slot]; },
  pickslot(d) { ui.slot = d.slot && ui.slot !== d.slot ? d.slot : null; },
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
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('tr[data-act]')) { e.preventDefault(); e.target.click(); }
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
   Fonction Netlify /api/account (voir netlify/functions/account.mjs). */
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
   Messages partagés via la fonction Netlify /api/chat (voir netlify/functions/chat.mjs).
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
  setInterval(() => { if (Date.now() - chatAt >= (chat.open ? 3000 : 5000)) { chatAt = Date.now(); chatFetch(); } }, 1000);
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
  if (dt <= 15000) for (const h of st.heroes) tickHero(st, h, dt, liveEv);
  else offline(dt); // onglet en veille : rattrapage, 20 min maximum
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
  window.__game = { get st() { return st; }, ui, liveEv, render }; // accès de débogage (console)
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
