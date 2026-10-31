/* =====================================================================
   FAMILIERS (dessins 6c) — Dragonnet, Mansotin, Fantomino, Kitsounet
   SVG originaux, viewBox 96, le familier regarde vers la droite.
   Ids de dégradés : pDr (dragonnet), pMa (mansotin), pFa (fantomino), pKi (kitsounet).
   ===================================================================== */

/* ---- DRAGONNET ---- bébé dragon coiffé d'une demi-coquille d'œuf ---- */
PET_ART.dragonnet = `<svg class="pet pet-dragonnet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pDr1" cx="36%" cy="26%" r="82%"><stop offset="0" stop-color="#ff9d70"/><stop offset=".42" stop-color="#e0533a"/><stop offset="1" stop-color="#97281c"/></radialGradient>
  <linearGradient id="pDr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1c2"/><stop offset=".5" stop-color="#f6c86a"/><stop offset="1" stop-color="#d0902f"/></linearGradient>
  <linearGradient id="pDr3" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff8057"/><stop offset=".55" stop-color="#cf402d"/><stop offset="1" stop-color="#8a2017"/></linearGradient>
  <radialGradient id="pDr4" cx="34%" cy="24%" r="88%"><stop offset="0" stop-color="#fffdf5"/><stop offset=".55" stop-color="#f5e8c9"/><stop offset="1" stop-color="#cfb687"/></radialGradient>
  <radialGradient id="pDr5" cx="40%" cy="28%" r="78%"><stop offset="0" stop-color="#ffeaa3"/><stop offset=".5" stop-color="#f7a621"/><stop offset="1" stop-color="#b4530b"/></radialGradient>
  <linearGradient id="pDr6" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c98a3c"/><stop offset=".6" stop-color="#f6d58a"/><stop offset="1" stop-color="#fff3cc"/></linearGradient>
  <linearGradient id="pDr7" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff4d1a"/><stop offset=".55" stop-color="#ffb52e"/><stop offset="1" stop-color="#fff3a8"/></linearGradient>
  <clipPath id="pDr8"><path d="M27 70 C25 56 36 48 48 49 C60 50 66 62 65 74 C64 83 56 86 46 86 C36 86 28 82 27 70 Z"/></clipPath>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="22" ry="4" fill="#000" opacity=".28"/>
<g class="pt-body">
  <!-- queue -->
  <g class="pt-tail" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
    <path d="M32 81 C22 90 8 88 5 76 C3 68 6 61 11 57 L15 60 C12 64 11 69 14 73 C17 78 24 77 32 70 Z" fill="url(#pDr1)"/>
    <path d="M13 59 C5 57 3 48 9 41 C17 44 20 53 15 60 Z" fill="url(#pDr3)"/>
    <path d="M9 46 C10 50 12 54 13 57" stroke="#ffb08c" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M10 80 C14 82 20 81 26 77" stroke="#ffb08c" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".55"/>
  </g>
  <!-- ailes -->
  <g class="pt-wing b" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M46 54 C41 44 37 34 31 22 C27 30 26 38 28 46 C31 43 34 45 36 50 C39 47 42 49 46 54 Z" fill="#8f2418"/>
    <path d="M31 22 L35 49" stroke-width="1.3" fill="none" opacity=".7"/>
  </g>
  <g class="pt-wing" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M41 59 C35 48 27 37 15 26 C11 35 10 46 13 54 C17 49 20 50 22 56 C25 51 29 52 32 58 C35 55 38 56 41 59 Z" fill="url(#pDr3)"/>
    <path d="M15 26 L22 56 M15 26 L32 58" stroke="#8a2017" stroke-width="1.4" fill="none"/>
    <path d="M41 59 L15 26" stroke="#8a2017" stroke-width="3" fill="none"/>
    <path d="M41 59 L15 26" stroke="#ff9d78" stroke-width="1" fill="none" opacity=".7"/>
    <path d="M17 31 C14 38 14 45 15 50" stroke="#ffb08c" stroke-width="1.2" fill="none" opacity=".55"/>
  </g>
  <!-- pointes du dos -->
  <g fill="url(#pDr6)" stroke="#2b1a14" stroke-width="1.6" stroke-linejoin="round">
    <path d="M34 53 L26 50 L31 60 Z"/><path d="M29 62 L21 61 L28 69 Z"/><path d="M27 72 L20 73 L27 79 Z"/>
  </g>
  <!-- patte arrière (loin) -->
  <g stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
    <ellipse cx="34" cy="83" rx="9" ry="4.6" fill="#a8301f"/>
    <path d="M42 81 L45 80.5 L43.5 83 Z M42.5 84 L46 84.5 L43 86 Z" fill="#fff3cc" stroke-width="1.1"/>
  </g>
  <!-- corps -->
  <path d="M27 70 C25 56 36 48 48 49 C60 50 66 62 65 74 C64 83 56 86 46 86 C36 86 28 82 27 70 Z" fill="url(#pDr1)"/>
  <g clip-path="url(#pDr8)">
    <path d="M51 50 C66 56 72 76 62 90 L38 92 C48 82 52 66 51 50 Z" fill="url(#pDr2)"/>
    <path d="M50 62 C56 64 61 63 66 60 M49 69 C56 71 62 70 67 66 M48 76 C55 78 61 77 66 73 M46 83 C53 84 59 83 64 80" stroke="#b97a22" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M27 60 C27 74 34 85 48 87 C36 82 31 72 31 60 Z" fill="#6e1610" opacity=".38"/>
    <ellipse cx="38" cy="58" rx="8" ry="4.5" fill="#fff" opacity=".22"/>
  </g>
  <path d="M27 70 C25 56 36 48 48 49 C60 50 66 62 65 74 C64 83 56 86 46 86 C36 86 28 82 27 70 Z" fill="none" stroke="#2b1a14" stroke-width="2.2" stroke-linejoin="round"/>
  <!-- bras -->
  <g stroke="#2b1a14" stroke-width="1.9" stroke-linejoin="round">
    <path d="M55 65 C62 64 66 69 65 74 C64 78 59 78 58 74 C57 71 54 69 55 65 Z" fill="url(#pDr1)"/>
    <path d="M63 76 L65.5 77.5 L62.5 78.5 Z M59.5 78.5 L60.5 81 L58 79.5 Z" fill="#fff3cc" stroke-width="1"/>
  </g>
  <!-- patte avant (proche) -->
  <g stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
    <path d="M47 81 C51 77.5 60 77.5 65 80.5 C69 81.5 70 85 66.5 86.6 C62 88.2 53 88.2 48 87.6 C44 86.6 44 83 47 81 Z" fill="url(#pDr1)"/>
    <path d="M63.2 81.4 C64 83.4 64 85.4 63.4 87.4 M58.4 80.4 C59.2 82.8 59.2 85.4 58.6 87.8" stroke="#8a2017" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M67.6 81.6 L70.8 82.8 L67.8 84 Z M67.4 85.2 L70.4 86.6 L66.6 87 Z" fill="#fff3cc" stroke-width="1"/>
    <path d="M50.5 80.6 C53 79.4 56 79.4 58 80.2" stroke="#ffb08c" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".75"/>
  </g>
  <!-- tête -->
  <g class="pt-head">
    <!-- cornes -->
    <g fill="url(#pDr6)" stroke="#2b1a14" stroke-width="1.9" stroke-linejoin="round">
      <path d="M42 33 C38 27 36 20 36 13 C42 16 47 22 50 30 Z"/>
      <path d="M70 30 C72 23 76 18 82 14 C82 21 81 27 78 33 Z"/>
    </g>
    <path d="M37 15 C38 21 40 25 43 30" stroke="#fff" stroke-width="1" fill="none" opacity=".7" stroke-linecap="round"/>
    <path d="M36 44 C35 32 45 24 58 24 C70 24 78 31 79 39 C85 40 90 44 90 49 C90 54 85 57 79 58 C75 63 68 65 60 65 C50 65 37 58 36 44 Z" fill="url(#pDr1)" stroke="#2b1a14" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- menton crème, joue, reflets -->
    <path d="M60 64 C68 64 75 62 79 58 C85 57 90 54 90 49 C87 53 82 55 77 55 C72 58 66 60 58 60 Z" fill="url(#pDr2)" opacity=".95"/>
    <ellipse cx="48" cy="33" rx="7" ry="3.4" fill="#fff" opacity=".24"/>
    <ellipse cx="53" cy="55" rx="5.5" ry="3.2" fill="#ff5d6b" opacity=".42"/>
    <path d="M44 52 C42 48 41 44 42 40" stroke="#97281c" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".35"/>
    <!-- arcade et yeux -->
    <path d="M48.5 36 C52 33 58 33 62 36 M68 36 C71 34.5 74 34.5 77 36.5" stroke="#8a2017" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g class="pt-eye b">
      <ellipse cx="73.5" cy="43" rx="5" ry="6.6" fill="url(#pDr5)" stroke="#2b1a14" stroke-width="1.7"/>
      <ellipse cx="75" cy="44" rx="2.8" ry="4.2" fill="#2b1208"/>
      <circle cx="72.6" cy="40.6" r="1.9" fill="#fff"/><circle cx="76" cy="46.6" r=".9" fill="#fff" opacity=".9"/>
    </g>
    <g class="pt-eye">
      <ellipse cx="57" cy="44" rx="7.2" ry="8.3" fill="url(#pDr5)" stroke="#2b1a14" stroke-width="1.9"/>
      <ellipse cx="59" cy="45" rx="3.7" ry="5" fill="#2b1208"/>
      <circle cx="55.6" cy="40.8" r="2.5" fill="#fff"/><circle cx="60.6" cy="48.6" r="1.2" fill="#fff" opacity=".9"/>
      <path d="M50.4 41 C52 36.6 58 35.2 63 38" stroke="#2b1a14" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    </g>
    <!-- naseau, bouche -->
    <ellipse cx="85.5" cy="47.5" rx="1.4" ry="2" fill="#4a120c" style="transform:rotate(-20deg)"/>
    <path d="M79 55 C82 58 87 57 89.5 53" stroke="#4a120c" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <!-- flammèche -->
    <g class="pt-glow">
      <path d="M88 45 C90 42 89 38 92 35 C93 39 96 41 94 45 C93 47 90 48 88 46 Z" fill="url(#pDr7)" stroke="#b4350e" stroke-width="1" stroke-linejoin="round"/>
      <path d="M90 45 C91 43 90.5 41 92 39.5 C93 42 94 43 92.5 45 Z" fill="#fffbd0"/>
    </g>
    <!-- coquille d'œuf -->
    <path d="M43 31 C40 19 49 8 60 8 C71 8 79 18 77 30 L73 34 L69 29 L64 35 L59 29 L54 35 L49 29 Z" fill="url(#pDr4)" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
    <g fill="#b8924f" opacity=".85">
      <ellipse cx="52" cy="19" rx="2.6" ry="1.9"/><ellipse cx="66" cy="14" rx="2" ry="1.5"/><ellipse cx="71" cy="24" rx="2.6" ry="1.9"/><ellipse cx="58" cy="26" rx="1.8" ry="1.3"/><ellipse cx="47" cy="27" rx="1.4" ry="1.1"/>
    </g>
    <path d="M47 21 C48 15 52 11 58 10" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M75 20 C76 24 76 27 75 29" stroke="#b79b66" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6"/>
  </g>
</g>
<!-- étincelles -->
<path class="pt-spark" d="M93 29 L94.4 32 L97.4 33.2 L94.4 34.4 L93 37.4 L91.6 34.4 L88.6 33.2 L91.6 32 Z" fill="#ffd24a" stroke="#d2561c" stroke-width=".7" stroke-linejoin="round"/>
<path class="pt-spark b" d="M94 51 L95 53 L97 54 L95 55 L94 57 L93 55 L91 54 L93 53 Z" fill="#ffb52e" stroke="#d2561c" stroke-width=".6" stroke-linejoin="round"/>
<circle class="pt-spark c" cx="90" cy="30" r="1.4" fill="#fff3a8"/>
</svg>`;

