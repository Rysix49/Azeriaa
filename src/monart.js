/* =====================================================================
   AMAKNA IDLE — SPRITES ANIMÉS DES MONSTRES (dessins originaux)
   MON_ART[id] = SVG du monstre, dessiné tourné vers la DROITE
   (la scène le retourne pour qu'il fasse face au héros).
   Les parties portent des classes animées en CSS (style2.css) :
   repos (respiration, clignement), .atk (attaque), .hit (coup reçu), .dead (mort).
   Sans dessin, le monstre garde son emoji.
   ===================================================================== */
const MON_ART = {

/* ---- TOFU ---- petit oiseau rond bleu nuit ---- */
tofu: `<svg class="ms ms-tofu" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="tfB" cx="40%" cy="28%" r="78%"><stop offset="0" stop-color="#7fa3e8"/><stop offset=".35" stop-color="#4d74c2"/><stop offset=".8" stop-color="#2a4488"/><stop offset="1" stop-color="#1a2b62"/></radialGradient>
    <radialGradient id="tfV" cx="45%" cy="25%" r="80%"><stop offset="0" stop-color="#fffdf6"/><stop offset=".6" stop-color="#f3e4c4"/><stop offset="1" stop-color="#d6bb87"/></radialGradient>
    <linearGradient id="tfH" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="#b2330f"/><stop offset=".55" stop-color="#ff7b29"/><stop offset="1" stop-color="#ffd98a"/></linearGradient>
    <linearGradient id="tfW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4469b6"/><stop offset="1" stop-color="#18295c"/></linearGradient>
    <linearGradient id="tfW2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f4d94"/><stop offset="1" stop-color="#121f4a"/></linearGradient>
    <linearGradient id="tfK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc85e"/><stop offset="1" stop-color="#d9701a"/></linearGradient>
    <radialGradient id="tfI" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#7fd3ff"/><stop offset=".55" stop-color="#2a7fc4"/><stop offset="1" stop-color="#0f2a55"/></radialGradient>
    <clipPath id="tfClip"><path d="M66.0 29.0 Q70.3 27.0 74.0 29.9 Q78.6 29.0 81.6 32.7 Q86.3 32.8 88.4 37.1 Q93.0 38.3 94.1 42.9 Q98.3 45.1 98.4 49.9 Q102.1 53.1 101.1 57.8 Q104.0 61.6 102.0 66.0 Q104.0 70.4 101.1 74.2 Q102.1 78.9 98.4 82.1 Q97.2 86.1 94.1 89.1 Q92.0 92.7 88.4 94.9 Q85.6 98.0 81.6 99.3 Q78.2 101.7 74.0 102.1 Q70.1 103.6 66.0 103.0 Q61.5 106.9 58.0 102.1 Q52.7 104.9 50.4 99.3 Q44.6 100.9 43.6 94.9 Q37.6 95.1 37.9 89.1 Q32.0 87.9 33.6 82.1 Q28.1 79.6 30.9 74.2 Q26.1 70.6 30.0 66.0 Q26.1 61.4 30.9 57.8 Q28.1 52.4 33.6 49.9 Q32.0 44.1 37.9 42.9 Q37.6 36.9 43.6 37.1 Q44.6 31.1 50.4 32.7 Q53.4 29.0 58.0 29.9 Q61.7 27.0 66.0 29.0 Z"/></clipPath>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="30" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g class="p-legs" stroke="#2a1606" stroke-width="2" stroke-linejoin="round" fill="url(#tfK)">
    <path d="M53 98 L51 112 L43 115 Q42 118 45 118 L51 116.5 L50 120 Q52 121.5 53.5 119 L55 115.5 L59 117.5 Q61.5 116.5 59 114.5 L55.5 111.5 L58 99 Z"/>
    <path d="M73 99 L74 112 L67 116 Q66 118.5 69 118.5 L75 116.5 L76 120 Q78.5 121 79.5 118 L79.5 115.5 L85 116.5 Q87.5 114.5 84.5 113.5 L79.5 111.5 L79 99 Z"/>
  </g>
  <g class="p-body">
    <g class="p-tail" stroke="#0d1838" stroke-width="2.2" stroke-linejoin="round">
      <path d="M34 66 Q12 70 4 58 Q16 62 26 58 Z" fill="url(#tfW2)"/>
      <path d="M33 60 Q10 54 8 38 Q20 50 31 52 Z" fill="url(#tfW)"/>
      <path d="M36 55 Q20 40 24 24 Q30 42 40 49 Z" fill="url(#tfW2)"/>
      <path d="M30 63 Q18 62 12 58 M30 56 Q20 50 15 42 M35 52 Q27 42 26 32" stroke="#7da0e6" stroke-width="1.3" fill="none" opacity=".7"/>
    </g>
    <path class="p-torso" d="M66.0 29.0 Q70.3 27.0 74.0 29.9 Q78.6 29.0 81.6 32.7 Q86.3 32.8 88.4 37.1 Q93.0 38.3 94.1 42.9 Q98.3 45.1 98.4 49.9 Q102.1 53.1 101.1 57.8 Q104.0 61.6 102.0 66.0 Q104.0 70.4 101.1 74.2 Q102.1 78.9 98.4 82.1 Q97.2 86.1 94.1 89.1 Q92.0 92.7 88.4 94.9 Q85.6 98.0 81.6 99.3 Q78.2 101.7 74.0 102.1 Q70.1 103.6 66.0 103.0 Q61.5 106.9 58.0 102.1 Q52.7 104.9 50.4 99.3 Q44.6 100.9 43.6 94.9 Q37.6 95.1 37.9 89.1 Q32.0 87.9 33.6 82.1 Q28.1 79.6 30.9 74.2 Q26.1 70.6 30.0 66.0 Q26.1 61.4 30.9 57.8 Q28.1 52.4 33.6 49.9 Q32.0 44.1 37.9 42.9 Q37.6 36.9 43.6 37.1 Q44.6 31.1 50.4 32.7 Q53.4 29.0 58.0 29.9 Q61.7 27.0 66.0 29.0 Z" fill="url(#tfB)"/>
    <g clip-path="url(#tfClip)">
      <path d="M58 108 C52 84 60 62 80 56 C100 52 110 66 110 84 L110 112 Z" fill="url(#tfV)"/>
      <g stroke="#c9a96f" stroke-width="1.5" fill="none" stroke-linecap="round">
        <path d="M70 72 q3 3 6 0 q3 3 6 0 q3 3 6 0"/><path d="M64 81 q3 3 6 0 q3 3 6 0 q3 3 6 0 q3 3 6 0"/>
        <path d="M66 90 q3 3 6 0 q3 3 6 0 q3 3 6 0 q3 3 6 0"/><path d="M70 99 q3 3 6 0 q3 3 6 0 q3 3 6 0"/>
      </g>
      <path d="M28 66 C28 94 44 108 68 106 C50 102 36 90 33 68 Z" fill="#0c1848" opacity=".5"/>
      <path d="M86 100 C96 96 102 88 104 76 C104 90 98 100 88 104 Z" fill="#7a5a2a" opacity=".25"/>
      <path d="M42 38 C52 28 68 26 80 29 C66 31 54 36 46 46 Z" fill="#c4d8ff" opacity=".55"/>
      <path d="M97 44 C103 52 105 62 103 72" stroke="#a9c6ff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>
      <g fill="#3a5fae" opacity=".55"><path d="M48 34 q3 4 6 0 q3 4 6 0"/><path d="M42 44 q3 4 6 0 q3 4 6 0"/></g>
    </g>
    <path d="M66.0 29.0 Q70.3 27.0 74.0 29.9 Q78.6 29.0 81.6 32.7 Q86.3 32.8 88.4 37.1 Q93.0 38.3 94.1 42.9 Q98.3 45.1 98.4 49.9 Q102.1 53.1 101.1 57.8 Q104.0 61.6 102.0 66.0 Q104.0 70.4 101.1 74.2 Q102.1 78.9 98.4 82.1 Q97.2 86.1 94.1 89.1 Q92.0 92.7 88.4 94.9 Q85.6 98.0 81.6 99.3 Q78.2 101.7 74.0 102.1 Q70.1 103.6 66.0 103.0 Q61.5 106.9 58.0 102.1 Q52.7 104.9 50.4 99.3 Q44.6 100.9 43.6 94.9 Q37.6 95.1 37.9 89.1 Q32.0 87.9 33.6 82.1 Q28.1 79.6 30.9 74.2 Q26.1 70.6 30.0 66.0 Q26.1 61.4 30.9 57.8 Q28.1 52.4 33.6 49.9 Q32.0 44.1 37.9 42.9 Q37.6 36.9 43.6 37.1 Q44.6 31.1 50.4 32.7 Q53.4 29.0 58.0 29.9 Q61.7 27.0 66.0 29.0 Z" fill="none" stroke="#0d1838" stroke-width="2.8" stroke-linejoin="round"/>
    <g class="p-tuft" stroke="#4a1504" stroke-width="2" stroke-linejoin="round">
      <path d="M60 32 C52 18 40 12 28 14 C40 18 50 24 55 34 Z" fill="url(#tfH)"/>
      <path d="M64 30 C60 14 64 3 73 -2 C69 9 69 20 69 30 Z" fill="url(#tfH)"/>
      <path d="M70 31 C76 18 88 13 99 15 C88 19 80 25 75 33 Z" fill="url(#tfH)"/>
      <path d="M67 27 C66 18 67 10 71 4 M57 30 C51 22 43 18 35 17 M73 29 C79 22 86 18 94 17" stroke="#ffe6b0" stroke-width="1.2" fill="none" opacity=".75"/>
    </g>
    <g class="p-wing" stroke="#0d1838" stroke-width="2.3" stroke-linejoin="round">
      <path d="M50 62 C36 62 27 74 30 90 C34 96 40 98 44 96 C48 92 52 86 55 80 C58 74 58 68 56 63 Z" fill="url(#tfW)"/>
      <path d="M33 86 Q30 96 36 102 Q40 96 41 90 Z" fill="url(#tfW2)"/>
      <path d="M40 90 Q40 100 47 104 Q49 96 48 89 Z" fill="url(#tfW2)"/>
      <path d="M47 86 Q50 96 57 98 Q57 90 54 84 Z" fill="url(#tfW2)"/>
      <path d="M38 70 Q36 78 36 86 M44 68 Q44 76 45 84 M50 67 Q51 74 52 80" stroke="#7da0e6" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".75"/>
    </g>
    <g class="p-eye">
      <path d="M74 44 C74 35 81 30 88 31 C96 32 100 40 99 48 C98 57 91 61 84 60 C77 59 74 52 74 44 Z" fill="#fff" stroke="#0d1838" stroke-width="2.2"/>
      <circle cx="89" cy="46.5" r="7" fill="url(#tfI)"/><circle cx="89.5" cy="47" r="3.6" fill="#0a0a18"/>
      <circle cx="92.4" cy="43.4" r="2.4" fill="#fff"/><circle cx="86.2" cy="50.6" r="1.1" fill="#fff" opacity=".85"/>
      <path d="M75 47 C76 55 82 59 88 59.5" stroke="#b9c6e0" stroke-width="1.5" fill="none" opacity=".7"/>
    </g>
    <path class="p-brow" d="M72 35 C79 28 90 27 99 32" stroke="#0d1838" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <g class="p-beak" stroke-linejoin="round">
      <path d="M98 53 C107 50 118 53 125 59 C118 63 107 65 98 64 C95.5 60.5 95.5 56.5 98 53 Z" fill="url(#tfK)" stroke="#4a2205" stroke-width="2.2"/>
      <path d="M99 59 L121 59.5" stroke="#8a3e0a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M101 55 C107 53.5 113 54 118 56" stroke="#fff0c8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".9"/>
      <circle cx="104" cy="56.5" r=".9" fill="#5a2a06"/>
    </g>
    <ellipse cx="86" cy="66" rx="5" ry="2.8" fill="#ff6f86" opacity=".4"/>
  </g>
  </g>
  <g class="p-feathers" fill="#5b80cc" stroke="#0d1838" stroke-width="1.4">
    <path d="M56 48 q7 -10 14 0 q-7 8 -14 0 Z"/><path d="M70 62 q7 -10 14 0 q-7 8 -14 0 Z"/><path d="M48 66 q7 -10 14 0 q-7 8 -14 0 Z" fill="#f3e4c4"/><path d="M76 40 q7 -10 14 0 q-7 8 -14 0 Z"/>
  </g>
</svg>`,

/* ---- LARVE BLEUE ---- ver segmenté bleu avec antennes ---- */
larve_bleue: `<svg class="ms ms-larve_bleue" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="lvB" cx="45%" cy="30%" r="70%"><stop offset="0" stop-color="#7ec8ff"/><stop offset=".6" stop-color="#3a8fd8"/><stop offset="1" stop-color="#1a4a7a"/></radialGradient>
    <radialGradient id="lvV" cx="50%" cy="20%" r="60%"><stop offset="0" stop-color="#d0edff"/><stop offset="1" stop-color="#80b8e8"/></radialGradient>
    <linearGradient id="lvS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c0e4ff" stop-opacity=".6"/><stop offset="1" stop-color="#3a8fd8" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="34" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g class="p-body">
    <!-- queue (segment arrière) -->
    <ellipse class="p-torso" cx="30" cy="90" rx="16" ry="14" fill="url(#lvB)" stroke="#0e3a60" stroke-width="2.2"/>
    <ellipse cx="30" cy="86" rx="10" ry="6" fill="url(#lvS)"/>
    <!-- segment milieu-arrière -->
    <ellipse cx="48" cy="84" rx="17" ry="16" fill="url(#lvB)" stroke="#0e3a60" stroke-width="2.2"/>
    <ellipse cx="48" cy="79" rx="11" ry="7" fill="url(#lvS)"/>
    <!-- segment milieu -->
    <ellipse cx="68" cy="78" rx="18" ry="17" fill="url(#lvB)" stroke="#0e3a60" stroke-width="2.2"/>
    <ellipse cx="68" cy="73" rx="12" ry="7" fill="url(#lvS)"/>
    <!-- ventre clair -->
    <ellipse cx="68" cy="88" rx="12" ry="6" fill="url(#lvV)" opacity=".6"/>
    <!-- tête (segment avant, le plus gros) -->
    <ellipse cx="90" cy="72" rx="22" ry="20" fill="url(#lvB)" stroke="#0e3a60" stroke-width="2.5"/>
    <ellipse cx="90" cy="66" rx="14" ry="8" fill="url(#lvS)"/>
    <ellipse cx="92" cy="82" rx="13" ry="6" fill="url(#lvV)" opacity=".5"/>
    <!-- antennes -->
    <g class="p-antenna" stroke="#1a5a8a" stroke-width="2.5" fill="none" stroke-linecap="round">
      <path d="M96 55 Q102 40 96 30"/><path d="M84 56 Q78 42 82 32"/>
      <circle cx="96" cy="28" r="3" fill="#4ac0ff" stroke="none"/><circle cx="82" cy="30" r="3" fill="#4ac0ff" stroke="none"/>
    </g>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="96" cy="68" rx="6" ry="7" fill="#fff" stroke="#0e3a60" stroke-width="1.8"/>
      <circle cx="98" cy="69" r="3.5" fill="#0a2a4a"/><circle cx="100" cy="67" r="1.5" fill="#fff"/>
      <ellipse cx="82" cy="70" rx="5" ry="6" fill="#fff" stroke="#0e3a60" stroke-width="1.8"/>
      <circle cx="83.5" cy="71" r="3" fill="#0a2a4a"/><circle cx="85" cy="69" r="1.3" fill="#fff"/>
    </g>
    <!-- bouche -->
    <path d="M98 80 Q94 84 88 80" stroke="#0e3a60" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <!-- segments belly lines -->
    <g stroke="#1a5a8a" stroke-width="1.2" opacity=".4" fill="none">
      <path d="M38 76 Q40 92 38 96"/><path d="M56 70 Q58 88 56 94"/><path d="M76 66 Q78 84 76 92"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#5ec0ff" stroke="#0e3a60" stroke-width="1.2">
    <ellipse cx="60" cy="60" rx="5" ry="3"/><ellipse cx="78" cy="52" rx="4" ry="3"/><ellipse cx="50" cy="72" rx="5" ry="3"/><ellipse cx="72" cy="48" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- BOUFTOU ---- mouton laineux rond ---- */
bouftou: `<svg class="ms ms-bouftou" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bfW" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#fff8ee"/><stop offset=".5" stop-color="#ede0c8"/><stop offset="1" stop-color="#c4aa82"/></radialGradient>
    <radialGradient id="bfF" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#b08060"/><stop offset="1" stop-color="#6a4430"/></radialGradient>
    <linearGradient id="bfH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0d0b0"/><stop offset="1" stop-color="#8a7050"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="32" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <!-- pattes -->
  <g fill="url(#bfF)" stroke="#3a2010" stroke-width="2" stroke-linejoin="round">
    <rect x="40" y="100" width="10" height="18" rx="4"/><rect x="56" y="102" width="10" height="16" rx="4"/>
    <rect x="72" y="102" width="10" height="16" rx="4"/><rect x="86" y="100" width="10" height="18" rx="4"/>
    <ellipse cx="45" cy="118" rx="7" ry="3"/><ellipse cx="61" cy="118" rx="6" ry="3"/>
    <ellipse cx="77" cy="118" rx="6" ry="3"/><ellipse cx="91" cy="118" rx="7" ry="3"/>
  </g>
  <g class="p-body">
    <!-- laine (corps) -->
    <path class="p-torso" d="M64 30 Q78 24 90 30 Q102 28 108 38 Q116 46 112 58 Q118 68 112 78 Q116 88 108 96 Q100 104 88 102 Q78 108 64 106 Q50 108 40 102 Q28 104 20 96 Q12 88 16 78 Q10 68 16 58 Q12 46 20 38 Q26 28 38 30 Q50 24 64 30 Z" fill="url(#bfW)" stroke="#8a7a5a" stroke-width="2.4"/>
    <!-- texture laine -->
    <g fill="none" stroke="#c4aa82" stroke-width="1.6" stroke-linecap="round" opacity=".5">
      <path d="M36 50 q5 -6 10 0 q5 -6 10 0"/><path d="M66 42 q5 -6 10 0 q5 -6 10 0"/>
      <path d="M30 68 q5 -6 10 0 q5 -6 10 0"/><path d="M72 64 q5 -6 10 0 q5 -6 10 0"/>
      <path d="M40 86 q5 -6 10 0 q5 -6 10 0"/><path d="M66 82 q5 -6 10 0 q5 -6 10 0"/>
    </g>
    <!-- tête (face brune) -->
    <ellipse cx="96" cy="62" rx="20" ry="22" fill="url(#bfF)" stroke="#3a2010" stroke-width="2.4"/>
    <!-- cornes -->
    <g stroke="#6a5530" stroke-width="2.2" fill="url(#bfH)">
      <path d="M90 42 Q82 28 74 32 Q78 38 84 42"/>
      <path d="M100 40 Q108 26 116 30 Q112 36 106 40"/>
    </g>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="90" cy="58" rx="5" ry="6" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="91" cy="59" r="3" fill="#2a1a0a"/><circle cx="92.5" cy="57" r="1.3" fill="#fff"/>
      <ellipse cx="104" cy="58" rx="5" ry="6" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="105" cy="59" r="3" fill="#2a1a0a"/><circle cx="106.5" cy="57" r="1.3" fill="#fff"/>
    </g>
    <!-- museau -->
    <ellipse cx="98" cy="72" rx="8" ry="5" fill="#c49070" stroke="#5a3820" stroke-width="1.5"/>
    <ellipse cx="96" cy="71" rx="2" ry="1.5" fill="#5a3820"/><ellipse cx="100" cy="71" rx="2" ry="1.5" fill="#5a3820"/>
    <!-- mâchoire -->
    <g class="p-jaw">
      <path d="M92 77 Q98 82 104 77" stroke="#5a3820" stroke-width="1.5" fill="none"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#f0e4cc" stroke="#8a7a5a" stroke-width="1.2">
    <ellipse cx="55" cy="50" rx="6" ry="4"/><ellipse cx="75" cy="44" rx="5" ry="4"/><ellipse cx="45" cy="68" rx="6" ry="4"/><ellipse cx="80" cy="70" rx="5" ry="3"/>
  </g>
</svg>`,

/* ---- PISSENLIT DIABOLIQUE ---- fleur maléfique ---- */
pissenlit: `<svg class="ms ms-pissenlit" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="pdY" cx="50%" cy="40%" r="55%"><stop offset="0" stop-color="#fff8a0"/><stop offset=".6" stop-color="#f0d040"/><stop offset="1" stop-color="#c8a020"/></radialGradient>
    <linearGradient id="pdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab040"/><stop offset="1" stop-color="#2a6020"/></linearGradient>
    <linearGradient id="pdL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#70c850"/><stop offset="1" stop-color="#3a7a28"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="22" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <!-- racines (pieds) -->
  <g stroke="#3a5a20" stroke-width="2" fill="#4a7a30" stroke-linejoin="round">
    <path d="M56 108 L52 118 L48 116 L54 108 Z"/><path d="M64 110 L64 120 L60 118 Z"/>
    <path d="M72 108 L76 118 L80 116 L74 108 Z"/>
  </g>
  <g class="p-body">
    <!-- tige courte -->
    <path class="p-torso" d="M60 68 Q58 82 56 96 Q56 108 64 110 Q72 108 72 96 Q70 82 68 68 Z" fill="url(#pdG)" stroke="#2a5018" stroke-width="2.2"/>
    <!-- feuilles-bras -->
    <g class="p-leaves" stroke="#2a5018" stroke-width="1.8" fill="url(#pdL)">
      <path d="M58 82 Q38 72 24 78 Q36 84 50 86 Z"/>
      <path d="M70 78 Q90 68 104 74 Q92 80 78 82 Z"/>
      <path d="M56 96 Q38 92 26 98 Q38 102 50 100 Z"/>
    </g>
    <!-- fleur (tête) - grosse et centrée -->
    <g>
      <!-- pétales en couronne complète -->
      <g fill="url(#pdY)" stroke="#b09020" stroke-width="1.4">
        <ellipse cx="64.0" cy="40.0" rx="8" ry="18" style="transform:rotate(0deg);transform-origin:50% 50%"/>
        <ellipse cx="75.3" cy="44.7" rx="8" ry="18" style="transform:rotate(45deg);transform-origin:50% 50%"/>
        <ellipse cx="80.0" cy="56.0" rx="8" ry="18" style="transform:rotate(90deg);transform-origin:50% 50%"/>
        <ellipse cx="75.3" cy="67.3" rx="8" ry="18" style="transform:rotate(135deg);transform-origin:50% 50%"/>
        <ellipse cx="64.0" cy="72.0" rx="8" ry="18" style="transform:rotate(180deg);transform-origin:50% 50%"/>
        <ellipse cx="52.7" cy="67.3" rx="8" ry="18" style="transform:rotate(225deg);transform-origin:50% 50%"/>
        <ellipse cx="48.0" cy="56.0" rx="8" ry="18" style="transform:rotate(270deg);transform-origin:50% 50%"/>
        <ellipse cx="52.7" cy="44.7" rx="8" ry="18" style="transform:rotate(315deg);transform-origin:50% 50%"/>
      </g>
      <!-- centre brun (visage) -->
      <circle cx="64" cy="56" r="18" fill="#8a5010" stroke="#5a3008" stroke-width="2.5"/>
      <!-- texture du centre -->
      <circle cx="64" cy="56" r="14" fill="none" stroke="#6a3808" stroke-width="1" opacity=".3"/>
      <circle cx="64" cy="56" r="10" fill="none" stroke="#6a3808" stroke-width="1" opacity=".2"/>
      <!-- yeux rouges méchants -->
      <g class="p-eye">
        <ellipse cx="56" cy="52" rx="5" ry="5.5" fill="#ff3030" stroke="#5a0808" stroke-width="1.5"/>
        <circle cx="56" cy="52" r="2.8" fill="#2a0000"/><circle cx="57.5" cy="50.5" r="1.3" fill="#ff8080"/>
        <ellipse cx="72" cy="52" rx="5" ry="5.5" fill="#ff3030" stroke="#5a0808" stroke-width="1.5"/>
        <circle cx="72" cy="52" r="2.8" fill="#2a0000"/><circle cx="73.5" cy="50.5" r="1.3" fill="#ff8080"/>
      </g>
      <!-- sourcils méchants -->
      <path d="M50 46 L58 48" stroke="#2a0a00" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 46 L70 48" stroke="#2a0a00" stroke-width="2.5" stroke-linecap="round"/>
      <!-- bouche maléfique avec crocs -->
      <path d="M56 62 Q64 70 72 62" stroke="#2a0a00" stroke-width="2" fill="none"/>
      <path d="M58 63 L60 66 L62 63 Z" fill="#fff8a0"/><path d="M66 63 L68 66 L70 63 Z" fill="#fff8a0"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#f0d040" stroke="#b09020" stroke-width="1">
    <ellipse cx="46" cy="42" rx="5" ry="3"/><ellipse cx="82" cy="40" rx="5" ry="3"/><ellipse cx="40" cy="60" rx="4" ry="3"/><ellipse cx="88" cy="58" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- BOUFTON BLANC ---- petit mouton blanc ---- */
boufton_blanc: `<svg class="ms ms-boufton_blanc" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bbW" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#f0eee8"/><stop offset="1" stop-color="#d0c8b8"/></radialGradient>
    <radialGradient id="bbF" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#c8a888"/><stop offset="1" stop-color="#8a6848"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="28" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="url(#bbF)" stroke="#5a3820" stroke-width="1.8">
    <rect x="44" y="102" width="9" height="15" rx="4"/><rect x="58" y="103" width="9" height="14" rx="4"/>
    <rect x="70" y="103" width="9" height="14" rx="4"/><rect x="82" y="102" width="9" height="15" rx="4"/>
  </g>
  <g class="p-body">
    <path class="p-torso" d="M64 38 Q76 32 86 38 Q96 36 102 44 Q108 52 104 62 Q110 70 104 78 Q108 86 100 92 Q92 98 82 96 Q74 100 64 98 Q54 100 46 96 Q36 98 28 92 Q20 86 24 78 Q18 70 24 62 Q20 52 26 44 Q32 36 42 38 Q52 32 64 38 Z" fill="url(#bbW)" stroke="#a09878" stroke-width="2.2"/>
    <g fill="none" stroke="#d0c8b8" stroke-width="1.4" stroke-linecap="round" opacity=".5">
      <path d="M40 56 q4 -5 8 0 q4 -5 8 0"/><path d="M68 50 q4 -5 8 0 q4 -5 8 0"/>
      <path d="M36 72 q4 -5 8 0"/><path d="M76 68 q4 -5 8 0"/>
    </g>
    <ellipse cx="92" cy="62" rx="17" ry="18" fill="url(#bbF)" stroke="#5a3820" stroke-width="2.2"/>
    <g class="p-eye">
      <ellipse cx="87" cy="58" rx="4.5" ry="5.5" fill="#fff" stroke="#5a3820" stroke-width="1.5"/>
      <circle cx="88" cy="59" r="2.8" fill="#1a0a00"/><circle cx="89.5" cy="57" r="1.2" fill="#fff"/>
      <ellipse cx="100" cy="58" rx="4.5" ry="5.5" fill="#fff" stroke="#5a3820" stroke-width="1.5"/>
      <circle cx="101" cy="59" r="2.8" fill="#1a0a00"/><circle cx="102.5" cy="57" r="1.2" fill="#fff"/>
    </g>
    <ellipse cx="94" cy="70" rx="6" ry="4" fill="#dab090" stroke="#6a4830" stroke-width="1.2"/>
    <ellipse cx="92" cy="69" rx="1.5" ry="1.2" fill="#6a4830"/><ellipse cx="96" cy="69" rx="1.5" ry="1.2" fill="#6a4830"/>
    <ellipse cx="86" cy="64" rx="4" ry="2" fill="#ffaaaa" opacity=".3"/>
  </g>
  </g>
  <g class="p-feathers" fill="#fff" stroke="#a09878" stroke-width="1">
    <ellipse cx="52" cy="48" rx="5" ry="3"/><ellipse cx="70" cy="44" rx="5" ry="3"/><ellipse cx="44" cy="66" rx="5" ry="3"/><ellipse cx="78" cy="64" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- MOSKITO ---- gros moustique ---- */
moskito: `<svg class="ms ms-moskito" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="mkB" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#8a5040"/><stop offset="1" stop-color="#4a2218"/></radialGradient>
    <linearGradient id="mkW" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#c8e8ff" stop-opacity=".5"/><stop offset="1" stop-color="#e8f4ff" stop-opacity=".8"/></linearGradient>
    <radialGradient id="mkE" cx="40%" cy="40%" r="50%"><stop offset="0" stop-color="#ff4040"/><stop offset=".7" stop-color="#cc1818"/><stop offset="1" stop-color="#6a0808"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="20" ry="3" fill="#000" opacity=".2"/>
  <g class="p-hop">
  <!-- pattes fines -->
  <g stroke="#3a1808" stroke-width="1.5" fill="none" stroke-linecap="round">
    <path d="M50 80 Q40 95 32 108 Q30 114 34 116"/><path d="M55 82 Q50 98 48 112 Q47 116 50 117"/>
    <path d="M72 82 Q78 98 80 112 Q81 116 78 117"/><path d="M76 80 Q86 95 94 108 Q96 114 92 116"/>
    <path d="M52 76 Q38 78 28 88 Q26 92 28 94"/><path d="M74 76 Q88 78 98 88 Q100 92 98 94"/>
  </g>
  <g class="p-body">
    <!-- abdomen -->
    <ellipse cx="40" cy="68" rx="20" ry="14" fill="url(#mkB)" stroke="#2a1008" stroke-width="2.2" transform="rotate(-15 40 68)"/>
    <g stroke="#6a3828" stroke-width="1" opacity=".5"><path d="M28 64 Q40 60 52 64"/><path d="M30 68 Q40 65 50 68"/><path d="M32 72 Q40 70 48 72"/></g>
    <!-- thorax -->
    <ellipse class="p-torso" cx="64" cy="62" rx="16" ry="18" fill="url(#mkB)" stroke="#2a1008" stroke-width="2.2"/>
    <path d="M56 50 Q64 46 72 50" stroke="#b07060" stroke-width="2" fill="none" opacity=".5"/>
    <!-- ailes -->
    <g class="p-wing" fill="url(#mkW)" stroke="#8ab8d8" stroke-width="1.2">
      <ellipse cx="50" cy="40" rx="22" ry="10" transform="rotate(-20 50 40)"/>
      <ellipse cx="78" cy="40" rx="22" ry="10" transform="rotate(20 78 40)"/>
      <path d="M38 38 Q50 30 62 38 M66 38 Q78 30 90 38" stroke="#a0d0f0" stroke-width=".8" fill="none"/>
    </g>
    <!-- tête -->
    <circle cx="84" cy="56" r="14" fill="url(#mkB)" stroke="#2a1008" stroke-width="2.2"/>
    <!-- yeux composés -->
    <g class="p-eye">
      <ellipse cx="80" cy="50" rx="6" ry="7" fill="url(#mkE)" stroke="#4a0808" stroke-width="1.5"/>
      <ellipse cx="92" cy="50" rx="6" ry="7" fill="url(#mkE)" stroke="#4a0808" stroke-width="1.5"/>
      <circle cx="81" cy="48" r="2" fill="#ff8080" opacity=".6"/><circle cx="93" cy="48" r="2" fill="#ff8080" opacity=".6"/>
    </g>
    <!-- trompe (proboscis) -->
    <g class="p-beak">
      <path d="M96 58 L120 66 L122 64 L98 56 Z" fill="#5a2a18" stroke="#2a1008" stroke-width="1.5"/>
    </g>
    <!-- antennes -->
    <g class="p-antenna" stroke="#5a3020" stroke-width="1.5" fill="none" stroke-linecap="round">
      <path d="M80 44 Q74 30 70 24"/><path d="M88 42 Q92 28 96 22"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#c8e8ff" stroke="#6a8aa0" stroke-width="1">
    <path d="M48 44 q6 -8 12 0 q-6 6 -12 0 Z"/><path d="M68 38 q6 -8 12 0 q-6 6 -12 0 Z"/><path d="M40 56 q5 -7 10 0 q-5 5 -10 0 Z"/><path d="M76 34 q6 -8 12 0 q-6 6 -12 0 Z"/>
  </g>
</svg>`,

/* ---- ARAKNE ---- araignée violette ---- */
arakne: `<svg class="ms ms-arakne" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="akP" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#b080d0"/><stop offset=".6" stop-color="#7a48a0"/><stop offset="1" stop-color="#3a1860"/></radialGradient>
    <radialGradient id="akH" cx="45%" cy="35%" r="60%"><stop offset="0" stop-color="#906eb8"/><stop offset="1" stop-color="#4a2870"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <!-- pattes (4 de chaque côté, simplifiées) -->
  <g stroke="#2a0840" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M44 68 Q22 52 14 60 Q18 66 24 68"/><path d="M42 76 Q18 70 8 80 Q14 86 22 84"/>
    <path d="M44 84 Q24 90 18 102 Q24 104 30 98"/><path d="M48 90 Q36 104 34 114 Q40 116 44 110"/>
    <path d="M80 68 Q102 52 110 60 Q106 66 100 68"/><path d="M82 76 Q106 70 116 80 Q110 86 102 84"/>
    <path d="M80 84 Q100 90 106 102 Q100 104 94 98"/><path d="M76 90 Q88 104 90 114 Q84 116 80 110"/>
  </g>
  <g class="p-body">
    <!-- abdomen (gros, arrière) -->
    <ellipse cx="46" cy="78" rx="24" ry="20" fill="url(#akP)" stroke="#2a0840" stroke-width="2.4"/>
    <!-- motif sur abdomen -->
    <path d="M42 64 L46 72 L50 64 M38 70 L46 80 L54 70" stroke="#d0a0ff" stroke-width="1.5" fill="none" opacity=".6"/>
    <ellipse cx="46" cy="78" rx="10" ry="6" fill="#d0a0ff" opacity=".15"/>
    <!-- thorax (petit, avant) -->
    <ellipse class="p-torso" cx="72" cy="72" rx="16" ry="14" fill="url(#akH)" stroke="#2a0840" stroke-width="2.2"/>
    <!-- yeux (rangée de petits yeux) -->
    <g class="p-eye">
      <circle cx="68" cy="64" r="4" fill="#fff" stroke="#2a0840" stroke-width="1.2"/><circle cx="69" cy="64.5" r="2.2" fill="#1a0030"/><circle cx="70" cy="63" r="1" fill="#fff"/>
      <circle cx="78" cy="64" r="4" fill="#fff" stroke="#2a0840" stroke-width="1.2"/><circle cx="79" cy="64.5" r="2.2" fill="#1a0030"/><circle cx="80" cy="63" r="1" fill="#fff"/>
      <circle cx="66" cy="68" r="2.5" fill="#c8a0e0" stroke="#2a0840" stroke-width=".8"/><circle cx="80" cy="68" r="2.5" fill="#c8a0e0" stroke="#2a0840" stroke-width=".8"/>
      <circle cx="64" cy="72" r="2" fill="#c8a0e0" stroke="#2a0840" stroke-width=".8"/><circle cx="82" cy="72" r="2" fill="#c8a0e0" stroke="#2a0840" stroke-width=".8"/>
    </g>
    <!-- chélicères (crocs) -->
    <g class="p-jaw" fill="#e0c0ff" stroke="#4a1870" stroke-width="1.5">
      <path d="M70 78 Q66 88 68 92 Q72 90 72 82 Z"/>
      <path d="M76 78 Q80 88 78 92 Q74 90 74 82 Z"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#c8a0e8" stroke="#4a2870" stroke-width="1">
    <path d="M56 60 q5 -8 10 0 q-5 6 -10 0 Z"/><path d="M72 54 q5 -8 10 0 q-5 6 -10 0 Z"/><path d="M40 68 q4 -6 8 0 q-4 5 -8 0 Z"/><path d="M82 60 q4 -6 8 0 q-4 5 -8 0 Z"/>
  </g>
</svg>`,

/* ---- CHAMP CHAMP ---- champignon marcheur ---- */
champ_champ: `<svg class="ms ms-champ_champ" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="ccC" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#e86838"/><stop offset=".6" stop-color="#c44420"/><stop offset="1" stop-color="#7a2210"/></radialGradient>
    <radialGradient id="ccS" cx="50%" cy="30%" r="60%"><stop offset="0" stop-color="#f0e8d0"/><stop offset="1" stop-color="#c8b898"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="24" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#c8b898" stroke="#6a5838" stroke-width="1.8">
    <path d="M52 106 L48 118 Q52 120 56 118 L54 106 Z"/><path d="M72 106 L68 118 Q72 120 76 118 L74 106 Z"/>
  </g>
  <g class="p-body">
    <!-- pied (tige) -->
    <path class="p-torso" d="M50 60 Q48 80 46 100 Q46 110 64 110 Q82 110 82 100 Q80 80 78 60 Z" fill="url(#ccS)" stroke="#8a7858" stroke-width="2.2"/>
    <path d="M56 68 Q60 66 64 68" stroke="#a09070" stroke-width="1.2" fill="none" opacity=".4"/>
    <path d="M54 80 Q60 78 66 80" stroke="#a09070" stroke-width="1.2" fill="none" opacity=".4"/>
    <!-- chapeau -->
    <ellipse cx="64" cy="52" rx="40" ry="28" fill="url(#ccC)" stroke="#5a1808" stroke-width="2.5"/>
    <!-- pois blancs -->
    <g fill="#fff8e0" opacity=".7">
      <circle cx="42" cy="42" r="5"/><circle cx="72" cy="34" r="6"/><circle cx="56" cy="52" r="4"/>
      <circle cx="88" cy="44" r="5"/><circle cx="36" cy="56" r="4"/><circle cx="78" cy="56" r="3.5"/>
    </g>
    <!-- bord du chapeau -->
    <path d="M24 52 Q44 60 64 58 Q84 60 104 52" stroke="#9a3818" stroke-width="1.8" fill="none"/>
    <!-- dessous du chapeau (lamelles) -->
    <g stroke="#c8a070" stroke-width="1" opacity=".5" fill="none">
      <path d="M34 56 L34 62"/><path d="M44 58 L44 64"/><path d="M54 58 L54 66"/><path d="M64 58 L64 66"/>
      <path d="M74 58 L74 66"/><path d="M84 58 L84 64"/><path d="M94 56 L94 62"/>
    </g>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="56" cy="78" rx="5" ry="6" fill="#fff" stroke="#6a5030" stroke-width="1.5"/>
      <circle cx="57" cy="79" r="3" fill="#2a1a0a"/><circle cx="58.5" cy="77" r="1.3" fill="#fff"/>
      <ellipse cx="72" cy="78" rx="5" ry="6" fill="#fff" stroke="#6a5030" stroke-width="1.5"/>
      <circle cx="73" cy="79" r="3" fill="#2a1a0a"/><circle cx="74.5" cy="77" r="1.3" fill="#fff"/>
    </g>
    <!-- bouche -->
    <path d="M60 90 Q64 94 68 90" stroke="#6a5030" stroke-width="1.5" fill="none"/>
  </g>
  </g>
  <g class="p-feathers" fill="#e8c870" stroke="#8a6020" stroke-width="1">
    <circle cx="50" cy="40" r="3"/><circle cx="76" cy="36" r="3"/><circle cx="42" cy="56" r="2.5"/><circle cx="86" cy="52" r="2.5"/>
  </g>
</svg>`,

/* ---- ÉCUROUILLE ---- écureuil à grosse queue ---- */
ecurouille: `<svg class="ms ms-ecurouille" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="eqB" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#d08840"/><stop offset=".7" stop-color="#a06028"/><stop offset="1" stop-color="#6a3818"/></radialGradient>
    <radialGradient id="eqV" cx="50%" cy="30%" r="60%"><stop offset="0" stop-color="#ffe8c0"/><stop offset="1" stop-color="#e0c090"/></radialGradient>
    <radialGradient id="eqT" cx="30%" cy="50%" r="70%"><stop offset="0" stop-color="#e0a050"/><stop offset=".5" stop-color="#c07830"/><stop offset="1" stop-color="#804820"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#8a5828" stroke="#4a2810" stroke-width="1.8">
    <path d="M60 100 L56 116 Q60 118 64 116 L62 100 Z"/>
    <path d="M76 98 L74 116 Q78 118 82 116 L80 98 Z"/>
  </g>
  <g class="p-body">
    <!-- queue touffue -->
    <g class="p-tail">
      <path d="M42 80 Q20 70 12 48 Q8 28 20 18 Q32 12 40 22 Q48 34 46 50 Q44 64 44 76 Z" fill="url(#eqT)" stroke="#5a3018" stroke-width="2.2"/>
      <path d="M30 30 Q34 40 38 48 M22 26 Q28 38 34 50 M36 46 Q40 56 42 66" stroke="#e8c080" stroke-width="1.5" fill="none" opacity=".5"/>
    </g>
    <!-- corps -->
    <ellipse class="p-torso" cx="68" cy="72" rx="24" ry="28" fill="url(#eqB)" stroke="#4a2810" stroke-width="2.4"/>
    <!-- ventre clair -->
    <ellipse cx="72" cy="80" rx="14" ry="16" fill="url(#eqV)" opacity=".7"/>
    <!-- tête -->
    <ellipse cx="86" cy="46" rx="18" ry="16" fill="url(#eqB)" stroke="#4a2810" stroke-width="2.2"/>
    <!-- oreilles -->
    <g fill="#c07830" stroke="#4a2810" stroke-width="1.8">
      <path d="M78 34 Q74 18 80 14 Q86 18 82 34 Z"/>
      <path d="M92 32 Q96 16 102 14 Q106 20 98 34 Z"/>
    </g>
    <path d="M79 28 Q78 22 80 18" stroke="#ffcc88" stroke-width="1.2" fill="none" opacity=".6"/>
    <path d="M95 26 Q98 20 100 18" stroke="#ffcc88" stroke-width="1.2" fill="none" opacity=".6"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="82" cy="44" rx="5.5" ry="6.5" fill="#fff" stroke="#4a2810" stroke-width="1.6"/>
      <circle cx="83.5" cy="45" r="3.5" fill="#1a0a00"/><circle cx="85" cy="43" r="1.5" fill="#fff"/>
      <ellipse cx="96" cy="44" rx="5" ry="6" fill="#fff" stroke="#4a2810" stroke-width="1.6"/>
      <circle cx="97" cy="45" r="3" fill="#1a0a00"/><circle cx="98.5" cy="43" r="1.3" fill="#fff"/>
    </g>
    <!-- museau -->
    <ellipse cx="100" cy="52" rx="5" ry="3.5" fill="#e0c090" stroke="#6a4020" stroke-width="1.2"/>
    <circle cx="100" cy="51" r="2" fill="#3a1a08"/>
    <!-- petites pattes avant -->
    <g fill="#a06028" stroke="#4a2810" stroke-width="1.5">
      <path d="M84 68 Q94 62 98 66 Q96 72 88 72 Z"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#d0a050" stroke="#6a4020" stroke-width="1.2">
    <ellipse cx="52" cy="44" rx="5" ry="3"/><ellipse cx="72" cy="36" rx="4" ry="3"/><ellipse cx="44" cy="60" rx="5" ry="3"/><ellipse cx="80" cy="32" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- PRESPIC ---- hérisson à piquants ---- */
prespic: `<svg class="ms ms-prespic" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="ppB" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#c0a880"/><stop offset=".7" stop-color="#8a7050"/><stop offset="1" stop-color="#5a4028"/></radialGradient>
    <linearGradient id="ppQ" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5a4028"/><stop offset=".4" stop-color="#c0a880"/><stop offset="1" stop-color="#f0e0c0"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="30" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g fill="#6a5030" stroke="#3a2010" stroke-width="1.5">
    <ellipse cx="44" cy="116" rx="8" ry="4"/><ellipse cx="64" cy="117" rx="7" ry="3.5"/><ellipse cx="84" cy="116" rx="8" ry="4"/>
  </g>
  <g class="p-body">
    <!-- corps -->
    <ellipse class="p-torso" cx="60" cy="78" rx="36" ry="28" fill="url(#ppB)" stroke="#3a2010" stroke-width="2.4"/>
    <!-- ventre clair -->
    <ellipse cx="62" cy="90" rx="22" ry="14" fill="#e8d8b8" opacity=".5"/>
    <!-- piquants -->
    <g class="p-quills" fill="url(#ppQ)" stroke="#5a4028" stroke-width="1.2">
      <path d="M32 68 L20 42 L36 60 Z"/><path d="M40 58 L30 30 L44 52 Z"/><path d="M50 52 L44 22 L56 48 Z"/>
      <path d="M60 50 L60 16 L66 46 Z"/><path d="M70 50 L76 20 L76 48 Z"/><path d="M78 54 L90 28 L82 52 Z"/>
      <path d="M84 60 L100 38 L88 58 Z"/><path d="M88 68 L108 50 L92 66 Z"/>
    </g>
    <!-- tête -->
    <ellipse cx="98" cy="80" rx="16" ry="14" fill="#c0a880" stroke="#3a2010" stroke-width="2.2"/>
    <ellipse cx="104" cy="86" rx="8" ry="5" fill="#e8d8b8" opacity=".5"/>
    <!-- yeux -->
    <g class="p-eye">
      <circle cx="96" cy="76" r="4.5" fill="#fff" stroke="#3a2010" stroke-width="1.4"/>
      <circle cx="97" cy="77" r="2.5" fill="#1a0a00"/><circle cx="98.5" cy="75.5" r="1.1" fill="#fff"/>
      <circle cx="106" cy="76" r="4" fill="#fff" stroke="#3a2010" stroke-width="1.4"/>
      <circle cx="107" cy="77" r="2.3" fill="#1a0a00"/><circle cx="108" cy="75.5" r="1" fill="#fff"/>
    </g>
    <!-- museau -->
    <ellipse cx="114" cy="82" rx="5" ry="3" fill="#e0c8a0" stroke="#5a4028" stroke-width="1.2"/>
    <circle cx="116" cy="81" r="2.2" fill="#2a1808"/>
  </g>
  </g>
  <g class="p-feathers" fill="#c8b080" stroke="#5a4028" stroke-width="1.2">
    <path d="M46 46 l4 -12 4 10 z"/><path d="M64 38 l3 -12 4 10 z"/><path d="M78 42 l4 -12 4 10 z"/><path d="M90 50 l4 -10 3 8 z"/>
  </g>
</svg>`,

/* ---- ABRAKNYDE ---- arbre animé ---- */
abraknyde: `<svg class="ms ms-abraknyde" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <linearGradient id="abT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6838"/><stop offset=".5" stop-color="#6a4820"/><stop offset="1" stop-color="#4a3018"/></linearGradient>
    <radialGradient id="abL" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#70c040"/><stop offset=".7" stop-color="#408820"/><stop offset="1" stop-color="#1a4a08"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="28" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <!-- racines-pieds -->
  <g fill="#5a3818" stroke="#2a1808" stroke-width="2">
    <path d="M44 104 Q36 114 28 116 Q32 118 40 116 L46 106 Z"/><path d="M54 106 Q50 116 46 120 Q52 120 58 116 L58 106 Z"/>
    <path d="M72 106 Q76 116 82 120 Q84 118 80 114 L74 106 Z"/><path d="M82 104 Q90 114 98 116 Q96 112 88 108 L84 104 Z"/>
  </g>
  <g class="p-body">
    <!-- tronc -->
    <path class="p-torso" d="M48 40 Q44 60 42 80 Q40 100 52 106 Q60 110 68 110 Q76 110 84 106 Q86 100 84 80 Q82 60 78 40 Z" fill="url(#abT)" stroke="#2a1808" stroke-width="2.5"/>
    <!-- texture écorce -->
    <g stroke="#3a2010" stroke-width="1.2" fill="none" opacity=".4">
      <path d="M52 50 Q56 52 60 50"/><path d="M66 58 Q70 60 74 58"/><path d="M50 72 Q56 74 62 72"/>
      <path d="M64 82 Q70 84 76 82"/><path d="M54 92 Q60 94 66 92"/>
    </g>
    <!-- noeud-yeux (visage dans le tronc) -->
    <g class="p-eye">
      <ellipse cx="56" cy="66" rx="6" ry="5" fill="#2a1a08" stroke="#1a0a00" stroke-width="1.5"/>
      <circle cx="57" cy="65" r="2.5" fill="#a0ff40"/><circle cx="58" cy="64" r="1.2" fill="#fff"/>
      <ellipse cx="72" cy="66" rx="6" ry="5" fill="#2a1a08" stroke="#1a0a00" stroke-width="1.5"/>
      <circle cx="73" cy="65" r="2.5" fill="#a0ff40"/><circle cx="74" cy="64" r="1.2" fill="#fff"/>
    </g>
    <!-- bouche (fente dans l'écorce) -->
    <path d="M58 78 Q64 84 70 78" stroke="#1a0a00" stroke-width="2" fill="#2a1808"/>
    <!-- branches-bras -->
    <g class="p-limb" stroke="#3a2010" stroke-width="2.5" fill="#6a4820">
      <path d="M48 52 Q30 42 18 34 Q22 30 26 34 Q34 38 42 42 L48 48 Z"/>
      <path d="M78 50 Q96 40 108 32 Q104 28 100 32 Q92 36 84 42 L78 46 Z"/>
    </g>
    <!-- feuillage (couronne) -->
    <g class="p-leaves" fill="url(#abL)" stroke="#1a4a08" stroke-width="1.8">
      <path d="M64 10 Q44 6 28 18 Q16 30 22 44 Q32 36 42 38 Q38 28 44 20 Q52 14 64 16 Z"/>
      <path d="M64 10 Q84 6 100 18 Q112 30 106 44 Q96 36 86 38 Q90 28 84 20 Q76 14 64 16 Z"/>
      <path d="M42 38 Q34 32 28 36 Q32 42 38 42 Z" opacity=".7"/>
      <path d="M86 38 Q94 32 100 36 Q96 42 90 42 Z" opacity=".7"/>
    </g>
    <g fill="#90e050" opacity=".3">
      <circle cx="44" cy="20" r="4"/><circle cx="80" cy="18" r="4"/><circle cx="36" cy="34" r="3"/><circle cx="92" cy="34" r="3"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#60b030" stroke="#1a4a08" stroke-width="1.2">
    <path d="M44 22 q6 -6 10 2 q-8 4 -10 -2 Z"/><path d="M72 18 q6 -6 10 2 q-8 4 -10 -2 Z"/><path d="M32 36 q5 -5 8 2 q-6 3 -8 -2 Z"/><path d="M86 34 q5 -5 8 2 q-6 3 -8 -2 Z"/>
  </g>
</svg>`,

/* ---- SANGLIER ---- sanglier massif ---- */
sanglier: `<svg class="ms ms-sanglier" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="sgB" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#7a5a40"/><stop offset=".6" stop-color="#5a3a22"/><stop offset="1" stop-color="#2a1a0a"/></radialGradient>
    <linearGradient id="sgM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a48"/><stop offset="1" stop-color="#4a2a12"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="34" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g fill="#4a2a12" stroke="#1a0a00" stroke-width="1.8">
    <rect x="32" y="100" width="10" height="18" rx="3"/><rect x="48" y="102" width="9" height="16" rx="3"/>
    <rect x="72" y="102" width="9" height="16" rx="3"/><rect x="88" y="100" width="10" height="18" rx="3"/>
    <ellipse cx="37" cy="118" rx="6" ry="3"/><ellipse cx="52" cy="118" rx="5.5" ry="3"/><ellipse cx="76.5" cy="118" rx="5.5" ry="3"/><ellipse cx="93" cy="118" rx="6" ry="3"/>
  </g>
  <g class="p-body">
    <!-- corps massif -->
    <ellipse class="p-torso" cx="60" cy="72" rx="38" ry="30" fill="url(#sgB)" stroke="#1a0a00" stroke-width="2.5"/>
    <!-- crête dorsale (poils hérissés) -->
    <g stroke="#2a1a0a" stroke-width="1.5" fill="#3a2812">
      <path d="M30 52 L28 42 L34 48 Z"/><path d="M38 48 L38 36 L44 44 Z"/><path d="M48 44 L50 32 L54 42 Z"/>
      <path d="M56 44 L60 30 L64 42 Z"/><path d="M66 46 L70 34 L72 44 Z"/>
    </g>
    <!-- tête -->
    <path d="M88 56 Q108 48 116 58 Q120 68 116 78 Q108 88 88 82 Z" fill="url(#sgM)" stroke="#1a0a00" stroke-width="2.4"/>
    <!-- oreilles -->
    <g fill="#5a3a22" stroke="#1a0a00" stroke-width="1.5">
      <path d="M96 52 Q92 38 96 34 Q102 38 100 50 Z"/>
      <path d="M106 50 Q110 36 114 34 Q116 40 110 50 Z"/>
    </g>
    <!-- yeux (petits, colériques) -->
    <g class="p-eye">
      <ellipse cx="98" cy="60" rx="4" ry="3.5" fill="#fff" stroke="#1a0a00" stroke-width="1.4"/>
      <circle cx="99" cy="60.5" r="2" fill="#8a2000"/><circle cx="100" cy="59.5" r=".9" fill="#fff"/>
      <ellipse cx="110" cy="60" rx="3.5" ry="3" fill="#fff" stroke="#1a0a00" stroke-width="1.4"/>
      <circle cx="111" cy="60.5" r="1.8" fill="#8a2000"/><circle cx="112" cy="59.5" r=".8" fill="#fff"/>
    </g>
    <!-- sourcils méchants -->
    <path d="M94 56 L100 57" stroke="#1a0a00" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M114 56 L108 57" stroke="#1a0a00" stroke-width="2.5" stroke-linecap="round"/>
    <!-- groin -->
    <ellipse cx="118" cy="70" rx="7" ry="5" fill="#c08868" stroke="#5a3020" stroke-width="1.5"/>
    <circle cx="116" cy="69.5" r="1.8" fill="#4a2010"/><circle cx="120" cy="69.5" r="1.8" fill="#4a2010"/>
    <!-- défenses -->
    <g fill="#f0e8d0" stroke="#8a7a60" stroke-width="1.2">
      <path d="M112 78 Q108 86 104 82 Q108 80 110 76 Z"/>
      <path d="M120 76 Q124 84 120 86 Q118 82 118 76 Z"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#6a5040" stroke="#2a1808" stroke-width="1.2">
    <path d="M50 52 l5 -8 5 6 z"/><path d="M70 48 l4 -8 5 6 z"/><path d="M38 64 l5 -8 4 6 z"/><path d="M80 58 l5 -8 4 6 z"/>
  </g>
</svg>`,

/* ---- KWAK DE GLACE ---- oiseau de glace ---- */
kwak: `<svg class="ms ms-kwak" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="kwI" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#c0e8ff"/><stop offset=".4" stop-color="#60b0e8"/><stop offset=".8" stop-color="#2070b0"/><stop offset="1" stop-color="#103860"/></radialGradient>
    <radialGradient id="kwV" cx="50%" cy="25%" r="70%"><stop offset="0" stop-color="#f0f8ff"/><stop offset="1" stop-color="#b0d8f0"/></radialGradient>
    <linearGradient id="kwC" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="#1060a0"/><stop offset=".5" stop-color="#40a0e0"/><stop offset="1" stop-color="#c0e8ff"/></linearGradient>
    <linearGradient id="kwW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3080c0"/><stop offset="1" stop-color="#103050"/></linearGradient>
    <linearGradient id="kwK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#80c0e0"/><stop offset="1" stop-color="#2060a0"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="28" ry="5" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g class="p-legs" stroke="#103050" stroke-width="2" fill="url(#kwK)">
    <path d="M50 98 L48 112 L42 115 Q41 117 44 117 L50 115 L49 119 Q51 120 52 118 L54 114 L58 116 Q60 115 58 113 L54 111 L55 98 Z"/>
    <path d="M72 98 L73 112 L68 115 Q67 117 70 117 L74 115 L75 119 Q77 120 78 118 L78 114 L83 115 Q85 114 83 112 L78 111 L77 98 Z"/>
  </g>
  <g class="p-body">
    <!-- queue glacée -->
    <g class="p-tail" stroke="#103050" stroke-width="2">
      <path d="M34 62 Q14 56 8 44 Q18 50 28 50 Z" fill="url(#kwW)"/>
      <path d="M36 56 Q18 42 20 28 Q28 40 38 48 Z" fill="url(#kwW)"/>
    </g>
    <!-- corps -->
    <ellipse class="p-torso" cx="64" cy="66" rx="30" ry="32" fill="url(#kwI)" stroke="#103050" stroke-width="2.5"/>
    <!-- ventre clair -->
    <ellipse cx="72" cy="76" rx="16" ry="18" fill="url(#kwV)" opacity=".6"/>
    <!-- crête de cristaux de glace -->
    <g class="p-tuft" stroke="#1060a0" stroke-width="1.5" fill="url(#kwC)">
      <path d="M58 36 L50 12 L56 30 L52 8 L60 28 L58 4 L64 26 Q62 34 58 36 Z"/>
      <path d="M68 34 L74 14 L70 28 L78 10 L72 30 Q70 34 68 34 Z"/>
    </g>
    <!-- aile -->
    <g class="p-wing" stroke="#103050" stroke-width="2" fill="url(#kwW)">
      <path d="M46 60 Q32 60 26 72 Q28 84 36 88 Q44 84 48 76 Q52 68 50 62 Z"/>
      <path d="M30 82 Q28 90 34 94 Q38 88 36 82 Z" opacity=".8"/>
      <path d="M38 84 Q38 92 44 96 Q46 90 44 84 Z" opacity=".8"/>
    </g>
    <!-- oeil -->
    <g class="p-eye">
      <ellipse cx="82" cy="52" rx="8" ry="9" fill="#fff" stroke="#103050" stroke-width="2"/>
      <circle cx="84" cy="53" r="5" fill="#1060a0"/><circle cx="85" cy="54" r="2.5" fill="#0a1a30"/>
      <circle cx="87" cy="50" r="2" fill="#fff"/><circle cx="82" cy="56" r=".9" fill="#fff" opacity=".7"/>
    </g>
    <!-- sourcil -->
    <path class="p-brow" d="M74 44 Q82 38 94 42" stroke="#103050" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- bec -->
    <g class="p-beak">
      <path d="M92 58 Q104 54 112 60 Q104 66 92 64 Q90 62 90 60 Z" fill="url(#kwK)" stroke="#1a3a60" stroke-width="2"/>
      <path d="M93 61 L108 61.5" stroke="#1a5080" stroke-width="1.2"/>
    </g>
    <!-- reflets givré -->
    <g fill="none" stroke="#c0e8ff" stroke-width="1.5" opacity=".4" stroke-linecap="round">
      <path d="M48 50 Q54 46 60 50"/><path d="M42 62 Q48 58 54 62"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#80c8f0" stroke="#1060a0" stroke-width="1.2">
    <path d="M50 44 l4 -8 6 4 -4 8 z"/><path d="M70 38 l4 -8 6 4 -4 8 z"/><path d="M42 58 l3 -8 5 4 -3 7 z"/><path d="M78 42 l4 -7 5 4 -4 7 z"/>
  </g>
</svg>`,

/* ---- SCARAFEUILLE VERT ---- scarabée à carapace verte ---- */
scarafeuille: `<svg class="ms ms-scarafeuille" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="sfG" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#80d040"/><stop offset=".5" stop-color="#48a020"/><stop offset="1" stop-color="#1a5a08"/></radialGradient>
    <radialGradient id="sfH" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#6a5838"/><stop offset="1" stop-color="#3a2818"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="30" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g stroke="#1a2a08" stroke-width="1.5" fill="#3a5a18">
    <path d="M36 92 Q24 104 20 112 Q24 114 28 110 L38 96 Z"/><path d="M48 96 Q40 110 38 116 Q42 118 46 114 L52 100 Z"/>
    <path d="M76 96 Q84 110 86 116 Q82 118 78 114 L72 100 Z"/><path d="M88 92 Q100 104 104 112 Q100 114 96 110 L86 96 Z"/>
  </g>
  <g class="p-body">
    <!-- tête -->
    <ellipse cx="96" cy="74" rx="14" ry="12" fill="url(#sfH)" stroke="#1a0a00" stroke-width="2.2"/>
    <g class="p-antenna" stroke="#3a2818" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M96 64 Q102 48 108 42"/><path d="M90 66 Q84 50 78 44"/>
    </g>
    <g class="p-eye">
      <circle cx="92" cy="72" r="3.5" fill="#fff" stroke="#1a0a00" stroke-width="1.2"/><circle cx="93" cy="72.5" r="2" fill="#1a0a00"/><circle cx="94" cy="71" r=".9" fill="#fff"/>
      <circle cx="102" cy="72" r="3.5" fill="#fff" stroke="#1a0a00" stroke-width="1.2"/><circle cx="103" cy="72.5" r="2" fill="#1a0a00"/><circle cx="104" cy="71" r=".9" fill="#fff"/>
    </g>
    <g class="p-jaw" fill="#5a4028" stroke="#2a1808" stroke-width="1.2">
      <path d="M94 82 Q90 90 92 92 Q96 88 96 82 Z"/><path d="M100 82 Q104 90 102 92 Q98 88 98 82 Z"/>
    </g>
    <!-- carapace (élytres) -->
    <path class="p-torso" d="M32 68 Q28 48 40 38 Q52 30 66 32 Q80 34 88 44 Q92 54 88 68 Q86 84 80 94 Q70 104 56 104 Q42 104 34 94 Q28 84 32 68 Z" fill="url(#sfG)" stroke="#0a3a00" stroke-width="2.5"/>
    <!-- ligne médiane carapace -->
    <path d="M60 34 L58 100" stroke="#1a5a08" stroke-width="2" opacity=".6"/>
    <!-- reflets -->
    <path d="M42 46 Q52 40 62 42" stroke="#a0e060" stroke-width="2.5" fill="none" opacity=".4" stroke-linecap="round"/>
    <path d="M38 58 Q44 54 50 56" stroke="#a0e060" stroke-width="1.5" fill="none" opacity=".3" stroke-linecap="round"/>
    <!-- veinures de feuille sur carapace -->
    <g stroke="#2a7010" stroke-width="1" fill="none" opacity=".3">
      <path d="M42 50 Q48 60 44 72"/><path d="M72 48 Q76 58 74 70"/><path d="M50 40 Q54 56 50 74"/><path d="M66 38 Q68 54 66 72"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#60c030" stroke="#1a5a08" stroke-width="1.2">
    <path d="M44 42 q5 -7 10 0 q-5 5 -10 0 Z"/><path d="M66 38 q5 -7 10 0 q-5 5 -10 0 Z"/><path d="M36 58 q4 -6 8 0 q-4 5 -8 0 Z"/><path d="M76 54 q4 -6 8 0 q-4 5 -8 0 Z"/>
  </g>
</svg>`,

/* ---- CRAQUELEUR ---- golem de pierre ---- */
craqueleur: `<svg class="ms ms-craqueleur" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="cqR" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#a09888"/><stop offset=".6" stop-color="#787068"/><stop offset="1" stop-color="#484038"/></radialGradient>
    <linearGradient id="cqG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8020"/><stop offset="1" stop-color="#ff4000"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="34" ry="6" fill="#000" opacity=".35"/>
  <g class="p-hop">
  <g fill="#585048" stroke="#282018" stroke-width="2">
    <path d="M38 98 L32 116 Q38 120 46 116 L46 98 Z"/><path d="M80 98 L78 116 Q84 120 92 116 L88 98 Z"/>
  </g>
  <g class="p-body">
    <!-- corps massif (bloc de pierre) -->
    <path class="p-torso" d="M28 40 L24 90 Q26 102 44 104 L84 104 Q100 102 102 90 L98 40 Q96 28 80 24 L48 24 Q30 28 28 40 Z" fill="url(#cqR)" stroke="#282018" stroke-width="2.8"/>
    <!-- fissures lumineuses -->
    <g class="p-glow" stroke="url(#cqG)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9">
      <path d="M44 34 L40 52 L48 68 L42 82"/><path d="M76 32 L82 48 L76 64 L84 80"/>
      <path d="M54 28 L58 44 L52 56"/><path d="M68 30 L64 50 L70 62"/>
      <path d="M36 60 L50 64"/><path d="M74 58 L88 62"/>
    </g>
    <!-- texture pierre -->
    <g stroke="#585048" stroke-width="1.2" fill="none" opacity=".4">
      <path d="M34 44 L46 40"/><path d="M78 38 L94 42"/><path d="M30 72 L40 68"/><path d="M86 70 L98 74"/>
    </g>
    <!-- bras de pierre -->
    <g class="p-limb" fill="#686058" stroke="#282018" stroke-width="2.2">
      <path d="M24 50 Q8 48 4 56 Q2 64 8 68 Q14 70 22 66 L24 62 Z"/>
      <path d="M102 50 Q118 48 122 56 Q124 64 118 68 Q112 70 104 66 L102 62 Z"/>
    </g>
    <!-- yeux (fentes lumineuses) -->
    <g class="p-eye">
      <path d="M48 56 Q52 50 56 56 Q52 60 48 56 Z" fill="#ff8020" stroke="#aa4000" stroke-width="1.2"/>
      <path d="M70 56 Q74 50 78 56 Q74 60 70 56 Z" fill="#ff8020" stroke="#aa4000" stroke-width="1.2"/>
    </g>
    <!-- bouche (fissure) -->
    <path d="M50 74 L56 70 L62 76 L68 70 L76 74" stroke="#ff6010" stroke-width="2" fill="none"/>
  </g>
  </g>
  <g class="p-feathers" fill="#908878" stroke="#484038" stroke-width="1.4">
    <path d="M46 40 l6 -6 4 8 -8 2 z"/><path d="M72 36 l6 -6 4 8 -8 2 z"/><path d="M34 58 l5 -6 4 7 -7 2 z"/><path d="M88 54 l5 -5 3 7 -6 1 z"/>
  </g>
</svg>`,

/* ---- BWORK ---- gobelin vert avec massue ---- */
bwork: `<svg class="ms ms-bwork" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bwG" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#70c050"/><stop offset=".6" stop-color="#408828"/><stop offset="1" stop-color="#1a4a08"/></radialGradient>
    <radialGradient id="bwV" cx="50%" cy="30%" r="60%"><stop offset="0" stop-color="#a0e070"/><stop offset="1" stop-color="#60a038"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="24" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#408828" stroke="#1a3008" stroke-width="1.8">
    <path d="M52 100 L48 116 Q52 118 56 116 L56 100 Z"/>
    <path d="M72 100 L70 116 Q74 118 78 116 L76 100 Z"/>
    <ellipse cx="52" cy="117" rx="5" ry="3"/><ellipse cx="74" cy="117" rx="5" ry="3"/>
  </g>
  <g class="p-body">
    <!-- corps -->
    <ellipse class="p-torso" cx="64" cy="76" rx="22" ry="26" fill="url(#bwG)" stroke="#1a3008" stroke-width="2.4"/>
    <ellipse cx="66" cy="84" rx="14" ry="14" fill="url(#bwV)" opacity=".4"/>
    <!-- massue (bras droit) -->
    <g class="p-limb">
      <path d="M86 62 Q96 56 104 50 Q108 46 106 42 Q102 38 98 42 Q94 46 88 54 L84 58 Z" fill="#8a6838" stroke="#4a3018" stroke-width="2"/>
      <ellipse cx="106" cy="40" rx="8" ry="6" fill="#6a5028" stroke="#4a3018" stroke-width="2" transform="rotate(-30 106 40)"/>
      <!-- clous -->
      <circle cx="102" cy="36" r="2" fill="#a0a0a0" stroke="#606060" stroke-width=".8"/>
      <circle cx="110" cy="38" r="2" fill="#a0a0a0" stroke="#606060" stroke-width=".8"/>
    </g>
    <!-- bras gauche -->
    <path d="M42 64 Q30 60 24 66 Q28 72 36 70 Z" fill="url(#bwG)" stroke="#1a3008" stroke-width="2"/>
    <!-- tête -->
    <ellipse cx="66" cy="44" rx="20" ry="18" fill="url(#bwG)" stroke="#1a3008" stroke-width="2.4"/>
    <!-- oreilles pointues (grandes) -->
    <g fill="#50a030" stroke="#1a3008" stroke-width="1.8">
      <path d="M48 40 Q28 28 22 34 Q28 42 44 44 Z"/>
      <path d="M84 38 Q104 26 110 32 Q104 40 88 42 Z"/>
    </g>
    <path d="M36 36 Q30 34 26 36" stroke="#80d060" stroke-width="1.2" fill="none" opacity=".5"/>
    <path d="M96 34 Q102 32 106 34" stroke="#80d060" stroke-width="1.2" fill="none" opacity=".5"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="58" cy="42" rx="5.5" ry="6" fill="#fff8d0" stroke="#1a3008" stroke-width="1.5"/>
      <circle cx="59.5" cy="43" r="3" fill="#8a2000"/><circle cx="60.5" cy="41.5" r="1.3" fill="#fff"/>
      <ellipse cx="76" cy="42" rx="5.5" ry="6" fill="#fff8d0" stroke="#1a3008" stroke-width="1.5"/>
      <circle cx="77.5" cy="43" r="3" fill="#8a2000"/><circle cx="78.5" cy="41.5" r="1.3" fill="#fff"/>
    </g>
    <!-- nez (gros, rond) -->
    <ellipse cx="68" cy="50" rx="5" ry="4" fill="#60a038" stroke="#2a5018" stroke-width="1.5"/>
    <!-- bouche avec crocs -->
    <g class="p-jaw">
      <path d="M56 58 Q64 64 76 58" stroke="#1a3008" stroke-width="1.5" fill="none"/>
      <path d="M60 58 L58 64 L62 60 Z" fill="#f0e8d0" stroke="#8a7a58" stroke-width=".8"/>
      <path d="M72 58 L74 64 L70 60 Z" fill="#f0e8d0" stroke="#8a7a58" stroke-width=".8"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#60a038" stroke="#1a4a08" stroke-width="1.2">
    <ellipse cx="50" cy="36" rx="4" ry="3"/><ellipse cx="78" cy="34" rx="4" ry="3"/><ellipse cx="42" cy="52" rx="4" ry="3"/><ellipse cx="84" cy="50" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- KOALAK IMMATURE ---- petit ours-koala ---- */
koalak: `<svg class="ms ms-koalak" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="klB" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#a0a0aa"/><stop offset=".6" stop-color="#707078"/><stop offset="1" stop-color="#404048"/></radialGradient>
    <radialGradient id="klV" cx="50%" cy="30%" r="60%"><stop offset="0" stop-color="#e0ddd8"/><stop offset="1" stop-color="#b0a8a0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#585060" stroke="#282028" stroke-width="1.8">
    <path d="M50 102 L46 116 Q50 118 54 116 L54 102 Z"/>
    <path d="M74 102 L72 116 Q76 118 80 116 L78 102 Z"/>
  </g>
  <g class="p-body">
    <!-- corps rond -->
    <ellipse class="p-torso" cx="64" cy="76" rx="28" ry="28" fill="url(#klB)" stroke="#282028" stroke-width="2.4"/>
    <ellipse cx="66" cy="84" rx="18" ry="16" fill="url(#klV)" opacity=".5"/>
    <!-- bras -->
    <g fill="#606068" stroke="#282028" stroke-width="2">
      <path d="M36 68 Q22 64 18 72 Q20 80 30 78 L38 74 Z"/>
      <path d="M92 68 Q106 64 110 72 Q108 80 98 78 L90 74 Z"/>
    </g>
    <!-- griffes -->
    <g stroke="#1a1018" stroke-width="1.2" fill="none">
      <path d="M16 72 L12 70 M18 74 L14 74 M18 76 L14 78"/>
      <path d="M112 72 L116 70 M110 74 L114 74 M110 76 L114 78"/>
    </g>
    <!-- tête -->
    <ellipse cx="66" cy="42" rx="22" ry="20" fill="url(#klB)" stroke="#282028" stroke-width="2.4"/>
    <!-- oreilles (grandes et rondes) -->
    <circle cx="44" cy="26" r="12" fill="#585060" stroke="#282028" stroke-width="2"/>
    <circle cx="44" cy="26" r="7" fill="#c0a8b0"/>
    <circle cx="88" cy="26" r="12" fill="#585060" stroke="#282028" stroke-width="2"/>
    <circle cx="88" cy="26" r="7" fill="#c0a8b0"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="58" cy="40" rx="5.5" ry="6" fill="#fff" stroke="#282028" stroke-width="1.5"/>
      <circle cx="59" cy="41" r="3.2" fill="#1a0a00"/><circle cx="60.5" cy="39" r="1.4" fill="#fff"/>
      <ellipse cx="76" cy="40" rx="5.5" ry="6" fill="#fff" stroke="#282028" stroke-width="1.5"/>
      <circle cx="77" cy="41" r="3.2" fill="#1a0a00"/><circle cx="78.5" cy="39" r="1.4" fill="#fff"/>
    </g>
    <!-- nez -->
    <ellipse cx="67" cy="48" rx="5" ry="3.5" fill="#2a1a1a" stroke="#1a0808" stroke-width="1"/>
    <!-- bouche -->
    <path d="M62 53 Q67 56 72 53" stroke="#2a1a1a" stroke-width="1.5" fill="none"/>
  </g>
  </g>
  <g class="p-feathers" fill="#9090a0" stroke="#404048" stroke-width="1.2">
    <ellipse cx="48" cy="34" rx="5" ry="3"/><ellipse cx="80" cy="32" rx="5" ry="3"/><ellipse cx="40" cy="56" rx="4" ry="3"/><ellipse cx="88" cy="54" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- KANIGROU ---- kangourou boxer ---- */
kanigrou: `<svg class="ms ms-kanigrou" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="kgB" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#c8a060"/><stop offset=".6" stop-color="#a07838"/><stop offset="1" stop-color="#6a4820"/></radialGradient>
    <radialGradient id="kgV" cx="50%" cy="25%" r="60%"><stop offset="0" stop-color="#f0dcc0"/><stop offset="1" stop-color="#d0b890"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="30" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <!-- queue épaisse -->
  <g class="p-tail">
    <path d="M30 90 Q10 100 6 110 Q4 116 10 118 Q16 116 18 108 Q22 96 34 88 Z" fill="#a07838" stroke="#5a3818" stroke-width="2.2"/>
  </g>
  <!-- grosses pattes arrière -->
  <g fill="#8a6830" stroke="#4a2810" stroke-width="2">
    <path d="M44 100 L36 114 Q32 118 40 118 L54 118 Q58 116 54 112 L50 100 Z"/>
    <path d="M70 100 L66 114 Q62 118 70 118 L84 118 Q88 116 84 112 L78 100 Z"/>
  </g>
  <g class="p-body">
    <!-- corps -->
    <ellipse class="p-torso" cx="62" cy="72" rx="24" ry="30" fill="url(#kgB)" stroke="#4a2810" stroke-width="2.4"/>
    <ellipse cx="64" cy="82" rx="15" ry="14" fill="url(#kgV)" opacity=".5"/>
    <!-- petits bras (position de boxe) -->
    <g class="p-limb" fill="#a07838" stroke="#4a2810" stroke-width="2">
      <path d="M42 56 Q32 48 28 52 Q26 58 32 60 L40 58 Z"/>
      <path d="M82 54 Q92 46 96 50 Q98 56 92 58 L84 56 Z"/>
      <circle cx="28" cy="54" r="5" fill="#c8a060" stroke="#6a4820" stroke-width="1.5"/>
      <circle cx="96" cy="52" r="5" fill="#c8a060" stroke="#6a4820" stroke-width="1.5"/>
    </g>
    <!-- tête -->
    <ellipse cx="68" cy="36" rx="18" ry="16" fill="url(#kgB)" stroke="#4a2810" stroke-width="2.2"/>
    <!-- oreilles longues -->
    <g fill="#b08848" stroke="#4a2810" stroke-width="1.8">
      <path d="M58 24 Q54 4 58 0 Q64 4 62 22 Z"/>
      <path d="M76 22 Q80 2 84 0 Q88 6 82 22 Z"/>
    </g>
    <path d="M59 18 Q58 8 59 4" stroke="#e0c080" stroke-width="1" fill="none" opacity=".4"/>
    <path d="M79 16 Q81 6 82 4" stroke="#e0c080" stroke-width="1" fill="none" opacity=".4"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="62" cy="34" rx="5" ry="5.5" fill="#fff" stroke="#4a2810" stroke-width="1.5"/>
      <circle cx="63" cy="35" r="2.8" fill="#2a1800"/><circle cx="64.5" cy="33" r="1.2" fill="#fff"/>
      <ellipse cx="76" cy="34" rx="5" ry="5.5" fill="#fff" stroke="#4a2810" stroke-width="1.5"/>
      <circle cx="77" cy="35" r="2.8" fill="#2a1800"/><circle cx="78.5" cy="33" r="1.2" fill="#fff"/>
    </g>
    <!-- museau -->
    <ellipse cx="70" cy="44" rx="7" ry="4.5" fill="#d0b090" stroke="#6a4820" stroke-width="1.2"/>
    <ellipse cx="70" cy="43" rx="2.5" ry="2" fill="#4a2810"/>
  </g>
  </g>
  <g class="p-feathers" fill="#c8a060" stroke="#6a4820" stroke-width="1.2">
    <ellipse cx="48" cy="40" rx="4" ry="3"/><ellipse cx="82" cy="36" rx="4" ry="3"/><ellipse cx="38" cy="60" rx="4" ry="3"/><ellipse cx="86" cy="56" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- MUFAFAH ---- loup sauvage ---- */
mufafah: `<svg class="ms ms-mufafah" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="mfB" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#707888"/><stop offset=".6" stop-color="#485060"/><stop offset="1" stop-color="#202830"/></radialGradient>
    <radialGradient id="mfV" cx="50%" cy="25%" r="60%"><stop offset="0" stop-color="#c0c4cc"/><stop offset="1" stop-color="#808890"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="34" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <!-- queue touffue -->
  <g class="p-tail">
    <path d="M20 74 Q4 68 0 58 Q-2 50 6 48 Q14 50 16 58 Q18 64 24 70 Z" fill="#485060" stroke="#1a2028" stroke-width="2"/>
    <path d="M10 54 Q12 60 16 64" stroke="#808890" stroke-width="1.5" fill="none" opacity=".4"/>
  </g>
  <g fill="#3a4050" stroke="#1a1820" stroke-width="1.8">
    <rect x="30" y="102" width="10" height="16" rx="3"/><rect x="46" y="104" width="9" height="14" rx="3"/>
    <rect x="72" y="104" width="9" height="14" rx="3"/><rect x="88" y="102" width="10" height="16" rx="3"/>
    <ellipse cx="35" cy="118" rx="6" ry="3"/><ellipse cx="50.5" cy="118" rx="5.5" ry="3"/><ellipse cx="76.5" cy="118" rx="5.5" ry="3"/><ellipse cx="93" cy="118" rx="6" ry="3"/>
  </g>
  <g class="p-body">
    <!-- corps -->
    <ellipse class="p-torso" cx="58" cy="76" rx="36" ry="26" fill="url(#mfB)" stroke="#1a2028" stroke-width="2.5"/>
    <ellipse cx="60" cy="86" rx="20" ry="10" fill="url(#mfV)" opacity=".3"/>
    <!-- tête de loup -->
    <path d="M86 58 Q96 44 112 44 Q120 48 120 58 Q120 68 112 74 Q100 80 86 74 Z" fill="url(#mfB)" stroke="#1a2028" stroke-width="2.4"/>
    <!-- oreilles pointues -->
    <g fill="#3a4050" stroke="#1a2028" stroke-width="1.8">
      <path d="M96 48 Q90 28 96 22 Q102 28 100 46 Z"/>
      <path d="M110 44 Q114 24 120 20 Q124 28 116 44 Z"/>
    </g>
    <path d="M97 38 Q95 30 96 26" stroke="#808890" stroke-width="1" fill="none" opacity=".4"/>
    <path d="M113 36 Q115 28 118 24" stroke="#808890" stroke-width="1" fill="none" opacity=".4"/>
    <!-- yeux (jaunes, perçants) -->
    <g class="p-eye">
      <ellipse cx="98" cy="56" rx="5" ry="4.5" fill="#f0e040" stroke="#1a2028" stroke-width="1.5"/>
      <ellipse cx="99" cy="56.5" rx="2.5" ry="3" fill="#1a1000"/><circle cx="100" cy="55" r="1" fill="#fff"/>
      <ellipse cx="112" cy="56" rx="5" ry="4.5" fill="#f0e040" stroke="#1a2028" stroke-width="1.5"/>
      <ellipse cx="113" cy="56.5" rx="2.5" ry="3" fill="#1a1000"/><circle cx="114" cy="55" r="1" fill="#fff"/>
    </g>
    <!-- sourcils -->
    <path d="M94 52 L100 53" stroke="#1a2028" stroke-width="2" stroke-linecap="round"/>
    <path d="M116 52 L110 53" stroke="#1a2028" stroke-width="2" stroke-linecap="round"/>
    <!-- museau -->
    <path d="M114 62 Q122 58 126 64 Q122 70 114 68 Z" fill="#485060" stroke="#1a2028" stroke-width="1.8"/>
    <ellipse cx="124" cy="63.5" rx="3" ry="2.5" fill="#1a1018"/>
    <!-- gueule ouverte -->
    <g class="p-jaw">
      <path d="M108 70 Q116 78 124 70" stroke="#1a2028" stroke-width="1.5" fill="none"/>
      <path d="M112 70 L111 76 L114 72 Z" fill="#f0e8d8"/><path d="M118 70 L119 76 L116 72 Z" fill="#f0e8d8"/>
      <path d="M114 70 L114 74 Z" fill="#f0e8d8" stroke="#f0e8d8" stroke-width="1"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#606878" stroke="#1a2028" stroke-width="1.2">
    <ellipse cx="48" cy="58" rx="4" ry="3"/><ellipse cx="74" cy="52" rx="4" ry="3"/><ellipse cx="40" cy="72" rx="4" ry="3"/><ellipse cx="82" cy="48" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- CHAFER ---- squelette guerrier ---- */
chafer: `<svg class="ms ms-chafer" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="chB" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#e8e0d0"/><stop offset=".6" stop-color="#c8b8a0"/><stop offset="1" stop-color="#8a7a60"/></radialGradient>
    <linearGradient id="chS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0a0b0"/><stop offset="1" stop-color="#505060"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="22" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <!-- jambes-os -->
  <g stroke="#6a5a40" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M52 96 L48 106 L52 116"/><path d="M76 96 L80 106 L76 116"/>
  </g>
  <g fill="#c8b8a0" stroke="#6a5a40" stroke-width="1.5">
    <circle cx="48" cy="106" r="3"/><circle cx="80" cy="106" r="3"/>
    <ellipse cx="52" cy="117" rx="5" ry="3"/><ellipse cx="76" cy="117" rx="5" ry="3"/>
  </g>
  <g class="p-body">
    <!-- cage thoracique -->
    <path class="p-torso" d="M46 56 Q44 70 44 82 Q44 96 64 98 Q84 96 84 82 Q84 70 82 56 Q80 48 64 46 Q48 48 46 56 Z" fill="url(#chB)" stroke="#6a5a40" stroke-width="2.2"/>
    <!-- côtes -->
    <g stroke="#8a7a60" stroke-width="2" fill="none" opacity=".5">
      <path d="M50 60 Q58 56 64 58 Q70 56 78 60"/><path d="M48 68 Q56 64 64 66 Q72 64 80 68"/>
      <path d="M48 76 Q56 72 64 74 Q72 72 80 76"/><path d="M50 84 Q58 80 64 82 Q70 80 78 84"/>
    </g>
    <!-- épée -->
    <g class="p-limb">
      <path d="M86 50 L92 46 L116 12 L118 14 L96 48 L92 52 Z" fill="url(#chS)" stroke="#3a3a48" stroke-width="1.5"/>
      <path d="M86 50 L96 44 L96 52 L86 56 Z" fill="#8a7a60" stroke="#5a4a30" stroke-width="1.5"/>
      <!-- bras droit (os) -->
      <path d="M82 56 Q90 50 88 48" stroke="#c8b8a0" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <!-- bras gauche (os) -->
    <path d="M46 56 Q36 50 30 56 Q34 62 42 60" stroke="#c8b8a0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="56" r="3" fill="#c8b8a0" stroke="#6a5a40" stroke-width="1"/>
    <!-- crâne -->
    <path d="M48 28 Q48 12 64 10 Q80 12 80 28 Q80 42 64 46 Q48 42 48 28 Z" fill="url(#chB)" stroke="#6a5a40" stroke-width="2.4"/>
    <!-- orbites -->
    <g class="p-eye">
      <ellipse cx="56" cy="28" rx="5" ry="6" fill="#2a1a0a"/>
      <circle cx="56" cy="28" r="2.5" fill="#80ff80" opacity=".8"/><circle cx="57" cy="27" r="1" fill="#fff"/>
      <ellipse cx="72" cy="28" rx="5" ry="6" fill="#2a1a0a"/>
      <circle cx="72" cy="28" r="2.5" fill="#80ff80" opacity=".8"/><circle cx="73" cy="27" r="1" fill="#fff"/>
    </g>
    <!-- nez (trou) -->
    <path d="M62 34 L64 38 L66 34 Z" fill="#4a3a28"/>
    <!-- mâchoire -->
    <g class="p-jaw">
      <path d="M52 40 Q58 44 64 42 Q70 44 76 40 L76 44 Q70 48 64 46 Q58 48 52 44 Z" fill="#c8b8a0" stroke="#6a5a40" stroke-width="1.5"/>
      <path d="M56 42 L56 46 M60 43 L60 47 M68 43 L68 47 M72 42 L72 46" stroke="#8a7a60" stroke-width="1"/>
    </g>
    <!-- lambeaux d'étoffe -->
    <path d="M46 46 Q38 44 34 48 Q36 54 42 52 Z" fill="#4a3858" stroke="#2a1838" stroke-width="1.2" opacity=".7"/>
    <path d="M82 46 Q90 44 94 48 Q92 54 86 52 Z" fill="#4a3858" stroke="#2a1838" stroke-width="1.2" opacity=".7"/>
  </g>
  </g>
  <g class="p-feathers" fill="#c8b8a0" stroke="#6a5a40" stroke-width="1.2">
    <path d="M52 24 l4 -8 4 6 z"/><path d="M68 22 l4 -8 4 6 z"/><path d="M44 40 l3 -6 4 5 z"/><path d="M78 38 l4 -6 3 5 z"/>
  </g>
</svg>`,

/* ---- GELÉE BLEUE ---- blob translucide ---- */
gelee: `<svg class="ms ms-gelee" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="glB" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#80c8ff" stop-opacity=".8"/><stop offset=".5" stop-color="#3090e0" stop-opacity=".7"/><stop offset="1" stop-color="#1050a0" stop-opacity=".9"/></radialGradient>
    <radialGradient id="glH" cx="35%" cy="25%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#80c8ff" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="32" ry="5" fill="#1050a0" opacity=".35"/>
  <g class="p-hop">
  <g class="p-body">
    <!-- corps blob -->
    <path class="p-torso" d="M24 110 Q20 80 28 58 Q34 40 50 32 Q64 26 78 32 Q94 40 100 58 Q108 80 104 110 Q96 116 80 118 Q64 120 48 118 Q32 116 24 110 Z" fill="url(#glB)" stroke="#1050a0" stroke-width="2"/>
    <!-- reflet principal -->
    <ellipse cx="48" cy="52" rx="18" ry="14" fill="url(#glH)"/>
    <!-- reflets secondaires -->
    <ellipse cx="78" cy="60" rx="8" ry="6" fill="#fff" opacity=".15"/>
    <path d="M42 44 Q48 38 56 42" stroke="#fff" stroke-width="2" fill="none" opacity=".3" stroke-linecap="round"/>
    <!-- bulles internes -->
    <circle cx="50" cy="80" r="4" fill="#fff" opacity=".15" stroke="#80c8ff" stroke-width=".5"/>
    <circle cx="72" cy="74" r="3" fill="#fff" opacity=".12" stroke="#80c8ff" stroke-width=".5"/>
    <circle cx="60" cy="94" r="5" fill="#fff" opacity=".1" stroke="#80c8ff" stroke-width=".5"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="52" cy="64" rx="7" ry="8" fill="#fff" opacity=".8" stroke="#1050a0" stroke-width="1.5"/>
      <circle cx="53" cy="65" r="4" fill="#0a2050"/><circle cx="55" cy="63" r="1.8" fill="#fff"/>
      <ellipse cx="76" cy="64" rx="7" ry="8" fill="#fff" opacity=".8" stroke="#1050a0" stroke-width="1.5"/>
      <circle cx="77" cy="65" r="4" fill="#0a2050"/><circle cx="79" cy="63" r="1.8" fill="#fff"/>
    </g>
    <!-- bouche -->
    <path d="M58 80 Q64 86 70 80" stroke="#0a2050" stroke-width="1.8" fill="none" opacity=".6"/>
    <!-- bord ondulé en bas -->
    <path d="M24 110 Q32 106 40 110 Q48 114 56 110 Q64 106 72 110 Q80 114 88 110 Q96 106 104 110" stroke="#1050a0" stroke-width="1.5" fill="none" opacity=".4"/>
  </g>
  </g>
  <g class="p-feathers" fill="#60b0f0" stroke="#1050a0" stroke-width="1" opacity=".8">
    <ellipse cx="44" cy="50" rx="5" ry="4"/><ellipse cx="76" cy="46" rx="4" ry="4"/><ellipse cx="36" cy="68" rx="5" ry="3"/><ellipse cx="86" cy="64" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- FANTÔME PANDORE ---- spectre flottant ---- */
fantome: `<svg class="ms ms-fantome" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="ftG" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#e8e8ff" stop-opacity=".8"/><stop offset=".5" stop-color="#b0b0d8" stop-opacity=".6"/><stop offset="1" stop-color="#6060a0" stop-opacity=".4"/></radialGradient>
    <linearGradient id="ftF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c0c0e0" stop-opacity=".5"/><stop offset="1" stop-color="#6060a0" stop-opacity="0"/></linearGradient>
  </defs>
  <g class="p-hop">
  <g class="p-body">
    <!-- corps spectral -->
    <path class="p-torso" d="M38 30 Q38 10 64 8 Q90 10 90 30 Q92 50 90 70 Q88 90 82 100 Q78 108 72 100 Q68 92 64 100 Q60 108 56 100 Q52 92 46 100 Q40 108 38 98 Q36 88 36 70 Q34 50 38 30 Z" fill="url(#ftG)" stroke="#8080b0" stroke-width="1.5"/>
    <!-- intérieur lumineux -->
    <ellipse cx="64" cy="40" rx="20" ry="22" fill="#fff" opacity=".15"/>
    <path d="M50 20 Q60 14 74 20" stroke="#fff" stroke-width="2" fill="none" opacity=".3" stroke-linecap="round"/>
    <!-- orbites (yeux creux) -->
    <g class="p-eye">
      <ellipse cx="52" cy="38" rx="8" ry="10" fill="#1a1030" stroke="#4040a0" stroke-width="1.5"/>
      <circle cx="52" cy="38" r="3.5" fill="#a080ff" opacity=".8"/><circle cx="53.5" cy="36" r="1.5" fill="#fff"/>
      <ellipse cx="76" cy="38" rx="8" ry="10" fill="#1a1030" stroke="#4040a0" stroke-width="1.5"/>
      <circle cx="76" cy="38" r="3.5" fill="#a080ff" opacity=".8"/><circle cx="77.5" cy="36" r="1.5" fill="#fff"/>
    </g>
    <!-- bouche béante -->
    <ellipse cx="64" cy="58" rx="10" ry="8" fill="#1a1030" stroke="#4040a0" stroke-width="1.5"/>
    <path d="M58 56 Q64 50 70 56" stroke="#c0c0e0" stroke-width="1" fill="none" opacity=".4"/>
    <!-- bras fantomatiques -->
    <g fill="url(#ftF)" stroke="#8080b0" stroke-width="1.2" opacity=".7">
      <path d="M38 44 Q22 38 16 44 Q14 52 20 56 Q28 54 36 50 Z"/>
      <path d="M90 44 Q106 38 112 44 Q114 52 108 56 Q100 54 92 50 Z"/>
    </g>
    <!-- particules d'âme -->
    <g class="p-glow" fill="#c0c0ff" opacity=".5">
      <circle cx="30" cy="48" r="2"/><circle cx="98" cy="46" r="2"/>
      <circle cx="44" cy="22" r="1.5"/><circle cx="84" cy="20" r="1.5"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#b0b0e0" stroke="#6060a0" stroke-width="1" opacity=".7">
    <path d="M48 28 q5 -8 8 0 q-6 6 -8 0 Z"/><path d="M72 26 q5 -8 8 0 q-6 6 -8 0 Z"/><path d="M38 50 q4 -7 7 0 q-5 5 -7 0 Z"/><path d="M86 48 q4 -7 7 0 q-5 5 -7 0 Z"/>
  </g>
</svg>`,

/* ---- CHAFER LANCIER ---- squelette avec lance et casque ---- */
chafer_lancier: `<svg class="ms ms-chafer_lancier" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="clB" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#e0d8c8"/><stop offset=".6" stop-color="#b8a888"/><stop offset="1" stop-color="#7a6a50"/></radialGradient>
    <linearGradient id="clA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8898"/><stop offset="1" stop-color="#4a4858"/></linearGradient>
    <linearGradient id="clS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a0a0b0"/><stop offset="1" stop-color="#505060"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="22" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g stroke="#5a4a30" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M52 96 L48 106 L52 116"/><path d="M76 96 L80 106 L76 116"/>
  </g>
  <g fill="#b8a888" stroke="#5a4a30" stroke-width="1.5">
    <circle cx="48" cy="106" r="3"/><circle cx="80" cy="106" r="3"/>
    <ellipse cx="52" cy="117" rx="5" ry="3"/><ellipse cx="76" cy="117" rx="5" ry="3"/>
  </g>
  <g class="p-body">
    <!-- armure torso -->
    <path class="p-torso" d="M46 54 Q44 68 44 80 Q44 96 64 98 Q84 96 84 80 Q84 68 82 54 Q80 46 64 44 Q48 46 46 54 Z" fill="url(#clA)" stroke="#3a3848" stroke-width="2.2"/>
    <g stroke="#6a6878" stroke-width="1.5" fill="none" opacity=".4">
      <path d="M50 58 Q64 54 78 58"/><path d="M48 66 Q64 62 80 66"/><path d="M48 74 Q64 70 80 74"/>
    </g>
    <!-- lance -->
    <g class="p-limb">
      <path d="M90 52 L94 48 L106 6 L108 6 L98 48 L96 54 Z" fill="url(#clS)" stroke="#3a3a48" stroke-width="1.2"/>
      <path d="M104 10 L106 2 L108 10 Z" fill="#c0c8d8" stroke="#5a5a68" stroke-width="1"/>
      <path d="M82 54 Q92 48 90 44" stroke="#b8a888" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <!-- bras gauche + bouclier -->
    <path d="M46 54 Q36 48 30 54 Q34 60 42 58" stroke="#b8a888" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="28" cy="58" rx="10" ry="12" fill="url(#clA)" stroke="#3a3848" stroke-width="1.8"/>
    <path d="M24 52 L28 58 L32 52 M24 64 L28 58 L32 64" stroke="#5a5868" stroke-width="1.2" fill="none"/>
    <!-- crâne -->
    <path d="M48 26 Q48 10 64 8 Q80 10 80 26 Q80 40 64 44 Q48 40 48 26 Z" fill="url(#clB)" stroke="#5a4a30" stroke-width="2.2"/>
    <!-- casque -->
    <path d="M46 24 Q46 8 64 4 Q82 8 82 24 L80 28 Q64 22 48 28 Z" fill="url(#clA)" stroke="#3a3848" stroke-width="2"/>
    <path d="M64 4 L64 -2 L68 4" fill="#8a3030" stroke="#5a1818" stroke-width="1.2"/>
    <!-- orbites -->
    <g class="p-eye">
      <ellipse cx="56" cy="26" rx="5" ry="6" fill="#1a0a0a"/>
      <circle cx="56" cy="26" r="2.5" fill="#ff4040" opacity=".8"/><circle cx="57" cy="25" r="1" fill="#fff"/>
      <ellipse cx="72" cy="26" rx="5" ry="6" fill="#1a0a0a"/>
      <circle cx="72" cy="26" r="2.5" fill="#ff4040" opacity=".8"/><circle cx="73" cy="25" r="1" fill="#fff"/>
    </g>
    <path d="M62 32 L64 36 L66 32 Z" fill="#4a3a28"/>
    <g class="p-jaw">
      <path d="M52 38 Q58 42 64 40 Q70 42 76 38 L76 42 Q70 46 64 44 Q58 46 52 42 Z" fill="#b8a888" stroke="#5a4a30" stroke-width="1.2"/>
    </g>
  </g>
  </g>
  <g class="p-feathers" fill="#b8a888" stroke="#5a4a30" stroke-width="1.2">
    <path d="M50 22 l4 -8 4 6 z"/><path d="M68 20 l4 -8 4 6 z"/><path d="M42 38 l3 -6 4 5 z"/><path d="M78 36 l4 -6 3 5 z"/>
  </g>
</svg>`,

/* ---- BOUFTOU CHEF ---- gros bouftou guerrier ---- */
bouftou_chef: `<svg class="ms ms-bouftou_chef" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bcW" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#fff0d8"/><stop offset=".5" stop-color="#e0d0b0"/><stop offset="1" stop-color="#b09870"/></radialGradient>
    <radialGradient id="bcF" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#a06848"/><stop offset="1" stop-color="#5a3020"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="34" ry="6" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g fill="#6a4428" stroke="#3a2010" stroke-width="2">
    <rect x="36" y="100" width="12" height="18" rx="4"/><rect x="54" y="102" width="10" height="16" rx="4"/>
    <rect x="72" y="102" width="10" height="16" rx="4"/><rect x="88" y="100" width="12" height="18" rx="4"/>
  </g>
  <g class="p-body">
    <path class="p-torso" d="M64 26 Q80 20 94 28 Q108 24 114 36 Q122 46 118 58 Q124 68 118 78 Q122 90 114 98 Q104 108 90 104 Q80 110 64 108 Q48 110 38 104 Q24 108 14 98 Q6 90 10 78 Q4 68 10 58 Q6 46 14 36 Q20 24 34 28 Q48 20 64 26 Z" fill="url(#bcW)" stroke="#7a6a48" stroke-width="2.4"/>
    <g fill="none" stroke="#b09870" stroke-width="1.6" stroke-linecap="round" opacity=".4">
      <path d="M32 50 q5 -6 10 0 q5 -6 10 0"/><path d="M66 42 q5 -6 10 0 q5 -6 10 0"/>
      <path d="M28 70 q5 -6 10 0"/><path d="M76 66 q5 -6 10 0"/>
    </g>
    <!-- peintures de guerre -->
    <g stroke="#c83030" stroke-width="2.5" fill="none" opacity=".7" stroke-linecap="round">
      <path d="M30 56 L38 48 L34 62"/><path d="M90 54 L98 46 L94 60"/>
      <path d="M40 78 L48 72"/><path d="M80 76 L88 70"/>
    </g>
    <ellipse cx="100" cy="60" rx="22" ry="24" fill="url(#bcF)" stroke="#3a2010" stroke-width="2.4"/>
    <!-- grosses cornes -->
    <g stroke="#5a4020" stroke-width="2.5" fill="#c8b080">
      <path d="M92 38 Q78 18 66 22 Q72 32 84 38"/>
      <path d="M106 36 Q118 14 126 20 Q122 32 112 38"/>
    </g>
    <g class="p-eye">
      <ellipse cx="94" cy="56" rx="5" ry="6" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="95" cy="57" r="3" fill="#8a1000"/><circle cx="96.5" cy="55" r="1.3" fill="#fff"/>
      <ellipse cx="108" cy="56" rx="5" ry="6" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="109" cy="57" r="3" fill="#8a1000"/><circle cx="110.5" cy="55" r="1.3" fill="#fff"/>
    </g>
    <!-- sourcils rageurs -->
    <path d="M90 50 L96 52" stroke="#3a2010" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M112 50 L106 52" stroke="#3a2010" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="102" cy="70" rx="8" ry="5.5" fill="#c08860" stroke="#5a3020" stroke-width="1.5"/>
    <ellipse cx="100" cy="69" rx="2" ry="1.5" fill="#5a3020"/><ellipse cx="104" cy="69" rx="2" ry="1.5" fill="#5a3020"/>
  </g>
  </g>
  <g class="p-feathers" fill="#e8d8b0" stroke="#7a6a48" stroke-width="1.2">
    <ellipse cx="48" cy="42" rx="6" ry="4"/><ellipse cx="78" cy="38" rx="5" ry="4"/><ellipse cx="38" cy="64" rx="6" ry="4"/><ellipse cx="88" cy="60" rx="5" ry="4"/>
  </g>
</svg>`,

/* ---- BOUFTOU ROYAL ---- mouton doré couronné ---- */
bouftou_royal: `<svg class="ms ms-bouftou_royal" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="brW" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#fff8e0"/><stop offset=".4" stop-color="#f0d880"/><stop offset=".8" stop-color="#c8a040"/><stop offset="1" stop-color="#a08030"/></radialGradient>
    <radialGradient id="brF" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#c08050"/><stop offset="1" stop-color="#6a3820"/></radialGradient>
    <linearGradient id="brC" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c8a020"/><stop offset=".5" stop-color="#f0d040"/><stop offset="1" stop-color="#ffe870"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="36" ry="6" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g fill="#7a4828" stroke="#3a2010" stroke-width="2">
    <rect x="34" y="100" width="12" height="18" rx="4"/><rect x="52" y="102" width="10" height="16" rx="4"/>
    <rect x="72" y="102" width="10" height="16" rx="4"/><rect x="90" y="100" width="12" height="18" rx="4"/>
  </g>
  <g class="p-body">
    <path class="p-torso" d="M64 24 Q82 18 96 26 Q110 22 116 34 Q124 44 120 56 Q126 66 120 76 Q124 88 116 96 Q106 106 92 102 Q82 108 64 106 Q46 108 36 102 Q22 106 12 96 Q4 88 8 76 Q2 66 8 56 Q4 44 12 34 Q18 22 32 26 Q46 18 64 24 Z" fill="url(#brW)" stroke="#a08030" stroke-width="2.4"/>
    <g fill="none" stroke="#c8a840" stroke-width="1.6" opacity=".3">
      <path d="M30 48 q5 -6 10 0 q5 -6 10 0"/><path d="M68 40 q5 -6 10 0 q5 -6 10 0"/>
      <path d="M26 68 q5 -6 10 0"/><path d="M78 64 q5 -6 10 0"/>
    </g>
    <ellipse cx="102" cy="60" rx="22" ry="24" fill="url(#brF)" stroke="#3a2010" stroke-width="2.4"/>
    <!-- couronne -->
    <g fill="url(#brC)" stroke="#a08020" stroke-width="1.8">
      <path d="M86 28 L82 8 L90 18 L98 4 L106 18 L114 8 L110 28 Z"/>
    </g>
    <!-- gemmes -->
    <circle cx="90" cy="16" r="2.5" fill="#ff3030" stroke="#a00000" stroke-width=".8"/>
    <circle cx="98" cy="8" r="2.5" fill="#3080ff" stroke="#1040a0" stroke-width=".8"/>
    <circle cx="106" cy="16" r="2.5" fill="#30e060" stroke="#108030" stroke-width=".8"/>
    <!-- collier de gemmes -->
    <path d="M84 46 Q98 42 112 46" stroke="#f0d040" stroke-width="2.5" fill="none"/>
    <circle cx="92" cy="44" r="2" fill="#ff3030"/><circle cx="104" cy="44" r="2" fill="#3080ff"/>
    <g class="p-eye">
      <ellipse cx="96" cy="56" rx="5.5" ry="6.5" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="97" cy="57" r="3.2" fill="#4020a0"/><circle cx="98.5" cy="55" r="1.4" fill="#fff"/>
      <ellipse cx="110" cy="56" rx="5.5" ry="6.5" fill="#fff" stroke="#3a2010" stroke-width="1.6"/>
      <circle cx="111" cy="57" r="3.2" fill="#4020a0"/><circle cx="112.5" cy="55" r="1.4" fill="#fff"/>
    </g>
    <ellipse cx="104" cy="70" rx="8" ry="6" fill="#d0a070" stroke="#5a3020" stroke-width="1.5"/>
    <ellipse cx="102" cy="69" rx="2" ry="1.5" fill="#5a3020"/><ellipse cx="106" cy="69" rx="2" ry="1.5" fill="#5a3020"/>
  </g>
  </g>
  <g class="p-feathers" fill="#f0d060" stroke="#a08030" stroke-width="1.2">
    <ellipse cx="46" cy="38" rx="6" ry="4"/><ellipse cx="78" cy="34" rx="5" ry="4"/><ellipse cx="36" cy="60" rx="6" ry="4"/><ellipse cx="90" cy="56" rx="5" ry="4"/>
  </g>
</svg>`,

/* ---- BWORK MAGE ---- bwork en robe avec bâton ---- */
bwork_mage: `<svg class="ms ms-bwork_mage" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bmG" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#60a840"/><stop offset="1" stop-color="#1a4a08"/></radialGradient>
    <linearGradient id="bmR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2880"/><stop offset="1" stop-color="#2a1040"/></linearGradient>
    <radialGradient id="bmO" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ff80ff"/><stop offset=".5" stop-color="#c040c0"/><stop offset="1" stop-color="#6020a0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#2a1040" stroke="#1a0828" stroke-width="1.5">
    <path d="M48 106 L44 118 Q48 120 52 118 L52 106 Z"/>
    <path d="M72 106 L70 118 Q74 120 78 118 L76 106 Z"/>
  </g>
  <g class="p-body">
    <!-- robe -->
    <path class="p-torso" d="M42 54 Q38 74 34 100 Q34 110 64 112 Q94 110 94 100 Q90 74 86 54 Q82 46 64 44 Q46 46 42 54 Z" fill="url(#bmR)" stroke="#1a0828" stroke-width="2.2"/>
    <path d="M48 60 Q64 56 80 60" stroke="#7a40b0" stroke-width="1.2" fill="none" opacity=".3"/>
    <path d="M44 78 Q64 74 84 78" stroke="#7a40b0" stroke-width="1.2" fill="none" opacity=".3"/>
    <!-- bâton magique -->
    <g class="p-limb">
      <path d="M88 52 L94 46 L100 10" stroke="#6a5028" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="8" r="7" fill="url(#bmO)" stroke="#6020a0" stroke-width="1.5"/>
      <circle cx="100" cy="8" r="3" fill="#fff" opacity=".4"/>
      <path d="M82 56 Q92 48 90 44" stroke="#50a030" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </g>
    <!-- bras gauche -->
    <path d="M42 56 Q30 52 24 58 Q28 64 36 62 Z" fill="url(#bmG)" stroke="#1a3008" stroke-width="1.8"/>
    <!-- tête -->
    <ellipse cx="66" cy="38" rx="18" ry="16" fill="url(#bmG)" stroke="#1a3008" stroke-width="2.2"/>
    <!-- capuchon -->
    <path d="M46 38 Q44 22 56 14 Q64 8 72 14 Q84 22 82 38 Q74 34 64 34 Q54 34 46 38 Z" fill="url(#bmR)" stroke="#1a0828" stroke-width="1.8"/>
    <!-- oreilles -->
    <g fill="#408828" stroke="#1a3008" stroke-width="1.5">
      <path d="M46 36 Q30 28 26 34 Q32 40 44 40 Z"/>
      <path d="M84 34 Q100 26 104 32 Q98 38 86 38 Z"/>
    </g>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="58" cy="38" rx="5" ry="5.5" fill="#fff8d0" stroke="#1a3008" stroke-width="1.4"/>
      <circle cx="59" cy="39" r="2.8" fill="#8a2000"/><circle cx="60.5" cy="37.5" r="1.2" fill="#fff"/>
      <ellipse cx="76" cy="38" rx="5" ry="5.5" fill="#fff8d0" stroke="#1a3008" stroke-width="1.4"/>
      <circle cx="77" cy="39" r="2.8" fill="#8a2000"/><circle cx="78.5" cy="37.5" r="1.2" fill="#fff"/>
    </g>
    <ellipse cx="68" cy="46" rx="4" ry="3" fill="#50a030" stroke="#2a5018" stroke-width="1"/>
  </g>
  </g>
  <g class="p-feathers" fill="#c040c0" stroke="#6020a0" stroke-width="1">
    <circle cx="50" cy="30" r="3"/><circle cx="80" cy="28" r="3"/><circle cx="42" cy="48" r="2.5"/><circle cx="86" cy="46" r="2.5"/>
  </g>
</svg>`,

/* ---- BWORK ARCHER ---- bwork avec arc ---- */
bwork_archer: `<svg class="ms ms-bwork_archer" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="baG" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#68b048"/><stop offset="1" stop-color="#1a4808"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="24" ry="4" fill="#000" opacity=".25"/>
  <g class="p-hop">
  <g fill="#3a7820" stroke="#1a3008" stroke-width="1.8">
    <path d="M52 100 L48 116 Q52 118 56 116 L56 100 Z"/>
    <path d="M72 100 L70 116 Q74 118 78 116 L76 100 Z"/>
  </g>
  <g class="p-body">
    <!-- corps (plus maigre que le bwork normal) -->
    <ellipse class="p-torso" cx="64" cy="74" rx="20" ry="26" fill="url(#baG)" stroke="#1a3008" stroke-width="2.2"/>
    <ellipse cx="66" cy="82" rx="12" ry="12" fill="#80c858" opacity=".3"/>
    <!-- carquois sur le dos -->
    <rect x="38" y="48" width="8" height="28" rx="3" fill="#6a5028" stroke="#3a2810" stroke-width="1.5" transform="rotate(-10 42 62)"/>
    <g stroke="#8a7040" stroke-width="1" fill="none"><path d="M36 50 L34 44 M40 50 L40 44 M44 50 L46 44"/></g>
    <!-- arc (bras droit) -->
    <g class="p-limb">
      <path d="M84 58 Q96 50 102 42 Q104 38 100 36 L96 40 Q92 46 86 52 Z" fill="url(#baG)" stroke="#1a3008" stroke-width="1.8"/>
      <path d="M100 36 Q108 26 106 16 Q104 8 96 14 Q90 22 92 34" stroke="#8a6838" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M100 36 L92 34" stroke="#c8b080" stroke-width="1" opacity=".7"/>
    </g>
    <!-- bras gauche -->
    <path d="M44 62 Q32 56 26 62 Q30 68 38 66 Z" fill="url(#baG)" stroke="#1a3008" stroke-width="1.8"/>
    <!-- tête (plus fine) -->
    <ellipse cx="66" cy="42" rx="18" ry="16" fill="url(#baG)" stroke="#1a3008" stroke-width="2.2"/>
    <!-- oreilles -->
    <g fill="#48a028" stroke="#1a3008" stroke-width="1.5">
      <path d="M50 38 Q32 28 28 34 Q34 40 46 42 Z"/>
      <path d="M82 36 Q100 26 104 32 Q98 38 86 40 Z"/>
    </g>
    <!-- bandeau -->
    <path d="M48 36 Q58 32 68 34 Q78 32 84 36" stroke="#8a3020" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="58" cy="40" rx="5" ry="5.5" fill="#fff8d0" stroke="#1a3008" stroke-width="1.4"/>
      <circle cx="59.5" cy="41" r="2.8" fill="#8a2000"/><circle cx="60.5" cy="39.5" r="1.2" fill="#fff"/>
      <ellipse cx="76" cy="40" rx="5" ry="5.5" fill="#fff8d0" stroke="#1a3008" stroke-width="1.4"/>
      <circle cx="77.5" cy="41" r="2.8" fill="#8a2000"/><circle cx="78.5" cy="39.5" r="1.2" fill="#fff"/>
    </g>
    <ellipse cx="68" cy="48" rx="4.5" ry="3" fill="#50a030" stroke="#2a5018" stroke-width="1"/>
    <path d="M60 54 Q66 58 72 54" stroke="#1a3008" stroke-width="1.2" fill="none"/>
  </g>
  </g>
  <g class="p-feathers" fill="#58a038" stroke="#1a4808" stroke-width="1.2">
    <ellipse cx="50" cy="34" rx="4" ry="3"/><ellipse cx="80" cy="32" rx="4" ry="3"/><ellipse cx="42" cy="52" rx="4" ry="3"/><ellipse cx="84" cy="48" rx="4" ry="3"/>
  </g>
</svg>`,

/* ---- BWORKETTE ---- boss bwork féminine ---- */
bworkette: `<svg class="ms ms-bworkette" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="bkG" cx="45%" cy="35%" r="65%"><stop offset="0" stop-color="#78c858"/><stop offset=".6" stop-color="#48a028"/><stop offset="1" stop-color="#1a5a08"/></radialGradient>
    <linearGradient id="bkH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d04040"/><stop offset="1" stop-color="#8a1818"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="64" cy="119" rx="28" ry="5" fill="#000" opacity=".3"/>
  <g class="p-hop">
  <g fill="#3a8020" stroke="#1a3808" stroke-width="2">
    <path d="M48 104 L44 116 Q48 118 52 116 L52 104 Z"/>
    <path d="M74 104 L72 116 Q76 118 80 116 L78 104 Z"/>
  </g>
  <g class="p-body">
    <!-- corps (plus large, boss) -->
    <ellipse class="p-torso" cx="64" cy="76" rx="26" ry="30" fill="url(#bkG)" stroke="#1a3808" stroke-width="2.5"/>
    <ellipse cx="66" cy="84" rx="16" ry="16" fill="#90d868" opacity=".3"/>
    <!-- collier / parures -->
    <path d="M44 56 Q54 50 64 52 Q74 50 84 56" stroke="#f0d040" stroke-width="2.5" fill="none"/>
    <circle cx="54" cy="52" r="2.5" fill="#ff3030"/><circle cx="64" cy="50" r="3" fill="#f0d040" stroke="#a08020" stroke-width=".8"/>
    <circle cx="74" cy="52" r="2.5" fill="#3080ff"/>
    <!-- bras -->
    <g fill="url(#bkG)" stroke="#1a3808" stroke-width="2">
      <path d="M38 62 Q24 56 18 62 Q22 70 32 68 Z"/>
      <path d="M90 60 Q104 54 110 60 Q106 68 96 66 Z"/>
    </g>
    <!-- tête -->
    <ellipse cx="66" cy="36" rx="22" ry="20" fill="url(#bkG)" stroke="#1a3808" stroke-width="2.4"/>
    <!-- nattes (tresses) -->
    <g fill="url(#bkH)" stroke="#5a0808" stroke-width="1.5">
      <path d="M44 34 Q28 34 20 44 Q16 52 20 58 Q26 56 28 48 Q32 40 44 38 Z"/>
      <circle cx="20" cy="60" r="4" fill="#d04040"/>
      <path d="M88 32 Q104 32 112 42 Q116 50 112 56 Q106 54 104 46 Q100 38 88 36 Z"/>
      <circle cx="112" cy="58" r="4" fill="#d04040"/>
    </g>
    <!-- oreilles -->
    <g fill="#58b838" stroke="#1a3808" stroke-width="1.5">
      <path d="M46 30 Q28 18 24 24 Q30 32 44 34 Z"/>
      <path d="M86 28 Q104 16 108 22 Q102 30 88 32 Z"/>
    </g>
    <!-- boucles d'oreilles -->
    <circle cx="26" cy="30" r="3" fill="#f0d040" stroke="#a08020" stroke-width=".8"/>
    <circle cx="106" cy="28" r="3" fill="#f0d040" stroke="#a08020" stroke-width=".8"/>
    <!-- yeux (plus grands, cils) -->
    <g class="p-eye">
      <ellipse cx="56" cy="34" rx="6.5" ry="7" fill="#fff8d0" stroke="#1a3808" stroke-width="1.5"/>
      <circle cx="57.5" cy="35" r="3.5" fill="#8a2000"/><circle cx="59" cy="33" r="1.5" fill="#fff"/>
      <path d="M50 29 Q54 26 58 29" stroke="#1a3808" stroke-width="1.5" fill="none"/>
      <ellipse cx="78" cy="34" rx="6.5" ry="7" fill="#fff8d0" stroke="#1a3808" stroke-width="1.5"/>
      <circle cx="79.5" cy="35" r="3.5" fill="#8a2000"/><circle cx="81" cy="33" r="1.5" fill="#fff"/>
      <path d="M72 29 Q76 26 80 29" stroke="#1a3808" stroke-width="1.5" fill="none"/>
    </g>
    <!-- nez -->
    <ellipse cx="68" cy="42" rx="4.5" ry="3.5" fill="#50a030" stroke="#2a5018" stroke-width="1.2"/>
    <!-- bouche (sourire avec crocs) -->
    <path d="M58 50 Q66 56 76 50" stroke="#1a3808" stroke-width="1.5" fill="none"/>
    <path d="M62 50 L60 55 L64 52 Z" fill="#f0e8d0"/><path d="M72 50 L74 55 L70 52 Z" fill="#f0e8d0"/>
  </g>
  </g>
  <g class="p-feathers" fill="#68b848" stroke="#1a5a08" stroke-width="1.2">
    <ellipse cx="46" cy="28" rx="5" ry="3"/><ellipse cx="84" cy="26" rx="5" ry="3"/><ellipse cx="36" cy="48" rx="5" ry="3"/><ellipse cx="92" cy="46" rx="5" ry="3"/>
  </g>
</svg>`,

};
/* Sprite à afficher : dessin s'il existe, sinon emoji */
function monSprite(mid, fallback) {
  const art = MON_ART[mid];
  return art || fallback;
}
/* Petite icône (listes, carte, butin) : dessin figé, sinon emoji */
function monIcon(mid) {
  const art = MON_ART[mid];
  return art ? art.replace('class="ms ', 'class="ms ms-mini ') : MONSTERS[mid].icon;
}
