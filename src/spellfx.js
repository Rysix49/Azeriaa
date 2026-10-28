/* =====================================================================
   AMAKNA IDLE — ANIMATIONS DES SORTS
   Chaque sort a sa propre animation : [type, couleur, symbole].
   Types : slash (coup), proj (projectile), arrow (flèche), beam (rayon),
   drop (objet qui tombe), rain (pluie sur chaque cible), wave (onde),
   burst (explosion sur chaque cible), poison, heal (soin), buff (aura),
   drain (vol de vie), spikes (pics qui sortent du sol).
   Pour un nouveau sort : ajouter une ligne dans SPELL_FX.
   ===================================================================== */
const SPELL_FX = {
  // Iop : lames et colère
  pression:          ['slash', '#ff6a4d'],
  compulsion:        ['buff', '#ff5a3c', '💢'],
  epee_divine:       ['rain', '#ffd36a', '🗡️'],
  colere:            ['drop', '#ff3b22', '🗡️', 1.6],
  epee_celeste:      ['rain', '#fff0b0', '⚔️'],
  // Cra : flèches
  fleche_magique:    ['arrow', '#9cff6a'],
  fleche_empoisonnee:['arrow', '#7dff3a', '', 'poison'],
  fleche_explosive:  ['arrow', '#ffb03a', '', 'explode'],
  fleche_punitive:   ['beam', '#b4ff7a'],
  pluie_fleches:     ['rain', '#c8ff9a', '➶'],
  // Zobal : masques (l'attaque dépend du masque porté, voir FX_KIND.zob)
  grimace:           ['zob', '', '', 1],
  tour_de_passe:     ['zob', '', '', .8],
  danse_macabre:     ['zob', '', '', 1.1],
  mascarade:         ['buff', '#d9a8ff', '🎭'],
  rictus:            ['zob', '', '', 1.5],
  carnaval:          ['zob', '', '', 1.8],
  // Sacrieur : sang
  assaut:            ['slash', '#d4202a'],
  absorption:        ['drain', '#ff2a3a'],
  chatiment:         ['buff', '#b3001b', '🩸'],
  fureur:            ['slash', '#ff1a1a', '', 'heavy'],
  douleur_cuisante:  ['spikes', '#e0303a'],
  // Enutrof : pièces et pelles
  lancer_pieces:     ['proj', '#ffd24a', '🪙'],
  pelle_animee:      ['drop', '#c9a46a', '⛏️'],
  pelle_fantomatique:['rain', '#b9c7ff', '⛏️'],
  fortune:           ['buff', '#ffd24a', '💰'],
  pluie_or:          ['rain', '#ffd24a', '🪙'],
  pelle_jugement:    ['drop', '#ffcf3a', '⛏️', 1.8],
  // Ecaflip : griffes et chance
  griffe_joueuse:    ['slash', '#2fe0b8', '', 'quick'],
  langue_rapeuse:    ['drain', '#ff7aa8'],
  roulette:          ['rain', '#ffe27a', '🎲'],
  felintion:         ['buff', '#2fe0b8', '🍀'],
  tout_ou_rien:      ['slash', '#ffd24a', '', 'heavy'],
  rekop:             ['wave', '#2fe0b8'],
  // Sram : ombres et pièges
  sournoiserie:      ['slash', '#9a7bff', '', 'quick'],
  poison_paralysant: ['poison', '#6dff5a'],
  arnaque:           ['proj', '#c9b8ff', '🗡️'],
  piege_masse:       ['spikes', '#8f6bff'],
  attaque_mortelle:  ['slash', '#6a00ff', '', 'heavy'],
  // Xélor : temps
  aiguille:          ['arrow', '#8fb8ff', '', 'needle'],
  gelure:            ['proj', '#bfe6ff', '❄'],
  poussiere:         ['wave', '#8fb8ff'],
  momification:      ['buff', '#e8dcb0', '🧻'],
  horloge:           ['drop', '#9fc2ff', '🕰️', 1.4],
  rayon_obscur:      ['beam', '#7a4dff', '', 'dark'],
};

const FX_OK = () => !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

function fxPos(scene, el) {
  if (!scene || !el) return null;
  const s = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
  const k = s.width && scene.offsetWidth ? scene.offsetWidth / s.width : 1; // la scène est dézoomée (CSS zoom) : les rectangles écran sont ramenés à ses propres pixels
  return { x: (r.left - s.left + r.width / 2) * k, y: (r.top - s.top + r.height / 2) * k };
}
function fxEl(scene, cls, x, y, html = '', style = '') {
  const e = document.createElement('div');
  e.className = 'sfx ' + cls;
  e.style.cssText = `left:${x}px;top:${y}px;${style}`;
  e.innerHTML = html;
  scene.appendChild(e);
  return e;
}
function fxAnim(e, frames, opts) {
  if (!e.animate) { setTimeout(() => e.remove(), opts.duration || 400); return null; }
  const a = e.animate(frames, { fill: 'forwards', easing: 'ease-out', ...opts });
  a.onfinish = () => e.remove();
  return a;
}
function fxImpact(scene, p, color, size = 1) {
  const r = fxEl(scene, 'sfx-ring', p.x, p.y, '', `--c:${color}`);
  fxAnim(r, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 1 }, { transform: `translate(-50%,-50%) scale(${2.2 * size})`, opacity: 0 }], { duration: 420 });
  for (let i = 0; i < 6; i++) {
    const a = Math.random() * Math.PI * 2, d = (22 + Math.random() * 18) * size;
    const s = fxEl(scene, 'sfx-spark', p.x, p.y, '', `--c:${color}`);
    fxAnim(s, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(.3)`, opacity: 0 }], { duration: 380 + Math.random() * 150 });
  }
}
function fxLunge(heroSprite, dist = 26, dur = 260) {
  if (heroSprite && heroSprite.animate) heroSprite.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dist}px) scale(1.08)` }, { transform: 'translateX(0)' }], { duration: dur, easing: 'ease-in-out' });
}
function fxCast(heroSprite, color) {
  if (heroSprite && heroSprite.animate) heroSprite.animate([{ filter: 'none' }, { filter: `drop-shadow(0 0 10px ${color}) brightness(1.3)` }, { filter: 'none' }], { duration: 380 });
}

