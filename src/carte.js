/* =====================================================================
   VUE CARTE — carte du monde illustrée et animée + fiches de monstres
   (remplace renderCarte / placeDetail de ui2.js)
   ===================================================================== */
const WM_W = 1640, WM_H = 470;
const WM_POS = { zone: { incarnam: [78, 262], astrub: [232, 168], abraknydes: [404, 268], cania: [578, 160], koalaks: [752, 264], sidimote: [920, 150],
    wabbits: [268, 338], blops: [590, 322], kanniboul: [872, 338], porcos: [1110, 280], dragoeufs: [1300, 150], frigost: [1490, 280] },
  dungeon: { dj_bouftou: [352, 66], dj_bwork: [690, 62], dj_dragon_cochon: [1080, 52], dj_crocabulia: [1300, 46], dj_mansot: [1520, 140] } };
const WM_LINK = { dj_bouftou: 'astrub', dj_bwork: 'cania', dj_dragon_cochon: 'porcos', dj_crocabulia: 'dragoeufs', dj_mansot: 'frigost' };
for (const z of ZONES) if (z.sub) WM_LINK[z.id] = z.parent; // chemin en pointillés vers la zone mère
const cph = p => `animation-delay:-${Date.now() % p}ms`;
const _mx = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
const _rn = s => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const WM_REG = [['Incarnam', 80], ['Astrub', 236], ['Amakna', 408], ['Cania', 580], ['Koalak', 752], ['Sidimote', 918], ['Porcos', 1110], ['Dragoeufs', 1300], ['Frigost', 1490]];
const _wmTh = r => THEME[r] || THEME.idle;

