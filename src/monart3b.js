/* =====================================================================
   SPRITES DES NOUVELLES TERRES — Dunes des Ossements & Mines d'Ocre (dessins originaux)
   Même convention que monart2.js : 128×128, tournés vers la DROITE, classes animées p-*.
   Dunes : Scarabosse Doré, Crocodaille des Dunes, Momie Errante, Sphinx Gardien, Pharaon Éternel
   Mines : Taupe Mineuse, Golem d'Ocre, Ver de Roche, Colosse de Cristal
   (helpers _q _qlg _qrg _msvg _qsh _qeye _fur _sc _vb, _scaleRow, _claw : voir monart2.js)
   ===================================================================== */
(() => {
const _poly = (pts, close = true) => 'M' + pts.map(p => p.join(' ')).join('L') + (close ? 'Z' : '');
/* cristal prismatique : c = [clair, moyen, sombre, contour] */
const _AMBER = ['#fff0b0', '#ffc04a', '#d8741a', '#5a2808'];
const _cry = (x, y, h, w, r, c = _AMBER) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${r})"><path d="M${-w / 2} 0L${-w / 2} ${-h * .68}L0 ${-h}L${w / 2} ${-h * .68}L${w / 2} 0Z" fill="${c[1]}" stroke="${c[3]}" stroke-width="1.8" stroke-linejoin="round"/><path d="M${-w / 2} 0L${-w / 2} ${-h * .68}L0 ${-h}L0 0Z" fill="${c[0]}"/><path d="M0 ${-h}L${w / 2} ${-h * .68}L${w / 2} 0L0 0Z" fill="${c[2]}"/><path d="M${-w * .26} ${-h * .18}L${-w * .26} ${-h * .62}" stroke="#fff" stroke-width="1.3" opacity=".8" stroke-linecap="round"/></g>`;

/* =====================================================================
   DUNES DES OSSEMENTS
   ===================================================================== */
function _scarabosse() {
  const gd = _q(), lp = _q(), wg = _q(), hd = _q();
  const defs = _qrg(gd, [[0, '#fff6b0'], [.45, '#ffc82e'], [1, '#8a4e06']], .36, .22, .98) + _qlg(lp, [[0, '#86a8ff'], [.5, '#2a4ed0'], [1, '#0c1c6a']], 0, 0, 1, 1)
    + _qlg(wg, [[0, '#fff0c0', .9], [1, '#e0a448', .6]], 0, 0, 1, 1) + _qrg(hd, [[0, '#ffe27a'], [.5, '#d89a1a'], [1, '#6a3a06']], .4, .3, .95);
  const K = 'stroke="#4a2804" stroke-width="2.2" stroke-linejoin="round"';
  const leg = (d, far) => `<path d="${d}" stroke="#2e1802" stroke-width="${far ? 5.6 : 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${far ? '#a8741a' : '#f0b42c'}" stroke-width="${far ? 3.2 : 4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const body = `${_qsh(38)}<g class="p-hop"><g class="p-body">
    ${leg('M74 100L86 110L90 119', 1)}${leg('M52 100L46 110L38 119', 1)}
    <g class="p-wing"><path d="M58 66C52 44 34 30 8 30 16 38 20 48 22 58 36 54 50 58 58 66Z" fill="url(#${wg})" stroke="#7a4a0a" stroke-width="2" stroke-linejoin="round" opacity=".7"/>
      <path d="M62 60C56 34 34 18 6 22 14 30 20 42 22 52 38 48 52 52 62 60Z" fill="url(#${wg})" stroke="#7a4a0a" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M62 60C44 44 26 32 6 22M62 60 22 52M62 60C52 46 38 34 24 28" stroke="#8a5a14" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/><path d="M14 28c8 2 16 8 20 14" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/></g>
    ${leg('M84 100L98 108L106 119')}${leg('M64 104L66 114L62 120')}${leg('M42 100L32 109L24 119')}
    <path d="M24 92C22 66 42 50 66 50 90 50 104 68 102 92 100 106 84 110 62 110 40 110 26 106 24 92Z" fill="url(#${gd})" ${K}/>
    <path d="M26 100C42 110 84 110 100 100" stroke="#6a3a06" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M36 72C42 62 54 60 59 68 61 84 58 98 50 102 40 100 32 86 36 72Z" fill="url(#${lp})" stroke="#ffd24a" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M69 68C74 60 88 62 94 72 98 86 90 100 80 102 72 100 67 84 69 68Z" fill="url(#${lp})" stroke="#ffd24a" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M40 74c3-5 9-7 13-5M73 70c4-3 10-3 14 2" stroke="#fff" stroke-width="1.8" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M46 78v14M52 76v18M82 78v14M76 76v18" stroke="#ffd24a" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>
    <path d="M64 50C62 70 64 92 62 110" stroke="#5a3006" stroke-width="2.2" fill="none"/>${[58, 70, 82, 94, 104].map(y => `<circle cx="${64 + (y % 2 ? .4 : -.4)}" cy="${y}" r="1.7" fill="#fff0a0" stroke="#6a3a06" stroke-width=".7"/>`).join('')}
    <path d="M30 78C32 66 42 58 56 54" stroke="#fff" stroke-width="2.6" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M88 58C98 54 108 58 111 68 114 80 108 92 98 94 90 86 86 70 88 58Z" fill="url(#${hd})" ${K}/>
    <circle cx="99" cy="73" r="3.8" fill="url(#${lp})" stroke="#ffd24a" stroke-width="1.2"/><path d="M92 62c4-3 10-2 12 2" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/>
    <g class="p-antenna"><path d="M114 70 118 58" stroke="#3a1e04" stroke-width="2.2" stroke-linecap="round"/><path d="M118 58l-4-4M118 58l1-6M118 58l5-3" stroke="#3a1e04" stroke-width="2.6" stroke-linecap="round"/></g>
    <path d="M104 72C112 66 122 70 124 80 124 92 116 98 106 96 100 90 100 78 104 72Z" fill="url(#${hd})" ${K}/>
    <path d="M104 68C106 54 118 48 127 54 121 55 117 60 115 69Z" fill="url(#${hd})" ${K}/>
    <g class="p-jaw"><path d="M107 94C116 93 126 97 127 108 121 102 114 102 105 100Z" fill="url(#${hd})" ${K}/></g>
    ${_qeye(113, 80, 3.8, '#d8281a', 1, '#fff2c0')}
    <g class="p-glow"><path d="M30 44l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="#fff" opacity=".9"/></g>
  </g></g>`;
  return _msvg('scarabosse', defs, body);
}

function _crocodaille() {
  const sk = _q(), bn = _q(), bl = _q(), gd = _q();
  const defs = _qrg(sk, [[0, '#e8ee98'], [.5, '#9aa84e'], [1, '#3a461a']], .4, .25, .98) + _qlg(bn, [[0, '#fffbe8'], [1, '#c4b282']], 0, 0, 1, 1) + _qlg(bl, [[0, '#fff6cc'], [1, '#d8bc74']]) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffc82e'], [1, '#a8680a']], 0, 0, 1, 1);
  const K = 'stroke="#222c0c" stroke-width="2.4" stroke-linejoin="round"';
  const leg = (x, far, br) => `<path d="M${x - 8} 92C${x - 10} 102 ${x - 9} 108 ${x - 9} 112 ${x - 13} 115 ${x - 10} 119 ${x - 5} 119H${x + 9}C${x + 13} 118 ${x + 12} 114 ${x + 8} 112 ${x + 7} 106 ${x + 8} 98 ${x + 7} 92Z" fill="${far ? '#4c5a24' : 'url(#' + sk + ')'}" stroke="#222c0c" stroke-width="2.2" stroke-linejoin="round"/>${far ? '' : `<path d="M${x - 5} 96V108" stroke="#fff" stroke-width="2" opacity=".28" stroke-linecap="round"/>`}${_claw(x, 114, far ? '#cfc8a0' : '#fff4d0')}${br ? `<path d="M${x - 9} 100Q${x} 106 ${x + 8} 100" stroke="#5a3a06" stroke-width="6.4" fill="none" stroke-linecap="round"/><path d="M${x - 9} 100Q${x} 106 ${x + 8} 100" stroke="#ffc82e" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${x - 8} 99Q${x} 104.6 ${x + 7} 99" stroke="#fff3a0" stroke-width="1" fill="none" opacity=".8"/><circle cx="${x}" cy="104" r="2" fill="#4a6aff" stroke="#1a2a8a" stroke-width=".8"/><path d="M${x + 9} 101 ${x + 12} 106" stroke="#5a3a06" stroke-width="2.6" stroke-linecap="round"/><circle cx="${x + 12}" cy="107.4" r="2.2" fill="none" stroke="#ffc82e" stroke-width="1.5"/>` : ''}`;
  const yb = x => 71 - 9 * Math.sin(((x - 24) / 82) * Math.PI);
  const plates = Array.from({ length: 8 }, (_, i) => { const x = 30 + i * 9, y = yb(x) + 1.5, h = 9 + (i % 2) * 2; return `<path d="M${x - 4.4} ${y}L${x - 2.4} ${y - h}L${x + 2.4} ${y - h}L${x + 4.4} ${y}Z" fill="url(#${bn})" stroke="#4a3e22" stroke-width="1.6" stroke-linejoin="round"/>`; }).join('');
  const body = `${_qsh(50)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M34 92C20 98 8 92 3 76 3 72 6 70 8 72 14 80 22 80 34 74Z" fill="url(#${sk})" ${K}/><path d="M7 74C10 66 8 60 6 56 12 60 16 64 14 72Z" fill="url(#${bn})" stroke="#4a3e22" stroke-width="1.4" stroke-linejoin="round"/>${_scaleRow(14, 82, 3, 6, '#222c0c', .35, 3)}</g>
    ${leg(42, 1)}${leg(86, 1)}
    <path d="M24 86C22 70 42 62 66 64 84 62 98 66 104 76 108 90 98 104 66 106 44 108 26 104 24 86Z" fill="url(#${sk})" ${K}/>
    <path d="M30 100C46 108 86 108 100 98 98 106 84 109 64 109 46 109 34 106 30 100Z" fill="url(#${bl})" stroke="#9a8a4a" stroke-width="1.2"/>
    ${_scaleRow(30, 82, 6, 11, '#222c0c', .35, 4)}${_scaleRow(36, 92, 5, 11, '#222c0c', .3, 4)}
    <path d="M28 80C38 70 54 68 70 70" stroke="#fff" stroke-width="2.6" fill="none" opacity=".4" stroke-linecap="round"/>
    ${plates}
    ${leg(54)}${leg(98, 0, 1)}
    <path d="M72 74C80 68 94 68 98 76 100 86 92 94 84 92 74 90 68 80 72 74Z" fill="url(#${bn})" stroke="#4a3e22" stroke-width="1.8" stroke-linejoin="round"/><path d="M80 70 83 78 79 84 85 90" stroke="#6a5a3a" stroke-width="1.4" fill="none" stroke-linejoin="round"/><circle cx="76" cy="80" r="1.6" fill="#6a5a3a"/><circle cx="92" cy="84" r="1.6" fill="#6a5a3a"/>
    <g class="p-jaw" style="transform-origin:10% 10%"><path d="M98 80 126 82C124 94 110 98 100 92Z" fill="url(#${sk})" ${K}/><path d="M104 83l2 5 3-5M111 84l2 5 3-5M118 84l2 5 3-5" fill="#fff" stroke="#6a5a3a" stroke-width="1" stroke-linejoin="round"/></g>
    <path d="M90 66C96 54 114 54 124 64 128 68 128 74 124 79L100 80C90 78 86 72 90 66Z" fill="url(#${sk})" ${K}/>
    <path d="M102 80l2-5 3 5M109 80l2-5 3 5M116 80l2-5 3 5M122 79l1-4 2 3" fill="#fff" stroke="#6a5a3a" stroke-width="1" stroke-linejoin="round"/>
    <path d="M94 62C100 56 110 56 118 60" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
    <path d="M96 58 98 48 104 56ZM104 55 108 46 112 55Z" fill="url(#${bn})" stroke="#4a3e22" stroke-width="1.5" stroke-linejoin="round"/>
    <ellipse cx="122" cy="67" rx="1.8" ry="1.3" fill="#14200a"/>
    <g class="p-eye"><ellipse cx="103" cy="64" rx="5.2" ry="4.4" fill="#ffd84a" stroke="#14200a" stroke-width="1.6"/><ellipse cx="103.6" cy="64" rx="1.5" ry="3.8" fill="#14200a"/><circle cx="101.8" cy="62.6" r="1.1" fill="#fff"/></g>
    <path class="p-brow" d="M96 58C102 55 110 57 112 62" stroke="#14200a" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g></g>`;
  return _msvg('crocodaille', defs, body);
}

function _momie() {
  const bd = _q(), gd = _q(), eg = _q();
  const defs = _qrg(bd, [[0, '#fff6dc'], [.55, '#e0cf9c'], [1, '#948058']], .38, .28, .95) + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffc82e'], [1, '#9a5a08']], 0, 0, 1, 1) + _qrg(eg, [[0, '#ffffff'], [.4, '#8affe8'], [1, '#18c8b0']], .5, .5, .6);
  const K = 'stroke="#4a3a1c" stroke-width="2.2" stroke-linejoin="round"';
  const strip = (d, c = 'url(#' + bd + ')') => `<path d="${d}" fill="${c}" ${K}/>`;
  const body = `${_qsh(34)}<g class="p-hop"><g class="p-body">
    <path d="M46 62Q36 80 40 98" stroke="#2a200e" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M46 62Q36 80 40 98" stroke="#a89468" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M42 74l8 2M40 86l9 2" stroke="#6a5a38" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M50 96L48 112C40 112 40 119 48 119H60L62 96Z" fill="#b8a474" ${K}/>
    <path d="M66 96L66 112C60 112 60 119 68 119H82C86 117 82 112 76 112L78 96Z" fill="url(#${bd})" ${K}/><path d="M66 104h12M66 110h11" stroke="#8a7648" stroke-width="1.4" opacity=".7"/>
    <g class="p-tail">${strip('M50 94L28 100 36 104 22 110 38 112 28 119 56 108Z', '#d8c898')}</g>
    <path d="M44 56C48 44 70 40 84 48 92 58 92 84 86 98L50 100C44 86 42 68 44 56Z" fill="url(#${bd})" ${K}/>
    <path d="M47 94H88L90 107H46Z" fill="url(#${bd})" ${K}/>
    <path d="M46 60 90 74M44 70 90 84M44 80 88 94M48 52 86 62M46 94 88 104" stroke="#8a7648" stroke-width="1.7" opacity=".6" stroke-linecap="round"/><path d="M46 62 90 76M44 72 90 86M44 82 88 96" stroke="#fff" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>
    <path d="M58 72q7-4 12 1l-2 11q-7 3-12-1Z" fill="#241608"/><path d="M60 77h8M61 81h7" stroke="#e8dcc0" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M52 50C56 60 72 62 84 53L90 58C76 72 54 70 48 58Z" fill="url(#${gd})" ${K}/><path d="M54 56C60 64 74 64 82 58" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6"/>
    <circle cx="58" cy="62" r="2.4" fill="#2ad8c0" stroke="#0a6a60" stroke-width=".8"/><circle cx="70" cy="66" r="2.4" fill="#d8281a" stroke="#5a0a08" stroke-width=".8"/><circle cx="81" cy="62" r="2.4" fill="#2ad8c0" stroke="#0a6a60" stroke-width=".8"/>
    <path d="M50 64q-6 4-4 12M88 64l3 6" stroke="url(#${gd})" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="3 2"/>
    <g class="p-tail">${strip('M64 32L42 26 49 33 33 36 47 40 36 47 64 42Z', '#d8c898')}</g>
    <path d="M64 24C72 14 94 18 98 34 100 48 92 58 80 58 68 58 62 46 62 36 62 30 62 26 64 24Z" fill="url(#${bd})" ${K}/>
    <path d="M64 30C74 25 90 27 98 33M63 41C74 37 92 40 99 45M66 51C76 47 88 51 94 55M72 20C70 32 70 46 72 58" stroke="#8a7648" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/><path d="M66 28C76 23 90 25 97 30" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7" stroke-linecap="round"/>
    <path d="M69 34C78 30 92 30 99 35L98 45C90 41 80 41 70 45Z" fill="#140c06"/>
    <g class="p-glow"><circle cx="82" cy="39" r="7.5" fill="#5affd8" opacity=".35"/><circle cx="93" cy="40" r="6.5" fill="#5affd8" opacity=".35"/></g>
    <g class="p-eye"><ellipse cx="82" cy="39" rx="4.2" ry="3" fill="url(#${eg})"/><ellipse cx="93" cy="40" rx="3.6" ry="2.7" fill="url(#${eg})"/></g>
    <g class="p-limb"><path d="M82 54Q100 52 112 62" stroke="#2a200e" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M82 54Q100 52 112 62" stroke="url(#${bd})" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M88 49l4 10M98 50l3 10M107 56l3 8" stroke="#8a7648" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>
      <path d="M106 56C114 52 122 58 122 66 120 74 112 74 108 70Z" fill="url(#${bd})" ${K}/><path d="M120 60l6-3M122 66l6 0M120 71l5 4" stroke="#6a5a38" stroke-width="2.6" stroke-linecap="round"/><path d="M110 72C108 80 112 88 106 98 112 96 116 90 114 84 118 82 116 76 114 72Z" fill="#d8c898" stroke="#4a3a1c" stroke-width="1.8" stroke-linejoin="round"/></g>
  </g></g>`;
  return _msvg('momie', defs, body);
}

function _sphinx() {
  const st = _q(), sd = _q(), lp = _q(), gd = _q(), cp = _q(), gl = _q();
  const defs = _qrg(st, [[0, '#fff0b8'], [.5, '#dcae58'], [1, '#7a4c1a']], .36, .25, 1) + _qlg(sd, [[0, '#c8944a'], [1, '#6a4016']]) + _qlg(lp, [[0, '#86a8ff'], [.5, '#2a4ed0'], [1, '#0c1c6a']], 0, 0, 1, 1)
    + _qlg(gd, [[0, '#fff3a0'], [.5, '#ffc82e'], [1, '#9a5a08']], 0, 0, 1, 1) + `<clipPath id="${cp}"><path d="M68 34C66 14 90 4 106 12 116 18 118 34 114 56L112 76 98 74 94 56 84 58 80 76 70 74 68 56Z"/></clipPath>` + _qrg(gl, [[0, '#ffffff'], [.4, '#a8ffff'], [1, '#18c8e8', 0]], .5, .5, .5);
  const K = 'stroke="#44280a" stroke-width="2.4" stroke-linejoin="round"';
  const stripes = Array.from({ length: 9 }, (_, i) => `<path d="M${66 + i * 6} 0L${60 + i * 6} 80" stroke="${i % 2 ? '#2a4ed0' : '#ffd24a'}" stroke-width="3.2"/>`).join('');
  const body = `<ellipse cx="62" cy="116" rx="60" ry="8" fill="#c89c58" opacity=".55"/>${_qsh(56)}<g class="p-hop"><g class="p-body">
    <g class="p-tail"><path d="M20 100C6 98 -1 86 6 72" stroke="#44280a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M20 100C6 98 -1 86 6 72" stroke="url(#${sd})" stroke-width="6.4" fill="none" stroke-linecap="round"/><path d="M6 74C0 68 2 60 6 58 10 62 12 68 10 74Z" fill="url(#${lp})" stroke="#0c1c6a" stroke-width="1.6" stroke-linejoin="round"/></g>
    <path d="M8 110C4 86 18 66 40 62 58 58 80 60 92 70L100 110Z" fill="url(#${st})" ${K}/>
    <path d="M14 98C14 80 30 70 46 74 44 88 38 100 34 110L14 110Z" fill="#a8742a" opacity=".45"/>
    <path d="M18 84C24 74 36 68 48 68" stroke="#fff" stroke-width="2.6" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M82 100C94 96 110 98 120 103 124 109 118 115 106 115L82 115Z" fill="url(#${sd})" ${K}/>
    <g class="p-wing"><path d="M56 66C46 44 26 36 8 40 20 46 24 54 24 64 36 58 48 62 56 66Z" fill="url(#${st})" stroke="#44280a" stroke-width="2.2" stroke-linejoin="round"/><path d="M56 66 8 40M56 66 24 64M56 66C48 54 38 46 22 42" stroke="#7a4c1a" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M10 41C16 46 22 46 24 52M22 44C28 50 30 52 32 60" stroke="#2a4ed0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".9"/></g>
    <path d="M70 105C86 98 104 100 122 107 126 113 120 117 108 117L70 117Z" fill="url(#${st})" ${K}/><path d="M110 108v9M117 110v7" stroke="#44280a" stroke-width="1.8" stroke-linecap="round"/><path d="M76 106c10-3 22-3 32 0" stroke="#fff" stroke-width="1.8" fill="none" opacity=".5" stroke-linecap="round"/>
    <path d="M80 64C86 50 98 46 104 52L106 102 82 102Z" fill="url(#${st})" ${K}/>
    <path d="M82 66Q96 80 110 64L110 72Q96 88 82 74Z" fill="url(#${lp})" stroke="#0c1c6a" stroke-width="1.4" stroke-linejoin="round"/><path d="M82 75Q96 90 110 72L110 78Q96 96 82 83Z" fill="url(#${gd})" stroke="#6a3a06" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M32 74 38 82 32 90 40 98M92 42 96 50 92 56" stroke="#4a2c0c" stroke-width="1.8" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M68 34C66 14 90 4 106 12 116 18 118 34 114 56L112 76 98 74 94 56 84 58 80 76 70 74 68 56Z" fill="url(#${lp})" ${K}/><g clip-path="url(#${cp})">${stripes}</g>
    <path d="M68 34C66 14 90 4 106 12 116 18 118 34 114 56L112 76 98 74 94 56 84 58 80 76 70 74 68 56Z" fill="none" stroke="#44280a" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M84 26C92 21 106 23 108 34 110 46 104 55 96 57 88 57 83 49 82 39 82 33 83 28 84 26Z" fill="url(#${st})" ${K}/>
    <path d="M84 28C90 24 100 24 105 28" stroke="#fff" stroke-width="1.8" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M104 37 111 42 106 46M97 51q4 2 8-1" stroke="#44280a" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M90 24 94 32 90 37 94 43" stroke="#4a2c0c" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M91 35Q98 29 106 34 99 39 91 35Z" fill="#1a1008" stroke="#1a1008" stroke-width="1"/><path d="M92 35L86 37" stroke="#1a1008" stroke-width="1.8" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="99" cy="34.4" r="9" fill="url(#${gl})" opacity=".85"/></g><ellipse cx="99.4" cy="34.4" rx="3.6" ry="2" fill="#fff"/>
    <path d="M97 22 94 14C94 8 102 8 102 14 102 18 99 20 99 24" stroke="#44280a" stroke-width="5.6" fill="none" stroke-linecap="round"/><path d="M97 22 94 14C94 8 102 8 102 14 102 18 99 20 99 24" stroke="url(#${gd})" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="M100 56 107 56 109 74 102 76Z" fill="url(#${gd})" stroke="#6a3a06" stroke-width="1.6" stroke-linejoin="round"/><path d="M101 62h7M101 68h7" stroke="#2a4ed0" stroke-width="2"/>
  </g></g>`;
  return _msvg('sphinx_gardien', defs, body);
}

function _pharaon() {
  const gd = _q(), ln = _q(), lp = _q(), rd = _q(), wh = _q(), cb = _q(), cp = _q();
  const defs = _qrg(gd, [[0, '#fff6a8'], [.45, '#ffc82e'], [1, '#8a5206']], .36, .26, .98) + _qrg(ln, [[0, '#fffaf0'], [.55, '#e6d8b4'], [1, '#9a8a5c']], .4, .28, .98) + _qlg(lp, [[0, '#86a8ff'], [.5, '#2a4ed0'], [1, '#0c1c6a']], 0, 0, 1, 1)
    + _qlg(rd, [[0, '#ff8a6a'], [.5, '#d02a2a'], [1, '#6a0a14']], 0, 0, 1, 1) + _qlg(wh, [[0, '#ffffff'], [.6, '#ece8f4'], [1, '#aca8c8']], 0, 0, 1, 1) + _qlg(cb, [[0, '#4ae0c0'], [.5, '#168a78'], [1, '#064a44']], 0, 0, 1, 1)
    + `<clipPath id="${cp}"><path d="M44 28C44 14 58 10 70 10 84 10 92 16 92 28L94 62 84 58 82 64 52 64 46 62Z"/></clipPath>`;
  const K = 'stroke="#3a2406" stroke-width="2.2" stroke-linejoin="round"';
  const stripes = Array.from({ length: 10 }, (_, i) => `<path d="M${44 + i * 5} 0L${42 + i * 5} 70" stroke="${i % 2 ? '#2a4ed0' : '#ffd24a'}" stroke-width="2.8"/>`).join('');
  const cobra = (x, y, s, flip) => `<g class="p-antenna"><g ${_vb} transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M0 0C-16 -2 -16 -18 -2 -18 12 -18 8 -34 0 -38" stroke="#04302c" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M0 0C-16 -2 -16 -18 -2 -18 12 -18 8 -34 0 -38" stroke="url(#${cb})" stroke-width="6.8" fill="none" stroke-linecap="round"/>
    <path d="M-10 -52C-12 -64 -2 -70 8 -66 18 -62 18 -50 10 -44 4 -40 -6 -42 -10 -52Z" fill="url(#${cb})" stroke="#04302c" stroke-width="2" stroke-linejoin="round"/><path d="M-4 -60L4 -44M6 -62L10 -48" stroke="#ffd24a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M-4 -66C-6 -76 6 -78 10 -70 8 -66 2 -64 -4 -66Z" fill="url(#${cb})" stroke="#04302c" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="-72" r="1.8" fill="#ffd24a"/><path d="M10 -70l6 1-5 2" stroke="#e8283a" stroke-width="1.2" fill="#e8283a"/></g></g>`;
  const body = `${_qsh(44)}<g class="p-hop"><g class="p-body">
    ${cobra(16, 118, .78)}
    <g class="p-limb"><path d="M42 62Q32 62 28 54" stroke="#3a2406" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M42 62Q32 62 28 54" stroke="url(#${ln})" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M34 58l-1-9M38 62l-1-8" stroke="#8a7648" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
      <path d="M28 54 20 34" stroke="#3a2406" stroke-width="5.6" stroke-linecap="round"/><path d="M28 54 20 34" stroke="url(#${gd})" stroke-width="3.4" stroke-linecap="round"/><circle cx="28" cy="54" r="5" fill="url(#${ln})" ${K}/>
      <path d="M20 34C12 30 8 22 12 14M20 34C16 24 20 16 26 12M20 34C26 28 32 22 32 14" stroke="#3a2406" stroke-width="3" fill="none" stroke-linecap="round"/>${[[12, 14], [26, 12], [32, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="url(#${gd})" ${K}/><path d="M${x - 2.4} ${y - 2.4}l-2-2.6M${x + 2.6} ${y - 2.4}l2-2.6" stroke="#3a2406" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>
    <path d="M42 70C40 84 38 100 40 116H90C92 100 88 84 86 70Z" fill="url(#${ln})" ${K}/>
    <path d="M42 80H86M41 90H88M41 100H89M41 110H90" stroke="#8a7648" stroke-width="1.4" opacity=".55"/>${[92, 106].map(y => `<path d="M40 ${y}H90" stroke="#3a2406" stroke-width="6.4"/><path d="M40 ${y}H90" stroke="#ffc82e" stroke-width="4"/><path d="M40 ${y - 1}H90" stroke="#fff3a0" stroke-width="1" opacity=".7"/>`).join('')}
    <path d="M38 44C44 36 84 36 92 44 96 56 94 72 88 80L42 80C36 72 34 56 38 44Z" fill="url(#${ln})" ${K}/>
    <path d="M40 80H88" stroke="#3a2406" stroke-width="7"/><path d="M40 80H88" stroke="#ffc82e" stroke-width="4.6"/><path d="M40 78.6H88" stroke="#fff3a0" stroke-width="1" opacity=".7"/><path d="M60 74h12v12H60Z" fill="url(#${lp})" stroke="#3a2406" stroke-width="1.6" stroke-linejoin="round"/><path d="M63 77h6" stroke="#fff" stroke-width="1.2" opacity=".7"/>
    <path d="M33 46C38 74 90 74 95 46L85 40C81 56 47 56 43 40Z" fill="url(#${lp})" ${K}/><path d="M40 46C44 66 84 66 88 46L82 42C78 56 50 56 46 42Z" fill="url(#${gd})" stroke="#6a3a06" stroke-width="1.4" stroke-linejoin="round"/>
    ${[48, 56, 64, 72, 80].map((x, i) => `<circle cx="${x}" cy="${57 + Math.sin(i / 4 * Math.PI) * 3}" r="2" fill="${i % 2 ? '#d8281a' : '#2ad8c0'}" stroke="#3a2406" stroke-width=".8"/>`).join('')}
    <path d="M44 44C50 52 60 54 70 52" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M44 28C44 14 58 10 70 10 84 10 92 16 92 28L94 62 84 58 82 64 52 64 46 62Z" fill="url(#${lp})" ${K}/><g clip-path="url(#${cp})">${stripes}</g><path d="M44 28C44 14 58 10 70 10 84 10 92 16 92 28L94 62 84 58 82 64 52 64 46 62Z" fill="none" stroke="#3a2406" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M54 30C54 20 62 16 70 16 80 16 86 22 86 32 86 42 82 50 76 56 70 62 60 60 56 52 54 46 54 36 54 30Z" fill="url(#${gd})" ${K}/>
    <path d="M58 24C64 20 72 20 78 24" stroke="#fff" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M64 32 59 29M80 32 86 29" stroke="#0a0a14" stroke-width="2.4" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="66" cy="35" r="7" fill="#6ad8ff" opacity=".4"/><circle cx="79" cy="35" r="6" fill="#6ad8ff" opacity=".4"/></g>
    <g class="p-eye"><ellipse cx="66" cy="35" rx="4.4" ry="2.6" fill="#0a0a14"/><ellipse cx="66.4" cy="35" rx="3" ry="1.7" fill="#6ad8ff"/><ellipse cx="79" cy="35" rx="3.8" ry="2.4" fill="#0a0a14"/><ellipse cx="79.4" cy="35" rx="2.6" ry="1.5" fill="#6ad8ff"/></g>
    <path d="M73 38 76 46 72 47M68 51q4 2 8 0" stroke="#6a3a06" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M72 58C80 58 84 64 84 70 84 74 80 76 78 72 78 66 74 64 70 62Z" fill="url(#${lp})" ${K}/><path d="M74 60 80 70M79 62 82 70" stroke="#ffd24a" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M52 30C52 20 56 14 62 14L82 14C88 14 90 22 90 30L86 22C80 18 60 18 56 24Z" fill="url(#${rd})" stroke="#3a0610" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M52 24 50 8 58 6 62 16Z" fill="url(#${rd})" stroke="#3a0610" stroke-width="2" stroke-linejoin="round"/><path d="M84 20C94 10 102 12 100 20 98 24 92 22 94 18" stroke="#3a2406" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M84 20C94 10 102 12 100 20 98 24 92 22 94 18" stroke="url(#${gd})" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M60 18C58 10 60 4 69 2 77 4 79 10 77 18Z" fill="url(#${wh})" stroke="#4a4668" stroke-width="2.2" stroke-linejoin="round"/><circle cx="69" cy="3" r="2.6" fill="url(#${wh})" stroke="#4a4668" stroke-width="1.6"/><path d="M63 14C62 10 63 6 66 5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/>
    <path d="M58 22 62 16 70 18 78 16 82 22" stroke="#ffd24a" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="p-limb"><path d="M84 62Q100 64 106 56" stroke="#3a2406" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M84 62Q100 64 106 56" stroke="url(#${ln})" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M92 58l1 9M98 61l2 8" stroke="#8a7648" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
      <path d="M96 66h8" stroke="#3a2406" stroke-width="6"/><path d="M96 66h8" stroke="#ffc82e" stroke-width="3.6"/>
      <path d="M110 112 110 22" stroke="#3a2406" stroke-width="6" stroke-linecap="round"/><path d="M110 112 110 22" stroke="#ffc82e" stroke-width="3.6" stroke-linecap="round"/><path d="M108.8 108 108.8 28" stroke="#fff3a0" stroke-width="1" opacity=".7" stroke-linecap="round"/><path d="M110 98V80M110 64V46" stroke="#2a4ed0" stroke-width="3.6"/>
      <path d="M110 22C110 8 124 8 124 18 124 24 118 26 116 22" stroke="#3a2406" stroke-width="6.4" fill="none" stroke-linecap="round"/><path d="M110 22C110 8 124 8 124 18 124 24 118 26 116 22" stroke="url(#${gd})" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="108" cy="54" r="5.4" fill="url(#${ln})" ${K}/></g>
    ${cobra(94, 119, .6)}
    <g class="p-glow"><path d="M30 76l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="#fff" opacity=".9"/></g>
  </g></g>`;
  return _msvg('pharaon', defs, body);
}

/* =====================================================================
   MINES D'OCRE
   ===================================================================== */
function _taupe() {
  const fr = _q(), bl = _q(), pk = _q(), hh = _q(), ir = _q(), lm = _q();
  const defs = _qrg(fr, [[0, '#a898a8'], [.5, '#5c4e5e'], [1, '#2a202c']], .4, .28, .98) + _qrg(bl, [[0, '#d8ccd8'], [1, '#8a7a8c']], .4, .3, .9) + _qrg(pk, [[0, '#ffd8e0'], [.5, '#f48aa8'], [1, '#b4486c']], .38, .3, .9)
    + _qlg(hh, [[0, '#ffe88a'], [.5, '#ffb01a'], [1, '#b86a06']], 0, 0, 1, 1) + _qlg(ir, [[0, '#f4f8ff'], [.5, '#a8b4c8'], [1, '#4a5468']], 0, 0, 1, 1) + _qrg(lm, [[0, '#fffbd0', .95], [.5, '#ffe27a', .4], [1, '#ffe27a', 0]], .5, .5, .5);
  const K = 'stroke="#180f1a" stroke-width="2.2" stroke-linejoin="round"';
  const lobes = Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2; return `<circle cx="${(113 + Math.cos(a) * 8).toFixed(1)}" cy="${(68 + Math.sin(a) * 8).toFixed(1)}" r="3" fill="url(#${pk})" stroke="#8a2a4a" stroke-width="1.1"/>`; }).join('');
  const hand = (x, y) => `<path d="M${x - 8} ${y + 2}C${x - 6} ${y - 6} ${x + 6} ${y - 7} ${x + 9} ${y + 1} ${x + 9} ${y + 8} ${x - 1} ${y + 10} ${x - 6} ${y + 8}Z" fill="url(#${bl})" ${K}/><path d="M${x + 7} ${y - 2}l7-3M${x + 9} ${y + 3}l8 0M${x + 7} ${y + 8}l7 3" stroke="#f4ecd4" stroke-width="3" stroke-linecap="round"/><path d="M${x + 7} ${y - 2}l7-3M${x + 9} ${y + 3}l8 0M${x + 7} ${y + 8}l7 3" stroke="#6a5a40" stroke-width=".8" stroke-linecap="round" opacity=".6"/>`;
  const body = `${_qsh(34)}<g class="p-hop"><g class="p-body">
    <path d="M32 94C20 94 16 102 22 106" stroke="#b4486c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="${_fur(60, 86, 31, 29, 11, 3.5)}" fill="url(#${fr})" ${K}/>
    <path d="M50 94C56 84 74 86 78 98 76 108 56 110 48 102Z" fill="url(#${bl})" opacity=".85"/>
    <path d="M36 76C42 66 56 62 68 66" stroke="#fff" stroke-width="2.6" fill="none" opacity=".3" stroke-linecap="round"/>
    <ellipse cx="50" cy="114" rx="13" ry="6" fill="url(#${pk})" ${K}/><path d="M42 116l-1 3M48 118v2M54 118v2" stroke="#f4ecd4" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="78" cy="115" rx="13" ry="6" fill="url(#${pk})" ${K}/><path d="M72 117l-1 3M78 119v1M84 117l1 3" stroke="#f4ecd4" stroke-width="2" stroke-linecap="round"/>
    <path d="M88 110 30 40" stroke="#1a0e04" stroke-width="7" stroke-linecap="round"/><path d="M88 110 30 40" stroke="#9a6a34" stroke-width="4.4" stroke-linecap="round"/><path d="M86 106 32 42" stroke="#d8a868" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>
    <path d="M18 54C22 36 40 30 52 38L48 43C40 39 30 41 24 54Z" fill="url(#${ir})" stroke="#2a3040" stroke-width="2" stroke-linejoin="round"/><path d="M52 38 58 42 48 43Z" fill="url(#${ir})" stroke="#2a3040" stroke-width="2" stroke-linejoin="round"/><path d="M18 54 11 56 24 54Z" fill="url(#${ir})" stroke="#2a3040" stroke-width="2" stroke-linejoin="round"/><path d="M28 42C36 36 44 36 50 40" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8" stroke-linecap="round"/>
    ${hand(70, 84)}
    <path d="${_fur(86, 62, 22, 20, 9, 3)}" fill="url(#${fr})" ${K}/>
    <path d="M92 56C104 56 112 62 112 68 112 78 100 82 90 80Z" fill="url(#${bl})" stroke="#180f1a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M70 52C76 46 86 44 94 46" stroke="#fff" stroke-width="2" fill="none" opacity=".25" stroke-linecap="round"/>
    <path d="M76 60Q82 56 88 56" stroke="#180f1a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M73 52 66 48" stroke="#6a4a22" stroke-width="2" stroke-linecap="round"/>
    ${_qeye(91, 58, 3.6, '#1a1008', .8, '#fff')}<circle cx="91" cy="58" r="7.4" fill="#cfeaff" fill-opacity=".38" stroke="#7a5a2a" stroke-width="2"/><path d="M87 54c2-2 5-2 7-1" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9" stroke-linecap="round"/>
    ${lobes}<circle cx="113" cy="68" r="7" fill="url(#${pk})" stroke="#8a2a4a" stroke-width="1.3"/><ellipse cx="111" cy="66" rx="2.2" ry="1.6" fill="#fff" opacity=".6"/><circle cx="116" cy="70" r="1" fill="#6a1a38"/><circle cx="112" cy="72" r="1" fill="#6a1a38"/>
    <path d="M64 50C64 32 82 26 96 32 104 36 106 44 104 50Z" fill="url(#${hh})" stroke="#6a3a06" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M60 52Q84 44 108 52L106 57Q84 52 62 59Z" fill="#c8780e" stroke="#6a3a06" stroke-width="2" stroke-linejoin="round"/><path d="M84 29 86 47M74 33 76 49" stroke="#b86a06" stroke-width="2" opacity=".6"/><path d="M70 42C74 34 84 31 92 33" stroke="#fff" stroke-width="2.2" fill="none" opacity=".7" stroke-linecap="round"/>
    <g class="p-glow"><circle cx="105" cy="40" r="15" fill="url(#${lm})"/></g><circle cx="105" cy="41" r="6.4" fill="#4a3a2a" stroke="#1a1008" stroke-width="1.6"/><circle cx="105" cy="41" r="4.2" fill="#fffbd0"/><circle cx="103.6" cy="39.6" r="1.4" fill="#fff"/>
    ${hand(92, 98)}
    <g class="p-glow"><circle cx="16" cy="112" r="2.4" fill="#d8c4a0"/><circle cx="24" cy="104" r="1.8" fill="#d8c4a0"/><circle cx="10" cy="102" r="1.5" fill="#d8c4a0"/><circle cx="110" cy="108" r="2.2" fill="#d8c4a0"/><circle cx="118" cy="100" r="1.6" fill="#d8c4a0"/><circle cx="104" cy="114" r="1.5" fill="#d8c4a0"/></g>
  </g></g>`;
  return _msvg('taupe_mineuse', defs, body);
}

function _golem() {
  const st = _q(), sl = _q(), vn = _q(), co = _q();
  const defs = _qrg(st, [[0, '#8e7e74'], [.5, '#4c403a'], [1, '#1e1612']], .34, .26, 1) + _qlg(sl, [[0, '#a8988c'], [1, '#5c4e46']], 0, 0, 1, 1) + _qlg(vn, [[0, '#ffe27a'], [.5, '#ffa02e'], [1, '#e8501a']], 0, 0, 1, 1) + _qrg(co, [[0, '#ffffff'], [.35, '#ffe27a'], [1, '#ff7a1a']], .5, .5, .6);
  const K = 'stroke="#150e0a" stroke-width="2.4" stroke-linejoin="round"';
  const F = (pts, f) => `<path d="${_poly(pts)}" fill="${f}" ${K}/>`;
  const veins = 'M66 70 52 56 38 62M66 70 84 58 96 66M66 70 58 90 50 98M66 70 78 92M52 56 54 46';
  const body = `${_qsh(42)}<g class="p-hop"><g class="p-body">
    ${F([[28, 50], [42, 52], [40, 84], [44, 100], [26, 108], [14, 98], [18, 80]], 'url(#' + st + ')')}<path d="M18 80 28 50 42 52 38 62 24 76Z" fill="#fff" opacity=".1"/>
    ${F([[40, 92], [62, 92], [64, 114], [60, 119], [34, 119], [32, 106]], 'url(#' + st + ')')}${F([[68, 92], [92, 92], [98, 106], [94, 119], [66, 119], [64, 106]], 'url(#' + st + ')')}
    <path d="M40 92 62 92 62 100 36 102Z M68 92 92 92 92 100 66 100Z" fill="#fff" opacity=".1"/><path d="M42 106 54 110M82 106 76 112" stroke="#150e0a" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
    ${_cry(44, 46, 26, 11, -24)}${_cry(34, 54, 17, 9, -48)}
    ${F([[30, 56], [48, 40], [84, 40], [102, 56], [98, 92], [84, 100], [48, 100], [34, 90]], 'url(#' + st + ')')}
    <path d="M48 40 84 40 78 52 54 52Z" fill="#fff" opacity=".18"/><path d="M30 56 48 40 54 52 40 66Z" fill="#fff" opacity=".1"/><path d="M98 92 102 56 84 40 78 52 90 70Z" fill="#000" opacity=".22"/><path d="M34 90 40 66 54 52 50 100 48 100Z" fill="#fff" opacity=".07"/>
    <path d="M44 74 54 78 52 92M76 52 74 64 88 74M70 94 84 90" stroke="#150e0a" stroke-width="1.8" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <g class="p-glow"><path d="${veins}" stroke="#ff7a1a" stroke-width="6.4" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".4"/><path d="${veins}" stroke="url(#${vn})" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="66" cy="70" r="13" fill="#ffa02e" opacity=".35"/></g>
    <path d="M66 62 74 66 74 75 66 79 58 75 58 66Z" fill="url(#${co})" stroke="#7a2a06" stroke-width="1.8" stroke-linejoin="round"/><path d="M62 66 66 64" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
    ${_cry(100, 52, 24, 11, 22)}${_cry(108, 58, 15, 8, 44)}
    ${F([[64, 42], [66, 22], [84, 14], [104, 22], [110, 38], [100, 50], [76, 50]], 'url(#' + st + ')')}<path d="M66 22 84 14 90 24 70 30Z" fill="#fff" opacity=".22"/><path d="M104 22 110 38 100 50 96 34Z" fill="#000" opacity=".22"/><path d="M72 32 108 31 107 41 74 41Z" fill="#150e0a" opacity=".7"/>
    <g class="p-glow"><path d="M88 33 108 32 107 38 89 38Z" fill="#fff3b0" stroke="#ff7a1a" stroke-width="1.4" stroke-linejoin="round"/><circle cx="98" cy="35.5" r="10" fill="#ffa02e" opacity=".3"/></g><path d="M80 44l6 3 6-3" stroke="#150e0a" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>
    <g class="p-limb">${F([[92, 48], [110, 52], [116, 78], [104, 84], [96, 66]], 'url(#' + st + ')')}<path d="M92 48 110 52 106 60 96 56Z" fill="#fff" opacity=".18"/>
      ${F([[98, 82], [118, 76], [128, 92], [124, 110], [104, 115], [92, 102]], 'url(#' + st + ')')}<path d="M98 82 118 76 124 86 104 92Z" fill="#fff" opacity=".18"/><path d="M104 92 124 86M102 102 124 98" stroke="#150e0a" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
      <path d="M100 70 108 78 106 90" stroke="#ff7a1a" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round" class="p-glow"/></g>
  </g></g>`;
  return _msvg('golem_ocre', defs, body);
}

function _verRoche() {
  const st = _q(), sd = _q(), mo = _q(), tt = _q();
  const defs = _qrg(st, [[0, '#a8988a'], [.5, '#6a5a50'], [1, '#2e241e']], .36, .28, 1) + _qrg(sd, [[0, '#8a7a6c'], [1, '#3a2e26']], .4, .3, .9) + _qrg(mo, [[0, '#fff6c0'], [.35, '#ffb02e'], [1, '#8a2a06']], .5, .5, .6) + _qlg(tt, [[0, '#fffaf0'], [1, '#d8c8a0']]);
  const K = 'stroke="#1a110c" stroke-width="2.4" stroke-linejoin="round"';
  const P = [[38, 104], [24, 62], [46, 20], [90, 44]];
  const B = t => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
  const seg = t => { const [x, y] = B(t), r = 17.5 - t * 1.5; return `<circle cx="${(x).toFixed(1)}" cy="${y.toFixed(1)}" r="${(r + 2.4).toFixed(1)}" fill="#ff9a2e" opacity=".85"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${st})" ${K}/><path d="M${(x - r * .62).toFixed(1)} ${(y - r * .3).toFixed(1)}q${(r * .3).toFixed(1)} ${(-r * .62).toFixed(1)} ${(r * .86).toFixed(1)} ${(-r * .38).toFixed(1)}" stroke="#fff" stroke-width="1.8" fill="none" opacity=".4" stroke-linecap="round"/><circle cx="${(x + r * .32).toFixed(1)}" cy="${(y + r * .34).toFixed(1)}" r="${(r * .2).toFixed(1)}" fill="#2e241e" opacity=".5"/><circle cx="${(x - r * .34).toFixed(1)}" cy="${(y + r * .1).toFixed(1)}" r="${(r * .13).toFixed(1)}" fill="#2e241e" opacity=".45"/>`; };
  const ts = Array.from({ length: 12 }, (_, i) => .02 + i * .088);
  const low = ts.filter(t => t < .3).map(seg).join(''), up = ts.filter(t => t >= .3).map(seg).join('');
  const [hx, hy] = B(.99);
  const mc = [108, 52], mrx = 11.5, mry = 19;
  const rings = [1, .66].map((k, j) => `<ellipse cx="${mc[0]}" cy="${mc[1]}" rx="${(mrx * k).toFixed(1)}" ry="${(mry * k).toFixed(1)}" fill="${j ? '#3a1a0c' : '#2a1a14'}" stroke="#1a110c" stroke-width="2"/>`).join('');
  const teeth = Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2, rr = i % 2 ? 1 : .74; const x = mc[0] + Math.cos(a) * mrx * rr, y = mc[1] + Math.sin(a) * mry * rr, x2 = mc[0] + Math.cos(a) * mrx * .38, y2 = mc[1] + Math.sin(a) * mry * .38; const nx = -Math.sin(a) * 2.6, ny = Math.cos(a) * 2.6 * .8; return `<path d="M${(x + nx).toFixed(1)} ${(y + ny).toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}L${(x - nx).toFixed(1)} ${(y - ny).toFixed(1)}Z" fill="url(#${tt})" stroke="#6a5a3a" stroke-width=".9" stroke-linejoin="round"/>`; }).join('');
  const rock = (x, y, s, f = 1) => `<g ${_vb} transform="translate(${x} ${y}) scale(${s})"><path d="M-10 0-7-8-1-11 6-9 10-2 8 0Z" fill="url(#${sd})" stroke="#1a110c" stroke-width="1.8" stroke-linejoin="round"/><path d="M-1-11 6-9 10-2 3-3Z" fill="#fff" opacity=".2"/></g>`;
  const body = `${_qsh(46)}<g class="p-hop"><g class="p-body">
    <ellipse cx="46" cy="114" rx="36" ry="8" fill="#150c08"/><ellipse cx="46" cy="113" rx="30" ry="5.6" fill="#ff9a2e" opacity=".35"/>
    ${low}
    <g class="p-antenna" style="transform-box:view-box;transform-origin:40px 78px">${up}
      <path d="M76 30 82 18 88 30M88 28 96 18 98 30" fill="url(#${sd})" stroke="#1a110c" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="${(hx).toFixed(1)}" cy="${(hy).toFixed(1)}" r="21" fill="url(#${st})" ${K}/><path d="M78 40q8-12 22-10" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>
      ${rings}<ellipse cx="${mc[0]}" cy="${mc[1]}" rx="${mrx * .5}" ry="${mry * .5}" fill="url(#${mo})"/>${teeth}
      <g class="p-glow"><ellipse cx="${mc[0]}" cy="${mc[1]}" rx="${mrx * .34}" ry="${mry * .34}" fill="#fff6c0"/></g>
    </g>
    ${rock(12, 118, 1.2)}${rock(22, 121, .8)}${rock(70, 119, 1)}${rock(84, 121, .7)}
    <g class="p-glow"><circle cx="8" cy="104" r="2" fill="#d8c4a0"/><circle cx="92" cy="110" r="2.2" fill="#d8c4a0"/><circle cx="100" cy="102" r="1.5" fill="#d8c4a0"/><circle cx="16" cy="96" r="1.5" fill="#d8c4a0"/></g>
  </g></g>`;
  return _msvg('ver_roche', defs, body);
}

function _colosse() {
  const cy = _q(), co = _q(), ds = _q();
  const defs = _qrg(cy, [[0, '#d8ffff'], [.4, '#38e0f0'], [1, '#0a7aa8']], .5, .5, .6) + _qlg(ds, [[0, '#ffd070'], [.5, '#e8901e'], [1, '#8a3a0a']], 0, 0, 1, 1);
  const A = _AMBER, K = 'stroke="#4a1e06" stroke-width="2.6" stroke-linejoin="round"';
  const F = (pts, f, o = 1) => `<path d="${_poly(pts)}" fill="${f}" ${K} opacity="${o}"/>`;
  const L = (pts, f, o) => `<path d="${_poly(pts)}" fill="${f}" opacity="${o}"/>`;
  const body = `${_qsh(48)}<g class="p-hop"><g class="p-body">
    ${F([[16, 70], [34, 60], [42, 90], [36, 110], [14, 112], [6, 92]], A[1])}${L([[16, 70], [34, 60], [26, 82], [6, 92]], A[0], .8)}${L([[26, 82], [34, 60], [42, 90], [36, 110]], A[2], .6)}
    ${F([[38, 92], [62, 92], [62, 119], [34, 119], [30, 104]], A[1])}${L([[38, 92], [50, 92], [46, 119], [34, 119], [30, 104]], A[0], .75)}${F([[66, 92], [92, 92], [98, 104], [94, 119], [66, 119]], A[2])}${L([[66, 92], [80, 92], [78, 119], [66, 119]], A[1], .85)}
    ${F([[26, 54], [48, 34], [84, 34], [106, 54], [104, 92], [84, 104], [48, 104], [28, 92]], A[1])}
    ${L([[26, 54], [48, 34], [66, 34], [60, 70], [48, 104], [28, 92]], A[0], .8)}${L([[66, 34], [84, 34], [106, 54], [104, 92], [84, 104], [72, 70]], A[2], .6)}${L([[26, 54], [48, 34], [66, 34], [56, 52]], '#fff', .25)}
    <path d="M48 34 56 70 48 104M84 34 76 70 84 104M26 54 56 70 106 54M28 92 56 70 104 92" stroke="#4a1e06" stroke-width="1.8" fill="none" stroke-linejoin="round" opacity=".7"/>
    <g class="p-glow"><path d="M40 60 54 66M92 66 78 70M62 84 66 100M72 44 68 56" stroke="#38e0f0" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"/><circle cx="66" cy="70" r="24" fill="#38e0f0" opacity=".28"/><circle cx="66" cy="70" r="16" fill="#38e0f0" opacity=".25"/></g>
    <path d="M66 54 80 62 80 78 66 86 52 78 52 62Z" fill="url(#${cy})" stroke="#0a4a6a" stroke-width="2.2" stroke-linejoin="round"/><path d="M66 54 66 86M52 62 80 78M80 62 52 78" stroke="#fff" stroke-width="1" opacity=".55"/><path d="M58 62 66 58" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".9"/>
    ${_cry(30, 52, 34, 15, -26)}${_cry(20, 62, 20, 10, -52)}
    ${F([[56, 36], [58, 20], [74, 16], [86, 22], [90, 36], [78, 44], [64, 44]], A[1])}${L([[58, 20], [74, 16], [70, 30], [56, 36]], A[0], .9)}${L([[86, 22], [90, 36], [78, 44], [72, 30]], A[2], .6)}
    <g class="p-glow"><path d="M70 27 86 28 84 33 71 32Z" fill="#d8ffff" stroke="#0a7aa8" stroke-width="1.4" stroke-linejoin="round"/><circle cx="78" cy="30" r="7" fill="#38e0f0" opacity=".35"/></g>
    ${_cry(60, 24, 16, 8, -24)}${_cry(68, 20, 22, 9, -7)}${_cry(77, 20, 21, 9, 9)}${_cry(85, 24, 16, 8, 26)}
    ${_cry(100, 46, 36, 16, 24)}${_cry(110, 58, 20, 10, 50)}
    <g class="p-limb">${F([[92, 50], [112, 58], [118, 84], [102, 90], [94, 70]], A[1])}${L([[92, 50], [112, 58], [104, 66], [94, 60]], A[0], .8)}
      ${F([[94, 86], [116, 80], [127, 96], [123, 115], [100, 119], [88, 104]], A[1])}${L([[94, 86], [116, 80], [120, 92], [100, 96]], A[0], .85)}${L([[100, 96], [120, 92], [123, 115], [100, 119]], A[2], .6)}
      <path d="M100 96 124 92M98 106 123 104" stroke="#4a1e06" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><path d="M104 66 110 76 104 84" class="p-glow" stroke="#38e0f0" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  </g></g>`;
  return _msvg('colosse_cristal', defs, body);
}

Object.assign(MON_ART, { scarabosse: _scarabosse(), crocodaille: _crocodaille(), momie: _momie(), sphinx_gardien: _sphinx(), pharaon: _pharaon(),
  taupe_mineuse: _taupe(), golem_ocre: _golem(), ver_roche: _verRoche(), colosse_cristal: _colosse() });
})();
