/* =====================================================================
   FAMILIERS — dessins (2/4) : Prespicou, Koalachon, Kanibou, Porcinet
   viewBox 96, tourné vers la droite, pieds à y ≈ 84-86. Classes d'animation
   de petart.css (pt-*) + quelques keyframes propres dans PET_CSS.
   Ids de dégradés : pPr* (Prespicou), pKo* (Koalachon), pKa* (Kanibou), pPo* (Porcinet).
   ===================================================================== */

/* ---- PRESPICOU ---- petit hérisson nerveux, dos hérissé de piquants roux ---- */
PET_ART.prespicou = `<svg class="pet pet-prespicou" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="pPr1" cx="40%" cy="25%" r="85%"><stop offset="0" stop-color="#e6ad7e"/><stop offset=".5" stop-color="#c07a4a"/><stop offset="1" stop-color="#8a4c2a"/></radialGradient>
    <radialGradient id="pPr2" cx="38%" cy="22%" r="88%"><stop offset="0" stop-color="#f0bf92"/><stop offset=".45" stop-color="#cf8d5a"/><stop offset="1" stop-color="#9a5a34"/></radialGradient>
    <radialGradient id="pPr3" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#fff3dc"/><stop offset=".6" stop-color="#f3d9b0"/><stop offset="1" stop-color="#d6aa72"/></radialGradient>
    <linearGradient id="pPr4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a4f25"/><stop offset=".6" stop-color="#6b3318"/><stop offset="1" stop-color="#4a210e"/></linearGradient>
    <radialGradient id="pPr7" cx="35%" cy="18%" r="85%"><stop offset="0" stop-color="#e09a62"/><stop offset=".5" stop-color="#b5622f"/><stop offset="1" stop-color="#85421f"/></radialGradient>
    <linearGradient id="pPr5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87648"/><stop offset="1" stop-color="#7c4526"/></linearGradient>
    <radialGradient id="pPr6" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#6b6f7a"/><stop offset=".6" stop-color="#2b2a30"/><stop offset="1" stop-color="#121216"/></radialGradient>
  </defs>
  <ellipse class="pt-shadow" cx="48" cy="88" rx="23" ry="4" fill="#000" opacity=".28"/>
  <g class="pt-body">
    <g stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
      <path d="M17 82 C17 79 21 79 24 80 L33 80 C36 82 36 85 33 86 L19 86 C17 86 16.500 84.500 17 82 Z" fill="url(#pPr5)"/>
      <path d="M71 81 C74 79 79 79.500 80 82 C81 85 78 86 75 86 L68 86 Z" fill="url(#pPr5)"/>
    </g>
    <path d="M17 62 C17 46 30 40 45 40 C62 40 72 50 72 64 C72 74 60 81 44 81 C28 81 17 74 17 62 Z" fill="url(#pPr1)" stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M22 72 C30 80 54 81 66 72 C66 78 56 82 44 82 C32 82 24 79 22 72 Z" fill="url(#pPr3)"/>
    <g class="pr-qa">
      <path d="M23.1 72.6 L9.1 78.4 L20.2 69.1 L5.5 72.3 L18.3 65.1 L5.8 65 L17.5 61 L4.8 58.4 L17.8 56.8 L3.8 51.1 L19.2 52.7 L7.7 45 L21.7 49 L13.5 40.4 L25.1 45.7 L17.3 34.8 L29.2 43 L22.5 29.8 L34 41 L30.4 28.9 L39.2 39.8 L37.8 28.3 L44.7 39.5 L44.5 25.6 L50 40 L52 25.9 L55.2 41.4 L59.2 30.2 L59.8 43.6 L66.1 33.1 L63.8 46.4 L73.7 35.6 L67 49.8 L79 42.6 L69.2 53.7 C68 74 40 78 25 72 Z" fill="url(#pPr4)" stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round"/><path d="M15.8 75.7 L10 77.9 L14.4 74 Z M12.5 70.7 L6.5 71.9 L11.6 68.9 Z M11.7 65.1 L6.6 64.9 L11.4 63.1 Z M10.8 59.6 L5.7 58.4 L11 57.6 Z M10.5 53.8 L4.8 51.4 L11.1 51.9 Z M13.2 48.6 L8.6 45.4 L14.3 46.9 Z M17.4 44.5 L14.2 40.9 L19 42.9 Z M21 39.9 L18 35.4 L23 38.7 Z M25.7 36.1 L23.1 30.7 L27.9 35.1 Z M32.1 34.6 L30.8 29.7 L34.6 34.1 Z M38.5 33.8 L38.1 29.1 L41 33.6 Z M44.6 32.2 L44.7 26.6 L47.1 32.5 Z M51.1 32.6 L52 26.9 L53.5 33.3 Z M57.3 35.5 L59.1 31 L59.5 36.5 Z M63.1 38.1 L65.8 33.9 L65 39.4 Z M69 40.7 L73.1 36.5 L70.5 42.3 Z M73.3 46.1 L78.3 43.3 L74.4 47.9 Z" fill="#e2b07c"/>
    </g>
    <g class="pr-qb">
      <path d="M25.8 65.8 L14.1 69 L23.9 62.5 L11.8 62.9 L23 58.9 L13 56.5 L23.3 55.3 L13.9 50.4 L24.7 51.9 L15.4 44.1 L27.1 48.8 L20.4 39.8 L30.4 46.2 L26.4 37.2 L34.5 44.2 L31.6 33.7 L39 42.9 L37.6 31.1 L43.8 42.5 L44.6 32 L48.7 42.9 L51.1 33.4 L53.3 44.1 L57.7 33.6 L57.3 46 L64.1 36.5 L60.7 48.6 L68.7 42.4 L63.2 51.7 C67 71 44 76 28 71 Z" fill="url(#pPr7)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 67.4 L14.8 68.7 L19 65.7 Z M17.9 62.7 L12.6 62.8 L17.4 60.9 Z M18 57.7 L13.7 56.6 L18.2 55.9 Z M18.6 52.9 L14.6 50.6 L19.3 51.2 Z M20.1 48 L16.2 44.6 L21.3 46.5 Z M23.8 44.3 L20.9 40.4 L25.4 43 Z M28.4 41.7 L26.8 37.8 L30.4 40.7 Z M33 39 L31.9 34.4 L35.3 38.3 Z M38.3 37.1 L37.9 32 L40.7 36.8 Z M44.2 37.3 L44.7 32.8 L46.6 37.5 Z M49.9 38.2 L51.1 34.1 L52.2 38.8 Z M55.5 38.9 L57.6 34.4 L57.5 39.9 Z M60.7 41.3 L63.8 37.2 L62.4 42.6 Z M64.7 45.5 L68.3 42.9 L65.9 47 Z" fill="#f6dcb4"/>
    </g>
    <g class="pr-qc">
      <g fill="none" stroke-width="1.9" stroke-linecap="round"><path d="M29.2 61.4L24.7 62.2M29.1 59.1L24.4 58.5M29.8 56.8L26 55.1M31.4 54.6L27.4 51.7M33.6 52.8L31 49.8M36.4 51.4L33.8 47M39.7 50.4L38.3 46.9M43.2 50L42 45M46.7 50.2L46.4 46.3M50.1 50.9L50.6 45.8M53.2 52.1L54.3 48.2M55.7 53.7L58.1 49.6" stroke="#8a4522"/><path d="M24.7 62.2L20.3 63M24.4 58.5L19.8 58M26 55.1L22.1 53.5M27.4 51.7L23.4 48.7M31 49.8L28.4 46.9M33.8 47L31.1 42.6M38.3 46.9L36.8 43.3M42 45L40.8 40M46.4 46.3L46.1 42.5M50.6 45.8L51 40.8M54.3 48.2L55.4 44.3M58.1 49.6L60.5 45.4" stroke="#f1c795"/></g>
    </g>
    <g stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
      <path d="M52 82 C52 79 57 78.500 60 79.500 L72 80 C74 83 73 86 70 86 L55 86 C53 86 52 84.500 52 82 Z" fill="url(#pPr5)"/>
      <path d="M60 84 L60 85.500 M64 83.500 L64 85.500 M68 83.500 L68 85.500" stroke-width="1.1" fill="none" opacity=".7"/>
      <path d="M23 83 L23 85.500 M27 83 L27 85.500 M31 83 L31 85.500" stroke-width="1.1" fill="none" opacity=".7"/>
    </g>
    <g class="pt-head">
      <g class="pt-ear" style="transform-origin:50% 90%">
        <ellipse cx="60.500" cy="45.500" rx="5.600" ry="6" fill="url(#pPr2)" stroke="#2b1a14" stroke-width="1.7"/>
        <ellipse cx="60.800" cy="46.500" rx="2.800" ry="3.400" fill="#f4b6a0"/>
      </g>
      <path d="M54 54 C55 46 64 42 72 44 C79 45.500 85 54 91 61 C93 64 91 68 87 69 C85 73 77 77 68 76 C58 75 52 68 53 60 Z" fill="url(#pPr2)" stroke="#2b1a14" stroke-width="1.9" stroke-linejoin="round"/>
      <path d="M68 62 C72 57 82 58 90 62.500 C88 68 84 72 77 73 C71 73 66 68 68 62 Z" fill="url(#pPr3)"/>
      <path d="M59 47 C63 43 69 43 73 45" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".45"/>
      <path d="M55 56 q2 -1 3 1 M57 60 q2 -1 3 1" stroke="#7a4326" stroke-width="1" fill="none" stroke-linecap="round" opacity=".5"/>
      <ellipse cx="62.500" cy="67" rx="5" ry="3" fill="#ff8a6a" opacity=".45"/>
      <g class="pr-nose" style="transform-origin:90% 70%">
        <ellipse cx="89.500" cy="62.500" rx="4" ry="3.300" fill="url(#pPr6)" stroke="#2b1a14" stroke-width="1.2"/>
        <ellipse cx="88" cy="61.200" rx="1.500" ry="1" fill="#fff" opacity=".8"/>
      </g>
      <path d="M79 70 Q83.500 73 87 69.500" stroke="#7a4326" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M62 51 L72 46" stroke="#2b1a14" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M77 46.500 L84 49.500" stroke="#2b1a14" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".9"/>
      <g class="pt-eye b">
        <ellipse cx="80.500" cy="53.500" rx="3.300" ry="4.100" fill="#22141a"/>
        <circle cx="79.600" cy="51.800" r="1.300" fill="#fff"/>
      </g>
      <g class="pt-eye">
        <ellipse cx="68.500" cy="55" rx="5" ry="5.900" fill="#22141a"/>
        <ellipse cx="66.800" cy="52.600" rx="2.100" ry="2.500" fill="#fff"/>
        <circle cx="70.300" cy="57.800" r="1.100" fill="#fff" opacity=".85"/>
      </g>
    </g>
    <path d="M60 79 C66 76 72 76 77 79" stroke="none" fill="none"/>
  </g>
</svg>`;
PET_CSS.prespicou = `.pet-prespicou .pr-qa { transform-origin: 50% 100%; animation: prQuiA 2.2s ease-in-out infinite; }
.pet-prespicou .pr-qb { transform-origin: 50% 100%; animation: prQuiB 2.2s ease-in-out infinite; }
.pet-prespicou .pr-qc { transform-origin: 50% 100%; animation: prQuiC 2.2s ease-in-out infinite; }
.pet-prespicou .pr-nose { animation: prSniff 2.6s ease-in-out infinite; }
@keyframes prQuiA { 0%, 52%, 100% { transform: rotate(0) scale(1); } 56% { transform: rotate(2deg) scale(1.025); } 60% { transform: rotate(-1.8deg) scale(1.03); } 64% { transform: rotate(1.6deg) scale(1.02); } 68% { transform: rotate(-1deg) scale(1.01); } 72% { transform: rotate(0) scale(1); } }
@keyframes prQuiB { 0%, 52%, 100% { transform: rotate(0) scale(1); } 56% { transform: rotate(-1.8deg) scale(1.02); } 60% { transform: rotate(1.6deg) scale(1.03); } 64% { transform: rotate(-1.4deg) scale(1.02); } 68% { transform: rotate(.8deg); } 72% { transform: rotate(0); } }
@keyframes prQuiC { 0%, 50%, 100% { transform: rotate(0) scale(1); } 54% { transform: rotate(1.2deg) scale(1.02); } 58% { transform: rotate(-1.4deg) scale(1.03); } 62% { transform: rotate(1.2deg) scale(1.02); } 66% { transform: rotate(-.6deg); } 70% { transform: rotate(0); } }
@keyframes prSniff { 0%, 100% { transform: scale(1); } 35% { transform: scale(1.1, 1.05) translateX(.4px); } 45% { transform: scale(1); } 60% { transform: scale(1.12, 1.06) translateX(.5px); } 70% { transform: scale(1); } }`;

