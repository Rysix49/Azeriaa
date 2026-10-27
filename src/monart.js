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
      <radialGradient id="tfB" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#6d93dc"/><stop offset=".45" stop-color="#4269b4"/><stop offset="1" stop-color="#22397a"/></radialGradient>
      <radialGradient id="tfV" cx="45%" cy="30%" r="70%"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#f1e1bd"/><stop offset="1" stop-color="#d9c08e"/></radialGradient>
      <linearGradient id="tfH" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="#c8401a"/><stop offset=".6" stop-color="#ff8a2e"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
      <linearGradient id="tfW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a5ea8"/><stop offset="1" stop-color="#1b2d63"/></linearGradient>
      <linearGradient id="tfK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc35a"/><stop offset="1" stop-color="#e07a1c"/></linearGradient>
      <clipPath id="tfClip"><path d="M30 70 C26 44 44 26 68 26 C92 26 106 42 104 64 C103 86 90 102 66 104 C44 106 32 92 30 70 Z"/></clipPath>
    </defs>
    <ellipse class="p-shadow" cx="66" cy="117" rx="30" ry="5" fill="#000" opacity=".28"/>
    <g class="p-legs" stroke="#2a1606" stroke-width="2" stroke-linejoin="round" fill="url(#tfK)">
      <path d="M52 100 L50 113 L42 116 Q41 118 44 118 L50 117 L49 120 Q51 121 52 119 L54 116 L58 118 Q60 117 58 115 L54 112 L56 101 Z"/>
      <path d="M74 101 L75 113 L68 117 Q67 119 70 119 L76 117 L77 120 Q79 121 80 118 L80 116 L86 117 Q88 115 85 114 L80 112 L80 101 Z"/>
    </g>
    <g class="p-body">
      <g class="p-tail"><path d="M33 72 Q14 70 8 56 Q18 62 26 60 Q14 52 14 38 Q24 52 34 56 Q28 46 32 36 Q36 50 40 58 Z" fill="url(#tfW)" stroke="#0f1a40" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M30 64 Q20 62 16 56 M30 58 Q22 52 20 44" stroke="#5b80c9" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7"/></g>
      <path d="M30 70 C26 44 44 26 68 26 C92 26 106 42 104 64 C103 86 90 102 66 104 C44 106 32 92 30 70 Z" fill="url(#tfB)"/>
      <g clip-path="url(#tfClip)">
        <path d="M56 104 C54 84 62 66 80 60 C96 56 108 66 108 80 L108 110 Z" fill="url(#tfV)"/>
        <path d="M70 76 q4 3 8 0 M64 86 q4 3 8 0 M76 88 q4 3 8 0 M70 96 q4 3 8 0 M84 78 q3 2.4 6 0" stroke="#cdb07a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        <path d="M30 70 C30 92 44 106 66 104 C50 102 38 92 34 74 Z" fill="#12215a" opacity=".45"/>
        <path d="M44 40 C52 32 66 30 76 32 C64 34 54 38 48 46 Z" fill="#a9c4f5" opacity=".55"/>
        <path d="M98 50 C103 58 104 68 102 76" stroke="#9ab8f0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>
      </g>
      <path d="M30 70 C26 44 44 26 68 26 C92 26 106 42 104 64 C103 86 90 102 66 104 C44 106 32 92 30 70 Z" fill="none" stroke="#0f1a40" stroke-width="3" stroke-linejoin="round"/>
      <g class="p-tuft" stroke="#5a1a06" stroke-width="2" stroke-linejoin="round">
        <path d="M62 30 C56 18 46 12 36 12 C46 16 54 22 58 32 Z" fill="url(#tfH)"/>
        <path d="M66 29 C64 14 68 4 76 0 C72 10 72 20 71 29 Z" fill="url(#tfH)"/>
        <path d="M72 30 C80 20 90 18 98 20 C88 22 82 26 77 32 Z" fill="url(#tfH)"/>
        <path d="M68 26 C67 18 69 11 73 6" stroke="#ffe0a0" stroke-width="1.4" fill="none" opacity=".8"/>
      </g>
      <g class="p-wing"><path d="M48 62 C34 64 28 78 34 92 C40 88 46 84 50 78 C52 86 56 88 60 86 C58 78 58 70 56 64 Z" fill="url(#tfW)" stroke="#0f1a40" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M40 72 Q38 80 38 86 M46 70 Q46 78 46 82" stroke="#6589d4" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/></g>
      <g class="p-eye">
        <path d="M76 46 C76 38 82 34 88 35 C95 36 98 43 97 50 C96 58 90 61 84 60 C78 59 76 53 76 46 Z" fill="#fff" stroke="#0f1a40" stroke-width="2.2"/>
        <circle cx="89" cy="48" r="6" fill="#1a1028"/><circle cx="89" cy="48" r="3" fill="#3a2a5a"/>
        <circle cx="91.5" cy="45" r="2.2" fill="#fff"/><circle cx="86.5" cy="51.5" r="1" fill="#fff" opacity=".8"/>
      </g>
      <path class="p-brow" d="M75 37 C81 31 90 30 97 34" stroke="#0f1a40" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <g class="p-beak">
        <path d="M98 56 C106 54 116 56 122 61 C116 65 106 67 98 66 C96 63 96 59 98 56 Z" fill="url(#tfK)" stroke="#5a2a06" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M99 61.5 L119 61.5" stroke="#8a3e0a" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M101 57.5 C106 56.5 112 57 116 58.5" stroke="#ffe3a8" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".9"/>
      </g>
      <ellipse cx="88" cy="68" rx="5" ry="3" fill="#ff7a8a" opacity=".45"/>
    </g>
  </svg>`,
};
/* Sprite à afficher : dessin s il existe, sinon emoji */
function monSprite(mid, fallback) {
  const art = MON_ART[mid];
  return art || fallback;
}
