/* =====================================================================
   RÉCOLTE — Paysan & Alchimiste : plantes dessinées, scène de récolte animée,
   Almanax du jour, Herbier et maîtrise de chaque plante
   (placé avant ui2.js dans la compilation : tout est lu à l'appel)
   ===================================================================== */
const HV_O = '#1e2a14';
const _hst = (d, col, w = 2) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const _hlf = (x, y, ang, len, col, wd = .38) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0Q${len * .45} ${-len * wd} ${len} 0Q${len * .45} ${len * wd} 0 0Z" fill="${col}" stroke="${HV_O}" stroke-width=".7" stroke-linejoin="round"/><path d="M0 0L${len * .85} 0" stroke="#0003" stroke-width=".6"/></g>`;
const _hel = (cx, cy, rx, ry, col, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${rot ? `transform="rotate(${rot} ${cx} ${cy})"` : ''} fill="${col}" stroke="${HV_O}" stroke-width=".6"/>`;
function _hear(x, y, n, col, awn = 0, spread = 3.4, gl = 5) {
  let s = '';
  for (let i = 0; i < n; i++) { const yy = y - i * gl * .82; s += _hel(x - spread, yy, 1.9, gl * .55, col, -24) + _hel(x + spread, yy, 1.9, gl * .55, col, 24); if (awn) s += `<path d="M${x - spread - 1} ${yy - 2}l-3 -${awn}M${x + spread + 1} ${yy - 2}l3 -${awn}" stroke="${col}" stroke-width=".6"/>`; }
  s += _hel(x, y - n * gl * .82, 1.9, gl * .6, col); if (awn) s += `<path d="M${x} ${y - n * gl * .82 - 3}l0 -${awn + 2}" stroke="${col}" stroke-width=".6"/>`;
  return s;
}
const _hpet = (x, y, n, r, col, ctr = '#f6cd6a', pr = 1) => Array.from({ length: n }, (_, i) => { const a = i / n * 360; return `<ellipse cx="${x}" cy="${y - r * .62}" rx="${r * .38 * pr}" ry="${r * .62}" transform="rotate(${a} ${x} ${y})" fill="${col}" stroke="${HV_O}" stroke-width=".5"/>`; }).join('') + `<circle cx="${x}" cy="${y}" r="${r * .3}" fill="${ctr}" stroke="${HV_O}" stroke-width=".5"/>`;
const _hbell = (x, y, col, h = 7, w = 5, rot = 0) => `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x} ${y}c-${w * .2} ${h * .2} -${w} ${h * .5} -${w} ${h}h${w * 2}c0 -${h * .5} -${w * .8} -${h * .8} -${w} -${h}Z" fill="${col}" stroke="${HV_O}" stroke-width=".6" stroke-linejoin="round"/><circle cx="${x}" cy="${y + h + 1}" r="1.3" fill="${col}" stroke="${HV_O}" stroke-width=".4"/></g>`;
const _hberry = (x, y, r, col) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="${HV_O}" stroke-width=".6"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .28}" fill="#fff8"/>`;
const PLANT_ART = {
  ble: () => _hst('M32 54Q31 40 32 20', '#8da84a', 2.2) + _hlf(32, 50, -150, 17, '#9cba52') + _hlf(32, 43, -30, 16, '#9cba52') + _hear(32, 27, 5, '#e9c04a', 6),
  orge: () => _hst('M32 54Q30 38 33 18', '#9bb255', 2) + _hlf(32, 49, -155, 16, '#a8c25e') + _hlf(32, 41, -25, 15, '#a8c25e') + _hear(33, 25, 5, '#dccf8a', 10, 3),
  avoine: () => _hst('M32 54Q32 38 32 22', '#a9b86a', 2) + _hlf(32, 48, -150, 15, '#b5c470') + _hlf(32, 40, -30, 14, '#b5c470') + _hst('M32 24Q24 22 19 31M32 24Q40 22 45 31M32 22Q33 14 31 12M32 24Q28 18 25 23M32 24Q36 18 39 23', '#8d9c4c', 1.5) + [[19, 33], [45, 33], [25, 26], [39, 26], [31, 14], [22, 28], [42, 28]].map(([x, y]) => _hel(x, y, 1.8, 3.4, '#ece3a8', 8)).join(''),
  houblon: () => _hst('M32 54Q22 40 33 28Q40 20 30 10', '#6e9a3e', 2) + _hlf(26, 42, 200, 13, '#7cb542', .62) + _hlf(36, 30, -20, 13, '#7cb542', .62) + [[25, 30], [40, 38], [29, 47]].map(([x, y]) => _hel(x, y + 4, 3, 5, '#a8d050') + _hel(x, y + 2, 2.2, 3, '#c4e46a') + `<path d="M${x} ${y - 1}v-3" stroke="#6e9a3e" stroke-width="1"/>`).join(''),
  lin: () => _hst('M32 54Q30 38 25 20', '#7fae5a', 1.2) + _hst('M32 54Q32 36 34 16', '#7fae5a', 1.2) + _hst('M32 54Q36 40 43 24', '#7fae5a', 1.2) + _hlf(31, 48, -160, 9, '#8fbe64', .25) + _hlf(33, 44, -20, 9, '#8fbe64', .25) + [[25, 19], [34, 15], [43, 23]].map(([x, y]) => _hpet(x, y, 5, 5.2, '#6aa0f0', '#f6e07a', 1.1)).join(''),
  seigle: () => _hst('M32 54Q33 36 31 16', '#a7b05e', 1.8) + _hlf(32, 50, -150, 17, '#b3bc68', .3) + _hlf(32, 42, -28, 16, '#b3bc68', .3) + _hear(31, 26, 6, '#cdbb78', 8, 2.8, 4.2),
  riz: () => _hst('M32 54Q30 30 36 19Q45 14 47 28', '#a4c46a', 1.8) + _hlf(31, 50, -160, 20, '#b3d27a', .22) + _hlf(33, 46, -22, 18, '#b3d27a', .22) + Array.from({ length: 8 }, (_, i) => { const t = i / 7; return _hel(36 + t * 10 + Math.sin(t * 3) * 2, 19 + t * 11, 1.5, 3, '#f3efc8', 20 - t * 40); }).join(''),
  malt: () => _hst('M32 54Q31 40 32 22', '#b69a4a', 2.4) + _hlf(32, 50, -150, 16, '#c0a458') + _hlf(32, 43, -30, 15, '#c0a458') + _hear(32, 29, 5, '#c98a3a', 7, 4.2, 5.2),
  chanvre: () => _hst('M32 54L32 30', '#5a8a3a', 2.6) + [-90, -128, -52, -160, -20, -175, -5].map((a, i) => _hlf(32, 32, a, [27, 22, 22, 17, 17, 11, 11][i], '#5fae4a', .17)).join('') + _hlf(32, 48, -150, 10, '#5fae4a', .3) + _hlf(32, 44, -30, 10, '#5fae4a', .3),
  ortie: () => _hst('M32 54L32 16', '#4f8a38', 2) + [[48, 15], [38, 14], [28, 13]].map(([y, l], i) => _hlf(32, y, -150 + i * 6, l + 2, '#3f8a30', .5) + _hlf(32, y, -30 - i * 6, l + 2, '#3f8a30', .5)).join('') + _hlf(32, 18, -90, 9, '#4f9a3a', .5) + `<path d="M25 44l-2-3M40 44l2-3M24 34l-2-3M41 34l2-3" stroke="#9fd070" stroke-width=".8"/>`,
  sauge: () => _hst('M32 54L32 16', '#7a9a82', 2) + _hlf(31, 52, -165, 15, '#9bb8a0', .6) + _hlf(33, 52, -15, 15, '#9bb8a0', .6) + _hlf(31, 42, -150, 12, '#a8c4ac', .55) + _hlf(33, 42, -30, 12, '#a8c4ac', .55) + Array.from({ length: 6 }, (_, i) => _hel(30 + (i % 2) * 4, 30 - i * 3.4, 2.4, 1.8, '#9a7ad8')).join(''),
  trefle: () => _hst('M32 54L32 22', '#4fa04a', 1.6) + _hst('M32 54Q24 46 20 38', '#4fa04a', 1.2) + _hst('M32 54Q40 46 44 38', '#4fa04a', 1.2) + [[32, 22, 1], [20, 38, .7], [44, 38, .7]].map(([x, y, s]) => Array.from({ length: 5 }, (_, i) => { const a = i / 5 * 6.283 - 1.57; return `<circle cx="${x + Math.cos(a) * 5.4 * s}" cy="${y + Math.sin(a) * 5.4 * s}" r="${4.4 * s}" fill="#4fb04a" stroke="${HV_O}" stroke-width=".6"/>`; }).join('') + `<circle cx="${x}" cy="${y}" r="${1.6 * s}" fill="#b8e88a"/>`).join(''),
  menthe: () => _hst('M32 54L32 14', '#3f9a5a', 2) + [[48, 12], [40, 11], [32, 10], [24, 8]].map(([y, l]) => _hlf(32, y, -160, l, '#5ed07a', .75) + _hlf(32, y, -20, l, '#5ed07a', .75)).join('') + _hlf(32, 16, -90, 7, '#7ae090', .8),
  orchidee: () => _hst('M32 54Q29 36 38 14', '#5a8a4a', 1.8) + _hlf(31, 52, -140, 16, '#6a9a58', .25) + _hlf(33, 50, -35, 15, '#6a9a58', .25) + [[38, 14, 1], [33, 25, .9], [29, 36, .8]].map(([x, y, s]) => _hel(x - 4 * s, y - 3 * s, 4 * s, 2.6 * s, '#f08ae0', -35) + _hel(x + 4 * s, y - 3 * s, 4 * s, 2.6 * s, '#f08ae0', 35) + _hel(x - 3.4 * s, y + 2 * s, 3.4 * s, 2 * s, '#e46ad0', 40) + _hel(x + 3.4 * s, y + 2 * s, 3.4 * s, 2 * s, '#e46ad0', -40) + _hel(x, y + 4 * s, 2.6 * s, 3 * s, '#a03ab8') + `<circle cx="${x}" cy="${y}" r="${1.4 * s}" fill="#fff"/>`).join(''),
  edelweiss: () => _hst('M32 54L32 26', '#9ab08a', 2.2) + _hlf(31, 52, -160, 15, '#a8bca0', .5) + _hlf(33, 48, -20, 14, '#a8bca0', .5) + Array.from({ length: 9 }, (_, i) => { const a = i / 9 * 360; return `<path transform="rotate(${a} 32 22)" d="M32 22L29.6 11.5L32 8L34.4 11.5Z" fill="#f4f0e0" stroke="#8a8a78" stroke-width=".5"/>`; }).join('') + `<circle cx="32" cy="22" r="4" fill="#f2d86a" stroke="${HV_O}" stroke-width=".5"/>` + [[31, 21], [33, 22], [32, 23.5], [30.4, 23]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".8" fill="#c9a030"/>`).join(''),
  pandouille: () => _hst('M32 54Q30 38 32 20', '#7a9a3a', 2) + _hlf(31, 50, -155, 15, '#8aaa44') + _hlf(33, 44, -25, 14, '#8aaa44') + `<path d="M32 22C22 24 22 42 32 48C42 42 42 24 32 22Z" fill="#e0822e" stroke="${HV_O}" stroke-width=".8"/><path d="M32 23Q27 36 32 47" stroke="#a85a14" stroke-width=".9" fill="none"/>` + [[28, 32], [36, 32], [28, 39], [36, 39], [32, 28]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#f6d27a" stroke="#a85a14" stroke-width=".4"/>`).join(''),
  ginseng: () => `<path d="M30 54C28 58 29 62 31 63C33 62 35 58 34 54Z" fill="#e8d4a0" stroke="${HV_O}" stroke-width=".7"/><path d="M29 57l-3 1M35 58l3 1" stroke="#c9b078" stroke-width=".8"/>` + _hst('M32 54L32 24', '#6a9a48', 1.8) + [[-90, 12], [-135, 11], [-45, 11], [-165, 8], [-15, 8]].map(([a, l]) => _hlf(32, 24, a, l, '#5fae4a', .28)).join('') + _hst('M32 28Q30 22 29 18', '#6a9a48', 1) + [[28, 16], [31, 14], [30, 18]].map(([x, y]) => _hberry(x, y, 1.8, '#e0402a')).join('') + _hlf(32, 46, -150, 11, '#5fae4a', .3) + _hlf(32, 40, -30, 11, '#5fae4a', .3),
  belladone: () => _hst('M32 54Q34 36 31 16', '#5a3a6a', 2) + _hlf(31, 50, -150, 14, '#4a7a3a', .5) + _hlf(33, 44, -30, 14, '#4a7a3a', .5) + _hlf(31, 36, -145, 11, '#4a7a3a', .5) + _hbell(29, 18, '#8a4aa8', 8, 4.4, 8) + _hbell(35, 26, '#8a4aa8', 7, 4, -10) + [[26, 40], [38, 42], [31, 46]].map(([x, y]) => _hberry(x, y, 3, '#2a1a3a')).join(''),
  mandragore: () => `<path d="M32 38C22 38 21 52 26 56C28 59 36 59 38 56C43 52 42 38 32 38Z" fill="#d8b890" stroke="${HV_O}" stroke-width=".8"/><path d="M23 44l-5 4M41 44l5 4" stroke="#c0a074" stroke-width="2.2" stroke-linecap="round"/><path d="M28 57l-2 5M36 57l2 5" stroke="#c0a074" stroke-width="2.2" stroke-linecap="round"/><path d="M27.5 44q1.6 -1.6 3.2 0M33.3 44q1.6 -1.6 3.2 0" stroke="#3a2410" stroke-width="1" fill="none"/><ellipse cx="32" cy="50" rx="2" ry="2.6" fill="#5a2a1a"/>` + [-90, -125, -55, -155, -25].map((a, i) => _hlf(32, 39, a, [17, 14, 14, 11, 11][i], '#6fb04a', .3)).join(''),
  perceneige: () => _hst('M30 54Q30 32 38 22Q43 18 42 22', '#6fb04a', 1.6) + _hst('M34 54Q36 38 28 30Q24 27 25 31', '#6fb04a', 1.4) + _hlf(31, 54, -115, 24, '#5fa044', .12) + _hlf(33, 54, -70, 24, '#5fa044', .12) + _hlf(32, 54, -95, 20, '#6fb04a', .1) + _hbell(42, 22, '#f4f8ff', 9, 5, -6) + _hbell(25, 31, '#f4f8ff', 8, 4.4, 8) + `<path d="M39 30l3 3l3 -3M23 38l2.4 2.6l2.4 -2.6" stroke="#7ac060" stroke-width="1.1" fill="none"/>`,
};
const PLANT_COL = { ble: '#e9c04a', orge: '#dccf8a', avoine: '#ece3a8', houblon: '#a8d050', lin: '#6aa0f0', seigle: '#cdbb78', riz: '#f3efc8', malt: '#c98a3a', chanvre: '#5fae4a', ortie: '#4f9a3a', sauge: '#9a7ad8', trefle: '#4fb04a', menthe: '#5ed07a', orchidee: '#f08ae0', edelweiss: '#f4f0e0', pandouille: '#e0822e', ginseng: '#e0402a', belladone: '#8a4aa8', mandragore: '#d8b890', perceneige: '#f4f8ff' };
function plantSvg(id, cls = '') { const f = PLANT_ART[id]; return `<svg class="plant ${cls}" viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="55" rx="15" ry="3.2" fill="#0005"/>${f ? f() : ''}</svg>`; }

