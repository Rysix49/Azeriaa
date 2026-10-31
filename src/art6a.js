/* =====================================================================
   FAMILIERS — dessins 6a : Tofunet, Bouftounet, Wabbinou, Blopinet
   SVG originaux (viewBox 96, face à droite). Ids de dégradés : pTf*, pBo*, pWa*, pBl*.
   Aides locales préfixées _a6a*.
   ===================================================================== */

/* contour d'un nuage de laine : n bosses (arcs) autour d'une ellipse */
function _a6aCloud(cx, cy, rx, ry, n, k, ph) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = ph + i * 2 * Math.PI / n; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  let d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n], q = pts[i - 1], r = Math.hypot(p[0] - q[0], p[1] - q[1]) * k;
    d += 'A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
  }
  return d + 'Z';
}
/* petite boucle de laine (spirale) */
function _a6aCurl(x, y, s) {
  const f = v => (v * s).toFixed(1);
  return `<path d="M${x} ${y}c0 ${f(-4)} ${f(6)} ${f(-4)} ${f(6)} 0c0 ${f(3.2)} ${f(-4.2)} ${f(3.6)} ${f(-4)} ${f(.8)}"/>`;
}
/* grand oeil brillant (groupe qui cligne) */
function _a6aEye(grad, cx, cy, rx, ry, line) {
  const e = v => v.toFixed(1);
  return `<g class="pt-eye"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${grad})" stroke="${line}" stroke-width="1.1"/>`
    + `<ellipse cx="${e(cx - rx * .28)}" cy="${e(cy - ry * .36)}" rx="${e(rx * .44)}" ry="${e(ry * .36)}" fill="#fff"/>`
    + `<circle cx="${e(cx + rx * .32)}" cy="${e(cy + ry * .42)}" r="${e(rx * .21)}" fill="#fff" opacity=".85"/></g>`;
}
/* patte de mouton : jambe + sabot */
function _a6aLeg(x, w, top, leg, hoof) {
  const x2 = x + w;
  return `<path d="M${x} ${top}V82H${x2}V${top}Z" fill="${leg}" stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round"/>`
    + `<path d="M${x - .5} 81.2H${x2 + .5}V84.2Q${x2 + .5} 86.5 ${x2 - 1.5} 86.5H${x + 1}Q${x - .5} 86.5 ${x - .5} 84.2Z" fill="${hoof}" stroke="#2b1a14" stroke-width="1.6" stroke-linejoin="round"/>`;
}

