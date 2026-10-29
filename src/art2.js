/* =====================================================================
   ICÔNES D'ÉQUIPEMENT v2 — dégradés, reflets et une identité par panoplie
   Aventurier : cuir brun + gemme turquoise · Bouftou : laine crème + cornes
   Abraknyde : écorce + feuillage · Bwork : acier + rouge sang · Koalak : fourrure orange + cristal
   Chafer : étoffe nuit + flamme spectrale. Surcharge ITEM_ART (art.js).
   ===================================================================== */
let _gid = 0;
const _id = () => 'g' + (++_gid);
const _lg = (id, a, b, x2 = 0, y2 = 1, x1 = 0, y1 = 0) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const _rg = (id, a, b, cx = .36, cy = .3, r = .8) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
const _K = 'stroke="#140c06" stroke-opacity=".9" stroke-width=".95" stroke-linejoin="round" stroke-linecap="round"';
const _k = 'stroke="#140c06" stroke-opacity=".6" stroke-width=".6" stroke-linejoin="round" stroke-linecap="round"';
const _gl = (d, o = .4) => `<path d="${d}" fill="#fff" opacity="${o}"/>`;
const _ln = (d, c, w = .8, o = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
/* Gemme facettée */
const _gem = (x, y, r, a, b) => { const i = _id(); return `<defs>${_rg(i, a, b)}</defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${i})" ${_K}/><circle cx="${x - r * .35}" cy="${y - r * .4}" r="${r * .3}" fill="#fff" opacity=".8"/>`; };
const _sh = (cx, cy, rx, ry = rx * .35) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity=".28"/>`;
/* Manche avec dégradé : de (x1,y1) à (x2,y2) */
const _rod = (x1, y1, x2, y2, a, b, w = 2.2) => { const i = _id(); return `<defs><linearGradient id="${i}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#140c06" stroke-opacity=".9" stroke-width="${w + 1.5}" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="url(#${i})" stroke-width="${w}" stroke-linecap="round"/><path d="M${x1 - .5} ${y1 - .5}L${x2 - .5} ${y2 - .5}" stroke="#fff" stroke-opacity=".28" stroke-width=".6" stroke-linecap="round"/>`; };

Object.assign(ITEM_ART, {
/* ======================= AVENTURIER : cuir brun, coutures, gemme turquoise ======================= */
coiffe_aventurier: () => { const a = _id(), b = _id(), f = _id(); return `<defs>${_lg(a, '#b97d43', '#6a4121')}${_lg(b, '#8a5a2e', '#3e2412')}${_lg(f, '#ff7a5c', '#b42d2d', 1, 1)}</defs>${_sh(16, 25.5, 12.5)}
  <path d="M4 21.5c0-2 5-3.6 12-3.6s12 1.6 12 3.6c0 2.4-5.2 4-12 4s-12-1.6-12-4Z" fill="url(#${b})" ${_K}/>
  <path d="M7.4 20C7.4 11 11 7 16 7s8.6 4 8.6 13c-2.4 1.2-5.4 1.8-8.6 1.8S9.8 21.2 7.4 20Z" fill="url(#${a})" ${_K}/>
  <path d="M7.7 18.4c2.4 1.2 5.2 1.8 8.3 1.8s5.9-.6 8.3-1.8l.2 2.2c-2.4 1.2-5.4 1.8-8.5 1.8s-6.1-.6-8.5-1.8Z" fill="#2a8fa8" ${_K}/><path d="M9 19.4c2 .8 4.4 1.2 7 1.2s5-.4 7-1.2" stroke="#9fe9f5" stroke-width=".7" stroke-dasharray="1.4 1.2" fill="none"/>
  ${_gl('M10.6 12c.8-2.6 2.6-4 5-4.2-2.2 1.2-3.6 3-4.2 5.4Z', .5)}
  <path d="M21 14C24.5 8 27 5.5 30 4.5c-.5 5.5-3 10-8 12.4Z" fill="url(#${f})" ${_K}/><path d="M22 15C25 10 27 7.4 29.4 5.2" stroke="#ffd2c4" stroke-width=".8" fill="none"/>${_ln('M24 10.6l2 1M25.2 8.6l1.8 1', '#7a1c1c', .6)}
  ${_gem(16, 20.6, 1.4, '#c9fbff', '#1cb3d4')}`; },
cape_aventurier: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#c58a4c', '#6a4121')}${_lg(b, '#8a5a2e', '#4a2c14')}</defs>${_sh(16, 28, 11, 2)}
  <path d="M10 5.5c2 1.4 10 1.4 12 0l5.5 21.5c-2.8 1.6-6 .8-8 2-.6-.6-1.4-.6-2.2 0-1.8-1.2-5.2-.4-8-2Z" fill="url(#${a})" ${_K}/>
  <path d="M10 5.5c2 1.4 10 1.4 12 0l1 4.2c-4.4 1.8-9.6 1.8-14 0Z" fill="url(#${b})" ${_K}/>
  ${_ln('M12 12l-1.4 14M16 11v17M20 12l1.4 14', '#4a2c14', .9, .55)}${_ln('M12.6 13l-1 12M20.4 13l1 12', '#e4b57a', .5, .5)}
  ${_ln('M8.6 24.4c1 .6 2.4.8 3.6.4M19.8 24.8c1.2.4 2.6.2 3.8-.4', '#4a2c14', .8, .6)}
  <path d="M13.2 8.6h5.6" stroke="#d9a441" stroke-width="1.6" stroke-linecap="round"/>${_gem(16, 9.4, 2, '#c9fbff', '#14a6c8')}`; },
amulette_aventurier: () => { const a = _id(); return `<defs>${_lg(a, '#ffe58a', '#b9801a')}</defs>
  ${_ln('M7.5 4c0 8 3.2 11.8 8.5 13 5.3-1.2 8.5-5 8.5-13', '#140c06', 2.8, .9)}${_ln('M7.5 4c0 8 3.2 11.8 8.5 13 5.3-1.2 8.5-5 8.5-13', '#9a6a3a', 1.6)}${_ln('M7.5 4c0 8 3.2 11.8 8.5 13', '#dba76b', .5, .7)}
  <path d="M16 15.2l5.8 4.4L16 28.4l-5.8-8.8Z" fill="url(#${a})" ${_K}/>${_gem(16, 21, 3.4, '#d7fbff', '#0e9bbd')}${_gl('M12.6 19.2l2.4-3', .6)}
  ${_ln('M16 15.2v1.8M12 17.2l1.2 1.3M20 17.2l-1.2 1.3', '#fff', .7, .6)}`; },
anneau_aventurier: () => { const a = _id(); return `<defs>${_lg(a, '#f1d27a', '#a8741f')}</defs>${_sh(16, 27, 9)}
  <ellipse cx="16" cy="19" rx="9" ry="9.2" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.4"/><ellipse cx="16" cy="19" rx="9" ry="9.2" fill="none" stroke="url(#${a})" stroke-width="3.8"/>
  ${_ln('M8.5 21c1.4 4.2 4.6 6 7.5 6', '#6a4510', 1, .6)}${_ln('M9.4 14.6c1-2.4 3-4 5-4.4', '#fff', .9, .55)}
  <path d="M12 9.5 16 4.4 20 9.5 16 12.6Z" fill="url(#${a})" ${_K}/>${_gem(16, 8.6, 2.6, '#d7fbff', '#0e9bbd')}`; },
bottes_aventurier: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#bd8447', '#6a4121', 1, 0)}${_lg(b, '#53311a', '#2a180a')}</defs>${_sh(16, 28, 12, 2)}
  <path d="M10 3.5h9.6l.6 14.2c3.2.6 7.4 2.4 8 5.4.4 2-1 3.6-3 3.6H8.4c-1.2 0-2-.8-2-2.2L8 18Z" fill="url(#${a})" ${_K}/>
  <path d="M6.4 25.2h22.4c0 1.8-1.2 3-3 3H8.4c-1.2 0-2-.8-2-2.2Z" fill="url(#${b})" ${_K}/>
  <path d="M9.4 3.5h10.6v4H9.4Z" fill="#8a5a2e" ${_K}/>${_ln('M10 5.6h9.6', '#e4b57a', .6)}
  ${_ln('M10 11h9.4', '#4a2c14', .7, .6)}<rect x="12.4" y="9.4" width="4.4" height="3.6" rx=".6" fill="#e1b648" ${_K}/>${_ln('M9.6 15.6l5 .8M10.4 18l5 .8', '#e4b57a', .6, .7)}
  ${_gl('M10.6 7.5l.2 9', .35)}`; },
ceinture_aventurier: () => { const a = _id(); return `<defs>${_lg(a, '#bd8447', '#6a4121')}${_lg(a + 'b', '#ffe58a', '#b9801a', 1, 1)}</defs>${_sh(16, 23.5, 13, 1.6)}
  <path d="M1.8 11.4c4-1.2 8.4-1.6 14.2-1.6s10.2.4 14.2 1.6l-.4 9c-4 1-8.4 1.4-13.8 1.4s-9.8-.4-13.8-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M3 13.4c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#e4b57a', .6, .7)}${_ln('M3 18.6c4 .8 8.2 1.2 13 1.2s9-.4 13-1.2', '#4a2c14', .7, .6)}
  <rect x="10.6" y="8.2" width="10.8" height="13.8" rx="2.4" fill="url(#${a}b)" ${_K}/><rect x="13.2" y="10.8" width="5.6" height="8.6" rx="1.2" fill="#3e2412" ${_K}/>${_ln('M14 15h4', '#e1b648', 1.4)}${_gem(16, 15, 1.1, '#d7fbff', '#0e9bbd')}
  ${_gl('M11.6 9.6h8', .45)}<circle cx="6" cy="15.6" r="1" fill="#e1b648" ${_k}/><circle cx="26" cy="15.6" r="1" fill="#e1b648" ${_k}/>`; },
baton_debutant: () => { const a = _id(); return `<defs>${_rg(a, '#d7fbff', '#0e8fb4')}</defs>${_rod(8, 29, 20.5, 11.5, '#a9763f', '#5a3a1c', 2.4)}${_ln('M10.5 25.2l1.2 1M13 21.7l1.2 1', '#3e2412', .8)}
  <path d="M16.6 13.2c-2.6-3.2-1.4-7.4 2-9.4 1.6 1.2 2.4 2.4 2.8 3.8 1.8.2 3.4 1 4.6 2.6-1.6 3.8-6 5.4-9.4 3Z" fill="#8a5a2e" ${_K}/>
  <circle cx="21" cy="9" r="4" fill="url(#${a})" ${_K}/><circle cx="19.6" cy="7.6" r="1.2" fill="#fff" opacity=".85"/>${_spark(26.5, 4.5, '#bff6ff', .8)}`; },
epee_boisaille: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#e1b57a', '#9a6a3a', 1, 0)}${_lg(b, '#8a5a2e', '#4a2c14')}</defs>
  <path d="M25.6 3.4l2.4 2.4-13.6 14.6-3.2-3.2L24.4 3.8Z" fill="url(#${a})" ${_K}/>${_ln('M25.2 4.6 13.2 17.2', '#fff', .7, .55)}${_ln('M26.4 6.6 15 19', '#6a4121', .6, .6)}${_ln('M16 14l1.6-1.6M19 10.8l1.6-1.6', '#6a4121', .5, .5)}
  <path d="M8.6 14.6l2.6-1.2 7.4 7.4-1.2 2.6Z" fill="url(#${b})" ${_K}/>
  ${_rod(10.4, 21.6, 5.4, 26.6, '#8a5a2e', '#4a2c14', 2.6)}${_ln('M9 23.2l1.8 1.8M7.6 24.8l1.8 1.8', '#e4b57a', .6, .8)}<circle cx="5" cy="27" r="1.7" fill="#e1b648" ${_K}/>`; },
});