let _wmStatic = null;
function wmScenery() {
  if (_wmStatic) return _wmStatic;
  const D = '#0e110b', skyC = WM_REG.map(([r]) => _mx(_wmTh(r)[0], D, .5)), grC = WM_REG.map(([r]) => _wmTh(r)[1]);
  const hgrad = (id, cols, t, k) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${cols.map((c, i) => `<stop offset="${(WM_REG[i][1] / WM_W).toFixed(3)}" stop-color="${_mx(c, k || D, t)}"/>`).join('')}</linearGradient>`;
  const hill = (id, y, amp, seed, grad) => { let d = `M0 ${WM_H} L0 ${y}`; for (let x = 0; x <= WM_W; x += 125) { const y1 = y + (_rn(seed + x / 125) - .5) * amp * 2; d += ` S${x + 62} ${y1 - amp * .4} ${x + 125} ${y + (_rn(seed + x / 125 + 1) - .5) * amp * 2}`; } return `<path d="${d} L${WM_W} ${WM_H}Z" fill="url(#${grad})"/>`; };
  const bush = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="11" ry="3" fill="#000" opacity=".25"/><circle cx="-5" cy="-3" r="6" fill="${c}"/><circle cx="4" cy="-4" r="7" fill="${_mx(c, '#ffffff', .12)}"/><circle cx="0" cy="-8" r="5.5" fill="${_mx(c, '#ffffff', .22)}"/></g>`;
  const oak = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="12" ry="3" fill="#000" opacity=".25"/><rect x="-2" y="-12" width="4" height="13" fill="#5a3a1c"/><circle cx="-7" cy="-16" r="8" fill="${c}"/><circle cx="7" cy="-17" r="9" fill="${_mx(c, '#ffffff', .1)}"/><circle cx="0" cy="-24" r="8.5" fill="${_mx(c, '#ffffff', .2)}"/></g>`;
  const pine = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="9" ry="2.5" fill="#000" opacity=".3"/><rect x="-1.6" y="-6" width="3.2" height="7" fill="#4a2c14"/><path d="M0-34 9-17H4l8 11H-8l8-11h-5Z" fill="${c}"/><path d="M0-34 9-17H4l8 11H0Z" fill="${_mx(c, D, .35)}" opacity=".5"/></g>`;
  const rock = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="12" ry="3" fill="#000" opacity=".25"/><path d="M-11 0-8-9-2-12 6-10 11-2 9 0Z" fill="${c}"/><path d="M-2-12 6-10 11-2 3-3Z" fill="${_mx(c, '#ffffff', .25)}"/><path d="M-11 0-8-9-5-3-3 0Z" fill="${_mx(c, D, .35)}"/></g>`;
  const peak = (x, y, w, h, c, snow) => `<g transform="translate(${x} ${y})"><path d="M${-w / 2} 0 0 ${-h} ${w / 2} 0Z" fill="${c}"/><path d="M0 ${-h} ${w / 2} 0 ${w * .08} 0Z" fill="${_mx(c, D, .3)}" opacity=".6"/>${snow ? `<path d="M0 ${-h} ${-w * .17} ${-h * .66} ${-w * .06} ${-h * .72} 0 ${-h * .6} ${w * .08} ${-h * .72} ${w * .17} ${-h * .66}Z" fill="#f4f8ff"/>` : ''}</g>`;
  const grave = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="8" ry="2" fill="#000" opacity=".3"/><path d="M-5 0v-11a5 5 0 0 1 10 0V0Z" fill="#8a8498"/><path d="M0-12v6M-2.4-9.4h4.8" stroke="#3a3548" stroke-width="1.2"/></g>`;
  const dead = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-20M0-10-8-18M0-14 7-22M0-18-4-26M-8-18-11-20M7-22 10-21" stroke="#2a2438" stroke-width="2.2" stroke-linecap="round" fill="none"/></g>`;
  const wheat = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#e8c24a" stroke-width="1.3" stroke-linecap="round"><path d="M-6 0-7-9M-3 0-3-11M0 0V-10M3 0 3-11M6 0 7-9" fill="none"/><g fill="#f4d870" stroke="none"><ellipse cx="-7" cy="-10" rx="1.3" ry="2.4"/><ellipse cx="-3" cy="-12" rx="1.3" ry="2.4"/><ellipse cx="0" cy="-11" rx="1.3" ry="2.4"/><ellipse cx="3" cy="-12" rx="1.3" ry="2.4"/><ellipse cx="7" cy="-10" rx="1.3" ry="2.4"/></g></g>`;
  let deco = '';
  // Incarnam
  deco += oak(36, 262, .9, '#8fd07a') + oak(142, 246, .7, '#9fdc88') + bush(20, 290, 1, '#7cc46a') + bush(118, 296, 1.1, '#86cc72') + bush(158, 270, .8, '#7cc46a');
  for (let i = 0; i < 16; i++) deco += `<circle cx="${10 + _rn(i + 3) * 150}" cy="${270 + _rn(i + 9) * 40}" r="1.5" fill="${['#ffd6e8', '#fff', '#ffe58a'][i % 3]}" opacity=".85"/>`;
  // Astrub : champs de blé + moulin
  for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) deco += wheat(176 + i * 15 + r * 6, 272 + r * 15, .9 + r * .12);
  deco += `<g transform="translate(300 250)"><ellipse cx="0" cy="2" rx="14" ry="3" fill="#000" opacity=".3"/><path d="M-9 0-5-24H5L9 0Z" fill="#d9c9a0"/><path d="M-9 0-5-24H0L-2 0Z" fill="#fff" opacity=".18"/><path d="M-6-24 0-32 6-24Z" fill="#b0452a"/><rect x="-2" y="-9" width="4" height="9" rx="1.4" fill="#5a3a1c"/><g class="wm-blades" style="transform-origin:0 -21px;${cph(7000)}"><path d="M0-21V-44M0-21V-2M0-21-23-21M0-21 23-21" stroke="#6a4a2a" stroke-width="1.8"/><path d="M1-21 9-44 1-44ZM-1-21-9 2-1 2ZM-1-21-23-29-23-21ZM1-21 23-13 23-21Z" fill="#fff6da" opacity=".85"/></g><circle cx="0" cy="-21" r="2.4" fill="#3a2410"/></g>`;
  // Forêt
  for (const [x, y, s, c] of [[352, 282, 1.1, '#2f6a2a'], [376, 262, .9, '#3a7a30'], [398, 296, 1.2, '#2a5a26'], [440, 270, 1, '#357430'], [468, 292, 1.15, '#2f6a2a'], [492, 262, .85, '#3a7a30'], [420, 250, .75, '#2a5a26'], [340, 252, .7, '#3a7a30']]) deco += pine(x, y, s, c);
  deco += oak(454, 252, .8, '#4a8a3a');
  // Cania
  for (const [x, y, s] of [[524, 288, 1.3], [556, 268, .9], [612, 294, 1.1], [646, 270, .8], [590, 252, .7]]) deco += rock(x, y, s, '#b09870');
  for (let i = 0; i < 10; i++) deco += `<path d="M${520 + _rn(i + 20) * 150} ${300 - _rn(i + 5) * 25}l-2-6M${522 + _rn(i + 20) * 150} ${300 - _rn(i + 5) * 25}l1-7" stroke="#d6be8d" stroke-width="1.2" opacity=".8"/>`;
  // Koalaks
  deco += peak(704, 218, 70, 60, '#5a7a58', true) + peak(776, 210, 90, 78, '#4e6e4e', true) + peak(836, 224, 60, 50, '#5a7a58', false);
  for (const [x, y, s] of [[690, 284, 1.2], [726, 266, .9], [790, 292, 1.1], [820, 270, .9]]) deco += bush(x, y, s, '#4f9a4a');
  // Sidimote
  deco += `<ellipse cx="920" cy="270" rx="90" ry="22" fill="#9a7ac0" opacity=".16"/><ellipse cx="880" cy="296" rx="70" ry="16" fill="#9a7ac0" opacity=".14"/>`;
  for (const [x, y, s] of [[868, 280, 1.1], [905, 296, .9], [958, 274, 1], [985, 296, 1.1]]) deco += grave(x, y, s);
  deco += dead(862, 260, 1.1) + dead(944, 256, .9) + dead(996, 264, 1);
  return (_wmStatic = `<defs>${hgrad('wmSky', skyC, 0)}${hgrad('wmH1', grC, .55, '#c8d8e8')}${hgrad('wmH2', grC, .3)}${hgrad('wmH3', grC, .45)}
    <linearGradient id="wmFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${D}" stop-opacity=".55"/><stop offset=".55" stop-color="${D}" stop-opacity="0"/></linearGradient>
    <linearGradient id="wmFog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${D}" stop-opacity="0"/><stop offset="1" stop-color="${D}" stop-opacity=".6"/></linearGradient>
    <radialGradient id="wmSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".4" stop-color="#ffe9a0" stop-opacity=".35"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>
    <radialGradient id="wmMoon" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e8e0ff" stop-opacity=".9"/><stop offset=".5" stop-color="#b8a8ff" stop-opacity=".25"/><stop offset="1" stop-color="#b8a8ff" stop-opacity="0"/></radialGradient></defs>
    <rect width="${WM_W}" height="${WM_H}" fill="url(#wmSky)"/><rect width="${WM_W}" height="${WM_H}" fill="url(#wmFade)"/>
    <circle cx="70" cy="52" r="46" fill="url(#wmSun)"/><circle cx="70" cy="52" r="13" fill="#fff6c8"/>
    <circle cx="936" cy="46" r="40" fill="url(#wmMoon)"/><circle cx="936" cy="46" r="11" fill="#efeaff"/><circle cx="941" cy="43" r="9" fill="#5a4a80" opacity=".5"/>
    ${Array.from({ length: 44 }, (_, i) => `<circle cx="${760 + _rn(i + 60) * 860}" cy="${8 + _rn(i + 80) * 120}" r="${.6 + _rn(i + 7) * .9}" fill="#fff" opacity="${.35 + _rn(i + 17) * .5}"/>`).join('')}
    <g transform="translate(0 40)">${hill('wmB', 188, 14, 3, 'wmH1')}${hill('wmM', 214, 12, 11, 'wmH2')}${hill('wmF', 246, 10, 23, 'wmH3')}${deco}</g>${wmSubScenery()}`);
}
function wmRoad() {
  const zs = ZONES.filter(z => !z.sub).map(z => WM_POS.zone[z.id]);
  let d = `M-20 ${zs[0][1] + 34} C ${zs[0][0] / 2} ${zs[0][1] + 34}, ${zs[0][0] / 2} ${zs[0][1]}, ${zs[0][0]} ${zs[0][1]}`;
  for (let i = 1; i < zs.length; i++) { const [x0, y0] = zs[i - 1], [x1, y1] = zs[i], mx = (x0 + x1) / 2; d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`; }
  const wmPos = id => WM_POS.zone[id] || WM_POS.dungeon[id];
  const curve = id => { const [x, y] = wmPos(id), [zx, zy] = wmPos(WM_LINK[id]); return `M${zx} ${zy} Q ${(x + zx) / 2 + 24} ${(y + zy) / 2 + (WM_POS.zone[id] ? 14 : 0)} ${x} ${y}`; };
  const br = DUNGEONS.map(dj => curve(dj.id)).join(' '), bs = ZONES.filter(z => z.sub).map(z => curve(z.id)).join(' ');
  return `<path d="${d}" fill="none" stroke="#1a1208" stroke-width="15" stroke-linecap="round" opacity=".7"/><path d="${d}" fill="none" stroke="#a8844c" stroke-width="10.5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d9bc7e" stroke-width="7" stroke-linecap="round" opacity=".55"/><path d="${d}" class="wm-march" style="${cph(1400)}" fill="none" stroke="#fff3c4" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="3 13"/>
    <path d="${br}" fill="none" stroke="#1a1208" stroke-width="5.5" stroke-linecap="round" opacity=".6"/><path d="${br}" class="wm-march" style="${cph(1400)}" fill="none" stroke="#ffd68a" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 9"/>
    <path d="${bs}" fill="none" stroke="#0a1418" stroke-width="5" stroke-linecap="round" opacity=".55"/><path d="${bs}" class="wm-march" style="${cph(1400)}" fill="none" stroke="#c4ecff" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1.5 8"/>`;
}
function wmClouds() {
  return [[0, 34, 1, 80000], [0, 78, .7, 110000], [0, 20, .85, 95000], [0, 58, .6, 130000]].map(([x, y, s, T], i) => `<g class="wm-cloud" style="${cph(T)};animation-duration:${T}ms;opacity:${i % 2 ? .5 : .75}"><g transform="translate(0 ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="34" ry="9" fill="#fff"/><ellipse cx="-14" cy="-6" rx="16" ry="9" fill="#fff"/><ellipse cx="8" cy="-9" rx="19" ry="11" fill="#fff"/></g></g>`).join('')
    + Array.from({ length: 9 }, (_, i) => { const f = i < 5; const x = f ? 340 + _rn(i + 40) * 160 : 860 + _rn(i + 40) * 130, y = f ? 236 + _rn(i + 50) * 56 : 236 + _rn(i + 51) * 50; return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="1.9" fill="${f ? '#ffe98a' : '#c8b0ff'}" class="wm-fly" style="animation-delay:-${(i * 713 + Date.now()) % 3600}ms"/>`; }).join('');
}
function readiness(p) {
  const best = st.heroes.reduce((m, h) => Math.max(m, h.lvl), 0);
  if (!st.heroes.length) return ['far', 'Recrute un héros'];
  return best >= p.lvl[0] ? ['ok', 'Niveau adapté'] : best >= p.lvl[0] - 3 ? ['near', 'Un peu juste'] : ['far', 'Trop difficile'];
}
function wmNode(p, type) {
  const [x, y] = WM_POS[type][p.id]; const sel = ui.place.type === type && ui.place.id === p.id;
  const here = st.heroes.filter(h => h.act && h.act.type === type && h.act.id === p.id);
  const mons = placeMons(p, type), icon = monIcon(type === 'dungeon' ? p.boss[0] : (p.sub || p.archiBase) ? (mons.find(m => MONSTERS[m].big) || p.archiBase || mons[0]) : mons[0]); const [rd, rl] = readiness(p);
  const th = _wmTh(p.region), keyN = type === 'dungeon' ? (st.res[p.key] || 0) : 0;
  return `<button class="wn ${type}${p.sub ? ' sub' : ''}${sel ? ' sel' : ''}${here.length ? ' occ' : ''}" data-act="place" data-type="${type}" data-id="${p.id}" style="left:${(x / WM_W * 100).toFixed(2)}%;top:${(y / WM_H * 100).toFixed(2)}%;${themeStyle(th)}" aria-label="${esc(p.name)}" aria-pressed="${sel}">
    ${p.sub ? `<span class="wn-orbit" style="${cph(18000)}"></span>` : ''}<span class="wn-ring" style="${cph(2400)}"></span><span class="wn-art">${icon}</span><span class="wn-dot ${rd}" title="${rl} · niveau conseillé ${p.lvl[0]}">${rd === 'ok' ? '✓' : rd === 'near' ? '!' : '✕'}</span>
    ${type === 'dungeon' ? `<span class="wn-key${keyN ? '' : ' none'}" title="Clefs en stock">🗝 ${keyN}</span>` : ''}
    ${here.length ? `<span class="wn-heroes">${here.map((h, i) => `<span class="wn-h" style="${cph(2200 + i * 130)}">${emblem(h.cls, true)}</span>`).join('')}</span>` : ''}
    <span class="wn-lab"><b>${p.name}</b><small>${type === 'dungeon' ? 'Donjon · ' : p.sub ? 'Sous-zone · ' : ''}niv. ${p.lvl[0]}–${p.lvl[1]}</small></span></button>`;
}
function wmMap() {
  return `<div class="wm-scroll"><div class="wm"><svg class="wm-svg" viewBox="0 0 ${WM_W} ${WM_H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${wmScenery()}${wmRoad()}${wmSubAnim()}${wmClouds()}<rect width="${WM_W}" height="${WM_H}" fill="url(#wmFog)"/></svg>
    ${ZONES.map(z => wmNode(z, 'zone')).join('')}${DUNGEONS.map(d => wmNode(d, 'dungeon')).join('')}
</div></div>`;
}

function carteSig() {
  return JSON.stringify([st.heroes.map(h => [h.id, h.lvl, h.act && [h.act.type, h.act.id, h.act.tier || 0]]), ui.place, ui.zoneTier, ui.openMons, DUNGEONS.map(d => st.res[d.key] | 0), st.heroes.length]);
}
let _wmFirst = true;
function wmAfter() {
  if (!_wmFirst && !ui._wmCenter) return; _wmFirst = false; ui._wmCenter = false;
  const sc = document.querySelector('.wm-scroll'), n = sc && sc.querySelector('.wn.sel'); if (!sc || !n) return;
  sc.scrollLeft = n.offsetLeft - sc.clientWidth / 2;
}

function renderCarte() {
  if (!ui.place || !findPlace(ui.place.type, ui.place.id)) ui.place = defaultPlace();
  return `<div class="carte"><section class="panel wm-panel"><div class="wm-h"><h3 class="display">Carte du monde</h3><span class="sub">Touche un lieu pour voir ses monstres et y envoyer tes héros.</span><div class="wm-legend"><span><i class="ok"></i>Niveau adapté</span><span><i class="near"></i>Un peu juste</span><span><i class="far"></i>Trop difficile</span></div></div>${wmMap()}</section>
    <section class="panel map-detail">${placeDetail(findPlace(ui.place.type, ui.place.id), ui.place.type)}</section></div>`;
}

function monCard(p, type, mid, T) {
  const d = MONSTERS[mid]; const ar = !!d.archi, src = d.base || mid, ab = ar ? 3 : 1; const gd = GEAR_DROPS[src] || []; const ms = monsterStats(mid);
  const gr = gd.length ? (d.boss || ar ? GEAR_DROP_RATE_BOSS : GEAR_DROP_RATE) * T.drop / gd.length : 0;
  const key = p.id + ':' + mid; const mo = !!(ui.openMons || {})[key];
  const rl = (RELIC_DROPS[src] || []).map(([r, c]) => [r, c * T.drop * (ar ? 20 : 1)]);
  const detail = mo ? `<div class="mc-detail" data-act="noop"><div class="dr-items">
      ${d.drops.map(([r, c]) => `<div class="dr-item"><span class="dr-ii">${RESOURCES[r].icon}</span><div><b>${RESOURCES[r].name}</b><div class="sub">Ressource · ${RESOURCES[r].value} K pièce</div></div><b class="dr-pc">${pct(Math.min(1, c * ab))}</b></div>`).join('')}
      ${rl.map(([r, c]) => `<div class="dr-item relic"><span class="dr-ii">${itemIcon(r)}</span><div><b>${ITEMS[r].name}</b> <span class="sub">Relique · niv. ${ITEMS[r].lvl}</span>
        <div class="sub">${Object.entries(ITEMS[r].stats).map(([k, [a, b2]]) => `${a}–${b2} ${STAT_SHORT[k]}`).join(' · ')}</div></div><b class="dr-pc relic">${pct(c)}</b></div>`).join('')}
      ${gd.map(i => { const it = ITEMS[i]; return `<div class="dr-item gear"><span class="dr-ii">${itemIcon(i)}</span><div><b>${it.name}</b> <span class="sub">niv. ${it.lvl}</span>
        <div class="sub">${Object.entries(it.stats).map(([k, [a, b2]]) => `<span style="color:${STAT_COLOR[k]}">${a}–${b2} ${STAT_SHORT[k]}</span>`).join(' · ')}</div>
        <div class="sub dr-stasis-line">Stasifié : ${Object.entries(it.stats).map(([k, [, b2]]) => `${b2 * 2} ${STAT_SHORT[k]}`).join(' · ')}</div></div>
        <div class="dr-pcs"><b class="dr-pc gold">${pct(gr)}</b><b class="dr-pc stasis">${pct(STASIS_RATE * T.drop)}</b></div></div>`; }).join('')}
    </div></div>` : '';
  return `<article class="mc${mo ? ' open' : ''}${ar ? ' archi' : ''}${d.boss ? ' boss' : ''}${d.big ? ' big' : ''}" data-act="togglemon" data-k="${key}">
    <div class="mc-head" tabindex="0" role="button" aria-expanded="${mo}" title="Voir tous les objets droppables">
      <span class="mc-ico" aria-hidden="true"><span style="${cph(2600 + (key.length % 7) * 150)}">${monIcon(mid)}</span></span>
      <div class="mc-id"><b>${ar ? '👑 ' : ''}${d.name}</b><span class="mc-tags"><em class="lv">Niv. ${d.lvl}</em>${d.boss ? '<em class="bs">Boss</em>' : ''}${d.big ? '<em class="bg">Gros monstre</em>' : ''}${ar ? '<em class="ar">Archimonstre</em>' : ''}</span></div>
      <span class="chev" aria-hidden="true">▸</span></div>
    <div class="mc-more">${mo ? 'Cliquer pour replier' : `Voir les ${d.drops.length + gd.length + rl.length} objets droppables`}</div>
    <div class="mc-stats"><span class="hp">❤ <b class="num">${fmt(ms.hp * T.hp)}</b> PV</span><span class="dm">⚔ <b class="num">${fmt(ms.dmin * T.dmg)}–${fmt(ms.dmax * T.dmg)}</b> dégâts</span></div>
    ${ar ? `<div class="mc-archi">👹 ${pct(ARCHI_RATE)} d’apparition après chaque combat de zone</div>` : ''}
    <div class="mc-row"><label>Ressources</label><div class="dr-chips">${d.drops.map(([r, c]) => `<span title="${RESOURCES[r].name}">${RESOURCES[r].icon}<b>${pct(Math.min(1, c * ab))}</b></span>`).join('')}</div></div>
    <div class="mc-row"><label>Équipement</label>${gd.length ? `<div class="dr-chips"><span class="dr-gold" title="${gd.map(i => ITEMS[i].name).join(', ')}">${gd.map(i => itemIcon(i)).join('')}<b>${pct(gr)}</b></span><span class="dr-stasis-chip" title="Chance de stasifié (stats ×2)">✦ <b>${pct(STASIS_RATE * T.drop)}</b></span></div>` : '<span class="dim">—</span>'}</div>
    <div class="mc-row"><label>Relique</label>${rl.length ? `<div class="dr-chips">${rl.map(([r, c]) => `<span class="dr-relic" title="${ITEMS[r].name}">${itemIcon(r)}<b>${pct(c)}</b></span>`).join('')}</div>` : '<span class="dim">—</span>'}</div>
    ${detail}</article>`;
}

function placeDetail(p, type) {
  const mons = placeMons(p, type);
  const keyN = type === 'dungeon' ? (st.res[p.key] || 0) : 0;
  const tier = type === 'zone' ? ((ui.zoneTier || {})[p.id] || 0) : 0; const T = SUBZONES[tier];
  const best = st.heroes.reduce((m, h) => Math.max(m, heroTotals(st, h).ppTotal), 100);
  const cards = (type === 'zone' && ARCHIS[p.id] ? [...mons, ARCHIS[p.id]] : mons).map(mid => monCard(p, type, mid, T)).join('');
  const sends = st.heroes.length ? st.heroes.map(h => {
    const there = h.act && h.act.type === type && h.act.id === p.id && (type !== 'zone' || (h.act.tier || 0) === tier);
    const low = h.lvl < p.lvl[0] - 3;
    const label = there ? 'Est ici' : low ? `Niveau conseillé ${p.lvl[0]}` : h.act ? `Quitte ${placeName(h.act)}` : 'Disponible';
    return heroChip(h, `data-act="send" data-hero="${h.id}" data-type="${type}" data-id="${p.id}" data-t="${tier}" ${there || (type === 'dungeon' && !keyN) ? 'disabled' : ''}`, esc(label), (there ? 'here' : '') + (low ? ' low' : ''));
  }).join('') : '<span class="sub">Recrute un héros d’abord.</span>';
  const [rd, rl] = readiness(p), th = _wmTh(p.region);
  const hills = `<svg class="pb-hills" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100V58C60 36 110 66 170 50S290 30 400 56V100Z" fill="${_mx(th[1], '#c8d8e8', .3)}" opacity=".55"/><path d="M0 100V72C70 56 130 84 200 68S320 54 400 74V100Z" fill="${_mx(th[1], '#0e110b', .25)}"/></svg>`;
  const motes = Array.from({ length: 7 }, (_, i) => `<i style="left:${8 + i * 13}%;animation-duration:${7000 + i * 900}ms;${cph(7000 + i * 900)}"></i>`).join('');
  return `<div class="place-banner" style="${themeStyle(th)}">${hills}<span class="pb-motes" aria-hidden="true">${motes}</span>
      <div class="pb-txt"><span class="label">${type === 'dungeon' ? 'Donjon · ' : p.sub ? `Sous-zone de ${ZONES.find(z => z.id === p.parent).name}` : ''}${type === 'dungeon' ? p.region : p.sub ? '' : p.region}</span><h2>${type === 'zone' ? `${p.name} ${tier + 1}` : p.name}</h2><p>${p.text}</p></div>
      <div class="pb-side"><span class="lvl-badge">Niv. ${p.lvl[0]}–${p.lvl[1]}</span><span class="rd ${rd}">${rl}</span><div class="pb-mons" aria-hidden="true">${mons.slice(0, 4).map((m, i) => `<span style="${cph(2400 + i * 260)}"><span>${monIcon(m)}</span></span>`).join('')}</div></div>
    </div>
    ${wmLinked(p, type)}
    ${type === 'zone' ? `<div class="tiers">${SUBZONES.map((s, i) => { const n = st.heroes.filter(h => h.act && h.act.type === 'zone' && h.act.id === p.id && (h.act.tier || 0) === i).length;
      return `<button data-act="ztier" data-id="${p.id}" data-t="${i}" aria-pressed="${i === tier}" style="--tc:${['#8fd65a', '#e8d04a', '#f09a3a', '#e8503a'][i]}"><span class="tr-pips">${[0, 1, 2, 3].map(k => `<i${k <= i ? ' class="on"' : ''}></i>`).join('')}</span><b>${p.name} ${i + 1}</b><span>${i ? `PV ×${s.hp} · Dégâts ×${String(s.dmg).replace('.', ',')} · Équip. ×${s.drop}` : 'Difficulté normale'}</span>${n ? `<i class="tr-n">${n} héros</i>` : ''}</button>`; }).join('')}</div>`
      : `<div class="keybox"><span>${RESOURCES[p.key].icon} ${RESOURCES[p.key].name}</span><b style="color:${keyN ? 'var(--win)' : 'var(--hp)'}">${keyN} en stock</b><span class="sub">· 3 salles puis le boss · XP ×${p.bonusXp} · une clef par entrée</span>${keyN ? '' : '<button class="btn sm" data-act="gocraftkey">Fabriquer des clefs</button>'}</div>`}
    <div><div class="label" style="margin-bottom:6px">Envoyer un héros</div><div class="send-list">${sends}</div></div>
    <div><div class="label" style="margin-bottom:8px">Monstres et butin <span class="mc-leg">❤ PV · ⚔ dégâts · ✦ stasifié</span></div><div class="mgrid">${cards}</div></div>
    <p class="hint">Taux par monstre vaincu pour 100 de prospection (ta meilleure : ${best}, soit ×${(best / 100).toFixed(2).replace('.', ',')}). Équipement et stasifié : taux par objet. <span style="color:var(--relic)">En jaune</span> : reliques. Clique sur un monstre pour le détail.</p>`;
}