/* ---- KOALACHON ---- ourson koala grincheux accroché à sa branche d'eucalyptus ---- */
PET_ART.koalachon = `<svg class="pet pet-koalachon" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="pKo1" cx="34%" cy="20%" r="90%"><stop offset="0" stop-color="#cdd6df"/><stop offset=".45" stop-color="#9aa4b0"/><stop offset="1" stop-color="#66727f"/></radialGradient>
    <radialGradient id="pKo2" cx="36%" cy="22%" r="90%"><stop offset="0" stop-color="#b6c0cb"/><stop offset=".5" stop-color="#8d98a6"/><stop offset="1" stop-color="#5c6876"/></radialGradient>
    <radialGradient id="pKo3" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#f6f8fa"/><stop offset=".6" stop-color="#dce2e8"/><stop offset="1" stop-color="#b3bdc9"/></radialGradient>
    <radialGradient id="pKo4" cx="32%" cy="24%" r="85%"><stop offset="0" stop-color="#6b7480"/><stop offset=".4" stop-color="#2c2f36"/><stop offset="1" stop-color="#0f1013"/></radialGradient>
    <radialGradient id="pKo5" cx="30%" cy="25%" r="90%"><stop offset="0" stop-color="#b4e0c4"/><stop offset=".5" stop-color="#69b08c"/><stop offset="1" stop-color="#357b60"/></radialGradient>
    <linearGradient id="pKo6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b58d5f"/><stop offset=".5" stop-color="#8a6642"/><stop offset="1" stop-color="#5a3f27"/></linearGradient>
    <radialGradient id="pKo8" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#f1f4f7"/><stop offset=".65" stop-color="#dfe5ea"/><stop offset="1" stop-color="#dfe5ea" stop-opacity="0"/></radialGradient>
    <radialGradient id="pKo7" cx="45%" cy="35%" r="75%"><stop offset="0" stop-color="#fffdf6"/><stop offset=".65" stop-color="#f1ece0"/><stop offset="1" stop-color="#d4cdbd"/></radialGradient>
  </defs>
  <ellipse class="pt-shadow" cx="48" cy="88" rx="24" ry="4" fill="#000" opacity=".28"/>
  <g class="pt-body">
    <g class="ko-lf1" style="transform-origin:100% 100%">
      <path d="M12 76 C10 70 10 64 12 60" stroke="#2b1a14" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <path d="M12 76 C10 70 10 64 12 60" stroke="#8a6642" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M12 60 C14.6 53.9 9.5 45.8 3.1 43.2 C1.7 50 5.4 58.8 12 60 Z" fill="url(#pKo5)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 60 C14.6 53.9 9.5 45.8 3.1 43.2 C8.1 47 13 55.2 12 60 Z" fill="#cdeed8" opacity=".38"/><path d="M12 60 L4 44.9M9.3 55L10.1 51.5M9.3 55L6 53.7M7.5 51.6L8.4 48.2M7.5 51.6L4.2 50.4M5.8 48.3L6.6 44.8M5.8 48.3L2.4 47" stroke="#2f6e58" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M11.5 66 C9.1 60.6 0.7 59.1 -4.9 61.6 C-1.3 66.6 6.7 69.5 11.5 66 Z" fill="url(#pKo5)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M11.5 66 C9.1 60.6 0.7 59.1 -4.9 61.6 C0.6 60.7 8.9 62.5 11.5 66 Z" fill="#cdeed8" opacity=".38"/><path d="M11.5 66 L-3.3 62M6.6 64.7L4.8 62.1M6.6 64.7L3.7 66.1M3.3 63.8L1.5 61.2M3.3 63.8L0.5 65.2M0 62.9L-1.8 60.3M0 62.9L-2.8 64.3" stroke="#2f6e58" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M12.2 59.5 C17.2 57.7 18.9 50.3 16.8 45.2 C12.1 48.1 9.2 55.1 12.2 59.5 Z" fill="url(#pKo5)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.2 59.5 C17.2 57.7 18.9 50.3 16.8 45.2 C17.4 50.2 15.5 57.4 12.2 59.5 Z" fill="#cdeed8" opacity=".38"/><path d="M12.2 59.5 L16.4 46.7M13.6 55.2L16 53.8M13.6 55.2L12.4 52.6M14.5 52.4L17 51M14.5 52.4L13.4 49.8M15.4 49.5L17.9 48.1M15.4 49.5L14.3 46.9" stroke="#2f6e58" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
    </g>
    <path d="M26 72 C24 61 34 54 46 54 C60 54 68 61 67 72 C66 80 58 83 46 83 C34 83 27 80 26 72 Z" fill="url(#pKo2)" stroke="#2b1a14" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M36 66 C38 60 46 58 52 60 C60 62 64 68 62 75 C60 80 54 81 48 81 C40 81 34 76 36 66 Z" fill="url(#pKo3)"/>
    <path d="M41 68 q2 2 4 0 M49 66 q2 2 4 0 M53 73 q2 2 4 0 M44 75 q2 2 4 0" stroke="#aab4c0" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="72" rx="9.500" ry="9" fill="url(#pKo1)" stroke="#2b1a14" stroke-width="1.8"/>
    <path d="M26 68 C28 64 32 63 35 64" stroke="#e6ecf2" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M3 83 C26 78 56 83 93 76" stroke="#2b1a14" stroke-width="9.600" fill="none" stroke-linecap="round"/>
    <path d="M3 83 C26 78 56 83 93 76" stroke="url(#pKo6)" stroke-width="6.600" fill="none" stroke-linecap="round"/>
    <path d="M6 81.500 C26 76.500 56 81.500 91 74.500" stroke="#d3ab7c" stroke-width="1.300" fill="none" stroke-linecap="round" opacity=".75"/>
    <path d="M18 80.500 l1.500 2 M72 79.500 l1.500 2.200 M81 77.500 l1.200 2 M10 82 l1 1.600" stroke="#4a3220" stroke-width="1" fill="none" stroke-linecap="round" opacity=".7"/>
    <g class="ko-lf2" style="transform-origin:0% 100%">
      <path d="M87 76 C88 70 90 66 92 62" stroke="#2b1a14" stroke-width="3.600" fill="none" stroke-linecap="round"/>
      <path d="M87 76 C88 70 90 66 92 62" stroke="#8a6642" stroke-width="1.800" fill="none" stroke-linecap="round"/>
      <path d="M92 62 C96.6 57.5 94.9 48.7 90.1 44.1 C86.4 49.6 86.6 58.6 92 62 Z" fill="url(#pKo5)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M92 62 C96.6 57.5 94.9 48.7 90.1 44.1 C93.2 49.2 94.6 58.1 92 62 Z" fill="#cdeed8" opacity=".38"/><path d="M92 62 L90.3 45.9M91.4 56.6L93.4 53.9M91.4 56.6L88.9 54.4M91.1 53L93 50.3M91.1 53L88.6 50.8M90.7 49.5L92.7 46.7M90.7 49.5L88.2 47.2" stroke="#2f6e58" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M89 68 C94 69.6 99.3 65 100.3 59.8 C95.1 59.2 89 62.8 89 68 Z" fill="url(#pKo5)" stroke="#2b1a14" stroke-width="1.5" stroke-linejoin="round"/><path d="M89 68 C94 69.6 99.3 65 100.3 59.8 C98.2 63.9 92.7 68.4 89 68 Z" fill="#cdeed8" opacity=".38"/><path d="M89 68 L99.2 60.6M92.4 65.5L95.1 65.9M92.4 65.5L92.9 62.9M94.7 63.9L97.4 64.3M94.7 63.9L95.1 61.2M96.9 62.2L99.6 62.6M96.9 62.2L97.4 59.6" stroke="#2f6e58" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".85"/>
    </g>
    <g stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
      <ellipse cx="55.500" cy="81.500" rx="8" ry="4" fill="#6c7886"/>
      <ellipse cx="37" cy="80.500" rx="9.500" ry="4.500" fill="url(#pKo2)"/>
      <path d="M45 77.500 q2.800 1.200 2.600 3 q-0.200 2 -2.800 2.700" fill="#7d8896" stroke-width="1.5"/>
      <path d="M27 79.500 q9 -3 16 0" fill="none" stroke="#c3ccd6" stroke-width="1.200" opacity=".6"/>
    </g>
    <path d="M57 60 C66 62 69 70 65 77" stroke="#2b1a14" stroke-width="9.600" fill="none" stroke-linecap="round"/>
    <path d="M57 60 C66 62 69 70 65 77" stroke="url(#pKo2)" stroke-width="6.600" fill="none" stroke-linecap="round"/>
    <path d="M58.500 61 C64 62.500 66.500 66 66.500 68.500" stroke="#dfe6ec" stroke-width="1.300" fill="none" stroke-linecap="round" opacity=".6"/>
    <ellipse cx="65" cy="77.500" rx="5.800" ry="4.800" fill="#7d8896" stroke="#2b1a14" stroke-width="1.8"/>
    <path d="M61.500 80.500 q-0.600 3 1.600 3.800 M65.500 81.600 q0 3 2 3.500 M69 80 q1 2.800 2.600 3" stroke="#2b1a14" stroke-width="1.700" fill="none" stroke-linecap="round"/>
    <path d="M61.500 80.500 q-0.600 3 1.600 3.800 M65.500 81.600 q0 3 2 3.500 M69 80 q1 2.800 2.600 3" stroke="#e9e1d0" stroke-width=".7" fill="none" stroke-linecap="round"/>
    <g class="pt-head">
      <g class="pt-ear b" style="transform-origin:50% 90%">
        <circle cx="73.500" cy="15.500" r="11.800" fill="url(#pKo1)" stroke="#2b1a14" stroke-width="1.9"/>
        <path d="M81.3 17.3 Q81.8 20.6 78.7 21.8 Q76.9 24.6 73.8 23.6 Q70.7 24.6 68.9 21.8 Q65.8 20.6 66.3 17.3 Q64.7 14.4 67.2 12.2 Q67.9 9 71.2 8.9 Q73.8 6.8 76.4 8.9 Q79.7 9 80.4 12.2 Q82.9 14.4 81.3 17.3 Z" fill="url(#pKo7)"/>
        <path d="M71 12 q1.500 3 0 6 M75.500 11.500 q1.500 3 0 6" stroke="#c9c2b0" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
      </g>
      <g class="pt-ear" style="transform-origin:50% 90%">
        <circle cx="27" cy="17.500" r="13.500" fill="url(#pKo1)" stroke="#2b1a14" stroke-width="1.9"/>
        <path d="M36.5 18.2 Q37.9 21.6 34.8 23.5 Q33.9 27 30.3 26.8 Q27.5 29.1 24.7 26.8 Q21.1 27 20.2 23.5 Q17.1 21.6 18.5 18.2 Q17.1 14.8 20.2 12.9 Q21.1 9.4 24.7 9.6 Q27.5 7.3 30.3 9.6 Q33.9 9.4 34.8 12.9 Q37.9 14.8 36.5 18.2 Z" fill="url(#pKo7)"/>
        <path d="M25 14 q1.500 3.500 0 7 M30 13.500 q1.500 3.500 0 7 M21 18 q1.500 3 0 5.500" stroke="#c9c2b0" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
      </g>
      <path d="M50 13 C66 12 79 21 79 33 C79 37 81 40 85 42.500 L78 47.500 C75 54 64 58.500 52 58.500 C40 58.500 29 54 26 47.500 L18.500 44.500 L23 39.500 C21.500 37 21 35 21 33 C21 21 34 12 50 13 Z" fill="url(#pKo1)" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
      <path d="M30 20 C36 15 44 13.500 52 14" stroke="#e9eef3" stroke-width="1.800" fill="none" stroke-linecap="round" opacity=".38"/>
      <ellipse cx="60" cy="44.500" rx="16" ry="12.500" fill="url(#pKo8)"/>
      <path d="M26 47 C30 52 36 54.500 42 55 M78 47 C75 52 70 55 66 56" stroke="#e8eef3" stroke-width="1.500" fill="none" stroke-linecap="round" opacity=".6"/>
      <path d="M60.500 46.500 L60.500 49.500" stroke="#2b1a14" stroke-width="1.600" stroke-linecap="round"/>
      <path d="M54 52.500 C57.500 48.800 63.500 48.800 67 52.500" stroke="#2b1a14" stroke-width="1.800" fill="none" stroke-linecap="round"/>
      <path d="M53.500 36 C53.500 32.500 57.500 31 60.500 31.300 C65.500 31.800 68 34 67.500 38.500 C67 43.500 63.500 47 60 46.500 C56 46 53.500 41 53.500 36 Z" fill="url(#pKo4)" stroke="#2b1a14" stroke-width="1.500" stroke-linejoin="round"/>
      <path d="M56 35 C57 33 59.500 32.500 61.500 33" stroke="#cfd6df" stroke-width="1.600" fill="none" stroke-linecap="round" opacity=".85"/>
      <circle cx="56.800" cy="38.400" r=".9" fill="#fff" opacity=".35"/>
      <ellipse cx="36.500" cy="45.500" rx="5.500" ry="3.200" fill="#f09aa4" opacity=".4"/><ellipse cx="76" cy="44" rx="3.600" ry="2.400" fill="#f09aa4" opacity=".35"/>
      <path d="M39 29.500 Q44.500 26 50 28" stroke="#56616f" stroke-width="1.700" fill="none" stroke-linecap="round" opacity=".65"/>
      <path d="M67.500 28 Q71.500 25.500 76 28.500" stroke="#56616f" stroke-width="1.600" fill="none" stroke-linecap="round" opacity=".65"/>
      <g class="pt-eye b">
        <path d="M67 34.200 L77 33.200 A5 5 0 0 1 67 34.200 Z" fill="#1b1b22"/>
        <circle cx="72.600" cy="36.600" r="1" fill="#fff"/>
        <path d="M66.300 34.300 L77.800 33.100" stroke="#1b1b22" stroke-width="1.900" stroke-linecap="round"/>
      </g>
      <g class="pt-eye">
        <path d="M38.500 32.600 L51 33.800 A6.300 6.300 0 0 1 38.500 32.600 Z" fill="#1b1b22"/>
        <circle cx="46.400" cy="37.800" r="1.300" fill="#fff"/>
        <circle cx="42" cy="38.300" r=".6" fill="#fff" opacity=".7"/>
        <path d="M37.700 32.500 L51.800 33.900" stroke="#1b1b22" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>
  </g>
</svg>`;
PET_CSS.koalachon = `.pet-koalachon .ko-lf1 { animation: koLeaf 3.8s ease-in-out infinite; }
.pet-koalachon .ko-lf2 { animation: koLeaf 3.2s ease-in-out -1.2s infinite reverse; }
@keyframes koLeaf { 0%, 100% { transform: rotate(-2.5deg); } 50% { transform: rotate(2.5deg); } }`;

