/* =====================================================================
   ICÔNES D'OBJETS HÉROÏQUES v5a — donjons héroïques : Bouftou Royal, Bworkette, Dragon Cochon
   Rang 1 · Bouftou Royal : laine crème bouclée, cornes brunes en spirale, or
   Rang 2 · Bworkette : peau tannée, rouge brique, ocre, os, plumes, peintures de guerre
   Rang 3 · Dragon Cochon : rose lard, or, pièces, braise
   Dessins 100 % originaux (viewBox 32). Complète ITEM_ART (art.js … art4d.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _gem, _spark…).
   Helpers locaux préfixés _a5a (tous les fichiers sont concaténés dans la même portée).
   ===================================================================== */

/* dégradé à 3 arrêts (userSpace non utilisé : boîte englobante, comme _lg) */
const _a5ag3 = (id, a, b, c, x2 = 0, y2 = 1, x1 = 0, y1 = 0) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const _a5agold = (id, x2 = 1, y2 = 1) => _a5ag3(id, '#fff6c0', '#f0b83a', '#8a5a0a', x2, y2);
const _a5an = v => +v.toFixed(2);
/* spirale (angles en degrés, 0 = droite, 90 = bas) : le rayon passe de r0 à r1 */
const _a5aspi = (cx, cy, r0, r1, a0, a1, n = 44, mx = 0) => Array.from({ length: n }, (_, i) => { const t = i / (n - 1), a = (a0 + (a1 - a0) * t) * Math.PI / 180, r = r0 + (r1 - r0) * t, x = cx + r * Math.cos(a); return [mx ? mx - x : x, cy + r * Math.sin(a)]; });
/* corne effilée le long d'une ligne médiane : largeur w0 → w1, anneaux (stries) et reflet ; bandes = [[t, couleur]] colliers posés en travers */
const _a5ahorn = (pts, w0, w1, gid, o = {}) => {
  const n = pts.length, L = [], R = [], M = [];
  const ridges = o.ridges == null ? 6 : o.ridges, rc = o.rc || '#3a200c', hl = o.hl || '#ffeccc';
  pts.forEach((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2;
    L.push([p[0] - dy * w, p[1] + dx * w]); R.push([p[0] + dy * w, p[1] - dx * w]); M.push([p[0] - dy * w * .5, p[1] + dx * w * .5]);
  });
  const P = a => a.map(([x, y]) => `${_a5an(x)} ${_a5an(y)}`).join('L');
  let s = `<path d="M${P(L)}L${P(R.slice().reverse())}Z" fill="url(#${gid})" ${_K}/>`;
  for (let k = 1; k <= ridges; k++) { const i = Math.round(k / (ridges + 1) * (n - 1)); s += `<path d="M${_a5an(L[i][0])} ${_a5an(L[i][1])}L${_a5an((L[i][0] + R[i][0]) / 2 + (R[i][0] - L[i][0]) * .08)} ${_a5an((L[i][1] + R[i][1]) / 2 + (R[i][1] - L[i][1]) * .08)}" stroke="${rc}" stroke-width=".7" stroke-linecap="round" opacity=".7" fill="none"/>`; }
  s += `<path d="M${P(M.slice(2, n - 3))}" fill="none" stroke="${hl}" stroke-width=".65" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>`;
  (o.bands || []).forEach(([t, col]) => { const i = Math.round(t * (n - 1)), x1 = L[i][0] + (L[i][0] - R[i][0]) * .12, y1 = L[i][1] + (L[i][1] - R[i][1]) * .12, x2 = R[i][0] + (R[i][0] - L[i][0]) * .12, y2 = R[i][1] + (R[i][1] - L[i][1]) * .12; s += `<path d="M${_a5an(x1)} ${_a5an(y1)}L${_a5an(x2)} ${_a5an(y2)}" stroke="#140c06" stroke-opacity=".9" stroke-width="2.4" stroke-linecap="round"/><path d="M${_a5an(x1)} ${_a5an(y1)}L${_a5an(x2)} ${_a5an(y2)}" stroke="${col}" stroke-width="1.3" stroke-linecap="round"/>`; });
  return s;
};
/* dégradé de corne brune du Bouftou Royal */
const _a5ahornG = (id) => _a5ag3(id, '#f1d08e', '#b47a3a', '#5a3416', 1, 1);
/* nuage de laine : silhouette sombre d'un seul tenant, puis lobes clairs ombrés un à un (liste de [x, y, r]) */
const _a5acloud = (list, g, edge = '#b8a67c') => `<g fill="#140c06" stroke="#140c06" stroke-opacity=".92" stroke-width="1.9" stroke-linejoin="round">${list.map(([x, y, r]) => `<circle cx="${_a5an(x)}" cy="${_a5an(y)}" r="${r}"/>`).join('')}</g>` + list.map(([x, y, r]) => `<circle cx="${_a5an(x)}" cy="${_a5an(y)}" r="${r}" fill="url(#${g})" stroke="${edge}" stroke-width=".45" stroke-opacity=".75"/>`).join('');
/* plume : base en (x,y), pointe dans la direction ang (0 = vers le haut), dégradé c1 → c2, tige claire, deux encoches de barbes */
const _a5afea = (x, y, ang, len, c1, c2, w = .26) => { const g = _id(); return `<defs>${_lg(g, c1, c2)}</defs><g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0C${-len * w} ${-len * .22} ${-len * w * 1.1} ${-len * .74} ${-len * .05} ${-len}C${len * .1} ${-len * .96} ${len * w * 1.1} ${-len * .72} ${len * w} ${-len * .26}C${len * w * .7} ${-len * .1} ${len * .1} ${-len * .03} 0 0Z" fill="url(#${g})" ${_K}/><path d="M0 -.8Q-.1 ${-len * .5} -.05 ${-len + 1.1}" fill="none" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".6"/><path d="M${-len * w * .9} ${-len * .46}l${len * w * .55} ${len * .06}M${len * w * .95} ${-len * .5}l${-len * w * .55} ${len * .06}" stroke="#140c06" stroke-width=".45" stroke-linecap="round" opacity=".55"/></g>`; };
/* perles d'os alignées sur un tracé (contour sombre dessous) */
const _a5abeads = (d, c, w = 1.8, gap = 2.2) => `<path d="${d}" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="${w + .9}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/>`;
/* croc / dent pendue : base en (x,y), pointe dans la direction ang (0 = vers le bas) */
const _a5afang = (x, y, ang, len, w, g) => `<g transform="translate(${x} ${y}) rotate(${-ang})"><path d="M${-w} 0C${-w * .9} ${len * .5} ${-w * .3} ${len * .85} ${w * .35} ${len}C${w * .8} ${len * .6} ${w} ${len * .3} ${w} 0Z" fill="url(#${g})" ${_K}/><path d="M${-w * .45} ${len * .1}C${-w * .4} ${len * .4} ${-w * .1} ${len * .65} ${w * .1} ${len * .8}" fill="none" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".8"/></g>`;
/* pièce d'or inclinée (épaisseur, anneau gravé, reflet) : centre (x,y), demi-axes rx/ry, rotation rot, dégradé g */
const _a5acoin = (x, y, rx, ry, rot, g) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse cy="${_a5an(Math.max(.5, ry * .3))}" rx="${rx}" ry="${ry}" fill="#8a5a0a" ${_K}/><ellipse rx="${rx}" ry="${ry}" fill="url(#${g})" ${_K}/><ellipse rx="${_a5an(rx * .66)}" ry="${_a5an(ry * .66)}" fill="none" stroke="#a8741a" stroke-width=".45" opacity=".85"/><path d="M${_a5an(-rx * .6)} ${_a5an(-ry * .15)}Q${_a5an(-rx * .35)} ${_a5an(-ry * .75)} ${_a5an(rx * .3)} ${_a5an(-ry * .7)}" stroke="#fff" stroke-width=".55" fill="none" stroke-linecap="round" opacity=".9"/></g>`;
/* tête de cochon-dragon dorée, de face, centrée en (x,y) (largeur ≈ 12 × s) : cornes, oreilles, groin à deux narines, yeux de braise, petites défenses */
const _a5apig = (x, y, s, g, sw = .9) => {
  const K = `stroke="#140c06" stroke-opacity=".92" stroke-width="${_a5an(sw / s)}" stroke-linejoin="round" stroke-linecap="round"`, k = `stroke="#140c06" stroke-opacity=".6" stroke-width="${_a5an(sw * .55 / s)}" stroke-linejoin="round"`;
  const sn = _id();
  const back = m => `<g transform="scale(${m} 1)"><path d="M-2.8 -3.8C-4.2 -5.6 -5.8 -5.4 -6.6 -8C-4 -7.4 -2.2 -6.2 -1.2 -4.2Z" fill="url(#${g})" ${K}/><path d="M-4.6 -2.4L-7.4 -5.4L-6.6 -1.2Z" fill="url(#${g})" ${K}/></g>`;
  const front = m => `<g transform="scale(${m} 1)"><ellipse cx="-2.8" cy="-.4" rx="1.4" ry=".95" transform="rotate(24 -2.8 -.4)" fill="#ff7a1a" ${k}/><ellipse cx="-2.8" cy="-.4" rx=".4" ry=".8" transform="rotate(24 -2.8 -.4)" fill="#2a0a02"/><circle cx="-3.2" cy="-.9" r=".3" fill="#fff"/><path d="M-3 5.4Q-4.8 5.2 -4.8 2.6Q-3.8 3.8 -2.4 4Z" fill="#fffaf0" ${k}/><path d="M-4.6 -2.6Q-3.4 -3.4 -1.8 -3.2" stroke="#8a5a0a" stroke-width=".5" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
  return `<defs>${_rg(sn, '#fff2b0', '#d89a2a', .4, .3, .9)}</defs><g transform="translate(${x} ${y}) scale(${s})">${back(1)}${back(-1)}<path d="M0 -5C3.6 -5 5.8 -2.6 5.8 .6C5.8 4.4 3.4 6.4 0 6.4C-3.4 6.4 -5.8 4.4 -5.8 .6C-5.8 -2.6 -3.6 -5 0 -5Z" fill="url(#${g})" ${K}/>${front(1)}${front(-1)}<ellipse cx="0" cy="2.7" rx="3.5" ry="2.7" fill="url(#${sn})" ${K}/><ellipse cx="-1.25" cy="2.7" rx=".75" ry="1.05" fill="#3a1c06"/><ellipse cx="1.25" cy="2.7" rx=".75" ry="1.05" fill="#3a1c06"/><path d="M-2.4 1.1Q-1 .2 .6 .5" stroke="#fff" stroke-width=".5" fill="none" stroke-linecap="round" opacity=".85"/></g>`;
};
/* gemme taillée en facettes (rond) : a = clair, b = foncé, c = reflet de bord */
const _a5acut = (x, y, r, a, b, c = '#fff') => { const i = _id(); return `<defs>${_rg(i, a, b, .36, .3, .85)}</defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${i})" ${_K}/><path d="M${_a5an(x)} ${_a5an(y - r * .72)}L${_a5an(x + r * .62)} ${_a5an(y)}L${_a5an(x)} ${_a5an(y + r * .72)}L${_a5an(x - r * .62)} ${_a5an(y)}Z" fill="none" stroke="${c}" stroke-width=".45" opacity=".55"/><path d="M${_a5an(x - r * .62)} ${_a5an(y)}H${_a5an(x + r * .62)}M${_a5an(x)} ${_a5an(y - r * .72)}V${_a5an(y + r * .72)}" stroke="${c}" stroke-width=".3" opacity=".3"/><ellipse cx="${_a5an(x - r * .38)}" cy="${_a5an(y - r * .42)}" rx="${_a5an(r * .3)}" ry="${_a5an(r * .2)}" transform="rotate(-35 ${_a5an(x - r * .38)} ${_a5an(y - r * .42)})" fill="#fff" opacity=".85"/>`; };
/* aura dorée discrète des reliques : lueur douce + rayons très pâles */
const _a5aaura = (c1 = '#fff2a0', c2 = '#ffc83a') => { const i = _id(); return `<defs><radialGradient id="${i}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c1}" stop-opacity=".66"/><stop offset=".55" stop-color="${c2}" stop-opacity=".28"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient></defs><circle cx="16" cy="16" r="15.8" fill="url(#${i})"/>${Array.from({ length: 12 }, (_, k) => `<path transform="rotate(${k * 30} 16 16)" d="M15.4 16 16 1.4 16.6 16Z" fill="${c1}" opacity=".16"/>`).join('')}`; };

