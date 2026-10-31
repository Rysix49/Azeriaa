/* =====================================================================
   RUELLES DE SRAMBAD + ROSERAIE NOIRE — sprites animés (dessins originaux)
   Même convention que monart2.js : 128×128, tournés vers la DROITE, classes animées p-*.
   Srambad : noir-prune, violet, argent, rouge de lanterne
     rat_cagoule · vampyro · gargouille · ombre_vorace (gros) · comte_vesperal (boss de donjon)
   Roseraie : pétales noirs, cramoisi, vert épine
     rose_epineuse · papillon_nuit · epouvantail · reine_roses (gros)
   NB : une animation CSS écrase l'attribut transform de son élément → toute rotation/échelle statique
   passe par un <g> parent avec _vb (transform-box:view-box), jamais sur l'élément animé lui-même.
   ===================================================================== */

/* pétale : base en (cx,cy), orientée selon ang (0 = vers le haut, 90 = vers la droite), longueur len, demi-largeur wid.
   Les coordonnées sont calculées ici (pas de transform=) pour éviter le piège transform-box. */
const _pet = (cx, cy, ang, len, wid, fill, stroke = '#14081c', sw = 1.8, bulge = 1, vein = '') => {
  const a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  const r = (x, y) => `${(cx + x * ca - y * sa).toFixed(1)} ${(cy + x * sa + y * ca).toFixed(1)}`;
  return `<path d="M${r(0, 0)}C${r(-wid * 1.15, -len * .2)} ${r(-wid * 1.25 * bulge, -len * .78)} ${r(0, -len)}C${r(wid * 1.25 * bulge, -len * .78)} ${r(wid * 1.15, -len * .2)} ${r(0, 0)}Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`
    + (vein ? `<path d="M${r(0, -len * .12)}Q${r(wid * .3, -len * .5)} ${r(0, -len * .82)}" fill="none" stroke="${vein}" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>` : '');
};
/* épine : petit triangle de base (x,y), pointe vers (x+dx, y+dy) */
const _thorn = (x, y, dx, dy, w = 3, c = '#d8d0e8') => { const l = Math.hypot(dx, dy), nx = -dy / l * w / 2, ny = dx / l * w / 2; return `<path d="M${(x + nx).toFixed(1)} ${(y + ny).toFixed(1)} ${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)} ${(x - nx).toFixed(1)} ${(y - ny).toFixed(1)}Z" fill="${c}" stroke="#14081c" stroke-width="1" stroke-linejoin="round"/>`; };
/* dague d'argent pointée vers le haut, centrée en (0,0) — à placer dans un <g> _vb transformé */
const _dagger = (grad) => `<path d="M0 -17 3.4 -4 2.4 4H-2.4L-3.4 -4Z" fill="url(#${grad})" stroke="#1a1228" stroke-width="1.5" stroke-linejoin="round"/><path d="M0 -15V3" stroke="#fff" stroke-width="1" opacity=".7"/><path d="M-6 4H6" stroke="#a8203a" stroke-width="3" stroke-linecap="round"/><path d="M0 4V11" stroke="#2a1a3a" stroke-width="3" stroke-linecap="round"/>`;

/* ---------------------------------------------------------------------
   RAT CAGOULÉ — rat sournois dans une cape à capuche, dague courbe
   --------------------------------------------------------------------- */
function _ratCagoule() {
  const cl = _q(), fr = _q(), bl = _q(), sa = _q(), hd = _q();
  const defs = _qlg(cl, [[0, '#6a4690'], [.5, '#38244f'], [1, '#150c24']], 0, 0, 1, 1) + _qlg(hd, [[0, '#4e3270'], [1, '#1a0f2c']], 0, 0, 1, 1)
    + _qrg(fr, [[0, '#e0ccd4'], [.55, '#a08a96'], [1, '#5e4856']], .4, .3, .9) + _qlg(bl, [[0, '#ffffff'], [.5, '#c6cedc'], [1, '#6a7488']], 0, 0, 1, 1)
    + _qlg(sa, [[0, '#ff5a6a'], [1, '#8a1228']], 0, 0, 0, 1);
  const K = 'stroke="#0c0614" stroke-width="2.2" stroke-linejoin="round"';
  const foot = (x, y) => `<path d="M${x - 8} ${y}c0-4 4-6 9-6s9 3 9 6c0 2-2 3-4 3H${x - 4}c-2 0-4-1-4-3Z" fill="#d6a8b4" ${K}/><path d="M${x + 6} ${y + 1}l3 2M${x + 8} ${y - 1}l3 1" stroke="#fff4e8" stroke-width="1.6" stroke-linecap="round"/>`;
  const body = `${_qsh(30, 60)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M42 108C22 112 8 100 12 84 15 74 26 74 24 84" stroke="#0c0614" stroke-width="6.6" fill="none" stroke-linecap="round"/><path d="M42 108C22 112 8 100 12 84 15 74 26 74 24 84" stroke="#dcb0bc" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M42 108C22 112 8 100 12 84" stroke="#fff" stroke-width=".9" fill="none" opacity=".4" stroke-linecap="round"/></g>
    ${foot(52, 114)}${foot(84, 114)}
    <path d="M86 58C62 44 36 54 32 80 30 96 28 106 24 117L34 112 42 119 50 112 58 119 68 112 76 119 86 112 96 117C98 100 94 80 92 66Z" fill="url(#${cl})" ${K}/>
    <path d="M40 82C44 100 44 108 42 118M62 80C64 98 64 108 66 117" stroke="#0c0614" stroke-width="1.3" fill="none" opacity=".45" stroke-linecap="round"/>
    <path d="M38 66C50 56 66 56 80 62" stroke="#fff" stroke-width="2.4" fill="none" opacity=".22" stroke-linecap="round"/>
    <path d="M32 88Q62 100 94 86L94 96Q62 110 31 98Z" fill="url(#${sa})" ${K}/><circle cx="62" cy="96" r="4.2" fill="url(#${bl})" stroke="#0c0614" stroke-width="1.5"/><circle cx="60.8" cy="94.8" r="1.2" fill="#fff"/>
    <path d="M62 66C60 46 72 28 94 30 110 32 116 46 108 56L86 62 72 72Z" fill="url(#${hd})" ${K}/>
    <g class="p-ear"><circle cx="100" cy="30" r="8" fill="#d8aab6" ${K}/><circle cx="100.6" cy="31" r="4.6" fill="#8a3a52"/></g>
    <path d="M84 52C94 46 108 50 124 61 127 63 125 67 121 67 110 73 96 73 88 69 82 65 80 56 84 52Z" fill="url(#${fr})" ${K}/>
    <path d="M90 52C100 50 110 54 118 60" stroke="#fff" stroke-width="1.6" fill="none" opacity=".4" stroke-linecap="round"/>
    <circle cx="123" cy="62" r="3.2" fill="#2a1018" stroke="#0c0614" stroke-width="1"/><circle cx="122" cy="60.8" r="1" fill="#ff9aaa"/>
    <path d="M108 63 128 56M108 65 130 65M108 67 128 74" stroke="#f4eaf8" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".9"/>
    <g class="p-jaw"><path d="M90 68C100 78 114 76 121 68 112 72 98 72 90 68Z" fill="url(#${fr})" ${K}/><path d="M110 67l2 7 4.6-7Z" fill="#fff6e4" stroke="#3a2a2a" stroke-width="1" stroke-linejoin="round"/></g>
    <path d="M64 62C62 44 74 32 90 31 100 32 108 38 108 47 100 40 90 40 82 46 76 52 76 62 80 70L70 74Z" fill="url(#${hd})" ${K}/>
    <path d="M70 52C72 42 80 36 90 35" stroke="#a888d0" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>
    ${_qeye(97, 55, 4.2, '#ff2a3a', 1.2, '#ffe4e4')}<path class="p-brow" d="M88 49 106 54" stroke="#0c0614" stroke-width="3" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="98" cy="55" r="7.4" fill="#ff2a3a" opacity=".22"/></g>
    <g class="p-limb"><path d="M72 80C84 82 94 90 100 98" stroke="#0c0614" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M72 80C84 82 94 90 100 98" stroke="url(#${cl})" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M100 96C110 88 120 82 126 80 122 90 116 98 108 106Z" fill="url(#${bl})" stroke="#1a1228" stroke-width="1.8" stroke-linejoin="round"/><path d="M104 98C112 90 118 85 124 82" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>
      <path d="M96 100 112 108" stroke="#a8203a" stroke-width="4" stroke-linecap="round"/><path d="M96 100 112 108" stroke="#ff6a7a" stroke-width="1" opacity=".7" stroke-linecap="round"/>
      <circle cx="98" cy="102" r="5.2" fill="#d6a8b4" ${K}/><path d="M94 106l-1 3M98 107l0 3M102 106l1 3" stroke="#fff4e8" stroke-width="1.6" stroke-linecap="round"/></g>
  </g></g>`;
  return _msvg('rat_cagoule', defs, body);
}