const FX_KIND = {
  slash(scene, from, tos, [, color, , mod], hero) {
    const quick = mod === 'quick', heavy = mod === 'heavy';
    fxLunge(hero, heavy ? 40 : 26, quick ? 180 : 260);
    for (const p of tos) setTimeout(() => {
      const n = heavy ? 2 : 1;
      for (let k = 0; k < n; k++) {
        const s = fxEl(scene, 'sfx-slash', p.x, p.y, '', `--c:${color};--w:${heavy ? 90 : 64}px`);
        const rot = k ? 35 : -35;
        fxAnim(s, [{ transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(.1)`, opacity: 1 }, { transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(1)`, opacity: 1, offset: .45 }, { transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(1.1)`, opacity: 0 }], { duration: quick ? 220 : 320, delay: k * 90 });
      }
      fxImpact(scene, p, color, heavy ? 1.4 : 1);
      if (heavy) scene.animate && scene.animate([{ transform: 'translate(0,0)' }, { transform: 'translate(-4px,2px)' }, { transform: 'translate(3px,-2px)' }, { transform: 'translate(0,0)' }], { duration: 260 });
    }, quick ? 90 : 140);
  },
  proj(scene, from, tos, [, color, glyph], hero) {
    fxCast(hero, color);
    for (const p of tos) {
      const g = fxEl(scene, 'sfx-glyph', from.x, from.y, glyph || '●', `--c:${color}`);
      fxAnim(g, [{ transform: 'translate(-50%,-50%) scale(.6) rotate(0deg)' }, { transform: `translate(calc(-50% + ${p.x - from.x}px), calc(-50% + ${p.y - from.y - 30}px)) scale(1.1) rotate(220deg)`, offset: .55 }, { transform: `translate(calc(-50% + ${p.x - from.x}px), calc(-50% + ${p.y - from.y}px)) scale(1) rotate(360deg)` }], { duration: 360, easing: 'ease-in' });
      setTimeout(() => fxImpact(scene, p, color), 340);
    }
  },
  arrow(scene, from, tos, [, color, , mod], hero) {
    fxCast(hero, color);
    for (const p of tos) {
      const ang = Math.atan2(p.y - from.y, p.x - from.x) * 180 / Math.PI;
      const a = fxEl(scene, 'sfx-arrow' + (mod === 'needle' ? ' needle' : ''), from.x, from.y, '', `--c:${color}`);
      fxAnim(a, [{ transform: `translate(-50%,-50%) rotate(${ang}deg)` }, { transform: `translate(calc(-50% + ${p.x - from.x}px), calc(-50% + ${p.y - from.y}px)) rotate(${ang}deg)` }], { duration: 260, easing: 'linear' });
      setTimeout(() => {
        fxImpact(scene, p, color, mod === 'explode' ? 1.8 : .9);
        if (mod === 'poison') FX_KIND.poison(scene, from, [p], [, color]);
        if (mod === 'explode') { const b = fxEl(scene, 'sfx-boom', p.x, p.y, '💥'); fxAnim(b, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(1.8)', opacity: 0 }], { duration: 480 }); }
      }, 250);
    }
  },
  beam(scene, from, tos, [, color, , mod], hero) {
    fxCast(hero, color);
    for (const p of tos) {
      const dx = p.x - from.x, dy = p.y - from.y, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
      const b = fxEl(scene, 'sfx-beam' + (mod === 'dark' ? ' dark' : ''), from.x, from.y, '', `--c:${color};width:${len}px`);
      fxAnim(b, [{ transform: `translateY(-50%) rotate(${ang}deg) scaleX(0)`, opacity: 1 }, { transform: `translateY(-50%) rotate(${ang}deg) scaleX(1)`, opacity: 1, offset: .35 }, { transform: `translateY(-50%) rotate(${ang}deg) scaleX(1) scaleY(.2)`, opacity: 0 }], { duration: 520 });
      setTimeout(() => fxImpact(scene, p, color, 1.3), 200);
    }
  },
  drop(scene, from, tos, [, color, glyph, size = 1], hero) {
    fxCast(hero, color);
    for (const p of tos) {
      const g = fxEl(scene, 'sfx-glyph big', p.x, p.y, glyph, `--c:${color};font-size:${30 * size}px`);
      fxAnim(g, [{ transform: 'translate(-50%,-50%) translateY(-120px) rotate(-30deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) translateY(-120px) rotate(-30deg)', opacity: 1, offset: .15 }, { transform: 'translate(-50%,-50%) translateY(0) rotate(15deg)', opacity: 1, offset: .65 }, { transform: 'translate(-50%,-50%) translateY(-8px) rotate(0deg)', opacity: 0 }], { duration: 560, easing: 'ease-in' });
      setTimeout(() => { fxImpact(scene, p, color, size); if (size > 1.3 && scene.animate) scene.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }], { duration: 200 }); }, 360);
    }
  },
  rain(scene, from, tos, [, color, glyph], hero) {
    fxCast(hero, color);
    tos.forEach((p, i) => {
      for (let k = 0; k < 3; k++) {
        const ox = (k - 1) * 16;
        const g = fxEl(scene, 'sfx-glyph', p.x + ox, p.y, glyph, `--c:${color}`);
        fxAnim(g, [{ transform: 'translate(-50%,-50%) translateY(-110px) rotate(135deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) translateY(-90px) rotate(135deg)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-50%) translateY(0) rotate(135deg)', opacity: 1, offset: .8 }, { transform: 'translate(-50%,-50%) translateY(4px) rotate(135deg)', opacity: 0 }], { duration: 420, delay: i * 70 + k * 80, easing: 'ease-in' });
      }
      setTimeout(() => fxImpact(scene, p, color, .9), 380 + i * 70);
    });
  },
  wave(scene, from, tos, [, color], hero) {
    fxCast(hero, color);
    const w = fxEl(scene, 'sfx-wave', from.x, from.y, '', `--c:${color}`);
    fxAnim(w, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: .9 }, { transform: 'translate(-50%,-50%) scale(9)', opacity: 0 }], { duration: 650 });
    tos.forEach(p => setTimeout(() => fxImpact(scene, p, color, .8), 120 + Math.max(0, p.x - from.x) * 0.9));
  },
  burst(scene, from, tos, [, color]) { tos.forEach(p => fxImpact(scene, p, color, 1.4)); },
  spikes(scene, from, tos, [, color], hero) {
    fxLunge(hero, 10, 220);
    tos.forEach((p, i) => {
      for (let k = 0; k < 3; k++) {
        const s = fxEl(scene, 'sfx-spike', p.x + (k - 1) * 14, p.y + 22, '', `--c:${color}`);
        fxAnim(s, [{ transform: 'translate(-50%,0) scaleY(0)', opacity: 1 }, { transform: 'translate(-50%,-100%) scaleY(1)', opacity: 1, offset: .4 }, { transform: 'translate(-50%,-100%) scaleY(1)', opacity: 0 }], { duration: 480, delay: i * 80 + k * 40, easing: 'cubic-bezier(.2,1.6,.4,1)' });
      }
      setTimeout(() => fxImpact(scene, p, color, .8), 200 + i * 80);
    });
  },
  poison(scene, from, tos, [, color]) {
    for (const p of tos) for (let k = 0; k < 5; k++) {
      const b = fxEl(scene, 'sfx-bubble', p.x + (Math.random() - .5) * 30, p.y + 10, '', `--c:${color}`);
      fxAnim(b, [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: .9 }, { transform: `translate(-50%,-50%) translateY(-${30 + Math.random() * 25}px) scale(1.2)`, opacity: 0 }], { duration: 700, delay: k * 90 });
    }
  },
  heal(scene, from, tos, [, color, glyph, size = 1], hero) {
    const glow = fxEl(scene, 'sfx-aura', from.x, from.y, '', `--c:${color}`);
    fxAnim(glow, [{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.3)', opacity: .9, offset: .4 }, { transform: 'translate(-50%,-50%) scale(1.6)', opacity: 0 }], { duration: 700 });
    for (let k = 0; k < 4 + Math.round(size * 2); k++) {
      const g = fxEl(scene, 'sfx-glyph small', from.x + (Math.random() - .5) * 46, from.y + 10, k % 2 ? '✚' : glyph, `--c:${color}`);
      fxAnim(g, [{ transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 }, { transform: 'translate(-50%,-50%) translateY(-20px) scale(1)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-50%) translateY(-55px) scale(.8)', opacity: 0 }], { duration: 800, delay: k * 70 });
    }
  },
  buff(scene, from, tos, [, color, glyph], hero) {
    for (let k = 0; k < 2; k++) {
      const r = fxEl(scene, 'sfx-ring thick', from.x, from.y + 18, '', `--c:${color}`);
      fxAnim(r, [{ transform: 'translate(-50%,-50%) scaleX(1.6) scaleY(.5) scale(.4)', opacity: 1 }, { transform: 'translate(-50%,-50%) scaleX(1.6) scaleY(.5) scale(2.4)', opacity: 0 }], { duration: 600, delay: k * 160 });
    }
    const g = fxEl(scene, 'sfx-glyph big', from.x, from.y - 10, glyph, `--c:${color}`);
    fxAnim(g, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 0 }, { transform: 'translate(-50%,-50%) translateY(-28px) scale(1.2)', opacity: 1, offset: .4 }, { transform: 'translate(-50%,-50%) translateY(-50px) scale(1)', opacity: 0 }], { duration: 850 });
    fxCast(hero, color);
  },
  drain(scene, from, tos, [, color], hero) {
    fxLunge(hero, 14, 240);
    for (const p of tos) {
      fxImpact(scene, p, color, .8);
      for (let k = 0; k < 4; k++) {
        const o = fxEl(scene, 'sfx-orb', p.x, p.y, '', `--c:${color}`);
        fxAnim(o, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${(from.x - p.x) / 2}px), calc(-50% + ${(from.y - p.y) / 2 - 30 + k * 12}px)) scale(.9)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${from.x - p.x}px), calc(-50% + ${from.y - p.y}px)) scale(.4)`, opacity: 0 }], { duration: 560, delay: 120 + k * 70, easing: 'ease-in-out' });
      }
    }
    setTimeout(() => FX_KIND.heal(scene, from, [], [, '#ff6070', '❤']), 520);
  },
};

/* Geste du personnage : un seul à la fois ; si un sort arrive en plein mouvement, le suivant s'enchaîne juste après (pas de saccade) */
function heroGesture(unit, k) {
  if (unit._gBusy) { unit._gNext = k; return; }
  unit._gBusy = true; unit.classList.remove('atk', 'cheer', 'atk-a', 'atk-b', 'atk-c'); void unit.offsetWidth; unit.classList.add(k);
  let variant = '';
  const art = k === 'atk' ? (unit.querySelector('.hs-iop') ? 'iop' : unit.querySelector('.hs-sram') ? 'sram' : unit.querySelector('.hs-ecaflip') ? 'eca' : unit.querySelector('.hs-xelor') ? 'xel' : unit.querySelector('.hs-sacrieur') ? 'sac' : unit.querySelector('.hs-zobal') ? 'zob' : '') : '';
  if (art === 'zob') { // une gestuelle par masque : rire (a), larmes (b), farce (c)
    variant = { rire: 'atk-a', larme: 'atk-b', farce: 'atk-c' }[unit.dataset.mask] || 'atk-a'; unit.classList.add(variant);
  } else if (art) { // le Iop (coup d'en haut, tourbillon, plongeon) et le Sram (fente, pas d'ombre, rafale) varient leurs coups
    const v = (unit._combo = ((unit._combo == null ? -1 : unit._combo) + 1 + (Math.random() < .5 ? 1 : 0)) % 3); /* jamais deux fois le même coup d'affilée */ variant = ['atk-a', 'atk-b', 'atk-c'][v];
    unit.classList.add(variant); (art === 'iop' ? iopFlourish : art === 'sram' ? sramFlourish : art === 'xel' ? xelFlourish : art === 'sac' ? sacFlourish : ecaFlourish)(unit, v);
  }
  setTimeout(() => {
    unit.classList.remove(k); if (variant) unit.classList.remove(variant); unit._gBusy = false;
    const n = unit._gNext; unit._gNext = null;
    if (n) requestAnimationFrame(() => heroGesture(unit, n));
  }, k === 'atk' ? (art === 'zob' ? 940 : variant ? 640 : 520) : 600);
}

/* Cra : un tir différent par sort (a magique, b empoisonnée, c explosive, d punitive, e pluie).
   [classe, instant du lâcher en ms, durée en ms, élément]. Les tirs s'enchaînent sans se chevaucher ; la fonction rend le délai avant le lâcher
   pour que la flèche de l'effet quitte l'arc au bon moment (-1 : pas de geste, le Tir Parfait occupe l'archère). */
const CRA_SHOT = {
  fleche_magique: ['atk-a', 162, 320, ''], fleche_empoisonnee: ['atk-b', 162, 320, 'poison'], fleche_explosive: ['atk-c', 156, 320, 'fire'],
  fleche_punitive: ['atk-d', 471, 780, ''], pluie_fleches: ['atk-e', 426, 840, ''],
};
const CRA_CLS = ['atk', 'cheer', 'atk-a', 'atk-b', 'atk-c', 'atk-d', 'atk-e'];
function craShoot(unit, id) {
  if (unit.classList.contains('cra-perfect')) return -1;
  const [cls, rel, dur, el] = CRA_SHOT[id] || CRA_SHOT.fleche_magique;
  const now = performance.now(), start = Math.max(now, unit._cFree || 0);
  if (start - now > 1600) return -1; // trop en retard : on laisse tomber le geste
  unit._cFree = start + dur;
  setTimeout(() => {
    if (unit.classList.contains('cra-perfect')) return;
    unit.classList.remove(...CRA_CLS); void unit.offsetWidth; unit.classList.add('atk', cls);
    const tok = unit._cTok = (unit._cTok || 0) + 1;
    setTimeout(() => { if (unit._cTok === tok) unit.classList.remove('atk', cls); }, dur);
    craFlourish(unit, cls, el, rel);
  }, start - now);
  return start - now + rel;
}
/* Effets du Cra autour de son sprite : lueur d'encoche, poussière, anneau et traînées au lâcher, étincelles, feuilles soufflées, images fantômes */
function craFlourish(unit, cls, el, rel) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-cra'); if (!sp || !svg) return;
  const x = el ? ' ' + el : '', heavy = cls === 'atk-d' || cls === 'atk-e', rnd = (a, b) => a + Math.random() * (b - a);
  const add = (c, style, ms) => { const e = document.createElement('i'); e.className = c; if (style) e.style.cssText = style; sp.appendChild(e); setTimeout(() => e.remove(), ms); return e; };
  add('cr-charge' + x, `--t:${rel}ms`, rel + 80);
  if (heavy) { add('cr-dust', `--d:0ms;--dx:-18px`, 700); add('cr-dust', `--d:120ms;--dx:-30px;left:30%`, 800); }
  setTimeout(() => {
    add('cr-ring' + x + (cls === 'atk-d' ? ' big' : ''), '', 700);
    (heavy ? [-9, 0, 9] : [-5, 5]).forEach((o, i) => add('cr-streak' + x, `--y:${56 + o}%;--d:${i * 40}ms`, 520 + i * 40));
    for (let i = 0, n = heavy ? 9 : 5; i < n; i++) add('cr-spark' + x, `--dx:${rnd(10, 44).toFixed(0)}px;--dy:${rnd(-22, 22).toFixed(0)}px;--s:${rnd(3, 5.5).toFixed(1)}px;--d:${rnd(0, 70).toFixed(0)}ms`, 800);
    for (let i = 0, n = heavy ? 7 : 3; i < n; i++) add('cr-leaf', `--dx:${rnd(-52, -8).toFixed(0)}px;--dy:${rnd(-48, 6).toFixed(0)}px;--r:${rnd(-380, 380).toFixed(0)}deg;--t:${rnd(700, 1100).toFixed(0)}ms;--d:${rnd(0, 90).toFixed(0)}ms`, 1300);
    if (cls === 'atk-d' || cls === 'atk-c') add('cr-wave' + x, '', 800);
    if (heavy) for (let i = 1; i <= 2; i++) {
      const g = document.createElement('div'); g.className = 'cr-ghost'; g.style.cssText = `--gx:${14 * i}px;--gd:${i * 45}ms`;
      const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
      sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 800 + i * 45);
    }
  }, rel);
}

