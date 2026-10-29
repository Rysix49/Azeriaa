/* =====================================================================
   AMAKNA IDLE — STEAMER : effets des sorts, tirs des tourelles, gestes du héros
   Chargé après spellfx.js (qui définit SPELL_FX, FX_KIND, fxEl, fxAnim, fxPos, fxImpact).
   ===================================================================== */
Object.assign(SPELL_FX, {
  flibuste:  ['stm', '#ff8a2a', '', 'fire'],     // Feu : boule de feu du canon
  ancrage:   ['stm', '#d8b26a', '', 'anchor'],   // Terre : l'ancre tombe du ciel
  ressac:    ['stm', '#4fc3ff', '', 'water'],    // Eau : double jet
  ecume:     ['stm', '#cfefff', '', 'foam'],     // Eau : vague d'écume sur tous les ennemis
  evolution: ['buff', '#d9a8ff', '⚙️'],           // les tourelles montent d'un niveau
  vapor:     ['stm', '#eef6fb', '', 'steam'],    // Feu : la vapeur envahit le champ de bataille
  foene:     ['stm', '#b9c4d4', '', 'harpoon'],  // Terre : harpon et chaîne
});
/* geste du héros par sort (a : coup de canon, b : coup de manette, c : double détente) et instant du tir en ms */
const STM_VARIANT = { flibuste: 0, ancrage: 1, ressac: 2, ecume: 1, vapor: 0, foene: 2 };
const STM_REL = [240, 300, 130];
const STM_COL = { feu: '#ff8a2a', eau: '#4fc3ff', terre: '#c99a52' };
const STM_MUZ = [[41.4], [41.4, 47.6], [35.2, 41.4, 47.6]]; // hauteur (sur 72) des bouches de la tourelle offensive selon son niveau
const stmR = (a, b) => a + Math.random() * (b - a);

