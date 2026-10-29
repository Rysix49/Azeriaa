/* =====================================================================
   AMAKNA IDLE — SPRITES ANIMÉS DES SOUS-ZONES (dessins originaux)
   Même convention que monart.js : 128×128, tournés vers la DROITE, classes animées p-*.
   Les familles (blops, wabbits, kanniboul, porcos, dragoeufs, mansots) sont générées par de petites
   fonctions : une silhouette commune, des couleurs et des accessoires propres à chaque monstre.
   NB : une animation CSS écrase l'attribut transform de son élément → toute mise à l'échelle
   passe par un <g> parent, jamais sur l'élément animé lui-même.
   ===================================================================== */
let _mq = 0; const _q = () => 'mq' + (++_mq);
const _stops = a => a.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op != null ? ` stop-opacity="${op}"` : ''}/>`).join('');
const _qlg = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${_stops(stops)}</linearGradient>`;
const _qrg = (id, stops, cx = .4, cy = .3, r = .75) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${_stops(stops)}</radialGradient>`;
const _msvg = (id, defs, body, extra = '') => `<svg class="ms ms-${id}${extra}" viewBox="0 0 128 128" aria-hidden="true"><defs>${defs}</defs>${body}</svg>`;
const _qsh = (rx = 30, cx = 64) => `<ellipse class="p-shadow" cx="${cx}" cy="119" rx="${rx}" ry="5" fill="#000" opacity=".3"/>`;
const _qeye = (cx, cy, r = 5, iris = '#3a2a18', look = 1.2, white = '#fff') =>
  `<g class="p-eye"><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.1}" fill="${white}" stroke="#1a1008" stroke-width="1.2"/><circle cx="${cx + look}" cy="${cy + .4}" r="${r * .64}" fill="${iris}"/><circle cx="${cx + look + .3}" cy="${cy + .4}" r="${r * .34}" fill="#0a0604"/><circle cx="${cx + look - r * .22}" cy="${cy - r * .3}" r="${r * .22}" fill="#fff"/></g>`;