/* ======================= BOUFTOU : laine crème, cornes, ruban doré ======================= */
const _wool = (x, y, r, i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${i})" ${_K}/>`;
Object.assign(ITEM_ART, {
coiffe_bouftou: () => { const w = _id(), h = _id(), b = _id(); return `<defs>${_rg(w, '#ffffff', '#d9ccae', .4, .3, .85)}${_lg(h, '#f4e8c0', '#a8914f', 1, 0)}${_lg(b, '#b0793d', '#5d3b1c')}</defs>${_sh(16, 27.5, 11.5, 2)}
  <path d="M7 17C1.5 17 .8 9.5 5.4 6.6 4.6 9.6 5.8 12 9 13.2Z" fill="url(#${h})" ${_K}/><path d="M25 17c5.5 0 6.2-7.5 1.6-10.4.8 3-.4 5.4-3.6 6.6Z" fill="url(#${h})" ${_K}/>
  ${_ln('M4.4 9c.4-.8 1.2-1.4 2-1.8M27.6 9c-.4-.8-1.2-1.4-2-1.8', '#a8914f', .6)}
  ${_wool(9.6, 18, 4.6, w)}${_wool(22.4, 18, 4.6, w)}${_wool(12.6, 11.6, 4.8, w)}${_wool(19.4, 11.6, 4.8, w)}${_wool(16, 15, 6, w)}
  <path d="M6.6 20.6c2.6 1.4 6 2 9.4 2s6.8-.6 9.4-2l.2 4.2c-2.6 1.6-6.2 2.4-9.6 2.4s-7-.8-9.6-2.4Z" fill="url(#${b})" ${_K}/><path d="M7.4 22.4c2.6 1.2 5.6 1.8 8.6 1.8s6-.6 8.6-1.8" stroke="#e4b57a" stroke-width=".6" fill="none" stroke-dasharray="1.4 1.1"/>
  ${_ln('M13 9.6c1-1 2.4-1 3.2 0M17 9.6c1-1 2.4-1 3.2 0M9 16.4c1-1 2.2-1 3 0M20.4 16.4c1-1 2.2-1 3 0', '#b8a67c', .6)}${_gem(16, 23.4, 1.3, '#fff2b0', '#d9961a')}`; },
cape_bouftou: () => { const w = _id(), b = _id(); return `<defs>${_lg(w, '#ffffff', '#d9ccae')}${_lg(b, '#b0793d', '#5d3b1c')}</defs>${_sh(16, 28.2, 11, 1.8)}
  <path d="M9.6 5c2 1.6 10.8 1.6 12.8 0l5.4 20c-1 1.6-2.2 2.6-3.4 2.6-.8 1.2-2 1.6-3.2 1.2-.8 1.2-2.4 1.6-3.6.8-1.2.8-2.8.4-3.6-.8-1.2.4-2.4 0-3.2-1.2-1.2 0-2.4-1-3.4-2.6Z" fill="url(#${w})" ${_K}/>
  ${_ln('M11.4 12c-1.4 0-2 1.6-.8 2.4M16 14c-1.4 0-2 1.6-.8 2.4M20.6 12c-1.4 0-2 1.6-.8 2.4M13.6 19c-1.4 0-2 1.6-.8 2.4M18.8 20c-1.4 0-2 1.6-.8 2.4M9.8 22c-1.2 0-1.8 1.4-.7 2.2M22.6 22c-1.2 0-1.8 1.4-.7 2.2', '#b8a67c', .8)}
  <path d="M9.6 5c2 1.6 10.8 1.6 12.8 0l.8 3.2c-4.4 2-9.8 2-14.4 0Z" fill="url(#${b})" ${_K}/>${_ln('M10.4 6.6c3.6 1.2 7.6 1.2 11.2 0', '#e4b57a', .6, .8)}
  ${_ln('M14.6 8.4 13.4 12M17.4 8.4 18.6 12', '#d9a441', 1.1)}<circle cx="13.4" cy="12.4" r="1.1" fill="#e1b648" ${_k}/><circle cx="18.6" cy="12.4" r="1.1" fill="#e1b648" ${_k}/>${_gl('M12 4.6c2 1 6 1 8 0', .5)}`; },
amulette_bouftou: () => { const h = _id(), g = _id(); return `<defs>${_lg(h, '#fff6d4', '#b59f66', 1, 1)}${_rg(g, '#fff2b0', '#c8861a')}</defs>
  ${[[5.5, 4], [6.6, 8], [8.4, 11.6], [10.8, 14.6], [13.4, 16.4], [18.6, 16.4], [21.2, 14.6], [23.6, 11.6], [25.4, 8], [26.5, 4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.45" fill="url(#${g})" ${_k}/>`).join('')}
  <path d="M16 14.6c-4.4.4-6.6 3.8-5.6 8 .8 3.4 3.6 5.4 7 5.2-2.2-.8-3.4-2.4-3.4-4.6 0-2 1.4-3.6 4.4-3.8 2.6-.2 4.4 1.4 4.6 3.6.4-4.6-2.2-8.8-7-8.4Z" fill="url(#${h})" ${_K}/>
  ${_ln('M12 18.4c1.6-1.8 4-2.4 6.2-1.8', '#fff', .8, .8)}${_ln('M12 22c.4 1.6 1.4 2.8 2.8 3.4', '#a8914f', .6)}<circle cx="16" cy="14.2" r="1.5" fill="#e1b648" ${_K}/>
  <path d="M14 13.6c-2 2-4.4.8-5.4-.4 2.2.2 3.4-.4 5-1.6ZM18 13.6c2 2 4.4.8 5.4-.4-2.2.2-3.4-.4-5-1.6Z" fill="#e8667a" ${_k}/>`; },
marteau_bouftou: () => { const w = _id(), h = _id(); return `<defs>${_rg(w, '#ffffff', '#d9ccae', .4, .3, .85)}${_lg(h, '#f4e8c0', '#a8914f', 1, 0)}</defs>${_rod(6, 29, 18.5, 14.5, '#b0793d', '#5d3b1c', 2.4)}${_ln('M8.4 25.6l1.6 1.2M11 22.4l1.6 1.2', '#e4b57a', .6, .8)}<path d="M5 28.4l-1 1.6 1.8.4Z" fill="#d9a441" ${_k}/>
  <path d="M13.6 6.6c-3.8-.4-5.2-3.4-3.4-5.4 .2 2 1.4 3 3.4 3.4ZM29 10.6c.8-3-1-5-3.4-5.2 1.4 1.4 1.6 3 1 4.8Z" fill="url(#${h})" ${_K}/>
  ${_wool(17, 12.6, 4.6, w)}${_wool(22.6, 8.4, 4.8, w)}${_wool(21.6, 14.4, 4.2, w)}${_wool(15.4, 7.2, 3.8, w)}${_wool(26, 12.6, 3.6, w)}
  ${_ln('M16 12c.8-1 2-1 2.8 0M21 7.4c.8-1 2-1 2.8 0M20.4 14c.8-1 2-1 2.8 0', '#b8a67c', .6)}<path d="M15.6 17.4l3.6-3.2" stroke="#d9a441" stroke-width="1.6" stroke-linecap="round"/><circle cx="19.2" cy="14.4" r="1.2" fill="#e8667a" ${_k}/>`; },

/* ======================= ABRAKNYDE : écorce, feuillage, lueur dorée ======================= */
baton_abraknyde: () => { const o = _id(); return `<defs>${_rg(o, '#fff7b0', '#e0a21a')}</defs>
  <path d="M7 29c1-6 3-10 7-13 .6-3-.2-6-2.6-8.6 3 .8 5 2.6 5.8 5.4 1.6-3 4.4-4.8 8-5-2 2.4-3.2 4.6-3.4 7-1.6 2.8-3.6 4.4-6 5.4-3 2.8-5 6-5.8 10.2Z" fill="#8a6a40" ${_K}/>
  ${_ln('M9.4 26c1-4 3-7 6-9.6', '#d9b676', .8, .7)}${_ln('M13 14c-1.4-1.8-2-3.6-2-5.4', '#3f2b17', .7, .8)}${_ln('M16 18c2.6-1 4.4-3 5.4-5.8', '#3f2b17', .7, .8)}
  <path d="M10.4 8.4c-3.4.4-5-1.6-5-3.6 3 0 4.6 1 5 3.6Z" fill="#6fc24a" ${_K}/><path d="M25.2 6.4c2.8-1.8 4.4-.4 4.8 1.4-2.6 1-4.2.4-4.8-1.4Z" fill="#6fc24a" ${_K}/><path d="M19 4.6c0-2.4 1.6-3.4 3-3.4.2 2.2-.6 3.4-3 3.4Z" fill="#8ad65a" ${_K}/>
  <circle cx="14.8" cy="15.6" r="2.4" fill="url(#${o})" ${_K}/><path d="M13.4 15.4h2.8" stroke="#6a4a0a" stroke-width=".9"/>${_spark(24, 12, '#ffef9a', .9)}${_spark(8, 16, '#ffef9a', .6)}`; },
cape_abraknyde: () => { const a = _id(); return `<defs>${_lg(a, '#9a7746', '#4a321a')}</defs>${_sh(16, 28.2, 11, 1.8)}
  <path d="M9 5c2 1.8 12 1.8 14 0l5 18c-1.4.8-2.8 1.4-4 1.4-.8 2-2 3.2-3.4 3.4-1.2-1-3-1-4.2 0-1.2-1-3-1-4.2 0-1.4-.2-2.6-1.4-3.4-3.4-1.2 0-2.6-.6-4-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M12 9.6l-1.8 14M16 10v16M20 9.6l1.8 14M14 12l-.8 10M18 12l.8 10', '#2c1c0c', .9, .75)}${_ln('M12.8 11l-1.2 11M20.4 11l1.2 11', '#d9b676', .5, .5)}
  <path d="M9 5c2 1.8 12 1.8 14 0l.6 3c-4.6 2-10 2-15.2 0Z" fill="#5a7a2e" ${_K}/>
  <path d="M9.6 7.6c-2.6.2-4-1.4-4-3 2.4 0 3.8.8 4 3Z" fill="#6fc24a" ${_K}/><path d="M22.4 7.6c2.6.2 4-1.4 4-3-2.4 0-3.8.8-4 3Z" fill="#6fc24a" ${_K}/><path d="M16 9.4c-1.4 1.2-3.2 1.2-4 0 1.4-1.4 3-1.6 4 0Zm0 0c1.4 1.2 3.2 1.2 4 0-1.4-1.4-3-1.6-4 0Z" fill="#8ad65a" ${_k}/>${_gem(16, 9, 1.2, '#fff7b0', '#e0a21a')}
  <path d="M8.4 20c-1.4.6-2.2 2-1.6 3.6 1.2-.4 2-1.6 1.6-3.6Z" fill="#6fc24a" ${_k}/><path d="M23.6 20c1.4.6 2.2 2 1.6 3.6-1.2-.4-2-1.6-1.6-3.6Z" fill="#6fc24a" ${_k}/>`; },
anneau_ecurouille: () => { const a = _id(), n = _id(), t = _id(); return `<defs>${_lg(a, '#d9884a', '#8a4a1a')}${_rg(n, '#e2b06a', '#8a5a22')}${_lg(t, '#f0a050', '#c25a1a', 1, 1)}</defs>${_sh(15, 27.5, 9)}
  <path d="M25 27c5-1 6.4-8 2.8-12-2-2.2-4.8-2-4.6.4.2 1.8 2 1.6 1.6 4-.4 2.2-2.4 3.6-5.2 3.8Z" fill="url(#${t})" ${_K}/>${_ln('M24.4 25c3-1.4 4.2-5 2.4-8', '#ffd7a6', .6, .7)}
  <ellipse cx="15" cy="20" rx="8.6" ry="8.8" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="15" cy="20" rx="8.6" ry="8.8" fill="none" stroke="url(#${a})" stroke-width="3.6"/>${_ln('M8.2 14.6c1-2 2.8-3.4 4.8-3.8', '#ffd7a6', .8, .6)}
  <path d="M10.6 9.2c0-3 2-4.8 4.4-4.8s4.4 1.8 4.4 4.8c0 1.4-.8 2.2-2 2.2h-4.8c-1.2 0-2-.8-2-2.2Z" fill="url(#${n})" ${_K}/><path d="M10 9.6c.6-2.2 2.6-3.4 5-3.4s4.4 1.2 5 3.4Z" fill="#7a5028" ${_K}/>${_ln('M12 7.6l1.4 1.6M15 6.8v2.4M18 7.6l-1.4 1.6', '#d9b676', .5)}<path d="M15 4.4V2.4" stroke="#5a3a1c" stroke-width="1.2" stroke-linecap="round"/>${_gl('M12.2 10.6c.4 1 1 1.4 1.6 1.4', .5)}`; },
bottes_sanglier: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#8a6a4a', '#3a2614', 1, 0)}${_lg(b, '#4a321a', '#1e1208')}${_lg(a + 't', '#fffdf0', '#d6cfa8')}</defs>${_sh(16, 28.2, 12.5, 2)}
  <path d="M10 5h9.8l.6 12c3.4.6 7.2 2.2 8 4.8.6 2.2-.8 4-3.2 4H8.6c-1.4 0-2.4-1-2.4-2.4L8 17Z" fill="url(#${a})" ${_K}/>
  <path d="M6.2 24.6h22.2c0 2-1.2 3.2-3.2 3.2H8.6c-1.4 0-2.4-1-2.4-2.4Z" fill="url(#${b})" ${_K}/>
  <path d="M8.6 5.6c1.4-2 2.4 0 3.4-1.6 1 1.6 2 0 3.2 1.4 1.2-1.6 2.4-.4 3.2 1.2 1.2-1 2.2 0 2.6 1.2v2.6H8.6Z" fill="#a98862" ${_K}/>${_ln('M10 6.4l.8 2M13 5.8l.8 2.2M16 6l.6 2.2M19 6.4l.4 2', '#5a3a1c', .6)}
  ${_ln('M9.8 12l4 1.6M10.6 15l4 1.4M9.4 19l3.4 1.2', '#2a1a0a', .7, .6)}${_gl('M10.6 10c.2 2 .2 4 0 6', .22)}
  <path d="M21.4 20.4c3.6-.4 6.4.4 7.4 2.6-3 .8-5.8.2-7.4-2.6Z" fill="url(#${a}t)" ${_K}/>`; },