/* ---- MANSOTIN ---- ourson des neiges à cornes de glace et écharpe ---- */
PET_ART.mansotin = `<svg class="pet pet-mansotin" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pMa1" cx="38%" cy="24%" r="82%"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#f0f6fb"/><stop offset=".8" stop-color="#cfe1f1"/><stop offset="1" stop-color="#a6c3de"/></radialGradient>
  <linearGradient id="pMa2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdebff"/><stop offset=".55" stop-color="#8fc6ec"/><stop offset="1" stop-color="#5b97c8"/></linearGradient>
  <linearGradient id="pMa3" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#4f9fd6"/><stop offset=".55" stop-color="#a8dcf7"/><stop offset="1" stop-color="#f4fdff"/></linearGradient>
  <linearGradient id="pMa4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a68"/><stop offset=".55" stop-color="#d93c3c"/><stop offset="1" stop-color="#96202e"/></linearGradient>
  <linearGradient id="pMa5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86c9ff"/><stop offset=".55" stop-color="#418ad8"/><stop offset="1" stop-color="#2a5aa6"/></linearGradient>
  <radialGradient id="pMa6" cx="42%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef5fb"/><stop offset="1" stop-color="#cfe1f1"/></radialGradient>
  <radialGradient id="pMa7" cx="36%" cy="28%" r="80%"><stop offset="0" stop-color="#5a6a8a"/><stop offset="1" stop-color="#1b2338"/></radialGradient>
  <clipPath id="pMa8"><path d="M32 49 C46 64 70 66 88 50 L88 62 C70 78 46 76 32 60 Z"/></clipPath>
  <clipPath id="pMa9"><path d="M38 56 C30 56 22 62 19 76 L29 79 C31 70 35 66 42 64 Z"/></clipPath>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="26" ry="4" fill="#000" opacity=".26"/>
<g class="pt-body">
  <!-- petite queue -->
  <g class="pt-tail" stroke="#26314a" stroke-width="2" stroke-linejoin="round">
    <path d="M17 68 C9 66 7 58 12 54 C15 51 21 52 22 57 C25 60 24 66 17 68 Z" fill="url(#pMa2)"/>
    <path d="M11 58 C12 55 15 54 18 55" stroke="#e6f6ff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>
  <!-- pattes lointaines -->
  <g stroke="#26314a" stroke-width="2" stroke-linejoin="round">
    <path d="M40 68 C38 76 37 82 38 85 C39 87.4 41 87.6 44 87.6 L53 87.6 C56 87.6 58 86.4 57.6 84 C57 80 57 74 56 68 Z" fill="#bfd3e6"/>
    <path d="M64 70 C63 77 62 82 63 85 C64 87.4 66 87.6 69 87.6 L77 87.6 C80 87.6 82 86.4 81.6 84 C81 80 80.6 75 79.6 70 Z" fill="#bfd3e6"/>
    <path d="M47.5 87.6 L47.5 85 M72 87.6 L72 85 M76 87.6 L76 85" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".6"/>
  </g>
  <!-- touffes bleues du dos -->
  <g fill="url(#pMa2)" stroke="#26314a" stroke-width="1.7" stroke-linejoin="round">
    <path d="M25 51 C20 49 16 44 15 38 C21 40 25 44 28 50 Z"/>
    <path d="M31 48 C28 43 28 37 31 32 C35 36 36 42 36 47 Z"/>
    <path d="M19 56 C14 55 10 51 8 46 C14 46 19 49 22 54 Z"/>
  </g>
  <!-- corps -->
  <path d="M14 66 C12 52 26 44 42 44 C58 44 72 54 72 68 C72 80 60 86 42 86 C26 86 15 80 14 66 Z" fill="url(#pMa1)" stroke="#26314a" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M16 70 C20 82 30 85 42 85 C54 85 64 82 70 74 C66 80 56 82 42 82 C30 82 20 78 16 70 Z" fill="#a6c3de" opacity=".5"/>
  <ellipse cx="30" cy="56" rx="9" ry="5" fill="#fff" opacity=".6"/>
  <!-- pattes proches -->
  <g stroke="#26314a" stroke-width="2" stroke-linejoin="round">
    <path d="M18 68 C16 76 15 82 16 85 C17 87.4 19 87.8 22 87.8 L32 87.8 C35 87.8 37 86.6 36.6 84 C36 80 36 74 35 68 Z" fill="url(#pMa1)"/>
    <path d="M52 68 C50 76 49 82 50 85 C51 87.4 53 87.8 56 87.8 L66 87.8 C69 87.8 71 86.6 70.6 84 C70 80 70 74 69 68 Z" fill="url(#pMa1)"/>
    <path d="M24.5 87.8 L24.5 85 M29 87.8 L29 85 M58.5 87.8 L58.5 85 M63 87.8 L63 85" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M19 78 C21 80.6 24 81.4 27 80.4 M53 78 C55 80.6 58 81.4 61 80.4" stroke="#a6c3de" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>
  </g>
  <!-- queue de l'écharpe -->
  <g class="pt-tail" style="transform-origin:100% 4%">
    <path d="M38 56 C30 56 22 62 19 76 L29 79 C31 70 35 66 42 64 Z" fill="url(#pMa4)"/>
    <g clip-path="url(#pMa9)"><path d="M16 66 L30 62 L32 69 L17 73 Z M18 78 L32 74 L33 81 L18 85 Z" fill="url(#pMa5)"/></g>
    <path d="M38 56 C30 56 22 62 19 76 L29 79 C31 70 35 66 42 64 Z" fill="none" stroke="#26314a" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M20.5 77 L19.5 82 M23.5 78 L23 83 M26.5 78.5 L26.5 83 M29 79 L29.5 83" stroke="#96202e" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <!-- écharpe -->
  <g>
    <path d="M32 49 C46 64 70 66 88 50 L88 62 C70 78 46 76 32 60 Z" fill="url(#pMa4)"/>
    <g clip-path="url(#pMa8)"><path d="M40 40 L48 40 L54 90 L46 90 Z M62 40 L70 40 L72 90 L64 90 Z M82 40 L90 40 L88 90 L80 90 Z" fill="url(#pMa5)"/></g>
    <path d="M32 49 C46 64 70 66 88 50 L88 62 C70 78 46 76 32 60 Z" fill="none" stroke="#26314a" stroke-width="2" stroke-linejoin="round"/>
    <path d="M36 62 C46 72 66 73 82 62" stroke="#fff" stroke-width="1.3" fill="none" opacity=".35" stroke-linecap="round"/>
  </g>
  <!-- tête -->
  <g class="pt-head">
    <!-- oreilles -->
    <g stroke="#26314a" stroke-width="2" stroke-linejoin="round">
      <circle cx="40" cy="22" r="8.5" fill="url(#pMa1)"/>
      <circle cx="80" cy="19" r="7.5" fill="#cfe1f1"/>
    </g>
    <circle cx="40.5" cy="22.5" r="4.4" fill="url(#pMa2)"/><circle cx="80" cy="19.5" r="3.7" fill="#8fc6ec"/>
    <!-- cornes de glace -->
    <g fill="url(#pMa3)" stroke="#26314a" stroke-width="1.9" stroke-linejoin="round">
      <path d="M51 22 C49 15 49 9 51 3 C56 8 59 15 59 22 Z"/>
      <path d="M66 21 C66 14 69 8 74 4 C74 10 74 16 72 22 Z"/>
    </g>
    <path d="M52.5 18 C52 14 52 10 53 7 M68 17 C68.5 14 70 11 72 8" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".85"/>
    <!-- crâne -->
    <path d="M33 40 C31 25 44 16 60 16 C76 16 88 26 87 40 C86 52 75 60 60 60 C45 60 34 52 33 40 Z" fill="url(#pMa1)" stroke="#26314a" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- mèche et touffes de joue bleu glacier -->
    <g fill="url(#pMa2)" stroke="#26314a" stroke-width="1.7" stroke-linejoin="round">
      <path d="M52 20 C58 26 64 26 70 20 C69 15 64 13 61 14 C57 12 53 15 52 20 Z" transform="translate(0 1.5)"/>
      <path d="M36 44 C31 43 27 45 25 50 C30 51 34 51 38 49 Z"/>
    </g>
    <ellipse cx="46" cy="27" rx="7" ry="3.5" fill="#fff" opacity=".6"/>
    <!-- museau -->
    <ellipse cx="79" cy="48" rx="12.5" ry="9" fill="url(#pMa6)" stroke="#26314a" stroke-width="2"/>
    <ellipse cx="73" cy="44" rx="5" ry="2.2" fill="#fff" opacity=".7"/>
    <!-- yeux -->
    <g class="pt-eye b">
      <ellipse cx="79" cy="36" rx="3.8" ry="5.2" fill="url(#pMa7)" stroke="#26314a" stroke-width="1.5"/>
      <circle cx="78" cy="33.6" r="1.5" fill="#fff"/><circle cx="80.4" cy="38.4" r=".7" fill="#fff" opacity=".8"/>
    </g>
    <g class="pt-eye">
      <ellipse cx="63" cy="37" rx="5.2" ry="6.4" fill="url(#pMa7)" stroke="#26314a" stroke-width="1.7"/>
      <circle cx="61.4" cy="34.2" r="2" fill="#fff"/><circle cx="65" cy="40.2" r="1" fill="#fff" opacity=".8"/>
    </g>
    <!-- nez, bouche, joues -->
    <ellipse cx="87" cy="43" rx="4.2" ry="3.2" fill="#1b2338" stroke="#26314a" stroke-width="1.2"/>
    <ellipse cx="85.8" cy="41.8" rx="1.5" ry="0.9" fill="#fff" opacity=".8"/>
    <path d="M87 46 L86.5 50 M79 51 C82 55 86 54 86.5 50 C87 54 91 55 93 51" stroke="#26314a" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="66" cy="49" rx="5" ry="3" fill="#ff8f9d" opacity=".5"/>
  </g>
</g>
<!-- givre scintillant -->
<g class="pt-spark" stroke-linejoin="round">
  <path d="M13 22 L14.6 26.4 L19 28 L14.6 29.6 L13 34 L11.4 29.6 L7 28 L11.4 26.4 Z" fill="#eaf8ff" stroke="#4a8cc4" stroke-width="1"/>
</g>
<g class="pt-spark b" stroke-linejoin="round">
  <path d="M90 28 L91.2 31.2 L94.4 32.4 L91.2 33.6 L90 36.8 L88.8 33.6 L85.6 32.4 L88.8 31.2 Z" fill="#eaf8ff" stroke="#4a8cc4" stroke-width=".9"/>
</g>
<g class="pt-spark c" stroke-linecap="round">
  <path d="M8 46 L16 46 M12 42 L12 50 M9.2 43.2 L14.8 48.8 M14.8 43.2 L9.2 48.8" stroke="#4a8cc4" stroke-width="2.4"/>
  <path d="M8 46 L16 46 M12 42 L12 50 M9.2 43.2 L14.8 48.8 M14.8 43.2 L9.2 48.8" stroke="#eaf8ff" stroke-width="1"/>
</g>
<circle class="pt-spark b" cx="91" cy="68" r="2" fill="#eaf8ff" stroke="#4a8cc4" stroke-width=".9"/>
</svg>`;

