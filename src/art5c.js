/* =====================================================================
   ICÔNES v5c — objets HÉROÏQUES des deux derniers donjons : Pharaon Éternel et Comte Vespéral
   Pharaon Éternel (rang 7) : or, lapis-lazuli, turquoise, bandelettes de lin, noir — sceptre ouas, scarabée sacré, sarcophage, Dofus Argenté
   Comte Vespéral (rang 8) : rouge sang, noir, violet nuit, blanc osseux, argent — rapière de sang, cape de nuit, calice, Dofus Cauchemar
   Les objets les plus riches du jeu : plus d'or, de gemmes, de reflets et de lueurs que les objets de zone.
   Complète ITEM_ART (art.js / art2.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _rod, _gem, _spark…),
   plus _relicFrame / _RELIC_COL (art2.js) pour les reliques et _dofusArt2 (art4d.js) pour les Dofus.
   Tous les helpers locaux sont préfixés _c5 (aucune collision avec les autres fichiers art*).
   ===================================================================== */
/* dégradé à 3 arrêts */
const _c5g3 = (id, a, b, c, x2 = 0, y2 = 1, x1 = 0, y1 = 0) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
/* trait avec contour sombre */
const _c5ln = (d, c, w, o = 1) => _ln(d, '#140c06', w + 1.2, .92 * o) + _ln(d, c, w, o);
/* aile de chauve-souris tournée vers +x, épaule en (0,0), poignet en (6,-5) ; la membrane est festonnée entre quatre doigts (largeur ≈ 12) */
const _c5wing = (fill, bone = '#d4d8e6', mem = '#0a0610') => `<path d="M0 0C2 -3.4 4 -5 6 -5.2C8 -6.2 10 -7.6 12.2 -8.4Q8.8 -4.4 11.6 0Q7.4 1.4 8.2 5.2Q5.2 3 3.6 5.6Q2 3.4 .4 2.6Z" fill="url(#${fill})" ${_K}/>
  <path d="M6 -5 11.6 -.2M6 -5 8.2 5.2M6 -5 3.6 5.6" stroke="${bone}" stroke-width=".55" stroke-linecap="round" fill="none"/>
  <path d="M0 0C2 -3.4 4 -5 6 -5.2C8 -6.2 10 -7.6 12.2 -8.4" stroke="${bone}" stroke-width=".8" stroke-linecap="round" fill="none"/><circle cx="12.2" cy="-8.4" r=".55" fill="${bone}"/><circle cx="11.6" cy="-.1" r=".45" fill="${bone}"/><circle cx="8.2" cy="5.1" r=".45" fill="${bone}"/>`;
/* perles alignées sur un tracé (trait épais en pointillés ronds, contour sombre dessous) */
const _c5beads = (d, c, w = 1.6, gap = 2) => `<path d="${d}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="${w + .8}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0.01 ${gap}"/>`;
/* losange de gemme à facettes (pointe en haut) */
const _c5cut = (x, y, w, h, a, b) => { const i = _id(); return `<defs>${_lg(i, a, b, 1, 1)}</defs><path d="M${x} ${y - h / 2}L${x + w / 2} ${y}L${x} ${y + h / 2}L${x - w / 2} ${y}Z" fill="url(#${i})" ${_k}/><path d="M${x} ${y - h / 2}L${x - w / 2} ${y}L${x} ${y}Z" fill="#fff" opacity=".4"/>`; };

Object.assign(_RELIC_COL, { hx_relique_pharaon: ['#ffe27a', '#1a8fa8'], hx_relique_comte: ['#ffc27a', '#a0102a'] });