/* ---------------------------------------------------------------- TOFUNET */
PET_ART.tofunet = `<svg class="pet pet-tofunet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pTf1" cx="36%" cy="26%" r="82%"><stop offset="0" stop-color="#fff6b4"/><stop offset=".35" stop-color="#fadf5c"/><stop offset=".75" stop-color="#eebb2e"/><stop offset="1" stop-color="#c58512"/></radialGradient>
  <radialGradient id="pTf2" cx="42%" cy="30%" r="78%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".55" stop-color="#ffe98a"/><stop offset="1" stop-color="#f2cc52"/></radialGradient>
  <linearGradient id="pTf3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc766"/><stop offset=".55" stop-color="#f08a2e"/><stop offset="1" stop-color="#c25f16"/></linearGradient>
  <linearGradient id="pTf4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbdb55"/><stop offset=".55" stop-color="#e5a826"/><stop offset="1" stop-color="#b87710"/></linearGradient>
  <linearGradient id="pTf5" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2e8a2c"/><stop offset=".55" stop-color="#63c43c"/><stop offset="1" stop-color="#c4f27a"/></linearGradient>
  <radialGradient id="pTf6" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#7a5236"/><stop offset=".5" stop-color="#2e1c13"/><stop offset="1" stop-color="#0e0807"/></radialGradient>
  <linearGradient id="pTf7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc2cf"/><stop offset=".6" stop-color="#f48aa2"/><stop offset="1" stop-color="#c85874"/></linearGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g class="pt-body" stroke-linejoin="round" stroke-linecap="round">
  <g class="pt-tail" stroke="#33200f" stroke-width="1.8" fill="url(#pTf4)">
    <path d="M25 70 Q15 69 9 62 Q18 60 26 64Z"/>
    <path d="M24 64 Q13 59 10 50 Q19 51 27 58Z"/>
    <path d="M25 74 Q16 78 9 75 Q15 69 26 69Z"/>
  </g>
  <g stroke="#33200f" stroke-width="1.6">
    <path d="M57 77V84" stroke-width="5.4"/><path d="M57 77V84" stroke="#f48aa2" stroke-width="2.4"/>
    <ellipse cx="57.5" cy="85.2" rx="6.6" ry="2.6" fill="url(#pTf7)"/>
    <path d="M55 84.2V86.6M59.6 84.2V86.6" stroke-width="1"/>
    <path d="M37 77V84" stroke-width="5.4"/><path d="M37 77V84" stroke="#f48aa2" stroke-width="2.4"/>
    <ellipse cx="37.5" cy="85.2" rx="6.6" ry="2.6" fill="url(#pTf7)"/>
    <path d="M35 84.2V86.6M39.6 84.2V86.6" stroke-width="1"/>
  </g>
  <ellipse cx="46" cy="66" rx="25" ry="17" fill="url(#pTf1)" stroke="#33200f" stroke-width="2"/>
  <ellipse cx="51" cy="72" rx="15.5" ry="9.5" fill="url(#pTf2)"/>
  <path d="M26 72C28 80 38 84 50 83C41 80 33 77 30 68Z" fill="#b87710" opacity=".28"/>
  <path d="M46 78q2.5 2.4 5 0M55 77q2.5 2.4 5 0M51 73q2.5 2.4 5 0" stroke="#d9ab3a" stroke-width="1.1" fill="none"/>
  <g class="pt-wing" style="transform-origin:88% 12%" stroke="#33200f" stroke-width="1.8">
    <path d="M46 61.6C38 59.6 29 64 28 72C27.6 76 30 78.8 33 78.4C34.4 80.6 38.4 80.4 40 77.8C42.6 78 45 75 46.6 71.4C48.2 67.8 48.4 63.4 46 61.6Z" fill="url(#pTf4)"/>
    <path d="M31.6 72.4C34 68.6 39 66.2 44 66.4" stroke="#fff3a8" stroke-width="1.3" fill="none" opacity=".7"/>
    <path d="M33 78.2q1-3 .4-5.2M40 77.8q.6-3.2-.4-5.6" stroke="#9a6410" stroke-width="1" fill="none" opacity=".7"/>
  </g>
  <g class="pt-head">
    <circle cx="50" cy="43" r="25" fill="url(#pTf1)" stroke="#33200f" stroke-width="2.2"/>
    <path d="M30 31C34 23 41 19 49 19C42 23 37 28 35 37Z" fill="#fff" opacity=".5" stroke="none"/>
    <path d="M70 61C62 68 50 69 40 65C52 66 63 63 70 54Z" fill="#b87710" opacity=".25" stroke="none"/>
    <path d="M25 41q-4-1-5-5q4 0 6 2M26 35q-4-3-3-7q4 2 5 5" fill="#f2c73a" stroke="#33200f" stroke-width="1.5"/>
    <ellipse cx="55" cy="53" rx="4.6" ry="3" fill="#ff8fa6" opacity=".6" stroke="none"/>
    <ellipse cx="67.5" cy="55" rx="3.4" ry="2.4" fill="#ff8fa6" opacity=".5" stroke="none"/>
    ${_a6aEye('pTf6', 55.5, 41.5, 6, 7.4, '#1c0f08')}
    ${_a6aEye('pTf6', 69.6, 40.5, 4.6, 6.6, '#1c0f08')}
    <g stroke="#33200f" stroke-width="1.7">
      <path d="M67 47.4Q77 45.2 88.4 51.4Q77.6 53.8 67 53.8Z" fill="url(#pTf3)"/>
      <path d="M67 53.8Q77.6 53.6 87.6 52.6Q83 58.6 72.4 57.6Q67 56.8 67 53.8Z" fill="#d9701f"/>
      <path d="M71.4 49.2Q78 47.8 84 50.4" stroke="#ffe0a0" stroke-width="1.2" fill="none" opacity=".85"/>
    </g>
    <g class="pt-ear" style="transform-origin:50% 100%" stroke="#1f5a22" stroke-width="1.7">
      <path d="M50 19Q49 14 51 9" stroke="#33200f" stroke-width="4.2" fill="none"/>
      <path d="M50 19Q49 14 51 9" stroke="#4ea83a" stroke-width="2" fill="none"/>
    </g>
    <g class="pt-ear" style="transform-origin:100% 100%" stroke="#17481b" stroke-width="1.6">
      <path d="M50.6 10.5C45 3.6 35.5 4.2 33.6 9.6C39.6 14 46.6 13.6 50.6 10.5Z" fill="url(#pTf5)"/>
      <path d="M36 9.4Q43 9.4 48 10.6" stroke="#d8f89a" stroke-width="1" fill="none" opacity=".8"/>
    </g>
    <g class="pt-ear b" style="transform-origin:0% 100%" stroke="#17481b" stroke-width="1.6">
      <path d="M51.4 9C54.4 2.4 63.6 0.8 67.2 5.2C63.4 11.2 56 12 51.4 9Z" fill="url(#pTf5)"/>
      <path d="M54 8.2Q60 6 64.6 6" stroke="#d8f89a" stroke-width="1" fill="none" opacity=".8"/>
    </g>
  </g>
</g>
</svg>`;

