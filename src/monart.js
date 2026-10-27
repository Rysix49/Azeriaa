/* =====================================================================
   AMAKNA IDLE — SPRITES ANIMÉS DES MONSTRES (dessins originaux)
   MON_ART[id] = SVG du monstre, dessiné tourné vers la DROITE
   (la scène le retourne pour qu'il fasse face au héros).
   Les parties portent des classes animées en CSS (style2.css, « Sprites monstres ») :
   repos (respiration, clignement), .atk (attaque), .hit (coup reçu), .dead (mort).
   Sans dessin, le monstre garde son emoji.
   ===================================================================== */
const MON_ART = {
  // Emplacement « Tofu » : petit oiseau rond bleu nuit, ventre crème, huppe de trois plumes orange
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
};
/* Sprite à afficher : dessin s il existe, sinon emoji */
function monSprite(mid, fallback) {
  const art = MON_ART[mid];
  return art || fallback;
}
/* Petite icône (listes, carte, butin) : dessin figé, sinon emoji */
function monIcon(mid) {
  const art = MON_ART[mid];
  return art ? art.replace('class="ms ', 'class="ms ms-mini ') : MONSTERS[mid].icon;
}