/* ---------------------------- Ambiance ---------------------------- */
function hvPhase(t = new Date()) { const h = t.getHours(); return h >= 22 || h < 5 ? 'night' : h < 8 ? 'dawn' : h < 18 ? 'day' : h < 22 ? 'dusk' : 'day'; }
const HV_THEME = {
  paysan:     { day: ['#ecd58e', '#b89140'], dawn: ['#f0b890', '#a8803c'], dusk: ['#e89868', '#8a6a30'], night: ['#34406a', '#3a4a30'] },
  alchimiste: { day: ['#a8d0b8', '#4a8a5a'], dawn: ['#c8b0d8', '#4a7a5a'], dusk: ['#9a78b8', '#3a5a4a'], night: ['#262a5a', '#243a3a'] },
};
function harvestTheme(c) { return HV_THEME[c.job][hvPhase()]; }
function hvBack(job) {
  return job === 'paysan'
    ? `<svg class="hv-back" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120Q60 96 130 112T260 104T400 116V200H0Z" fill="#0000002e"/><path d="M0 134Q90 112 190 128T400 122V200H0Z" fill="#00000026"/><g transform="translate(300 62)" fill="#00000040"><path d="M-10 52L-6 14H6L10 52Z"/><path d="M0 14L-22 6M0 14L22 -8M0 14L-8 -22M0 14L16 28" stroke="#00000050" stroke-width="2.4"/></g><path d="M0 150h400" stroke="#00000030" stroke-width="2"/></svg>`
    : `<svg class="hv-back" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><g fill="#0000003a"><path d="M20 120l8-70l8 70Z"/><path d="M52 120l10-90l10 90Z"/><path d="M330 120l9-80l9 80Z"/><path d="M362 120l8-60l8 60Z"/><ellipse cx="200" cy="112" rx="26" ry="12"/><rect x="195" y="112" width="10" height="16"/><ellipse cx="270" cy="118" rx="16" ry="8"/><rect x="266" y="118" width="8" height="12"/></g><path d="M0 134Q90 112 190 128T400 122V200H0Z" fill="#00000026"/></svg>`;
}
const hvSync = p => '-' + ((Date.now() / 1000) % p).toFixed(2) + 's';
function hvAmb(job, phase) {
  const n = 9, night = phase === 'night' || phase === 'dusk', kind = job === 'alchimiste' || night ? 'fly' : 'leaf', t = Date.now() / 1000;
  return `<div class="hv-amb ${kind} ph-${phase}" aria-hidden="true"><b class="hv-sun"></b>${Array.from({ length: n }, (_, i) => { const d = 5 + (i * 7) % 6; return `<i style="left:${(i * 11 + (i * 37) % 17) % 96}%;top:${25 + (i * 23) % 55}%;--d:${d}s;--o:-${((t + i * 1.3) % d).toFixed(2)}s"></i>`; }).join('')}</div>`;
}

