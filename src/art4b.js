/* =====================================================================
   ICÔNES D'ÉQUIPEMENT v4b — Dunes des Ossements & Mines d'Ocre
   Dunes : or, lapis-lazuli, turquoise, lin blanc, cornaline, scarabée, ankh, œil d'Horus
   Mines : cuir brun, fer gris, ocre orange, cristal d'ocre à cœur cyan, lampe jaune
   Complète ITEM_ART (art.js / art2.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _rod, _gem, _spark…).
   Helpers locaux préfixés _b4 (tous les fichiers sont concaténés dans la même portée).
   ===================================================================== */
/* dégradé à 3 arrêts */
const _b4lg3 = (id, a, b, c, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
/* perles alignées sur un tracé : trait épais en pointillés ronds (contour sombre dessous, perle colorée dessus) */
const _b4beads = (d, c, w = 2, gap = 2.4) => `<path d="${d}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="${w + .8}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/>`;
/* scarabée d'or aux ailes déployées (centré en x,y ; largeur d'ailes ≈ 20 × s) */
const _b4scarab = (x, y, s = 1) => {
  const w = _id(), b = _id();
  const wing = `<path d="M-1.4-1.2C-3.4-4.8-7.4-5.6-10.2-4.2-9-1.6-5.2-.2-1.4.6Z" fill="url(#${w})" ${_K}/><path d="M-1.4 1C-4.6.8-8.2 2-9.2 4.4-6.4 4.6-3.2 3.2-1.4 2Z" fill="url(#${w})" ${_K}/>${_ln('M-3-1.8-8-3.6M-3-.6-8.4-1.2M-3 2.6-7 3.6', '#8a5a0a', .5, .85)}`;
  return `<defs>${_b4lg3(w, '#fff6bc', '#e8b84a', '#946410', 0, 1)}${_lg(b, '#9ff5e6', '#0e6a8a', 1, 1)}</defs><g transform="translate(${x} ${y}) scale(${s})">${wing}<g transform="scale(-1 1)">${wing}</g>
  <path d="M0-4.2c1.9 0 2.8 1.4 2.8 3.4 0 2.2-1.1 4.2-2.8 5.4-1.7-1.2-2.8-3.2-2.8-5.4 0-2 .9-3.4 2.8-3.4Z" fill="url(#${b})" ${_K}/><path d="M0-3.6v8.2M-2.2-.6h4.4" stroke="#0a3a52" stroke-width=".5" opacity=".7"/>
  <path d="M-1.6-3.8a1.6 1.4 0 0 1 3.2 0Z" fill="#e8b84a" ${_k}/>${_gl('M-1.8-1.4c.2-1.2.8-2 1.4-2.2-.2 1-.4 2-.4 3.2Z', .7)}</g>`;
};
/* tête de faucon de profil (regarde à droite ; flip = -1 pour la gauche) */
const _b4falcon = (x, y, flip = 1, s = 1) => { const g = _id(); return `<defs>${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 1, 1)}</defs><g transform="translate(${x} ${y}) scale(${flip * s} ${s})">
  <path d="M-3 4.6C-3.8 1.4-2.8-1.8-.2-2.6 2-3.2 3.4-1.8 3.4-.2 4.6.2 5.4 1.4 5 2.8 4.4 2.2 3.4 2 2.6 2.4 2.4 3.4 2 4.2 1.6 4.6Z" fill="url(#${g})" ${_K}/>
  <circle cx="1" cy="-.2" r=".8" fill="#140c06"/><path d="M.2 1 -.8 3.4M-1.4-1.4 2.2-1.4" stroke="#2a5fd0" stroke-width=".7" stroke-linecap="round"/><path d="M-2.2 3.4h3" stroke="#2a5fd0" stroke-width=".7" opacity=".9"/>${_gl('M-1.6-1.6c.6-.8 1.6-1 2.4-.8-1 .2-1.8.8-2.2 1.8Z', .6)}</g>`; };
/* cristal d'ocre prismatique (base en x,y, hauteur h, penché de rot°) */
const _b4crys = (x, y, w, h, rot = 0, c = ['#ffe6a0', '#ffb43a', '#b4560a'], core = null) => {
  const [l, m, d] = c, a = w / 2, t = w / 6;
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M${-a} 0V${-h * .7}L${-t} ${-h * .88}V0Z" fill="${l}"/><path d="M${-t} 0V${-h * .88}L0 ${-h}L${t} ${-h * .88}V0Z" fill="${m}"/><path d="M${t} 0V${-h * .88}L${a} ${-h * .7}V0Z" fill="${d}"/>
  ${core ? `<path d="M${-t * .8} ${-h * .12}V${-h * .62}L0 ${-h * .76}L${t * .8} ${-h * .62}V${-h * .12}Z" fill="${core}" opacity=".95"/>` : ''}
  <path d="M${-a} 0V${-h * .7}L0 ${-h}L${a} ${-h * .7}V0Z" fill="none" ${_K}/><path d="M${-t} ${-h * .88}V0M${t} ${-h * .88}V0" stroke="#140c06" stroke-opacity=".35" stroke-width=".5"/>
  <path d="M${-a + .7} ${-h * .12}V${-h * .66}" stroke="#fff" stroke-width=".8" stroke-linecap="round" opacity=".75"/></g>`;
};

Object.assign(ITEM_ART, {
/* ======================= DUNES : or, lapis-lazuli, lin blanc ======================= */
coiffe_dunes: () => { const g = _id(), n = _id(), cp = _id(), v = _id(); const body = 'M16 3.2C10.4 3.2 6.8 6.6 6.4 12.4L4.4 25.4C5.8 27.4 8.6 27.4 11 25.8L11.4 16.2C12.8 16.8 14.4 17 16 17S19.2 16.8 20.6 16.2L21 25.8C23.4 27.4 26.2 27.4 27.6 25.4L25.6 12.4C25.2 6.6 21.6 3.2 16 3.2Z';
  return `<defs>${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 1, 1)}${_lg(v, '#2a1a0c', '#080503')}<clipPath id="${cp}"><path d="${body}"/></clipPath></defs>${_sh(16, 28.8, 12.5, 1.8)}
  <path d="M11.4 16.2C12.8 16.8 14.4 17 16 17S19.2 16.8 20.6 16.2L21 26C19.4 26.6 17.8 26.8 16 26.8S12.6 26.6 11 26Z" fill="url(#${v})" ${_k}/>
  <path d="${body}" fill="url(#${g})"/>
  <g clip-path="url(#${cp})" fill="none" stroke="#2a5fd0" stroke-width="1.7" stroke-linecap="round">${[4.4, 7.8, 11.2, 14.6, 18, 21.4, 24.8, 28.2].map(y => `<path d="M0 ${y - 2}Q16 ${y + 3} 32 ${y - 2}"/>`).join('')}</g>
  <g clip-path="url(#${cp})" fill="none" stroke="#0e2a78" stroke-width=".5" opacity=".6">${[4.4, 7.8, 11.2, 14.6, 18, 21.4, 24.8, 28.2].map(y => `<path d="M0 ${y - 1.2}Q16 ${y + 3.8} 32 ${y - 1.2}"/>`).join('')}</g>
  <path d="${body}" fill="none" ${_K}/>
  ${_ln('M11.4 16.2L11 25.8M20.6 16.2L21 25.8', '#140c06', .8, .7)}
  <path d="M6.4 10.8C9 13.8 23 13.8 25.6 10.8L26 14.2C23 17.6 9 17.6 6 14.2Z" fill="url(#${g})" ${_K}/>${_ln('M7.4 12.4c3 2.6 14.2 2.6 17.2 0', '#946410', .6, .8)}
  <circle cx="8.4" cy="12.9" r=".9" fill="#2a5fd0" ${_k}/><circle cx="23.6" cy="12.9" r=".9" fill="#2a5fd0" ${_k}/>
  ${_b4scarab(16, 11.6, .78)}
  ${_gl('M9.4 9c1.2-3 3.6-4.4 6.6-4.6-2.6 1.2-4.4 3-5.2 5.4Z', .5)}${_ln('M5.6 22.6c-.2 1.4.2 2.2 1 2.8M26.4 22.6c.2 1.4-.2 2.2-1 2.8', '#fff', .6, .45)}`; },
cape_dunes: () => { const n = _id(), g = _id(), l = _id(); const edge = 'M4.2 25.6c1.6.8 3.4.8 5 .4 1.4 1.8 3.8 2.6 6.8 2.6s5.4-.8 6.8-2.6c1.6.4 3.4.4 5-.4';
  return `<defs>${_lg(n, '#fffdf0', '#cdb98a', 1, 1)}${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 1, 1)}${_lg(l, '#6a9aff', '#143a9a', 1, 1)}</defs>${_sh(16, 29.8, 11.5, 1.5)}
  <path d="M9 5.2C11.6 7 20.4 7 23 5.2L27.8 25.6c-1.6.8-3.4.8-5 .4-1.4 1.8-3.8 2.6-6.8 2.6s-5.4-.8-6.8-2.6c-1.6.4-3.4.4-5-.4Z" fill="url(#${n})" ${_K}/>
  ${_ln('M12.4 8.6 10.2 25M16 9.4V27.8M19.6 8.6 21.8 25', '#a8925a', .7, .75)}${_ln('M13.4 9 11.8 24M18.6 9 20.2 24', '#fff', .55, .7)}
  ${_ln('M8.6 13.4c5 2.2 10.8 2.2 14.8 0M7.6 17.6c5.6 2.4 12.4 2.4 16.8 0M6.8 21.8c6 2.4 12.8 2.4 18.4 0', '#c4ad78', .55, .8)}
  ${_ln('M9 5.6 4.6 25M23 5.6 27.6 25', '#140c06', 2.4, .9)}${_ln('M9 5.6 4.6 25M23 5.6 27.6 25', '#e8b84a', 1.3)}
  ${_ln(edge, '#140c06', 2.8, .9)}${_ln(edge, '#e8b84a', 1.6)}${_ln(edge, '#fff6bc', .5, .7)}
  ${[7.4, 11.6, 16, 20.4, 24.6].map((x, i) => `<circle cx="${x}" cy="${[26.4, 27.6, 28, 27.6, 26.4][i]}" r=".85" fill="#2a5fd0" ${_k}/>`).join('')}
  <path d="M8 4.6C9.6 10.6 22.4 10.6 24 4.6l1.8.8C24.4 12.6 19.6 14.4 16 14.4S7.6 12.6 6.2 5.4Z" fill="url(#${g})" ${_K}/>
  ${_b4beads('M9.6 6.8C11.6 11 20.4 11 22.4 6.8', '#2a5fd0', 1.6, 2)}${_b4beads('M8.4 5.8C10.2 12 21.8 12 23.6 5.8', '#3fd8c4', 1.2, 1.9)}
  ${_gem(16, 12.4, 1.6, '#c4dcff', '#1a46c0')}
  <path d="M16 15.4a2.1 2.1 0 1 1-.01 0M16 19.4V26.2M13 21.6h6" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M16 15.4a2.1 2.1 0 1 1-.01 0M16 19.4V26.2M13 21.6h6" fill="none" stroke="#e8b84a" stroke-width="1.3" stroke-linecap="round"/>${_ln('M14.4 16.2c.4-.8 1-1 1.8-.8', '#fff6bc', .5, .9)}`; },
