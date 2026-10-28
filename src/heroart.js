/* =====================================================================
   AMAKNA IDLE — SPRITES DES PERSONNAGES EN COMBAT (dessins originaux)
   HERO_ART[classe] = SVG du personnage, dessiné tourné vers la DROITE
   (le héros est à gauche de la scène et fait face aux monstres).
   Même principe que les monstres : les parties portent des classes
   animées en CSS (style2.css) : repos (respiration, clignement, barbe),
   .atk (coup de pelle), .hit (coup reçu), .dead (à terre).
   Sans dessin, la classe garde son emblème rond.
   Pour une nouvelle classe : ajouter une entrée dans HERO_ART.
   ===================================================================== */
const HERO_ART = {

/* ---- ENUTROF ---- vieux chasseur de trésors : grand chapeau, moustache de morse, sac de kamas, pelle ---- */
enutrof: `<svg class="hs hs-enutrof" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <linearGradient id="ehCoat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b57a32"/><stop offset=".55" stop-color="#8a5622"/><stop offset="1" stop-color="#55340f"/></linearGradient>
    <linearGradient id="ehVest" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ecd2"/><stop offset="1" stop-color="#cdb888"/></linearGradient>
    <linearGradient id="ehHat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9b06a"/><stop offset=".6" stop-color="#a77a38"/><stop offset="1" stop-color="#6a4a1c"/></linearGradient>
    <linearGradient id="ehBrim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9a05a"/><stop offset="1" stop-color="#7a5524"/></linearGradient>
    <radialGradient id="ehSkin" cx="42%" cy="35%" r="75%"><stop offset="0" stop-color="#ffdcb4"/><stop offset=".7" stop-color="#eaa874"/><stop offset="1" stop-color="#c47c4c"/></radialGradient>
    <radialGradient id="ehNose" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb69a"/><stop offset=".6" stop-color="#e4806a"/><stop offset="1" stop-color="#b95a48"/></radialGradient>
    <linearGradient id="ehBeard" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#e6e6ee"/><stop offset="1" stop-color="#b8b8c8"/></linearGradient>
    <radialGradient id="ehGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff8c0"/><stop offset=".45" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8791a"/></radialGradient>
    <linearGradient id="ehBag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0bd82"/><stop offset=".6" stop-color="#b98a4e"/><stop offset="1" stop-color="#6e4a22"/></linearGradient>
    <linearGradient id="ehMetal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4f8fc"/><stop offset=".5" stop-color="#b4c0cc"/><stop offset="1" stop-color="#6c7886"/></linearGradient>
    <linearGradient id="ehWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d1a064"/><stop offset="1" stop-color="#7a5128"/></linearGradient>
    <linearGradient id="ehBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5230"/><stop offset="1" stop-color="#2e1c0c"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="34" ry="5.5" fill="#000" opacity=".32"/>
  <g class="p-hop">

  <!-- jambes et bottes -->
  <g stroke="#2a1606" stroke-width="2" stroke-linejoin="round">
    <path d="M50 102 h13 v8 q6 1 6 5 q0 4.5 -6 4.5 h-18 q-4 0 -4 -4 q0 -4 6 -5Z" fill="url(#ehBoot)"/>
    <path d="M69 102 h13 v8 q6 1 6 5 q0 4.5 -6 4.5 h-18 q-4 0 -4 -4 q0 -4 6 -5Z" fill="url(#ehBoot)"/>
    <path d="M50 104 h13 M69 104 h13" stroke="#e0b25a" stroke-width="2.4"/>
    <path d="M44 117 h24 M64 117 h24" stroke="#1a0f06" stroke-width="2"/>
  </g>

  <g class="p-torso">
  <!-- sac de kamas sur le dos -->
  <g class="p-bag" stroke="#2a1606" stroke-width="2" stroke-linejoin="round">
    <path d="M44 66 Q38 58 33 62" fill="none" stroke="#4a2e12" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M30 60 Q22 72 20 86 Q20 104 36 104 Q52 104 52 86 Q50 72 42 60 Q36 56 30 60Z" fill="url(#ehBag)"/>
    <path d="M28 58 Q36 52 44 58 L42 63 Q36 59 30 63Z" fill="#8a5a28"/>
    <path d="M30 61 Q36 64 42 61" fill="none" stroke="#e8c070" stroke-width="2" stroke-linecap="round"/>
    <g fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1.2"><circle cx="32" cy="55.5" r="3.6"/><circle cx="39" cy="53.5" r="3.8"/><circle cx="36" cy="58" r="3.2"/></g>
    <circle cx="36" cy="82" r="9.5" fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1.6"/>
    <circle cx="36" cy="82" r="6.4" fill="none" stroke="#a8680a" stroke-width="1.2"/>
    <path d="M33.4 82h5.2M36 79.4v5.2" stroke="#8a5408" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M24 74 Q23 86 27 96" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g class="p-spill" fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1.1"><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/><circle class="sp" cx="36" cy="54" r="3.2"/></g>
  <g class="p-body">
    <!-- manteau -->
    <path d="M46 62 Q64 52 82 62 L92 104 Q64 114 36 104Z" fill="url(#ehCoat)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
    <path d="M56 62 L64 84 L72 62Z" fill="url(#ehVest)" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M64 84 L64 108" stroke="#2a1606" stroke-width="1.6" opacity=".55"/>
    <path d="M46 62 L64 86 M82 62 L64 86" stroke="#e8b84a" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <g fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1"><circle cx="64" cy="94" r="2.4"/><circle cx="64" cy="101" r="2.4"/></g>
    <path d="M40 98 Q64 108 88 98" fill="none" stroke="#e8b84a" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M41 70 Q38 86 40 100" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2.4" stroke-linecap="round"/>
    <!-- ceinture + boucle-pièce -->
    <path d="M42 84 Q64 91 86 84 L87 91 Q64 98 41 91Z" fill="#4a2c10" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="64" cy="90" r="6.2" fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1.6"/>
    <circle cx="64" cy="90" r="3.8" fill="none" stroke="#a8680a" stroke-width="1"/>
    <path d="M62.2 90h3.6M64 88.2v3.6" stroke="#8a5408" stroke-width="1.2" stroke-linecap="round"/>
  </g>

  <!-- bras avant + pelle (pivot : la main) -->
  <g class="p-shovel">
    <path d="M94 45 L93 100" stroke="#000a" stroke-width="5.4" stroke-linecap="round"/>
    <path d="M94 45 L93 100" stroke="#b98a4e" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M86 44.5 H101" stroke="#000a" stroke-width="5" stroke-linecap="round"/>
    <path d="M86 44.5 H101" stroke="#b98a4e" stroke-width="3" stroke-linecap="round"/>
    <path d="M82 100 Q93 94 104 100 Q106 116 93 123 Q80 116 82 100Z" fill="url(#ehMetal)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
    <path d="M86 102 Q86 112 91 118" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>
    <path d="M93 97 V108" stroke="#5c6876" stroke-width="1.4"/>
    <path d="M80 70 Q88 66 92 76" fill="none" stroke="#2a1606" stroke-width="9" stroke-linecap="round"/>
    <path d="M80 70 Q88 66 92 76" fill="none" stroke="#7a4a1c" stroke-width="6.6" stroke-linecap="round"/>
    <path d="M82 69 Q87 66.5 90 72" fill="none" stroke="#b57a32" stroke-width="2" stroke-linecap="round"/>
    <circle cx="93" cy="77" r="5.2" fill="url(#ehSkin)" stroke="#2a1606" stroke-width="1.8"/>
    <path d="M89.6 74.4 h6.6 M89.4 77.6 h6.8" stroke="#a8683c" stroke-width="1"/>
  </g>

  <g class="p-face">
  <!-- tête -->
  <g class="p-head">
    <circle cx="44" cy="47" r="4.4" fill="url(#ehSkin)" stroke="#2a1606" stroke-width="1.8"/>
    <ellipse cx="64" cy="43" rx="21" ry="19" fill="url(#ehSkin)" stroke="#2a1606" stroke-width="2"/>
    <path d="M50 34 Q56 36 60 33 M70 33 Q76 36 80 34" fill="none" stroke="#b8784c" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="53" cy="48" rx="4.6" ry="3" fill="#ff8a7a" opacity=".45"/>
    <!-- yeux -->
    <g class="p-eye">
      <ellipse cx="62" cy="40" rx="3.6" ry="4.4" fill="#fff" stroke="#2a1606" stroke-width="1.4"/>
      <ellipse cx="75" cy="40" rx="3.2" ry="4.2" fill="#fff" stroke="#2a1606" stroke-width="1.4"/>
      <circle cx="63.4" cy="41" r="2.2" fill="#2b1a0a"/><circle cx="76.2" cy="41" r="2" fill="#2b1a0a"/>
      <circle cx="64.1" cy="40.1" r=".8" fill="#fff"/><circle cx="76.8" cy="40.2" r=".75" fill="#fff"/>
    </g>
    <!-- sourcils broussailleux -->
    <g class="p-brow" fill="url(#ehBeard)" stroke="#2a1606" stroke-width="1.4" stroke-linejoin="round">
      <path d="M55 35 Q62 30 68 34 Q64 34.4 62 37 Q58 33.6 55 35Z"/>
      <path d="M71 34 Q77 30 83 34 Q79 34.4 77 37 Q74 33.6 71 34Z"/>
    </g>
    <!-- gros nez -->
    <path d="M69 42 Q85 40 86 49 Q86 56 78 55 Q70 55 69 47Z" fill="url(#ehNose)" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
    <ellipse cx="78" cy="45" rx="2.6" ry="1.8" fill="#ffd0c0" opacity=".8"/>
    <circle cx="82.2" cy="52" r="1.1" fill="#6a2a22"/>
  </g>

  <!-- barbe et moustache de morse -->
  <g class="p-beard" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round">
    <path d="M43 45 Q38 70 53 87 Q64 96 75 87 Q90 70 85 46 Q83 58 76 62 Q64 66 52 62 Q45 58 43 45Z" fill="url(#ehBeard)"/>
    <path d="M51 68 Q55 78 60 85 M64 68 V91 M77 68 Q73 78 68 85" fill="none" stroke="#b8b8c8" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M54 55 Q58 50 66 54 Q76 50 89 52 Q93 56 89 60 Q85 56 78 58 Q70 62 64 60 Q56 60 54 55Z" fill="url(#ehBeard)"/>
    <path d="M90 52 Q95 52 94 58 Q92 62 89 60" fill="url(#ehBeard)"/>
    <path d="M56 56 Q62 58 70 55 M70 56 Q80 55 86 57" fill="none" stroke="#b8b8c8" stroke-width="1" stroke-linecap="round"/>
    <path d="M62 62 Q64 64.4 67 62" fill="none" stroke="#8a4a3a" stroke-width="1.6" stroke-linecap="round"/>
  </g>

  <!-- grand chapeau d'explorateur -->
  <g transform="translate(0 -4)"><g class="p-hat" stroke="#2a1606" stroke-width="2" stroke-linejoin="round">
    <path d="M43 29 Q43 11 64 10 Q85 11 85 29Z" fill="url(#ehHat)"/>
    <path d="M52 13 Q64 19 76 13" fill="none" stroke="#6a4a1c" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M44 25 Q64 31 84 25 L85 19 Q64 26 43 19Z" fill="#4a2c10"/>
    <path d="M20 31 Q30 21 64 23 Q98 21 108 31 Q100 38 64 36 Q28 38 20 31Z" fill="url(#ehBrim)"/>
    <path d="M26 31 Q64 40 102 31" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>
    <circle class="p-coin" cx="56" cy="22.5" r="5.4" fill="url(#ehGold)" stroke="#7a4a00" stroke-width="1.6"/>
    <circle cx="56" cy="22.5" r="3.2" fill="none" stroke="#a8680a" stroke-width="1"/>
    <path d="M54.4 22.5h3.2M56 20.9v3.2" stroke="#8a5408" stroke-width="1.1" stroke-linecap="round"/>
    <path class="p-glint" d="M56 14.6 57.2 21 63 22.5 57.2 24 56 30.4 54.8 24 49 22.5 54.8 21Z" fill="#fff" stroke="none"/>
  </g></g>
  </g>
  </g>
  </g>
</svg>`,

/* ---- IOP ---- jeune guerrier impétueux : cheveux de flammes, bandeau rouge, cape en lambeaux, grande épée ---- */
iop: `<svg class="hs hs-iop" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="ipSkin" cx="42%" cy="32%" r="78%"><stop offset="0" stop-color="#ffdcb4"/><stop offset=".7" stop-color="#f0ad78"/><stop offset="1" stop-color="#c9804e"/></radialGradient>
    <linearGradient id="ipHair" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c8321a"/><stop offset=".45" stop-color="#ff6a1e"/><stop offset="1" stop-color="#ffc24a"/></linearGradient>
    <linearGradient id="ipTunic" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4623f"/><stop offset=".55" stop-color="#c0301e"/><stop offset="1" stop-color="#7a1a12"/></linearGradient>
    <linearGradient id="ipCape" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d03a24"/><stop offset="1" stop-color="#5a0f0c"/></linearGradient>
    <radialGradient id="ipGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff8c0"/><stop offset=".45" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8791a"/></radialGradient>
    <linearGradient id="ipBlade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cfd9e4"/><stop offset="1" stop-color="#7c8a9c"/></linearGradient>
    <linearGradient id="ipLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#4a2a14"/></linearGradient>
    <linearGradient id="ipBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a04a2a"/><stop offset="1" stop-color="#3a1608"/></linearGradient>
    <linearGradient id="ipBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0503a"/><stop offset="1" stop-color="#a01c14"/></linearGradient>
    <linearGradient id="ipHairBack" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7a1608"/><stop offset=".5" stop-color="#c8321a"/><stop offset="1" stop-color="#ff7a1e"/></linearGradient>
    <linearGradient id="ipSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9eef5"/><stop offset=".5" stop-color="#9aa8ba"/><stop offset="1" stop-color="#55637a"/></linearGradient>
    <radialGradient id="ipRuby" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffd0c0"/><stop offset=".4" stop-color="#ff3b22"/><stop offset="1" stop-color="#6a0a02"/></radialGradient>
    <radialGradient id="ipFlame" cx="50%" cy="60%" r="55%"><stop offset="0" stop-color="#ffe27a" stop-opacity=".95"/><stop offset=".5" stop-color="#ff7a1e" stop-opacity=".65"/><stop offset="1" stop-color="#ff3b22" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="32" ry="5.5" fill="#000" opacity=".32"/>
  <path class="p-flame" d="M62 4 Q76 28 94 40 Q114 60 104 92 Q94 116 62 118 Q30 116 20 92 Q10 60 30 40 Q48 28 62 4Z" fill="url(#ipFlame)"/>

  <!-- jambes et bottes -->
  <g stroke="#2a1606" stroke-width="2" stroke-linejoin="round">
    <path d="M50 96 h13 v9 h-13Z M68 96 h13 v9 h-13Z" fill="#4a2a14"/>
    <path d="M49 102 h14 v8 q6 1 6 5 q0 4.5 -6 4.5 h-18 q-4 0 -4 -4 q0 -4 8 -5Z" fill="url(#ipBoot)"/>
    <path d="M68 102 h14 v8 q6 1 6 5 q0 4.5 -6 4.5 h-18 q-4 0 -4 -4 q0 -4 8 -5Z" fill="url(#ipBoot)"/>
    <path d="M49 104 h14 M68 104 h14" stroke="#ffd24a" stroke-width="2.6"/>
    <path d="M43 117 h24 M62 117 h24" stroke="#1a0f06" stroke-width="2"/>
  </g>

  <g class="p-torso">
    <!-- cape en lambeaux -->
    <g class="p-cape" stroke="#2a1606" stroke-width="2" stroke-linejoin="round">
      <path d="M50 60 Q32 64 22 86 L14 100 L26 96 L24 108 L36 100 L42 110 L46 94 Q52 80 58 64Z" fill="url(#ipCape)"/>
      <path d="M48 66 Q36 72 28 88 M52 72 Q44 84 40 98" fill="none" stroke="#ffb09a" stroke-opacity=".3" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <!-- bras gauche : poing serré, gantelet d'or -->
    <path d="M46 69 Q36 76 38 90" fill="none" stroke="#2a1606" stroke-width="11" stroke-linecap="round"/>
    <path d="M46 69 Q36 76 38 90" fill="none" stroke="url(#ipSkin)" stroke-width="8.2" stroke-linecap="round"/>
    <path d="M37.4 82 L38 90" fill="none" stroke="#2a1606" stroke-width="12" stroke-linecap="round"/>
    <path d="M37.4 82 L38 90" fill="none" stroke="url(#ipGold)" stroke-width="9.2" stroke-linecap="round"/>
    <path d="M33.6 85.4 h8.4" stroke="#8a5408" stroke-width="1.3"/>
    <circle cx="38.4" cy="95.4" r="5.4" fill="url(#ipSkin)" stroke="#2a1606" stroke-width="1.9"/>
    <path d="M35 93.4 h6.8 M34.8 96.2 h7.2" stroke="#a8683c" stroke-width="1"/>
    <!-- tunique et ceinture -->
    <path d="M46 62 Q62 54 80 62 L85 97 Q62 105 41 97Z" fill="url(#ipTunic)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
    <path d="M41 97 Q62 105 85 97 L85 100 Q62 108 41 100Z" fill="#ffd24a" stroke="#2a1606" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M82 68 Q85 82 84 94" fill="none" stroke="#ffc2a0" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>
    <path d="M42 70 Q40 84 43 94" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M52 62 L62 77 L72 62" fill="none" stroke="#2a1606" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M52 62 L62 77 L72 62" fill="none" stroke="#ffd24a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="p-sun">
      <circle cx="62" cy="83" r="6.6" fill="url(#ipGold)" stroke="#7a4a00" stroke-width="1.5"/>
      <path d="M62 73.4v3M62 89.6v3M52.4 83h3M68.6 83h3M55.2 76.2l2 2M66.8 87.8l2 2M68.8 76.2l-2 2M55.2 89.8l2-2" stroke="#ffd24a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M62 79.4 63.1 82 65.8 82.4 63.8 84.2 64.4 87 62 85.6 59.6 87 60.2 84.2 58.2 82.4 60.9 82Z" fill="#c0301e"/>
    </g>
    <path d="M41 93 Q62 100 85 93 L86 100 Q62 107 40 100Z" fill="url(#ipLeather)" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
    <rect x="56.5" y="93.6" width="11" height="9.4" rx="1.8" fill="url(#ipGold)" stroke="#7a4a00" stroke-width="1.5"/>
    <rect x="59.2" y="96.2" width="5.6" height="4.2" rx=".8" fill="#c0301e"/>
    <g stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round" fill="url(#ipGold)">
      <path d="M43 101 L53 102 L51.5 111 L45 109Z"/><path d="M71 102 L81 101 L79 109 L72.5 111Z"/>
    </g>

    <!-- épaulière gauche à pointes -->
    <path d="M36 66 Q40 52 56 58 Q57 69 47 72 Q37 72 36 66Z" fill="url(#ipGold)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
    <path d="M40 58 L36.4 47.4 L45.4 54.4 M47 55 L47.6 44.6 L53.6 55" fill="url(#ipGold)" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M39.4 64 Q44 57.4 52 59.4" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/>
    <!-- bras avant, brassard, épaulière -->
    <path d="M80 66 Q91 69 97 83" fill="none" stroke="#2a1606" stroke-width="11" stroke-linecap="round"/>
    <path d="M80 66 Q91 69 97 83" fill="none" stroke="url(#ipSkin)" stroke-width="8.2" stroke-linecap="round"/>
    <path d="M89.4 72.6 L95.4 80.6" fill="none" stroke="#2a1606" stroke-width="11.4" stroke-linecap="round"/>
    <path d="M89.4 72.6 L95.4 80.6" fill="none" stroke="url(#ipGold)" stroke-width="8.6" stroke-linecap="round"/>
    <path d="M87 74 L92 70.5 M89.6 78 L94.6 74.6" stroke="#8a5408" stroke-width="1.4" stroke-linecap="round"/>

    <!-- grande épée (pivot : la main) -->
    <g class="p-sword">
      <path d="M92 76 L92 26 L98 6 L104 26 L104 76Z" fill="url(#ipBlade)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
      <path d="M98 12 L98 74" stroke="#7c8a9c" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M94.6 28 L94.6 72" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-opacity=".9"/>
      <path class="p-bladefire" d="M91 72 Q86 58 92 46 Q88 34 95 22 Q94 14 98 4 Q102 14 101 22 Q108 34 104 46 Q110 58 105 72Z" fill="url(#ipFlame)" opacity="0"/>
      <path d="M96 22 l4 3 M96 34 l4 -3 M96.4 44 l3.2 3 M96 56 l4 -3 M96.4 66 l3.2 3" stroke="#ff7a1e" stroke-width="1.5" stroke-linecap="round" opacity=".9"/>
      <path class="p-edge" d="M98 20 Q102 34 98 48 Q94 60 98 70" fill="none" stroke="#ff7a1e" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
      <path d="M84 77 Q91 70 98 75 Q105 70 112 77 L109 83 Q98 79 87 83Z" fill="url(#ipGold)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
      <path d="M84 77 Q79 70 83 64 Q86 70 91 71Z M112 77 Q117 70 113 64 Q110 70 105 71Z" fill="url(#ipGold)" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round"/>
      <circle cx="98" cy="77.6" r="3.2" fill="url(#ipRuby)" stroke="#2a1606" stroke-width="1.2"/>
      <path d="M96 83 L96 96 L100 96 L100 83Z" fill="url(#ipLeather)" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M96 86 L100 87.6 M96 89.6 L100 91.2 M96 93 L100 94.6" stroke="#e0b25a" stroke-width="1"/>
      <circle cx="98" cy="98" r="4.2" fill="url(#ipGold)" stroke="#7a4a00" stroke-width="1.5"/><circle cx="98" cy="98" r="1.9" fill="url(#ipRuby)"/>
      <circle cx="98" cy="86" r="5.6" fill="url(#ipSkin)" stroke="#2a1606" stroke-width="1.8"/>
      <path d="M94.4 83.4 h7.2 M94.2 86.4 h7.4 M94.6 89.2 h6.8" stroke="#a8683c" stroke-width="1"/>
    </g>
    <g transform="translate(5 7)">
    <path d="M71 62 Q81 49 94 60 Q96 72 83 74 Q70 72 71 62Z" fill="url(#ipGold)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
    <path d="M75 55.4 L77.4 47 L81 53.6 M83 53 L87.6 46.6 L90 56" fill="url(#ipGold)" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M74 60 Q80 54 88 59" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.8" stroke-linecap="round"/>
    </g>
    <path class="p-slash" d="M99 6 Q146 24 128 92 Q128 44 99 6Z" fill="#fff" stroke="none" opacity="0"/>

    <!-- tête -->
    <g class="p-face">
      <g class="p-tails" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round">
        <path d="M43 36 Q30 30 18 38 Q27 38 32 42 Q22 46 15 56 Q32 50 44 41Z" fill="url(#ipBand)"/>
      </g>
      <path class="p-hairback" d="M40 42 Q34 30 40 22 L28 14 L43 15 L38 5 L52 11 L58 2 L66 9 L78 2 L80 10 L95 4 L88 18 L98 24 L86 28 Q90 36 84 46 Q78 36 62 30 Q46 36 40 42Z" fill="url(#ipHairBack)" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="44.6" cy="45" r="4.2" fill="url(#ipSkin)" stroke="#2a1606" stroke-width="1.8"/>
      <path d="M44 40 Q44 26 62 25 Q80 26 81 40 Q82 52 74 58 Q62 63 50 58 Q43 52 44 40Z" fill="url(#ipSkin)" stroke="#2a1606" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cx="53" cy="51" rx="4.4" ry="2.8" fill="#ff7a6a" opacity=".42"/>
      <path d="M44 40 Q62 34 82 40 L82 44 Q62 39 44 44Z" fill="#a8603a" opacity=".28"/>
      <path d="M50.4 41 L55.4 56" stroke="#a24a3a" stroke-width="1.8" stroke-linecap="round"/><path d="M49.4 46 h3.4 M51 50.4 h3.4" stroke="#f6d2b0" stroke-width="1.1" stroke-linecap="round"/>
      <circle cx="44.2" cy="51.4" r="2.2" fill="none" stroke="#ffd24a" stroke-width="1.3"/>
      <path d="M58 56.4 Q63 58.6 68 57.4" fill="none" stroke="#a8603a" stroke-width="1" stroke-opacity=".7" stroke-linecap="round" stroke-dasharray="1 2"/>
      <g class="p-eye">
        <ellipse cx="61" cy="45" rx="4.1" ry="4.6" fill="#fff" stroke="#2a1606" stroke-width="1.4"/>
        <ellipse cx="74" cy="45" rx="3.7" ry="4.4" fill="#fff" stroke="#2a1606" stroke-width="1.4"/>
        <circle cx="62.4" cy="46" r="2.6" fill="#c0301e"/><circle cx="75.2" cy="46" r="2.4" fill="#c0301e"/>
        <circle cx="62.4" cy="46" r="1.3" fill="#2b0a06"/><circle cx="75.2" cy="46" r="1.2" fill="#2b0a06"/>
        <circle cx="63.2" cy="45" r=".9" fill="#fff"/><circle cx="75.9" cy="45.1" r=".8" fill="#fff"/>
      </g>
      <g class="p-brow" fill="none" stroke="#7a1a10" stroke-width="3.2" stroke-linecap="round">
        <path d="M55.4 40 Q60.6 38.6 66.6 43"/><path d="M69.6 43 Q75 38.6 81 40"/>
      </g>
      <path d="M78.4 49 Q81.6 51.2 79 53" fill="none" stroke="#a8603a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M65 54.6 Q72.5 61.4 81 53" fill="#5a1a14" stroke="#2a1606" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M68 56 Q72.5 59 77.6 55.6 L77.4 54.6 Q72.5 57.2 68.2 54.8Z" fill="#fff"/>
      <!-- cheveux de flammes -->
      <g class="p-hair" stroke="#2a1606" stroke-width="1.9" stroke-linejoin="round">
        <path d="M42 39 Q39 31 43 26 L35 17 L47 21 L45 6 L56 16 L60 0 L68 14 L77 3 L77 18 L90 11 L84 25 Q88 32 84 39 Q81 31 75 33 Q68 28 62 33 Q55 28 50 34 Q45 33 42 39Z" fill="url(#ipHair)"/>
        <path d="M50 22 Q54 14 58 10 M64 20 Q68 12 71 8 M76 22 Q80 17 84 15" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M58 33 L60 41 L64 34 M68 32 L72 39 L75 33" fill="url(#ipHair)" stroke-width="1.6"/>
      </g>
      <!-- bandeau -->
      <path d="M42 33 Q62 29.6 84 33 L84 39 Q62 35.4 42 39Z" fill="url(#ipBand)" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="63" cy="35.4" r="4.4" fill="url(#ipGold)" stroke="#7a4a00" stroke-width="1.4"/>
      <path d="M63 32.6 63.9 34.8 66.2 35.2 64.5 36.7 65 39 63 37.8 61 39 61.5 36.7 59.8 35.2 62.1 34.8Z" fill="#c0301e"/>
    </g>
  </g>
</svg>`,

/* ---- SRAM ---- assassin des ombres : capuche pointue, masque-crâne, dagues empoisonnées, bandoulière de couteaux ---- */
sram: `<svg class="hs hs-sram" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <linearGradient id="srTunic" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a3b8c"/><stop offset=".55" stop-color="#2a2152"/><stop offset="1" stop-color="#140d2c"/></linearGradient>
    <linearGradient id="srCape" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c2e78"/><stop offset=".6" stop-color="#1e1640"/><stop offset="1" stop-color="#0c0720"/></linearGradient>
    <linearGradient id="srHood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a47b0"/><stop offset=".5" stop-color="#34286e"/><stop offset="1" stop-color="#190f3a"/></linearGradient>
    <linearGradient id="srScarf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a0ff"/><stop offset=".5" stop-color="#7c4dff"/><stop offset="1" stop-color="#4222a8"/></linearGradient>
    <radialGradient id="srBone" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#fffdf2"/><stop offset=".6" stop-color="#e6dcc0"/><stop offset="1" stop-color="#a99d7e"/></radialGradient>
    <linearGradient id="srBlade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4f2ff"/><stop offset=".45" stop-color="#b9b6d8"/><stop offset="1" stop-color="#5d5a82"/></linearGradient>
    <linearGradient id="srLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3f66"/><stop offset="1" stop-color="#21122c"/></linearGradient>
    <linearGradient id="srBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#42306e"/><stop offset="1" stop-color="#120a26"/></linearGradient>
    <radialGradient id="srSkin" cx="42%" cy="32%" r="78%"><stop offset="0" stop-color="#e2c4f0"/><stop offset=".7" stop-color="#b790d4"/><stop offset="1" stop-color="#7d5aa0"/></radialGradient>
    <radialGradient id="srGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff2c4"/><stop offset=".5" stop-color="#d8b45a"/><stop offset="1" stop-color="#7a5a1c"/></radialGradient>
    <radialGradient id="srMist" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#9b7bff" stop-opacity=".6"/><stop offset="1" stop-color="#9b7bff" stop-opacity="0"/></radialGradient>
    <radialGradient id="srEye" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f4ffd0"/><stop offset=".45" stop-color="#9bff3a"/><stop offset="1" stop-color="#3a8a10"/></radialGradient>
    <filter id="srGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="33" ry="5.5" fill="#000" opacity=".34"/>
  <g class="p-mist">
    <ellipse cx="40" cy="116" rx="22" ry="7" fill="url(#srMist)"/><ellipse cx="82" cy="117" rx="26" ry="7.5" fill="url(#srMist)"/><ellipse cx="62" cy="112" rx="30" ry="6" fill="url(#srMist)" opacity=".7"/>
  </g>

  <!-- dague arrière (prise inversée) -->
  <g transform="rotate(-24 33 92)"><g class="p-dagger2" stroke="#150c2a" stroke-width="1.8" stroke-linejoin="round">
    <path d="M30 86 Q28 70 33 54 Q38 70 36 86Z" fill="url(#srBlade)"/>
    <path d="M33 58 Q32 72 33 84" fill="none" stroke="#9bff3a" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M26 87 h14 v3.4 h-14Z" fill="url(#srGold)"/>
    <path d="M31 90 h4 v8 h-4Z" fill="url(#srLeather)"/>
  </g></g>

  <!-- jambes et bottes -->
  <g stroke="#150c2a" stroke-width="2" stroke-linejoin="round">
    <path d="M49 96 h13 v10 h-13Z M68 96 h13 v10 h-13Z" fill="#20163f"/>
    <path d="M48 102 h15 v8 q8 1 8 5 q0 4.4 -6 4.4 h-19 q-4 0 -4 -4 q0 -4 6 -5Z" fill="url(#srBoot)"/>
    <path d="M67 102 h15 v8 q8 1 8 5 q0 4.4 -6 4.4 h-19 q-4 0 -4 -4 q0 -4 6 -5Z" fill="url(#srBoot)"/>
    <path d="M48 103.4 h15 M67 103.4 h15 M48.4 107 h14.4 M67.4 107 h14.4" stroke="#8f6bff" stroke-width="1.6" fill="none"/>
    <path d="M41 117 h24 M61 117 h24" stroke="#0a0618" stroke-width="2"/>
  </g>

  <g class="p-torso">
    <!-- cape déchiquetée -->
    <g class="p-cape" stroke="#150c2a" stroke-width="2" stroke-linejoin="round">
      <path d="M52 58 Q30 60 20 86 L10 108 L24 100 L24 114 L36 104 L42 116 L48 98 Q56 82 60 62Z" fill="url(#srCape)"/>
      <path d="M50 66 Q36 72 28 90 M54 74 Q46 88 42 104" fill="none" stroke="#a58cff" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <!-- foulard : la queue flotte derrière -->
    <g class="p-scarf" stroke="#150c2a" stroke-width="1.8" stroke-linejoin="round">
      <path d="M50 62 Q34 56 20 66 Q32 66 38 72 Q26 76 20 88 Q38 82 52 70Z" fill="url(#srScarf)"/>
    </g>
    <!-- tunique -->
    <path d="M46 62 Q62 55 80 62 L84 97 Q62 105 41 97Z" fill="url(#srTunic)" stroke="#150c2a" stroke-width="2" stroke-linejoin="round"/>
    <path d="M44 72 Q42 85 44 94" fill="none" stroke="#c3b0ff" stroke-opacity=".3" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M47 61 Q62 71 80 59.4 L82 66.4 Q62 79 45 68Z" fill="url(#srScarf)" stroke="#150c2a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M52 66 Q62 73 74 65.4" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.4" stroke-linecap="round"/>
    <!-- bandoulière de couteaux de lancer -->
    <path d="M49 62 L80 98" stroke="#150c2a" stroke-width="7.6" stroke-linecap="round"/>
    <path d="M49 62 L80 98" stroke="url(#srLeather)" stroke-width="5.2" stroke-linecap="round"/>
    <g stroke="#150c2a" stroke-width="1.1" stroke-linejoin="round">
      <g transform="translate(57 72) rotate(-48)"><path d="M-1.6 0 h3.2 v-9 l-1.6 -4 l-1.6 4Z" fill="url(#srBlade)"/><circle cx="0" cy="1.6" r="1.5" fill="#9bff3a"/></g>
      <g transform="translate(64.5 81) rotate(-48)"><path d="M-1.6 0 h3.2 v-9 l-1.6 -4 l-1.6 4Z" fill="url(#srBlade)"/><circle cx="0" cy="1.6" r="1.5" fill="#9bff3a"/></g>
      <g transform="translate(72 90) rotate(-48)"><path d="M-1.6 0 h3.2 v-9 l-1.6 -4 l-1.6 4Z" fill="url(#srBlade)"/><circle cx="0" cy="1.6" r="1.5" fill="#9bff3a"/></g>
    </g>
    <!-- ceinture, boucle-crâne, bourses -->
    <path d="M41 93 Q62 100 85 93 L86 100 Q62 107 40 100Z" fill="url(#srLeather)" stroke="#150c2a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M41 96 Q62 103 85 96" fill="none" stroke="#8f6bff" stroke-width="1.2" stroke-opacity=".8"/>
    <path d="M56 93 h12 v8 q-6 4 -12 0Z" fill="url(#srBone)" stroke="#150c2a" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="59.4" cy="96.6" r="1.4" fill="#150c2a"/><circle cx="64.6" cy="96.6" r="1.4" fill="#150c2a"/><path d="M60 100.4 v-1.6 M62 100.6 v-1.8 M64 100.4 v-1.6" stroke="#150c2a" stroke-width="1"/>
    <g stroke="#150c2a" stroke-width="1.5" stroke-linejoin="round">
      <path d="M43 100 Q47 99 52 101 L51 110 Q47 112 44 109Z" fill="url(#srLeather)"/><path d="M72 101 Q78 99 82 100 L81 109 Q77 112 73 110Z" fill="url(#srLeather)"/>
      <circle cx="47.6" cy="102.6" r="1.3" fill="url(#srGold)" stroke-width="1"/><circle cx="77.4" cy="102.6" r="1.3" fill="url(#srGold)" stroke-width="1"/>
    </g>

    <!-- bras avant, gantelet, épaulière à pointes -->
    <path d="M80 66 Q91 70 96 84" fill="none" stroke="#150c2a" stroke-width="11" stroke-linecap="round"/>
    <path d="M80 66 Q91 70 96 84" fill="none" stroke="url(#srTunic)" stroke-width="8.2" stroke-linecap="round"/>
    <path d="M89 73 L94.6 81.4" fill="none" stroke="#150c2a" stroke-width="11.4" stroke-linecap="round"/>
    <path d="M89 73 L94.6 81.4" fill="none" stroke="url(#srLeather)" stroke-width="8.6" stroke-linecap="round"/>
    <path d="M86.6 74 L91.6 70.6 M89.2 78.2 L94.2 74.8" stroke="#8f6bff" stroke-width="1.4" stroke-linecap="round"/>

    <!-- dague principale (pivot : la main) -->
    <g class="p-dagger" stroke="#150c2a" stroke-width="2" stroke-linejoin="round">
      <path d="M93 78 Q89 56 100 28 Q108 52 103 78Z" fill="url(#srBlade)"/>
      <path d="M100 34 Q96 56 98 76" fill="none" stroke="#5d5a82" stroke-width="2" stroke-linecap="round"/>
      <path d="M95.4 40 Q92.8 58 95 74" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="1.3" stroke-linecap="round"/>
      <path class="p-poison" d="M103.4 46 Q106 60 103 76" fill="none" stroke="#9bff3a" stroke-width="2" stroke-linecap="round" filter="url(#srGlow)"/>
      <circle class="p-drip" cx="103.6" cy="80" r="1.8" fill="#9bff3a" stroke="none"/>
      <path d="M88 78 Q95 72 98 76 Q101 72 108 78 L106 83 Q98 80 90 83Z" fill="url(#srGold)"/>
      <path d="M96 83 h4.4 v11 h-4.4Z" fill="url(#srLeather)"/>
      <path d="M96 86 L100.4 87.4 M96 89.4 L100.4 90.8" stroke="#8f6bff" stroke-width="1"/>
      <circle cx="98.2" cy="96.4" r="3.4" fill="url(#srGold)"/>
      <circle cx="98.2" cy="85.6" r="5.4" fill="url(#srLeather)" stroke-width="1.8"/>
      <path d="M94.6 83.4 h7.2 M94.4 86.2 h7.4 M94.8 88.8 h6.6" stroke="#8f6bff" stroke-width="1"/>
    </g>
    <g transform="translate(4 7)">
      <path d="M71 62 Q81 49 94 60 Q96 72 83 74 Q70 72 71 62Z" fill="url(#srLeather)" stroke="#150c2a" stroke-width="2" stroke-linejoin="round"/>
      <path d="M75 55.4 L77 46 L81 53 M83 52.4 L88 45 L90 56" fill="url(#srBlade)" stroke="#150c2a" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M74 60 Q80 54 88 59" fill="none" stroke="#c3b0ff" stroke-opacity=".55" stroke-width="1.8" stroke-linecap="round"/>
    </g>
    <path class="p-slash" d="M99 4 Q146 22 128 92 Q130 44 99 4Z" fill="#9bff3a" opacity="0"/>
    <path class="p-slash2" d="M104 90 Q150 70 126 18 Q130 60 104 90Z" fill="#c3b0ff" opacity="0"/>

    <!-- tête : capuche pointue, crâne, yeux phosphorescents -->
    <g class="p-face">
      <g class="p-hoodtip" stroke="#150c2a" stroke-width="1.9" stroke-linejoin="round">
        <path d="M50 24 Q38 10 18 16 Q30 20 32 28 Q22 32 14 44 Q32 40 46 36Z" fill="url(#srHood)"/>
        <path d="M32 18 Q24 22 20 28" fill="none" stroke="#a58cff" stroke-opacity=".4" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <path d="M43 52 Q38 30 55 17 Q70 7 86 20 Q96 33 89 54 Q80 64 65 64 Q50 63 43 52Z" fill="url(#srHood)" stroke="#150c2a" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 22 Q60 11 74 13 M46 40 Q45 30 52 24" fill="none" stroke="#c3b0ff" stroke-opacity=".5" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M50 38 Q66 29 85 39 Q88 52 78 60 Q64 66 53 57Z" fill="#0c0618" stroke="#150c2a" stroke-width="1.6" stroke-linejoin="round"/>
      <!-- crâne -->
      <path d="M54 49 Q67 45 82 50 L81 58 Q76 64 66 64.4 Q57 63 53.6 57Z" fill="url(#srBone)" stroke="#150c2a" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M64.6 51.6 l1.6 3.4 l1.6 -3.4Z" fill="#150c2a"/>
      <path d="M56 58.6 Q67 61.6 79 57.4" fill="none" stroke="#150c2a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M59 58.6 v3 M63 59.6 v3.4 M67 60 v3.4 M71 59.6 v3.2 M75 58.8 v2.8" stroke="#150c2a" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M58 49.4 l3 3.6" stroke="#8a7e60" stroke-width="1.1" stroke-linecap="round"/>
      <g class="p-eye" filter="url(#srGlow)">
        <path d="M57 44.4 Q62 40.4 68.4 45.6 Q63 47.8 57 44.4Z" fill="url(#srEye)"/>
        <path d="M73 45.6 Q79 40.4 84 44.2 Q78 47.8 73 45.6Z" fill="url(#srEye)"/>
        <ellipse cx="63.2" cy="44.6" rx="1" ry="1.5" fill="#102a04"/><ellipse cx="78.6" cy="44.4" rx="1" ry="1.5" fill="#102a04"/>
      </g>
      <g class="p-brow" fill="none" stroke="#150c2a" stroke-width="2.6" stroke-linecap="round">
        <path d="M55 40.6 Q62 37.2 69.4 43"/><path d="M72 43 Q79 37.2 86 40.6"/>
      </g>
    </g>
  </g>
</svg>`,

/* ---- ECAFLIP ---- chat joueur : haut-de-forme porte-bonheur, pièce qui danse, griffes dégainées, trèfles de chance ---- */
ecaflip: `<svg class="hs hs-ecaflip" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="ecFur" cx="42%" cy="32%" r="80%"><stop offset="0" stop-color="#ffc874"/><stop offset=".6" stop-color="#f09a38"/><stop offset="1" stop-color="#b86a1a"/></radialGradient>
    <radialGradient id="ecBelly" cx="45%" cy="35%" r="75%"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#f4dcb0"/></radialGradient>
    <linearGradient id="ecCoat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3fd0b0"/><stop offset=".55" stop-color="#1f9d88"/><stop offset="1" stop-color="#0b5048"/></linearGradient>
    <linearGradient id="ecCoatD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b8472"/><stop offset="1" stop-color="#06302c"/></linearGradient>
    <radialGradient id="ecGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff8c0"/><stop offset=".45" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8791a"/></radialGradient>
    <linearGradient id="ecHat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a5a"/><stop offset="1" stop-color="#12121e"/></linearGradient>
    <radialGradient id="ecEye" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#f4ffd0"/><stop offset=".5" stop-color="#8dff5a"/><stop offset="1" stop-color="#2f9a22"/></radialGradient>
    <linearGradient id="ecBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a4a28"/><stop offset="1" stop-color="#32180a"/></linearGradient>
    <linearGradient id="ecClaw" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#8a95a8"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    <linearGradient id="ecLining" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0523f"/><stop offset="1" stop-color="#7a1810"/></linearGradient>
    <linearGradient id="ecFeather" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff5a6a"/><stop offset=".5" stop-color="#ffb02e"/><stop offset="1" stop-color="#fff2a0"/></linearGradient>
    <radialGradient id="ecRuff" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f6e6c8"/><stop offset="1" stop-color="#d8b886"/></radialGradient>
    <radialGradient id="ecShield" cx="50%" cy="50%" r="50%"><stop offset=".6" stop-color="#6fa8ff" stop-opacity="0"/><stop offset=".9" stop-color="#8fd0ff" stop-opacity=".55"/><stop offset="1" stop-color="#bfe6ff" stop-opacity=".8"/></radialGradient>
    <radialGradient id="ecLuck" cx="50%" cy="55%" r="55%"><stop offset="0" stop-color="#ffe27a" stop-opacity=".85"/><stop offset=".5" stop-color="#2fe0b8" stop-opacity=".45"/><stop offset="1" stop-color="#2fe0b8" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="32" ry="5.5" fill="#000" opacity=".32"/>
  <ellipse class="p-luck" cx="62" cy="68" rx="56" ry="58" fill="url(#ecLuck)" opacity="0"/>
  <circle class="p-shield" cx="62" cy="66" r="56" fill="url(#ecShield)" opacity="0"/>

  <!-- queue annelée -->
  <g class="p-tail" stroke="#3a1c06" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M50 98 Q18 104 12 76 Q8 54 26 46 Q22 62 30 76 Q38 90 52 88Z" fill="url(#ecFur)"/>
    <path d="M14 66 Q20 66 24 70 M12 76 Q19 77 25 80 M20 88 Q26 86 31 88 M24 52 Q27 56 25 60" fill="none" stroke="#7a3e0c" stroke-width="2.6"/>
    <path d="M26 47 Q18 36 28 34 Q38 36 34 48 Q30 52 26 47Z" fill="url(#ecRuff)" stroke-width="1.8"/><path d="M22 40 L19 36 M30 36 L30 31 M35 41 L39 38" stroke="#3a1c06" stroke-width="1.4" fill="none"/>
  </g>

  <!-- basques de l'habit -->
  <g class="p-coat" stroke="#04201c" stroke-width="2" stroke-linejoin="round">
    <path d="M44 90 L36 112 L48 106 L56 116 L62 96Z" fill="url(#ecCoatD)"/><path d="M45 94 L40 108 L48 103 L54 110 L58 98Z" fill="url(#ecLining)" stroke="none"/>
    <path d="M82 90 L92 112 L78 106 L70 116 L64 96Z" fill="url(#ecCoatD)"/><path d="M81 94 L88 108 L79 103 L72 110 L68 98Z" fill="url(#ecLining)" stroke="none"/>
    <path d="M38 108 L48 104 M90 108 L78 104" stroke="#ffd24a" stroke-width="1.8" fill="none"/>
  </g>

  <!-- pattes et bottes -->
  <g stroke="#3a1c06" stroke-width="2" stroke-linejoin="round">
    <path d="M51 96 h12 v10 h-12Z M68 96 h12 v10 h-12Z" fill="url(#ecFur)"/>
    <path d="M49 103 h15 v7 q7 1 7 5 q0 4.4 -6 4.4 h-19 q-4 0 -4 -4 q0 -4 7 -5Z" fill="url(#ecBoot)"/>
    <path d="M67 103 h15 v7 q7 1 7 5 q0 4.4 -6 4.4 h-19 q-4 0 -4 -4 q0 -4 7 -5Z" fill="url(#ecBoot)"/>
    <path d="M49 105 h15 M67 105 h15" stroke="#ffd24a" stroke-width="2.4" fill="none"/>
    <path d="M48 102 Q56 98 64 102 L64 106 Q56 103 48 106Z M66 102 Q74 98 82 102 L82 106 Q74 103 66 106Z" fill="url(#ecRuff)" stroke="#3a1c06" stroke-width="1.6" stroke-linejoin="round"/><path d="M70 117 l2 2.2 M74 117 l2 2.2 M78 117 l2 2.2 M52 117 l2 2.2 M56 117 l2 2.2 M60 117 l2 2.2" stroke="#fffaf0" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  </g>

  <g class="p-torso">
    <!-- bras arrière : lance la pièce -->
    <g class="p-arm2">
      <path d="M49 68 Q38 66 35 52" fill="none" stroke="#04201c" stroke-width="10.6" stroke-linecap="round"/>
      <path d="M49 68 Q38 66 35 52" fill="none" stroke="url(#ecCoat)" stroke-width="8" stroke-linecap="round"/>
      <path d="M33.6 56.6 L40 57.6" stroke="#ffd24a" stroke-width="4.4" stroke-linecap="round"/>
      <circle cx="35" cy="48" r="5.2" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.8"/>
    </g>
    <g class="p-coin">
      <circle cx="34" cy="31" r="10.4" fill="url(#ecGold)" stroke="#6a4208" stroke-width="2"/>
      <circle cx="34" cy="31" r="7.6" fill="none" stroke="#b8791a" stroke-width="1.2"/>
      <g fill="#8a5408"><ellipse cx="34" cy="33.4" rx="3.2" ry="2.6"/><circle cx="29.8" cy="29.6" r="1.4"/><circle cx="32.2" cy="27.2" r="1.4"/><circle cx="35.8" cy="27.2" r="1.4"/><circle cx="38.2" cy="29.6" r="1.4"/></g>
      <path class="p-glint" d="M28 25 L30 23.6 M27.4 28 L28.6 27" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>
    </g>
    <!-- tunique : gilet, jabot, ceinture à dé -->
    <path d="M46 62 Q62 55 80 62 L84 97 Q62 105 41 97Z" fill="url(#ecCoat)" stroke="#04201c" stroke-width="2" stroke-linejoin="round"/>
    <path d="M44 70 Q42 84 44 94" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M54 62 L62 92 L72 62Z" fill="url(#ecBelly)" stroke="#04201c" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M52 62 L60 90 M74 62 L64 90" stroke="#ffd24a" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <g fill="url(#ecGold)" stroke="#6a4208" stroke-width="1.2"><circle cx="62" cy="72" r="2"/><circle cx="62.6" cy="80" r="2"/></g>
    <path d="M54 59 Q58 66 62 62 Q66 68 70 62 Q74 66 76 59 Q66 56 54 59Z" fill="#fff" stroke="#04201c" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M48 62 L78 96" stroke="#04201c" stroke-width="6.6" stroke-linecap="round"/><path d="M48 62 L78 96" stroke="url(#ecBoot)" stroke-width="4.4" stroke-linecap="round"/>
    <g fill="url(#ecGold)" stroke="#6a4208" stroke-width="1"><circle cx="53" cy="68" r="1.5"/><circle cx="60" cy="76" r="1.5"/><circle cx="72" cy="90" r="1.5"/></g>
    <path d="M41 93 Q62 100 85 93 L86 100 Q62 107 40 100Z" fill="url(#ecBoot)" stroke="#04201c" stroke-width="1.8" stroke-linejoin="round"/>
    <g class="p-die">
      <rect x="55.6" y="92.6" width="13" height="11" rx="2" fill="#fff" stroke="#04201c" stroke-width="1.6"/>
      <g fill="#c0301e"><circle cx="59" cy="96" r="1.3"/><circle cx="65.4" cy="96" r="1.3"/><circle cx="62.2" cy="98.2" r="1.3"/><circle cx="59" cy="100.6" r="1.3"/><circle cx="65.4" cy="100.6" r="1.3"/></g>
    </g>
    <g class="p-cards"><rect x="72" y="90" width="11" height="13" rx="1.8" fill="url(#ecBoot)" stroke="#04201c" stroke-width="1.6"/><rect x="73.4" y="85.6" width="7" height="9.6" rx="1.2" fill="#fff" stroke="#04201c" stroke-width="1.1" transform="rotate(-10 77 91)"/><path d="M77 89.6 l1.6 2 -1.6 2 -1.6 -2Z" fill="#c0301e" transform="rotate(-10 77 91)"/><rect x="72" y="93" width="11" height="3.4" fill="url(#ecGold)" stroke="#04201c" stroke-width="1"/></g>
    <!-- bras avant : griffes dégainées -->
    <path d="M80 66 Q91 70 96 83" fill="none" stroke="#04201c" stroke-width="10.6" stroke-linecap="round"/>
    <path d="M80 66 Q91 70 96 83" fill="none" stroke="url(#ecCoat)" stroke-width="8" stroke-linecap="round"/>
    <path d="M89 73.4 L94.2 81" stroke="#04201c" stroke-width="11" stroke-linecap="round"/><path d="M89 73.4 L94.2 81" stroke="url(#ecGold)" stroke-width="8.4" stroke-linecap="round"/>
    <g class="p-claw">
      <g stroke="#2a2a3a" stroke-width="1.5" stroke-linejoin="round">
        <path d="M97 80 Q108 66 122 60 Q113 70 101 86Z" fill="url(#ecClaw)"/>
        <path d="M98 85 Q111 76 125 76 Q114 84 102 91Z" fill="url(#ecClaw)"/>
        <path d="M95 76 Q103 60 114 50 Q108 64 99 82Z" fill="url(#ecClaw)"/>
      </g>
      <circle cx="96" cy="85" r="6" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.8"/>
      <path d="M93.4 83 l4.6 -1.4 M93.2 86 l5 -.6 M94 89 l4 .8" stroke="#7a3e0c" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <g transform="translate(5 7)"><path d="M71 62 Q81 50 94 60 Q96 71 83 73 Q70 71 71 62Z" fill="url(#ecGold)" stroke="#04201c" stroke-width="2" stroke-linejoin="round"/>
      <path d="M75 56 L79 51 L83 56 M83 55 L87 50 L90 57" fill="url(#ecGold)" stroke="#04201c" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M74 60 Q80 54 88 59" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.8" stroke-linecap="round"/></g>
    <path class="p-slash" d="M99 44 Q148 56 130 100 Q130 70 99 44Z" fill="#8dffe0" opacity="0"/>
    <path class="p-slash2" d="M104 96 Q150 80 128 34 Q134 70 104 96Z" fill="#fff" opacity="0"/>

    <!-- tête de chat joueur -->
    <g class="p-face">
      <path class="p-ruff" d="M42 57 Q37 63 41 70 L47 66 L52 74 L58 68 L64 75 L70 68 L76 74 L81 66 L88 70 Q92 63 87 56Z" fill="url(#ecRuff)" stroke="#3a1c06" stroke-width="1.9" stroke-linejoin="round"/>
      <g class="p-ears" stroke="#3a1c06" stroke-width="2" stroke-linejoin="round">
        <path class="p-ear" d="M47 36 Q42 18 49 8 Q60 12 68 24Z" fill="url(#ecFur)"/>
        <path class="p-ear2" d="M70 24 Q80 10 90 8 Q96 20 88 38Z" fill="url(#ecFur)"/>
        <path d="M50 30 Q48 20 52 14 Q58 17 62 24Z" fill="#ff9aa8" stroke="none"/>
        <path d="M76 24 Q82 16 87 14 Q90 22 86 31Z" fill="#ff9aa8" stroke="none"/>
        <path d="M49 10 L46 3 L53 8 M89 10 L94 3 L90 11" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.6"/>
        <circle cx="91" cy="22" r="3" fill="none" stroke="#ffd24a" stroke-width="1.8"/><circle cx="45" cy="26" r="2.4" fill="none" stroke="#ffd24a" stroke-width="1.6"/>
      </g>
      <path d="M42 46 Q40 28 62 26 Q86 26 88 46 Q90 60 76 63 Q64 66 53 63 Q40 60 42 46Z" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="2" stroke-linejoin="round"/>
      <path d="M58 28 L60 36 M66 27 L66 36 M74 28 L72 36" stroke="#7a3e0c" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M42 50 L35 51 L41 55 L36 59 L44 58 M88 50 L95 51 L89 55 L94 59 L86 58" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M49 56 Q64 50 80 56 Q80 66 65 66 Q50 66 49 56Z" fill="url(#ecBelly)" stroke="#3a1c06" stroke-width="1.6" stroke-linejoin="round"/>
      <ellipse cx="64" cy="55" rx="3.6" ry="2.6" fill="#ff7a96" stroke="#3a1c06" stroke-width="1.3"/>
      <path class="p-mouth" d="M55 60 Q60 66 64.6 58.6 Q70 65 77 56" fill="none" stroke="#3a1c06" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M58.6 62 l1.6 3.4 l1.6 -3.2Z M68.6 62 l1.6 3.4 l1.6 -3.2Z" fill="#fff" stroke="#3a1c06" stroke-width=".9"/>
      <g class="p-whisk" stroke="#fff" stroke-width="1.3" stroke-linecap="round" stroke-opacity=".95"><path d="M52 57 L36 53 M52 59.4 L35 60.6 M52 61.6 L38 67 M77 57 L94 52 M77 59.4 L96 60 M77 61.6 L92 67"/></g>
      <g class="p-eye">
        <path d="M51 44 Q57 38 65 43 Q64 51 57 51 Q51 50 51 44Z" fill="#fff" stroke="#3a1c06" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M70 43 Q78 38 84 44 Q84 50 77 51 Q70 50 70 43Z" fill="#fff" stroke="#3a1c06" stroke-width="1.6" stroke-linejoin="round"/>
        <ellipse cx="58.4" cy="45.6" rx="4" ry="4.8" fill="url(#ecEye)"/><ellipse cx="76.4" cy="45.6" rx="4" ry="4.8" fill="url(#ecEye)"/>
        <ellipse cx="58.8" cy="45.6" rx="1.3" ry="4.4" fill="#10240a"/><ellipse cx="76.8" cy="45.6" rx="1.3" ry="4.4" fill="#10240a"/>
        <circle cx="60" cy="43.6" r="1.1" fill="#fff"/><circle cx="78" cy="43.6" r="1.1" fill="#fff"/>
        <path d="M51 43.6 Q57 38.6 65 42.8 L64.6 44.6 Q57 41.4 51.8 45.6Z" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.5" stroke-linejoin="round"/><path d="M70 42.8 Q78 38.6 84 43.6 L83.2 45.6 Q78 41.4 70.4 44.6Z" fill="url(#ecFur)" stroke="#3a1c06" stroke-width="1.5" stroke-linejoin="round"/>
      </g>
      <path d="M52 33 L56 52" stroke="#fff3e8" stroke-width="2.6" stroke-linecap="round" opacity=".95"/><path d="M52 33 L56 52" stroke="#c0505a" stroke-width="1" stroke-linecap="round"/>
      <g class="p-brow" fill="none" stroke="#7a3e0c" stroke-width="3" stroke-linecap="round"><path d="M50 38.6 Q57 35 65 41"/><path d="M71 41 Q78 35 85 38.6"/></g>
      <!-- chapeau de flambeur : feutre incliné, plume, as de trèfle -->
      <g class="p-hat" stroke="#04201c" stroke-width="1.8" stroke-linejoin="round" transform="rotate(12 66 22)">
        <path class="p-feather" d="M72 14 Q88 -4 106 4 Q96 6 92 12 Q102 14 104 24 Q90 16 78 22Z" fill="url(#ecFeather)" stroke-width="1.5"/>
        <path d="M57 22 Q57 8 66 7 Q75 8 76 22Z" fill="url(#ecHat)"/>
        <path d="M49 25 Q66 17 84 23 Q66 31 49 25Z" fill="url(#ecHat)"/>
        <path d="M57 21 Q66 25 76 20.6 L76 17 Q66 21 57 17.6Z" fill="url(#ecLining)"/>
        <rect x="67" y="9.6" width="7" height="9.6" rx="1.3" fill="#fff" stroke-width="1.1" transform="rotate(8 70 14)"/><path d="M70.6 12.6 l1.6 2 -1.6 2 -1.6 -2Z" fill="#1a1a1a" transform="rotate(8 70 14)"/>
        <path d="M51 24 Q66 18 82 22" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.3" stroke-linecap="round"/>
      </g>
    </g>
    <!-- trèfles de chance (un par Trèfle) -->
    <g class="p-clvs" fill="#5aff8c" stroke="#1a6a36" stroke-width="1">
<g class="clv c1" transform="translate(27.4 25.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
<g class="clv c2" transform="translate(37.7 11.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
<g class="clv c3" transform="translate(55.6 3.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
<g class="clv c4" transform="translate(76.4 3.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
<g class="clv c5" transform="translate(94.3 11.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
<g class="clv c6" transform="translate(104.6 25.9)"><g class="clv-i"><circle cx="-2.3" cy="0" r="2.5"/><circle cx="2.3" cy="0" r="2.5"/><circle cx="0" cy="-2.3" r="2.5"/><circle cx="0" cy="2.3" r="2.5"/><path d="M0 2 Q1 5 3.4 6.6" fill="none" stroke="#1a6a36" stroke-width="1.2" stroke-linecap="round"/></g></g>
    </g>
    <!-- dés du Quitte ou Double -->
    <g class="p-dice" opacity="0">
      <g transform="translate(48 -4)"><rect x="-6" y="-6" width="12" height="12" rx="2.4" fill="#fff" stroke="#04201c" stroke-width="1.6"/><g fill="#c0301e"><circle cx="-2.6" cy="-2.6" r="1.3"/><circle cx="2.6" cy="2.6" r="1.3"/><circle cx="0" cy="0" r="1.3"/><circle cx="2.6" cy="-2.6" r="1.3"/><circle cx="-2.6" cy="2.6" r="1.3"/></g></g>
      <g transform="translate(78 -4)"><rect x="-6" y="-6" width="12" height="12" rx="2.4" fill="#fff" stroke="#04201c" stroke-width="1.6"/><g fill="#c0301e"><circle cx="-2.4" cy="-2.4" r="1.4"/><circle cx="2.4" cy="2.4" r="1.4"/></g></g>
    </g>
    <!-- étoiles de la déveine -->
    <g class="p-stars" opacity="0" fill="#ffe27a" stroke="#6a4208" stroke-width=".9"><path d="M46 14 l2 4 4 .6 -3 3 .8 4 -3.8 -2 -3.8 2 .8 -4 -3 -3 4 -.6Z"/><path d="M86 8 l1.6 3.4 3.6 .5 -2.6 2.6 .6 3.6 -3.2 -1.7 -3.2 1.7 .6 -3.6 -2.6 -2.6 3.6 -.5Z"/><path d="M66 -2 l1.4 3 3.2 .4 -2.3 2.3 .6 3.2 -2.9 -1.5 -2.9 1.5 .6 -3.2 -2.3 -2.3 3.2 -.4Z"/></g>
  </g>
</svg>`,
};

function hasHeroArt(cls) { return !!HERO_ART[cls]; }
/* Sprite de combat : dessin si la classe en a un, sinon emblème rond */
function heroSprite(cls) { return HERO_ART[cls] || emblem(cls, 'big'); }
