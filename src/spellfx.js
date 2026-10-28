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
  // Eniripsa : mots
  mot_blessant:      ['proj', '#ff8ad8', '✦'],
  mot_soignant:      ['heal', '#ff9fe0', '💗'],
  mot_stimulant:     ['buff', '#ff8ad8', '✨'],
  mot_interdit:      ['beam', '#c77dff'],
  mot_regeneration:  ['heal', '#7dffb0', '💖', 1.5],
  mot_tourmente:     ['wave', '#ff6ec7'],
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
  return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
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

/* Joue l'animation d'un sort dans la carte de combat d'un héros */
function playSpellFx(card, cast) {
  if (!FX_OK()) return;
  const scene = card.querySelector('.scene'); if (!scene) return;
  const fx = SPELL_FX[cast.id] || ['proj', '#ffffff', '●'];
  const heroSprite = card.querySelector('[data-k="fighter"] .sprite');
  const from = fxPos(scene, heroSprite); if (!from) return;
  const tos = cast.t.map(i => fxPos(scene, card.querySelector(`[data-mon="${i}"] .sprite`))).filter(Boolean);
  const kind = FX_KIND[fx[0]] || FX_KIND.proj;
  if (!tos.length && !['buff', 'heal'].includes(fx[0])) return;
  kind(scene, from, tos, fx, heroSprite);
}
