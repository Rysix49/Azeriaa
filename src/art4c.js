/* =====================================================================
   ICÔNES D'ÉQUIPEMENT v4c — Ruelles de Srambad & Roseraie Noire (niv. 172-190)
   Srambad : prune, argent, rouge lanterne — capuche de rat, ailes de vampyro, dagues, rapière du comte
   Roseraie : pétales noirs, cramoisi, vert épine — lianes, roses noires, rosée de rubis
   Complète ITEM_ART (art.js / art2.js) — mêmes helpers (_id, _lg, _rg, _K, _k, _ln, _gl, _sh, _rod, _gem, _spark).
   Tous les helpers locaux sont préfixés _c4 (aucune collision avec les autres fichiers art4*).
   ===================================================================== */
/* rose noire vue de dessus : 5 pétales, bord cramoisi, cœur rubis en spirale */
const _c4rose = (x, y, r, rot = 0) => {
  const g = _id(), h = _id(); let lobes = '', rims = '';
  for (let i = 0; i < 5; i++) {
    const a = (rot + i * 72 - 90) * Math.PI / 180, cx = x + Math.cos(a) * r * .56, cy = y + Math.sin(a) * r * .56, lr = r * .5;
    lobes += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${lr.toFixed(2)}" fill="url(#${g})" ${_k}/>`;
    const a1 = a - 1.15, a2 = a + 1.15;
    rims += `M${(cx + Math.cos(a1) * lr).toFixed(2)} ${(cy + Math.sin(a1) * lr).toFixed(2)}A${lr.toFixed(2)} ${lr.toFixed(2)} 0 0 1 ${(cx + Math.cos(a2) * lr).toFixed(2)} ${(cy + Math.sin(a2) * lr).toFixed(2)}`;
  }
  return `<defs>${_rg(g, '#4a3560', '#120a1a', .4, .3, .85)}${_rg(h, '#ff6a86', '#7a0a24', .4, .35, .8)}</defs>${lobes}<circle cx="${x}" cy="${y}" r="${(r * .72).toFixed(2)}" fill="url(#${g})"/>${_ln(rims, '#d0204a', Math.max(.5, r * .15), .95)}
  <circle cx="${x}" cy="${y}" r="${(r * .62).toFixed(2)}" fill="none" stroke="#06030a" stroke-opacity=".55" stroke-width=".5"/><circle cx="${x}" cy="${y}" r="${(r * .38).toFixed(2)}" fill="url(#${h})" ${_k}/>
  ${_ln(`M${(x - r * .2).toFixed(2)} ${y}a${(r * .2).toFixed(2)} ${(r * .2).toFixed(2)} 0 1 1 ${(r * .4).toFixed(2)} 0`, '#4a0618', Math.max(.4, r * .1), .8)}<ellipse cx="${(x - r * .28).toFixed(2)}" cy="${(y - r * .34).toFixed(2)}" rx="${(r * .2).toFixed(2)}" ry="${(r * .12).toFixed(2)}" fill="#fff" opacity=".4" transform="rotate(-30 ${(x - r * .28).toFixed(2)} ${(y - r * .34).toFixed(2)})"/>`;
};
/* épine : base en (x,y), pointe vers (sin ang, -cos ang), bout d'os blanc */
const _c4th = (x, y, ang, len = 3.2, w = 1.15) => { len *= 1.2; return `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M${-w} 0L0 ${-len}L${w} 0Z" fill="#2a4a38" ${_k}/><path d="M0 ${(-len * .62).toFixed(2)}L0 ${(-len + .25).toFixed(2)}" stroke="#efe6d2" stroke-width=".8" stroke-linecap="round"/></g>`; };
/* liane noire et verte, reflet central */
const _c4vine = (d, w = 2.4) => _ln(d, '#07040a', w + 1.4, .95) + _ln(d, '#1f3a2a', w) + _ln(d, '#4a8a5c', w * .32, .85);
/* torsade : petits traits obliques le long d'une ellipse */
const _c4tw = (cx, cy, rx, ry, a0, a1, n, c = '#5a9a6c') => {
  let o = '';
  for (let i = 0; i <= n; i++) {
    const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180, px = cx + rx * Math.cos(a), py = cy + ry * Math.sin(a);
    const tx = -Math.sin(a) * .9, ty = Math.cos(a) * .9, nx = Math.cos(a) * 1.25, ny = Math.sin(a) * 1.25;
    o += `M${(px - nx - tx).toFixed(2)} ${(py - ny - ty).toFixed(2)}L${(px + nx + tx).toFixed(2)} ${(py + ny + ty).toFixed(2)}`;
  }
  return _ln(o, c, .6, .8);
};
/* pétale de rose noire : attache en (x,y), pointe vers le bas, ourlet cramoisi */
const _c4pet = (x, y, rot, w, h, id) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0C${-w * .6} ${h * .1} ${-w * 1.3} ${h * .5} ${-w * .9} ${h * .82}C${-w * .5} ${h * 1.02} ${w * .5} ${h * 1.02} ${w * .9} ${h * .82}C${w * 1.3} ${h * .5} ${w * .6} ${h * .1} 0 0Z" fill="url(#${id})" ${_K}/>
  <path d="M${-w * .9} ${h * .82}C${-w * .5} ${h * 1.02} ${w * .5} ${h * 1.02} ${w * .9} ${h * .82}" fill="none" stroke="#e0284e" stroke-width=".75" stroke-linecap="round"/>
  <path d="M0 ${h * .16}V${h * .66}M${-w * .4} ${h * .3}Q${-w * .5} ${h * .5} ${-w * .3} ${h * .66}M${w * .4} ${h * .3}Q${w * .5} ${h * .5} ${w * .3} ${h * .66}" stroke="#5a3478" stroke-width=".45" fill="none" opacity=".85"/>
  <path d="M${-w * .62} ${h * .22}C${-w * .9} ${h * .4} ${-w * .9} ${h * .56} ${-w * .7} ${h * .68}" stroke="#fff" stroke-width=".5" fill="none" opacity=".25"/></g>`;
/* feuille d'épine */
const _c4leaf = (x, y, rot, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C-2.2 -1.6 -2 -4.6 0 -5.8C2 -4.6 2.2 -1.6 0 0Z" fill="#2a6a42" ${_k}/><path d="M0 -.4V-4.8" stroke="#7aca94" stroke-width=".4"/></g>`;

Object.assign(ITEM_ART, {
/* ======================= SRAMBAD : prune, argent, rouge de lanterne ======================= */
coiffe_srambad: () => { const a = _id(), b = _id(), c = _id(), e = _id(), s = _id(); return `<defs>${_lg(a, '#5e4688', '#1c1430', 1, 1)}${_lg(b, '#9a7ad4', '#3a2a5a')}${_rg(c, '#1a1226', '#05030a', .5, .4, .8)}${_rg(e, '#ff9aa8', '#c0243a')}${_lg(s, '#f4f6fb', '#8a90a4', 1, 1)}</defs>${_sh(16, 29.4, 11, 1.8)}
  <circle cx="7.4" cy="8.4" r="3.9" fill="url(#${a})" ${_K}/><circle cx="7.6" cy="8.6" r="2.1" fill="#a85a7a" ${_k}/><path d="M6 7.4c.8-.8 1.8-1 2.8-.6" stroke="#fff" stroke-width=".5" fill="none" opacity=".4"/>
  <circle cx="24.6" cy="8.4" r="3.9" fill="url(#${a})" ${_K}/><circle cx="24.4" cy="8.6" r="2.1" fill="#a85a7a" ${_k}/><path d="M23.2 7c.8-.4 1.8-.2 2.6.4" stroke="#fff" stroke-width=".5" fill="none" opacity=".3"/>
  <path d="M4.6 27.6C2.8 19 6.4 10.6 12.6 6.2C14 4.8 15.2 3.2 16 2.4C16.8 3.2 18 4.8 19.4 6.2C25.6 10.6 29.2 19 27.4 27.6C23.4 29.6 8.6 29.6 4.6 27.6Z" fill="url(#${a})" ${_K}/>
  <path d="M27.4 27.6C29.2 19 25.6 10.6 19.4 6.2C23.2 12 24.4 20 23 28.6C24.6 28.5 26.2 28.2 27.4 27.6Z" fill="#000" opacity=".26"/>
  ${_ln('M7 21C6.6 16.4 8.6 12 12 8.6', '#a98aff', 1, .65)}<path d="M16 3.4V8" stroke="#a98aff" stroke-width=".7" stroke-dasharray="1 1.1" fill="none" opacity=".8"/>
  <path d="M8.8 27.8C7.4 19.4 10.2 12.4 16 8.6C21.8 12.4 24.6 19.4 23.2 27.8Z" fill="url(#${b})" ${_K}/>
  <path d="M10.4 28C9.4 20.6 11.8 14.4 16 11.4C20.2 14.4 22.6 20.6 21.6 28C19 28.8 13 28.8 10.4 28Z" fill="url(#${c})" ${_k}/>
  <circle cx="13" cy="20.2" r="2.7" fill="#ff3a54" opacity=".28"/><circle cx="19" cy="20.2" r="2.7" fill="#ff3a54" opacity=".28"/>
  <ellipse cx="13" cy="20.2" rx="1.7" ry="1.2" fill="url(#${e})" stroke="#2a0610" stroke-width=".5"/><ellipse cx="19" cy="20.2" rx="1.7" ry="1.2" fill="url(#${e})" stroke="#2a0610" stroke-width=".5"/>
  <ellipse cx="13.2" cy="20.2" rx=".4" ry=".95" fill="#3a0612"/><ellipse cx="19.2" cy="20.2" rx=".4" ry=".95" fill="#3a0612"/><circle cx="12.2" cy="19.6" r=".42" fill="#fff" opacity=".9"/><circle cx="18.2" cy="19.6" r=".42" fill="#fff" opacity=".9"/>
  <ellipse cx="16" cy="24.2" rx=".95" ry=".6" fill="#d08a9a"/>${_ln('M13.4 25.2l-4.4 .8M13.6 26.4l-4 1.8M18.6 25.2l4.4 .8M18.4 26.4l4 1.8', '#c8ccd8', .45, .5)}
  ${_ln('M22.6 14.4l2.2 1.8-1.8 1 2.4 2', '#0c0814', 1)}${_ln('M21.8 16l4.2.6M22.4 18.4l3.4-.2', '#c8ccd8', .45, .85)}
  ${_rod(20.2, 27, 26.2, 20.6, '#f4f6fb', '#8a90a4', 1)}<circle cx="26.9" cy="19.9" r="1.55" fill="url(#${s})" ${_K}/><circle cx="26.6" cy="19.6" r=".6" fill="#ff5a7a"/>`; },

cape_srambad: () => { const o = _id(), l = _id(), s = _id(); return `<defs>${_lg(o, '#5e4688', '#1c1430')}${_lg(l, '#ff4a64', '#6a0a22')}${_lg(s, '#f4f6fb', '#8a90a4', 1, 1)}</defs>${_sh(16, 30, 12.5, 1.5)}
  <path d="M10 4.8L3.6 26.6Q7 23.6 10.6 28.6Q16 24 21.4 28.6Q25 23.6 28.4 26.6L22 4.8Q16 6.4 10 4.8Z" fill="url(#${o})" ${_K}/>
  <path d="M12 5.8L10.6 28.2Q16 24.2 21.4 28.2L20 5.8Q16 7.4 12 5.8Z" fill="url(#${l})" ${_K}/>
  ${_ln('M13.2 8L12.4 25M16 9V24.6M18.8 8L19.6 25', '#ffb0bc', .6, .5)}
  ${_ln('M10.6 6L4 25.8M10.6 6L7.2 24.4', '#d9d0e8', .75, .85)}${_ln('M21.4 6L28 25.8M21.4 6L24.8 24.4', '#d9d0e8', .75, .85)}
  ${_ln('M3.6 26.6Q7 23.6 10.6 28.6Q16 24 21.4 28.6Q25 23.6 28.4 26.6', '#c8ccd8', .55, .7)}
  <path d="M10.2 5.8L7.6 1.4L15 4.4Z" fill="url(#${o})" ${_K}/><path d="M21.8 5.8L24.4 1.4L17 4.4Z" fill="url(#${o})" ${_K}/>${_ln('M9.6 4.6L8.6 2.8M22.4 4.6L23.4 2.8', '#e0344e', .9)}
  <path d="M16 4.5L16.8 5.5L17.8 5C19.6 5 20.6 5.8 21 7.2C19.8 6.6 19 6.9 18.6 7.9C18.2 7.3 17.4 7.3 17 7.9L16 7.1L15 7.9C14.6 7.3 13.8 7.3 13.4 7.9C13 6.9 12.2 6.6 11 7.2C11.4 5.8 12.4 5 14.2 5L15.2 5.5Z" fill="url(#${s})" ${_K}/><circle cx="16" cy="6.3" r=".6" fill="#ff3a54"/>
  ${_gl('M11.4 7.4L5.8 22.4L6.8 22L11.8 8.8Z', .2)}`; },

ceinture_srambad: () => {
  const b = _id(), s = _id(), k = _id(), r = _id(), g = _id();
  const dagger = (x, t) => `<g transform="rotate(${t} ${x} 14)"><path d="M${x - 1.2} 11.2H${x + 1.2}L${x + .9} 22.6L${x} 27.4L${x - .9} 22.6Z" fill="url(#${k})" ${_K}/>${_ln(`M${x} 12V25.6`, '#6a6e80', .45, .7)}${_ln(`M${x - .6} 12.4V21`, '#fff', .4, .8)}
    <rect x="${x - 2.4}" y="9.8" width="4.8" height="1.6" rx=".8" fill="url(#${s})" ${_K}/><rect x="${x - .95}" y="5.2" width="1.9" height="4.7" rx=".6" fill="#2a1f3a" ${_K}/>${_ln(`M${x - .95} 6.4l1.9 .7M${x - .95} 8l1.9 .7`, '#d0204a', .5)}
    <circle cx="${x}" cy="4.6" r="1.4" fill="url(#${s})" ${_K}/><path d="M${x - 2} 15.7H${x + 2}V18.1H${x - 2}Z" fill="#6a5290" ${_K}/><circle cx="${x}" cy="16.9" r=".5" fill="#c8ccd8"/></g>`;
  return `<defs>${_lg(b, '#4e3a66', '#150f1e')}${_lg(s, '#f4f6fb', '#7e8498', 1, 1)}${_lg(k, '#f0f3fa', '#8a90a8', 1, 0)}${_lg(r, '#ee3a54', '#6a0a22')}${_rg(g, '#ff9aa8', '#a0102a')}</defs>${_sh(16, 30, 13, 1.4)}
  <path d="M19.2 20.6L18.6 29L20.8 27.2L22.2 29.6L23.2 27.4L25.2 28.8L24.8 20.4Z" fill="url(#${r})" ${_K}/>${_ln('M18.9 26.2L25 25.8', '#c8ccd8', .6, .85)}${_ln('M21.8 21.8L21.4 26.4', '#6a0a22', .7, .7)}
  <path d="M1.8 12Q16 14 30.2 12V19.8Q16 21.8 1.8 19.8Z" fill="url(#${b})" ${_K}/>${_gl('M2.6 12.9Q16 14.9 29.4 12.9V13.8Q16 15.8 2.6 13.8Z', .13)}
  <path d="M2.4 13.4Q16 15.4 29.6 13.4" fill="none" stroke="#a98aff" stroke-width=".5" stroke-dasharray="1.2 1.1" opacity=".75"/><path d="M2.4 18.4Q16 20.4 29.6 18.4" fill="none" stroke="#a98aff" stroke-width=".5" stroke-dasharray="1.2 1.1" opacity=".6"/>
  ${dagger(5.8, -4)}${dagger(10.6, 3)}${dagger(26.4, 4)}
  <rect x="12.4" y="12" width="7.2" height="8.8" rx="1.6" fill="url(#${s})" ${_K}/><rect x="14.1" y="14" width="3.8" height="4.8" rx=".7" fill="#1a1226" ${_k}/>
  ${_ln('M14.3 16.4H17.5', '#c8ccd8', 1)}<circle cx="16" cy="16.4" r="1.25" fill="url(#${g})" ${_K}/><circle cx="15.6" cy="16" r=".4" fill="#fff" opacity=".8"/>${_gl('M13.2 13h4.2', .6)}`;
},

bottes_srambad: () => { const l = _id(), f = _id(), s = _id(); return `<defs>${_lg(l, '#58407e', '#1a1226', 1, 1)}${_lg(f, '#a89ac8', '#4a3d66')}${_lg(s, '#f4f6fb', '#7e8498', 0, 1)}</defs>
  ${_ln('M8.2 23.6C4 21.6 8.6 18.8 4.8 16C3 14.6 4.6 12.2 6.6 11.4', '#a98aff', 1.9, .5)}${_ln('M8.2 23.6C4 21.6 8.6 18.8 4.8 16C3 14.6 4.6 12.2 6.6 11.4', '#e4d6ff', .65, .75)}${_ln('M29.6 20.6C31.6 18.4 29.4 16.4 30.8 14.2', '#a98aff', 1.3, .5)}
  <path d="M11 6.4H19.8L20.4 16.8C23.4 17.8 27.2 19.2 30 22.2C30.6 23.6 29.8 25 28.2 25.4H9.8C8.8 25.4 8.4 24.4 8.6 23.4C9.8 21.4 10.6 19.4 10.8 16.6Z" fill="url(#${l})" ${_K}/>
  <path d="M8.6 24.8H29.6C29.6 26.8 28.4 28 26.8 28H10.4C9 28 8.4 26.8 8.6 24.8Z" fill="#120d1a" ${_K}/>${_ln('M10.4 26.7H27', '#8a90a4', .5, .7)}
  <path d="M9.8 5.6C9.8 3.4 12 2.6 15.4 2.6S21.2 3.4 21.2 5.6L20.6 9.6C18.6 10.6 12.2 10.6 10.2 9.6Z" fill="url(#${f})" ${_K}/>
  <path d="M10.4 4.8C10.4 3.3 12.4 2.9 15.4 2.9S20.6 3.3 20.6 4.8C20.6 6.3 18.6 6.9 15.4 6.9S10.4 6.3 10.4 4.8Z" fill="#0c0814" ${_k}/>${_ln('M11 5.2C12.2 6.3 18.6 6.3 19.8 5.2', '#d0204a', .8, .95)}
  <g fill="#fff" opacity=".35"><circle cx="11.6" cy="8.6" r=".35"/><circle cx="14" cy="9.1" r=".3"/><circle cx="17.4" cy="8.9" r=".35"/><circle cx="19.4" cy="8.4" r=".3"/></g>
  <path d="M10.6 12.2H20.2V14.4H10.6Z" fill="url(#${s})" ${_K}/><rect x="17.2" y="11.7" width="2.6" height="3.2" rx=".6" fill="none" stroke="#140c06" stroke-width=".8"/><circle cx="18.5" cy="13.3" r=".45" fill="#140c06"/>
  <path d="M10.4 16.8L20.4 17.2L20.6 19.2L10.1 18.8Z" fill="url(#${s})" ${_K}/><circle cx="12.6" cy="18" r=".45" fill="#6a6e80"/><circle cx="15.2" cy="18.1" r=".45" fill="#6a6e80"/>
  ${_gl('M11.6 7.4C12 9.6 12 14 11.7 16', .22)}${_ln('M22 20.2C24.4 20.8 27 21.8 28.6 23', '#c8a8ff', .6, .5)}
  <circle cx="7.4" cy="29" r="2" fill="#6a4aa0" opacity=".5"/><circle cx="11.6" cy="30.2" r="1.5" fill="#8a6ac4" opacity=".45"/><circle cx="26" cy="30" r="1.8" fill="#6a4aa0" opacity=".45"/><circle cx="29.8" cy="28.2" r="1.3" fill="#8a6ac4" opacity=".5"/>`; },

rapiere_comte: () => { const s = _id(), bl = _id(), w = _id(); return `<defs>${_lg(s, '#f4f6fb', '#7e8498', 1, 1)}${_lg(bl, '#ffffff', '#9aa0b4', 0, 1)}${_lg(w, '#4e386c', '#150f1e', 0, 1)}</defs>
  <g transform="translate(11 21.2) rotate(-45)">
    <path d="M-.4 -1.3L21.4 -.55L25 0L21.4 .55L-.4 1.3Z" fill="url(#${bl})" ${_K}/>${_ln('M1 0H19.8', '#c0243a', .75)}${_ln('M1.2 -.95H21', '#fff', .35, .85)}
    <path d="M-10 -1.2H-2.4V1.2H-10Z" fill="url(#${w})" ${_K}/>${_ln('M-9.4 -1.2l1 2.4M-7.6 -1.2l1 2.4M-5.8 -1.2l1 2.4M-4 -1.2l1 2.4', '#c8ccd8', .6, .9)}
    <circle cx="-11.2" cy="0" r="2" fill="url(#${s})" ${_K}/><circle cx="-11.2" cy="0" r=".8" fill="#ff5a7a"/>
    <path d="M-1.2 -3.9C-7.2 -3.9 -7.2 3.9 -1.2 3.9Z" fill="url(#${s})" ${_K}/>${_ln('M-1.6 -2.5C-4.8 -2.7 -5.4 2.3 -1.8 2.7M-2.4 -1.3C-4 -1 -4 1.2 -2.4 1.5', '#5a5e72', .5, .9)}
    <g transform="scale(.88)"><path d="M-1.4 1C-2 4 -1.6 6.8 .4 9C.4 7 1.6 6 3 5.6C2.4 4.4 3.2 3.2 4.2 2.6C3.6 2 3.6 1.4 3.8 1Z" fill="url(#${s})" ${_K}/>${_ln('M-.4 1.7C-.2 4 -.2 6 .2 8.2', '#6a6e80', .5, .8)}</g>
    <g transform="scale(.88 -.88)"><path d="M-1.4 1C-2 4 -1.6 6.8 .4 9C.4 7 1.6 6 3 5.6C2.4 4.4 3.2 3.2 4.2 2.6C3.6 2 3.6 1.4 3.8 1Z" fill="url(#${s})" ${_K}/>${_ln('M-.4 1.7C-.2 4 -.2 6 .2 8.2', '#6a6e80', .5, .8)}</g>
    <rect x="-1.2" y="-1.9" width="2.6" height="3.8" rx=".8" fill="url(#${s})" ${_K}/>${_gem(-1.7, 0, 1.4, '#ff9aa8', '#a0102a')}
  </g>${_spark(29.6, 6.6, '#fff', .9)}${_spark(5.6, 13, '#ff5a7a', .7)}`; },

/* ======================= ROSERAIE NOIRE : pétales noirs, cramoisi, épines ======================= */
coiffe_roseraie: () => `${_sh(16, 29.4, 11, 1.6)}
  ${_c4th(4.6, 14.2, -62)}${_c4th(10.9, 10.4, -20, 4)}${_c4th(21.1, 10.4, 20, 4)}${_c4th(27.4, 14.2, 62)}${_c4th(9.6, 8.2, -42, 3)}${_c4th(22.4, 8.2, 42, 3)}
  ${_c4vine('M4 17A12 7.6 0 0 1 28 17', 2.1)}
  ${_c4th(5.4, 20.6, -125)}${_c4th(10.2, 23.4, -160)}${_c4th(16, 24.6, 180, 3.4)}${_c4th(21.8, 23.4, 160)}${_c4th(26.6, 20.6, 125)}
  ${_c4vine('M4 17A12 7.6 0 0 0 28 17', 3)}${_c4tw(16, 17, 12, 7.6, 12, 168, 12)}
  <circle cx="6.9" cy="22" r="1.2" fill="#d0204a" ${_k}/><circle cx="25.1" cy="22" r="1.2" fill="#d0204a" ${_k}/><circle cx="6.5" cy="21.6" r=".4" fill="#fff" opacity=".8"/><circle cx="24.7" cy="21.6" r=".4" fill="#fff" opacity=".8"/>
  ${_c4leaf(11.4, 12.4, -70, .8)}${_c4leaf(20.6, 12.4, 70, .8)}
  ${_c4rose(5.8, 13.2, 3.5, 10)}${_c4rose(26.2, 13.2, 3.5, -10)}${_c4rose(16, 9.2, 4.6, 0)}${_spark(28.6, 5.6, '#ff5a7a', .8)}${_spark(3.6, 6, '#fff', .6)}`,

cape_roseraie: () => { const a = _id(), b = _id(), c = _id(), l = _id(); return `<defs>${_lg(a, '#2c1a3c', '#0c0612')}${_lg(b, '#3c2852', '#140c1e')}${_lg(c, '#4c3466', '#1a1026')}${_lg(l, '#b01238', '#2a0612')}</defs>${_sh(16, 30, 12.5, 1.5)}
  <path d="M12.2 6L8.6 28.4Q16 31.4 23.4 28.4L19.8 6Z" fill="url(#${l})" ${_K}/>${_ln('M14 9L12.2 27M16 10V29M18 9L19.8 27', '#ff6a86', .5, .5)}
  ${_c4pet(6.2, 11.4, 12, 3.4, 16.2, a)}${_c4pet(25.8, 11.4, -12, 3.4, 16.2, a)}${_c4pet(10.4, 11.4, 5, 3.4, 16, a)}${_c4pet(21.6, 11.4, -5, 3.4, 16, a)}
  ${_c4pet(9, 8.4, 8, 3.2, 13.4, b)}${_c4pet(23, 8.4, -8, 3.2, 13.4, b)}${_c4pet(12.8, 8.4, 3, 3.1, 12.6, b)}${_c4pet(19.2, 8.4, -3, 3.1, 12.6, b)}
  ${_c4pet(12.8, 5.4, 4, 3, 9, c)}${_c4pet(19.2, 5.4, -4, 3, 9, c)}${_c4pet(16, 5.2, 0, 2.8, 8, c)}
  ${_c4th(10.2, 4.6, -32, 3)}${_c4th(13.6, 3.2, -10, 3.2)}${_c4th(18.4, 3.2, 10, 3.2)}${_c4th(21.8, 4.6, 32, 3)}
  ${_c4vine('M8 6.4C10.6 2.8 21.4 2.8 24 6.4', 2.2)}
  ${_c4leaf(11.6, 4.4, -40, .6)}${_c4leaf(20.4, 4.4, 40, .6)}${_c4rose(16, 5, 3.1, 0)}${_spark(28, 14, '#ff5a7a', .6)}`; },

amulette_roseraie: () => { const m = _id(), s = _id(), d = _id(); return `<defs>${_rg(m, '#6a1030', '#1c0410', .5, .4, .8)}${_lg(s, '#f4f6fb', '#7e8498', 1, 1)}${_rg(d, '#ff8aa0', '#9a0e2a', .4, .3, .8)}</defs>
  ${_ln('M7.2 1.4C7.2 10.2 10.8 14 16 14.8C21.2 14 24.8 10.2 24.8 1.4', '#140c06', 2.5, .9)}${_ln('M7.2 1.4C7.2 10.2 10.8 14 16 14.8C21.2 14 24.8 10.2 24.8 1.4', '#c8ccd8', 1.3)}<path d="M7.2 1.4C7.2 10.2 10.8 14 16 14.8C21.2 14 24.8 10.2 24.8 1.4" fill="none" stroke="#4a4e62" stroke-width="1.3" stroke-dasharray=".5 1.2"/>${_ln('M7.2 1.4C7.2 10.2 10.8 14 16 14.8', '#fff', .4, .6)}
  ${[[7.4, 5.4, -90], [8.4, 9.6, -118], [24.6, 5.4, 90], [23.6, 9.6, 118]].map(([x, y, a]) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-.8 0L0 -2.2L.8 0Z" fill="#c8ccd8" ${_K}/></g>`).join('')}
  <ellipse cx="16" cy="13.8" rx="1.7" ry="2.2" fill="none" stroke="#140c06" stroke-width="2.2"/><ellipse cx="16" cy="13.8" rx="1.7" ry="2.2" fill="none" stroke="url(#${s})" stroke-width="1.1"/>
  ${Array.from({ length: 8 }, (_, i) => { const a = i * 45, r = a * Math.PI / 180; return `<ellipse cx="${(16 + Math.cos(r) * 8).toFixed(2)}" cy="${(21 + Math.sin(r) * 8).toFixed(2)}" rx=".95" ry="1.9" transform="rotate(${a + 90} ${(16 + Math.cos(r) * 8).toFixed(2)} ${(21 + Math.sin(r) * 8).toFixed(2)})" fill="url(#${s})" ${_k}/>`; }).join('')}
  <circle cx="16" cy="21" r="7.4" fill="#140c06" opacity=".9"/><circle cx="16" cy="21" r="7" fill="url(#${m})"/><circle cx="16" cy="21" r="7" fill="none" stroke="url(#${s})" stroke-width="1.5"/><circle cx="16" cy="21" r="5.9" fill="none" stroke="#fff" stroke-width=".35" opacity=".6"/>
  ${_ln('M9.6 18.4C10.4 14.6 14 13.4 16 15.2M22.4 18.4C21.6 14.6 18 13.4 16 15.2M9.6 23.6C10.4 27.4 14 28.6 16 26.8M22.4 23.6C21.6 27.4 18 28.6 16 26.8', '#c8ccd8', .5, .8)}
  ${_c4rose(16, 21, 5.4, 6)}
  <path d="M19.8 22.6C20.8 24.2 21.6 25 21.6 26C21.6 27.2 20.8 28 19.8 28C18.8 28 18 27.2 18 26C18 25 18.8 24.2 19.8 22.6Z" fill="url(#${d})" ${_K}/><ellipse cx="19.2" cy="25.4" rx=".5" ry=".8" fill="#fff" opacity=".85"/>${_spark(26.6, 27, '#ff5a7a', .8)}${_spark(4.6, 25, '#fff', .7)}`; },

anneau_roseraie: () => { const d = _id(); return `<defs>${_rg(d, '#ff8aa0', '#9a0e2a', .4, .3, .8)}</defs>${_sh(16, 29.2, 8.4, 1.4)}
  ${_c4th(7.2, 21.6, -105, 3.4)}${_c4th(24.8, 21.6, 105, 3.4)}${_c4th(16, 28.2, 180, 3.2)}${_c4th(10.6, 26.2, -145, 2.8)}${_c4th(21.4, 26.2, 145, 2.8)}
  <circle cx="16" cy="20.2" r="8" fill="none" stroke="#07040a" stroke-opacity=".95" stroke-width="5.2"/><circle cx="16" cy="20.2" r="8" fill="none" stroke="#1f3a2a" stroke-width="3.6"/><circle cx="16" cy="20.2" r="8" fill="none" stroke="#4a8a5c" stroke-width="1.1" stroke-opacity=".8"/>
  ${_c4tw(16, 20.2, 8, 8, 0, 360, 20, '#78b88c')}
  ${_ln('M9.6 16.4C10.6 14.2 12.4 13 14 12.8', '#fff', .8, .55)}
  ${_c4leaf(10.8, 12.6, -62, .9)}${_c4leaf(21.2, 12.6, 62, .9)}${_c4rose(16, 10.2, 4.6, 0)}
  <path d="M19.4 11.2C20.2 12.4 20.8 13 20.8 13.8C20.8 14.7 20.2 15.2 19.4 15.2C18.6 15.2 18 14.7 18 13.8C18 13 18.6 12.4 19.4 11.2Z" fill="url(#${d})" ${_K}/><ellipse cx="18.9" cy="13.4" rx=".4" ry=".65" fill="#fff" opacity=".85"/>${_spark(27, 8, '#ff5a7a', .8)}${_spark(5.4, 6.4, '#fff', .6)}`; },

fouet_epines: () => { const s = _id(); return `<defs>${_lg(s, '#f4f6fb', '#7e8498', 1, 1)}</defs>
  ${_rod(6.4, 25.6, 14.6, 17.4, '#4e386c', '#120c1a', 3.3)}${_ln('M7.8 21.8L10.4 24.4M9.6 20L12.2 22.6M11.4 18.6L13.6 20.8', '#d0204a', .95)}${_c4th(9.6, 21.4, -135, 2.6, .9)}
  ${_c4th(21.2, 16.8, 178, 3)}${_c4th(28.2, 12.6, 82, 2.8)}${_c4th(27.2, 8.8, 40, 2.8)}${_c4th(22.6, 7.2, -8, 3)}${_c4th(18.6, 9.4, -75, 2.8)}${_c4th(23.4, 14, 150, 2.2, .9)}
  ${_c4vine('M15.4 16.6C19.2 17.2 22.6 16.8 25 15.6', 2.1)}${_c4vine('M25 15.6C28 14.2 29.2 9.8 24.6 8', 1.9)}${_c4vine('M24.6 8C20.4 6.6 17.6 10.6 20.6 13', 1.6)}${_c4vine('M20.6 13C23 14.8 26 12.6 25 10.4', 1.2)}
  <path d="M13.9 18.1L15.5 16.5" stroke="#140c06" stroke-width="4.4" stroke-linecap="round"/><path d="M13.9 18.1L15.5 16.5" stroke="url(#${s})" stroke-width="2.9" stroke-linecap="round"/>${_ln('M13.4 17.5L15 15.9', '#d0204a', .8, .95)}
  ${_c4rose(5.2, 26.8, 4.6, 0)}
  <path d="M25 10.4l1.2 1.5-1.2 1.5-1.2-1.5Z" fill="#ff4a64" ${_k}/>${_spark(29.4, 4.2, '#ff5a7a', .9)}${_spark(14.4, 12, '#fff', .7)}${_spark(3.6, 18, '#fff', .55)}`; },
});
