/* =====================================================================
   ICÔNES D'OBJETS HÉROÏQUES v5b — donjons héroïques : Crocabulia, Mansot Royal, Dragon de Jade
   Rang 4 · Crocabulia : écailles vert sombre, braise orange/rouge, dents ivoire
   Rang 5 · Mansot Royal : cristal de glace bleu pâle, argent, blanc, saphir
   Rang 6 · Dragon de Jade : jade translucide, or, laque rouge, nuages d'Orient
   Dessins 100 % originaux (viewBox 32). Complète ITEM_ART (art.js … art4d.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _gem, _spark…),
   plus _dofusArt2 (art4d.js) pour les Dofus. Helpers locaux préfixés _b5 (tous les fichiers sont concaténés dans la même portée).
   ===================================================================== */

/* dégradé linéaire à 3 arrêts (boîte englobante, comme _lg) */
const _b5g3 = (id, a, b, c, x2 = 0, y2 = 1, x1 = 0, y1 = 0) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
/* dégradé radial à 3 arrêts */
const _b5r3 = (id, a, b, c, cx = .4, cy = .34, r = .8) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
/* or, ivoire */
const _b5gold = (id, x2 = 1, y2 = 1) => _b5g3(id, '#fff6c0', '#f0b83a', '#8a5a0a', x2, y2);
const _b5ivory = (id, x2 = 1, y2 = 0) => _b5g3(id, '#fffdf2', '#efe0b4', '#b09a64', x2, y2);
const _b5n = v => +v.toFixed(2);
/* points d'une courbe de Bézier cubique, échantillonnée n fois */
const _b5bez = (p0, p1, p2, p3, n = 24) => Array.from({ length: n }, (_, i) => { const t = i / (n - 1), u = 1 - t; return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]; });
/* lueur dorée discrète des reliques : halo doux + fins rayons + couronne de petits points */
const _b5aura = (c1 = '#fff2a0', c2 = '#ffc83a', cy = 16) => {
  const i = _id();
  const rays = Array.from({ length: 12 }, (_, k) => `<path transform="rotate(${k * 30 + 8} 16 ${cy})" d="M15.55 ${cy}L16 ${cy - (k % 2 ? 12.8 : 14.8)}L16.45 ${cy}Z" fill="${c1}" opacity=".26"/>`).join('');
  return `<defs><radialGradient id="${i}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c1}" stop-opacity=".5"/><stop offset=".6" stop-color="${c2}" stop-opacity=".24"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient></defs>
  <circle cx="16" cy="${cy}" r="15.4" fill="url(#${i})"/>${rays}<circle cx="16" cy="${cy}" r="13.6" fill="none" stroke="${c1}" stroke-width=".4" stroke-dasharray=".9 2.6" stroke-linecap="round" opacity=".35"/>`;
};
/* ordonnée du bord d'une silhouette tabulée [[y, x], …] (y décroissant), par interpolation linéaire */
const _b5edge = (pts, y) => { for (let i = 0; i < pts.length - 1; i++) { const [y0, x0] = pts[i], [y1, x1] = pts[i + 1]; if (y <= y0 && y >= y1) return x0 + (x1 - x0) * (y0 - y) / (y0 - y1); } return pts[pts.length - 1][1]; };
/* motif d'écailles : petites écailles arrondies qui se chevauchent (pattern 3.4 × 4.4) ; a/b = haut/bas de chaque écaille */
const _b5scales = (pid, a, b, edge = '#0a1c12', k = 1) => `<pattern id="${pid}" width="${3.4 * k}" height="${4.4 * k}" patternUnits="userSpaceOnUse"><g transform="scale(${k})"><defs><linearGradient id="${pid}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>${[[0, 1.1], [3.4, 1.1], [0, 5.5], [3.4, 5.5], [1.7, 3.3]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.95" fill="url(#${pid}g)" stroke="${edge}" stroke-opacity=".75" stroke-width=".42"/><path d="M${x - 1.2} ${y - .5}a1.35 1.35 0 0 1 2.1-.7" fill="none" stroke="#fff" stroke-width=".3" opacity=".38"/>`).join('')}</g></pattern>`;
/* fine rainure de braise : halo, trait orange, cœur jaune */
const _b5ember = (d, w = 1) => _ln(d, '#ff4a0a', w * 2.6, .32) + _ln(d, '#ff8a1a', w * 1.15) + _ln(d, '#ffe27a', w * .45, .95);

Object.assign(ITEM_ART, {

/* ======================= RANG 4 · CROCABULIA : écailles vert sombre, braise, crocs ivoire ======================= */

/* Mâchoire de Crocabulia : épée-museau de dragon-crocodile, deux rangées de crocs, veines de braise, garde en écailles à œil de reptile */
hx_machoire_croca: () => {
  const bd = _id(), tt = _id(), gd = _id(), lt = _id(), sc = _id(), cp = _id(), eye = _id(), pm = _id();
  /* contour du museau : [y, demi-largeur] */
  const E = [[4.6, 3], [0, 3.55], [-4, 3.75], [-8, 3.7], [-11, 3.35], [-13.2, 3.25], [-15.4, 4.15], [-17.4, 3.45]];
  const blade = 'M3 4.6C3.55 0 3.8 -4 3.7 -8C3.65 -10.4 3.3 -11.8 3.25 -13.2C3.25 -13.9 4.2 -14.5 4.3 -15.7C4.4 -17.5 3.1 -18.7 0 -18.7C-3.1 -18.7 -4.4 -17.5 -4.3 -15.7C-4.2 -14.5 -3.25 -13.9 -3.25 -13.2C-3.3 -11.8 -3.65 -10.4 -3.7 -8C-3.8 -4 -3.55 0 -3 4.6Z';
  const row = (ys, lens, s) => ys.map((y, i) => { const x = _b5edge(E, y), L = lens[i % lens.length], d = 1.15 + L * .08; return `<path d="M${_b5n(s * (x - .9))} ${_b5n(y + d)}L${_b5n(s * (x + L))} ${_b5n(y - d * .75)}L${_b5n(s * (x - .9))} ${_b5n(y - d)}Z" fill="url(#${tt})" ${_k}/><path d="M${_b5n(s * (x + .1))} ${_b5n(y - d * .5)}L${_b5n(s * (x + L - .5))} ${_b5n(y - d * .72)}" stroke="#fff" stroke-width=".4" stroke-linecap="round" opacity=".75" fill="none"/>`; }).join('');
  const R = row([2.4, -.2, -2.8, -5.4, -8, -10.4, -12.6, -15, -17], [3.2, 2.3, 3.5, 2.4, 3.5, 2.4, 3, 2.2, 1.7], 1);
  const Lf = row([3.6, 1, -1.6, -4.2, -6.8, -9.2, -11.6, -14, -16.2], [2.4, 3.4, 2.4, 3.5, 2.4, 3.4, 2.3, 2.9, 1.8], -1);
  return `<defs>${_b5g3(bd, '#78b484', '#3a7a52', '#17402a', 1, 0)}${_b5ivory(tt)}${_b5g3(gd, '#4e9560', '#27573a', '#0e2216', 0, 1)}${_b5g3(lt, '#6a3220', '#3a1a10', '#1a0a06', 1, 0)}${_b5scales(sc, '#62a674', '#2a6a44', '#0a2014', .8)}<clipPath id="${cp}"><path d="${blade}"/></clipPath>${_rg(eye, '#fff2a0', '#ff6a0a', .5, .5, .6)}${_rg(pm, '#fff4b0', '#e8420a', .36, .3, .85)}</defs>
  <g transform="translate(16.2 16.2) rotate(45) scale(.9) translate(0 .5)">
    ${R}${Lf}
    <path d="${blade}" fill="url(#${bd})"/>
    <g clip-path="url(#${cp})"><rect x="-6" y="-20" width="12" height="26" fill="url(#${sc})"/>
      <path d="M-4.4 -20H-2V6H-4.4Z" fill="#9fe0a8" opacity=".3"/><path d="M2.2 -20H4.6V6H2.2Z" fill="#06140c" opacity=".38"/>
      ${_b5ember('M0 4.6C.9 -1 -.9 -7 .1 -13.4', 1.15)}
      ${_b5ember('M.3 .8L-2.4 -1.4L-1.6 -3.2M.1 -3.8L2.6 -5.6L1.8 -7.6M0 -7L-2.2 -8.8L-2.7 -10.8M.1 -10L2 -11.4M.5 2.6L2.2 1.4', .75)}
      <path d="M-4.2 -14.1H4.2" stroke="#07140c" stroke-width=".7" opacity=".6"/>
    </g>
    <path d="${blade}" fill="none" ${_K}/>
    <path d="M-2.7 3.2C-3 -2-2.9 -7-2.7 -11" stroke="#d6ffd8" stroke-width=".6" stroke-linecap="round" fill="none" opacity=".55"/>
    <ellipse cx="-1.4" cy="-16.7" rx=".9" ry="1.2" fill="url(#${eye})" stroke="#2a0a02" stroke-width=".5"/><ellipse cx="1.4" cy="-16.7" rx=".9" ry="1.2" fill="url(#${eye})" stroke="#2a0a02" stroke-width=".5"/>
    <path d="M-2.2 -18.3C-1.2 -18.9 1.2 -18.9 2.2 -18.3" stroke="#d6ffd8" stroke-width=".6" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M0 3.5C3.4 3 6.2 2.8 8.6 -.4C9.2 -1.2 10.2 -.8 10 .2C9.6 3.2 7.4 6 4.4 7.2C2.8 7.8 1.2 8 0 8Z" fill="url(#${gd})" ${_K}/>
    <path d="M0 3.5C-3.4 3 -6.2 2.8 -8.6 -.4C-9.2 -1.2 -10.2 -.8 -10 .2C-9.6 3.2 -7.4 6 -4.4 7.2C-2.8 7.8 -1.2 8 0 8Z" fill="url(#${gd})" ${_K}/>
    <path d="M8.2 -.7L10.4 -4.6L11.6 .1Z" fill="url(#${tt})" ${_K}/><path d="M-8.2 -.7L-10.4 -4.6L-11.6 .1Z" fill="url(#${tt})" ${_K}/>
    <path d="M5.4 3.4L7.2 .6L8 2.6ZM-5.4 3.4L-7.2 .6L-8 2.6Z" fill="url(#${tt})" ${_k}/>
    ${_b5ember('M1.8 4C4.2 3.8 6.4 3.2 8 1.4M-1.8 4C-4.2 3.8 -6.4 3.2 -8 1.4', .6)}
    ${[[3.2, 5.6], [5.6, 4.4], [7.4, 2.6]].map(([x, y]) => `<path d="M${x - 1} ${y}a1.1 1.1 0 0 1 2 0M${-x - 1} ${y}a1.1 1.1 0 0 1 2 0" fill="none" stroke="#07140c" stroke-width=".4" opacity=".75"/>`).join('')}
    ${_ln('M1.4 4.6C4 4.2 6.2 3.4 8 1', '#d6ffd8', .5, .55)}
    <ellipse cx="0" cy="5.6" rx="2.9" ry="2.6" fill="#2a1408" ${_K}/><ellipse cx="0" cy="5.6" rx="2.2" ry="2" fill="url(#${eye})"/><ellipse cx="0" cy="5.6" rx=".55" ry="1.8" fill="#1a0602"/><circle cx="-.9" cy="4.7" r=".5" fill="#fff" opacity=".9"/>
    <path d="M-1.35 8H1.35V14.2H-1.35Z" fill="url(#${lt})" ${_K}/>
    ${[0, 1, 2, 3].map(i => `<path d="M-1.3 ${8.6 + i * 1.5}L1.3 ${9.4 + i * 1.5}" stroke="#ff7a1a" stroke-width=".7" stroke-linecap="round"/>`).join('')}
    ${_ln('M-.8 8.2V14', '#fff', .35, .35)}
    <path d="M-2.6 14L2.6 14 2.1 15.2-2.1 15.2Z" fill="url(#${gd})" ${_K}/>
    <circle cx="0" cy="17.4" r="2.5" fill="url(#${pm})" ${_K}/><path d="M-1.6 16.2C-1.2 15.4 -.2 15 .8 15.2" stroke="#fff" stroke-width=".6" stroke-linecap="round" fill="none" opacity=".9"/>
    <path d="M-2.2 18.6L0 21.2 2.2 18.6Z" fill="url(#${tt})" ${_k}/>
  </g>
  ${[[27.8, 8.6, .7], [24.4, 3.6, .5], [29.6, 12.4, .45], [6.4, 7.2, .5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffb02a"/>`).join('')}${_spark(27.6, 3.8, '#ffe9a0', .8)}${_spark(5, 24.6, '#ff9a4a', .55)}`;
},

/* Bottes d'Écailles Ardentes : bottes montantes d'écailles vert sombre, coutures de braise, épines dorsales et griffes d'ivoire aux orteils */
hx_bottes_braise: () => {
  const sc = _id(), cu = _id(), iv = _id(), so = _id(), cp = _id(), sh = _id(), lg = _id(), bd = _id();
  const main = 'M8.6 8.2H19.8C19.6 11.8 18.8 14 19.2 16.6C22.2 16.8 25.8 18.2 27.8 20.8C29.2 22.6 29.6 24.2 28.8 25.6H6.2C5.8 23.4 6.8 21.6 8.2 20.2C9.4 17 9.4 12.4 8.6 8.2Z';
  const spikes = [[12, 3.6], [15.4, 3.2], [18.6, 2.6]].map(([y, L]) => `<path d="M9.6 ${y + 1.5}L${_b5n(9.6 - L)} ${y - 1}L9.6 ${y - 1.5}Z" fill="url(#${iv})" ${_K}/><path d="M9 ${y - .6}L${_b5n(9.6 - L + .8)} ${y - .9}" stroke="#fff" stroke-width=".4" stroke-linecap="round" opacity=".8"/>`).join('');
  const claws = [[20.4, -2.2], [22.8, -.4], [25, 1.4]].map(([y, t], i) => `<path d="M${27.6 + i * .5} ${y}C${29.6 + i * .3} ${y + t - .6} ${31 + i * .2} ${y + t + .6} ${31.8} ${y + t + 2}C${30.2 + i * .2} ${y + t + 1.2} ${29} ${y + t + 1.4} ${28.2} ${y + 2.2}Z" fill="url(#${iv})" ${_K}/>`).join('');
  return `<defs>${_b5scales(sc, '#62a674', '#2a6a44', '#0a2014', 1)}${_b5g3(cu, '#62a674', '#2f6b48', '#0e2a1a', 0, 1)}${_b5ivory(iv)}${_b5g3(so, '#4a3a38', '#1e1614', '#0a0606', 0, 1)}${_b5g3(bd, '#4f9066', '#2a5f40', '#0c2418', 1, 0)}<clipPath id="${cp}"><path d="${main}"/></clipPath>
    <linearGradient id="${sh}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
    <radialGradient id="${lg}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff8a1a" stop-opacity=".6"/><stop offset="1" stop-color="#ff4a0a" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="16" cy="29.4" rx="14.5" ry="2.2" fill="url(#${lg})"/><ellipse cx="16" cy="29.8" rx="11" ry="1" fill="#000" opacity=".3"/>
  <g transform="translate(-1.5 0)">
    <path d="M7.6 21.2L2.6 24 6.8 25.4Z" fill="url(#${iv})" ${_K}/>
    ${spikes}${claws}
    <path d="${main}" fill="url(#${bd})"/>
    <g clip-path="url(#${cp})"><rect x="4" y="4" width="28" height="24" fill="url(#${sc})"/>
      <rect x="4" y="4" width="28" height="24" fill="url(#${sh})"/>
      <path d="M8 19.4L13 17.8 19.4 17 20 26H7Z" fill="#05120a" opacity=".2"/>
      ${_b5ember('M14.2 9.4C13.4 11.6 15 13 14.2 15.2C13.8 16.4 14.6 17.4 16 18C18.6 19 22 19 24.6 21.6', 1)}
      ${_b5ember('M14.4 12.8L11.6 14L11.4 16M14.8 15.4L17.6 15.2L18.2 13.4M16.4 18.4L16 21L13.8 22.6M20.6 19.6L19.8 22.4', .58)}
      ${_b5ember('M8.4 22C10 20.6 12.2 20.2 14.6 20.8', .55)}
      ${_b5ember('M23.4 18.4C26 19 27.6 20.4 28.6 22.4', .55)}
    </g>
    <path d="${main}" fill="none" ${_K}/>
    ${_ln('M9.8 10C9.6 13 10 16 9.6 18.2', '#d6ffd8', .8, .5)}
    <ellipse cx="14.2" cy="5.8" rx="7.5" ry="2" fill="#050e08" ${_K}/><path d="M7.2 5.8Q14.2 3.6 21.2 5.8" fill="none" stroke="#9fe0a8" stroke-width=".6" opacity=".6"/>
    <path d="M6.8 5.8Q14.2 8.2 21.6 5.8L21 9.6Q14.2 11.4 7.4 9.6Z" fill="url(#${cu})" ${_K}/>
    <path d="M6.8 5.8Q14.2 8.2 21.6 5.8L21 9.6Q14.2 11.4 7.4 9.6Z" fill="url(#${sc})" opacity=".8"/>
    <path d="M6.8 5.8Q14.2 8.2 21.6 5.8L21 9.6Q14.2 11.4 7.4 9.6Z" fill="none" ${_K}/>
    ${_b5ember('M7.8 9Q14.2 10.8 20.8 9', .72)}
    <path d="M5.4 25H29.6C29.7 26.8 28.6 28.4 26.8 28.4H8.6C6.8 28.4 5.2 27 5.4 25Z" fill="url(#${so})" ${_K}/>
    ${_b5ember('M7.6 26.6H27', .55)}${_ln('M6.6 25.7H28.8', '#8a6a5a', .4, .6)}
    <path d="M7.2 28.2L8.2 30.2 9.6 28.2Z" fill="#1a1010" ${_k}/>
  </g>
  ${[[5.6, 17, .6], [3.6, 12.6, .45], [26.4, 12.4, .5], [7, 29.6, .4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffb02a"/>`).join('')}${_spark(26.4, 6.8, '#ffe9a0', .85)}${_spark(4.4, 7, '#ff9a4a', .55)}`;
},

/* Écaille de Braise Primordiale : énorme écaille de dragon craquelée, cœur de lave en fusion, cerclage d'or fin ; aura dorée discrète */
hx_relique_croca: () => {
  const sc = _id(), co = _id(), gd = _id(), cp = _id(), hot = _id();
  const S = 'M16 3.6C21.8 4.2 25.6 9 25.4 15C25.2 21 20.6 26.2 16 29.2C11.4 26.2 6.8 21 6.6 15C6.4 9 10.2 4.2 16 3.6Z';
  const core = 'M16 9C19 9.3 20.8 11.8 20.6 14.8C20.4 17.8 18.4 19.8 16 21.6C13.6 19.8 11.6 17.8 11.4 14.8C11.2 11.8 13 9.3 16 9Z';
  const ring = k => `transform="translate(16 15.8) scale(${k}) translate(-16 -15.8)"`;
  const prongs = [[16, 3.6], [22.95, 7.3], [9.05, 7.3], [25.4, 15], [6.6, 15], [22.35, 23.2], [9.65, 23.2]];
  return _b5aura('#fff0a0', '#ffb02a') + `<defs>${_b5r3(sc, '#4f8f62', '#245238', '#0a1a12', .32, .26, .95)}${_b5r3(co, '#ffffff', '#ffd23a', '#ff4a0a', .5, .45, .62)}${_b5g3(gd, '#fff6c0', '#f0b83a', '#8a5a0a', 1, 1)}<clipPath id="${cp}"><path d="${S}"/></clipPath>${_rg(hot, '#ffb02a', '#ff3a0a', .5, .5, .55)}</defs>
  <g transform="rotate(-14 16 16.2)">
  <path d="${S}" fill="url(#${sc})"/>
  <g clip-path="url(#${cp})">
    <g fill="none" stroke="#06140c" stroke-width=".7" opacity=".6"><path d="${S}" ${ring(.82)}/><path d="${S}" ${ring(.64)}/></g>
    <g fill="none" stroke="#8fd89a" stroke-width=".5" opacity=".28"><path d="${S}" ${ring(.9)}/><path d="${S}" ${ring(.73)}/></g>
    <path d="M16 4.6V27" stroke="#06140c" stroke-width=".8" opacity=".5"/><path d="M16.6 4.6V27" stroke="#8fd89a" stroke-width=".5" opacity=".3"/>
    <ellipse cx="16" cy="15" rx="8.4" ry="9.4" fill="url(#${hot})" opacity=".26"/>
    ${_b5ember('M13 9.6L9.4 7.4L8.4 4.6M11.2 12.6L7.2 12.2L5.8 9.8M11 16.2L7 18.4L7.4 21.6M13.2 19.6L12 24L13.2 27M19 9.6L22.6 7.2L23.6 4.4M20.8 12.6L24.8 12.2L26 9.6M21 16.2L25 18.4L24.6 21.8M18.8 19.6L20 24.2L18.8 27.6M16 8.6L16.6 5.4', .72)}
    <path d="${S}" fill="none" stroke="#ff7a1a" stroke-width="1.2" opacity=".32" ${ring(.96)}/>
  </g>
  <path d="${core}" fill="url(#${co})" ${_K}/>
  <path d="M16 10.1C18.4 10.3 19.8 12 19.7 14M12.6 11.4C13.4 10.6 14.4 10.2 15.4 10.1" stroke="#fff" stroke-width=".7" stroke-linecap="round" fill="none" opacity=".85"/>
  ${_ln('M13.8 14C14.6 13.2 15.6 13.4 16.2 14.2 16.8 15.2 16.2 16.4 15.2 17.2M17.8 15.6C18.6 16.2 18.4 17.2 17.8 18', '#e8420a', .6, .7)}
  <circle cx="14.4" cy="13.2" r="1" fill="#fff" opacity=".9"/>
  <path d="${S}" fill="none" ${_K}/>
  ${_gl('M8.2 8.4C9.6 6 12 4.8 14.6 4.6 11.6 5.8 9.4 7.8 8.4 10.6Z', .5)}
  <g transform="translate(16 16.2) scale(1.045) translate(-16 -16.2)">
    <path d="${S}" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${S}" fill="none" stroke="#ffc83a" stroke-width="3.6" stroke-linejoin="round" opacity=".14"/><path d="${S}" fill="none" stroke="url(#${gd})" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M16 3.4C19.8 3.4 23 5.4 24.6 8.2" fill="none" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".8"/>
    ${prongs.map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".95" fill="url(#${gd})" ${_K}/><circle cx="${x - .3}" cy="${y - .35}" r=".3" fill="#fff" opacity=".85"/>`).join('')}
  </g>
  </g>
  ${[[28.8, 6.2, .55], [3.6, 7.4, .45], [29.4, 21.4, .4], [2.8, 22.4, .5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd24a"/>`).join('')}${_spark(27.4, 3, '#fff', .8)}${_spark(4.4, 27, '#ffe27a', .65)}`;
},

/* Dofus Cawotte : œuf d'ambre orange profond, flammes tourbillonnantes */
hx_dofus_cawotte: _dofusArt2('#fff2b4', '#ff9a1a', '#8a2204', '#ffd870', '#ff9a2a', (v, c3) => {
  /* langue de flamme en virgule effilée : base en (0,0), pointe qui s'enroule */
  const T = 'M0 0C-3.4 -3 -4.6 -8.2 -1.6 -12C.6 -14.6 4 -14.4 5.2 -11.6C3.8 -12.4 2.4 -12 1.8 -10.6C.8 -7.6 3.6 -3.8 0 0Z';
  const tongue = (rot, k, f, o) => `<path transform="translate(16 18.2) rotate(${rot}) scale(${k})" d="${T}" fill="${f}" stroke="${c3}" stroke-width=".5" stroke-opacity=".7" opacity="${o}"/>`;
  const three = (k, f, o, r0 = 0) => [0, 120, 240].map(a => tongue(a + r0, k, f, o)).join('');
  return `${three(1.3, '#e8420a', .62)}${three(1.04, '#ff8a1a', .95, 6)}${three(.66, '#ffd24a', .95, 12)}
    <circle cx="16" cy="18.2" r="1.9" fill="#fff6c0" stroke="none" opacity=".95"/>
    <path d="M10.6 8.4c2-1.2 3.6-1.2 5.2-.2M18.6 26.8c2.4-.4 4.4-1.6 5.6-3.6" stroke="${v}" stroke-width=".9" opacity=".7"/>
    ${[[10, 24, .5], [22.6, 11.4, .6], [8.6, 14.6, .45], [24.4, 20, .5], [15, 5.6, .4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6c0" stroke="none" opacity=".85"/>`).join('')}`;
}),

/* ======================= RANG 5 · MANSOT ROYAL : cristal de glace, argent, blanc, saphir ======================= */

/* Sceptre du Trône de Givre : tête de cristal de glace taillé serti d'argent, flocon gravé, manche argent et bleu givré, éclats de givre */
hx_sceptre_givre: () => {
  const sv = _id(), sv2 = _id(), c1 = _id(), c2 = _id(), c3 = _id(), c4 = _id(), c5 = _id(), sh = _id();
  const IK = 'stroke="#0a1c46" stroke-opacity=".92" stroke-width=".9" stroke-linejoin="round" stroke-linecap="round"';
  const ik = 'stroke="#0a1c46" stroke-opacity=".6" stroke-width=".55" stroke-linejoin="round" stroke-linecap="round"';
  /* éclat de glace en prisme pointu : base (0,0), longueur L, largeur W ; tourné de a */
  const shard = (x, y, a, L, W) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M${-W / 2} 0L${-W / 2} ${-L * .6}L0 ${-L}L${W / 2} ${-L * .6}L${W / 2} 0Z" fill="url(#${c2})" ${IK}/><path d="M${-W / 2} 0L${-W / 2} ${-L * .6}L0 ${-L}L0 0Z" fill="url(#${c1})"/><path d="M0 0L0 ${-L}L${W / 2} ${-L * .6}L${W / 2} 0Z" fill="url(#${c3})" opacity=".85"/><path d="M${-W / 2 + .5} ${-L * .15}V${-L * .55}" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".9"/><path d="M${-W / 2} 0L${-W / 2} ${-L * .6}L0 ${-L}L${W / 2} ${-L * .6}L${W / 2} 0Z" fill="none" ${IK}/></g>`;
  /* flocon : six branches + barbes */
  const flake = (x, y, r, c, w) => `<g transform="translate(${x} ${y})" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 ${-r}V${r}"/><path d="M-${r * .34} ${-r * .62}L0 ${-r * .34}L${r * .34} ${-r * .62}M-${r * .34} ${r * .62}L0 ${r * .34}L${r * .34} ${r * .62}"/></g>`).join('')}</g>`;
  return `<defs>${_b5g3(sv, '#ffffff', '#c4d4ec', '#6c80a8', 1, 0)}${_b5g3(sv2, '#ffffff', '#dfe8f6', '#8898b8', 0, 1)}${_lg(c1, '#f6feff', '#bfe6ff', 0, 1)}${_lg(c2, '#9ed4ff', '#3f7ed4', 0, 1)}${_lg(c3, '#6aaaf0', '#2a56b8', 0, 1)}${_lg(c4, '#b8e6ff', '#4a98e8', 0, 1)}${_lg(c5, '#e8fbff', '#7ac0f4', 1, 1)}<radialGradient id="${sh}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#bfe9ff" stop-opacity=".55"/><stop offset="1" stop-color="#bfe9ff" stop-opacity="0"/></radialGradient></defs>
  <g transform="translate(16 16.2) rotate(30) scale(.76) translate(0 2.3)">
    <circle cx="0" cy="-13" r="13" fill="url(#${sh})"/>
        <path d="M-1.7 -3H1.7L1.9 14.6H-1.9Z" fill="url(#${sv})" ${IK}/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M-1.9 ${-1 + i * 2.1}L1.9 ${-2.4 + i * 2.1 + 1.2}" stroke="#4a8ee0" stroke-width=".95" stroke-linecap="round"/>`).join('')}
    ${_ln('M-.9 -2.4V14', '#fff', .5, .85)}
    <path d="M-2.7 3.6H2.7L2.2 6.4H-2.2Z" fill="url(#${sv2})" ${IK}/><path d="M-2.2 4.5H2.2" stroke="#fff" stroke-width=".4" opacity=".9"/><circle cx="0" cy="5" r=".9" fill="url(#${c4})" ${ik}/>
    <path d="M-2 9.2H2L1.7 10.8H-1.7Z" fill="url(#${sv2})" ${IK}/>
    <path d="M-2.3 13.4H2.3L1.9 14.8H-1.9Z" fill="url(#${sv2})" ${IK}/>
    <path d="M-1.8 14.8L0 20.2 1.8 14.8Z" fill="url(#${c2})" ${IK}/><path d="M-1.8 14.8L0 20.2 0 14.8Z" fill="url(#${c1})"/>
    <g transform="translate(0 -4.6) scale(1.28) translate(0 4.6)">
    ${shard(-3.2, -3.4, -58, 7.2, 2.5)}${shard(3.2, -3.4, 58, 7.2, 2.5)}${shard(-2.4, -2.6, -32, 5, 1.7)}${shard(2.4, -2.6, 32, 5, 1.7)}
    <path d="M-3.6 -7.6L-5.4 -11.4 -3.9 -11.2 -2.6 -7.4Z" fill="url(#${sv})" ${ik}/><path d="M3.6 -7.6L5.4 -11.4 3.9 -11.2 2.6 -7.4Z" fill="url(#${sv})" ${ik}/>
    <path d="M-3.9 -5.8H3.9L2.7 -2.4H-2.7Z" fill="url(#${sv2})" ${IK}/>
    <path d="M-2.2 -3C-6.4 -2.6-8 -5.2-6.8 -8.2-6.6 -6.2-5 -5-2.6 -4.6Z" fill="url(#${sv})" ${ik}/><path d="M2.2 -3C6.4 -2.6 8 -5.2 6.8 -8.2 6.6 -6.2 5 -5 2.6 -4.6Z" fill="url(#${sv})" ${ik}/>
    ${_ln('M-2.6 -4.2H2.6', '#fff', .45, .9)}<circle cx="0" cy="-4" r=".7" fill="#2a5ac0"/>
    <path d="M0 -19.8L4.8 -14.8L4.2 -7.6L0 -5.2L-4.2 -7.6L-4.8 -14.8Z" fill="url(#${c2})"/>
    <path d="M0 -19.8L-4.8 -14.8L-2.5 -13.6L0 -16.8Z" fill="#fbffff"/><path d="M0 -19.8L4.8 -14.8L2.5 -13.6L0 -16.8Z" fill="#cdeaff"/>
    <path d="M-4.8 -14.8L-2.5 -13.6L-2.4 -8.4L-4.2 -7.6Z" fill="url(#${c1})"/><path d="M4.8 -14.8L2.5 -13.6L2.4 -8.4L4.2 -7.6Z" fill="url(#${c3})"/>
    <path d="M-4.2 -7.6L-2.4 -8.4L0 -6.2L0 -5.2Z" fill="#8cc8fa"/><path d="M4.2 -7.6L2.4 -8.4L0 -6.2L0 -5.2Z" fill="#2f62c0"/>
    <path d="M0 -16.8L2.5 -13.6L2.4 -8.4L0 -6.2L-2.4 -8.4L-2.5 -13.6Z" fill="url(#${c5})"/>
    <path d="M0 -19.8L4.8 -14.8L4.2 -7.6L0 -5.2L-4.2 -7.6L-4.8 -14.8Z" fill="none" ${IK}/>
    <path d="M0 -16.8L2.5 -13.6L2.4 -8.4L0 -6.2L-2.4 -8.4L-2.5 -13.6Z" fill="none" stroke="#fff" stroke-width=".4" opacity=".75"/>
    <path d="M0 -19.8V-16.8M-4.8 -14.8L-2.5 -13.6M4.8 -14.8L2.5 -13.6M-4.2 -7.6L-2.4 -8.4M4.2 -7.6L2.4 -8.4M0 -5.2V-6.2" stroke="#fff" stroke-width=".4" opacity=".55"/>
    ${flake(0, -11.4, 3, '#0e3a90', 1.1)}${flake(0, -11.4, 3, '#ffffff', .6)}<circle cx="0" cy="-11.4" r=".6" fill="#fff"/>
    ${_ln('M-3.8 -14.2L-3.6 -9.2', '#fff', .8, .95)}${_ln('M-1.2 -18.4L-3.4 -15.8', '#fff', .7, .9)}
    </g>
  </g>
  ${_spark(26.6, 4.8, '#fff', .95)}${_spark(5.2, 17.4, '#bfe9ff', .65)}${_spark(27.4, 18.6, '#dff3ff', .6)}${_spark(10, 5.4, '#bfe9ff', .5)}
  <circle cx="22.4" cy="3.4" r=".5" fill="#fff"/><circle cx="29" cy="9.8" r=".5" fill="#cdeaff"/><circle cx="4" cy="25.4" r=".5" fill="#cdeaff"/>`;
},

/* Couronne de Givre Éternel : pointes de cristal sur un bandeau d'argent, saphir central, glaçons et éclats de givre */
hx_coiffe_givre: () => {
  const sv = _id(), c1 = _id(), c2 = _id(), c3 = _id(), sa = _id(), pe = _id(), ic = _id();
  const IK = 'stroke="#0a1c46" stroke-opacity=".92" stroke-width=".9" stroke-linejoin="round" stroke-linecap="round"';
  const ik = 'stroke="#0a1c46" stroke-opacity=".6" stroke-width=".55" stroke-linejoin="round" stroke-linecap="round"';
  const topY = x => 18.6 + 9.6 * ((x - 2.6) / 26.8) * (1 - (x - 2.6) / 26.8);
  /* pointe de cristal : base (bx, by), hauteur h, largeur w, tip décalé de lean */
  const spike = (bx, h, w, lean = 0) => { const by = topY(bx) + 1.4, tx = bx + lean, ty = by - h - 1.4, sy = by - h * .5; return `<path d="M${_b5n(bx - w / 2)} ${_b5n(by)}L${_b5n(bx - w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(tx)} ${_b5n(ty)}L${_b5n(bx + w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(bx + w / 2)} ${_b5n(by)}Z" fill="url(#${c3})"/>
    <path d="M${_b5n(bx - w / 2)} ${_b5n(by)}L${_b5n(bx - w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(tx)} ${_b5n(ty)}L${_b5n(bx + lean * .15)} ${_b5n(by)}Z" fill="url(#${c1})"/><path d="M${_b5n(bx + lean * .15)} ${_b5n(by)}L${_b5n(tx)} ${_b5n(ty)}L${_b5n(bx + w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(bx + w / 2)} ${_b5n(by)}Z" fill="url(#${c2})"/>
    <path d="M${_b5n(bx - w / 2 + lean * .3)} ${_b5n(sy)}H${_b5n(bx + w / 2 + lean * .3)}" stroke="#fff" stroke-width=".35" opacity=".5"/>
    <path d="M${_b5n(bx - w / 2)} ${_b5n(by)}L${_b5n(bx - w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(tx)} ${_b5n(ty)}L${_b5n(bx + w / 2 + lean * .3)} ${_b5n(sy)}L${_b5n(bx + w / 2)} ${_b5n(by)}Z" fill="none" ${IK}/>
    <path d="M${_b5n(bx - w / 2 + .75)} ${_b5n(by - 1.4)}L${_b5n(bx - w / 2 + lean * .3 + .75)} ${_b5n(sy)}L${_b5n(tx - .5)} ${_b5n(ty + 1.8)}" stroke="#fff" stroke-width=".7" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>`; };
  const band = 'M2.6 18.6Q16 23.4 29.4 18.6V26.2Q16 31 2.6 26.2Z';
  const botY = x => 26.2 + 9.6 * ((x - 2.6) / 26.8) * (1 - (x - 2.6) / 26.8);
  return `<defs>${_b5g3(sv, '#ffffff', '#cfdcf2', '#7488b0', 0, 1)}${_lg(c1, '#f6feff', '#b8e2ff', 0, 1)}${_lg(c2, '#86c0f6', '#3a70d0', 0, 1)}${_lg(c3, '#9ccaf4', '#5a8ae0', 0, 1)}${_b5r3(sa, '#b8dcff', '#2a58d8', '#0a1a74', .38, .3, .85)}${_rg(pe, '#ffffff', '#b8d8ff', .36, .3, .9)}${_lg(ic, '#f0fcff', '#6aaeee')}</defs>
  ${_sh(16, 30.2, 12.5, 1.2)}
  ${spike(4.4, 9.2, 3.6, -1.3)}${spike(27.6, 9.2, 3.6, 1.3)}${spike(9.2, 13.2, 4.4, -.8)}${spike(22.8, 13.2, 4.4, .8)}${spike(12.8, 8, 2.8, -.2)}${spike(19.2, 8, 2.8, .2)}${spike(16, 17, 5.4, 0)}
  <path d="${band}" fill="url(#${sv})" ${IK}/>
  <path d="M2.6 18.6Q16 23.4 29.4 18.6V20.2Q16 25 2.6 20.2Z" fill="#fff" opacity=".5"/>
  <path d="M2.6 24.6Q16 29.4 29.4 24.6V26.2Q16 31 2.6 26.2Z" fill="#4a5e88" opacity=".35"/>
  ${_ln('M3 20.2Q16 25 29 20.2', '#fff', .6, .9)}${_ln('M3 24.8Q16 29.6 29 24.8', '#5a6e98', .5, .8)}
  ${_ln('M3.4 22.5Q16 27.3 28.6 22.5', '#4a8ee0', .75, .85)}<path d="M3.4 22.5Q16 27.3 28.6 22.5" fill="none" stroke="#fff" stroke-width=".5" stroke-dasharray=".01 1.55" stroke-linecap="round" opacity=".95"/>
  ${[[7.4, 23.8, 1.4], [24.6, 23.8, 1.4]].map(([x, y, r]) => `<path d="M${x} ${y - 2}L${x + 1.5} ${y}L${x} ${y + 2}L${x - 1.5} ${y}Z" fill="url(#${ic})" ${ik}/><path d="M${x} ${y - 2}L${x - 1.5} ${y}H${x + 1.5}Z" fill="#fff" opacity=".7"/>`).join('')}
  ${[[3.9, 22.9], [28.1, 22.9]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.15" fill="url(#${pe})" ${ik}/><circle cx="${x - .3}" cy="${y - .35}" r=".35" fill="#fff"/>`).join('')}
  ${[[7.4, 3.2], [11.8, 2.6], [20.2, 2.6], [24.6, 3.2]].map(([x, L]) => { const b = botY(x); return `<path d="M${x - 1.2} ${_b5n(b - .8)}L${x} ${_b5n(b + L)}L${x + 1.2} ${_b5n(b - .8)}Z" fill="url(#${ic})" ${ik}/><path d="M${x - .5} ${_b5n(b + .2)}L${x - .1} ${_b5n(b + L - .8)}" stroke="#fff" stroke-width=".45" stroke-linecap="round" opacity=".9"/>`; }).join('')}
  <circle cx="16" cy="24.8" r="4.3" fill="url(#${sv})" ${IK}/><circle cx="16" cy="24.8" r="3.2" fill="url(#${sa})" ${IK}/>
  <path d="M16 22L18.6 24.8 16 27.6 13.4 24.8Z" fill="none" stroke="#9ed0ff" stroke-width=".4" opacity=".7"/><path d="M13.2 24.8H18.8M16 21.8V27.8" stroke="#9ed0ff" stroke-width=".3" opacity=".5"/>
  ${_ln('M13.8 23.2C14.4 22.4 15.2 22 16.2 22', '#fff', .8, .95)}<circle cx="14.4" cy="23.6" r=".6" fill="#fff"/>
  ${[0, 90, 180, 270].map(a => `<path transform="rotate(${a} 16 24.8)" d="M15.2 20.7L16 19.4 16.8 20.7Z" fill="url(#${sv})" ${ik}/>`).join('')}
  ${_spark(27.8, 5.6, '#fff', .95)}${_spark(4.4, 5.4, '#bfe9ff', .7)}${_spark(30, 14.4, '#dff3ff', .55)}${_spark(13.6, 2.6, '#fff', .5)}
  <circle cx="9.4" cy="3.6" r=".5" fill="#fff"/><circle cx="23.6" cy="4.4" r=".5" fill="#cdeaff"/>`;
},

/* Trône de Cristal du Mansot Royal : petit trône taillé dans un seul bloc de glace, coussin bleu royal, lueur dorée discrète sur le contour */
hx_relique_mansot: () => {
  const ic = _id(), ib = _id(), ia = _id(), id = _id(), pa = _id(), cu = _id(), gd = _id();
  const IK = 'stroke="#0a1c46" stroke-opacity=".92" stroke-width=".9" stroke-linejoin="round" stroke-linecap="round"';
  const ik = 'stroke="#0a1c46" stroke-opacity=".6" stroke-width=".55" stroke-linejoin="round" stroke-linecap="round"';
  const BR = 'M9.4 18V7.8L10.2 4.2L12.6 7.2L14.2 5L16 1.6L17.8 5L19.4 7.2L21.8 4.2L22.6 7.8V18Z';
  const base = 'M3.8 29H28.2L26.9 25.2H5.1Z', baseTop = 'M5.1 25.2H26.9L25.8 23.4H6.2Z';
  const armL = 'M6.2 23.6V15.8H10.2V23.6Z', armLt = 'M6.2 15.8L7.2 14.4H11.2L10.2 15.8Z';
  const armR = 'M25.8 23.6V15.8H21.8V23.6Z', armRt = 'M25.8 15.8L24.8 14.4H20.8L21.8 15.8Z';
  const all = [BR, base, baseTop, armL, armLt, armR, armRt];
  const shard = (x, y, a, L, W) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M${-W / 2} 0L${-W / 2} ${-L * .6}L0 ${-L}L${W / 2} ${-L * .6}L${W / 2} 0Z" fill="url(#${ib})" ${ik}/><path d="M${-W / 2} 0L${-W / 2} ${-L * .6}L0 ${-L}L0 0Z" fill="#f2fcff"/><path d="M${-W / 2 + .4} ${-L * .2}V${-L * .55}" stroke="#fff" stroke-width=".4" stroke-linecap="round"/></g>`;
  const flake = (x, y, r) => `<g transform="translate(${x} ${y})" stroke="#fff" stroke-width=".65" stroke-linecap="round" fill="none">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 ${-r}V${r}"/><path d="M-${r * .34} ${-r * .62}L0 ${-r * .34}L${r * .34} ${-r * .62}M-${r * .34} ${r * .62}L0 ${r * .34}L${r * .34} ${r * .62}"/></g>`).join('')}</g>`;
  return _b5aura('#fff2a0', '#ffc83a', 15.6) + `<defs>${_lg(ic, '#e6f8ff', '#7ec0f4')}${_lg(ib, '#a8dcff', '#4a8ae0', 1, 0)}${_lg(ia, '#f2fcff', '#a8d8fc', 0, 1)}${_lg(id, '#7ab4f0', '#2e60c4', 0, 1)}${_lg(pa, '#bfe6ff', '#4e94e4', 0, 1)}${_b5g3(cu, '#8aa8ff', '#3a54d0', '#18268c', 0, 1)}${_b5gold(gd)}</defs>
  <g transform="translate(0 .6)">
  ${all.map(d => `<path d="${d}" fill="none" stroke="#ffd24a" stroke-width="3.8" stroke-linejoin="round" opacity=".16"/>`).join('')}${all.map(d => `<path d="${d}" fill="none" stroke="#ffd96a" stroke-width="2.2" stroke-linejoin="round" opacity=".34"/>`).join('')}
  <path d="${BR}" fill="url(#${ic})" ${IK}/>
  <path d="M9.4 18V7.8L10.2 4.2L12.6 7.2L11.8 9V18Z" fill="url(#${ia})"/><path d="M22.6 18V7.8L21.8 4.2L19.4 7.2L20.2 9V18Z" fill="url(#${id})"/>
  <path d="M12.6 7.2L14.2 5L16 1.6V4.6L14.2 5Z" fill="#fff" opacity=".85"/><path d="M19.4 7.2L17.8 5L16 1.6V4.6L17.8 5Z" fill="#8cc8fa" opacity=".8"/>
  <path d="M11.8 18V9.4C11.8 7.4 13.6 6 16 4.6C18.4 6 20.2 7.4 20.2 9.4V18Z" fill="url(#${pa})" ${ik}/>
  <path d="M12.4 17.4V9.6C12.4 8 13.8 6.9 16 5.7" stroke="#fff" stroke-width=".7" fill="none" stroke-linecap="round" opacity=".85"/><path d="M19.6 17.4V9.6C19.6 8 18.4 7 16.6 6" stroke="#2a56b8" stroke-width=".6" fill="none" stroke-linecap="round" opacity=".7"/>
  ${flake(16, 11.6, 3)}<circle cx="16" cy="11.6" r=".7" fill="#fff"/>
  ${_ln('M10.2 6.2L10.5 12', '#fff', .7, .9)}${_ln('M9.8 15.4V17', '#fff', .6, .8)}
  <path d="${base}" fill="url(#${id})" ${IK}/><path d="${baseTop}" fill="url(#${ia})" ${IK}/>
  <path d="M5.9 26.4H26.1" stroke="#fff" stroke-width=".5" opacity=".6"/><path d="M4.6 28.2H27.4" stroke="#1a3a90" stroke-width=".5" opacity=".5"/>
  ${[[8.4, 27.4, .5], [14, 27.8, .4], [19.6, 27.2, .45], [24.6, 27.6, .4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".8"/>`).join('')}
  <path d="M10 17.6Q16 16 22 17.6L22.6 22.6Q16 24.2 9.4 22.6Z" fill="url(#${cu})" ${IK}/>
  <path d="M10.2 18Q16 16.6 21.8 18L21.9 19.2Q16 17.8 10.1 19.2Z" fill="#c8d8ff" opacity=".5"/>
  <path d="M10 17.7Q16 16.1 22 17.7" fill="none" stroke="url(#${gd})" stroke-width="1" stroke-linecap="round"/><path d="M9.5 22.4Q16 24 22.5 22.4" fill="none" stroke="url(#${gd})" stroke-width="1" stroke-linecap="round"/>
  <path d="M16 20.2L12.6 19.2M16 20.2L19.4 19.2M16 20.2L13 21.8M16 20.2L19 21.8" stroke="#10206a" stroke-width=".45" opacity=".55" fill="none"/>
  <circle cx="16" cy="20.2" r=".95" fill="url(#${gd})" ${ik}/>
  <path d="${armL}" fill="url(#${ib})" ${IK}/><path d="${armLt}" fill="url(#${ia})" ${IK}/><path d="${armR}" fill="url(#${id})" ${IK}/><path d="${armRt}" fill="url(#${ia})" ${IK}/>
  <path d="M6.2 15.8V23.6H7.6V15.8Z" fill="#fff" opacity=".35"/><path d="M24.4 15.8V23.6H25.8V15.8Z" fill="#fff" opacity=".18"/>
  ${shard(8.2, 14.6, -14, 3.8, 1.5)}${shard(10, 14.6, 16, 2.8, 1.2)}${shard(23.8, 14.6, 14, 3.8, 1.5)}${shard(22, 14.6, -16, 2.8, 1.2)}
  ${_ln('M7.2 18.6V21.4', '#fff', .6, .8)}
  </g>
  ${_spark(27.8, 5.8, '#fff', .95)}${_spark(4.6, 10, '#ffe9a0', .7)}${_spark(28.6, 18, '#ffe27a', .55)}${_spark(3.6, 26.6, '#fff', .55)}
  <circle cx="27.4" cy="11.8" r=".5" fill="#ffd96a"/><circle cx="5.4" cy="17.4" r=".5" fill="#fff"/><circle cx="12.2" cy="2.8" r=".45" fill="#fff"/>`;
},

/* Dofus Vulbis : œuf bleu-violet glacé, facettes de cristal et flocon discret */
hx_dofus_vulbis: _dofusArt2('#f4f6ff', '#7a80f2', '#281888', '#d4d8ff', '#8c90ff', (v, c3) => {
  const P = { A: [16, 3.4], B: [10.6, 8.6], C: [21.4, 8.6], D: [6.4, 15.6], F: [25.6, 15.6], G: [8.4, 24.4], H: [23.6, 24.4], J: [16, 28.8], L: [16, 12.4], R: [10.2, 17.8], S: [21.8, 17.8], T: [16, 23.4] };
  const poly = (ks, f, o) => `<path d="M${ks.map(k => P[k].join(' ')).join('L')}Z" fill="${f}" opacity="${o}" stroke="none"/>`;
  const lines = [['A', 'B'], ['A', 'C'], ['B', 'L'], ['C', 'L'], ['B', 'D'], ['C', 'F'], ['B', 'R'], ['C', 'S'], ['L', 'R'], ['L', 'S'], ['R', 'D'], ['S', 'F'], ['R', 'T'], ['S', 'T'], ['R', 'G'], ['S', 'H'], ['T', 'G'], ['T', 'H'], ['T', 'J'], ['G', 'J'], ['H', 'J']].map(([a, b]) => `M${P[a].join(' ')}L${P[b].join(' ')}`).join('');
  const r = 3.7;
  return `${poly(['A', 'B', 'L', 'C'], '#ffffff', .3)}${poly(['B', 'D', 'R'], '#ffffff', .22)}${poly(['B', 'L', 'R'], '#ffffff', .14)}${poly(['R', 'T', 'G'], '#ffffff', .16)}${poly(['C', 'L', 'S'], c3, .2)}${poly(['C', 'S', 'F'], c3, .3)}${poly(['S', 'T', 'H'], c3, .26)}${poly(['T', 'G', 'J'], '#ffffff', .1)}${poly(['T', 'H', 'J'], c3, .42)}${poly(['G', 'H', 'J'], c3, .12)}
    <path d="${lines}" stroke="${v}" stroke-width=".7" opacity=".8"/>
    <path d="M16 12.4L21.8 17.8 16 23.4 10.2 17.8Z" fill="#fff" opacity=".1" stroke="${v}" stroke-width=".9"/>
    <g transform="translate(16 17.8)" stroke="#fff" stroke-width=".7" fill="none" opacity=".95">${[0, 60, 120].map(a => `<g transform="rotate(${a})"><path d="M0 ${-r}V${r}"/><path d="M-1.2 ${-r * .62}L0 ${-r * .34}L1.2 ${-r * .62}M-1.2 ${r * .62}L0 ${r * .34}L1.2 ${r * .62}"/></g>`).join('')}</g>
    <circle cx="16" cy="17.8" r=".7" fill="#fff" stroke="none"/>
    ${[[11.4, 6.4, .7], [23, 21, .6], [8.6, 21, .5]].map(([x, y, k]) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0-2.6.7-.7 2.6 0 .7.7 0 2.6-.7.7-2.6 0-.7-.7Z" fill="#fff" stroke="none" opacity=".9"/>`).join('')}`;
}),

/* ======================= RANG 6 · DRAGON DE JADE : jade translucide, or, laque rouge, nuages d'Orient ======================= */

/* Lame du Dragon Empereur : sabre courbe (dao) en jade translucide, garde en dragon d'or enroulé, pompon rouge au pommeau */
hx_lame_jade: () => {
  const jb = _id(), jc = _id(), gd = _id(), rd = _id(), pm = _id(), gb = _id();
  const thd = 40, th = thd * Math.PI / 180, SC = .86, TX = 14.2, TY = 12.6;
  const T = (x, y) => [TX + SC * (x * Math.cos(th) - y * Math.sin(th)), TY + SC * (x * Math.sin(th) + y * Math.cos(th))];
  /* lame courbe : axe x = k (5 − y)², demi-largeurs côté tranchant (wl) et côté dos (wr) */
  const k = .018, y0 = 5.4, y1 = -17.2, N = 28;
  const wl = t => { const a = 2.9 + 2 * Math.sin(Math.min(t / .4, 1) * Math.PI / 2); return t > .8 ? a * Math.sqrt(Math.max(0, 1 - Math.pow((t - .8) / .2, 2))) : a; };
  const wr = t => t < .72 ? 2.1 : Math.max(0, 2.1 * (1 - (t - .72) / .25));
  const at = (t, off) => { const y = y0 + (y1 - y0) * t, d = 5 - y, x = k * d * d; let tx = 2 * k * d, ty = -1; const m = Math.hypot(tx, ty); tx /= m; ty /= m; return [x + (-ty) * off, y + tx * off]; };
  const line = (t0, t1, off, wob = 0, n = 18) => Array.from({ length: n + 1 }, (_, i) => { const t = t0 + (t1 - t0) * i / n, o = typeof off === 'function' ? off(t) : off, [x, y] = at(t, o + wob * Math.sin(i * 1.05)); return `${_b5n(x)} ${_b5n(y)}`; });
  const poly = (fl, fr, t0 = 0, t1 = 1, n = N) => { const A = [], B = []; for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n; A.push(at(t, -fl(t)).map(_b5n).join(' ')); B.push(at(t, fr(t)).map(_b5n).join(' ')); } return `M${A.join('L')}L${B.reverse().join('L')}Z`; };
  const blade = poly(wl, wr);
  const core = poly(t => wl(t) * .55, t => wr(t) * .3, .04, .9);
  const spineBand = poly(t => -wr(t) + 1.2, wr, .02, .96);
  const [px, py] = T(0, 16.8);
  const pf = (cx, cy, r) => Array.from({ length: 10 }, (_, i) => { const a = i * 36 * Math.PI / 180; return `<circle cx="${_b5n(cx + Math.cos(a) * r * .72)}" cy="${_b5n(cy + Math.sin(a) * r * .72)}" r="${_b5n(r * .42)}" fill="url(#${pm})" stroke="#4a0408" stroke-opacity=".7" stroke-width=".4"/>`; }).join('');
  return `<defs><linearGradient id="${jb}" gradientUnits="userSpaceOnUse" x1="-5" y1="0" x2="10" y2="-6"><stop offset="0" stop-color="#e8fff2"/><stop offset=".38" stop-color="#6fe8ac"/><stop offset="1" stop-color="#0f9a68"/></linearGradient>${_lg(jc, '#ffffff', '#9ff0c8', 0, 1)}${_b5gold(gd)}${_b5g3(rd, '#e8343a', '#b0101a', '#5a0408', 1, 0)}${_b5r3(pm, '#ff9a8a', '#d0141c', '#6a0610', .36, .3, .85)}${_b5g3(gb, '#fff6c0', '#f0b83a', '#8a5a0a', 1, 1)}</defs>
  <g transform="translate(${TX} ${TY}) rotate(${thd}) scale(${SC})">
    <path d="${blade}" fill="url(#${jb})"/>
    <path d="${core}" fill="url(#${jc})" opacity=".5"/>
    <path d="${spineBand}" fill="#0a5a3e" opacity=".5"/>
    <path d="M${line(.06, .86, -.4, .5).join('L')}" fill="none" stroke="#fff" stroke-width=".55" stroke-linecap="round" opacity=".42"/>
    <path d="M${line(.14, .9, 1.1, .45).join('L')}" fill="none" stroke="#fff" stroke-width=".45" stroke-linecap="round" opacity=".3"/>
    <path d="M${line(.08, .78, .85).join('L')}" fill="none" stroke="#0c7a52" stroke-width=".9" stroke-linecap="round" opacity=".65"/><path d="M${line(.08, .78, 1.15).join('L')}" fill="none" stroke="#fff" stroke-width=".4" stroke-linecap="round" opacity=".5"/>
    <path d="M${line(.04, .97, t => -(wl(t) - .55)).join('L')}" fill="none" stroke="#fff" stroke-width=".85" stroke-linecap="round" opacity=".95"/>
    ${[.18, .34, .5].map(t => { const [x, y] = at(t, wr(t) - .6); return `<circle cx="${_b5n(x)}" cy="${_b5n(y)}" r=".5" fill="url(#${gb})" stroke="#5a3a06" stroke-width=".3"/>`; }).join('')}
    <path d="${blade}" fill="none" ${_K}/>
    <path d="M-3.4 3.8L3 3.8L2.8 6.2L-3.6 6.2Z" fill="url(#${gb})" ${_K}/>${_ln('M-3 4.7H2.6', '#fff', .45, .8)}
    <path d="M6 3.5C6.7 1.7 8.7 1.5 8.9 3C9 4 7.7 4.3 7.3 3.5" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="2.3" stroke-linecap="round"/><path d="M6 3.5C6.7 1.7 8.7 1.5 8.9 3C9 4 7.7 4.3 7.3 3.5" fill="none" stroke="url(#${gd})" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M-6 3.4C-4.4 8.6 4.4 8.6 6 3.4" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-6 3.4C-4.4 8.6 4.4 8.6 6 3.4" fill="none" stroke="url(#${gd})" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-5.6 4.4C-3.8 8 3.8 8 5.6 4.4" fill="none" stroke="#fff" stroke-width=".5" stroke-linecap="round" opacity=".75" transform="translate(0 -.4)"/>
    ${[-3.8, -2.2, -.6, 1, 2.6, 4.2].map((x, i) => `<path transform="translate(${x} ${_b5n(7.2 - Math.abs(x) * .4)}) rotate(${x * 2.4})" d="M-.55 -.9Q.5 0 -.55 .9" stroke="#7a4e08" stroke-width=".4" fill="none" stroke-linecap="round" opacity=".85"/>`).join('')}
    ${[[-3, 8, -14], [0, 8.8, 0], [3, 8, 14]].map(([x, y, a]) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M-.9 .1L0 1.9 .9 .1Z" fill="url(#${gb})" stroke="#140c06" stroke-opacity=".7" stroke-width=".35"/>`).join('')}
    <g transform="translate(-6.6 2.6) rotate(-158) scale(1 -1) scale(.72)">
      <path d="M.3 -1.8C-1.2 -4 -3.4 -4.2 -4.6 -3.2C-3.2 -3.2 -2.2 -2.4 -1.6 -1.2Z" fill="url(#${gb})" stroke="#140c06" stroke-opacity=".85" stroke-width=".7" stroke-linejoin="round"/>
      <path d="M-.8 -1.5C.6 -2.8 3 -3 5 -2.2C6 -1.8 6.8 -1.1 6.6 -.4L4.2 .1L5.8 1.3C4.2 2.6 1.6 2.8 -.8 1.9Z" fill="url(#${gd})" stroke="#140c06" stroke-opacity=".9" stroke-width=".8" stroke-linejoin="round"/>
      <path d="M5.2 -1.9C7.2 -3.4 8.8 -2.8 9.4 -1.4" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="1.3" stroke-linecap="round"/><path d="M5.2 -1.9C7.2 -3.4 8.8 -2.8 9.4 -1.4" fill="none" stroke="#f0b83a" stroke-width=".6" stroke-linecap="round"/>
      <ellipse cx="1.8" cy="-.9" rx=".95" ry=".8" fill="#e0141c" stroke="#2a0204" stroke-width=".3"/><circle cx="1.6" cy="-1.2" r=".28" fill="#fff"/><circle cx="5.9" cy="-1" r=".3" fill="#5a3a06"/>
      ${_ln('M.4 -2C1.8 -2.5 3.2 -2.5 4.4 -2.1', '#fff', .45, .8)}
    </g>
    <path d="M-1.35 8.4H1.35V14.2H-1.35Z" fill="url(#${rd})" ${_K}/>
    ${[0, 1, 2, 3].map(i => `<path d="M-1.3 ${9 + i * 1.4}L1.3 ${9.8 + i * 1.4}" stroke="#f0c050" stroke-width=".65" stroke-linecap="round"/>`).join('')}${_ln('M-.8 8.6V14', '#ff9a8a', .4, .6)}
    <path d="M-2.4 8H2.4L2 9H-2Z" fill="url(#${gb})" ${_K}/>
    <circle cx="0" cy="15.5" r="2.1" fill="url(#${gd})" ${_K}/><circle cx="0" cy="15.5" r="1" fill="#2fcf8a" stroke="#0a5a3a" stroke-width=".35"/><circle cx="-.35" cy="15.1" r=".3" fill="#fff"/>
    <circle cx="0" cy="17.2" r=".95" fill="none" stroke="#140c06" stroke-width="1.5" stroke-opacity=".9"/><circle cx="0" cy="17.2" r=".95" fill="none" stroke="#f0b83a" stroke-width=".7"/>
  </g>
  <path d="M${_b5n(px)} ${_b5n(py + .3)}C${_b5n(px - .4)} ${_b5n(py + 1.4)} ${_b5n(px - .7)} ${_b5n(py + 2)} ${_b5n(px - .8)} ${_b5n(py + 2.6)}" fill="none" stroke="#140c06" stroke-width="1.8" stroke-linecap="round" opacity=".9"/><path d="M${_b5n(px)} ${_b5n(py + .3)}C${_b5n(px - .4)} ${_b5n(py + 1.4)} ${_b5n(px - .7)} ${_b5n(py + 2)} ${_b5n(px - .8)} ${_b5n(py + 2.6)}" fill="none" stroke="#e8343a" stroke-width=".9" stroke-linecap="round"/>
  <circle cx="${_b5n(px - .9)}" cy="${_b5n(py + 4.2)}" r="2.7" fill="#7a0610" opacity=".9"/>
  ${pf(_b5n(px - .9), _b5n(py + 4.2), 2.8)}
  <circle cx="${_b5n(px - .9)}" cy="${_b5n(py + 4.2)}" r="2.1" fill="url(#${pm})"/><circle cx="${_b5n(px - 1.6)}" cy="${_b5n(py + 3.5)}" r=".7" fill="#fff" opacity=".85"/>
  <path d="M${_b5n(px - 1.8)} ${_b5n(py + 2.2)}h1.9" stroke="#140c06" stroke-width="1.5" stroke-linecap="round" opacity=".9"/><path d="M${_b5n(px - 1.8)} ${_b5n(py + 2.2)}h1.9" stroke="#f0b83a" stroke-width=".75" stroke-linecap="round"/>
  ${_spark(28.2, 5.4, '#fff', .9)}${_spark(18.4, 11.2, '#e8fff4', .55)}${_spark(5.2, 12.6, '#9ff0c8', .6)}`;
},

/* Pendentif du Dragon de Jade : disque de jade ajouré (bi) cerné d'un dragon d'or qui s'enroule vers une perle, cordon rouge */
hx_amulette_jade: () => {
  const jd = _id(), gd = _id(), rd = _id(), pe = _id(), gb = _id();
  const cx = 16, cy = 18.4, R = 9.5, th0 = 25, th1 = 312, N = 46;
  const P = (th, r) => { const a = th * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const W = t => 3 * (1 - .84 * Math.pow(t, 1.05)) + .1;
  const out = [], inn = [];
  for (let i = 0; i <= N; i++) { const t = i / N, th = th0 + (th1 - th0) * t, w = W(t); out.push(P(th, R + w / 2).map(_b5n).join(' ')); inn.push(P(th, R - w / 2).map(_b5n).join(' ')); }
  const ribbon = `M${out.join('L')}L${inn.reverse().join('L')}Z`;
  const spikes = Array.from({ length: 9 }, (_, i) => { const t = .12 + i * .095, th = th0 + (th1 - th0) * t, w = W(t), [x0, y0] = P(th, R + w / 2 - .2), [x1, y1] = P(th + 3.6, R + w / 2 - .2), [tx, ty] = P(th + 5, R + w / 2 + 1.15 * (1 - t * .5)); return `<path d="M${_b5n(x0)} ${_b5n(y0)}L${_b5n(tx)} ${_b5n(ty)}L${_b5n(x1)} ${_b5n(y1)}Z" fill="url(#${gb})" stroke="#140c06" stroke-opacity=".55" stroke-width=".3"/>`; }).join('');
  const scales = Array.from({ length: 22 }, (_, i) => { const t = .06 + i * .042, th = th0 + (th1 - th0) * t, w = W(t), [x0, y0] = P(th - 1.6, R + w * .36), [x1, y1] = P(th + 1.2, R), [x2, y2] = P(th - 1.6, R - w * .36); return `<path d="M${_b5n(x0)} ${_b5n(y0)}Q${_b5n(x1)} ${_b5n(y1)} ${_b5n(x2)} ${_b5n(y2)}" fill="none" stroke="#7a4e08" stroke-width=".42" stroke-linecap="round" opacity=".8"/>`; }).join('');
  const claw = (t) => { const th = th0 + (th1 - th0) * t, w = W(t); return [-2.6, 0, 2.6].map(d => { const [x0, y0] = P(th + d, R - w / 2 + .3), [x1, y1] = P(th + d * .8, R - w / 2 - 2.1); return `<path d="M${_b5n(x0)} ${_b5n(y0)}L${_b5n(x1)} ${_b5n(y1)}" stroke="#140c06" stroke-width="1.6" stroke-linecap="round" opacity=".92"/><path d="M${_b5n(x0)} ${_b5n(y0)}L${_b5n(x1)} ${_b5n(y1)}" stroke="#fff4d0" stroke-width=".8" stroke-linecap="round"/>`; }).join(''); };
  const [hx, hy] = P(th0, R);
  const disc = `M${cx - 8.5} ${cy}a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0 -17 0ZM${cx - 2.7} ${cy}a2.7 2.7 0 1 1 5.4 0a2.7 2.7 0 1 1 -5.4 0Z`;
  return `<defs>${_b5r3(jd, '#e4fff0', '#46d08e', '#0b6a46', .34, .28, .95)}${_b5gold(gd)}${_b5g3(rd, '#ff6a5a', '#d0141c', '#6a0610', 0, 1)}${_b5r3(pe, '#ffffff', '#ffe0f0', '#a8b8f0', .36, .3, .9)}${_b5g3(gb, '#fffbd0', '#f6c850', '#9a6a10', 1, 1)}</defs>
  <g transform="translate(16 16.4) scale(.95) translate(-16 -16)">${_sh(16, 30.4, 10, 1.1)}
  <path d="M15.6 6.6C13.4 3.8 9.6 2.4 6.4 1.8M16.4 6.6C18.6 3.8 22.4 2.4 25.6 1.8" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M15.6 6.6C13.4 3.8 9.6 2.4 6.4 1.8M16.4 6.6C18.6 3.8 22.4 2.4 25.6 1.8" fill="none" stroke="url(#${rd})" stroke-width="2" stroke-linecap="round"/>
  ${_ln('M14.4 5.4l1.2-.4M12.2 3.8l1.2-.6M10 2.8l1.2-.6M17.6 5.4l-1.2-.4M19.8 3.8l-1.2-.6M22 2.8l-1.2-.6', '#ffb0a0', .5, .9)}${_ln('M15 5.8C13 3.6 10 2.4 7 1.8', '#fff', .45, .6)}
  <circle cx="16" cy="6.2" r="1.9" fill="none" stroke="#140c06" stroke-width="2.3" stroke-opacity=".9"/><circle cx="16" cy="6.2" r="1.9" fill="none" stroke="url(#${gd})" stroke-width="1.2"/>
  <path d="${disc}" fill="url(#${jd})" fill-rule="evenodd" stroke="#0a3a28" stroke-opacity=".85" stroke-width=".8" stroke-linejoin="round"/>
  <circle cx="${cx}" cy="${cy}" r="6.4" fill="none" stroke="#0a5a3a" stroke-width=".5" opacity=".6"/><circle cx="${cx}" cy="${cy}" r="6.4" fill="none" stroke="#fff" stroke-width=".35" opacity=".35" transform="translate(.35 .35)"/>
  ${Array.from({ length: 14 }, (_, i) => { const a = i * 360 / 14 * Math.PI / 180; return `<circle cx="${_b5n(cx + Math.cos(a) * 5.15)}" cy="${_b5n(cy + Math.sin(a) * 5.15)}" r=".62" fill="#b8f4d4" stroke="#0a5a3a" stroke-width=".28" stroke-opacity=".7"/>`; }).join('')}
  <circle cx="${cx}" cy="${cy}" r="2.7" fill="none" stroke="#f0b83a" stroke-width=".9"/><circle cx="${cx}" cy="${cy}" r="3.1" fill="none" stroke="#0a3a28" stroke-width=".55" opacity=".8"/>
  <path d="M9.2 14.4C10.6 11.8 13 10.4 15.6 10.4" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".85"/><circle cx="8.9" cy="17" r=".5" fill="#fff" opacity=".8"/>
  <path d="${ribbon}" fill="url(#${gd})" ${_K}/>
  ${scales}${spikes}
  <path d="${ribbon}" fill="none" ${_K}/>
  ${_ln(`M${out.slice(4, 36).map(s => { const [x, y] = s.split(' ').map(Number), dx = cx - x, dy = cy - y, m = Math.hypot(dx, dy); return `${_b5n(x + dx / m * .55)} ${_b5n(y + dy / m * .55)}`; }).join('L')}`, '#fff', .55, .65)}
  <g transform="translate(${_b5n(hx)} ${_b5n(hy)}) rotate(-65) scale(1 -1)">
    <path d="M.6 -1.9C-.8 -4.2 -3 -4.6 -4.4 -3.6C-2.8 -3.6 -1.8 -2.8 -1.2 -1.4Z" fill="url(#${gb})" ${_K}/>
    <path d="M-.4 1.8C-1.6 3.8 -3.4 4 -4.6 3.2C-3 3.2 -1.8 2.6 -.8 1.4Z" fill="url(#${gb})" ${_k}/>
    <path d="M-1 -1.7C.4 -3 2.8 -3.2 4.8 -2.4C5.8 -2 6.6 -1.3 6.4 -.6L4 .1L5.6 1.4C4 2.8 1.4 3 -1 2.1Z" fill="url(#${gd})" ${_K}/>
    <path d="M5 -2.1C7 -3.8 8.6 -3.2 9.2 -1.8" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="1.4" stroke-linecap="round"/><path d="M5 -2.1C7 -3.8 8.6 -3.2 9.2 -1.8" fill="none" stroke="#f6c850" stroke-width=".7" stroke-linecap="round"/>
    <ellipse cx="1.6" cy="-1" rx=".85" ry=".7" fill="#d0141c" stroke="#2a0204" stroke-width=".3"/><circle cx="1.4" cy="-1.25" r=".25" fill="#fff"/><circle cx="5.7" cy="-1.1" r=".3" fill="#5a3a06"/>
    ${_ln('M.2 -2.1C1.6 -2.7 3 -2.7 4.2 -2.3', '#fff', .45, .8)}
  </g>
  <circle cx="27.6" cy="10.4" r="2.2" fill="#ffe9a0" opacity=".28"/><circle cx="27.6" cy="10.4" r="1.9" fill="url(#${pe})" ${_K}/><circle cx="27" cy="9.7" r=".6" fill="#fff"/>
  </g>${_spark(4.4, 9.8, '#fff', .8)}${_spark(28.8, 25.6, '#bff6dc', .6)}${_spark(3.6, 27.4, '#ffe9a0', .55)}`;
},

/* Orbe Impérial du Dragon de Jade : orbe de jade lumineux serti dans une griffe de dragon d'or, volutes de nuage, aura dorée discrète */
hx_relique_jade: () => {
  const gd = _id(), og = _id(), cl = _id(), iv = _id(), gh = _id(), fa = _id();
  const OX = 16, OY = 12.4, OR = 8.3;
  /* doigt effilé le long d'une courbe de Bézier cubique : largeur w0 → w1 */
  const finger = (p0, p1, p2, p3, w0, w1, clawLen = 0) => {
    const pts = _b5bez(p0, p1, p2, p3, 22), L = [], R = [];
    pts.forEach((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m; const w = (w0 + (w1 - w0) * Math.pow(i / (pts.length - 1), .9)) / 2; L.push([p[0] - dy * w, p[1] + dx * w]); R.push([p[0] + dy * w, p[1] - dx * w]); });
    const P = a => a.map(([x, y]) => `${_b5n(x)} ${_b5n(y)}`).join('L');
    const body = `<path d="M${P(L)}L${P(R.slice().reverse())}Z" fill="url(#${gd})" stroke="#140c06" stroke-opacity=".9" stroke-width=".8" stroke-linejoin="round"/>`;
    const seg = [.3, .52].map(t => { const i = Math.round(t * (pts.length - 1)); return `<path d="M${_b5n(L[i][0])} ${_b5n(L[i][1])}L${_b5n(R[i][0])} ${_b5n(R[i][1])}" stroke="#7a4e08" stroke-width=".5" stroke-linecap="round" opacity=".8"/>`; }).join('');
    const hl = `<path d="M${P(pts.slice(2, 16).map((p, k) => { const i = k + 2; return [(p[0] * 2 + L[i][0]) / 3, (p[1] * 2 + L[i][1]) / 3]; }))}" fill="none" stroke="#fff" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`;
    /* griffe d'ivoire au bout */
    const e = pts.length - 1, a = pts[e - 3], b = pts[e]; let dx = b[0] - a[0], dy = b[1] - a[1]; const m = Math.hypot(dx, dy); dx /= m; dy /= m;
    const claw = `<path d="M${_b5n(b[0] - dy * w1 / 2 - dx * .4)} ${_b5n(b[1] + dx * w1 / 2 - dy * .4)}L${_b5n(b[0] + dx * clawLen + dy * .3)} ${_b5n(b[1] + dy * clawLen - dx * .3)}L${_b5n(b[0] + dy * w1 / 2 - dx * .4)} ${_b5n(b[1] - dx * w1 / 2 - dy * .4)}Z" fill="url(#${iv})" stroke="#140c06" stroke-opacity=".9" stroke-width=".7" stroke-linejoin="round"/>`;
    return body + seg + hl + (clawLen ? claw : '');
  };
  const cloud = (x, y, s, flip) => `<g transform="translate(${x} ${y}) scale(${flip * s} ${s})"><path d="M-6.4 1.6C-8.4 .8-8.2-1.8-6.2-2.2-6.4-4.4-3.8-5.4-2.4-3.8-1.8-6-.2-7 1.8-6.2 3.4-5.6 4.2-4 3.8-2.6 5.8-3 7.2-1.6 6.6 0 7.8.6 7.6 2.2 6 2.4L-5.6 2.4C-6 2.4-6.2 2-6.4 1.6Z" fill="url(#${cl})" ${_K}/><path d="M-4.6 -.4C-5.8-.2-6.2-1.6-5.2-2.2M-.4 -2.6C-1.4-2.4-1.8-3.6-.8-4.2M3.4 -.8C2.4-.6 2-1.8 3-2.4" fill="none" stroke="#2a9a6a" stroke-width=".55" stroke-linecap="round"/><path d="M-6.2 -1C-5.2-3.4-3-3.8-1.6-3" stroke="#fff" stroke-width=".5" fill="none" stroke-linecap="round" opacity=".8"/><path d="M-6.8 1.2C-9.6 1.6-10 4-8 4.4" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="1.6" stroke-linecap="round"/><path d="M-6.8 1.2C-9.6 1.6-10 4-8 4.4" fill="none" stroke="#f0b83a" stroke-width=".8" stroke-linecap="round"/></g>`;
  return _b5aura('#fff2a0', '#ffc83a', 15) + `<defs><linearGradient id="${gd}" gradientUnits="userSpaceOnUse" x1="3" y1="8" x2="29" y2="31"><stop offset="0" stop-color="#fff6c0"/><stop offset=".45" stop-color="#f0b83a"/><stop offset="1" stop-color="#8a5a0a"/></linearGradient>${_b5r3(og, '#f2fff8', '#46e0a0', '#0a7a52', .36, .3, .95)}${_lg(cl, '#ffffff', '#9ee8c4', 0, 1)}${_b5ivory(iv, 1, 1)}${_b5gold(gh)}<radialGradient id="${fa}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".45" stop-color="#d6ffe8" stop-opacity=".5"/><stop offset="1" stop-color="#7affb0" stop-opacity="0"/></radialGradient></defs>
  <g transform="translate(16 16.2) scale(.95) translate(-16 -16)">${cloud(8.6, 27.8, .72, 1)}${cloud(23.4, 27.8, .72, -1)}
  <path d="M12.2 31.6C12.8 29.6 13 27.4 12.4 25.4C11.4 24.4 10.8 23.2 11 22H21C21.2 23.2 20.6 24.4 19.6 25.4C19 27.4 19.2 29.6 19.8 31.6Z" fill="url(#${gd})" ${_K}/>
  ${_ln('M13.4 26.6Q16 28.4 18.6 26.6M13.2 29Q16 30.8 18.8 29', '#7a4e08', .5, .8)}${_ln('M13.4 24.4C13.8 27 13.6 29.6 13.2 31', '#fff', .6, .6)}
  <path d="M12.3 27.2Q16 29.2 19.7 27.2V28.6Q16 30.6 12.3 28.6Z" fill="url(#${gh})" ${_K}/>${_gem(16, 28.8, 1, '#d8ffe8', '#16a05e')}
  ${finger([11.4, 22.8], [3.2, 22.4], [1.6, 12.8], [6.4, 7.8], 4.6, 1.5, 2.6)}${finger([20.6, 22.8], [28.8, 22.4], [30.4, 12.8], [25.6, 7.8], 4.6, 1.5, 2.6)}
  <circle cx="${OX}" cy="${OY}" r="10.6" fill="#7affb0" opacity=".2"/>
  <circle cx="${OX}" cy="${OY}" r="${OR}" fill="url(#${og})" ${_K}/>
  <circle cx="${OX}" cy="${OY}" r="6.4" fill="url(#${fa})" opacity=".85"/>
  ${_ln('M9.6 14.4C10.4 11.6 13 10 15.4 10.6C17.4 11.2 18.2 13.4 17 14.8C16 15.8 14.4 15.4 14.2 14', '#fff', .6, .6)}${_ln('M22.2 11C21.4 8.6 19.2 7.2 17 7.6M20.2 17.4C18.6 18.8 16 19 14 18', '#fff', .5, .45)}
  <path d="M10.2 17C11.6 19.6 14.2 20.8 17.4 20.4" fill="none" stroke="#c8ffe0" stroke-width=".8" stroke-linecap="round" opacity=".55"/>
  <ellipse cx="12.4" cy="8.4" rx="2.6" ry="1.5" transform="rotate(-38 12.4 8.4)" fill="#fff" opacity=".9"/><circle cx="19.6" cy="16.2" r=".55" fill="#fff" opacity=".7"/>
  ${finger([12.2, 23.2], [7, 24], [5.6, 18.6], [9.8, 14.6], 4.2, 1.4, 2.4)}${finger([19.8, 23.2], [25, 24], [26.4, 18.6], [22.2, 14.6], 4.2, 1.4, 2.4)}
  <ellipse cx="16" cy="23.2" rx="5.4" ry="1.9" fill="url(#${gd})" ${_K}/>${_ln('M11.4 22.8Q16 24.6 20.6 22.8', '#fff', .5, .7)}
  ${[[11.4, 22.8], [20.6, 22.8], [16, 23.6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.35" fill="url(#${gh})" ${_K}/><circle cx="${x - .35}" cy="${y - .4}" r=".35" fill="#fff" opacity=".9"/>`).join('')}
  </g>
  ${_spark(27.6, 3.4, '#fff', .9)}${_spark(4.6, 5.4, '#e8fff4', .7)}${_spark(29.2, 17.8, '#ffe27a', .55)}${_spark(2.8, 19, '#ffe27a', .5)}
  <circle cx="26.4" cy="8.6" r=".5" fill="#ffe27a"/><circle cx="5.4" cy="10.4" r=".45" fill="#e8fff4"/>`;
},

/* Dofus Kaliptus : œuf vert sauge-émeraude, nervures d'eucalyptus et petites feuilles rondes argentées */
hx_dofus_kaliptus: _dofusArt2('#e2f6e2', '#2fa672', '#053628', '#d6f4de', '#4ee0a0', (v, c3) => {
  const arc = (sx) => [4.6, 8.2, 11.8, 15.4, 19, 22.6].map((y, i) => `M16.2 ${_b5n(y + 3.4)}C${_b5n(16.2 + sx * 3)} ${_b5n(y + 2.2)} ${_b5n(16.2 + sx * 7)} ${_b5n(y - .6)} ${_b5n(16.2 + sx * (9.4 - Math.abs(y - 14) * .28))} ${_b5n(y - 4.4 + Math.abs(y - 14) * .1)}`).join('');
  const leaf = (x, y, r, rot, sx = 16.4, sy = y) => { const g = _id(); return `<path d="M${sx} ${sy + 1.6}Q${_b5n((sx + x) / 2)} ${_b5n(y + 2)} ${x} ${y}" stroke="${'#d6f4de'}" stroke-width=".7" fill="none" opacity=".85" stroke-linecap="round"/><defs><radialGradient id="${g}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#d4e8f2"/><stop offset="1" stop-color="#7a9cc0"/></radialGradient></defs><g transform="translate(${x} ${y}) rotate(${rot})"><circle r="${r}" fill="url(#${g})" stroke="#0c3a34" stroke-opacity=".75" stroke-width=".5"/><path d="M${-r + .3} .2C${-r * .4} -.5 ${r * .4} .5 ${r - .3} -.1" stroke="#5a8e90" stroke-width=".45" fill="none"/><path d="M${-r * .5} 0L${-r * .2} ${-r * .6}M${r * .1} 0L${r * .4} ${-r * .6}M${-r * .3} 0L${-r * .1} ${r * .6}M${r * .3} 0L${r * .55} ${r * .55}" stroke="#7aa6a8" stroke-width=".3" fill="none" opacity=".8"/><path d="M${-r * .6} ${-r * .5}A${r * .8} ${r * .8} 0 0 1 ${r * .1} ${-r * .8}" stroke="#fff" stroke-width=".5" fill="none" opacity=".85" stroke-linecap="round"/></g>`; };
  return `
    <path d="M16.2 29C15.6 21 17.8 12 16.6 3.4" stroke="${v}" stroke-width="1.5" opacity=".85"/>
    <path d="${arc(1)}${arc(-1)}" stroke="${v}" stroke-width=".85" opacity=".7"/>
    <ellipse cx="16" cy="16.2" rx="8.4" ry="11.6" stroke="${v}" stroke-width=".7" stroke-dasharray="1.4 1.1" opacity=".5"/>
    <path d="M7 24C9.4 22.4 12.6 22.2 15.4 23.6C12.8 26 9.6 26 7 24Z" fill="${c3}" stroke="none" opacity=".35"/><path d="M25.4 11C22.8 9.8 20 10.2 17.6 12.2 20.4 13.8 23.4 13.4 25.4 11Z" fill="${c3}" stroke="none" opacity=".3"/>
    <path d="M17.2 24C19.6 24.2 21.4 23.4 22.6 21.6M15.6 9.4C13.2 9.6 11.6 10.6 10.6 12.4" stroke="${v}" stroke-width=".7" opacity=".85"/>
    ${leaf(22.4, 20.6, 2.9, 25)}${leaf(11.2, 13, 2.5, -30)}${leaf(20.8, 8.8, 1.9, 18)}${leaf(11.6, 21.8, 1.9, -12)}`;
}),

});