/* ---- KANIBOU ---- petit tribal planqué derrière un masque de bois trop grand ---- */
PET_ART.kanibou = `<svg class="pet pet-kanibou" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="pKa1" cx="34%" cy="22%" r="90%"><stop offset="0" stop-color="#eab36a"/><stop offset=".45" stop-color="#b87a3c"/><stop offset="1" stop-color="#78461f"/></radialGradient>
    <radialGradient id="pKa2" cx="36%" cy="24%" r="90%"><stop offset="0" stop-color="#f5c08e"/><stop offset=".5" stop-color="#dc9560"/><stop offset="1" stop-color="#a45f38"/></radialGradient>
    <linearGradient id="pKa3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a62"/><stop offset=".55" stop-color="#e0453a"/><stop offset="1" stop-color="#9c2430"/></linearGradient>
    <linearGradient id="pKa4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fe8da"/><stop offset=".55" stop-color="#25b5ad"/><stop offset="1" stop-color="#157a80"/></linearGradient>
    <linearGradient id="pKa5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff08a"/><stop offset=".55" stop-color="#f4c533"/><stop offset="1" stop-color="#c78413"/></linearGradient>
    <radialGradient id="pKa6" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#f4ffd0"/><stop offset=".4" stop-color="#7ff0e0"/><stop offset="1" stop-color="#1a9a9a"/></radialGradient>
    <linearGradient id="pKa7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8d85a"/><stop offset="1" stop-color="#5a8a2c"/></linearGradient>
    <radialGradient id="pKa8" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff4a0" stop-opacity=".95"/><stop offset=".5" stop-color="#7ff0e0" stop-opacity=".5"/><stop offset="1" stop-color="#7ff0e0" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="pt-shadow" cx="48" cy="88" rx="24" ry="4" fill="#000" opacity=".28"/>
  <g class="pt-body">
    <path d="M72.700 85.800 L81.400 13" stroke="#2b1a14" stroke-width="4.200" stroke-linecap="round" fill="none"/>
    <path d="M72.700 85.800 L81.400 13" stroke="#a8743c" stroke-width="2.300" stroke-linecap="round" fill="none"/>
    <path d="M73.800 80 L80.500 24" stroke="#e1b57c" stroke-width=".7" stroke-linecap="round" fill="none" opacity=".7"/>
    <g class="kb-tas" style="transform-origin:50% 0%">
      <path d="M81 22 C77.500 24 76 30 77 36 C80 31 81.500 27 82 22 Z" fill="url(#pKa3)" stroke="#2b1a14" stroke-width="1.300" stroke-linejoin="round"/>
      <path d="M82 22 C85.500 25 87 30 86 35 C83.500 30.500 82.500 27 82.200 22 Z" fill="url(#pKa5)" stroke="#2b1a14" stroke-width="1.300" stroke-linejoin="round"/>
    </g>
    <path d="M81.800 5.500 C86.200 9.500 86.500 15 83.500 20.500 L80.300 20.500 C77.300 15 77.500 9.500 81.800 5.500 Z" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1.600" stroke-linejoin="round"/>
    <path d="M81.800 7.500 L81.800 19" stroke="#d6fff6" stroke-width="1" stroke-linecap="round" opacity=".75"/>
    <path d="M79 21 L84.800 21" stroke="#2b1a14" stroke-width="3.200" stroke-linecap="round"/>
    <path d="M79 21 L84.800 21" stroke="#f4c533" stroke-width="1.500" stroke-linecap="round"/>
    <g>
      <g class="kb-f" style="transform-origin:100% 76%;animation-delay:-0.6s"><path d="M44 40 C40.3 33 20.1 27.1 15 32.2 C16.9 39.2 37.3 44.2 44 40 Z" fill="url(#pKa3)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L18.5 33.2" stroke="#ffd2c4" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M33.9 37.3L31.1 32.5M33.9 37.3L29.1 40M28.9 36L26.2 31.2M28.9 36L24.2 38.7M24 34.6L21.2 29.9M24 34.6L19.2 37.4" stroke="#ffd2c4" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:0% 93%;animation-delay:-0.7s"><path d="M44 40 C51.7 41.6 69.2 30 68.6 22.8 C62 19.7 45.1 32.2 44 40 Z" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L65.6 24.9" stroke="#c9fff6" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M52.6 34L58 34.9M52.6 34L53.6 28.5M56.8 31.1L62.2 32M56.8 31.1L57.7 25.6M61 28.1L66.4 29.1M61 28.1L61.9 22.7" stroke="#c9fff6" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:100% 91%;animation-delay:-1.1s"><path d="M44 40 C42.1 32.1 23.2 20 16.6 23.4 C16.7 30.7 36.1 41.9 44 40 Z" fill="url(#pKa5)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L19.9 25.4" stroke="#fff8c8" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M34.4 34.2L32.9 28.7M34.4 34.2L28.8 35.4M29.8 31.4L28.2 25.9M29.8 31.4L24.2 32.5M25.1 28.5L23.6 23.1M25.1 28.5L19.5 29.7" stroke="#fff8c8" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:4% 100%;animation-delay:-1.9s"><path d="M44 40 C52.1 39.1 66.5 22 64 15 C56.8 14.1 43.1 31.9 44 40 Z" fill="url(#pKa5)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L61.6 18" stroke="#fff8c8" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M51 31.3L56.7 30.5M51 31.3L50.6 25.6M54.4 27L60.1 26.2M54.4 27L54 21.3M57.8 22.8L63.5 22M57.8 22.8L57.4 17.1" stroke="#fff8c8" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:100% 100%;animation-delay:-0.3s"><path d="M44 40 C44.1 31.6 28.4 13.7 21 14.9 C19.2 22.2 35.6 39.4 44 40 Z" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L23.8 17.9" stroke="#c9fff6" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M36 31.2L35.8 25.3M36 31.2L30.1 30.6M32.1 27L31.9 21.1M32.1 27L26.2 26.3M28.2 22.7L28 16.8M28.2 22.7L22.3 22.1" stroke="#c9fff6" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:15% 100%;animation-delay:-0.2s"><path d="M44 40 C51.7 36.5 61.2 14.7 57 8.6 C49.7 10 41 32.1 44 40 Z" fill="url(#pKa3)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L55.4 12.4" stroke="#ffd2c4" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M48.6 29L53.8 26.4M48.6 29L46.6 23.4M50.8 23.7L56.1 21.1M50.8 23.7L48.9 18.1M53 18.3L58.3 15.7M53 18.3L51.1 12.7" stroke="#ffd2c4" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:90% 100%;animation-delay:-1.7s"><path d="M44 40 C46.3 31.6 35.6 8.8 28.1 7.7 C24.4 14.4 36 36.7 44 40 Z" fill="url(#pKa3)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L30 11.6" stroke="#ffd2c4" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M38.4 28.7L39.9 22.8M38.4 28.7L32.9 26.2M35.7 23.2L37.1 17.3M35.7 23.2L30.2 20.7M33 17.7L34.4 11.8M33 17.7L27.4 15.2" stroke="#ffd2c4" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:34% 100%;animation-delay:-1.4s"><path d="M44 40 C50.4 34.2 53.7 9.2 47.9 4.2 C41.2 7.8 39 32.9 44 40 Z" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L47.4 8.5" stroke="#c9fff6" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M45.4 27.5L49.8 23.2M45.4 27.5L42 22.4M46 21.4L50.4 17.2M46 21.4L42.7 16.3M46.7 15.3L51.1 11.1M46.7 15.3L43.3 10.2" stroke="#c9fff6" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
      <g class="kb-f" style="transform-origin:72% 100%;animation-delay:-0.9s"><path d="M44 40 C48.5 32.4 44.5 6.8 37.6 3.6 C32.2 9 37.2 34.4 44 40 Z" fill="url(#pKa5)" stroke="#2b1a14" stroke-width="1.7" stroke-linejoin="round"/><path d="M44 40L38.3 7.9" stroke="#fff8c8" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/><path d="M41.8 27.2L44.8 21.8M41.8 27.2L37.1 23.2M40.7 21.1L43.7 15.6M40.7 21.1L36 17M39.6 14.9L42.6 9.4M39.6 14.9L34.9 10.8" stroke="#fff8c8" stroke-width=".8" fill="none" stroke-linecap="round" opacity=".5"/></g>
    </g>
    <g stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">
      <path d="M31.500 73 C28.500 71.500 26.500 69.500 25.500 67" fill="none" stroke-width="8.800"/>
      <path d="M31.500 73 C28.500 71.500 26.500 69.500 25.500 67" fill="none" stroke="url(#pKa2)" stroke-width="5.600"/>
      <ellipse cx="38.500" cy="84" rx="6" ry="3.200" fill="url(#pKa2)"/>
      <ellipse cx="55" cy="84" rx="6" ry="3.200" fill="url(#pKa2)"/>
      <path d="M33.500 85.500 l1.600 0 M37.500 86.700 l1.600 0 M41.500 85.500 l1.600 0" stroke-width="1" opacity=".6"/>
    </g>
    <path d="M30 70 C30 62 37 58 46 58 C56 58 62 62 62 70 C62 79 56 84 46 84 C36 84 30 79 30 70 Z" fill="url(#pKa2)" stroke="#2b1a14" stroke-width="1.900" stroke-linejoin="round"/>
    <g stroke="#2b1a14" stroke-width="1.400" stroke-linejoin="round">
      <path d="M30.500 76.500 l-1.800 7.500 l5 -2.500 l1 5 l4 -4 l2 4.800 l3 -4.600 l3.500 4.600 l2 -4.800 l4 4 l1 -5 l5 2.500 l-1.800 -7.500 Z" fill="url(#pKa7)"/>
    </g>
    <path d="M30.500 74 C38 77 54 77 61.500 74" stroke="#2b1a14" stroke-width="5.400" fill="none" stroke-linecap="round"/>
    <path d="M30.500 74 C38 77 54 77 61.500 74" stroke="url(#pKa4)" stroke-width="3.200" fill="none" stroke-linecap="round"/>
    <path d="M36 75.400 l0 0 M46 76.800 l0 0 M56 75.400 l0 0" stroke="#e0453a" stroke-width="2.200" stroke-linecap="round"/>
    <path d="M60 72 C65 71 69 69.500 72.500 67" stroke="#2b1a14" stroke-width="8.800" fill="none" stroke-linecap="round"/>
    <path d="M60 72 C65 71 69 69.500 72.500 67" stroke="url(#pKa2)" stroke-width="5.600" fill="none" stroke-linecap="round"/>
    <g class="pt-head">
      <ellipse cx="17.500" cy="49" rx="4" ry="5.500" fill="url(#pKa1)" stroke="#2b1a14" stroke-width="1.700"/>
      <ellipse cx="17" cy="49" rx="1.700" ry="2.700" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1"/>
      <ellipse cx="70.500" cy="49" rx="4" ry="5.500" fill="url(#pKa1)" stroke="#2b1a14" stroke-width="1.700"/>
      <ellipse cx="71" cy="49" rx="1.700" ry="2.700" fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1"/>
      <path d="M44 20 C60 20 70.500 31 70.500 46 C70.500 60 60 70 44 73 C28 70 17.500 60 17.500 46 C17.500 31 28 20 44 20 Z" fill="url(#pKa1)" stroke="#2b1a14" stroke-width="2.100" stroke-linejoin="round"/>
      <path d="M44 23.500 C58.500 23.500 67 33.500 67 46 C67 58 58 67 44 69.500 C30 67 21 58 21 46 C21 33.500 29.500 23.500 44 23.500 Z" fill="none" stroke="#7a4a1e" stroke-width="1" stroke-dasharray="2.600 2.200" opacity=".7"/>
      <path d="M23.500 34 C27.500 26 35.500 22.500 45 22" stroke="#ffe3a8" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>
      <path d="M22 57 C25 65 32 70 40 72 M27 53 C29 60 34 65 39 67.500" stroke="#8a5424" stroke-width="1" fill="none" stroke-linecap="round" opacity=".55"/>
      <path d="M30.500 31.500 l5.100 -5.500 l5.100 5.500 l5.100 -5.500 l5.100 5.500 l5.100 -5.500 l5.100 5.500" stroke="#2b1a14" stroke-width="4.200" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M30.500 31.500 l5.100 -5.500 l5.100 5.500 l5.100 -5.500 l5.100 5.500 l5.100 -5.500 l5.100 5.500" stroke="url(#pKa3)" stroke-width="2.400" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <g fill="url(#pKa4)" stroke="#2b1a14" stroke-width="1">
        <circle cx="33" cy="36" r="1.700"/><circle cx="39.500" cy="36" r="1.700"/><circle cx="46" cy="36" r="1.700"/><circle cx="52.500" cy="36" r="1.700"/><circle cx="59" cy="36" r="1.700"/>
      </g>
      <path d="M47.500 45 C45.500 50.500 44 55 45.500 57.500 L51 58 C52.500 55.500 50 50.500 47.500 45 Z" fill="#9a6230" stroke="#2b1a14" stroke-width="1.600" stroke-linejoin="round"/>
      <path d="M47.600 47.500 C46.600 51 46.200 54 46.700 56.500" stroke="#e0b27a" stroke-width="1" fill="none" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="37.500" cy="47.500" rx="7.200" ry="7.800" fill="#1a0f0a" stroke="#2b1a14" stroke-width="1.800"/>
      <ellipse cx="37.500" cy="47.500" rx="7.200" ry="7.800" fill="none" stroke="url(#pKa4)" stroke-width="1.500" opacity=".95"/>
      <ellipse cx="57.500" cy="47.500" rx="7.200" ry="7.800" fill="#1a0f0a" stroke="#2b1a14" stroke-width="1.800"/>
      <ellipse cx="57.500" cy="47.500" rx="7.200" ry="7.800" fill="none" stroke="url(#pKa4)" stroke-width="1.500" opacity=".95"/>
      <g class="pt-glow"><circle cx="38" cy="48" r="7.800" fill="url(#pKa8)"/><circle cx="58" cy="48" r="7.800" fill="url(#pKa8)"/></g>
      <g class="pt-eye">
        <ellipse cx="38.200" cy="48.200" rx="4.200" ry="4.900" fill="url(#pKa6)"/>
        <circle cx="39.200" cy="48.700" r="1.900" fill="#0d3a40"/>
        <circle cx="37" cy="46" r="1.600" fill="#fff"/>
      </g>
      <g class="pt-eye b">
        <ellipse cx="58.200" cy="48.200" rx="4.200" ry="4.900" fill="url(#pKa6)"/>
        <circle cx="59.200" cy="48.700" r="1.900" fill="#0d3a40"/>
        <circle cx="57" cy="46" r="1.600" fill="#fff"/>
      </g>
      <path d="M26 58 l5.500 2 M26.500 62 l5 1.500 M60 58.500 l5 -1.500 M60.500 62.500 l4.500 -2" stroke="#2b1a14" stroke-width="3" stroke-linecap="round"/>
      <path d="M26 58 l5.500 2 M26.500 62 l5 1.500 M60 58.500 l5 -1.500 M60.500 62.500 l4.500 -2" stroke="url(#pKa3)" stroke-width="1.300" stroke-linecap="round"/>
      <path d="M34.500 63.500 Q47 75 59.500 63.500 Q47 68.500 34.500 63.500 Z" fill="#2b1a14" stroke="#2b1a14" stroke-width="1.800" stroke-linejoin="round"/>
      <path d="M38.0 65.3 l0 2.200 M42.5 66.3 l0 2.200 M47.0 66.6 l0 2.200 M51.5 66.3 l0 2.200 M56.0 65.3 l0 2.200" stroke="#fff4d6" stroke-width="1.600" stroke-linecap="round"/>
    </g>
    <path d="M60 72 C65 71 69 69.500 72.500 67" stroke="none"/>
    <g stroke-linejoin="round" stroke-linecap="round">
      <circle cx="75" cy="66.500" r="4.700" fill="url(#pKa2)" stroke="#2b1a14" stroke-width="1.800"/>
      <path d="M71.500 67 q3.500 3.200 7 0" stroke="#a45f38" stroke-width="1.100" fill="none" opacity=".8"/>
      <circle cx="25" cy="66.500" r="4.600" fill="url(#pKa2)" stroke="#2b1a14" stroke-width="1.800"/>
      <path d="M21.800 64.500 q3.200 -2.500 6.400 0" stroke="#a45f38" stroke-width="1.100" fill="none" opacity=".8"/>
    </g>
  </g>
</svg>`;
PET_CSS.kanibou = `.pet-kanibou .kb-f { animation: kbSway 2.8s ease-in-out infinite; }
.pet-kanibou .kb-tas { animation: kbTas 2.2s ease-in-out infinite; }
@keyframes kbSway { 0%, 100% { transform: rotate(-3.5deg); } 50% { transform: rotate(3.5deg); } }
@keyframes kbTas { 0%, 100% { transform: rotate(5deg); } 50% { transform: rotate(-5deg); } }`;