/* ------------------------------------------------------------- BOUFTOUNET */
PET_ART.bouftounet = `<svg class="pet pet-bouftounet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pBo1" cx="35%" cy="24%" r="86%"><stop offset="0" stop-color="#fffef6"/><stop offset=".35" stop-color="#f8f0da"/><stop offset=".72" stop-color="#ebe0c2"/><stop offset="1" stop-color="#c7b186"/></radialGradient>
  <radialGradient id="pBo2" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#fcf1d8"/><stop offset=".6" stop-color="#efdcb6"/><stop offset="1" stop-color="#d3b98c"/></radialGradient>
  <radialGradient id="pBo3" cx="40%" cy="28%" r="80%"><stop offset="0" stop-color="#f3dfb8"/><stop offset=".6" stop-color="#d9b98e"/><stop offset="1" stop-color="#b08a5e"/></radialGradient>
  <linearGradient id="pBo4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dcb98a"/><stop offset=".5" stop-color="#a9835a"/><stop offset="1" stop-color="#76522f"/></linearGradient>
  <linearGradient id="pBo5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a534c"/><stop offset="1" stop-color="#2e2220"/></linearGradient>
  <linearGradient id="pBo6" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3e3c0"/><stop offset="1" stop-color="#cfae7f"/></linearGradient>
  <radialGradient id="pBo7" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#6b4a38"/><stop offset=".5" stop-color="#2e1c13"/><stop offset="1" stop-color="#0e0807"/></radialGradient>
  <linearGradient id="pBo8" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0cdb4"/><stop offset="1" stop-color="#d79c88"/></linearGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g class="pt-body" stroke-linejoin="round" stroke-linecap="round">
  ${_a6aLeg(60, 7, 72, '#b69a70', '#3d2e2a')}
  ${_a6aLeg(31, 7, 72, '#b69a70', '#3d2e2a')}
  ${_a6aLeg(51, 7, 72, 'url(#pBo6)', 'url(#pBo5)')}
  ${_a6aLeg(22, 7, 72, 'url(#pBo6)', 'url(#pBo5)')}
  <path class="pt-tail" style="transform-origin:100% 50%" d="${_a6aCloud(12, 57, 6.4, 6.4, 6, .62, .3)}" fill="url(#pBo1)" stroke="#2b1a14" stroke-width="1.9"/>
  <path d="${_a6aCloud(38, 58, 28, 20, 11, .62, .3)}" fill="url(#pBo1)" stroke="#2b1a14" stroke-width="2"/>
  <g fill="none" stroke="#cdb78c" stroke-width="1.2" opacity=".9">
    ${_a6aCurl(20, 52, 1)}${_a6aCurl(30, 66, 1)}${_a6aCurl(43, 72, 1)}${_a6aCurl(24, 62, .8)}${_a6aCurl(15, 62, .8)}${_a6aCurl(34, 47, 1)}${_a6aCurl(45, 50, .9)}${_a6aCurl(54, 68, .9)}
  </g>
  <path d="M16 51C18 43 25 39 33 39M24 43C28 41 31 40 36 40" stroke="#fff" stroke-width="2" fill="none" opacity=".75"/>
  <path d="M20 72C27 80 42 82 55 77C44 82 29 80 22 70Z" fill="#b59d70" opacity=".35"/>
  <g class="pt-head">
    <g fill="none" stroke="#2b1a14" stroke-width="7.2">
      <path d="M55 35C49 25 36 26 35 35"/><path d="M35 35C34 43 44 45 46 38" stroke-width="6.2"/><path d="M46 38C47 34 42 33 41 36" stroke-width="5"/>
      <path d="M75 34C79 26 89 29 88 37"/><path d="M88 37C87 43 80 43 80 39" stroke-width="6.2"/><path d="M80 39C80 36 84 36 84 38" stroke-width="5"/>
    </g>
    <g fill="none" stroke="url(#pBo4)" stroke-width="4.6">
      <path d="M55 35C49 25 36 26 35 35"/><path d="M35 35C34 43 44 45 46 38" stroke-width="3.6"/><path d="M46 38C47 34 42 33 41 36" stroke-width="2.6"/>
      <path d="M75 34C79 26 89 29 88 37"/><path d="M88 37C87 43 80 43 80 39" stroke-width="3.6"/><path d="M80 39C80 36 84 36 84 38" stroke-width="2.6"/>
    </g>
    <path d="M50 29C44 25 39 27 37 31" stroke="#f1dcb8" stroke-width="1.2" fill="none" opacity=".8"/>
    <path d="M42 28.8l-1.6 3.4M46.6 26.8l-.6 3.6M38 31.5l-2.2 2.6" stroke="#5e3f22" stroke-width="1.1" opacity=".7"/>
    <g class="pt-ear" style="transform-origin:88% 8%" stroke="#2b1a14" stroke-width="1.8">
      <path d="M51 45C43 43 37 49 38 57C38 60 41 61 44 59C48 57 52 53 53 49Z" fill="url(#pBo2)"/>
      <path d="M50 48C45 47 41 51 42 56C46 55 49 52 50 48Z" fill="url(#pBo8)" stroke="none"/>
    </g>
    <g class="pt-ear b" style="transform-origin:12% 8%" stroke="#2b1a14" stroke-width="1.8">
      <path d="M80 44C86 42 90 47 89 54C89 58 86 58 83 56C81 53 79 49 80 44Z" fill="url(#pBo2)"/>
      <path d="M82 46C85 46 87 49 86 53C84 52 82 50 82 46Z" fill="url(#pBo8)" stroke="none"/>
    </g>
    <ellipse cx="66" cy="52" rx="18" ry="17" fill="url(#pBo2)" stroke="#2b1a14" stroke-width="2"/>
    <ellipse cx="75" cy="62" rx="9.5" ry="6.8" fill="url(#pBo3)" stroke="#2b1a14" stroke-width="1.8"/>
    <path d="M69 59C71 57 74 56.6 77 57.2" stroke="#fff" stroke-width="1.4" fill="none" opacity=".5"/>
    <path d="M77.4 58.6Q80 56.6 82.8 58.6Q82.8 61.8 80.2 62.4Q77.4 61.8 77.4 58.6Z" fill="#4a2e22" stroke="#2b1a14" stroke-width="1"/>
    <circle cx="79.2" cy="58.4" r=".9" fill="#fff" opacity=".8"/>
    <path d="M80.2 62.4V64.4M74.4 65.4Q77.4 68.2 80.4 64.4" stroke="#4a2e22" stroke-width="1.3" fill="none"/>
    <ellipse cx="57" cy="62" rx="4.4" ry="2.8" fill="#f09c8c" opacity=".55"/>
    ${_a6aEye('pBo7', 60.5, 53.5, 4.4, 5.6, '#1c0f08')}
    ${_a6aEye('pBo7', 74.2, 52.5, 3.6, 5.1, '#1c0f08')}
    <path d="${_a6aCloud(66, 37, 19.5, 10.5, 9, .62, .25)}" fill="url(#pBo1)" stroke="#2b1a14" stroke-width="2"/>
    <path d="${_a6aCloud(70, 27.5, 8, 6.4, 6, .64, .5)}" fill="url(#pBo1)" stroke="#2b1a14" stroke-width="1.9"/>
    <g fill="none" stroke="#cdb78c" stroke-width="1.2">${_a6aCurl(58, 38, 1)}${_a6aCurl(68, 40, .9)}${_a6aCurl(76, 38, .8)}${_a6aCurl(67, 27, .9)}</g>
    <path d="M55 31C58 27 63 26 67 26.4" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
  </g>
</g>
</svg>`;

