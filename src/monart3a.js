/* =====================================================================
   NOUVELLES TERRES — SPRITES ANIMÉS (dessins originaux), région Pandala
   Forêt de Pandala : Bambouto, Kitsou Nufu, Tengu Corbeau, Tanukoui San (gros monstre), Dragon de Jade (boss de donjon)
   Étang des Carpes Célestes : Rainette Lotus, Koï Céleste, Héron Pêcheur, Carpe-Dragon Impériale (gros monstre)
   Même convention que monart2.js : 128×128, tournés vers la DROITE, classes animées p-*, helpers _q _qlg _qrg _msvg _qsh _qeye _fur _sc _vb.
   Tout est enfermé dans une IIFE (aucun nom global ajouté) ; enregistrement dans MON_ART à la fin.
   ===================================================================== */
(function () {
  /* ---------- géométrie : spline de Catmull-Rom échantillonnée (corps de dragon / de carpe) ---------- */
  function spine(pts, per = 9) {
    const P = [pts[0], ...pts, pts[pts.length - 1]], out = [];
    for (let i = 1; i < P.length - 2; i++) {
      const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
      for (let k = 0; k < per; k++) {
        const t = k / per, t2 = t * t, t3 = t2 * t;
        const f = (a, b, c, d) => .5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
        out.push({ x: f(p0[0], p1[0], p2[0], p3[0]), y: f(p0[1], p1[1], p2[1], p3[1]) });
      }
    }
    out.push({ x: pts[pts.length - 1][0], y: pts[pts.length - 1][1] });
    out.forEach((p, i) => {
      const a = out[Math.max(0, i - 1)], b = out[Math.min(out.length - 1, i + 1)];
      let tx = b.x - a.x, ty = b.y - a.y; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
      p.tx = tx; p.ty = ty; p.nx = -ty; p.ny = tx; p.u = i / (out.length - 1);
    });
    return out;
  }
  const f1 = n => (+n).toFixed(1);
  /* contour d'un corps : w(u) = largeur au point u (0 = queue, 1 = tête) ; renvoie les deux bords */
  function sides(S, w) {
    const L = [], R = [];
    S.forEach(p => { const h = w(p.u) / 2; L.push([p.x + p.nx * h, p.y + p.ny * h]); R.push([p.x - p.nx * h, p.y - p.ny * h]); });
    return { L, R };
  }
  const poly = a => a.map(([x, y], i) => (i ? 'L' : 'M') + f1(x) + ' ' + f1(y)).join('');
  const smooth = a => { // courbe lisse par points (Q avec points milieux)
    let d = `M${f1(a[0][0])} ${f1(a[0][1])}`;
    for (let i = 1; i < a.length - 1; i++) { const mx = (a[i][0] + a[i + 1][0]) / 2, my = (a[i][1] + a[i + 1][1]) / 2; d += `Q${f1(a[i][0])} ${f1(a[i][1])} ${f1(mx)} ${f1(my)}`; }
    const l = a[a.length - 1]; return d + `L${f1(l[0])} ${f1(l[1])}`;
  };
  const leafP = (len, w) => `M0 0C${w} ${-len * .22} ${w * 1.05} ${-len * .68} 0 ${-len}C${-w * 1.05} ${-len * .68} ${-w} ${-len * .22} 0 0Z`;
  const flameP = (h, w) => `M0 0C${-w} ${-h * .25} ${-w * .9} ${-h * .62} ${-w * .12} ${-h}C${-w * .1} ${-h * .66} ${w * .22} ${-h * .62} ${w * .32} ${-h * .84}C${w * 1.1} ${-h * .6} ${w * 1.05} ${-h * .22} 0 0Z`;

  /* =====================================================================
     BAMBOUTO — pousse de bambou marcheuse
     ===================================================================== */
  function bambouto() {
    const st = _q(), nd = _q(), l1 = _q(), l2 = _q(), rt = _q(), dt = _q();
    const defs = _qlg(st, [[0, '#e4fbb0'], [.3, '#8be07e'], [.7, '#3fae6a'], [1, '#17683f']], 0, 0, 1, 0)
      + _qlg(nd, [[0, '#fbffc8'], [.5, '#cde66a'], [1, '#7a9a28']], 0, 0, 0, 1)
      + _qlg(l1, [[0, '#c2f59a'], [1, '#33a655']], 0, 1, 0, 0) + _qlg(l2, [[0, '#6bd47c'], [1, '#1a7a40']], 0, 1, 0, 0)
      + _qlg(rt, [[0, '#b8845a'], [1, '#4a2c18']], 0, 0, 0, 1) + _qrg(dt, [[0, '#8a6038'], [1, '#3e2814']], .4, .3, .9);
    const K = 'stroke="#12442c" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
    const k = 'stroke="#12442c" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    const leaf = (x, y, rot, len, w, g) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${rot})"><path d="${leafP(len, w)}" fill="url(#${g})" ${k}/><path d="M0 -2V${-len + 5}" stroke="#e6ffc0" stroke-width="1" opacity=".75" stroke-linecap="round"/></g>`;
    const crown = [[-74, 28, 5.4, l2], [-52, 36, 6, l1], [-28, 40, 6.4, l2], [-6, 42, 6.6, l1], [18, 40, 6.4, l2], [40, 36, 6, l1], [62, 30, 5.4, l2], [84, 24, 4.6, l1]]
      .map(([r, L, w, g]) => leaf(64, 56, r, L, w, g)).join('');
    const roots = `<path d="M48 108C42 110 36 112 31 118M50 109C48 114 44 118 40 121M56 110C56 115 54 119 52 122" stroke="#2a1608" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M48 108C42 110 36 112 31 118M50 109C48 114 44 118 40 121M56 110C56 115 54 119 52 122" stroke="url(#${rt})" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M80 108C86 110 92 112 97 118M78 109C80 114 84 118 88 121M72 110C72 115 74 119 76 122" stroke="#2a1608" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M80 108C86 110 92 112 97 118M78 109C80 114 84 118 88 121M72 110C72 115 74 119 76 122" stroke="url(#${rt})" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    const mound = `<ellipse cx="64" cy="116" rx="34" ry="7" fill="url(#${dt})" stroke="#2a1608" stroke-width="2"/><path d="M38 114q4-3 8 0M86 114q4-3 8 0M60 118q5-2 9 0" stroke="#2a1608" stroke-width="1.4" fill="none" opacity=".5" stroke-linecap="round"/><ellipse cx="50" cy="113" rx="6" ry="1.6" fill="#fff" opacity=".18"/>
      <path d="M32 116l-2-8 5 5M96 116l2-7-5 5" stroke="#3fae6a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    const armB = `<g class="p-limb"><path d="M47 91C38 89 30 93 27 101" stroke="#12442c" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M47 91C38 89 30 93 27 101" stroke="#5cc474" stroke-width="4.6" fill="none" stroke-linecap="round"/>${leaf(27, 101, 190, 14, 3.4, l2)}${leaf(27, 101, 214, 12, 3, l1)}${leaf(27, 101, 168, 12, 3, l2)}</g>`;
    const armF = `<g class="p-limb"><path d="M81 89C91 85 99 89 103 98" stroke="#12442c" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M81 89C91 85 99 89 103 98" stroke="#6ad27c" stroke-width="4.6" fill="none" stroke-linecap="round"/>${leaf(103, 98, 156, 15, 3.6, l1)}${leaf(103, 98, 182, 13, 3.2, l2)}${leaf(103, 98, 130, 12, 3.2, l1)}</g>`;
    const eyeR = (cx, cy, r) => `<g class="p-eye"><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.12}" fill="#fffdea" stroke="#12442c" stroke-width="1.6"/><circle cx="${cx + 1.6}" cy="${cy + .6}" r="${r * .62}" fill="#2a6a22"/><circle cx="${cx + 2}" cy="${cy + .6}" r="${r * .36}" fill="#0a1a0a"/><circle cx="${cx + .4}" cy="${cy - r * .34}" r="${r * .22}" fill="#fff"/></g>`;
    const body = `${_qsh(30)}<g class="p-hop"><g class="p-body">
      ${roots}${mound}
      <g class="p-leaves">${crown}</g>
      ${armB}
      <path d="M47 55H81V104C81 110 76 111 70 111H58C52 111 47 110 47 104Z" fill="url(#${st})" ${K}/>
      <path d="M52 58v48" stroke="#fff" stroke-width="3" opacity=".3" stroke-linecap="round"/><path d="M75 60v44" stroke="#0e4a2a" stroke-width="2" opacity=".25" stroke-linecap="round"/>
      <path d="M56 80v7M70 98v8M60 62v4" stroke="#12442c" stroke-width="1.2" opacity=".35" stroke-linecap="round"/>
      <rect x="43" y="79" width="42" height="8" rx="4" fill="url(#${nd})" ${K}/><rect x="43" y="97" width="42" height="8" rx="4" fill="url(#${nd})" ${K}/>
      <path d="M48 81.5h30M48 99.5h30" stroke="#fff" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>
      <ellipse cx="64" cy="55" rx="17.5" ry="4.8" fill="#1a5a38" ${K}/><ellipse cx="64" cy="55.6" rx="12.5" ry="2.8" fill="#0e3a24"/>
      ${leaf(82, 84, 62, 11, 2.8, l1)}${leaf(45, 102, -60, 11, 2.8, l2)}
      ${eyeR(66.5, 65, 6.4)}${eyeR(79.5, 66, 5.2)}
      <path d="M57 57 72 63.4" stroke="#12442c" stroke-width="3.6" stroke-linecap="round"/><path d="M75 63 84.5 59" stroke="#12442c" stroke-width="3.4" stroke-linecap="round"/>
      <path class="p-jaw" d="M68 75.4q6-4.4 12.4-.6" stroke="#12442c" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M71 73.6l1 2.2 1.6-1.8Z" fill="#fff" stroke="#12442c" stroke-width=".8"/>
      <ellipse cx="58.5" cy="72.6" rx="3" ry="1.8" fill="#ff8a8a" opacity=".5"/><ellipse cx="83" cy="73.4" rx="2.4" ry="1.6" fill="#ff8a8a" opacity=".5"/>
      ${armF}
    </g></g>`;
    return _msvg('bambouto', defs, _sc(.92, body));
  }

  /* =====================================================================
     KITSOU NUFU — esprit-renard à deux queues de flammes spectrales
     ===================================================================== */
  function kitsou() {
    const fr = _q(), rd = _q(), fl = _q(), tA = _q(), tB = _q(), am = _q(), pp = _q();
    const ug = (id, x1, y1, x2, y2, stops) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
    const tailStops = [[0, '#ead0a4'], [.3, '#fff2da'], [.62, '#fff8ea'], [.82, '#ffb27a'], [1, '#ff6a2e']];
    const defs = _qrg(fr, [[0, '#ffffff'], [.55, '#fff0d4'], [1, '#e2bc8a']], .4, .3, .95)
      + _qlg(fl, [[0, '#f0fbff'], [.35, '#9fd4ff'], [.75, '#7a62f4'], [1, '#3a1c9c']], 0, 0, 0, 1)
      + ug(tA, 50, 70, 19, 40, tailStops) + ug(tB, 50, 82, 11, 70, tailStops)
      + _qrg(am, [[0, '#fff6a8'], [.6, '#ffb81e'], [1, '#c8660a']], .4, .3, .9) + _qlg(pp, [[0, '#fffdf2'], [1, '#e8dcc0']], 0, 0, 1, 1);
    const RED = '#e8481f', K = 'stroke="#6a2a14" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
    const k = 'stroke="#6a2a14" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    const flame = (x, y, rot, h, w, glow = true) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${rot})"><g${glow ? ' class="p-glow"' : ''}><path d="${flameP(h, w)}" fill="url(#${fl})" stroke="#2a1a7a" stroke-width="1.3" stroke-linejoin="round" opacity=".92"/><path d="${flameP(h * .55, w * .5)}" fill="#f4fcff" opacity=".85"/></g></g>`;
    const leg = (d, paw) => `<path d="${d}" stroke="#6a2a14" stroke-width="7.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#fff0d4" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${paw}" stroke="#6a2a14" stroke-width="7.6" fill="none" stroke-linecap="round"/><path d="${paw}" stroke="${RED}" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="${paw}" stroke="#ff9a62" stroke-width="1.2" fill="none" stroke-linecap="round" transform="translate(-1 0)" ${_vb}/>`;
    /* queue touffue : spine + bord en fourrure */
    const tail = (pts, grad, delay) => {
      const S = spine(pts, 14), w = u => (1 - .9 * Math.pow(u, 4)) * (4.5 + 17 * Math.sin(Math.PI * Math.pow(u, 1.3)));
      const { L, R } = sides(S, w), jag = (a, sgn) => a.map(([x, y], i) => { const p = S[i], o = i % 2 ? 1.25 : 0; return [x + p.nx * sgn * o, y + p.ny * sgn * o]; });
      const out = [...jag(L, 1), ...jag(R, -1).reverse()];
      return `<g class="p-tail"${delay ? ` style="animation-delay:${delay}"` : ''}><path d="${poly(out)}Z" fill="url(#${grad})" ${K}/>`
        + `<path d="${smooth(L.slice(2, -3).map(([x, y], i) => [x - S[i + 2].nx * 2.4, y - S[i + 2].ny * 2.4]))}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".75" stroke-linecap="round"/>`;
    };
    const tails = tail([[52, 72], [38, 68], [26, 58], [19, 42]], tA, '') + flame(19, 40, -14, 26, 8) + '</g>'
      + tail([[52, 83], [36, 86], [20, 82], [11, 71]], tB, '-1.2s') + flame(11, 70, -50, 24, 7.4) + '</g>';
    const body = `${_qsh(30)}<g class="p-hop"><g class="p-body">
      ${tails}
      ${leg('M46 88Q35 96 40 106L41 117', 'M41 110L41 117')}${leg('M68 94L66 106L68 117', 'M67 110L68 117')}
      <path d="M28 78C32 62 56 60 74 66C90 70 92 86 80 94C66 101 40 102 30 91C25 87 25 82 28 78Z" fill="url(#${fr})" ${K}/>
      <path d="M36 70c6-4 14-6 22-5" stroke="#fff" stroke-width="2.6" fill="none" opacity=".7" stroke-linecap="round"/>
      <path d="M62 66c7 1 12 3 15 6C74 70 68 69 62 66Z" fill="${RED}" ${k}/><path d="M50 65c5 0 8 1 11 3C57 67 53 66 50 65Z" fill="${RED}" ${k}/>
      <path d="M36 86C34 78 42 72 49 76C55 80 50 88 44 86C40 84 42 80 45 80" stroke="${RED}" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${leg('M52 92Q43 99 49 107L51 117', 'M50 110L51 117')}${leg('M79 94L81 106L83 117', 'M82 110L83 117')}
      <path d="M80 78l9 3-6 5 8 3-9 3 5 6-11-3Z" fill="#fff" ${k}/>
      <path d="M85 68C90 80 99 82 101 76" stroke="#b81e1e" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <g ${_vb} transform="translate(94 78) rotate(8)"><rect x="-4.6" y="0" width="9.2" height="15" rx="1" fill="url(#${pp})" stroke="#6a2a14" stroke-width="1.2"/><path d="M-2.4 2v11M2.4 2v11" stroke="#d8281e" stroke-width="1.5" stroke-linecap="round"/><path d="M-3.4 5.2h6.8M-3.4 9h6.8" stroke="#2a1a1a" stroke-width="1" opacity=".8"/></g>
      <path d="M80 54L78 24 98 46Z" fill="url(#${fr})" ${K}/><path d="M83.4 47L82.6 32l9.4 11.6Z" fill="${RED}"/>
      <path d="M97 46L110 22 116 52Z" fill="url(#${fr})" ${K}/><path d="M100.6 46L109 31l3.4 15.6Z" fill="${RED}"/>
      <path d="M76 60C76 44 96 38 107 47L125 62C128 66 124 71 118 71L103 75C90 83 76 78 76 60Z" fill="url(#${fr})" ${K}/>
      <path d="M92 76l-6 8 9-3 3 6 4-9Z" fill="#fff" ${k}/><path d="M77 62l-7 4 8 1-5 6 9-3Z" fill="#fff" ${k}/><path d="M88 52l-5 3 5 .6Z" fill="#fff" ${k}/>
      <path d="M96 48l4.4 6-4.4 5.4-4.4-5.4Z" fill="${RED}" ${k}/>
      <path d="M101 62C97 68 96 73 96 77M108 63C106 69 105 72 105 75" stroke="${RED}" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      <g class="p-eye"><path d="M93 59Q101 51 112 57Q103 64 93 59Z" fill="url(#${am})" stroke="#4a1a0a" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="103" cy="58" rx="1.5" ry="3.6" fill="#2a0a04"/><circle cx="101.4" cy="56.4" r="1.1" fill="#fff"/><path d="M92 59Q101 49 113 56" stroke="#2a0a04" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
      <ellipse cx="124" cy="64.4" rx="3.4" ry="2.7" fill="#1a0a06"/><circle cx="123" cy="63.4" r=".9" fill="#fff"/>
      <path class="p-jaw" d="M122 69Q112 77 98 72" stroke="#4a1a0a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    </g></g>
    <g class="p-glow">${flame(36, 38, 10, 15, 5, false)}${flame(112, 32, -12, 13, 4.4, false)}${flame(60, 26, 4, 10, 3.4, false)}</g>`;
    return _msvg('kitsou', defs, body);
  }

  /* =====================================================================
     TENGU CORBEAU — moine-corbeau : masque rouge à long nez, crinière blanche, aile en éventail, éventail de plumes
     ===================================================================== */
  function tengu() {
    const rb = _q(), bk = _q(), rd = _q(), fe = _q(), wd = _q(), wh = _q(), gd = _q(), nz = _q();
    const defs = _qlg(rb, [[0, '#5a4c78'], [1, '#14101e']], 0, 0, 1, 1)
      + _qlg(bk, [[0, '#6a6a96'], [.5, '#2a2640'], [1, '#0c0a16']], 0, 0, 1, 1)
      + _qlg(rd, [[0, '#ff7a52'], [.6, '#e03a22'], [1, '#8a1212']], 0, 0, 1, 1)
      + _qlg(fe, [[0, '#7c7cb4'], [.55, '#2a2842'], [1, '#0a0a16']], 0, 0, 0, 1)
      + _qlg(wd, [[0, '#c89a62'], [1, '#6a4420']], 0, 0, 0, 1)
      + _qrg(wh, [[0, '#ffffff'], [.6, '#eef0f8'], [1, '#aab0c8']], .4, .3, .9)
      + _qlg(gd, [[0, '#fff0a0'], [1, '#c8861a']], 0, 0, 0, 1)
      + _qrg(nz, [[0, '#ff9a72'], [.55, '#e83a22'], [1, '#8a1214']], .3, .25, 1);
    const K = 'stroke="#1a0f16" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
    const k = 'stroke="#1a0f16" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    const feat = (x, y, rot, len, w, g = fe, extra = '') => `<g ${_vb} transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0C${w * .6} ${-len * .3} ${w * 1.25} ${-len * .62} ${w * .45} ${-len * .95}L0 ${-len}L${-w * .45} ${-len * .95}C${-w * 1.25} ${-len * .62} ${-w * .6} ${-len * .3} 0 0Z" fill="url(#${g})" stroke="#0a0810" stroke-width="1.6" stroke-linejoin="round"/><path d="M0 -3V${-len + 4}" stroke="#b8b8e8" stroke-width="1" opacity=".55" stroke-linecap="round"/>${extra}</g>`;
    const wing = `<g class="p-wing">${[[-128, 32], [-108, 40], [-88, 44], [-68, 44], [-48, 40], [-28, 34]].map(([r, L]) => feat(62, 60, r, L, 6.2, fe, `<path d="M-3 ${-L + 5}Q0 ${-L + 1} 3 ${-L + 5}" stroke="#fff" stroke-width="1.8" fill="none" opacity=".75" stroke-linecap="round"/>`)).join('')}</g>`;
    const pom = (x, y) => `<circle cx="${x}" cy="${y}" r="4.6" fill="url(#${wh})" stroke="#2a2438" stroke-width="1.4"/><path d="M${x - 3.4} ${y - 1}l-1.8-1M${x + 3.4} ${y - 1}l1.8-1M${x} ${y - 4.4}v-1.8M${x - 2.6} ${y + 3}l-1.4 1.4M${x + 2.6} ${y + 3}l1.4 1.4" stroke="#2a2438" stroke-width="1.1" stroke-linecap="round"/><ellipse cx="${x - 1.2}" cy="${y - 1.6}" rx="1.4" ry="1" fill="#fff"/>`;
    const geta = (x, big) => `<path d="M${x + 1} ${116}v-8M${x + 17} ${116}v-8" stroke="#1a0f16" stroke-width="7" stroke-linecap="butt"/><path d="M${x + 1} 116v-8M${x + 17} 116v-8" stroke="url(#${wd})" stroke-width="4.4"/><rect x="${x - 4}" y="106" width="${big ? 28 : 26}" height="6" rx="2.4" fill="url(#${wd})" ${K}/><path d="M${x} 108.4h${big ? 22 : 20}" stroke="#ffe0a8" stroke-width="1" opacity=".6" stroke-linecap="round"/><path d="M${x + 6} 106c2-6 8-6 10 0" stroke="#e03a22" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    const mane = `<path d="M66 16L48 10 54 22 34 20 48 31 28 38 46 42 33 54 52 50 47 64 63 54Z" fill="url(#${wh})" ${K}/><path d="M50 22l-10-1M46 36l-10 2M50 47l-9 5" stroke="#8a90ac" stroke-width="1.2" opacity=".7" stroke-linecap="round"/>`;
    const sleeve = `<g class="p-limb">
        <path d="M76 54C92 50 106 60 104 76L94 77C92 68 86 64 76 66Z" fill="url(#${rb})" ${K}/>
        <path d="M95 69l10 1.6L103 80 93 78Z" fill="url(#${rd})" ${k}/>
        <path d="M93.4 79c-1.6 4 0 7.6 3.6 8 3.6.2 6-2.6 5.4-6.6Z" fill="#e8402a" ${k}/>
        <g ${_vb} transform="translate(98 74)">${[-52, -26, 0, 26, 52].map((r, i) => feat(0, 0, r, 31 - Math.abs(i - 2) * 3, 5.2, fe, `<path d="M-2 ${-24}Q0 ${-27} 2 ${-24}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".7"/>`)).join('')}<circle r="3.4" fill="url(#${rd})" ${k}/></g>
      </g>`;
    const body = `${_qsh(32)}<g class="p-hop"><g class="p-body">
      ${wing}
      ${geta(42, false)}${geta(70, true)}
      <path d="M44 78C42 90 40 100 38 108H92C90 100 87 90 84 78Z" fill="url(#${rd})" ${K}/>
      <path d="M52 82l-3 24M60 82l-1 24M68 82l1 24M76 82l3 24" stroke="#7a1010" stroke-width="1.4" opacity=".6" stroke-linecap="round"/><path d="M38.6 103h53.6" stroke="#1a0f16" stroke-width="4"/><path d="M39 100.6h52.8" stroke="#e8c24a" stroke-width="1.4"/>
      <path d="M46 52C43 62 43 72 45 80H84C85 72 85 62 82 52C74 46 54 46 46 52Z" fill="url(#${rb})" ${K}/>
      <path d="M58 48L65 68 74 48" fill="#f4f0e8" stroke="#1a0f16" stroke-width="1.6" stroke-linejoin="round"/><path d="M60 50l5 14 6-14" fill="none" stroke="#e03a22" stroke-width="1.6" stroke-linejoin="round"/>
      ${pom(66, 60)}${pom(66, 70)}
      <path d="M44 74h42v8H44Z" fill="url(#${gd})" ${K}/><path d="M46 76.4h38" stroke="#fff6c0" stroke-width="1.2" opacity=".7"/>
      <path d="M62 74c-6 0-8 8-6 12 4-2 7-6 6-12ZM70 74c6 0 8 8 6 12-4-2-7-6-6-12Z" fill="url(#${rd})" ${k}/>
      <path d="M44 56c-6 2-6 10 0 12 3-1 5-6 4-10ZM86 56c6 2 6 10 0 12-3-1-5-6-4-10Z" fill="url(#${bk})" ${k}/>
      <path d="M47 52l-8 6 8 2-5 7 9-3Z M83 52l8 6-8 2 5 7-9-3Z" fill="url(#${fe})" ${k}/>
      <path d="M52 50l-3 10 5-4 2 8 4-9 3 9 3-9 3 9 4-8 2 8 5-4-3-10Z" fill="url(#${fe})" ${K}/><path d="M56 52l-1 6M62 52v7M70 52v7M76 52l1 6" stroke="#9a9ad0" stroke-width="1" opacity=".5" stroke-linecap="round"/>
      ${mane}
      <path d="M58 24C58 12 66 8 74 10C82 12 84 20 82 26Z" fill="url(#${bk})" ${K}/>
      <path d="M56 22l2-10 8 5-1-9 8 4 2-7 6 7 5-5-1 10Z" fill="url(#${fe})" ${k}/>
      <path d="M58 40C56 26 66 20 76 22C86 24 88 36 84 46C82 54 72 56 66 54C60 52 58 46 58 40Z" fill="url(#${nz})" ${K}/>
      <path d="M62 24l-2 6 7-4Z" fill="#fff" opacity=".0"/>
      <path d="M62 36c0 6 2 10 6 12" stroke="#7a0e12" stroke-width="1.4" fill="none" opacity=".5" stroke-linecap="round"/>
      <path d="M78 33C90 32 102 37 110 47C102 51 90 50 80 46Z" fill="url(#${nz})" ${K}/>
      <path d="M81 35.4C91 35 100 38.6 106 44" stroke="#ffc0a0" stroke-width="2" fill="none" opacity=".75" stroke-linecap="round"/><ellipse cx="106.6" cy="46.4" rx="1.4" ry="1.1" fill="#3a0608"/>
      <g class="p-eye"><path d="M66 32Q74 25 83 30Q76 37 66 32Z" fill="url(#${gd})" stroke="#1a0f16" stroke-width="1.6" stroke-linejoin="round"/><circle cx="76" cy="31.4" r="2.6" fill="#1a0408"/><circle cx="75.2" cy="30.6" r=".9" fill="#fff"/></g>
      <path d="M60 28C66 18 80 18 88 26C82 25 76 27 71 32C67 30 63 29 60 28Z" fill="url(#${wh})" ${k}/><path d="M64 26l-4-3M70 23l-1-4M77 22l1-4M84 25l4-2" stroke="#e8ecf8" stroke-width="1.4" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M68 50Q78 56 88 49" stroke="#1a0f16" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M73 52.4l1.4 3.4 2-3ZM81 52l1.4 3.4 2-3Z" fill="#fff" stroke="#1a0f16" stroke-width=".8" stroke-linejoin="round"/></g>
      ${sleeve}
    </g></g>`;
    return _msvg('tengu', defs, body);
  }

  /* =====================================================================
     TANUKOUI SAN — énorme tanuki jovial et menaçant (gros monstre de la zone)
     ===================================================================== */
  function tanukoui() {
    const fu = _q(), bl = _q(), sd = _q(), hat = _q(), gr = _q(), lf = _q(), rp = _q(), mk = _q(), cp = _q();
    const defs = _qrg(fu, [[0, '#c8a57c'], [.55, '#8c6a46'], [1, '#43301e']], .4, .28, .95)
      + _qrg(bl, [[0, '#fff8e0'], [.6, '#f2dfb2'], [1, '#c8a870']], .4, .3, .95)
      + _qlg(sd, [[0, '#4a3624'], [1, '#1a100a']], 0, 0, 0, 1)
      + _qlg(hat, [[0, '#fbe9a8'], [.5, '#e0b85a'], [1, '#8a6420']], 0, 0, 1, 1)
      + _qlg(gr, [[0, '#f0b050'], [.5, '#b8701e'], [1, '#6a380c']], 0, 0, 1, 1)
      + _qlg(lf, [[0, '#a8f070'], [1, '#2f9a3a']], 0, 1, 0, 0) + _qlg(rp, [[0, '#f2dca0'], [1, '#a8823c']], 0, 0, 0, 1)
      + _qlg(mk, [[0, '#4a3624'], [1, '#150c08']], 0, 0, 1, 1) + `<clipPath id="${cp}"><path d="M30 100C18 98 8 86 10 70C12 62 20 64 22 70C24 80 30 84 40 86Z"/></clipPath>`;
    const K = 'stroke="#2a1a0e" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round"';
    const k = 'stroke="#2a1a0e" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
    const foot = x => `<path d="M${x - 14} 114C${x - 14} 106 ${x - 6} 104 ${x} 104C${x + 8} 104 ${x + 16} 106 ${x + 16} 114C${x + 16} 118 ${x - 14} 118 ${x - 14} 114Z" fill="url(#${sd})" ${K}/><path d="M${x - 8} 114v3M${x} 115v3M${x + 8} 114v3" stroke="#f6e8c8" stroke-width="2.6" stroke-linecap="round"/>`;
    const tail = `<g class="p-tail"><path d="M32 100C18 98 8 86 10 70C12 62 20 64 22 70C24 80 30 84 40 86Z" fill="url(#${fu})" ${K}/>
        <g clip-path="url(#${cp})"><path d="M6 76c10 2 20 0 30-6M6 86c10 2 22 0 32-4M12 96c8 0 16-2 24-6" stroke="#2a1a0e" stroke-width="4.4" fill="none" opacity=".8" stroke-linecap="round"/></g>
        <path d="M13 70c0-5 5-6 7-3" stroke="#f2e2c0" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
    const gourd = `<path d="M31 84l4 12" stroke="#7a4a1c" stroke-width="2" stroke-linecap="round"/><g ${_vb} transform="translate(27 91) rotate(14)"><path d="M-5 -4C-5 -9 5 -9 5 -4C5 0 11 2 11 10C11 18 5 22 0 22C-5 22 -11 18 -11 10C-11 2 -5 0 -5 -4Z" fill="url(#${gr})" ${K}/><ellipse cx="0" cy="-9" rx="3.4" ry="2.2" fill="#d8b878" ${k}/><path d="M-5.4 2c3 2.4 7.8 2.4 10.8 0" stroke="#e03a22" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-6 8c-1 4 0 8 3 11" stroke="#fff0c0" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/></g>`;
    const earL = `<circle cx="67" cy="44" r="8" fill="url(#${sd})" ${K}/><circle cx="67.4" cy="45" r="4" fill="#d8b896"/>`;
    const earR = `<circle cx="110" cy="42" r="8" fill="url(#${sd})" ${K}/><circle cx="110" cy="43" r="4" fill="#d8b896"/>`;
    const body = `${_qsh(42)}<g class="p-hop"><g class="p-body">
      ${tail}
      ${foot(44)}${foot(82)}
      <path d="${_fur(60, 84, 33, 30, 16, 3.4, .1)}" fill="url(#${fu})" ${K}/>
      <ellipse cx="62" cy="92" rx="24" ry="23" fill="url(#${bl})" stroke="#8a6a3c" stroke-width="1.8"/>
      <path d="M44 84c8 8 28 8 36 0M42 96c10 9 30 9 40 0M46 106c8 5 24 5 32 0" stroke="#b8985c" stroke-width="1.4" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M50 78c4-3 10-4 16-3" stroke="#fff" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/><ellipse cx="63" cy="96" rx="2.4" ry="1.6" fill="#8a6a3c" opacity=".7"/>
      <path d="M31 78Q62 98 94 76" stroke="#5a3a14" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M31 78Q62 98 94 76" stroke="url(#${rp})" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M31 78Q62 98 94 76" stroke="#7a5a22" stroke-width="1.4" stroke-dasharray="2.4 3.4" fill="none"/>
      ${gourd}
      <g ${_vb} transform="translate(0 4)">${earL}${earR}
      <path d="${_fur(88, 49, 22, 17, 12, 3, 0)}" fill="url(#${fu})" ${K}/>
      <path d="M80 38Q92 33 103 45Q101 57 93 60Q86 54 80 38Z" fill="url(#${mk})" ${K}/>
      <path d="M96 54C100 46 116 46 119 54C121 62 112 66 104 66C97 66 94 60 96 54Z" fill="url(#${bl})" ${K}/>
      <ellipse cx="116.6" cy="52.4" rx="4.2" ry="3.2" fill="#1a0e08"/><ellipse cx="115.4" cy="51.2" rx="1.4" ry=".9" fill="#fff" opacity=".8"/>
      <g class="p-eye"><path d="M87 47Q94 41 103 46Q95 52 87 47Z" fill="#ffd028" stroke="#150c08" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="96" cy="46.4" rx="1.8" ry="3" fill="#150c08"/><circle cx="94.8" cy="45" r="1" fill="#fff"/></g>
      <path d="M84 40Q93 36 104 42" stroke="#150c08" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M118 57Q109 70 93 62" stroke="#2a1a0e" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M104 62.6l1.6 5 2.4-4.2ZM112 59.4l1.2 4.4 2.4-3.6Z" fill="#fff" stroke="#2a1a0e" stroke-width=".9" stroke-linejoin="round"/></g>
      </g>
      <path d="M57 35L88 13L121 36Q104 43 88 41Q72 43 57 35Z" fill="url(#${hat})" ${K}/>
      <path d="M88 13L68 40M88 13L80 42M88 13L96 42M88 13L110 40M88 13L58 36M88 13L120 36" stroke="#8a6420" stroke-width="1.2" opacity=".6" stroke-linecap="round"/>
      <path d="M62 37Q88 45 117 37" stroke="#8a6420" stroke-width="3.4" fill="none" opacity=".55" stroke-linecap="round"/>
      <path d="M74 28Q88 34 103 28" stroke="#d83a22" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M60 41Q64 56 84 60" stroke="#d83a22" stroke-width="1.6" fill="none" opacity=".0"/>
      <g ${_vb} transform="translate(88 14) rotate(-24)"><path d="M0 0C-9 -2 -12 -12 -4 -20C2 -12 6 -7 0 0Z" fill="url(#${lf})" ${k}/><path d="M0 0V-14" stroke="#e8ffc0" stroke-width="1" opacity=".8"/></g>
      <g class="p-limb"><path d="M84 70Q104 76 110 62" stroke="#2a1a0e" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M84 70Q104 76 110 62" stroke="url(#${fu})" stroke-width="10" fill="none" stroke-linecap="round"/>
        <circle cx="111" cy="58" r="9" fill="url(#${fu})" ${K}/><ellipse cx="110" cy="61" rx="5" ry="4" fill="#c8a07a" opacity=".8"/><path d="M104 52l-3-7M111 50l0-8M117 53l4-6" stroke="#f6e8c8" stroke-width="2.8" stroke-linecap="round"/></g>
    </g></g>`;
    return _msvg('tanukoui', defs, body);
  }

  /* =====================================================================
     RAINETTE LOTUS — grenouille d'étang sur son nénuphar, fleur de lotus sur la tête
     ===================================================================== */
  function rainette() {
    const fg = _q(), bl = _q(), pd = _q(), pt = _q(), ey = _q(), th = _q(), ct = _q();
    const defs = _qrg(fg, [[0, '#c8ffd8'], [.45, '#4fd0a4'], [1, '#12786c']], .4, .28, .95)
      + _qrg(bl, [[0, '#fbffd8'], [1, '#bfe8a0']], .4, .3, .95)
      + _qlg(pd, [[0, '#7ee07a'], [.6, '#2fa04a'], [1, '#17683a']], 0, 0, 1, 1)
      + _qlg(pt, [[0, '#fff0f6'], [.4, '#ffb0d2'], [1, '#e04a92']], 0, 1, 0, 0)
      + _qrg(ey, [[0, '#fff6a0'], [.6, '#ffc02e'], [1, '#c8700e']], .4, .3, .9)
      + _qrg(th, [[0, '#ffffd0'], [1, '#d8f090']], .4, .3, .95) + _qrg(ct, [[0, '#fff6a0'], [1, '#e0a010']], .4, .3, .9);
    const K = 'stroke="#0e4a44" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';
    const k = 'stroke="#0e4a44" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"';
    const petal = (rot, len, w, back) => `<g ${_vb} transform="translate(0 0) rotate(${rot})"><path d="M0 0C${w} ${-len * .28} ${w * 1.1} ${-len * .75} 0 ${-len}C${-w * 1.1} ${-len * .75} ${-w} ${-len * .28} 0 0Z" fill="url(#${pt})" stroke="#8a1a58" stroke-width="1.4" stroke-linejoin="round" opacity="${back ? .96 : 1}"/><path d="M0 -4Q${w * .3} ${-len * .5} 0 ${-len + 4}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/></g>`;
    const lotus = `<g ${_vb} transform="translate(60 52) rotate(-10)">${[-62, 62, -40, 40].map(r => petal(r, 20, 7.4, true)).join('')}${[-20, 20, 0].map(r => petal(r, 25, 8.4, false)).join('')}<ellipse cx="0" cy="1" rx="6" ry="3" fill="url(#${ct})" ${k}/><circle cx="-2" cy="0" r=".9" fill="#a85a0a"/><circle cx="2" cy="0.4" r=".9" fill="#a85a0a"/></g>`;
    const pad = `<ellipse cx="64" cy="120" rx="58" ry="7" fill="none" stroke="#e8fff8" stroke-width="1.4" opacity=".4"/><ellipse cx="64" cy="119" rx="46" ry="5.4" fill="none" stroke="#e8fff8" stroke-width="1.2" opacity=".3"/>
      <path d="M64 114.6L16.7 112.6A48 11 0 1 1 16.7 116.6Z" fill="#12503a" stroke="#0a3424" stroke-width="2"/>
      <path d="M64 111L16.7 109A48 11 0 1 1 16.7 113Z" fill="url(#${pd})" stroke="#0e4a2a" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M64 111L30 104M64 111L52 101M64 111L78 100M64 111L100 105M64 111L100 117M64 111L78 121M64 111L50 121M64 111L28 118" stroke="#17703a" stroke-width="1.2" opacity=".5" stroke-linecap="round"/><path d="M34 106q18-6 40-5" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>`;
    const toes = (x, y, dir = 1) => `<path d="M${x} ${y}l${dir * 6} 2M${x} ${y + 2}l${dir * 6} 4M${x} ${y + 4}l${dir * 5} 6" stroke="#0e4a44" stroke-width="5" stroke-linecap="round" opacity="0"/>`;
    const eye = (cx, cy, r) => `<g class="p-eye"><circle cx="${cx}" cy="${cy}" r="${r + 2.6}" fill="url(#${fg})" ${K}/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${ey})" stroke="#7a3a08" stroke-width="1.4"/><ellipse cx="${cx + 1}" cy="${cy + .4}" rx="${r * .78}" ry="${r * .28}" fill="#1a0a06"/><circle cx="${cx - r * .3}" cy="${cy - r * .38}" r="${r * .28}" fill="#fff"/></g>`;
    const drops = [[112, 38, 1], [18, 62, .8], [100, 18, .7]].map(([x, y, s]) => `<g ${_vb} transform="translate(${x} ${y}) scale(${s})"><path d="M0 -7C4 -2 6 1 6 3.4C6 7 3 8.6 0 8.6C-3 8.6 -6 7 -6 3.4C-6 1 -4 -2 0 -7Z" fill="#bff4f0" stroke="#2a8a9a" stroke-width="1.3" stroke-linejoin="round"/><ellipse cx="-1.8" cy="3" rx="1.2" ry="2" fill="#fff" opacity=".85"/></g>`).join('');
    const body = `<g class="p-hop"><g class="p-body">
      ${pad}
      <path d="M28 106C28 94 40 88 52 92L66 104L68 110C58 108 44 108 30 110Z" fill="url(#${fg})" ${K}/>
      <path d="M26 98C26 80 40 70 58 70C78 70 90 82 88 98C86 108 70 112 54 110C38 110 26 106 26 98Z" fill="url(#${fg})" ${K}/>
      <path d="M40 84c3-3 8-5 14-5M62 76c5 0 9 2 12 4" stroke="#fff" stroke-width="2.4" fill="none" opacity=".5" stroke-linecap="round"/>
      <g fill="#0e6a5a" opacity=".5"><circle cx="46" cy="90" r="3"/><circle cx="58" cy="84" r="2.4"/><circle cx="36" cy="98" r="2.6"/><circle cx="70" cy="90" r="2"/></g>
      <path d="M44 104C46 112 64 112 78 106L82 100C72 102 58 100 44 104Z" fill="url(#${bl})" opacity=".0"/>
      <path d="M26 112c-2-4 2-8 8-6l28 3c6 1 10 4 10 8s-6 4-10 3l-14-1c-6 0-12-2-22-7Z" fill="url(#${fg})" ${K}/><path d="M60 108l9 3M58 111l10 5M54 113l8 7" stroke="#0e4a44" stroke-width="3.4" stroke-linecap="round" opacity="0"/>
      <path d="M64 109l10 1.4M62 112.4l10 3.4" stroke="#0e4a44" stroke-width="1.6" stroke-linecap="round"/>
      ${eye(70, 58, 6.4)}
      <path d="M62 74C64 62 78 54 94 56C108 58 118 68 116 74C114 80 104 82 94 82C78 84 62 84 62 74Z" fill="url(#${fg})" ${K}/>
      <path d="M62 78C74 88 100 88 116 72" stroke="#0e4a44" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <circle cx="112" cy="68" r="1.5" fill="#0e4a44"/><circle cx="108" cy="66" r="1.2" fill="#0e4a44" opacity=".7"/>
      ${eye(92, 56, 7.6)}
      <path d="M72 66c8-4 22-4 34 0" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M80 82C80 92 90 96 100 92C108 88 110 82 108 80C100 84 90 86 80 82Z" fill="url(#${th})" ${K}/><path d="M86 86q8 3 16 0" stroke="#8aa850" stroke-width="1.2" fill="none" opacity=".7" stroke-linecap="round"/></g>
      ${lotus}
      <path d="M80 92C84 100 88 104 90 108" stroke="#0e4a44" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M80 92C84 100 88 104 90 108" stroke="url(#${fg})" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M86 108l6-1 6 2M88 110l6 2 6 4M84 109l2 6" stroke="#0e4a44" stroke-width="5.4" stroke-linecap="round"/><path d="M86 108l6-1 6 2M88 110l6 2 6 4M84 109l2 6" stroke="#4fd0a4" stroke-width="2.6" stroke-linecap="round"/>
    </g></g>
    <g class="p-glow">${drops}</g>`;
    return _msvg('rainette_lotus', defs, body);
  }

  /* =====================================================================
     TÊTE DE DRAGON (partagée Dragon de Jade / Carpe-Dragon) — repère local : origine = base du cou, tournée vers la droite
     ===================================================================== */
  function dhead(P) {
    const K = `stroke="${P.ol}" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"`;
    const k = `stroke="${P.ol}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;
    const fl = (x, y, r, h, w) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${r})"><path d="${flameP(h, w)}" fill="url(#${P.mn})" ${k}/></g>`;
    const mane = [[6, -12, -58, 20, 6.6], [2, -8, -80, 25, 7.6], [-1, -2, -98, 25, 7.4], [-1, 4, -118, 20, 6.4]].map(a => fl(...a)).join('');
    const horn = (d, w) => `<path d="${d}" stroke="${P.ol}" stroke-width="${w + 3}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${P.hc}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
    const horns = `<g opacity=".85">${horn('M16 -14C18 -20 15 -24 9 -26', 3)}</g>`
      + horn('M10 -14C9 -21 3 -25 -5 -26', 3.8) + horn('M6 -20C9 -24 14 -26 19 -25', 2.6) + horn('M-1 -24C-1 -28 1 -31 5 -32', 2.4);
    const whisk = `<path d="M37 -4C46 0 47 11 40 17C34 22 27 22 22 29" stroke="${P.ol}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M37 -4C46 0 47 11 40 17C34 22 27 22 22 29" stroke="${P.wc}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M33 -9C38 -16 44 -15 45 -9" stroke="${P.ol}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M33 -9C38 -16 44 -15 45 -9" stroke="${P.wc}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    return `${P.antler ? horns : ''}${mane}
      <path d="M0 0L30 -3L43 19L0 16Z" fill="#4a0a14"/><path d="M12 12C22 10 33 12 40 17C31 20 20 17 12 12Z" fill="#ff7a8a" ${k}/>
      <g class="p-jaw"><path d="M-1 9C9 9 22 8 31 6C38 10 44 17 44 22C44 25 39 25 35 24C23 23 10 20 -1 16Z" fill="url(#${P.bl})" ${K}/>
        <path d="M34 8.4l1-4.6 1.8 4.6ZM40.4 13l.8-4.2 1.7 4.2Z" fill="#fff" ${k} stroke-width=".8"/><path d="M5 14c8 1.4 18 2.4 28 2.4" stroke="#fff" stroke-width="1.2" opacity=".35" fill="none" stroke-linecap="round"/></g>
      <path d="M-6 -10C0 -17 12 -18 21 -15C27 -13 31 -14 36 -15C41 -15 44 -10 41 -6C39 -3 34 -3 30 -3L20 0C12 2 4 4 -6 6Z" fill="url(#${P.sk})" ${K}/>
      <path d="M29 -3.6l1.2 5 1.8-5ZM35 -4.4l1 4.4 1.6-4.4Z" fill="#fff" ${k} stroke-width=".8"/>
      <path d="M1 -3q3-4 7 0M8 -6q3-4 7 0M-2 2q3-4 7 0" stroke="${P.ol}" stroke-width="1.1" fill="none" opacity=".35" stroke-linecap="round"/>
      <path d="M2 -12C8 -17 16 -17 22 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".4" stroke-linecap="round"/>
      <ellipse cx="38.4" cy="-10.6" rx="1.7" ry="1.1" fill="${P.ol}"/>
      <g class="p-eye"><path d="M10 -8.6Q16 -16 25 -12Q19 -4.6 10 -8.6Z" fill="url(#${P.ey})" stroke="${P.ol}" stroke-width="1.5" stroke-linejoin="round"/><ellipse cx="17.6" cy="-9.4" rx="1.5" ry="3.4" fill="#1a0408"/><circle cx="16" cy="-11.2" r="1" fill="#fff"/></g>
      <path d="M7 -12Q16 -21 28 -13" stroke="${P.ol}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      ${whisk}`;
  }

  /* =====================================================================
     DRAGON DE JADE — boss : dragon oriental en S, écailles de jade, ventre doré, perle luisante
     ===================================================================== */
  function dragonJade() {
    const jd = _q(), hd = _q(), bg = _q(), mn = _q(), hn = _q(), pr = _q(), cl = _q(), ey = _q(), bl = _q();
    const defs = _qlg(jd, [[0, '#9af7c6'], [.45, '#2fc08a'], [1, '#0a5e4e']], 0, 0, 1, 1)
      + _qlg(hd, [[0, '#a8ffd4'], [.5, '#36c890'], [1, '#0e7a5e']], 0, 0, 0, 1)
      + _qlg(bg, [[0, '#fff6b8'], [.55, '#f2c34a'], [1, '#b8741a']], 0, 0, 0, 1)
      + _qlg(bl, [[0, '#fff3b0'], [1, '#e0a43a']], 0, 0, 0, 1)
      + _qlg(mn, [[0, '#ffc060'], [.5, '#f0501e'], [1, '#a01418']], 0, 1, 0, 0)
      + _qlg(hn, [[0, '#fff0a8'], [1, '#c8861a']], 0, 0, 0, 1)
      + _qrg(pr, [[0, '#f4fff0'], [.35, '#8affc8'], [1, '#10a874']], .38, .34, .8)
      + _qrg(cl, [[0, '#ffffff'], [1, '#b4d8dc']], .4, .3, .9)
      + _qrg(ey, [[0, '#fff6a0'], [.6, '#ffc02e'], [1, '#c8700e']], .4, .3, .9);
    const OL = '#06382e';
    const K = `stroke="${OL}" stroke-width="2.3" stroke-linejoin="round" stroke-linecap="round"`;
    const k = `stroke="${OL}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"`;
    const PTS = [[6, 100], [18, 110], [40, 113], [64, 110], [86, 105], [104, 91], [98, 74], [78, 71], [54, 71], [30, 70], [14, 60], [12, 48], [26, 37], [48, 33], [68, 33], [80, 33]];
    const S = spine(PTS, 8);
    const W = u => (3 + 20 * Math.pow(Math.min(1, u / .3), .8)) * (1 - .3 * Math.pow(Math.max(0, (u - .62) / .38), 1.2));
    const { L, R } = sides(S, W);
    const bodyD = poly([...L, ...R.slice().reverse()]) + 'Z';
    // ventre doré : toujours côté bas (s = signe de ny), absent dans les virages
    const runs = []; let cur = null;
    S.forEach((p, i) => { const f = Math.abs(p.ny), s = p.ny >= 0 ? 1 : -1; if (f > .3 && p.u > .03 && p.u < .98) { if (!cur || cur.s !== s) { cur = { s, a: [] }; runs.push(cur); } cur.a.push(i); } else cur = null; });
    let belly = '', plates = '', hi = '';
    runs.forEach(r => {
      const o = [], n = [];
      r.a.forEach(i => { const p = S[i], h = W(p.u) / 2, f = Math.min(1, (Math.abs(p.ny) - .3) / .4), d = h * 2 * .44 * f; o.push([p.x + r.s * p.nx * h, p.y + r.s * p.ny * h]); n.push([p.x + r.s * p.nx * (h - d), p.y + r.s * p.ny * (h - d)]); });
      if (o.length < 3) return;
      belly += `<path d="${poly([...o, ...n.slice().reverse()])}Z" fill="url(#${bg})" stroke="#7a4a0c" stroke-width="1.2" stroke-linejoin="round"/>`;
      o.forEach((a, j) => { if (j % 2 === 1 && j < o.length - 1) plates += `M${f1(a[0])} ${f1(a[1])}L${f1(n[j][0])} ${f1(n[j][1])}`; });
      const up = r.a.map(i => { const p = S[i], h = W(p.u) / 2; return [p.x - r.s * p.nx * h * .5, p.y - r.s * p.ny * h * .5]; });
      hi += `<path d="${smooth(up)}" stroke="#e6fff2" stroke-width="2.4" fill="none" opacity=".45" stroke-linecap="round"/>`;
    });
    let spikes = '';
    S.forEach((p, i) => {
      if (i % 4 !== 2) return; const f = Math.abs(p.ny); if (f < .4 || p.u < .04 || p.u > .93) return;
      const s = p.ny >= 0 ? -1 : 1, h = W(p.u) / 2, sz = (5 + W(p.u) * .3) * Math.min(1, (f - .4) / .3);
      const bx = p.x + s * p.nx * (h - 1), by = p.y + s * p.ny * (h - 1);
      const tip = [bx + s * p.nx * sz - p.tx * sz * .9, by + s * p.ny * sz - p.ty * sz * .9], b1 = [bx - p.tx * 2.8, by - p.ty * 2.8], b2 = [bx + p.tx * 3.4, by + p.ty * 3.4];
      spikes += `<path d="M${f1(b2[0])} ${f1(b2[1])}Q${f1((tip[0] + b2[0]) / 2 + s * p.nx * 1)} ${f1((tip[1] + b2[1]) / 2 + s * p.ny * 1)} ${f1(tip[0])} ${f1(tip[1])}L${f1(b1[0])} ${f1(b1[1])}Z" fill="url(#${mn})" ${k}/>`;
    });
    let bands = '';
    S.forEach((p, i) => { if (i % 3 !== 1 || p.u < .05) return; const h = W(p.u) / 2; bands += `M${f1(L[i][0])} ${f1(L[i][1])}Q${f1(p.x + p.tx * h * .8)} ${f1(p.y + p.ty * h * .8)} ${f1(R[i][0])} ${f1(R[i][1])}`; });
    const leg = (x0, y0) => { const i = S.reduce((b, p, j) => (Math.hypot(p.x - x0, p.y - y0) < Math.hypot(S[b].x - x0, S[b].y - y0) ? j : b), 0), p = S[i], by = p.y + W(p.u) / 2 - 2;
      return `<g class="p-limb"><path d="M${f1(p.x)} ${f1(by)}C${f1(p.x + 3)} ${f1(by + 6)} ${f1(p.x - 3)} ${f1(by + 10)} ${f1(p.x - 4)} ${f1(by + 15)}" stroke="${OL}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${f1(p.x)} ${f1(by)}C${f1(p.x + 3)} ${f1(by + 6)} ${f1(p.x - 3)} ${f1(by + 10)} ${f1(p.x - 4)} ${f1(by + 15)}" stroke="#2fc08a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M${f1(p.x - 4)} ${f1(by + 14)}l-5 4M${f1(p.x - 4)} ${f1(by + 15)}l0 6M${f1(p.x - 4)} ${f1(by + 14)}l5 4" stroke="${OL}" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M${f1(p.x - 4)} ${f1(by + 14)}l-5 4M${f1(p.x - 4)} ${f1(by + 15)}l0 6M${f1(p.x - 4)} ${f1(by + 14)}l5 4" stroke="#f6d060" stroke-width="2" fill="none" stroke-linecap="round"/></g>`; };
    const cloud = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${cl})" stroke="#7aa8b0" stroke-width="1.4"/>`;
    const clouds = `<g opacity=".95">${cloud(8, 123, 8)}${cloud(20, 119, 10)}${cloud(33, 124, 8)}${cloud(98, 124, 8)}${cloud(110, 120, 10)}${cloud(122, 124, 7)}</g>`;
    const tuft = `<g class="p-tail"><g ${_vb} transform="translate(9 100) rotate(-20)"><path d="${flameP(21, 7.4)}" fill="url(#${mn})" ${k}/></g><g ${_vb} transform="translate(9 101) rotate(-52)"><path d="${flameP(15, 5.6)}" fill="url(#${mn})" ${k}/></g><g ${_vb} transform="translate(9 101) rotate(14)"><path d="${flameP(14, 5.4)}" fill="url(#${mn})" ${k}/></g></g>`;
    const head = `<g ${_vb} transform="translate(80 33)">${dhead({ ol: OL, sk: hd, bl: bl, mn, hn, hc: '#f0c040', wc: '#ffe27a', ey, antler: true })}</g>`;
    const pearl = `<g class="p-glow"><circle cx="117" cy="62" r="13" fill="#8affc8" opacity=".28"/><circle cx="117" cy="62" r="9.4" fill="url(#${pr})" stroke="#0a7a56" stroke-width="1.6"/><ellipse cx="114" cy="58.6" rx="3" ry="2" fill="#fff" opacity=".9"/><path d="M122 46l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2ZM108 74l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9Z" fill="#eafff4"/></g>`;
    const body = `<g class="p-hop"><g class="p-body">
      ${clouds}
      ${tuft}
      <g>${spikes}</g>
      <path d="${bodyD}" fill="url(#${jd})" ${K}/>
      ${belly}<path d="${plates}" stroke="#8a5410" stroke-width="1" fill="none" opacity=".55" stroke-linecap="round"/>
      <path d="${bands}" stroke="${OL}" stroke-width="1.1" fill="none" opacity=".35" stroke-linecap="round"/>
      ${hi}
      ${leg(54, 71)}${leg(30, 70)}
      ${head}
      ${pearl}
    </g></g>`;
    return _msvg('dragon_jade', defs, body, ' ms-fantome');
  }

  /* =====================================================================
     KOÏ CÉLESTE — carpe flottant dans les airs, nageoires-rubans, œil d'or lumineux
     ===================================================================== */
  function koiCeleste() {
    const bd = _q(), fn = _q(), tl = _q(), ha = _q(), ey = _q(), cl = _q(), cp = _q(), bb = _q();
    const defs = _qlg(bd, [[0, '#ffffff'], [.5, '#fff1de'], [1, '#f2c79a']], 0, 0, 0, 1)
      + _qlg(fn, [[0, '#ffd870'], [1, '#ff8a1e']], 0, 0, 1, 1)
      + _qlg(tl, [[0, '#ff7a20'], [1, '#ffe39a']], 1, .5, 0, .5)
      + _qrg(ha, [[0, 'rgba(255,230,140,.75)'], [1, 'rgba(255,230,140,0)']], .5, .5, .5)
      + _qrg(ey, [[0, '#ffffd0'], [.45, '#ffd028'], [1, '#d07a10']], .4, .35, .9)
      + _qrg(cl, [[0, '#ffffff'], [1, '#bcdcf0']], .4, .3, .9) + _qrg(bb, [[0, 'rgba(255,255,255,.55)'], [1, 'rgba(160,220,255,.25)']], .35, .3, .8)
      + `<clipPath id="${cp}"><path d="M22 72C34 58 58 50 84 52C104 54 118 62 118 74C118 86 102 96 80 96C56 96 34 86 22 72Z"/></clipPath>`;
    const OL = '#8a3a10';
    const K = `stroke="${OL}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
    const k = `stroke="${OL}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"`;
    let scales = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) { const x = 26 + c * 9.6 + (r % 2) * 4.8, y = 56 + r * 7; scales += `M${f1(x)} ${f1(y)}q4.8 5.6 9.6 0`; }
    const rays = (x, y, tips, c = '#d8641a') => tips.map(([a, b]) => `M${x} ${y}L${a} ${b}`).join('');
    const cloud = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${cl})" stroke="#8ab8d4" stroke-width="1.3"/>`;
    const clouds = `<g opacity=".95">${cloud(14, 119, 7)}${cloud(25, 114, 9)}${cloud(37, 119, 7)}${cloud(88, 120, 7)}${cloud(100, 115, 9)}${cloud(112, 120, 7)}</g>`;
    const bubbles = [[112, 36, 5.4], [100, 22, 3.6], [120, 20, 2.8], [18, 44, 4], [30, 28, 2.6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${bb})" stroke="#6ab8e0" stroke-width="1.2"/><path d="M${x - r * .55} ${y - r * .1}q.2-${r * .55} ${r * .6}-${r * .6}" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>`).join('');
    const body = `<g class="p-hop"><g class="p-body">
      ${clouds}
      <ellipse cx="68" cy="72" rx="62" ry="44" fill="url(#${ha})" class="p-glow"/>
      <g class="p-tail"><path d="M30 72C22 70 13 62 9 48C6 40 8 32 14 24C14 36 22 42 30 50C33 58 33 64 31 68Z" fill="url(#${tl})" ${K}/><path d="M30 74C22 78 13 86 11 98C10 104 13 110 19 114C19 104 25 98 33 92C35 86 33 80 31 76Z" fill="url(#${tl})" ${K}/>
        <path d="${rays(30, 70, [[11, 40], [16, 34], [22, 44], [26, 56]])}${rays(31, 76, [[14, 94], [18, 104], [24, 98], [28, 88]])}" stroke="#d8641a" stroke-width="1.1" opacity=".55" fill="none" stroke-linecap="round"/></g>
      <path d="M44 60C42 44 52 30 68 24C70 32 78 40 90 50C74 52 58 54 44 60Z" fill="url(#${fn})" ${K} opacity=".96"/>
      <path d="${rays(66, 54, [[56, 38], [66, 30], [76, 40], [84, 48]])}" stroke="#d8641a" stroke-width="1.1" opacity=".55" fill="none" stroke-linecap="round"/>
      <path d="M52 94C46 102 44 108 46 113C54 109 62 103 66 96Z" fill="url(#${fn})" ${K}/>
      <path d="M22 72C34 58 58 50 84 52C104 54 118 62 118 74C118 86 102 96 80 96C56 96 34 86 22 72Z" fill="url(#${bd})" ${K}/>
      <g clip-path="url(#${cp})">
        <path d="M40 62C54 50 82 48 96 54C92 64 76 68 60 68C48 68 38 66 40 62Z" fill="#ff8a1e"/>
        <path d="M30 76C38 70 46 72 50 78C46 86 36 86 30 76Z" fill="#ff8a1e"/>
        <path d="M56 71C64 66 74 66 80 71C74 77 62 77 56 71Z" fill="#e02a2a"/>
        <path d="M100 52C112 54 118 62 118 70C110 68 104 62 100 52Z" fill="#e02a2a"/>
        <path d="M50 56C60 50 74 50 84 53" stroke="#fff" stroke-width="2.2" fill="none" opacity=".5" stroke-linecap="round"/>
        <path d="${scales}" stroke="#a8561c" stroke-width="1" fill="none" opacity=".35" stroke-linecap="round"/>
        <path d="M30 86C50 98 90 100 112 84" stroke="#c8864a" stroke-width="5" fill="none" opacity=".25" stroke-linecap="round"/>
      </g>
      <path d="M22 72C34 58 58 50 84 52C104 54 118 62 118 74C118 86 102 96 80 96C56 96 34 86 22 72Z" fill="none" ${K}/>
      <path d="M92 60C86 68 86 80 92 90" stroke="${OL}" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
      <g class="p-wing"><path d="M88 78C76 82 62 94 56 108C68 104 80 98 90 90Z" fill="url(#${fn})" ${K}/><path d="M86 80L66 100M88 84L74 102M88 88L82 98" stroke="#d8641a" stroke-width="1" opacity=".55" fill="none" stroke-linecap="round"/></g>
      <path d="M117 75C124 77 126 85 121 92" stroke="${OL}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M117 75C124 77 126 85 121 92" stroke="#ffe27a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M115 78C121 84 119 94 112 98" stroke="${OL}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M115 78C121 84 119 94 112 98" stroke="#ffe27a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <g class="p-jaw"><path d="M112 70C120 70 124 76 119 80C116 81 113 79 111 76Z" fill="#ff7a3a" ${k}/></g>
      <g class="p-glow"><circle cx="103" cy="66" r="11" fill="#ffe27a" opacity=".45"/></g>
      <g class="p-eye"><circle cx="103" cy="66" r="6.4" fill="url(#${ey})" stroke="${OL}" stroke-width="1.6"/><circle cx="104.4" cy="66.4" r="2.8" fill="#4a1a04"/><circle cx="101.4" cy="63.6" r="1.7" fill="#fff"/></g>
    </g></g>
    <g class="p-glow">${bubbles}</g>`;
    return _msvg('koi_celeste', defs, body, ' ms-fantome');
  }

  /* =====================================================================
     HÉRON PÊCHEUR — héron gris-bleu, cou en S, poisson dans le bec, une patte levée
     ===================================================================== */
  function heron() {
    const bd = _q(), wg = _q(), nk = _q(), bk = _q(), wt = _q(), fs = _q();
    const defs = _qlg(bd, [[0, '#b8cce4'], [.55, '#8aa4c6'], [1, '#566e96']], 0, 0, 1, 1)
      + _qlg(wg, [[0, '#6a82aa'], [1, '#2c3a5c']], 0, 0, 0, 1)
      + _qlg(nk, [[0, '#ffffff'], [1, '#c8d6e6']], 0, 0, 1, 0)
      + _qlg(bk, [[0, '#ffe27a'], [1, '#e08a1a']], 0, 0, 0, 1)
      + _qrg(wt, [[0, '#7ee8e8'], [1, '#2aa0b8']], .5, .4, .8)
      + _qlg(fs, [[0, '#ffb04a'], [1, '#e8501e']], 0, 0, 0, 1);
    const OL = '#1c2540';
    const K = `stroke="${OL}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
    const k = `stroke="${OL}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"`;
    const NS = spine([[68, 62], [82, 55], [82, 42], [86, 30], [94, 23], [100, 20]], 8);
    const NW = u => 11 - 4.4 * u;
    const nd = sides(NS, NW), neckD = poly([...nd.L, ...nd.R.slice().reverse()]) + 'Z';
    const stripe = NS.filter(p => p.u > .1 && p.u < .94).map(p => [p.x + p.nx * NW(p.u) * .16, p.y + p.ny * NW(p.u) * .16]);
    const leg = (d, toes, w = 5.8) => `<path d="${d}" stroke="${OL}" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" stroke="#e0bc4a" stroke-width="${w - 2.6}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${toes}" stroke="${OL}" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="${toes}" stroke="#e0bc4a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    const feat = (x, y, r, len, w) => `<g ${_vb} transform="translate(${x} ${y}) rotate(${r})"><path d="${leafP(len, w)}" fill="url(#${wg})" ${k}/></g>`;
    const plume = (d, w) => `<path d="${d}" stroke="${OL}" stroke-width="${w + 1.6}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#fff" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
    const ripples = `<ellipse cx="52" cy="119" rx="40" ry="6" fill="url(#${wt})" opacity=".55"/><ellipse cx="52" cy="119" rx="16" ry="3.2" fill="none" stroke="#e8ffff" stroke-width="1.6" opacity=".9"/><ellipse cx="52" cy="119" rx="27" ry="5" fill="none" stroke="#e8ffff" stroke-width="1.4" opacity=".6"/><ellipse cx="52" cy="119" rx="38" ry="6.6" fill="none" stroke="#e8ffff" stroke-width="1.2" opacity=".35"/>`;
    const fish = `<g ${_vb} transform="translate(116 38) rotate(14)"><path d="M0 -11C5 -9 6 -2 5 4C4 10 2 13 0 14C-2 13 -4 10 -5 4C-6 -2 -5 -9 0 -11Z" fill="url(#${fs})" ${k}/><path d="M0 14L-5 22L0 20L5 22Z" fill="#e8501e" ${k}/><path d="M-3 4C-1 6 1 6 3 4M-3 -1C-1 1 1 1 3 -1" stroke="#fff" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/><circle cx="0.4" cy="-6" r="1.5" fill="#fff"/><circle cx="0.6" cy="-6" r=".8" fill="#1a0a06"/></g>`;
    const body = `<g class="p-hop"><g class="p-body">
      ${ripples}
      ${leg('M54 82L52 100L51 116', 'M51 116L64 118M51 116L59 112M51 116L40 119')}
      ${leg('M62 84L73 96L65 109', 'M65 109L58 113M65 109L66 115M65 109L72 113', 5.2)}
      <g class="p-tail"><path d="M42 78C30 84 18 94 8 108C22 106 36 100 48 90Z" fill="url(#${wg})" ${K}/><path d="M40 72C28 74 14 80 4 92C18 92 34 88 46 80Z" fill="url(#${wg})" ${K}/><path d="M14 100L36 88M10 90L32 80" stroke="#aebfdc" stroke-width="1" opacity=".5" stroke-linecap="round"/></g>
      <path d="M36 70C34 58 48 50 64 52C78 54 86 64 80 76C74 88 54 91 44 86C38 82 36 76 36 70Z" fill="url(#${bd})" ${K}/>
      <path d="M56 56C66 54 74 58 76 64" stroke="#e6f0fa" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/>
      <g class="p-wing"><path d="M52 58C68 54 82 62 80 76C72 86 52 90 36 92C38 80 44 66 52 58Z" fill="url(#${wg})" ${K}/>
        ${[[0, 0]].map(() => `<path d="M60 64C68 70 70 78 66 84M52 66C58 72 58 80 52 88M44 74C48 80 46 86 42 90" stroke="#aab8d8" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>`).join('')}
        <path d="M36 92L28 100L40 96L34 104L46 98L44 104L52 96" fill="#1c2540" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/></g>
      <path d="M70 68C71 76 70 84 67 90M76 68C79 76 78 82 76 88M64 70C64 77 62 82 60 87" stroke="${OL}" stroke-width="3.8" fill="none" stroke-linecap="round"/><path d="M70 68C71 76 70 84 67 90M76 68C79 76 78 82 76 88M64 70C64 77 62 82 60 87" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="${neckD}" fill="url(#${nk})" ${K}/>
      <path d="${smooth(stripe)}" stroke="${OL}" stroke-width="2" stroke-dasharray="1.8 2.8" fill="none" opacity=".75" stroke-linecap="round"/>
      ${plume('M94 17C82 13 66 16 52 28', 2.4)}${plume('M95 20C80 20 66 28 56 42', 2)}
      <path d="M90 20C90 12 100 9 107 13C111 16 112 20 110 23C106 27 98 28 94 25C92 24 90 22 90 20Z" fill="url(#${nk})" ${K}/>
      <path d="M90 15C98 9 108 11 114 17" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M107 20L123 27L107 25Z" fill="url(#${bk})" ${K}/>
      <g class="p-jaw"><path d="M106 24L119 29L106 27.4Z" fill="url(#${bk})" ${k}/></g>
      ${fish}
      <g class="p-eye"><circle cx="102" cy="18.4" r="3.6" fill="#ffe040" stroke="${OL}" stroke-width="1.3"/><circle cx="102.8" cy="18.6" r="1.6" fill="#0a0a14"/><circle cx="101.4" cy="17.2" r=".8" fill="#fff"/></g>
    </g></g>`;
    return _msvg('heron_pecheur', defs, body);
  }

  /* =====================================================================
     CARPE-DRAGON IMPÉRIALE — énorme carpe d'or à tête de dragon, bondissant d'une gerbe d'eau
     ===================================================================== */
  function carpeDragon() {
    const bd = _q(), bl = _q(), hd = _q(), mn = _q(), tf = _q(), ey = _q(), w1 = _q(), w2 = _q(), fn = _q();
    const defs = _qlg(bd, [[0, '#fff09a'], [.4, '#ffb52e'], [1, '#e0601a']], 0, 0, 1, 1)
      + _qlg(bl, [[0, '#fffbe0'], [1, '#ffd878']], 0, 0, 0, 1)
      + _qlg(hd, [[0, '#ffe27a'], [.5, '#ffa42a'], [1, '#d85a14']], 0, 0, 0, 1)
      + _qlg(mn, [[0, '#ff8a4a'], [.5, '#e02a24'], [1, '#8a0e1a']], 0, 1, 0, 0)
      + _qlg(tf, [[0, '#ff7a20'], [1, '#ffe39a']], 0, 1, 0, 0)
      + _qlg(fn, [[0, '#ffd870'], [1, '#ff7a1e']], 0, 0, 1, 1)
      + _qrg(ey, [[0, '#ffffd0'], [.45, '#8affd8'], [1, '#10a090']], .4, .35, .9)
      + _qlg(w1, [[0, '#3ac4d8'], [1, '#126a8a']], 0, 0, 0, 1) + _qlg(w2, [[0, '#8aeaf0'], [1, '#2aa8c8']], 0, 0, 0, 1);
    const OL = '#5a2208', WO = '#0e5a78';
    const K = `stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"`;
    const k = `stroke="${OL}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"`;
    const S = spine([[31, 106], [39, 94], [49, 80], [62, 64], [76, 51], [88, 43], [94, 40]], 10);
    const W = u => u < .55 ? 5 + 40 * Math.pow(Math.sin(u / .55 * Math.PI / 2), 1.1) : 45 - 16 * Math.pow((u - .55) / .45, 1.4);
    const { L, R } = sides(S, W);
    const bodyD = poly([...L, ...R.slice().reverse()]) + 'Z';
    // ventre crème (côté +n = bas), aileron dorsal en flammes (côté −n)
    const bo = [], bi = [];
    S.forEach(p => { if (p.u < .08 || p.u > .97) return; const h = W(p.u) / 2; bo.push([p.x + p.nx * h, p.y + p.ny * h]); bi.push([p.x + p.nx * (h - W(p.u) * .4), p.y + p.ny * (h - W(p.u) * .4)]); });
    let plates = ''; bo.forEach((a, j) => { if (j % 3 === 1) plates += `M${f1(a[0])} ${f1(a[1])}L${f1(bi[j][0])} ${f1(bi[j][1])}`; });
    let dorsal = '';
    S.forEach((p, i) => {
      if (i % 5 !== 3 || p.u < .06 || p.u > .9) return; const h = W(p.u) / 2, sz = 5 + 7 * Math.sin(Math.PI * p.u);
      const bx = p.x - p.nx * (h - 1), by = p.y - p.ny * (h - 1);
      const tip = [bx - p.nx * sz - p.tx * sz * 1.1, by - p.ny * sz - p.ty * sz * 1.1], b1 = [bx - p.tx * 3.4, by - p.ty * 3.4], b2 = [bx + p.tx * 4.2, by + p.ty * 4.2];
      dorsal += `<path d="M${f1(b2[0])} ${f1(b2[1])}Q${f1(b2[0] - p.nx * sz * .6)} ${f1(b2[1] - p.ny * sz * .6)} ${f1(tip[0])} ${f1(tip[1])}L${f1(b1[0])} ${f1(b1[1])}Z" fill="url(#${mn})" ${k}/>`;
    });
    // écailles : arcs en quinconce le long du corps
    let sc = '';
    S.forEach((p, i) => { if (i % 4 !== 1 || p.u < .1 || p.u > .94) return; const h = W(p.u) / 2, r = (i / 4 | 0) % 2;
      for (let j = -2; j <= 2; j++) { const o = (j + (r ? .5 : 0)) * h * .36; if (Math.abs(o) > h * .8) continue; const cx = p.x + p.nx * o, cy = p.y + p.ny * o, a = 3.6 + h * .06;
        sc += `M${f1(cx - p.nx * a - p.tx * a * .3)} ${f1(cy - p.ny * a - p.ty * a * .3)}Q${f1(cx + p.tx * a * 1.4)} ${f1(cy + p.ty * a * 1.4)} ${f1(cx + p.nx * a - p.tx * a * .3)} ${f1(cy + p.ny * a - p.ty * a * .3)}`; } });
    const hi = S.filter(p => p.u > .12 && p.u < .92).map(p => [p.x - p.nx * W(p.u) * .3, p.y - p.ny * W(p.u) * .3]);
    const lobe = (r, len, w) => `<g ${_vb} transform="translate(32 105) rotate(${r})"><path d="${leafP(len, w)}" fill="url(#${tf})" ${K}/><path d="M0 -3V${-len + 5}" stroke="#c8501a" stroke-width="1" opacity=".5" stroke-linecap="round"/></g>`;
    const tail = `<g class="p-tail">${lobe(-70, 30, 9)}${lobe(-98, 31, 10)}${lobe(-128, 29, 9.6)}${lobe(-158, 24, 8.6)}</g>`;
    const fin = (rot, len, w) => `<g ${_vb} transform="translate(0 0) rotate(${rot})"><path d="${leafP(len, w)}" fill="url(#${fn})" ${K}/><path d="M0 -3L0 ${-len + 6}" stroke="#d8641a" stroke-width="1" opacity=".5"/></g>`;
    const pec = `<g class="p-wing"><g ${_vb} transform="translate(66 74)">${fin(-132, 30, 9)}${fin(-158, 24, 7)}</g></g>`;
    const sparkle = (x, y, r) => `<path d="M${x} ${y - r}L${x + r * .26} ${y - r * .26}L${x + r} ${y}L${x + r * .26} ${y + r * .26}L${x} ${y + r}L${x - r * .26} ${y + r * .26}L${x - r} ${y}L${x - r * .26} ${y - r * .26}Z" fill="#fffbe0"/>`;
    const sparks = `<g class="p-glow">${sparkle(50, 70, 5)}${sparkle(66, 56, 4)}${sparkle(40, 90, 3.6)}${sparkle(78, 66, 3)}${sparkle(104, 66, 4.6)}${sparkle(22, 60, 4)}</g>`;
    const drop = (x, y, s) => `<g ${_vb} transform="translate(${x} ${y}) scale(${s})"><path d="M0 -7C4 -2 6 1 6 3.4C6 7 3 8.6 0 8.6C-3 8.6 -6 7 -6 3.4C-6 1 -4 -2 0 -7Z" fill="#c8f6fa" stroke="${WO}" stroke-width="1.3" stroke-linejoin="round"/><ellipse cx="-1.8" cy="3" rx="1.2" ry="2" fill="#fff" opacity=".85"/></g>`;
    const water = `<path d="M0 100C6 94 10 104 16 98C20 108 28 102 32 110C30 112 38 114 44 122C50 124 52 126 56 128L0 128Z" fill="url(#${w1})" stroke="${WO}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M44 128C50 118 62 118 70 116C80 114 86 120 96 118C108 116 118 120 128 114L128 128Z" fill="url(#${w1})" stroke="${WO}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M0 116C10 110 16 118 26 112C34 108 40 116 52 118C64 120 72 124 80 128L0 128Z" fill="url(#${w2})" stroke="${WO}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M72 128C80 122 90 124 98 122C108 120 116 124 128 120L128 128Z" fill="url(#${w2})" stroke="${WO}" stroke-width="2" stroke-linejoin="round"/>
      <g fill="#fff" stroke="#9adcea" stroke-width="1"><circle cx="8" cy="116" r="3.6"/><circle cx="17" cy="117" r="3"/><circle cx="26" cy="112" r="3.4"/><circle cx="36" cy="115" r="3"/><circle cx="46" cy="119" r="3.6"/><circle cx="56" cy="121" r="2.8"/><circle cx="86" cy="124" r="3.4"/><circle cx="98" cy="123" r="3"/><circle cx="110" cy="121" r="3.4"/><circle cx="121" cy="122" r="3"/></g>
      <path d="M14 108C16 98 24 96 26 88M40 112C46 104 44 96 50 92" stroke="#bff4f8" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
      ${drop(10, 90, 1)}${drop(20, 78, .8)}${drop(34, 98, .7)}${drop(52, 104, .8)}${drop(104, 100, .9)}${drop(116, 86, .7)}`;
    const head = `<g ${_vb} transform="translate(89 42) rotate(-22) scale(.78)">${dhead({ ol: OL, sk: hd, bl, mn, hn: bl, hc: '#fff0c0', wc: '#fff0a8', ey, antler: true })}</g>`;
    const body = `<g class="p-hop"><g class="p-body">
      ${water}
      ${tail}
      <g>${dorsal}</g>
      <path d="${bodyD}" fill="url(#${bd})" ${K}/>
      <path d="${poly([...bo, ...bi.slice().reverse()])}Z" fill="url(#${bl})" stroke="#c8801a" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="${plates}" stroke="#c8801a" stroke-width="1" fill="none" opacity=".5" stroke-linecap="round"/>
      <path d="${sc}" stroke="#a8480e" stroke-width="1.2" fill="none" opacity=".5" stroke-linecap="round"/>
      <path d="${smooth(hi)}" stroke="#fffbd0" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>
      ${pec}
      ${head}
      ${sparks}
    </g></g>`;
    return _msvg('carpe_dragon', defs, body);
  }

  const ART = { bambouto: bambouto(), kitsou: kitsou(), tengu: tengu(), tanukoui: tanukoui(), rainette_lotus: rainette(), dragon_jade: dragonJade(), koi_celeste: koiCeleste(), heron_pecheur: heron(), carpe_dragon: carpeDragon() };
  Object.assign(MON_ART, ART);
})();