Object.assign(ITEM_ART, {

/* ======================= RANG 1 · BOUFTOU ROYAL : laine crème, cornes brunes, or ======================= */

/* Fléau du Bouftou Royal : manche de corne enroulée, chaîne d'or, boule de laine ceinte d'une couronne dorée hérissée de pointes */
hx_fleau_bouftou: () => {
  const h = _id(), g = _id(), w = _id();
  const hp = _a5aspi(6.5, 25.5, 4.9, 1.1, 332, 332 + 310, 56);
  const cx = 20.6, cy = 11.6, R = ang => ang * Math.PI / 180;
  const spike = (a, L) => `<g transform="translate(${cx} ${cy}) rotate(${a + 90})"><path d="M-2.2 -5.4L0 -${L}L2.2 -5.4Z" fill="url(#${g})" ${_K}/><path d="M0 -5.4L0 -${L}L2.2 -5.4Z" fill="#7a4a06" opacity=".4"/><path d="M-1 -6.4L-.2 -${L - 1.5}" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".75"/></g>`;
  const spikes = Array.from({ length: 10 }, (_, k) => 18 + k * 36).map((a, k) => spike(a, k % 2 ? 9.6 : 10.3)).join('');
  const bumpL = Array.from({ length: 9 }, (_, i) => { const a = R(i * 40 + 12); return [cx + Math.cos(a) * 3.3, cy + Math.sin(a) * 3.3, 2.4]; });
  /* chaîne : maillons de face / de chant */
  const ax = _a5an(cx + 4.6 * Math.cos(R(144))), ay = _a5an(cy + 4.6 * Math.sin(R(144))), sx = 10.7, sy = 22.8, ang = _a5an(Math.atan2(ay - sy, ax - sx) * 180 / Math.PI);
  const link = (t, thin) => { const x = _a5an(sx + (ax - sx) * t), y = _a5an(sy + (ay - sy) * t);
    return thin
      ? `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="-1.9" y="-.7" width="3.8" height="1.4" rx=".7" fill="#a8741a" stroke="#140c06" stroke-opacity=".9" stroke-width=".85"/><path d="M-1.3 -.2H1.3" stroke="#fff6c0" stroke-width=".45" stroke-linecap="round"/></g>`
      : `<g transform="translate(${x} ${y}) rotate(${ang})"><ellipse rx="2.3" ry="1.5" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.3"/><ellipse rx="2.3" ry="1.5" fill="none" stroke="url(#${g})" stroke-width="1.2"/><path d="M-1.5 -1.15Q0 -1.65 1.4 -1.2" stroke="#fff" stroke-width=".45" fill="none" opacity=".8"/></g>`; };
  return `<defs>${_a5ahornG(h)}${_a5agold(g)}${_rg(w, '#ffffff', '#d9ccae', .38, .3, .9)}</defs>
  ${_sh(16, 30.6, 12, 1)}
  ${spikes}
  <circle cx="${cx}" cy="${cy}" r="5.7" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.8"/><circle cx="${cx}" cy="${cy}" r="5.7" fill="none" stroke="url(#${g})" stroke-width="1.5"/>
  ${_a5acloud([...bumpL, [cx, cy, 4.3]], w)}
  ${_ln('M17.6 9.6a1.3 1.3 0 1 1 2.1 1.2M22 7.8a1.2 1.2 0 1 1 1.9 1.1M20.6 13.8a1.1 1.1 0 1 1 1.8 1M23.8 11.8a1 1 0 1 1 1.5 1', '#b8a67c', .55)}
  <ellipse cx="18.6" cy="8.4" rx="2" ry="1.2" transform="rotate(-34 18.6 8.4)" fill="#fff" opacity=".85"/>
  ${link(.26, 0)}${link(.5, 1)}${link(.76, 0)}
  ${[54, 126, 198, 270, 342].map((a, k) => _a5acut(_a5an(cx + 5.7 * Math.cos(R(a))), _a5an(cy + 5.7 * Math.sin(R(a))), .95, k % 2 ? '#ffe8a8' : '#ffc0c8', k % 2 ? '#e0801a' : '#c8102a')).join('')}
  ${_a5ahorn(hp, 3.6, .9, h, { ridges: 7 })}
  <circle cx="10.5" cy="22.9" r="2.1" fill="url(#${g})" ${_K}/><circle cx="10.5" cy="22.9" r=".9" fill="#3a2406"/>
  ${_spark(8.6, 7.4, '#fff', .9)}${_spark(28.6, 26.6, '#ffe9a0', .6)}`;
},

/* Anneau de Toison Royale : anneau d'or, collerette de laine bouclée, petites cornes en spirale de chaque côté, gemme ambrée */
hx_anneau_laine: () => {
  const h = _id(), g = _id(), w = _id();
  const gx = 16, gy = 11.4, R = a => a * Math.PI / 180;
  const horn = mx => _a5ahorn(_a5aspi(6.0, 9.6, 4.9, 1.0, 62, 62 + 305, 44, mx), 3.1, .8, h, { ridges: 5 });
  const wl = [...Array.from({ length: 9 }, (_, i) => { const a = R(i * 40 - 90 + 20); return [gx + Math.cos(a) * 5.3, gy + Math.sin(a) * 4.9, 2.7]; }), [gx, gy, 5]];
  return `<defs>${_a5ahornG(h)}${_a5agold(g)}${_rg(w, '#ffffff', '#d9ccae', .38, .3, .9)}</defs>${_sh(16, 29.8, 9.6, 1.3)}
  ${horn(0)}${horn(32)}
  <ellipse cx="16" cy="21.2" rx="8.5" ry="8.3" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.4"/><ellipse cx="16" cy="21.2" rx="8.5" ry="8.3" fill="none" stroke="url(#${g})" stroke-width="3.8"/>
  ${_ln('M9 24.6c1.2 3.4 3.8 5 7 5', '#6a4510', 1, .6)}${_ln('M8.8 18.4c.8-1.8 2.2-3.2 3.8-3.8', '#fff', .9, .65)}
  ${_ln('M10.8 27.2c1.2.9 2.6 1.4 4 1.5M21.2 27.2c-1.2.9-2.6 1.4-4 1.5', '#fff6c0', .5, .7)}
  ${_a5acloud(wl, w)}
  ${_ln('M10.4 8.4a1.3 1.3 0 1 1 2.1 1.2M19 6.6a1.2 1.2 0 1 1 2 1.1M21.6 12.8a1.1 1.1 0 1 1 1.9 1M9.6 13.6a1.1 1.1 0 1 1 1.8 1M14.2 17a1.1 1.1 0 1 1 1.8 .9M17.4 17.2a1 1 0 1 1 1.7 .9', '#b8a67c', .55)}
  <path d="M12.4 5.2c1.6-.9 3.6-1.1 5.4-.4" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round" opacity=".85"/>
  <circle cx="${gx}" cy="${gy}" r="4.5" fill="url(#${g})" ${_K}/><circle cx="${gx}" cy="${gy}" r="3.7" fill="none" stroke="#8a5a0a" stroke-width=".45" opacity=".8"/>
  ${_a5acut(gx, gy, 3.1, '#fff0b8', '#d8700a')}
  ${[45, 135, 225, 315].map(a => `<circle cx="${_a5an(gx + Math.cos(R(a)) * 3.5)}" cy="${_a5an(gy + Math.sin(R(a)) * 3.5)}" r=".85" fill="url(#${g})" ${_k}/>`).join('')}
  ${_spark(4.4, 4.6, '#fff', .9)}${_spark(28, 4.4, '#ffe9a0', .7)}${_spark(27.4, 27, '#fff', .6)}`;
},

/* Couronne du Bouftou Royal : or, cornes de bélier en spirale, liseré de laine, grand rubis ; aura dorée discrète */
hx_relique_bouftou: () => {
  const h = _id(), g = _id(), w = _id(), pe = _id();
  const horn = mx => _a5ahorn(_a5aspi(7.4, 11.8, 6.3, 1.4, 76, 76 + 290, 56, mx), 3.9, .8, h, { ridges: 8 });
  const topY = t => 18.8 + 3.6 * t * (1 - t), botY = t => 24.6 + 3.6 * t * (1 - t);
  const peak = (px, tip, hw, base = 21) => `<path d="M${px - hw} ${base}Q${px - hw * .55} ${(base + tip) / 2 + 1.6} ${px} ${tip}Q${px + hw * .55} ${(base + tip) / 2 + 1.6} ${px + hw} ${base}Z" fill="url(#${g})" ${_K}/><path d="M${px} ${tip}Q${px + hw * .55} ${(base + tip) / 2 + 1.6} ${px + hw} ${base}H${px}Z" fill="#7a4a06" opacity=".32"/><path d="M${px - hw * .45} ${base - 2}Q${px - hw * .35} ${(base + tip) / 2 + 2} ${px - .15} ${tip + 2}" stroke="#fff" stroke-width=".55" fill="none" stroke-linecap="round" opacity=".7"/>`;
  const trimL = Array.from({ length: 6 }, (_, i) => { const x = 16 + (i - 2.5) * 2.95, t = (x - 8.8) / 14.4; return [x, botY(t) + .1, 2.3]; });
  const pearl = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${pe})" ${_K}/><circle cx="${_a5an(x - r * .35)}" cy="${_a5an(y - r * .4)}" r="${_a5an(r * .32)}" fill="#fff"/>`;
  return `<defs>${_a5ahornG(h)}${_a5agold(g)}${_rg(w, '#ffffff', '#d9ccae', .38, .3, .9)}${_rg(pe, '#ffffff', '#cdb98a', .36, .3, .85)}</defs>
  ${_a5aaura()}${_sh(16, 29.6, 10.5, 1)}
  ${horn(0)}${horn(32)}
  ${peak(9.4, 13.6, 2.1)}${peak(22.6, 13.6, 2.1)}${peak(12.8, 10.8, 2.5)}${peak(19.2, 10.8, 2.5)}${peak(16, 7.8, 2.9)}
  ${pearl(9.4, 13.4, 1.05)}${pearl(22.6, 13.4, 1.05)}${pearl(12.8, 10.6, 1.25)}${pearl(19.2, 10.6, 1.25)}
  <path d="M8.4 18.8Q16 20.6 23.6 18.8L23.2 24.6Q16 26.4 8.8 24.6Z" fill="url(#${g})" ${_K}/>
  <path d="M8.4 18.8Q16 20.6 23.6 18.8L23.5 20.4Q16 22.2 8.5 20.4Z" fill="#fff" opacity=".25"/>
  ${_ln('M9 22.6Q16 24.4 23 22.6', '#8a5a0a', .5, .7)}
  ${[10.2, 12.4, 19.6, 21.8].map(x => { const t = (x - 8.6) / 14.8; return `<circle cx="${x}" cy="${_a5an((topY(t) + botY(t)) / 2 + 1.2)}" r=".6" fill="#fff6c0" ${_k}/>`; }).join('')}
  ${_a5acloud(trimL, w)}
  <circle cx="16" cy="22.6" r="4.2" fill="url(#${g})" ${_K}/>
  ${_a5acut(16, 22.6, 3.1, '#ffb8c0', '#b8081e', '#ffe0e4')}
  ${_gem(16, 7.4, 1.35, '#ffd0d8', '#d8142e')}
  ${_a5acut(11.6, 22.4, 1.3, '#fff0b8', '#d8700a')}${_a5acut(20.4, 22.4, 1.3, '#fff0b8', '#d8700a')}
  ${_spark(4.8, 5, '#fff', .9)}${_spark(27.6, 5.6, '#ffe9a0', .8)}${_spark(28, 27.4, '#fff', .6)}`;
},
/* ======================= RANG 2 · BWORKETTE : peau tannée, rouge brique, ocre, os, plumes, peintures de guerre ======================= */

/* Hache-Totem de la Bworkette : fer double dont le moyeu porte un visage totémique sculpté, plumes rouges et colliers d'os au manche */
hx_hache_bworkette: () => {
  const st = _id(), fc = _id(), bn = _id(), rd = _id(), hd = _id(), cp = _id();
  const wingP = 'M11.8 5.8L5.2 3.6Q2 11.4 5.4 19.2L11.8 16.8Z';
  const wing = `<path d="${wingP}" fill="url(#${st})" ${_K}/><path d="M11.8 5.8L8 4.6Q5.6 11.4 8 17.9L11.8 16.8Z" fill="#1c2230" opacity=".22"/>
    ${_ln('M7.4 5Q4.4 11.4 7.5 18', '#d82a1a', 1.05, .95)}${_ln('M5.9 4.6Q2.9 11.4 5.9 18.4', '#fff', .7, .85)}
    ${[7.4, 11.6, 15.8].map(y => `<circle cx="10.2" cy="${y}" r=".7" fill="url(#${bn})" ${_k}/>`).join('')}`;
  const hub = 'M11.2 5Q16 .9 20.8 5L21.2 15.6Q16 24 10.8 15.6Z';
  return `<defs>${_a5ag3(st, '#f2f5fa', '#8a93a2', '#3a414e', 1, 1)}${_rg(fc, '#ffe6a8', '#7a3a0e', .36, .3, .95)}${_a5ag3(bn, '#fffaf0', '#e8dcc0', '#b8a67c', 1, 1)}${_lg(rd, '#ff6a4a', '#9a1208')}${_a5ag3(hd, '#c98a4e', '#8a5a2c', '#3e2412', 1, 0)}<clipPath id="${cp}"><path d="${hub}"/></clipPath></defs>
  ${_sh(16, 30.8, 10, 1)}
  <g transform="translate(16 16.4) scale(.88) translate(-16 -16) rotate(28 16 16)">
    ${_a5afea(11.2, 16.8, 204, 8.2, '#ff6a4a', '#8a0e08', .22)}${_a5afea(10.4, 17.2, 226, 6.2, '#ffb84a', '#b0480a', .22)}${_a5afea(20.8, 16.8, 156, 8.2, '#ff6a4a', '#8a0e08', .22)}${_a5afea(21.6, 17.2, 134, 6.2, '#ffb84a', '#b0480a', .22)}
    ${_rod(16, 18.4, 16, 30, '#b07a42', '#4a2a12', 2.5)}
    <rect x="14.6" y="19.8" width="2.8" height="3" rx=".6" fill="url(#${hd})" ${_K}/>${_ln('M14.8 20.8l2.4.7M14.8 22l2.4.7', '#2a1608', .5, .8)}
    ${_ln('M13 23.4Q16 26.6 19 23.4', '#5a3418', .85)}${_a5abeads('M13 23.4Q16 26.6 19 23.4', '#f4ecd4', 1, 1.5)}${_a5afang(16, 25.2, 0, 3, .8, bn)}
    ${_ln('M12.6 26.6Q16 30.2 19.4 26.6', '#5a3418', .85)}${_a5abeads('M12.6 26.6Q16 30.2 19.4 26.6', '#f4ecd4', 1, 1.5)}
    <circle cx="16" cy="30.4" r="1.6" fill="url(#${bn})" ${_K}/>
    <g transform="translate(32 0) scale(-1 1)">${wing}</g>${wing}
    <path d="M14.9 3.6L16 -.2L17.1 3.6Z" fill="url(#${bn})" ${_K}/>
    <path d="${hub}" fill="url(#${fc})" ${_K}/>
    <g clip-path="url(#${cp})"><path d="M12.1 6.4Q16 4 19.9 6.4L19.9 8.6Q16 6.2 12.1 8.6Z" fill="url(#${rd})" stroke="#140c06" stroke-width=".4"/>
      <path d="M11 9L12.4 15M21 9L19.6 15" stroke="#8a3a08" stroke-width="1.6" opacity=".3"/></g>
    <path d="M12.3 5.8Q16 2.6 19.7 5.8L20.1 15Q16 21.4 11.9 15Z" fill="none" stroke="#fff3d0" stroke-width=".5" opacity=".75"/>
    ${_ln('M12.1 9.6L15.7 10.6M19.9 9.6L16.3 10.6', '#3a1a08', 1.1)}
    <path d="M12.4 10.5L15.4 11.3L14.9 13.1L12.8 12.5Z" fill="#1a0e08"/><path d="M19.6 10.5L16.6 11.3L17.1 13.1L19.2 12.5Z" fill="#1a0e08"/>
    ${_ln('M13.4 11.8L14.6 12.1M18.6 11.8L17.4 12.1', '#ffae2a', .7)}
    <path d="M16 11.6L17 14.4L16 14.9L15 14.4Z" fill="#8a4010" ${_k}/>
    <path d="M13.3 15.7Q16 15 18.7 15.7L18.3 17.6Q16 18.3 13.7 17.6Z" fill="#1a0e08"/>
    <path d="M13.9 15.5h1.1v1.3h-1.1zM15.45 15.3h1.1v1.4h-1.1zM17 15.5h1.1v1.3h-1.1z" fill="#fff6dc"/><path d="M14.6 17.2h1v.8h-1zM16.4 17.2h1v.8h-1z" fill="#fff6dc"/>
    ${_ln('M12 13.2L13.2 14.6M12.8 12.8L14 14.2M20 13.2L18.8 14.6M19.2 12.8L18 14.2M16 18.7V19.7', '#d82a1a', .8)}
    ${_gl('M12.4 6.8c1-1.2 2.4-1.8 3.8-1.8-1.6.6-2.8 1.6-3.4 3.2Z', .5)}
  </g>
  ${_spark(5.6, 8.4, '#fff', .8)}${_spark(27.6, 26.6, '#ffe9a0', .6)}`;
},
/* Ceinture de Chef de Guerre : cuir clouté rouge brique, grosse boucle de bronze en masque tribal, croc et os pendants, plumes */
hx_ceinture_bwork: () => {
  const lt = _id(), br = _id(), fp = _id(), bn = _id(), rd = _id(), sd = _id();
  const topY = t => 10 + 2.4 * t * (1 - t) * 2, botY = t => 18 + 2.4 * t * (1 - t) * 2, tt = x => (x - 1.2) / 29.6;
  const stud = x => { const t = tt(x), y = _a5an((topY(t) + botY(t)) / 2 + .1); return `<circle cx="${x}" cy="${y}" r="1.05" fill="url(#${sd})" ${_K}/><circle cx="${x - .3}" cy="${_a5an(y - .35)}" r=".32" fill="#fff" opacity=".9"/>`; };
  const hang = (x, cord, fl, w, ang) => { const t = tt(x), y0 = _a5an(botY(t) - .6); return `<path d="M${x} ${y0}L${x} ${_a5an(y0 + cord + .6)}" stroke="#140c06" stroke-width="1.7" stroke-linecap="round"/><path d="M${x} ${y0}L${x} ${_a5an(y0 + cord + .6)}" stroke="#7a4a22" stroke-width=".8" stroke-linecap="round"/><circle cx="${x}" cy="${_a5an(y0 + cord * .45 + .4)}" r=".95" fill="url(#${sd})" ${_k}/>${_a5afang(x, _a5an(y0 + cord), ang, fl, w, bn)}`; };
  return `<defs>${_a5ag3(lt, '#e0623e', '#a8381e', '#5e1a0e')}${_a5ag3(br, '#fff0b8', '#dca040', '#6a3a0a', 1, 1)}${_rg(fp, '#fff0cc', '#a8702a', .36, .3, .95)}${_a5ag3(bn, '#fffaf0', '#e8dcc0', '#b8a67c', 1, 1)}${_lg(rd, '#ff6a4a', '#9a1208')}${_rg(sd, '#fff6d8', '#a8702a', .36, .3, .85)}</defs>
  ${_sh(16, 29.8, 13.5, 1.1)}
  ${_a5afea(22.6, 10.6, 64, 7.4, '#ffb84a', '#b0480a', .22)}${_a5afea(21.8, 10.2, 40, 8.6, '#ff6a4a', '#8a0e08', .22)}${_a5afea(10.6, 10.4, -36, 6.8, '#ff6a4a', '#8a0e08', .22)}
  ${hang(3.8, 2.2, 4.8, .88, 6)}${hang(6.6, 1.3, 3.8, .78, -4)}${hang(9.4, 1.9, 4.3, .84, 8)}${hang(22.6, 1.9, 4.3, .84, -8)}${hang(25.4, 1.3, 3.8, .78, 4)}${hang(28.2, 2.2, 4.8, .88, -6)}
  <path d="M1.2 10Q16 14.8 30.8 10L30.8 18Q16 22.8 1.2 18Z" fill="url(#${lt})" ${_K}/>
  ${_ln('M1.8 11.2Q16 15.8 30.2 11.2M1.8 17Q16 21.6 30.2 17', '#f0c060', .6, .9).replace('stroke-linecap="round"', 'stroke-linecap="butt" stroke-dasharray="1.3 .9"')}
  ${_ln('M2 12.2Q16 16.8 30 12.2', '#fff', .5, .3)}${_ln('M2 17.8Q16 22.4 30 17.8', '#3a0e06', .6, .5)}
  ${[3.2, 5.7, 8.2, 23.8, 26.3, 28.8].map(stud).join('')}
  <g transform="translate(16 15) scale(.92) translate(-16 -15)">
  <path d="M9.4 9.6Q16 3.8 22.6 9.6L23 16.8Q21.8 20.8 16 23.6Q10.2 20.8 9 16.8Z" fill="url(#${br})" ${_K}/>
  <path d="M10.8 10.4Q16 6.8 21.2 10.4L21.4 16.2Q20.2 19.2 16 21.4Q11.8 19.2 10.6 16.2Z" fill="url(#${fp})" stroke="#6a3a0a" stroke-width=".6"/>
  <circle cx="12.6" cy="12.8" r="2.1" fill="#1a0e08"/><circle cx="19.4" cy="12.8" r="2.1" fill="#1a0e08"/>
  <circle cx="12.8" cy="12.9" r="1.2" fill="url(#${rd})"/><circle cx="19.2" cy="12.9" r="1.2" fill="url(#${rd})"/><circle cx="12.3" cy="12.4" r=".38" fill="#fff"/><circle cx="18.7" cy="12.4" r=".38" fill="#fff"/>
  ${_ln('M10.6 10.6Q12.6 9.4 14.8 10.8M21.4 10.6Q19.4 9.4 17.2 10.8', '#3a1a08', .9)}
  <path d="M16 12.6L17 15.4L16 15.9L15 15.4Z" fill="#8a4010" ${_k}/>
  <path d="M12.6 17.1Q16 16.4 19.4 17.1L18.9 19.2Q16 20 13.1 19.2Z" fill="#1a0e08"/>
  <path d="M13.4 16.9h1.1v1.2h-1.1zM15.45 16.6h1.1v1.3h-1.1zM17.5 16.9h1.1v1.2h-1.1z" fill="#fff6dc"/><path d="M14.4 18.8h1v.7h-1zM16.6 18.8h1v.7h-1z" fill="#fff6dc"/>
  ${_ln('M16 7.2V9.4M13.6 8.1l.6 1.6M18.4 8.1l-.6 1.6M10.8 14.2l1.6 1.6M21.2 14.2l-1.6 1.6', '#d82a1a', .8)}
  ${_gl('M11.2 11c1.4-1.6 3-2.4 4.8-2.6-2 .8-3.6 2-4.6 3.8Z', .5)}
  </g>
  ${_spark(3.4, 5.2, '#fff', .8)}${_spark(16, 28.2, '#ffe9a0', .6)}`;
},

/* Tambour de Guerre de la Bworkette : peau tendue cousue de lacets, peintures rouges, plumes, baguette en os ; aura dorée discrète */
hx_relique_bworkette: () => {
  const hd = _id(), sk = _id(), wd = _id(), bn = _id(), rd = _id();
  const rx = 9.4, ry = 3.5, ty = 11.4, by = 24.8, E = (x, y0) => y0 + ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - 16) / rx, 2)));
  const body = `M${16 - rx} ${ty}C${16 - rx - 1.2} ${ty + 4.4} ${16 - rx - 1.2} ${by - 4.2} ${16 - rx} ${by}A${rx} ${ry} 0 0 0 ${16 + rx} ${by}C${16 + rx + 1.2} ${by - 4.2} ${16 + rx + 1.2} ${ty + 4.4} ${16 + rx} ${ty}A${rx} ${ry} 0 0 1 ${16 - rx} ${ty}Z`;
  const zig = (x0, x1, n) => { let p = ''; for (let k = 0; k <= n; k++) { const x = x0 + (x1 - x0) * k / n, y = k % 2 ? E(x, by) - .9 : E(x, ty) + 1; p += (k ? 'L' : 'M') + _a5an(x) + ' ' + _a5an(y); } return p; };
  const eyelets = (x0, x1, n) => Array.from({ length: n + 1 }, (_, k) => { const x = x0 + (x1 - x0) * k / n, y = k % 2 ? E(x, by) - .9 : E(x, ty) + 1; return `<circle cx="${_a5an(x)}" cy="${_a5an(y)}" r=".55" fill="#f4ecd4" ${_k}/>`; }).join('');
  const pegs = (y0, n, a0, a1) => Array.from({ length: n }, (_, k) => { const a = (a0 + (a1 - a0) * k / (n - 1)) * Math.PI / 180; return `<circle cx="${_a5an(16 + Math.cos(a) * (rx - .5))}" cy="${_a5an(y0 + Math.sin(a) * (ry - .3))}" r=".55" fill="url(#${bn})" ${_k}/>`; }).join('');
  const tri = (x, y, dir) => `<path d="M${x - 1.05} ${y}L${x + 1.05} ${y}L${x} ${_a5an(y + dir * 2.1)}Z" fill="url(#${rd})" stroke="#4a0a06" stroke-width=".35"/>`;
  const sunTicks = Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `M${_a5an(16 + Math.cos(a) * 2.5)} ${_a5an(18.6 + Math.sin(a) * 2.5)}L${_a5an(16 + Math.cos(a) * 3.5)} ${_a5an(18.6 + Math.sin(a) * 3.5)}`; }).join('');
  return `<defs><linearGradient id="${hd}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4a22"/><stop offset=".28" stop-color="#f0d8a4"/><stop offset=".62" stop-color="#cfa464"/><stop offset="1" stop-color="#6a4220"/></linearGradient>${_rg(sk, '#fff8e0', '#d8b478', .4, .35, .9)}${_a5ag3(wd, '#a8723a', '#6a4020', '#2e1a0a', 1, 0)}${_a5ag3(bn, '#fffaf0', '#e8dcc0', '#b8a67c', 1, 1)}${_lg(rd, '#ff6a4a', '#9a1208')}</defs>
  ${_a5aaura()}${_sh(16, 29.4, 11, 1.2)}
  ${_a5afea(22, 10, 12, 8.4, '#ffb84a', '#b0480a', .22)}${_a5afea(23.4, 10.4, 46, 7.6, '#ff6a4a', '#8a0e08', .22)}${_a5afea(22.6, 10, 28, 9.4, '#ff6a4a', '#8a0e08', .22)}
  <path d="${body}" fill="url(#${hd})" ${_K}/>
  <path d="M${16 - rx + .3} ${by - .3}A${rx} ${ry} 0 0 0 ${16 + rx - .3} ${by - .3}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.9" stroke-linecap="round"/><path d="M${16 - rx + .3} ${by - .3}A${rx} ${ry} 0 0 0 ${16 + rx - .3} ${by - .3}" fill="none" stroke="url(#${wd})" stroke-width="1.7" stroke-linecap="round"/>
  ${_ln(zig(7.4, 12.2, 6), '#140c06', 1.25, .9)}${_ln(zig(7.4, 12.2, 6), '#b87a40', .6)}${_ln(zig(19.8, 24.6, 6), '#140c06', 1.25, .9)}${_ln(zig(19.8, 24.6, 6), '#b87a40', .6)}
  ${eyelets(7.4, 12.2, 6)}${eyelets(19.8, 24.6, 6)}
  <circle cx="16" cy="18.6" r="1.7" fill="none" stroke="#140c06" stroke-width="2.3" opacity=".7"/><circle cx="16" cy="18.6" r="1.7" fill="none" stroke="url(#${rd})" stroke-width="1.2"/><circle cx="16" cy="18.6" r=".6" fill="#d82a1a"/>${_ln(sunTicks, '#c8281a', .9)}
  ${tri(13.6, E(13.6, by) - .6, -1)}${tri(16, E(16, by) - .6, -1)}${tri(18.4, E(18.4, by) - .6, -1)}
  <ellipse cx="16" cy="${ty}" rx="${rx}" ry="${ry}" fill="url(#${wd})" ${_K}/><ellipse cx="16" cy="${ty}" rx="${rx - .9}" ry="${ry - .7}" fill="url(#${sk})" stroke="#8a5a2a" stroke-width=".5"/>
  <ellipse cx="16" cy="${ty + .1}" rx="5.4" ry="1.7" fill="none" stroke="#b02012" stroke-width="1.1" opacity=".85"/><ellipse cx="16" cy="${ty + .1}" rx="2.2" ry=".8" fill="#c8281a" opacity=".85"/>${_ln('M10.4 11.5h1.6M20 11.5h1.6M16 9.2v.9M16 12.8v.9', '#b02012', .8, .8)}
  ${_ln('M10 9.6c2-1 4.6-1.4 7-1', '#fff', .8, .6)}
  ${pegs(ty, 12, 0, 180)}${pegs(ty, 9, 200, 340)}
  <path d="M3.4 5.4L14.8 10.4" stroke="#140c06" stroke-opacity=".92" stroke-width="3" stroke-linecap="round"/><path d="M3.4 5.4L14.8 10.4" stroke="url(#${bn})" stroke-width="1.6" stroke-linecap="round"/>${_ln('M4.4 5.2L13.6 9.2', '#fff', .5, .8)}
  <circle cx="3.2" cy="5.4" r="1.5" fill="url(#${bn})" ${_K}/><circle cx="15.2" cy="10.6" r="2.2" fill="url(#${bn})" ${_K}/><circle cx="14.6" cy="9.9" r=".7" fill="#fff" opacity=".85"/>
  ${_ln('M11.6 9.4l.9 2.2', '#d82a1a', 1.1)}
  ${_spark(4.4, 20, '#fff', .8)}${_spark(28, 22.6, '#ffe9a0', .7)}`;
},
/* ======================= RANG 3 · DRAGON COCHON : rose lard, or, pièces, braise ======================= */