/* --------------------------------------------------------------- WABBINOU */
PET_ART.wabbinou = `<svg class="pet pet-wabbinou" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pWa1" cx="36%" cy="26%" r="84%"><stop offset="0" stop-color="#d9e5f8"/><stop offset=".35" stop-color="#b4c6e4"/><stop offset=".72" stop-color="#9fb4d6"/><stop offset="1" stop-color="#6c86b2"/></radialGradient>
  <radialGradient id="pWa2" cx="40%" cy="28%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef3fb"/><stop offset="1" stop-color="#c8d6ec"/></radialGradient>
  <linearGradient id="pWa3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd2de"/><stop offset=".6" stop-color="#f7a0bb"/><stop offset="1" stop-color="#d86d92"/></linearGradient>
  <linearGradient id="pWa4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".4" stop-color="#f6c43c"/><stop offset="1" stop-color="#c9791a"/></linearGradient>
  <linearGradient id="pWa5" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#2e8a2c"/><stop offset=".55" stop-color="#63c43c"/><stop offset="1" stop-color="#c4f27a"/></linearGradient>
  <radialGradient id="pWa6" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#5a6a8a"/><stop offset=".5" stop-color="#232a3c"/><stop offset="1" stop-color="#0a0d16"/></radialGradient>
  <radialGradient id="pWa7" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef3fb"/><stop offset="1" stop-color="#bccce6"/></radialGradient>
  <linearGradient id="pWa8" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a5b9db"/><stop offset="1" stop-color="#6d87b3"/></linearGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g class="pt-body" stroke-linejoin="round" stroke-linecap="round">
  <path class="pt-tail" style="transform-origin:100% 70%" d="${_a6aCloud(20, 75, 7.6, 7.6, 7, .62, .2)}" fill="url(#pWa7)" stroke="#2b1a14" stroke-width="1.9"/>
  <ellipse cx="62" cy="84.6" rx="9" ry="3.2" fill="url(#pWa8)" stroke="#2b1a14" stroke-width="1.7"/>
  <ellipse cx="46" cy="68" rx="25" ry="18" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="2"/>
  <ellipse cx="55" cy="72" rx="14.5" ry="12.5" fill="url(#pWa2)"/>
  <ellipse cx="49.6" cy="83" rx="11.6" ry="3.9" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="1.8"/>
  <path d="M55.6 81.6V84.4M58.4 82.2V84.2" stroke="#2b1a14" stroke-width="1.1" opacity=".6"/>
  <ellipse cx="34.5" cy="72.4" rx="13.5" ry="13" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="1.8"/>
  <path d="M25 69C26 63 31 61 36 62" stroke="#e4edfa" stroke-width="1.8" fill="none" opacity=".75"/>
  <g class="pt-head">
    <g class="pt-ear b" stroke="#2b1a14" stroke-width="1.9">
      <path d="M60 36C58 22 65 9 73.6 4.4C79.4 2.6 82 8 80 15C78.4 22 75.6 29 73 36Z" fill="url(#pWa8)"/>
      <path d="M64 32C63 22 67 13 73.4 9.2C76.6 8.6 77 12 75.6 17C74.4 22 72.6 27 71 33Z" fill="url(#pWa3)" stroke="none"/>
    </g>
    <g class="pt-ear" stroke="#2b1a14" stroke-width="1.9">
      <path d="M43 36C37 26 35.6 13 39.6 6.4C43 2 48.6 3.4 51 9.4C54 17 55 26 56 36Z" fill="url(#pWa1)"/>
      <path d="M46.6 33C42 25 40.6 16 43.2 10.4C45.4 8 48 9.6 49.2 13C51.6 19 52 26 52 33Z" fill="url(#pWa3)" stroke="none"/>
      <path d="M42.4 10C41 16 41.8 22 44 27" stroke="#e9f0fb" stroke-width="1.4" fill="none" opacity=".7"/>
    </g>
    <path d="M30 46C30 32 40 25.5 54 25.5C68 25.5 78 32 78 46C78 58 70 65.5 54 65.5C38 65.5 30 58 30 46Z" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="2.2"/>
    <path d="M34 36C38 29 45 27 52 27C45 31 40 36 38 44Z" fill="#fff" opacity=".45"/>
    <path d="M57 51C62 49 70 49 75 52C77 57 72 64 63 64.5C55 64 53 56 57 51Z" fill="url(#pWa2)"/>
    <ellipse cx="55" cy="55.5" rx="5" ry="3.2" fill="#ff93ae" opacity=".55"/>
    <ellipse cx="73.5" cy="57" rx="3" ry="2.2" fill="#ff93ae" opacity=".45"/>
    ${_a6aEye('pWa6', 56, 43.8, 5.4, 6.7, '#14101c')}
    ${_a6aEye('pWa6', 69.8, 42.8, 4.2, 6, '#14101c')}
    <path d="M73.6 51.4Q77 49.6 80 51.6Q79.2 55 76.6 55.4Q73.6 54.6 73.6 51.4Z" fill="#f3799c" stroke="#2b1a14" stroke-width="1.2"/>
    <circle cx="76" cy="51.6" r=".9" fill="#fff" opacity=".85"/>
    <path d="M76.6 55.4V57.6M71.6 58.2Q74.2 60.6 76.6 57.6Q79 60.2 80.6 58" stroke="#2b1a14" stroke-width="1.2" fill="none"/>
    <path d="M62 56.2L50 54.4M62.2 58.4L51.4 59.6" stroke="#8aa2cb" stroke-width="1" opacity=".7"/>
  </g>
  <path d="M51.6 62.4C46 58.8 38 56.6 33 58.4C34 63.2 41 66.2 47.6 66.4Z" fill="#6ea02a" stroke="#2b1a14" stroke-width="1.5" transform="translate(0 0)"/>
  <path d="M51.6 62.4C47.6 56.6 41.5 51.8 37 52.4C37 57.6 43 62 48 63.8Z" fill="url(#pWa5)" stroke="#17481b" stroke-width="1.5"/>
  <path d="M51.8 62.4C51.6 56 49 50.6 45 49.4C43.8 54.6 46 60.4 50 64Z" fill="url(#pWa5)" stroke="#17481b" stroke-width="1.5"/>
  <path d="M46.6 66.8C44.4 61 48 57 53.6 58.2C64 61.4 72 70.4 77.4 83C66.4 81.4 52.4 75.6 46.6 66.8Z" fill="url(#pWa4)" stroke="#6b3a0c" stroke-width="1.9"/>
  <path d="M51 63.6Q53.6 65.2 55.6 62.4M55.2 68Q58.4 69.4 60.4 66.2M61 73.4Q64.2 74.4 66.2 71.6M67.4 78.4Q70 79.2 71.6 77" stroke="#c4741a" stroke-width="1.2" fill="none"/>
  <path d="M52.2 60.4C57 61.2 62 65 65 69" stroke="#fffbd0" stroke-width="1.6" fill="none" opacity=".8"/>
  <ellipse cx="54.8" cy="70.6" rx="5.4" ry="4.4" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="1.7"/>
  <ellipse cx="64.8" cy="77.2" rx="5.4" ry="4.4" fill="url(#pWa1)" stroke="#2b1a14" stroke-width="1.7"/>
  <path d="M51.6 67.6v1.8M54.6 66.8v1.8M57.6 67.4v1.8M61.6 74.4v1.8M64.6 73.8v1.8M67.6 74.6v1.8" stroke="#6c86b2" stroke-width="1" fill="none"/>
</g>
</svg>`;