/* ---------------------------- Scène de récolte (carte de combat) ---------------------------- */
function harvestStage(h, c) {
  const job = st.jobs[c.job], [qa, qb] = cropQty(st, c), p = clamp(1 - h.wait / harvestMs(st, h), 0, 1), alm = almanaxCrop(c.job, job.lvl) === c.id;
  return `<div class="vs hv-vs"><span class="vs-ic">${GJOB_ICON[c.job]}</span><small>${GATHER_JOBS[c.job].name} ${job.lvl}</small></div>
    <div class="field hv-field j-${c.job}">${hvBack(c.job)}${hvAmb(c.job, hvPhase())}
      <div class="plants" data-k="crops" style="--g:${p.toFixed(2)}">${Array.from({ length: 6 }, (_, i) => `<span class="pl" style="--i:${i}">${plantSvg(c.id)}</span>`).join('')}</div>
      <div class="field-info"><b>${c.name}${alm ? ' <span class="alm-tag" title="Almanax du jour : quantité ×2">★ ×2</span>' : ''}</b><span data-k="stock">${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}</span></div>
      <div data-k="hprog">${bar('job', p, 1)}</div>
      <div class="field-xp"><span>XP ${GATHER_JOBS[c.job].name}</span><span class="num" data-k="jxt">${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}</span></div>
      <div data-k="jxb">${bar('xp thin', job.xp, jobXpToNext(job.lvl))}</div></div>`;
}
function harvestPatch(q, card, h, scene) {
  const c = findPlace('harvest', h.act.id); const job = st.jobs[c.job]; const p = clamp(1 - h.wait / harvestMs(st, h), 0, 1);
  setBar(q('hprog'), p, 1);
  const cr = q('crops'); if (cr) cr.style.setProperty('--g', p.toFixed(2));
  const sk = q('stock'); if (sk) { const [qa, qb] = cropQty(st, c); const tx = `${qa === qb ? qa : `${qa}–${qb}`} par récolte · stock ${fmt(st.res[c.id] || 0)}`; if (sk.textContent !== tx) sk.textContent = tx; }
  const jx = q('jxt'); if (jx) jx.textContent = `${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))}`;
  setBar(q('jxb'), job.xp, jobXpToNext(job.lvl));
  if (scene) { const seq = h.hseq || 0, prev = scene.dataset.hv; scene.dataset.hv = seq; if (prev !== undefined && +prev !== seq) harvestFx(scene, h, c, card.querySelector('[data-k="fighter"]')); }
}
function harvestFx(scene, h, c, unit) {
  const last = h.hlast; if (!last || last.id !== c.id || !FX_OK()) return;
  const pl = scene.querySelector('.plants'); if (!pl) return;
  const plants = [...pl.querySelectorAll('.pl')], pts = plants.map(e => fxPos(scene, e)).filter(Boolean); if (!pts.length) return;
  const col = PLANT_COL[c.id] || '#9ae860', paysan = c.job === 'paysan', mir = last.miracle;
  const head = unit ? heroPick(scene, unit, c, last, pts[0]) : null;
  const first = pts[0], lastP = pts[pts.length - 1], mid = { x: Math.max(80, Math.min(scene.offsetWidth - 80, (first.x + lastP.x) / 2)), y: first.y - 4 };
  // coup de faux / glissement lumineux
  if (paysan) { const s = fxEl(scene, 'hv-slash', first.x - 14, first.y - 18); fxAnim(s, [{ transform: 'translate(0,0) rotate(-14deg) scale(.5,1)', opacity: 0 }, { transform: `translate(${(lastP.x - first.x) * .5}px,-4px) rotate(-6deg) scale(1.1,1)`, opacity: 1, offset: .4 }, { transform: `translate(${lastP.x - first.x + 20}px,6px) rotate(8deg) scale(.7,1)`, opacity: 0 }], { duration: 420, easing: 'ease-in-out' }); }
  else { const s = fxEl(scene, 'hv-glimmer', first.x - 10, first.y - 20); fxAnim(s, [{ transform: 'translate(0,0) scale(.4)', opacity: 0 }, { transform: `translate(${(lastP.x - first.x) * .5}px,-8px) scale(1)`, opacity: 1, offset: .45 }, { transform: `translate(${lastP.x - first.x + 14}px,0) scale(.5)`, opacity: 0 }], { duration: 520, easing: 'ease-in-out' }); }
  plants.forEach((e, i) => {
    if (!e.animate) return; const d = i * 55;
    const an = e.animate(paysan
      ? [{ transform: 'scale(1) rotate(0deg)', opacity: 1 }, { transform: 'scale(.95) translate(14px,6px) rotate(52deg)', opacity: 0, offset: .75 }, { transform: 'scale(.3)', opacity: 0 }]
      : [{ transform: 'scale(1) translateY(0)', opacity: 1 }, { transform: 'scale(1.1) translateY(-16px)', opacity: 0, offset: .7 }, { transform: 'scale(.3)', opacity: 0 }], { duration: 560, delay: d, easing: 'ease-in', fill: 'forwards' });
    an.onfinish = () => { e.classList.add('sprout'); an.cancel(); setTimeout(() => e.classList.remove('sprout'), 800); };
    setTimeout(() => { if (!scene.isConnected || !pts[i]) return; for (let k = 0; k < 4; k++) { const a = fxEl(scene, 'sfx-spark', pts[i].x, pts[i].y, '', `--c:${col}`), ang = Math.random() * 6.28, dd = 10 + Math.random() * 18; fxAnim(a, [{ transform: 'translate(-50%,-50%) scale(1.3)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * dd}px),calc(-50% + ${Math.sin(ang) * dd - 12}px)) scale(.2)`, opacity: 0 }], { duration: 520 }); } }, d + 60);
  });
  // le butin s'envole vers le stock
  const stock = scene.querySelector('[data-k="stock"]'), sp = stock && fxPos(scene, stock), nIc = Math.min(6, last.n);
  setTimeout(() => {
    if (!scene.isConnected) return;
    for (let k = 0; k < nIc; k++) setTimeout(() => {
      if (!scene.isConnected) return; const from = head || pts[k % pts.length], to = sp || { x: mid.x, y: mid.y + 40 };
      const ic = fxEl(scene, 'hv-loot' + (last.alm ? ' alm' : '') + (mir ? ' mir' : ''), from.x, from.y - 6, plantSvg(c.id)), dx = to.x - from.x, dy = to.y - from.y;
      fxAnim(ic, [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: `translate(calc(-50% + ${dx * .15}px),calc(-50% - 34px)) scale(1.1)`, opacity: 1, offset: .3 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.35)`, opacity: .9 }], { duration: 640, easing: 'cubic-bezier(.4,0,.6,1)' });
    }, k * 60);
    setTimeout(() => { if (stock && stock.isConnected) { stock.classList.remove('hv-pulse'); void stock.offsetWidth; stock.classList.add('hv-pulse'); } }, 640);
    const t = fxEl(scene, 'hv-txt', mid.x, mid.y - 30, `+${last.n} ${c.name}`, `--c:${mir ? '#fff3b0' : '#d8f6a0'}`);
    fxAnim(t, [{ transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 }, { transform: 'translate(-50%,-110%) scale(1.1)', opacity: 1, offset: .22 }, { transform: 'translate(-50%,-240%) scale(1)', opacity: 0 }], { duration: 1300 });
    if (unit) { const up = fxPos(scene, unit.querySelector('.sprite') || unit); if (up) { const x = fxEl(scene, 'hv-txt xp', up.x, up.y - 56, `+${last.xp} XP`); fxAnim(x, [{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-120%) scale(1)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-230%)', opacity: 0 }], { duration: 1200 }); } }
  }, head ? 760 : 260);
  if (last.alm) setTimeout(() => { if (!scene.isConnected) return; const t = fxEl(scene, 'hv-txt alm', mid.x, mid.y + 10, '★ Almanax ×2'); fxAnim(t, [{ transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 }, { transform: 'translate(-50%,-130%) scale(1)', opacity: 1, offset: .25 }, { transform: 'translate(-50%,-220%)', opacity: 0 }], { duration: 1200 }); }, 520);
  if (mir) { // Récolte miraculeuse
    pl.classList.add('mir'); setTimeout(() => pl.classList.remove('mir'), 1100);
    const f = fxEl(scene, 'hv-miracle', mid.x, mid.y); fxAnim(f, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(5)', opacity: 0 }], { duration: 800 });
    for (let k = 0; k < 3; k++) { const b = fxEl(scene, 'hv-ray', first.x + (lastP.x - first.x) * (k + .5) / 3, mid.y + 20); fxAnim(b, [{ transform: 'translate(-50%,-100%) scaleY(0)', opacity: 0 }, { transform: 'translate(-50%,-100%) scaleY(1)', opacity: .9, offset: .3 }, { transform: 'translate(-50%,-100%) scaleY(1)', opacity: 0 }], { duration: 900, delay: k * 80 }); }
    for (let k = 0; k < 26; k++) { const a = Math.random() * 6.28, dd = 30 + Math.random() * 70, s = fxEl(scene, 'sfx-spark', mid.x, mid.y, '', `--c:${['#ffd24a', '#fff3b0', '#ffb02e'][k % 3]}`); fxAnim(s, [{ transform: 'translate(-50%,-50%) scale(1.8)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * dd * 1.4}px),calc(-50% + ${Math.sin(a) * dd * .7 - 10}px)) scale(.1)`, opacity: 0 }], { duration: 700 + Math.random() * 400 }); }
    const t = fxEl(scene, 'hv-txt mir', mid.x, mid.y - 14, '✨ MIRACLE ×3 ✨'); fxAnim(t, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-90%) scale(1.15)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-110%) scale(1)', opacity: 1, offset: .75 }, { transform: 'translate(-50%,-170%)', opacity: 0 }], { duration: 1700 });
  }
  if (last.rankUp) setTimeout(() => { if (!scene.isConnected) return; const t = fxEl(scene, 'hv-txt rank', mid.x, mid.y + 30, `Maîtrise : ${last.rankUp} !`); fxAnim(t, [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: 'translate(-50%,-100%) scale(1.1)', opacity: 1, offset: .25 }, { transform: 'translate(-50%,-190%)', opacity: 0 }], { duration: 1800 }); }, 700);
}

/* Le héros se penche, fauche / cueille, puis brandit sa récolte au-dessus de sa tête */
const HV_TOOL = (blade, handle) => `<svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true"><path d="M6 35L23 13" stroke="${handle}" stroke-width="3.4" stroke-linecap="round"/><path d="M21 15C29 3 39 9 36 21C33 13 28 12 21 15Z" fill="${blade}" stroke="#1e2a14" stroke-width="1.1" stroke-linejoin="round"/><path d="M26 11C31 9 34 12 34 16" stroke="#fff9" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>`;
function heroPick(scene, unit, c, last, plantPt) {
  const sp = unit.querySelector('.sprite'); if (!sp || !scene.isConnected) return null;
  const p = fxPos(scene, sp); if (!p) return null;
  const paysan = c.job === 'paysan', mir = last.miracle, head = { x: p.x + 54, y: p.y - sp.offsetHeight * .5 };
  if (sp.animate) sp.animate([
    { transform: 'translate(0,0) rotate(0deg) scale(1,1)' },
    { transform: 'translate(-4px,2px) rotate(-8deg) scale(1.03,.96)', offset: .24 },
    { transform: 'translate(11px,8px) rotate(13deg) scale(1.05,.88)', offset: .5 },
    { transform: 'translate(0,-7px) rotate(-2deg) scale(.97,1.06)', offset: .78 },
    { transform: 'translate(0,0) rotate(0deg) scale(1,1)' }], { duration: 680, easing: 'ease-in-out' });
  // l'outil : faux du Paysan, serpette dorée de l'Alchimiste
  const tool = fxEl(scene, 'hv-tool', p.x + 24, p.y + 2, HV_TOOL(paysan ? '#dfe6ea' : '#ffe58a', paysan ? '#8a5a2a' : '#6a4a22'));
  fxAnim(tool, [{ transform: 'translate(-20%,-85%) rotate(-95deg) scale(.7)', opacity: 0 }, { transform: 'translate(-20%,-85%) rotate(-60deg) scale(1)', opacity: 1, offset: .2 }, { transform: 'translate(-8%,-70%) rotate(35deg) scale(1.05)', opacity: 1, offset: .5 }, { transform: 'translate(-8%,-70%) rotate(55deg) scale(.9)', opacity: 0 }], { duration: 640, easing: 'ease-in-out' });
  const arc = fxEl(scene, 'hv-arc', p.x + 30, p.y - 4); fxAnim(arc, [{ transform: 'translate(-30%,-80%) rotate(-30deg) scale(.4)', opacity: 0 }, { transform: 'translate(-30%,-80%) rotate(10deg) scale(1)', opacity: .95, offset: .45 }, { transform: 'translate(-30%,-60%) rotate(40deg) scale(1.05)', opacity: 0 }], { duration: 520, delay: 120 });
  // la récolte est brandie au-dessus de la tête
  setTimeout(() => {
    if (!scene.isConnected) return;
    const from = plantPt || { x: p.x + 60, y: p.y }, it = fxEl(scene, 'hv-held' + (mir ? ' mir' : ''), from.x, from.y - 6, plantSvg(c.id)), dx = head.x - from.x, dy = head.y - from.y;
    fxAnim(it, [{ transform: 'translate(-50%,-50%) scale(.3) rotate(-30deg)', opacity: 0 }, { transform: `translate(calc(-50% + ${dx * .55}px),calc(-50% + ${dy - 22}px)) scale(1.2) rotate(12deg)`, opacity: 1, offset: .38 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.45) rotate(0deg)`, opacity: 1, offset: .55 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy - 4}px)) scale(1.35)`, opacity: 1, offset: .86 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy - 12}px)) scale(.6)`, opacity: 0 }], { duration: 900, easing: 'cubic-bezier(.3,.7,.4,1)' });
    const n = fxEl(scene, 'hv-held-n', head.x + 18, head.y + 8, '×' + last.n); fxAnim(n, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 0 }, { transform: 'translate(-50%,-70%) scale(1.25)', opacity: 1, offset: .35 }, { transform: 'translate(-50%,-100%) scale(1)', opacity: 1, offset: .8 }, { transform: 'translate(-50%,-150%) scale(.9)', opacity: 0 }], { duration: 900, delay: 160 });
    for (let k = 0; k < (mir ? 12 : 5); k++) { const a = -Math.PI * (.15 + Math.random() * .7), dd = 16 + Math.random() * 22, s = fxEl(scene, 'sfx-spark', head.x, head.y, '', `--c:${mir ? '#ffd24a' : PLANT_COL[c.id] || '#d8f6a0'}`); fxAnim(s, [{ transform: 'translate(-50%,-50%) scale(1.4)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.4)', opacity: 1, offset: .3 }, { transform: `translate(calc(-50% + ${Math.cos(a) * dd}px),calc(-50% + ${Math.sin(a) * dd}px)) scale(.1)`, opacity: 0 }], { duration: 650, delay: 340 }); }
  }, 280);
  return head;
}
/* Vue Récolte : chaque récolte fait réagir la carte de la plante (la vue se redessine seulement toutes les 1,5 s) */
const HV_SEEN = {};
function harvestViewFx(on) {
  if (!on) { for (const k in HV_SEEN) delete HV_SEEN[k]; return false; }
  let played = false;
  for (const h of st.heroes) {
    if (!h.act || h.act.type !== 'harvest') { delete HV_SEEN[h.id]; continue; }
    const seq = h.hseq || 0, prev = HV_SEEN[h.id]; HV_SEEN[h.id] = seq;
    const last = h.hlast; if (prev === undefined || prev === seq || !last || last.id !== h.act.id) continue;
    const card = document.querySelector(`.pcard[data-crop="${last.id}"]`), art = card && card.querySelector('.pc-art'); if (!art || !FX_OK()) continue;
    played = true;
    const col = last.miracle ? '#ffd24a' : PLANT_COL[last.id] || '#9ae860', svg = art.querySelector('.plant');
    if (svg && svg.animate) svg.animate([{ transform: 'scale(1,1) rotate(0deg)' }, { transform: 'scale(1.22,.8) rotate(-4deg)', offset: .2 }, { transform: 'scale(.88,1.2) translateY(-6px) rotate(5deg)', offset: .5 }, { transform: 'scale(1,1) rotate(0deg)' }], { duration: 560, easing: 'ease-out' });
    const t = document.createElement('span'); t.className = 'pc-pop' + (last.miracle ? ' mir' : last.alm ? ' alm' : ''); t.textContent = (last.miracle ? '✨ ' : '+') + last.n; art.appendChild(t); setTimeout(() => t.remove(), 1300);
    for (let k = 0; k < (last.miracle ? 16 : 7); k++) { const e = document.createElement('i'); e.className = 'pc-leaf'; e.style.setProperty('--c', col); art.appendChild(e); const a = Math.random() * 6.28, d = 28 + Math.random() * 34;
      if (e.animate) { const an = e.animate([{ transform: 'translate(-50%,-50%) scale(1.2)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d * .7 - 14}px)) scale(.1)`, opacity: 0 }], { duration: 520 + Math.random() * 300, easing: 'ease-out' }); an.onfinish = () => e.remove(); } else e.remove(); }
    if (last.miracle) { const f = document.createElement('b'); f.className = 'pc-flash'; art.appendChild(f); setTimeout(() => f.remove(), 800); }
    const stk = card.querySelector('.pc-stock'); if (stk) { stk.textContent = short(st.res[last.id] || 0); stk.classList.remove('hv-pulse'); void stk.offsetWidth; stk.classList.add('hv-pulse'); }
  }
  return played;
}