coiffe_prespic: () => { const a = _id(), s = _id(); return `<defs>${_rg(a, '#8fd65a', '#2f7a2a', .4, .3, .9)}${_lg(s, '#b9e87a', '#4a8a2a')}${_lg(a + 'b', '#b0793d', '#5d3b1c')}</defs>${_sh(16, 27, 12.5, 2)}
  ${[[4.6, 13, -50], [8, 8.2, -28], [12.6, 5, -10], [18.6, 5, 10], [23.4, 8.2, 28], [27, 13, 50]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M-1.9 3 0-4.6 1.9 3Z" fill="url(#${s})" ${_K}/>`).join('')}
  <path d="M5.6 22.4C5 14 9.6 8.8 16 8.8S27 14 26.4 22.4Z" fill="url(#${a})" ${_K}/>
  ${[[10, 13], [14, 11.4], [18.4, 11.4], [22, 13.6], [8.6, 17.4], [12.8, 15.6], [17, 15.2], [21.4, 17.2]].map(([x, y]) => `<path d="M${x - 1.4} ${y + 2}l1.4-4.6 1.4 4.6Z" fill="#b9e87a" ${_k}/>`).join('')}
  <path d="M4 22.4h24v3.4c0 .8-.6 1.4-1.4 1.4H5.4c-.8 0-1.4-.6-1.4-1.4Z" fill="url(#${a}b)" ${_K}/>${_ln('M5.4 24.4h21.2', '#e4b57a', .6, .7)}${_gem(16, 24.6, 1.3, '#fff7b0', '#e0a21a')}
  <circle cx="11.6" cy="19.6" r=".9" fill="#1a1a1a"/><circle cx="20.4" cy="19.6" r=".9" fill="#1a1a1a"/>`; },
bottes_scara: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#7ccf4d', '#2a6a2a', 1, 0)}${_lg(b, '#3e5a22', '#1a2a0c')}</defs>${_sh(16, 28.2, 12.5, 2)}
  <path d="M10.4 7h9.2l.6 10.2c3.2.6 7 2.2 7.8 4.8.6 2.2-.8 4-3 4H8.8c-1.4 0-2.4-1-2.4-2.4L8.4 17Z" fill="url(#${a})" ${_K}/>
  <path d="M6.4 24.6h22c0 2-1.2 3.2-3 3.2H8.8c-1.4 0-2.4-1-2.4-2.4Z" fill="url(#${b})" ${_K}/>
  <path d="M9.4 7h11.2v3.6c-3.6 1.4-7.6 1.4-11.2 0Z" fill="#4a8a2a" ${_K}/>${_ln('M10 11c3.4 1.2 7.2 1.2 10.6 0', '#b9e87a', .6, .7)}
  ${_ln('M10.4 14c2 1.4 4 .6 5.4 2.4 1.4 1.8 3.4 1.2 4 2.8', '#2a6a2a', 1.1)}${_ln('M10.4 14c2 1.4 4 .6 5.4 2.4', '#c9f08a', .5, .6)}
  <path d="M20 7c.4-3 2.4-4.4 4.6-4.4-.2 2.6-1.6 4.2-4.6 4.4Z" fill="#8ad65a" ${_K}/><path d="M16.4 6.8c-1.4-2.4-3.8-2.6-5.4-1.4 1 2.2 3 3 5.4 1.4Z" fill="#6fc24a" ${_K}/>
  ${_gl('M11 11.6l.2 4', .3)}<circle cx="13.4" cy="21.4" r="1" fill="#e8f08a" ${_k}/>`; },
});

