/* =====================================================================
   ICÔNES D'ÉQUIPEMENT v4a — Forêt de Pandala + Étang des Carpes Célestes (dessins originaux, viewBox 32)
   Pandala : jade, bambou tressé, laque rouge, or, plumes de tengu · Étang : lotus rose, koï orange, eau turquoise
   Complète ITEM_ART (art.js / art2.js / art3.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _rod, _gem, _spark…).
   ===================================================================== */

/* pétale de lotus : base en (bx,by), pointe à `len` dans la direction `ang` (0 = vers le haut) */
const _a4Petal = (bx, by, ang, len, w, g1, g2, vein = '#fff') => {
  const g = _id();
  return `<defs>${_lg(g, g1, g2, 0, 1)}</defs><g transform="translate(${bx} ${by}) rotate(${ang})"><path d="M0 0C${-w} ${-len * .28} ${-w * .95} ${-len * .8} 0 ${-len}C${w * .95} ${-len * .8} ${w} ${-len * .28} 0 0Z" fill="url(#${g})" ${_K}/>`
    + `<path d="M0 ${-len * .16}V${-len * .8}" stroke="${vein}" stroke-width=".55" stroke-linecap="round" opacity=".55" fill="none"/><path d="M${-w * .55} ${-len * .34}C${-w * .6} ${-len * .55} ${-w * .35} ${-len * .75} ${-w * .12} ${-len * .88}" stroke="#fff" stroke-width=".9" stroke-linecap="round" fill="none" opacity=".5"/></g>`;
};
const _a4Tail = 'M0 0C-2.2 .4-3 1.8-2.7 3C-3.7 3.6-3.5 5.2-2.8 6C-3.6 6.8-3.2 8.4-2.2 9C-2.2 10.4-1.2 11.6 0 13C1.2 11.6 2.2 10.4 2.2 9C3.2 8.4 3.6 6.8 2.8 6C3.5 5.2 3.7 3.6 2.7 3C3 1.8 2.2 .4 0 0Z';
/* perle d'eau (bleu-blanc) */
const _a4Pearl = (x, y, r) => { const i = _id(); return `<defs>${_rg(i, '#ffffff', '#6cc8ec', .36, .3, .8)}</defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${i})" ${_k}/><circle cx="${x - r * .36}" cy="${y - r * .4}" r="${r * .3}" fill="#fff" opacity=".95"/>`; };
/* botte tabi (chaussette blanche à orteil fendu, revers indigo liseré d'or) montée sur un geta : planche, deux dents, lanière noire à liseré rouge ; dk = exemplaire du fond, plus sombre */
const _a4Boot = (dx, dy, dk) => {
  const tb = _id(), cf = _id(), pl = _id(), te = _id(), cp = _id();
  const [w1, w2, c1, c2, p1, p2, t1, t2] = dk ? ['#aab4d0', '#6c7498', '#2a2e72', '#14163e', '#9a6034', '#5e3418', '#5e3a1c', '#321c0c'] : ['#ffffff', '#c2cae6', '#4c52b4', '#20236c', '#f6c780', '#a2602c', '#b06c3a', '#4a2810'];
  const F = 'M3.8 22C2.8 20.4 4 18.6 6.4 18.2C9.6 17.8 13.2 17 14.6 13.8C15.2 12.4 15.2 10.6 15.4 8.8H25.6C25.8 11 25.4 13.4 26.2 15.6C26.9 17.8 28.4 19.8 28 22Z';
  return `<defs>${_lg(tb, w1, w2, 1, 1)}${_lg(cf, c1, c2)}${_lg(pl, p1, p2)}${_lg(te, t1, t2)}<clipPath id="${cp}"><path d="${F}"/></clipPath></defs><g transform="translate(${dx} ${dy})">
  <rect x="5.2" y="24.6" width="5" height="5" rx=".9" fill="url(#${te})" ${_K}/><rect x="20.6" y="24.6" width="5" height="5" rx=".9" fill="url(#${te})" ${_K}/>
  <rect x="2.4" y="22" width="26.4" height="3.6" rx="1.5" fill="url(#${pl})" ${_K}/>${_ln('M4.4 23.2h22.4', '#fff', .6, dk ? .2 : .5)}
  <path d="${F}" fill="url(#${tb})"/>
  <g clip-path="url(#${cp})">${dk ? '' : `<path d="M23.6 12H30V23H22.8Z" fill="#8a94c0" opacity=".3"/>`}<rect x="12" y="8.6" width="18" height="4.7" fill="url(#${cf})"/>${_ln('M12 11H30', '#e8b84a', .95)}${_ln('M12 13.4H30', '#140c06', .6, .8)}${_ln('M12 9.6H30', '#fff', .5, dk ? .15 : .45)}</g>
  <path d="${F}" fill="none" ${_K}/>${_ln('M7.4 21.8C7.4 20.8 7.8 19.8 8.6 19', dk ? '#6c7498' : '#8f9ac4', .65)}
  <path d="M7.4 21.8C8 20 9.4 18.8 10.9 17.9C12.4 19.2 12.8 20.6 12.6 21.8" fill="none" stroke="#120a08" stroke-width="3" stroke-linecap="round"/>
  <path d="M7.4 21.8C8 20 9.4 18.8 10.9 17.9C12.4 19.2 12.8 20.6 12.6 21.8" fill="none" stroke="${dk ? '#9a2a1a' : '#e8402a'}" stroke-width="1.1" stroke-linecap="round"/>
  ${dk ? '' : `<circle cx="10.9" cy="17.9" r=".7" fill="#fff" opacity=".6"/>`}</g>`;
};
const _a4Feather = (x, y, ang, len) => _a3fea(x, y, ang, len, '#5a5a98', '#0a0a16') + `<path transform="translate(${x} ${y}) rotate(${ang})" d="M-.3 -2.2Q-1.2 ${-len * .5} -.4 ${-len + 1.6}" fill="none" stroke="#8a96ff" stroke-width=".55" stroke-linecap="round" opacity=".8"/>`;