Object.assign(ITEM_ART, {

/* ======================= RANG 7 · PHARAON ÉTERNEL ======================= */

/* Sceptre Ouas d'Éternité : tête de chacal d'or, collier de lapis, hampe rayée, bandelette, fourche */
hx_sceptre_pharaon: () => { const g = _id(), h = _id(), l = _id(), t = _id(), n = _id(), cp = _id(); return `<defs>${_c5g3(g, '#fff6bc', '#e8b84a', '#946410', 1, 0)}${_c5g3(h, '#fffbd0', '#f0c050', '#a06a10', 1, 1)}${_c5g3(l, '#7aa4ff', '#2a5fd0', '#0e2a78', 1, 1)}${_lg(t, '#c8fff4', '#0e8a9a', 1, 1)}${_lg(n, '#fffdf0', '#c9b27c', 1, 1)}<clipPath id="${cp}"><rect x="-1.6" y="-7" width="3.2" height="16.6"/></clipPath></defs>
  ${_sh(16, 29.8, 8.4, 1.2)}
  <g transform="translate(13.9 17) rotate(30) scale(.68)">
    <g transform="translate(0 3.4)"><path d="M0 5.4C0 8.8-3.6 9.4-4.4 13.4M0 5.4C0 8.8 3.6 9.4 4.4 13.4" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="4.8" stroke-linecap="round"/>
    <path d="M0 5.4C0 8.8-3.6 9.4-4.4 13.4M0 5.4C0 8.8 3.6 9.4 4.4 13.4" fill="none" stroke="url(#${g})" stroke-width="3" stroke-linecap="round"/>
    ${_ln('M-1.1 7C-2 8.8-3.3 9.4-3.8 11.6M1.1 7C2 8.8 3.3 9.4 3.8 11.6', '#fff', .55, .6)}
    <circle cx="-4.5" cy="13.8" r="1.3" fill="url(#${t})" ${_k}/><circle cx="4.5" cy="13.8" r="1.3" fill="url(#${t})" ${_k}/><circle cx="-4.8" cy="13.4" r=".35" fill="#fff"/><circle cx="4.2" cy="13.4" r=".35" fill="#fff"/></g>
    <rect x="-1.6" y="-7" width="3.2" height="16.6" fill="url(#${g})" ${_K}/>
    <g clip-path="url(#${cp})">${Array.from({ length: 8 }, (_, i) => `<path d="M-2 ${-6 + i * 2}L2 ${-7.8 + i * 2}" stroke="#2a5fd0" stroke-width="1.2"/>`).join('')}</g>
    ${_ln('M-.7 -6.6V9.2', '#fff', .55, .75)}
    ${[-3.8, -.2, 3.4].map(y => `<rect x="-2.5" y="${y}" width="5" height="2" rx=".7" fill="url(#${l})" ${_k}/><path d="M-1.8 ${y + .6}h1.5" stroke="#fff" stroke-width=".5" opacity=".75"/>`).join('')}
    <g transform="translate(0 3.2)"><path d="M-2 2.9L2 1.7L2 3.6L-2 4.8ZM-2 5L2 3.8L2 5.5L-2 6.7Z" fill="url(#${n})" ${_k}/>
    <path d="M1.8 2.6C3.6 2.2 5 3 6.6 2.8L5.8 4.2L7.4 5.4C5.8 6 4.2 5.6 2.6 6Z" fill="url(#${n})" ${_k}/>${_ln('M2.4 3.4C3.8 3.2 5 3.8 6.2 3.8M2.8 5C4 4.8 5 5.2 6 5.2', '#a8925a', .4, .8)}</g>
    <path d="M-4.9 -9.8L4.9 -9.8L3.2 -5.8L-3.2 -5.8Z" fill="url(#${l})" ${_K}/>${_ln('M-4.2 -8.8H4.2', '#e8b84a', .7)}${[-3, -1, 1, 3].map(x => `<path d="M${x} -8l.7.9-.7.9-.7-.9Z" fill="#fff6bc" ${_k}/>`).join('')}
    <circle cx="0" cy="-6.6" r="1.35" fill="url(#${t})" ${_K}/><circle cx="-.4" cy="-7" r=".4" fill="#fff"/>
    <g transform="translate(0 -9.6) rotate(-20) scale(1.28) translate(0 9.6)">
      <path d="M-2.8 -13.4L-5.4 -19.4-3 -20.5 .4 -14.4Z" fill="url(#${g})" ${_K}/>
      <path d="M-.6 -14.2L.9 -21.5 2 -21.3 4.1 -13.8Z" fill="url(#${h})" ${_K}/>
      <path d="M.7 -14.4L1.2 -19.4 1.8 -19.3 2.7 -14.2Z" fill="url(#${l})" ${_k}/>${_ln('M-4.6 -18L-3 -18.8M-4 -15.8L-2 -16.6', '#2a5fd0', .6, .95)}
      <path d="M-2.9 -9C-3.7 -11.2-3.5 -13.4-1.9 -14.3-.9 -15 .9 -15 2.1 -14.5L7.6 -12.7C8.9 -12.3 9.3 -11.1 8.5 -10.3L4.1 -9.7C3.5 -9.6 3 -9.1 2.9 -8.4L2.9 -9Z" fill="url(#${h})" ${_K}/>
      <path d="M2.2 -14.3C3.6 -13.9 5.8 -13.3 7.6 -12.7" stroke="#fff6d0" stroke-width=".7" fill="none" stroke-linecap="round"/>
      <path d="M-2.4 -10.6C-2.4 -12.5-1.4 -13.9 .2 -14.2" stroke="#946410" stroke-width=".45" fill="none"/>
      <path d="M4 -9.8L8.2 -10.3" stroke="#946410" stroke-width=".45" stroke-linecap="round"/>
      <ellipse cx="3.1" cy="-11.9" rx="1.35" ry="1" fill="url(#${t})" ${_k}/><circle cx="3.35" cy="-11.9" r=".45" fill="#05242c"/><circle cx="2.8" cy="-12.2" r=".28" fill="#fff"/>
      ${_ln('M1.6 -11.6L-.8 -10.7M4.7 -11.4L6.3 -10.6', '#140c06', .5, .95)}
      <circle cx="8.3" cy="-11.1" r=".66" fill="#140c06"/>${_gl('M-2.4 -9.4C-3 -11.2-2.8 -12.9-1.8 -13.7-2.6 -12.5-2.6 -10.9-2.2 -9.5Z', .5)}
    </g>
  </g>
  ${_spark(27.6, 5, '#fff', .9)}${_spark(4.6, 8, '#ffe9a0', .65)}${_spark(28, 22.4, '#9ff5e6', .6)}`; },

/* Anneau du Scarabée Sacré : jonc d'or, scarabée de lapis aux ailes d'or déployées */
hx_anneau_scarabee: () => { const g = _id(), w = _id(), l = _id(), t = _id(); const wing = (k) => `<g transform="scale(${k} 1)">
    <path d="M-2.4 -1.6C-6 -2.8-9.6 -3-12.8 -1.8-13.6 -1.5-13.6 -.6-12.8 -.4-9.6 .2-6 -.2-2.4 .6Z" fill="url(#${w})" ${_K}/>
    <path d="M-2.4 .4C-6 -.2-9.8 .8-12.6 2.6-13.2 3.2-12.8 4-12 4-9 4.2-5 3.4-2.4 2.4Z" fill="url(#${w})" ${_K}/>
    <path d="M-2.4 2.2C-5.2 2.4-8.4 3.8-10.6 6.2-10.8 6.8-10.4 7.4-9.6 7.4-7 7-4 5.8-2.4 4.2Z" fill="url(#${w})" ${_K}/>
    <path d="M-3.6 -.6C-6.4 -1.4-9.4 -1.6-12.2 -1M-3.6 1.8C-6.4 1.4-9.4 2.2-12 3.2M-3.6 3.8C-6 3.8-8.2 4.8-9.6 6.6" stroke="#2a5fd0" stroke-width=".7" fill="none" stroke-linecap="round"/>
    ${_ln('M-4.2 -2C-7.4 -2.4-10.6 -2.4-12.6 -1.7', '#fff', .55, .8)}<circle cx="-10.4" cy="-.7" r=".5" fill="#3fd8c4"/><circle cx="-10.2" cy="3.3" r=".5" fill="#3fd8c4"/></g>`;
  return `<defs>${_c5g3(g, '#fff6bc', '#e8b84a', '#946410', 1, 1)}${_c5g3(w, '#fff6bc', '#f0be4a', '#a06a10', 0, 1)}${_rg(l, '#a8c4ff', '#0e2a8a', .38, .3, .8)}${_rg(t, '#c8fff4', '#0e8a9a')}</defs>${_sh(16, 29.6, 9, 1.4)}
  <ellipse cx="16" cy="21.4" rx="8.6" ry="8" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="5.4"/><ellipse cx="16" cy="21.4" rx="8.6" ry="8" fill="none" stroke="url(#${g})" stroke-width="3.8"/>
  ${_ln('M8.8 17.6C10 15.4 12 14.4 13.4 14.6', '#fff', .9, .7)}${_ln('M10 27.8C12.8 29.2 19.2 29.2 22 27.8', '#6a4510', .7, .6)}
  ${[[9.2, 16.8], [22.8, 16.8]].map(([x, y]) => `<circle cx="${x}" cy="${y + 2.6}" r="1.65" fill="url(#${g})" ${_K}/><circle cx="${x}" cy="${y + 2.6}" r="1" fill="url(#${t})"/><circle cx="${x - .3}" cy="${y + 2.2}" r=".32" fill="#fff"/>`).join('')}
  ${[[7.7, 24.4], [24.3, 24.4], [10.4, 27.2], [21.6, 27.2]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".55" fill="#2a5fd0" ${_k}/>`).join('')}
  <g transform="translate(16 10.6)">${wing(1)}${wing(-1)}</g>
  <circle cx="16" cy="11" r="6.4" fill="#ffe27a" opacity=".16"/>
  <path d="M16 4.4C17.6 4.4 18.6 5.2 18.8 6.4L18.6 7.4H13.4L13.2 6.4C13.4 5.2 14.4 4.4 16 4.4Z" fill="url(#${g})" ${_K}/>${_ln('M14.6 5.4V6.8M16 5V6.8M17.4 5.4V6.8', '#946410', .5, .9)}
  <path d="M16 6.8C19.4 6.8 21.2 9 21.2 11.6 21.2 14.6 19 17 16 18.4 13 17 10.8 14.6 10.8 11.6 10.8 9 12.6 6.8 16 6.8Z" fill="url(#${l})" ${_K}/>
  <path d="M16 6.8C19.4 6.8 21.2 9 21.2 11.6 21.2 12.4 21 13.2 20.8 13.8 19.4 11.8 18 10.6 16 10.4Z" fill="#000" opacity=".2"/>
  <path d="M16 6.8C19.4 6.8 21.2 9 21.2 11.6 21.2 14.6 19 17 16 18.4 13 17 10.8 14.6 10.8 11.6 10.8 9 12.6 6.8 16 6.8Z" fill="none" stroke="#e8b84a" stroke-width=".5" opacity=".85" transform="translate(16 12.6) scale(.88) translate(-16 -12.6)"/>${_ln('M16 10.4V18.3', '#06124a', .8, .85)}${_ln('M11.4 10.2C13 9.6 14.6 9.8 16 10.4 17.4 9.8 19 9.6 20.6 10.2', '#e8b84a', .85, .95)}
  ${[[13.6, 13.4], [18.4, 13.4], [14.6, 15.8], [17.4, 15.8]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".38" fill="#fff6bc"/>`).join('')}
  ${_ln('M11.8 9.4C12.8 7.8 14 7.2 15.2 7.2', '#fff', 1, .85)}${_ln('M12 11.6C12 12.6 12.2 13.4 12.6 14', '#fff', .6, .5)}
  ${_c5cut(16, 2.6, 2.4, 3.2, '#ffd8c0', '#e0301a')}
  ${_spark(28.6, 7.6, '#fff', .9)}${_spark(3.6, 13.4, '#ffe9a0', .7)}${_spark(27.6, 27.6, '#9ff5e6', .6)}`; },

/* Sarcophage Miniature du Pharaon : cercueil anthropoïde d'or et de lapis, masque serein, crochet et fléau croisés */
hx_relique_pharaon: () => { const g = _id(), l = _id(), t = _id(), fc = _id(), cp = _id(), np = _id();
  const P = 'M16 5.2C19 5.2 20.6 7.2 20.7 10L21.9 12.6C22.3 13.6 21.7 14.4 21.4 15.4C21 18.2 20.5 22.4 19.9 26.6L12.1 26.6C11.5 22.4 11 18.2 10.6 15.4C10.3 14.4 9.7 13.6 10.1 12.6L11.3 10C11.4 7.2 13 5.2 16 5.2Z';
  const arc = (r, ry) => `M${16 - r} 12.2A${r} ${ry} 0 0 0 ${16 + r} 12.2`;
  return _relicFrame('hx_relique_pharaon') + `<defs>${_c5g3(g, '#fff6bc', '#e8b84a', '#946410', 1, 0)}${_c5g3(l, '#5a8aff', '#1a46c0', '#0a1e66', 1, 1)}${_lg(t, '#c8fff4', '#0e8a9a', 1, 1)}${_lg(fc, '#fffbd8', '#f2c85a', 1, 1)}<clipPath id="${cp}"><path d="${P}"/></clipPath><clipPath id="${np}"><path d="M16 5.2C19 5.2 20.6 7.2 20.7 10L20.9 14.6H18.4L18.2 10.2H13.8L13.6 14.6H11.1L11.3 10C11.4 7.2 13 5.2 16 5.2Z"/></clipPath></defs>
  <path d="M11.4 26.6H20.6L21.4 28.2H10.6Z" fill="url(#${g})" ${_K}/>${_ln('M11.4 27.4H20.6', '#fff6bc', .5, .8)}
  <path d="${P}" fill="url(#${g})" ${_K}/>
  <g clip-path="url(#${cp})"><path d="M8 20.4H24V28H8Z" fill="url(#${l})"/><path d="M8 20.4H24" stroke="#140c06" stroke-width="1.6" opacity=".9"/><path d="M8 20.4H24" stroke="#ffe27a" stroke-width=".8"/>
    <path d="M8 23.4H24M8 25.5H24" stroke="#e8b84a" stroke-width=".45" opacity=".85"/>
    <circle cx="16" cy="21.9" r=".8" fill="#ffe27a"/><circle cx="16" cy="21.9" r=".3" fill="#7a2a0a"/><path d="M11.8 22.3l.7-.9.7.9.7-.9.7.9M17.4 22.3l.7-.9.7.9.7-.9.7.9" stroke="#ffe27a" stroke-width=".45" fill="none" stroke-linejoin="round"/>
    <path d="M14 24.5C14.9 23.6 17.1 23.6 18 24.5 17.1 25.4 14.9 25.4 14 24.5Z" fill="#fff6bc" stroke="#140c06" stroke-width=".3"/><circle cx="16" cy="24.5" r=".55" fill="#0a1e66"/><path d="M16.2 25.2v.9" stroke="#fff6bc" stroke-width=".4"/>
    <ellipse cx="12.1" cy="24.5" rx=".42" ry="1" fill="#3fd8c4"/><ellipse cx="19.9" cy="24.5" rx=".42" ry="1" fill="#3fd8c4"/>
    ${[13.4, 16, 18.6].map(x => `<circle cx="${x}" cy="26.1" r=".38" fill="#ffe27a"/>`).join('')}
    <path d="M9.4 14L11.4 27M22.6 14L20.6 27" stroke="#fff6bc" stroke-width=".4" opacity=".4"/></g>
  <path d="${P}" fill="none" ${_K}/>${_ln('M11.4 16C11.8 19 12 22 12.5 25', '#fff', .7, .5)}
  <path d="M10.6 12.8C11.2 16.2 20.8 16.2 21.4 12.8" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="4" stroke-linecap="round" transform="translate(0 -.2)"/>
  ${_ln(arc(5.2, 4.2), '#e8b84a', 1.1)}${_ln(arc(4.4, 3.5), '#2a5fd0', 1.1)}${_ln(arc(3.6, 2.8), '#3fd8c4', 1)}${_ln(arc(2.8, 2.1), '#e0402a', .8)}
  ${[-4.4, -2.9, -1.4, 0, 1.4, 2.9, 4.4].map((x, i) => `<path d="M${16 + x} ${12.2 + 3.7 - Math.abs(x) * .62}v1.1" stroke="#140c06" stroke-width="1.4" stroke-linecap="round"/><path d="M${16 + x} ${12.2 + 3.7 - Math.abs(x) * .62}v1.1" stroke="${i % 2 ? '#2a5fd0' : '#ffe27a'}" stroke-width=".8" stroke-linecap="round"/>`).join('')}
  <path d="M16 5.2C19 5.2 20.6 7.2 20.7 10L20.9 14.6H18.4L18.2 10.2H13.8L13.6 14.6H11.1L11.3 10C11.4 7.2 13 5.2 16 5.2Z" fill="url(#${g})" ${_K}/>
  <g clip-path="url(#${np})" stroke="#2a5fd0" stroke-width=".95" fill="none"><path d="M10 6.8C12 6 14 5.6 16 5.6S20 6 22 6.8M10 8.6C12 7.8 14 7.4 16 7.4S20 7.8 22 8.6"/><path d="M10 11.4H22M10 12.8H22M10 14.2H22" stroke-width=".85"/></g>
  <ellipse cx="16" cy="9.4" rx="2.8" ry="3.6" fill="url(#${fc})" ${_k}/>
  ${_ln('M14.2 8.9C14.7 8.5 15.4 8.5 15.8 8.9M16.2 8.9C16.6 8.5 17.3 8.5 17.8 8.9', '#140c06', .55, .95)}${_ln('M13.7 8.6 14.2 8.8M18.3 8.6 17.8 8.8', '#2a5fd0', .5, .95)}${_ln('M14.1 7.8C14.8 7.4 15.4 7.4 15.8 7.7M16.2 7.7C16.6 7.4 17.2 7.4 17.9 7.8', '#2a5fd0', .45, .9)}
  ${_ln('M16 9.2V10.6', '#946410', .4, .8)}${_ln('M15.2 11.4C15.7 11.7 16.3 11.7 16.8 11.4', '#a8301a', .55, .95)}${_gl('M14.1 6.8C14.6 6.2 15.4 6 16 6 15.2 6.4 14.6 7 14.4 7.8Z', .6)}
  <path d="M16 5.6C15.4 5.6 15.2 6.2 15.6 6.7L16 7.2 16.4 6.7C16.8 6.2 16.6 5.6 16 5.6Z" fill="#e0402a" ${_k}/>
  <path d="M15.2 12.6H16.8L17.1 15.4C16.8 16 16.3 16.2 16 16.2S15.2 16 14.9 15.4Z" fill="url(#${l})" ${_k}/>${_ln('M15.2 13.8H16.8', '#ffe27a', .45, .9)}
  ${(() => { const cr = 'M11.6 16.2L9.9 10.8C9.5 9.4 8.6 8.6 7.6 9C6.8 9.4 6.8 10.4 7.6 10.8', fl = 'M20.4 16.2L22.6 11.8'; return `<path d="${cr}" fill="none" stroke="#140c06" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/><path d="${cr}" fill="none" stroke="url(#${g})" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${cr}" fill="none" stroke="#2a5fd0" stroke-width="1.5" stroke-dasharray="1.1 1.3" stroke-linecap="butt"/>
  <path d="${fl}" fill="none" stroke="#140c06" stroke-width="2.7" stroke-linecap="round"/><path d="${fl}" fill="none" stroke="url(#${g})" stroke-width="1.5" stroke-linecap="round"/><path d="${fl}" fill="none" stroke="#2a5fd0" stroke-width="1.5" stroke-dasharray="1.1 1.3"/>
  ${_c5beads('M22.6 11.8C23.6 9.8 25 9 26.2 9.8', '#ffe27a', .9, 1.5)}${_c5beads('M22.6 11.8C24.4 11 26 11.6 26.8 13.2', '#ffe27a', .9, 1.5)}${_c5beads('M22.6 11.8C24 12.6 24.8 13.8 24.6 15.4', '#ffe27a', .9, 1.5)}
  <circle cx="22.6" cy="11.8" r="1.05" fill="url(#${g})" ${_K}/>`; })()}
  <path d="M11.6 16.2 20.4 19.4" stroke="#140c06" stroke-width="3.2" stroke-linecap="round"/><path d="M11.6 16.2 20.4 19.4" stroke="url(#${g})" stroke-width="2" stroke-linecap="round"/>
  <path d="M20.4 16.2 11.6 19.4" stroke="#140c06" stroke-width="3.2" stroke-linecap="round"/><path d="M20.4 16.2 11.6 19.4" stroke="url(#${g})" stroke-width="2" stroke-linecap="round"/>
  ${_ln('M12.6 19 14.6 18.2M19.4 19 17.4 18.2', '#2a5fd0', .8, .95)}${_ln('M12.4 16.5 14.4 17.2', '#fff', .45, .75)}
  <circle cx="11.7" cy="16.3" r="1.3" fill="url(#${g})" ${_K}/><circle cx="20.3" cy="16.3" r="1.3" fill="url(#${g})" ${_K}/>${_ln('M11.1 15.9C11.4 15.6 11.8 15.5 12.1 15.6M19.8 15.7C20.2 15.5 20.6 15.5 20.9 15.7', '#fff', .5, .8)}
  ${_gem(16, 17.7, .95, '#ffd0c0', '#c8261a')}
  ${_spark(4.6, 6, '#fff', .9)}${_spark(27.6, 8.4, '#ffe27a', .8)}${_spark(26.8, 26, '#fff', .7)}${_spark(5.4, 25.4, '#9ff5e6', .6)}`; },

/* Dofus Argenté : œuf d'argent poli aux reflets froids, œil d'Horus gravé dans un sceau */
hx_dofus_argente: _dofusArt2('#ffffff', '#cbd4e8', '#56648a', '#e6efff', '#a8c8ff', (v, c3, glow) => `
    <path d="M2 24C9 19 20 21 30 13V18C20 26 9 25 2 29Z" fill="#2c3c6a" stroke="none" opacity=".22"/>
    <path d="M3 17 15 3.4H18.6L3 22Z" fill="#fff" stroke="none" opacity=".2"/>
    <path d="M19.4 27.4C22.6 25.6 25 22.4 25.8 18.4" stroke="#fff" stroke-width="1.1" opacity=".55"/>
    <circle cx="16" cy="16.2" r="9" stroke="#26324e" stroke-width=".6" opacity=".75"/><circle cx="16.3" cy="16.5" r="9" stroke="#fff" stroke-width=".4" opacity=".8"/>
    <circle cx="16" cy="16.2" r="7.9" stroke="#26324e" stroke-width=".7" stroke-dasharray=".5 1.5" opacity=".75"/>
    <path d="M16 5.8 17 7.2 16 8.6 15 7.2ZM16 23.8 17 25.2 16 26.6 15 25.2Z" fill="#26324e" stroke="none" opacity=".8"/>
    <g transform="translate(.35 .45)" stroke="#fff" opacity=".85" stroke-width=".5"><path d="M9.8 15.2C11.8 12.6 14.2 11.8 16 11.8S20.2 12.6 22.2 15.2C20.2 17.8 17.8 18.6 16 18.6S11.8 17.8 9.8 15.2Z M10.6 11C13 9.4 17 9.2 21.6 10.6 M13.4 18.2 13.2 21.6C13.2 22.8 14 23.4 15 23.2 M18.4 18C19.8 19.6 21.4 20.4 23.2 20.2 24.6 20 25 21.8 23.8 22.4 22.8 22.8 22 21.8 22.6 21.2 M22.2 15.2 24.6 16.2"/></g>
    <path d="M9.8 15.2C11.8 12.6 14.2 11.8 16 11.8S20.2 12.6 22.2 15.2C20.2 17.8 17.8 18.6 16 18.6S11.8 17.8 9.8 15.2Z M10.6 11C13 9.4 17 9.2 21.6 10.6 M13.4 18.2 13.2 21.6C13.2 22.8 14 23.4 15 23.2 M18.4 18C19.8 19.6 21.4 20.4 23.2 20.2 24.6 20 25 21.8 23.8 22.4 22.8 22.8 22 21.8 22.6 21.2 M22.2 15.2 24.6 16.2" stroke="#26324e" stroke-width="1.1" opacity=".88"/>
    <circle cx="15.8" cy="15.2" r="2.5" stroke="#26324e" stroke-width=".6" opacity=".8"/><circle cx="15.8" cy="15.2" r="1.7" fill="#26324e" stroke="none" opacity=".92"/><circle cx="15.3" cy="14.7" r=".55" fill="#fff" stroke="none"/>
    <path d="M3 12C8 14 12 8 17 9" stroke="${v}" stroke-width=".6" opacity=".5"/>`),

/* Dofus Cauchemar : œuf noir-violet, œil de braise à pupille fendue dans une fissure, volutes sombres */
hx_dofus_cauchemar: _dofusArt2('#9a6ac8', '#35154f', '#08020e', '#b07aff', '#ff3a5a', (v, c3, glow) => { const r = _id(), b = _id(); const eye = 'M6.6 16.4L9.4 14.2 11.6 15.2 13.8 12.4 16 13.2 18.2 12.2 20.4 14.6 22.6 13.8 25.4 16.4 22.4 18.6 20.2 18.8 18.4 21 16.2 20.2 13.6 21.4 11.6 19 9.2 19Z', cr = 'M6.6 16.4L4.2 15.6 2.8 17M5.4 16L4.8 13M25.4 16.4L28 15.4 29.4 17M26.6 16 27.2 12.8M16 13.2 15.4 10.6 16.6 8.4 15.8 5.8M16.2 20.2 17 23 15.6 25.4M10.4 14.6 9.2 11.6M21.6 14.2 22.8 11.2M12.4 19.8 11.4 22.6M19.6 19.4 20.8 22.2';
  const vol = (d, w) => `<path d="${d}" stroke="#05010a" stroke-width="${w}" opacity=".85"/><path d="${d}" stroke="#a070e8" stroke-width=".55" opacity=".85" transform="translate(-.5 -.5)"/>`;
  return `<defs><radialGradient id="${r}" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff6c0"/><stop offset=".4" stop-color="#ff9a2a"/><stop offset=".8" stop-color="#e0182e"/><stop offset="1" stop-color="#7a0818"/></radialGradient><radialGradient id="${b}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${glow}" stop-opacity=".6"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient></defs>
    ${vol('M3 24C5.4 28.6 11.6 28 11.2 24 10.8 21 7.4 21.6 7.6 24 7.8 25.4 9.6 25.4 9.8 24.4', 2.6)}${vol('M29 22C26.6 27.4 21 27 21.2 23.4 21.4 20.8 24.4 21.2 24.2 23.2', 2.4)}
    ${vol('M4.6 9.4C7 6.6 11.4 7.2 11.2 10 11 11.8 8.8 11.8 8.8 10.4', 2.2)}${vol('M28.4 11C25.6 8 21.6 8.6 22 11.2 22.4 13 24.4 12.6 24.2 11.4', 2)}
    <circle cx="16" cy="16.6" r="10" fill="url(#${b})" stroke="none"/>
    <path d="${cr}" stroke="${glow}" stroke-width="2.4" opacity=".35"/><path d="${cr}" stroke="${glow}" stroke-width="1.1"/><path d="${cr}" stroke="#ffd8a0" stroke-width=".35"/>
    <path d="${eye}" stroke="${glow}" stroke-width="2.2" opacity=".4"/><path d="${eye}" fill="url(#${r})" stroke="#2a0610" stroke-width=".6"/>
    <path d="M10.4 15.4C12.4 14 14.4 13.6 16 13.8" stroke="#fff" stroke-width=".6" opacity=".7"/>
    <ellipse cx="16" cy="16.6" rx="1.05" ry="3.7" fill="#14020a" stroke="#ffe0a0" stroke-width=".35"/><ellipse cx="15.6" cy="15.2" rx=".3" ry=".9" fill="#fff" stroke="none" opacity=".8"/>`; }),

/* ======================= RANG 8 · COMTE VESPÉRAL ======================= */

/* Rapière du Sang Éternel : lame de sang translucide et lumineuse, garde en ailes de chauve-souris, rubis au pommeau */
hx_rapiere_sang: () => { const b = _id(), m = _id(), sv = _id(), rb = _id(), lt = _id(), gp = _id(); const A = 42 * Math.PI / 180, cs = Math.cos(A), sn = Math.sin(A), K = .94, T = (x, y) => [(16 + ((x - 3.7) * cs + y * sn) * K).toFixed(1), (16 + (-(x - 3.7) * sn + y * cs) * K).toFixed(1)];
  const [tx, ty] = T(22.5, 0), [mx, my] = T(12, 1.2); const drop = (x, y, k = 1) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0-2.3C.5-1.2 1.3-.2 1.3 1 1.3 2 .7 2.6 0 2.6S-1.3 2-1.3 1C-1.3-.2-.5-1.2 0-2.3Z" fill="#ff2a4a" ${_k}/><ellipse transform="translate(${x} ${y}) scale(${k})" cx="-.45" cy=".7" rx=".3" ry=".55" fill="#fff" opacity=".85"/>`;
  return `<defs>${_c5g3(b, '#ffb4bf', '#e8203c', '#7a0820', 0, 1)}${_c5g3(m, '#6a4a98', '#251640', '#07030d', 0, 1)}${_lg(sv, '#f4f6fb', '#7e8498', 1, 1)}${_rg(rb, '#ffc0c8', '#b8081e', .36, .3, .85)}${_lg(lt, '#3a2c50', '#0a0610', 0, 1)}<radialGradient id="${gp}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff2a4a" stop-opacity=".5"/><stop offset="1" stop-color="#ff2a4a" stop-opacity="0"/></radialGradient></defs>
  <circle cx="${mx}" cy="${my}" r="9" fill="url(#${gp})"/>
  <g transform="translate(16 16) rotate(-42) scale(${K}) translate(-3.7 0)">
    <path d="M1.4 -2L18.2 -1.2 23.4 0 18.2 1.2 1.4 2Z" fill="url(#${b})" stroke="#2a0410" stroke-opacity=".95" stroke-width=".8" stroke-linejoin="round"/>
    <path d="M1.8 -1.6 18 -.9 21.8 -.1 18 .15 1.8 .15Z" fill="#fff" opacity=".3"/>
    <path d="M1.6 1.2 18 .75 22 .15" stroke="#4a0414" stroke-width=".5" opacity=".6" fill="none"/>
    ${_ln('M2.2 -.1C5 -.6 8 .6 11 0S17 -.3 21.6 0', '#ff7a8a', 1.7, .5)}${_ln('M2.2 -.1C5 -.6 8 .6 11 0S17 -.3 21.6 0', '#fff0d8', .6, .95)}
    <circle cx="5" cy=".7" r=".5" fill="#fff" opacity=".85"/><circle cx="9.4" cy="-.8" r=".4" fill="#fff" opacity=".75"/><circle cx="14.6" cy=".6" r=".35" fill="#fff" opacity=".75"/>
    <g transform="translate(-.6 0) scale(.68)"><g transform="rotate(-90)">${_c5wing(m)}</g></g><g transform="translate(-.6 0) scale(.68 -.68)"><g transform="rotate(-90)">${_c5wing(m)}</g></g>
    <rect x="-2.4" y="-1.55" width="4" height="3.1" rx="1" fill="url(#${sv})" ${_K}/>${_ln('M-1.6 -.9 .6 -.9', '#fff', .4, .8)}
    <circle cx="-.5" cy="0" r=".85" fill="url(#${rb})" ${_k}/>
    <path d="M-9.6 -1.1H-2.4V1.1H-9.6Z" fill="url(#${lt})" ${_K}/>${[-8.9, -7.6, -6.3, -5, -3.7].map(x => `<path d="M${x} -1.1L${x + 1} 1.1" stroke="#e4e8f4" stroke-width=".55"/>`).join('')}
    <ellipse cx="-2.7" cy="0" rx=".9" ry="1.7" fill="url(#${sv})" ${_K}/><ellipse cx="-10" cy="0" rx=".85" ry="1.6" fill="url(#${sv})" ${_K}/>
    <circle cx="-12.5" cy="0" r="3.3" fill="none" stroke="#140c06" stroke-opacity=".92" stroke-width="2.2"/><circle cx="-12.5" cy="0" r="3.3" fill="none" stroke="url(#${sv})" stroke-width="1.1"/>
    ${[45, 135, 225, 315].map(a => `<path transform="translate(-12.5 0) rotate(${a}) translate(0 -3.3)" d="M-.9 .6 0-1.2.9 .6Z" fill="url(#${sv})" ${_k}/>`).join('')}
    <circle cx="-12.5" cy="0" r="2.7" fill="url(#${rb})" ${_K}/><circle cx="-12.5" cy="0" r="1.7" fill="none" stroke="#fff" stroke-width=".3" opacity=".45"/>
    <ellipse cx="-13.4" cy="-1.1" rx=".95" ry=".55" fill="#fff" opacity=".9" transform="rotate(-30 -13.4 -1.1)"/><circle cx="-11.6" cy=".9" r=".35" fill="#ffb0b8" opacity=".8"/>
  </g>
  ${drop(+tx + .5, +ty + 5.4, 1.1)}${drop(+mx + 4.2, +my + 3.6, .8)}${drop(+mx + 1.4, +my + 9.4, .6)}
  ${_spark(5.4, 6.4, '#ff5a7a', .8)}${_spark(28.2, 20.4, '#fff', .8)}${_spark(14.2, 27.4, '#ff5a7a', .6)}`; },

/* Cape de Nuit du Comte : cape violet nuit à haut col dressé, doublure rouge sang, fermoir de chauve-souris d'argent serti d'un rubis */
hx_cape_nuit: () => { const v = _id(), r = _id(), sv = _id(), rb = _id(), dk = _id(), m = _id(), cp = _id();
  const C = 'M11.6 8.8C9.8 9.2 8.4 9.8 7.6 11.4C5.6 15.2 4.2 20.4 3.2 27.4Q6.2 26.2 9.2 30Q12.2 27.2 15.8 30.8Q19.6 27.4 22.8 30Q25.8 26.8 28.8 27.4C28 21 26.8 15.4 24.4 11.4C23.6 9.8 22.2 9.2 20.4 8.8Q16 10.8 11.6 8.8Z';
  const O = 'M14.8 11C13.6 15.6 11.8 22.4 9.2 30Q12.2 27.2 15.8 30.8Q19.6 27.4 22.8 30C20.2 22.4 18.4 15.6 17.2 11Q16 11.8 14.8 11Z';
  const wing = 'M5.2 2.2C6.2 5.4 7.2 8.2 8.4 10.8L14.8 11.2L14.6 8.6C11.8 6.6 8.2 4.2 5.2 2.2Z';
  const W = (t) => `<g ${t}><path d="${wing}" fill="url(#${v})" ${_K}/>${_ln('M14.6 8.6C11.8 6.6 8.2 4.2 5.2 2.2', '#ff3a56', 1.1)}${_ln('M5.8 3.4C6.8 6 7.6 8.2 8.8 10.2', '#d9d0e8', .7, .9)}${_ln('M7 5.2C8.8 6.4 10.4 7.8 12.2 9.4', '#8a6ac8', .5, .55)}${_gl('M6.2 3.8C7 6 7.6 7.4 8.2 8.4L7.6 8.4C7 7 6.6 5.6 6 4Z', .22)}</g>`;
  return `<defs>${_c5g3(v, '#6c52b0', '#31205e', '#0d0720', 1, 1)}${_c5g3(r, '#ff5a70', '#c01632', '#4a0614', 0, 1)}${_lg(sv, '#f4f6fb', '#7e8498', 1, 1)}${_rg(rb, '#ffc0c8', '#b8081e', .36, .3, .85)}<linearGradient id="${dk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14040c" stop-opacity=".75"/><stop offset=".5" stop-color="#14040c" stop-opacity=".1"/><stop offset="1" stop-color="#14040c" stop-opacity="0"/></linearGradient>${_c5g3(m, '#f4f6fb', '#c4cadc', '#7e8498', 0, 1)}<clipPath id="${cp}"><path d="${O}"/></clipPath></defs>${_sh(16, 31, 12.5, 1)}
  <path d="M5.2 2.2Q16 7.2 26.8 2.2L22.4 10.2Q16 12 9.6 10.2Z" fill="url(#${r})" ${_K}/><path d="M5.2 2.2Q16 7.2 26.8 2.2L24.6 6.4Q16 10.8 7.4 6.4Z" fill="#fff" opacity=".1"/>${_ln('M5.4 2.6Q16 7.4 26.6 2.6', '#ffb0bc', .6, .75)}<path d="M9.6 10.2Q16 12 22.4 10.2L21.6 6.8Q16 9.4 10.4 6.8Z" fill="#14040c" opacity=".35"/>
  <path d="${C}" fill="url(#${v})" ${_K}/>
  ${_ln('M9 12.4C7.6 17 6.8 22 6.4 27M12.6 14C11.4 18.4 10.6 22.6 9.6 28.4', '#05020c', .8, .55)}${_ln('M23.2 12.6C24.6 17.4 25.6 22.4 26 27.4M20.6 14.6C21.6 19.2 22.6 23.6 24 28', '#05020c', .8, .5)}${_ln('M10.2 12.4C8.6 17.2 7.6 22 7.2 27', '#9a7ad8', .5, .55)}${_ln('M24.8 12.2C26 16.8 27 21.6 27.4 26', '#9a7ad8', .45, .45)}
  ${_ln('M7.8 12.6C6.2 16.4 5.2 21.2 4.4 26.2M24.2 12.6C25.8 16.4 26.8 21.2 27.6 26.2', '#d9d0e8', .45, .85)}
  <path d="${O}" fill="url(#${r})" ${_K}/><path d="${O}" fill="url(#${dk})"/>
  <g clip-path="url(#${cp})">${_ln('M15.2 12.4C14.6 18 13 24 11.8 29.6M16.8 12.4C17.4 18 18.8 24 20 29.6M16 12.8V30', '#ff98a8', .6, .5)}${_ln('M14 14C13.4 19 12.2 24 10.6 29M18 14C18.6 19 19.8 24 21.4 29', '#4a0614', .7, .5)}</g>
  ${_ln('M14.8 11C13.6 15.6 11.8 22.4 9.2 30M17.2 11C18.4 15.6 20.2 22.4 22.8 30', '#e4e8f4', .8)}
  ${_ln('M3.2 27.4Q6.2 26.2 9.2 30Q12.2 27.2 15.8 30.8Q19.6 27.4 22.8 30Q25.8 26.8 28.8 27.4', '#c8ccd8', .65, .9)}
  ${[[3.2, 27.4], [9.2, 30], [15.8, 30.8], [22.8, 30], [28.8, 27.4]].map(([x, y]) => `<circle cx="${x}" cy="${y - .4}" r=".6" fill="url(#${sv})" ${_k}/>`).join('')}
  ${W('')}${W('transform="translate(32 0) scale(-1 1)"')}
  ${_ln('M12.4 11.4Q16 13.2 19.6 11.4', '#140c06', 1.2, .9)}${_ln('M12.4 11.4Q16 13.2 19.6 11.4', '#c8ccd8', .55)}
  <g transform="translate(15.2 11.2) scale(-.5 .5)">${_c5wing(m, '#4a4e66')}</g><g transform="translate(16.8 11.2) scale(.5 .5)">${_c5wing(m, '#4a4e66')}</g>
  <path d="M14.6 8.2 15 9.4 17 9.4 17.4 8.2 16.6 9 15.4 9Z" fill="url(#${sv})" ${_k}/><circle cx="16" cy="10.1" r="1.15" fill="url(#${sv})" ${_K}/>
  <ellipse cx="16" cy="12" rx="1.7" ry="2.4" fill="url(#${sv})" ${_K}/><circle cx="16" cy="12.1" r="1.05" fill="url(#${rb})" ${_K}/><circle cx="15.6" cy="11.7" r=".35" fill="#fff"/>
  ${_ln('M15.4 10 15.5 10M16.6 10 16.5 10', '#ff3a56', .5)}
  ${[[6.8, 17.2], [25.2, 19.4], [7.8, 23.4], [24, 14.8], [11.2, 25.6]].map(([x, y], i) => _spark(x, y, i % 2 ? '#fff' : '#e4dcff', .38)).join('')}
  ${_spark(29.4, 6.4, '#ff5a7a', .8)}${_spark(3, 7.6, '#fff', .6)}`; },

/* Calice de Sang du Comte Vespéral : coupe noire et argent emplie de sang luisant, pied en ailes de chauve-souris */
hx_relique_comte: () => { const k = _id(), sv = _id(), bl = _id(), m = _id(), rb = _id(), gl = _id();
  const bowl = 'M9.4 7.8C9.5 13.2 12 16.8 16 17.4C20 16.8 22.5 13.2 22.6 7.8A6.6 1.8 0 0 1 9.4 7.8Z';
  const dr = (x, y, k2 = 1) => `<g transform="translate(${x} ${y}) scale(${k2})"><path d="M0-2.4C.5-1.2 1.3-.2 1.3 1 1.3 2 .7 2.6 0 2.6S-1.3 2-1.3 1C-1.3-.2-.5-1.2 0-2.4Z" fill="#ff2a4a" ${_k}/><ellipse cx="-.45" cy=".7" rx=".3" ry=".55" fill="#fff" opacity=".85"/></g>`;
  return _relicFrame('hx_relique_comte') + `<defs>${_c5g3(k, '#5a4a76', '#1a1226', '#06030a', 1, 0)}${_lg(sv, '#f4f6fb', '#7e8498', 1, 1)}${_c5g3(bl, '#ff7a8a', '#d0122e', '#6a0618', 0, 1)}${_c5g3(m, '#6a4a98', '#251640', '#07030d', 0, 1)}${_rg(rb, '#ffc0c8', '#b8081e', .36, .3, .85)}<radialGradient id="${gl}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3a56" stop-opacity=".6"/><stop offset="1" stop-color="#ff3a56" stop-opacity="0"/></radialGradient></defs>
  <circle cx="16" cy="8" r="9" fill="url(#${gl})"/>
  <g transform="translate(14.4 23.2) scale(-.62 .62) rotate(30)">${_c5wing(m)}</g><g transform="translate(17.6 23.2) scale(.62 .62) rotate(30)">${_c5wing(m)}</g>
  <path d="M14.9 17.2H17.1L16.6 22.4H15.4Z" fill="url(#${sv})" ${_K}/>${_ln('M15.5 18V21.8', '#fff', .4, .8)}
  <ellipse cx="16" cy="19.8" rx="2.5" ry="1.6" fill="url(#${sv})" ${_K}/><circle cx="16" cy="19.8" r=".95" fill="url(#${rb})" ${_k}/><circle cx="15.7" cy="19.5" r=".3" fill="#fff"/>
  <path d="M12.4 24.4C12.4 23.4 14 22.6 16 22.6S19.6 23.4 19.6 24.4C19.6 25.4 18 26.2 16 26.2S12.4 25.4 12.4 24.4Z" fill="url(#${k})" ${_K}/><ellipse cx="16" cy="23.5" rx="2.9" ry=".75" fill="url(#${sv})" ${_k}/>${_ln('M13.4 25C14.6 25.6 17.4 25.6 18.6 25', '#c8ccd8', .5, .8)}
  <path d="${bowl}" fill="url(#${k})" ${_K}/>
  ${_ln('M10.4 9C10.7 12.2 12 14.6 13.6 15.8', '#fff', .85, .5)}${_ln('M21.4 9.6C21 12.6 19.8 14.8 18.4 16', '#6a5a8a', .6, .6)}
  ${_ln('M9.6 10.6Q16 13.6 22.4 10.6', '#140c06', 1.9, .9)}${_ln('M9.6 10.6Q16 13.6 22.4 10.6', '#d4d8e6', 1)}${_ln('M9.8 10.2Q16 13 22.2 10.2', '#fff', .35, .8)}
  ${[[12.4, 11.6], [16, 12.4], [19.6, 11.6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".62" fill="url(#${rb})" ${_k}/>`).join('')}
  ${_ln('M12 13.4C13 15 14.4 16.2 16 16.8C17.6 16.2 19 15 20 13.4', '#c8ccd8', .5, .8)}${_ln('M16 14.2V16.8M14.2 14C14.6 15.2 15.2 16 16 16.4M17.8 14C17.4 15.2 16.8 16 16 16.4', '#a8aec4', .35, .7)}
  ${dr(19.6, 13.8, .8)}
  <ellipse cx="16" cy="7.8" rx="6.6" ry="1.8" fill="url(#${bl})" stroke="#140c06" stroke-opacity=".92" stroke-width="2.2"/><ellipse cx="16" cy="7.8" rx="6.6" ry="1.8" fill="none" stroke="url(#${sv})" stroke-width="1.1"/>
  <ellipse cx="16" cy="8" rx="5.5" ry="1.15" fill="#ff98a6" opacity=".35"/>${_ln('M11.4 7.8C13 8.4 14.6 8.5 16 8.2', '#fff', .6, .8)}${_ln('M17.6 7.2C18.8 7.4 19.8 7.2 20.6 6.8', '#ffd0d8', .5, .7)}
  ${[[12.8, 4.6, .55], [19, 3.8, .65], [16.2, 2.8, .45]].map(([x, y, q]) => `<circle cx="${x}" cy="${y}" r="${q}" fill="#ff3a56"/><circle cx="${x - q * .3}" cy="${y - q * .35}" r="${q * .3}" fill="#fff" opacity=".8"/>`).join('')}
  ${dr(7.4, 13.4, .85)}${dr(25, 15.4, .7)}
  ${_spark(4.6, 6, '#fff', .9)}${_spark(27.6, 8.4, '#ffc27a', .8)}${_spark(26.8, 26, '#fff', .7)}${_spark(5.4, 25.4, '#ff5a7a', .6)}`; },

});