/* ---- FANTOMINO ---- petit fantôme à lanterne et bonnet de nuit ---- */
PET_ART.fantomino = `<svg class="pet pet-fantomino" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pFa1" cx="38%" cy="26%" r="85%"><stop offset="0" stop-color="#f4f1ff"/><stop offset=".45" stop-color="#d8d4f0"/><stop offset=".8" stop-color="#b9b6ee"/><stop offset="1" stop-color="#8f8bd6"/></radialGradient>
  <radialGradient id="pFa2" cx="36%" cy="28%" r="80%"><stop offset="0" stop-color="#5a4f92"/><stop offset=".6" stop-color="#2a2152"/><stop offset="1" stop-color="#150f30"/></radialGradient>
  <radialGradient id="pFa3" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#bff4ff" stop-opacity=".95"/><stop offset=".5" stop-color="#9be8ff" stop-opacity=".45"/><stop offset="1" stop-color="#9be8ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="pFa4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f93f2"/><stop offset=".55" stop-color="#5c5bcb"/><stop offset="1" stop-color="#3a3a96"/></linearGradient>
  <linearGradient id="pFa5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#9be8ff"/><stop offset="1" stop-color="#3fb4dc"/></linearGradient>
  <radialGradient id="pFa6" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#fffbe0"/><stop offset="1" stop-color="#f0d98a"/></radialGradient>
  <clipPath id="pFa7"><path d="M24 70 C22 52 26 38 34 29 C42 19 58 18 66 26 C75 34 75 50 72 62 C71 68 71 72 71 76 Q70 82 63 80 Q57 79 55 76 Q52 84 46 82 Q40 81 39 77 Q36 85 29 81 Q23 80 24 70 Z"/></clipPath>
</defs>
<ellipse class="pt-shadow" cx="46" cy="89" rx="19" ry="3.3" fill="#000" opacity=".26"/>
<g class="pt-float">
<g class="pt-body">
  <!-- volute de queue -->
  <g class="pt-tail" stroke="#2e2a66" stroke-width="2" stroke-linejoin="round">
    <path d="M36 74 C26 80 12 78 8 66 C7 62 9 59 13 58 C13 63 18 68 25 68 C29 68 33 65 36 61 Z" fill="url(#pFa1)"/>
    <path d="M12 64 C15 70 22 73 30 72" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".55"/>
  </g>
  <!-- bras lointain (salue) -->
  <path class="fa-wv" d="M27 46 C21 43 15 44 13 48.5 C14.5 52.5 20 53.5 27 52.5 Z" fill="#c6c2ee" stroke="#2e2a66" stroke-width="1.9" stroke-linejoin="round"/>
  <!-- corps -->
  <path d="M24 70 C22 52 26 38 34 29 C42 19 58 18 66 26 C75 34 75 50 72 62 C71 68 71 72 71 76 Q70 82 63 80 Q57 79 55 76 Q52 84 46 82 Q40 81 39 77 Q36 85 29 81 Q23 80 24 70 Z" fill="url(#pFa1)"/>
  <g clip-path="url(#pFa7)">
    <ellipse cx="78" cy="62" rx="22" ry="26" fill="url(#pFa3)" opacity=".7"/>
    <path d="M22 66 C22 50 28 36 40 28 C30 40 28 54 31 70 Z" fill="#7d78c8" opacity=".35"/>
    <path d="M24 76 C34 70 44 74 54 71 C62 69 68 71 74 68 L74 90 L22 90 Z" fill="#fff" opacity=".28"/>
    <ellipse cx="42" cy="34" rx="9" ry="5" fill="#fff" opacity=".42"/>
  </g>
  <path d="M24 70 C22 52 26 38 34 29 C42 19 58 18 66 26 C75 34 75 50 72 62 C71 68 71 72 71 76 Q70 82 63 80 Q57 79 55 76 Q52 84 46 82 Q40 81 39 77 Q36 85 29 81 Q23 80 24 70 Z" fill="none" stroke="#2e2a66" stroke-width="2.2" stroke-linejoin="round"/>
  <!-- visage -->
  <g class="pt-head">
    <g class="pt-eye b">
      <ellipse cx="68" cy="43" rx="4.6" ry="6.4" fill="url(#pFa2)" stroke="#1a1238" stroke-width="1.5"/>
      <circle cx="66.6" cy="40" r="1.8" fill="#fff"/><circle cx="69.4" cy="46.4" r=".9" fill="#9be8ff"/>
    </g>
    <g class="pt-eye">
      <ellipse cx="55" cy="44" rx="6.2" ry="8" fill="url(#pFa2)" stroke="#1a1238" stroke-width="1.7"/>
      <circle cx="53" cy="40.4" r="2.4" fill="#fff"/><circle cx="57.6" cy="47.6" r="1.2" fill="#9be8ff"/><circle cx="58" cy="41.5" r=".7" fill="#fff" opacity=".8"/>
    </g>
    <ellipse cx="51" cy="55" rx="5" ry="3" fill="#ff8fa6" opacity=".55"/><ellipse cx="72" cy="53" rx="3.2" ry="2.4" fill="#ff8fa6" opacity=".5"/>
    <path d="M60 54 C62 57 65 57 66.5 54" stroke="#2e2a66" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <!-- bonnet de nuit -->
    <path d="M33 33 C31 27 28 22 24 18 C32 8 42 5 52 5 C64 5 72 13 71 28 L68 35 Z" fill="url(#pFa4)" stroke="#2e2a66" stroke-width="2" stroke-linejoin="round"/>
    <path d="M30 22 C38 13 50 10 60 12" stroke="#b5b8ff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".55"/>
    <path d="M60 14 C66 18 68 24 67 30" stroke="#2a2a80" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".5"/>
    <path d="M32 33 C40 24 58 21 71 28 L68 36 C58 30 43 31 35 40 Z" fill="#f1efff" stroke="#2e2a66" stroke-width="2" stroke-linejoin="round"/>
    <path d="M36 35 C44 29 58 27 68 31" stroke="#bdb8ec" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <circle cx="22" cy="18" r="4.8" fill="url(#pFa6)" stroke="#2e2a66" stroke-width="1.8"/>
    <path d="M20 16 C21 15 22 15 23.5 15.5" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <path d="M45 15 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z M58 18 l.9 2 2 .9 -2 .9 -.9 2 -.9 -2 -2 -.9 2 -.9 Z" fill="#ffe58a"/>
  </g>
  <!-- bras tenant la lanterne -->
  <path d="M67 57 C71 54 75 52.5 79 52 L81.5 57.5 C77 59.5 73 62.5 70 66 Z" fill="url(#pFa1)" stroke="#2e2a66" stroke-width="1.9" stroke-linejoin="round"/>
  <!-- lanterne -->
  <g style="transform-origin:50% 0%" class="fa-sw">
    <circle class="pt-glow" cx="83" cy="66" r="17" fill="url(#pFa3)"/>
    <path d="M80 54 C80 49 87 49 87 54" stroke="#4a3418" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M78 58 L89 58 L87 55 L80 55 Z" fill="#8a6a30" stroke="#3a2a12" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M78.5 58 L88.5 58 L90 72 L77 72 Z" fill="url(#pFa5)" stroke="#3a2a12" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M83.5 58 L83.5 72" stroke="#3a2a12" stroke-width="1.3"/>
    <path class="pt-glow" d="M83.5 62 C86 64.5 86 68 83.5 70 C81 68 81 64.5 83.5 62 Z" fill="#fff" opacity=".95"/>
    <path d="M76 72 L91 72 L90 75.5 L77 75.5 Z" fill="#8a6a30" stroke="#3a2a12" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M80 60 L80 69" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>
  </g>
  <circle cx="80" cy="54.2" r="3.5" fill="#e4e0fa" stroke="#2e2a66" stroke-width="1.7"/><path d="M78.6 53 C79.2 52.3 80 52.1 80.8 52.4" stroke="#fff" stroke-width="1" fill="none" stroke-linecap="round"/>
</g>
</g>
<path class="pt-spark" d="M92 46 L93 49 L96 50 L93 51 L92 54 L91 51 L88 50 L91 49 Z" fill="#c8f6ff" stroke="#3fb4dc" stroke-width=".6" stroke-linejoin="round"/>
<circle class="pt-spark c" cx="75" cy="44" r="0" fill="none"/>
</svg>`;
PET_CSS.fantomino = `.pet-fantomino .fa-sw { animation: fantominoSwing 3.2s ease-in-out infinite; }
.pet-fantomino .fa-wv { transform-origin: 100% 60%; animation: fantominoWave 2.6s ease-in-out infinite; }
@keyframes fantominoSwing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
@keyframes fantominoWave { 0%, 100% { transform: rotate(8deg); } 50% { transform: rotate(-14deg); } }`;