/* centre et taille d'un élément, dans les pixels de la scène */
function stmBox(scene, el) {
  const s = scene.getBoundingClientRect(), r = el.getBoundingClientRect(), k = s.width && scene.offsetWidth ? scene.offsetWidth / s.width : 1;
  return { x: (r.left - s.left + r.width / 2) * k, y: (r.top - s.top + r.height / 2) * k, w: r.width * k, h: r.height * k };
}
/* courbe de Bézier a → b soulevée de `lift` */
function stmCurve(a, b, lift, n = 9) {
  const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - lift * 2 }, out = [];
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; out.push({ x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y, o: t }); }
  return out;
}
/* un projectile qui suit une courbe, avec sa traînée ; rend la durée du vol */
function stmBolt(scene, a, b, o = {}) {
  const dur = o.dur || 300, pts = stmCurve(a, b, o.lift == null ? 22 : o.lift), n = pts.length - 1;
  const g = fxEl(scene, 'sfx-stm-bolt' + (o.cls ? ' ' + o.cls : ''), a.x, a.y, o.html || '', `--c:${o.c};--s:${o.size || 12}px`);
  fxAnim(g, pts.map(p => ({ transform: `translate(calc(-50% + ${(p.x - a.x).toFixed(1)}px), calc(-50% + ${(p.y - a.y).toFixed(1)}px)) scale(${(o.grow ? .55 + p.o * o.grow : 1).toFixed(2)}) rotate(${((o.spin || 0) * p.o).toFixed(0)}deg)`, offset: p.o })), { duration: dur, easing: 'cubic-bezier(.4,0,.9,.7)' });
  if (o.trail !== false) for (let i = 1; i <= 5; i++) {
    const tau = i / 6, at = pts[Math.round(n * tau * tau)];
    setTimeout(() => { if (!scene.isConnected) return; const tr = fxEl(scene, 'sfx-stm-trail', at.x, at.y, '', `--c:${o.c};--s:${((o.size || 12) * (.9 - i * .08)).toFixed(1)}px`); fxAnim(tr, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: .8 }, { transform: 'translate(-50%,-50%) scale(.2)', opacity: 0 }], { duration: 300 }); }, tau * dur);
  }
  return dur;
}
/* gerbe d'éléments qui retombent (gouttes, éclats de roche) */
function stmLob(scene, p, cls, n, o = {}) {
  for (let i = 0; i < n; i++) {
    const e = fxEl(scene, cls, p.x, p.y, '', `--c:${o.c || '#fff'};--s:${stmR(o.s0 || 5, o.s1 || 8).toFixed(1)}px`);
    const dx = stmR(-(o.spread || 34), o.spread || 34), up = stmR(o.up0 || 22, o.up1 || 46), fall = stmR(-4, 12), r = stmR(-300, 300);
    fxAnim(e, [{ transform: 'translate(-50%,-50%) scale(1) rotate(0deg)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx * .55}px), calc(-50% - ${up}px)) scale(1) rotate(${r * .5}deg)`, opacity: 1, offset: .45 }, { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${fall}px)) scale(.7) rotate(${r}deg)`, opacity: 0 }], { duration: stmR(520, 760), easing: 'ease-out' });
  }
}
/* impact propre à chaque élément */
function stmHit(scene, p, el, big = 1) {
  if (!scene.isConnected) return;
  if (el === 'feu') {
    fxImpact(scene, p, '#ff8a2a', big);
    const f = fxEl(scene, 'sfx-stm-flame', p.x, p.y);
    fxAnim(f, [{ transform: `translate(-50%,-50%) scale(.3)`, opacity: 1 }, { transform: `translate(-50%,-58%) scale(${1.5 * big})`, opacity: .9, offset: .4 }, { transform: `translate(-50%,-75%) scale(${1.9 * big})`, opacity: 0 }], { duration: 520 });
    for (let i = 0; i < 7; i++) { const e = fxEl(scene, 'sfx-spark', p.x + stmR(-12, 12), p.y + stmR(-4, 10), '', `--c:${i % 2 ? '#ffd56a' : '#ff6a2a'}`); fxAnim(e, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${stmR(-14, 14)}px), calc(-50% - ${stmR(26, 58)}px)) scale(.3)`, opacity: 0 }], { duration: stmR(520, 900) }); }
  } else if (el === 'eau') {
    fxImpact(scene, p, '#4fc3ff', .8 * big);
    const r = fxEl(scene, 'sfx-stm-ripple', p.x, p.y + 12, '', '--c:#bfeaff');
    fxAnim(r, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: `translate(-50%,-50%) scale(${2.4 * big})`, opacity: 0 }], { duration: 560 });
    stmLob(scene, p, 'sfx-stm-drop', 8, { c: '#8fdcff', s0: 4, s1: 7, spread: 30 * big });
  } else if (el === 'terre') {
    fxImpact(scene, p, '#c99a52', big);
    const d = fxEl(scene, 'sfx-stm-dust', p.x, p.y + 14);
    fxAnim(d, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: .85 }, { transform: `translate(-50%,-70%) scale(${2.2 * big})`, opacity: 0 }], { duration: 700 });
    stmLob(scene, p, 'sfx-stm-shard', 7, { c: '#a8793a', s0: 5, s1: 10, spread: 38 * big, up0: 26, up1: 56 });
  } else if (el === 'foam') {
    for (let i = 0; i < 9; i++) {
      const b = fxEl(scene, 'sfx-stm-bubble', p.x + stmR(-20, 20), p.y + stmR(-2, 18), '', `--s:${stmR(7, 15).toFixed(0)}px`);
      fxAnim(b, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: `translate(calc(-50% + ${stmR(-8, 8)}px), calc(-50% - ${stmR(10, 24)}px)) scale(1)`, opacity: 1, offset: .35 }, { transform: `translate(calc(-50% + ${stmR(-10, 10)}px), calc(-50% - ${stmR(30, 56)}px)) scale(1.35)`, opacity: 0 }], { duration: stmR(620, 980), delay: i * 45 });
    }
    fxImpact(scene, p, '#cfefff', .7 * big);
  } else if (el === 'steam') {
    const r = fxEl(scene, 'sfx-stm-heat', p.x, p.y, '');
    fxAnim(r, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: .9 }, { transform: `translate(-50%,-50%) scale(${2.4 * big})`, opacity: 0 }], { duration: 560 });
    for (let i = 0; i < 6; i++) {
      const c = fxEl(scene, 'sfx-stm-cloud', p.x + stmR(-18, 18), p.y + stmR(-4, 16), '', `--s:${stmR(26, 44).toFixed(0)}px`);
      fxAnim(c, [{ transform: 'translate(-50%,-50%) scale(.35)', opacity: 0 }, { transform: `translate(calc(-50% + ${stmR(-6, 6)}px), calc(-50% - ${stmR(10, 22)}px)) scale(1)`, opacity: .92, offset: .3 }, { transform: `translate(calc(-50% + ${stmR(-14, 14)}px), calc(-50% - ${stmR(36, 66)}px)) scale(1.7)`, opacity: 0 }], { duration: stmR(780, 1150), delay: i * 50 });
    }
  }
}
/* chiffre flottant sur un ennemi ou un allié */
function stmFloat(el, txt, cls) {
  if (!el) return;
  const f = document.createElement('span'); f.className = 'fnum stm-f ' + cls; f.textContent = txt; f.style.marginLeft = stmR(-18, 18).toFixed(0) + 'px';
  el.appendChild(f); setTimeout(() => f.remove(), 1000);
}

const STM_ANCHOR = `<svg viewBox="0 0 40 64" width="34" height="54" aria-hidden="true"><path d="M20 -30 V8" stroke="#8a7a5a" stroke-width="3" stroke-dasharray="3 2.4"/><circle cx="20" cy="9" r="4.6" fill="none" stroke="#2a323c" stroke-width="4"/><circle cx="20" cy="9" r="4.6" fill="none" stroke="#c4cfdc" stroke-width="2"/><path d="M12 20 H28" stroke="#2a323c" stroke-width="6" stroke-linecap="round"/><path d="M12 20 H28" stroke="#c4cfdc" stroke-width="3.4" stroke-linecap="round"/><path d="M20 12 V54" stroke="#2a323c" stroke-width="7" stroke-linecap="round"/><path d="M20 12 V54" stroke="#aebbc9" stroke-width="4" stroke-linecap="round"/><path d="M3 38 Q4 54 20 56 Q36 54 37 38" fill="none" stroke="#2a323c" stroke-width="7" stroke-linecap="round"/><path d="M3 38 Q4 54 20 56 Q36 54 37 38" fill="none" stroke="#c4cfdc" stroke-width="3.8" stroke-linecap="round"/><path d="M-2 42 L3 33 L9 42Z M42 42 L37 33 L31 42Z" fill="#c4cfdc" stroke="#2a323c" stroke-width="2" stroke-linejoin="round"/><path d="M17.4 14 V50" stroke="#fff" stroke-opacity=".6" stroke-width="1.4" stroke-linecap="round"/></svg>`;
const STM_HARPOON = `<svg viewBox="0 0 46 16" width="46" height="16" aria-hidden="true"><path d="M0 8 H30" stroke="#2a323c" stroke-width="5" stroke-linecap="round"/><path d="M0 8 H30" stroke="#a9b6c6" stroke-width="2.6" stroke-linecap="round"/><path d="M28 1.4 L46 8 L28 14.6 L33 8Z" fill="#e6edf5" stroke="#2a323c" stroke-width="1.6" stroke-linejoin="round"/><path d="M19 3 L27 8 L19 13" fill="none" stroke="#6a7686" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M31 5.4 L40 8" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg>`;

FX_KIND.stm = function (scene, from, tos, fx, hero, cast) {
  const mod = fx[3], c = fx[1];
  const shake = (px = 3, ms = 240) => scene.animate && scene.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${-px}px,${px * .6}px)` }, { transform: `translate(${px}px,${-px * .5}px)` }, { transform: 'translate(0,0)' }], { duration: ms });
  if (mod === 'fire') {
    for (const p of tos) { const d = stmBolt(scene, from, p, { c, size: 15, dur: 330, lift: 22, grow: .7, cls: 'fire' }); setTimeout(() => stmHit(scene, p, 'feu', 1.15), d); }
  } else if (mod === 'water') {
    for (const p of tos) for (let k = 0; k < 2; k++) setTimeout(() => {
      if (!scene.isConnected) return;
      const d = stmBolt(scene, { x: from.x, y: from.y + k * 4 }, { x: p.x + (k ? 8 : -6), y: p.y + (k ? 6 : 0) }, { c, size: 10, dur: 270, lift: 12 + k * 14, cls: 'water' });
      setTimeout(() => stmHit(scene, p, 'eau', .8), d);
    }, k * 140);
  } else if (mod === 'anchor') {
    for (const p of tos) {
      const a = fxEl(scene, 'sfx-stm-anchor', p.x, p.y - 24, STM_ANCHOR);
      fxAnim(a, [{ transform: 'translate(-50%,-300%) rotate(-14deg)', opacity: 0 }, { transform: 'translate(-50%,-190%) rotate(-8deg)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1, offset: .74 }, { transform: 'translate(-50%,-44%) rotate(3deg)', opacity: 1, offset: .82 }, { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1, offset: .9 }, { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 0 }], { duration: 760, easing: 'cubic-bezier(.5,0,.9,.5)' });
      setTimeout(() => { stmHit(scene, p, 'terre', 1.3); shake(4, 260); }, 560);
    }
  } else if (mod === 'foam') {
    const gx = tos.reduce((s, p) => s + p.x, 0) / tos.length, gy = Math.max(...tos.map(p => p.y)) + 14, w = Math.max(60, Math.abs(gx - from.x));
    const sf = fxEl(scene, 'sfx-stm-surf', from.x, gy, '<i></i><i></i><i></i>', `--w:${Math.round(Math.min(w * 1.1, 220))}px`);
    fxAnim(sf, [{ transform: 'translate(-20%,-50%) scale(.4,.5)', opacity: 0 }, { transform: 'translate(0%,-50%) scale(.8,.9)', opacity: 1, offset: .2 }, { transform: `translate(${(gx - from.x) * .96}px,-60%) scale(1.15,1.1)`, opacity: 1, offset: .82 }, { transform: `translate(${(gx - from.x) * 1.02}px,-70%) scale(1.3,1.2)`, opacity: 0 }], { duration: 640, easing: 'ease-in' });
    for (const p of tos) setTimeout(() => stmHit(scene, p, 'foam', 1), 420);
  } else if (mod === 'steam') {
    for (const p of tos) { const d = stmBolt(scene, from, p, { c: '#ffffff', size: 18, dur: 360, lift: 30, grow: .9, cls: 'steam', trail: false }); setTimeout(() => stmHit(scene, p, 'steam', 1.2), d); }
    const dx = tos.length ? tos.reduce((s, p) => s + p.x, 0) / tos.length : from.x + 90;
    setTimeout(() => shake(2, 360), 380);
  } else if (mod === 'harpoon') {
    for (const p of tos) {
      const ang = Math.atan2(p.y - from.y, p.x - from.x), len = Math.hypot(p.x - from.x, p.y - from.y), deg = ang * 180 / Math.PI;
      const ch = fxEl(scene, 'sfx-stm-chain', from.x, from.y, '', `--len:${len.toFixed(0)}px`);
      ch.style.transform = `translate(0,-50%) rotate(${deg}deg)`;
      fxAnim(ch, [{ transform: `translate(0,-50%) rotate(${deg}deg) scaleX(0)`, opacity: 1 }, { transform: `translate(0,-50%) rotate(${deg}deg) scaleX(1)`, opacity: 1, offset: .3 }, { transform: `translate(0,-50%) rotate(${deg}deg) scaleX(1)`, opacity: 1, offset: .62 }, { transform: `translate(0,-50%) rotate(${deg}deg) scaleX(.02)`, opacity: .8 }], { duration: 880, easing: 'linear' });
      const hp = fxEl(scene, 'sfx-stm-harpoon', from.x, from.y, STM_HARPOON);
      fxAnim(hp, [{ transform: `translate(-30%,-50%) rotate(${deg}deg) scale(.8)`, opacity: 1 }, { transform: `translate(${p.x - from.x - 10}px, ${p.y - from.y}px) translate(-50%,-50%) rotate(${deg}deg) scale(1.15)`, opacity: 1, offset: .3 }, { transform: `translate(${p.x - from.x - 10}px, ${p.y - from.y}px) translate(-50%,-50%) rotate(${deg}deg) scale(1.15)`, opacity: 1, offset: .62 }, { transform: `translate(0px, 0px) translate(-50%,-50%) rotate(${deg}deg) scale(.8)`, opacity: 0 }], { duration: 880, easing: 'linear' });
      setTimeout(() => { stmHit(scene, p, 'terre', 1.6); fxImpact(scene, p, '#ffffff', 1.3); shake(5, 300); }, 270);
    }
  }
};

/* ---------------- Tourelles : tirs, soins, magnétisme ---------------- */
function stmShotOff(card, scene, s) {
  const tur = card.querySelector('.tur[data-s="off"]'); if (!tur) return;
  const art = tur.querySelector('.tur-art'), bx = stmBox(scene, art);
  const ys = STM_MUZ[Math.min(3, Math.max(1, s.lvl)) - 1], el = s.el;
  s.t.forEach((mi, b) => setTimeout(() => {
    if (!scene.isConnected) return;
    const pos = fxPos(scene, card.querySelector(`[data-mon="${mi}"] .sprite`)); if (!pos) return;
    tur.dataset.el = el; ecaState(tur, 'fire', 420);
    const mz = { x: bx.x + (68 / 72 - .5) * bx.w, y: bx.y + ((ys[b % ys.length] || 41.4) / 72 - .5) * bx.h };
    const m = fxEl(scene, 'sfx-stm-muz', mz.x, mz.y, '', `--c:${STM_COL[el]}`); fxAnim(m, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: 'translate(-30%,-50%) scale(1.6)', opacity: 0 }], { duration: 260 });
    const d = stmBolt(scene, mz, pos, { c: STM_COL[el], size: 8, dur: 250, lift: 10 + b * 4, cls: el });
    setTimeout(() => stmHit(scene, pos, el, .7), d);
  }, b * 105));
}
function stmShotDef(card, scene, s) {
  const tur = card.querySelector('.tur[data-s="def"]'); if (!tur) return;
  const bx = stmBox(scene, tur.querySelector('.tur-art')), heroEl = card.querySelector('[data-k="fighter"]');
  ecaState(tur, 'fire', 700); fxImpact(scene, { x: bx.x, y: bx.y - 4 }, '#6fe8c0', .9);
  if (s.heal > 0 && heroEl) {
    const hp = fxPos(scene, heroEl.querySelector('.sprite'));
    if (hp) for (let i = 0; i < 4; i++) setTimeout(() => {
      if (!scene.isConnected) return;
      const d = stmBolt(scene, { x: bx.x, y: bx.y - 10 }, { x: hp.x, y: hp.y }, { c: '#6fe8c0', size: 8, dur: 360, lift: 30 + i * 8, cls: 'heal', html: '+', trail: false });
      if (i === 3) setTimeout(() => { fxImpact(scene, hp, '#6fe8c0', 1); stmFloat(heroEl, '+' + fmt(s.heal), 'heal'); ecaState(heroEl, 'stm-mend', 700); }, d);
    }, i * 90);
  }
  if (s.rep > 0) for (const o of ['off', 'tac']) {
    const ot = card.querySelector(`.tur[data-s="${o}"]`); if (!ot || ot.dataset.st === 'lock') continue;
    const ob = stmBox(scene, ot.querySelector('.tur-art'));
    setTimeout(() => {
      if (!scene.isConnected) return;
      const d = stmBolt(scene, { x: bx.x, y: bx.y - 14 }, { x: ob.x, y: ob.y - 10 }, { c: '#bfffe6', size: 6, dur: 300, lift: 18, cls: 'heal', html: '🔧', trail: false });
      setTimeout(() => { ecaState(ot, 'repair', 900); fxImpact(scene, { x: ob.x, y: ob.y - 6 }, '#bfffe6', .6); }, d);
    }, 160);
  }
}
function stmShotTac(card, scene, s) {
  const tur = card.querySelector('.tur[data-s="tac"]'); if (!tur) return;
  const bx = stmBox(scene, tur.querySelector('.tur-art')), mi = s.t[0], mel = card.querySelector(`[data-mon="${mi}"]`), pos = mel && fxPos(scene, mel.querySelector('.sprite'));
  ecaState(tur, 'fire', 700); if (!pos) return;
  const a = { x: bx.x + bx.w * .15, y: bx.y - 2 }, dist = Math.hypot(pos.x - a.x, pos.y - a.y), deg = Math.atan2(pos.y - a.y, pos.x - a.x) * 180 / Math.PI;
  let d1 = 'M0 20', d2 = 'M0 20'; const n = Math.max(6, Math.round(dist / 14));
  for (let i = 1; i <= n; i++) { const x = (dist * i / n).toFixed(1); d1 += ` L${x} ${(i === n ? 20 : 20 + stmR(-9, 9)).toFixed(1)}`; d2 += ` L${x} ${(i === n ? 20 : 20 + stmR(-6, 6)).toFixed(1)}`; }
  const bolt = fxEl(scene, 'sfx-stm-lightning', a.x, a.y, `<svg width="${dist.toFixed(0)}" height="40" viewBox="0 0 ${dist.toFixed(0)} 40" aria-hidden="true"><path d="${d1}" fill="none" stroke="#9b5cff" stroke-width="5" stroke-linejoin="round" opacity=".7"/><path d="${d2}" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>`);
  bolt.style.transformOrigin = '0 50%';
  fxAnim(bolt, [{ transform: `translate(0,-50%) rotate(${deg}deg)`, opacity: 0 }, { transform: `translate(0,-50%) rotate(${deg}deg)`, opacity: 1, offset: .12 }, { transform: `translate(0,-50%) rotate(${deg}deg)`, opacity: .4, offset: .3 }, { transform: `translate(0,-50%) rotate(${deg}deg)`, opacity: 1, offset: .45 }, { transform: `translate(0,-50%) rotate(${deg}deg)`, opacity: 0 }], { duration: 520, easing: 'linear' });
  fxImpact(scene, pos, '#c58aff', 1);
  if (s.mag) {
    const m = fxEl(scene, 'sfx-stm-magnet', pos.x, pos.y - 30, '🧲');
    fxAnim(m, [{ transform: 'translate(-50%,-260%) scale(.6) rotate(-20deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.3) rotate(8deg)', opacity: 1, offset: .35 }, { transform: 'translate(-50%,-50%) scale(1) rotate(-6deg)', opacity: 1, offset: .75 }, { transform: 'translate(-50%,-90%) scale(1) rotate(0deg)', opacity: 0 }], { duration: 1000 });
    for (let i = 0; i < 2; i++) { const r = fxEl(scene, 'sfx-ring thick', pos.x, pos.y, '', '--c:#c58aff'); fxAnim(r, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(2.6)', opacity: 0 }], { duration: 640, delay: 200 + i * 160 }); }
    stmFloat(mel, 'MAGNÉTISÉ !', 'mag');
  } else stmFloat(mel, 'résiste', 'resist');
}
function stmVaporFx(card, scene, vap) {
  ecaText(card, '♨️ VAPEUR !', '', 'stm');
  for (const h of vap.hits) {
    const mel = card.querySelector(`[data-mon="${h.i}"]`), pos = mel && fxPos(scene, mel.querySelector('.sprite')); if (!pos) continue;
    stmHit(scene, pos, 'steam', 1.4);
  }
}
/* orchestre les tourelles après le sort du héros */
function stmTurretShots(card, scene, cast, delay = 380) {
  const shots = cast.tur; if (!shots || !shots.length) return;
  shots.forEach((s, k) => setTimeout(() => {
    if (!scene.isConnected) return;
    (s.s === 'off' ? stmShotOff : s.s === 'def' ? stmShotDef : stmShotTac)(card, scene, s);
  }, delay + k * 200));
  if (shots.vapor) setTimeout(() => { if (scene.isConnected) stmVaporFx(card, scene, shots.vapor); }, delay + shots.length * 200 + 280);
}

/* ---------------- Le héros : volutes de vapeur, étincelles, signal d'antenne ---------------- */
function stmFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'); if (!sp) return;
  const add = (cls, style, ms) => { const e = document.createElement('i'); e.className = cls; e.style.cssText = style; sp.appendChild(e); setTimeout(() => e.remove(), ms); return e; };
  const puff = (x, y, dx, dy, s, d, life = 1100) => add('stm-fp', `left:${x}%;top:${y}%;--dx:${dx}px;--dy:${dy}px;--s:${s}px;--d:${d}ms`, life + d);
  const spark = (x, y, n, d) => { for (let i = 0; i < n; i++) add('stm-fs', `left:${x}%;top:${y}%;--dx:${stmR(14, 46).toFixed(0)}px;--dy:${stmR(-26, 20).toFixed(0)}px;--d:${(d + stmR(0, 60)).toFixed(0)}ms`, 700 + d); };
  const chimneys = (d, k = 1) => { for (let i = 0; i < k; i++) { puff(19.5, 17, stmR(-16, -4), stmR(-34, -18), stmR(14, 20), d + i * 70); puff(30, 24, stmR(-14, -2), stmR(-30, -14), stmR(12, 17), d + 40 + i * 70); } };
  const muzzle = (d, s = 1) => { puff(97, 55, stmR(20, 40), stmR(-18, -4), 18 * s, d, 900); puff(97, 55, stmR(36, 62), stmR(-4, 8), 13 * s, d + 30, 900); spark(97, 55, 5 * s | 0 || 4, d); };
  if (v === 0) { chimneys(120, 2); muzzle(232); add('stm-dust', '--d:150ms', 800); }
  if (v === 1) {
    chimneys(80, 2);
    [0, 160].forEach(d => add('stm-sig', `left:38%;top:3.5%;--d:${200 + d}ms`, 900 + d));
    spark(38, 3.5, 6, 220);
  }
  if (v === 2) { chimneys(60, 3); muzzle(120, .9); muzzle(420, 1.15); add('stm-dust', '--d:100ms', 800); add('stm-dust', '--d:380ms', 800); }
}
/* soutien : la grande manette, toutes les soupapes sifflent */
function stmCheer(unit) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'); if (!sp) return;
  for (let i = 0; i < 7; i++) { const e = document.createElement('i'); e.className = 'stm-fp'; e.style.cssText = `left:${[19.5, 30, 38, 19.5, 30, 24, 34][i]}%;top:${[17, 24, 3.5, 17, 24, 20, 22][i]}%;--dx:${stmR(-26, 8).toFixed(0)}px;--dy:${stmR(-52, -22).toFixed(0)}px;--s:${stmR(14, 22).toFixed(0)}px;--d:${i * 70}ms`; sp.appendChild(e); setTimeout(() => e.remove(), 1500); }
}