/* Effets du Iop autour de son sprite : images fantômes, onde de choc au sol, braises */
function iopFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-iop'); if (!svg) return;
  for (let i = 1; i <= 3; i++) {
    const g = document.createElement('div'); g.className = 'ip-ghost'; g.style.cssText = `--gx:${[16, 30, 22][v] * i}px;--gd:${i * 50}ms`;
    const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
    sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 900 + i * 50);
  }
  const wave = (big) => { const w = document.createElement('span'); w.className = 'ip-wave' + (big ? ' big' : ''); sp.appendChild(w); setTimeout(() => w.remove(), 800); iopEmbers(sp, big ? 16 : 10); };
  if (v === 0) setTimeout(wave, 300);
  if (v === 1) { setTimeout(wave, 230); setTimeout(wave, 430); }
  if (v === 2) setTimeout(() => wave(true), 470);
}
/* Effets du Sram : images fantômes violettes, fumée au pas d'ombre, éclats de poison, traits de lame */
function sramFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-sram'); if (!svg) return;
  if (v !== 1) for (let i = 1; i <= 3; i++) {
    const g = document.createElement('div'); g.className = 'sr-ghost'; g.style.cssText = `--gx:${[18, 0, 14][v] * i}px;--gd:${i * 45}ms`;
    const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
    sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 900 + i * 45);
  }
  if (v === 1) { smokePuff(sp, true); setTimeout(() => smokePuff(sp, true), 330); }
  const line = (r, d) => { const l = document.createElement('i'); l.className = 'sr-slashline'; l.style.cssText = `--r:${r}deg;--d:${d}ms`; sp.appendChild(l); setTimeout(() => l.remove(), d + 500); };
  if (v === 0) { line(-28, 250); line(30, 290); }
  if (v === 1) { line(-18, 380); line(24, 420); }
  if (v === 2) [0, 1, 2, 3, 4].forEach(i => line(-40 + i * 20, 140 + i * 90));
  setTimeout(() => sramSparks(sp, v === 2 ? 14 : 9), v === 1 ? 380 : v === 2 ? 300 : 260);
}
function sramSparks(sp, n) {
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = 'sr-spark';
    const a = -Math.PI * (.05 + Math.random() * .9);
    e.style.cssText = `--dx:${(Math.cos(a) * (22 + Math.random() * 40)).toFixed(0)}px;--dy:${(Math.sin(a) * (20 + Math.random() * 36)).toFixed(0)}px;--s:${(3 + Math.random() * 4).toFixed(1)}px;animation-delay:${(Math.random() * 90).toFixed(0)}ms`;
    sp.appendChild(e); setTimeout(() => e.remove(), 1000);
  }
}
/* Effets de l'Ecaflip : images fantômes (dorées si Face, bleutées si Pile), éclairs de griffes, pièces et pattes */
function ecaFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-ecaflip'); if (!svg) return;
  const face = unit.classList.contains('eca-face'), col = face ? 'gold' : 'teal';
  for (let i = 1; i <= 3; i++) {
    const g = document.createElement('div'); g.className = 'ec-ghost ' + col; g.style.cssText = `--gx:${[18, 26, 10][v] * i}px;--gd:${i * 45}ms`;
    const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
    sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 900 + i * 45);
  }
  const line = (r, d) => { const l = document.createElement('i'); l.className = 'ec-line ' + col; l.style.cssText = `--r:${r}deg;--d:${d}ms`; sp.appendChild(l); setTimeout(() => l.remove(), d + 500); };
  if (v === 0) [0, 1, 2].forEach(i => line(-30 + i * 28, 120 + i * 110));  // triple griffe
  if (v === 1) { line(-10, 330); line(20, 380); setTimeout(() => coinBurst(sp, 7, '🪙'), 300); } // pièce éclair
  if (v === 2) { line(-45, 330); line(35, 360); setTimeout(() => coinBurst(sp, 6, '🐾'), 420); } // pirouette
}
/* Effets du Xélor : écho du temps (images bleutées qui traînent derrière lui), cadran qui s'ouvre, grains de sable dorés */
function xelFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-xelor'); if (!svg) return;
  for (let i = 1; i <= 3; i++) {
    const g = document.createElement('div'); g.className = 'xl-ghost'; g.style.cssText = `--gx:${[16, 12, 8][v] * i}px;--gd:${i * 70}ms`;
    const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
    sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 1100 + i * 70);
  }
  const ring = d => { const r = document.createElement('i'); r.className = 'xl-ring'; r.style.setProperty('--d', d + 'ms'); sp.appendChild(r); setTimeout(() => r.remove(), d + 800); };
  ring(v === 1 ? 240 : 140); if (v === 2) ring(320);
  const n = [8, 10, 14][v];
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = 'xl-sand'; const a = -Math.PI * (.05 + Math.random() * .9) + (v === 0 ? -.5 : 0);
    e.style.cssText = `--dx:${(Math.cos(a) * (22 + Math.random() * 42)).toFixed(0)}px;--dy:${(Math.sin(a) * (20 + Math.random() * 38)).toFixed(0)}px;--s:${(2.5 + Math.random() * 3.5).toFixed(1)}px;--d:${(140 + Math.random() * 260).toFixed(0)}ms`;
    sp.appendChild(e); setTimeout(() => e.remove(), 1300);
  }
}
/* Effets du Sacrieur : images rémanentes sanglantes, arcs de lame, gouttes de sang */
function sacFlourish(unit, v) {
  if (!FX_OK()) return;
  const sp = unit.querySelector('.sprite'), svg = sp && sp.querySelector('.hs-sacrieur'); if (!svg) return;
  for (let i = 1; i <= 3; i++) {
    const g = document.createElement('div'); g.className = 'sc-ghost'; g.style.cssText = `--gx:${[18, 10, 14][v] * i}px;--gd:${i * 60}ms`;
    const c = svg.cloneNode(true); const d = c.querySelector('defs'); if (d) d.remove(); g.appendChild(c);
    sp.insertBefore(g, sp.firstChild); setTimeout(() => g.remove(), 1000 + i * 60);
  }
  const arc = (r, d) => { const e = document.createElement('i'); e.className = 'sc-slash'; e.style.cssText = `--r:${r}deg;--d:${d}ms`; sp.appendChild(e); setTimeout(() => e.remove(), d + 600); };
  if (v === 0) arc(-40, 260); if (v === 1) { arc(-10, 200); arc(120, 300); arc(250, 400); } if (v === 2) { arc(-60, 320); arc(-20, 380); }
  const n = [10, 14, 12][v];
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = 'sc-drop'; const a = -Math.PI * (.05 + Math.random() * .8);
    e.style.cssText = `--dx:${(Math.cos(a) * (24 + Math.random() * 46)).toFixed(0)}px;--dy:${(Math.sin(a) * (22 + Math.random() * 34)).toFixed(0)}px;--s:${(3 + Math.random() * 4).toFixed(1)}px;--d:${(240 + Math.random() * 260).toFixed(0)}ms`;
    sp.appendChild(e); setTimeout(() => e.remove(), 1500);
  }
}
function iopEmbers(sp, n) {
  for (let i = 0; i < n; i++) {
    const e = document.createElement('i'); e.className = 'ip-ember';
    const a = -Math.PI * (.05 + Math.random() * .9);
    e.style.cssText = `--dx:${(Math.cos(a) * (20 + Math.random() * 42)).toFixed(0)}px;--dy:${(Math.sin(a) * (22 + Math.random() * 40)).toFixed(0)}px;--s:${(3 + Math.random() * 4).toFixed(1)}px;animation-delay:${(Math.random() * 90).toFixed(0)}ms`;
    sp.appendChild(e); setTimeout(() => e.remove(), 1000);
  }
}

