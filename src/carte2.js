/* =====================================================================
   CARTE — SOUS-ZONES : décors dessinés autour de chaque lieu, animations légères
   et liens entre une zone et ses sous-zones.
   wmSubScenery() : décor fixe (mis en cache avec le reste du décor, dessiné dans le même SVG)
   wmSubAnim()    : petits éléments animés (recalculés à chaque rendu, avec phase synchronisée)
   wmLinked()     : bandeau « Sous-zones / Zone mère » dans la fiche d'un lieu
   ===================================================================== */
function wmSubScenery() {
  const carrot = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-3.2 0h6.4L0 10Z" fill="#ff9a2e" stroke="#9a4a10" stroke-width=".6"/><path d="M-1.8 4h3.6M-1 7h2" stroke="#c4601a" stroke-width=".8"/><path d="M0 0V-3M-2 0-4-5M2 0 4-5" stroke="#4aa83a" stroke-width="1.8" stroke-linecap="round"/></g>`;
  const pine = (x, y, s, c, snow) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="9" ry="2.5" fill="#000" opacity=".25"/><rect x="-1.6" y="-6" width="3.2" height="7" fill="#4a2c14"/><path d="M0-34 9-17H4l8 11H-8l8-11h-5Z" fill="${c}"/><path d="M0-34 9-17H4l8 11H0Z" fill="#000" opacity=".16"/>${snow ? '<path d="M0-34 4.4-25.6 0-27.4-4.4-25.6ZM-3-19l3-2 3 2-3-.8ZM-6-9l6-3.4 6 3.4-6-1.2Z" fill="#f4f9ff"/>' : ''}</g>`;
  const rock = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="12" ry="3" fill="#000" opacity=".28"/><path d="M-11 0-8-9-2-12 6-10 11-2 9 0Z" fill="${c}"/><path d="M-2-12 6-10 11-2 3-3Z" fill="#fff" opacity=".16"/></g>`;
  const palm = (x, y, s, lean) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="9" ry="2.4" fill="#000" opacity=".28"/><path d="M0 0C${lean} -10 ${lean * 1.6} -22 ${lean * 1.2} -34" stroke="#6a4a22" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M0 0C${lean} -10 ${lean * 1.6} -22 ${lean * 1.2} -34" stroke="#a87a42" stroke-width="1.2" fill="none" stroke-dasharray="2 3"/>
    <g transform="translate(${lean * 1.2} -34)" fill="#3fa84a" stroke="#1f6a2a" stroke-width=".7"><path d="M0 0C-8-9-18-8-24-2 -16-4-8-4 0 0Z"/><path d="M0 0C8-9 18-8 24-2 16-4 8-4 0 0Z"/><path d="M0 0C-5-12-12-16-19-14-12-12-6-8 0 0Z"/><path d="M0 0C5-12 12-16 19-14 12-12 6-8 0 0Z"/><path d="M0 0C-1-12 0-18 2-22 4-17 2-8 0 0Z" fill="#58c05a"/></g><circle cx="${lean * 1.2 - 2}" cy="-32" r="2" fill="#6a3a1a"/><circle cx="${lean * 1.2 + 2}" cy="-31" r="2" fill="#7a4a22"/></g>`;
  const hut = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="14" ry="3" fill="#000" opacity=".28"/><rect x="-9" y="-12" width="18" height="12" fill="#8a5a2c"/><path d="M-9-12h18M-9-8h18M-9-4h18" stroke="#5a3a18" stroke-width=".8"/><path d="M-14-11 0-27 14-11Z" fill="#d9b24a"/><path d="M-14-11 0-27 4-23-8-11Z" fill="#fff" opacity=".2"/><path d="M-9-15 0-24M-3-13 3-24M3-12 8-19" stroke="#a8842a" stroke-width=".9"/><path d="M-3 0v-8a3 4 0 0 1 6 0V0Z" fill="#2a1608"/></g>`;
  const totem = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="6" ry="2" fill="#000" opacity=".3"/><rect x="-4" y="-34" width="8" height="34" rx="1.6" fill="#7a4a22" stroke="#3a2008" stroke-width=".8"/>
    <g fill="#e8c24a"><rect x="-4" y="-34" width="8" height="8" rx="1.4"/></g><g fill="#c8402a"><rect x="-4" y="-25" width="8" height="8"/></g><g fill="#3aa88a"><rect x="-4" y="-16" width="8" height="8"/></g>
    <g fill="#1a0c04"><circle cx="-1.6" cy="-31" r="1"/><circle cx="1.6" cy="-31" r="1"/><circle cx="-1.6" cy="-22" r="1"/><circle cx="1.6" cy="-22" r="1"/><circle cx="-1.6" cy="-13" r="1"/><circle cx="1.6" cy="-13" r="1"/><rect x="-2" y="-29" width="4" height="1.2"/><rect x="-2" y="-20" width="4" height="1.2"/><rect x="-2" y="-11" width="4" height="1.2"/></g>
    <path d="M-8-30-4-28M8-30 4-28" stroke="#d94a3a" stroke-width="2" stroke-linecap="round"/></g>`;
  const reed = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" stroke-linecap="round"><path d="M-3 0V-18M0 0V-24M3 0V-16" stroke="#4a8a3a" stroke-width="1.5" fill="none"/><rect x="-0.9" y="-27" width="1.8" height="7" rx=".9" fill="#7a4a22"/><rect x="-4" y="-20" width="1.6" height="5" rx=".8" fill="#7a4a22"/></g>`;
  const pad = (x, y, s, fl) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="7" ry="2.7" fill="#4aa84a"/><path d="M0 0 5-2.4 6 0Z" fill="#2a6a8a" opacity=".6"/><ellipse cx="-1.4" cy="-.6" rx="4" ry="1" fill="#fff" opacity=".18"/>${fl ? '<circle cx="1" cy="-2" r="2.1" fill="#ff8ac4"/><circle cx="1" cy="-2" r=".8" fill="#ffe27a"/>' : ''}</g>`;
  const bale = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="1" rx="8" ry="2" fill="#000" opacity=".25"/><rect x="-7" y="-9" width="14" height="9" rx="3" fill="#e8c24a" stroke="#9a7a1a" stroke-width=".8"/><path d="M-3.5-9v9M3.5-9v9" stroke="#9a7a1a" stroke-width=".7"/><path d="M-6-6h12M-6-3h12" stroke="#f4dc7a" stroke-width=".6" opacity=".8"/></g>`;
  let o = '';

  /* ---------- Île des Wabbits : prairie, carottes, château rose ---------- */
  o += `<ellipse cx="268" cy="364" rx="112" ry="44" fill="#4a8a3a" opacity=".3"/><ellipse cx="268" cy="358" rx="98" ry="38" fill="#86d466" opacity=".42"/><ellipse cx="262" cy="352" rx="70" ry="26" fill="#aae882" opacity=".3"/>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) o += carrot(188 + i * 13 + r * 6, 352 + r * 13, .95);
  for (const [x, y] of [[250, 384], [296, 390], [212, 392]]) o += `<ellipse cx="${x}" cy="${y}" rx="9" ry="3.6" fill="#5a3a1c" opacity=".7"/><ellipse cx="${x}" cy="${y - 1}" rx="6" ry="2.2" fill="#0e0804"/><path d="M${x - 11} ${y + 1}q11-9 22 0" fill="#6aa84a" opacity=".5"/>`;
  o += `<g transform="translate(346 360)"><ellipse cx="0" cy="2" rx="22" ry="4" fill="#000" opacity=".3"/><rect x="-14" y="-18" width="28" height="19" fill="#e8d4e0" stroke="#8a6a82" stroke-width=".9"/><path d="M-14-14h28M-14-8h28M-14-3h28" stroke="#c8a8bc" stroke-width=".6"/>
    <rect x="-20" y="-28" width="10" height="29" fill="#f2e2ec" stroke="#8a6a82" stroke-width=".9"/><rect x="10" y="-28" width="10" height="29" fill="#f2e2ec" stroke="#8a6a82" stroke-width=".9"/><path d="M-22-28-15-42-8-28Z" fill="#d8402f" stroke="#7a1a10" stroke-width=".8"/><path d="M8-28 15-42 22-28Z" fill="#d8402f" stroke="#7a1a10" stroke-width=".8"/>
    <path d="M-15-42v-8" stroke="#6a4a2a" stroke-width="1.2"/><path d="M-15-50l9 3-9 3Z" fill="#ffd54a"/><path d="M-4 1v-9a4 5 0 0 1 8 0V1Z" fill="#4a2a42"/><rect x="-17.5" y="-22" width="3" height="5" rx="1.4" fill="#4a2a42"/><rect x="14.5" y="-22" width="3" height="5" rx="1.4" fill="#4a2a42"/>
    <path d="M-9-18 0-26 9-18Z" fill="#ffd54a" stroke="#9a7a1a" stroke-width=".7"/></g>`;
  for (let i = 0; i < 16; i++) o += `<circle cx="${190 + _rn(i + 200) * 150}" cy="${336 + _rn(i + 210) * 58}" r="1.6" fill="${['#ffd6ec', '#fff', '#ffe58a'][i % 3]}" opacity=".9"/>`;

  /* ---------- Lac des Blops : lac, roseaux, nénuphars ---------- */
  o += `<defs><radialGradient id="wmLake" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#b8f0f0"/><stop offset=".55" stop-color="#4aa8c0"/><stop offset="1" stop-color="#1f6a8a"/></radialGradient></defs>`;
  o += `<ellipse cx="590" cy="378" rx="124" ry="44" fill="#6a5a38" opacity=".5"/><ellipse cx="590" cy="376" rx="116" ry="39" fill="#8ac46a" opacity=".5"/><ellipse cx="590" cy="378" rx="104" ry="33" fill="url(#wmLake)"/><ellipse cx="590" cy="378" rx="104" ry="33" fill="none" stroke="#e8fbff" stroke-width="1.4" opacity=".4"/>`;
  o += `<path d="M520 376c10-4 20-4 30 0M640 384c10-4 22-4 32 0M570 398c14-3 26-3 40 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".4" stroke-linecap="round"/>`;
  o += pad(556, 386, 1, true) + pad(628, 372, .9, false) + pad(660, 392, 1.1, true) + pad(526, 392, .8, false) + pad(600, 400, .9, false);
  o += reed(484, 392, 1.1) + reed(494, 376, .9) + reed(692, 392, 1) + reed(704, 378, .85) + reed(640, 410, .8);
  o += rock(500, 408, .8, '#8a8a7a') + rock(676, 410, .7, '#8a8a7a');

  /* ---------- Village Kanniboul : jungle, huttes, totem ---------- */
  o += `<ellipse cx="872" cy="372" rx="124" ry="46" fill="#e8d08a" opacity=".22"/><ellipse cx="872" cy="366" rx="106" ry="40" fill="#2f8a4a" opacity=".5"/><ellipse cx="872" cy="360" rx="78" ry="28" fill="#4aa860" opacity=".3"/>`;
  o += palm(794, 376, 1.05, -5) + palm(950, 366, 1, 6) + palm(970, 392, .85, 4) + palm(812, 400, .8, -4);
  o += hut(822, 372, 1) + hut(924, 380, 1.05) + totem(902, 364, 1);
  o += `<g transform="translate(846 410)"><path d="M-8 0 8-2M-7-3 7 1" stroke="#5a3a1c" stroke-width="3" stroke-linecap="round"/></g>`;
  for (let i = 0; i < 9; i++) o += `<path d="M${800 + _rn(i + 300) * 150} ${396 - _rn(i + 310) * 30}l-2-6M${803 + _rn(i + 300) * 150} ${396 - _rn(i + 310) * 30}l2-7" stroke="#6ad87a" stroke-width="1.3" opacity=".8" stroke-linecap="round"/>`;

  /* ---------- Territoire des Porcos : ferme, grange, balles de foin ---------- */
  o += `<ellipse cx="1034" cy="318" rx="108" ry="42" fill="#7a5a32" opacity=".4"/><ellipse cx="1034" cy="312" rx="92" ry="34" fill="#c8a45a" opacity=".42"/><ellipse cx="1026" cy="308" rx="60" ry="20" fill="#e8c878" opacity=".25"/>`;
  o += `<g stroke="#5a3a1c" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M962 330q40 10 84 4M962 322q40 10 84 4"/>${[962, 978, 994, 1010, 1026, 1046].map((x, i) => `<path d="M${x} ${334 + (i % 2) * -1}v-14"/>`).join('')}</g>`;
  o += bale(982, 346, 1) + bale(1000, 350, .9) + bale(1100, 344, 1);
  o += `<g transform="translate(1098 318)"><ellipse cx="0" cy="2" rx="22" ry="4" fill="#000" opacity=".3"/><rect x="-16" y="-20" width="32" height="21" fill="#b8362a" stroke="#5a1410" stroke-width=".9"/><path d="M-19-20 0-34 19-20Z" fill="#7a3a22" stroke="#3a1c10" stroke-width=".9"/><rect x="-6" y="-14" width="12" height="15" fill="#e8d4b0" stroke="#5a1410" stroke-width=".8"/><path d="M-6-14 6 1M6-14-6 1" stroke="#b8362a" stroke-width="1.1"/><circle cx="0" cy="-26" r="2.6" fill="#e8d4b0"/></g>`;
  for (const [x, y, rx] of [[1058, 344, 12], [978, 322, 9]]) o += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="3.4" fill="#4a3220" opacity=".8"/><ellipse cx="${x - 3}" cy="${y - 1}" rx="${rx * .5}" ry="1" fill="#fff" opacity=".18"/>`;
  o += rock(1008, 372, .7, '#9a8a6a');

  /* ---------- Sanctuaire des Dragoeufs : volcan, nid, braise ---------- */
  o += `<defs><radialGradient id="wmLava" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset=".45" stop-color="#ff6a1e" stop-opacity=".5"/><stop offset="1" stop-color="#ff3a0e" stop-opacity="0"/></radialGradient></defs>`;
  o += `<ellipse cx="1132" cy="184" rx="118" ry="44" fill="#2a1814" opacity=".55"/><ellipse cx="1132" cy="180" rx="100" ry="34" fill="#5a3226" opacity=".55"/>`;
  o += `<g transform="translate(1204 176)"><ellipse cx="0" cy="2" rx="48" ry="7" fill="#000" opacity=".3"/><path d="M-46 0 -14-58H14L46 0Z" fill="#4a2c26"/><path d="M-14-58H14L46 0H8Z" fill="#000" opacity=".22"/><path d="M-14-58 14-58 10-52-10-52Z" fill="#ff7a2e"/><ellipse cx="0" cy="-58" rx="14" ry="3.4" fill="#ffc86a"/>
    <path d="M-4-52-8-30M4-52 2-34 8-12M-10-30-16-8" stroke="#ff6a1e" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-4-52-8-30M4-52 2-34" stroke="#ffd27a" stroke-width=".8" fill="none"/></g>`;
  o += `<g transform="translate(1068 196)"><ellipse cx="0" cy="3" rx="26" ry="6" fill="#000" opacity=".3"/><path d="M-24 0q4-10 12-8l4 4 8-6 8 6 4-4q8-2 12 8l-8 4h-32Z" fill="#6a4a22" stroke="#2a1608" stroke-width=".9"/><path d="M-20-2l8 3M-4-8l-4 8M10-7l5 6M20-1l-8 3" stroke="#9a7238" stroke-width="1.1"/>
    <g stroke="#2a1608" stroke-width=".8"><ellipse cx="-9" cy="-10" rx="6" ry="8" fill="#8fd65a"/><ellipse cx="3" cy="-12" rx="6.4" ry="9" fill="#f2c230"/><ellipse cx="14" cy="-9" rx="5.6" ry="7.6" fill="#6ab8e8"/></g>
    <g fill="#fff" opacity=".45"><ellipse cx="-11" cy="-13" rx="1.6" ry="2.6"/><ellipse cx="1" cy="-15" rx="1.6" ry="2.8"/><ellipse cx="12" cy="-12" rx="1.5" ry="2.4"/></g><g fill="#2a1608" opacity=".5"><circle cx="-8" cy="-8" r="1.2"/><circle cx="-11" cy="-4" r=".9"/><circle cx="5" cy="-8" r="1.2"/><circle cx="14" cy="-5" r="1"/></g></g>`;
  o += rock(1100, 208, 1, '#3a2622') + rock(1250, 200, .9, '#3a2622') + rock(1164, 214, .8, '#4a2c26') + rock(1052, 214, .7, '#3a2622');
  o += `<path d="M1090 196q16 6 30-2M1150 212q18 4 34-4" stroke="#ff6a1e" stroke-width="1.6" fill="none" opacity=".75" stroke-linecap="round"/>`;

  /* ---------- Frigost : banquise, pins givrés, grotte ---------- */
  o += `<ellipse cx="1216" cy="342" rx="120" ry="52" fill="#a8c8e4" opacity=".5"/><ellipse cx="1216" cy="334" rx="98" ry="40" fill="#f2f8ff" opacity=".7"/><ellipse cx="1206" cy="326" rx="64" ry="24" fill="#fff" opacity=".5"/>`;
  o += `<g transform="translate(1176 316)"><ellipse cx="0" cy="2" rx="40" ry="6" fill="#000" opacity=".22"/><path d="M-38 0-6-54 6-54 38 0Z" fill="#c4d8ec"/><path d="M-6-54 6-54 38 0H8Z" fill="#7a96b4" opacity=".6"/><path d="M-6-54 0-60 6-54 14-40-2-44-14-38Z" fill="#fff"/>
    <path d="M-12 0v-12a12 14 0 0 1 24 0V0Z" fill="#1a2a3e"/><path d="M-9 0v-10a9 11 0 0 1 18 0V0Z" fill="#24496a"/><path d="M-5 0v-8a5 6 0 0 1 10 0V0Z" fill="#6ad4ff" opacity=".55"/><path d="M-10-12q2-5 5-5M10-12q-2-5-5-5" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`;
  o += pine(1112, 344, 1.1, '#2f6a5a', true) + pine(1252, 336, 1.2, '#2f6a5a', true) + pine(1272, 366, .9, '#3a7a68', true) + pine(1136, 372, .85, '#3a7a68', true);
  for (const [x, y, s] of [[1236, 358, 1], [1196, 372, .8], [1262, 322, .7]]) o += `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-16 5-4 0 0-5-4Z" fill="#9fe8ff" stroke="#3a8ab8" stroke-width=".8"/><path d="M0-16 5-4 0 0Z" fill="#fff" opacity=".35"/><path d="M-7-8-3-2-7 0-10-3Z" fill="#c8f2ff" stroke="#3a8ab8" stroke-width=".7"/></g>`;
  o += rock(1150, 352, .8, '#b8c8d8') + rock(1226, 376, .7, '#b8c8d8');
  return o;
}

