/* =====================================================================
   AMAKNA IDLE — STEAMER : interface de combat
   Parc de tourelles (3 emplacements, 3 niveaux chacune), jauge de Pression, états des ennemis
   (Brûlure, Trempé, Fissure, Magnétisé), coups reçus par les tourelles, évolutions, Surcharge Stasis.
   Chargé avant ui2.js : seules des fonctions et des constantes sans dépendance y sont définies.
   ===================================================================== */
const SURGE_ICON = `<svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="18.6" fill="none" stroke="#e2b04a" stroke-width="3.6" stroke-dasharray="6 3.6"/><circle cx="22" cy="22" r="14.6" fill="#241044" stroke="#6a3a08" stroke-width="1.6"/><path d="M25 7 L12.6 24.4 H20.6 L17.6 37.6 L31.6 18.6 H23.4 Z" fill="#fff2a8" stroke="#7a3a08" stroke-width="1.8" stroke-linejoin="round"/><path d="M22.6 11 L16.4 21" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/></svg>`;
const STM_TIPS = {
  off: 'Tourelle offensive : chaque sort d’attaque la réveille. Elle tire avec l’élément du sort, un canon par niveau.',
  def: 'Tourelle défensive : soigne le Steamer (+50 % avec l’Eau) et répare les autres tourelles.',
  tac: 'Tourelle tactique : peut magnétiser un ennemi, qui perd son prochain tour.',
};
const STM_SEEN = new Set(), STM_PREV = {};
function steamGauge(h) {
  const p = clamp((h.steam || 0) / STM_STEAM_MAX, 0, 1);
  return `<div class="fury steam${p >= 1 ? ' full' : ''}" data-k="steam" title="Pression : ${Math.floor(h.steam || 0)} / ${STM_STEAM_MAX}. Chaque activation de tourelle (et chaque Vapeur) la remplit. Pleine, déclenche la Surcharge Stasis !"><span class="fury-fill" style="--p:${p.toFixed(3)}"></span><span class="fury-lbl">${p >= 1 ? 'SURCHARGE !' : 'Pression ' + Math.floor(p * 100) + ' %'}</span></div>`;
}
/* Puces d'états posées sous la barre de vie d'un ennemi */
function stmMonChips(m) {
  return `${m.burn ? '<i class="c-b" title="Brûlure : dégâts sur la durée">🔥</i>' : ''}${m.wet > 0 ? '<i class="c-w" title="Trempé : −15 % de dégâts infligés. Le Feu le fait réagir en Vapeur.">💧</i>' : ''}${m.crack ? '<i class="c-c" title="Fissure : +15 % de dégâts reçus">⛰️</i>' : ''}${m.mag ? '<i class="c-m" title="Magnétisé : perd son prochain tour">🧲</i>' : ''}`;
}
function turretHtml(h, f, s) {
  const has = stmHas(h, s), T = f && f.tur && f.tur[s];
  const lv = stmLvl(h, f, s), stt = !has ? 'lock' : T && T.hp <= 0 ? 'down' : 'idle';
  const key = h.id + ':' + s, prev = STM_PREV[key];
  const cls = [];
  if (has && !STM_SEEN.has(key)) { STM_SEEN.add(key); cls.push('deploy'); }
  if (has && prev === 'down' && stt !== 'down') cls.push('repair');
  STM_PREV[key] = stt;
  const pct = T ? clamp(T.hp / T.max * 100, 0, 100) : 100;
  return `<div class="tur tur-${s} ${cls.join(' ')}" data-s="${s}" data-lv="${lv}" data-st="${stt}" title="${has ? esc(STM_NAMES[s]) + ' · niveau ' + STM_ROMAN[lv] + ' — ' + STM_TIPS[s] : esc(STM_NAMES[s]) + ' : disponible au niveau ' + STM_UNLOCK[s]}">
    <div class="tur-art">${has ? STM_TURRET[s] : ''}</div>
    <div class="tur-pad" aria-hidden="true"><span>🔒 niv. ${STM_UNLOCK[s]}</span></div>
    <div class="tur-bar"><i style="width:${pct.toFixed(0)}%"></i></div><b class="tur-lv">${STM_ROMAN[lv]}</b></div>`;
}
function yardHtml(h) {
  return `<div class="yard${h.act ? '' : ' fold'}" data-k="yard" data-boost="${stmBoost(h.fight) ? 1 : 0}">${['def', 'tac', 'off'].map(s => turretHtml(h, h.fight, s)).join('')}</div>`;
}
function stmTurAnim(el, cls, ms) { ecaState(el, cls, ms); }
/* Fumée noire d'une tourelle en panne */
function stmSmoke(el) {
  if (!FX_OK()) return;
  for (let i = 0; i < 6; i++) { const s = document.createElement('i'); s.className = 'stm-smoke'; s.style.cssText = `--dx:${(Math.random() * 30 - 15).toFixed(0)}px;--s:${(10 + Math.random() * 10).toFixed(0)}px;animation-delay:${i * 90}ms`; el.appendChild(s); setTimeout(() => s.remove(), 1600); }
}
/* Particules d'un état gagné par un ennemi */
function stmStatusBurst(el, kind) {
  if (!el || !FX_OK()) return;
  const sym = { b: '🔥', w: '💧', c: '🪨', m: '⚡' }[kind];
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('i'); s.className = 'stp stp-' + kind; s.textContent = sym;
    s.style.cssText = `--dx:${(Math.random() * 44 - 22).toFixed(0)}px;--dy:${kind === 'w' ? (10 + Math.random() * 26).toFixed(0) : (-14 - Math.random() * 30).toFixed(0)}px;animation-delay:${(i * 60).toFixed(0)}ms`;
    el.appendChild(s); setTimeout(() => s.remove(), 1400);
  }
}
/* Mise à jour des états d'un ennemi (puces, teinte, particules des états nouvellement gagnés) */
function stmMonPatch(el, m, mhp) {
  const alive = mhp > 0, k = (alive && m.burn ? 'b' : '') + (alive && m.wet > 0 ? 'w' : '') + (alive && m.crack ? 'c' : '') + (alive && m.mag ? 'm' : '');
  if (el._stm === k) return;
  const old = el._stm || '';
  el._stm = k;
  const box = el.querySelector('[data-k="mst"]'); if (box) box.innerHTML = alive ? stmMonChips(m) : '';
  for (const c of 'bwcm') { el.classList.toggle('st-' + c, k.includes(c)); if (k.includes(c) && !old.includes(c)) stmStatusBurst(el, c); }
}
function stmDecoyFx(card, fx) {
  const el = card.querySelector(`.tur[data-s="${fx.s}"]`); if (!el) return;
  floatNum(el, '−' + fmt(fx.v), 'dmg');
  ecaState(el, 'struck', 450);
  if (fx.broke) { ecaState(el, 'broke', 1100); stmSmoke(el); ecaText(card, '🔧 TOURELLE HORS SERVICE', '', 'stm'); }
}
function stmEvoFx(card, fx) {
  const el = card.querySelector(`.tur[data-s="${fx.s}"]`); if (!el) return;
  ecaState(el, 'evo', 1300); floatNum(el, `NIVEAU ${STM_ROMAN[fx.lvl]} !`, 'evo');
  coinBurst(el, 9, '⚙️');
}
/* Mise à jour de tout ce qui est propre au Steamer dans la carte de combat */
function stmPatch(card, h, scene) {
  const fu = card.querySelector('[data-k="fighter"]'), sp = fu && fu.querySelector('.sprite'), f = h.fight;
  const pr = clamp((h.steam || 0) / STM_STEAM_MAX, 0, 1);
  if (sp) { const v = pr.toFixed(3); if (sp.style.getPropertyValue('--pr') !== v) sp.style.setProperty('--pr', v); }
  const alive = !!f && f.mons.some(m => m.hp > 0);
  if (fu) fu.classList.toggle('stm-ready', steamReady(h) && !!f);
  const g = card.querySelector('[data-k="steam"]');
  if (g) { g.firstElementChild.style.setProperty('--p', pr.toFixed(3)); g.classList.toggle('full', pr >= 1); const lb = g.lastElementChild, tx = pr >= 1 ? 'SURCHARGE !' : 'Pression ' + Math.floor(pr * 100) + ' %'; if (lb.textContent !== tx) lb.textContent = tx; }
  const btn = card.querySelector('[data-k="steambtn"]');
  if (btn) { const show = steamReady(h) && alive && !FURY_ANIM[h.id]; if (btn.hidden === show) btn.hidden = !show; }
  const yard = card.querySelector('[data-k="yard"]');
  if (yard) {
    yard.classList.toggle('fold', !h.act); yard.dataset.boost = stmBoost(f) ? 1 : 0;
    for (const s of STM_SLOTS) {
      const el = yard.querySelector(`.tur[data-s="${s}"]`); if (!el) continue;
      const has = stmHas(h, s), T = f && f.tur && f.tur[s], lv = stmLvl(h, f, s), stt = !has ? 'lock' : T && T.hp <= 0 ? 'down' : 'idle';
      if (has && !el.querySelector('.tur-svg')) { el.querySelector('.tur-art').innerHTML = STM_TURRET[s]; stmTurAnim(el, 'deploy', 1200); STM_SEEN.add(h.id + ':' + s); }
      for (const c of ['deploy', 'repair']) if (el.classList.contains(c) && !el['_x' + c]) { el['_x' + c] = 1; setTimeout(() => { el.classList.remove(c); el['_x' + c] = 0; }, 1300); } // l'animation ne doit pas se rejouer quand une autre classe la remplace
      if (+el.dataset.lv !== lv && !(el._hold > Date.now())) { const up = lv > +el.dataset.lv; el.dataset.lv = lv; if (up) stmTurAnim(el, 'tier', 1100); } // (le niveau gagné par l'expérience attend l'animation d'évolution)
      if (el.dataset.st !== stt) { const was = el.dataset.st; el.dataset.st = stt; if (was === 'down' && stt === 'idle') stmTurAnim(el, 'repair', 1100); STM_PREV[h.id + ':' + s] = stt; }
      const bar = el.querySelector('.tur-bar > i'); if (bar) { const w = (T ? clamp(T.hp / T.max * 100, 0, 100) : 100).toFixed(0) + '%'; if (bar.style.width !== w) bar.style.width = w; }
      const lb = el.querySelector('.tur-lv'); if (lb) { const tx = STM_ROMAN[lv] + (stmBoost(f) && stmBaseLvl(h, s) < 3 ? '▲' : ''); if (lb.textContent !== tx) lb.textContent = tx; }
    }
  }
  if (f && scene) {
    const dc = f.decoySeq || 0; if (dc > +(scene.dataset.dc || 0) && f.decoyFx) stmDecoyFx(card, f.decoyFx); scene.dataset.dc = dc;
    const eo = f.evoSeq || 0;
    if (eo > +(scene.dataset.eo || 0) && f.evoFx) { const fx = f.evoFx, el = card.querySelector(`.tur[data-s="${fx.s}"]`); if (el) el._hold = Date.now() + 620; setTimeout(() => { stmEvoFx(card, fx); if (el) el._hold = 0; patchCombat(); }, 560); } // après les tirs du tour
    scene.dataset.eo = eo;
  } else if (scene) { scene.dataset.dc = 0; scene.dataset.eo = 0; }
}