/* ---------------------------------------------------------------------
   VAMPYRO — chauve-souris vampire, ailes de membrane violette à doigts d'os
   --------------------------------------------------------------------- */
function _vampyro() {
  const mb = _q(), mb2 = _q(), fu = _q(), bl = _q();
  const defs = _qlg(mb, [[0, '#b676f4'], [.55, '#6a2aa8'], [1, '#2a0e50']], 1, 0, 0, 1) + _qlg(mb2, [[0, '#8a4ac8'], [1, '#2a0e50']], 0, 0, 1, 1)
    + _qrg(fu, [[0, '#9a78c0'], [.55, '#523a7a'], [1, '#1e1236']], .4, .3, .9) + _qrg(bl, [[0, '#f4e4fa'], [1, '#a888c8']], .4, .3, .9);
  const K = 'stroke="#12082a" stroke-width="2.2" stroke-linejoin="round"';
  const bone = (d, w = 2.4) => `<path d="${d}" stroke="#12082a" stroke-width="${w + 1.8}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#eadcc4" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const body = `${_qsh(22, 62)}<g class="ms-vamp-fl"><g class="p-hop"><g class="p-body">
    <g class="p-wing" style="transform-origin:0% 100%"><path d="M70 64 98 18C112 24 122 34 126 46 118 44 114 48 116 54 118 56 114 62 112 68 106 66 102 70 102 76 96 76 88 78 82 82Z" fill="url(#${mb2})" ${K}/>
      ${bone('M70 64 98 18 126 46M98 18 116 54M98 18 112 68M98 18 102 76', 2)}<path d="M98 18 104 10" stroke="#eadcc4" stroke-width="2.4" stroke-linecap="round"/></g>
    <g class="p-wing"><path d="M54 66 18 22 2 52Q14 56 14 62L8 82Q22 80 26 90L28 102Q42 92 52 96Z" fill="url(#${mb})" ${K}/>
      <path d="M30 40 22 70M18 54 20 80" stroke="#12082a" stroke-width="1" fill="none" opacity=".35"/>
      ${bone('M54 66 18 22 2 52M18 22 14 62M18 22 8 82M18 22 28 102', 2.6)}<path d="M18 22 10 12 6 22" stroke="#12082a" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 22 10 12 6 22" stroke="#eadcc4" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 52 6 56 8 52M8 82 12 86 14 82M28 102 32 104 32 100" fill="#eadcc4" stroke="#12082a" stroke-width="1" stroke-linejoin="round"/></g>
    <path d="M60 100C58 108 56 112 54 116M72 100C74 108 76 112 78 116" stroke="#12082a" stroke-width="5.2" fill="none" stroke-linecap="round"/><path d="M60 100C58 108 56 112 54 116M72 100C74 108 76 112 78 116" stroke="#6a4a90" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M54 116l-5 3M54 116l1 5M54 116l5 2M78 116l-5 3M78 116l1 5M78 116l5 2" stroke="#eadcc4" stroke-width="1.8" stroke-linecap="round"/>
    <path d="${_fur(66, 80, 20, 25, 9, 3, .2)}" fill="url(#${fu})" ${K}/>
    <path d="${_fur(72, 86, 11, 16, 7, 2, .4)}" fill="url(#${bl})" opacity=".9"/>
    <path d="M52 70C54 62 60 58 66 58" stroke="#fff" stroke-width="2" fill="none" opacity=".3" stroke-linecap="round"/>
    <path d="M76 44 74 18 90 38Z" fill="url(#${fu})" ${K}/><path d="M78 40 77 26 86 38Z" fill="#d890b8"/>
    <path d="M94 38 104 14 108 42Z" fill="url(#${fu})" ${K}/><path d="M97 38 103 22 105 38Z" fill="#d890b8"/>
    <path d="${_fur(90, 54, 17, 16, 8, 2.4, .1)}" fill="url(#${fu})" ${K}/>
    <path d="M94 62C100 56 112 58 114 64 112 70 104 72 98 70Z" fill="#b8a0d0" ${K}/><path d="M104 56 112 58 110 62Z" fill="#e8708a" stroke="#12082a" stroke-width="1.2" stroke-linejoin="round"/>
    ${_qeye(94, 49, 4.4, '#ff2a3a', 1.2, '#ffeaea')}<path class="p-brow" d="M86 43 102 47" stroke="#12082a" stroke-width="3" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="94.6" cy="49.4" r="7.6" fill="#ff2a3a" opacity=".22"/></g>
    <g class="p-jaw"><path d="M94 65C100 76 110 75 113 65Z" fill="#5a0a22" ${K}/><path d="M97 66 99 73 101 66ZM107 65.6 109 72 111 65Z" fill="#fff" stroke="#12082a" stroke-width="1" stroke-linejoin="round"/><path d="M99 71c3 3 7 2 9-1" stroke="#ff7a8a" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
    <path d="M96 64 98 71 101 64ZM106 63.6 108 70 111 63.6Z" fill="#fff" stroke="#12082a" stroke-width="1" stroke-linejoin="round"/>
  </g></g></g>`;
  return _msvg('vampyro', defs, body, ' ms-fantome');
}

/* ---------------------------------------------------------------------
   GARGOUILLE DE SRAMBAD — pierre grise fissurée, mousse, ailes repliées
   --------------------------------------------------------------------- */
function _gargouille() {
  const st = _q(), st2 = _q(), wg = _q(), mo = _q();
  const defs = _qrg(st, [[0, '#c8d2e2'], [.5, '#7e8ca4'], [1, '#3c465e']], .38, .28, .95) + _qlg(st2, [[0, '#a4b0c6'], [1, '#2e384e']], 0, 0, 1, 1)
    + _qlg(wg, [[0, '#8a98b2'], [1, '#2e384e']], 0, 0, 1, 1) + _qrg(mo, [[0, '#9ad06a'], [1, '#3a6a2a']], .4, .3, .9);
  const K = 'stroke="#141a2a" stroke-width="2.3" stroke-linejoin="round"';
  const crack = d => `<path d="${d}" stroke="#141a2a" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`;
  const claw = (x, y) => `<path d="M${x - 6} ${y}l-1 5 3-3M${x} ${y}v6l2-4M${x + 6} ${y}l1 5-3-3" fill="#e8ecf4" stroke="#141a2a" stroke-width="1.2" stroke-linejoin="round"/>`;
  const body = `${_qsh(36, 62)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M36 100C16 106 6 92 14 82" stroke="#141a2a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M36 100C16 106 6 92 14 82" stroke="url(#${st2})" stroke-width="6.6" fill="none" stroke-linecap="round"/><path d="M14 82 6 78 16 72Z" fill="url(#${st})" ${K}/></g>
    <g class="p-wing"><path d="M58 70C50 50 40 32 22 14 30 34 28 46 26 54 34 50 40 52 42 60 46 56 52 58 56 64Z" fill="url(#${wg})" ${K}/><path d="M58 70 22 14M58 70 26 54M58 70 42 60" stroke="#141a2a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M40 34C42 44 40 50 34 54" stroke="#e8ecf4" stroke-width="1.2" fill="none" opacity=".35" stroke-linecap="round"/></g>
    <ellipse cx="50" cy="102" rx="21" ry="16" fill="url(#${st2})" ${K}/><path d="M34 112h34v6H34Z" fill="url(#${st2})" ${K}/>${claw(40, 118)}${claw(60, 118)}
    <path d="M30 100C28 76 44 58 64 58 82 58 94 70 92 88 90 104 78 112 62 112 46 112 32 110 30 100Z" fill="url(#${st})" ${K}/>
    <path d="M38 76C44 66 54 62 64 62" stroke="#fff" stroke-width="2.6" fill="none" opacity=".45" stroke-linecap="round"/>
    ${crack('M48 70 52 80 46 88 52 98')}${crack('M70 66 66 76 72 84')}
    <path d="M36 90c4-4 10-4 12 0 2 4-4 8-8 6-3-1-5-3-4-6Z" fill="url(#${mo})" stroke="#2a4a1c" stroke-width="1.2"/><path d="M52 62c4-3 10-2 12 1-2 4-8 5-12 1Z" fill="url(#${mo})" stroke="#2a4a1c" stroke-width="1.2"/>
    <path d="M70 84 70 100M74 84 74 100" stroke="#141a2a" stroke-width="0" fill="none"/>
    <path d="M66 78C68 90 70 100 66 110" stroke="#141a2a" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>
    <path d="M44 100l5 2M56 104l5 1M40 108l4 1M70 98l4 3" stroke="#141a2a" stroke-width="1.3" fill="none" opacity=".4" stroke-linecap="round"/>
    <path d="M46 84l5-2 2 5M58 90l4-2 1 5" stroke="#e8ecf4" stroke-width="1.1" fill="none" opacity=".35" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="p-limb"><path d="M74 76C88 80 96 94 96 106" stroke="#141a2a" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M74 76C88 80 96 94 96 106" stroke="url(#${st})" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M80 80C88 84 92 92 93 100" stroke="#fff" stroke-width="1.6" fill="none" opacity=".4" stroke-linecap="round"/>${claw(96, 111)}</g>
    <path d="M78 48C70 38 64 30 54 26 68 22 80 30 86 42Z" fill="url(#${st2})" ${K} opacity=".9"/>
    <path d="M86 44C80 32 76 22 66 12 82 12 96 24 102 40Z" fill="url(#${st2})" ${K}/><path d="M84 36C80 30 76 24 72 20M90 38C86 32 82 28 78 24" stroke="#141a2a" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/><path d="M78 20C82 24 84 30 86 34" stroke="#fff" stroke-width="1.2" fill="none" opacity=".4" stroke-linecap="round"/>
    <path d="M100 40C106 32 114 28 122 28 118 34 116 40 114 46Z" fill="url(#${st2})" ${K}/>
    <path d="M72 54C74 40 86 34 98 38 108 42 112 50 110 58L117 64C117 70 111 74 104 74L90 74C78 72 72 64 72 54Z" fill="url(#${st})" ${K}/>
    <path d="M78 48C82 42 90 40 98 42" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>${crack('M88 38 91 46 87 52')}
    <path d="M74 48c3-3 8-3 10 0 0 3-6 5-10 3Z" fill="url(#${mo})" stroke="#2a4a1c" stroke-width="1.1"/>
    <path d="M86 49C92 45 102 46 108 51 100 52 92 52 86 49Z" fill="#242c42" stroke="#141a2a" stroke-width="1.6" stroke-linejoin="round"/>
    <g class="p-glow"><ellipse cx="98" cy="52.6" rx="9" ry="6" fill="#ff3a20" opacity=".3"/></g><ellipse cx="98" cy="53" rx="5" ry="3.2" fill="#ff3a20" stroke="#6a0a08" stroke-width="1.2"/><ellipse cx="99" cy="52.4" rx="2.4" ry="1.4" fill="#ffd0a0"/>
    <g class="p-jaw"><path d="M86 70C96 82 112 80 117 66 106 70 94 70 86 70Z" fill="url(#${st2})" ${K}/><path d="M94 69 96 63 99 69ZM104 70 106 64 109 70Z" fill="#f4f6fa" stroke="#141a2a" stroke-width="1.1" stroke-linejoin="round"/></g>
    <path d="M110 62 112 69 115 62Z" fill="#f4f6fa" stroke="#141a2a" stroke-width="1.1" stroke-linejoin="round"/><path d="M112 58l2 1M112 61l2 0" stroke="#141a2a" stroke-width="1.6" stroke-linecap="round"/>
  </g></g>`;
  return _msvg('gargouille', defs, body);
}

/* ---------------------------------------------------------------------
   OMBRE VORACE — spectre d'ombre flottant, grand sourire, dagues d'argent en orbite (gros monstre)
   --------------------------------------------------------------------- */
function _ombreVorace() {
  const sm = _q(), sm2 = _q(), vd = _q(), gl = _q(), sv = _q();
  const defs = _qlg(sm, [[0, '#5a3a86'], [.5, '#2a1648'], [1, '#0c0618']], 0, 0, 0, 1) + _qrg(sm2, [[0, '#7a52b0'], [1, '#1a0c30']], .5, .3, .8)
    + _qrg(vd, [[0, '#120a1e'], [1, '#04020a']], .5, .5, .7) + _qrg(gl, [[0, '#ff5a6a'], [1, '#ff2a3a', 0]], .5, .5, .5) + _qlg(sv, [[0, '#ffffff'], [.5, '#c6cedc'], [1, '#6a7488']], 0, 0, 1, 1);
  const K = 'stroke="#08040f" stroke-width="2.2" stroke-linejoin="round"';
  const dag = (x, y, r, s = 1, cls = '') => `<g class="${cls}"><g ${_vb} transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${_dagger(sv)}</g></g>`;
  const arm = (d, hand) => `<path d="${d}" stroke="#08040f" stroke-width="13" fill="none" stroke-linecap="round"/><path d="${d}" stroke="url(#${sm2})" stroke-width="10" fill="none" stroke-linecap="round" opacity=".95"/>${hand}`;
  const body = `${_qsh(34, 64)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M30 104C14 108 8 118 4 122 18 120 26 116 34 112Z" fill="url(#${sm})" opacity=".8" ${K}/></g>
    <path d="M72 6C46 14 30 44 30 74 30 92 22 104 14 118 26 114 32 108 38 112 42 122 50 114 54 118 58 124 64 116 68 120 74 124 80 116 86 118 92 122 96 112 102 114 112 118 108 104 104 88 102 42 96 16 72 6Z" fill="url(#${sm})" ${K}/>
    <path d="M38 70C40 56 48 40 62 32" stroke="#a88ae0" stroke-width="2.4" fill="none" opacity=".35" stroke-linecap="round"/>
    <path d="M24 110C30 98 40 100 44 108M96 108C100 98 108 100 112 108" stroke="#a88ae0" stroke-width="1.6" fill="none" opacity=".3" stroke-linecap="round"/>
    <path d="M70 20C46 20 40 46 42 60 44 74 56 84 70 84 84 84 96 74 98 60 100 46 94 20 70 20Z" fill="url(#${vd})" stroke="#08040f" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M52 34C56 26 64 22 70 22" stroke="#6a4aa0" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
    <g class="p-glow"><ellipse cx="62" cy="50" rx="11" ry="8" fill="url(#${gl})" opacity=".8"/><ellipse cx="86" cy="50" rx="11" ry="8" fill="url(#${gl})" opacity=".8"/></g>
    <path d="M52 52C54 46 62 45 69 49 66 55 58 57 52 52Z" fill="#ff3a4a" stroke="#ff9aa6" stroke-width="1.2" stroke-linejoin="round"/><path d="M89 52C87 46 79 45 72 49 75 55 83 57 89 52Z" fill="#ff3a4a" stroke="#ff9aa6" stroke-width="1.2" stroke-linejoin="round"/>
    <ellipse cx="62" cy="50.4" rx="2.4" ry="3.6" fill="#1a0408"/><ellipse cx="79" cy="50.4" rx="2.4" ry="3.6" fill="#1a0408"/><circle cx="60.6" cy="49" r="1.1" fill="#fff"/><circle cx="77.6" cy="49" r="1.1" fill="#fff"/>
    <path class="p-brow" d="M48 42 66 48M92 42 74 48" stroke="#a88ae0" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    <g class="p-jaw"><path d="M46 62C54 82 86 82 94 62 86 70 54 70 46 62Z" fill="#ff3a4a" opacity=".92" stroke="#08040f" stroke-width="1.6" stroke-linejoin="round"/><path d="M46 62C54 70 86 70 94 62" stroke="#ffb8c0" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M50 65 53 71 56 66 59 73 62 67 65 74 68 68 71 74 74 67 77 73 80 66 83 71 86 65 89 67 88 63Z" fill="#fff4f0" stroke="#08040f" stroke-width="1.2" stroke-linejoin="round"/></g>
    <g class="p-limb" style="transform-origin:100% 20%">${arm('M34 78C20 80 12 88 10 98', `<path d="M4 98 10 90 14 98 20 92 16 104 6 106Z" fill="url(#${sm2})" ${K}/><path d="M6 106 3 114M11 106 10 114M16 105 18 113" stroke="#e8e0f8" stroke-width="2.2" stroke-linecap="round"/>`)}</g>
    <g class="p-limb">${arm('M98 76C112 76 120 86 122 98', `<path d="M114 98 120 90 124 98 130 92 126 104 116 106Z" fill="url(#${sm2})" ${K}/><path d="M116 106 113 114M121 106 120 114M126 105 128 113" stroke="#e8e0f8" stroke-width="2.2" stroke-linecap="round"/>`)}</g>
    ${dag(14, 40, -28, 1.05, 'p-antenna')}${dag(114, 28, 32, 1.1, 'p-antenna')}${dag(116, 66, 70, .95, 'p-antenna')}${dag(22, 76, -64, .9, 'p-antenna')}
    <g class="p-glow"><path d="M118 14l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4Z" fill="#ff9aa6"/><circle cx="116" cy="46" r="1.8" fill="#c8a8ff"/><circle cx="8" cy="64" r="1.6" fill="#c8a8ff"/></g>
  </g></g>`;
  return _msvg('ombre_vorace', defs, body, ' ms-fantome');
}

/* ---------------------------------------------------------------------
   COMTE VESPÉRAL — seigneur vampire élégant, cape-ailes doublée de cramoisi, coupe de sang (boss)
   --------------------------------------------------------------------- */
function _comteVesperal() {
  const cp = _q(), li = _q(), co = _q(), sk = _q(), cu = _q(), gl = _q(), ms = _q();
  const defs = _qlg(cp, [[0, '#3e2858'], [1, '#10081c']], 0, 0, 1, 1) + _qlg(li, [[0, '#e0384e'], [.55, '#a0122e'], [1, '#4a0614']], 0, 0, 0, 1)
    + _qlg(co, [[0, '#5a3a78'], [.5, '#2e1c44'], [1, '#12081e']], 0, 0, 1, 1) + _qrg(sk, [[0, '#f6f0fa'], [.6, '#d8cce6'], [1, '#a898c0']], .4, .3, .9)
    + _qlg(cu, [[0, '#ffffff'], [.5, '#c8d0de'], [1, '#6a7488']], 0, 0, 1, 1) + _qrg(gl, [[0, '#ff5a6a'], [1, '#ff2a3a', 0]], .5, .5, .5) + _qrg(ms, [[0, '#c8a8f0', .8], [1, '#6a3aa8', 0]], .5, .5, .5);
  const K = 'stroke="#0a0412" stroke-width="2.3" stroke-linejoin="round"';
  const body = `<g class="p-glow"><ellipse cx="62" cy="116" rx="52" ry="8" fill="url(#${ms})"/></g>${_qsh(34, 70)}<g class="p-hop"><g class="p-body">
    <g class="p-wing" style="transform-origin:0% 24%"><path d="M92 46C108 46 120 62 124 90 126 100 124 108 122 114L114 104 108 113 100 101 94 98Z" fill="url(#${cp})" ${K}/><path d="M94 52C106 54 114 66 118 90 118 98 118 104 117 108L112 100 108 108 102 98 96 96Z" fill="url(#${li})"/><path d="M94 52 118 106M94 52 108 106" stroke="#0a0412" stroke-width="1.2" opacity=".5" fill="none"/></g>
    <g class="p-wing"><path d="M62 44C36 40 14 56 6 88 3 100 6 108 8 114L18 104 26 114 36 102 46 112 54 98 62 100Z" fill="url(#${cp})" ${K}/><path d="M60 52C40 50 24 62 16 88 14 98 16 104 18 108L24 100 30 108 38 98 46 106 54 94 60 96Z" fill="url(#${li})"/>
      <path d="M60 50 12 104M60 50 24 106M60 50 38 104M60 50 52 98" stroke="#0a0412" stroke-width="1.3" opacity=".55" fill="none" stroke-linecap="round"/><path d="M58 54C40 54 28 62 20 80" stroke="#ff8a98" stroke-width="1.6" fill="none" opacity=".4" stroke-linecap="round"/></g>
    <path d="M70 112 68 118H88L92 112Z" fill="#14081e" ${K}/><path d="M88 112 90 118H110L112 112Z" fill="#14081e" ${K}/><path d="M70 117H88M90 117H112" stroke="#fff" stroke-width="1" opacity=".35" stroke-linecap="round"/>
    <path d="M72 88 70 112H84L86 90ZM90 88 92 112H106L102 90Z" fill="url(#${co})" ${K}/>
    <path d="M62 52C62 46 72 44 82 44 94 44 98 50 98 60L100 92C100 100 98 106 94 112H68C64 106 62 98 62 90Z" fill="url(#${co})" ${K}/>
    <path d="M66 100C70 92 78 90 82 92M90 94C94 98 96 104 96 110" stroke="#0a0412" stroke-width="1.2" fill="none" opacity=".4"/>
    <path d="M82 52 86 94 76 112" stroke="#a0122e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M82 52 86 94 76 112" stroke="#ff7a8a" stroke-width=".9" fill="none" opacity=".6" stroke-linecap="round"/>
    ${[62, 70, 78].map(y => `<circle cx="88" cy="${y}" r="2.2" fill="url(#${cu})" stroke="#0a0412" stroke-width="1"/>`).join('')}
    <path d="M64 86Q80 94 98 86L98 92Q80 100 64 92Z" fill="url(#${li})" ${K}/><rect x="77" y="86" width="9" height="9" rx="2" fill="url(#${cu})" stroke="#0a0412" stroke-width="1.3"/>
    <path d="M68 58C74 52 84 52 90 56" stroke="#fff" stroke-width="2" fill="none" opacity=".22" stroke-linecap="round"/>
    <path d="M66 50 54 14 80 42Z" fill="url(#${li})" ${K}/><path d="M64 46 58 24 74 42Z" fill="url(#${cp})"/><path d="M96 50 104 18 86 42Z" fill="url(#${li})" ${K}/>
    <path d="M70 52 82 46 94 52 88 62 76 62Z" fill="url(#${li})" ${K}/><path d="M76 52 82 62 88 52" stroke="#ff9aa6" stroke-width="1.1" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M66 28C64 12 80 8 90 12 98 16 100 26 97 32 90 22 78 20 70 26Z" fill="#14081e" ${K}/>
    <path d="M69 26C68 34 66 40 70 46 74 52 82 54 88 48 90 46 92 44 92 42L94 41 92 39 98 38 94 35 100 33 94 29C86 22 74 22 69 26Z" fill="url(#${sk})" ${K}/>
    <path d="M69 34 60 24 68 42Z" fill="url(#${sk})" ${K}/>
    <path d="M70 28C76 24 86 24 92 29 84 26 76 26 70 30Z" fill="#14081e"/>
    ${_qeye(84, 34, 3.8, '#ff2a3a', 1.2, '#fff0f0')}<path class="p-brow" d="M77 28 92 32" stroke="#14081e" stroke-width="2.8" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="84.6" cy="34.4" r="6.6" fill="#ff2a3a" opacity=".26"/></g>
    <path d="M78 40C84 44 90 44 94 40" stroke="#5a2a4a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M85 42.4 86.6 47 88.4 43ZM90 42 91.6 46 93 42Z" fill="#fff" stroke="#14081e" stroke-width="1" stroke-linejoin="round"/>
    <path d="M70 40C72 44 76 46 80 46" stroke="#a898c0" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/>
    <g class="p-limb"><path d="M94 62C104 64 110 70 112 78" stroke="#0a0412" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M94 62C104 64 110 70 112 78" stroke="url(#${co})" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M106 74 118 78 114 86 104 82Z" fill="url(#${li})" ${K}/><circle cx="114" cy="76" r="4.6" fill="url(#${sk})" stroke="#0a0412" stroke-width="1.6"/><path d="M118 72 122 70M118 75 123 75" stroke="#f6f0fa" stroke-width="1.8" stroke-linecap="round"/>
      <g class="p-glow"><circle cx="114" cy="58" r="13" fill="url(#${gl})" opacity=".55"/></g>
      <path d="M104 46H124L121 60C120 66 108 66 107 60Z" fill="url(#${cu})" stroke="#0a0412" stroke-width="1.8" stroke-linejoin="round"/><path d="M105 47H123L122 52H106Z" fill="#c8102e" stroke="#0a0412" stroke-width="1"/><path d="M108 47 109 52" stroke="#ff7a8a" stroke-width="1" opacity=".8"/>
      <path d="M114 66V73M108 74H120" stroke="#0a0412" stroke-width="4.4" stroke-linecap="round"/><path d="M114 66V73M108 74H120" stroke="url(#${cu})" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M108 50C110 48 114 48 116 50" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8" stroke-linecap="round"/></g>
  </g></g>`;
  return _msvg('comte_vesperal', defs, body);
}

/* ---------------------------------------------------------------------
   ROSE ÉPINEUSE — rose noire marcheuse, visage cramoisi, tige à épines, bras-feuilles
   --------------------------------------------------------------------- */
function _roseEpineuse() {
  const pb = _q(), pm = _q(), pf = _q(), fc = _q(), st = _q(), lf = _q(), rt = _q();
  const defs = _qlg(pb, [[0, '#3c2250'], [1, '#0e0616']], 0, 0, 0, 1) + _qlg(pm, [[0, '#563272'], [1, '#160a22']], 0, 0, 0, 1) + _qlg(pf, [[0, '#6a3e8c'], [.6, '#2a1640'], [1, '#12081c']], 0, 0, 1, 1)
    + _qrg(fc, [[0, '#ff6a7a'], [.55, '#d0203e'], [1, '#6a0a22']], .4, .3, .9) + _qlg(st, [[0, '#58a850'], [.55, '#2e6a34'], [1, '#143a1e']], 0, 0, 1, 0)
    + _qlg(lf, [[0, '#6ab85a'], [1, '#1e5028']], 0, 0, 1, 1) + _qlg(rt, [[0, '#7a5a3a'], [1, '#2a1c10']], 0, 0, 0, 1);
  const K = 'stroke="#0e0616" stroke-width="2.2" stroke-linejoin="round"';
  const KG = 'stroke="#0c2210" stroke-width="2.2" stroke-linejoin="round"';
  const bx = 64, by = 40; // centre de la fleur
  const back = [-100, -62, -24, 24, 62, 100].map(a => _pet(bx, by + 10, a, 36, 13, `url(#${pb})`)).join('');
  const mid = [-80, -40, 0, 40, 80].map(a => _pet(bx, by + 12, a, 30, 12, `url(#${pm})`)).join('');
  const front = [-118, 118].map(a => _pet(bx, by + 18, a, 24, 10, `url(#${pf})`)).join('');
  const rims = [-100, -62, -24, 24, 62, 100].map(a => { const r = a * Math.PI / 180, x = bx + Math.sin(r) * 38, y = by + 10 - Math.cos(r) * 38; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.1" fill="#d0203e" opacity=".85"/>`; }).join('');
  const thorns = [[56, 76, -5, 6], [72, 82, 6, 4], [58, 92, -6, 3], [70, 98, 6, 5]].map(([x, y, dx, dy]) => _thorn(x, y, dx * 1.6, dy * 1.6, 4.4, '#e8e0f4')).join('');
  const body = `${_qsh(30)}<g class="p-hop"><g class="p-body">
    ${[[46, 112, -12], [82, 112, 12]].map(([x, y, d]) => `<path d="M${x} ${y - 6}C${x + d * .4} ${y + 2} ${x + d} ${y + 2} ${x + d * 1.6} ${y + 6}M${x} ${y - 4}C${x - d * .2} ${y + 3} ${x - d * .6} ${y + 5} ${x - d} ${y + 7}M${x} ${y - 4} ${x + d * .2} ${y + 7}" stroke="#0e0804" stroke-width="5.6" fill="none" stroke-linecap="round"/><path d="M${x} ${y - 6}C${x + d * .4} ${y + 2} ${x + d} ${y + 2} ${x + d * 1.6} ${y + 6}M${x} ${y - 4}C${x - d * .2} ${y + 3} ${x - d * .6} ${y + 5} ${x - d} ${y + 7}M${x} ${y - 4} ${x + d * .2} ${y + 7}" stroke="url(#${rt})" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M50 108C48 94 54 80 58 66H72C76 80 82 94 80 108 74 114 56 114 50 108Z" fill="url(#${st})" ${KG}/>
    <path d="M58 70C56 84 54 96 56 106" stroke="#a8e098" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M64 70V108M60 82Q64 86 68 82M60 94Q64 98 68 94" stroke="#0c2210" stroke-width="1.1" fill="none" opacity=".4" stroke-linecap="round"/>
    ${thorns}
    <g class="p-leaves" style="transform-origin:100% 80%"><path d="M56 88C44 88 30 80 20 66 34 62 48 66 56 76Z" fill="url(#${lf})" ${KG}/><path d="M56 86C46 80 34 72 22 67" stroke="#0c2210" stroke-width="1.3" fill="none" opacity=".55" stroke-linecap="round"/><path d="M26 70 22 62M34 76 30 70" stroke="#e8e0f4" stroke-width="1.8" stroke-linecap="round"/></g>
    <g class="p-leaves" style="transform-origin:0% 80%"><path d="M74 84C88 82 102 90 110 104 96 108 82 102 74 94Z" fill="url(#${lf})" ${KG}/><path d="M76 88C86 90 98 96 108 103" stroke="#0c2210" stroke-width="1.3" fill="none" opacity=".55" stroke-linecap="round"/><path d="M104 99 112 100M96 94 102 90" stroke="#e8e0f4" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M110 104C114 100 120 102 120 108 118 112 112 112 110 108" fill="#d0203e" stroke="#0e0616" stroke-width="1.6"/></g>
    <g class="p-leaves">${back}${mid}${rims}${front}
      <path d="M44 56C44 38 54 28 66 28 80 28 88 40 86 56 84 66 76 70 66 70 54 70 46 66 44 56Z" fill="url(#${fc})" ${K}/>
      <path d="M52 36C56 32 62 30 66 30" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
      <path d="M48 52C50 62 58 66 66 66" stroke="#4a0618" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/>
      ${_qeye(60, 46, 4.6, '#ffd24a', 1.2, '#fff6d0')}${_qeye(76, 46, 4.2, '#ffd24a', -1, '#fff6d0')}
      <path class="p-brow" d="M52 38 66 44M82 38 70 44" stroke="#2a0612" stroke-width="3" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M56 57C60 66 72 66 76 57 70 60 62 60 56 57Z" fill="#3a0612" ${K}/><path d="M58 58 60 63 62 59ZM66 59.6 68 64 70 59.6ZM72 58 74 62 75.6 57.6Z" fill="#fff" stroke="#14081c" stroke-width=".9" stroke-linejoin="round"/></g>
      ${[[50, 26, -6, -10], [58, 20, -2, -12], [70, 20, 3, -12], [78, 25, 8, -9]].map(([x, y, dx, dy]) => _thorn(x, y, dx, dy, 4.4, '#d8d0e8')).join('')}
    </g>
  </g></g>`;
  return _msvg('rose_epineuse', defs, body);
}

/* ---------------------------------------------------------------------
   PAPILLON DE NUIT — papillon géant, ailes violet-noir à ocelles lumineux, poussière scintillante
   --------------------------------------------------------------------- */
function _papillonNuit() {
  const w1 = _q(), w2 = _q(), w3 = _q(), fu = _q(), oc = _q(), gl = _q();
  const defs = _qlg(w1, [[0, '#a876e8'], [.5, '#5a2a98'], [1, '#1a0a38']], 1, 0, 0, 1) + _qlg(w2, [[0, '#7a48c0'], [1, '#1a0a38']], 0, 0, 1, 1) + _qlg(w3, [[0, '#4a2a80'], [1, '#12082a']], 0, 0, 1, 1)
    + _qrg(fu, [[0, '#f0e4fa'], [.55, '#b8a0d4'], [1, '#6a4a8e']], .4, .3, .9)
    + _qrg(oc, [[0, '#fff6c0'], [.3, '#ffb02e'], [.62, '#e0284a'], [1, '#2a0a24']], .5, .5, .5) + _qrg(gl, [[0, '#ffd8a0'], [1, '#ff7a3a', 0]], .5, .5, .5);
  const K = 'stroke="#12082a" stroke-width="2.2" stroke-linejoin="round"';
  const eyespot = (x, y, r) => `<g class="p-glow"><circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="url(#${gl})" opacity=".55"/></g><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${oc})" stroke="#12082a" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="${r * .3}" fill="#12082a"/><circle cx="${x - r * .3}" cy="${y - r * .35}" r="${r * .18}" fill="#fff"/>`;
  const dots = (pts, c = '#e8d4ff') => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".85"/>`).join('');
  const body = `${_qsh(18, 62)}<g class="p-hop"><g class="p-body">
    <g class="p-wing" style="transform-origin:0% 100%"><path d="M70 60C74 36 98 14 118 18 124 38 108 62 80 70Z" fill="url(#${w3})" ${K}/><path d="M74 62C80 42 98 26 114 24" stroke="#c8a8ff" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>${dots([[108, 30, 1.4], [102, 38, 1.2], [112, 40, 1.1]])}</g>
    <g class="p-wing" style="transform-origin:0% 0%"><path d="M70 72C90 76 110 90 108 108 92 112 74 100 68 82Z" fill="url(#${w3})" ${K}/>${dots([[100, 98, 1.3], [92, 102, 1.1]])}</g>
    <g class="p-wing"><path d="M60 62C46 32 20 10 6 20 0 40 14 64 46 74Z" fill="url(#${w1})" ${K}/>
      <path d="M58 64C44 40 26 22 10 22" stroke="#12082a" stroke-width="1.1" fill="none" opacity=".4" stroke-linecap="round"/><path d="M52 70C36 54 20 40 6 34" stroke="#12082a" stroke-width="1.1" fill="none" opacity=".35" stroke-linecap="round"/>
      <path d="M58 60C44 32 22 14 8 22" stroke="#e8d4ff" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>${eyespot(30, 46, 9)}${dots([[12, 30, 1.6], [18, 22, 1.3], [8, 44, 1.3], [16, 56, 1.4], [26, 62, 1.2]])}</g>
    <g class="p-wing"><path d="M56 78C34 80 18 94 22 112 40 116 58 102 62 86Z" fill="url(#${w2})" ${K}/><path d="M54 82C40 88 30 98 28 108" stroke="#e8d4ff" stroke-width="1.4" fill="none" opacity=".45" stroke-linecap="round"/>${eyespot(38, 98, 6)}${dots([[24, 106, 1.3], [48, 110, 1.2]])}</g>
    <path d="M54 92C56 102 54 110 48 114 44 110 46 100 52 90Z" fill="url(#${fu})" ${K}/>
    <path d="M58 100l-6 12M64 98l-2 12M68 96l4 12" stroke="#12082a" stroke-width="3.6" stroke-linecap="round"/><path d="M58 100l-6 12M64 98l-2 12M68 96l4 12" stroke="#6a4a8e" stroke-width="1.6" stroke-linecap="round"/>
    <path d="${_fur(66, 76, 13, 18, 8, 3, .2)}" fill="url(#${fu})" ${K}/>
    <path d="M58 68C60 62 66 60 72 62" stroke="#fff" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/><path d="M60 78H74M60 86H72" stroke="#6a4a8e" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/>
    <g class="p-antenna" style="transform-origin:20% 100%"><path d="M80 48C82 34 90 24 102 22" stroke="#12082a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M80 48C82 34 90 24 102 22" stroke="#d8c4f0" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[[83, 38], [87, 31], [93, 26], [99, 23]].map(([x, y]) => `<path d="M${x} ${y}l-5 -5M${x} ${y}l1 -7M${x} ${y}l4 2" stroke="#e8d4ff" stroke-width="1.3" stroke-linecap="round"/>`).join('')}</g>
    <g class="p-antenna" style="transform-origin:80% 100%"><path d="M70 48C66 34 70 22 80 14" stroke="#12082a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M70 48C66 34 70 22 80 14" stroke="#d8c4f0" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[[68, 38], [69, 30], [73, 22], [78, 16]].map(([x, y]) => `<path d="M${x} ${y}l-6 -2M${x} ${y}l-3 -6M${x} ${y}l4 -5" stroke="#e8d4ff" stroke-width="1.3" stroke-linecap="round"/>`).join('')}</g>
    <path d="${_fur(78, 56, 13, 12, 7, 2.4, .1)}" fill="url(#${fu})" ${K}/>
    <path d="M70 62C74 66 82 68 88 64" stroke="#fff" stroke-width="1.6" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M80 48C86 44 94 48 94 56 94 62 88 66 82 64 78 60 76 52 80 48Z" fill="#e0284a" stroke="#12082a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M82 49C86 47 90 49 92 53" stroke="#ff9aa6" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".9"/><circle cx="86" cy="56" r="3.4" fill="#2a0612" opacity=".85"/><circle cx="84.8" cy="54.8" r="1.1" fill="#fff"/>
    <path d="M92 60C96 62 98 66 96 70" stroke="#12082a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M92 60C96 62 98 66 96 70" stroke="#d8c4f0" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <g class="p-glow">${[[14, 90, 1.8], [30, 78, 1.4], [74, 118, 1.6], [100, 80, 1.5], [112, 62, 1.3], [6, 70, 1.4], [52, 120, 1.2]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffe0b0"/>`).join('')}<path d="M118 90l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" fill="#fff"/></g>
  </g></g>`;
  return _msvg('papillon_nuit', defs, body, ' ms-fantome');
}

/* ---------------------------------------------------------------------
   ÉPOUVANTAIL CARNIVORE — toile de jute, paille, piquet de bois dans le dos, gueule orange pleine de dents, faucille
   --------------------------------------------------------------------- */
function _epouvantail() {
  const sk = _q(), sh = _q(), tr = _q(), hat = _q(), gw = _q(), st = _q(), wd = _q(), bl = _q();
  const defs = _qrg(sk, [[0, '#f2dca0'], [.55, '#c8a460'], [1, '#7a5a2a']], .4, .3, .9) + _qlg(sh, [[0, '#a8483a'], [.5, '#6a2a2a'], [1, '#341414']], 0, 0, 1, 1)
    + _qlg(tr, [[0, '#a89060'], [1, '#4a3a22']], 0, 0, 1, 1) + _qlg(hat, [[0, '#6a4a30'], [1, '#26160c']], 0, 0, 0, 1) + _qrg(gw, [[0, '#fff0a0'], [.45, '#ffb02e'], [1, '#ff6a14']], .5, .5, .7)
    + _qlg(st, [[0, '#f4d870'], [1, '#b08a2a']], 0, 0, 1, 1) + _qlg(wd, [[0, '#a8805a'], [1, '#4a2e18']], 0, 0, 1, 0) + _qlg(bl, [[0, '#f0f4fa'], [.5, '#a8b0c0'], [1, '#5a5a6a']], 0, 0, 1, 1);
  const K = 'stroke="#1c1008" stroke-width="2.2" stroke-linejoin="round"';
  const straw = (x, y, n, dir = 1, len = 10) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y}l${dir * len * (.4 + .12 * i)} ${-len * (.8 - .22 * i) * (i % 2 ? -1 : 1) * .6}" stroke="#7a5a1a" stroke-width="3.2" stroke-linecap="round"/><path d="M${x} ${y}l${dir * len * (.4 + .12 * i)} ${-len * (.8 - .22 * i) * (i % 2 ? -1 : 1) * .6}" stroke="url(#${st})" stroke-width="1.7" stroke-linecap="round"/>`).join('');
  const body = `${_qsh(32, 66)}<g class="p-hop"><g class="p-body">${_sc(.9, `
    <path d="M36 14 40 118" stroke="#1c1008" stroke-width="9" stroke-linecap="round"/><path d="M36 14 40 118" stroke="url(#${wd})" stroke-width="6.2" stroke-linecap="round"/><path d="M34.4 20 38 112" stroke="#fff" stroke-width="1" opacity=".3" stroke-linecap="round"/><path d="M33 14 41 12 40 18 32 20Z" fill="url(#${wd})" ${K}/>
    <path d="M46 98 44 114 56 114 58 100ZM76 98 76 114 90 114 90 100Z" fill="url(#${tr})" ${K}/>
    <path d="M44 112H62L58 118H42ZM76 112H96L94 118H74Z" fill="#2a1a0c" ${K}/>
    <path d="M44 114l-4 4M50 114l-1 5M56 114l1 5M76 114l-1 5M84 114v5M92 114l3 4" stroke="url(#${st})" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M50 84C48 96 48 104 48 112H64L66 98 74 98 78 112H92C92 104 92 94 90 84Z" fill="url(#${tr})" ${K}/>
    <path d="M60 90 68 106M80 94 86 108" stroke="#2a1a0c" stroke-width="1.3" fill="none" opacity=".5" stroke-linecap="round"/><path d="M52 98h10v8H52Z" fill="#6a8a4a" stroke="#1c1008" stroke-width="1.3" stroke-dasharray="2.4 1.8"/>
    <path d="M46 62C44 74 46 84 50 88 62 92 80 92 92 88 96 80 96 68 92 60 84 56 56 56 46 62Z" fill="url(#${sh})" ${K}/>
    <path d="M46 80 92 76" stroke="#1c1008" stroke-width="1" opacity=".4"/><path d="M60 62 60 90M72 60 72 90" stroke="#1c1008" stroke-width="1" opacity=".35"/>
    <path d="M70 66h14v12H70Z" fill="#c8a460" stroke="#1c1008" stroke-width="1.3" stroke-dasharray="2.4 1.8"/><path d="M71 67l12 10M83 67 71 77" stroke="#7a5a2a" stroke-width="1.2"/>
    <path d="M48 66C58 60 72 60 86 62" stroke="#fff" stroke-width="2" fill="none" opacity=".2" stroke-linecap="round"/>
    <path d="M46 88C52 94 60 96 66 92 74 96 84 94 92 88L92 94C84 98 72 100 66 97 58 100 50 98 46 94Z" fill="#3a2410" ${K}/>
    ${straw(48, 90, 3, -1, 9)}${straw(92, 90, 3, 1, 9)}
    <path d="M62 56 66 44 80 46 82 56Z" fill="url(#${sk})" ${K}/>${straw(70, 54, 3, -1, 9)}${straw(78, 54, 3, 1, 9)}
    <g class="p-torso"><path d="M60 36C58 22 70 16 82 18 94 20 100 30 98 42 96 52 88 58 78 58 66 58 60 48 60 36Z" fill="url(#${sk})" ${K}/>
      <path d="M66 24C72 20 82 20 90 24" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
      <path d="M64 30l6 3M66 44l6 2M92 24 94 31M94 46 90 48" stroke="#4a3418" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round" stroke-dasharray="3 2"/>
      <path d="M72 38 80 36" stroke="#4a3418" stroke-width="1" opacity=".4"/>
      <g class="p-glow"><ellipse cx="82" cy="47" rx="14" ry="9" fill="url(#${gw})" opacity=".4"/></g>
      <g class="p-eye"><path d="M66 34 76 30 78 40Z" fill="url(#${gw})" stroke="#4a1a08" stroke-width="1.6" stroke-linejoin="round"/><path d="M84 30 94 34 88 41Z" fill="url(#${gw})" stroke="#4a1a08" stroke-width="1.6" stroke-linejoin="round"/></g>
      <path d="M62 44C68 40 78 42 84 46 92 44 98 42 98 42L96 50C88 56 72 58 64 54Z" fill="#2a0a02" stroke="#4a1a08" stroke-width="1.8" stroke-linejoin="round"/>
      <g class="p-jaw"><path d="M64 46C70 60 90 62 97 46 90 54 70 54 64 46Z" fill="url(#${gw})" stroke="#4a1a08" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M65 48 68 55 71 49 74 57 77 50 80 58 83 50 86 57 89 49 92 55 95 47 90 52 70 52Z" fill="#fff6e0" stroke="#4a1a08" stroke-width="1.1" stroke-linejoin="round"/></g>
      <path d="M64 46C68 42 74 42 78 44M84 44C90 42 94 42 96 44" stroke="#fff6e0" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M56 28C52 22 56 14 66 12 72 8 90 8 98 14 106 16 108 24 102 28 96 22 64 22 56 28Z" fill="url(#${hat})" ${K}/>
      <path d="M62 14C62 4 74 -2 84 2 94 6 96 12 94 16 86 12 70 10 62 14Z" fill="url(#${hat})" ${K}/><path d="M63 15C72 11 86 12 94 17" stroke="#c8402a" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M68 12C74 9 82 9 90 12" stroke="#fff" stroke-width="1" fill="none" opacity=".3"/>
      <path d="M72 3 78 -1 80 5" stroke="url(#${st})" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M98 22 106 28" stroke="url(#${st})" stroke-width="2.2" stroke-linecap="round"/></g>
    <g class="p-limb"><path d="M84 66C94 70 102 78 108 84" stroke="#1c1008" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M84 66C94 70 102 78 108 84" stroke="url(#${sh})" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M100 76 110 84" stroke="#1c1008" stroke-width="1" opacity=".4"/>
      ${straw(110, 84, 3, 1, 8)}<circle cx="112" cy="88" r="4.8" fill="url(#${sk})" ${K}/>
      <path d="M110 112 114 90" stroke="#1c1008" stroke-width="5.6" stroke-linecap="round"/><path d="M110 112 114 90" stroke="url(#${wd})" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M114 90C102 84 100 62 118 56 124 54 128 58 124 60 112 62 110 78 118 86Z" fill="url(#${bl})" stroke="#1c1008" stroke-width="1.8" stroke-linejoin="round"/><path d="M112 86C106 76 108 64 118 59" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8" stroke-linecap="round"/><path d="M110 70l1 3M108 76l1 2" stroke="#8a4a2a" stroke-width="1.6" opacity=".7" stroke-linecap="round"/></g>
  `)}</g></g>`;
  return _msvg('epouvantail', defs, body);
}

/* ---------------------------------------------------------------------
   REINE DES ROSES NOIRES — immense rose noire royale, robe de pétales, couronne d'épines, lianes-fouets (gros monstre)
   --------------------------------------------------------------------- */
function _reineRoses() {
  const pb = _q(), pm = _q(), pf = _q(), pd = _q(), fc = _q(), vn = _q(), gl = _q(), rt = _q(), li = _q(), sv = _q();
  const defs = _qlg(pb, [[0, '#3c2254'], [1, '#0c0514']], 0, 0, 0, 1) + _qlg(pm, [[0, '#5e367e'], [1, '#160a24']], 0, 0, 0, 1) + _qlg(pf, [[0, '#7a4aa4'], [.6, '#30194a'], [1, '#12081e']], 0, 0, 1, 1)
    + _qlg(pd, [[0, '#4e2c6e'], [1, '#0e0618']], 0, 0, 0, 1) + _qrg(fc, [[0, '#ff8090'], [.5, '#d4223e'], [1, '#6a0a22']], .4, .3, .9)
    + _qlg(vn, [[0, '#4a9a4a'], [1, '#143a1e']], 0, 0, 1, 1) + _qrg(gl, [[0, '#ff5a6a'], [1, '#ff2a3a', 0]], .5, .5, .5) + _qlg(rt, [[0, '#7a5a3a'], [1, '#2a1c10']], 0, 0, 0, 1)
    + _qlg(li, [[0, '#ff4a62'], [1, '#6a0a22']], 0, 0, 0, 1) + _qlg(sv, [[0, '#ffffff'], [.5, '#c8d0de'], [1, '#6a7488']], 0, 0, 1, 1);
  const K = 'stroke="#0c0514" stroke-width="2.2" stroke-linejoin="round"';
  const V = '#b88ae0';
  const bx = 64, by = 62;
  const skirtBack = [104, 128, 152, 176, 200, 224, 248].map(a => _pet(bx, 84, a, 44, 15, `url(#${pd})`, '#14081c', 1.8, 1, V)).join('');
  const skirt = [116, 142, 168, 192, 218, 244].map(a => _pet(bx, 82, a, 36, 13, `url(#${pm})`, '#14081c', 1.8, 1, V)).join('');
  const skirtF = [150, 180, 210].map(a => _pet(bx, 80, a, 28, 11, `url(#${pf})`, '#14081c', 1.8, 1, V)).join('');
  const bloomB = [-98, -68, -38, 38, 68, 98].map(a => _pet(bx, by, a, 48, 16, `url(#${pb})`, '#14081c', 1.8, 1, V)).join('');
  const bloomM = [-82, -50, -18, 18, 50, 82].map(a => _pet(bx, by + 2, a, 40, 14.5, `url(#${pm})`, '#14081c', 1.8, 1, V)).join('');
  const bloomF = [-122, 122, -96, 96].map(a => _pet(bx, by + 12, a, 30, 11.5, `url(#${pf})`, '#14081c', 1.8, 1, V)).join('');
  const rims = [-98, -68, -38, 38, 68, 98].map(a => { const r = a * Math.PI / 180; return `<circle cx="${(bx + Math.sin(r) * 47).toFixed(1)}" cy="${(by - Math.cos(r) * 47).toFixed(1)}" r="2.4" fill="#ff3a54" stroke="#14081c" stroke-width="1"/>`; }).join('');
  const vine = (d, w = 6.4) => `<path d="${d}" stroke="#0a200e" stroke-width="${w + 3.4}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="url(#${vn})" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  const bud = (x, y, s = 1) => `<g ${_vb} transform="translate(${x} ${y}) scale(${s})"><path d="M-5 0C-6-6-2-10 0-10 2-10 6-6 5 0 4 4-4 4-5 0Z" fill="url(#${fc})" stroke="#0c0514" stroke-width="1.6" stroke-linejoin="round"/><path d="M-2-5C0-8 2-8 3-5" stroke="#ffb0b8" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M-5 0 0 6 5 0" fill="#2e6a34" stroke="#0a200e" stroke-width="1.4" stroke-linejoin="round"/></g>`;
  const root = ([x, y, d]) => `<path d="M${x} ${y - 6}C${x + d * .5} ${y} ${x + d} ${y + 2} ${x + d * 1.5} ${y + 6}M${x} ${y - 4}C${x - d * .3} ${y + 2} ${x - d * .8} ${y + 4} ${x - d * 1.2} ${y + 7}" stroke="#0e0804" stroke-width="5.6" fill="none" stroke-linecap="round"/><path d="M${x} ${y - 6}C${x + d * .5} ${y} ${x + d} ${y + 2} ${x + d * 1.5} ${y + 6}M${x} ${y - 4}C${x - d * .3} ${y + 2} ${x - d * .8} ${y + 4} ${x - d * 1.2} ${y + 7}" stroke="url(#${rt})" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const spikes = [[44, 36, -9, -13], [50, 28, -6, -16], [58, 23, -3, -17], [66, 21, 0, -19], [74, 23, 3, -17], [82, 28, 6, -16], [88, 36, 9, -13]];
  const body = `${_qsh(42)}<g class="p-hop"><g class="p-body">
    ${[[38, 114, -14], [64, 116, 0], [92, 114, 14]].map(root).join('')}
    <g class="p-limb" style="transform-origin:100% 85%">${vine('M42 78C22 84 6 74 8 56 10 44 22 42 20 32')}${[[14, 74, -3, 8], [8, 64, -8, 3], [10, 50, -8, -3], [18, 42, -7, -6]].map(([x, y, dx, dy]) => _thorn(x, y, dx, dy, 4.4, '#e8e0f4')).join('')}${bud(20, 28, 1.35)}</g>
    <g class="p-limb" style="transform-origin:0% 85%">${vine('M86 78C106 84 122 74 120 56 118 44 106 42 108 32')}${[[114, 74, 3, 8], [120, 64, 8, 3], [118, 50, 8, -3], [110, 42, 7, -6]].map(([x, y, dx, dy]) => _thorn(x, y, dx, dy, 4.4, '#e8e0f4')).join('')}${bud(108, 28, 1.35)}</g>
    <g class="p-leaves" style="transform-origin:50% 0%"><path d="M38 88C38 110 52 114 64 114 76 114 90 110 90 88Z" fill="url(#${li})" ${K}/>${skirtBack}${skirt}${skirtF}
      <path d="M52 86C52 100 56 106 64 106 72 106 76 100 76 86Z" fill="url(#${pd})" ${K}/>
      ${[132, 166, 198, 232].map(a => { const r = a * Math.PI / 180; return `<circle cx="${(bx + Math.sin(r) * 38).toFixed(1)}" cy="${(82 - Math.cos(r) * 38).toFixed(1)}" r="2.4" fill="#ff3a54" stroke="#14081c" stroke-width="1"/>`; }).join('')}
      ${[[52, 104, -7, 6], [76, 104, 7, 6], [64, 108, 0, 8]].map(([x, y, dx, dy]) => _thorn(x, y, dx, dy, 4.6, '#e8e0f4')).join('')}
    </g>
    <g class="p-leaves" style="transform-origin:50% 100%">${bloomB}${bloomM}${rims}${bloomF}
      <path d="M48 60C47 42 55 33 66 33 77 33 85 42 84 60 83 72 75 78 66 78 57 78 49 72 48 60Z" fill="url(#${fc})" ${K}/>
      <path d="M54 42C58 37 62 35 68 35" stroke="#fff" stroke-width="2.2" fill="none" opacity=".45" stroke-linecap="round"/>
      <g class="p-glow"><ellipse cx="66" cy="56" rx="20" ry="22" fill="url(#${gl})" opacity=".4"/></g>
      <g class="p-eye"><path d="M53 52C57 48 63 48 66 52 62 57 57 57 53 52Z" fill="#ffe27a" stroke="#4a0618" stroke-width="1.6" stroke-linejoin="round"/><path d="M79 52C75 48 69 48 66 52 70 57 75 57 79 52Z" fill="#ffe27a" stroke="#4a0618" stroke-width="1.6" stroke-linejoin="round"/>
        <ellipse cx="60.6" cy="52.4" rx="2" ry="3" fill="#2a0612"/><ellipse cx="72.4" cy="52.4" rx="2" ry="3" fill="#2a0612"/><circle cx="59.8" cy="51" r=".9" fill="#fff"/><circle cx="71.6" cy="51" r=".9" fill="#fff"/></g>
      <path class="p-brow" d="M49 45 65 51M83 45 67 51" stroke="#2a0612" stroke-width="3.6" stroke-linecap="round"/><path d="M66 54V64" stroke="#8a1030" stroke-width="1.6" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M58 68C62 73 70 73 74 68" stroke="#2a0612" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M61.6 70 63 73.6 64.6 71ZM67.6 71 69 73.6 70.6 70Z" fill="#fff" stroke="#14081c" stroke-width=".9" stroke-linejoin="round"/></g>
    </g>
    <g class="p-tuft">${spikes.map(([x, y, dx, dy]) => `<path d="M${x - 3.6} ${y + 4} ${x + dx} ${y + dy} ${x + 3.6} ${y + 4}Z" fill="url(#${sv})" stroke="#14081c" stroke-width="1.5" stroke-linejoin="round"/>`).join('')}
      <path d="M42 40C48 30 56 30 66 30 76 30 84 30 90 40 84 36 76 35 66 35 56 35 48 36 42 40Z" fill="#241038" stroke="#14081c" stroke-width="2" stroke-linejoin="round"/><path d="M44 38C52 33 80 33 88 38" stroke="#b88ae0" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>
      ${[[54, 33], [66, 31], [78, 33]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#ff3a4a" stroke="#14081c" stroke-width="1.2"/><circle cx="${x - .8}" cy="${y - .9}" r=".9" fill="#fff"/>`).join('')}</g>
  </g></g>`;
  return _msvg('reine_roses', defs, body);
}

Object.assign(MON_ART, {
  rat_cagoule: _ratCagoule(), vampyro: _vampyro(), gargouille: _gargouille(), ombre_vorace: _ombreVorace(), comte_vesperal: _comteVesperal(),
  rose_epineuse: _roseEpineuse(), papillon_nuit: _papillonNuit(), epouvantail: _epouvantail(), reine_roses: _reineRoses(),
});