const _vb = 'style="transform-box:view-box"'; // sans ça, `.ms * { transform-box: fill-box }` décale tout transform= (rotate/scale) statique
const _sc = (s, inner, cx = 64, cy = 114) => s === 1 ? inner : `<g ${_vb} transform="translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;
/* contour « fourrure » : ellipse dont le bord est dentelé (n pointes, amplitude amp) */
const _fur = (cx, cy, rx, ry, n = 14, amp = 3, rot = 0) => {
  let d = ''; const N = n * 2;
  for (let i = 0; i < N; i++) {
    const a = rot + (i / N) * Math.PI * 2, r = i % 2 ? 1 : 1 + amp / Math.max(rx, ry);
    const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
    if (i === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
    else { const am = rot + ((i - .5) / N) * Math.PI * 2, rm = 1 + (i % 2 ? amp * .35 : amp * .2) / Math.max(rx, ry); d += `Q${(cx + Math.cos(am) * rx * rm * 1.04).toFixed(1)} ${(cy + Math.sin(am) * ry * rm * 1.04).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`; }
  }
  return d + 'Z';
};

const MON_ART2 = {};

/* =====================================================================
   BLOPS — gelée à gros yeux, une garniture par couleur
   ===================================================================== */
function _blop(id, o) {
  const g = _q(), sk = _q(), rb = _q(), rs = _q();
  const [c1, c2, c3, c4] = o.c, s = o.s || 1;
  const BODY = 'M18 108C10 80 28 46 64 44s54 36 46 64c-2 7-90 7-92 0Z';
  let defs = _qrg(g, [[0, c1], [.45, c2], [.85, c3], [1, c4]], .36, .3, .85);
  let paint = `fill="url(#${g})"`;
  if (o.rainbow) {
    defs += _qlg(rb, [[0, '#ff5a5a'], [.2, '#ffb02e'], [.4, '#ffe84a'], [.6, '#5adf6a'], [.8, '#4aa8ff'], [1, '#b06aff']], 0, 0, 1, .55) + _qrg(rs, [[0, '#fff', .55], [.45, '#fff', 0], [1, '#14081e', .42]], .36, .28, .9);
    paint = `fill="url(#${rb})"`;
  }
  const top = {
    coco: `<g class="p-leaves"><path d="M36 56C38 38 90 38 92 56 82 49 46 49 36 56Z" fill="#5a3a1e" stroke="#2a1608" stroke-width="1.6"/><path d="M40 52c4-3 10-4 14-3M60 46c6-1 12-1 18 1M82 48c4 1 7 3 9 6M46 48l-2-5M58 45l-1-6M72 45l1-6M84 48l3-5" stroke="#8a5e34" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="64" cy="53.5" rx="23" ry="3" fill="#fffaf0" stroke="#d9c9a6" stroke-width="1"/></g>`,
    griotte: `<g class="p-leaves"><path d="M56 44C56 34 60 26 66 22M76 42C76 32 72 26 66 22" stroke="#4a7a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M66 22c6-8 14-8 18-4-4 6-12 8-18 4Z" fill="#58b042" stroke="#1f5a1a" stroke-width="1.3"/><circle cx="55" cy="46" r="8.5" fill="#d8202e" stroke="#6a0a14" stroke-width="1.5"/><circle cx="78" cy="44" r="8.5" fill="#e83040" stroke="#6a0a14" stroke-width="1.5"/><circle cx="52" cy="43" r="2.4" fill="#fff" opacity=".8"/><circle cx="75" cy="41" r="2.4" fill="#fff" opacity=".8"/></g>`,
    indigo: `<g class="p-leaves"><circle cx="48" cy="48" r="7" fill="#3a46b8" stroke="#10145a" stroke-width="1.5"/><circle cx="64" cy="42" r="8" fill="#4a56d0" stroke="#10145a" stroke-width="1.5"/><circle cx="80" cy="48" r="7" fill="#3a46b8" stroke="#10145a" stroke-width="1.5"/><path d="M64 36l-2-2M64 36l2-2M64 36v-3M48 43l-2-2M48 43l2-2M80 43l-2-2M80 43l2-2" stroke="#10145a" stroke-width="1.3" stroke-linecap="round"/><circle cx="61" cy="40" r="2.2" fill="#fff" opacity=".7"/><circle cx="46" cy="46" r="1.8" fill="#fff" opacity=".6"/><circle cx="78" cy="46" r="1.8" fill="#fff" opacity=".6"/></g>`,
    reinette: `<g class="p-leaves"><path d="M64 48C64 40 65 34 68 28" stroke="#5a3a1c" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M68 30c2-9 12-12 18-8-1 8-10 12-18 8Z" fill="#6ad04a" stroke="#1f6a1a" stroke-width="1.3"/><path d="M68 30c-1-6-8-9-13-7 0 6 7 9 13 7Z" fill="#8aea5a" stroke="#1f6a1a" stroke-width="1.3"/><path d="M70 29c4-2 9-3 13-2" stroke="#d4f5a0" stroke-width="1" fill="none"/></g>`,
    royal: '',
  }[o.top] || '';
  const crown = o.crown ? `<g class="p-glow"><path d="M40 52 36 28 50 38 64 22 78 38 92 28 88 52Z" fill="#ffd84a" stroke="#8a5a0a" stroke-width="2" stroke-linejoin="round"/><path d="M40 52H88V47H40Z" fill="#e8a020" stroke="#8a5a0a" stroke-width="1.6"/><path d="M42 40 38 30 49 38M64 24 61 38M78 38 90 30 86 40" stroke="#fff6b0" stroke-width="1.2" fill="none" opacity=".7"/><circle cx="64" cy="29" r="3.4" fill="#ff4a6a" stroke="#6a0a1a" stroke-width="1"/><circle cx="38" cy="30" r="2.6" fill="#4ab8ff" stroke="#0a3a6a" stroke-width="1"/><circle cx="90" cy="30" r="2.6" fill="#5adf6a" stroke="#0a5a1a" stroke-width="1"/><circle cx="52" cy="49.5" r="1.8" fill="#fff"/><circle cx="64" cy="49.5" r="1.8" fill="#ffe27a"/><circle cx="76" cy="49.5" r="1.8" fill="#fff"/></g>` : '';
  const eyes = `${_qeye(50, 80, 7.4, o.iris || '#2a3a5a', 1.4)}${_qeye(80, 80, 7.4, o.iris || '#2a3a5a', 1.4)}`;
  const mouth = o.coco ? `<path d="M54 94Q66 106 78 94Z" fill="#fffaf0" stroke="#3a2008" stroke-width="1.6" stroke-linejoin="round"/>` : `<path d="M55 94Q66 103 77 94" stroke="#1a1020" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const sparkle = o.rainbow ? [[24, 62], [106, 58], [98, 96], [30, 100]].map(([x, y], i) => `<path class="p-glow" transform="translate(${x} ${y})" d="M0-5 1.4-1.4 5 0 1.4 1.4 0 5-1.4 1.4-5 0-1.4-1.4Z" fill="#fff" style="animation-delay:-${i * 450}ms"/>`).join('') : '';
  const body = `${_qsh(o.rainbow ? 44 : 38)}${_sc(s, `<g class="p-body"><path d="${BODY}" ${paint} stroke="${c4}" stroke-width="2.4" stroke-linejoin="round"/>${o.rainbow ? `<path d="${BODY}" fill="url(#${rs})"/>` : ''}
      <ellipse cx="64" cy="110" rx="40" ry="6.5" fill="${c4}" opacity=".42"/>
      <path d="M34 78C35 65 45 56 58 52 49 58 44 67 42 80Z" fill="#fff" opacity=".5"/><ellipse cx="96" cy="68" rx="3.2" ry="5.4" fill="#fff" opacity=".4" ${_vb} transform="rotate(28 96 68)"/>
      <circle cx="90" cy="98" r="5" fill="${c1}" opacity=".4"/><circle cx="43" cy="99" r="3" fill="${c1}" opacity=".35"/><circle cx="74" cy="105" r="2.4" fill="${c1}" opacity=".4"/>
      ${eyes}<ellipse cx="40" cy="92" rx="5" ry="3" fill="#ff8aa0" opacity=".38"/><ellipse cx="90" cy="92" rx="5" ry="3" fill="#ff8aa0" opacity=".38"/>${mouth}${top}${crown}</g>`)}${sparkle}`;
  return _msvg(id, defs, body, ' ms-gelee');
}
Object.assign(MON_ART2, {
  blop_coco:     _blop('blop_coco', { c: ['#e8c08a', '#b98350', '#7a4a24', '#3e2410'], top: 'coco', coco: true, iris: '#4a2a10' }),
  blop_griotte:  _blop('blop_griotte', { c: ['#ff9a8a', '#e83a44', '#a8142a', '#58081a'], top: 'griotte', iris: '#5a1020' }),
  blop_indigo:   _blop('blop_indigo', { c: ['#9aa8ff', '#4a5ae0', '#2a2a9a', '#10104a'], top: 'indigo', iris: '#10145a' }),
  blop_reinette: _blop('blop_reinette', { c: ['#d4ff9a', '#8ae04a', '#3a9a2a', '#145a14'], top: 'reinette', iris: '#144a14' }),
  blop_royal:    _blop('blop_royal', { c: ['#ffffff', '#c8c8ff', '#8a7ae0', '#3a2a8a'], rainbow: true, crown: true, s: 1.14, iris: '#6a2ab8' }),
});

/* =====================================================================
   WABBITS — lapins à grandes oreilles : Wabbit, Black Wabbit, Wo Wabbit (casque), Wa Wabbit (couronne + cape)
   ===================================================================== */
function _wabbit(id, o) {
  const f = _q(), fb = _q(), ei = _q(), mt = _q();
  const [c1, c2, c3] = o.fur, line = o.line || c3, s = o.s || 1;
  const defs = _qrg(f, [[0, c1], [.55, c2], [1, c3]], .4, .28, .9) + _qrg(fb, [[0, '#ffffff'], [1, o.belly || '#f2e4d4']], .4, .3, .9)
    + _qlg(ei, [[0, o.inner || '#ffc0d0'], [1, o.inner2 || '#e8708c']]) + _qlg(mt, [[0, '#f4f8ff'], [.5, '#a8b4c8'], [1, '#5a6478']], 0, 0, 1, 1);
  const K = `stroke="${line}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const tail = `<g class="p-tail"><path d="${_fur(22, 90, 10, 10, 7, 3)}" fill="${o.tail || '#fff'}" ${K}/>${o.spiky ? '<path d="M14 84 6 78M12 92 3 92M15 99 7 105" stroke="#14141a" stroke-width="2.4" stroke-linecap="round"/>' : ''}</g>`;
  const cape = o.cape ? `<g><path d="M58 60C34 62 18 82 14 112 34 118 52 116 70 112 66 92 64 76 58 60Z" fill="#7a3ac8" stroke="#2a0e5a" stroke-width="2" stroke-linejoin="round"/><path d="M58 60C46 70 34 90 30 114" stroke="#b07af0" stroke-width="2" fill="none" opacity=".6"/><path d="M14 112C34 118 52 116 70 112" stroke="#ffd84a" stroke-width="3.4" fill="none" stroke-linecap="round"/><g fill="#fff" stroke="#2a0e5a" stroke-width=".8"><circle cx="30" cy="106" r="2.4"/><circle cx="46" cy="109" r="2.4"/><circle cx="58" cy="108" r="2.4"/></g><path d="M52 62l-4 6M64 62l4 6" stroke="#ffd84a" stroke-width="2.6" stroke-linecap="round"/></g>` : '';
  const ears = `<g class="p-tuft"><path d="M62 40C52 28 46 12 52 2 62 4 70 20 72 38Z" fill="url(#${f})" ${K}/><path d="M61 36C55 26 51 14 54 7 61 10 66 22 68 35Z" fill="url(#${ei})"/>
      <path d="M78 36C76 22 84 8 94 4 98 14 94 28 88 40Z" fill="url(#${f})" ${K}/><path d="M80 34C79 22 85 12 92 9 94 17 91 27 86 37Z" fill="url(#${ei})"/>${o.notch ? '<path d="M94 4 90 11 98 9Z" fill="#6a8a3a"/><path d="M52 2 56 9 48 8Z" fill="#6a8a3a" opacity="0"/>' : ''}</g>`;
  const helmet = o.helmet ? `<g><path d="M58 46C58 30 98 30 100 46 88 42 70 42 58 46Z" fill="url(#${mt})" stroke="#3a4254" stroke-width="2" stroke-linejoin="round"/><path d="M58 46 100 46" stroke="#3a4254" stroke-width="2.4"/><path d="M78 31v-8" stroke="#3a4254" stroke-width="3" stroke-linecap="round"/><g class="p-tuft"><path d="M78 24C70 18 66 8 70 2 78 6 84 14 82 24Z" fill="#e0402f" stroke="#7a1410" stroke-width="1.6" stroke-linejoin="round"/></g><path d="M64 38C70 33 80 32 88 35" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7" stroke-linecap="round"/></g>` : '';
  const crown = o.crown ? `<g class="p-glow"><path d="M62 42 60 24 69 32 78 18 87 32 96 24 94 42Z" fill="#ffd84a" stroke="#8a5a0a" stroke-width="2" stroke-linejoin="round"/><path d="M62 42H94V37H62Z" fill="#e8a020" stroke="#8a5a0a" stroke-width="1.6"/><circle cx="78" cy="25" r="3" fill="#ff4a6a" stroke="#6a0a1a" stroke-width="1"/><circle cx="62" cy="27" r="2.2" fill="#4ab8ff" stroke="#0a3a6a" stroke-width=".9"/><circle cx="94" cy="27" r="2.2" fill="#5adf6a" stroke="#0a5a1a" stroke-width=".9"/><path d="M64 32 61 26M92 32 95 26" stroke="#fff6b0" stroke-width="1" opacity=".7"/></g>` : '';
  const eyeCol = o.eyeW ? _qeye(88, 47, 5.4, o.iris, 1.4, o.eyeW) : _qeye(88, 47, 5.4, o.iris, 1.4);
  const glow = o.glow ? `<circle class="p-glow" cx="89" cy="47" r="9" fill="${o.glow}" opacity=".4"/>` : '';
  const sword = o.sword ? `<g class="p-limb"><path d="M84 96 98 86" stroke="#5a3a1c" stroke-width="3.6" stroke-linecap="round"/><path d="M96 90 102 80" stroke="#d9a441" stroke-width="3" stroke-linecap="round"/><path d="M100 82 118 62 122 66 106 88Z" fill="url(#${mt})" stroke="#3a4254" stroke-width="1.6" stroke-linejoin="round"/><path d="M104 80 118 65" stroke="#fff" stroke-width="1.2" opacity=".8"/><circle cx="84" cy="97" r="5" fill="${c1}" stroke="${line}" stroke-width="1.6"/></g><g><circle cx="60" cy="94" r="14" fill="#8a5a2e" stroke="#3a2008" stroke-width="2"/><circle cx="60" cy="94" r="9.5" fill="none" stroke="#d9a441" stroke-width="1.6"/><circle cx="60" cy="94" r="4" fill="url(#${mt})" stroke="#3a4254" stroke-width="1.3"/></g>` : '';
  const sceptre = o.sceptre ? `<g class="p-limb"><path d="M84 112 104 56" stroke="#e8a020" stroke-width="3.4" stroke-linecap="round"/><path d="M84 112 104 56" stroke="#fff3b0" stroke-width="1" opacity=".7"/><path d="M104 56c-6-3-8-12-3-18 6 2 10 10 7 17Z" fill="#ff9a2e" stroke="#9a4a10" stroke-width="1.6" stroke-linejoin="round"/><path d="M103 38c-3-6-1-10 3-12M103 38c2-6 7-8 10-6M103 38l-9-3" stroke="#4aa83a" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="84" cy="106" r="5" fill="url(#${f})" stroke="${line}" stroke-width="1.6"/></g>` : '';
  const fangs = o.fangs ? '<path d="M96 62 94 68 99 63ZM104 61 104 67 107 60Z" fill="#fff" stroke="#14141a" stroke-width=".8"/>' : '<rect x="98" y="62" width="4.6" height="7" rx="1.2" fill="#fff" stroke="#6a5a4a" stroke-width="1"/><path d="M100.3 62v7" stroke="#bdb0a0" stroke-width=".8"/>';
  const rabbit = `${_qsh(32)}<g class="p-hop">
    ${cape}${tail}
    <g class="p-body"><path d="M26 98C22 72 38 56 60 56 80 56 94 70 92 94 90 108 76 114 58 114 40 114 28 108 26 98Z" fill="url(#${f})" ${K}/>
      <ellipse cx="72" cy="94" rx="15" ry="18" fill="url(#${fb})" opacity=".95"/><path d="M62 82q8 4 16 0M60 92q10 5 20 0" stroke="${c3}" stroke-width="1" fill="none" opacity=".25" stroke-linecap="round"/>
      <ellipse cx="42" cy="98" rx="16" ry="14" fill="url(#${f})" ${K}/><path d="M32 90c4-6 12-8 18-6" stroke="#fff" stroke-width="1.6" fill="none" opacity=".35" stroke-linecap="round"/>
      <ellipse cx="53" cy="113" rx="16" ry="6.4" fill="url(#${fb})" ${K}/><path d="M60 112v3M66 112v3M72 111v3" stroke="${c3}" stroke-width="1.2" opacity=".5" stroke-linecap="round"/>
      <ellipse cx="84" cy="96" rx="6" ry="12" fill="url(#${f})" ${K}/><ellipse cx="86" cy="109" rx="7" ry="4.2" fill="url(#${fb})" ${K}/>
      ${o.vest || ''}
      ${ears}
      <ellipse cx="78" cy="52" rx="21" ry="19" fill="url(#${f})" ${K}/><path d="M60 44c3-8 10-12 18-12" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
      <ellipse cx="94" cy="57" rx="12" ry="9" fill="url(#${fb})"/><ellipse cx="88" cy="62" rx="9" ry="6.2" fill="url(#${fb})" opacity=".8"/>
      ${helmet}${crown}${glow}${eyeCol}
      ${o.brow ? '<path class="p-brow" d="M80 40 96 46" stroke="#14141a" stroke-width="3" stroke-linecap="round"/>' : ''}
      <path d="M102 50c2-2 6-2 7 0 .6 2-2 4-4 4-3 0-4-2-3-4Z" fill="${o.nose || '#ff7a9a'}" stroke="#7a2a3a" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M105 54v5M105 59Q101 63 96 60" stroke="#5a3a3a" stroke-width="1.5" fill="none" stroke-linecap="round"/>${fangs}
      <path d="M104 56l11-3M104 58l12 1M103 60l10 6" stroke="#fff" stroke-width="1.1" opacity=".55" stroke-linecap="round"/>
      ${o.blush === false ? '' : '<ellipse cx="84" cy="60" rx="4.4" ry="2.6" fill="#ff8aa0" opacity=".4"/>'}
    </g>${sword}${sceptre}</g>`;
  return _msvg(id, defs, _sc(s, rabbit));
}
Object.assign(MON_ART2, {
  wabbit:       _wabbit('wabbit', { fur: ['#ffffff', '#f1e6dc', '#c9b6a6'], line: '#8a7060', inner: '#ffc2d2', iris: '#c8284a', eyeW: '#fff' }),
  black_wabbit: _wabbit('black_wabbit', { fur: ['#6a6a7e', '#36364a', '#14141c'], line: '#08080e', belly: '#7a7a90', inner: '#8a3a4a', inner2: '#4a1020', nose: '#c43a5a', iris: '#ff3a2a', eyeW: '#ffd8c8', glow: '#ff2a1a', spiky: true, notch: true, fangs: true, brow: true, tail: '#2a2a38', blush: false }),
  wo_wabbit:    _wabbit('wo_wabbit', { fur: ['#f0d4a4', '#c9985a', '#7a5028'], line: '#4a2c10', belly: '#f6e6c4', inner: '#ffc2a0', iris: '#5a2a0a', helmet: true, sword: true, tail: '#f6e6c4', brow: true }),
  wa_wabbit:    _wabbit('wa_wabbit', { fur: ['#ffffff', '#e8dcf8', '#a898c8'], line: '#4a3a7a', belly: '#fff', inner: '#e8a8ff', inner2: '#b868e8', iris: '#e8a020', eyeW: '#fff8e0', crown: true, cape: true, sceptre: true, s: 1.06, tail: '#fff' }),
});