function wmSubAnim() {
  let o = '';
  const P = (p, i = 0) => `style="animation-delay:-${(Date.now() + i * 937) % p}ms;animation-duration:${p}ms"`;
  /* aurore boréale au-dessus de Frigost */
  o += `<defs><linearGradient id="wmAur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6affc0" stop-opacity="0"/><stop offset=".45" stop-color="#6affc0" stop-opacity=".5"/><stop offset=".8" stop-color="#9a8aff" stop-opacity=".25"/><stop offset="1" stop-color="#9a8aff" stop-opacity="0"/></linearGradient></defs>`;
  o += `<g class="wm-aurora" ${P(9000)}><path d="M1040 14C1100 40 1130 4 1180 28S1250 6 1290 30V112C1250 90 1220 120 1170 96S1090 124 1040 100Z" fill="url(#wmAur)"/></g>`;
  o += `<g class="wm-aurora" style="animation-delay:-4000ms;animation-duration:12000ms;opacity:.7"><path d="M1090 8C1140 30 1180 0 1230 22S1270 10 1290 18V80C1250 70 1210 96 1170 76S1120 86 1090 70Z" fill="url(#wmAur)"/></g>`;
  /* flocons */
  for (let i = 0; i < 16; i++) { const x = 1100 + _rn(i + 400) * 180, T = 5200 + _rn(i + 410) * 3600; o += `<circle class="wm-snow" cx="${x.toFixed(0)}" cy="${(250 + _rn(i + 420) * 20).toFixed(0)}" r="${(1 + _rn(i + 430) * 1.2).toFixed(1)}" fill="#fff" opacity=".9" ${P(T, i)}/>`; }
  /* braises et fumée du volcan */
  for (let i = 0; i < 7; i++) { const x = 1196 + _rn(i + 440) * 18 - 6, T = 3000 + _rn(i + 450) * 2200; o += `<circle class="wm-ember" cx="${x.toFixed(0)}" cy="118" r="${(1 + _rn(i + 460)).toFixed(1)}" fill="#ffb04a" ${P(T, i)}/>`; }
  for (let i = 0; i < 3; i++) o += `<circle class="wm-smoke" cx="${1198 + i * 5}" cy="112" r="${7 + i * 2}" fill="#8a7a78" ${P(7000, i)}/>`;
  o += `<ellipse class="wm-lavaglow" cx="1204" cy="118" rx="40" ry="22" fill="url(#wmLava)" ${P(2600)}/>`;
  /* les blops dans le lac */
  [[522, 380, '#8a5a32', '#c4905a'], [548, 396, '#e0402f', '#ff8a7a'], [634, 394, '#3a5fe0', '#8aa8ff'], [662, 378, '#4ac84a', '#a8f08a']].forEach(([x, y, c, h], i) => {
    o += `<g class="wm-blopb" ${P(2400 + i * 300, i)}><g transform="translate(${x} ${y})"><path d="M-6 0C-7-7-2-9 0-9s7 2 6 9Z" fill="${c}" stroke="#0a1418" stroke-width=".8"/><ellipse cx="-2" cy="-5.4" rx="1.8" ry="1.2" fill="${h}" opacity=".8"/><circle cx="-2" cy="-3.6" r=".9" fill="#fff"/><circle cx="2" cy="-3.6" r=".9" fill="#fff"/><circle cx="-2" cy="-3.5" r=".45" fill="#000"/><circle cx="2" cy="-3.5" r=".45" fill="#000"/></g></g>`;
  });
  [[590, 356], [628, 382], [548, 372]].forEach(([x, y], i) => { o += `<ellipse class="wm-ripple" cx="${x}" cy="${y}" rx="9" ry="3" fill="none" stroke="#fff" stroke-width="1" ${P(3600, i)}/>`; });
  /* feu de camp du village Kanniboul */
  o += `<g class="wm-flame" ${P(900)}><g transform="translate(846 407)"><path d="M0 0C-6-2-5-9-1-13 0-9 3-8 3-4 5-6 6-3 4 0Z" fill="#ff7a1e"/><path d="M0 0C-3-1-2-6 0-8 1-5 3-4 2 0Z" fill="#ffd27a"/></g></g>`;
  /* cochons de la ferme */
  [[1002, 338, 0], [1070, 350, 1], [1052, 364, 2]].forEach(([x, y, i]) => {
    o += `<g class="wm-pig" ${P(2800 + i * 400, i)}><g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="6" ry="4" fill="#ffb0c0" stroke="#9a4a5a" stroke-width=".7"/><path d="M-5-3 -4-6-1-3ZM1-3 3-6 5-3Z" fill="#ff90a8" stroke="#9a4a5a" stroke-width=".5"/><ellipse cx="6.4" cy=".6" rx="2.2" ry="1.7" fill="#ff90a8" stroke="#9a4a5a" stroke-width=".5"/><circle cx="3" cy="-1.4" r=".7" fill="#2a1018"/><path d="M-6 -1q-3-1-2-3" stroke="#9a4a5a" stroke-width=".8" fill="none"/><path d="M-3 4v2M3 4v2" stroke="#9a4a5a" stroke-width="1.1"/></g></g>`;
  });
  return o;
}

