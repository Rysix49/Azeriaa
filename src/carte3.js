/* =====================================================================
   CARTE — NOUVELLES TERRES : Pandala, Dunes des Ossements, Srambad et leurs sous-zones
   wmScenery3() : décor fixe (mis en cache avec le reste du décor, dessiné dans le même SVG)
   wmAnim3()    : petits éléments animés (recalculés à chaque rendu, phase synchronisée)
   Coordonnées absolues du monde (voir WM_POS dans carte.js) ; les nœuds de zone sont à
   Pandala (1720,160) · Étang (1700,340) · Dunes (1990,270) · Mines (2130,372) · Srambad (2290,150) · Roseraie (2380,330)
   ===================================================================== */
function wmScenery3() {
  const rn = _rn;
  const bamboo = (x, y, h, lean, c = '#5fbf6a') => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="5" ry="1.6" fill="#000" opacity=".25"/>
    <path d="M0 0C${lean * .4} ${-h * .5} ${lean} ${-h * .8} ${lean * 1.3} ${-h}" stroke="#1c4a26" stroke-width="5.2" fill="none" stroke-linecap="round"/><path d="M0 0C${lean * .4} ${-h * .5} ${lean} ${-h * .8} ${lean * 1.3} ${-h}" stroke="${c}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <path d="M0 0C${lean * .4} ${-h * .5} ${lean} ${-h * .8} ${lean * 1.3} ${-h}" stroke="#c4f2a0" stroke-width="1" fill="none" stroke-linecap="round" stroke-dasharray="${h * .12} ${h * .12}" opacity=".7"/>
    ${[.28, .5, .72].map(t => `<path d="M${lean * t * .9 - 3.4} ${-h * t}h6.8" stroke="#1c4a26" stroke-width="1.4"/>`).join('')}
    <g transform="translate(${lean * 1.3} ${-h})" fill="#3f9a4a" stroke="#1c4a26" stroke-width=".6"><path d="M0 0C-7-2-14 1-17 6-10 4-5 2 0 0Z"/><path d="M0 0C7-2 14 1 17 6 10 4 5 2 0 0Z"/><path d="M0 0C-3-6-8-9-13-9-9-6-4-3 0 0Z" fill="#58b85a"/><path d="M0 0C3-6 8-9 13-9 9-6 4-3 0 0Z" fill="#58b85a"/></g></g>`;
  const torii = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="22" ry="3" fill="#000" opacity=".28"/>
    <rect x="-16" y="-34" width="4.4" height="35" rx="1" fill="#c8321e" stroke="#5a0e08" stroke-width=".8"/><rect x="11.6" y="-34" width="4.4" height="35" rx="1" fill="#c8321e" stroke="#5a0e08" stroke-width=".8"/>
    <path d="M-23-36C-12-32 12-32 23-36L21-41C12-38-12-38-21-41Z" fill="#2a1a18" stroke="#0e0604" stroke-width=".8"/><path d="M-19-31h38v4h-38Z" fill="#c8321e" stroke="#5a0e08" stroke-width=".8"/><path d="M-12-39h24" stroke="#ffb09a" stroke-width=".8" opacity=".5"/></g>`;
  const pagoda = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="22" ry="4" fill="#000" opacity=".3"/>
    ${[[0, 22, 17], [-22, 17, 13], [-40, 13, 10]].map(([dy, w, h], i) => `<rect x="${-w * .7}" y="${dy - h}" width="${w * 1.4}" height="${h - 3}" fill="${i ? '#e8d8b4' : '#d8c8a0'}" stroke="#6a4a2a" stroke-width=".7"/><rect x="-2.6" y="${dy - h + 3}" width="5.2" height="${h - 7}" fill="#5a1a10"/><path d="M${-w - 5} ${dy - h + 1}Q0 ${dy - h - 6} ${w + 5} ${dy - h + 1}L${w * .75} ${dy - h - 5}H${-w * .75}Z" fill="#c8321e" stroke="#5a0e08" stroke-width=".8"/>`).join('')}
    <path d="M0-60V-70" stroke="#e8b84a" stroke-width="1.6"/><circle cx="0" cy="-66" r="2.2" fill="#e8b84a" stroke="#7a5a14" stroke-width=".5"/></g>`;
  const karst = (x, y, w, h, c) => `<g transform="translate(${x} ${y})"><path d="M${-w / 2} 0C${-w * .42} ${-h * .5} ${-w * .3} ${-h * .9} ${-w * .06} ${-h} ${w * .2} ${-h * .96} ${w * .34} ${-h * .5} ${w / 2} 0Z" fill="${c}"/><path d="M${-w * .06} ${-h}C${w * .2} ${-h * .96} ${w * .34} ${-h * .5} ${w / 2} 0H${w * .1}C${w * .12} ${-h * .5} ${w * .06} ${-h * .8} ${-w * .06} ${-h}Z" fill="#000" opacity=".2"/><path d="M${-w * .3} ${-h * .5}q${w * .1}-6 ${w * .22}-2M${-w * .2} ${-h * .8}q${w * .1}-4 ${w * .18}-1" stroke="#9fe0a8" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/></g>`;
  const pad = (x, y, s, fl) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="8" ry="3" fill="#3f9a4a"/><path d="M0 0 6-2.6 7 0Z" fill="#1f6a5a" opacity=".6"/><ellipse cx="-1.6" cy="-.6" rx="4.6" ry="1.1" fill="#fff" opacity=".2"/>${fl ? `<g><path d="M0-1C-4-3-5-7-2-9 0-7 0-4 0-1ZM0-1C4-3 5-7 2-9 0-7 0-4 0-1ZM0-1C-6-1-8-4-6-7-3-6-1-4 0-1ZM0-1C6-1 8-4 6-7 3-6 1-4 0-1Z" fill="#ff8ab8" stroke="#a02a5a" stroke-width=".4"/><circle cx="0" cy="-3" r="1.4" fill="#ffe27a"/></g>` : ''}</g>`;
  const dune = (x, y, w, h, c1, c2) => `<g transform="translate(${x} ${y})"><path d="M${-w / 2} 0C${-w * .3} ${-h} ${w * .1} ${-h * 1.15} ${w * .5} 0Z" fill="${c1}"/><path d="M${-w * .05} ${-h * 1.02}C${w * .2} ${-h * .9} ${w * .4} ${-h * .4} ${w * .5} 0H${w * .1}C${w * .08} ${-h * .5} ${-w * .02} ${-h * .9} ${-w * .05} ${-h * 1.02}Z" fill="${c2}" opacity=".7"/></g>`;
  const crystal = (x, y, s, c1, c2) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-7 0-5-14 0-20 4-13 6 0Z" fill="${c1}" stroke="#5a2a08" stroke-width=".8" stroke-linejoin="round"/><path d="M0-20 4-13 6 0 1 0Z" fill="${c2}" opacity=".6"/><path d="M-4-12-1-17" stroke="#fff" stroke-width="1" opacity=".8" stroke-linecap="round"/><path d="M5 0 8-9 12-5 12 0Z" fill="${c1}" stroke="#5a2a08" stroke-width=".7" stroke-linejoin="round"/><path d="M-7 0-10-8-13-3-12 0Z" fill="${c1}" stroke="#5a2a08" stroke-width=".7" stroke-linejoin="round"/></g>`;
  const house = (x, y, w, h, wc, rc, lit) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="1" rx="${w * .6}" ry="2.4" fill="#000" opacity=".3"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${wc}" stroke="#0e0816" stroke-width=".8"/><path d="M${-w / 2 - 3} ${-h}L0 ${-h - w * .62} ${w / 2 + 3} ${-h}Z" fill="${rc}" stroke="#0e0816" stroke-width=".8"/>
    ${[...Array(lit)].map((_, i) => `<rect x="${-w / 2 + 4 + i * ((w - 8) / lit) + 1}" y="${-h + 6}" width="4.4" height="6" rx=".8" fill="#ffb04a" opacity=".92"/>`).join('')}<path d="M${w * .2} ${-h - w * .4}v-8h4v6" stroke="#0e0816" stroke-width="1" fill="#2a2038"/></g>`;
  const rose = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="9" ry="2.4" fill="#000" opacity=".3"/><path d="M-8 0Q-7-8 0-9 7-8 8 0Z" fill="#1f4a2a"/><path d="M-2-6 0-12M3-5 5-11" stroke="#2a5a38" stroke-width="1.2"/>
    <g transform="translate(-3 -10)"><circle r="3.6" fill="#1a1020" stroke="#05020a" stroke-width=".6"/><circle r="1.8" fill="#c0183a"/><path d="M-1.6 0q1.6-1.8 3.2 0" stroke="#ff6a8a" stroke-width=".5" fill="none"/></g><g transform="translate(5 -12)"><circle r="3" fill="#1a1020" stroke="#05020a" stroke-width=".6"/><circle r="1.4" fill="#c0183a"/></g></g>`;
  const deadTree = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-22M0-10-8-18M0-14 7-22M0-18-4-28M-8-18-12-20M7-22 11-21" stroke="#1a1228" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`;
  let o = '';

  /* ---------- Forêt de Pandala : bambouseraie, torii, pagode ---------- */
  o += `<defs><linearGradient id="wmJade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fe0a8" stop-opacity=".55"/><stop offset="1" stop-color="#2f6a3a" stop-opacity=".5"/></linearGradient></defs>`;
  o += `<ellipse cx="1720" cy="214" rx="132" ry="44" fill="#2a5a34" opacity=".45"/><ellipse cx="1720" cy="208" rx="116" ry="36" fill="url(#wmJade)"/><ellipse cx="1710" cy="200" rx="78" ry="22" fill="#d8ffe0" opacity=".16"/>`;
  o += karst(1790, 196, 62, 74, '#5a8a6a') + karst(1668, 190, 50, 56, '#6a9a78');
  for (const [x, y, h, l] of [[1626, 226, 66, -6], [1640, 232, 82, 5], [1654, 224, 58, -4], [1780, 234, 76, 6], [1796, 226, 90, -5], [1812, 232, 64, 7], [1828, 224, 80, -6], [1748, 238, 44, 3], [1690, 240, 40, -3]]) o += bamboo(x, y, h, l, ['#5fbf6a', '#7fd070', '#4fb060'][Math.abs(x) % 3]);
  o += torii(1664, 240, 1) + pagoda(1840, 238, .9);
  for (let i = 0; i < 12; i++) o += `<circle cx="${1630 + rn(i + 600) * 200}" cy="${222 + rn(i + 610) * 26}" r="1.3" fill="#d8ffb0" opacity=".7"/>`;

  /* ---------- Étang des Carpes Célestes : lac turquoise, lotus, pont rouge, cascade ---------- */
  o += `<defs><radialGradient id="wmPond" cx=".5" cy=".4" r=".62"><stop offset="0" stop-color="#c8fff0"/><stop offset=".55" stop-color="#3fc1b0"/><stop offset="1" stop-color="#14707a"/></radialGradient></defs>`;
  o += `<ellipse cx="1700" cy="394" rx="128" ry="46" fill="#3a6a4a" opacity=".5"/><ellipse cx="1700" cy="392" rx="118" ry="40" fill="#7ad0a0" opacity=".45"/><ellipse cx="1700" cy="394" rx="106" ry="33" fill="url(#wmPond)"/><ellipse cx="1700" cy="394" rx="106" ry="33" fill="none" stroke="#e8fffa" stroke-width="1.4" opacity=".4"/>`;
  o += `<path d="M1630 392c10-4 22-4 32 0M1740 400c10-4 24-4 34 0M1676 414c14-3 28-3 42 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".4" stroke-linecap="round"/>`;
  o += pad(1650, 404, 1.1, true) + pad(1738, 384, 1, false) + pad(1770, 406, 1.2, true) + pad(1632, 382, .8, false) + pad(1700, 420, .9, true);
  o += `<g transform="translate(1700 378)"><path d="M-30 6Q0-14 30 6" stroke="#2a0a06" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-30 6Q0-14 30 6" stroke="#c8321e" stroke-width="4.6" fill="none" stroke-linecap="round"/><path d="M-22-1 0-8 22-1" stroke="#e8b84a" stroke-width=".9" fill="none" opacity=".8"/><path d="M-20 2v8M-8-3v10M8-3v10M20 2v8" stroke="#5a0e08" stroke-width="1.6"/></g>`;
  o += `<g transform="translate(1590 380)"><path d="M0 0 12-16 26-12 30 0Z" fill="#5a7a6a" stroke="#1c3a2a" stroke-width=".8"/><path d="M12-16 26-12 30 0H20Z" fill="#000" opacity=".2"/><path d="M14-14C12-6 14 0 14 8M20-13C19-4 20 2 20 9" stroke="#e8fffa" stroke-width="2.6" fill="none" opacity=".85" stroke-linecap="round"/></g>`;
  for (const [x, y, h, l] of [[1580, 408, 54, -4], [1594, 412, 44, 4], [1818, 410, 58, 4], [1830, 404, 46, -4]]) o += bamboo(x, y, h, l);

  /* ---------- Dunes des Ossements : dunes, pyramide, obélisque, ossements ---------- */
  o += `<ellipse cx="1990" cy="330" rx="150" ry="42" fill="#a8742e" opacity=".42"/><ellipse cx="1990" cy="324" rx="132" ry="34" fill="#e8c070" opacity=".5"/>`;
  o += dune(1920, 342, 130, 26, '#e8c878', '#c8984a') + dune(2060, 346, 150, 32, '#f0d488', '#c8984a') + dune(1990, 352, 110, 18, '#dcb468', '#b88a3e');
  o += `<g transform="translate(2078 322)"><ellipse cx="0" cy="2" rx="34" ry="5" fill="#000" opacity=".25"/><path d="M-32 0 0-44 32 0Z" fill="#e8cc86" stroke="#7a5a1c" stroke-width=".9"/><path d="M0-44 32 0H6Z" fill="#a8803a" opacity=".7"/><path d="M-26-8h52M-20-18h40M-12-30h24" stroke="#9a7228" stroke-width=".7" opacity=".7"/><path d="M-6 0v-8h12v8Z" fill="#2a1a08"/></g>`;
  o += `<g transform="translate(1912 332)"><ellipse cx="0" cy="1" rx="8" ry="2" fill="#000" opacity=".28"/><path d="M-4 0-3-34 0-40 3-34 4 0Z" fill="#d8b868" stroke="#6a4a14" stroke-width=".8"/><path d="M0-40 3-34 4 0H1Z" fill="#8a6420" opacity=".6"/><path d="M-2-26h4M-2-18h4M-2-10h4" stroke="#2a5fd0" stroke-width="1.2"/></g>`;
  o += `<g transform="translate(1962 348)" stroke="#f4ecd4" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M0 0Q-6-14 8-18M8 0Q2-14 16-18M16 0Q10-14 24-18M-4 0H30" stroke="#2a1a08" stroke-width="4.6" opacity=".5"/><path d="M0 0Q-6-14 8-18M8 0Q2-14 16-18M16 0Q10-14 24-18M-4 0H30"/></g>`;
  o += `<g transform="translate(2020 350)"><path d="M0 0V-14M0-8-5-10V-15M0-6 5-8V-13" stroke="#2f6a3a" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M0 0V-14M0-8-5-10V-15M0-6 5-8V-13" stroke="#5aa85a" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`;
  o += `<g transform="translate(1880 354)"><circle r="3.4" fill="#f4ecd4" stroke="#6a5a3a" stroke-width=".7"/><circle cx="-1.2" cy="-.6" r=".8" fill="#2a1a08"/><circle cx="1.2" cy="-.6" r=".8" fill="#2a1a08"/><path d="M-3 3 3 4M10 2l7-1" stroke="#f4ecd4" stroke-width="2" stroke-linecap="round"/></g>`;

  /* ---------- Mines d'Ocre : colline rocheuse, entrée étayée, wagonnet, cristaux ---------- */
  o += `<ellipse cx="2130" cy="428" rx="118" ry="34" fill="#2a1a14" opacity=".55"/><ellipse cx="2130" cy="424" rx="102" ry="27" fill="#5a3a2a" opacity=".6"/>`;
  o += `<g transform="translate(2166 436)"><ellipse cx="0" cy="2" rx="46" ry="6" fill="#000" opacity=".3"/><path d="M-44 0-34-26-14-40 8-42 30-30 44 0Z" fill="#6a5448" stroke="#2a1a14" stroke-width=".9"/><path d="M8-42 30-30 44 0H20Z" fill="#000" opacity=".22"/><path d="M-20 0v-24h28v24Z" fill="#0a0604"/><path d="M-22 0v-26h4v26M6 0v-26h4v26M-22-26h32v4h-32Z" fill="#8a5a2a" stroke="#3a2008" stroke-width=".8"/><path d="M-14 0v-12h14v12Z" fill="#ffb04a" opacity=".18"/><circle cx="-6" cy="-30" r="2.4" fill="#ffd27a"/><circle cx="-6" cy="-30" r="6" fill="#ffd27a" opacity=".25"/></g>`;
  o += `<g transform="translate(2096 440)"><path d="M-14 0h28M-12 3h24" stroke="#4a3a30" stroke-width="1.6"/><path d="M-10-9h20l-3 9h-14Z" fill="#7a8294" stroke="#2a2e3a" stroke-width=".8"/><circle cx="-6" cy="1" r="2" fill="#2a2e3a"/><circle cx="6" cy="1" r="2" fill="#2a2e3a"/><path d="M-6-9l3-5 3 4 3-3 4 4Z" fill="#ffb84a" stroke="#7a3a08" stroke-width=".6"/></g>`;
  o += crystal(2060, 442, 1, '#ffb84a', '#ffe08a') + crystal(2112, 452, .8, '#ff9a2a', '#ffd27a') + crystal(2214, 446, 1.1, '#ffb84a', '#6ae0ff') + crystal(2236, 440, .7, '#ff9a2a', '#ffe08a');
  for (const [x, y] of [[2070, 436], [2222, 432], [2118, 446]]) o += `<circle cx="${x}" cy="${y}" r="2" fill="#6ae0ff" opacity=".85"/>`;

  /* ---------- Ruelles de Srambad : lune cramoisie, toits pointus, lanternes ---------- */
  o += `<defs><radialGradient id="wmBlood" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6a7a" stop-opacity=".85"/><stop offset=".45" stop-color="#c0243a" stop-opacity=".3"/><stop offset="1" stop-color="#c0243a" stop-opacity="0"/></radialGradient></defs>`;
  o += `<circle cx="2330" cy="56" r="52" fill="url(#wmBlood)"/><circle cx="2330" cy="56" r="17" fill="#ffc0c8"/><circle cx="2336" cy="52" r="14" fill="#7a1a3a" opacity=".5"/>`;
  o += `<ellipse cx="2290" cy="214" rx="146" ry="40" fill="#1c1230" opacity=".62"/><ellipse cx="2290" cy="208" rx="128" ry="32" fill="#4a3468" opacity=".42"/>`;
  o += house(2214, 224, 26, 34, '#3a2a52', '#241838', 2) + house(2252, 230, 22, 44, '#2f2244', '#1c1230', 2) + house(2336, 228, 28, 38, '#3a2a52', '#241838', 3) + house(2372, 232, 22, 30, '#2f2244', '#1c1230', 1) + house(2296, 236, 20, 26, '#34264a', '#241838', 1);
  o += `<path d="M2226 190Q2256 206 2290 190T2352 192" stroke="#1a1228" stroke-width="1.2" fill="none"/>${[2240, 2268, 2312, 2338].map((x, i) => `<g transform="translate(${x} ${198 + (i % 2) * 2})"><rect x="-2.4" y="0" width="4.8" height="7" rx="1.6" fill="#e8402f" stroke="#4a0a10" stroke-width=".6"/><circle cx="0" cy="3.4" r="6" fill="#ff6a4a" opacity=".22"/></g>`).join('')}`;
  o += deadTree(2200, 244, 1.1) + deadTree(2390, 248, .9);

  /* ---------- Roseraie Noire : parterre sombre, buissons de roses noires, grille, épouvantail ---------- */
  o += `<ellipse cx="2380" cy="392" rx="112" ry="40" fill="#1a1024" opacity=".62"/><ellipse cx="2380" cy="388" rx="96" ry="32" fill="#2f1a3a" opacity=".55"/><ellipse cx="2376" cy="384" rx="62" ry="18" fill="#4a2a52" opacity=".3"/>`;
  o += `<g transform="translate(2322 394)"><path d="M-18 0v-30a18 18 0 0 1 36 0V0" stroke="#05020a" stroke-width="6" fill="none"/><path d="M-18 0v-30a18 18 0 0 1 36 0V0" stroke="#4a4458" stroke-width="3" fill="none"/><path d="M-9 0v-34M0 0v-48M9 0v-34" stroke="#2a2438" stroke-width="1.6"/><circle cx="0" cy="-50" r="2.6" fill="#c0183a" stroke="#05020a" stroke-width=".6"/></g>`;
  for (const [x, y, s] of [[2354, 410, 1.3], [2392, 414, 1.1], [2430, 408, 1.2], [2300, 414, .9], [2412, 392, .9]]) o += rose(x, y, s);
  o += `<g transform="translate(2448 396)"><ellipse cx="0" cy="1" rx="8" ry="2" fill="#000" opacity=".3"/><path d="M0 0V-34M-12-24H12" stroke="#4a3220" stroke-width="2.4" stroke-linecap="round"/><path d="M-6-34Q0-42 6-34L5-28h-10Z" fill="#8a6a3a" stroke="#2a1a0a" stroke-width=".7"/><path d="M-9-38h18" stroke="#2a1a0a" stroke-width="2"/><path d="M-12-24 -16-16M12-24 16-16" stroke="#d8b84a" stroke-width="1.4" stroke-linecap="round"/></g>`;
  o += deadTree(2294, 404, .8);
  return o;
}