/* =====================================================================
   KANNIBOUL — petits démons masqués de l'île de Moon (peaux fantaisistes, grands masques de bois, plumes)
   Jav : javelot · Ark : arc · Sarbak : sarbacane · Ebil : le chef, masque à cornes et bâton à crâne
   ===================================================================== */
function _kanni(id, o) {
  const sk = _q(), mk = _q(), fe = _q(), sg = _q();
  const [s1, s2, s3] = o.skin, s = o.s || 1, line = o.line || s3;
  const [f1, f2, f3] = o.feathers;
  const defs = _qrg(sk, [[0, s1], [.55, s2], [1, s3]], .4, .3, .9) + _qrg(mk, [[0, '#fff4d8'], [.6, o.mask || '#e8c890'], [1, '#9a7038']], .36, .28, .9)
    + _qlg(fe, [[0, f1], [1, f2]], 0, 1, 0, 0) + _qlg(sg, [[0, '#d8d8e0'], [.5, '#8a8a98'], [1, '#4a4a58']], 0, 0, 1, 1);
  const K = `stroke="${line}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
  const feather = (rot, len, w = 7) => `<g ${_vb} transform="rotate(${rot} 64 40)"><path d="M64 40C${64 - w} ${40 - len * .4} ${64 - w * .6} ${40 - len * .9} 64 ${40 - len} ${64 + w * .6} ${40 - len * .9} ${64 + w} ${40 - len * .4} 64 40Z" fill="url(#${fe})" stroke="${f3}" stroke-width="1.6" stroke-linejoin="round"/><path d="M64 38V${42 - len}" stroke="${f3}" stroke-width="1.2" opacity=".6"/><ellipse cx="64" cy="${40 - len * .75}" rx="${w * .35}" ry="${w * .5}" fill="${o.eyeFeather || '#fff'}" opacity=".85"/></g>`;
  const crest = `<g class="p-tuft">${(o.crest || [[-30, 20], [-12, 27], [7, 30], [25, 23]]).map(([r, l]) => feather(r, l)).join('')}</g>`;
  const horns = o.horns ? `<g><path d="M52 40C42 34 36 22 42 12 46 22 54 28 60 32Z" fill="#f0e4c8" stroke="#6a5030" stroke-width="2" stroke-linejoin="round"/><path d="M80 40C90 34 96 22 90 12 86 22 78 28 72 32Z" fill="#f0e4c8" stroke="#6a5030" stroke-width="2" stroke-linejoin="round"/><path d="M45 18c3 6 8 10 12 13M87 18c-3 6-8 10-12 13" stroke="#b89a68" stroke-width="1.2" fill="none"/></g>` : '';
  const skirt = `<g class="p-leaves">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${42 + i * 7.4} 98l-5 22 7.4-6 3.6 7 3.4-7 7.4 6-4.8-22Z" fill="${i % 2 ? (o.grass2 || '#9ac83a') : (o.grass1 || '#c8e04a')}" stroke="#3a5a14" stroke-width="1.2" stroke-linejoin="round" transform="translate(0 -4)"/>`).join('')}<path d="M40 96Q64 104 90 96" stroke="#5a3a1c" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M40 96Q64 104 90 96" stroke="#d9a441" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/></g>`;
  const legs = `<path d="M50 104v10h-6c-3 0-3 4 0 4h12v-14Z" fill="url(#${sk})" ${K}/><path d="M72 104v10h-6c-3 0-3 4 0 4h12v-14Z" fill="url(#${sk})" ${K}/>`;
  const torso = `<path d="M44 72C38 92 46 106 64 106 84 106 92 92 86 72 82 62 50 62 44 72Z" fill="url(#${sk})" ${K}/><path d="M50 80q14 8 28 0M52 88q12 6 24 0" stroke="${o.paint || '#e0402f'}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/><path d="M48 70c6-4 14-6 20-5" stroke="#fff" stroke-width="2" fill="none" opacity=".3" stroke-linecap="round"/>`;
  const neck = `<g>${[0, 1, 2, 3, 4, 5, 6].map(i => { const t = i / 6, x = 48 + t * 32, y = 70 + Math.sin(t * Math.PI) * 11; return `<rect x="${x - 2}" y="${y - 3.4}" width="4" height="7" rx="2" fill="#fff4dc" stroke="#8a7050" stroke-width="1" ${_vb} transform="rotate(${(t - .5) * 50} ${x} ${y})"/>`; }).join('')}</g>`;
  const wtype = o.weapon;
  const backArm = `<path d="M48 72Q38 80 36 94" stroke="#000" stroke-opacity=".18" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M48 72Q38 80 36 94" stroke="url(#${sk})" stroke-width="9.6" fill="none" stroke-linecap="round"/><circle cx="36" cy="95" r="5.2" fill="url(#${sk})" ${K}/>`;
  const handle = (x, y) => `<circle cx="${x}" cy="${y}" r="5.4" fill="url(#${sk})" ${K}/>`;
  const arm = (hx, hy) => `<path d="M82 74Q${(82 + hx) / 2 + 6} ${(74 + hy) / 2 - 4} ${hx} ${hy}" stroke="${line}" stroke-opacity=".5" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M82 74Q${(82 + hx) / 2 + 6} ${(74 + hy) / 2 - 4} ${hx} ${hy}" stroke="url(#${sk})" stroke-width="9.6" fill="none" stroke-linecap="round"/>`;
  const weapon = {
    jav: `<g class="p-limb"><path d="M84 112 116 34" stroke="#5a3a1c" stroke-width="3.4" stroke-linecap="round"/><path d="M84 112 116 34" stroke="#b88a52" stroke-width="1.2" stroke-linecap="round" opacity=".7"/><path d="M116 34 111 22 120 26Z" fill="url(#${sg})" stroke="#2a2a38" stroke-width="1.4" stroke-linejoin="round"/><path d="M108 52c4-4 8-2 8-2s-2 6-6 8Z" fill="${f1}" stroke="${f3}" stroke-width="1"/>${arm(96, 88)}${handle(96, 88)}</g>`,
    ark: `<g class="p-limb"><path d="M104 36C124 56 124 86 104 108" stroke="#5a3a1c" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M104 36C124 56 124 86 104 108" stroke="#b88a52" stroke-width="1.4" fill="none" opacity=".7"/><path d="M104 36 100 72 104 108" stroke="#f0e4c8" stroke-width="1.2" fill="none"/><path d="M96 72 124 72" stroke="#5a3a1c" stroke-width="2.4" stroke-linecap="round"/><path d="M124 72 118 68 118 76Z" fill="url(#${sg})"/><path d="M96 72 100 69M96 72 100 75" stroke="${f1}" stroke-width="2" stroke-linecap="round"/>${arm(98, 74)}${handle(98, 74)}</g>`,
    sarbak: `<g class="p-limb"><path d="M72 62 124 40" stroke="#3a2a14" stroke-width="5" stroke-linecap="round"/><path d="M72 62 124 40" stroke="#c8a458" stroke-width="3" stroke-linecap="round"/><path d="M76 60 120 42" stroke="#fff3c0" stroke-width="1" opacity=".7"/><path d="M96 51 98 56M108 46 110 51" stroke="#5a3a1c" stroke-width="2.4" stroke-linecap="round"/><circle cx="124" cy="40" r="2.6" fill="#1a1008"/>${arm(88, 66)}${handle(90, 64)}</g>`,
    staff: `<g class="p-limb"><path d="M90 118 100 22" stroke="#4a2c14" stroke-width="4" stroke-linecap="round"/><path d="M90 118 100 22" stroke="#a87a42" stroke-width="1.2" opacity=".7"/>
      <g><path d="M88 22C88 8 112 8 112 22 112 28 108 30 108 36H92C92 30 88 28 88 22Z" fill="#f4ecd8" stroke="#6a5030" stroke-width="2" stroke-linejoin="round"/><circle cx="95" cy="21" r="4" fill="#1a1008"/><circle cx="105" cy="21" r="4" fill="#1a1008"/><circle class="p-glow" cx="95" cy="21" r="2" fill="#ff5a1e"/><circle class="p-glow" cx="105" cy="21" r="2" fill="#ff5a1e"/><path d="M100 26l-2 4h4Z" fill="#1a1008"/><path d="M94 33v3M98 33v3M102 33v3M106 33v3" stroke="#6a5030" stroke-width="1"/>
      <path d="M88 20C80 16 80 8 84 4M112 20C120 16 120 8 116 4" stroke="#f4ecd8" stroke-width="3.4" fill="none" stroke-linecap="round"/></g><path d="M96 60c-6 4-6 10-1 14M104 70c6 4 6 10 1 14" stroke="${f1}" stroke-width="2.6" fill="none" stroke-linecap="round"/>${arm(94, 82)}${handle(94, 82)}</g>`,
  }[wtype] || '';
  const mask = `<g><path d="M66 30C48 30 46 54 52 68 58 76 74 76 80 68 86 54 84 30 66 30Z" fill="url(#${mk})" stroke="#5a3a14" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M52 44q14-6 28 0" stroke="${o.paint || '#e0402f'}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M54 36q12-6 24 0" stroke="#1a1008" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M66 36v28" stroke="#9a7038" stroke-width="1.4" opacity=".6"/>
      <path d="M52 56l6 3M80 56l-6 3M50 62l7 2M82 62l-7 2" stroke="${o.paint || '#e0402f'}" stroke-width="2.2" stroke-linecap="round"/>
      <g class="p-eye"><path d="M54 50q5-5 11 0-5 4-11 0Z" fill="${o.eyeCol || '#ffe14a'}" stroke="#1a1008" stroke-width="1.6" stroke-linejoin="round"/><path d="M69 50q5-5 11 0-5 4-11 0Z" fill="${o.eyeCol || '#ffe14a'}" stroke="#1a1008" stroke-width="1.6" stroke-linejoin="round"/><circle cx="61" cy="49.6" r="1.8" fill="#1a1008"/><circle cx="76" cy="49.6" r="1.8" fill="#1a1008"/></g>
      <path d="M66 53l-3 8h6Z" fill="#c8a458" stroke="#5a3a14" stroke-width="1.2" stroke-linejoin="round"/>
      <g class="p-jaw"><path d="M56 66Q66 74 76 66Q66 70 56 66Z" fill="#1a1008" stroke="#1a1008" stroke-width="1.5" stroke-linejoin="round"/><path d="M58 66.4l1.4 4M62 68l.8 4M66 68.6v4.4M70 68l-.8 4M74 66.4l-1.4 4" stroke="#fff8e8" stroke-width="2" stroke-linecap="round"/></g></g>`;
  const fig = `${_qsh(30)}<g class="p-hop"><g class="p-body">${backArm}${legs}${skirt}${torso}${neck}
    ${o.crestBehind === false ? '' : crest}${horns}${mask}${weapon}</g></g>`;
  return _msvg(id, defs, _sc(s, fig));
}
Object.assign(MON_ART2, {
  kanniboul_jav:    _kanni('kanniboul_jav', { skin: ['#9af0d0', '#3fb89a', '#1a6a5a'], feathers: ['#ff8a4a', '#e0402f', '#7a1a10'], paint: '#e0402f', weapon: 'jav' }),
  kanniboul_ark:    _kanni('kanniboul_ark', { skin: ['#ffd09a', '#e8923a', '#8a4a14'], feathers: ['#6ae0ff', '#2a90e0', '#0e3a7a'], paint: '#2a6ad8', weapon: 'ark', mask: '#f0d8a0', eyeFeather: '#fff4a0' }),
  kanniboul_sarbak: _kanni('kanniboul_sarbak', { skin: ['#d0d4ff', '#8a94e8', '#3a3a9a'], feathers: ['#ffe84a', '#e8a020', '#8a5a0a'], paint: '#2a9a5a', weapon: 'sarbak', mask: '#d8e8c0', eyeCol: '#ff6a4a' }),
  kanniboul_ebil:   _kanni('kanniboul_ebil', { skin: ['#ff9a8a', '#c43a2a', '#5a0e14'], line: '#2a0408', feathers: ['#ffb02e', '#e8402a', '#6a0e0a'], paint: '#1a1008', weapon: 'staff', horns: true, s: 1.1, mask: '#e8d8b8', eyeCol: '#ff3a1a', eyeFeather: '#ffe27a', grass1: '#d84a2a', grass2: '#a82a1a',
                      crest: [[-38, 26], [-20, 36], [0, 42], [20, 36], [38, 26]] }),
});

