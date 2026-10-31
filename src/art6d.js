/* =====================================================================
   FAMILIERS (4/4 — lot D) : Carpette, Scarabin, Ombrelin, Rosette
   Dessins originaux (viewBox 96, face à droite). Animations : classes pt-* de petart.css,
   plus quelques keyframes propres dans PET_CSS (préfixées par l'id).
   Ids de dégradés : pCa* / pSc* / pOm* / pRo*.
   ===================================================================== */
PET_ART.carpette = `<svg class="pet pet-carpette" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
<radialGradient id="pCa1" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#f6feff" stop-opacity=".5"/><stop offset=".5" stop-color="#c3ecfb" stop-opacity=".4"/><stop offset=".85" stop-color="#7cc6ef" stop-opacity=".55"/><stop offset="1" stop-color="#3f98d6" stop-opacity=".78"/></radialGradient>
<radialGradient id="pCa2" cx="42%" cy="22%" r="88%"><stop offset="0" stop-color="#ffd2a0"/><stop offset=".3" stop-color="#ffa461"/><stop offset=".62" stop-color="#ff8a4a"/><stop offset="1" stop-color="#cf4f1c"/></radialGradient>
<linearGradient id="pCa3" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a4a"/><stop offset=".5" stop-color="#ffb06c"/><stop offset="1" stop-color="#ffe2b8"/></linearGradient>
<linearGradient id="pCa4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6e0"/><stop offset="1" stop-color="#ffd896"/></linearGradient>
<clipPath id="pCa5"><path d="M30 50 C34 38 44 31 57 31 C71 31 82 41 82 53 C82 66 72 74 58 74 C46 74 36 67 30 55 Z"/></clipPath>
<linearGradient id="pCa6" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e0558f"/><stop offset=".6" stop-color="#ff95bd"/><stop offset="1" stop-color="#ffdbe8"/></linearGradient>
<radialGradient id="pCa7" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".55" stop-color="#c9741c"/><stop offset="1" stop-color="#5a2a10"/></radialGradient>
<linearGradient id="pCa8" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fd88a"/><stop offset="1" stop-color="#2f8a55"/></linearGradient>
<linearGradient id="pCa9" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc58a" stop-opacity=".8"/><stop offset="1" stop-color="#fff0d8" stop-opacity=".55"/></linearGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<ellipse cx="48" cy="86" rx="28" ry="3.4" fill="#9fdcf7" opacity=".6" stroke="#4a9fd8" stroke-opacity=".5" stroke-width="1"/>
<g class="pt-float">
<ellipse cx="48" cy="47.5" rx="40" ry="36.5" fill="url(#pCa1)"/>
<path d="M9 55 C13 75 30 84 48 84 C66 84 83 75 87 55 C72 66 24 66 9 55 Z" fill="#2f86cf" opacity=".2"/>
<g transform="translate(-2 .5)">
<g class="pt-body" stroke="#3b1a10" stroke-linejoin="round" stroke-linecap="round">
<g class="pt-tail" style="animation-delay:-.7s;animation-duration:2.3s"><path d="M35 52 C28 45 21 40 13 37 C12 45 14 51 20 54 C14 58 13 65 18 71 C26 68 31 61 35 55 Z" fill="url(#pCa9)" stroke="none"/></g>
<path class="pt-wing b" style="transform-origin:50% 100%" d="M62 33 C59 23 50 16 38 17 C42 21 41 27 35 32 C44 32 52 34 58 36 Z" fill="url(#pCa3)" stroke-width="1.7"/>
<path d="M58 34 C55 26 49 20 41 18 M52 34 C49 28 44 24 38 22" fill="none" stroke="#ff8a4a" stroke-width="1" opacity=".7"/>
<g class="pt-tail">
<path d="M34 52 C29 47 23 43 16 36 C14 43 16 48 21 52 C16 56 16 62 20 68 C26 65 30 60 34 54 Z" fill="url(#pCa3)" stroke-width="1.8"/>
<path d="M33 52.5 L19 40 M33 52.5 L20 49 M33 53 L21 60 M33 53 L23 65" stroke="#ff8a4a" stroke-width="1.1" fill="none" opacity=".75"/>
</g>
<path d="M30 50 C34 38 44 31 57 31 C71 31 82 41 82 53 C82 66 72 74 58 74 C46 74 36 67 30 55 Z" fill="url(#pCa2)" stroke="none"/>
<g clip-path="url(#pCa5)" stroke="none">
<path d="M34 61 C46 74 68 76 84 62 L84 78 L30 78 Z" fill="url(#pCa4)" opacity=".9"/>
<path d="M35 37 C42 29 56 28 62 33 C63 38 57 41 53 40 C49 45 40 45 35 41 Z" fill="#fff4e2"/>
<path d="M66 35 C70 31 77 33 78 38 C74 41 68 41 66 35 Z" fill="#fff4e2"/>
<path d="M38 55 C43 52 49 55 49 60 C47 65 41 65 38 61 Z" fill="#fff4e2" opacity=".95"/>
<path d="M32 38 q3 3.6 6 0 M38 38 q3 3.6 6 0 M44 38 q3 3.6 6 0 M50 38 q3 3.6 6 0 M56 38 q3 3.6 6 0 M62 38 q3 3.6 6 0 M35 44.2 q3 3.6 6 0 M41 44.2 q3 3.6 6 0 M47 44.2 q3 3.6 6 0 M53 44.2 q3 3.6 6 0 M59 44.2 q3 3.6 6 0 M65 44.2 q3 3.6 6 0 M32 50.4 q3 3.6 6 0 M38 50.4 q3 3.6 6 0 M44 50.4 q3 3.6 6 0 M50 50.4 q3 3.6 6 0 M56 50.4 q3 3.6 6 0 M62 50.4 q3 3.6 6 0 M35 56.6 q3 3.6 6 0 M41 56.6 q3 3.6 6 0 M47 56.6 q3 3.6 6 0 M53 56.6 q3 3.6 6 0 M59 56.6 q3 3.6 6 0 M65 56.6 q3 3.6 6 0 M32 62.8 q3 3.6 6 0 M38 62.8 q3 3.6 6 0 M44 62.8 q3 3.6 6 0 M50 62.8 q3 3.6 6 0 M56 62.8 q3 3.6 6 0 M62 62.8 q3 3.6 6 0 M35 69 q3 3.6 6 0 M41 69 q3 3.6 6 0 M47 69 q3 3.6 6 0 M53 69 q3 3.6 6 0 M59 69 q3 3.6 6 0 M65 69 q3 3.6 6 0" fill="none" stroke="#ffd25e" stroke-width="1.1" opacity=".85"/>
<path d="M28 60 C36 74 56 78 72 72 C62 80 38 80 28 68 Z" fill="#a8380f" opacity=".3"/>
<path d="M36 40 C42 32 54 30 62 34" stroke="#fff" stroke-width="2.2" fill="none" opacity=".5"/>
</g>
<path d="M30 50 C34 38 44 31 57 31 C71 31 82 41 82 53 C82 66 72 74 58 74 C46 74 36 67 30 55 Z" fill="none" stroke-width="1.9"/>
<path d="M65 38 C61 46 61 60 65 69" fill="none" stroke="#b8421a" stroke-width="1.5" opacity=".65"/>
<path class="pt-wing" style="transform-origin:88% 8%" d="M62 59 C55 58 47 62 42 71 C48 70 53 72 55 77 C59 71 64 67 66 61 Z" fill="url(#pCa3)" stroke-width="1.7"/>
<path d="M60 61 L47 70 M61 63 L53 73 M63 62 L57 71" fill="none" stroke="#ff8a4a" stroke-width=".9" opacity=".65"/>
<ellipse cx="72" cy="55" rx="3.4" ry="2.2" fill="#ff6a86" opacity=".5" stroke="none"/>
<g class="pt-eye"><ellipse cx="73" cy="45.5" rx="6.3" ry="7" fill="#fffdf4" stroke-width="1.7"/><circle cx="74.2" cy="46.6" r="4.7" fill="url(#pCa7)" stroke="none"/><circle cx="74.6" cy="46.9" r="2.5" fill="#150a06" stroke="none"/><circle cx="76.2" cy="44" r="1.9" fill="#fff" stroke="none"/><circle cx="72.4" cy="49.6" r=".9" fill="#fff" stroke="none" opacity=".8"/></g>
<path d="M81 61 C80 66 76 69 72 68.5" fill="none" stroke="#3b1a10" stroke-width="2.4"/><path d="M81 61 C80 66 76 69 72 68.5" fill="none" stroke="#ffd25e" stroke-width=".9"/>
<path d="M82.5 60 C85 63 84 67 81.5 70" fill="none" stroke="#3b1a10" stroke-width="2.4"/><path d="M82.5 60 C85 63 84 67 81.5 70" fill="none" stroke="#ffd25e" stroke-width=".9"/>
<ellipse cx="80.6" cy="58.3" rx="4" ry="3.7" fill="#ff7a4a" stroke-width="1.6"/><ellipse cx="81.3" cy="58.5" rx="1.7" ry="1.6" fill="#4a1208" stroke="none"/><path d="M78.2 56.4 C79 55.4 80.2 55 81.4 55.3" stroke="#ffd0a8" stroke-width=".9" fill="none" stroke-linecap="round"/>
</g>
</g>
<ellipse cx="48" cy="47.5" rx="40" ry="36.5" fill="none" stroke="#2f7fb5" stroke-opacity=".75" stroke-width="1.9"/>
<ellipse cx="48" cy="47.5" rx="37.6" ry="34.1" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>
<path d="M14 40 C16 28 25 19 37 14.5" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" opacity=".8"/>
<circle cx="11.5" cy="48" r="1.7" fill="#fff" opacity=".85"/>
<path d="M82 64 C78 72 71 78 62 81" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".42"/>
<g stroke="#2f7fb5" stroke-width="1" fill="#fff" fill-opacity=".3">
<g class="pt-spark"><circle cx="19" cy="62" r="2.3"/><circle cx="18.2" cy="61.2" r=".7" fill="#fff" stroke="none"/></g>
<g class="pt-spark b"><circle cx="27" cy="26" r="1.7"/></g>
<g class="pt-spark c"><circle cx="76" cy="24" r="2.4"/><circle cx="75.2" cy="23.2" r=".7" fill="#fff" stroke="none"/></g>
</g>
<g transform="translate(58 13) scale(.92) translate(-58 -13)" style="transform-box:view-box;transform-origin:0 0" stroke="#6a1f3c" stroke-width="1.5" stroke-linejoin="round">
<ellipse cx="58" cy="12.6" rx="11" ry="2.9" fill="url(#pCa8)" stroke="#1f5a3a"/>
<path d="M58 13 C51 12 47 8 47 3.5 C52 4 56 7 58 13 Z" fill="url(#pCa6)"/>
<path d="M58 13 C65 12 69 8 69 3.5 C64 4 60 7 58 13 Z" fill="url(#pCa6)"/>
<path d="M58 13 C54 9 54 3 58 -.5 C62 3 62 9 58 13 Z" fill="url(#pCa6)"/>
<path d="M58 11 L58 3" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>
</g>
</g>
</svg>`;
PET_ART.scarabin = `<svg class="pet pet-scarabin" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
<radialGradient id="pSc1" cx="34%" cy="22%" r="85%"><stop offset="0" stop-color="#fff3a8"/><stop offset=".28" stop-color="#f2cf58"/><stop offset=".6" stop-color="#e0b23a"/><stop offset=".86" stop-color="#b07a1c"/><stop offset="1" stop-color="#7a4f10"/></radialGradient>
<linearGradient id="pSc2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8fff2"/><stop offset=".45" stop-color="#3ec5b0"/><stop offset="1" stop-color="#127466"/></linearGradient>
<linearGradient id="pSc3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6d56a"/><stop offset=".5" stop-color="#d9a52c"/><stop offset="1" stop-color="#a8761a"/></linearGradient>
<radialGradient id="pSc4" cx="36%" cy="28%" r="82%"><stop offset="0" stop-color="#fff0a0"/><stop offset=".45" stop-color="#e8bf48"/><stop offset="1" stop-color="#a8741a"/></radialGradient>
<linearGradient id="pSc5" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff6cf" stop-opacity=".78"/><stop offset=".6" stop-color="#fff0b0" stop-opacity=".6"/><stop offset="1" stop-color="#9af0df" stop-opacity=".55"/></linearGradient>
<clipPath id="pSc6"><path d="M11 70 C9 52 18 34 36 28 C50 23 66 29 72 44 C75 52 75 62 73 71 C60 76 26 76 11 70 Z"/></clipPath>
<radialGradient id="pSc7" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#d98a3a"/><stop offset=".6" stop-color="#6a3a10"/><stop offset="1" stop-color="#2a1404"/></radialGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g transform="translate(44 87) scale(.94) translate(-48 -87)" style="transform-box:view-box;transform-origin:0 0">
<g class="pt-body" stroke="#3a2208" stroke-linejoin="round" stroke-linecap="round">
<g><path d="M30 70 L27 78 L25 84" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M30 70 L27 78 L25 84" fill="none" stroke="#9a6a1a" stroke-width="3.4"/><path d="M40 71 L41 79 L39 84.5" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M40 71 L41 79 L39 84.5" fill="none" stroke="#9a6a1a" stroke-width="3.4"/><path d="M66 70 L74 75 L76 83" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M66 70 L74 75 L76 83" fill="none" stroke="#9a6a1a" stroke-width="3.4"/></g>
<g><path d="M22 70 L15 78 L12 84.5" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M22 70 L15 78 L12 84.5" fill="none" stroke="url(#pSc3)" stroke-width="3.4"/><path d="M46 72 Q53 77 50 85" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M46 72 Q53 77 50 85" fill="none" stroke="url(#pSc3)" stroke-width="3.4"/><path d="M62 70 L69 77 L69.5 85" fill="none" stroke="#3a2208" stroke-width="6"/><path d="M62 70 L69 77 L69.5 85" fill="none" stroke="url(#pSc3)" stroke-width="3.4"/></g>
<g fill="url(#pSc3)" stroke-width="1.6"><ellipse cx="12" cy="85" rx="3.4" ry="2"/><ellipse cx="50" cy="85.4" rx="3.4" ry="2"/><ellipse cx="70" cy="85.4" rx="3.4" ry="2"/></g>
<g fill="url(#pSc3)" stroke-width="1.5"><circle cx="15" cy="78" r="2.2"/><circle cx="51" cy="77.2" r="2.2"/><circle cx="69" cy="77" r="2.2"/></g>
<path class="pt-wing b" style="transform-origin:100% 85%" d="M54 33 C48 19 38 11 26 10 C28 21 38 30 50 37 Z" fill="url(#pSc5)" stroke="#9a6a1a" stroke-width="1.5"/>
<path class="pt-wing" style="transform-origin:100% 85%" d="M48 36 C38 24 24 17 12 19 C15 29 28 38 44 42 Z" fill="url(#pSc5)" stroke="#9a6a1a" stroke-width="1.6"/>
<path d="M44 38 C34 29 25 23 15 21 M44 36 C37 30 28 26 20 25 M52 33 C45 24 37 16 29 12" fill="none" stroke="#c9a24a" stroke-width="1" opacity=".8"/>
<path d="M11 70 C9 52 18 34 36 28 C50 23 66 29 72 44 C75 52 75 62 73 71 C60 76 26 76 11 70 Z" fill="url(#pSc1)" stroke-width="2.1"/>
<g clip-path="url(#pSc6)" stroke="none">
<path d="M62 34 C46 25 24 32 8 60 L8 20 L70 20 Z" fill="#a8741a" opacity=".38"/>
<path d="M10 66 C28 78 58 78 76 66 L76 80 L8 80 Z" fill="#6a4010" opacity=".4"/>
<path d="M18 52 C20 40 28 33 38 30" fill="none" stroke="#fffbe0" stroke-width="3" stroke-linecap="round" opacity=".55"/>
<ellipse cx="29" cy="40" rx="4.2" ry="2.6" fill="#fffbe0" opacity=".6"/>
<path d="M12 67.5 C30 73 56 73 74 67.5" fill="none" stroke="#3a2208" stroke-width="5.6"/>
<path d="M12 67.5 C30 73 56 73 74 67.5" fill="none" stroke="#3ec5b0" stroke-width="3.4" stroke-dasharray="4.4 2.6"/>
</g>
<path d="M62 35 C48 28 28 36 15 58" fill="none" stroke="#5a3a0c" stroke-width="1.7"/>
<path d="M62.8 36.4 C49 29.6 29 37.6 16.2 59.2" fill="none" stroke="#fff0a0" stroke-width=".8" opacity=".6"/>
<g fill="none" stroke="#5a3a0c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
<circle cx="22" cy="55" r="2.3"/><path d="M22 57.3 L22 65.5 M18.6 60.4 L25.4 60.4"/>
<path d="M45 47.5 q2.2-2 4.4 0 t4.4 0 M45 52.2 q2.2-2 4.4 0 t4.4 0"/>
<path d="M44 61 C46.6 57.6 51.4 57.6 54.4 61 C51.4 64 46.6 64 44 61 Z M49.2 61 m-1.1 0 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 M54.4 61 L57.2 63.2"/>
</g>
<g stroke="#5a3a0c" stroke-width="1.6"><path d="M35 44.5 L41.5 52.5 L35 60.5 L28.5 52.5 Z" fill="url(#pSc2)"/></g>
<path d="M35 47 L38.8 52.5 L35 53.5 L31.6 52.5 Z" fill="#fff" opacity=".4"/>
<circle cx="35" cy="52.5" r="1.5" fill="#127466" opacity=".7"/>
<path d="M58 44 C59 34 70 33 74 42 L75 62 C70 68 62 67 57 63 Z" fill="url(#pSc4)" stroke-width="2"/>
<path d="M62 50 C64 56 64 61 62 65" fill="none" stroke="#fff6bf" stroke-width="1.4" opacity=".6"/>
<g stroke="#5a3a0c" stroke-width="1.5"><path d="M66.5 39.5 L70 44 L66.5 48.5 L63 44 Z" fill="url(#pSc2)"/></g>
<circle cx="66.5" cy="44" r="1" fill="#127466" opacity=".7"/>
<g class="pt-head">
<path d="M74 47 C75 40 79 36 84 35" fill="none" stroke="#3a2208" stroke-width="3.8"/><path d="M74 47 C75 40 79 36 84 35" fill="none" stroke="#c8932a" stroke-width="1.7"/>
<ellipse cx="85.5" cy="34" rx="3.6" ry="2.8" fill="url(#pSc2)" stroke-width="1.5"/>
<path d="M83 50 C88 42 96 42 98 49 C93 47 89 49 87 53 Z" fill="url(#pSc3)" stroke-width="1.7"/>
<ellipse cx="76" cy="58" rx="14" ry="13" fill="url(#pSc4)" stroke-width="2.1"/>
<path d="M82 60 C88 66 96 64 98.5 56 C93 59 89 58 85 55 Z" fill="url(#pSc4)" stroke-width="1.8"/>
<path d="M66 50 C70 46 78 45 84 49" fill="none" stroke="#fff6bf" stroke-width="2" stroke-linecap="round" opacity=".6"/>
<g class="pt-eye b"><ellipse cx="84" cy="55" rx="3.6" ry="4.6" fill="#fffdf2" stroke-width="1.5"/><circle cx="84.9" cy="55.8" r="2.6" fill="url(#pSc7)" stroke="none"/><circle cx="85.1" cy="56" r="1.4" fill="#120a02" stroke="none"/><circle cx="85.9" cy="54" r="1" fill="#fff" stroke="none"/></g>
<g class="pt-eye"><ellipse cx="72" cy="57" rx="5.8" ry="6.6" fill="#fffdf2" stroke-width="1.8"/><circle cx="73.4" cy="58.2" r="4.2" fill="url(#pSc7)" stroke="none"/><circle cx="73.8" cy="58.5" r="2.2" fill="#120a02" stroke="none"/><circle cx="75.2" cy="55.8" r="1.7" fill="#fff" stroke="none"/><circle cx="71.6" cy="61" r=".8" fill="#fff" stroke="none" opacity=".8"/></g>
<ellipse cx="67" cy="65" rx="3.2" ry="2" fill="#ff8a6a" opacity=".5" stroke="none"/>
<path d="M76 66.4 Q80 69 84 65.6" fill="none" stroke-width="1.6"/>
</g>
</g>
</g>
<path class="pt-spark" d="M56 9 L57.3 12.7 L61 14 L57.3 15.3 L56 19 L54.7 15.3 L51 14 L54.7 12.7 Z" fill="#fff3a8"/><path class="pt-spark b" d="M80 18 L81 21 L84 22 L81 23 L80 26 L79 23 L76 22 L79 21 Z" fill="#fff3a8"/><path class="pt-spark c" d="M4 42.6 L4.9 45.1 L7.4 46 L4.9 46.9 L4 49.4 L3.1 46.9 L0.6 46 L3.1 45.1 Z" fill="#fff3a8"/>
</svg>`;
PET_ART.ombrelin = `<svg class="pet pet-ombrelin" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
<radialGradient id="pOm1" cx="36%" cy="26%" r="88%"><stop offset="0" stop-color="#9a72e0"/><stop offset=".32" stop-color="#7c4dbd"/><stop offset=".7" stop-color="#43306f"/><stop offset="1" stop-color="#2a1f3d"/></radialGradient>
<radialGradient id="pOm2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#c0a4fa" stop-opacity=".4"/><stop offset=".7" stop-color="#a888f0" stop-opacity=".14"/><stop offset="1" stop-color="#a888f0" stop-opacity="0"/></radialGradient>
<linearGradient id="pOm3" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#43306f"/><stop offset="1" stop-color="#7c4dbd"/></linearGradient>
<radialGradient id="pOm4" cx="92%" cy="68%" r="95%"><stop offset="0" stop-color="#a47ee8"/><stop offset=".5" stop-color="#6a45b0"/><stop offset="1" stop-color="#3a2a68"/></radialGradient>
<radialGradient id="pOm5" cx="8%" cy="68%" r="95%"><stop offset="0" stop-color="#a47ee8"/><stop offset=".5" stop-color="#6a45b0"/><stop offset="1" stop-color="#3a2a68"/></radialGradient>
<radialGradient id="pOm6" cx="40%" cy="34%" r="72%"><stop offset="0" stop-color="#ffe4fa"/><stop offset=".28" stop-color="#ff5ad8"/><stop offset=".78" stop-color="#b8199a"/><stop offset="1" stop-color="#6a0a58"/></radialGradient>
<linearGradient id="pOm7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7aa6"/><stop offset=".5" stop-color="#d4306a"/><stop offset="1" stop-color="#85123f"/></linearGradient>
<linearGradient id="pOm8" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c0309a"/><stop offset="1" stop-color="#ff8fe0"/></linearGradient>
<clipPath id="pOm9"><ellipse cx="49" cy="55" rx="27" ry="25"/></clipPath>
<radialGradient id="pOm10" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#b090f0"/><stop offset="1" stop-color="#6a45aa"/></radialGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g transform="translate(48 88) scale(.93) translate(-48 -88)" style="transform-box:view-box;transform-origin:0 0">
<g class="pt-float" stroke="#150d26" stroke-linejoin="round" stroke-linecap="round">
<g class="om-sm" style="animation-delay:-0.9s"><path d="M47 32 C40.6 28 50.8 24.8 45.7 20.8 C41.9 17.6 45.7 14.4 50.8 12 C49.6 15.2 47 16.8 49.6 20 C54.7 24.8 47 27.2 53.4 32 Z" fill="#6a4aa8" stroke="#1d1432" stroke-width="1" stroke-linejoin="round" opacity=".62"/><path d="M48.9 31.2 C44.4 28 52.1 24.8 48.3 20.8" fill="none" stroke="#c0a4fa" stroke-width="1.2" stroke-linecap="round" opacity=".6"/></g><g class="om-sm" style="animation-delay:-1.8s"><path d="M7 86 C1.8 82.8 10.1 80.2 6 76.9 C2.8 74.3 6 71.7 10.1 69.8 C9.1 72.4 7 73.7 9.1 76.3 C13.2 80.2 7 82.1 12.2 86 Z" fill="#6a4aa8" stroke="#1d1432" stroke-width="1" stroke-linejoin="round" opacity=".62"/><path d="M8.6 85.4 C4.9 82.8 11.2 80.2 8 76.9" fill="none" stroke="#c0a4fa" stroke-width="1.2" stroke-linecap="round" opacity=".6"/></g><g class="om-sm"><path d="M91 86 C96.2 82.8 87.9 80.2 92 76.9 C95.2 74.3 92 71.7 87.9 69.8 C88.9 72.4 91 73.7 88.9 76.3 C84.8 80.2 91 82.1 85.8 86 Z" fill="#6a4aa8" stroke="#1d1432" stroke-width="1" stroke-linejoin="round" opacity=".62"/><path d="M89.4 85.4 C93.1 82.8 86.8 80.2 90 76.9" fill="none" stroke="#c0a4fa" stroke-width="1.2" stroke-linecap="round" opacity=".6"/></g>
<g class="pt-wing" style="transform-origin:87% 70%"><path d="M28 60 Q15.5 40.5 9 23 Q13.2 42.2 2 43 Q12.2 55.1 6 62 Q16.8 65 16 73 Q23.7 70.2 27 78 L32 72 Z" fill="url(#pOm4)" stroke-width="2"/><path d="M28 60 Q15.5 40.5 9 23" fill="none" stroke="#150d26" stroke-width="2.8"/><path d="M9 23 L2 43 M9 23 L6 62 M9 23 L16 73 M9 23 L27 78" fill="none" stroke="#150d26" stroke-width="1.6"/><path d="M5.9 33 L2.7 41 M7.9 42.5 L6.3 58.1 M12.9 48 L15.3 68 M18.4 50.5 L25.2 72.5" fill="none" stroke="#b79af5" stroke-width=".9" opacity=".5"/><path d="M9 23 q-1 -4 -4.5 -5.5" fill="none" stroke-width="2.2"/></g>
<g class="pt-wing om-wr" style="transform-origin:13% 70%"><path d="M70 60 Q82.5 40.5 89 23 Q84.9 42.2 96 43 Q85.8 55.1 92 62 Q81.2 65 82 73 Q74.3 70.2 71 78 L66 72 Z" fill="url(#pOm5)" stroke-width="2"/><path d="M70 60 Q82.5 40.5 89 23" fill="none" stroke="#150d26" stroke-width="2.8"/><path d="M89 23 L96 43 M89 23 L92 62 M89 23 L82 73 M89 23 L71 78" fill="none" stroke="#150d26" stroke-width="1.6"/><path d="M92.1 33 L95.3 41 M90.1 42.5 L91.7 58.1 M85.1 48 L82.7 68 M79.6 50.5 L72.8 72.5" fill="none" stroke="#b79af5" stroke-width=".9" opacity=".5"/><path d="M89 23 q1 -4 4.5 -5.5" fill="none" stroke-width="2.2"/></g>
<g class="pt-body">
<g class="pt-ear" style="transform-origin:60% 100%"><path d="M27 45 C21 30 24 15 29 6 C40 11 48 25 48 39 Z" fill="url(#pOm3)" stroke-width="2"/><path d="M32 39 C29 29 30 19 32.5 12.5 C38.5 17 42 26 42.5 36 Z" fill="url(#pOm8)" stroke="none"/></g>
<g class="pt-ear b" style="transform-origin:40% 100%"><path d="M53 36 C52 24 58 10 69 3 C77 12 78 30 72 44 Z" fill="url(#pOm3)" stroke-width="2"/><path d="M58 33 C58 24 62 15 68 10 C72.5 17 73.5 28 70 37 Z" fill="url(#pOm8)" stroke="none"/></g>
<g fill="url(#pOm10)" stroke-width="1.7"><path d="M36.5 77 Q34 83 37.5 84 Q39 82.5 40.4 84.2 Q43 83.4 43 78 Z"/><path d="M55 78 Q53.6 84 57 84.6 Q58.6 83 60 84.6 Q63 83.2 61.4 77.6 Z"/></g>
<ellipse cx="49" cy="55" rx="27" ry="25" fill="url(#pOm1)" stroke-width="2.2"/>
<ellipse cx="60" cy="56" rx="17" ry="15" fill="url(#pOm2)" stroke="none"/>
<path d="M29 46 C31 39 37 34 45 32" fill="none" stroke="#c9b0ff" stroke-width="3" opacity=".55"/><circle cx="26.5" cy="52" r="1.5" fill="#c9b0ff" stroke="none" opacity=".6"/>
<g clip-path="url(#pOm9)" stroke="none"><path d="M20 66 C30 82 66 86 80 64 L80 90 L20 90 Z" fill="#150d26" opacity=".35"/></g>
<path d="M25 63 C36 72 62 73 74 62 L70 70 C60 80 38 80 28 70 Z" fill="url(#pOm7)" stroke="#4a0a2a" stroke-width="1.8"/>
<path d="M30 66.5 C40 74 60 74.5 70 65.5" fill="none" stroke="#ffa8c4" stroke-width="1.2" opacity=".6"/>
<g class="pt-tail" stroke="#4a0a2a" stroke-width="1.8"><path d="M32 68 C26 66 21 70 14 68 C12 68 10 67 7 66 L11 71.5 L8 78 C15 77 22 77 26 76.5 C28 76 30 75 32 74 Z" fill="url(#pOm7)"/><path d="M30 69 L22 70" stroke="#ffa8c4" stroke-width="1" fill="none" opacity=".6"/></g>
<circle cx="30" cy="70" r="4.4" fill="url(#pOm7)" stroke="#4a0a2a" stroke-width="1.8"/>
<ellipse cx="74.5" cy="59" rx="4" ry="3.2" fill="url(#pOm10)" stroke-width="1.8"/><circle cx="75.4" cy="58.4" r=".9" fill="#150d26" stroke="none"/>
<ellipse class="pt-glow" cx="53" cy="52" rx="11" ry="11" fill="#ff5ad8" opacity=".35" stroke="none"/>
<ellipse class="pt-glow" cx="67.5" cy="51" rx="8" ry="8.5" fill="#ff5ad8" opacity=".35" stroke="none"/>
<g class="pt-eye b"><ellipse cx="67.5" cy="51" rx="5" ry="5.9" fill="url(#pOm6)" stroke="#3a0a3a" stroke-width="1.7"/><ellipse cx="68.8" cy="51.8" rx="1.8" ry="3.4" fill="#3a0a40" stroke="none"/><circle cx="67" cy="48.6" r="1.6" fill="#fff" stroke="none"/></g>
<g class="pt-eye"><ellipse cx="53" cy="52" rx="7" ry="7.7" fill="url(#pOm6)" stroke="#3a0a3a" stroke-width="1.9"/><ellipse cx="54.8" cy="53" rx="2.4" ry="4.4" fill="#3a0a40" stroke="none"/><circle cx="53.4" cy="48.3" r="2.2" fill="#fff" stroke="none"/><circle cx="49.8" cy="55.6" r=".95" fill="#fff" stroke="none" opacity=".85"/></g>
<path d="M45 42.5 Q52 40.5 60 44.6 M63 43.2 Q68 42 72.5 45.2" fill="none" stroke-width="2.4"/>
<ellipse cx="58" cy="61.5" rx="4" ry="2.3" fill="#ff5ad8" opacity=".32" stroke="none"/>
<path d="M61.5 64.4 Q67 69 73 64.2" fill="none" stroke-width="1.7"/>
<path d="M63.2 65.6 L66 66.2 L64.7 69.4 Z M69.4 66.5 L72.2 65.8 L70.9 69.4 Z" fill="#fff" stroke-width="1"/>
</g>
<path class="pt-spark" d="M40 10.6 L40.9 13.1 L43.4 14 L40.9 14.9 L40 17.4 L39.1 14.9 L36.6 14 L39.1 13.1 Z" fill="#ff8fe8"/><path class="pt-spark b" d="M88 61 L88.8 63.2 L91 64 L88.8 64.8 L88 67 L87.2 64.8 L85 64 L87.2 63.2 Z" fill="#ff8fe8"/><path class="pt-spark c" d="M7 49.4 L7.7 51.3 L9.6 52 L7.7 52.7 L7 54.6 L6.3 52.7 L4.4 52 L6.3 51.3 Z" fill="#ff8fe8"/>
</g>
</g>
</svg>`;
PET_ART.rosette = `<svg class="pet pet-rosette" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
<radialGradient id="pRo1" cx="40%" cy="22%" r="85%"><stop offset="0" stop-color="#f0608e"/><stop offset=".38" stop-color="#c8285a"/><stop offset=".66" stop-color="#b01e4a"/><stop offset="1" stop-color="#6a0e2e"/></radialGradient>
<radialGradient id="pRo2" cx="40%" cy="28%" r="80%"><stop offset="0" stop-color="#fff6ee"/><stop offset=".62" stop-color="#ffded2"/><stop offset="1" stop-color="#eeaaa4"/></radialGradient>
<radialGradient id="pRo3" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ff98a6"/><stop offset=".34" stop-color="#f0204a"/><stop offset=".72" stop-color="#bb0f2e"/><stop offset="1" stop-color="#6a0620"/></radialGradient>
<linearGradient id="pRo4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a2358"/><stop offset="1" stop-color="#2a0c24"/></linearGradient>
<radialGradient id="pRo5" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ff7aa8" stop-opacity=".55"/><stop offset=".6" stop-color="#ff7aa8" stop-opacity=".2"/><stop offset="1" stop-color="#ff7aa8" stop-opacity="0"/></radialGradient>
<linearGradient id="pRo6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d03a6a"/><stop offset="1" stop-color="#8a1438"/></linearGradient>
<linearGradient id="pRo7" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5aae7e"/><stop offset="1" stop-color="#2f6a4a"/></linearGradient>
<linearGradient id="pRo8" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb0cc" stop-opacity=".8"/><stop offset="1" stop-color="#b02a68" stop-opacity=".62"/></linearGradient>
<linearGradient id="pRo9" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fd09a"/><stop offset="1" stop-color="#2a6a46"/></linearGradient>
<linearGradient id="pRo10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0608e"/><stop offset=".5" stop-color="#d03a6a"/><stop offset="1" stop-color="#9a1844"/></linearGradient>
<linearGradient id="pRo11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff86ac"/><stop offset=".6" stop-color="#e8487a"/><stop offset="1" stop-color="#b8204e"/></linearGradient>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g class="pt-float" stroke="#2a0c1c" stroke-linejoin="round" stroke-linecap="round">
<circle class="pt-glow" cx="48" cy="38" r="36" fill="url(#pRo5)" stroke="none"/>
<path class="pt-wing b" style="transform-origin:100% 8%" d="M42 63 C34 63 23 67 19 75 C18 80 23 82 29 79 C37 75 42 69 42 63 Z" fill="url(#pRo8)" stroke="#8a2058" stroke-width="1.5"/>
<path class="pt-wing" d="M42 59 C34 59 21 55 14 44 C13 38 18 34 24 36 C34 40 41 50 42 59 Z" fill="url(#pRo8)" stroke="#8a2058" stroke-width="1.5"/>
<path d="M41 57 C34 50 26 44 18 40 M41 65 C35 68 28 72 22 77" fill="none" stroke="#fff" stroke-width=".8" opacity=".55"/>
<g class="pt-body">
<path d="M56 62 C63 60 69 57 72 51" fill="none" stroke="#143a26" stroke-width="4.6" stroke-linecap="round"/><path d="M56 62 C63 60 69 57 72 51" fill="none" stroke="url(#pRo7)" stroke-width="2.3999999999999995" stroke-linecap="round"/><path d="M56 62 C63 60 69 57 72 51" fill="none" stroke="#9be0b4" stroke-width=".7" stroke-linecap="round" opacity=".6" transform="translate(-.5 -.6)"/>
<path d="M72 51 C70 47 73 44 77 45 C78 49 76 52 72 51 Z" fill="url(#pRo9)" stroke="#143a26" stroke-width="1.4"/>
<path d="M60 60.6 L62.4 56.6 L63.4 59.4 Z" fill="#d94a6a" stroke="#4a0a24" stroke-width="1" stroke-linejoin="round"/>
<path d="M39 63 C33 69 31 73 32 77 Q37 81 41 77 Q45 82 49 77 Q53 82 57 77 Q61 81 66 77 C67 73 65 69 59 63 Z" fill="url(#pRo6)" stroke-width="1.8"/>
<g stroke="#4a0a24" stroke-width="1.7" fill="url(#pRo11)"><path d="M40 66 C36 70 35 75 38 78 C42 77 45 73 46 67 Z"/><path d="M46 67 C45 73 47 78 50 80 C53 78 55 73 54 67 Z"/><path d="M54 67 C55 73 58 77 62 78 C65 75 64 70 60 66 Z"/></g>
<path d="M39.5 67.5 C41 70 43 72 45 72.5 M60.5 67.5 C59 70 57 72 55 72.5 M50 69 C49 72 49.5 75 50 77" fill="none" stroke="#ffc0d4" stroke-width="1" opacity=".7"/>
<path d="M43 59 C43 57 57 57 57 59 L58 66 L42 66 Z" fill="url(#pRo6)" stroke-width="1.7"/>
<path d="M42 62 C37 60 35 63 35 66 C40 67 43 65 44 63 Z M58 62 C63 60 65 63 65 66 C60 67 57 65 56 63 Z" fill="url(#pRo9)" stroke="#143a26" stroke-width="1.3"/>
<path d="M46 79 L45 84" fill="none" stroke="#143a26" stroke-width="4.6" stroke-linecap="round"/><path d="M46 79 L45 84" fill="none" stroke="url(#pRo7)" stroke-width="2.3999999999999995" stroke-linecap="round"/><path d="M46 79 L45 84" fill="none" stroke="#9be0b4" stroke-width=".7" stroke-linecap="round" opacity=".6" transform="translate(-.5 -.6)"/><path d="M54 80 L55.5 84.5" fill="none" stroke="#143a26" stroke-width="4.6" stroke-linecap="round"/><path d="M54 80 L55.5 84.5" fill="none" stroke="url(#pRo7)" stroke-width="2.3999999999999995" stroke-linecap="round"/><path d="M54 80 L55.5 84.5" fill="none" stroke="#9be0b4" stroke-width=".7" stroke-linecap="round" opacity=".6" transform="translate(-.5 -.6)"/>
<g fill="url(#pRo9)" stroke="#143a26" stroke-width="1.5"><path d="M40 85 C42 81.5 49 82 51.5 85.2 C48.5 87.4 43.5 87.4 40 85 Z"/><path d="M52 85.6 C54.5 82 61 82.6 63.5 85.6 C60.5 87.8 55.5 87.8 52 85.6 Z"/></g>
<path d="M45 64 C41 65 38 68 37 72" fill="none" stroke="#143a26" stroke-width="4.6" stroke-linecap="round"/><path d="M45 64 C41 65 38 68 37 72" fill="none" stroke="url(#pRo7)" stroke-width="2.3999999999999995" stroke-linecap="round"/><path d="M45 64 C41 65 38 68 37 72" fill="none" stroke="#9be0b4" stroke-width=".7" stroke-linecap="round" opacity=".6" transform="translate(-.5 -.6)"/>
<path d="M37 71 C34 73 35 77 39 77.5 C41 74 40 71.5 37 71 Z" fill="url(#pRo9)" stroke="#143a26" stroke-width="1.4"/>
<path d="M40.6 65.6 L38.4 67.4 L42 68.4 Z" fill="#d94a6a" stroke="#4a0a24" stroke-width="1" stroke-linejoin="round"/>
<g class="pt-head">
<path d="M36 31 C25 38 24 56 32 65 C40 69 46 62 48 58 L48 34 Z" fill="url(#pRo4)" stroke-width="1.8"/>
<path d="M62 34 C69 40 69 53 65 59 L62 42 Z" fill="url(#pRo4)" stroke-width="1.6"/>
<path d="M33 36 C28 44 28 54 31 60" fill="none" stroke="#a04a88" stroke-width="1.6" opacity=".5"/>
<ellipse cx="51" cy="46" rx="17" ry="14.8" fill="url(#pRo2)" stroke-width="1.9"/>
<path d="M36 40 C38 36 42 34 46 34 C42 38 41 42 41 46 C38 46 36 44 36 40 Z" fill="url(#pRo4)" stroke="none" opacity=".9"/>
<ellipse cx="46.5" cy="54.5" rx="3.8" ry="2.4" fill="#ff6a8e" opacity=".55" stroke="none"/><ellipse cx="62" cy="54.5" rx="2.6" ry="1.9" fill="#ff6a8e" opacity=".5" stroke="none"/>
<g class="pt-eye b"><ellipse cx="63" cy="46.5" rx="3.6" ry="5" fill="url(#pRo3)" stroke="#2a0510" stroke-width="1.5"/><ellipse cx="63.8" cy="47.4" rx="1.4" ry="2.4" fill="#2a0510" stroke="none"/><circle cx="62.6" cy="44.6" r="1.4" fill="#fff" stroke="none"/></g>
<g class="pt-eye"><ellipse cx="52.5" cy="47.5" rx="5.2" ry="6.5" fill="url(#pRo3)" stroke="#2a0510" stroke-width="1.8"/><ellipse cx="53.7" cy="48.6" rx="1.9" ry="3.3" fill="#2a0510" stroke="none"/><circle cx="51.6" cy="44.8" r="2.1" fill="#fff" stroke="none"/><circle cx="55" cy="51.6" r=".9" fill="#fff" stroke="none" opacity=".85"/></g>
<path d="M46 43.4 C48.5 40.4 55 40.4 58.4 44.2 M46 43.4 L44.2 41.8 M60 42.6 C62.4 41.2 65 42 66.6 44.6" fill="none" stroke="#2a0510" stroke-width="2"/>
<path d="M56 56.4 Q59 59.4 62 56" fill="none" stroke="#9a1c3a" stroke-width="1.6"/>
<path d="M33 33 C27 31 23 35 21 41 C27 42 32 40 35 37 Z M67 33 C73 30 77 33 79 39 C73 41 69 39 66 37 Z" fill="url(#pRo9)" stroke="#143a26" stroke-width="1.4"/>
<path d="M29 27 C24 19 28 10 36 9 C41 9 43 13 45 17 Z" fill="#8a1438" stroke-width="1.8"/>
<path d="M69 27 C74 19 70 10 62 9 C57 9 55 13 53 17 Z" fill="#8a1438" stroke-width="1.8"/>
<path d="M27 28 C26 20 32 14 38 12 C42 15 56 15 60 12 C66 14 72 20 71 28 C66 37 32 37 27 28 Z" fill="url(#pRo1)" stroke-width="2"/>
<ellipse cx="49" cy="12.8" rx="10" ry="5.6" fill="#3a1230" stroke="#2a0c24" stroke-width="1.6"/>
<path d="M43 12.6 C43 9.6 50 9 53 11.6 C55 14 51 15.6 48.4 14 C46.6 12.8 48.6 11.4 50.4 12" fill="none" stroke="#b02a5a" stroke-width="1.3"/>
<path d="M28 28 C27 21 33 15 41 14.5 C37 19 38 26 44 31 C38 33 31 32 28 28 Z" fill="url(#pRo10)" stroke="#5a0a28" stroke-width="1.5"/>
<path d="M70 28 C71 21 65 15 57 14.5 C61 19 60 26 54 31 C60 33 67 32 70 28 Z" fill="url(#pRo10)" stroke="#5a0a28" stroke-width="1.5"/>
<path d="M39 31 C38 22 43 17 49 17 C55 17 60 22 59 31 C53 35 45 35 39 31 Z" fill="url(#pRo11)" stroke="#5a0a28" stroke-width="1.5"/>
<path d="M30 22 C32 17 36 15.4 40 15 M42 20 C44 18 46 17.6 49 17.6 M57 15.4 C61 16 65 18 67 22" fill="none" stroke="#ffc0d4" stroke-width="1.6" opacity=".8"/>
<path d="M41 30 C44 33 54 33 57 30" fill="none" stroke="#9a1844" stroke-width="1.2" opacity=".5"/>
<circle cx="60" cy="8.4" r="1.4" fill="#fff" stroke="none" opacity=".85"/>
</g>
</g>
<path class="ro-fall" d="M24 40 C21 38 21 34 24 32 C27 34 27 38 24 40 Z" fill="#d94a6a" stroke="#6a0e2e" stroke-width="1"/>
<path class="ro-fall" style="animation-delay:-1.4s" d="M76 30 C73 28 73 24 76 22 C79 24 79 28 76 30 Z" fill="#b01e4a" stroke="#4a0a24" stroke-width="1"/>
<path class="ro-fall" style="animation-delay:-2.5s" d="M16 56 C13 54 13 50 16 48 C19 50 19 54 16 56 Z" fill="#f0608e" stroke="#6a0e2e" stroke-width="1"/>
<path class="pt-spark" d="M86 36.2 L87 39 L89.8 40 L87 41 L86 43.8 L85 41 L82.2 40 L85 39 Z" fill="#ffd0e0"/><path class="pt-spark b" d="M12 18.8 L12.8 21.2 L15.2 22 L12.8 22.8 L12 25.2 L11.2 22.8 L8.8 22 L11.2 21.2 Z" fill="#ffd0e0"/><path class="pt-spark c" d="M80 67.2 L80.7 69.3 L82.8 70 L80.7 70.7 L80 72.8 L79.3 70.7 L77.2 70 L79.3 69.3 Z" fill="#ffd0e0"/>
</g>
</svg>`;
PET_CSS.ombrelin = `.pet.pet-ombrelin .pt-wing.om-wr { transform-origin: 13% 70%; animation: ombrelinWr .55s ease-in-out infinite alternate; }
@keyframes ombrelinWr { from { transform: rotate(16deg) scaleY(1); } to { transform: rotate(-10deg) scaleY(.82); } }
.pet-ombrelin .om-sm { animation: ombrelinSm 3.4s ease-in-out infinite; }
@keyframes ombrelinSm { 0%, 100% { transform: translateY(2px); opacity: .35; } 50% { transform: translateY(-4px); opacity: .9; } }`;
PET_CSS.rosette = `.pet-rosette .ro-fall { transform-origin: 50% 50%; animation: rosetteFall 3.6s ease-in infinite; opacity: 0; }
@keyframes rosetteFall { 0% { opacity: 0; transform: translate(0, 0) rotate(0); } 14% { opacity: 1; } 100% { opacity: 0; transform: translate(-5px, 30px) rotate(75deg); } }`;