/* Bandeau « Sous-zones » (zone mère) ou « Zone mère » (sous-zone) */
function wmLinked(p, type) {
  if (type !== 'zone') return '';
  const par = p.sub ? ZONES.find(z => z.id === p.parent) : null;
  const kids = ZONES.filter(z => z.sub && z.parent === p.id);
  if (!par && !kids.length) return '';
  const chip = (z, rel) => {
    const [rd, rl] = readiness(z), big = z.monsters.find(m => MONSTERS[m].big) || z.monsters[0];
    const n = st.heroes.filter(h => h.act && h.act.type === 'zone' && h.act.id === z.id).length;
    return `<button class="lk${z.sub ? ' sub' : ''}" data-act="place" data-type="zone" data-id="${z.id}" style="${themeStyle(_wmTh(z.region))}" title="${rl}">
      <span class="lk-ic">${monIcon(big)}</span><span class="lk-t"><small>${rel}</small><b>${z.name}</b></span><span class="lk-lv"><em class="rd ${rd}">niv. ${z.lvl[0]}–${z.lvl[1]}</em>${n ? `<i class="lk-n">${n} 🧑</i>` : ''}</span></button>`;
  };
  return `<div class="linked"><span class="label">${par ? 'Zone mère' : kids.length > 1 ? 'Sous-zones' : 'Sous-zone'}</span><div class="lk-row">${par ? chip(par, 'Retour à') : ''}${kids.map(k => chip(k, k.lvl[0] > p.lvl[1] ? 'Plus loin' : 'À explorer')).join('')}</div></div>`;
}