/* =====================================================================
   PORCOS — Porsalu (soldat à la fourche), Cochon de Farle (gros cochon boueux),
   Don Dorgan (parrain en costume rayé) et le Dragon Cochon (ailes, cornes, souffle de braise)
   ===================================================================== */
/* tête de cochon de profil, centrée en (0,0), tournée vers la droite — ids de dégradés passés en paramètre */
const _pigHead = (x, y, k, pk, sn, o = {}) => `<g ${_vb} transform="translate(${x} ${y}) scale(${k})">
  <path d="M-9-10-4-27 8-12Z" fill="url(#${pk})" stroke="${o.line || '#8a3248'}" stroke-width="1.8" stroke-linejoin="round"/><path d="M-6-13-3-22 4-13Z" fill="#ff7a98" opacity=".7"/>
  <ellipse cx="0" cy="0" rx="18" ry="16" fill="url(#${pk})" stroke="${o.line || '#8a3248'}" stroke-width="2"/><path d="M-12-8c3-5 8-8 14-8" stroke="#fff" stroke-width="2.2" fill="none" opacity=".45" stroke-linecap="round"/>
  <ellipse cx="20" cy="4" rx="8.4" ry="9.4" fill="url(#${sn})" stroke="${o.line || '#8a3248'}" stroke-width="2"/><ellipse cx="22" cy="0" rx="2" ry="3.2" fill="#5a1a2c"/><ellipse cx="22" cy="8.4" rx="2" ry="3.2" fill="#5a1a2c"/><ellipse cx="14" cy="-2" rx="3" ry="4" fill="#fff" opacity=".3"/>
  ${o.eye === false ? '' : _qeye(5, -4, 4.4, o.iris || '#3a1a10', 1)}${o.brow ? '<path class="p-brow" d="M-1-12 12-5" stroke="#5a1a2c" stroke-width="3" stroke-linecap="round"/>' : ''}
  <path d="M10 15Q19 19 27 13" stroke="#5a1a2c" stroke-width="2" fill="none" stroke-linecap="round"/>${o.tusks ? '<path d="M14 13 12 7 18 12ZM24 12 25 6 28 12Z" fill="#fff8e8" stroke="#6a5a40" stroke-width="1"/>' : ''}
  <ellipse cx="-4" cy="9" rx="5" ry="3" fill="#ff6a88" opacity=".35"/></g>`;
const _curlTail = (x, y, c = '#d8607a') => `<g class="p-tail"><path d="M${x} ${y}C${x - 10} ${y - 2} ${x - 12} ${y - 14} ${x - 4} ${y - 14}S${x - 2} ${y - 5} ${x - 8} ${y - 6}" stroke="#8a3248" stroke-width="5.6" fill="none" stroke-linecap="round"/><path d="M${x} ${y}C${x - 10} ${y - 2} ${x - 12} ${y - 14} ${x - 4} ${y - 14}S${x - 2} ${y - 5} ${x - 8} ${y - 6}" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
function _porcosDefs(pk, sn, col = ['#ffe0e6', '#ffa8bb', '#d8607a']) { return _qrg(pk, [[0, col[0]], [.55, col[1]], [1, col[2]]], .4, .3, .9) + _qrg(sn, [[0, '#ffd0dc'], [1, '#ff8aa4']], .4, .3, .9); }
const _boot = (x, y, c = '#4a2c14') => `<path d="M${x - 8} ${y}v-8h14v8c4 0 6 2 6 5H${x - 12}c0-3 2-5 6-5Z" fill="${c}" stroke="#1a0c04" stroke-width="1.8" stroke-linejoin="round"/>`;

function _porsalu() {
  const pk = _q(), sn = _q(), un = _q(), mt = _q();
  const defs = _porcosDefs(pk, sn) + _qlg(un, [[0, '#8aa05a'], [.6, '#5a7032'], [1, '#34441c']], 0, 0, 1, 1) + _qlg(mt, [[0, '#cfd6c0'], [.5, '#7a8a6a'], [1, '#3a4630']], 0, 0, 1, 1);
  const fork = `<g class="p-limb"><path d="M26 118 36 36" stroke="#6a4a22" stroke-width="3.6" stroke-linecap="round"/><path d="M26 118 36 36" stroke="#c8a058" stroke-width="1" opacity=".7"/><path d="M28 34 44 34M28 34V20M36 34V16M44 34V20" stroke="#9aa0a8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 34V20M36 34V16M44 34V20" stroke="#e8eef4" stroke-width="1" opacity=".7" stroke-linecap="round"/><path d="M30 92Q38 90 44 88" stroke="url(#${pk})" stroke-width="9.6" fill="none" stroke-linecap="round"/><circle cx="36" cy="90" r="5.2" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8"/></g>`;
  const body = `${_qsh(30)}<g class="p-hop"><g class="p-body">${_curlTail(42, 100)}
    <path d="M52 106v8h-6c-3 0-3 5 0 5h13v-13Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8" stroke-linejoin="round"/>${_boot(52, 112)}<path d="M72 106v8h-6c-3 0-3 5 0 5h13v-13Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8" stroke-linejoin="round"/>${_boot(72, 112)}
    ${fork}
    <path d="M44 74C38 92 46 108 64 108 84 108 92 92 86 74 82 64 48 64 44 74Z" fill="url(#${un})" stroke="#1e2a10" stroke-width="2" stroke-linejoin="round"/>
    <path d="M44 98Q64 106 86 98" stroke="#4a2c14" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="58" y="94" width="11" height="9" rx="1.6" fill="#ffd84a" stroke="#8a5a0a" stroke-width="1.4"/><circle cx="63.5" cy="98.5" r="1.5" fill="#8a5a0a"/>
    <path d="M60 72V94" stroke="#34441c" stroke-width="1.4"/><circle cx="66" cy="80" r="1.8" fill="#ffd84a"/><circle cx="66" cy="88" r="1.8" fill="#ffd84a"/>
    <path d="M70 70l2.4 5 5.4.6-4 3.6 1.2 5.4-5-2.8-5 2.8 1.2-5.4-4-3.6 5.4-.6Z" fill="#ffd84a" stroke="#8a5a0a" stroke-width="1" transform="translate(-6 -2) scale(.8)" ${_vb}/>
    <path d="M48 72c6-4 14-5 22-3" stroke="#fff" stroke-width="2" fill="none" opacity=".25" stroke-linecap="round"/>
    ${_pigHead(72, 50, 1.1, pk, sn, { tusks: true })}
    <path d="M52 48C50 28 92 24 94 46 90 44 56 44 52 48Z" fill="url(#${mt})" stroke="#2a3020" stroke-width="2.2" stroke-linejoin="round"/><path d="M52 48h42" stroke="#2a3020" stroke-width="3"/><path d="M58 38C64 32 76 30 86 33" stroke="#fff" stroke-width="1.8" fill="none" opacity=".6" stroke-linecap="round"/><rect x="68" y="30" width="10" height="5" rx="2" fill="#5a7032" stroke="#2a3020" stroke-width="1.2"/>
    <path d="M62 24 71 14 80 24Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8" stroke-linejoin="round" opacity="0"/>
    <g class="p-limb"><path d="M82 76Q108 72 88 44" stroke="#1e2a10" stroke-opacity=".5" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M82 76Q108 72 88 44" stroke="url(#${un})" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="87" cy="41" r="5.4" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8"/></g>
  </g></g>`;
  return _msvg('porsalu', defs, body);
}

function _farle() {
  const pk = _q(), sn = _q(), md = _q();
  const defs = _porcosDefs(pk, sn, ['#ffe6ea', '#ffb0c2', '#d8607a']) + _qrg(md, [[0, '#8a6a3a'], [1, '#4a321a']], .5, .5, .6);
  const leg = (x, o = 1) => `<path d="M${x - 6} 100v12h-3c-3 0-3 5 0 5h12c3 0 3-5 0-5h-3v-12Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8" stroke-linejoin="round" opacity="${o}"/><path d="M${x - 6} 117h12" stroke="#3a1a20" stroke-width="3.2" stroke-linecap="round"/>`;
  const body = `${_qsh(40)}<g class="p-hop"><g class="p-body">${_curlTail(24, 80)}
    ${leg(38, .85)}${leg(78, .85)}
    <path d="M18 88C14 62 38 48 62 48 86 48 100 64 98 88 96 106 80 112 58 112 36 112 20 106 18 88Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="2.2" stroke-linejoin="round"/>
    <ellipse cx="60" cy="100" rx="28" ry="10" fill="#fff" opacity=".28"/><path d="M26 66C34 56 50 52 66 52" stroke="#fff" stroke-width="2.6" fill="none" opacity=".45" stroke-linecap="round"/>
    <path d="M24 94c2-8 8-12 14-12M60 54c8-2 16 0 22 4" stroke="#8a3248" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>
    <ellipse cx="42" cy="68" rx="7" ry="4.4" fill="url(#${md})" opacity=".85"/><ellipse cx="72" cy="92" rx="5.4" ry="3.4" fill="url(#${md})" opacity=".8"/><ellipse cx="30" cy="94" rx="4" ry="2.6" fill="url(#${md})" opacity=".8"/><circle cx="50" cy="84" r="2" fill="url(#${md})" opacity=".8"/><circle cx="58" cy="62" r="1.6" fill="url(#${md})" opacity=".8"/>
    ${leg(54)}${leg(92)}
    ${_pigHead(94, 76, 1.22, pk, sn, { tusks: true })}
    <path d="M118 96 108 80" stroke="#e8c24a" stroke-width="2" stroke-linecap="round"/><path d="M118 96c-3-1-5-4-6-6M118 96c3-4 3-7 2-9" stroke="#e8c24a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g></g>`;
  return _msvg('cochon_farle', defs, body);
}