/* -------------------------------------------------------------- BLOPINET */
PET_ART.blopinet = `<svg class="pet pet-blopinet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pBl1" gradientUnits="userSpaceOnUse" cx="38" cy="38" r="66"><stop offset="0" stop-color="#8fecf5" stop-opacity=".96"/><stop offset=".4" stop-color="#4fc3d9" stop-opacity=".93"/><stop offset=".8" stop-color="#2796bd" stop-opacity=".92"/><stop offset="1" stop-color="#1d7fa8" stop-opacity=".95"/></radialGradient>
  <radialGradient id="pBl2" cx="50%" cy="60%" r="60%"><stop offset="0" stop-color="#c8fbff" stop-opacity=".9"/><stop offset="1" stop-color="#7ee6f2" stop-opacity="0"/></radialGradient>
  <linearGradient id="pBl3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ee6f2" stop-opacity=".7"/><stop offset="1" stop-color="#2796bd" stop-opacity=".7"/></linearGradient>
  <radialGradient id="pBl4" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#5b7480"/><stop offset=".5" stop-color="#14262f"/><stop offset="1" stop-color="#050b0e"/></radialGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<ellipse cx="49" cy="84.4" rx="43" ry="4.4" fill="url(#pBl3)" stroke="#12475f" stroke-width="1.6"/>
<g class="pt-body"><g class="pt-squish" stroke-linejoin="round" stroke-linecap="round">
  <path d="M10 80C8 62 14 44 28 34C38 27 47 25 55 25C69 25 81 36 85 52C88 62 90 72 88 80C87 86 70 88 49 88C28 88 11 86 10 80Z" fill="url(#pBl1)" stroke="#12475f" stroke-width="2.2"/>
  <ellipse class="pt-glow" cx="49" cy="77" rx="31" ry="9.5" fill="url(#pBl2)"/>
  <path d="M14 80C15 86 30 86.6 49 86.6C68 86.6 83 85.6 84 79" stroke="#c0f7ff" stroke-width="1.6" fill="none" opacity=".6"/>
  <g class="bl-bub"><circle cx="29" cy="66" r="3.6" fill="#fff" fill-opacity=".14" stroke="#e2fcff" stroke-width="1.1"/><circle cx="27.8" cy="64.8" r="1" fill="#fff"/></g>
  <g class="bl-bub" style="animation-delay:-1.2s"><circle cx="39" cy="75" r="2.4" fill="#fff" fill-opacity=".14" stroke="#e2fcff" stroke-width="1"/><circle cx="38.2" cy="74.2" r=".7" fill="#fff"/></g>
  <g class="bl-bub" style="animation-delay:-2.3s"><circle cx="22" cy="75" r="2" fill="#fff" fill-opacity=".14" stroke="#e2fcff" stroke-width="1"/><circle cx="21.4" cy="74.4" r=".6" fill="#fff"/></g>
  <g class="bl-bub" style="animation-delay:-.6s"><circle cx="76" cy="72" r="2.8" fill="#fff" fill-opacity=".14" stroke="#e2fcff" stroke-width="1"/><circle cx="75" cy="71" r=".8" fill="#fff"/></g>
  <path d="M17 56C19 46 25 39 33 35C38 32.6 43 31.6 47 31.4C38 35.4 31 43 28 58Z" fill="#fff" opacity=".6"/>
  <ellipse cx="22.6" cy="64" rx="1.8" ry="3" fill="#fff" opacity=".6"/>
  <path d="M81 49C84 57 86 65 85 73" stroke="#bff6ff" stroke-width="2" fill="none" opacity=".5"/>
  <path d="M20 79C20 70 26 63 30 58" stroke="#12475f" stroke-width="2.4" fill="none" opacity=".2"/>
  <ellipse cx="55" cy="61" rx="4.6" ry="2.8" fill="#ffb4c6" opacity=".85"/>
  <ellipse cx="78" cy="59" rx="3.2" ry="2.2" fill="#ffb4c6" opacity=".75"/>
  <g class="pt-eye"><ellipse cx="59" cy="53" rx="4.3" ry="5.4" fill="url(#pBl4)" stroke="#06151c" stroke-width="1"/><ellipse cx="57.8" cy="51" rx="1.8" ry="1.9" fill="#fff"/><circle cx="60.6" cy="55.4" r=".9" fill="#fff" opacity=".85"/></g>
  <g class="pt-eye"><ellipse cx="73.2" cy="52" rx="3.5" ry="4.9" fill="url(#pBl4)" stroke="#06151c" stroke-width="1"/><ellipse cx="72.2" cy="50.2" rx="1.5" ry="1.7" fill="#fff"/><circle cx="74.6" cy="54.2" r=".8" fill="#fff" opacity=".85"/></g>
  <path d="M60 62.4Q66.6 61 73 62.4Q72.4 69.6 66.6 69.6Q60.6 69.6 60 62.4Z" fill="#0d3a52" stroke="#06151c" stroke-width="1.2"/>
  <path d="M63 67.4Q66.6 64.6 70.4 67.4Q66.6 70 63 67.4Z" fill="#ff7f9c"/>
  <g class="bl-drop">
    <path d="M46 31C44 21 50 13 59 11C57 16 57 20 61 26C61 29 55 32 49 32Z" fill="url(#pBl1)"/>
    <path d="M46.4 28C44 20 50 13 59 11C57 16 57 20 61 26" fill="none" stroke="#12475f" stroke-width="2.2"/>
    <path d="M49 24C48.8 20 51 17 54.4 15.2" stroke="#fff" stroke-width="1.8" fill="none" opacity=".75"/>
  </g>
  <g class="pt-spark" style="transform-origin:50% 50%"><path d="M18 36l1.6 3.6l3.6 1.6l-3.6 1.6l-1.6 3.6l-1.6-3.6l-3.6-1.6l3.6-1.6Z" fill="#fff" stroke="none"/></g>
  <g class="pt-spark b"><path d="M80 28l1.2 2.6l2.6 1.2l-2.6 1.2l-1.2 2.6l-1.2-2.6l-2.6-1.2l2.6-1.2Z" fill="#fff" stroke="none"/></g>
</g>
</g>
</svg>`;
PET_CSS.blopinet = `
.pet-blopinet .bl-drop { transform-origin: 30% 100%; animation: blopinetDrop 2.4s ease-in-out infinite; }
.pet-blopinet .bl-bub { animation: blopinetBub 3.6s ease-in-out infinite; }
@keyframes blopinetDrop { 0%, 100% { transform: rotate(-5deg) scale(1, 1); } 50% { transform: rotate(7deg) scale(.96, 1.06); } }
@keyframes blopinetBub { 0%, 100% { transform: translateY(3px); opacity: .25; } 25%, 75% { opacity: 1; } 50% { transform: translateY(-4px); opacity: 1; } }
`;
