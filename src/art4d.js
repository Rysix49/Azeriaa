/* =====================================================================
   ICÔNES v4 — reliques et Dofus des nouvelles terres (Pandala, Dunes, Srambad)
   Reliques : même cadre doré rayonnant que art2/art3 (_relicFrame) autour d'un symbole simple.
   Dofus : œufs magiques à motif propre (feuilles de jade, sable, volutes, nuit étoilée).
   Chargé après art3.js : réutilise _id _lg _rg _K _k _gl _ln _spark _halo _sh _relicFrame _RELIC_COL.
   ===================================================================== */
Object.assign(ITEM_ART, {

/* ======================= Perle du Dragon de Jade : dragon de jade lové autour d'une perle ======================= */
relique_dragon_jade: () => { const j = _id(), p = _id(), g = _id(); return _halo('#7affb0') + `<defs>${_lg(j, '#d4ffe2', '#168a46', 1, 1)}${_rg(p, '#ffffff', '#27c46e', .36, .3, .85)}${_lg(g, '#fff0b0', '#c8901a', 1, 1)}</defs>
  <circle cx="19.6" cy="12.2" r="9" fill="#7affb0" opacity=".2"/>
  <path d="M25.6 24.8C22.6 30 11.2 30.6 7 24.8 4.2 20.6 6.2 15.6 10.6 15.2" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.6" stroke-linecap="round"/>
  <path d="M25.6 24.8C22.6 30 11.2 30.6 7 24.8 4.2 20.6 6.2 15.6 10.6 15.2" fill="none" stroke="url(#${j})" stroke-width="3.8" stroke-linecap="round"/>
  ${_ln('M8.4 28.2C12 31 20 30.4 23.6 27.6', '#0a5a2a', .9, .5)}${_ln('M7.6 22.6c.4 1.4 1.2 2.2 2.4 2.6M12.2 26.8c1 .6 2.2.8 3.4.6M18.6 27.6c1.2 0 2.4-.4 3.2-1.2', '#e6fff0', .7, .75)}
  ${[[4.8, 21.6, -72], [6.4, 26.6, -40], [10.6, 29.6, -10], [16.4, 30.6, 0], [22, 29.2, 28]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M-1.4 0 0-3 1.4 0Z" fill="url(#${g})" ${_k}/>`).join('')}
  <circle cx="19.6" cy="12.2" r="6.6" fill="url(#${p})" ${_K}/>
  <circle cx="19.6" cy="12.2" r="4.4" fill="none" stroke="#e8fff0" stroke-width=".6" opacity=".55"/>${_ln('M16.6 9.4c1-1.6 2.6-2.4 4.4-2.2', '#fff', 1.1, .85)}<circle cx="22.2" cy="15" r="1" fill="#fff" opacity=".35"/>
  ${(() => { const cx = 19.6, cy = 12.2, P = (t, r) => [cx + r * Math.cos(t * Math.PI / 180), cy + r * Math.sin(t * Math.PI / 180)]; const [x1, y1] = P(8, 9.4), [x2, y2] = P(92, 9.4);
    return `<path d="M25.2 24.8c-1.2-1.6-1.8-3.4-1.6-5.4" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="4.8" stroke-linecap="round"/><path d="M25.2 24.8c-1.2-1.6-1.8-3.4-1.6-5.4" fill="none" stroke="url(#${j})" stroke-width="3" stroke-linecap="round"/>
    <path d="M${x1.toFixed(1)} ${y1.toFixed(1)}A9.4 9.4 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="4.6" stroke-linecap="round"/><path d="M${x1.toFixed(1)} ${y1.toFixed(1)}A9.4 9.4 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="url(#${j})" stroke-width="2.8" stroke-linecap="round"/>
    ${[18, 42, 66, 90].map(t => { const [x, y] = P(t, 8.4); return `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${t})" d="M1.4 -1.3 -2.4 0 1.4 1.3Z" fill="#fff6d0" ${_k}/>`; }).join('')}`; })()}
  <path d="M5.6 15.6C4.8 12.4 6.6 10.2 9.8 10.2c2.2 0 3.6.8 5.2 1.4l.4 2.8c-1.4 1.6-3.2 2.6-5.2 3.2-2.4.6-4.2.4-4.6-2Z" fill="url(#${j})" ${_K}/>
  <path d="M14.8 12.4c1.4.6 2.4 1.6 2.6 3-1.6.4-2.8-.2-3.6-1.4Z" fill="url(#${j})" ${_k}/>
  <path d="M8 11.4C6.6 8.4 4.2 7.4 2.4 8 4 8.8 4.8 10 5.2 11.8ZM10.4 10.4c.4-3 2-4.8 4-5-.8 1.2-1 2.8-.6 4.8Z" fill="url(#${g})" ${_K}/>
  <ellipse cx="9.4" cy="12.8" rx="1.9" ry="1.6" fill="#fff4b0" ${_k}/><ellipse cx="9.6" cy="12.8" rx=".6" ry="1.3" fill="#2a1408"/><circle cx="9" cy="12.2" r=".4" fill="#fff"/>
  ${_ln('M14.4 14.2c2.2 1.4 3.6 3 5.2 3.4', '#9bffc0', .7, .8)}${_ln('M13.4 12c.8-1.6 2.4-2.2 4.4-1.6', '#9bffc0', .6, .6)}
  ${_gl('M7 11.4c.8-.6 1.8-.8 2.8-.6-1.2.4-2 1-2.6 2Z', .55)}`; },

/* ======================= Perle Céleste de la Carpe-Dragon : koï or-orange autour d'une perle nacrée, lotus rose ======================= */
relique_carpe: () => { const k = _id(), p = _id(), l = _id(), f = _id(); return _halo('#ffb0d8') + `<defs>${_lg(k, '#ffd27a', '#ff6a1a', 1, 1)}${_rg(p, '#ffffff', '#c8b4ff', .36, .3, .9)}${_lg(l, '#ffe4f2', '#ff6aa8', 0, 1)}${_lg(f, '#ffe9a0', '#ff8a2a', 1, 0)}</defs>
  ${[-62, -31, 0, 31, 62].map(a => `<path transform="rotate(${a} 16 17)" d="M16 17C12.4 12.6 12.6 6 16 2.6c3.4 3.4 3.6 10 0 14.4Z" fill="url(#${l})" ${_k}/>`).join('')}
  ${_ln('M16 15.4V5M12.6 14l-3-5.4M19.4 14l3-5.4', '#ff9ac4', .6, .7)}
  <circle cx="16" cy="12.8" r="6.2" fill="url(#${p})" ${_K}/><circle cx="16" cy="12.8" r="4.2" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>${_ln('M12.8 10.4c.8-1.6 2.4-2.4 4.2-2.2', '#fff', 1.1, .9)}<ellipse cx="18.4" cy="15.6" rx="1.6" ry="1" fill="#ffc4e8" opacity=".7"/>
  <path d="M6.2 13.4C5.2 19.8 9.6 26.4 16 26.8c6.2.2 10-4.6 10.6-9.6L23.4 17c-.6 3.2-3 5.4-6.8 5.2-3.8-.2-6.2-3.4-6.2-7.4Z" fill="url(#${k})" ${_K}/>
  <path d="M8 18.4c1.8 3.8 4.8 5.6 8.4 5.4 2-.2 3.6-.8 4.8-2" stroke="#fff3d0" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/>
  <path d="M10.6 22.6c1.6 1.6 3.6 2.4 5.8 2.4 1.6 0 2.8-.4 3.8-1-1 1.4-2.6 2.4-4.4 2.6-2.6.2-4.4-1-5.2-4Z" fill="#fff" opacity=".85"/>
  <circle cx="9" cy="19.6" r="1.1" fill="#fff" opacity=".9"/><circle cx="13.4" cy="23.6" r=".9" fill="#ffd24a" opacity=".95"/><circle cx="19" cy="24.4" r="1" fill="#fff" opacity=".9"/>
  <path d="M24.2 17.4C26 14 28 11.4 30.6 10.4 30.2 13 30.4 15.4 31.6 17.4c-1.6.6-2.4 2.2-2.4 4-1.8-1-4-1.8-6.6-1.4Z" fill="url(#${f})" ${_K}/>${_ln('M25.4 17.6c2-1.6 3.6-3 4.8-5M26 19c2.2-.8 3.8-.8 5 0', '#ff6a1a', .6, .7)}
  <path d="M5 14.4C4 11.6 5.4 9.2 8.2 8.6c2.6-.4 4.2 1.2 4.4 3.4.2 2.2-1.2 3.6-3.4 4.2-2.2.6-3.8 0-4.2-1.8Z" fill="url(#${k})" ${_K}/>
  <circle cx="8.6" cy="11.4" r="1.5" fill="#fff" ${_k}/><circle cx="8.9" cy="11.4" r=".7" fill="#2a1408"/>
  <path d="M5.2 14.6c1.2.8 2.4.8 3.6.2" stroke="#8a2a0a" stroke-width=".7" fill="none" stroke-linecap="round"/>
  ${_ln('M5 12.6C3.2 12.6 2 13.8 1.6 15.4M5.4 14.2C4 15 3.2 16.2 3.2 17.6', '#ffe27a', .7, .9)}
  <path d="M10.4 8.6c1.4-2.2 3-3.2 5-3.4-1 1.4-1.4 3-1.2 4.4Z" fill="url(#${f})" ${_k}/>
  ${_gl('M7 9.6c.8-.8 2-1.2 3.2-1-1.4.4-2.4 1.2-3 2.4Z', .6)}`; },

/* ======================= Ankh du Pharaon Éternel : croix ansée d'or, œil de lapis, sable qui s'écoule ======================= */
relique_pharaon: () => { const g = _id(), l = _id(), s = _id(); return _halo('#ffe27a') + `<defs>${_lg(g, '#fff4b0', '#c8861a', 1, 1)}${_rg(l, '#7aa8ff', '#16348a', .4, .3, .85)}${_lg(s, '#fff6c8', '#e8b44a', 0, 1)}</defs>
  <path d="M26.4 19.6c1.8 1.6 1.4 3.6.2 5.2-1 1.4-.2 3 1.2 3.8" fill="none" stroke="url(#${s})" stroke-width="1.6" stroke-linecap="round" opacity=".95"/>
  <path d="M5.8 19.6c-1.6 2.4-1.2 4.6.4 6.4" fill="none" stroke="url(#${s})" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>
  <ellipse cx="16" cy="9.8" rx="6" ry="7.4" fill="none" stroke="#140c06" stroke-opacity=".9" stroke-width="5.4"/>
  <ellipse cx="16" cy="9.8" rx="6" ry="7.4" fill="url(#${l})"/>
  <rect x="5.8" y="15.4" width="20.4" height="4" rx="1.6" fill="url(#${g})" ${_K}/>
  <path d="M13.6 18.6h4.8l.8 10.6c-1 1.2-2 1.6-3.2 1.6s-2.2-.4-3.2-1.6Z" fill="url(#${g})" ${_K}/>
  <ellipse cx="16" cy="9.8" rx="6" ry="7.4" fill="none" stroke="url(#${g})" stroke-width="3.4"/>
  <ellipse cx="16" cy="9.8" rx="3.7" ry="5.1" fill="none" stroke="#140c06" stroke-opacity=".55" stroke-width=".6"/>
  <path d="M11.4 9.8c1.2-2.2 3-3.2 4.6-3.2s3.4 1 4.6 3.2c-1.2 2.2-3 3.2-4.6 3.2s-3.4-1-4.6-3.2Z" fill="#0e1e5a" stroke="#ffd24a" stroke-width=".8"/>
  <circle cx="16" cy="9.8" r="2" fill="#4a8aff"/><circle cx="16" cy="9.8" r=".9" fill="#050a22"/><circle cx="15.4" cy="9.2" r=".5" fill="#fff"/>${_ln('M20.6 10.6c1 .6 1.6 1.4 1.8 2.4', '#ffd24a', .8, .9)}
  ${_ln('M7 16.4h18', '#fff', .7, .6)}${_ln('M14.8 20.6v7', '#fff', .6, .5)}${_gl('M12.6 5.4c.8-1.2 2-1.8 3.4-1.8-1.6.6-2.6 1.6-3.2 3.2Z', .6)}
  <circle cx="7.4" cy="25.6" r=".9" fill="#fff0b0"/><circle cx="25.6" cy="23" r="1" fill="#fff0b0"/><circle cx="27.4" cy="26.6" r=".7" fill="#ffd27a"/><circle cx="5" cy="21.4" r=".7" fill="#ffd27a"/><circle cx="9.4" cy="27.8" r=".6" fill="#fff0b0"/><circle cx="23.4" cy="28.8" r=".8" fill="#fff0b0"/>`; },

/* ======================= Cœur de Cristal d'Ocre : cœur ambre facetté, noyau cyan, griffes de fer ======================= */
relique_mines: () => { const a = _id(), c = _id(), m = _id(); const H = 'M16 28.4 5.2 15.4 4.4 9.8 8.6 5.6 13.6 6.4 16 9.4 18.4 6.4 23.4 5.6 27.6 9.8 26.8 15.4Z'; return _halo('#ffb04a') + `<defs>${_lg(a, '#ffe9a0', '#d8601a', 1, 1)}${_rg(c, '#e8ffff', '#12b8d8', .5, .5, .5)}${_lg(m, '#c8ccd8', '#4a505e', 1, 1)}</defs>
  <path d="${H}" fill="url(#${a})" ${_K}/>
  <path d="M4.4 9.8 8.6 5.6 13.6 6.4 16 9.4 12 13.2 5.2 15.4Z" fill="#fff3b8" opacity=".55"/><path d="M16 9.4 18.4 6.4 23.4 5.6 27.6 9.8 26.8 15.4 20 13.2Z" fill="#ff9a2a" opacity=".5"/>
  <path d="M5.2 15.4 12 13.2 16 18 16 28.4Z" fill="#ffb84a" opacity=".5"/><path d="M26.8 15.4 20 13.2 16 18 16 28.4Z" fill="#c8420a" opacity=".5"/>
  <path d="M12 13.2 16 9.4 20 13.2 16 18Z" fill="#ffe27a" opacity=".5"/>
  <path d="M5.2 15.4 12 13.2 16 18 16 28.4 5.2 15.4M26.8 15.4 20 13.2 16 18M8.6 5.6 12 13.2M23.4 5.6 20 13.2M16 9.4V18" fill="none" stroke="#8a2a0a" stroke-width=".7" stroke-linejoin="round" opacity=".7"/>
  <circle cx="16" cy="15.6" r="6" fill="url(#${c})" opacity=".75"/><path d="M16 11.4 19.4 15.6 16 19.8 12.6 15.6Z" fill="#c8ffff" stroke="#fff" stroke-width=".6"/><path d="M16 11.4 19.4 15.6 16 15.6Z" fill="#fff"/>
  <path d="M6 9.4 8.6 6.8 12 7.2" stroke="#fff" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
  <path d="M1.8 12 4 8.8 8 13.6 5.6 16.6Z" fill="url(#${m})" ${_K}/><path d="M30.2 12 28 8.8 24 13.6 26.4 16.6Z" fill="url(#${m})" ${_K}/>
  <path d="M12.4 25.2h7.2l-1.8 5.8c-.3.7-1 1-1.8 1s-1.5-.3-1.8-1Z" fill="url(#${m})" ${_K}/>${_ln('M14 26.6h4M14.8 29h2.4', '#fff', .6, .7)}
  ${_ln('M2.8 11.6 5.6 15.4M29.2 11.6 26.4 15.4', '#fff', .6, .7)}<circle cx="5.4" cy="12.6" r=".6" fill="#2a2e3a"/><circle cx="26.6" cy="12.6" r=".6" fill="#2a2e3a"/>
  ${_spark(21, 17.6, '#c8ffff', .9)}`; },

/* ======================= Médaillon du Comte Vespéral : argent, chauve-souris, gemme rouge, bordure de crocs ======================= */
relique_comte: () => { const s = _id(), d = _id(), r = _id(); return _halo('#c88aff') + `<defs>${_lg(s, '#ffffff', '#7a84a0', 1, 1)}${_rg(d, '#4a2a6a', '#14081e', .5, .4, .8)}${_rg(r, '#ffb0b8', '#b8081e', .36, .3, .85)}</defs>
  ${Array.from({ length: 14 }, (_, i) => `<path transform="rotate(${i * 360 / 14} 16 16)" d="M14.4 2.6h3.2L16 8Z" fill="#f4f6ff" ${_k}/>`).join('')}
  <circle cx="16" cy="16" r="12" fill="url(#${s})" ${_K}/><circle cx="16" cy="16" r="9.6" fill="url(#${d})" ${_K}/>
  <circle cx="16" cy="16" r="10.8" fill="none" stroke="#fff" stroke-width=".5" opacity=".7"/>
  <path d="M16 11.2c1 0 1.6.8 1.8 1.8 1-1.2 2.6-2 4.6-2-.6 1.2-.8 2.4-.4 3.6 1.2-.2 2.4-.4 3.2-1-.2 2.4-1.6 4.6-4.2 5.2.4.4.8.8 1.4 1-2.2.2-3.8-.6-4.6-2-.4 1.4-1 2.4-1.8 3.2-.8-.8-1.4-1.8-1.8-3.2-.8 1.4-2.4 2.2-4.6 2 .6-.2 1-.6 1.4-1-2.6-.6-4-2.8-4.2-5.2.8.6 2 .8 3.2 1 .4-1.2.2-2.4-.4-3.6 2 0 3.6.8 4.6 2 .2-1 .8-1.8 1.8-1.8Z" fill="#dfe4f8" ${_k}/>
  <path d="M14.8 11.6 14.4 9.4l1.6 1.4 1.6-1.4-.4 2.2Z" fill="#dfe4f8" ${_k}/>
  <circle cx="16" cy="16.2" r="2.7" fill="url(#${r})" ${_K}/><circle cx="15.2" cy="15.4" r=".8" fill="#fff"/>
  ${_ln('M9 14.2c.6-2 2-3.4 4-4', '#fff', .7, .55)}${_gl('M7.4 12.4c1.2-2.8 3.4-4.6 6.2-5-2.6 1-4.4 3-5 5.8Z', .5)}`; },

/* ======================= Rose Éternelle de la Reine : rose noire à cœur cramoisi sous un dôme de verre ======================= */
relique_roseraie: () => { const p = _id(), h = _id(), b = _id(), gl = _id(); return _halo('#ff6a8a') + `<defs>${_rg(p, '#7a3a8a', '#1a0a24', .4, .3, .9)}${_rg(h, '#ffd0d8', '#e0143a', .5, .5, .55)}${_lg(b, '#ffe9a0', '#a8741f', 0, 1)}${_lg(gl, '#e8f8ff', '#9ad8ff', 1, 1)}</defs>
  <ellipse cx="16" cy="28.4" rx="10.4" ry="1.8" fill="#000" opacity=".3"/>
  <path d="M5.2 24.4C4.8 12.4 9.6 4 16 4s11.2 8.4 10.8 20.4Z" fill="url(#${gl})" opacity=".26"/>
  <path d="M8.6 23c-.6-4 1.4-8 7.4-8s8 4 7.4 8Z" fill="#14081e" opacity=".28"/>
  <circle cx="16" cy="17.2" r="8" fill="#e0143a" opacity=".22"/>
  ${(() => { const R = (n, rr, k, off, fill) => Array.from({ length: n }, (_, i) => { const t = (off + i * 360 / n) * Math.PI / 180; return `<circle cx="${(16 + rr * Math.cos(t)).toFixed(2)}" cy="${(17.2 + rr * Math.sin(t)).toFixed(2)}" r="${k}" fill="${fill}" ${_K}/>`; }).join('');
    return R(5, 4.6, 3.7, -90, `url(#${p})`) + R(5, 2.9, 2.9, -54, '#4a1a60') + `<circle cx="16" cy="17.2" r="2.9" fill="#2a0e36" ${_K}/>`; })()}
  <path d="M16 15.2c1.8 0 2.8 1.2 2.6 2.4-.2 1.2-1.4 1.8-2.6 1.6-1.2-.2-1.8-1.2-1.4-2.2.4-.8 1.4-.8 1.8-.2" fill="none" stroke="#e8a0ff" stroke-width=".7" stroke-linecap="round"/>
  <circle cx="16" cy="17.4" r="1.9" fill="#ff2a52"/><circle cx="16" cy="17.4" r="2.9" fill="#ff2a52" opacity=".28"/><circle cx="15.4" cy="16.8" r=".6" fill="#fff"/>
  ${_ln('M10.4 13.6c1-1.2 2.4-1.8 3.6-1.6M18.4 11.8c1.6 0 3 .8 3.8 2', '#c88aff', .7, .65)}
  <path d="M5.2 24.4C4.8 12.4 9.6 4 16 4s11.2 8.4 10.8 20.4" fill="none" stroke="#140c06" stroke-opacity=".8" stroke-width="1.6" stroke-linejoin="round"/><path d="M5.2 24.4C4.8 12.4 9.6 4 16 4s11.2 8.4 10.8 20.4" fill="none" stroke="#bfeaff" stroke-width=".9"/>
  <path d="M8 18.4C8 12.4 10.4 8 13.6 6.2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/><circle cx="9.6" cy="21.4" r=".7" fill="#fff" opacity=".8"/>
  <path d="M3.6 24.4h24.8v2.2c0 1-.6 1.6-1.6 1.6H5.2c-1 0-1.6-.6-1.6-1.6Z" fill="url(#${b})" ${_K}/>${_ln('M5.6 25.4h20.8', '#fff3b8', .6, .7)}
  <circle cx="16" cy="3.4" r="1.4" fill="url(#${b})" ${_k}/>
  <path transform="translate(29.4 12) rotate(30)" d="M0 0c1.8.4 2.6 2.2 2 4-1.8-.2-2.8-1.8-2-4Z" fill="#2a0e36" ${_k}/><path transform="translate(2.4 16) rotate(-25)" d="M0 0c1.6.4 2.4 2 1.8 3.6-1.6-.2-2.6-1.6-1.8-3.6Z" fill="#3a1450" ${_k}/><path transform="translate(27.4 5.4) rotate(50)" d="M0 0c1.4.3 2 1.7 1.5 3-1.4-.2-2.2-1.3-1.5-3Z" fill="#8a0a2a" ${_k}/>`; },
});

/* Reliques : même cadre doré rayonnant que les autres (voir art2.js / art3.js) */
Object.assign(_RELIC_COL, {
  relique_dragon_jade: ['#9bffc0', '#1fa85a'], relique_carpe: ['#ffc4e0', '#ff7a3a'], relique_pharaon: ['#ffe27a', '#2a5fd0'],
  relique_mines: ['#ffd27a', '#ff8a1a'], relique_comte: ['#ff7a8a', '#7a1aa0'], relique_roseraie: ['#ff6a8a', '#4a1a6a']
});
for (const id of ['relique_dragon_jade', 'relique_carpe', 'relique_pharaon', 'relique_mines', 'relique_comte', 'relique_roseraie']) {
  const raw = ITEM_ART[id];
  const [c1] = _RELIC_COL[id];
  ITEM_ART[id] = () => {
    const body = raw().replace(/<circle cx="16" cy="16" r="14"[^>]*\/><circle cx="16" cy="16" r="10\.5"[^>]*\/>/, '');
    return _relicFrame(id) + `<g transform="translate(16 16.4) scale(.72) translate(-16 -16)">${body}</g>` + _spark(4.6, 6, '#fff', .9) + _spark(27.6, 8.4, c1, .8) + _spark(26.8, 26, '#fff', .7) + _spark(5.4, 25.4, c1, .6);
  };
}

/* Couleur d'identité des panoplies des nouvelles terres */
Object.assign(SET_COL, { pandala: '#4fd88a', etang: '#ff8ab8', dunes: '#ffd24a', mines: '#ff9a2a', srambad: '#a98aff', roseraie: '#ff4f6e' });

/* ======================= DOFUS v4 : œufs à motif propre =======================
   Même silhouette, reflet, aura et étincelles que dofus_turquoise (art3.js) ; le motif (dans l'œuf, découpé à sa forme) change. */
const _dofusArt2 = (c1, c2, c3, vein, glow, motif) => () => {
  const e = _id(), s = _id(), cp = _id();
  const egg = 'M16 3.4C21.8 3.4 25.8 11.2 25.8 17.8 25.8 23.8 21.6 28.6 16 28.6 10.4 28.6 6.2 23.8 6.2 17.8 6.2 11.2 10.2 3.4 16 3.4Z';
  return `<circle cx="16" cy="16.4" r="14.6" fill="${glow}" opacity=".16"/><circle cx="16" cy="16.4" r="11.2" fill="${glow}" opacity=".16"/>
  <defs><radialGradient id="${e}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient>
  <linearGradient id="${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <clipPath id="${cp}"><path d="${egg}"/></clipPath></defs>
  <ellipse cx="16" cy="29.4" rx="7" ry="1.4" fill="#000" opacity=".28"/>
  <path d="${egg}" fill="url(#${e})" ${_O}/>
  <g clip-path="url(#${cp})" fill="none" stroke-linecap="round" stroke-linejoin="round">${motif(vein, c3, glow)}</g>
  <path d="M10.4 12.4c.6-3.4 2.4-6 4.6-7.2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="12.4" cy="12.8" rx="2.6" ry="4" transform="rotate(18 12.4 12.8)" fill="url(#${s})"/>
  <path d="${egg}" fill="none" stroke="${vein}" stroke-width=".5" opacity=".5"/>` + _spark(25.6, 7.4, '#fff', .9) + _spark(6.4, 22.6, glow, .7) + _spark(26.6, 24, '#fff', .6);
};
Object.assign(ITEM_ART, {
  /* Émeraude : nervures de feuille de jade (arête centrale + côtes) et deux petites feuilles */
  dofus_emeraude: _dofusArt2('#e2ffd6', '#2fd35a', '#08622a', '#c8ffd0', '#4af080', (v, c3) => `
    <path d="M16 3.4C14.8 10 17.6 17 16 29" stroke="${v}" stroke-width="1.5" opacity=".75"/>
    <path d="M16 8.6 10.4 5.6M16 12.4 8.4 9.4M16 16.4 7.6 13.6M16 20.4 8.4 18M16 24.4 10 22.6M16 10 21.6 7M16 14 23.6 11M16 18 24.4 15.4M16 22 22.6 19.8" stroke="${v}" stroke-width=".9" opacity=".6"/>
    <path d="M6 22c4-2 7-1 10 3-4 1.8-8 .8-10-3Z" fill="${c3}" opacity=".4"/><path d="M26 20c-3.6-1.4-7-.4-9.6 3.4 3.8 1.2 7.4.2 9.6-3.4Z" fill="${c3}" opacity=".35"/>
    <path d="M9 21.4c2.4-.6 4.4 0 6.2 1.8" stroke="${v}" stroke-width=".7" opacity=".6"/>`),
  /* Ocre : strates de dune ondulées et grains de sable */
  dofus_ocre: _dofusArt2('#fff4c4', '#e0a82a', '#7a4a0a', '#ffe08a', '#ffc04a', (v, c3) => `
    <path d="M4 12c3.4-2 6.4-2 9.6 0s6.4 2 12.4-.4" stroke="${v}" stroke-width="1" opacity=".6"/>
    <path d="M4 16.2c3.4-2 6.6-2 9.8 0s6.6 2 12 .4" stroke="${v}" stroke-width="1.3" opacity=".5"/>
    <path d="M4 20.6c3.4-2 6.8-2 10 0s6.4 2 12 .2" stroke="${c3}" stroke-width="1.4" opacity=".5"/>
    <path d="M4 25c3.6-1.8 6.8-1.8 10 .2s6.6 1.8 12-.2" stroke="${c3}" stroke-width="1.6" opacity=".55"/>
    ${[[9, 9.6], [14.4, 7.8], [19.6, 10.4], [11.6, 14], [18, 14.6], [22, 18.6], [8.4, 18.4], [14.6, 22.8], [20.4, 23.6], [11, 26.4], [16, 19.4]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 ? .5 : .8}" fill="${i % 2 ? '#fff6c8' : c3}" stroke="none" opacity=".75"/>`).join('')}`),
  /* Pourpre : grandes volutes enroulées */
  dofus_pourpre: _dofusArt2('#ffd8fa', '#b83ae0', '#4a0a74', '#ff9aee', '#d85aff', (v, c3) => `
    <path d="M8 14.4c0-4.4 6.4-5.8 8.6-2.2 2 3.4-1.4 6.2-3.8 4.6-1.8-1.2-.8-3.4.8-3" stroke="${v}" stroke-width="1.2" opacity=".75"/>
    <path d="M26 21.6c0 4.2-6.2 5.4-8.4 2-2-3.2 1.2-5.8 3.6-4.2 1.8 1.2.8 3.2-.6 2.8" stroke="${v}" stroke-width="1.2" opacity=".7"/>
    <path d="M5 21c3 .4 4.6 2.2 6 5M27 11.4c-2.6.8-4.2.6-6-1.2" stroke="${v}" stroke-width="1" opacity=".55"/>
    <path d="M9 26.4c3.4-1 5.4-3.6 6-7M20 4.6c.8 2.6 2.4 4 5 4.6" stroke="${c3}" stroke-width="1.6" opacity=".55"/>
    <circle cx="14" cy="13.6" r=".9" fill="#fff" stroke="none" opacity=".7"/><circle cx="21.8" cy="21.8" r=".8" fill="#fff" stroke="none" opacity=".6"/>`),
  /* Ébène : nuit presque noire, reflets violets et petites étoiles */
  dofus_ebene: _dofusArt2('#8a7ab8', '#2a2040', '#06040e', '#b89aff', '#9a6aff', (v, c3) => `
    <path d="M5 14c3.6 2.4 7.2-1.2 11 .4s6.8 1.6 10-.8" stroke="${v}" stroke-width="1" opacity=".5"/>
    <path d="M6 22c4-2 7 1.6 11 .2s5.6-1.4 9-.2" stroke="${v}" stroke-width="1.1" opacity=".4"/>
    <path d="M4 18c2.4-3.6 5.4-5.2 9-4.6M19 27c3.4-.4 6-2.4 7.6-5.8" stroke="#6a4ab8" stroke-width="1.4" opacity=".5"/>
    ${[[20.4, 8.6, .8], [13.4, 15.4, .6], [21.8, 15.6, .55], [10.6, 22, .5], [16.6, 22.4, .8], [22, 24.6, .5]].map(([x, y, k]) => `<path transform="translate(${x} ${y}) scale(${k})" d="M0-2.6.7-.7 2.6 0 .7.7 0 2.6-.7.7-2.6 0-.7-.7Z" fill="${k > .85 ? '#fff' : v}" stroke="none" opacity=".9"/>`).join('')}
    <circle cx="16" cy="20" r="4.4" fill="${v}" stroke="none" opacity=".12"/>`),
});
