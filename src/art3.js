/* =====================================================================
   ICÔNES D'ÉQUIPEMENT v3 — panoplies des sous-zones de la carte
   Wabbit : fourrure crème + rose + carotte · Blop : gelée, une couleur par pièce
   Kanniboul : bois, os et plumes · Porcos : mafia rose, galon doré
   Dragoeuf : coquille, aile dorée et braise · Mansot : fourrure et glace éternelle
   Complète ITEM_ART (art.js / art2.js) — mêmes helpers (_id, _lg, _rg, _K…).
   ===================================================================== */
/* contour ondulé « fourrure » (viewBox 32) */
const _a3fur = (cx, cy, rx, ry, n = 10, amp = 1.3, rot = 0) => {
  let d = ''; const N = n * 2;
  for (let i = 0; i < N; i++) {
    const a = rot + (i / N) * Math.PI * 2, r = i % 2 ? 1 : 1 + amp / Math.max(rx, ry);
    const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
    if (i === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
    else { const am = rot + ((i - .5) / N) * Math.PI * 2, rm = 1 + (i % 2 ? amp * .35 : amp * .2) / Math.max(rx, ry); d += `Q${(cx + Math.cos(am) * rx * rm * 1.04).toFixed(1)} ${(cy + Math.sin(am) * ry * rm * 1.04).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`; }
  }
  return d + 'Z';
};
/* plume : base en (x,y), orientée selon ang (0 = vers le haut) */
const _a3fea = (x, y, ang, len, c1, c2) => { const g = _id(); return `<defs>${_lg(g, c1, c2)}</defs><g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0C-${len * .24} -${len * .28} -${len * .22} -${len * .8} 0 -${len} ${len * .22} -${len * .8} ${len * .24} -${len * .28} 0 0Z" fill="url(#${g})" ${_K}/><path d="M0 -1V-${len - 1.4}" stroke="#140c06" stroke-opacity=".5" stroke-width=".5"/></g>`; };
/* blob de gelée : base ronde + pointe */
const _a3blob = (cx, cy, r, g) => `<path d="M${cx} ${cy - r * 1.18}C${cx + r * .25} ${cy - r * .76} ${cx + r * 1.06} ${cy - r * .56} ${cx + r * 1.06} ${cy + r * .25}C${cx + r * 1.06} ${cy + r * .86} ${cx + r * .56} ${cy + r} ${cx} ${cy + r}C${cx - r * .56} ${cy + r} ${cx - r * 1.06} ${cy + r * .86} ${cx - r * 1.06} ${cy + r * .25}C${cx - r * 1.06} ${cy - r * .56} ${cx - r * .25} ${cy - r * .76} ${cx} ${cy - r * 1.18}Z" fill="url(#${g})" ${_K}/><ellipse cx="${cx - r * .42}" cy="${cy - r * .3}" rx="${r * .3}" ry="${r * .2}" fill="#fff" opacity=".7" transform="rotate(-30 ${cx - r * .42} ${cy - r * .3})"/>`;
const _a3bone = (x1, y1, x2, y2, w = 1.7) => { const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = -dy / l * w * .55, ny = dx / l * w * .55; return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="#140c06" stroke-opacity=".85" stroke-width="${w + 1.2}" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="#f4ecd4" stroke-width="${w}" stroke-linecap="round"/>` + [[x1, y1], [x2, y2]].map(([x, y]) => `<circle cx="${x + nx}" cy="${y + ny}" r="${w * .62}" fill="#f4ecd4" ${_k}/><circle cx="${x - nx}" cy="${y - ny}" r="${w * .62}" fill="#f4ecd4" ${_k}/>`).join(''); };
/* chaîne de collier (comme l'aventurier) */
const _a3chain = (c1 = '#d9b45a', c2 = '#8a6a22') => `${_ln('M7.5 3c0 8.4 3.2 12.2 8.5 13.4 5.3-1.2 8.5-5 8.5-13.4', '#140c06', 2.8, .9)}${_ln('M7.5 3c0 8.4 3.2 12.2 8.5 13.4 5.3-1.2 8.5-5 8.5-13.4', c1, 1.6)}${_ln('M7.5 3c0 8.4 3.2 12.2 8.5 13.4', c2, .5, .8)}`;

Object.assign(ITEM_ART, {
/* ======================= WABBIT : fourrure crème et rose, carotte dorée ======================= */
coiffe_wabbit: () => { const a = _id(), b = _id(), c = _id(); return `<defs>${_rg(a, '#ffffff', '#e8cdd8', .4, .3, .9)}${_lg(b, '#ffb8d8', '#e0607f')}${_lg(c, '#ffb04a', '#e0601a', 1, 1)}</defs>${_sh(16, 28.6, 10.5, 1.8)}
  <path d="M8.6 14C6 7 7 2.4 10.6 2.6c3.4.6 4 6.2 3.2 11.4Z" fill="url(#${a})" ${_K}/><path d="M10.6 5c-.4 2.6 0 5.4.8 7.6" stroke="#ff9ec4" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M17.4 14c-.8-5.6.4-10 3.6-10.6 3-.4 4.6 2.2 2.8 5.8 1.6.2 2.6 1 2.8 2.6-2-.8-3.6-.2-4.6.8.2 1.4.4 2.6.2 3.8Z" fill="url(#${a})" ${_K}/><path d="M20.6 6.2c-.2 2 .2 4.2 1 6" stroke="#ff9ec4" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M5.6 24.4C4.6 16 8.6 11.6 16 11.6S27.4 16 26.4 24.4c-3.2 2.6-6.8 3.4-10.4 3.4s-7.2-.8-10.4-3.4Z" fill="url(#${a})" ${_K}/>
  <path d="M5.8 22.4c3.2 2.4 6.6 3.4 10.2 3.4s7-1 10.2-3.4l.4 2.4c-3.2 2.8-6.8 3.6-10.6 3.6s-7.4-.8-10.6-3.6Z" fill="url(#${b})" ${_K}/>
  ${_ln('M9 17c1-1.8 2.6-2.8 4.4-3.2M18 14c2 .2 3.6 1.2 4.6 2.8', '#fff', .8, .75)}${_ln('M8.4 20.4c.8.8 1.6 1 2.4.6M13 21.2c.6.8 1.6 1 2.4.4M18 21.2c.8.6 1.6.6 2.4 0', '#d8b4c4', .7, .8)}
  <path d="M20.6 20.6c2.4-.4 3.6.8 3.8 2.4l-2.4 4.8-3.2-1.4Z" fill="url(#${c})" ${_K}/>${_ln('M21 21.4l1.6 1.2M20.4 23.2l1.6 1', '#8a3a0a', .5, .6)}<path d="M22.4 20.8c-.2-1.6.6-2.6 1.6-3M22.4 20.8c.6-1.6 1.8-2.2 3-2" stroke="#3f9a2a" stroke-width="1.2" fill="none" stroke-linecap="round"/>`; },
bottes_wabbit: () => { const a = _id(), b = _id(); return `<defs>${_rg(a, '#ffffff', '#e0c6d2', .4, .3, 1)}${_lg(b, '#ffb8d8', '#d8507a')}</defs>${_sh(16, 28.6, 12, 2)}
  <path d="M10 4.6h10l.6 13.4c3.4.8 7 2.4 7.6 5.4.4 2-1 3.8-3 3.8H8.8c-1.6 0-2.8-1-2.6-2.6L8 18.4Z" fill="url(#${a})" ${_K}/>
  <path d="M8.4 5.6c1.6-2.4 4-2.8 6-1.6 2-1.4 4.4-1 5.8 1.6.8 1.4.4 3-.8 3.6-1.6-.8-3.6-.8-5.2 0-1.6-.8-3.6-.8-5.2 0-1.2-.6-1.6-2.2-.6-3.6Z" fill="#fff" ${_K}/>${_ln('M9.6 6.4c.8-1 2-1.4 3-1M15.4 5.6c1-.8 2.4-.6 3.2.4', '#d8b4c4', .6)}
  <path d="M22 22.6c1.8.2 3.4.8 4.6 1.8l-.2 1.8c-1.6-.8-3.2-1.2-4.6-1.2Z" fill="url(#${b})" ${_k}/>
  <path d="M6.4 25.4h22.2c0 1.8-1.2 3-3 3H8.8c-1.4 0-2.4-.8-2.4-3Z" fill="url(#${b})" ${_K}/>
  <circle cx="22.4" cy="24.8" r="1.5" fill="#ff7a9e" ${_k}/><circle cx="25.4" cy="24.2" r="1.3" fill="#ff7a9e" ${_k}/><circle cx="19.6" cy="24.8" r="1.3" fill="#ff7a9e" ${_k}/>
  ${_ln('M10.4 13.4l9 0M10 16.4l9.4 0', '#d8b4c4', .6, .7)}${_gl('M10.6 10.6l.2 6', .5)}`; },
anneau_wabbit: () => { const a = _id(), c = _id(); return `<defs>${_lg(a, '#ffe58a', '#b9801a')}${_lg(c, '#ffc060', '#e0601a', 1, 1)}</defs>${_sh(16, 27, 9)}
  <ellipse cx="16" cy="19.4" rx="8.6" ry="8.8" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="16" cy="19.4" rx="8.6" ry="8.8" fill="none" stroke="url(#${a})" stroke-width="3.6"/>
  ${_ln('M9 22c1.4 4 4.4 5.6 7 5.6', '#6a4510', 1, .6)}${_ln('M9.6 15c1-2.2 2.8-3.6 4.8-4', '#fff', .9, .55)}
  <path d="M10.4 10.6 16 6l5.6 4.6-5.6 3.4Z" fill="url(#${a})" ${_K}/>
  <path d="M16 2.6c2.6.8 3.8 4 3.4 7.4-.4 2.4-1.8 4-3.4 5.4-1.6-1.4-3-3-3.4-5.4-.4-3.4.8-6.6 3.4-7.4Z" fill="url(#${c})" ${_K}/>${_ln('M14.4 6l1.4 1M14.2 8.6l2 1', '#8a3a0a', .5, .6)}${_gl('M14.4 4.4c.6-.6 1.4-.8 2-.4-.8 1-1.4 2.4-1.6 3.6Z', .6)}
  <path d="M16 2.6c-1-1.8-2.6-2.4-4-1.8 1 .8 2 1.6 2.6 2.8M16 2.6c1-1.8 2.8-2.2 4.2-1.4-1 .6-2 1.4-2.8 2.6" stroke="#2f8a2a" stroke-width="1.1" fill="#58b83a"/>`; },
cape_wabbit: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#ff9ec8', '#c8406a')}${_rg(b, '#ffffff', '#e0c6d2', .4, .3, .9)}</defs>${_sh(16, 28.4, 11, 2)}
  <path d="M9.6 5.4c2.4 1.6 10.4 1.6 12.8 0l5.4 21.4c-2.8 1.6-6.2.8-8.2 2.2-.6-.6-1.4-.6-2.2 0-1.8-1.4-5.2-.6-8-2.2Z" fill="url(#${a})" ${_K}/>
  ${_ln('M12 12l-1.4 14M16 11v17M20 12l1.4 14', '#8a1a40', .8, .5)}${_ln('M13 13l-1 10M19.6 13l1 10', '#ffd0e4', .6, .6)}
  <path d="M8 6.6C8 3.8 11 2.6 16 2.6s8 1.2 8 4c0 2.4-1.6 3.8-3 4.2-1.2-1-3-1.4-5-1.4s-3.8.4-5 1.4C9.6 10.4 8 9 8 6.6Z" fill="url(#${b})" ${_K}/>${_ln('M10 5.4c1.6-1 3.6-1.4 6-1.4M18 4.4c1.6.2 3 .8 4 1.6', '#d8b4c4', .7)}
  <circle cx="16" cy="10.4" r="2.6" fill="#ffd24a" ${_K}/><path d="M16 8.6l.6 1.2 1.2.2-.9.9.2 1.2-1.1-.6-1.1.6.2-1.2-.9-.9 1.2-.2Z" fill="#ff7a9e"/>
  <circle cx="16" cy="26" r="2.4" fill="url(#${b})" ${_K}/>${_ln('M14.6 25.4c.8-.8 2-.8 2.8 0', '#d8b4c4', .5)}`; },
sceptre_wabbit: () => { const g = _id(), c = _id(); return `<defs>${_lg(g, '#ffe58a', '#b9801a')}${_lg(c, '#ffc060', '#e0601a', 0, 1)}</defs>${_rod(6.4, 29.4, 19.6, 13.6, '#ffc3dc', '#c8406a', 2.4)}
  ${_ln('M8.6 26.6l1.6 1.2M11 23.8l1.6 1.2M13.4 21l1.6 1.2', '#8a1a40', .7, .7)}
  <path d="M17 17.8l4.2-3.6 2 2.4-3.6 4.2Z" fill="url(#${g})" ${_K}/>
  <g transform="rotate(45 23.6 9.4)"><path d="M23.6 1.8c2.6 1 3.8 4.4 3.4 8.4-.4 3.2-2 5.6-3.4 7.6-1.4-2-3-4.4-3.4-7.6-.4-4 .8-7.4 3.4-8.4Z" fill="url(#${c})" ${_K}/>${_ln('M21.8 5.4l2 .8M21.4 8.2l2.8 1M22 11l2.2.8', '#8a3a0a', .6, .6)}${_gl('M22 4.6c.8-.8 1.6-1 2.4-.6-1.2.8-2 2-2.4 3.4Z', .65)}
  <path d="M23.6 1.8c-.8-2-2.6-2.8-4-2.2 1.2.8 2.2 1.6 2.8 2.8M23.6 1.8c.8-2 2.8-2.6 4.2-1.6-1.2.6-2.4 1.4-3 2.6" stroke="#2f8a2a" stroke-width="1.1" fill="#58b83a"/></g>
  <path d="M18.6 15.4c-1.8-1.2-2.4-3.2-1.6-5 1.4.6 2.2 1.8 2.2 3.4Z" fill="#fff" ${_k}/><path d="M26.8 18.4c1.8-1.4 2.2-3.4 1.2-5-1.4.8-2 2-1.8 3.6Z" fill="#fff" ${_k}/>${_spark(28, 4.6, '#fff', .9)}`; },
relique_wabbit: () => { const a = _id(), b = _id(); return _halo('#ff9ec8') + `<defs>${_rg(a, '#ffffff', '#e8c6d4', .4, .3, .9)}${_lg(b, '#ffe58a', '#b9801a')}</defs>
  ${_ln('M16 2.6c-3 0-5 1.6-5 3.8', '#140c06', 2.6, .9)}${_ln('M16 2.6c-3 0-5 1.6-5 3.8', '#d9b45a', 1.4)}${_ln('M16 2.6c3 0 5 1.6 5 3.8', '#140c06', 2.6, .9)}${_ln('M16 2.6c3 0 5 1.6 5 3.8', '#d9b45a', 1.4)}
  <path d="M9.6 12.4C8.4 8.4 11.4 6.4 16 6.4s7.6 2 6.4 6c-1 3.4 1.2 6.4 1.2 9.6 0 4.6-3.6 6.8-7.6 6.8s-7.6-2.2-7.6-6.8c0-3.2 2.2-6.2 1.2-9.6Z" fill="url(#${a})" ${_K}/>
  ${_a3furTufts()}
  <circle cx="16" cy="21.4" r="3.4" fill="#ff8fb8" ${_K}/><circle cx="11.6" cy="16.2" r="2" fill="#ff8fb8" ${_k}/><circle cx="16" cy="14.4" r="2" fill="#ff8fb8" ${_k}/><circle cx="20.4" cy="16.2" r="2" fill="#ff8fb8" ${_k}/>
  ${_gl('M12 9.8c1.2-.8 2.6-1 4-.8-1.4.6-2.4 1.6-3 3Z', .7)}
  <path d="M14 3.4l1 1.8M18 3.4l-1 1.8M16 2.6V5" stroke="#3f9a2a" stroke-width="1.4" stroke-linecap="round"/>${_spark(26, 8, '#fff', .9)}${_spark(5.6, 20, '#ffd0e4', .8)}`; },

/* ======================= BLOP : gelée translucide, une couleur par pièce ======================= */
coiffe_blop: () => { const a = _id(); return `<defs>${_rg(a, '#d9a074', '#6a3e22', .4, .3, .9)}</defs>${_sh(16, 28, 11.5, 1.8)}
  ${_a3blob(16, 17.4, 10.6, a)}
  <path d="M5.4 22.2c3 2.6 6.6 3.6 10.6 3.6s7.6-1 10.6-3.6l.2 2.6c-3 2.8-6.8 3.8-10.8 3.8S8.2 27.6 5.2 24.8Z" fill="#4a2810" ${_K}/>${_ln('M7 25c2.8 1.8 5.8 2.6 9 2.6s6.2-.8 9-2.6', '#c8885a', .6, .7)}
  <ellipse cx="12.6" cy="16.6" rx="2" ry="2.6" fill="#fff" ${_k}/><ellipse cx="19.4" cy="16.6" rx="2" ry="2.6" fill="#fff" ${_k}/><circle cx="13" cy="17.2" r="1.2" fill="#2a1408"/><circle cx="19" cy="17.2" r="1.2" fill="#2a1408"/>
  ${_ln('M13.4 20.6c1.6 1.2 3.6 1.2 5.2 0', '#2a1408', 1)}`; },
cape_blop: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#ff8a9a', '#b0142e')}${_rg(b, '#fff0a0', '#d9961a')}</defs>${_sh(16, 28.6, 11, 2)}
  <path d="M10 5.4c2 1.4 10 1.4 12 0l5.8 19.4c-1.4.8-2.6.4-3.6 1.8-.8-1.2-2-1.2-3 .2-.8-1.6-2-1.6-3.2 0-1.2-1.6-2.4-1.6-3.2 0-1-1.4-2.2-1.4-3 -.2-1 -1.4-2.2-1-3.6-1.8Z" fill="url(#${a})" ${_K}/>
  ${_ln('M12 12l-1.2 12M16 11v14M20 12l1.2 12', '#7a0a1e', .8, .45)}${_gl('M11.4 10c.8 2.6 1 5.6.6 8.4', .35)}${_gl('M20.6 12c.6 2 .8 4.4.4 6.8', .25)}
  <path d="M10 5.4c2 1.4 10 1.4 12 0l.8 3.8c-4.6 1.8-8.6 1.8-13.6 0Z" fill="#8a0e22" ${_K}/>
  <circle cx="16" cy="9.6" r="3.4" fill="url(#${b})" ${_K}/>${_a3blobMini(16, 9.6)}`; },
amulette_blop: () => { const a = _id(); return `<defs>${_rg(a, '#a8b4ff', '#2a2eb0', .4, .3, .9)}</defs>${_a3chain('#bfc8e8', '#6a74a8')}
  <rect x="13.6" y="14.4" width="4.8" height="3.2" rx="1" fill="#d9b45a" ${_K}/>
  ${_a3blob(16, 22.4, 6.4, a)}
  <ellipse cx="13.6" cy="22" rx="1.2" ry="1.6" fill="#fff" ${_k}/><ellipse cx="18.4" cy="22" rx="1.2" ry="1.6" fill="#fff" ${_k}/><circle cx="13.8" cy="22.4" r=".7" fill="#101650"/><circle cx="18.2" cy="22.4" r=".7" fill="#101650"/>${_ln('M14.4 25c.8.6 2.4.6 3.2 0', '#101650', .7)}`; },
anneau_blop: () => { const a = _id(), g = _id(); return `<defs>${_lg(a, '#ffe58a', '#a8741f')}${_rg(g, '#c8ff9a', '#2a9a1a', .4, .3, .9)}</defs>${_sh(16, 27, 9)}
  <ellipse cx="16" cy="19.6" rx="8.8" ry="9" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="16" cy="19.6" rx="8.8" ry="9" fill="none" stroke="url(#${a})" stroke-width="3.6"/>
  ${_ln('M8.8 22c1.4 4 4.4 5.6 7.2 5.6', '#6a4510', 1, .6)}${_ln('M9.4 15c1-2.2 3-3.6 5-4', '#fff', .9, .55)}
  <path d="M11.6 11.6 16 8.4l4.4 3.2-4.4 2Z" fill="url(#${a})" ${_K}/>
  ${_a3blob(16, 7.6, 5, g)}<circle cx="14.4" cy="7.8" r=".8" fill="#0c3a08"/><circle cx="17.6" cy="7.8" r=".8" fill="#0c3a08"/>${_ln('M15 9.6c.6.4 1.4.4 2 0', '#0c3a08', .6)}`; },
masse_blop: () => { const c1 = _id(), c2 = _id(), c3 = _id(), c4 = _id(); return `<defs>${_rg(c1, '#d9a074', '#6a3e22', .4, .3, .9)}${_rg(c2, '#ff8a9a', '#b0142e', .4, .3, .9)}${_rg(c3, '#a8b4ff', '#2a2eb0', .4, .3, .9)}${_rg(c4, '#c8ff9a', '#2a9a1a', .4, .3, .9)}</defs>
  ${_rod(6.4, 29.6, 18.4, 14.4, '#8a5a2e', '#3e2412', 2.4)}${_ln('M8.4 26.8l1.8 1.4M10.4 24.2l1.8 1.4', '#e4b57a', .7, .7)}
  <path d="M15.4 18.6l3.4-2.4 1.8 2.2-3 3Z" fill="#8a8a96" ${_K}/>
  ${_a3blob(16.8, 12.6, 3.8, c1)}${_a3blob(25.2, 13.4, 3.8, c2)}${_a3blob(21.6, 5.6, 4.4, c3)}${_a3blob(21.4, 14.4, 4.4, c4)}
  ${_spark(29, 4, '#fff', .8)}${_spark(14, 5, '#fff', .6)}`; },
relique_blop: () => { const h = 'M16 28.4C5 20.6 2.4 14.4 4.6 10 6.8 5.8 13 5.6 16 9.8c3-4.2 9.2-4 11.4.2 2.2 4.4-.4 10.6-11.4 18.4Z'; const cp = _id(), g = _id(); return _halo('#c8a0ff') + `<defs><clipPath id="${cp}"><path d="${h}"/></clipPath>${_rg(g, '#ffffff', '#b8a0ff', .4, .3, .9)}</defs>
  <path d="${h}" fill="url(#${g})"/>
  <g clip-path="url(#${cp})"><path d="M2 4 16 9.8 9 18 2 12Z" fill="#8a5a3a" opacity=".55"/><path d="M16 9.8 30 4v8l-7 6Z" fill="#ff4a6a" opacity=".6"/><path d="M9 18 16 9.8 23 18 16 29Z" fill="#6a7aff" opacity=".6"/><path d="M2 12 9 18 16 29 2 24Z" fill="#6ad04a" opacity=".55"/><path d="M23 18 30 12v12L16 29Z" fill="#ffd24a" opacity=".5"/></g>
  <path d="${h}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width=".95" stroke-linejoin="round"/>${_ln('M16 9.8 9 18 16 28.4 23 18Z', '#fff', .6, .7)}${_ln('M16 9.8V28M9 18H23', '#fff', .4, .5)}
  ${_gl('M6.6 11c.8-2 2.6-3 4.6-2.6-1.8.6-3.2 1.8-4 3.8Z', .8)}${_spark(27, 22, '#fff', .9)}${_spark(5, 25, '#e8d0ff', .7)}`; },

/* ======================= KANNIBOUL : bois sculpté, os, plumes ======================= */
coiffe_kanniboul: () => { const a = _id(), w = _id(); return `<defs>${_lg(a, '#c8884a', '#5a3216', 1, 0)}${_lg(w, '#e8a05a', '#7a4a22')}</defs>${_sh(16, 29, 8.4, 1.4)}
  ${_a3fea(11, 12, -50, 11, '#ff6a4a', '#b0142e')}${_a3fea(14, 11.4, -24, 11.6, '#ffd24a', '#c8861a')}${_a3fea(16, 11, 0, 12, '#5ad84a', '#1a7a2a')}${_a3fea(18, 11.4, 24, 11.6, '#ffd24a', '#c8861a')}${_a3fea(21, 12, 50, 11, '#ff6a4a', '#b0142e')}
  <path d="M8.4 12c1.2-3 4.2-4 7.6-4s6.4 1 7.6 4c1.2 6 .6 11-3 15.4-1.4 1.8-2.8 2.6-4.6 2.6s-3.2-.8-4.6-2.6C7.8 23 7.2 18 8.4 12Z" fill="url(#${w})" ${_K}/>
  <path d="M9.4 14.4h13.2" stroke="#fff2d8" stroke-width="1.6" opacity=".9"/><path d="M9.6 19.6c3.4 1 9.4 1 12.8 0" stroke="#d8402a" stroke-width="1.4" opacity=".9" fill="none"/>
  <path d="M10.6 16.2c1.6-1.2 3.6-1.2 5 .2-1.4 1.2-3.4 1.4-5 -.2ZM21.4 16.2c-1.6-1.2-3.6-1.2-5 .2 1.4 1.2 3.4 1.4 5-.2Z" fill="#14240a" ${_k}/><circle cx="13.4" cy="16.4" r="1.2" fill="#7aff8a"/><circle cx="18.6" cy="16.4" r="1.2" fill="#7aff8a"/>
  <path d="M13.6 21.6h4.8v4.4l-2.4 1.4-2.4-1.4Z" fill="#2a1408" ${_K}/>${_ln('M14.4 21.8v4M16 21.8v4.6M17.6 21.8v4', '#f4ecd4', .8)}${_gl('M10 12.6c.6-1.4 1.8-2.2 3.2-2.4-1 1-1.8 2.2-2 4Z', .45)}`; },
cape_kanniboul: () => { const cs = ['#ff6a4a', '#ffd24a', '#5ad84a', '#4ab8ff', '#ff6a4a', '#ffd24a', '#5ad84a']; const cs2 = ['#b0142e', '#c8861a', '#1a7a2a', '#1a5aa0', '#b0142e', '#c8861a', '#1a7a2a']; return `${_sh(16, 29, 11, 1.4)}
  ${[0, 1, 2, 3, 4, 5, 6].map(i => _a3fea(7.2 + i * 2.9, 6.4 + Math.abs(i - 3) * .9, 176 - (i - 3) * -5.6 + (i < 3 ? 0 : 0) - 0, 21 - Math.abs(i - 3) * 1.2, cs[i], cs2[i])).join('')}
  <path d="M4.6 5.6c3.6 2.4 19.2 2.4 22.8 0l.4 2.8c-3.6 2.6-20 2.6-23.6 0Z" fill="#8a5a2e" ${_K}/>${_ln('M6 6.8c3.4 1.6 16.6 1.6 20 0', '#e4b57a', .6, .7)}
  <path d="M16 6.6 14.4 9.8h3.2Z" fill="#f4ecd4" ${_k}/><circle cx="9.4" cy="8" r="1" fill="#f4ecd4" ${_k}/><circle cx="22.6" cy="8" r="1" fill="#f4ecd4" ${_k}/><circle cx="16" cy="9.4" r="1.2" fill="#f4ecd4" ${_k}/>`; },
ceinture_kanniboul: () => { const a = _id(); return `<defs>${_lg(a, '#b88a56', '#5a3a1c')}</defs>${_sh(16, 23.5, 13, 1.6)}
  <path d="M1.8 11.4c4-1.2 8.4-1.6 14.2-1.6s10.2.4 14.2 1.6l-.4 9c-4 1-8.4 1.4-13.8 1.4s-9.8-.4-13.8-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M3 13.4c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#e4b57a', .6, .7)}${_ln('M3 18.8c4 .8 8.2 1.2 13 1.2s9-.4 13-1.2', '#3a2410', .7, .6)}
  ${[5.4, 9.2, 22.8, 26.6].map((x, i) => `<circle cx="${x}" cy="${15.6 + (i % 2 ? .4 : 0)}" r="1.5" fill="#f4ecd4" ${_k}/>`).join('')}
  ${_a3bone(11, 10, 21, 22, 1.8)}${_a3bone(21, 10, 11, 22, 1.8)}
  <circle cx="16" cy="16" r="3.4" fill="#f4ecd4" ${_K}/><circle cx="14.6" cy="15" r=".9" fill="#2a1408"/><circle cx="17.4" cy="15" r=".9" fill="#2a1408"/><path d="M15.2 17.8h1.6" stroke="#2a1408" stroke-width=".8"/>`; },
bottes_kanniboul: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#d8a468', '#7a4a22', 1, 0)}${_lg(b, '#6a4121', '#2a180a')}</defs>${_sh(16, 28.6, 12, 2)}
  <path d="M10 4h9.6l.6 13.8c3.2.6 7.2 2.2 7.8 5 .2 1.6-.8 3.2-2.4 3.2H8.8c-1.2 0-2-.8-2-2.2L8.2 18Z" fill="url(#${a})" ${_K}/>
  <path d="M6.6 24.8h21.8c0 1.8-1 3-2.8 3H8.8c-1.2 0-2.2-.8-2.2-3Z" fill="url(#${b})" ${_K}/>
  <path d="M22.4 22.6c.2-1.2 1.4-1.6 2.2-.8.8-.8 2-.2 2 .8" stroke="#140c06" stroke-width=".7" fill="none" opacity=".6"/><path d="M23.4 22.8v1.6M25.6 22.8v1.6" stroke="#140c06" stroke-width=".6" opacity=".5"/>
  ${_ln('M9.4 6.6 19.6 10M19.6 6.6 9.4 10M9.4 11 19.6 14.4M19.6 11 9.4 14.4M9.8 15.4 19.8 18', '#2a1408', 1.1, .85)}${_ln('M9.4 6.6 19.6 10M19.6 6.6 9.4 10', '#f0d6a6', .4, .6)}
  <circle cx="14.6" cy="8.2" r="1.3" fill="#f4ecd4" ${_k}/><circle cx="14.6" cy="12.6" r="1.3" fill="#f4ecd4" ${_k}/>
  ${_a3fea(11.6, 5, -26, 8, '#5ad84a', '#1a7a2a')}${_a3fea(13.4, 4.6, 8, 8.6, '#ff6a4a', '#b0142e')}${_gl('M10.6 8l.2 7', .35)}`; },
lance_kanniboul: () => { const s = _id(); return `<defs>${_lg(s, '#fffbe8', '#b8a870', 1, 1)}</defs>${_rod(4.6, 30, 21, 11.6, '#9a6a3a', '#3e2412', 2.3)}
  ${[[7, 27], [9.2, 24.4], [11.4, 21.8]].map(([x, y]) => `<path d="M${x - 1.5} ${y + 1.2}l3-2.4" stroke="#d8402a" stroke-width="1.4" stroke-linecap="round"/>`).join('')}
  ${_a3fea(18.6, 14.4, 224, 8.6, '#5ad84a', '#1a7a2a')}${_a3fea(17, 16, 196, 7.4, '#ff6a4a', '#b0142e')}
  <path d="M19 14.4l3.2-3.6 2.2 2-3.4 3.4Z" fill="#8a5a2e" ${_K}/>
  <path d="M21.6 11.4C22.4 6.6 26 3 30.4 2 29.6 6.4 27 10 23.6 12.4Z" fill="url(#${s})" ${_K}/>${_ln('M23 10.8c1.6-3 3.8-5.6 6.2-7', '#9a8a4a', .6, .7)}${_ln('M24 11.4c.8-1.4 1.4-2.2 2.6-3', '#fff', .5, .7)}${_spark(28, 9, '#fff', .6)}`; },
relique_kanniboul: () => { const w = _id(), g = _id(); return _halo('#5aff8a') + `<defs>${_lg(w, '#b0743a', '#4a2c14', 1, 0)}${_rg(g, '#ffffff', '#3aff7a')}</defs>
  <path d="M11.6 3.6h8.8l1 24.8c0 1-.8 1.6-1.6 1.6h-7.6c-.8 0-1.6-.6-1.6-1.6Z" fill="url(#${w})" ${_K}/>
  <path d="M9.6 4.2c0-1.8 1.2-2.6 2.8-2.2l-.6 2.2M22.4 4.2c0-1.8-1.2-2.6-2.8-2.2l.6 2.2" fill="#f4ecd4" ${_K}/>
  <path d="M5.6 12.4c3-.6 5.4 0 6.6 1.6v3.6c-2.2-1.4-4.6-1.8-6.6-1.4ZM26.4 12.4c-3-.6-5.4 0-6.6 1.6v3.6c2.2-1.4 4.6-1.8 6.6-1.4Z" fill="#d8402a" ${_K}/>${_ln('M7 13.4c1.6 0 3 .4 4 1.2M25 13.4c-1.6 0-3 .4-4 1.2', '#ffd24a', .7)}
  <circle cx="14" cy="8" r="1.6" fill="url(#${g})"/><circle cx="18" cy="8" r="1.6" fill="url(#${g})"/><path d="M13.6 11h4.8" stroke="#140c06" stroke-width="1.2"/>${_ln('M13.2 11.8 14.2 13M18.8 11.8 17.8 13', '#f4ecd4', .8)}
  <path d="M12.2 15.4h7.6M12.2 22.4h7.6" stroke="#2a1408" stroke-width="1.2"/><circle cx="14.2" cy="18.6" r="1.5" fill="url(#${g})"/><circle cx="17.8" cy="18.6" r="1.5" fill="url(#${g})"/><path d="M13.6 20.6h4.8" stroke="#140c06" stroke-width="1.1"/>
  <path d="M13.2 24.6c1.8 1 3.8 1 5.6 0" stroke="#f4ecd4" stroke-width="1" fill="none" stroke-linecap="round"/>${_ln('M12.6 4.4v22', '#e4b57a', .5, .4)}${_spark(26, 22, '#aaffc0', .9)}${_spark(5.6, 24, '#aaffc0', .7)}`; },

/* ======================= PORCOS : mafia en rose, galon et chaîne dorés ======================= */
coiffe_porcos: () => { const a = _id(), b = _id(); return `<defs>${_lg(a, '#4a4060', '#14101e')}${_lg(b, '#ff9ec0', '#d8507a')}</defs>${_sh(16, 26.6, 13.6, 1.8)}
  <path d="M2 21.6c0-2.8 6-4.8 14-4.8s14 2 14 4.8c0 2.8-6 4.8-14 4.8S2 24.4 2 21.6Z" fill="url(#${a})" ${_K}/>${_ln('M4 21c3-1.6 7.4-2.4 12-2.4s9 .8 12 2.4', '#7a6a98', .6, .7)}
  <path d="M7.4 19.8C7.2 13.4 9 9.6 12.4 8.8c1.4-.3 2.6.4 3.6.9 1-.5 2.2-1.2 3.6-.9 3.4.8 5.2 4.6 5 11-2.2 1-5 1.4-8.6 1.4s-6.4-.4-8.6-1.4Z" fill="url(#${a})" ${_K}/>
  <path d="M16 9.7c-.4 2.6-.4 5-.2 7.2" stroke="#14101e" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>${_gl('M9.4 15.4c.2-3 1.2-5 3-5.8-1 1.8-1.4 3.8-1.2 6Z', .4)}
  <path d="M8.2 16.4c2.4 1 5 1.4 7.8 1.4s5.4-.4 7.8-1.4l.2 3.2c-2.2 1-5 1.4-8 1.4s-5.8-.4-8-1.4Z" fill="url(#${b})" ${_K}/>
  <circle cx="21.4" cy="18.8" r="2.2" fill="#ffd24a" ${_K}/><ellipse cx="21.4" cy="19" rx="1.1" ry=".8" fill="#ff9ec0"/><circle cx="20.9" cy="18.9" r=".26" fill="#8a3248"/><circle cx="21.9" cy="18.9" r=".26" fill="#8a3248"/>`; },
cape_porcos: () => { const a = _id(), l = _id(); return `<defs>${_lg(a, '#8a52ac', '#2a1440')}${_lg(l, '#ffc0d4', '#d8507a')}</defs>${_sh(16, 28.8, 11.5, 2)}
  <path d="M9.4 5.6c2 1.4 11.2 1.4 13.2 0L28.4 27c-4.4 1.6-8.4.8-12.4 2.2-4-1.4-8-.6-12.4-2.2Z" fill="url(#${a})" ${_K}/>
  <path d="M16 7 12.6 28.2c1.2.2 2.4.2 3.4.6 1-.4 2.2-.4 3.4-.6Z" fill="url(#${l})" ${_K}/>
  ${_ln('M11 12l-2.4 14.4M21 12l2.4 14.4', '#c88aff', .6, .6)}${_gl('M10 10c1 3.4 1.2 7.2.6 11', .25)}
  <path d="M8.6 7.4c1-2.6 4.4-3.8 7.4-3.8s6.4 1.2 7.4 3.8l-3.4 2.4L16 7.6l-4 2.6Z" fill="#3a2054" ${_K}/>${_ln('M9.6 7c2-1.4 4.6-1.8 6.4-1.8S20.4 5.6 22.4 7', '#ffd24a', .8)}
  ${[11.4, 16.2, 21].map(y => `<circle cx="13.6" cy="${y}" r="1" fill="#ffd24a" ${_k}/><circle cx="18.4" cy="${y}" r="1" fill="#ffd24a" ${_k}/>`).join('')}`; },
ceinture_porcos: () => { const a = _id(), g = _id(); return `<defs>${_lg(a, '#8a9a4a', '#3e4a1e')}${_lg(g, '#ffe58a', '#b9801a', 1, 1)}</defs>${_sh(16, 23.5, 13, 1.6)}
  <path d="M1.8 11.4c4-1.2 8.4-1.6 14.2-1.6s10.2.4 14.2 1.6l-.4 9c-4 1-8.4 1.4-13.8 1.4s-9.8-.4-13.8-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M3 13.6c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2M3 18.6c4 .8 8.2 1.2 13 1.2s9-.4 13-1.2', '#d8e090', .6, .6)}${_ln('M3 14.2c4-.7 8.2-1.1 13-1.1', '#2a3410', .5, .6)}
  <rect x="9.8" y="7.8" width="12.4" height="14.6" rx="2.6" fill="url(#${g})" ${_K}/><rect x="11.8" y="9.8" width="8.4" height="10.6" rx="1.4" fill="#5a3a12" opacity=".35"/>
  <path d="M16 10.4l1.4 3 3.2.4-2.4 2.2.6 3.2-2.8-1.6-2.8 1.6.6-3.2-2.4-2.2 3.2-.4Z" fill="url(#${g})" ${_K}/>${_gl('M11 8.8h9', .5)}<circle cx="5.4" cy="15.8" r="1" fill="#ffd24a" ${_k}/><circle cx="26.6" cy="15.8" r="1" fill="#ffd24a" ${_k}/>`; },
amulette_porcos: () => { const g = _id(), p = _id(); return `<defs>${_lg(g, '#fff3a0', '#b9801a', 1, 1)}${_rg(p, '#ffe0e8', '#e08aa4', .4, .3, .9)}</defs>
  ${[[7.6, 3.4], [7.9, 6.4], [8.8, 9.2], [10.4, 11.6], [12.6, 13.4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="2" fill="none" stroke="#140c06" stroke-width="2.2" stroke-opacity=".9" transform="rotate(${y * 4} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="1.4" ry="2" fill="none" stroke="#ffd24a" stroke-width="1.2" transform="rotate(${y * 4} ${x} ${y})"/>`).join('')}
  ${[[24.4, 3.4], [24.1, 6.4], [23.2, 9.2], [21.6, 11.6], [19.4, 13.4]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.4" ry="2" fill="none" stroke="#140c06" stroke-width="2.2" stroke-opacity=".9" transform="rotate(${-y * 4} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="1.4" ry="2" fill="none" stroke="#ffd24a" stroke-width="1.2" transform="rotate(${-y * 4} ${x} ${y})"/>`).join('')}
  <circle cx="16" cy="21.4" r="8.6" fill="url(#${g})" ${_K}/><circle cx="16" cy="21.4" r="6.8" fill="none" stroke="#8a5a0a" stroke-width=".8"/>
  <path d="M11.4 16.6 10.4 13l3.4 1.6ZM20.6 16.6l1-3.6-3.4 1.6Z" fill="url(#${p})" ${_K}/><ellipse cx="16" cy="21.4" rx="5.2" ry="4.8" fill="url(#${p})" ${_K}/><ellipse cx="16" cy="23" rx="2.8" ry="2" fill="#f0a0b8" ${_k}/><circle cx="15" cy="23" r=".6" fill="#8a3248"/><circle cx="17" cy="23" r=".6" fill="#8a3248"/>
  <circle cx="13.6" cy="19.6" r=".8" fill="#2a1408"/><circle cx="18.4" cy="19.6" r=".8" fill="#2a1408"/>${_gl('M10.6 17.4c1.2-2 3.2-3 5.4-3.2-2 .8-3.4 2-4.2 3.8Z', .55)}`; },
rotissoire_cochon: () => { const r = _id(), f = _id(); return `<defs>${_rg(r, '#f4b46a', '#7a3a12', .4, .3, .9)}${_lg(f, '#ffe27a', '#e0501a', 0, 1)}</defs>
  ${_rod(3.6, 28.4, 28, 4.4, '#cfd4dc', '#5a6270', 1.6)}
  <path d="M3.6 28.4l-2.4-.4M3.6 28.4l-.4 2.4" stroke="#140c06" stroke-width="2.4" stroke-linecap="round"/><path d="M5.4 26.6c-2.4-1.4-3.4-.4-3.6 1.2 1-.2 1.8.2 2.4 1" stroke="#8a5a2e" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <g transform="rotate(-42 16 16.6)"><ellipse cx="16" cy="16.6" rx="9" ry="5.4" fill="url(#${r})" ${_K}/>
  <path d="M9 14.6c3.4-2.4 11-2.4 14.4 0" stroke="#ffe0a0" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/><circle cx="13" cy="18" r=".9" fill="#5a2a0a" opacity=".5"/><circle cx="18.4" cy="19" r=".8" fill="#5a2a0a" opacity=".5"/><circle cx="21" cy="17" r=".7" fill="#5a2a0a" opacity=".5"/>
  <path d="M10.8 20.6l-.4 3.4 2.4 0 .4-3ZM19.4 21l.4 3 2.4 0-.2-3.4Z" fill="url(#${r})" ${_K}/>
  <path d="M24.6 13.4 27.4 12l-.2 2.8Z" fill="#e8a05a" ${_K}/><ellipse cx="26.6" cy="16.6" rx="3.4" ry="3.2" fill="url(#${r})" ${_K}/><ellipse cx="29" cy="17" rx="1.6" ry="1.5" fill="#f0a0a8" ${_k}/><circle cx="26.4" cy="15.2" r=".7" fill="#2a1408"/>
  <path d="M7 15.6 4.4 14.6c-1 1.6.4 3 2.6 3Z" fill="#c8824a" ${_K}/></g>
  ${_gl('M8.6 14.6c2-3 5-4.4 8-4.2', .35)}
  <path d="M19 31c-2.6-1-3.6-3.4-2.2-6 .6 1.6 1.6 2 2.2 1.4 0-2.6 1-4.2 2.6-5.2 0 2 1.4 2.6 1.8 3.8 1 .6 1.6.2 2-.8 1.4 2.2.4 5.6-2.4 6.8Z" fill="url(#${f})" ${_K}/><path d="M22.4 30c-1.2-.6-1.6-1.8-1-3 .6.6 1 .6 1.4.2.4.8 1.2 1.2 1.2 2.2Z" fill="#fff3a0"/>`; },
relique_porcos: () => { const g = _id(), w = _id(); return _halo('#ffd54a') + `<defs>${_rg(g, '#fff3a0', '#c8861a', .4, .3, .9)}${_lg(w, '#ff7a6a', '#a8122a', 1, 1)}</defs>
  <path d="M10 14C6.6 8 2.6 8 3.6 4c4 0 8.4 2.4 10.4 6.4Z" fill="url(#${w})" ${_K}/><path d="M22 14c3.4-6 7.4-6 6.4-10-4 0-8.4 2.4-10.4 6.4Z" fill="url(#${w})" ${_K}/>${_ln('M5.4 5.6c3 .6 5.6 2.4 7 4.8M26.6 5.6c-3 .6-5.6 2.4-7 4.8', '#ffc0b0', .6, .7)}
  <path d="M7.6 16.4c0-4 4-6.6 8.6-6.6s8.6 2.6 8.6 6.6c0 2.2-.8 3.8-2 5.2l.2 4.6h-3.8l-.4-2.4c-1.6.6-3.2.8-4.6.8s-3-.2-4.6-.8l-.4 2.4H9.4l.2-4.6c-1.2-1.4-2-3-2-5.2Z" fill="url(#${g})" ${_K}/>
  <path d="M23.4 14.2c3.2.2 4.4 2 4.2 4.4-2.2.4-4-.4-4.8-2Z" fill="url(#${g})" ${_K}/><ellipse cx="26.4" cy="16.4" rx="2.2" ry="2.8" fill="#ffd8a0" ${_K}/><circle cx="25.8" cy="15.6" r=".5" fill="#8a5a0a"/><circle cx="25.8" cy="17.4" r=".5" fill="#8a5a0a"/>
  <path d="M7.8 14.4c-2 .2-3.4 1.6-2.8 3.2 1-.2 1.6-.8 1.8-1.6" stroke="#8a5a0a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M19 11.6 21 9 22.6 12.4Z" fill="url(#${g})" ${_K}/><circle cx="21.4" cy="14" r=".9" fill="#2a1408"/>
  <path d="M11.4 11.4h6" stroke="#5a3a0a" stroke-width="1.6" stroke-linecap="round"/><circle cx="14.4" cy="6" r="2.6" fill="#ffe58a" ${_K}/><path d="M14.4 4.6v2.8" stroke="#a8741f" stroke-width=".8"/>
  ${_gl('M9.6 14.4c1.2-2 3-3 5.2-3.2-1.8.8-3 2-3.8 3.8Z', .6)}${_spark(27, 26, '#fff', .9)}${_spark(5, 26, '#fff3a0', .8)}`; },

/* ======================= DRAGOEUF : coquille, ailes dorées, braise ======================= */
coiffe_dragoeuf: () => { const a = _id(); return `<defs>${_rg(a, '#f0f8b0', '#7a9a2e', .4, .3, 1)}</defs>${_sh(16, 28.4, 11, 1.8)}
  <path d="M5.4 24.4C4 18 4.4 14 5.8 10.6c.4-1 1.6-1.2 2.2-.4l2 3 2-5.6 2.2 4 2-6.4 2.2 6 2.2-4.6 2 5.4 2-2.6c.8-.8 2-.4 2.2.6 1.2 3.6 1.2 8.4-.2 14.4-1.8 1.8-5.8 2.8-10.4 2.8s-8.6-1-10.2-2.8Z" fill="url(#${a})" ${_K}/>
  <path d="M6 12.4c3-2.6 17-2.6 20 0" stroke="#3a4a14" stroke-width="1" fill="none" opacity=".5"/>
  ${[[9, 19, 1.6], [14, 23, 1.2], [20, 18, 1.8], [23.6, 23.6, 1.3], [16, 16.6, 1.2], [11, 25.4, 1]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4a5e1a" opacity=".5"/>`).join('')}
  ${_gl('M7.6 17c.4-2.4 1.4-4.2 3.2-5.4-.8 1.8-1.2 4-1 6.4Z', .6)}
  <path d="M6.4 11.6 4.6 5.4 9.4 9.4ZM25.6 11.6l1.8-6.2-4.8 4Z" fill="#fff4d0" ${_K}/><path d="M13 7.4l1.4-3 1.2 3.6Z" fill="#fff4d0" ${_k}/>${_ln('M8 24.6c2.6 1.4 5.6 2 8 2s5.4-.6 8-2', '#4a5e1a', .6, .5)}`; },
cape_dragoeuf: () => { const w = _id(); const wing = `<path d="M16 5.6C12.4 2.6 6 2.2 1 6.2c2.4.2 3.4 1.4 3.4 3.2 2-.6 3.6.2 4 2 1.6-.6 3 .2 3.4 1.8 1.4-.4 2.4.4 2.6 1.6-.2 3.4-.2 7.6 1.6 10.8 1 1 1.8.4 2-1V5.6Z" fill="url(#${w})" ${_K}/><path d="M15.8 7 3.6 7.6M15.6 9.6 6.6 11.6M15.4 12.4 10 14.6M15.4 16.2 12.6 18.4" stroke="#8a4a08" stroke-width=".8" fill="none" opacity=".75" stroke-linecap="round"/><path d="M15.6 6.6C11 3.6 5.6 3.6 2.6 6" stroke="#fff6c8" stroke-width=".7" fill="none" opacity=".8"/>`; return `<defs>${_lg(w, '#ffe27a', '#d8861a', 1, 1)}</defs>${_sh(16, 29, 11, 1.6)}
  <g>${wing}</g><g transform="translate(32 0) scale(-1 1)">${wing}</g>
  <path d="M13.4 3.8h5.2l1.2 20.4c-1.2 1.4-2.4 2-3.8 3.6-1.4-1.6-2.6-2.2-3.8-3.6Z" fill="#b82a1a" ${_K}/><path d="M16 5v21" stroke="#ff9a7a" stroke-width=".6" opacity=".6"/>
  <circle cx="16" cy="8.4" r="3" fill="#ffd24a" ${_K}/><circle cx="16" cy="8.4" r="1.6" fill="#ff4a2a"/><circle cx="15.5" cy="7.8" r=".5" fill="#fff"/>`; },
amulette_dragoeuf: () => { const f = _id(), g = _id(); return `<defs>${_lg(f, '#ffe27a', '#e0301a', 0, 1)}${_lg(g, '#fff3a0', '#b9801a', 1, 1)}</defs>${_a3chain('#e8c25a', '#8a6a22')}
  <path d="M16 14.4c-1.6 1.2-2.2 2.2-2.2 3.6 1-.4 1.6-1 1.8-2l.4-1.6Z" fill="url(#${g})" ${_k}/>
  <path d="M16 13c4.2 3.6 6.6 6.6 6.6 10.2 0 3.6-2.8 6-6.6 6s-6.6-2.4-6.6-6c0-2.4 1-4.2 2.6-5.8.2 1.8 1 2.6 2 2.8C14 20 15 16.6 16 13Z" fill="url(#${g})" ${_K}/>
  <path d="M16 16c3 2.6 4.6 4.8 4.6 7.4 0 2.6-2 4.4-4.6 4.4s-4.6-1.8-4.6-4.4c0-1.8.8-3 1.8-4 .2 1.2.8 1.8 1.4 2 .6-1.6 1.2-3.6 1.4-5.4Z" fill="url(#${f})" ${_K}/>
  <path d="M16 21c1.2 1.2 1.8 2.2 1.8 3.2 0 1.2-.8 1.8-1.8 1.8s-1.8-.6-1.8-1.8c0-.6.4-1.2 1-1.8.2.6.4.8.8.6Z" fill="#fff3a0"/>${_gl('M12.6 20.4c.6-1.4 1.6-2.4 3-3-1 1.2-1.6 2.6-1.8 4.2Z', .6)}${_spark(24.6, 14, '#ffd27a', .8)}`; },
anneau_dragoeuf: () => { const a = _id(), o = _id(); return `<defs>${_lg(a, '#ffe58a', '#a8741f')}${_rg(o, '#ffffff', '#b8a0ff', .35, .3, .9)}</defs>${_sh(16, 27, 9)}
  <ellipse cx="16" cy="19.6" rx="8.8" ry="9" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.2"/><ellipse cx="16" cy="19.6" rx="8.8" ry="9" fill="none" stroke="url(#${a})" stroke-width="3.6"/>
  ${_ln('M8.8 22c1.4 4 4.4 5.6 7.2 5.6', '#6a4510', 1, .6)}${_ln('M7.4 20.4c.8.6 1.6.6 2.4 0M9 24c.8.6 1.6.6 2.4 0M22.2 24c.8.6 1.6.6 2.4 0M22.4 20.4c.8.6 1.6.6 2.4 0', '#8a5a0a', .7, .7)}
  <path d="M8.6 11.4 6 6.4l5 2.4ZM23.4 11.4 26 6.4l-5 2.4Z" fill="url(#${a})" ${_K}/><path d="M9 12.6c0-3 3-5.2 7-5.2s7 2.2 7 5.2c-2 1.4-4.4 2-7 2s-5-.6-7-2Z" fill="url(#${a})" ${_K}/>
  <ellipse cx="16" cy="9.6" rx="3.4" ry="2.8" fill="url(#${o})" ${_K}/><path d="M14 9.2c.8-1.2 2-1.6 3.2-1" stroke="#fff" stroke-width=".8" fill="none"/><path d="M15 11c1.2.6 2.4.4 3.2-.6" stroke="#9a7aff" stroke-width=".6" fill="none"/><circle cx="17.4" cy="10.4" r=".5" fill="#ff9ec4"/>`; },
croc_crocabulia: () => { const t = _id(), h = _id(), g = _id(); return `<defs>${_lg(t, '#fffbe8', '#c8b87a', 1, 1)}${_lg(h, '#6a9a3a', '#2a4a14')}${_lg(g, '#ffe58a', '#b9801a', 1, 1)}</defs>
  ${_rod(4, 29.6, 11.6, 20, '#6a9a3a', '#2a4a14', 3)}${_ln('M5.8 27l2.8 1.2M7.4 24.8l2.8 1.2M9 22.6l2.6 1.2', '#d8c46a', .7, .8)}<circle cx="4" cy="29.6" r="1.7" fill="url(#${g})" ${_K}/>
  <path d="M8.6 20.4 12 16.8l4.2 3.8-3.4 3.8Z" fill="url(#${g})" ${_K}/>
  <path d="M10.6 18.4C11 10.6 18 4.8 29.6 2.2c-2.6 6.2-3.8 9-6 13C21.4 19.4 18 22.6 13 24.2Z" fill="url(#${t})" ${_K}/>
  ${_ln('M13.2 17.6c2.6-4.6 7.6-8.4 14.2-11.8', '#a8985a', .6, .7)}${_ln('M12 19.8c.8-.6 1.8-.8 2.6-.4M14.4 17.6c.8-.8 1.8-1 2.8-.6', '#b8a86a', .5, .7)}${_gl('M12.6 15.6c2.2-3.6 6-6.6 11.6-9-3.2 3.4-6 6.8-8.4 10.6Z', .45)}${_spark(5.4, 8.4, '#fff', .7)}`; },
relique_dragoeuf: () => { const e = _id(), l = _id(); return _halo('#9bff7a') + `<defs>${_rg(e, '#e0f8a0', '#2e6a1e', .4, .3, .95)}${_lg(l, '#fff3a0', '#ff7a1e', 0, 1)}</defs>
  <path d="M3.6 16c3.6.2 5.6 2.2 6.4 4.8M4.6 21.6c3 0 5 1.4 6 3.6" stroke="#140c06" stroke-width="3.2" stroke-linecap="round" fill="none" stroke-opacity=".85"/>
  <path d="M2 14c5-1 8 .8 9 5-4.4 1-7.6-.8-9-5ZM3 20.8c4.4-.8 7.6.6 8.4 4.6-4 .6-7-1-8.4-4.6Z" fill="#2ab8a0" ${_K}/>
  <path d="M16 3.4c6 0 10.8 8.2 10.8 15 0 5.8-4.6 9.8-10.8 9.8S5.2 24.2 5.2 18.4c0-6.8 4.8-15 10.8-15Z" fill="url(#${e})" ${_K}/>
  ${[[11, 12, 1.5], [20, 11, 1.2], [9.6, 20, 1.3], [22, 19, 1.7], [16, 24, 1.2], [14.6, 8.4, 1]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a5a14" opacity=".5"/>`).join('')}
  <path d="M16 6.2l-1.8 4.4 3.2 2.4-3 3 3.4 2.8-2.4 4.2 2.6 3" stroke="#140c06" stroke-width="2.6" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity=".8"/><path d="M16 6.2l-1.8 4.4 3.2 2.4-3 3 3.4 2.8-2.4 4.2 2.6 3" stroke="url(#${l})" stroke-width="1.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M12.8 14.6c-2 .2-3.6 1.2-4.4 3" stroke="#ffe27a" stroke-width=".8" fill="none" opacity=".8"/>${_gl('M9.4 11.4c1.2-2.4 3.2-4 5.4-4.6-1.8 1.4-3.2 3.6-3.8 6.2Z', .6)}
  <path d="M23.4 5.4l2.2-3 .8 3.6ZM26.4 9l3-.8-1.8 2.8Z" fill="#ffc82e" ${_k}/>${_spark(27, 24, '#ffe27a', .9)}`; },

/* ======================= MANSOT : fourrure givrée, cristaux de glace ======================= */
coiffe_mansot: () => { const f = _id(), d = _id(), c = _id(); return `<defs>${_rg(f, '#ffffff', '#a8c4e4', .4, .3, .95)}${_rg(d, '#4a5a80', '#14203a', .5, .4, .9)}${_lg(c, '#f4fdff', '#3a92d0', 1, 1)}</defs>${_sh(16, 28.6, 10.5, 1.6)}
  <path d="${_a3fur(16, 16.6, 11.4, 11.4, 10, 1.6)}" fill="url(#${f})" ${_K}/>
  <path d="M9.6 17.4c-.4-5 2.4-8.4 6.4-8.4s6.8 3.4 6.4 8.4c-.2 4.6-2.6 7.2-6.4 7.2s-6.2-2.6-6.4-7.2Z" fill="url(#${d})" ${_K}/>
  <path d="M12.4 17.4c1 -.8 2-.8 3 0M16.6 17.4c1-.8 2-.8 3 0" stroke="#7ae0ff" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="13.9" cy="17" r=".8" fill="#fff"/><circle cx="18.1" cy="17" r=".8" fill="#fff"/>
  ${_ln('M10.6 11c2-2.6 4.6-3.4 7-2.8M21.4 11.6c-.6-1.2-1.4-2.2-2.4-2.8', '#fff', .9, .75)}
  <path d="M16 1.8 19.6 5.4 16 10.4 12.4 5.4Z" fill="url(#${c})" ${_K}/>${_ln('M16 2.4v7.4M13.2 5.4h5.6', '#fff', .6, .8)}${_spark(26.6, 7, '#bff6ff', .8)}`; },
cape_mansot: () => { const f = _id(), n = _id(), c = _id(); return `<defs>${_rg(f, '#ffffff', '#9fbede', .4, .3, 1)}${_lg(n, '#4a6a9a', '#14203a')}${_lg(c, '#f4fdff', '#3a92d0', 1, 1)}</defs>${_sh(16, 29, 11.4, 1.8)}
  <path d="M8.6 6c2.4 1.6 12.4 1.6 14.8 0l6 19.4-3 2.4-2.2-2.6-2 3.6-2.4-3.2-2.2 3.6-2.2-3.2-2.2 3.6-2-3.6-2.4 2.6-2.6-2.4Z" fill="url(#${f})" ${_K}/>
  <path d="M10 8c1.6 1 10.4 1 12 0l.6 2.4c-3 1.2-10 1.2-13.2 0Z" fill="url(#${n})" opacity="0"/>
  ${_ln('M11.6 12c.6 4.4.4 8.6-.6 12.4M16 11.4v14.4M20.4 12c-.6 4.4-.4 8.6.6 12.4', '#8aaad0', .8, .55)}${_gl('M11 11.4c.8 3 1 6.4.4 9.6', .5)}
  <path d="${_a3fur(16, 8, 12.2, 4.4, 10, 1.4)}" fill="url(#${f})" ${_K}/><path d="M9 7.6c2.2 1.4 11.8 1.4 14 0l-.2 2c-3.6 1.4-10 1.4-13.6 0Z" fill="url(#${n})" ${_k}/>
  <path d="M16 6.8 18.6 9.6 16 13.6 13.4 9.6Z" fill="url(#${c})" ${_K}/>${_ln('M16 7.4v5.4M14 9.6h4', '#fff', .5, .8)}${_spark(27, 16, '#bff6ff', .8)}`; },
bottes_mansot: () => { const a = _id(), f = _id(); return `<defs>${_lg(a, '#d8f2ff', '#4a8ac8', 1, 0)}${_rg(f, '#ffffff', '#a8c4e4', .4, .3, 1)}</defs>${_sh(16, 28.6, 12, 2)}
  <path d="M10 5h10l.6 12.8c3.4.8 7.2 2.4 7.8 5.2.4 2-1 3.8-3 3.8H8.8c-1.6 0-2.8-1-2.6-2.6L8 18.4Z" fill="url(#${a})" ${_K}/>
  <path d="M6.4 25.4h22.2c0 1.8-1.2 3-3 3H8.8c-1.4 0-2.4-.8-2.4-3Z" fill="#2a4a78" ${_K}/>${_ln('M8 26.6h19', '#9ed6ff', .6, .7)}
  <path d="${_a3fur(15, 6.6, 7.4, 3.4, 7, 1.4)}" fill="url(#${f})" ${_K}/>
  <path d="M22.6 22.4 25.4 17l1.2 5.6ZM25.6 23.4 29.4 19.6l-.6 4.6Z" fill="#cfeeff" ${_K}/>${_ln('M25.4 18.2l.2 3.4', '#fff', .5, .8)}
  <path d="M14.4 12.6v6M11.8 14.1l5.2 3M17 14.1l-5.2 3" stroke="#fff" stroke-width=".9" stroke-linecap="round"/>${_gl('M10.6 10.6l.2 6.4', .55)}${_spark(5, 16, '#bff6ff', .7)}`; },
ceinture_mansot: () => { const a = _id(), c = _id(); return `<defs>${_lg(a, '#5a7ab0', '#1a2a50')}${_lg(c, '#f4fdff', '#2a82c8', 1, 1)}</defs>${_sh(16, 23.5, 13, 1.6)}
  <path d="M1.8 11.4c4-1.2 8.4-1.6 14.2-1.6s10.2.4 14.2 1.6l-.4 9c-4 1-8.4 1.4-13.8 1.4s-9.8-.4-13.8-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M3 13.4c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#9ed6ff', .6, .7)}${_ln('M3 18.8c4 .8 8.2 1.2 13 1.2s9-.4 13-1.2', '#0a1430', .7, .6)}
  ${[[5.4, 15.4], [9.4, 15.8], [22.6, 15.8], [26.6, 15.4]].map(([x, y]) => `<path d="M${x} ${y - 2.4} ${x + 1.6} ${y} ${x} ${y + 2.4} ${x - 1.6} ${y}Z" fill="url(#${c})" ${_k}/>`).join('')}
  <path d="M16 6.4 21.6 10.6 21.6 20.4 16 24.6 10.4 20.4 10.4 10.6Z" fill="url(#${c})" ${_K}/><path d="M16 9.4 19 11.8 19 19.2 16 21.6 13 19.2 13 11.8Z" fill="#7acaff" opacity=".6"/>${_ln('M16 6.6v17.8M10.6 10.8 21.4 20.2M21.4 10.8 10.6 20.2', '#fff', .5, .7)}${_gl('M11.4 11l4-3', .6)}${_spark(27, 6, '#bff6ff', .8)}`; },
masse_mansot: () => { const c = _id(), g = _id(); return `<defs>${_lg(c, '#f4fdff', '#2a82c8', 1, 1)}${_lg(g, '#ffe58a', '#b9801a', 1, 1)}</defs>
  ${_rod(5.6, 29.6, 17.6, 15.4, '#6a8ac8', '#1a2a50', 2.5)}${_ln('M7.6 27l1.8 1.4M9.6 24.4l1.8 1.4M11.6 22l1.8 1.4', '#bfe6ff', .7, .8)}
  <path d="M14.6 19.4 17.4 15.4 20.2 17.6 17 21.4Z" fill="url(#${g})" ${_K}/>
  <path d="M17.4 9.4 21.6 4.4 27.6 4.4 30.6 9.4 26.4 14.4 20.4 14.4Z" fill="url(#${c})" ${_K}/>
  <path d="M21.6 4.4 20.4 14.4M27.6 4.4 26.4 14.4M17.4 9.4H30.6" stroke="#fff" stroke-width=".7" opacity=".8"/><path d="M19 9.4l2.6-4.4h6" fill="#fff" opacity=".35"/>
  <path d="M15.4 8.4 18.6 9.4 17.6 12.4ZM29.4 4 32 6 29.6 7.6Z" fill="#cfeeff" ${_k}/>
  <path d="M19.4 4.6 20.6 1.4 22.2 4.4 24.6 .8 26 4.4 28.2 2 28.4 4.6" fill="url(#${g})" ${_K}/>${_spark(30, 15, '#bff6ff', .9)}${_spark(14, 5, '#ffffff', .7)}`; },
relique_mansot: () => { const h = 'M16 28.6C5 21 2.4 14.6 4.6 10.2 6.8 6 13 5.8 16 10c3-4.2 9.2-4 11.4.2 2.2 4.4-.4 10.8-11.4 18.4Z'; const g = _id(), cp = _id(); return _halo('#8fe0ff') + `<defs><clipPath id="${cp}"><path d="${h}"/></clipPath>${_rg(g, '#ffffff', '#3a9ae0', .4, .25, .95)}</defs>
  <path d="${h}" fill="url(#${g})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="M2 4 16 10 9 18 2 12Z" fill="#fff" opacity=".4"/><path d="M16 10 30 4v8l-7 6Z" fill="#9ee0ff" opacity=".5"/><path d="M9 18 16 10 23 18 16 29Z" fill="#2a6ac8" opacity=".35"/></g>
  <path d="M16 10 9 18 16 28.6 23 18Z" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>
  <g stroke="#fff" stroke-width="1.1" stroke-linecap="round" fill="none"><path d="M16 12.6v10.8M10.8 15.4 21.2 20.6M21.2 15.4 10.8 20.6"/><path d="M14.6 13.6 16 15l1.4-1.4M14.6 22.4 16 21l1.4 1.4M12 16.4l2.2.2-.4-2.2M20 19.6l-2.2-.2.4 2.2M12 19.6l1.8-1.2.4 2.2M20 16.4l-1.8 1.2-.4-2.2"/></g>
  ${_gl('M6.6 11c.8-2 2.6-3 4.6-2.6-1.8.6-3.2 1.8-4 3.8Z', .85)}${_spark(27.6, 22, '#fff', .9)}${_spark(5, 25, '#bff6ff', .8)}`; },
});

/* petits helpers utilisés plus haut (définis après coup : appelés seulement à l'affichage) */
function _a3furTufts() { return [[10.8, 9.6], [21.2, 9.6]].map(([x, y]) => `<path d="M${x - 1.6} ${y + 2.6}c-.4-1.8.4-3.2 1.6-4 .8 1.2 1 2.6.6 4Z" fill="#fff" ${_k}/>`).join(''); }
function _a3blobMini(x, y) { return `<ellipse cx="${x - .9}" cy="${y - .3}" rx=".5" ry=".7" fill="#7a0a1e"/><ellipse cx="${x + .9}" cy="${y - .3}" rx=".5" ry=".7" fill="#7a0a1e"/>`; }

/* Reliques : même cadre doré rayonnant que les autres (voir art2.js) */
Object.assign(_RELIC_COL, {
  relique_wabbit: ['#ffa8d0', '#e0508a'], relique_blop: ['#c8a8ff', '#6a4ae0'], relique_kanniboul: ['#7affa0', '#1a9a4a'],
  relique_porcos: ['#ffe27a', '#e0a01a'], relique_dragoeuf: ['#b0ff8a', '#4a9a1a'], relique_mansot: ['#a8eaff', '#3a8ee0']
});
for (const id of ['relique_wabbit', 'relique_blop', 'relique_kanniboul', 'relique_porcos', 'relique_dragoeuf', 'relique_mansot']) {
  const raw = ITEM_ART[id];
  const [c1] = _RELIC_COL[id];
  ITEM_ART[id] = () => {
    const body = raw().replace(/<circle cx="16" cy="16" r="14"[^>]*\/><circle cx="16" cy="16" r="10\.5"[^>]*\/>/, '');
    return _relicFrame(id) + `<g transform="translate(16 16.4) scale(.72) translate(-16 -16)">${body}</g>` + _spark(4.6, 6, '#fff', .9) + _spark(27.6, 8.4, c1, .8) + _spark(26.8, 26, '#fff', .7) + _spark(5.4, 25.4, c1, .6);
  };
}

/* Couleur d'identité des nouvelles panoplies */
Object.assign(SET_COL, { wabbit: '#ffb3e6', blop: '#a98aff', kanniboul: '#34d399', porcos: '#ffd24a', dragoeuf: '#ff4f6e', mansot: '#c9e4ff' });