amulette_dunes: () => { const g = _id(), l = _id(); const cx = 16, cy = 6.6; const arc = r => `M${cx - r} ${cy}A${r} ${r} 0 0 0 ${cx + r} ${cy}`;
  const drops = [-78, -58, -39, -20, 0, 20, 39, 58, 78].map((a, i) => `<path transform="rotate(${a} ${cx} ${cy})" d="M14.9 20.2Q16 21.2 17.1 20.2L16 24Z" fill="${i % 2 ? '#2a5fd0' : '#e8b84a'}" ${_k}/>`).join('');
  return `<defs>${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 1, 1)}${_lg(l, '#6a9aff', '#143a9a', 1, 1)}</defs>${_sh(16, 29.4, 9, 1.2)}
  <path d="M${cx - 5} ${cy}A5 5 0 0 0 ${cx + 5} ${cy}L${cx + 13.8} ${cy}A13.8 13.8 0 0 1 ${cx - 13.8} ${cy}Z" fill="url(#${g})" ${_K}/>
  ${drops}
  ${_ln(arc(6.6), '#140c06', 1.9, .8)}${_ln(arc(6.6), '#946410', 1.1)}
  ${_b4beads(arc(8.6), '#2a5fd0', 2.1, 2.45)}${_b4beads(arc(10.9), '#3fd8c4', 2.1, 2.45)}${_b4beads(arc(13.1), '#e0402a', 1.8, 2.2)}
  ${_ln(arc(9.75), '#140c06', .5, .7)}${_ln(arc(12), '#140c06', .5, .7)}
  ${_ln('M4.4 2.8C8 .4 24 .4 27.6 2.8', '#140c06', 2.2, .9)}${_ln('M4.4 2.8C8 .4 24 .4 27.6 2.8', '#e8b84a', 1.1)}
  ${_b4falcon(3.4, 4.6, -1, 1)}${_b4falcon(28.6, 4.6, 1, 1)}${_gl('M10.8 11.2c1.6 1.6 3.4 2.6 5.2 2.8-2.4.2-4.4-.6-6-2.2Z', .5)}${_spark(27.6, 16.4, '#fff', .8)}${_spark(5.6, 17.2, '#ffe9a0', .6)}`; },