/* =====================================================================
   SURCHARGE STASIS — la cinématique
   La chaudière du Steamer est à bloc : des conduits de Stasis relient son cœur aux trois tourelles, qui crachent ensemble trois salves
   (Eau → Feu → Terre). Si le Feu frappe des ennemis trempés, la Vapeur explose. La Défensive soigne, la Tactique magnétise.
   ===================================================================== */
const SG_GEAR = (() => {
  const teeth = Array.from({ length: 18 }, (_, i) => `<rect x="94" y="1" width="12" height="15" rx="2.4" transform="rotate(${i * 20} 100 100)"/>`).join('');
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><g class="sp"><g fill="#6a2fd0" stroke="#e6c8ff" stroke-width="1.6">${teeth}</g><circle cx="100" cy="100" r="86" fill="none" stroke="#e6c8ff" stroke-width="3.4"/><circle cx="100" cy="100" r="70" fill="none" stroke="#b56bff" stroke-width="2.4" stroke-dasharray="3 7"/><circle cx="100" cy="100" r="54" fill="none" stroke="#e6c8ff" stroke-width="2"/></g><circle cx="100" cy="100" r="30" fill="#b56bff33" stroke="#e6c8ff" stroke-width="2"/></svg>`;
})();
function playSurge(card, h, k) {
  const scene = card.querySelector('.scene'), fu = card.querySelector('[data-k="fighter"]'), sp = fu && fu.querySelector('.sprite');
  const mons = [...card.querySelectorAll('.unit.mon:not(.dead)')];
  let res = null;
  if (!scene || !sp || !FX_OK() || !mons.length) { // mouvement réduit : pas de cinématique, juste les effets de jeu
    setTimeout(() => { res = k.pay(); }, 150); setTimeout(() => k.release(), 500); setTimeout(k.done, 900);
    return;
  }
  const held = {}; mons.forEach(m => { held[+m.dataset.mon] = +m.dataset.hp; });
  const apply = hits => { (hits || []).forEach(x => { if (x) held[x.i] = Math.max(0, (held[x.i] != null ? held[x.i] : 0) - x.v); }); k.hold(held); };
  const T = { pay: 1300, v1: 1300, v2: 1950, end: 5200 };
  const hp = relPos(sp, scene), sw = sp.offsetWidth, sh = sp.offsetHeight, W = hp.w, H = hp.h;
  const foes = mons.map(m => { const s = m.querySelector('.sprite') || m, p = relPos(s, scene); return { x: p.x, y: p.y, g: p.y + s.offsetHeight * .42, el: m, i: +m.dataset.mon }; });
  const byI = {}; foes.forEach(p => { byI[p.i] = p; });
  const fx = foes.reduce((a, p) => a + p.x, 0) / foes.length, gy = Math.max(...foes.map(p => p.g));
  const turs = STM_SLOTS.filter(s => stmHas(h, s)).map(s => { const el = card.querySelector(`.tur[data-s="${s}"]`); if (!el) return null; const p = relPos(el.querySelector('.tur-art') || el, scene); return { s, el, x: p.x, y: p.y }; }).filter(Boolean);
  const core = { x: hp.x - sw * .25, y: hp.y + sh * .06 }, muz = { x: hp.x + sw * .47, y: hp.y + sh * .05 };
  const ov = document.createElement('div'); ov.className = 'surge';
  const paths = turs.map(t => `M${core.x.toFixed(0)} ${core.y.toFixed(0)}C${(core.x - 20).toFixed(0)} ${(core.y - H * .42).toFixed(0)} ${(t.x - 10).toFixed(0)} ${(t.y - H * .5).toFixed(0)} ${t.x.toFixed(0)} ${(t.y - 6).toFixed(0)}`);
  const sealBox = (cx, cy, w) => `left:${(cx - w / 2).toFixed(0)}px;top:${(cy - w * .17).toFixed(0)}px;width:${w.toFixed(0)}px;height:${(w * .34).toFixed(0)}px`;
  const spread = foes.length > 1 ? Math.max(...foes.map(p => p.x)) - Math.min(...foes.map(p => p.x)) : 0;
  ov.innerHTML = `<div class="sg-dark"></div><div class="sg-flash"></div>
    <div class="sg-seal h" style="${sealBox(hp.x, hp.y + sh * .42, sw * 2.2)}">${SG_GEAR}</div>
    ${foes.map(p => `<div class="sg-seal f" style="${sealBox(p.x, p.g, sw * 2.3)}">${SG_GEAR}</div>`).join('')}
    <svg class="sg-pipes" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${paths.map(d => `<path class="o" pathLength="100" d="${d}"/><path class="c" pathLength="100" d="${d}"/><path class="e" pathLength="100" d="${d}"/>`).join('')}</svg>
    <div class="sg-title" style="--fs:${Math.round(Math.min(H * .19, W * .095))}px"><span>SURCHARGE</span><b>STASIS</b></div>`;
  const fg = document.createElement('div'); fg.className = 'surge-fg'; // effets au-dessus des ennemis (qui restent bien visibles sous le voile sombre)
  scene.appendChild(ov); scene.appendChild(fg); scene.classList.add('sg-on');
  const live = () => ov.isConnected, at = (ms, fn) => setTimeout(() => { if (live()) fn(); }, ms);
  const an = (el, kf, o) => el.animate(kf, Object.assign({ duration: 400, fill: 'forwards', easing: 'ease-out' }, o));
  const q = s => ov.querySelector(s), qa = s => [...ov.querySelectorAll(s)];
  const add = (cls, css, ms, html) => { const e = document.createElement('i'); e.className = cls; e.style.cssText = css; if (html) e.innerHTML = html; fg.appendChild(e); if (ms) setTimeout(() => e.remove(), ms); return e; };
  const shake = () => { scene.classList.remove('cl-shake'); void scene.offsetWidth; scene.classList.add('cl-shake'); setTimeout(() => scene.classList.remove('cl-shake'), 560); };
  const flash = (c, a, ms) => { const f = q('.sg-flash'); f.style.background = c; an(f, [{ opacity: a }, { opacity: 0 }], { duration: ms }); };
  const nums = (hits, cls) => (hits || []).forEach(x => { if (!x) return; const p = byI[x.i]; if (!p) return;
    const dy = { eau: 46, feu: 70, vap: 58, terre: 84 }[cls] || 50, n = add('cl-num sg-num ' + cls + (x.crit ? ' crit' : ''), `left:${p.x.toFixed(0)}px;top:${(p.y - dy).toFixed(0)}px`, 1700); n.textContent = '−' + fmt(x.v);
    p.el.classList.add('cl-hit'); setTimeout(() => p.el.classList.remove('cl-hit'), 900); });
  const sources = () => [{ x: muz.x, y: muz.y, el: null }, ...turs];
  const volley = (el, hits) => { // chaque source (le canon du héros et les trois tourelles) tire sur chaque ennemi touché
    const live2 = hits.filter(Boolean); let n = 0;
    sources().forEach((src, j) => live2.forEach((x, m) => {
      const p = byI[x.i]; if (!p) return;
      setTimeout(() => {
        if (!live()) return;
        if (src.el) ecaState(src.el, 'fire', 420);
        else heroGesture(fu, 'atk');
        const d = stmBolt(scene, { x: src.x, y: src.y }, { x: p.x + stmR(-10, 10), y: p.y + stmR(-8, 8) }, { c: STM_COL[el], size: src.el ? 9 : 13, dur: 290, lift: 14 + j * 7, cls: el === 'feu' ? 'fire' : el });
        setTimeout(() => stmHit(scene, { x: p.x + stmR(-8, 8), y: p.y }, el, .8), d);
      }, j * 80 + m * 45 + (n++ % 2) * 20);
    }));
  };
  // ---- 0 : la chaudière s'emballe, les conduits s'allument ----
  ecaState(fu, 'stm-surge', T.end - 700);
  an(q('.sg-dark'), [{ opacity: 0 }, { opacity: 1 }], { duration: 600 });
  at(80, () => { const e = q('.sg-seal.h'); e.classList.add('on'); an(e, [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700 }); });
  qa('.sg-seal.f').forEach((e, i) => at(450 + i * 160, () => { e.classList.add('on'); an(e, [{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700 }); }));
  qa('.sg-pipes path').forEach((p, i) => { const g = Math.floor(i / 3); p.style.strokeDasharray = i % 3 === 2 ? '3 5' : '100'; if (i % 3 !== 2) an(p, [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }], { duration: 600, delay: 300 + g * 190, easing: 'cubic-bezier(.3,.7,.3,1)' }); else an(p, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 700 + g * 190 }); });
  turs.forEach((t, g) => at(750 + g * 190, () => { t.el.classList.add('charged'); coinBurst(t.el, 5, '⚙️'); stmSmokeUp(t.el); }));
  for (let i = 0; i < 9; i++) at(100 + i * 110, () => { const e = add('stm-fp sg-vent', `left:${(core.x + stmR(-24, 24)).toFixed(0)}px;top:${(core.y - stmR(10, 40)).toFixed(0)}px;--dx:${stmR(-24, 24).toFixed(0)}px;--dy:${stmR(-70, -34).toFixed(0)}px;--s:${stmR(18, 30).toFixed(0)}px;--d:0ms`, 1200); });
  at(380, () => an(q('.sg-title'), [{ opacity: 0, transform: 'translate(-50%,0) scale(3.2)', filter: 'blur(10px)' }, { opacity: 1, transform: 'translate(-50%,0) scale(1)', filter: 'blur(0)', offset: .55 }, { opacity: 1, transform: 'translate(-50%,0) scale(1.06)', filter: 'blur(0)', offset: .8 }, { opacity: 1, transform: 'translate(-50%,0) scale(1)' }], { duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)' }));
  at(T.pay - 90, () => an(q('.sg-title'), [{ opacity: 1 }, { opacity: 0, transform: 'translate(-50%,-18px) scale(1.3)' }], { duration: 300 }));
  // ---- 1 : le paiement, puis trois salves (la suite dépend du résultat : Vapeur ou non) ----
  let tEnd = T.end;
  at(T.pay, () => {
    res = k.pay(); if (!res) { finish(); return; } flash('#9b5cff', .5, 380);
    const vap = !!res.vapor, tV = T.v2 + 760, tE = vap ? T.v2 + 1750 : T.v2 + 920, tF = tE + (res.volleys[2].hits.some(Boolean) ? 1000 : 200);
    tEnd = tF + 1500;
    const abs = (ms, fn) => setTimeout(() => { if (live()) fn(); }, Math.max(0, ms - T.pay));
    abs(T.v1, () => volley('eau', res.volleys[0].hits));
    abs(T.v1 + 330, () => { nums(res.volleys[0].hits, 'eau'); apply(res.volleys[0].hits); flash('#4fc3ff', .35, 360); });
    abs(T.v2, () => volley('feu', res.volleys[1].hits));
    abs(T.v2 + 330, () => { nums(res.volleys[1].hits, 'feu'); apply(res.volleys[1].hits); flash('#ff8a2a', .4, 360); });
    if (vap) abs(tV, () => { // la Vapeur : le feu rencontre les ennemis trempés
      const v = res.vapor;
      flash('#ffffff', .85, 520); shake();
      v.hits.forEach(x => { const p = byI[x.i]; if (p) { stmHit(scene, p, 'steam', 1.9); stmHit(scene, { x: p.x, y: p.g }, 'steam', 1.3); } });
      ecaText(card, '♨️ VAPEUR !', '', 'stm');
      for (let i = 0; i < 16; i++) add('stm-fp sg-vent', `left:${(fx + stmR(-spread / 2 - 40, spread / 2 + 40)).toFixed(0)}px;top:${(gy - stmR(0, 40)).toFixed(0)}px;--dx:${stmR(-30, 30).toFixed(0)}px;--dy:${stmR(-90, -30).toFixed(0)}px;--s:${stmR(30, 56).toFixed(0)}px;--d:${i * 28}ms`, 1700);
      setTimeout(() => { nums(v.hits, 'vap'); apply(v.hits); }, 140);
    });
    abs(tE, () => { // la Terre : des pics de roche jaillissent sous chaque ennemi
      const hits = res.volleys[2].hits;
      sources().forEach(src => { if (src.el) ecaState(src.el, 'fire', 420); else heroGesture(fu, 'atk'); });
      shake(); flash('#c99a52', .4, 420);
      hits.filter(Boolean).forEach(x => {
        const p = byI[x.i]; if (!p) return;
        [[0, 1, 1], [-.6, .62, .7], [.6, .62, .7], [-1.1, .38, .5], [1.1, .38, .5]].forEach(([ox, hh, ww]) => {
          const wd = Math.round(sw * .34 * ww), ht = Math.round(H * .74 * hh * (.85 + Math.random() * .3));
          const e = add('sg-spike', `left:${(p.x + ox * sw * .42 - wd / 2).toFixed(0)}px;top:${(p.g - ht).toFixed(0)}px;width:${wd}px;height:${ht}px`, 1700);
          an(e, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1.07)', offset: .5 }, { transform: 'scaleY(1)', offset: .66 }, { transform: 'scaleY(1)', opacity: 1, offset: .82 }, { transform: 'scaleY(.3)', opacity: 0 }], { duration: 1500, easing: 'cubic-bezier(.2,.9,.3,1)' });
        });
        stmHit(scene, { x: p.x, y: p.y }, 'terre', 1.6);
        for (let n = 0; n < 3; n++) add('sg-wave', `left:${p.x.toFixed(0)}px;top:${p.g.toFixed(0)}px;--w:${Math.round(sw * 2.2)}px;animation-delay:${n * 110}ms`, 1200);
      });
      setTimeout(() => { nums(hits, 'terre'); apply(hits); }, 140);
    });
    abs(tF, () => { // le soin de la Défensive, le magnétisme de la Tactique
      const dt = turs.find(t => t.s === 'def');
      if (res.heal > 0) {
        const o = dt || { x: hp.x - 40, y: hp.y - 30 };
        for (let i = 0; i < 6; i++) setTimeout(() => { if (!live()) return; const d = stmBolt(scene, { x: o.x, y: o.y - 10 }, { x: hp.x, y: hp.y }, { c: '#6fe8c0', size: 8, dur: 380, lift: 26 + i * 6, cls: 'heal', html: '+', trail: false }); if (i === 5) setTimeout(() => { fxImpact(scene, hp, '#6fe8c0', 1.3); stmFloat(fu, '+' + fmt(res.heal), 'heal'); ecaState(fu, 'stm-mend', 800); }, d); }, i * 70);
      }
      (res.mag || []).forEach((i, n) => { const p = byI[i]; if (!p) return;
        setTimeout(() => {
          if (!live()) return;
          const m = add('sg-magnet', `left:${p.x.toFixed(0)}px;top:${(p.y - 30).toFixed(0)}px`, 1300, '🧲');
          an(m, [{ transform: 'translate(-50%,-300%) scale(.6) rotate(-20deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.3) rotate(8deg)', opacity: 1, offset: .35 }, { transform: 'translate(-50%,-50%) scale(1) rotate(-6deg)', opacity: 1, offset: .75 }, { transform: 'translate(-50%,-90%) scale(1)', opacity: 0 }], { duration: 1150 });
          for (let r = 0; r < 2; r++) add('sg-ring', `left:${p.x.toFixed(0)}px;top:${p.y.toFixed(0)}px;animation-delay:${r * 160}ms`, 1000);
        }, n * 120);
      });
    });
    abs(tEnd - 500, () => { an(q('.sg-dark'), [{ opacity: 1 }, { opacity: 0 }], { duration: 500 }); qa('.sg-seal,.sg-pipes').forEach(e => an(e, [{ opacity: 1 }, { opacity: 0 }], { duration: 500 })); });
    setTimeout(finish, tEnd - T.pay);
  });
  const finish = () => { if (finish.done) return; finish.done = 1; ov.remove(); fg.remove(); scene.classList.remove('sg-on'); fu.classList.remove('stm-surge'); turs.forEach(t => t.el.classList.remove('charged')); k.done(); };
  setTimeout(() => { if (!res) finish(); }, T.pay + 1500); // garde-fou : la cinématique n'a jamais payé (carte redessinée en route)
}
/* fumée de vapeur qui s'échappe d'une tourelle qui se charge */
function stmSmokeUp(el) {
  if (!FX_OK()) return;
  for (let i = 0; i < 4; i++) { const s = document.createElement('i'); s.className = 'stm-smoke white'; s.style.cssText = `--dx:${(Math.random() * 24 - 12).toFixed(0)}px;--s:${(9 + Math.random() * 8).toFixed(0)}px;animation-delay:${i * 80}ms`; el.appendChild(s); setTimeout(() => s.remove(), 1500); }
}
