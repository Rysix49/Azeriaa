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
  tofu: `<svg class="ms ms-tofu" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <radialGradient id="tfBody" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#5b7fc7"/><stop offset=".65" stop-color="#34528f"/><stop offset="1" stop-color="#1f3264"/></radialGradient>
      <radialGradient id="tfBelly" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#fff6df"/><stop offset="1" stop-color="#e6d3a8"/></radialGradient>
      <linearGradient id="tfTuft" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2541f"/><stop offset="1" stop-color="#ffb347"/></linearGradient>
    </defs>
    <g class="p-legs" stroke="#c8641c" stroke-width="2.4" stroke-linecap="round" fill="none">
      <path d="M26 51 L25 58 M25 58 l-3 1.5 M25 58 l2.5 1.6"/><path d="M37 51 L38 58 M38 58 l-2.6 1.6 M38 58 l3 1.4"/>
    </g>
    <g class="p-body">
      <path class="p-tail" d="M13 36 Q4 34 3 27 Q9 31 15 30 Q8 26 8 20 Q14 27 19 29 Z" fill="#2a4380" stroke="#13204a" stroke-width="1.4" stroke-linejoin="round"/>
      <ellipse cx="32" cy="36" rx="19" ry="17" fill="url(#tfBody)" stroke="#13204a" stroke-width="1.8"/>
      <ellipse cx="35" cy="41" rx="11" ry="10" fill="url(#tfBelly)"/>
      <path d="M31 39 q2 2 4 0 M34 44 q2 2 4 0 M29 44 q1.6 1.6 3.4 0" stroke="#d6bf8c" stroke-width="1" fill="none"/>
      <g class="p-tuft" fill="url(#tfTuft)" stroke="#8a2f0c" stroke-width="1.1" stroke-linejoin="round">
        <path d="M33 21 Q30 11 24 8 Q30 9 34 19 Z"/><path d="M35 20 Q35 9 38 4 Q38.5 11 37.5 20 Z"/><path d="M37 21 Q41 12 47 10 Q42 14 39.5 21.5 Z"/>
      </g>
      <path class="p-wing" d="M24 33 Q15 37 17 46 Q22 45 27 40 Z" fill="#26407c" stroke="#13204a" stroke-width="1.5" stroke-linejoin="round"/>
      <g class="p-eye"><ellipse cx="42" cy="31" rx="4.2" ry="4.6" fill="#fff"/><circle cx="43.2" cy="31.4" r="2.5" fill="#1a1020"/><circle cx="44" cy="30.4" r=".9" fill="#fff"/></g>
      <path d="M38.5 26.5 q3.5 -2 7 -.3" stroke="#13204a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path class="p-beak" d="M49 33 L58 35.5 L49 38.5 Q47.5 35.7 49 33 Z" fill="#f29a2e" stroke="#8a4a0c" stroke-width="1.2" stroke-linejoin="round"/>
      <circle cx="44" cy="38" r="2.2" fill="#ff8a8a" opacity=".45"/>
    </g>
  </svg>`,
};
/* Sprite à afficher : dessin s il existe, sinon emoji */
function monSprite(mid, fallback) {
  const art = MON_ART[mid];
  return art || fallback;
}