/* Tranchoir du Dragon Cochon : lourd couperet de boucher royal, lame ornée d'un groin de cochon-dragon doré, manche rose clair et or */
hx_tranchoir_cochon: () => {
  const bl = _id(), g = _id(), hp = _id(), cp = _id();
  const blade = 'M11.6 8.2L26.8 6.8Q29.8 6.8 29.8 9.8L29.4 18.2Q29 21.8 25.2 21.8L12.8 21.4Q10.8 21 11.2 18.6Z';
  return `<defs>${_a5ag3(bl, '#fbf3f6', '#b8a0ae', '#5a4654', 1, 1)}${_a5agold(g)}${_a5ag3(hp, '#ffeaee', '#ffb4c4', '#d8668a', 0, 1)}<clipPath id="${cp}"><path d="${blade}"/></clipPath></defs>
  ${_sh(16, 30.4, 11, 1)}
  <g transform="translate(16 16.6) scale(.9) rotate(-40) translate(-16 -16)">
    <rect x="1.8" y="8.5" width="10.4" height="4.8" rx="2.2" fill="url(#${hp})" ${_K}/>${_ln('M3 9.6H11', '#fff', .55, .6)}${_ln('M3.4 12.5H11.2', '#a8385a', .6, .6)}
    <rect x="4" y="8.2" width="1.4" height="5.4" rx=".6" fill="url(#${g})" ${_K}/><rect x="7.4" y="8.2" width="1.4" height="5.4" rx=".6" fill="url(#${g})" ${_K}/>
    <circle cx="2" cy="10.9" r="2.6" fill="url(#${g})" ${_K}/>${_a5acut(1.8, 10.7, 1.2, '#ffd2a0', '#e0501a')}
    <path d="${blade}" fill="url(#${bl})" ${_K}/>
    <g clip-path="url(#${cp})"><path d="M10 6.4L30.4 5.8L30.4 9.4L10 9.6Z" fill="url(#${g})"/>${_ln('M10 9.6L30.4 9.3', '#140c06', .7, .75)}${_ln('M10.4 7.6L30 7.1', '#fff', .6, .8)}
      <path d="M10 19.4L30 19.8L30 23L10 22.6Z" fill="#fff" opacity=".42"/><path d="M10 21L30 21.6L30 23L10 22.6Z" fill="#6a5560" opacity=".35"/>
      </g>
    ${_ln('M13.2 12.6L28 12.2M13.2 18L28.2 18', '#c8861a', .5, .6)}
    <path d="M10.2 7.4h3.4v7.6l-3.4-.2Z" fill="url(#${g})" ${_K}/>${[9.2, 13.2].map(y => `<circle cx="11.9" cy="${y}" r=".62" fill="#fff6c0" ${_k}/>`).join('')}
    ${[14.2, 17.6].map(y => `<circle cx="13.6" cy="${y}" r=".65" fill="url(#${g})" ${_k}/>`).join('')}
    <g transform="rotate(40 21.8 15.6)">${_a5apig(21.8, 15.6, .8, g, .8)}</g>
    ${_ln('M15.4 20.2L27.6 20.4', '#fff', .7, .9)}
    ${_gl('M13.4 9.6L19.4 8.6 18.8 9.8 13.6 10.8Z', .45)}
  </g>
  ${_spark(28, 4.4, '#ffe9a0', .8)}${_spark(5.6, 6.6, '#ffc07a', .7)}${_spark(28.6, 24, '#ff9a3a', .55)}${_spark(15, 29, '#ffb04a', .5)}`;
},

