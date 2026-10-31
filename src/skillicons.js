/* =====================================================================
   ICÔNES DES TALENTS — dessins SVG originaux (aucun emoji, aucun asset externe).
   Un glyphe = un dessin 32×32 (SK_G[nom], fichiers skillicons_a…d.js) ; un talent = « glyphe » ou « glyphe|badge »
   (SK_B = petit symbole 16×16 posé en bas à droite dans un disque sombre). skIco(spec) renvoie le <svg>.
   Style : contour sombre commun, matières à 3 tons (k=acier, g=or, r=rouge, b=bleu, n=vert, p=violet, s=os/papier, w=bois…,
   voir skillicons.css « .gi »), reflets blancs (.hl) et ombres (.sh). Ajouter une icône : SK_G.nom = '<svg…>' dans un fichier skillicons_*.js,
   puis l'utiliser comme spec dans skilltrees.js (le contrôle « tools » de la planche contact liste les noms inconnus).
   ===================================================================== */
const SK_G = {}, SK_B = {};
const sgP = (c, d) => `<path class="${c}" d="${d}"/>`;                                                     // forme libre
const sgC = (c, x, y, r) => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;                        // cercle
const sgE = (c, x, y, a, b) => `<ellipse class="${c}" cx="${x}" cy="${y}" rx="${a}" ry="${b}"/>`;         // ellipse
const sgR = (c, x, y, w, h, r = 1) => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`; // rectangle
const sgL = (c, d, w) => `<path class="nf ${c}" d="${d}"${w ? ` style="stroke-width:${w}"` : ''}/>`;      // trait sombre (c vide) ou blanc (lw)
const sgT = (col, w, d) => `<path class="nf" d="${d}" style="stroke-width:${w + 2.4}"/><path class="nf" d="${d}" style="stroke:${col};stroke-width:${w}"/>`; // trait épais coloré, contour sombre
const sgG = (tr, inner) => `<g transform="${tr}">${inner}</g>`;
const sgRot = (a, s, inner, cx = 16, cy = 16) => `<g transform="translate(${cx} ${cy}) rotate(${a}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`; // tourne / réduit autour d'un point
const sgStar = (cx, cy, r1, r2, n, rot = -90) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = (rot + i * 180 / n) * Math.PI / 180, r = i % 2 ? r2 : r1; d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); } return d + 'Z'; }; // étoile à n branches
const sgGear = (cx, cy, r, teeth, c, hole = 'k4') => { let t = ''; for (let i = 0; i < teeth; i++) t += `<rect class="${c}" x="${cx - r * .22}" y="${cy - r * 1.25}" width="${r * .44}" height="${r * .5}" rx="1" transform="rotate(${i * 360 / teeth} ${cx} ${cy})"/>`; return t + sgC(c, cx, cy, r) + sgC(hole, cx, cy, r * .42); }; // engrenage
const sgHeart = (m, s = 'sh') => sgP(m, 'M16 28.5 C3.5 19.5 3 11.5 8 8 C12 5.3 15 7.8 16 11 C17 7.8 20 5.3 24 8 C29 11.5 28.5 19.5 16 28.5Z') + sgP(s, 'M16 28.5 C28.5 19.5 29 11.5 24 8 C27 14 24 22 16 28.5Z') + sgP('hl', 'M8.2 10.4 C9.5 8.8 11.6 8.8 12.6 10.4 C11.4 10.1 9.6 10.6 8.2 12.4Z');
const sgDrop = (m, x = 0, y = 0, s = 1) => sgG(`translate(${x} ${y}) scale(${s})`, sgP(m, 'M16 3 C16 3 6.5 14 6.5 20 C6.5 25.5 10.6 29 16 29 C21.4 29 25.5 25.5 25.5 20 C25.5 14 16 3 16 3Z') + sgP('hl', 'M10.6 19.5 C10.8 16.8 12.2 14.8 13.6 13.2 C13 16 13 18 13.8 20.6Z'));
/* visages : base + yeux + bouche (SK_E, SK_M) */
const sgFace = (c = 's1') => sgC(c, 16, 16, 13.2) + sgP('sh', 'M26.4 8 A13.2 13.2 0 0 1 9 27.4 A15.4 15.4 0 0 0 26.4 8Z') + sgP('hl', 'M7.6 10.5 C9 7.6 11.6 6 14.5 5.5 C12 7 10 9 9.2 12Z');
const SK_E = {
  open: sgC('k0', 11, 14, 1.8) + sgC('k0', 21, 14, 1.8),
  angry: sgC('k0', 11.2, 15, 1.7) + sgC('k0', 20.8, 15, 1.7) + sgL('', 'M7 9.6 L13.8 12.6 M25 9.6 L18.2 12.6', 1.9),
  happy: sgL('', 'M8 15 Q11 10.8 14 15 M18 15 Q21 10.8 24 15', 1.7),
  squint: sgL('', 'M8 11.2 L13.4 14 L8 16.8 M24 11.2 L18.6 14 L24 16.8', 1.7),
  sad: sgC('k0', 11, 15, 1.7) + sgC('k0', 21, 15, 1.7) + sgL('', 'M7.5 12 L13.5 9.6 M24.5 12 L18.5 9.6', 1.7),
  wink: sgC('k0', 11, 14, 1.8) + sgL('', 'M18 14.6 Q21 11 24 14.6', 1.7),
  closed: sgL('', 'M8 14 Q11 17 14 14 M18 14 Q21 17 24 14', 1.6),
  dollar: sgC('g2', 11, 14, 3.4) + sgC('g2', 21, 14, 3.4) + sgL('', 'M11 12 V16 M21 12 V16', 1.2),
  wide: sgC('s1', 11, 13.5, 3.4) + sgC('s1', 21, 13.5, 3.4) + sgC('k0', 11.3, 13.8, 1.3) + sgC('k0', 20.7, 13.8, 1.3),
  spiral: sgL('', 'M11 14 m-2 0 a2 2 0 1 1 2 2 a1 1 0 1 1 -1 -1 M21 14 m-2 0 a2 2 0 1 1 2 2 a1 1 0 1 1 -1 -1', 1.3),
  shade: sgP('k0', 'M5.5 11.5 H26.5 L25 17 Q23 19 20.5 17 L19.5 14.5 H12.5 L11.5 17 Q9 19 7 17Z'),
};
const SK_M = {
  smile: sgL('', 'M9.5 19.5 Q16 25.8 22.5 19.5', 1.7),
  laugh: sgP('k0', 'M8.5 18.2 Q16 31 23.5 18.2Z') + sgP('r1', 'M12.2 24.4 Q16 21.4 19.8 24.4 Q16 27.8 12.2 24.4Z') + sgP('s1', 'M9.2 18.7 H22.8 L21.8 20.8 H10.2Z'),
  grin: sgP('s1', 'M7.5 18 Q16 28.5 24.5 18 Q16 20.6 7.5 18Z') + sgL('', 'M12 20 V24 M16 20.4 V25.3 M20 20 V24', 1),
  frown: sgL('', 'M10 24.4 Q16 18.6 22 24.4', 1.7),
  grit: sgR('s1', 8.5, 19, 15, 6.6, 2.6) + sgL('', 'M13.3 19 V25.6 M18.2 19 V25.6 M8.5 22.3 H23.5', 1),
  o: sgE('k0', 16, 22.4, 3, 3.8),
  smirk: sgL('', 'M10 21.6 Q16 23.6 23.5 18.4', 1.7),
  sob: sgL('', 'M9.5 23.8 Q11.5 20.4 13.5 23.8 Q15.5 20.4 17.5 23.8 Q19.5 20.4 22.5 23.8', 1.6),
  fangs: sgL('', 'M9.5 20 Q16 25 22.5 20', 1.6) + sgP('s1', 'M11.6 21.8 L12.8 26 L14.4 22.8Z M20.4 21.8 L19.2 26 L17.6 22.8Z'),
  tongue: sgL('', 'M10 19.5 Q16 23 22 19.5', 1.6) + sgP('r1', 'M13 21 Q16 21.5 19 21 V25.5 A3 3 0 0 1 13 25.5Z'),
};
const SGC = { k1: '#e9eff5', k2: '#aab9c8', k3: '#667a8e', w1: '#c88c54', w2: '#8c582a', g1: '#ffe98f', g2: '#f2b434', r2: '#e24b36', b1: '#b0e0ff', b2: '#4f9ce2', n1: '#c3ee92', n2: '#62b44a', p2: '#9b60d9', s1: '#f8f1de', s2: '#d6c9a4', o2: '#f68c3c', pk: '#ff9fc4', t2: '#35bba6', sk: '#f4bf90' }; // couleurs des traits épais (sgT)
const sgTear = (x, y, s = 1) => sgG(`translate(${x} ${y}) scale(${s})`, sgP('b1', 'M0 0 C0 0 -3 4.6 -3 7 A3 3 0 0 0 3 7 C3 4.6 0 0 0 0Z'));