function _dorgan() {
  const pk = _q(), sn = _q(), su = _q(), gd = _q();
  const defs = _porcosDefs(pk, sn) + _qlg(su, [[0, '#56669a'], [.55, '#28325a'], [1, '#0e1226']], 0, 0, 1, 1) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffd24a'], [1, '#b8801a']], 0, 0, 1, 1);
  const stripes = [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${46 + i * 5.4} 70V106" stroke="#8a9ad0" stroke-width=".8" opacity=".4"/>`).join('');
  const chain = `<path d="M54 68Q64 94 80 68" stroke="url(#${gd})" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M54 68Q64 94 80 68" stroke="#8a5a0a" stroke-width=".8" fill="none" stroke-dasharray="1.6 2"/><circle cx="67" cy="86" r="7.2" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="1.6"/><circle cx="65" cy="84" r="2.2" fill="#fff" opacity=".8"/><path d="M63 89l4-6 4 6Z" fill="#8a5a0a" opacity=".5"/>`;
  const smoke = `<g class="p-antenna"><path d="M120 66c4-4-2-8 2-12s0-8 4-10" stroke="#e8e8f0" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/><path d="M118 70c-3-4 2-6 0-10" stroke="#e8e8f0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".5"/></g>`;
  const body = `${_qsh(28)}<g class="p-hop"><g class="p-body">${_curlTail(44, 98)}
    <path d="M52 106v7c-2 0-6 1-6 5h16v-12Z" fill="#14141c" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/><path d="M72 106v7c-2 0-6 1-6 5h16v-12Z" fill="#14141c" stroke="#000" stroke-width="1.6" stroke-linejoin="round"/><path d="M48 117h12M68 117h12" stroke="#e8e8f0" stroke-width="2" stroke-linecap="round"/>
    <path d="M44 74C38 92 46 108 64 108 84 108 92 92 86 74 82 64 48 64 44 74Z" fill="url(#${su})" stroke="#05070e" stroke-width="2" stroke-linejoin="round"/>${stripes}
    <path d="M56 68 66 94 76 68Z" fill="#fff" stroke="#c8c8d0" stroke-width="1"/><path d="M63 70h6l-1.6 20-1.4 4-1.4-4Z" fill="#d8202e" stroke="#6a0a14" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M56 68 62 80 52 82ZM76 68 70 80 80 82Z" fill="#14182e" stroke="#05070e" stroke-width="1.4" stroke-linejoin="round"/>${chain}
    <path d="M50 72c6-4 14-5 22-3" stroke="#fff" stroke-width="2" fill="none" opacity=".18" stroke-linecap="round"/>
    <g class="p-limb"><path d="M82 76Q100 84 98 98" stroke="#05070e" stroke-opacity=".6" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M82 76Q100 84 98 98" stroke="url(#${su})" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="98" cy="100" r="5.4" fill="url(#${pk})" stroke="#8a3248" stroke-width="1.8"/><path d="M98 100 108 62" stroke="#14141c" stroke-width="3.4" stroke-linecap="round"/><path d="M98 100 108 62" stroke="#6a6a7a" stroke-width="1" opacity=".7"/><circle cx="109" cy="60" r="5" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="1.6"/><circle cx="107.6" cy="58.6" r="1.6" fill="#fff"/></g>
    ${_pigHead(68, 50, 1.1, pk, sn, { eye: false })}
    <path d="M56 46Q70 52 88 46" stroke="#05070e" stroke-width="5" fill="none" stroke-linecap="round" opacity="0"/>
    <g><rect x="66" y="42" width="15" height="9" rx="3.4" fill="#0a0a12" stroke="#000" stroke-width="1.4"/><path d="M68 44.4h4" stroke="#8aa0ff" stroke-width="1.4" stroke-linecap="round"/><path d="M62 46.6 66 46.6" stroke="#0a0a12" stroke-width="2.4"/></g>
    <path d="M42 36Q68 44 98 34 92 28 68 26 48 26 42 36Z" fill="#14141c" stroke="#000" stroke-width="2" stroke-linejoin="round"/><path d="M52 32C52 16 84 14 86 30 74 26 62 26 52 32Z" fill="#1e1e2a" stroke="#000" stroke-width="2" stroke-linejoin="round"/><path d="M52 31Q70 36 86 29" stroke="#d8202e" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M56 22C62 18 72 17 80 20" stroke="#fff" stroke-width="1.4" fill="none" opacity=".35" stroke-linecap="round"/>
    <path d="M92 66 112 62" stroke="#8a5a2a" stroke-width="4.4" stroke-linecap="round"/><path d="M92 66 112 62" stroke="#c89a62" stroke-width="1.4" stroke-linecap="round"/><circle class="p-glow" cx="113.4" cy="61.8" r="3.2" fill="#ff7a1e"/><circle cx="113.4" cy="61.8" r="1.5" fill="#ffd27a"/>${smoke}
  </g></g>`;
  return _msvg('don_dorgan', defs, body);
}

function _dragonCochon() {
  const pk = _q(), sn = _q(), wg = _q(), gd = _q(), bl = _q();
  const defs = _porcosDefs(pk, sn, ['#ffd8ec', '#ff8ab8', '#c8407a']) + _qlg(wg, [[0, '#b86ae0'], [1, '#6a2a98']], 0, 0, 1, 1) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffd24a'], [1, '#b8801a']], 0, 0, 1, 1) + _qlg(bl, [[0, '#fff0c0'], [1, '#e8b870']]);
  const spikes = [[36, 66], [46, 58], [58, 53], [70, 52], [82, 56], [90, 64]].map(([x, y], i) => `<path d="M${x - 5} ${y + 4} ${x + 1} ${y - 11 + (i % 2) * 2} ${x + 6} ${y + 4}Z" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="1.6" stroke-linejoin="round"/>`).join('');
  const claws = x => `<path d="M${x - 8} 104v9c-3 0-5 2-5 5h20c0-3-2-5-5-5v-9Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="2" stroke-linejoin="round"/><path d="M${x - 11} 118l-2 3M${x - 4} 118v4M${x + 3} 118l2 3" stroke="#fff4d0" stroke-width="2.2" stroke-linecap="round"/>`;
  const wing = `<g class="p-wing"><path d="M52 66C36 50 16 44 6 28 18 32 26 28 30 22 30 30 34 34 40 34 38 40 44 44 48 46 54 50 56 58 56 66Z" fill="url(#${wg})" stroke="#2a0e48" stroke-width="2.2" stroke-linejoin="round"/><path d="M52 66 6 28M52 66 30 22M52 66 40 34" stroke="#2a0e48" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M14 32c8 2 14-1 18-6" stroke="#e8c0ff" stroke-width="1" fill="none" opacity=".5"/></g>`;
  const tail = `<g class="p-tail"><path d="M28 98C12 100 4 88 12 78 20 70 28 80 22 86" stroke="#8a3248" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M28 98C12 100 4 88 12 78 20 70 28 80 22 86" stroke="#ff8ab8" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M22 86 14 84 18 94Z" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="1.6" stroke-linejoin="round"/></g>`;
  const fire = `<g class="p-glow"><path d="M118 84c4-8 10-10 10-10s-1 4 1 6c-3 0-3 3-5 4 2 1 2 4-1 5-3-1-4-3-5-5Z" fill="#ff7a1e" stroke="#8a2a08" stroke-width="1.2" stroke-linejoin="round"/><path d="M121 84c2-4 5-5 5-5s0 3 1 4c-2 0-2 2-3 3Z" fill="#ffd27a"/></g>`;
  const body = `${_qsh(40)}<g class="p-hop"><g class="p-body">${tail}${wing}
    <path d="M26 100C22 72 42 54 66 54 90 54 102 74 98 98 94 114 78 118 60 118 42 118 30 112 26 100Z" fill="url(#${pk})" stroke="#8a3248" stroke-width="2.2" stroke-linejoin="round"/>
    ${spikes}
    <ellipse cx="70" cy="98" rx="18" ry="17" fill="url(#${bl})" stroke="#b8803a" stroke-width="1.6"/><path d="M54 90h32M52 98h36M54 106h32" stroke="#b8803a" stroke-width="1.4" opacity=".7" stroke-linecap="round"/>
    <path d="M30 76C36 64 48 58 62 58" stroke="#fff" stroke-width="2.6" fill="none" opacity=".45" stroke-linecap="round"/>${claws(46)}${claws(80)}
    <path d="M92 38C86 24 96 12 108 14 102 18 104 26 108 32" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="2" stroke-linejoin="round" transform="translate(-14 12) scale(.9)" ${_vb} opacity="0"/>
    ${_pigHead(88, 64, 1.28, pk, sn, { tusks: true, brow: true, iris: '#d89a00' })}
    <path d="M78 38C70 28 70 16 80 10 80 18 84 24 90 28Z" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="2" stroke-linejoin="round"/><path d="M94 40C98 30 106 24 114 26 110 30 108 36 108 42Z" fill="url(#${gd})" stroke="#8a5a0a" stroke-width="2" stroke-linejoin="round"/>
    ${fire}
  </g></g>`;
  return _msvg('dragon_cochon', defs, _sc(1.1, body));
}
Object.assign(MON_ART2, { porsalu: _porsalu(), cochon_farle: _farle(), don_dorgan: _dorgan(), dragon_cochon: _dragonCochon() });

/* =====================================================================
   DRAGOEUFS — Dragoeuf Guerrier (couvain en armure), Dragoss Doré, Dragueuse (mage de braise),
   Crocabulia (crocodile-dragon, mâchoire animée)
   ===================================================================== */
const _scaleRow = (x0, y0, n, dx, c = '#000', op = .18, r = 3) => Array.from({ length: n }, (_, i) => `<path d="M${x0 + i * dx} ${y0}q${r} ${r} ${r * 2} 0" stroke="${c}" stroke-width="1" fill="none" opacity="${op}" stroke-linecap="round"/>`).join('');
const _claw = (x, y, c = '#fff4d0') => `<path d="M${x - 7} ${y}l-3 4M${x} ${y}v5M${x + 7} ${y}l3 4" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`;

function _dragoeufGuerrier() {
  const sh = _q(), dr = _q(), mt = _q(), cp = _q();
  const defs = _qrg(sh, [[0, '#d4e87a'], [.5, '#8aa83a'], [1, '#4a5e1a']], .36, .28, .9) + _qrg(dr, [[0, '#ffb08a'], [.5, '#e8683a'], [1, '#9a2a14']], .4, .3, .9)
    + _qlg(mt, [[0, '#f4f8ff'], [.5, '#a8b4c8'], [1, '#5a6478']], 0, 0, 1, 1) + _qrg(cp, [[0, '#e0f09a'], [.55, '#9ab048'], [1, '#566a22']], .4, .25, .9);
  const body = `${_qsh(32)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M30 104C14 106 8 96 14 88" stroke="#7a1e10" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M30 104C14 106 8 96 14 88" stroke="url(#${dr})" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M14 88 8 90 12 82Z" fill="#ffd24a" stroke="#8a5a0a" stroke-width="1.2" stroke-linejoin="round"/></g>
    <path d="M44 108v7c-4 0-8 1-8 4h20c0-3-2-4-4-4v-7Z" fill="url(#${dr})" stroke="#7a1e10" stroke-width="1.8" stroke-linejoin="round"/>${_claw(46, 118)}
    <path d="M72 108v7c-4 0-8 1-8 4h20c0-3-2-4-4-4v-7Z" fill="url(#${dr})" stroke="#7a1e10" stroke-width="1.8" stroke-linejoin="round"/>${_claw(76, 118)}
    <path d="M64 50C88 50 98 76 96 94 94 110 80 116 64 116 48 116 34 110 32 94 30 76 40 50 64 50Z" fill="url(#${sh})" stroke="#2e3c0e" stroke-width="2.4" stroke-linejoin="round"/>
    <g fill="#566a22" opacity=".55"><circle cx="46" cy="84" r="3.2"/><circle cx="54" cy="100" r="2.4"/><circle cx="80" cy="92" r="3"/><circle cx="72" cy="106" r="2"/><circle cx="86" cy="76" r="2.2"/><circle cx="42" cy="98" r="2"/></g>
    <path d="M38 64C42 56 50 52 58 52" stroke="#fff" stroke-width="2.6" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M34 96H94" stroke="#5a6478" stroke-width="7" stroke-linecap="round"/><path d="M34 96H94" stroke="url(#${mt})" stroke-width="4" stroke-linecap="round"/><path d="M34 94H94" stroke="#fff" stroke-width="1" opacity=".6"/><circle cx="64" cy="96" r="4.4" fill="#ffd24a" stroke="#8a5a0a" stroke-width="1.4"/>
    <path d="M50 50l5 8 5-7 5 8 5-8 5 7 5-8" stroke="#2e3c0e" stroke-width="2" fill="none" stroke-linejoin="round" opacity="0"/>
    <g class="p-jaw" style="transform-origin:30% 50%"><path d="M58 44C60 30 76 24 90 30 98 34 104 42 108 46 100 50 94 52 86 52 72 56 62 54 58 44Z" fill="url(#${dr})" stroke="#7a1e10" stroke-width="2.2" stroke-linejoin="round"/><path d="M96 46l-2 4 4-2.4ZM88 51l-1 4 3-2.4Z" fill="#fff" stroke="#7a1e10" stroke-width=".8"/><path d="M104 45l4-.8" stroke="#7a1e10" stroke-width="2" stroke-linecap="round"/><circle cx="104" cy="41" r="1.4" fill="#4a0e08"/></g>
    ${_qeye(80, 38, 4.6, '#e8a000', 1.2, '#fff8d0')}<path class="p-brow" d="M72 30 90 36" stroke="#5a0e08" stroke-width="3" stroke-linecap="round"/>
    <path d="M62 34 56 20 68 28ZM72 28 70 14 80 24Z" fill="#fff0c8" stroke="#7a5a28" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M44 56C42 38 52 22 68 20 84 20 92 30 92 40 88 36 84 38 80 34 76 40 72 34 68 38 64 32 58 40 54 36 52 44 48 46 44 56Z" fill="url(#${cp})" stroke="#2e3c0e" stroke-width="2.2" stroke-linejoin="round" transform="translate(-6 -10)" ${_vb}/>
    <path d="M46 40c4-8 12-12 20-12" stroke="#fff" stroke-width="2" fill="none" opacity=".5" stroke-linecap="round" transform="translate(-6 -10)" ${_vb}/>
    <g class="p-limb"><path d="M84 76Q100 80 100 92" stroke="#7a1e10" stroke-opacity=".6" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M84 76Q100 80 100 92" stroke="url(#${dr})" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M100 92 112 58" stroke="#6a4a22" stroke-width="3.4" stroke-linecap="round"/><path d="M110 64 114 34 120 64Z" fill="url(#${mt})" stroke="#3a4254" stroke-width="1.6" stroke-linejoin="round"/><path d="M114 40v22" stroke="#fff" stroke-width="1.2" opacity=".8"/><path d="M106 64H124" stroke="#d9a441" stroke-width="3.4" stroke-linecap="round"/></g>
    <g><circle cx="44" cy="84" r="13" fill="#8a5a2e" stroke="#3a2008" stroke-width="2"/><circle cx="44" cy="84" r="8.6" fill="none" stroke="#d9a441" stroke-width="1.6"/><path d="M44 76v16M36 84h16" stroke="#d9a441" stroke-width="1.4"/><circle cx="44" cy="84" r="3" fill="#e8402a" stroke="#6a0e08" stroke-width="1"/></g>
  </g></g>`;
  return _msvg('dragoeuf_guerrier', defs, body);
}

function _dragossDore() {
  const gd = _q(), bl = _q(), wg = _q(), es = _q();
  const defs = _qrg(gd, [[0, '#fff3a0'], [.45, '#ffc82e'], [1, '#a8680a']], .4, .28, .9) + _qlg(bl, [[0, '#fff6d0'], [1, '#e8b84a']]) + _qlg(wg, [[0, '#ffe27a'], [1, '#c8801a']], 0, 0, 1, 1) + _qrg(es, [[0, '#ffffff'], [1, '#e8dcc0']], .4, .3, .9);
  const body = `${_qsh(32)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M34 100C14 106 6 94 14 80 18 74 26 76 24 84" stroke="#7a4a08" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M34 100C14 106 6 94 14 80 18 74 26 76 24 84" stroke="url(#${gd})" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M24 84 14 80 22 94Z" fill="#fff3a0" stroke="#8a5a0a" stroke-width="1.4" stroke-linejoin="round"/></g>
    <g class="p-wing"><path d="M54 66C40 48 22 42 10 26 22 30 30 24 34 18 36 28 40 32 46 32 46 40 52 44 56 46 62 52 62 60 58 68Z" fill="url(#${wg})" stroke="#6a3a08" stroke-width="2.2" stroke-linejoin="round"/><path d="M56 68 10 26M56 68 34 18M56 68 46 32" stroke="#6a3a08" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M16 30c8 2 14-1 18-6" stroke="#fff" stroke-width="1" fill="none" opacity=".5"/></g>
    <path d="M48 102v10c-4 0-8 1-8 5h20c0-3-2-5-4-5v-10Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.8" stroke-linejoin="round"/>${_claw(50, 117, '#fff')}
    <path d="M76 102v10c-4 0-8 1-8 5h20c0-3-2-5-4-5v-10Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.8" stroke-linejoin="round"/>${_claw(78, 117, '#fff')}
    <path d="M36 92C34 66 50 54 68 56 88 58 96 74 92 94 90 106 78 112 64 112 50 112 38 106 36 92Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M62 70C74 72 90 80 90 98 90 108 78 112 66 112 56 112 52 100 52 88 52 80 56 72 62 70Z" fill="url(#${bl})" stroke="#c88a2a" stroke-width="1.6"/><path d="M58 84h30M56 92h32M58 100h28" stroke="#c88a2a" stroke-width="1.3" opacity=".7" stroke-linecap="round"/>
    ${_scaleRow(44, 66, 4, 7, '#7a4a08', .3)}${_scaleRow(42, 76, 3, 7, '#7a4a08', .25)}
    <path d="M42 70C46 62 54 58 62 58" stroke="#fff" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M72 62C74 50 82 42 92 42 100 42 104 50 102 58L88 66Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="2" stroke-linejoin="round"/>
    <g class="p-jaw"><path d="M86 38C86 28 98 24 108 30 118 36 122 44 120 50 114 54 106 52 98 50 90 50 86 44 86 38Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="2.2" stroke-linejoin="round"/><path d="M116 48l-3 5 5-3ZM108 52l-2 5 4-3.4Z" fill="#fff" stroke="#7a4a08" stroke-width=".9"/><circle cx="116" cy="40" r="1.6" fill="#5a2a08"/><path d="M100 50Q110 54 120 50" stroke="#7a4a08" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
    ${_qeye(100, 36, 4.4, '#d83a1a', 1.2, '#fff8d8')}<path class="p-brow" d="M92 28 108 33" stroke="#5a2a08" stroke-width="3" stroke-linecap="round"/>
    <path d="M90 32 84 18 96 26ZM98 26 98 12 106 24Z" fill="#fff6c8" stroke="#8a5a0a" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M78 36C78 26 92 22 98 28 94 30 92 34 88 34 86 38 82 36 78 36Z" fill="url(#${es})" stroke="#9a8a6a" stroke-width="1.8" stroke-linejoin="round" opacity="0"/>
    <path d="M80 34C82 20 98 14 108 20 104 22 102 26 98 24 96 28 92 24 90 28 86 26 86 32 80 34Z" fill="url(#${es})" stroke="#9a8a6a" stroke-width="1.8" stroke-linejoin="round" transform="translate(-4 -2)" ${_vb}/>
    <g class="p-glow"><path d="M20 56l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#fff" opacity=".9"/><path d="M104 74l1.4 3.4 3.4 1.4-3.4 1.4-1.4 3.4-1.4-3.4-3.4-1.4 3.4-1.4Z" fill="#fff" opacity=".8"/></g>
  </g></g>`;
  return _msvg('dragoss_dore', defs, body);
}

function _dragueuse() {
  const rb = _q(), sk = _q(), fl = _q(), gd = _q();
  const defs = _qlg(rb, [[0, '#ff5a5a'], [.5, '#c8203a'], [1, '#5a0a1e']], 0, 0, 1, 1) + _qrg(sk, [[0, '#ffc0a0'], [.5, '#f08a5a'], [1, '#b8482a']], .4, .3, .9)
    + _qlg(fl, [[0, '#ffe27a'], [.5, '#ff7a1e'], [1, '#d8281a']], 0, 1, 0, 0) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffd24a'], [1, '#b8801a']], 0, 0, 1, 1);
  const mane = `<g class="p-tuft"><path d="M60 40C44 38 30 26 28 8 38 18 44 16 46 8 50 22 56 22 60 18 58 30 64 30 66 28Z" fill="url(#${fl})" stroke="#8a1a08" stroke-width="2" stroke-linejoin="round"/><path d="M58 44C40 46 22 38 14 22 26 30 32 28 36 22 38 34 46 36 52 34Z" fill="url(#${fl})" stroke="#8a1a08" stroke-width="2" stroke-linejoin="round"/><path d="M62 50C46 54 28 52 16 42 28 44 34 42 38 38 40 46 50 48 58 46Z" fill="url(#${fl})" stroke="#8a1a08" stroke-width="2" stroke-linejoin="round"/></g>`;
  const body = `${_qsh(28)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M44 112C28 112 18 104 20 94 22 88 30 90 28 96" stroke="#7a1a0a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M44 112C28 112 18 104 20 94 22 88 30 90 28 96" stroke="url(#${sk})" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M28 96 20 92 26 102Z" fill="#ffd24a" stroke="#8a5a0a" stroke-width="1.2" stroke-linejoin="round"/></g>
    ${mane}
    <path d="M42 70C36 96 34 108 30 118H98C94 108 92 96 86 70 80 62 48 62 42 70Z" fill="url(#${rb})" stroke="#3a0612" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M52 76C54 92 54 104 52 118M64 74V118M76 76C74 92 74 104 76 118" stroke="#3a0612" stroke-width="1.2" opacity=".4"/>
    <path d="M32 114Q64 124 96 114" stroke="url(#${gd})" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M40 78Q64 90 88 78" stroke="url(#${gd})" stroke-width="3.6" fill="none" stroke-linecap="round"/><circle cx="64" cy="86" r="4.6" fill="#ff7a1e" stroke="#8a5a0a" stroke-width="1.4"/><circle cx="62.6" cy="84.6" r="1.4" fill="#fff"/>
    <path d="M46 72c6-4 14-6 22-4" stroke="#fff" stroke-width="2" fill="none" opacity=".25" stroke-linecap="round"/>
    <path d="M58 62 60 72 70 72 72 62Z" fill="url(#${sk})" stroke="#8a2a14" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M56 50C56 36 66 28 76 30 88 32 92 42 90 52 88 62 76 66 66 64 60 62 56 56 56 50Z" fill="url(#${sk})" stroke="#8a2a14" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M80 56C84 60 90 58 94 54" stroke="#8a2a14" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M66 36q4 3 8 2M64 42q4 3 8 2" stroke="#8a2a14" stroke-width="1" fill="none" opacity=".4" stroke-linecap="round"/>
    ${_qeye(80, 46, 4.2, '#ff6a1e', 1.2, '#ffe8c8')}<path class="p-brow" d="M72 38 88 42" stroke="#5a0a1e" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M68 34 58 18 74 28ZM80 30 84 12 90 28Z" fill="#fff0c8" stroke="#7a5a28" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M84 58C90 56 94 52 94 48" stroke="#ff4a2a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g class="p-limb"><path d="M84 76Q100 78 104 90" stroke="#3a0612" stroke-opacity=".6" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M84 76Q100 78 104 90" stroke="url(#${rb})" stroke-width="8.6" fill="none" stroke-linecap="round"/><circle cx="104" cy="92" r="5" fill="url(#${sk})" stroke="#8a2a14" stroke-width="1.6"/>
      <path d="M106 118 108 28" stroke="#4a2c14" stroke-width="3.6" stroke-linecap="round"/><path d="M106 118 108 28" stroke="#c89a62" stroke-width="1" opacity=".7"/><path d="M100 28C96 20 104 12 108 18 112 12 120 20 116 28 114 34 102 34 100 28Z" fill="#8a5a22" stroke="#3a2008" stroke-width="1.6" stroke-linejoin="round"/>
      <circle class="p-glow" cx="108" cy="22" r="8" fill="#ff7a1e" opacity=".5"/><path class="p-glow" d="M108 30c-6-2-7-9-2-14 1 4 4 4 4 8 3-3 3-6 2-8 5 3 5 11-4 14Z" fill="url(#${fl})" stroke="#8a1a08" stroke-width="1.2" stroke-linejoin="round"/></g>
  </g></g>`;
  return _msvg('dragueuse', defs, body);
}

function _crocabulia() {
  const gr = _q(), bl = _q(), wg = _q(), gd = _q();
  const defs = _qrg(gr, [[0, '#b8d86a'], [.5, '#5e8e2e'], [1, '#2a4a14']], .4, .25, .95) + _qlg(bl, [[0, '#f4f0c0'], [1, '#c8b46a']]) + _qlg(wg, [[0, '#4ab8a0'], [1, '#1a5a5a']], 0, 0, 1, 1) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffc82e'], [1, '#a8680a']], 0, 0, 1, 1);
  const spikes = [28, 38, 48, 58, 68, 78, 88].map((x, i) => `<path d="M${x - 5} ${68 + (i > 4 ? i * 1.5 - 5 : 0)} ${x} ${54 + (i % 2) * 3 + (i > 4 ? i : 0)} ${x + 5} ${68 + (i > 4 ? i * 1.5 - 5 : 0)}Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.6" stroke-linejoin="round"/>`).join('');
  const leg = (x, back) => `<path d="M${x - 8} 96v14c-4 0-7 1-7 5h22c0-4-3-5-6-5V96Z" fill="${back ? '#3e6420' : 'url(#' + gr + ')'}" stroke="#1a3008" stroke-width="2" stroke-linejoin="round"/>${_claw(x, 115, back ? '#d8d0a0' : '#fff4d0')}`;
  const body = `${_qsh(48)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M24 92C12 94 6 84 4 70 12 76 18 76 24 76 Z" fill="url(#${gr})" stroke="#1a3008" stroke-width="2.2" stroke-linejoin="round"/><path d="M6 72 2 62 10 68Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 74 8 66 16 72Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.2" stroke-linejoin="round"/></g>
    ${leg(34, true)}${leg(82, true)}
    <g class="p-wing"><path d="M64 68C56 46 40 32 24 32 32 40 34 50 32 60 42 54 54 58 64 68Z" fill="url(#${wg})" stroke="#0a3a3a" stroke-width="2" stroke-linejoin="round"/><path d="M64 68 24 32M64 68 32 60M64 68 40 44" stroke="#0a3a3a" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>
    <path d="M16 90C16 70 38 64 62 66 82 62 100 66 108 78 112 84 112 96 106 102 96 112 44 114 28 108 20 104 16 98 16 90Z" fill="url(#${gr})" stroke="#1a3008" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M30 100C46 108 82 108 102 100 98 108 80 112 62 112 44 112 34 108 30 100Z" fill="url(#${bl})" stroke="#9a8a4a" stroke-width="1.4"/><path d="M42 104v5M54 105v6M66 105v6M78 104v6M90 102v5" stroke="#9a8a4a" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>
    ${_scaleRow(28, 80, 6, 11, '#1a3008', .35, 4)}${_scaleRow(34, 90, 5, 11, '#1a3008', .3, 4)}
    <path d="M24 78C34 70 50 68 66 70" stroke="#fff" stroke-width="2.6" fill="none" opacity=".4" stroke-linecap="round"/>
    ${spikes}${leg(48)}${leg(96)}
    <g class="p-jaw" style="transform-origin:10% 20%"><path d="M96 88 126 90C124 100 108 104 96 98Z" fill="url(#${gr})" stroke="#1a3008" stroke-width="2.2" stroke-linejoin="round"/><path d="M100 88l2-6 3 6M108 89l2-6 3 6M116 90l2-6 3 6" fill="#fff" stroke="#6a5a3a" stroke-width="1" stroke-linejoin="round"/><path d="M104 96 106 93 108 96M114 95l2-3 2 3" fill="#fff" stroke="#6a5a3a" stroke-width=".8"/></g>
    <path d="M86 66C96 58 112 62 124 74 128 78 128 84 124 88L94 88C86 84 82 72 86 66Z" fill="url(#${gr})" stroke="#1a3008" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M100 86l2 5 3-5M108 86l2 5 3-5M116 87l2 5 3-5" fill="#fff" stroke="#6a5a3a" stroke-width="1" stroke-linejoin="round"/><circle cx="122" cy="76" r="1.8" fill="#14240a"/><path d="M92 70C102 66 114 70 122 78" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>
    <g class="p-eye"><ellipse cx="98" cy="72" rx="5.6" ry="4.6" fill="#ffd84a" stroke="#14240a" stroke-width="1.6"/><ellipse cx="98.6" cy="72" rx="1.6" ry="4" fill="#14240a"/><circle cx="96.6" cy="70.4" r="1.2" fill="#fff"/></g>
    <path class="p-brow" d="M90 64C96 62 104 64 108 68" stroke="#14240a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M86 66 80 50 92 62ZM96 62 94 46 102 60Z" fill="url(#${gd})" stroke="#7a4a08" stroke-width="1.6" stroke-linejoin="round"/>
    <g class="p-glow"><circle cx="124" cy="68" r="2" fill="#ff9a2e"/><circle cx="127" cy="63" r="1.4" fill="#ffd27a"/></g>
  </g></g>`;
  return _msvg('crocabulia', defs, body);
}
Object.assign(MON_ART2, { dragoeuf_guerrier: _dragoeufGuerrier(), dragoss_dore: _dragossDore(), dragueuse: _dragueuse(), crocabulia: _crocabulia() });

/* =====================================================================
   MANSOTS DE FROSTIGOST — Timansot, Mansobèse, Shamansot, Mansot Royal (yétis à fourrure givrée)
   ===================================================================== */
function _mansot(id, o = {}) {
  const fr = _q(), fd = _q(), fc = _q(), ic = _q();
  const c = o.fur || ['#ffffff', '#cfe6f8', '#7fa6cc'];
  const defs = _qrg(fr, [[0, c[0]], [.55, c[1]], [1, c[2]]], .4, .28, .95) + _qrg(fc, [[0, '#7a8aa8'], [.6, '#4a5878'], [1, '#2a3450']], .4, .3, .9)
    + _qlg(ic, [[0, '#f4fdff'], [.5, '#9ee0ff'], [1, '#3a92d0']], 0, 0, 1, 1) + _qlg(fd, [[0, '#ffe27a'], [.5, '#ffc82e'], [1, '#a8680a']], 0, 0, 1, 1);
  const K = 'stroke="#2a3c5a" stroke-width="2.2" stroke-linejoin="round"';
  const sc = o.s || 1, w = o.w || 1; // sc = échelle globale, w = largeur du ventre
  const belly = 40 * w;
  const arm = (x, y, back) => `<g class="p-limb"><path d="${_fur(x, y, 10 * w, 17, 6, 3, .3)}" fill="${back ? c[2] : 'url(#' + fr + ')'}" ${K}/><ellipse cx="${x + 1}" cy="${y + 15}" rx="8" ry="6.4" fill="url(#${fc})" stroke="#1a2236" stroke-width="1.8"/><path d="M${x - 4} ${y + 19}l-1 4M${x + 1} ${y + 20}v4M${x + 6} ${y + 19}l1 4" stroke="#e8f4ff" stroke-width="2.2" stroke-linecap="round"/></g>`;
  const foot = x => `<path d="${_fur(x, 110, 13, 8, 6, 2.4)}" fill="url(#${fr})" ${K}/><path d="M${x - 8} 114l-1 4M${x - 2} 116v4M${x + 4} 116v4M${x + 9} 113l2 3" stroke="#e8f4ff" stroke-width="2.2" stroke-linecap="round"/>`;
  const head = `<g class="p-head" ${_vb}>
      <path d="${_fur(o.hx || 72, o.hy || 46, 23, 21, 11, 4, .2)}" fill="url(#${fr})" ${K}/>
      <path d="M${(o.hx || 72) - 6} ${(o.hy || 46) - 4}C${(o.hx || 72) + 4} ${(o.hy || 46) - 8} ${(o.hx || 72) + 22} ${(o.hy || 46) - 2} ${(o.hx || 72) + 22} ${(o.hy || 46) + 10} ${(o.hx || 72) + 22} ${(o.hy || 46) + 22} ${(o.hx || 72) + 6} ${(o.hy || 46) + 22} ${(o.hx || 72)} ${(o.hy || 46) + 18} ${(o.hx || 72) - 8} ${(o.hy || 46) + 10} ${(o.hx || 72) - 8} ${(o.hy || 46) + 2} ${(o.hx || 72) - 6} ${(o.hy || 46) - 4}Z" fill="url(#${fc})" stroke="#1a2236" stroke-width="2" stroke-linejoin="round"/>
      <path d="M${(o.hx || 72) - 6} ${(o.hy || 46) - 12}c8-6 22-4 28 6" stroke="${o.brow || '#e8f4ff'}" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${_qeye((o.hx || 72) + 9, (o.hy || 46) + 2, o.er || 4.4, o.eye || '#7ae0ff', 1.2, '#f4fdff')}
      <path class="p-brow" d="M${(o.hx || 72) + 1} ${(o.hy || 46) - 4} ${(o.hx || 72) + 16} ${(o.hy || 46) - 1}" stroke="#14203a" stroke-width="2.8" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M${(o.hx || 72) + 2} ${(o.hy || 46) + 14}Q${(o.hx || 72) + 12} ${(o.hy || 46) + 22} ${(o.hx || 72) + 22} ${(o.hy || 46) + 14}" stroke="#14203a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M${(o.hx || 72) + 6} ${(o.hy || 46) + 15}l1.4 6 2-5.4ZM${(o.hx || 72) + 16} ${(o.hy || 46) + 15}l1.4 6 2-5.4Z" fill="#fff" stroke="#3a4668" stroke-width=".9" stroke-linejoin="round"/></g>
      <circle cx="${(o.hx || 72) + 17}" cy="${(o.hy || 46) + 8}" r="1.5" fill="#14203a"/>
      <ellipse cx="${(o.hx || 72) - 12}" cy="${(o.hy || 46) + 2}" rx="4.4" ry="5.6" fill="url(#${fc})" stroke="#1a2236" stroke-width="1.6"/>
      ${o.headgear || ''}
    </g>`;
  const body = `${_qsh(34 * sc * w)}<g class="p-hop">${_sc(sc, `<g class="p-body">
    ${o.back || ''}
    <g class="p-tail"><path d="${_fur(24, 96, 9, 9, 6, 3)}" fill="${c[2]}" ${K}/></g>
    ${arm(40, 80, true)}${foot(46)}${foot(80)}
    <path d="${_fur(62, 82, belly, 36, 15, 5.6, .1)}" fill="url(#${fr})" ${K}/>
    <path d="${_fur(70, 90, 20 * w, 20, 9, 3, .4)}" fill="${c[0]}" opacity=".7"/>
    <path d="M38 62c8-8 18-12 28-12" stroke="#fff" stroke-width="3" fill="none" opacity=".7" stroke-linecap="round"/>
    ${o.belly || ''}
    ${head}
    ${arm(92, 82)}
    ${o.hold || ''}
  </g>`)}</g>`;
  return _msvg(id, defs, body);
}
const _iceShard = (x, y, h = 14, w = 5, r = 0) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 ${-w} ${-h * .35} ${-w * .3} ${-h} ${w * .6} ${-h * .55}Z" fill="#9ee0ff" stroke="#2a6aa0" stroke-width="1.4" stroke-linejoin="round"/><path d="M${-w * .3} ${-h * .8}l-1 ${h * .5}" stroke="#fff" stroke-width="1.2" opacity=".8"/></g>`;

function _timansot() {
  return _mansot('timansot', { s: .8, w: .86, hx: 70, hy: 50, er: 5.4, eye: '#5ac8ff',
    hold: `<g class="p-glow"><path d="M108 70l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="#fff" opacity=".9"/></g>`,
    headgear: `<path d="M64 28c-2-6 2-10 6-8 2-4 8-4 8 2 4-2 8 2 4 6" stroke="#e8f4ff" stroke-width="3" fill="none" stroke-linecap="round"/>` });
}
function _mansobese() {
  const bl = ['#f2f8ff', '#a9c6e8', '#5a82b0'];
  return _mansot('mansobese', { s: 1.02, w: 1.28, fur: bl, hx: 76, hy: 42, er: 3.8, eye: '#a8f0ff',
    belly: `<ellipse cx="64" cy="94" rx="22" ry="17" fill="#e4f2ff" opacity=".5"/><path d="M46 92c10 6 26 6 36 0" stroke="#5a82b0" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/><circle cx="64" cy="94" r="2.4" fill="#5a82b0" opacity=".7"/>`,
    hold: '' });
}
function _shamansot() {
  const pr = ['#f6f0ff', '#c0b4e8', '#6a5aa8'];
  const feathers = ['#ff4f6e', '#ffc82e', '#34d399', '#4ab8ff', '#ff4f6e'].map((cl, i) => `<path d="M${52 + i * 9} 30 ${44 + i * 12} ${10 + Math.abs(i - 2) * 5} ${58 + i * 9} 28Z" fill="${cl}" stroke="#2a2040" stroke-width="1.4" stroke-linejoin="round" opacity=".95"/>`).join('');
  return _mansot('shamansot', { fur: pr, hx: 72, hy: 46, eye: '#d09aff',
    headgear: `${feathers}<path d="M50 32c8-4 28-4 36 2" stroke="#8a5a22" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M52 33h34" stroke="#ffd24a" stroke-width="1.4" stroke-dasharray="3 3" opacity=".9"/><g ${_vb} transform="translate(86 28)"><circle r="3.4" fill="#9ee0ff" stroke="#2a6aa0" stroke-width="1.2"/></g>`,
    belly: `<path d="M50 78l6 8-6 8M78 78l-6 8 6 8" stroke="#6a5aa8" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><circle cx="64" cy="90" r="5.6" fill="#9ee0ff" stroke="#2a6aa0" stroke-width="1.6"/><circle cx="62.6" cy="88.6" r="1.6" fill="#fff"/>`,
    hold: `<g class="p-limb"><path d="M112 118 108 30" stroke="#6a4a2a" stroke-width="4.4" stroke-linecap="round"/><path d="M112 118 108 30" stroke="#c89a62" stroke-width="1.2" opacity=".6"/><g class="p-glow"><circle cx="108" cy="24" r="12" fill="#9ee0ff" opacity=".4"/></g>${_iceShard(108, 36, 24, 7, 0)}${_iceShard(100, 34, 14, 4, -30)}${_iceShard(116, 34, 14, 4, 30)}</g>` });
}
function _mansotRoyal() {
  const ro = ['#ffffff', '#e0ecff', '#8aa6d8'];
  const crown = `<g ${_vb} transform="translate(0 7)"><path d="M54 26 56 8 62 18 68 4 74 18 80 6 84 26Z" fill="url(#${'__IC__'})" stroke="#2a6aa0" stroke-width="2" stroke-linejoin="round"/><path d="M58 24h24" stroke="#ffd24a" stroke-width="3.6" stroke-linecap="round"/><circle cx="68" cy="22" r="3" fill="#ff4f6e" stroke="#7a0e1e" stroke-width="1"/><path d="M60 14l2 6M68 10v8M76 14l-2 6" stroke="#fff" stroke-width="1.2" opacity=".8" stroke-linecap="round"/></g>`;
  const o = { s: 1.08, w: 1.12, fur: ro, hx: 74, hy: 44, eye: '#ffd24a', brow: '#cfe6f8',
    back: `<g class="p-wing"><path d="M42 52C24 60 18 88 22 116L50 104Z" fill="#6a1aa8" stroke="#2a0a50" stroke-width="2.2" stroke-linejoin="round"/><path d="M42 56C30 66 26 86 30 108" stroke="#c88aff" stroke-width="1.4" fill="none" opacity=".6"/><path d="M22 116 28 110 34 116 40 108 46 114 50 104" stroke="#ffd24a" stroke-width="2" fill="none" stroke-linejoin="round"/></g>`,
    belly: `<path d="M46 72Q64 84 82 72" stroke="url(#__FD__)" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="64" cy="82" r="5" fill="#9ee0ff" stroke="#2a6aa0" stroke-width="1.6"/><circle cx="62.6" cy="80.6" r="1.6" fill="#fff"/>`,
    hold: `<g class="p-limb"><path d="M112 118 108 34" stroke="#ffc82e" stroke-width="4.2" stroke-linecap="round"/><path d="M112 118 108 34" stroke="#fff3a0" stroke-width="1.2" opacity=".8"/><g class="p-glow"><circle cx="108" cy="26" r="13" fill="#9ee0ff" opacity=".45"/></g><path d="M108 40 100 28 108 12 116 28Z" fill="#9ee0ff" stroke="#2a6aa0" stroke-width="2" stroke-linejoin="round"/><path d="M108 38V16M102 28h12" stroke="#fff" stroke-width="1.2" opacity=".8"/></g>`,
    headgear: crown };
  let svg = _mansot('mansot_royal', o);
  // les placeholders __IC__ / __FD__ pointent vers les dégradés générés dans _mansot : on les relit dans le svg
  const ids = [...svg.matchAll(/<linearGradient id="([^"]+)"/g)].map(m => m[1]); // ic, fd (dans l'ordre de _mansot)
  return svg.replace(/__IC__/g, ids[0]).replace(/__FD__/g, ids[1]);
}
Object.assign(MON_ART2, { timansot: _timansot(), mansobese: _mansobese(), shamansot: _shamansot(), mansot_royal: _mansotRoyal() });

//@@FAMILIES-END
/* =====================================================================
   Enregistrement (+ archimonstres : même dessin que leur modèle, agrandi et nimbé d'or en CSS)
   ===================================================================== */
Object.assign(MON_ART, MON_ART2);
for (const [mid, m] of Object.entries(MONSTERS)) if (m.archi && MON_ART[m.base] && !MON_ART[mid]) MON_ART[mid] = MON_ART[m.base];