/* Cape de Lard Doré : cape ample rose-doré, col de fourrure claire, grosse pièce d'or en fermoir, plis riches */
hx_cape_lard: () => {
  const cp = _id(), ln = _id(), g = _id(), fr = _id(), cl = _id();
  const hem = 'M2.8 25.2Q2.2 28.4 5.2 28.8Q7.4 27.4 9 28.8Q11.2 30.4 13 28.6Q14.6 30 16 28.6Q17.4 30 19 28.6Q20.8 30.4 23 28.8Q24.6 27.4 26.8 28.8Q29.8 28.4 29.2 25.2';
  const body = `M9.4 6C6.8 9 4.4 16 2.8 25.2${hem.slice(hem.indexOf('Q'))}C27.6 16 25.2 9 22.6 6Z`;
  const fur = [...[8.6, 11.5, 14.4, 17.3, 20.2, 23.1].map(x => [x, 6.6 - 1.2 * Math.pow((x - 15.9) / 7.2, 2), 2.5]), ...Array.from({ length: 8 }, (_, i) => { const x = 7.2 + i * 2.5; return [x, 9.4 - 2.4 * Math.pow((x - 16) / 9.4, 2), 2.45]; })];
  const coin = (x, y) => `<circle cx="${x}" cy="${y}" r=".9" fill="url(#${g})" stroke="#5a3a08" stroke-opacity=".8" stroke-width=".35"/><circle cx="${x}" cy="${y}" r=".42" fill="none" stroke="#a8741a" stroke-width=".3"/>`;
  return `<defs>${_a5ag3(cp, '#ffd4dc', '#f08aa2', '#b04a66', .45, 1)}${_a5ag3(ln, '#a8304e', '#6a1630', '#3a0a1c')}${_a5agold(g)}${_rg(fr, '#ffffff', '#f2d2da', .4, .3, .9)}${_a5ag3(cl, '#fff2b8', '#f0b83a', '#8a5a0a', 1, 1)}</defs>
  ${_sh(16, 30.4, 12, 1)}
  <path d="${body}" fill="url(#${cp})" ${_K}/>
  <path d="M16.8 11.4C20 10.4 24 8.6 22.6 6C25.2 9 27.6 16 29.2 25.2L26.8 28.8Q24.6 27.4 23 28.8Q20.8 30.4 19 28.6Z" fill="#8a2a48" opacity=".16"/>
  <path d="M15.4 12L16.6 12L18.9 28.7Q16 30.2 13.1 28.7Z" fill="url(#${ln})" stroke="#140c06" stroke-opacity=".8" stroke-width=".6" stroke-linejoin="round"/>
  ${_ln('M16 13.6L16 28.6M15.4 20L14.8 28.6M16.6 20L17.2 28.6', '#d8628a', .5, .55)}
  ${_ln('M12.4 8.8C10.4 14.4 9 20.6 8.4 28.2M14.2 10.4C13.2 16 12.4 22 12.4 28.6M7.2 12.6C5.8 17 4.8 21 4.2 25.6', '#a8344f', .95, .6)}${_ln('M13.1 9.2C11.2 14.6 9.9 20.6 9.3 27.8M15 10.8C14 16.2 13.3 22 13.2 28M8 13C6.8 17 5.8 21 5.2 25', '#ffe4ea', .55, .7)}
  ${_ln('M19.6 8.8C21.6 14.4 23 20.6 23.6 28.2M17.8 10.4C18.8 16 19.6 22 19.6 28.6M24.8 12.6C26.2 17 27.2 21 27.8 25.6', '#a8344f', .95, .6)}${_ln('M20.5 9.2C22.4 14.6 23.7 20.6 24.3 27.8M18.6 10.8C19.6 16.2 20.3 22 20.4 28', '#ffe4ea', .5, .5)}
  ${[[6.8, 21.6], [9.6, 25.2], [11.2, 18.4], [24.8, 21.6], [22, 25.2], [20.8, 18.4], [5.6, 16.4], [26.2, 16.4]].map(([x, y]) => coin(x, y)).join('')}
  <path d="${hem}" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="2.8" stroke-linecap="round"/><path d="${hem}" fill="none" stroke="url(#${cl})" stroke-width="1.6" stroke-linecap="round"/>${_ln(hem, '#fff', .45, .5)}
  ${_ln('M15.4 12L13.1 28.7M16.6 12L18.9 28.7', '#140c06', 1.4, .85)}${_ln('M15.4 12L13.1 28.7M16.6 12L18.9 28.7', '#f0b83a', .65)}
  ${_a5acloud(fur, fr, '#d8a8b6')}
  ${_ln('M7.8 8.2a1.2 1.2 0 1 1 1.9 1M12.4 8.6a1.1 1.1 0 1 1 1.9 1M20.6 8.6a1.1 1.1 0 1 1 1.9 1M24 8.2a1.2 1.2 0 1 1 1.9 1M13.4 5a1.1 1.1 0 1 1 1.9 1M18 5a1.1 1.1 0 1 1 1.9 1', '#d8a8b6', .55)}
  ${_gl('M9.4 5.2c1.6-1.6 3.6-2.2 5.6-2-2.2.6-4.2 1.8-5 3.4Z', .6)}
  <circle cx="16" cy="11.8" r="3.9" fill="url(#${cl})" ${_K}/><circle cx="16" cy="11.8" r="3.3" fill="none" stroke="#8a5a0a" stroke-width=".5" stroke-dasharray=".7 .5"/>
  ${_a5apig(16, 12.1, .38, g, .32)}
  ${_ln('M13.2 9.8c.8-1.2 2-1.8 3.2-1.6', '#fff', .8, .85)}
  ${_spark(27.4, 5.4, '#fff', .85)}${_spark(4.6, 9.6, '#ffe9b0', .65)}`;
},