function wmAnim3() {
  const rn = _rn;
  let o = '';
  const P = (p, i = 0) => `style="animation-delay:-${(Date.now() + i * 937) % p}ms;animation-duration:${p}ms"`;
  /* feuilles et pétales qui tombent sur Pandala */
  for (let i = 0; i < 14; i++) { const x = 1620 + rn(i + 700) * 230, T = 5200 + rn(i + 710) * 3200; o += `<g class="wm-petal" ${P(T, i)}><path d="M0 0c3-3 7-3 9 0-3 3-6 3-9 0Z" transform="translate(${x.toFixed(0)} ${(150 + rn(i + 720) * 20).toFixed(0)})" fill="${i % 3 ? '#9be07a' : '#ffb0c8'}"/></g>`; }
  /* koïs de l'étang + rides */
  [[1650, 396, '#ff8a2a', 0], [1736, 404, '#ffe0c0', 1], [1700, 386, '#ff6a3a', 2]].forEach(([x, y, c, i]) => {
    o += `<g class="wm-pig" ${P(3400 + i * 500, i)}><g transform="translate(${x} ${y})"><path d="M-7 0Q-3-4 3-2 6-1 8-4 8 0 8 2 6 1 3 2-3 4-7 0Z" fill="${c}" stroke="#7a2a08" stroke-width=".6"/><path d="M-7 0-11-3-10 0-11 3Z" fill="${c}" stroke="#7a2a08" stroke-width=".5"/><circle cx="4" cy="-.6" r=".8" fill="#2a1008"/><path d="M-2-2q2 1 4 0" stroke="#fff" stroke-width=".7" opacity=".7" fill="none"/></g></g>`;
  });
  [[1690, 382], [1664, 410], [1752, 396]].forEach(([x, y], i) => { o += `<ellipse class="wm-ripple" cx="${x}" cy="${y}" rx="9" ry="3" fill="none" stroke="#fff" stroke-width="1" ${P(3600, i)}/>`; });
  /* cascade : gouttes */
  for (let i = 0; i < 5; i++) o += `<circle class="wm-snow" cx="${1604 + i * 3}" cy="${368 + (i % 2) * 4}" r="1.1" fill="#fff" ${P(1800 + i * 200, i)}/>`;
  /* sable soufflé sur les dunes */
  for (let i = 0; i < 9; i++) { const y = 318 + rn(i + 730) * 34; o += `<g class="wm-sand" ${P(4200 + rn(i + 760) * 2600, i)}><path d="M0 0h${(10 + rn(i + 740) * 14).toFixed(0)}" transform="translate(${(1890 + rn(i + 750) * 80).toFixed(0)} ${y.toFixed(0)})" stroke="#f4dc9a" stroke-width="1.4" stroke-linecap="round"/></g>`; }
  /* lampes, braises et éclats des mines */
  [[2162, 406], [2080, 428]].forEach(([x, y], i) => { o += `<g class="wm-flame" ${P(900 + i * 150, i)}><g transform="translate(${x} ${y})"><path d="M0 0C-4-1-3-6-1-9 0-6 2-5 2-2 4-4 4-1 3 0Z" fill="#ffb04a"/><path d="M0 0C-2-1-1-4 0-5 1-3 2-3 1 0Z" fill="#fff0b0"/></g></g>`; });
  for (let i = 0; i < 5; i++) o += `<circle class="wm-ember" cx="${(2150 + i * 11).toFixed(0)}" cy="${436 - (i % 2) * 6}" r="1.2" fill="#ffb84a" ${P(2600 + i * 360, i)}/>`;
  [[2222, 440], [2062, 436]].forEach(([x, y], i) => { o += `<ellipse class="wm-lavaglow" cx="${x}" cy="${y}" rx="12" ry="9" fill="#6ae0ff" opacity=".4" ${P(2400 + i * 500, i)}/>`; });
  /* chauves-souris devant la lune de Srambad, fenêtres qui vacillent */
  [[2300, 70, 0], [2360, 92, 1], [2260, 100, 2]].forEach(([x, y, i]) => { o += `<g class="wm-bat" ${P(5200 + i * 900, i)}><g transform="translate(${x} ${y})"><path d="M0 0Q-5-5-9-1-6-1-4 2-2 0 0 2 2 0 4 2 6-1 9-1 5-5 0 0Z" fill="#150a22"/></g></g>`; });
  [[2252, 214], [2336, 208], [2214, 208]].forEach(([x, y], i) => { o += `<circle class="wm-flicker" cx="${x}" cy="${y}" r="5" fill="#ffb04a" opacity=".3" ${P(2600 + i * 700, i)}/>`; });
  /* lucioles pourpres et pétales noirs dans la Roseraie */
  for (let i = 0; i < 9; i++) { const x = 2310 + rn(i + 770) * 150, y = 358 + rn(i + 780) * 52; o += `<circle class="wm-fly" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="1.8" fill="${i % 2 ? '#ff6a8a' : '#c8a0ff'}" style="animation-delay:-${(i * 713 + Date.now()) % 3600}ms"/>`; }
  for (let i = 0; i < 7; i++) { const x = 2320 + rn(i + 790) * 130, T = 5600 + rn(i + 800) * 3000; o += `<g class="wm-petal" ${P(T, i)}><path d="M0 0c3-3 7-3 9 0-3 3-6 3-9 0Z" transform="translate(${x.toFixed(0)} ${(344 + rn(i + 810) * 14).toFixed(0)})" fill="#2a1030" stroke="#c0183a" stroke-width=".5"/></g>`; }
  return o;
}