/* ======================= BWORK : acier brut, rouge sang, os ======================= */
Object.assign(ITEM_ART, {
hache_bwork: () => { const m = _id(); return `<defs>${_lg(m, '#e4e9ee', '#59606a', 1, 1)}</defs>${_rod(7, 29.5, 20.4, 9.4, '#6a4a2a', '#2e1c0e', 2.5)}${_ln('M9.6 25.6l1.6 1.2M12.4 21.6l1.6 1.2', '#d8402f', 1.1)}
  <path d="M14.4 7.6c-4 .6-7.2-1-9-4.2 5-.8 9.2.4 12.4 3.8Z" fill="url(#${m})" ${_K}/>
  <path d="M17.8 7.2c3.4-3.4 7.6-4.6 12.2-3.6-1.2 4.4-4.8 7.2-9.4 7.6Z" fill="url(#${m})" ${_K}/>
  <path d="M16.2 6.6l5.2 5.6-3 2.6-5.4-5.6Z" fill="#4d545c" ${_K}/>${_ln('M6.6 4.4c3 1.8 6.4 2.6 9.8 2.6M20.6 5.4c2.4-.8 5-.8 7.4-.2', '#fff', .7, .7)}${_ln('M18 12.2l-1.8-1.8', '#d8402f', 1.4)}
  <circle cx="17.2" cy="9.6" r="1" fill="#efe8d0" ${_k}/>`; },
casque_bwork: () => { const m = _id(), h = _id(); return `<defs>${_lg(m, '#e4e9ee', '#4d545c')}${_lg(h, '#fffdf0', '#bfb48a', 1, 0)}</defs>${_sh(16, 27.5, 11, 1.8)}
  <path d="M6.6 14C1.4 13 .6 6.6 3.6 2.6c.8 3.6 2.8 6 5.6 7.4Z" fill="url(#${h})" ${_K}/><path d="M25.4 14c5.2-1 6-7.4 3-11.4-.8 3.6-2.8 6-5.6 7.4Z" fill="url(#${h})" ${_K}/>
  <path d="M6 24V16C6 9.4 10.2 6 16 6s10 3.4 10 10v8l-3.2 2.4h-5.2v-5.2h-3.2v5.2H9.2Z" fill="url(#${m})" ${_K}/>
  <path d="M14.4 5.4c.6-1.8 2.6-1.8 3.2 0 .4 2.4.4 5.8 0 9H14.4c-.4-3.2-.4-6.6 0-9Z" fill="#d8402f" ${_K}/>${_ln('M15.6 6.6v7', '#ff8a70', .6)}
  <path d="M6 15.4c3.4 1 6.6 1.4 10 1.4s6.6-.4 10-1.4v2.6c-3.4 1-6.6 1.4-10 1.4S9.4 19 6 18Z" fill="#4d545c" ${_K}/>
  <path d="M10.4 19.4h4l-.8 3h-2.4ZM17.6 19.4h4l-.8 3h-2.4Z" fill="#14161a" ${_k}/>${_ln('M8.4 8.6c1.4-1.4 3-2.2 4.6-2.4', '#fff', .9, .7)}
  <circle cx="8.6" cy="21" r=".9" fill="#c3cad2" ${_k}/><circle cx="23.4" cy="21" r=".9" fill="#c3cad2" ${_k}/>`; },
ceinture_bwork: () => { const m = _id(), l = _id(); return `<defs>${_lg(m, '#e4e9ee', '#4d545c')}${_lg(l, '#4a4650', '#1e1c22')}${_rg(l + 'b', '#fffdf0', '#bfb48a')}</defs>${_sh(16, 24.4, 13, 1.6)}
  <path d="M1.6 11.2c4-1.2 8.6-1.8 14.4-1.8s10.4.6 14.4 1.8l-.4 9.4c-4 1-8.6 1.6-14 1.6s-10-.6-14-1.6Z" fill="url(#${l})" ${_K}/>
  ${[3.6, 7.4, 24.6, 28.4].map(x => `<rect x="${x - 1.4}" y="12" width="2.8" height="7.2" rx=".8" fill="url(#${m})" ${_k}/>`).join('')}
  <path d="M9.6 8.4h12.8l1 4.6c0 4.4-2 7.8-7.4 9.4-5.4-1.6-7.4-5-7.4-9.4Z" fill="url(#${m})" ${_K}/>
  <path d="M16 10.4c-3.4 0-5.4 2.2-5.4 5 0 1.8.8 3 2 3.8v1.8h6.8v-1.8c1.2-.8 2-2 2-3.8 0-2.8-2-5-5.4-5Z" fill="url(#${l}b)" ${_K}/>
  <circle cx="13.6" cy="15.2" r="1.5" fill="#d8402f" ${_k}/><circle cx="18.4" cy="15.2" r="1.5" fill="#d8402f" ${_k}/><circle cx="13.2" cy="14.8" r=".5" fill="#ffb09a"/><circle cx="18" cy="14.8" r=".5" fill="#ffb09a"/>${_ln('M16 17l-.8 1.6h1.6ZM14 20.4v-1.4M16 20.6v-1.6M18 20.4v-1.4', '#2a2d33', .8)}`; },
amulette_craqueleur: () => { const s = _id(); return `<defs>${_lg(s, '#6a626c', '#2a262e', 1, 1)}${_rg(s + 'g', '#fff0a0', '#e0501a')}</defs>
  ${_ln('M8 3c0 6 2.4 9 6.4 10.6M24 3c0 6-2.4 9-6.4 10.6', '#140c06', 2.6, .9)}${_ln('M8 3c0 6 2.4 9 6.4 10.6M24 3c0 6-2.4 9-6.4 10.6', '#8a6a4a', 1.5)}
  <path d="M16 12.2 24 16l2 8.4-5.6 4.2h-8.8L6 24.4 8 16Z" fill="url(#${s})" ${_K}/>
  <path d="M16 12.2 24 16l-8 4.4L8 16Z" fill="#8a828c" opacity=".5"/>
  ${_ln('M16 14.4 14.6 19l3 2-1.6 5.2M14.6 19l-4.4 2M17.6 21l4.6.4M16 26.2l3.4 1', '#e0501a', 1.5)}${_ln('M16 14.4 14.6 19l3 2-1.6 5.2M14.6 19l-4.4 2M17.6 21l4.6.4', '#ffd070', .6)}
  <circle cx="16" cy="19.8" r="1.6" fill="url(#${s}g)"/>${_gl('M9.4 17l5-2.8', .35)}${_spark(24.6, 9, '#ffb060', .7)}`; },

/* ======================= KOALAK : fourrure orange, cristal turquoise ======================= */
coiffe_koalak: () => { const f = _id(), e = _id(); return `<defs>${_rg(f, '#ffc47a', '#b45f1a', .4, .3, .9)}${_rg(e, '#fff0d0', '#e8b480')}</defs>${_sh(16, 27.8, 11, 1.8)}
  <circle cx="6.6" cy="10.4" r="5.6" fill="url(#${f})" ${_K}/><circle cx="25.4" cy="10.4" r="5.6" fill="url(#${f})" ${_K}/><circle cx="6.6" cy="10.6" r="3.2" fill="url(#${e})" ${_k}/><circle cx="25.4" cy="10.6" r="3.2" fill="url(#${e})" ${_k}/>
  <path d="M5.6 24C4.8 14.6 9.6 9 16 9s11.2 5.6 10.4 15Z" fill="url(#${f})" ${_K}/>
  ${_ln('M9 14.6c.6 1.2 1.6 1.6 2.6 1.4M23 14.6c-.6 1.2-1.6 1.6-2.6 1.4M12.8 11c.8.8 1.8 1 2.6.6M19.2 11c-.8.8-1.8 1-2.6.6', '#8a4a1a', .7, .8)}
  <path d="M5.2 21.6c3.4 1.2 6.8 1.8 10.8 1.8s7.4-.6 10.8-1.8l.2 3c-3.4 1.4-6.8 2-11 2s-7.6-.6-11-2Z" fill="#6a4a8a" ${_K}/><path d="M6.6 23.6c3 .8 6 1.2 9.4 1.2s6.4-.4 9.4-1.2" stroke="#d8c0ff" stroke-width=".6" fill="none" stroke-dasharray="1.4 1.1"/>
  <path d="M16 12.4l2.4 3.4-2.4 4.2-2.4-4.2Z" fill="#7ff0e0" ${_K}/><path d="M16 12.4l1 3.4-1 4.2" fill="none" stroke="#fff" stroke-width=".6" opacity=".8"/>${_gl('M9.2 12c1-1.4 2.4-2.2 4-2.4', .45)}`; },
bottes_kanigrou: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#ffb468', '#b45f1a', 1, 0)}${_lg(b, '#6a4a8a', '#2e2040')}</defs>${_sh(16, 28.2, 12.5, 2)}
  <path d="M10 5.6h9.8l.6 11.8c3.4.6 7.4 2.2 8.2 4.8.6 2.2-.8 4-3.2 4H8.6c-1.4 0-2.4-1-2.4-2.4L8 17Z" fill="url(#${a})" ${_K}/>
  <path d="M6.2 24.4h22.2c0 2-1.2 3.4-3.2 3.4H8.6c-1.4 0-2.4-1-2.4-2.4Z" fill="url(#${b})" ${_K}/>
  <path d="M8.4 6.4c1.2-2.4 2.4 0 3.4-1.8 1 1.8 2 0 3.2 1.6 1.2-1.8 2.4-.2 3.2 1.4 1.2-1 2.4.2 2.6 1.4v2.6H8.4Z" fill="#fff0d0" ${_K}/>
  ${_ln('M10 13l4 1.4M10.4 17l3.8 1.2', '#8a4a1a', .7, .7)}<path d="M24.4 21.6l3.4.6M24 23.4l3.8.8" stroke="#fff0d0" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M13.6 11l1.8 2.6-1.8 3-1.8-3Z" fill="#7ff0e0" ${_K}/>${_gl('M10.4 9.6l.2 5', .3)}`; },
anneau_mufafah: () => { const a = _id(), g = _id(); return `<defs>${_lg(a, '#ffb468', '#9a4a14')}${_lg(g, '#ffe9a0', '#e07a1a', 1, 1)}</defs>${_sh(16, 27.6, 9)}
  <ellipse cx="16" cy="19.6" rx="8.8" ry="8.6" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="16" cy="19.6" rx="8.8" ry="8.6" fill="none" stroke="url(#${a})" stroke-width="3.6"/>${_ln('M9 15.4c1-2 2.8-3.2 4.8-3.6', '#ffe0b0', .8, .6)}${_ln('M8 22l1.6.6M10.4 26l1.2-.8', '#6a3a10', .7, .7)}
  ${[[9.4, 9, -34], [12.6, 6.4, -14], [16, 5.4, 0], [19.4, 6.4, 14], [22.6, 9, 34]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M-1.5 2.2 0-3.4 1.5 2.2Z" fill="url(#${g})" ${_K}/>`).join('')}
  <path d="M16 6.2l4.2 4.4-4.2 4.8-4.2-4.8Z" fill="#7ff0e0" ${_K}/><path d="M16 6.2l1.6 4.4-1.6 4.8" fill="none" stroke="#fff" stroke-width=".7" opacity=".85"/>${_ln('M11.8 10.6h8.4', '#1a8a80', .5)}`; },

/* ======================= CHAFER : étoffe de nuit, flamme spectrale ======================= */
cape_chafer: () => { const c = _id(); return `<defs>${_lg(c, '#44579a', '#0e1530')}${_rg(c + 'f', '#e8ffff', '#2fb7d4')}</defs>${_sh(16, 28.4, 10, 1.6)}
  <path d="M9.4 4.6c2 2 11.2 2 13.2 0l5.8 22.6-3-1.2-1 3-2.6-2.6-2.4 3.4-2.4-3.4-2.4 3.4-2.6-3.4-1.4 2.6-.8-2.8-3.2 1.8Z" fill="url(#${c})" ${_K}/>
  ${_ln('M12 10l-2 15M16 11v15M20 10l2 15', '#0a1026', .9, .6)}${_ln('M12.8 11l-1.4 10M19.2 11l1.4 10', '#7fa0ff', .5, .5)}
  <path d="M9.4 4.6c2 2 11.2 2 13.2 0l.8 3.4c-4.6 2.2-10.2 2.2-14.8 0Z" fill="#1a2550" ${_K}/>
  <path d="M7.6 3.6l3.4 1.6-.8 2.4Z M24.4 3.6 21 5.2l.8 2.4Z" fill="#efe8d0" ${_K}/>
  <path d="M16 9.2c-2.6 0-4 1.6-4 3.4 0 1.2.6 2 1.4 2.6v1.4h5.2v-1.4c.8-.6 1.4-1.4 1.4-2.6 0-1.8-1.4-3.4-4-3.4Z" fill="#efe8d0" ${_K}/><circle cx="14.4" cy="12.4" r=".9" fill="#0a1026"/><circle cx="17.6" cy="12.4" r=".9" fill="#0a1026"/>
  <path d="M5.4 27c.8-2 2-2.6 3.2-1.8-.2 1.4-1.4 2.2-3.2 1.8Z" fill="url(#${c}f)" opacity=".9"/><path d="M26.6 27c-.8-2-2-2.6-3.2-1.8.2 1.4 1.4 2.2 3.2 1.8Z" fill="url(#${c}f)" opacity=".9"/>${_spark(5, 12, '#aef7ff', .7)}${_spark(27, 16, '#aef7ff', .6)}`; },
ceinture_ecto: () => { const c = _id(), s = _id(); return `<defs>${_lg(c, '#44579a', '#0e1530')}${_rg(s, '#f4ffff', '#17a8c8')}</defs>${_sh(16, 24, 13, 1.6)}
  <path d="M1.8 11c4-1.2 8.4-1.8 14.2-1.8s10.2.6 14.2 1.8l-.4 9c-4 1-8.4 1.6-13.8 1.6s-9.8-.6-13.8-1.6Z" fill="url(#${c})" ${_K}/>
  ${_ln('M3 13.4c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#7fa0ff', .6, .6)}
  <path d="M7 21.6c0 3 .2 4.4-1 6M12 21.8c0 2.4 0 3.6 .8 5M20 21.8c0 2.4 0 3.6-.8 5M25 21.6c0 3-.2 4.4 1 6" stroke="#6ff0ff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".85"/>
  <circle cx="16" cy="15.2" r="7.4" fill="#0a1026" ${_K}/><circle cx="16" cy="15.2" r="5.8" fill="url(#${s})" opacity=".95"/>${_ln('M16 15.4c0-1.6 2.4-1.6 2.4 0 0 2.4-4 2.4-4-.4 0-3.2 5.6-3.4 5.6.8M13.2 15c-.2-2.8 1.6-4.2 3.8-3.8', '#0a5a7a', 1.1)}${_gl('M12 11.6c1-1 2.4-1.6 3.8-1.6', .6)}
  ${_spark(5, 8, '#aef7ff', .7)}${_spark(27, 9, '#aef7ff', .6)}`; },
epee_chafer: () => { const b = _id(), g = _id(); return `<defs>${_lg(b, '#f4fbff', '#9fb4c8', 1, 0)}${_rg(g, '#f4ffff', '#17a8c8')}</defs>
  <path d="M26.4 2.6c1.6 0 2.6 1 2.6 2.6l-13.6 15-3.4-3.4Z" fill="url(#${b})" ${_K}/>${_ln('M27 4.4 13.4 18', '#fff', .8, .7)}${_ln('M26 7 15 18.6', '#17a8c8', .7, .8)}
  <circle cx="21.4" cy="9.4" r="1.1" fill="url(#${g})"/><circle cx="18" cy="13" r=".9" fill="url(#${g})"/><circle cx="24.2" cy="6.2" r=".8" fill="url(#${g})"/>
  <path d="M7.4 14.6l3-1.6 8.4 8.4-1.6 3Z" fill="#2a3a6a" ${_K}/><path d="M7.4 14.6c-1.6.6-2.6 2-2.4 3.8 1.4-.4 2.6-1.4 3.2-2.8ZM18.8 25.4c.6 1.6 2 2.6 3.8 2.4-.4-1.4-1.4-2.6-2.8-3.2Z" fill="#efe8d0" ${_K}/>
  ${_rod(11.6, 20.4, 6, 26, '#2a3a6a', '#0e1530', 2.4)}<path d="M2.6 25.8c0-1.8 1.2-3 2.8-3s2.8 1.2 2.8 3c0 1.2-.6 1.8-1.2 2.2v1.2H3.8v-1.2c-.6-.4-1.2-1-1.2-2.2Z" fill="#efe8d0" ${_K}/><circle cx="4.4" cy="25.8" r=".7" fill="#17a8c8"/><circle cx="6.6" cy="25.8" r=".7" fill="#17a8c8"/>${_spark(27, 12, '#aef7ff', .8)}`; },
});

/* ======================= OBJETS ISOLÉS : Moskito, Arakne, Champ, Kwak ======================= */
Object.assign(ITEM_ART, {
bottes_moskito: () => { const a = _id(), b = _id(), w = _id(); return `<defs>${_lg(a, '#7ccf6a', '#2a6a3a', 1, 0)}${_lg(b, '#3a4a2a', '#161e0e')}${_lg(w, '#e8ffff', '#8fd6e0', 1, 1)}</defs>${_sh(16, 28.2, 12.5, 2)}
  <path d="M7.4 3.4c-3.2.2-5 2-5.4 5.2 3.4.2 5.6-1.6 5.4-5.2Z" fill="url(#${w})" opacity=".85" ${_k}/><path d="M9 7.6C5.6 8 3.8 10 3.8 13c3.2-.2 5.2-2 5.2-5.4Z" fill="url(#${w})" opacity=".8" ${_k}/>${_ln('M6.6 4.6 3.6 8M7.6 9.2 5.4 12', '#2a8a9a', .5)}
  <path d="M10.4 5h9.2l.6 12.4c3.2.6 7 2.2 7.8 4.6.6 2.2-.8 4-3 4H8.8c-1.4 0-2.4-1-2.4-2.4L8.4 17Z" fill="url(#${a})" ${_K}/>
  <path d="M6.4 24.6h22c0 2-1.2 3.2-3 3.2H8.8c-1.4 0-2.4-1-2.4-2.4Z" fill="url(#${b})" ${_K}/>
  <path d="M9.4 5h11.2v3.4c-3.6 1.4-7.6 1.4-11.2 0Z" fill="#3a4a2a" ${_K}/>${_ln('M10 6.4h10', '#b9e87a', .5)}${_ln('M10.4 13l9 .8M10.6 17l8.6.8', '#1a3a1a', .8, .5)}
  <path d="M25.4 21.2l4.6.6-4 1.6Z" fill="#e8d870" ${_K}/>${_gl('M11 9.6l.2 5', .3)}`; },
anneau_arakne: () => { const a = _id(), e = _id(); return `<defs>${_lg(a, '#4a3a68', '#16102a')}${_rg(e, '#ffd0ff', '#a83acf')}</defs>${_sh(16, 27.6, 9.4)}
  <ellipse cx="16" cy="20.4" rx="8.8" ry="8.2" fill="none" stroke="#0a0614" stroke-width="5.2"/><ellipse cx="16" cy="20.4" rx="8.8" ry="8.2" fill="none" stroke="url(#${a})" stroke-width="3.6"/>${_ln('M9 16.4c1-1.8 2.8-3 4.6-3.4', '#c4a8ff', .8, .6)}
  ${_ln('M10.4 10.6C6.6 8 5 6 3.6 3M12.4 9C9.6 5.6 8.6 3.4 8.4 1.4M21.6 10.6C25.4 8 27 6 28.4 3M19.6 9C22.4 5.6 23.4 3.4 23.6 1.4', '#0a0614', 1.8)}${_ln('M10.4 10.6C6.6 8 5 6 3.6 3M12.4 9C9.6 5.6 8.6 3.4 8.4 1.4M21.6 10.6C25.4 8 27 6 28.4 3M19.6 9C22.4 5.6 23.4 3.4 23.6 1.4', '#6a4a9a', .8)}
  <ellipse cx="16" cy="9.4" rx="4.2" ry="4.8" fill="#16102a" ${_K}/><circle cx="14.2" cy="8.4" r="1.15" fill="url(#${e})"/><circle cx="17.8" cy="8.4" r="1.15" fill="url(#${e})"/><circle cx="16" cy="10.8" r=".7" fill="#a83acf"/>
  <path d="M16 13.6 13.6 17.4h4.8Z" fill="#a83acf" ${_k}/>`; },
ceinture_champ: () => { const l = _id(), c = _id(); return `<defs>${_lg(l, '#b0793d', '#5d3b1c')}${_rg(c, '#ff7a6a', '#b4281e', .4, .3, .9)}</defs>${_sh(16, 24.4, 13, 1.6)}
  <path d="M1.8 11.6c4-1.2 8.4-1.8 14.2-1.8s10.2.6 14.2 1.8l-.4 8.8c-4 1-8.4 1.6-13.8 1.6s-9.8-.6-13.8-1.6Z" fill="url(#${l})" ${_K}/>${_ln('M3 13.8c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#e4b57a', .6, .7)}
  <path d="M12.6 22.4v-6.4h6.8v6.4c0 1.2-1.4 1.8-3.4 1.8s-3.4-.6-3.4-1.8Z" fill="#fff4d8" ${_K}/>${_ln('M13.8 18.4v3.4', '#d9c9a0', .6)}
  <path d="M7.6 16.6C7.6 9.6 11.4 5.6 16 5.6s8.4 4 8.4 11Z" fill="url(#${c})" ${_K}/>
  <circle cx="12.4" cy="11.6" r="1.7" fill="#fff4d8"/><circle cx="18.2" cy="9.6" r="1.4" fill="#fff4d8"/><circle cx="21" cy="13.6" r="1.2" fill="#fff4d8"/><circle cx="15.4" cy="14" r="1" fill="#fff4d8"/>${_gl('M9.6 12c.6-2.4 2-4 4-4.6', .4)}
  <path d="M7.6 16.6h16.8" stroke="#7a1a12" stroke-width="1" opacity=".6"/>`; },
arc_moskito: () => { const w = _id(); return `<defs>${_lg(w, '#7ccf6a', '#2a6a3a')}${_lg(w + 'w', '#e8ffff', '#8fd6e0', 1, 1)}</defs>
  <path d="M9 3.4C20.6 5.4 27.6 13 28 28.6M9 3.4C5 12 5 20 6.6 28.6" fill="none" stroke="#140c06" stroke-width="4" stroke-linecap="round"/>
  <path d="M9 3.4C20.6 5.4 27.6 13 28 28.6" fill="none" stroke="url(#${w})" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M5.8 28C3.6 20 4.4 11.6 9 3.6" fill="none" stroke="#140c06" stroke-width="1.6" opacity=".4"/>
  <path d="M7.6 4.4c-3 2-3.4 4.6-3 8-2.6-1-3.2-4.8 0-8.4Z" fill="url(#${w}w)" opacity=".9" ${_k}/><path d="M6.4 14c-3.4 1.4-3.6 4.4-2.4 7.4 2.6-1.4 3.4-4.2 2.4-7.4Z" fill="url(#${w}w)" opacity=".85" ${_k}/>
  ${_ln('M8.4 4C20 6.2 26.4 13.6 26.8 28', '#c9f08a', .6, .55)}
  <path d="M7 28.6 28.4 28.2" stroke="#e8f8e0" stroke-width=".7" opacity=".7"/>
  <path d="M5.2 28.6l22-.6" stroke="#140c06" stroke-width=".4" opacity=".3"/>
  ${_rod(6.4, 15, 27, 15, '#d9d09a', '#8a7a4a', 1.4)}<path d="M26 12.4l5 2.6-5 2.6Z" fill="#e8d870" ${_K}/>`; },
pelle_champ: () => { const c = _id(), m = _id(); return `<defs>${_rg(c, '#ff7a6a', '#b4281e', .4, .3, .9)}${_lg(m, '#e4e9ee', '#7a828c', 1, 1)}</defs>${_rod(6, 28.4, 19.4, 13.4, '#b0793d', '#5d3b1c', 2.4)}${_ln('M8.4 25.4l1.6 1.2M11 22.6l1.6 1.2', '#e4b57a', .6, .8)}
  <path d="M15.4 17.4c-.4-3 1.4-5.6 4-6.6l5.6 5.2c-1.2 3.4-3.8 4.6-6.6 4.2Z" fill="url(#${m})" ${_K}/>${_ln('M17 14.6 22.6 16.2', '#fff', .7, .7)}
  <path d="M17.6 11.4C17.4 6.2 21 2.8 25 2.8s7.4 3.4 7 8.6Z" fill="url(#${c})" ${_K}/><path d="M17.6 11.4c3.8 1.6 10 1.6 14 0" fill="none" stroke="#7a1a12" stroke-width="1" opacity=".6"/>
  <circle cx="22" cy="6.6" r="1.3" fill="#fff4d8"/><circle cx="27" cy="5.4" r="1.1" fill="#fff4d8"/><circle cx="29" cy="8.8" r=".9" fill="#fff4d8"/>${_gl('M19.6 8c.8-1.8 2.2-3 4-3.4', .4)}
  <path d="M23.4 11.4v3l1.2.4v-3.2Z" fill="#fff4d8" ${_k}/>`; },
cape_kwak: () => { const c = _id(); return `<defs>${_lg(c, '#e8f8ff', '#6aa8d8')}${_lg(c + 'b', '#8fc8f0', '#3a78b8')}</defs>${_sh(16, 28.2, 11, 1.6)}
  <path d="M9 4.6c2 2 12 2 14 0l5.4 21.2-3 2.4-1.8-2.4-2 3.2-2.4-3.4-2.2 3.6-2.2-3.6-2.4 3.4-2-3.2-1.8 2.4-3-2.4Z" fill="url(#${c})" ${_K}/>
  ${_ln('M11.4 12l-1.8 12M16 12v14M20.6 12l1.8 12M13.6 13l-.8 10M18.4 13l.8 10', '#3a78b8', .8, .55)}
  ${[[9, 15], [23, 15], [12, 21], [20, 21], [16, 25]].map(([x, y]) => `<path transform="translate(${x} ${y})" d="M0-2.2v4.4M-2.2 0h4.4M-1.5-1.5l3 3M1.5-1.5l-3 3" stroke="#fff" stroke-width=".55" opacity=".8"/>`).join('')}
  <path d="M9 4.6c2 2 12 2 14 0l.8 3.2c-4.8 2.2-10.4 2.2-15.6 0Z" fill="url(#${c}b)" ${_K}/>
  <path d="M7.6 3.8 6 .8l4 1.8ZM24.4 3.8 26 .8l-4 1.8Z" fill="#efe8d0" ${_K}/>${_gem(16, 8, 1.6, '#ffffff', '#6aa8d8')}${_gl('M12 3.8c2 1.2 6 1.2 8 0', .55)}${_spark(5, 13, '#fff', .7)}${_spark(27, 20, '#fff', .6)}`; },
});

/* ======================= OUTILS DE RÉCOLTE ======================= */
Object.assign(ITEM_ART, {
faux_paysan: () => { const m = _id(); return `<defs>${_lg(m, '#eef2f6', '#7a828c', 1, 1)}</defs>${_rod(8, 29.6, 20.4, 6.6, '#b0793d', '#5d3b1c', 2.3)}${_ln('M10 26l1.6 1M12.4 21.6l1.6 1', '#e4b57a', .6, .8)}
  <path d="M20 6.2C24.6 3.4 29.4 4.2 31 8.6c-3.4-1.6-7-1-10.4 1.6Z" fill="url(#${m})" ${_K}/>${_ln('M21.6 7.2c3-1.6 5.6-1.6 8 0', '#fff', .6, .8)}
  <path d="M15.4 17l3.6-1.2" stroke="#7a828c" stroke-width="2.4" stroke-linecap="round"/><path d="M15.4 17l3.6-1.2" stroke="#140c06" stroke-width=".6" opacity=".4"/>`; },
faux_avoine: () => { const m = _id(), g = _id(); return `<defs>${_lg(m, '#f6fafc', '#8a96a4', 1, 1)}${_lg(g, '#ffe58a', '#c8861a')}</defs>${_rod(7, 29.6, 19.6, 6.6, '#d9a441', '#8a5a1a', 2.3)}
  <path d="M18.6 6.2C23.6 2.8 29 3.8 30.6 9c-3.6-2-7.6-1.4-11.2 1.6Z" fill="url(#${m})" ${_K}/>${_ln('M20.4 7.2c3.2-1.8 6-1.8 8.6 0', '#fff', .6, .8)}
  <path d="M14.6 17.4l4.2-1.4" stroke="url(#${g})" stroke-width="2.6" stroke-linecap="round"/>
  ${[[8.6, 24], [11.4, 20], [14, 16]].map(([x, y]) => `<path d="M${x} ${y}c-1.8-.6-2.4-2.2-1.8-3.8 1.8.4 2.6 1.8 1.8 3.8Zm.4 1.2c1.8-.2 3-1.4 3-3-1.8-.2-3 .8-3 3Z" fill="#e8c24a" ${_k}/>`).join('')}${_spark(27, 11, '#fff', .7)}`; },
faux_seigle: () => { const m = _id(), g = _id(); return `<defs>${_lg(m, '#ffffff', '#7fa0c8', 1, 1)}${_lg(g, '#ffe58a', '#b9801a')}${_rg(g + 'g', '#d7fbff', '#0e9bbd')}</defs>${_rod(6, 30, 19, 6, '#4a3a68', '#1a1430', 2.5)}
  <path d="M18 5.4C23.4 .8 29.6 2.4 31.2 8.6c-3.8-2.4-8.4-1.6-12 1.8Z" fill="url(#${m})" ${_K}/><path d="M19.8 6.4c3.4-2.4 6.6-2.4 9.4-.2" stroke="#fff" stroke-width=".7" fill="none"/>${_ln('M20 8.6c3-1.6 6-1.4 8.4.2', '#5a82c8', .6, .8)}
  <path d="M13.4 17.8l5.4-2.2" stroke="url(#${g})" stroke-width="3" stroke-linecap="round"/><circle cx="14.4" cy="17.6" r="1.8" fill="url(#${g}g)" ${_K}/>
  ${_ln('M8.4 26c1.6-.4 2.8-1.6 3-3.2M11.6 21c1.6-.4 2.8-1.4 3-3', '#ffe58a', .8)}${_spark(26, 12, '#d7fbff', .9)}${_spark(10, 12, '#ffe58a', .7)}`; },
gants_paille: () => { const a = _id(); return `<defs>${_lg(a, '#ffe9a0', '#c8a04a')}</defs>${_sh(16, 28.4, 8, 1.4)}
  <path d="M8.4 28V17.2L6 13.6c-.6-1.4.6-2.6 2-2l3.4 2.6V5.4c0-1.6 2.6-1.6 2.6 0V12h.8V3.6c0-1.6 2.6-1.6 2.6 0V12h.8V4.6c0-1.6 2.6-1.6 2.6 0V13h.8V7.4c0-1.6 2.6-1.6 2.6 0V19l-1.6 3.4V28Z" fill="url(#${a})" ${_K}/>
  ${_ln('M11 15v-8M15 13V5M19 14V6', '#a88030', .7, .7)}${_ln('M12.4 8c.6 2 .6 4 0 5.4', '#fff', .7, .6)}
  <rect x="8.2" y="23.4" width="14.4" height="4.8" rx="1.2" fill="#8a5a2e" ${_K}/>${_ln('M10 25.8h10.8', '#e4b57a', .7, .8)}
  ${_ln('M5.6 28.4 3 31M9 29.4 8 32M22 29.4l1 2.6M25 28.4 27.6 31', '#e8c24a', 1)}`; },
gants_houblon: () => { const a = _id(); return `<defs>${_lg(a, '#8ad65a', '#2f7a2a')}</defs>${_sh(16, 28.4, 8, 1.4)}
  <path d="M8.4 28V17.2L6 13.6c-.6-1.4.6-2.6 2-2l3.4 2.6V5.4c0-1.6 2.6-1.6 2.6 0V12h.8V3.6c0-1.6 2.6-1.6 2.6 0V12h.8V4.6c0-1.6 2.6-1.6 2.6 0V13h.8V7.4c0-1.6 2.6-1.6 2.6 0V19l-1.6 3.4V28Z" fill="url(#${a})" ${_K}/>
  ${_ln('M12.4 8c.6 2 .6 4 0 5.4', '#fff', .7, .5)}
  <rect x="8.2" y="23.4" width="14.4" height="4.8" rx="1.2" fill="#3e5a22" ${_K}/>${_ln('M10 25.8h10.8', '#b9e87a', .7, .8)}
  <path d="M16 12c-2.4 0-3.6 1.8-3.6 3.6 0 2 1.4 3.4 3.6 4 2.2-.6 3.6-2 3.6-4 0-1.8-1.2-3.6-3.6-3.6Z" fill="#c9f08a" ${_K}/>${_ln('M13 14.4c1.6.8 3.4.8 5.6 0M13.2 16.6c1.6.8 3.2.8 5.4 0M14 18.4c1.2.6 2.6.6 4 0', '#4a8a2a', .7)}<path d="M16 12c.2-1.6 1.4-2.4 2.8-2.4" stroke="#2f7a2a" stroke-width="1" fill="none"/>`; },
sac_ble: () => { const a = _id(); return `<defs>${_rg(a, '#e8c48a', '#9a6a32', .4, .3, .9)}</defs>${_sh(16, 28.6, 10, 1.6)}
  <path d="M10.6 9.4c-3.6 3.4-6 8.2-5.2 13.6.4 2.8 3.4 4.6 10.6 4.6s10.2-1.8 10.6-4.6c.8-5.4-1.6-10.2-5.2-13.6Z" fill="url(#${a})" ${_K}/>
  ${_ln('M8.4 16c1.6 3.4 1.8 7 .6 9.6M23.6 16c-1.6 3.4-1.8 7-.6 9.6M16 12.6v14', '#7a4a1a', .8, .45)}${_gl('M9 13c.8-1.6 2-3 3.4-3.6', .45)}
  <path d="M9.4 9.2c3.6 1.6 9.6 1.6 13.2 0l-.4-2.6c-3.4 1.2-8.8 1.2-12.4 0Z" fill="#c8a24a" ${_K}/>${_ln('M12.4 6.6l-1-3.4M16 7.2V2.6M19.6 6.6l1-3.4', '#e8c24a', 1.3)}<path d="M11.4 3.2c-.8 1-.6 2 .2 2.6M16 2.6c-.8 1-.6 2 .2 2.6M20.6 3.2c-.8 1-.6 2 .2 2.6" stroke="#b08a2a" stroke-width=".7" fill="none"/>
  <circle cx="16" cy="19.4" r="2.2" fill="#e8c24a" ${_K}/>${_ln('M16 17.4v4M14 19.4h4', '#8a5a1a', .6)}`; },
sac_lin: () => { const a = _id(), g = _id(); return `<defs>${_lg(a, '#9a8ae8', '#4a3aa0')}${_lg(g, '#ffe58a', '#b9801a')}</defs>${_sh(16, 28.4, 11.5, 1.8)}
  <path d="M10.4 10.4V8.4c0-3.2 2.2-5 5.6-5s5.6 1.8 5.6 5v2" fill="none" stroke="#140c06" stroke-width="3.4" stroke-linecap="round"/><path d="M10.4 10.4V8.4c0-3.2 2.2-5 5.6-5s5.6 1.8 5.6 5v2" fill="none" stroke="#b0793d" stroke-width="2" stroke-linecap="round"/>
  <rect x="3.6" y="10" width="24.8" height="17.8" rx="4.2" fill="url(#${a})" ${_K}/><path d="M3.6 16.6h24.8" stroke="#2a1a6a" stroke-width="1.1" opacity=".7"/>${_gl('M6 12.2c4-.8 10-.8 14 0', .4)}
  ${_ln('M5.8 21.6h20.4M5.8 25h20.4', '#c4b8ff', .5, .45)}
  <rect x="12.4" y="14.4" width="7.2" height="6.2" rx="1.4" fill="url(#${g})" ${_K}/>${_gem(16, 17.5, 1.5, '#ffffff', '#6a5ad8')}
  ${_ln('M8.8 20.4c.8-1.4 2.4-1.4 3.2 0M20 20.4c.8-1.4 2.4-1.4 3.2 0', '#e8e0ff', .6, .6)}`; },
});

/* ======================= RELIQUES : halos et reflets ======================= */
Object.assign(ITEM_ART, {
relique_tofu: () => { const f = _id(); return _halo('#8fd6ff') + `<defs>${_lg(f, '#fff7b0', '#e8b21a', 1, 1)}</defs>
  <path d="M8 28C8 17 14 8 26 3.4c0 10.4-6 19-16.4 23.6Z" fill="url(#${f})" ${_K}/><path d="M9.6 26.4C14 17 19 11 24.6 5.6" stroke="#b08a2a" stroke-width="1.1" fill="none"/>
  ${_ln('M13.6 20l-3.4-1M16.6 16l-3.6-1.4M19.6 12.4l-3-2M15 21l3.4.6M18 17.4l3.6.2M21 13.6l3 0M12 23.4l3 .2', '#d8a82a', .8)}${_ln('M24.4 5c-1.4 4-4 7-7.4 9.4', '#fff', .9, .8)}${_spark(6.6, 9.4, '#bfe9ff')}${_spark(26.4, 19, '#fff', .8)}`; },
relique_bouftou: () => { const g = _id(); return _halo('#ffd54a') + `<defs>${_rg(g, '#fff7b0', '#d9961a')}</defs>
  <path d="M6 16C1.4 15.6.8 8.8 5 6.4c-.4 2.8.8 5 3.6 6.2Z" fill="#f4e8c0" ${_K}/><path d="M26 16c4.6-.4 5.2-7.2 1-9.6.4 2.8-.8 5-3.6 6.2Z" fill="#f4e8c0" ${_K}/>
  ${[[16, 11, 5.4], [10.6, 17, 4.8], [21.4, 17, 4.8], [16, 21.6, 5.2], [12.6, 11.6, 3.4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})" ${_K}/>`).join('')}
  ${_ln('M13 9.8c1-1.4 2.6-1.6 3.8-.6M8.4 15.6c1-1.2 2.4-1.2 3.4-.2M20.2 15.6c1-1.2 2.4-1.2 3.4-.2M14 20.6c1-1.2 2.6-1.2 3.6-.2', '#a8741a', .7)}${_gl('M12.6 8.6c1.6-1.4 3.4-1.8 5-1.4', .6)}${_spark(24, 25, '#fff', .9)}${_spark(6.6, 24, '#fff7b0', .7)}`; },
relique_abra: () => { const s = _id(); return _halo('#6fbf4c') + `<defs>${_rg(s, '#c98a4a', '#5a3a1c')}</defs>
  <path d="M16 19c-.6-5 .6-8 3-10-3-.4-5 1-6.2 3.6C11.6 10 9.4 9 6.6 9.8c1.4 2.4 3.6 3.6 6.8 3.6.2 2 .6 4 1.2 5.6Z" fill="#6fc24a" ${_K}/>
  <path d="M16 19c0-5 2.6-9 8.6-10.4-.6 5.4-3.6 8.6-8.6 10.4Z" fill="#8ad65a" ${_K}/>${_ln('M17 17c2.2-2.4 4.4-4.4 6.4-6.4', '#d4f5a0', .7, .8)}
  <path d="M8.4 21.6c0-3 3.2-4.2 7.6-4.2s7.6 1.2 7.6 4.2c0 3.6-3.2 7.4-7.6 7.4s-7.6-3.8-7.6-7.4Z" fill="url(#${s})" ${_K}/>${_ln('M11 22.2c.6 2.4 2 4 4 4.8', '#e8b87a', .8, .7)}${_ln('M16 17.4v11', '#3a2410', .6, .5)}${_spark(5.6, 6, '#e8ffb0')}${_spark(27, 22, '#ffef9a', .8)}`; },
relique_craq: () => { const s = _id(); return _halo('#e08a3a') + `<defs>${_lg(s, '#78707a', '#2a262e', 1, 1)}${_rg(s + 'g', '#fff0a0', '#e0501a')}</defs>
  <path d="M16 3.6 26 9.6l2 11-6.4 7.6H10.4L4 20.6l2-11Z" fill="url(#${s})" ${_K}/><path d="M16 3.6 26 9.6 16 15 6 9.6Z" fill="#9a929c" opacity=".5"/>
  ${_ln('M16 7l-1.6 6 4 3-2 7M14.4 13 8.6 15M18.4 16l6 1M16 23l4 3M9 21l5 2', '#e0501a', 1.8)}${_ln('M16 7l-1.6 6 4 3-2 7M14.4 13 8.6 15M18.4 16l6 1', '#ffd070', .7)}
  <circle cx="16.4" cy="16" r="2.4" fill="url(#${s}g)"/>${_gl('M7.6 11l7-4', .35)}${_spark(26, 5, '#ffb060', .8)}${_spark(6, 26, '#ffb060', .7)}`; },
relique_bworkette: () => { const h = _id(); return _halo('#ff5a5a') + `<defs>${_rg(h, '#ff8a8a', '#a8122a')}</defs>
  <path d="M7 11C3.6 10.4 2.6 5.8 5 3c.2 3 1.8 4.6 4.6 5.4ZM25 11c3.4-.6 4.4-5.2 2-8-.2 3-1.8 4.6-4.6 5.4Z" fill="#f4eed4" ${_K}/>
  <path d="M16 28C5.4 21.6 2.6 15.6 4.6 10.8c1.8-4.2 8.4-5 11.4-.6 3-4.4 9.6-3.6 11.4.6 2 4.8-.8 10.8-11.4 17.2Z" fill="url(#${h})" ${_K}/>
  <rect x="14" y="10.6" width="4" height="11" rx=".8" fill="#2a0a12" opacity=".85"/><rect x="10.6" y="14" width="10.8" height="4" rx=".8" fill="#2a0a12" opacity=".85"/>${_gl('M7 10.6c.8-2 2.4-3 4.2-3', .55)}${_spark(26, 22, '#ffd0d0', .8)}${_spark(6, 24, '#ffd0d0', .6)}`; },
relique_kanigrou: () => { const g = _id(); return _halo('#f6cd6a') + `<defs>${_lg(g, '#e8b87a', '#7a4a1a')}${_lg(g + 's', '#ffe9a0', '#d9961a')}</defs>
  <path d="M9.4 6.4c0 5.2 3.8 7 6.6 9.6-2.8 2.6-6.6 4.4-6.6 9.6h13.2c0-5.2-3.8-7-6.6-9.6 2.8-2.6 6.6-4.4 6.6-9.6Z" fill="#dff4ff" opacity=".55" ${_K}/>
  <path d="M11.4 7.6c.6 3 2.4 4.4 4.6 6.2 2.2-1.8 4-3.2 4.6-6.2Z" fill="#7ec8ff" opacity=".7"/><path d="M16 16.6c-2.2 1.8-3.6 3.4-4 6.4h8c-.4-3-1.8-4.6-4-6.4Z" fill="url(#${g}s)"/><path d="M16 14v3" stroke="#d9961a" stroke-width=".9"/>
  <rect x="7.4" y="3.2" width="17.2" height="3.4" rx="1.2" fill="url(#${g})" ${_K}/><rect x="7.4" y="25.4" width="17.2" height="3.4" rx="1.2" fill="url(#${g})" ${_K}/>${_ln('M9.2 6.6v18.8M22.8 6.6v18.8', '#9a6a3a', 1.1, .8)}${_gl('M11 8c.6 2 1.4 3.2 2.6 4.4', .55)}${_spark(26, 9, '#fff', .8)}${_spark(6, 22, '#ffe9a0', .6)}`; },
relique_chafer: () => { const l = _id(); return _halo('#9be8e0') + `<defs>${_lg(l, '#6a7a9a', '#1a2038')}${_rg(l + 'f', '#f4ffff', '#17a8c8')}</defs>
  <path d="M13 5.6c0-2.2 1.2-3.2 3-3.2s3 1 3 3.2" fill="none" stroke="#1a2038" stroke-width="2.4" stroke-linecap="round"/><path d="M13 5.6c0-2.2 1.2-3.2 3-3.2s3 1 3 3.2" fill="none" stroke="#8a9ab8" stroke-width="1.2" stroke-linecap="round"/>
  <rect x="11" y="5.6" width="10" height="2.6" rx=".8" fill="url(#${l})" ${_K}/>
  <path d="M10.4 8.6h11.2l1.4 15.4c0 1.2-.8 2-2 2H11c-1.2 0-2-.8-2-2Z" fill="#bfeff0" opacity=".42" ${_K}/>
  <path d="M16 11c2.6 3 4.2 5.4 4.2 8 0 2.6-1.8 4.2-4.2 4.2s-4.2-1.6-4.2-4.2c0-1.6.6-2.4 1.8-3.6.2 1.2.8 1.8 1.6 1.8-.2-2.2.2-3.8.8-6.2Z" fill="url(#${l}f)" ${_k}/>${_ln('M16 14.4c1.4 1.8 2 3 2 4.6', '#fff', .8, .9)}
  <rect x="9.2" y="25.4" width="13.6" height="3" rx="1" fill="url(#${l})" ${_K}/>${_ln('M10.8 8.6l.8 15.6', '#fff', .8, .5)}${_spark(5, 10, '#aef7ff', .8)}${_spark(27, 16, '#aef7ff', .7)}`; },
});

/* Couleur d'identité de chaque panoplie (pastille sur les cases, fiche d'objet) */
const SET_COL = { aventurier: '#4fc3f7', bouftou: '#f2e6c4', abraknyde: '#7ccf4d', bwork: '#e0503a', koalak: '#ff9c4a', chafer: '#7ff3ff' };

/* ======================= RELIQUES v3 : aura rayonnante + cadre doré ornementé ======================= */
const _RELIC_COL = { relique_tofu: ['#8fd6ff', '#2a9fe0'], relique_bouftou: ['#ffd54a', '#e8851a'], relique_abra: ['#8ee05a', '#2f9a2a'], relique_craq: ['#ff9a4a', '#d8401a'], relique_bworkette: ['#ff6a7a', '#c4122a'], relique_kanigrou: ['#ffe08a', '#d9961a'], relique_chafer: ['#9bf3ff', '#17a8c8'] };
const _relicOld = Object.assign({}, ITEM_ART);
const _relicFrame = (id) => {
  const [c1, c2] = _RELIC_COL[id], g = _id(), r = _id(), f = _id();
  const rays = Array.from({ length: 16 }, (_, i) => { const a = i * 22.5, L = i % 2 ? 13 : 15.4; return `<path transform="rotate(${a} 16 16)" d="M15.2 16 16 ${16 - L} 16.8 16Z" fill="url(#${r})"/>`; }).join('');
  const gems = [[16, 2.6], [29.4, 16], [16, 29.4], [2.6, 16]].map(([x, y]) => `<path transform="translate(${x} ${y}) rotate(45)" d="M-1.5-1.5h3v3h-3Z" fill="${c1}" stroke="#fff3c0" stroke-width=".5"/>`).join('');
  return `<defs>${_rg(g, c1, c2, .5, .5, .55)}${_lg(f, '#fff2b0', '#b9801a', 1, 1)}<radialGradient id="${r}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${c1}" stop-opacity=".05"/><stop offset="1" stop-color="${c1}" stop-opacity=".75"/></radialGradient></defs>
    <circle cx="16" cy="16" r="15.2" fill="${c2}" opacity=".16"/>${rays}<circle cx="16" cy="16" r="12.6" fill="url(#${g})" opacity=".42"/>
    <circle cx="16" cy="16" r="13.2" fill="none" stroke="#2a1c04" stroke-width="2.4" opacity=".75"/><circle cx="16" cy="16" r="13.2" fill="none" stroke="url(#${f})" stroke-width="1.5"/><circle cx="16" cy="16" r="11.9" fill="none" stroke="#fff6c8" stroke-width=".4" opacity=".7"/>${gems}`;
};
for (const id of Object.keys(_RELIC_COL)) {
  const body = _relicOld[id]().replace(/<circle cx="16" cy="16" r="14"[^>]*\/><circle cx="16" cy="16" r="10\.5"[^>]*\/>/, '');
  const [c1] = _RELIC_COL[id];
  ITEM_ART[id] = () => _relicFrame(id) + `<g transform="translate(16 16.4) scale(.72) translate(-16 -16)">${body}</g>` + _spark(4.6, 6, '#fff', .9) + _spark(27.6, 8.4, c1, .8) + _spark(26.8, 26, '#fff', .7) + _spark(5.4, 25.4, c1, .6);
}