/* ---------------------------- Vue : Récolte (Champs & Herbier) ---------------------------- */
const GJOB_ICON = { paysan: '🌾', alchimiste: '🧪' };
function renderRecolte() {
  const jid = GATHER_JOBS[ui.gjob] ? ui.gjob : Object.keys(GATHER_JOBS)[0];
  const job = st.jobs[jid], jd = GATHER_JOBS[jid], phase = hvPhase();
  const jobs = Object.entries(GATHER_JOBS).map(([id, j]) => { const s = st.jobs[id]; const n = st.heroes.filter(h => h.act && h.act.type === 'harvest' && findPlace('harvest', h.act.id).job === id).length;
    return `<button class="jrow at-job" data-act="gjob" data-v="${id}" aria-pressed="${jid === id}"><span class="at-ico">${GJOB_ICON[id]}</span><span class="jr-body"><span class="jr-top"><b>${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span><small>${j.makes}${n ? ` · ${n} au travail` : ''}</small>${bar('job thin', s.xp, jobXpToNext(s.lvl))}</span></button>`; }).join('');
  const crops = CROPS.filter(c => c.job === jid);
  const ms = msToMidnight();
  const almHtml = `<div class="almanax"><div class="alm-head"><small class="label">★ Almanax du jour</small><span class="sub">Quantité récoltée ×${ALMANAX_MULT} jusqu’à minuit · encore ${Math.floor(ms / 3600000)} h ${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}</span></div>
    <div class="alm-items">${Object.entries(GATHER_JOBS).map(([id, j]) => { const ac = CROPS.find(x => x.id === almanaxCrop(id, st.jobs[id].lvl)); const here = st.heroes.filter(h => h.act && h.act.type === 'harvest' && h.act.id === ac.id).length;
      return `<button class="alm-it${here ? ' on' : ''}" data-act="gjob" data-v="${id}"><span class="alm-ico">${plantSvg(ac.id)}<i>★</i></span><span class="alm-t"><small>${j.name}</small><b class="display">${ac.name}</b><span class="sub">${here ? 'Un héros en profite' : '×' + ALMANAX_MULT + ' aujourd’hui'}</span></span></button>`; }).join('')}</div></div>`;
  const known = crops.filter(c => job.lvl >= c.lvl).length, total = crops.reduce((a, c) => a + (((st.mastery || {})['h_' + c.id]) || 0), 0);
  const now = Date.now();
  const cards = crops.map(c => {
    const locked = job.lvl < c.lvl, m = harvestMastery(st, c), [qa, qb] = cropQty(st, c), isAlm = c.id === almanaxCrop(c.job, job.lvl);
    const prog = m.next ? (m.n - m.rank.at) / (m.next.at - m.rank.at) : 1;
    const workers = st.heroes.filter(h => h.act && h.act.type === 'harvest' && h.act.id === c.id);
    const wk = workers.map(h => { const tot = harvestMs(st, h), el = clamp(tot - h.wait, 0, tot); return `<div class="pc-w"><span class="pc-wn">${esc(h.name)}</span><div class="bar job thin"><i class="hv-pbar" style="animation-duration:${tot}ms;animation-delay:-${Math.round(el)}ms"></i></div></div>`; }).join('');
    const sends = locked ? `<span class="lockt">🔒 ${jd.name} niveau ${c.lvl}</span>` : st.heroes.length ? st.heroes.map(h => { const there = h.act && h.act.type === 'harvest' && h.act.id === c.id;
      return heroChip(h, `data-act="send" data-hero="${h.id}" data-type="harvest" data-id="${c.id}" ${there ? 'disabled' : ''}`, there ? 'Récolte ici' : h.act ? `Quitte ${esc(placeName(h.act))}` : 'Disponible', (there ? 'here' : '') + ' sm'); }).join('') : '<span class="sub">Recrute un héros d’abord.</span>';
    return `<article data-crop="${c.id}" class="pcard${locked ? ' locked' : ''}${isAlm ? ' is-alm' : ''}${workers.length ? ' busy' : ''}${m.i >= 3 ? ' master' : ''}">
      <div class="pc-art"><div class="pc-glow" style="--c:${PLANT_COL[c.id]}"></div>${plantSvg(c.id, locked ? 'sil' : '')}<span class="pc-lv">Niv. ${c.lvl}</span>${isAlm && !locked ? '<span class="pc-star">★ ×2</span>' : ''}${locked ? '' : `<span class="pc-stock num" title="En stock">${short(st.res[c.id] || 0)}</span>`}</div>
      <div class="pc-main"><b class="pc-name">${locked ? '???' : esc(c.name)}</b><small class="sub">${locked ? 'Plante à découvrir' : esc(c.where)}</small>
        ${locked ? '' : `<div class="pc-rank"><span class="mrank m${m.i}"><span class="pips">${Array.from({ length: 4 }, (_, k) => `<i class="${k < m.i ? 'on' : ''}"></i>`).join('')}</span>${m.name}</span><small class="sub num">${m.next ? `${fmt(m.n)} / ${fmt(m.next.at)}` : `${fmt(m.n)} récoltes`}</small></div><div class="bar mast thin"><i style="width:${(prog * 100).toFixed(0)}%"></i></div>
        <div class="pc-stats"><span>${qa === qb ? qa : `${qa}–${qb}`}<small>/ récolte</small></span><span>+${c.xp}<small>XP</small></span><span>${c.value}<small>K pièce</small></span><span title="Chance de Récolte miraculeuse (×3)">${(MIRACLE_BASE + m.rank.mir).toFixed(1).replace('.', ',')} %<small>miracle</small></span>${m.rank.qty ? `<span>+${m.rank.qty} %<small>qté</small></span>` : ''}</div>`}</div>
      <div class="pc-send">${wk}${sends}</div></article>`;
  }).join('');
  return `<div class="split at-split hv-split"><aside class="joblist">${jobs}</aside><section class="panel at-panel hv-panel hv-${jid} hv-${phase}" style="--p36:${hvSync(3.6)};--p32:${hvSync(3.2)};--p40:${hvSync(4)};--p24:${hvSync(2.4)}">
    ${almHtml}
    <div class="at-banner hv-banner"><div class="at-emblem"><span>${GJOB_ICON[jid]}</span></div><div class="at-bmain"><h3 class="display">${jd.name} <span class="lvl">Niv. ${job.lvl}</span></h3><small class="sub">${jd.text}</small>${bar('job', job.xp, jobXpToNext(job.lvl))}<span class="sub num">${fmt(job.xp)} / ${fmt(jobXpToNext(job.lvl))} XP</span></div>
      <div class="at-bstat"><b class="num">${known}/${crops.length}</b><small>Herbier</small></div>${hvAmb(jid, phase)}</div>
    <div class="hv-sums"><span>🌱 <b class="num">${fmt(total)}</b> récoltes</span><span>⏱ une récolte toutes les <b>${HARVEST_MS / 1000} s</b> (plus vite avec des outils)</span><span>✨ <b class="num">${fmt((st.stats.miracles) || 0)}</b> miracles</span></div>
    <div class="pc-grid">${cards}</div>
    <p class="hint">Chaque plante se maîtrise avec le temps : plus de quantité et plus de chances de <b>Récolte miraculeuse</b> (×3 quantité, ×2 XP). La quantité augmente de 1 tous les 10 niveaux au-dessus du palier.</p></section></div>`;
}