/* ---- badges : dessinés dans une case 16×16 ---- */
const sgBadgeDrop = m => sgP(m, 'M8 1.6 C8 1.6 2.8 7.4 2.8 10.4 C2.8 13 5.1 14.6 8 14.6 C10.9 14.6 13.2 13 13.2 10.4 C13.2 7.4 8 1.6 8 1.6Z') + sgP('hl', 'M5.4 10.2 C5.5 8.8 6.2 7.8 6.9 7.1 C6.6 8.4 6.6 9.5 7.2 10.6Z');
SK_B.up = sgP('n2', 'M8 2 L13.4 8.2 H10 V14 H6 V8.2 H2.6Z');
SK_B.down = sgP('r2', 'M8 14 L13.4 7.8 H10 V2 H6 V7.8 H2.6Z');
SK_B.plus = sgP('n2', 'M6 2.4 H10 V6 H13.6 V10 H10 V13.6 H6 V10 H2.4 V6 H6Z');
SK_B.star = sgP('g1', sgStar(8, 8.6, 6.6, 2.8, 5));
SK_B.skull = sgC('s1', 8, 6.8, 5) + sgR('s1', 5.4, 9, 5.2, 4.8, 1.2) + sgC('k0', 6, 7, 1.3) + sgC('k0', 10, 7, 1.3);
SK_B.heart = sgP('r2', 'M8 14 C1.5 9.5 1.5 5.5 4.2 3.8 C6 2.8 7.4 3.8 8 5.4 C8.6 3.8 10 2.8 11.8 3.8 C14.5 5.5 14.5 9.5 8 14Z');
SK_B.coin = sgC('g2', 8, 8, 6.2) + sgC('g1', 8, 8, 4) + sgL('', 'M8 5.6 V10.4', 1.1);
SK_B.flame = sgP('r2', 'M8 1.5 C8.8 5 13 6.5 13 10.2 C13 13 10.8 14.8 8 14.8 C5.2 14.8 3 13 3 10.2 C3 7.4 5.4 6.5 5.8 3.6 C6.8 4.6 7.5 3.6 8 1.5Z') + sgP('g1', 'M8 8 C8.5 9.6 10.2 10.2 10.2 11.8 C10.2 12.9 9.3 13.6 8 13.6 C6.7 13.6 5.8 12.9 5.8 11.8 C5.8 10.2 7.5 9.6 8 8Z');
SK_B.drop = sgBadgeDrop('b2');
SK_B.blood = sgBadgeDrop('r2');
SK_B.poison = sgBadgeDrop('n2');
SK_B.snow = sgL('lw', 'M8 1.8 V14.2 M2.7 4.9 L13.3 11.1 M13.3 4.9 L2.7 11.1', 1.5);
SK_B.bolt = sgP('g1', 'M9.6 1.4 L3.8 9 H7.6 L6.4 14.6 L12.4 6.6 H8.6Z');
SK_B.shield = sgP('b2', 'M8 1.8 L13.2 3.8 V8 C13.2 11.4 10.8 13.4 8 14.8 C5.2 13.4 2.8 11.4 2.8 8 V3.8Z') + sgP('hl', 'M4.6 4.8 L8 3.6 V12.8 C6 11.6 4.6 10 4.6 8Z');
SK_B.sword = sgG('rotate(45 8 8)', sgP('k1', 'M8 1.2 L9.9 3.8 V10 H6.1 V3.8Z') + sgR('g2', 4, 9.8, 8, 1.9, .8) + sgR('w2', 7.1, 11.7, 1.8, 3.2, .6));
SK_B.clock = sgC('s1', 8, 8, 6.4) + sgL('', 'M8 4.2 V8 L10.8 9.6', 1.3);
SK_B.eye = sgP('s1', 'M1.4 8 Q8 2 14.6 8 Q8 14 1.4 8Z') + sgC('b2', 8, 8, 2.9) + sgC('k0', 8, 8, 1.3);
SK_B.crown = sgP('g2', 'M2.2 12.6 L2.2 5 L5.4 8 L8 3 L10.6 8 L13.8 5 L13.8 12.6Z') + sgR('g1', 2.2, 11.4, 11.6, 2.2, .6);
SK_B.gear = sgGear(8, 8, 4.4, 8, 'k2');
SK_B.lock = sgR('g2', 3.4, 7, 9.2, 7, 1.4) + sgL('', 'M5.4 7 V5 A2.6 2.6 0 0 1 10.6 5 V7', 1.5) + sgC('k0', 8, 10.4, 1);
SK_B.mute = sgP('s1', 'M2 6 H5 L9 2.8 V13.2 L5 10 H2Z') + sgL('', 'M10.6 5.4 L14.4 10.6 M14.4 5.4 L10.6 10.6', 1.5);
SK_B.feather = sgP('s1', 'M13.5 2 C7 2.5 3.5 6.5 3.2 12.8 L4.6 13.6 C5 11 6 9.6 7.4 8.6 C6.8 10.2 7 11.6 7 11.6 C10 9.6 13.6 7.4 13.5 2Z') + sgL('', 'M3.4 13.6 L8 8', 1);
SK_B.target = sgC('s1', 8, 8, 6.4) + sgC('r2', 8, 8, 4.2) + sgC('s1', 8, 8, 2.4) + sgC('r2', 8, 8, 1);
SK_B.question = sgL('lw', 'M5.4 5.6 A2.8 2.8 0 1 1 8.6 8.4 C8 9 8 9.6 8 10.6 M8 12.4 V12.6', 1.8);
SK_B.sparkle = sgP('g1', 'M8 1.5 Q8.9 7.1 14.5 8 Q8.9 8.9 8 14.5 Q7.1 8.9 1.5 8 Q7.1 7.1 8 1.5Z');
SK_B.fist = sgP('sk', 'M3 7 A2.4 2.4 0 0 1 7.2 5.5 A2.4 2.4 0 0 1 11.6 6 A2.2 2.2 0 0 1 13.4 9 V12 Q13.4 14 10.5 14 H6.5 Q3.6 14 3.6 11.5Z');

/* ---- rendu : « glyphe » ou « glyphe|badge » → <svg> ---- */
function skIco(spec, cls = '') {
  const [m, b] = String(spec || '').split('|'), g = SK_G[m];
  if (!g) return `<span class="gi-fb">?</span>`;
  return `<svg class="gi${cls ? ' ' + cls : ''}" viewBox="-1 -1 34 34" aria-hidden="true">${g}${b && SK_B[b] ? `<g class="bd" transform="translate(16.6 16.6)"><circle class="k4" cx="7.6" cy="7.6" r="8.3"/><g transform="translate(-.4 -.4) scale(.98)">${SK_B[b]}</g></g>` : ''}</svg>`;
}