bottes_dunes: () => { const n = _id(), g = _id(), s = _id(); return `<defs>${_lg(n, '#fffaea', '#c9b27c', 1, 0)}${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 0, 1)}${_lg(s, '#e8b84a', '#8a5a0a')}</defs>${_sh(16, 29.4, 13.5, 1.6)}
  <path d="M9.6 3.4h10.4l.6 14.2c2.8.6 6 1.6 7.2 3.8.6 1.2-.2 2.6-1.6 2.6H8.4c-1.2 0-2-.8-1.8-2.2L8.4 17.6Z" fill="url(#${n})" ${_K}/>
  ${_ln('M9 8.4c3.4 1 7.4 1 11 0M8.8 12.4c3.6 1 8 1 11.2 0M8.6 16.4c3.8 1 8.4 1.2 11.8.2', '#b8a06a', .6, .75)}
  <path d="M9.2 3.4h11.2v3H9Z" fill="url(#${g})" ${_K}/><circle cx="12.4" cy="4.9" r=".9" fill="#2a5fd0" ${_k}/><circle cx="17.2" cy="4.9" r=".9" fill="#3fd8c4" ${_k}/>
  ${_ln('M9.4 7.6 20.2 11.6M20.2 7.6 9.4 11.6M9.2 12.2 20.4 16.2M20.4 12.2 9.2 16.2', '#140c06', 2.1, .9)}${_ln('M9.4 7.6 20.2 11.6M20.2 7.6 9.4 11.6M9.2 12.2 20.4 16.2M20.4 12.2 9.2 16.2', '#e8b84a', 1.1)}
  <circle cx="14.8" cy="9.6" r="1.35" fill="#2a5fd0" ${_k}/><circle cx="14.8" cy="14.2" r="1.35" fill="#e0402a" ${_k}/>
  <path d="M5.8 23.4c4.8.6 14.8.6 19.6 0 2.6-.2 3.8-1.8 4.6-4.2 1.2 2.4.8 5.2-1.2 6.6-.8.6-1.8.8-2.8.8H8c-1.6 0-2.2-1.2-2.2-3.2Z" fill="url(#${s})" ${_K}/>
  ${_ln('M7 26.4h19.6', '#6a4510', .6, .6)}${_ln('M25.6 22.8c1.6-.4 2.6-1.6 3.2-3.2', '#fff6bc', .55, .8)}
  ${_b4scarab(20.6, 18.8, .5)}
  ${[[4, 29.6], [9.4, 30.2], [14, 29.8], [20.6, 30.1], [26.2, 29.6], [29.4, 28.4]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".55" fill="#d8b070"/>`).join('')}${_gl('M10.8 5.4l.2 11', .35)}`; },
khepesh_pharaon: () => { const g = _id(), l = _id(), c = _id(), bl = _id(); return `<defs>${_b4lg3(g, '#fff6bc', '#e8b84a', '#946410', 1, 0)}${_lg(l, '#6a9aff', '#143a9a', 1, 0)}${_lg(c, '#ff8a6a', '#a8122a', 1, 1)}${_b4lg3(bl, '#fffbe0', '#f0c860', '#a8700e', 1, 0)}</defs>
  <g transform="translate(16.2 16.4) rotate(45) scale(.9) translate(-18 -19.2)">
  <path d="M10.4 23.6V12.6C10.4 6 15 1.6 21.6 1.8 25.8 2 28.8 4.4 29 9.4 27 6.8 24.6 5.8 22 6 17.6 6.4 13.4 9.6 13.4 13V23.6Z" fill="url(#${bl})" ${_K}/>
  ${_ln('M11.6 22.4V12.8C11.6 7.4 15.6 3.6 21.4 3.4 24.6 3.4 27 4.8 28.2 7', '#fffbe0', .7, .9)}${_ln('M12.6 22V13.2C12.6 9.6 15 7.4 18 6.8', '#946410', .5, .7)}
  <path d="M10.8 18.2c.9-1.3 3-1.3 3.8 0-.9 1.3-2.9 1.3-3.8 0Z" fill="#fffbe0" ${_k}/><circle cx="12.7" cy="18.2" r=".75" fill="#2a5fd0"/>${_ln('M11 19.8c.8.6 1.4 1.6 1.4 2.8M14.2 18.8c.7.3 1.1.9 1.2 1.6', '#140c06', .55, .85)}${_ln('M10.8 17c.9-.6 2.9-.6 3.8 0', '#140c06', .5, .7)}
  <path d="M12 21.4C8.8 21.4 6.8 23.4 6.6 26.4 6.6 28.4 8 29.2 9.6 28.6L12 29.4 14.4 28.6C16 29.2 17.4 28.4 17.4 26.4 17.2 23.4 15.2 21.4 12 21.4Z" fill="url(#${g})" ${_K}/>
  <path d="M12 22.4C9.6 22.6 8.2 24.2 8 26.4M12 22.4C14.4 22.6 15.8 24.2 16 26.4" stroke="#946410" stroke-width=".6" fill="none" opacity=".8"/>${_ln('M9.2 24.2C10.4 23.4 11.2 23.2 12 23.2s1.6.2 2.8 1', '#2a5fd0', 1, .95)}
  <circle cx="9.8" cy="26" r="1" fill="#140c06"/><circle cx="14.2" cy="26" r="1" fill="#140c06"/><circle cx="9.8" cy="26" r=".55" fill="url(#${c})"/><circle cx="14.2" cy="26" r=".55" fill="url(#${c})"/>
  <path d="M11.2 28.4 12 31 12.8 28.4Z" fill="#e0402a" ${_k}/>${_ln('M8.2 27.8c.6-.4 1.2-.5 1.8-.4M16 27.8c-.6-.4-1.2-.5-1.8-.4', '#2a5fd0', .8, .9)}
  <path d="M10.4 30.4 10.6 35.4H13.4L13.6 30.4Z" fill="url(#${l})" ${_K}/>${_ln('M10.5 32.1h3M10.5 34h3', '#e8b84a', .9, .95)}
  <path d="M9.4 35.4h5.2c.5 1.5-.4 2.6-1.4 3h-2.4c-1-.4-1.9-1.5-1.4-3Z" fill="url(#${g})" ${_K}/>${_gem(12, 36.4, 1, '#ffb0a0', '#a8122a')}
  </g>${_spark(27.8, 5.6, '#fff', .9)}${_spark(5, 26, '#ffe9a0', .6)}`; },

/* ======================= MINES D'OCRE : cuir, fer, ocre et cristal à cœur cyan ======================= */
coiffe_mines: () => { const y = _id(), i = _id(), b = _id(), h = _id(); return `<defs>${_b4lg3(y, '#ffe27a', '#f0a82a', '#a8600c', 1, 1)}${_lg(i, '#c8ceda', '#4a5264', 1, 1)}<radialGradient id="${b}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7b0" stop-opacity=".95"/><stop offset=".5" stop-color="#ffe27a" stop-opacity=".45"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></radialGradient><linearGradient id="${h}" x1="0" y1=".5" x2="1" y2=".5"><stop offset="0" stop-color="#fff2a0" stop-opacity=".7"/><stop offset="1" stop-color="#fff2a0" stop-opacity="0"/></linearGradient></defs>${_sh(15, 27.4, 11.5, 1.8)}
  <path d="M22 14.2 32 6.4V21Z" fill="url(#${h})"/>
  <path d="M3.6 20.6c0-1.6 5-2.8 11.4-2.8s11.4 1.2 11.4 2.8c0 2-5 3.6-11.4 3.6S3.6 22.6 3.6 20.6Z" fill="url(#${i})" ${_K}/>${_ln('M5 21.8c3 1.4 6.4 1.8 10 1.8', '#fff', .6, .45)}
  <path d="M6 20.2C6 11.4 9.8 6.2 15 6.2s9 5.2 9 14c-2.4 1.2-5.4 1.8-9 1.8s-6.6-.6-9-1.8Z" fill="url(#${y})" ${_K}/>
  <path d="M12.6 6.6C13.6 5 14.4 4.6 15 4.6s1.4.4 2.4 2L17 21.6h-4Z" fill="url(#${i})" ${_K}/>${_ln('M13.8 6.6 13.4 20.6', '#fff', .6, .55)}
  <path d="M6.2 17.6c2.6 1.2 5.6 1.8 8.8 1.8s6.2-.6 8.8-1.8l.2 2.2c-2.6 1.2-5.6 1.8-9 1.8s-6.4-.6-9-1.8Z" fill="#5a6274" ${_K}/>
  ${[[7.6, 19.4], [22.4, 19.4], [11, 20.4], [19, 20.4]].map(([x, yy]) => `<circle cx="${x}" cy="${yy}" r=".6" fill="#c8ceda" ${_k}/>`).join('')}
  <path d="M7.6 11.4c1-2.8 3.2-4.4 5.6-4.8-2 1.4-3.4 3.4-3.8 6.2Z" fill="#fff" opacity=".4"/>${_ln('M8.6 15.2c.6 1.2.4 2.2-.2 3M21 13.4c-.4 1.2 0 2 .6 2.8', '#2a1a0c', .9, .35)}
  <circle cx="20.6" cy="13.6" r="5.8" fill="url(#${b})"/><circle cx="20.6" cy="13.6" r="3.1" fill="#5a4a2a" ${_K}/><circle cx="20.6" cy="13.6" r="2.1" fill="#fff7b0"/><circle cx="19.9" cy="12.9" r=".8" fill="#fff"/>
  ${_b4crys(8.6, 18.8, 2.8, 5.4, -14, ['#ffe6a0', '#ffb43a', '#b4560a'], '#6ae0ff')}${_spark(28, 6, '#fff7b0', .9)}`; },
ceinture_mines: () => { const a = _id(), i = _id(), lt = _id(); return `<defs>${_lg(a, '#a8703a', '#4a2a12')}${_lg(i, '#d4dae6', '#586074', 1, 1)}${_lg(lt, '#8a5a2e', '#3e2412')}</defs>${_sh(16, 28.8, 12.5, 1.4)}
  <path d="M1.8 6.4c4-1.2 8.4-1.6 14.2-1.6s10.2.4 14.2 1.6l-.4 8.6c-4 1-8.4 1.4-13.8 1.4s-9.8-.4-13.8-1.4Z" fill="url(#${a})" ${_K}/>
  ${_ln('M3 8.6c4-.8 8.2-1.2 13-1.2s9 .4 13 1.2', '#d8a468', .6, .7)}${_ln('M3 13.4c4 .8 8.2 1.2 13 1.2s9-.4 13-1.2', '#2a180a', .8, .6)}${_ln('M3.6 10.6c4-.7 8.2-1.1 12.4-1.1s8.4.4 12.4 1.1', '#e4b57a', .5, .5)}
  ${[5.2, 8.6, 23.4, 26.8].map((x, k) => `<circle cx="${x}" cy="${[10.8, 10.4, 10.4, 10.8][k]}" r="1" fill="url(#${i})" ${_k}/>`).join('')}
  <path d="M5 16.6C2.8 17 2.2 19.4 2.6 22c.4 3.2 2.4 5.2 5.4 5.2s5-1.8 5.4-4.8c.4-2.4-.2-4.8-2.4-5.6Z" fill="url(#${lt})" ${_K}/>
  <path d="M3 18.2c3 1.6 7 1.6 10 0" stroke="#140c06" stroke-width=".8" fill="none" opacity=".7"/><path d="M3.4 19.4c2.8 1.4 6.6 1.4 9.4 0" stroke="#d8a468" stroke-width=".5" fill="none" stroke-dasharray="1 .8" opacity=".8"/><rect x="6.6" y="19.6" width="2.8" height="3.2" rx=".9" fill="url(#${i})" ${_k}/><circle cx="8" cy="21.2" r=".5" fill="#ffb43a"/>
  ${_rod(25.4, 25.6, 22.8, 16.2, '#b07a42', '#4a2a12', 1.7)}
  <path d="M20.2 16.4c.4-1.4 1.6-2.2 3-2.4l4.4-.4c.6 1.6.4 3-.8 3.8l-3.4 1.4c-1.4.2-2.6-.4-3.2-2.4Z" fill="url(#${i})" ${_K}/>${_gl('M21 15.4c.8-.8 1.8-1.2 3-1.2', .55)}
  <path d="M14.6 16.6 15.2 18.6M17.4 16.6 16.8 18.6" stroke="#8a92a6" stroke-width=".8" stroke-linecap="round"/>
  ${_ln('M16 16.4v3', '#140c06', 1.6, .85)}${_ln('M16 16.4v3', '#aab2c4', .8)}
  ${_b4crys(16, 28.4, 4.6, 8, 0, ['#ffe6a0', '#ffb43a', '#b4560a'], '#6ae0ff')}${_spark(20, 22.4, '#9ff0ff', .6)}
  <path d="M10.8 4.6h10.4v11.6H10.8Z" fill="url(#${i})" ${_K}/><path d="M12.6 6.4h6.8v8H12.6Z" fill="#5a3416" ${_k}/><path d="M12.6 6.4h6.8v1.6h-6.8Z" fill="#2a180a" opacity=".5"/><path d="M9.8 10.4h12.4" stroke="#140c06" stroke-width="2.4" stroke-linecap="round" stroke-opacity=".9"/><path d="M9.8 10.4h12.4" stroke="#aab2c4" stroke-width="1.2" stroke-linecap="round"/><circle cx="16" cy="10.4" r="1.7" fill="#ffb43a" ${_K}/><circle cx="15.6" cy="10" r=".5" fill="#fff"/>${_gl("M11.4 5.2h9", .5)}`; },
bottes_mines: () => { const a = _id(), b = _id(), ir = _id(); return `<defs>${_lg(a, '#a06a38', '#4a2a12', 1, 0)}${_lg(b, '#6a4121', '#24140a')}${_lg(ir, '#c8ceda', '#4a5264', 1, 1)}</defs>${_sh(16, 29.4, 13, 1.6)}
  <path d="M9.4 3.8H20l.6 14c3.4.8 7.4 2.4 8 5.4.2 1.6-.8 3.2-2.4 3.2H8.2c-1.2 0-2-.8-2-2.2L8 17.6Z" fill="url(#${a})" ${_K}/>
  <path d="M8.8 3.4h11.8v3.8H8.8Z" fill="#b8844c" ${_K}/>${_ln('M9.6 4.8h10.2', '#6a4121', .6, .8)}${_ln('M9.4 6.4h10.6', '#e4b57a', .4, .6)}
  <path d="M21 20.2c3.6.8 6.6 2.4 7.2 5v1.4c0 .8-.6 1.4-1.4 1.4H20Z" fill="url(#${ir})" ${_K}/>${_ln('M22.4 21.8c2.4.8 4.2 1.8 4.8 3.4', '#fff', .6, .55)}${[[24.4, 25.6], [26.6, 26]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".6" fill="#8a92a6" ${_k}/>`).join('')}
  ${_ln('M9.4 8.8 19.4 12M19.4 8.8 9.4 12M9.6 13.2 19.6 16.4M19.6 13.2 9.6 16.4', '#140c06', 1.6, .8)}${_ln('M9.4 8.8 19.4 12M19.4 8.8 9.4 12M9.6 13.2 19.6 16.4M19.6 13.2 9.6 16.4', '#e8d09a', .9)}${_ln('M9.8 8.7 19 11.6M9.9 13.1 19.2 16', '#8a6a3a', .35, .7)}
  ${[[9.4, 8.8], [19.4, 8.8], [9.6, 13.2], [19.6, 13.2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="url(#${ir})" ${_k}/>`).join('')}
  <path d="M10.6 18.4c1 .3 2 .5 3.2.5M7.4 22.6c2 .8 4.8 1.2 8 1.2" stroke="#2a180a" stroke-width=".6" fill="none" opacity=".6"/>
  <path d="M5.8 24.6h22.6c.2 2-.8 3.2-2.8 3.2H8.6c-1.8 0-2.8-1-2.8-3.2Z" fill="url(#${b})" ${_K}/>${_ln('M7.4 25.6h19.6', '#8a5a2e', .5, .7)}
  ${[7.6, 11.6, 15.6, 19.6, 23.6].map(x => `<path d="M${x - 1.4} 27.8h2.8L${x} 30.6Z" fill="url(#${ir})" ${_k}/>`).join('')}
  <path d="M27 28.2h1.8l-.9 2.2Z" fill="url(#${ir})" ${_k}/>${_gl('M10.2 11.6l.2 5', .3)}
  <ellipse cx="14" cy="27" rx="7" ry="1.6" fill="#e8902a" opacity=".3"/>${[[6.2, 28.6], [12.4, 29.6], [18.2, 29.4], [24.4, 29.6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".6" fill="#e8902a" opacity=".85"/>`).join('')}`; },
amulette_mines: () => { const w = _id(), i = _id(), rk = _id(), gl = _id(); const ch = (pts, k) => pts.map(([x, y], n) => `<ellipse cx="${x}" cy="${y}" rx="1.2" ry="1.8" fill="none" stroke="#140c06" stroke-width="2" stroke-opacity=".9" transform="rotate(${k * (y * 5 + 8)} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="1.2" ry="1.8" fill="none" stroke="#aab2c4" stroke-width="1" transform="rotate(${k * (y * 5 + 8)} ${x} ${y})"/>`).join('');
  return `<defs>${_lg(i, '#d4dae6', '#586074', 1, 1)}${_lg(rk, '#8a7a6a', '#3a3028')}<radialGradient id="${gl}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9ff0ff" stop-opacity=".7"/><stop offset=".6" stop-color="#6ae0ff" stop-opacity=".18"/><stop offset="1" stop-color="#6ae0ff" stop-opacity="0"/></radialGradient></defs>
  ${ch([[7.4, 3.2], [7.9, 6], [8.9, 8.6], [10.4, 10.6]], 1)}${ch([[24.6, 3.2], [24.1, 6], [23.1, 8.6], [21.6, 10.6]], -1)}
  <circle cx="16" cy="18.6" r="11.6" fill="url(#${gl})"/>${_sh(16, 29.4, 9, 1.2)}
  <path d="M6.6 26.2c-.6-3 .8-5.2 3.4-6.2l4-.8 5.4.2 3.6 1c2.4 1 3.4 3.4 2.4 5.8-.4 1.2-1.4 2-2.6 2H10c-1.6 0-2.8-.8-3.4-2Z" fill="url(#${rk})" ${_K}/>${_ln('M9 22.4c2-.8 4.6-1 7-.6', '#b0a090', .6, .6)}${_ln('M19 25.6c1.4-.2 2.6.2 3.4 1', '#241c14', .6, .6)}
  ${_b4crys(9.6, 24, 5.2, 10, -24, ['#ffe6a0', '#ffb43a', '#b4560a'])}${_b4crys(22.4, 24.2, 5.4, 11, 22, ['#ffe6a0', '#ffb43a', '#b4560a'])}
  ${_b4crys(16, 25.6, 8.4, 17.6, 0, ['#fff0c0', '#ffc24a', '#b4560a'], '#6ae0ff')}
  ${_ln('M11.8 17.6c3 1.8 7.2 1.8 10.2 0M12 21.2c3 1.8 7 1.8 10 0', '#140c06', 1.5, .9)}${_ln('M11.8 17.6c3 1.8 7.2 1.8 10.2 0M12 21.2c3 1.8 7 1.8 10 0', '#aab2c4', .7)}
  <ellipse cx="16" cy="12.2" rx="2" ry="1.5" fill="none" stroke="#140c06" stroke-width="2" stroke-opacity=".9"/><ellipse cx="16" cy="12.2" rx="2" ry="1.5" fill="none" stroke="#aab2c4" stroke-width="1"/>
  ${_ln('M10.6 11.2 14.2 12.4M21.4 11.2 17.8 12.4', '#140c06', 1.8, .9)}${_ln('M10.6 11.2 14.2 12.4M21.4 11.2 17.8 12.4', '#aab2c4', .9)}${_spark(27.4, 14.6, '#9ff0ff', .9)}${_spark(5, 17, '#fff7b0', .7)}${_spark(16, 17.6, '#ffffff', .7)}`; },
pioche_ocre: () => { const w = _id(), c = _id(), i = _id(), lt = _id(); return `<defs>${_lg(w, '#c08a4c', '#5a3416', 1, 0)}${_lg(i, '#d4dae6', '#586074', 1, 1)}${_lg(lt, '#8a5a2e', '#3e2412')}${_lg(c, '#e8ffff', '#2ab8e0', 1, 1)}</defs>
  <g transform="translate(16 16.2) rotate(45) scale(.84) translate(-16 -17)">
  ${_rod(16, 32.4, 16, 10, '#c08a4c', '#5a3416', 2.7)}
  <path d="M14 22h4l.4 9.4h-4.8Z" fill="url(#${lt})" ${_K}/>${_ln('M13.8 23.4 18.2 25M13.8 26 18.2 27.6M13.8 28.6 18.2 30.2', '#140c06', 1.1, .85)}${_ln('M13.8 22.8 18.2 24.4M13.8 25.4 18.2 27M13.8 28 18.2 29.6', '#d8a468', .5, .8)}
  <path d="M13.4 31.4h5.2c.2 1.4-.4 2.4-1.2 2.8h-2.8c-.8-.4-1.4-1.4-1.2-2.8Z" fill="url(#${i})" ${_K}/>
  <path d="M16 6.2C10.6 4.4 5 6.4 1.6 12.6 5.8 10.4 10.6 10 16 11.8Z" fill="#ffb43a" ${_K}/>
  <path d="M16 6.2C21.4 4.4 27 6.4 30.4 12.6 26.2 10.4 21.4 10 16 11.8Z" fill="#ffb43a" ${_K}/>
  <path d="M16 6.2C12.6 5 9.2 5.4 6.2 7.6L10 10.4C11.8 10.2 14 10.4 16 11.8Z" fill="#ffe6a0"/><path d="M6.2 7.6C4.4 9 2.8 10.6 1.6 12.6L5.4 11C6.6 10.6 8.4 10.4 10 10.4Z" fill="#b4560a"/>
  <path d="M16 6.2C19.4 5 22.8 5.4 25.8 7.6L22 10.4C20.2 10.2 18 10.4 16 11.8Z" fill="#ffc24a"/><path d="M25.8 7.6C27.6 9 29.2 10.6 30.4 12.6L26.6 11C25.4 10.6 23.6 10.4 22 10.4Z" fill="#a8480a"/>
  <path d="M16 6.2C10.6 4.4 5 6.4 1.6 12.6 5.8 10.4 10.6 10 16 11.8 21.4 10 26.2 10.4 30.4 12.6 27 6.4 21.4 4.4 16 6.2Z" fill="none" ${_K}/>
  ${_ln('M10 10.4 6.2 7.6M22 10.4 25.8 7.6M13 6.4 11.4 10.7M19 6.4 20.6 10.7', '#140c06', .5, .45)}
  <path d="M9 7.4l1.8 1.6-2.4 1ZM23 7.4l-1.8 1.6 2.4 1ZM4.2 10.4l2-.4-1 1.8ZM27.8 10.4l-2-.4 1 1.8ZM13.4 8l1.4 1.6-1.8.4ZM18.6 8l-1.4 1.6 1.8.4Z" fill="url(#${c})" opacity=".95"/>${_ln('M12 6.2C9.4 5.6 6.8 6.4 4.4 8.4M20 6.2C22.6 5.6 25.2 6.4 27.6 8.4', '#fff', .8, .8)}
  <path d="M12.6 8.6h6.8l.6 5.2c-.4 1.2-1.4 1.8-4 1.8s-3.6-.6-4-1.8Z" fill="url(#${i})" ${_K}/>${_ln('M13.4 10h5.2', '#fff', .6, .55)}<path d="M16 8 18 10.8 16 14.6 14 10.8Z" fill="url(#${c})" ${_K}/>${_gl('M15.2 9.4l-.8 1.6', .8)}
  </g>${_spark(5.6, 7.2, '#9ff0ff', .8)}${_spark(27.4, 26.4, '#ffe9a0', .7)}`; },
});