/* ---- PORCINET ---- porcelet rose, oreilles tombantes, collier à pièce d'or ---- */
PET_ART.porcinet = `<svg class="pet pet-porcinet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="pPo1" cx="36%" cy="24%" r="88%"><stop offset="0" stop-color="#ffdbe4"/><stop offset=".45" stop-color="#f4a3b5"/><stop offset="1" stop-color="#cc6a89"/></radialGradient>
    <radialGradient id="pPo2" cx="34%" cy="22%" r="88%"><stop offset="0" stop-color="#ffe3ea"/><stop offset=".42" stop-color="#f6a9ba"/><stop offset="1" stop-color="#d0708e"/></radialGradient>
    <radialGradient id="pPo3" cx="38%" cy="28%" r="82%"><stop offset="0" stop-color="#ffc6d3"/><stop offset=".55" stop-color="#f48fa9"/><stop offset="1" stop-color="#c85a7c"/></radialGradient>
    <linearGradient id="pPo4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f594ab"/><stop offset="1" stop-color="#bf5273"/></linearGradient>
    <radialGradient id="pPo5" cx="34%" cy="28%" r="78%"><stop offset="0" stop-color="#fff6b8"/><stop offset=".5" stop-color="#f6c63c"/><stop offset="1" stop-color="#b57a14"/></radialGradient>
    <linearGradient id="pPo6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c46a82"/><stop offset="1" stop-color="#7d3550"/></linearGradient>
    <linearGradient id="pPo7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5594e"/><stop offset="1" stop-color="#8f2630"/></linearGradient>
    <linearGradient id="pPo8" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8889f"/><stop offset=".5" stop-color="#f6a7ba"/><stop offset="1" stop-color="#d9758f"/></linearGradient>
  </defs>
  <ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
  <g class="pt-body">
    <g class="pt-tail" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 57 Q6 58 5 51 Q4 44 10 43 Q16 43 15 49 Q14 53 10 52 Q7 50 9 47" stroke="#2b1a14" stroke-width="5"/>
      <path d="M14 57 Q6 58 5 51 Q4 44 10 43 Q16 43 15 49 Q14 53 10 52 Q7 50 9 47" stroke="#f4a3b5" stroke-width="2.8"/>
      <path d="M7 46 Q9 43.800 12 44" stroke="#fff0f4" stroke-width="1" opacity=".8"/>
    </g>
    <g stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round">
      <path d="M33 70 L33 80 Q33 85 37 85 L43 85 Q46 85 46 80 L46 70 Z" fill="url(#pPo4)"/>
      <path d="M33.1 80.5 Q33 85 37 85 L43 85 Q46 85 45.9 80.5 Q39.5 82.5 33.1 80.5 Z" fill="url(#pPo6)"/>
      <path d="M66 70 L66 80 Q66 85 70 85 L76 85 Q79 85 79 80 L79 70 Z" fill="url(#pPo4)"/>
      <path d="M66.1 80.5 Q66 85 70 85 L76 85 Q79 85 78.9 80.5 Q72.5 82.5 66.1 80.5 Z" fill="url(#pPo6)"/>
    </g>
    <path d="M9 62 C7 44 22 35 39 37 C57 39 67 51 65 66 C63 78 50 83 36 83 C20 83 10 76 9 62 Z" fill="url(#pPo1)" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
    <path d="M13 70 C17 80 30 82 42 80 C52 78 60 72 63 62 C62 76 52 83 38 83 C24 83 14 78 13 70 Z" fill="#c8607f" opacity=".35"/>
    <path d="M15 53 C19 45 29 41 39 42 C30 44 22 49 18 57 Z" fill="#fff" opacity=".5"/>
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="M17 71 L17 80 Q17 85 21 85 L27 85 Q30 85 30 80 L30 71 Z" fill="url(#pPo8)"/>
      <path d="M17 77 L17 80 Q17 85 21 85 L27 85 Q30 85 30 80 L30 77 Z" fill="url(#pPo6)"/>
      <path d="M17 71 L17 80 Q17 85 21 85 L27 85 Q30 85 30 80 L30 71" fill="none" stroke="#2b1a14" stroke-width="1.8"/>
      <path d="M17.2 80.4 Q23.5 82.6 29.8 80.4" fill="none" stroke="#2b1a14" stroke-width="1.2"/>
      <path d="M55 72 L55 80 Q55 85 59 85 L65 85 Q68 85 68 80 L68 72 Z" fill="url(#pPo8)"/>
      <path d="M55 77.5 L55 80 Q55 85 59 85 L65 85 Q68 85 68 80 L68 77.5 Z" fill="url(#pPo6)"/>
      <path d="M55 72 L55 80 Q55 85 59 85 L65 85 Q68 85 68 80 L68 72" fill="none" stroke="#2b1a14" stroke-width="1.8"/>
      <path d="M55.2 80.4 Q61.5 82.6 67.8 80.4" fill="none" stroke="#2b1a14" stroke-width="1.2"/>
      <path d="M20 73 L20 77 M58 74 L58 78" stroke="#fff" stroke-width="1.3" opacity=".3"/>
    </g>
    <g class="pt-head">
      <g class="pt-ear b" style="transform-origin:100% 0%">
        <path d="M52 29 C42 24 30 29 29 40 C28 48 33 51 38 46 C42 42 44 38 51 38 Z" fill="url(#pPo4)" stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M47 31 C42 29 36 31 33 36" stroke="#ffc6d3" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>
        <path d="M46 36 C42 36 38 39 36 44" stroke="#c0587a" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".6"/>
      </g>
      <path d="M58 24 C74 20 90 32 90 52 C90 68 76 76 62 76 C46 76 36 66 36 52 C36 36 46 26 58 24 Z" fill="url(#pPo2)" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
      <path d="M44 38 C48 31 56 28 63 28 C55 31 49 36 47 44 Z" fill="#fff" opacity=".55"/>
      <ellipse cx="52" cy="61" rx="6.5" ry="4.2" fill="#ff6f98" opacity=".5"/>
      <path d="M66 65 C70 71 76 71 80 67" stroke="#7a2e44" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <path d="M77 68 C77 73 82 74.500 84 71 C83 69 80 68 77 68 Z" fill="#e0476b" stroke="#7a2e44" stroke-width="1.2" stroke-linejoin="round"/>
      <ellipse cx="82" cy="58" rx="11" ry="9.4" fill="url(#pPo3)" stroke="#2b1a14" stroke-width="1.8"/>
      <ellipse cx="78" cy="53.500" rx="5" ry="2.6" fill="#fff" opacity=".5"/>
      <ellipse cx="79" cy="58.500" rx="2.2" ry="3.500" fill="#6e2640"/>
      <ellipse cx="86.500" cy="58.500" rx="2.2" ry="3.500" fill="#6e2640"/>
      <path d="M52 40 C54 37 59 36 62 38" stroke="#2b1a14" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M67 37 C70 33.500 75 33.500 78 36.500" stroke="#2b1a14" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g class="pt-eye">
        <ellipse cx="57" cy="48" rx="5.2" ry="6.2" fill="#2d1620"/>
        <ellipse cx="55.400" cy="45.600" rx="2.100" ry="2.500" fill="#fff"/>
        <circle cx="58.800" cy="51.200" r="1.100" fill="#fff" opacity=".85"/>
      </g>
      <g class="pt-eye b">
        <ellipse cx="72.500" cy="46.500" rx="4.400" ry="5.600" fill="#2d1620"/>
        <ellipse cx="71" cy="44.200" rx="1.800" ry="2.300" fill="#fff"/>
        <circle cx="74" cy="49.400" r="1" fill="#fff" opacity=".85"/>
      </g>
      <g class="pt-ear" style="transform-origin:0% 0%">
        <path d="M62 25 C71 19 83 23 86 31 C87 36.500 83 38.500 80 35.500 C77 32.500 72 31 63 32 Z" fill="url(#pPo4)" stroke="#2b1a14" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M67 24.500 C73 22 79.500 24 82.500 28" stroke="#ffc6d3" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>
      </g>
    </g>
    <g stroke-linejoin="round">
      <path d="M40 66 C46 75 56 77 64 72" fill="none" stroke="#2b1a14" stroke-width="6.400" stroke-linecap="round"/>
      <path d="M40 66 C46 75 56 77 64 72" fill="none" stroke="url(#pPo7)" stroke-width="4" stroke-linecap="round"/>
      <path d="M41 65 C46 72 55 74 62 70.500" fill="none" stroke="#ff9a8a" stroke-width="1" stroke-linecap="round" opacity=".7"/>
      <g class="pn-coin">
        <path d="M51 75.500 L51 77.500" stroke="#2b1a14" stroke-width="1.800" stroke-linecap="round"/>
        <circle cx="51" cy="82" r="5" fill="url(#pPo5)" stroke="#2b1a14" stroke-width="1.700"/>
        <circle cx="51" cy="82" r="2.800" fill="none" stroke="#b57a14" stroke-width="1"/>
        <path d="M48.500 80.400 C49.300 79.200 50.600 78.700 51.900 78.900" stroke="#fffbe0" stroke-width="1" fill="none" stroke-linecap="round" opacity=".9"/>
      </g>
    </g>
  </g>
</svg>`;
PET_CSS.porcinet = `.pet-porcinet .pn-coin { transform-origin: 50% 0%; animation: pnCoin 2.6s ease-in-out infinite; }
@keyframes pnCoin { 0%, 100% { transform: rotate(-9deg); } 50% { transform: rotate(9deg); } }`;