/* Joue l'animation d'un sort dans la carte de combat d'un héros */
/* ---------------------- Zobal : une attaque différente par masque ----------------------
   😆 Rieur : éclat de rire solaire, « HA ! », croissants de sourire dorés qui explosent en étoile.
   😢 Pleureur : nuage de chagrin, jets de larmes, vague de sanglot, éclaboussure et pluie.
   🤪 Farceur : culbute folle, masques-boomerangs, confettis et « BOUM ! » de dessin animé. */
const ZOB_CONF = ['#ffd24a', '#ff6aa8', '#5ee0d4', '#9ae860', '#c58aff', '#ff7a3a'];
function zbFoeAt(scene, p) {
  let best = null, bd = 1e9;
  scene.querySelectorAll('.unit.mon').forEach(m => { const q = fxPos(scene, m.querySelector('.sprite') || m); if (!q) return; const d = Math.hypot(q.x - p.x, q.y - p.y); if (d < bd) { bd = d; best = m; } });
  return best;
}
function zbMark(el, cls, ms) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); }
function zbArc(a, b, lift, jit = 0) { return { dx: b.x - a.x, dy: b.y - a.y, mx: (b.x - a.x) * .5, my: (b.y - a.y) * .5 - lift + jit }; }
function zobRire(scene, from, tos, pw, hero) {
  const sw = hero.offsetWidth, sh = hero.offsetHeight, hd = { x: from.x + sw * .03, y: from.y - sh * .27 }, at = (ms, fn) => setTimeout(() => { if (scene.isConnected) fn(); }, ms);
  at(100, () => { // le rire éclate : soleil derrière le masque
    const sun = fxEl(scene, 'zb-sun', hd.x, hd.y);
    fxAnim(sun, [{ transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.25) rotate(28deg)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-50%) scale(2.3) rotate(70deg)', opacity: 0 }], { duration: 780 });
    const r = fxEl(scene, 'sfx-ring thick', hd.x, hd.y, '', '--c:#ffe27a'); fxAnim(r, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(2.6)', opacity: 0 }], { duration: 560 });
  });
  [0, 1, 2].forEach(i => at(120 + i * 140, () => {
    const e = fxEl(scene, 'zb-txt', hd.x + (i - 1) * 20 + 8, hd.y - 12, 'HA!', `--c:#ffe27a;--o:#7a4300;--s:${20 + i * 4 + Math.round(pw * 3)}px`);
    fxAnim(e, [{ transform: 'translate(-50%,-50%) scale(.2) rotate(-12deg)', opacity: 0 }, { transform: `translate(-50%,-95%) scale(1.2) rotate(${(i - 1) * 12}deg)`, opacity: 1, offset: .25 }, { transform: `translate(-50%,-210%) scale(1) rotate(${(i - 1) * 16}deg)`, opacity: 0 }], { duration: 800 });
  }));
  tos.forEach((p, ti) => {
    const n = Math.max(2, Math.round(2 + pw));
    for (let k = 0; k < n; k++) at(330 + k * 85 + ti * 30, () => { // croissants de sourire dorés
      const s = fxEl(scene, 'zb-smile', hd.x + 10, hd.y + 8), a = zbArc(hd, p, 46 + Math.random() * 26, (k - (n - 1) / 2) * 14);
      fxAnim(s, [{ transform: 'translate(-50%,-50%) scale(.4) rotate(0deg)', opacity: 0 }, { transform: `translate(calc(-50% + ${a.mx}px),calc(-50% + ${a.my}px)) scale(1.1) rotate(300deg)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${a.dx}px),calc(-50% + ${a.dy}px)) scale(1.5) rotate(640deg)`, opacity: 1 }], { duration: 430, easing: 'cubic-bezier(.4,0,.6,1)' });
      for (let j = 1; j <= 5; j++) setTimeout(() => { if (!scene.isConnected) return; const f = j / 6, sp = fxEl(scene, 'sfx-spark', hd.x + 10 + a.dx * f, hd.y + 8 + a.dy * f + (Math.sin(f * Math.PI) * -(46 + 10)), '', '--c:#ffe27a'); fxAnim(sp, [{ transform: 'translate(-50%,-50%) scale(1.2)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(.2)', opacity: 0 }], { duration: 300 }); }, j * 70);
      if (k === n - 1) setTimeout(() => { // impact : étoile d'or
        if (!scene.isConnected) return;
        const st = fxEl(scene, 'zb-star', p.x, p.y); fxAnim(st, [{ transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 }, { transform: `translate(-50%,-50%) scale(${1.1 + pw * .35}) rotate(40deg)`, opacity: 1, offset: .35 }, { transform: `translate(-50%,-50%) scale(${1.6 + pw * .4}) rotate(80deg)`, opacity: 0 }], { duration: 520 });
        for (let q = 0; q < 10; q++) { const ang = Math.random() * Math.PI * 2, d = 26 + Math.random() * 34, c = fxEl(scene, 'zb-coin', p.x, p.y);
          fxAnim(c, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d}px),calc(-50% + ${Math.sin(ang) * d - 14}px)) scale(.5)`, opacity: 1, offset: .6 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d * 1.1}px),calc(-50% + ${Math.sin(ang) * d + 10}px)) scale(.2)`, opacity: 0 }], { duration: 560 + Math.random() * 200 }); }
        zbMark(zbFoeAt(scene, p), 'zb-glow', 650);
      }, 430);
    });
  });
}
function zobLarme(scene, from, tos, pw, hero) {
  const sw = hero.offsetWidth, sh = hero.offsetHeight, hd = { x: from.x + sw * .03, y: from.y - sh * .27 }, at = (ms, fn) => setTimeout(() => { if (scene.isConnected) fn(); }, ms);
  const eyes = [{ x: hd.x - sw * .05, y: hd.y + sh * .02 }, { x: hd.x + sw * .08, y: hd.y + sh * .02 }];
  const cl = fxEl(scene, 'zb-cloud', hd.x, hd.y - sh * .3, '<i></i><i></i><i></i><i></i>');
  fxAnim(cl, [{ transform: 'translate(-50%,-50%) scale(.1)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: .8 }, { transform: 'translate(-50%,-70%) scale(.8)', opacity: 0 }], { duration: 1150 });
  at(80, () => { const e = fxEl(scene, 'zb-txt', hd.x - 6, hd.y - 14, 'snif…', '--c:#cfeaff;--o:#12386a;--s:15px'); fxAnim(e, [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: 'translate(-50%,-110%) scale(1)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-170%) scale(1)', opacity: 0 }], { duration: 700 }); });
  tos.forEach((p, ti) => {
    const nd = 14 + Math.round(pw * 6);
    eyes.forEach((ey, ei) => { for (let i = 0; i < nd / 2; i++) at(260 + i * 32 + ei * 16 + ti * 40, () => { // jets de larmes
      const d = fxEl(scene, 'zb-tear', ey.x, ey.y), tx = p.x + (Math.random() - .5) * 26, ty = p.y + (Math.random() - .5) * 18, a = zbArc(ey, { x: tx, y: ty }, 52 + Math.random() * 40);
      fxAnim(d, [{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 1 }, { transform: `translate(calc(-50% + ${a.mx}px),calc(-50% + ${a.my}px)) scale(1.1)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${a.dx}px),calc(-50% + ${a.dy}px)) scale(.9)`, opacity: 1 }], { duration: 440 + Math.random() * 90, easing: 'cubic-bezier(.35,.1,.65,.9)' }); }); });
    at(300 + ti * 40, () => { // vague de sanglot portée par le bâton
      const w = fxEl(scene, 'zb-wave', from.x + sw * .28, from.y + sh * .02);
      fxAnim(w, [{ transform: 'translate(-50%,-50%) scale(.3,.3) rotate(-18deg)', opacity: 0 }, { transform: `translate(calc(-50% + ${(p.x - from.x) * .5}px),calc(-50% + ${(p.y - from.y) * .5 - 14}px)) scale(1.1,.9) rotate(-8deg)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${p.x - from.x - sw * .28}px),calc(-50% + ${p.y - from.y - 4}px)) scale(1.6,1.1) rotate(0deg)`, opacity: 0 }], { duration: 640, easing: 'ease-in' });
    });
    at(260 + (nd / 2) * 32 + 300 + ti * 40, () => { // éclaboussure
      for (let r = 0; r < 2; r++) { const rp = fxEl(scene, 'zb-ripple', p.x, p.y + 14); fxAnim(rp, [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 1 }, { transform: `translate(-50%,-50%) scale(${2.2 + r * .8})`, opacity: 0 }], { duration: 620, delay: r * 110 }); }
      for (let q = 0; q < 14; q++) { const ang = -Math.PI * (.08 + Math.random() * .84), d = 24 + Math.random() * 40, c = fxEl(scene, 'zb-tear sm', p.x, p.y);
        fxAnim(c, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d}px),calc(-50% + ${Math.sin(ang) * d}px)) scale(.8)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d * 1.2}px),calc(-50% + ${Math.sin(ang) * d + 30}px)) scale(.4)`, opacity: 0 }], { duration: 560 + Math.random() * 200, easing: 'ease-out' }); }
      for (let q = 0; q < 3; q++) { const m = fxEl(scene, 'zb-mist', p.x + (q - 1) * 14, p.y); fxAnim(m, [{ transform: 'translate(-50%,-50%) scale(.3)', opacity: .8 }, { transform: `translate(-50%,-${90 + q * 20}%) scale(1.8)`, opacity: 0 }], { duration: 800, delay: q * 70 }); }
      zbMark(zbFoeAt(scene, p), 'zb-wet', 1000);
    });
  });
  at(520, () => { for (let i = 0; i < 22; i++) { const x = Math.random() * scene.offsetWidth, e = fxEl(scene, 'zb-rain', x, -20); fxAnim(e, [{ transform: 'translateY(0)', opacity: .9 }, { transform: `translateY(${scene.offsetHeight + 40}px)`, opacity: .9 }], { duration: 520 + Math.random() * 260, delay: Math.random() * 360, easing: 'linear' }); } });
}
function zobFarce(scene, from, tos, pw, hero) {
  const sw = hero.offsetWidth, sh = hero.offsetHeight, at = (ms, fn) => setTimeout(() => { if (scene.isConnected) fn(); }, ms);
  for (let i = 0; i < 10; i++) at(140 + i * 48, () => { // la culbute sème des étoiles de toutes les couleurs
    for (let k = 0; k < 2; k++) { const a = Math.random() * Math.PI * 2, r = 16 + Math.random() * 26, c = ZOB_CONF[(i + k) % ZOB_CONF.length], s = fxEl(scene, 'sfx-spark', from.x + Math.cos(a) * 12, from.y - 10 + Math.sin(a) * 12, '', `--c:${c}`);
      fxAnim(s, [{ transform: 'translate(-50%,-50%) scale(1.5)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px),calc(-50% + ${Math.sin(a) * r - 10}px)) scale(.2)`, opacity: 0 }], { duration: 460 }); }
  });
  tos.forEach((p, ti) => {
    const n = 3 + Math.round(pw), cols = [['#ffc83a', '#d88a10'], ['#8ec4f4', '#3f78c8'], ['#9ae860', '#3f9a2a'], ['#ff7ab8', '#c83a7a'], ['#c58aff', '#6a30b8']];
    for (let k = 0; k < n; k++) {
      at(380 + k * 70 + ti * 30, () => { // masques-boomerangs
        const m = fxEl(scene, 'zb-mini', from.x + sw * .1, from.y - sh * .05, '', `--c1:${cols[k % 5][0]};--c2:${cols[k % 5][1]}`), jy = (k - (n - 1) / 2) * 12, dx = p.x - from.x - sw * .1, dy = p.y - from.y + sh * .05;
        fxAnim(m, [{ transform: 'translate(-50%,-50%) scale(.5) rotate(0deg)', opacity: 1 }, { transform: `translate(calc(-50% + ${dx * .5}px),calc(-50% + ${dy * .5 - 34 + jy}px)) scale(1) rotate(360deg)`, opacity: 1, offset: .28 }, { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy + jy * .4}px)) scale(1.35) rotate(640deg)`, opacity: 1, offset: .5 }, { transform: `translate(calc(-50% + ${dx * .45}px),calc(-50% + ${dy * .4 + 24 - jy}px)) scale(.9) rotate(900deg)`, opacity: 1, offset: .78 }, { transform: 'translate(-50%,-50%) scale(.5) rotate(1160deg)', opacity: 0 }], { duration: 860, easing: 'ease-in-out' });
      });
    }
    at(380 + 400 + ti * 30, () => { // BOUM !
      const b = fxEl(scene, 'zb-boum', p.x, p.y, '<span>BOUM !</span>'); fxAnim(b, [{ transform: 'translate(-50%,-50%) scale(.2) rotate(-14deg)', opacity: 1 }, { transform: `translate(-50%,-50%) scale(${1.1 + pw * .25}) rotate(6deg)`, opacity: 1, offset: .3 }, { transform: `translate(-50%,-50%) scale(${1 + pw * .2}) rotate(-3deg)`, opacity: 1, offset: .7 }, { transform: `translate(-50%,-50%) scale(${1.25 + pw * .2}) rotate(0deg)`, opacity: 0 }], { duration: 640 });
      for (let q = 0; q < 26 + pw * 8; q++) { const ang = -Math.PI * (.02 + Math.random() * .96) + (Math.random() < .3 ? Math.PI : 0), d = 30 + Math.random() * 60, c = fxEl(scene, 'zb-conf', p.x, p.y, '', `background:${ZOB_CONF[q % ZOB_CONF.length]}`);
        fxAnim(c, [{ transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d}px),calc(-50% + ${Math.sin(ang) * d}px)) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: .45 }, { transform: `translate(calc(-50% + ${Math.cos(ang) * d * 1.3}px),calc(-50% + ${Math.sin(ang) * d + 60}px)) rotate(${Math.random() * 900}deg)`, opacity: 0 }], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.6,.4,1)' }); }
      zbMark(zbFoeAt(scene, p), 'zb-boing', 760);
    });
  });
}
FX_KIND.zob = function (scene, from, tos, fx, hero) {
  const unit = hero.closest('.unit'), mask = (unit && unit.dataset.mask) || 'rire', pw = fx[3] || 1;
  (mask === 'larme' ? zobLarme : mask === 'farce' ? zobFarce : zobRire)(scene, from, tos, pw, hero);
};

function playSpellFx(card, cast) {
  if (!FX_OK()) return;
  const scene = card.querySelector('.scene'); if (!scene) return;
  const heroUnit = card.querySelector('[data-k="fighter"]'); // le personnage dessiné joue son geste (coup de pelle, ou geste de soutien)
  const fx = SPELL_FX[cast.id] || ['proj', '#ffffff', '●'];
  const support = ['buff', 'heal'].includes((SPELL_FX[cast.id] || [])[0]);
  let lead = 0, isCra = false;
  if (heroUnit) {
    if (!support && heroUnit.querySelector('.hs-cra')) { isCra = true; lead = Math.max(0, craShoot(heroUnit, cast.id)); } // l'archère bande son arc : la flèche part au lâcher
    else heroGesture(heroUnit, support ? 'cheer' : 'atk');
  }
  const go = () => {
    if (!scene.isConnected) return;
    const heroSprite = card.querySelector('[data-k="fighter"] .sprite');
    const from = fxPos(scene, heroSprite); if (!from) return;
    if (isCra) { from.x += heroSprite.offsetWidth * .39; from.y += heroSprite.offsetHeight * .06; } // la flèche part de la corde, pas du centre du sprite
    const tos = cast.t.map(i => fxPos(scene, card.querySelector(`[data-mon="${i}"] .sprite`))).filter(Boolean);
    const kind = FX_KIND[fx[0]] || FX_KIND.proj;
    if (!tos.length && !support) return;
    kind(scene, from, tos, fx, heroSprite);
  };
  if (lead > 0) setTimeout(go, lead); else go();
}