/* Coffre du Dragon Cochon : coffre au trésor bombé, serrure en tête de cochon-dragon, pièces d'or qui débordent ; aura dorée discrète */
hx_relique_cochon: () => {
  const wd = _id(), g = _id(), ln = _id(), gh = _id(), rb = _id();
  const lid = 'M6.4 15.4C5.6 6.6 10 2.4 16 2.4S26.4 6.6 25.6 15.4Z';
  const body = 'M4.6 15.2Q3.8 21.6 5.2 26.8Q5.4 28.4 7.2 28.4H24.8Q26.6 28.4 26.8 26.8Q28.2 21.6 27.4 15.2Z';
  const cn = (x, y, rx = 2.4, ry = 1.5, rot = 0) => _a5acoin(x, y, rx, ry, rot, g);
  const heap = [[9.4, 9.4, -10], [13, 8.2, 6], [16.8, 8, -4], [20.4, 8.6, 10], [23.4, 10, -8],
    [7.6, 11.6, 8], [11.2, 10.6, -6], [15, 10.2, 8], [18.8, 10.4, -8], [22.2, 11.6, 6], [25, 12.4, -4],
    [9, 13.4, -4], [12.8, 12.8, 6], [16.6, 12.6, -6], [20.4, 12.8, 4], [24, 13.8, -6]].map(([x, y, r]) => cn(x, y, 2.5, 1.55, r)).join('');
  return `<defs>${_a5ag3(wd, '#c0643a', '#8a3a1c', '#4a1a0a')}${_a5agold(g, 1, 1)}${_a5ag3(gh, '#fff6c0', '#f0b83a', '#8a5a0a', 1, 0)}${_a5ag3(ln, '#e0627e', '#9a2c4a', '#5a1228')}${_rg(rb, '#ffb0b8', '#c8102a', .36, .3, .85)}</defs>
  ${_a5aaura()}${_sh(16, 29.4, 13, 1.3)}
  <path d="${lid}" fill="url(#${ln})" ${_K}/>
  ${_ln('M10 13L16 5.2L22 13M16 5.2V14M8.2 10.6L23.8 10.6', '#fff', .45, .22)}${[[16, 5.2], [10, 13], [22, 13], [12.6, 9], [19.4, 9]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".6" fill="url(#${g})" ${_k}/>`).join('')}
  <path d="${lid}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="3.1"/><path d="${lid}" fill="none" stroke="url(#${gh})" stroke-width="1.7"/>${_ln('M8.2 14C7.6 7.8 11 4.6 16 4.6', '#fff', .6, .6)}
  ${[-62, -38, -14, 14, 38, 62].map(a => { const r = Math.PI * (a - 90) / 180; return `<circle cx="${_a5an(16 + Math.cos(r) * 8.7)}" cy="${_a5an(9.2 + Math.sin(r) * 7.6)}" r=".62" fill="#fff6c0" ${_k}/>`; }).join('')}
  <path d="${body}" fill="url(#${wd})" ${_K}/>
  ${_ln('M12.4 17.4Q12.2 23 12.6 27.8M19.6 17.4Q19.8 23 19.4 27.8', '#2a0e04', .7, .6)}${_ln('M10.8 19.6c.6.6 1.4.6 2 0M20.4 24c.6.6 1.4.6 2 0', '#e8a070', .5, .5)}
  <path d="M5.2 25.6H26.8L26.8 26.8Q26.6 28.4 24.8 28.4H7.2Q5.4 28.4 5.2 26.8Z" fill="#5a3a1c" ${_K}/>
  <rect x="7.2" y="15.4" width="2.6" height="12.4" rx=".5" fill="url(#${gh})" ${_K}/><rect x="22.2" y="15.4" width="2.6" height="12.4" rx=".5" fill="url(#${gh})" ${_K}/>
  ${[18.8, 23.8].map(y => `<circle cx="8.5" cy="${y}" r=".62" fill="#8a5a0a"/><circle cx="23.5" cy="${y}" r=".62" fill="#8a5a0a"/>`).join('')}
  <path d="M4.2 15H27.8V17.6H4.2Z" fill="url(#${g})" ${_K}/>${_ln('M5 15.9H27', '#fff', .5, .8)}
  <path d="M12 17.2H20Q21.2 17.2 21.2 18.4V25.6Q21.2 26.8 20 26.8H12Q10.8 26.8 10.8 25.6V18.4Q10.8 17.2 12 17.2Z" fill="url(#${g})" ${_K}/>
  ${_a5apig(16, 22.1, .54, gh, .55)}
  ${heap}
  ${_a5acut(13.2, 9.6, 1.5, '#ffb0b8', '#c8102a')}${_a5acut(21.2, 11, 1.3, '#d4ffe4', '#16a850')}${_a5acut(8.4, 12.4, 1.1, '#d8e8ff', '#2a6ae0')}
  ${_a5acoin(26.4, 19.6, 2.2, 1.4, 20, g)}${_a5acoin(24.6, 17, 2.4, 1.5, -14, g)}${_a5acoin(28.4, 27.2, 2.2, 1.3, 8, g)}${_a5acoin(4.4, 27.6, 2, 1.2, -10, g)}
  ${_ln('M8 7.8c1.6-1.4 3.6-1.8 5.4-1.2', '#fff', .6, .7)}
  ${_spark(4.8, 5.4, '#fff', .9)}${_spark(27.8, 5, '#ffe9a0', .8)}`;
},

});