Object.assign(ITEM_ART, {
/* ======================= PANDALA : jade, bambou tressé, laque rouge, plumes de tengu ======================= */
coiffe_pandala: () => {
  const b = _id(), r = _id(), cp = _id();
  const cone = 'M1.8 20.4C5.6 16.8 11 12 14.4 6.2c.7-1.2 2.5-1.2 3.2 0 3.4 5.8 8.8 10.6 12.6 14.2-1.8 3.8-7.8 6.4-14.2 6.4S3.6 24.2 1.8 20.4Z';
  const spokes = Array.from({ length: 13 }, (_, i) => `M16 5.6L${(-2 + i * 3).toFixed(1)} 28`).join('');
  const rings = [9.4, 12.6, 15.8, 19, 22.2].map(y => `M-2 ${y}Q16 ${y + 7} 34 ${y}`).join('');
  return `<defs>${_lg(b, '#f4ee96', '#7ba02c', 1, 1)}${_lg(r, '#ff6a4a', '#a8200e')}<clipPath id="${cp}"><path d="${cone}"/></clipPath></defs>
  <path d="${cone}" fill="url(#${b})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="M16 5.6L31 20.4 16 27.6Z" fill="#2a4a0a" opacity=".2"/><path d="M16 5.6L1 20.4 6 24Z" fill="#fffbd0" opacity=".28"/>
    ${_ln(rings, '#4a6a14', .75, .7)}${_ln(spokes, '#4a6a14', .6, .62)}${_ln(rings, '#fffbd0', .4, .35)}${_ln(spokes, '#fffbd0', .35, .3)}</g>
  <path d="M5.2 17.4Q16 24.2 26.8 17.4" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="3" stroke-linecap="round"/><path d="M5.2 17.4Q16 24.2 26.8 17.4" fill="none" stroke="url(#${r})" stroke-width="1.9" stroke-linecap="round"/>
  ${_ln('M7 17.4Q16 23 25 17.4', '#ffb09a', .5, .6)}
  <path d="M4.6 22.2C3.6 26.2 8 29.8 16 29.8S28.4 26.2 27.4 22.2" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.4" stroke-linecap="round"/><path d="M4.6 22.2C3.6 26.2 8 29.8 16 29.8S28.4 26.2 27.4 22.2" fill="none" stroke="url(#${r})" stroke-width="1.3" stroke-linecap="round"/>
  <circle cx="4.7" cy="22.2" r="1.3" fill="#e8b84a" ${_k}/><circle cx="27.3" cy="22.2" r="1.3" fill="#e8b84a" ${_k}/>
  ${_gem(16, 29.2, 1.5, '#d4ffe4', '#1d9a5a')}
  <ellipse cx="16" cy="6.4" rx="2.3" ry="1.1" fill="#e8b84a" ${_k}/>${_gem(16, 4.9, 1.9, '#d4ffe4', '#1d9a5a')}${_spark(25.6, 8, '#fff', .8)}`;
},
cape_pandala: () => {
  const a = _id(), s = _id(), v = _id(), f = _id(), fl = _id(), w = _id();
  const flame = (x, h, k = 1) => `<path d="M${x - 2} 29.4C${x - 2.2} 27 ${x - .4} 26 ${x + .1} ${29.4 - h}C${x + .7} ${29.4 - h * .5} ${x + 2.3} 27 ${x + 2} 29.4Z" fill="url(#${fl})" stroke="#2a1a6a" stroke-width=".6" stroke-linejoin="round" opacity="${k}"/><path d="M${x - .5} 29.4C${x - .6} 28 ${x} 27.4 ${x + .2} 26.4C${x + .6} 27.4 ${x + .9} 28.4 ${x + .7} 29.4Z" fill="#f4f6ff" opacity=".85"/>`;
  return `<defs>${_lg(a, '#5560c8', '#1a1c5a')}${_lg(s, '#4a52b8', '#181a52', 1, 0)}${_lg(v, '#ff8a54', '#b8301a')}${_rg(f, '#ffffff', '#c4d0ea', .4, .3, .9)}${_lg(fl, '#e8f0ff', '#9a52ff', 0, 1)}${_lg(w, '#ffffff', '#cfd8f0', 0, 1)}</defs>${_sh(16, 30.4, 11, 1.2)}
  <path d="M8.2 8.2L3 11C2.2 15 2 19.2 2.4 23.6c.1 1 .9 1.6 1.9 1.4l5.5-.8.4-12.4Z" fill="url(#${s})" ${_K}/><path d="M23.8 8.2L29 11c.8 4 1 8.2.6 12.6-.1 1-.9 1.6-1.9 1.4l-5.5-.8-.4-12.4Z" fill="url(#${s})" ${_K}/>
  <path d="M2.3 20.4l7.6-.8.1 4.6-5.7.8c-1 .2-1.8-.4-1.9-1.4Z" fill="url(#${v})" ${_K}/><path d="M29.7 20.4l-7.6-.8-.1 4.6 5.7.8c1 .2 1.8-.4 1.9-1.4Z" fill="url(#${v})" ${_K}/>
  ${_ln('M4 12.6L3.6 19M6.4 12v7', '#8a94ff', .6, .5)}${_ln('M28 12.6l.4 6.4M25.6 12v7', '#8a94ff', .6, .5)}
  <path d="M10.2 6C13 7.8 19 7.8 21.8 6L24.2 9 25.6 28.8C21 30 11 30 6.4 28.8L7.8 9Z" fill="url(#${a})" ${_K}/>
  <path d="M14.4 8.4h3.2L19.2 29.6h-6.4Z" fill="#0e1030"/>
  <path d="M10.6 6.6C12.4 7.8 13.8 8.4 14.8 8.6L13.4 29.4 11.6 29.2Z" fill="url(#${v})" ${_K}/><path d="M21.4 6.6C19.6 7.8 18.2 8.4 17.2 8.6l1.4 20.8 1.8-.2Z" fill="url(#${v})" ${_K}/>
  ${_ln('M8.8 12l-.6 10M23.2 12l.6 10', '#8a94ff', .6, .45)}
  <path d="M6.9 15.8h18.2l.3 3.6H6.6Z" fill="url(#${w})" ${_K}/>${_ln('M7.8 16.7h16.4', '#fff', .5, .8)}
  <path d="M16 17.6C12.6 13.4 8.4 14.6 9.6 17.6c1 2.6 4.6 2.2 6.4 0Z" fill="url(#${w})" ${_K}/><path d="M16 17.6c3.4-4.2 7.6-3 6.4 0-1 2.6-4.6 2.2-6.4 0Z" fill="url(#${w})" ${_K}/>
  <path d="M15.4 18.4l-2.2 5.6 2.8-1.2Z" fill="url(#${w})" ${_K}/><path d="M16.6 18.4l2.2 5.6-2.8-1.2Z" fill="url(#${w})" ${_K}/>
  <rect x="14.5" y="16" width="3" height="3.2" rx="1" fill="#fff" ${_K}/>${_ln('M10.6 16.4c1.2-.6 2.4-.4 3.2.4', '#a8b4e0', .5, .8)}
  ${flame(7.6, 5.2, .95)}${flame(11.2, 6.4)}${flame(16, 5.8)}${flame(20.8, 6.6)}${flame(24.6, 5)}
  <ellipse cx="16" cy="6.6" rx="6.6" ry="2.1" fill="url(#${f})" ${_K}/><ellipse cx="16" cy="7.4" rx="3.2" ry="1.1" fill="#0e1030"/>
  <g transform="translate(12 5.6) rotate(-7)"><path d="${_a4Tail}" fill="url(#${f})" ${_K}/><path d="M-1.2 9.4C-.6 11 0 12 0 12.6.6 12 1.4 11 1.4 9.4Z" fill="#aab8de" opacity=".85"/>${_ln('M-1 1.4c-.4 2.4-.2 5 .4 7.4M1 1.8c.4 2 .4 4.4 0 6', '#c4d0ea', .55, .85)}</g>
  <g transform="translate(20 5.6) rotate(7)"><path d="${_a4Tail}" fill="url(#${f})" ${_K}/><path d="M-1.4 9.4C-1.4 11 -.6 12 0 12.6.6 12 1.2 11 1.2 9.4Z" fill="#aab8de" opacity=".85"/>${_ln('M1 1.4c.4 2.4.2 5-.4 7.4M-1 1.8c-.4 2-.4 4.4 0 6', '#c4d0ea', .55, .85)}</g>
  <g fill="#e8b84a" ${_k}><circle cx="12.6" cy="12.2" r="1.15"/><circle cx="19.4" cy="12.2" r="1.15"/></g>${_ln('M13.6 12.7Q16 14.4 18.4 12.7', '#e8b84a', .7)}
  ${_ln('M9.6 6.2c1.2-.8 2.6-1 3.8-.8M18.8 5.4c1.4 0 2.6.4 3.6 1.2', '#a8b8e0', .6, .8)}${_spark(27, 5.2, '#fff', .8)}`;
},
bottes_pandala: () => {
  return `${_sh(15.6, 30.6, 12.8, 1.4)}${_a4Boot(1.8, -2.6, true)}${_a4Feather(14.2, 10, -26, 10.4)}${_a4Feather(13.8, 10.4, -50, 9.2)}${_a4Feather(14.6, 10, -4, 8.6)}${_a4Boot(-1.4, 0, false)}${_spark(5.6, 6.4, '#fff', .8)}`;
},
amulette_pandala: () => {
  const g = _id(), c = _id(), l = _id(), r = _id();
  const gourd = 'M13.2 11.4C13 9.2 14.4 8 16 8s3 1.2 2.8 3.4c-.1 1.4-1 2.4-.6 3.2 4.2 1 6 4.4 5.4 8-.6 3.8-3.8 5.8-7.6 5.8s-7-2-7.6-5.8c-.6-3.6 1.2-7 5.4-8 .4-.8-.5-1.8-.6-3.2Z';
  return `<defs>${_rg(g, '#ffe08a', '#7a3a10', .34, .3, .95)}${_lg(c, '#d8b078', '#6a4620')}${_lg(l, '#b8f070', '#1f7a2a', 1, 1)}${_lg(r, '#f04a30', '#a01a0e')}</defs>
  <path d="M14.2 6.2C10.4 5.8 8 4 6.4 1M17.8 6.2C21.6 5.8 24 4 25.6 1" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.7" stroke-linecap="round"/>
  <path d="M14.2 6.2C10.4 5.8 8 4 6.4 1M17.8 6.2C21.6 5.8 24 4 25.6 1" fill="none" stroke="url(#${c})" stroke-width="1.7" stroke-linecap="round"/>
  ${_ln('M13 5.8l-1.4-.2M10.8 4.4l-1.2-.6M8.6 2.6l-.8-.8M19 5.8l1.4-.2M21.2 4.4l1.2-.6M23.4 2.6l.8-.8', '#4a2c14', .6, .7)}
  ${_sh(16, 29.6, 8.6, 1.4)}
  <path d="${gourd}" fill="url(#${g})" ${_K}/>
  ${_ln('M9.4 24.2c2.4 3.6 10.8 3.6 13.2 0', '#ffe6a0', .8, .55)}${_ln('M10.4 18.4c.4-1.4 1.2-2.6 2.6-3.4', '#fff', 1, .75)}${_ln('M8.8 21c-.1-.9 0-1.6.2-2.2', '#fff', .8, .5)}
  <g fill="#5a2a0a" opacity=".5"><circle cx="19.6" cy="25" r=".7"/><circle cx="13" cy="26.6" r=".6"/><circle cx="21.4" cy="22" r=".55"/></g>
  <path d="M13.6 7.2c0-1.2.8-1.8 2.4-1.8s2.4.6 2.4 1.8v1.2h-4.8Z" fill="#a8703a" ${_K}/>${_ln('M14.4 6.4h2', '#ffe0a0', .6, .8)}
  ${_ln('M16.4 14.5L19.4 10M16.5 14.6l4.8-3M16 14.4L17.4 9.4M15.6 14.5L13.4 10.6', '#f4d470', .9, .95)}
  <path d="M12.6 14c1.8 1.5 4.8 1.5 6.8 0" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.6" stroke-linecap="round"/><path d="M12.6 14c1.8 1.5 4.8 1.5 6.8 0" fill="none" stroke="url(#${r})" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M15.4 15.6c-1 1.6-2.2 2.8-3.6 3.4M16.6 15.6c1 1.8 2.4 2.6 4 2.8" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.2" stroke-linecap="round"/><path d="M15.4 15.6c-1 1.6-2.2 2.8-3.6 3.4M16.6 15.6c1 1.8 2.4 2.6 4 2.8" fill="none" stroke="url(#${r})" stroke-width="1.1" stroke-linecap="round"/>
  <circle cx="16" cy="15.3" r="1.7" fill="url(#${r})" ${_K}/><circle cx="15.5" cy="14.8" r=".5" fill="#fff" opacity=".7"/>
  <g transform="translate(16.2 21.6) rotate(-24)"><path d="M0 0C2.6-3.2 6.4-3.2 8.6-.8 6.4 2.8 2.8 3.2 0 0Z" fill="url(#${l})" ${_K}/><path d="M.4 0L7.4-.8M3 -.4l1.6-1.6M3.4 -.2l1.6 1.5" stroke="#1f6a24" stroke-width=".5" fill="none" stroke-linecap="round"/><path d="M1.6 -1.2c1.4-.8 3-.9 4.2-.4" stroke="#fff" stroke-width=".6" fill="none" opacity=".6"/></g>
  ${_spark(26, 14, '#fff', .8)}`;
},
katana_jade: () => {
  const bl = _id(), gd = _id(), cp = _id();
  const blade = 'M8.6 21C16.6 15.3 23.9 8.8 30.8 1.4C25.9 10.8 18.6 17.3 11 23.4Z';
  return `<defs>${_lg(bl, '#e4fff0', '#2fae6e', 1, 1, 0, 0)}${_lg(gd, '#fff0a8', '#b9801a', 1, 1)}<clipPath id="${cp}"><path d="${blade}"/></clipPath></defs>
  <path d="M9.4 21.6C16.8 15.9 23 10 28.4 4.6" fill="none" stroke="#3fe08a" stroke-width="4.4" stroke-linecap="round" opacity=".2"/>
  <path d="${blade}" fill="url(#${bl})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="M7 21.4C15.6 15.4 23.6 8.4 31.4 .6L31.4 3C24.4 9.8 17.4 16 10 22.6Z" fill="#1f8a56" opacity=".45"/><path d="M12 23C19 17.4 25 11.8 30.6 5.6L30.4 8C25 13.4 18.6 19 13.4 22.6Z" fill="#fff" opacity=".75"/></g>
  ${_ln('M9.4 21.8C17 16.2 24.2 9.8 30.4 2.4', '#146a42', .5, .55)}${_ln('M12.6 23C19.4 17.6 25.6 12 29.8 7', '#ffffff', .6, .95)}${_gl('M9.6 20.8C14 17.4 19.6 12.6 24 8.2c-4.6 4.4-9.6 9.2-12.6 13Z', .5)}
  <path d="M9 22.2l2.8 2.2-1.6 1-2.4-1.8Z" fill="#d8b04a" ${_k}/>
  ${_rod(3.4, 28.6, 9.6, 22.6, '#e8452e', '#7a140c', 3.2)}
  ${[0, 1, 2, 3].map(i => { const t = .16 + i * .2, cx = 3.4 + 6.2 * t, cy = 28.6 - 6 * t; return `<path d="M${(cx - 1.5).toFixed(2)} ${(cy - 1.5).toFixed(2)}l3 3M${(cx + 1.5).toFixed(2)} ${(cy - 1.5).toFixed(2)}l-3 3" stroke="#14090a" stroke-width=".85" stroke-linecap="round" opacity=".85"/>`; }).join('')}
  <g transform="rotate(45 9.8 22.4)"><ellipse cx="9.8" cy="22.4" rx="4.8" ry="3" fill="url(#${gd})" ${_K}/><ellipse cx="9.8" cy="22.4" rx="2.8" ry="1.5" fill="#6a4a10" opacity=".35"/>
    <path d="M6.6 22.4c1.1-1.7 2 1.6 3.2 0s2 1.6 3.2 0" fill="none" stroke="#6a4a10" stroke-width=".75" stroke-linecap="round"/><circle cx="13.2" cy="21.2" r=".8" fill="#7a140c"/><circle cx="13.4" cy="21" r=".25" fill="#fff"/><path d="M5.8 21l-1-1.3M6.9 20.8l-.4-1.5" stroke="#e8c050" stroke-width=".65" stroke-linecap="round"/></g>
  <ellipse cx="3.2" cy="28.8" rx="2.4" ry="2.1" fill="#d8b04a" ${_K}/>${_gem(3.1, 28.8, 1.6, '#d4ffe4', '#1d9a5a')}
  ${_spark(27.4, 8.4, '#e8fff2', 1)}${_spark(19.4, 13.6, '#fff', .7)}`;
},

/* ======================= ÉTANG : lotus rose, koï orange, eau turquoise ======================= */
coiffe_etang: () => {
  const gb = _id(), gp = _id(), gp2 = _id(), gh = _id();
  const lp = (x, y, rx = 3.3, ry = 1.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#4aa83e" ${_K}/><path d="M${x} ${y}L${x + rx * .7} ${y - ry * .6}" stroke="#a8f070" stroke-width=".4"/>`;
  return `<defs>${_lg(gb, '#a0e878', '#27782e')}${_rg(gh, '#fff6b0', '#d9961a', .4, .3, .9)}</defs>
  ${[-64, -34, -4, 26, 56].map((a, i) => _a4Petal(16, 24.6, a + 4, 16 - Math.abs(i - 2) * 1.6, 3.9, '#ffe4f0', '#ff9cc8', '#e0508a')).join('')}
  ${[-47, -16, 16, 47].map(a => _a4Petal(16, 24.6, a, 12.4, 3.5, '#ffb0d2', '#f0609c', '#a8205a')).join('')}
  <path d="M3.4 19.6Q16 27 28.6 19.6L28.6 23.4Q16 31 3.4 23.4Z" fill="url(#${gb})" ${_K}/>
  ${[7, 10.6, 14.2, 17.8, 21.4, 25].map((x, i) => `<path d="M${x} ${20.8 + Math.abs(x - 16) * .02}L${x + (x < 16 ? -.4 : .4)} ${24.2 + (1 - Math.abs(x - 16) / 14) * 2.4}" stroke="#1f6a28" stroke-width=".5" opacity=".6" fill="none"/>`).join('')}
  ${_ln('M4.4 20.6Q16 27.8 27.6 20.6', '#e8ffc0', .8, .7)}${_ln('M5 23.2Q16 29.8 27 23.2', '#1a5a22', .8, .5)}
  ${lp(5.6, 21.2, 3.2, 1.4)}${lp(26.4, 21.2, 3.2, 1.4)}
  ${[-52, -26, 26, 52].map(a => _a4Petal(16, 24.8, a, 8.8, 3.1, '#ff9ec8', '#e0508a', '#7a1a48')).join('')}
  <ellipse cx="16" cy="17.2" rx="3.1" ry="2.5" fill="url(#${gh})" ${_K}/>
  <g fill="#8a5a0a" opacity=".7"><circle cx="15" cy="16.6" r=".4"/><circle cx="16.8" cy="16.4" r=".4"/><circle cx="15.8" cy="18" r=".4"/><circle cx="14.4" cy="17.8" r=".35"/><circle cx="17.4" cy="17.7" r=".35"/></g>
  ${_ln('M13.4 15.2l-1-1.4M15 14.4l-.4-1.6M17 14.4l.4-1.6M18.6 15.2l1-1.4', '#ffd24a', .8)}
  ${_a4Pearl(16, 5.4, 1.5)}${_a4Pearl(7, 8.6, 1.2)}${_a4Pearl(25.4, 9.4, 1.2)}${_a4Pearl(16, 28.6, 1.3)}${_spark(28.6, 6.4, '#fff', .9)}${_spark(3.6, 14, '#bff6ff', .7)}`;
},
cape_etang: () => {
  const a = _id(), t = _id(), sc = _id(), cp = _id(), dn = _id();
  const body = 'M10.2 5.2C8 5.8 5.6 7.2 4.6 10L2.8 24.2Q2.9 28.8 5.8 29.4Q7 27.2 8.8 28.4Q11 30.4 12.8 28Q14.4 30 16 28.6Q17.6 30 19.2 28Q21 30.4 23.2 28.4Q25 27.2 26.2 29.4Q29.1 28.8 29.2 24.2L27.4 10C26.4 7.2 24 5.8 21.8 5.2C19.6 6.4 12.4 6.4 10.2 5.2Z';
  const veins = [[4.2, 27], [8, 28.2], [12, 28.4], [16, 29], [20, 28.4], [24, 28.2], [27.8, 27]].map(([x, y]) => `M16 9.6L${x} ${y}`).join('');
  return `<defs>${_lg(a, '#ffc468', '#ff6a1a', 0, 1)}${_lg(t, '#ffe9b0', '#ffa24a', 0, 1)}${_lg(sc, '#fff6c0', '#c8861a', 1, 1)}${_lg(dn, '#ffd488', '#ff7a2a')}<clipPath id="${cp}"><path d="${body}"/></clipPath></defs>${_sh(16, 30.8, 11.5, 1)}
  <path d="${body}" fill="url(#${a})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="M2 22Q16 17 30 22L30 32 2 32Z" fill="url(#${t})" opacity=".5"/>
    <path d="M16 9L2 26 2 32 10 32Z" fill="#fff" opacity=".12"/><path d="M16 9L30 24 30 12Z" fill="#9a2a08" opacity=".16"/>
    <ellipse cx="22.4" cy="15.4" rx="3.6" ry="2.6" transform="rotate(-24 22.4 15.4)" fill="#fff" opacity=".78"/><ellipse cx="9.6" cy="17.6" rx="3" ry="2.1" transform="rotate(22 9.6 17.6)" fill="#fff" opacity=".7"/>
    <ellipse cx="23.6" cy="16" rx="1.5" ry="1.1" fill="#e0301a" opacity=".85"/><ellipse cx="10.4" cy="18.2" rx="1.3" ry="1" fill="#e0301a" opacity=".85"/><ellipse cx="17.6" cy="23" rx="2.1" ry="1.5" fill="#e0301a" opacity=".6"/><ellipse cx="25" cy="22" rx="1.2" ry=".9" fill="#fff" opacity=".7"/>
    ${_ln(veins, '#e8a820', .55, .8)}${_ln(veins, '#fff0b0', .3, .5)}</g>
  ${_ln('M5 26.4Q6.4 28.2 8.6 28.4M9.8 27.8Q11.2 29 12.8 28.2M14.6 28.2Q16 29.4 17.4 28.2M19.2 28.2Q20.8 29 22.2 27.8M23.4 28.4Q25.6 28.2 27 26.4', '#fff6d0', .6, .8)}
  <path d="M9.4 5.8C12.4 7.4 19.6 7.4 22.6 5.8 21 7.8 18.6 8.8 16 8.8S11 7.8 9.4 5.8Z" fill="#0f5a66" ${_K}/>
  <path d="M8.6 5.6L9.6 2.4 11.8 4.4 13.4 1.6 15.2 4 16 1.2 16.8 4 18.6 1.6 20.2 4.4 22.4 2.4 23.4 5.6Q16 8.2 8.6 5.6Z" fill="url(#${dn})" ${_K}/>
  ${_ln('M11.4 5l-.2-1.8M13.8 4.8l.2-2M16 4.8V2.4M18.2 4.8l-.2-2M20.6 5l.2-1.8', '#fff0b0', .5, .85)}
  ${_ln('M8.4 10.4Q16 14 23.6 10.4', '#140c06', 2.2, .9)}${_ln('M8.4 10.4Q16 14 23.6 10.4', '#e8b84a', 1.1)}
  <path d="M16 8.8c-3 0-5 2.2-5 4.6l5 2.8 5-2.8c0-2.4-2-4.6-5-4.6Z" fill="url(#${sc})" ${_K}/>${_ln('M16 9v7M13.4 9.8l2.6 6.2M18.6 9.8L16 16M11.6 11.8L16 16M20.4 11.8L16 16', '#9a6a10', .5, .8)}
  ${_a4Pearl(16, 12.8, 1.5)}${_spark(27.6, 7.6, '#fff', .8)}${_spark(4.6, 12.6, '#ffe9b0', .7)}`;
},
ceinture_etang: () => {
  const o = _id(), o2 = _id(), pl = _id(), cp = _id(), gd = _id();
  const band = 'M1.6 11.8Q16 17.4 30.4 11.8L30.4 21.2Q16 26.8 1.6 21.2Z';
  const yAt = (x, k) => { const t = (x - 1.6) / 28.8; return 11.8 + 11.2 * t * (1 - t) + k; };
  let scales = '';
  for (let row = 0; row < 4; row++) for (let i = -1; i < 9; i++) {
    const x = 1.4 + i * 4.2 + (row % 2 ? 2.1 : 0), y = yAt(x, 2.6 + row * 2.5);
    scales += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2.9" fill="url(#${(i + row) % 2 ? o2 : o})" ${_k}/><path d="M${(x - 1.7).toFixed(2)} ${(y + .5).toFixed(2)}a1.9 1.9 0 0 0 3.4 0M${(x - 1).toFixed(2)} ${(y - .6).toFixed(2)}a1.1 1.1 0 0 0 2 0" stroke="#fff3c0" stroke-width=".4" fill="none" opacity=".75"/>`;
  }
  const pe = (a, l) => _a4Petal(16, 21.6, a, l, 1.9, '#ffd0e4', '#ff6aa4', '#a8205a');
  return `<defs>${_lg(o, '#ffb458', '#e0501a')}${_lg(o2, '#ffd47a', '#d9801a')}${_rg(pl, '#ffffff', '#8fcfe4', .4, .3, .9)}${_lg(gd, '#fff0a8', '#b9801a', 1, 1)}<clipPath id="${cp}"><path d="${band}"/></clipPath></defs>${_sh(16, 28.4, 12, 1.2)}
  <path d="${band}" fill="#8a2a0a" ${_K}/>
  <g clip-path="url(#${cp})">${scales}<path d="M0 10Q16 16.2 32 10L32 13.4Q16 19 0 13.4Z" fill="#fff" opacity=".1"/><path d="M0 22Q16 27.4 32 22L32 30 0 30Z" fill="#5a1404" opacity=".25"/></g>
  ${_ln('M2.2 12.6Q16 18.2 29.8 12.6', '#ffe9a0', .7, .85)}${_ln('M2.2 20.6Q16 26.2 29.8 20.6', '#6a2204', .6, .6)}
  <path d="M1.6 11.8Q16 17.4 30.4 11.8L30.4 21.2Q16 26.8 1.6 21.2Z" fill="none" ${_K}/>
  <ellipse cx="16" cy="17.2" rx="7" ry="6" fill="url(#${gd})" ${_K}/><ellipse cx="16" cy="17.2" rx="5.5" ry="4.6" fill="url(#${pl})" ${_k}/>
  ${pe(-50, 5.4)}${pe(50, 5.4)}${pe(-26, 6.8)}${pe(26, 6.8)}${_a4Petal(16, 21.6, 0, 7.6, 2.1, '#fff0f6', '#ff8ac0', '#a8205a')}
  <circle cx="16" cy="18.8" r="1.2" fill="#ffd24a" ${_k}/>${_gl('M11.4 14c1.4-1.2 3.2-1.8 5-1.6-2 .5-3.6 1.4-4.6 2.8Z', .75)}${_spark(27.6, 8.4, '#fff', .8)}`;
},
anneau_etang: () => {
  const gd = _id(), pe = _id();
  const wave = 'M12.6 28.4q1.2-1.3 2.4 0t2.4 0t2.4 0';
  return `<defs>${_lg(gd, '#fff0a8', '#b9801a')}${_rg(pe, '#f2fdff', '#1a78c8', .34, .28, .85)}</defs>${_sh(16, 29.4, 9.4, 1.6)}
  <ellipse cx="16" cy="19.8" rx="8.8" ry="8.6" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="16" cy="19.8" rx="8.8" ry="8.6" fill="none" stroke="url(#${gd})" stroke-width="3.6"/>
  ${_ln(wave, '#7a5010', .85, .8)}${_ln('M7.6 17.6q1.3 1 0 2t0 2M24.4 17.6q-1.3 1 0 2t0 2', '#7a5010', .75, .8)}${_ln('M9.2 15.6c1-2.2 2.8-3.6 4.8-4', '#fff', .9, .6)}
  ${[-62, -34, 34, 62].map(a => _a4Petal(16, 14, a, 8, 2.5, '#ffe4f0', '#ff8ab8', '#a8205a')).join('')}${_a4Petal(16, 14, -12, 8.6, 2.6, '#fff0f6', '#ffa6cc', '#a8205a')}${_a4Petal(16, 14, 12, 8.6, 2.6, '#fff0f6', '#ffa6cc', '#a8205a')}
  <ellipse cx="16" cy="12.6" rx="5.4" ry="1.8" fill="url(#${gd})" ${_K}/>
  <circle cx="16" cy="8.8" r="4.9" fill="url(#${pe})" ${_K}/><path d="M12.6 8c.8-2.4 2.8-3.6 5-3.4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/><circle cx="13.8" cy="6.8" r="1.1" fill="#fff"/>
  ${_ln('M13.8 12c2.4 1.4 5.4 1 7-1', '#0a4a8a', .6, .35)}
  <path d="M25.6 2.2c1.6 2.4 2.8 4 2.8 5.6a2.8 2.8 0 0 1-5.6 0c0-1.6 1.2-3.2 2.8-5.6Z" fill="#9ee4ff" ${_K}/><path d="M24.6 7.8c.1.9.6 1.5 1.3 1.7" stroke="#fff" stroke-width=".8" fill="none" stroke-linecap="round"/>${_spark(5.4, 5.6, '#fff', .9)}${_spark(29, 16, '#bff6ff', .7)}`;
},
eventail_carpe: () => {
  const pn = _id(), kg = _id(), gd = _id(), kb = _id(), cp = _id();
  const P = [8.2, 25.2], R = 22.4;
  const pt = (deg, r = R) => { const a = deg * Math.PI / 180; return [(P[0] + Math.sin(a) * r).toFixed(2), (P[1] - Math.cos(a) * r).toFixed(2)]; };
  const [lx, ly] = pt(2), [rx, ry] = pt(88);
  const sector = `M${P[0]} ${P[1]}L${lx} ${ly}A${R} ${R} 0 0 1 ${rx} ${ry}Z`;
  const ribs = Array.from({ length: 9 }, (_, i) => { const [x, y] = pt(2 + (i + 1) * 8.6); return `M${P[0]} ${P[1]}L${x} ${y}`; }).join('');
  const streaks = [[22, 5], [30, 8], [40, 5], [52, 9], [64, 6], [76, 8]].map(([d, len]) => { const [x, y] = pt(d, R - 3), [x2, y2] = pt(d, R - 3 - len - 4); return `M${x} ${y}L${x2} ${y2}`; }).join('');
  return `<defs>${_lg(pn, '#c8fff0', '#117a92', .75, .15, .1, .95)}${_lg(kg, '#ffb050', '#e8480e')}${_lg(gd, '#fff0a8', '#b9801a', 1, 1)}${_lg(kb, '#ffffff', '#ffd0a0')}<clipPath id="${cp}"><path d="${sector}"/></clipPath></defs>
  <path d="${sector}" fill="url(#${pn})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="${sector}" fill="#fff" opacity=".08"/>${_ln(streaks, '#ffffff', 1.1, .55)}${_ln(streaks, '#e8fff8', .4, .9)}
    <path d="M${P[0]} ${P[1]}L${pt(2, 12)[0]} ${pt(2, 12)[1]}A12 12 0 0 1 ${pt(88, 12)[0]} ${pt(88, 12)[1]}Z" fill="#fff" opacity=".22"/>
    <g fill="#fff" opacity=".85"><circle cx="11" cy="21" r="1"/><circle cx="14" cy="22.2" r=".7"/><circle cx="9.6" cy="18.8" r=".6"/><circle cx="15.6" cy="20.6" r=".6"/></g>
    <g transform="translate(16.4 15.2) rotate(-50) scale(1.22)"><path d="M-6.2 0C-8.4-3-10.6-3.2-11.8-4.6c.2 1.8.4 3.6.2 4.6.2 1-.2 2.8-.2 4.6 1.2-1.4 3.4-1.6 5.6-4.6Z" fill="#ff8a2a" ${_K}/><path d="M-9 0l-2 -2.4M-9 .2l-2 2.4" stroke="#ffe0a0" stroke-width=".4"/>
      <path d="M-5.8 0C-3.4-3.8 3.4-3.6 6.4-.8c1 .9.8 2-.2 2.6C3.2 3.8-3.2 3.6-5.8 0Z" fill="url(#${kg})" ${_K}/>
      <path d="M-1.4-3.2c1.6 1 3.4 1 4.8-.2" fill="none" stroke="#fff" stroke-width=".4" opacity=".5"/><ellipse cx="-.6" cy="-.9" rx="2.5" ry="1.7" fill="#fff" opacity=".92"/><ellipse cx="3" cy="-.2" rx="1.2" ry=".9" fill="#e0301a"/><ellipse cx="-1.2" cy="-1.2" rx="1" ry=".8" fill="#e0301a"/>
      <path d="M-.6 -3.2C.2-5.6 2.4-6 3.6-5 2.4-4.4 1.8-3.8 1.4-3Z" fill="#ff7a1e" ${_k}/><path d="M.8 2.6C1.8 4.6 3.4 5 4.4 4.2 3.4 3.6 2.8 3 2.4 2.4Z" fill="#ff9a3a" ${_k}/>
      <circle cx="4.6" cy="-.8" r=".8" fill="#14090a"/><circle cx="4.8" cy="-1" r=".25" fill="#fff"/><path d="M6.2 .2c.5.3.5.9 0 1.2" stroke="#7a1a08" stroke-width=".4" fill="none"/></g>
    <g fill="#fff" opacity=".9"><circle cx="12.6" cy="20.4" r=".8"/><circle cx="20.8" cy="19.6" r=".7"/><circle cx="22.4" cy="17.8" r=".5"/><circle cx="10.4" cy="18.6" r=".5"/></g>
    ${_ln(ribs, '#e8b84a', .5, .6)}</g>
  <path d="M${lx} ${ly}A${R} ${R} 0 0 1 ${rx} ${ry}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.9" stroke-linecap="round"/><path d="M${lx} ${ly}A${R} ${R} 0 0 1 ${rx} ${ry}" fill="none" stroke="url(#${gd})" stroke-width="1.7" stroke-linecap="round"/>
  <path d="M${P[0]} ${P[1]}L${lx} ${ly}" stroke="#140c06" stroke-opacity=".9" stroke-width="3.6" stroke-linecap="round"/><path d="M${P[0]} ${P[1]}L${lx} ${ly}" stroke="url(#${gd})" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M${P[0]} ${P[1]}L${rx} ${ry}" stroke="#140c06" stroke-opacity=".9" stroke-width="3.6" stroke-linecap="round"/><path d="M${P[0]} ${P[1]}L${rx} ${ry}" stroke="url(#${gd})" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M${P[0]} ${P[1]}L${P[0] - 2} ${P[1] + 2.4}" stroke="#140c06" stroke-opacity=".9" stroke-width="3.2" stroke-linecap="round"/><path d="M${P[0]} ${P[1]}L${P[0] - 2} ${P[1] + 2.4}" stroke="url(#${gd})" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="${P[0]}" cy="${P[1]}" r="2.1" fill="url(#${gd})" ${_K}/><circle cx="${P[0] - .5}" cy="${P[1] - .5}" r=".7" fill="#fff" opacity=".8"/>
  ${_ln(`M${P[0] - 2} ${P[1] + 2.4}C${P[0] - 3 } ${P[1] + 3} ${P[0] - 3.4} ${P[1] + 3.6} ${P[0] - 3.2} ${P[1] + 4.2}`, '#e8b84a', .8)}
  <path d="M${P[0] - 4.4} ${P[1] + 3.8}l1.6 -.8 1.2 1.7-.8 1c-.7.2-1.3-.1-2-.5Z" fill="#2fc1b0" ${_K}/>${_ln(`M${P[0] - 3.8} ${P[1] + 4.6}l-.5 .8M${P[0] - 3} ${P[1] + 4.8}l-.2 .8`, '#e8fff8', .45)}
  ${_spark(27.6, 6.4, '#fff', .9)}${_spark(14.8, 10.6, '#e8fff8', .7)}`;
},
});
