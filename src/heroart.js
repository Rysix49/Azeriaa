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
};

function hasHeroArt(cls) { return !!HERO_ART[cls]; }
/* Sprite de combat : dessin si la classe en a un, sinon emblème rond */
function heroSprite(cls) { return HERO_ART[cls] || emblem(cls, 'big'); }