/* ---- KITSOUNET ---- renardeau-esprit à deux queues et feu follet ---- */
PET_ART.kitsounet = `<svg class="pet pet-kitsounet" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="pKi1" cx="36%" cy="24%" r="84%"><stop offset="0" stop-color="#ffc886"/><stop offset=".48" stop-color="#f09a4a"/><stop offset="1" stop-color="#bd5d22"/></radialGradient>
  <radialGradient id="pKi2" cx="40%" cy="26%" r="84%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f8efe1"/><stop offset="1" stop-color="#d9cbb6"/></radialGradient>
  <linearGradient id="pKi3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a52"/><stop offset="1" stop-color="#bd1f22"/></linearGradient>
  <radialGradient id="pKi4" cx="36%" cy="30%" r="75%"><stop offset="0" stop-color="#fff4aa"/><stop offset=".55" stop-color="#f4c038"/><stop offset="1" stop-color="#b5791a"/></radialGradient>
  <linearGradient id="pKi5" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2a82e0"/><stop offset=".5" stop-color="#7ddaff"/><stop offset="1" stop-color="#f0ffff"/></linearGradient>
  <radialGradient id="pKi6" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#b4f2ff" stop-opacity=".9"/><stop offset=".5" stop-color="#7ddaff" stop-opacity=".4"/><stop offset="1" stop-color="#7ddaff" stop-opacity="0"/></radialGradient>
  <linearGradient id="pKi7" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#d9742b"/><stop offset=".5" stop-color="#f09a4a"/><stop offset="1" stop-color="#ffbe78"/></linearGradient>
  <radialGradient id="pKi8" cx="40%" cy="28%" r="80%"><stop offset="0" stop-color="#ffd37a"/><stop offset=".55" stop-color="#e58a1c"/><stop offset="1" stop-color="#6a3208"/></radialGradient>
  <clipPath id="pKi9"><path d="M38 44 C37 33 47 26 60 26 C72 26 80 31 83 38 C88 40 93 45 94 49 C94 52 91 54 87 55 C83 60 77 63.5 70 64 C64 65 58 64 52 62 L46 67 L45.5 59 L38 59.5 L42 51 Z"/></clipPath>
  <clipPath id="pKiA"><path d="M30 80 C14 82 3 68 6 50 C8 38 16 30 26 27 C21 34 20 42 22 50 C25 59 31 64 38 68 Z"/></clipPath>
  <clipPath id="pKiB"><path d="M34 84 C22 90 6 82 3 68 C1 59 6 51 13 49 C10 57 13 64 21 68 C27 71 33 71 40 70 Z"/></clipPath>
  <clipPath id="pKiC"><path d="M26 74 C24 60 34 50 46 50 C58 50 66 58 66 70 C66 80 58 86 46 86 C34 86 27 82 26 74 Z"/></clipPath>
</defs>
<ellipse class="pt-shadow" cx="48" cy="88" rx="24" ry="4" fill="#000" opacity=".28"/>
<g class="pt-body">
  <!-- queue 2 (arrière) -->
  <g class="pt-tail b" style="transform-origin:100% 90%">
    <path d="M30 80 C14 82 3 68 6 50 C8 38 16 30 26 27 C21 34 20 42 22 50 C25 59 31 64 38 68 Z" fill="url(#pKi7)"/>
    <g clip-path="url(#pKiA)"><path d="M0 22 L34 18 L30 34 L22 31 L14 38 L8 34 L0 40 Z" fill="url(#pKi2)"/></g>
    <path d="M30 80 C14 82 3 68 6 50 C8 38 16 30 26 27 C21 34 20 42 22 50 C25 59 31 64 38 68 Z" fill="none" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
    <path d="M10 52 C11 60 17 70 28 74" stroke="#ffd6a0" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/>
  </g>
  <!-- queue 1 (devant) -->
  <g class="pt-tail" style="transform-origin:100% 85%">
    <path d="M34 84 C22 90 6 82 3 68 C1 59 6 51 13 49 C10 57 13 64 21 68 C27 71 33 71 40 70 Z" fill="url(#pKi1)"/>
    <g clip-path="url(#pKiB)"><path d="M-2 40 L20 44 L16 56 L8 60 L12 66 L-2 70 Z" fill="url(#pKi2)"/></g>
    <path d="M34 84 C22 90 6 82 3 68 C1 59 6 51 13 49 C10 57 13 64 21 68 C27 71 33 71 40 70 Z" fill="none" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round"/>
    <path d="M8 74 C14 80 24 82 32 78" stroke="#ffd6a0" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/>
  </g>
  <!-- patte arrière -->
  <g stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
    <path d="M34 80 C40 79 50 79 54 82 C56 85 53 87 48 87 L36 87 C31 87 30 83 34 80 Z" fill="url(#pKi1)"/>
    <path d="M45 80 C50 79 53 81 54 83 C56 85.5 53 87 48 87 L44 87 C45 84 45 82 45 80 Z" fill="url(#pKi2)" stroke-width="1.6"/>
  </g>
  <!-- corps -->
  <path d="M26 74 C24 60 34 50 46 50 C58 50 66 58 66 70 C66 80 58 86 46 86 C34 86 27 82 26 74 Z" fill="url(#pKi1)"/>
  <g clip-path="url(#pKiC)">
    <path d="M52 52 C66 56 70 72 62 88 L50 90 C54 76 54 64 52 52 Z" fill="url(#pKi2)"/>
    <path d="M26 66 C26 78 32 86 46 87 C34 82 31 74 31 64 Z" fill="#7a3a12" opacity=".35"/>
    <ellipse cx="36" cy="60" rx="8" ry="4.5" fill="#fff" opacity=".25"/>
  </g>
  <path d="M26 74 C24 60 34 50 46 50 C58 50 66 58 66 70 C66 80 58 86 46 86 C34 86 27 82 26 74 Z" fill="none" stroke="#2b1a14" stroke-width="2.2" stroke-linejoin="round"/>
  <!-- cuisse -->
  <path d="M30 72 C31 63 40 61 45 66 C48 72 44 80 38 80 C33 80 30 77 30 72 Z" fill="url(#pKi1)" opacity=".0"/>
  <!-- pattes avant -->
  <g stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
    <path d="M65 70 C71 70 73 76 72 82 C72.5 85 70 87 66 87 L62 87 L62 74 Z" fill="#c9732c"/>
    <path d="M62 82 L72 82 C72.5 85 70 87 66 87 L62 87 Z" fill="url(#pKi2)" stroke-width="1.7"/>
    <path d="M52 64 C58 62 63 66 63 72 L63 83 L51 83 L51 72 Z" fill="url(#pKi1)"/>
    <path d="M51 76 L63 76 L63 84 C63 87 60 88 57 88 L54 88 C51 88 50 86 51 84 Z" fill="url(#pKi2)" stroke-width="1.7"/>
    <path d="M55 88 L55 85 M59 88 L59 85" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".6"/>
  </g>
  <!-- collier et clochette -->
  <path d="M50 62 C58 68 68 68 77 62 L78 67 C69 74 57 74 49 67 Z" fill="url(#pKi3)" stroke="#2b1a14" stroke-width="1.9" stroke-linejoin="round"/>
  <!-- tête -->
  <g class="pt-head">
    <!-- oreilles -->
    <g class="pt-ear b" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
      <path d="M66 32 C67 20 72 12 81 7 C85 16 86 27 83 38 Z" fill="#c9732c"/>
      <path d="M71 31 C72 23 75 17 79 13 C82 20 82 27 80 34 Z" fill="#ffd3b0" stroke="none"/>
    </g>
    <g class="pt-ear" stroke="#2b1a14" stroke-width="2" stroke-linejoin="round">
      <path d="M44 38 C41 25 43 14 49 4 C57 10 63 20 64 32 Z" fill="url(#pKi1)"/>
      <path d="M48 33 C47 24 48 16 50 11 C55 16 59 22 59 30 Z" fill="#ffd3b0" stroke="none"/>
      <path d="M49 4 C52 6 54 8 56 12 C53 11 50 11 47.5 12.5 C47.5 9 48 6.5 49 4 Z" fill="#5a2410" stroke-width="1.3"/>
    </g>
    <!-- tête -->
    <path d="M38 44 C37 33 47 26 60 26 C72 26 80 31 83 38 C88 40 93 45 94 49 C94 52 91 54 87 55 C83 60 77 63.5 70 64 C64 65 58 64 52 62 L46 67 L45.5 59 L38 59.5 L42 51 Z" fill="url(#pKi1)"/>
    <g clip-path="url(#pKi9)">
      <path d="M97 44 C89 49 79 48 71 52 C63 56 54 56 44 51 L34 54 L34 72 L98 72 Z" fill="url(#pKi2)"/>
      <ellipse cx="50" cy="32" rx="9" ry="4" fill="#fff" opacity=".28"/>
    </g>
    <path d="M38 44 C37 33 47 26 60 26 C72 26 80 31 83 38 C88 40 93 45 94 49 C94 52 91 54 87 55 C83 60 77 63.5 70 64 C64 65 58 64 52 62 L46 67 L45.5 59 L38 59.5 L42 51 Z" fill="none" stroke="#2b1a14" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- marques rouges -->
    <path d="M62 27 C59.5 31 59.5 35 62 38 C64.5 35 64.5 31 62 27 Z" fill="url(#pKi3)" stroke="#8c1c18" stroke-width="1" stroke-linejoin="round"/>
    <path d="M54 29.5 C52 32 52 34.5 53.5 36.5 C56 34.5 56 32 54 29.5 Z M70 29.5 C68 32 68 34.5 69.5 36.5 C72 34.5 72 32 70 29.5 Z" fill="#d83a2c" opacity=".9"/>
    <path d="M48 55 C52 56 56 55 59 53 M49 60 C53 61 56 60 59 58" stroke="#d83a2c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <!-- yeux -->
    <g class="pt-eye b">
      <ellipse cx="79" cy="41" rx="3.8" ry="5.4" fill="url(#pKi8)" stroke="#2b1a14" stroke-width="1.6"/>
      <ellipse cx="80" cy="42" rx="2" ry="3.4" fill="#1c0e06"/><circle cx="78.4" cy="38.8" r="1.4" fill="#fff"/>
    </g>
    <g class="pt-eye">
      <ellipse cx="63" cy="42" rx="5.6" ry="6.9" fill="url(#pKi8)" stroke="#2b1a14" stroke-width="1.8"/>
      <ellipse cx="64.6" cy="43" rx="3" ry="4.4" fill="#1c0e06"/>
      <circle cx="61.2" cy="39" r="2.1" fill="#fff"/><circle cx="66" cy="46" r="1" fill="#fff" opacity=".9"/>
      <path d="M58 40.4 C59.6 37 64.6 36 68.4 38" stroke="#2b1a14" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </g>
    
    <!-- museau -->
    <ellipse cx="92.5" cy="48.5" rx="3.3" ry="2.5" fill="#2b1a14"/><ellipse cx="91.6" cy="47.6" rx="1.2" ry=".7" fill="#fff" opacity=".7"/>
    <path d="M91.5 51 L91 53.6 M83.5 54.6 C86.5 57.6 90 57 91 53.6 C92 56.6 95 56.4 96 53.2" stroke="#2b1a14" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="71" cy="55" rx="4" ry="2.4" fill="#ff8f8a" opacity=".45"/>
  </g>
  <!-- clochette -->
  <g>
    <circle cx="63" cy="74" r="5" fill="url(#pKi4)" stroke="#2b1a14" stroke-width="1.8"/>
    <path d="M58.4 75 L67.6 75" stroke="#7a4c0c" stroke-width="1.3"/><circle cx="63" cy="77" r="1" fill="#7a4c0c"/>
    <ellipse cx="61.2" cy="71.8" rx="1.7" ry="1" fill="#fff" opacity=".85"/>
  </g>
</g>
<!-- feu follet -->
<g class="pt-float">
  <circle class="pt-glow" cx="85" cy="75" r="13" fill="url(#pKi6)"/>
  <path d="M86 62 C87 67 92 70 92 76.5 C92 82 88.5 85.5 84.5 85.5 C80.5 85.5 78.5 82 79.5 78 C80.5 75 83.5 73 84.5 69.5 C85.3 67 86 65 86 62 Z" fill="url(#pKi5)" stroke="#1d5aa8" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M85.5 72 C87.4 74.6 88.6 76.4 87.8 79.6 C87.2 82 84.6 82.4 83.6 80.6 C82.6 78.8 84 77 84.8 75.4 C85.4 74.2 85.5 73.2 85.5 72 Z" fill="#fff" opacity=".9"/>
  <ellipse cx="82.4" cy="79.4" rx="1.1" ry="1.8" fill="#12306a"/><ellipse cx="88" cy="79.4" rx="1.1" ry="1.8" fill="#12306a"/>
</g>
<path class="pt-spark" d="M72 70 L73 72.6 L75.6 73.6 L73 74.6 L72 77.2 L71 74.6 L68.4 73.6 L71 72.6 Z" fill="#d9fbff" stroke="#3aa6e6" stroke-width=".6" stroke-linejoin="round"/>
</svg>`;
PET_CSS.kitsounet = `.pet-kitsounet .pt-tail.b { animation-duration: 2.4s; animation-delay: -.8s; }`;
