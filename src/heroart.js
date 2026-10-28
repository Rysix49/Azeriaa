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
      <g stroke-linejoin="round">
        <g transform="translate(97 86) rotate(34)"><path d="M-7 -28 h14 q2 0 2 2 v18 q0 2 -2 2 h-14 q-2 0 -2 -2 v-18 q0 -2 2 -2Z" fill="#fffdf4" stroke="#1c1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M-5.4 -26 h10.8" stroke="#d8c9a4" stroke-width="1"/><g transform="translate(0 -17)" fill="#1c1c2c"><path d="M0 -5 C-7 0 -6 5 -2.4 5 C-1.2 5 -.4 4.4 0 3.8 L-1.2 7.4 H1.2 L0 3.8 C.4 4.4 1.2 5 2.4 5 C6 5 7 0 0 -5Z"/></g><g transform="translate(-4.6 -24.2) scale(.34)" fill="#1c1c2c"><path d="M0 -5 C-7 0 -6 5 -2.4 5 C-1.2 5 -.4 4.4 0 3.8 L-1.2 7.4 H1.2 L0 3.8 C.4 4.4 1.2 5 2.4 5 C6 5 7 0 0 -5Z"/></g></g>
        <g transform="translate(97 86) rotate(72)"><path d="M-7 -28 h14 q2 0 2 2 v18 q0 2 -2 2 h-14 q-2 0 -2 -2 v-18 q0 -2 2 -2Z" fill="#fffdf4" stroke="#1c1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M-5.4 -26 h10.8" stroke="#d8c9a4" stroke-width="1"/><g transform="translate(0 -17)" fill="#d02a2a"><path d="M0 4.4 C-7 -.6 -6 -6 -2.8 -6 C-1.2 -6 0 -5 0 -3.8 C0 -5 1.2 -6 2.8 -6 C6 -6 7 -.6 0 4.4Z"/></g><g transform="translate(-4.6 -24.2) scale(.34)" fill="#d02a2a"><path d="M0 4.4 C-7 -.6 -6 -6 -2.8 -6 C-1.2 -6 0 -5 0 -3.8 C0 -5 1.2 -6 2.8 -6 C6 -6 7 -.6 0 4.4Z"/></g></g>
        <g transform="translate(97 86) rotate(110)"><path d="M-7 -28 h14 q2 0 2 2 v18 q0 2 -2 2 h-14 q-2 0 -2 -2 v-18 q0 -2 2 -2Z" fill="#fffdf4" stroke="#1c1c2c" stroke-width="1.6" stroke-linejoin="round"/><path d="M-5.4 -26 h10.8" stroke="#d8c9a4" stroke-width="1"/><g transform="translate(0 -17)" fill="#d02a2a"><path d="M0 -6 L4.6 0 L0 6 L-4.6 0Z"/></g><g transform="translate(-4.6 -24.2) scale(.34)" fill="#d02a2a"><path d="M0 -6 L4.6 0 L0 6 L-4.6 0Z"/></g></g>
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

/* ---- CRA ---- archère aux yeux de lynx : capuche de feuillage, faucon perché sur l'arc, carquois, lentille de visée ---- */
cra: `<svg class="hs hs-cra" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="crSkin" cx="42%" cy="32%" r="78%"><stop offset="0" stop-color="#ffe3c2"/><stop offset=".7" stop-color="#f1b783"/><stop offset="1" stop-color="#c98458"/></radialGradient>
    <linearGradient id="crHair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#d4deea"/><stop offset="1" stop-color="#8d9db4"/></linearGradient>
    <linearGradient id="crHood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#58c25f"/><stop offset=".55" stop-color="#2f8a3d"/><stop offset="1" stop-color="#14502a"/></linearGradient>
    <linearGradient id="crJerk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4fb85a"/><stop offset=".55" stop-color="#2a7a3a"/><stop offset="1" stop-color="#124624"/></linearGradient>
    <linearGradient id="crCloak" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f9a4a"/><stop offset=".6" stop-color="#1f6a32"/><stop offset="1" stop-color="#0c3a1c"/></linearGradient>
    <linearGradient id="crCloakIn" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d9a0"/><stop offset="1" stop-color="#9a8a52"/></linearGradient>
    <radialGradient id="crGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff8c0"/><stop offset=".45" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8791a"/></radialGradient>
    <linearGradient id="crLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6638"/><stop offset="1" stop-color="#4a2a14"/></linearGradient>
    <linearGradient id="crBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#32180a"/></linearGradient>
    <linearGradient id="crPants" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6a3a"/><stop offset="1" stop-color="#1c3c22"/></linearGradient>
    <linearGradient id="crFur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8cba8"/></linearGradient>
    <linearGradient id="crWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d49a52"/><stop offset=".5" stop-color="#9a5a26"/><stop offset="1" stop-color="#5a2e10"/></linearGradient>
    <radialGradient id="crLens" cx="38%" cy="32%" r="78%"><stop offset="0" stop-color="#e8ffe0" stop-opacity=".5"/><stop offset=".55" stop-color="#7dff6a" stop-opacity=".22"/><stop offset="1" stop-color="#1f8a3a" stop-opacity=".4"/></radialGradient>
    <radialGradient id="crAmber" cx="40%" cy="32%" r="72%"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#ffb62e"/><stop offset="1" stop-color="#a85a0a"/></radialGradient>
    <radialGradient id="crAura" cx="50%" cy="55%" r="55%"><stop offset="0" stop-color="#b6ff7a" stop-opacity=".7"/><stop offset=".55" stop-color="#4fe05a" stop-opacity=".35"/><stop offset="1" stop-color="#2fe05a" stop-opacity="0"/></radialGradient>
    <linearGradient id="crScarf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ee6a44"/><stop offset="1" stop-color="#a02a18"/></linearGradient>
    <linearGradient id="crSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#b6c4d4"/><stop offset="1" stop-color="#62728a"/></linearGradient>
    <linearGradient id="crHawk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c98a4a"/><stop offset=".6" stop-color="#8a5226"/><stop offset="1" stop-color="#4a280e"/></linearGradient>
    <linearGradient id="crHawkW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a86a34"/><stop offset="1" stop-color="#2e1a0a"/></linearGradient>
    <linearGradient id="crFeather" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1fb8a0"/><stop offset=".5" stop-color="#8ef0d8"/><stop offset="1" stop-color="#fff6d8"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="32" ry="5.5" fill="#000" opacity=".32"/>
  <circle class="p-aura" cx="62" cy="68" r="58" fill="url(#crAura)" opacity="0"/>

  <!-- manteau de feuillage -->
  <g class="p-cloak" stroke="#0d2412" stroke-width="2" stroke-linejoin="round">
    <path d="M54 58 Q34 60 24 82 L10 106 L25 100 L24 113 L38 103 L44 117 L53 99 L62 72Z" fill="url(#crCloak)"/>
    <path d="M52 66 Q40 72 34 88 L40 99 L48 90 L52 98 L58 78Z" fill="url(#crCloakIn)" stroke="none" opacity=".55"/>
    <path d="M44 70 Q34 82 28 100 M50 74 Q44 88 40 104" fill="none" stroke="#9fe08a" stroke-opacity=".4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M22 88 l4 -1 M26 96 l4 -2 M33 92 l3 -3" stroke="#0d2412" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
  </g>

  <!-- queue-de-cheval argentée -->
  <g class="p-pony" stroke="#26180a" stroke-width="1.8" stroke-linejoin="round">
    <path d="M46 36 Q34 36 30 48 Q27 60 31 74 Q33 64 36 58 Q36 68 35 78 Q42 66 41 52 Q44 46 48 42Z" fill="url(#crHair)"/>
    <path d="M33 52 Q31 62 33 70 M38 50 Q37 58 37 66" fill="none" stroke="#8d9db4" stroke-opacity=".7" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M43 35 l-5 -1 -1 7 6 1Z" fill="url(#crScarf)"/>
    <circle cx="39.5" cy="41" r="2.4" fill="url(#crGold)" stroke="#6a4208" stroke-width="1"/>
  </g>

  <!-- carquois et flèches -->
  <g transform="translate(-7 7)"><g class="p-qarrows" stroke="#26180a" stroke-linejoin="round" stroke-linecap="round">
    <g transform="rotate(-32 44 52)"><path d="M44 52 L44 30" stroke-width="3.6"/><path d="M44 52 L44 30" stroke="#e8d6a0" stroke-width="1.8"/>
      <path d="M44 30 L40 22 L47.4 22Z" fill="#d6402a" stroke-width="1.2"/></g>
    <g transform="rotate(-10 44 52)"><path d="M44 52 L44 27" stroke-width="3.6"/><path d="M44 52 L44 27" stroke="#e8d6a0" stroke-width="1.8"/>
      <path d="M44 27 L40 19 L47.4 19Z" fill="#fff6d8" stroke-width="1.2"/></g>
    <g transform="rotate(12 44 52)"><path d="M44 52 L44 31" stroke-width="3.6"/><path d="M44 52 L44 31" stroke="#e8d6a0" stroke-width="1.8"/>
      <path d="M44 31 L40 23 L47.4 23Z" fill="#2fb8a0" stroke-width="1.2"/></g>
  </g></g>
  <g class="p-quiver" stroke="#26180a" stroke-width="2" stroke-linejoin="round" transform="translate(-7 7)">
    <g transform="rotate(-16 46 70)">
      <rect x="39.5" y="46" width="13" height="50" rx="4.5" fill="url(#crLeather)"/>
      <rect x="38.5" y="45" width="15" height="6" rx="2.6" fill="url(#crGold)" stroke-width="1.5"/>
      <path d="M40 62 h12 M40 76 h12" stroke="#e0b25a" stroke-width="1.4"/>
      <path d="M46 55 q3 4 0 9 q-3 -5 0 -9Z" fill="#7dff6a" stroke="#1a6a36" stroke-width="1"/>
    </g>
  </g>

  <!-- jambes et bottes à revers de fourrure -->
  <g stroke="#26180a" stroke-width="2" stroke-linejoin="round">
    <path d="M50 94 h13 v11 h-13Z M68 94 h13 v11 h-13Z" fill="url(#crPants)" stroke="#0d2412"/>
    <path d="M49 101 h14 v8 q7 1 7 5 q0 4.6 -6 4.6 h-19 q-4 0 -4 -4 q0 -4 8 -5Z" fill="url(#crBoot)"/>
    <path d="M68 101 h14 v8 q7 1 7 5 q0 4.6 -6 4.6 h-19 q-4 0 -4 -4 q0 -4 8 -5Z" fill="url(#crBoot)"/>
    <path d="M47 99 Q56 94 65 99 L65 105 Q56 101 47 105Z" fill="url(#crFur)"/>
    <path d="M66 99 Q75 94 84 99 L84 105 Q75 101 66 105Z" fill="url(#crFur)"/>
    <path d="M51 100 l1 3 M55 99 l1 3 M59 99 l1 3 M70 100 l1 3 M74 99 l1 3 M78 99 l1 3" stroke="#a89a78" stroke-width="1" fill="none"/>
    <path d="M52 112 h8 M70 112 h8" stroke="#e0b25a" stroke-width="1.6" fill="none"/>
    <path d="M43 118 h25 M62 118 h25" stroke="#1a0f06" stroke-width="2"/>
  </g>

  <g class="p-torso">
    <!-- veste de chasse -->
    <path d="M46 62 Q62 54 80 62 L85 97 Q62 105 41 97Z" fill="url(#crJerk)" stroke="#0d2412" stroke-width="2" stroke-linejoin="round"/>
    <path d="M43 70 Q41 84 44 94" fill="none" stroke="#fff" stroke-opacity=".26" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M82 68 Q85 82 84 94" fill="none" stroke="#9fe08a" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"/>
    <path d="M53 61 L62 76 L73 61Z" fill="#f4ecd0" stroke="#0d2412" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M57 64 l5 4 l5 -4 M59 68 l3 2.6 l3 -2.6" fill="none" stroke="#8a5a32" stroke-width="1.2" stroke-linecap="round"/>
    <!-- foulard rouge -->
    <g class="p-scarf" stroke="#0d2412" stroke-width="1.6" stroke-linejoin="round">
      <path d="M52 62 Q40 66 30 62 Q22 62 16 70 Q26 68 30 74 Q36 70 42 72 Q50 72 54 68Z" fill="url(#crScarf)"/>
      <path d="M22 66 l6 2 M30 68 l4 2" stroke="#ffd0b0" stroke-opacity=".6" stroke-width="1.1" fill="none"/>
    </g>
    <path d="M47 61 Q62 70 79 61 L78 66 Q62 75 48 67Z" fill="url(#crScarf)" stroke="#0d2412" stroke-width="1.6" stroke-linejoin="round"/>
    <!-- baudrier et fermoir feuille -->
    <path d="M76 60 L50 96" stroke="#26180a" stroke-width="6.4" stroke-linecap="round"/><path d="M76 60 L50 96" stroke="url(#crLeather)" stroke-width="4.2" stroke-linecap="round"/>
    <g fill="url(#crGold)" stroke="#6a4208" stroke-width="1"><circle cx="70" cy="68.4" r="1.5"/><circle cx="56" cy="87.6" r="1.5"/></g>
    <path d="M63 72 Q71 76 63 85 Q55 76 63 72Z" fill="url(#crGold)" stroke="#6a4208" stroke-width="1.4" stroke-linejoin="round"/><path d="M63 74 L63 83" stroke="#6a4208" stroke-width="1"/>
    <!-- ceinture, boucle feuille -->
    <path d="M41 93 Q62 100 85 93 L86 100 Q62 107 40 100Z" fill="url(#crLeather)" stroke="#26180a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M63 93.6 Q70 98.4 63 106 Q56 98.4 63 93.6Z" fill="url(#crGold)" stroke="#6a4208" stroke-width="1.5" stroke-linejoin="round"/><circle cx="63" cy="99.4" r="2" fill="#7dff6a" stroke="#1a6a36" stroke-width=".9"/>
    <!-- tassettes en feuilles -->
    <g class="p-tass" stroke="#0d2412" stroke-width="1.6" stroke-linejoin="round">
      <path d="M44 100 Q52 104 50 114 Q43 117 40 110 Q40 104 44 100Z" fill="url(#crJerk)"/>
      <path d="M72 101 Q80 99 84 104 Q84 112 79 115 Q72 112 72 101Z" fill="url(#crJerk)"/>
      <path d="M44.5 103 L46.4 112 M77.4 102.6 L79.2 111.4" stroke="#9fe08a" stroke-opacity=".6" stroke-width="1" fill="none"/>
    </g>
    <path d="M48 99 l-5 12 l4 1.4 l4 -9.4Z" fill="#c9d4e0" stroke="#26180a" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M47 101 l-2.4 8" stroke="#fff" stroke-width="1" stroke-linecap="round"/>

    <!-- bras avant (tient l'arc) -->
    <g class="p-armF">
      <path d="M82 66 Q99 74 112 72" fill="none" stroke="#0d2412" stroke-width="11.4" stroke-linecap="round"/>
      <path d="M82 66 Q99 74 112 72" fill="none" stroke="url(#crJerk)" stroke-width="8.6" stroke-linecap="round"/>
      <path d="M98 72 L108 72.6" fill="none" stroke="#26180a" stroke-width="11" stroke-linecap="round"/>
      <path d="M98 72 L108 72.6" fill="none" stroke="url(#crLeather)" stroke-width="8.2" stroke-linecap="round"/>
      <path d="M100 68.2 v8.8 M105 68.4 v8.8" stroke="url(#crGold)" stroke-width="1.8" stroke-linecap="round"/>
    </g>

    <!-- épaulière à plumes -->
    <g stroke="#0d2412" stroke-width="1.8" stroke-linejoin="round">
      <path d="M72 66 Q73 53 87 56 Q94 63 89 72 Q79 73 72 66Z" fill="url(#crHood)"/>
      <path d="M75 70 Q74 62 82 59 Q88 62 88 69Z" fill="url(#crJerk)"/>
      <path d="M76 71 l-1 8 M80 72.6 l0 8 M85 72 l1 7" stroke="#0d2412" stroke-width="3" stroke-linecap="round"/>
      <path d="M76 71 l-1 8 M80 72.6 l0 8 M85 72 l1 7" stroke="url(#crFeather)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M77 60 Q82 56 88 60" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
    </g>

    <!-- l'arc, sa corde, la flèche encochée et le faucon -->
    <g class="p-bowasm">
      <path class="p-bowflex" d="M96 36 C109 44 123 58 118 72 C123 86 109 100 96 108" fill="none" stroke="#26180a" stroke-width="7.6" stroke-linecap="round" opacity="0"/>
      <path class="p-bowflex" d="M96 36 C109 44 123 58 118 72 C123 86 109 100 96 108" fill="none" stroke="url(#crWood)" stroke-width="5" stroke-linecap="round" opacity="0"/>
      <path class="p-bowbase" d="M96 36 C108 46 119 58 115 72 C119 86 108 98 96 108" fill="none" stroke="#26180a" stroke-width="7.6" stroke-linecap="round"/>
      <path class="p-bowbase" d="M96 36 C108 46 119 58 115 72 C119 86 108 98 96 108" fill="none" stroke="url(#crWood)" stroke-width="5" stroke-linecap="round"/>
      <path class="p-runes" d="M99 41 C108 49 116 59 113.2 72 C116 85 108 95 99 103" fill="none" stroke="#9dff7a" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3.4 3.6"/>
      <circle cx="96" cy="36" r="3.4" fill="url(#crGold)" stroke="#6a4208" stroke-width="1.3"/>
      <circle cx="96" cy="108" r="3.4" fill="url(#crGold)" stroke="#6a4208" stroke-width="1.3"/>
      <rect x="111" y="62" width="7" height="20" rx="2.4" fill="url(#crLeather)" stroke="#26180a" stroke-width="1.6"/>
      <path d="M111 66 h7 M111 70 h7 M111 74 h7 M111 78 h7" stroke="#e0b25a" stroke-width="1"/>
      <!-- corde en deux brins : on la tend en tournant et en allongeant chaque brin -->
      <line class="p-strU" x1="96" y1="36" x2="96" y2="68" stroke="#fff6dc" stroke-width="1.3" stroke-linecap="round"/>
      <line class="p-strD" x1="96" y1="108" x2="96" y2="68" stroke="#fff6dc" stroke-width="1.3" stroke-linecap="round"/>
      <!-- flèche encochée (cachée au repos) -->
      <g class="p-arrow" opacity="0">
        <path d="M96 68 L142 68" stroke="#26180a" stroke-width="4.4" stroke-linecap="round"/>
        <path d="M97 68 L140 68" stroke="#f0e0b0" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M97 68 L104 62.4 L112 62.4 L108 68Z" fill="#d6402a" stroke="#26180a" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M97 68 L104 73.6 L112 73.6 L108 68Z" fill="#fff6d8" stroke="#26180a" stroke-width="1.1" stroke-linejoin="round"/>
        <circle class="p-arrowglow" cx="143" cy="68" r="8" fill="#9dff7a" opacity="0"/>
        <path class="p-arrowhead" d="M133 63.4 L148 68 L133 72.6 L136.4 68Z" fill="url(#crSteel)" stroke="#26180a" stroke-width="1.2" stroke-linejoin="round"/>
      </g>
      <!-- faucon perché sur le bout de l'arc : l'Œil de Lynx -->
      <g transform="translate(97 35) scale(.82)">
        <g class="p-hawk">
          <g stroke="#26180a" stroke-width="1.6" stroke-linejoin="round">
            <path class="p-htail" d="M-4 -9 L-13 7 L-9 9 L-7 14 L-1 8 L3 -7Z" fill="#b8683a"/>
            <path d="M-11.4 4 l4 -1 M-9.6 8.6 l4.6 -1" stroke="#2e1a0a" stroke-width="1.3" fill="none"/>
            <path d="M-8 -11 Q-11 -27 2 -29 Q13 -27 10.6 -12 Q6.6 -4 -2 -4 Q-7 -5 -8 -11Z" fill="url(#crHawk)"/>
            <path d="M3 -27 Q10.6 -24.6 9.6 -12.6 Q6 -6.4 0 -6.4 Q4.6 -14 3 -27Z" fill="#fff0d0" stroke="none"/>
            <path d="M6 -22 l1.6 1.4 M4.4 -17 l1.8 1 M6.8 -14 l1.4 1.4" stroke="#9a5a2a" stroke-width="1.3" stroke-linecap="round" fill="none"/>
            <g class="p-hwingB"><path d="M-9 -24 Q-17 -17 -14 -3 Q-10 -9 -7 -14Z" fill="url(#crHawkW)"/></g>
            <g class="p-hwing"><path d="M-3 -25 Q-10 -15 -7 -1 Q-3 -8 1 -16Z" fill="url(#crHawkW)"/><path d="M-8.6 -8 l2 -1 M-8 -4 l2 -.6" stroke="#fff0d0" stroke-width="1" stroke-linecap="round" fill="none"/></g>
            <g class="p-hhead">
              <circle cx="3.4" cy="-32" r="5.8" fill="url(#crHawk)"/>
              <path d="M3.6 -32 Q8.4 -31.6 8.6 -28 Q4.6 -27.4 2.4 -29Z" fill="#fff0d0" stroke="none"/>
              <path d="M4 -28.4 q2 2 1.4 4.6" stroke="#2e1a0a" stroke-width="1.5" stroke-linecap="round" fill="none"/>
              <path d="M8 -33 Q14.4 -32 12.6 -26.6 Q11 -29 8 -29Z" fill="#ffc83a"/>
              <g class="p-heye"><circle cx="5.6" cy="-33.4" r="2.1" fill="#ffe27a" stroke-width="1"/><circle cx="6" cy="-33.4" r=".95" fill="#10100a" stroke="none"/></g>
              <path d="M-1 -37 l-2 -3 M2 -38 l0 -4" stroke="#8a5226" stroke-width="1.6" stroke-linecap="round" fill="none"/>
            </g>
          </g>
          <path d="M-4 -4 L-3 1 M0 -4 L1 1 M3.4 -4 L3.4 1.4" stroke="#26180a" stroke-width="3.4" stroke-linecap="round" fill="none"/>
          <path d="M-4 -4 L-3 1 M0 -4 L1 1 M3.4 -4 L3.4 1.4" stroke="#ffc83a" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        </g>
      </g>
    </g>

    <!-- main avant : gant de cuir serré sur la poignée -->
    <g class="p-gripF">
      <circle cx="113" cy="72" r="6.2" fill="url(#crLeather)" stroke="#26180a" stroke-width="1.9"/>
      <path d="M114.4 67 Q118.8 66.4 119 70 Q116.6 70.4 114.4 70Z" fill="url(#crLeather)" stroke="#26180a" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M109.6 69.4 h6 M109.2 72.4 h6.4 M109.8 75.2 h5.6" stroke="#2a1606" stroke-opacity=".7" stroke-width="1" stroke-linecap="round"/>
    </g>

    <!-- bras de corde : épaule A, coude, main (deux segments emboîtés) -->
    <g class="p-upB">
      <path d="M54 66 L46 80" stroke="#0d2412" stroke-width="10" stroke-linecap="round"/>
      <path d="M54 66 L46 80" stroke="url(#crJerk)" stroke-width="7.6" stroke-linecap="round"/>
      <path d="M50 70 L47.6 76" stroke="#9fe08a" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>
      <g class="p-loB">
        <path d="M46 80 L54 93" stroke="#0d2412" stroke-width="9.4" stroke-linecap="round"/>
        <path d="M46 80 L54 93" stroke="url(#crJerk)" stroke-width="7" stroke-linecap="round"/>
        <path d="M49.4 85.6 L53 90" stroke="#26180a" stroke-width="9" stroke-linecap="round"/>
        <path d="M49.4 85.6 L53 90" stroke="url(#crLeather)" stroke-width="6.4" stroke-linecap="round"/>
        <path d="M51 85.4 l4.6 2.6" stroke="url(#crGold)" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="54" cy="93" r="4.8" fill="url(#crLeather)" stroke="#26180a" stroke-width="1.7"/>
        <path d="M55.8 90 q3.6 1.2 3.4 5 M54.4 89.6 q3.8 1 3.8 5.2" fill="none" stroke="#2a1606" stroke-opacity=".7" stroke-width="1" stroke-linecap="round"/>
      </g>
    </g>

    <!-- tête de l'archère -->
    <g class="p-face">
      <!-- oreilles pointues -->
      <path d="M44 46 L33 36 L42 54Z" fill="url(#crSkin)" stroke="#26180a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M42.4 46 L36.6 40.6 L41.6 50Z" fill="#ff9aa0" stroke="none"/>
      <path d="M81 46 L91 36 L83 54Z" fill="url(#crSkin)" stroke="#26180a" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M82.4 46 L88 40.6 L83.4 50Z" fill="#ff9aa0" stroke="none"/>
      <circle cx="40" cy="52" r="2.2" fill="none" stroke="#ffd24a" stroke-width="1.6"/>
      <!-- visage -->
      <path d="M43 46 Q42 30 62 28 Q82 30 82 46 Q82 60 70 65 Q62 68 54 65 Q43 60 43 46Z" fill="url(#crSkin)" stroke="#26180a" stroke-width="2" stroke-linejoin="round"/>
      <!-- mèches argentées -->
      <path d="M43 44 Q47 31 62 31.6 Q78 31 82 44 Q76 38 71 41.6 Q66 35 60 41 Q54 36 49 42 Q46 44 43 52Z" fill="url(#crHair)" stroke="#26180a" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M52 36 Q56 40 54 44 M64 35 Q67 39 66 42 M74 37 Q77 40 75 43" fill="none" stroke="#8d9db4" stroke-opacity=".8" stroke-width="1.1" stroke-linecap="round"/>
      <!-- peinture de guerre -->
      <path d="M47 56 l7 2.4 M48 59.6 l6.4 2" stroke="#3fd05a" stroke-width="2" stroke-linecap="round" opacity=".9"/>
      <path d="M77 57 l-5 1.6" stroke="#3fd05a" stroke-width="2" stroke-linecap="round" opacity=".9"/>
      <!-- nez et bouche -->
      <path d="M61 54.4 q1.4 1.2 3 0" fill="none" stroke="#a8683c" stroke-width="1.4" stroke-linecap="round"/>
      <path class="p-mouth" d="M56.6 59.6 Q62 63.6 67.6 59.2" fill="none" stroke="#7a2a1a" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M67.2 59 q1.8 -.2 2.6 -1.6" fill="none" stroke="#7a2a1a" stroke-width="1.3" stroke-linecap="round"/>
      <!-- yeux ambrés -->
      <g class="p-eye">
        <path d="M49 47.6 Q54 42 59.6 46.6 Q59 53 54.4 53 Q49.4 52.6 49 47.6Z" fill="#fff" stroke="#26180a" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M65 46.6 Q71 42 76 47.6 Q75.6 52.6 70.6 53 Q66 53 65 46.6Z" fill="#fff" stroke="#26180a" stroke-width="1.6" stroke-linejoin="round"/>
        <ellipse cx="55" cy="48.6" rx="3.9" ry="4.5" fill="url(#crAmber)"/><ellipse cx="70.4" cy="48.6" rx="3.9" ry="4.5" fill="url(#crAmber)"/>
        <ellipse cx="55.4" cy="48.8" rx="1.5" ry="2.6" fill="#1a1006"/><ellipse cx="70.8" cy="48.8" rx="1.5" ry="2.6" fill="#1a1006"/>
        <circle cx="56.6" cy="46.8" r="1.2" fill="#fff"/><circle cx="72" cy="46.8" r="1.2" fill="#fff"/>
        <path d="M49 47.6 Q53 43.4 58 44.8 M65.6 44.6 Q71 42.4 76 47.4" fill="none" stroke="#26180a" stroke-width="1.8" stroke-linecap="round"/>
      </g>
      <g class="p-brow" fill="none" stroke="#6a4e3a" stroke-width="2.4" stroke-linecap="round"><path d="M48.6 42.4 Q54 38.2 60.6 41.6"/><path d="M64.6 41.6 Q71 38.2 76.6 42.4"/></g>
      <!-- lentille d'Œil de Lynx -->
      <g class="p-lens">
        <path d="M78.4 42 Q82 38 83.6 32" fill="none" stroke="#26180a" stroke-width="2.6" stroke-linecap="round"/>
        <circle class="p-lensglow" cx="70.6" cy="48.6" r="8.6" fill="#9dff7a" opacity="0"/>
        <circle cx="70.6" cy="48.6" r="6.8" fill="url(#crLens)" stroke="#26180a" stroke-width="1.5"/>
        <circle cx="70.6" cy="48.6" r="6.8" fill="none" stroke="url(#crGold)" stroke-width="1.9"/>
        <g class="p-cross" stroke="#e8ffd0" stroke-width="1" stroke-linecap="round" opacity=".85"><path d="M70.6 43 v2.4 M70.6 51.8 v2.4 M64.8 48.6 h2.4 M74 48.6 h2.4"/></g>
        <path class="p-glint" d="M66.6 45 L68.4 43" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".9"/>
      </g>
      <!-- capuche de feuillage, bordure de plumes -->
      <g class="p-hood" stroke="#0d2412" stroke-width="2" stroke-linejoin="round">
        <path d="M37 50 Q31 24 54 15 Q68 10 82 17 Q93 25 87 48 Q86 34 78 29 Q62 24 46 30 Q38 36 37 50Z" fill="url(#crHood)"/>
        <path d="M44 22 Q56 14 70 15 M72 18 Q82 20 86 30" fill="none" stroke="#9fe08a" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M40 44 Q41 31 62 29.4 Q82 31 85 44" fill="none" stroke="#f6ecd0" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M43 40 l-2 -2.4 M48 35 l-1.4 -3 M55 31.6 l-.6 -3.2 M63 30.2 l0 -3.2 M71 30.8 l.8 -3 M78 33.4 l1.8 -2.6 M83 39 l2.2 -2" stroke="#d8cba8" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <path d="M60 20 Q64 24 68 20 Q64 14 60 20Z" fill="url(#crGold)" stroke="#6a4208" stroke-width="1.4"/>
        <g class="p-feather" stroke-width="1.5"><path d="M48 19 Q41 8 28 7 Q36 12 37 18 Q31 15 26 17 Q36 20 41 26Z" fill="url(#crFeather)"/><path d="M46 19 Q38 12 30 9" fill="none" stroke="#0d6a5a" stroke-width="1.1" stroke-linecap="round"/></g>
      </g>
      <g class="p-reticle" opacity="0"><circle cx="70.6" cy="48.6" r="11.4" fill="none" stroke="#ff5a3a" stroke-width="1.1" stroke-dasharray="3 3"/></g>
    </g>
      </g>
  <!-- étoiles de concentration -->
  <g class="p-spark" fill="#e8ffd0" opacity="0">
    <path d="M26 20 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4Z"/>
    <path d="M104 94 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2Z"/>
  </g>
</svg>`,

/* ---- XELOR ---- mage du temps : chapeau à cadran, cadran fantôme dont les 12 heures sont les grains, sablier au bâton, montre en main ---- */
xelor: `<svg class="hs hs-xelor" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="xlSkin" cx="42%" cy="32%" r="78%"><stop offset="0" stop-color="#ffe6cc"/><stop offset=".7" stop-color="#f2bc90"/><stop offset="1" stop-color="#c98a60"/></radialGradient>
    <linearGradient id="xlHair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#d6e0f2"/><stop offset="1" stop-color="#8d9cc0"/></linearGradient>
    <linearGradient id="xlRobe" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a63d8"/><stop offset=".5" stop-color="#2a3fa4"/><stop offset="1" stop-color="#141e64"/></linearGradient>
    <linearGradient id="xlCape" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a50c4"/><stop offset=".55" stop-color="#1c2a84"/><stop offset="1" stop-color="#0a1042"/></linearGradient>
    <linearGradient id="xlLining" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ff0ff"/><stop offset="1" stop-color="#3a8ad8"/></linearGradient>
    <linearGradient id="xlHat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a74e8"/><stop offset=".5" stop-color="#2a3fa8"/><stop offset="1" stop-color="#121a60"/></linearGradient>
    <radialGradient id="xlGold" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#fff8c8"/><stop offset=".45" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8791a"/></radialGradient>
    <linearGradient id="xlBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#d9a238"/><stop offset="1" stop-color="#8a5a14"/></linearGradient>
    <radialGradient id="xlFace" cx="40%" cy="34%" r="75%"><stop offset="0" stop-color="#fffdf0"/><stop offset=".7" stop-color="#f1e6c4"/><stop offset="1" stop-color="#bda970"/></radialGradient>
    <linearGradient id="xlBoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a8a"/><stop offset="1" stop-color="#1c1040"/></linearGradient>
    <linearGradient id="xlGlass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8f6ff" stop-opacity=".75"/><stop offset=".5" stop-color="#a8d8ff" stop-opacity=".35"/><stop offset="1" stop-color="#e8f6ff" stop-opacity=".7"/></linearGradient>
    <linearGradient id="xlSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset="1" stop-color="#ffb62e"/></linearGradient>
    <radialGradient id="xlHalo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#7fb4ff" stop-opacity=".05"/><stop offset=".75" stop-color="#5a8cff" stop-opacity=".22"/><stop offset="1" stop-color="#8fd0ff" stop-opacity=".5"/></radialGradient>
    <radialGradient id="xlAura" cx="50%" cy="55%" r="55%"><stop offset="0" stop-color="#bfe6ff" stop-opacity=".7"/><stop offset=".55" stop-color="#6fa8ff" stop-opacity=".35"/><stop offset="1" stop-color="#5a8cff" stop-opacity="0"/></radialGradient>
    <linearGradient id="xlStaff" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8c880"/><stop offset=".5" stop-color="#a87a30"/><stop offset="1" stop-color="#5a3a12"/></linearGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="22" ry="4.6" fill="#000" opacity=".32"/>
  <circle class="p-aura" cx="58" cy="62" r="58" fill="url(#xlAura)" opacity="0"/>

  <!-- cadran fantôme : les 12 grains du sablier s'allument sur les heures -->
  <g class="p-halo">
    <circle cx="58" cy="62" r="50" fill="url(#xlHalo)"/>
    <circle cx="58" cy="62" r="50" fill="none" stroke="#ffe08a" stroke-width="1.5" stroke-opacity=".8"/>
    <circle cx="58" cy="62" r="45" fill="none" stroke="#bfe0ff" stroke-width=".8" stroke-opacity=".5" stroke-dasharray="2 3"/>
    <g class="p-ticks" stroke="#cfe6ff" stroke-width="1" stroke-opacity=".55" stroke-linecap="round"><path d="M62.6 18.2 L62.8 16.3"/><path d="M67.1 19.0 L67.6 17.0"/><path d="M71.6 20.2 L72.2 18.3"/><path d="M75.9 21.8 L76.7 20.0"/><path d="M83.9 26.4 L85.0 24.8"/><path d="M87.4 29.3 L88.8 27.8"/><path d="M90.7 32.6 L92.2 31.2"/><path d="M93.6 36.1 L95.2 35.0"/><path d="M98.2 44.1 L100.0 43.3"/><path d="M99.8 48.4 L101.7 47.8"/><path d="M101.0 52.9 L103.0 52.4"/><path d="M101.8 57.4 L103.7 57.2"/><path d="M101.8 66.6 L103.7 66.8"/><path d="M101.0 71.1 L103.0 71.6"/><path d="M99.8 75.6 L101.7 76.2"/><path d="M98.2 79.9 L100.0 80.7"/><path d="M93.6 87.9 L95.2 89.0"/><path d="M90.7 91.4 L92.2 92.8"/><path d="M87.4 94.7 L88.8 96.2"/><path d="M83.9 97.6 L85.0 99.2"/><path d="M75.9 102.2 L76.7 104.0"/><path d="M71.6 103.8 L72.2 105.7"/><path d="M67.1 105.0 L67.6 107.0"/><path d="M62.6 105.8 L62.8 107.7"/><path d="M53.4 105.8 L53.2 107.7"/><path d="M48.9 105.0 L48.4 107.0"/><path d="M44.4 103.8 L43.8 105.7"/><path d="M40.1 102.2 L39.3 104.0"/><path d="M32.1 97.6 L31.0 99.2"/><path d="M28.6 94.7 L27.2 96.2"/><path d="M25.3 91.4 L23.8 92.8"/><path d="M22.4 87.9 L20.8 89.0"/><path d="M17.8 79.9 L16.0 80.7"/><path d="M16.2 75.6 L14.3 76.2"/><path d="M15.0 71.1 L13.0 71.6"/><path d="M14.2 66.6 L12.3 66.8"/><path d="M14.2 57.4 L12.3 57.2"/><path d="M15.0 52.9 L13.0 52.4"/><path d="M16.2 48.4 L14.3 47.8"/><path d="M17.8 44.1 L16.0 43.3"/><path d="M22.4 36.1 L20.8 35.0"/><path d="M25.3 32.6 L23.8 31.2"/><path d="M28.6 29.3 L27.2 27.8"/><path d="M32.1 26.4 L31.0 24.8"/><path d="M40.1 21.8 L39.3 20.0"/><path d="M44.4 20.2 L43.8 18.3"/><path d="M48.9 19.0 L48.4 17.0"/><path d="M53.4 18.2 L53.2 16.3"/></g>
    <g class="p-hours" stroke="#ffe08a" stroke-opacity=".7" stroke-linecap="round"><path d="M58.0 23.5 L58.0 20.0" stroke-width="2.2"/><path d="M77.2 28.7 L79.0 25.6" stroke-width="2.2"/><path d="M91.3 42.8 L94.4 41.0" stroke-width="2.2"/><path d="M96.5 62.0 L100.0 62.0" stroke-width="2.2"/><path d="M91.3 81.2 L94.4 83.0" stroke-width="2.2"/><path d="M77.2 95.3 L79.0 98.4" stroke-width="2.2"/><path d="M58.0 100.5 L58.0 104.0" stroke-width="2.2"/><path d="M38.8 95.3 L37.0 98.4" stroke-width="2.2"/><path d="M24.7 81.2 L21.6 83.0" stroke-width="2.2"/><path d="M19.5 62.0 L16.0 62.0" stroke-width="2.2"/><path d="M24.7 42.8 L21.6 41.0" stroke-width="2.2"/><path d="M38.7 28.7 L37.0 25.6" stroke-width="2.2"/></g>
    <g class="p-pips" fill="#ffd96a" stroke="#6a4208" stroke-width=".8"><circle class="p-pip" style="--i:0" cx="58.0" cy="15.0" r="2.7"/><circle class="p-pip" style="--i:1" cx="81.5" cy="21.3" r="2.7"/><circle class="p-pip" style="--i:2" cx="98.7" cy="38.5" r="2.7"/><circle class="p-pip" style="--i:3" cx="105.0" cy="62.0" r="2.7"/><circle class="p-pip" style="--i:4" cx="98.7" cy="85.5" r="2.7"/><circle class="p-pip" style="--i:5" cx="81.5" cy="102.7" r="2.7"/><circle class="p-pip" style="--i:6" cx="58.0" cy="109.0" r="2.7"/><circle class="p-pip" style="--i:7" cx="34.5" cy="102.7" r="2.7"/><circle class="p-pip" style="--i:8" cx="17.3" cy="85.5" r="2.7"/><circle class="p-pip" style="--i:9" cx="11.0" cy="62.0" r="2.7"/><circle class="p-pip" style="--i:10" cx="17.3" cy="38.5" r="2.7"/><circle class="p-pip" style="--i:11" cx="34.5" cy="21.3" r="2.7"/></g>
    <g class="p-cogA" fill="#9fc4ff" fill-opacity=".35" stroke="#dbeaff" stroke-opacity=".5" stroke-width=".8"><path d="M45.0,92.0 L47.0,94.2 L46.3,96.3 L43.5,97.0 L42.4,98.4 L42.2,101.3 L40.3,102.3 L37.8,100.8 L36.0,101.0 L33.8,103.0 L31.7,102.3 L31.0,99.5 L29.6,98.4 L26.7,98.2 L25.7,96.3 L27.2,93.8 L27.0,92.0 L25.0,89.8 L25.7,87.7 L28.5,87.0 L29.6,85.6 L29.8,82.7 L31.7,81.7 L34.2,83.2 L36.0,83.0 L38.2,81.0 L40.3,81.7 L41.0,84.5 L42.4,85.6 L45.3,85.8 L46.3,87.7 L44.8,90.2Z M39,92 a3,3 0 1 0 -6,0 a3,3 0 1 0 6,0Z"/></g>
    <g class="p-cogB" fill="#9fc4ff" fill-opacity=".3" stroke="#dbeaff" stroke-opacity=".5" stroke-width=".8"><path d="M93.0,38.0 L94.6,40.0 L93.9,41.8 L91.5,42.4 L90.4,43.5 L89.8,45.9 L88.0,46.6 L86.0,45.0 L84.4,44.8 L82.2,45.9 L80.5,44.9 L80.5,42.4 L79.7,41.0 L77.4,40.0 L77.2,38.0 L79.2,36.4 L79.7,35.0 L79.1,32.5 L80.5,31.1 L83.0,31.7 L84.4,31.2 L86.0,29.2 L88.0,29.4 L89.0,31.7 L90.4,32.5 L92.9,32.5 L93.9,34.2 L92.8,36.4Z M88.4,38 a2.4,2.4 0 1 0 -4.8,0 a2.4,2.4 0 1 0 4.8,0Z"/></g>
    <g class="p-hh" stroke="#ffe9a0" stroke-width="3" stroke-linecap="round" fill="none"><path d="M58 62 L58 38"/><path d="M58 38 l-3 5 h6Z" fill="#ffe9a0" stroke-width="1"/></g>
    <g class="p-mh" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M58 68 L58 25"/><path d="M58 25 l-2.4 5 h4.8Z" fill="#fff" stroke-width=".8"/></g>
  </g>

  <!-- cape -->
  <g class="p-cape" stroke="#0c1442" stroke-width="2" stroke-linejoin="round">
    <path d="M55 57 Q40 62 32 84 L25 108 L37 101 L41 112 L51 96 L58 76Z" fill="url(#xlCape)"/>
    <path d="M53 66 Q43 74 38 90 L42 98 L47 90 L50 96 L56 80Z" fill="url(#xlLining)" stroke="none" opacity=".7"/>
    <path d="M32 98 l3 -1 M36 90 l3 -2 M42 82 l2 -3" stroke="#bfe6ff" stroke-opacity=".7" stroke-width="1.2" stroke-linecap="round"/>
    <circle cx="28" cy="104" r="1.2" fill="#fff" stroke="none"/><circle cx="40" cy="108" r=".9" fill="#fff" stroke="none"/><circle cx="35" cy="84" r="1" fill="#fff" stroke="none"/>
  </g>

  <!-- cheveux argentés -->
  <g class="p-hair" stroke="#3a4670" stroke-width="1.6" stroke-linejoin="round">
    <path d="M48 34 Q36 38 34 52 Q33 62 38 70 Q40 62 42 58 Q43 66 42 74 Q50 64 48 52 Q50 44 54 40Z" fill="url(#xlHair)"/>
    <path d="M40 50 Q38 58 40 64 M45 48 Q44 56 45 62" fill="none" stroke="#9aa8d0" stroke-opacity=".7" stroke-width="1" stroke-linecap="round"/>
  </g>

  <!-- jambes fines et bottes pointues -->
  <g stroke="#0c1442" stroke-width="2" stroke-linejoin="round">
    <path d="M55 94 h7 l-1 16 h-6Z" fill="#162070"/>
    <path d="M65 94 h7 l1 16 h-7Z" fill="#162070"/>
    <path d="M52 108 h10 v5 q6 0 9 4 h-19 q-2 -1 0 -9Z" fill="url(#xlBoot)"/>
    <path d="M65 108 h10 v5 q6 0 9 4 h-19 q-2 -1 0 -9Z" fill="url(#xlBoot)"/>
    <path d="M52 110 h10 M65 110 h10" stroke="#ffd24a" stroke-width="2"/>
  </g>

  <!-- main arrière : une montre flotte au creux de la paume -->
  <g class="p-armB">
    <path d="M55 61 Q44 64 38 76 Q40 82 45 80 Q48 72 56 69Z" fill="url(#xlRobe)" stroke="#0c1442" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M36 80 q-3 -4 1 -6 q4 -1 6 3 q1 4 -3 5Z" fill="url(#xlSkin)" stroke="#2a1a0a" stroke-width="1.6" stroke-linejoin="round"/>
    <g class="p-watch">
      <circle cx="30" cy="66" r="8" fill="url(#xlBrass)" stroke="#5a3a08" stroke-width="1.4"/>
      <circle cx="30" cy="66" r="6" fill="url(#xlFace)" stroke="#8a5a14" stroke-width=".8"/>
      <path d="M30 59 v-3.4 M28.4 55.6 h3.2" stroke="#8a5a14" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <g class="p-wmh" stroke="#1a2680" stroke-width="1" stroke-linecap="round"><path d="M30 66 V61.4"/></g>
      <g class="p-wh" stroke="#1a2680" stroke-width="1.4" stroke-linecap="round"><path d="M30 66 L33 67.6"/></g>
      <circle cx="30" cy="66" r="1" fill="#c8301a"/>
    </g>
  </g>

  <!-- bras avant et bâton au sablier -->
  <g class="p-arm">
    <path d="M70 67 Q77 69 82 77 Q84 81 90 83 L94 81 Q93 75 89 71 Q82 63 72 61Z" fill="url(#xlRobe)" stroke="#0c1442" stroke-width="2" stroke-linejoin="round"/>
    <path d="M82 75 Q86 83 93 82 L93 74Z" fill="#1a2680" stroke="#0c1442" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M82 76 Q86 83 92 82" fill="none" stroke="url(#xlGold)" stroke-width="1.4"/>
    <path d="M88 73 q-1 5 1 9 q5 3 10 0 q2 -5 -1 -9 q-5 -2 -10 0Z" fill="url(#xlSkin)" stroke="#2a1a0a" stroke-width="1.5" stroke-linejoin="round"/>
    <g class="p-staff">
      <path d="M94 20 L94 117" stroke="#2a1a0a" stroke-width="5.6" stroke-linecap="round"/>
      <path d="M94 20 L94 117" stroke="url(#xlStaff)" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M94 100 l0 -3" stroke="#ffd24a" stroke-width="3.4"/>
      <path d="M92 104 l4 0 M92 108 l4 0" stroke="#5a3a12" stroke-width="1" stroke-opacity=".7"/>
      <!-- sablier -->
      <g class="p-glass">
        <path d="M86 4 h16 M86 30 h16" stroke="#2a1a0a" stroke-width="5.6" stroke-linecap="round"/>
        <path d="M86 4 h16 M86 30 h16" stroke="url(#xlGold)" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M88 6 Q88 14 94 17 Q100 14 100 6Z M94 17 Q88 20 88 28 H100 Q100 20 94 17Z" fill="url(#xlGlass)" stroke="#d8ecff" stroke-width="1.2" stroke-linejoin="round"/>
        <g class="p-sandU"><path d="M89.4 7 Q89.6 13 94 15.6 Q98.4 13 98.6 7Z" fill="url(#xlSand)"/></g>
        <g class="p-sandD"><path d="M94 21 Q90 23 89.6 27.4 H98.4 Q98 23 94 21Z" fill="url(#xlSand)"/></g>
        <path class="p-drip" d="M94 16 V26" stroke="#ffd96a" stroke-width="1.1" stroke-linecap="round" stroke-dasharray="1.6 3"/>
        <path d="M86 4 v26 M102 4 v26" stroke="#ffd24a" stroke-width="1.6" stroke-linecap="round"/>
        <circle class="p-gem" cx="94" cy="2.4" r="2.4" fill="#bfe8ff" stroke="#2a6ad8" stroke-width="1"/>
      </g>
      <circle class="p-glow" cx="94" cy="17" r="14" fill="#9fd4ff" opacity="0"/>
    </g>
    <g fill="url(#xlSkin)" stroke="#2a1a0a" stroke-width="1.2"><rect x="90.2" y="73.6" width="9.4" height="3.2" rx="1.6"/><rect x="90.6" y="77.2" width="9.4" height="3.2" rx="1.6"/><rect x="91" y="80.6" width="8.4" height="3" rx="1.5"/></g>
  </g>

  <g class="p-torso">
    <!-- redingote longue et fine -->
    <path d="M54 56 Q51 70 55 80 Q51 88 49 97 Q63 102 77 97 Q75 88 71 80 Q75 70 72 56 Q63 51 54 56Z" fill="url(#xlRobe)" stroke="#0c1442" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M63 70 Q62 84 62 98" fill="none" stroke="#bfe0ff" stroke-opacity=".35" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M50 94 Q63 99 76 94" fill="none" stroke="url(#xlGold)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M51 97 Q63 101 75 97" fill="none" stroke="#ffd24a" stroke-opacity=".5" stroke-width="1" stroke-dasharray="1 4" stroke-linecap="round"/>
    <!-- gilet et ceinture -->
    <path d="M57 59 Q63 65 69 59 L68 70 Q63 74 58 70Z" fill="url(#xlFace)" stroke="#0c1442" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M55 79 Q63 83 71 79 L71 84 Q63 88 55 84Z" fill="#0f1a5a" stroke="#0c1442" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M55 79 Q63 83 71 79" fill="none" stroke="url(#xlGold)" stroke-width="1.5"/>
    <g class="p-cog2" fill="url(#xlBrass)" stroke="#5a3a08" stroke-width="1"><path d="M68.0,83.0 L69.3,84.2 L68.9,85.4 L67.2,85.8 L66.5,86.5 L66.6,88.3 L65.4,88.9 L64.0,87.9 L63.0,88.0 L61.8,89.3 L60.6,88.9 L60.2,87.2 L59.5,86.5 L57.7,86.6 L57.1,85.4 L58.1,84.0 L58.0,83.0 L56.7,81.8 L57.1,80.6 L58.8,80.2 L59.5,79.5 L59.4,77.7 L60.6,77.1 L62.0,78.1 L63.0,78.0 L64.2,76.7 L65.4,77.1 L65.8,78.8 L66.5,79.5 L68.3,79.4 L68.9,80.6 L67.9,82.0Z M64.8,83 a1.8,1.8 0 1 0 -3.6,0 a1.8,1.8 0 1 0 3.6,0Z"/></g>
    <circle cx="63" cy="83" r="1.1" fill="#ffe9a0"/>
    <!-- chaîne de montre -->
    <path d="M69 85 Q73 88 69 90" fill="none" stroke="url(#xlGold)" stroke-width="1.3" stroke-linecap="round"/>
    <g class="p-fob"><circle cx="69" cy="92" r="3.2" fill="url(#xlFace)" stroke="#8a5a14" stroke-width="1.1"/><path d="M69 92 v-2 M69 92 h1.4" stroke="#2a3a8a" stroke-width=".9" stroke-linecap="round"/></g>
    <!-- épaulette à engrenage et col -->
    <path d="M50 59 Q55 52 61 55 L59 62 Q53 61 51 65Z" fill="url(#xlRobe)" stroke="#0c1442" stroke-width="1.7" stroke-linejoin="round"/>
    <g class="p-cog1" fill="url(#xlBrass)" stroke="#5a3a08" stroke-width="1"><path d="M58.4,58.0 L59.7,59.1 L59.4,60.2 L57.7,60.4 L57.1,61.1 L57.2,62.8 L56.2,63.4 L54.9,62.3 L54.0,62.4 L52.9,63.7 L51.8,63.4 L51.6,61.7 L50.9,61.1 L49.2,61.2 L48.6,60.2 L49.7,58.9 L49.6,58.0 L48.3,56.9 L48.6,55.8 L50.3,55.6 L50.9,54.9 L50.8,53.2 L51.8,52.6 L53.1,53.7 L54.0,53.6 L55.1,52.3 L56.2,52.6 L56.4,54.3 L57.1,54.9 L58.8,54.8 L59.4,55.8 L58.3,57.1Z M55.5,58 a1.5,1.5 0 1 0 -3.0,0 a1.5,1.5 0 1 0 3.0,0Z"/></g>
    <path d="M57 55 Q63 60 70 55 L71 50 Q63 54 56 50Z" fill="#1a2680" stroke="#0c1442" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M56 51 Q63 55 71 51" fill="none" stroke="url(#xlGold)" stroke-width="1.4" stroke-linecap="round"/>
  </g>

  <!-- tête -->
  <g class="p-face">
    <ellipse cx="63" cy="42" rx="10.4" ry="11.8" fill="url(#xlSkin)" stroke="#2a1a0a" stroke-width="2"/>
    <path d="M52 40 Q56 30 66 30 Q74 31 76 38 Q66 34 52 40Z" fill="url(#xlHair)" stroke="#3a4670" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M55 36 Q58 32 64 32 M61 35 Q65 32 70 33" fill="none" stroke="#8d9cc0" stroke-width=".9" stroke-linecap="round" stroke-opacity=".8"/>
    <g class="p-brow" stroke="#3a4670" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M54 37 q3 -1.6 6 0"/><path d="M65 36.4 q3.4 -1.8 7 .2"/></g>
    <g class="p-eye">
      <ellipse cx="57.4" cy="42" rx="2.8" ry="3.4" fill="#fff" stroke="#2a1a0a" stroke-width="1.2"/><circle cx="58.4" cy="42.4" r="2" fill="#2a8aff"/><circle cx="58.4" cy="42.4" r="1" fill="#0a2a6a"/><circle cx="59" cy="41.2" r=".7" fill="#fff"/>
      <ellipse cx="68.6" cy="41.6" rx="3" ry="3.6" fill="#fff" stroke="#2a1a0a" stroke-width="1.2"/><circle cx="69.8" cy="42" r="2.2" fill="#2a8aff"/><circle cx="69.8" cy="42" r="1.1" fill="#0a2a6a"/><circle cx="70.5" cy="40.8" r=".8" fill="#fff"/>
    </g>
    <path d="M72.4 46 q2.2 1.4 .6 3" fill="none" stroke="#2a1a0a" stroke-width="1.4" stroke-linecap="round"/>
    <path class="p-mouth" d="M62 50.4 q4 2.6 8 .4" fill="none" stroke="#8a3a2a" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="55.4" cy="47.6" rx="2.4" ry="1.4" fill="#ff8a7a" opacity=".4"/><ellipse cx="70.6" cy="47.2" rx="2.4" ry="1.4" fill="#ff8a7a" opacity=".4"/>
    <!-- chapeau pointu à cadran -->
    <g class="p-hat">
      <path d="M44 32 Q62 38 82 31 Q70 24 62 24 Q52 25 44 32Z" fill="#1a2680" stroke="#0c1442" stroke-width="2" stroke-linejoin="round"/>
      <path d="M48 31 C48 18 42 9 24 5 C40 3 58 8 67 17 C73 23 78 28 80 31Z" fill="url(#xlHat)" stroke="#0c1442" stroke-width="2" stroke-linejoin="round"/>
      <path d="M54 27 Q54 16 42 9" fill="none" stroke="#9fbcff" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M46 31 Q62 36 80 30" fill="none" stroke="url(#xlGold)" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M46 31 Q62 36 80 30" fill="none" stroke="#6a4208" stroke-width=".8" stroke-opacity=".6" stroke-dasharray="1 3.4"/>
      <circle cx="66" cy="22.6" r="7" fill="url(#xlBrass)" stroke="#5a3a08" stroke-width="1.4"/>
      <circle cx="66" cy="22.6" r="5.4" fill="url(#xlFace)" stroke="#8a5a14" stroke-width=".8"/>
      <path d="M66 18 v1.6 M66 27.2 v-1.6 M61.4 22.6 h1.6 M70.6 22.6 h-1.6" stroke="#8a5a14" stroke-width="1" stroke-linecap="round"/>
      <g class="p-hmh" stroke="#1a2680" stroke-width="1" stroke-linecap="round"><path d="M66 22.6 V18.6"/></g>
      <g class="p-hhh" stroke="#1a2680" stroke-width="1.4" stroke-linecap="round"><path d="M66 22.6 L68.8 24"/></g>
      <circle cx="66" cy="22.6" r=".9" fill="#c8301a"/>
      <g class="p-charm"><path d="M25 5 q-3 3 -3 8" fill="none" stroke="#ffd24a" stroke-width="1.2" stroke-linecap="round"/><path d="M25.2,15.0 L26.1,16.1 L25.6,17.1 L24.3,17.3 L23.6,17.8 L23.1,19.1 L22.0,19.2 L21.2,18.1 L20.4,17.8 L19.0,18.0 L18.4,17.1 L18.9,15.8 L18.8,15.0 L17.9,13.9 L18.4,12.9 L19.7,12.7 L20.4,12.2 L20.9,10.9 L22.0,10.8 L22.8,11.9 L23.6,12.2 L25.0,12.0 L25.6,12.9 L25.1,14.2Z M23,15 a1,1 0 1 0 -2,0 a1,1 0 1 0 2,0Z" fill="url(#xlBrass)" stroke="#5a3a08" stroke-width=".8"/></g>
    </g>
  </g>
  <g class="p-spark"><path d="M104 40 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6Z" fill="#fff6c0"/><path d="M18 52 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2Z" fill="#bfe6ff"/></g>
</svg>`,

/* ---- SACRIEUR ---- berserker : crâne cornu en Berserk à 6 Stigmates, runes-cicatrices, grande lame crantée ---- */
sacrieur: `<svg class="hs hs-sacrieur" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <radialGradient id="scSkin" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#f6c49a"/><stop offset=".65" stop-color="#d98c5c"/><stop offset="1" stop-color="#a85a38"/></radialGradient>
    <linearGradient id="scRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e04040"/><stop offset=".55" stop-color="#a32226"/><stop offset="1" stop-color="#5a0c12"/></linearGradient>
    <linearGradient id="scDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a1a22"/><stop offset="1" stop-color="#2a060c"/></linearGradient>
    <linearGradient id="scSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a727e"/><stop offset=".45" stop-color="#e4e9f0"/><stop offset="1" stop-color="#58606c"/></linearGradient>
    <linearGradient id="scBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#c8b088"/></linearGradient>
    <linearGradient id="scLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a4a2a"/><stop offset="1" stop-color="#3e1c0e"/></linearGradient>
    <linearGradient id="scFire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff2a1a"/><stop offset=".6" stop-color="#ff8a2a"/><stop offset="1" stop-color="#ffe08a"/></linearGradient>
    <radialGradient id="scAura" cx="50%" cy="55%" r="55%"><stop offset="0" stop-color="#ff5a3a" stop-opacity=".55"/><stop offset=".6" stop-color="#d81a1a" stop-opacity=".3"/><stop offset="1" stop-color="#d81a1a" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="120" rx="30" ry="5" fill="#000" opacity=".34"/>
  <circle class="p-aura" cx="62" cy="64" r="62" fill="url(#scAura)" opacity="0"/>
  <g class="p-orbit"><circle cx="62" cy="70" r="46" fill="none" stroke="#c81420" stroke-width="1.6" stroke-dasharray="2 5" opacity=".7"/><path d="M108.0 70.0 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/><path d="M85.0 109.8 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/><path d="M39.0 109.8 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/><path d="M16.0 70.0 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/><path d="M39.0 30.2 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/><path d="M85.0 30.2 m-2.6 0 q2.6 -7 5.2 0 q-2.6 3.6 -5.2 0Z" fill="#e0242c" stroke="#5a0610" stroke-width=".9"/></g>
  <g class="p-rage p-tendrils" fill="none" stroke="#c81420" stroke-width="3.4" stroke-linecap="round"><path d="M44 56 Q22 48 16 28 Q14 18 22 12"/><path d="M40 66 Q14 62 6 44"/><path d="M82 52 Q106 40 110 22 Q111 14 104 8"/><path d="M88 60 Q116 52 120 36"/></g>
  <!-- crinière de flammes (Berserk) -->
  <g class="p-rage p-mane"><path d="M38 36 L26 14 L40 24 L36 2 L50 20 L54 -2 L62 18 L74 0 L74 22 L90 8 L82 30 L98 26 L84 44Z" fill="url(#scFire)" stroke="#7a1408" stroke-width="1.4" stroke-linejoin="round"/><path d="M50 30 L46 14 L56 24 L60 8 L66 24 L76 12 L74 30Z" fill="#ffe9a0" opacity=".7"/></g>
  <!-- cape en lambeaux -->
  <g class="p-cape" stroke="#2a0608" stroke-width="2" stroke-linejoin="round">
    <path d="M42 54 Q24 62 18 92 L10 114 L26 106 L32 118 L44 102 L54 80Z" fill="url(#scDark)"/>
    <path d="M30 70 l4 8 M24 86 l5 6 M36 90 l2 9" stroke="#e04040" stroke-opacity=".5" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </g>
  <!-- jambes, bandages, bottes cloutées -->
  <g stroke="#2a0608" stroke-width="2" stroke-linejoin="round">
    <path d="M50 92 h12 l-1 19 h-11Z" fill="url(#scDark)"/>
    <path d="M65 92 h13 l1 19 h-13Z" fill="url(#scDark)"/>
    <path d="M49 100 h13 M49 105 h12 M66 100 h13 M66 105 h13" stroke="#e9d9b8" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <path d="M46 110 h16 v5 q9 0 12 5 h-28 q-2 -2 0 -10Z" fill="url(#scLeather)"/>
    <path d="M64 110 h16 v5 q9 0 12 5 h-28 q-2 -2 0 -10Z" fill="url(#scLeather)"/>
    <path d="M49 110 l2 -4 l2 4 M68 110 l2 -4 l2 4" fill="url(#scSteel)" stroke="#2a0608" stroke-width="1.2"/>
  </g>
  <!-- bras arrière : poing serré, brassard à pointes -->
  <g class="p-armB">
    <path d="M42 58 Q30 62 25 77 L35 83 Q38 71 47 66Z" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2" stroke-linejoin="round"/>
    <path d="M28 70 L38 66 M27 74 L37 71 M26 78 L36 76" stroke="#e9d9b8" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <circle cx="27" cy="85" r="7" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2"/>
    <path d="M23 83 h8 M23 86 h8" stroke="#2a0608" stroke-width="1.2" opacity=".6"/>
    <g class="p-rage p-tattoo" fill="none" stroke="#ff3a2a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M44 60 Q36 62 31 70 M42 64 Q35 68 33 76 M40 68 l-6 2 M38 72 l-5 3"/></g>
  </g>
  <g class="p-torso">
    <!-- torse massif -->
    <path d="M37 56 Q62 47 88 56 L82 90 Q62 97 44 90Z" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2.2" stroke-linejoin="round"/>
    <g class="p-runes" fill="none" stroke-linecap="round" stroke-linejoin="round"><path class="p-rune" style="--i:0" d="M48 62 l5 3 l-3 4 l6 3"/><path class="p-rune" style="--i:1" d="M76 62 l-5 3 l3 4 l-6 3"/><path class="p-rune" style="--i:2" d="M56 74 l4 2 l-2 4 l5 2"/><path class="p-rune" style="--i:3" d="M70 74 l-4 2 l2 4 l-5 2"/><path class="p-rune" style="--i:4" d="M46 78 l4 3 l-3 3"/><path class="p-rune" style="--i:5" d="M80 78 l-4 3 l3 3"/></g>
    <path d="M62 58 V90" stroke="#a85a38" stroke-opacity=".5" stroke-width="1.4"/>
    <path d="M52 66 Q62 71 72 66 M53 74 Q62 79 71 74" fill="none" stroke="#a85a38" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
    <!-- torse nu : pectoraux, abdos, tatouages tribaux qui se dessinent en Berserk -->
    <path d="M47 62 Q54 70 62 66 Q70 70 77 62" fill="none" stroke="#a85a38" stroke-opacity=".7" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M62 66 V90 M53 76 Q62 79 71 76 M54 82 Q62 85 70 82" fill="none" stroke="#a85a38" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M46 58 Q41 70 46 84 M78 58 Q83 70 78 84" fill="none" stroke="#8a4628" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
    <g class="p-rage p-tattoo" fill="none" stroke="#ff3a2a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M62 56 V88"/><path d="M62 62 Q50 60 46 70 Q44 78 52 82 Q50 74 56 70 Q52 66 62 64"/><path d="M62 62 Q74 60 78 70 Q80 78 72 82 Q74 74 68 70 Q72 66 62 64"/>
      <path d="M54 88 Q58 80 62 84 Q66 80 70 88"/><path d="M44 62 q6 -6 12 -4 M80 62 q-6 -6 -12 -4"/><path d="M50 74 l-6 4 M74 74 l6 4"/>
    </g>
    <!-- ceinture, boucle-crâne -->
    <path d="M44 88 h38 v8 h-38Z" fill="url(#scLeather)" stroke="#2a0608" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="63" cy="92" r="5" fill="url(#scBone)" stroke="#2a0608" stroke-width="1.4"/><circle cx="61.2" cy="91.4" r="1.2" fill="#2a0608"/><circle cx="64.8" cy="91.4" r="1.2" fill="#2a0608"/><path d="M62 94.4 h2" stroke="#2a0608" stroke-width="1"/>
    <g class="p-chain"><path d="M48 96 Q46 104 50 108 M78 96 Q80 104 76 108" fill="none" stroke="url(#scSteel)" stroke-width="2.4" stroke-dasharray="3 1.6" stroke-linecap="round"/></g>
    <circle cx="41" cy="58" r="7.6" fill="url(#scSkin)" stroke="#2a0608" stroke-width="1.8"/><path d="M36 56 q5 4 10 0" fill="none" stroke="#a85a38" stroke-opacity=".6" stroke-width="1.2" stroke-linecap="round"/>
    <g class="p-rage p-tattoo" fill="none" stroke="#ff3a2a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M35 58 Q41 50 47 58 Q41 62 35 58 M38 58 Q41 54 44 58"/></g>
    <path d="M52 52 Q62 58 74 52 L76 50 Q62 56 50 50Z" fill="url(#scSkin)" stroke="#2a0608" stroke-width="1.4" stroke-linejoin="round"/>
    <g class="p-rageskin" fill="#ff2a1a" opacity="0"><path d="M37 56 Q62 47 88 56 L82 90 Q62 97 44 90Z"/></g>
  </g>
  <!-- bras avant : poing nu cloué, chaîne enroulée, sang qui bouillonne -->
  <g class="p-arm">
    <path d="M80 58 Q94 60 101 72 L92 80 Q88 70 78 66Z" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2" stroke-linejoin="round"/>
    <path d="M84 64 L94 70 M82 68 L91 75 M80 72 L88 79" stroke="#e9d9b8" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <g class="p-chainW"><path d="M88 74 Q94 92 90 104 Q88 110 92 114" fill="none" stroke="#2a0608" stroke-width="4.4" stroke-linecap="round"/><path d="M88 74 Q94 92 90 104 Q88 110 92 114" fill="none" stroke="url(#scSteel)" stroke-width="2.6" stroke-dasharray="3.4 1.8" stroke-linecap="round"/><path d="M90 114 l4 5 l-1 -7Z" fill="url(#scSteel)" stroke="#2a0608" stroke-width="1"/></g>
    <circle class="p-bloodfist" cx="105" cy="76" r="16" fill="#ff2a1a" opacity="0"/>
    <circle cx="105" cy="76" r="9.4" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2.2"/>
    <path d="M99 72 h12 M99 76 h12 M99.6 80 h10.8" stroke="#2a0608" stroke-width="1.2" opacity=".65"/>
    <path class="p-drip" d="M101 84 V89 M107 85 V92 M104 86 V90" stroke="#c81420" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="3 5"/>
    <g class="p-rage p-fistfire"><path d="M96 70 Q92 58 100 50 Q100 60 106 56 Q104 64 112 62 Q110 70 116 74 Q110 84 100 84 Q94 80 96 70Z" fill="url(#scFire)" stroke="#7a1408" stroke-width="1.2" stroke-linejoin="round" opacity=".92"/><path d="M100 76 Q99 68 104 64 Q104 70 109 70 Q108 76 104 80Z" fill="#ffe9a0" opacity=".85"/></g>
    <circle cx="84" cy="57" r="8.6" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2"/><path d="M78 54 q6 5 12 0" fill="none" stroke="#a85a38" stroke-opacity=".6" stroke-width="1.2" stroke-linecap="round"/>
    <g class="p-rage p-tattoo" fill="none" stroke="#ff3a2a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M77 57 Q84 48 91 57 Q84 62 77 57 M80 57 Q84 52 88 57"/><path d="M86 62 Q94 66 98 74 M84 66 Q90 72 90 78 M92 64 l5 -2"/></g>
  </g>
  <!-- tête -->
  <g class="p-face">
    <ellipse cx="63" cy="37" rx="11.6" ry="12.2" fill="url(#scSkin)" stroke="#2a0608" stroke-width="2"/>
    <path class="p-war" d="M54 42 l4 2 M54 45 l4 1.6 M72 42 l-4 2 M72 45 l-4 1.6" stroke="#b81822" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    <path d="M54 28 L58 42" stroke="#8a1c24" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M53 33 l3 .8 M55 38 l3 .8" stroke="#e9d9b8" stroke-width="1" stroke-linecap="round"/>
    <g class="p-brow" stroke="#2a0608" stroke-width="2.4" stroke-linecap="round" fill="none"><path d="M54 33 L61 36"/><path d="M73 33 L65.4 36"/></g>
    <g class="p-eye"><ellipse cx="58" cy="38.4" rx="2.9" ry="2.6" fill="#fff" stroke="#2a0608" stroke-width="1.2"/><circle cx="58.6" cy="38.6" r="1.7" fill="#d81a1a"/><circle cx="58.6" cy="38.6" r=".8" fill="#2a0608"/>
      <ellipse cx="69" cy="38.2" rx="3" ry="2.7" fill="#fff" stroke="#2a0608" stroke-width="1.2"/><circle cx="69.8" cy="38.4" r="1.8" fill="#d81a1a"/><circle cx="69.8" cy="38.4" r=".9" fill="#2a0608"/></g>
    <g class="p-rage p-eyeglow"><circle cx="58.6" cy="38.6" r="5" fill="#ff5a2a" opacity=".6"/><circle cx="69.8" cy="38.4" r="5.2" fill="#ff5a2a" opacity=".6"/></g>
    <path d="M65 40 l-1 5 l3 .6" fill="none" stroke="#2a0608" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="p-mouth"><path d="M57 47 Q63 51 70 47 L69 50.6 Q63 54 58 50.6Z" fill="#3a0a10" stroke="#2a0608" stroke-width="1.4" stroke-linejoin="round"/><path d="M59 47.8 l1 2.4 l1.4 -2.2 M64 49 l1.2 2.4 l1.4 -2.4" fill="#fff6dc" stroke="none"/></g>
    <!-- cheveux courts et couronne d'épines (plus fournie en Berserk) -->
    <path d="M51 35 Q49 24 63 22.5 Q77 24 75 35 Q71 29 63 28.4 Q55 29 51 35Z" fill="url(#scDark)" stroke="#2a0608" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M56 26 l1.4 -4 M63 24 l0 -4.4 M70 26 l-1.4 -4" stroke="#3a0a10" stroke-width="1.6" stroke-linecap="round"/>
    <g class="p-crown">
      <path d="M50 33 Q63 23 76 33" fill="none" stroke="#2a0608" stroke-width="5" stroke-linecap="round"/>
      <path d="M50 33 Q63 23 76 33" fill="none" stroke="#5a3a1c" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 33 Q63 23 76 33" fill="none" stroke="#9a6a3a" stroke-width="1" stroke-dasharray="2 2.6" stroke-linecap="round"/>
      <path d="M50.7 32.4 L49.6 27.7 L53.4 30.7Z M54.3 30.2 L53.9 25.3 L57.2 28.9Z M57.8 28.7 L58.4 23.9 L60.9 28.1Z M61.4 28.0 L63.0 23.4 L64.6 28.0Z M65.1 28.1 L67.6 23.9 L68.2 28.7Z M68.8 28.9 L72.1 25.3 L71.7 30.2Z M72.6 30.7 L76.4 27.7 L75.3 32.4Z" fill="#e9d9b8" stroke="#2a0608" stroke-width="1.1" stroke-linejoin="round"/>
    </g>
    <g class="p-rage p-thorns2">
      <path d="M51 31 Q63 21 75 31" fill="none" stroke="#2a0608" stroke-width="4.4" stroke-linecap="round"/><path d="M51 31 Q63 21 75 31" fill="none" stroke="#6a4020" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M48.3 34.3 L43.4 26.7 L51.7 31.7Z M52.1 31.4 L46.9 20.6 L55.7 29.5Z M55.5 29.5 L53.3 20.8 L59.5 28.2Z M59.1 28.3 L58.4 16.3 L63.3 27.9Z M62.7 27.9 L67.3 19.3 L66.9 28.3Z M66.5 28.2 L73.6 17.9 L70.5 29.5Z M70.3 29.5 L77.7 23.2 L73.9 31.4Z M74.3 31.7 L84.5 24.4 L77.7 34.3Z" transform="translate(0 -1.5)" fill="url(#scBone)" stroke="#2a0608" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M50.4 32.6 L43.3 22.4 L53.2 30.8Z M53.9 30.4 L48.5 19.1 L57.0 29.0Z M57.4 28.8 L54.3 16.7 L60.8 28.1Z M61.3 28.0 L65.0 15.5 L64.7 28.0Z M65.2 28.1 L71.7 16.7 L68.6 28.8Z M69.0 29.0 L77.5 19.1 L72.1 30.4Z M72.8 30.8 L82.7 22.4 L75.6 32.6Z" transform="translate(0 -4)" fill="url(#scSteel)" stroke="#2a0608" stroke-width="1.3" stroke-linejoin="round"/>
      <path class="p-crowndrip" d="M56 33 Q55 40 57 44 M63 31 V37 M70 33 Q71 41 69 45" fill="none" stroke="#c81420" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="4 4"/>
    </g>
    <g class="p-rage p-horns"><path d="M52 31 Q42 26 40 12 Q38 4 44 2 Q41 12 50 22 Q54 26 56 28Z" fill="url(#scBone)" stroke="#2a0608" stroke-width="1.8" stroke-linejoin="round"/><path d="M76 31 Q86 26 88 12 Q90 4 84 2 Q87 12 78 22 Q74 26 72 28Z" fill="url(#scBone)" stroke="#2a0608" stroke-width="1.8" stroke-linejoin="round"/><path d="M45 8 Q43 14 50 22 M83 8 Q85 14 78 22" fill="none" stroke="#c8b088" stroke-width="1.2" stroke-linecap="round"/></g>
    <g class="p-rage p-tattoo" fill="none" stroke="#ff3a2a" stroke-width="1.5" stroke-linecap="round"><path d="M57 29 Q55 24 58 20 M69 29 Q71 24 68 20 M52 38 Q50 44 54 49 M74 38 Q76 44 72 49"/></g>
    <g class="p-rageskin" fill="#ff2a1a" opacity="0"><ellipse cx="63" cy="37" rx="11.6" ry="12.2"/></g>
  </g>
  <g class="p-steam"><path d="M46 20 q-3 -6 0 -10 q3 -4 0 -9 M80 22 q4 -6 0 -11 q-3 -4 0 -9" fill="none" stroke="#ffd0c0" stroke-width="2" stroke-linecap="round" opacity="0"/></g>
</svg>`,

/* ---- ZOBAL ---- maître des masques : trois masques interchangeables (Rieur, Pleureur, Farceur), aura de Ferveur, bâton étoilé ---- */
zobal: `<svg class="hs hs-zobal" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <linearGradient id="zbTun" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a566ea"/><stop offset=".6" stop-color="#6a30b8"/><stop offset="1" stop-color="#3e1a78"/></linearGradient>
    <linearGradient id="zbSlv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5ee0d4"/><stop offset="1" stop-color="#1f8a90"/></linearGradient>
    <linearGradient id="zbGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4b0"/><stop offset=".55" stop-color="#f0bc3a"/><stop offset="1" stop-color="#b8781a"/></linearGradient>
    <radialGradient id="zbSkin" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#ffe2c0"/><stop offset="1" stop-color="#d49060"/></radialGradient>
    <radialGradient id="zbMR" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#fff0b0"/><stop offset=".55" stop-color="#ffc83a"/><stop offset="1" stop-color="#d88a10"/></radialGradient>
    <radialGradient id="zbML" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#e4f4ff"/><stop offset=".55" stop-color="#8ec4f4"/><stop offset="1" stop-color="#3f78c8"/></radialGradient>
    <radialGradient id="zbMF" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#e8ffc4"/><stop offset=".55" stop-color="#9ae860"/><stop offset="1" stop-color="#3f9a2a"/></radialGradient>
    <radialGradient id="zbAura" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d8a8ff" stop-opacity=".75"/><stop offset=".6" stop-color="#a060f0" stop-opacity=".3"/><stop offset="1" stop-color="#a060f0" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="30" ry="5" fill="#000" opacity=".3"/>
  <circle class="p-aura" cx="62" cy="62" r="52" fill="url(#zbAura)"/>
  <g class="p-orbit"><g class="p-mini"><ellipse cx="62" cy="10" rx="4" ry="5" fill="url(#zbGold)" stroke="#1c0b3a" stroke-width="1.2"/><path d="M60 9.5h1.6M63 9.5h1.6M60.4 12q1.6 1.4 3.2 0" stroke="#1c0b3a" stroke-width=".9" fill="none"/></g></g>
  <g class="p-bag" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round">
    <path d="M50 60 Q34 60 22 70 Q20 76 26 74 Q36 70 48 70Z" fill="#ff6aa8"/>
    <path d="M50 64 Q38 70 30 84 Q30 90 35 86 Q42 78 50 72Z" fill="#ffd24a"/>
  </g>
  <g class="p-armB" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M52 62 Q42 68 42 80 L47 82 Q48 72 56 68Z" fill="url(#zbSlv)"/>
    <circle cx="44.5" cy="83" r="4.6" fill="url(#zbSkin)"/>
    <g class="p-spare"><ellipse cx="38" cy="86" rx="6" ry="7.4" fill="url(#zbMR)"/><path d="M35 84.5q1.6-1.6 3.2 0M39 84.5q1.6-1.6 3.2 0M35.4 89q2.6 2 5.4 0" stroke="#1c0b3a" stroke-width="1.2" fill="none"/></g>
  </g>
  <g stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M55 88 L51 108" stroke-width="11"/><path d="M55 88 L51 108" stroke="#e8508e" stroke-width="7"/>
    <path d="M69 88 L72 108" stroke-width="11"/><path d="M69 88 L72 108" stroke="#38c8c0" stroke-width="7"/>
    <path d="M42 112 Q42 105 51 106 L58 108 Q60 114 50 115 Q44 118 38 108 Q36 104 40 106Z" fill="url(#zbGold)"/>
    <path d="M66 108 Q76 105 80 110 Q84 106 88 100 Q91 106 86 114 Q78 116 66 114Z" fill="url(#zbGold)"/>
    <path d="M52 87 L56 107 M70 88 L72 107" stroke="#fff" stroke-width="1.4" opacity=".35"/>
  </g>
  <g class="p-torso">
    <path d="M47 58 Q62 52 78 58 L82 88 Q62 95 43 88Z" fill="url(#zbTun)" stroke="#1c0b3a" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M62 62 L69 72 L62 82 L55 72Z M54 78 L59 84 L54 90 L49 84Z M70 78 L75 84 L70 90 L65 84Z" fill="url(#zbGold)" stroke="#1c0b3a" stroke-width="1.2" stroke-linejoin="round" opacity=".92"/>
    <path d="M44 86 Q62 94 82 86" fill="none" stroke="#ffd24a" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="62" cy="88" r="3.4" fill="url(#zbGold)" stroke="#1c0b3a" stroke-width="1.2"/>
    <path d="M45 56 L49 49 L54 56 L59 48 L64 56 L69 48 L74 56 L79 49 L83 58 Q63 66 45 58Z" fill="#fff4dc" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="52" cy="60" r="2.4" fill="#ff5a9a" stroke="#1c0b3a" stroke-width="1"/><circle cx="73" cy="60" r="2.4" fill="#5ee0d4" stroke="#1c0b3a" stroke-width="1"/>
  </g>
  <g class="p-shovel" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="M100 66 L108 36" stroke-width="5.4"/><path d="M100 66 L108 36" stroke="#e8c070" stroke-width="2.6"/>
    <g class="p-glint"><path d="M108 24 l2.6 6.2 l6.4 2.4 l-6.4 2.4 l-2.6 6.2 l-2.6 -6.2 l-6.4 -2.4 l6.4 -2.4Z" fill="url(#zbGold)" stroke-width="1.4"/></g>
    <path d="M104 52 Q116 54 118 64 Q112 58 104 58Z" fill="#ff6aa8" stroke-width="1.4"/>
    <path d="M76 61 Q88 64 90 74 L84 78 Q82 70 74 68Z" fill="url(#zbSlv)"/>
    <path d="M88 72 Q96 74 100 68 L103 72 Q98 82 86 80Z" fill="url(#zbSlv)"/>
    <circle cx="100.5" cy="67" r="5" fill="url(#zbSkin)"/>
    <path d="M97 65 q3-2 6 0" fill="none" stroke="#a8643c" stroke-width="1" stroke-opacity=".6"/>
  </g>
  <g class="p-face">
    <path class="p-feath" d="M56 18 Q54 6 62 2 Q62 10 64 16Z" fill="#b078f0" stroke="#1c0b3a" stroke-width="1.8" stroke-linejoin="round"/>
    <path class="p-feath f2" d="M62 17 Q64 4 73 2 Q70 10 68 17Z" fill="#40d8cc" stroke="#1c0b3a" stroke-width="1.8" stroke-linejoin="round"/>
    <path class="p-feath f3" d="M68 19 Q74 10 83 12 Q78 17 72 22Z" fill="#ffd24a" stroke="#1c0b3a" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M44 38 Q42 18 63 17 Q84 18 82 38 Q80 28 63 27 Q46 28 44 38Z" fill="#3a1a72" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round"/>
    <g class="m-rire">
      <ellipse cx="63" cy="36" rx="16.4" ry="18.6" fill="url(#zbMR)" stroke="#1c0b3a" stroke-width="2.4"/>
      <path d="M55 22 L63 17 L71 22 L63 27Z" fill="#fff" opacity=".35"/>
      <path d="M52.5 33 Q57 27 61.5 33 M65 33 Q69.5 27 74 33" fill="none" stroke="#1c0b3a" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="52" cy="40" r="3.4" fill="#ff7a5a" opacity=".6"/><circle cx="74" cy="40" r="3.4" fill="#ff7a5a" opacity=".6"/>
      <path d="M53 42 Q63 56 73 42 Q63 47 53 42Z" fill="#7a1030" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round"/><path d="M56 44.4 Q63 47.6 70 44.4" fill="none" stroke="#fff" stroke-width="1.8"/>
    </g>
    <g class="m-larme">
      <ellipse cx="63" cy="36" rx="16.4" ry="18.6" fill="url(#zbML)" stroke="#1c0b3a" stroke-width="2.4"/>
      <path d="M55 22 L63 17 L71 22 L63 27Z" fill="#fff" opacity=".4"/>
      <path d="M52 32 Q57 36 61.5 31 M65 31 Q69.5 36 74 32" fill="none" stroke="#1c0b3a" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M51 28 L61 31 M75 28 L65 31" stroke="#1c0b3a" stroke-width="2" stroke-linecap="round"/>
      <path class="p-tear" d="M55 38 Q52 44 55 46 Q58 44 55 38Z" fill="#e8f8ff" stroke="#1c0b3a" stroke-width="1.2"/><path class="p-tear t2" d="M71 38 Q68 44 71 46 Q74 44 71 38Z" fill="#e8f8ff" stroke="#1c0b3a" stroke-width="1.2"/>
      <path d="M55 49 Q63 42 71 49" fill="none" stroke="#1c0b3a" stroke-width="2.6" stroke-linecap="round"/>
    </g>
    <g class="m-farce">
      <ellipse cx="63" cy="36" rx="16.4" ry="18.6" fill="url(#zbMF)" stroke="#1c0b3a" stroke-width="2.4"/>
      <path d="M48 26 L54 31 L50 36 L56 40" fill="none" stroke="#ff4a9a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="56" cy="32" r="5.2" fill="#fff" stroke="#1c0b3a" stroke-width="2"/><path d="M56 32 m0 0 a1.6 1.6 0 1 1 1.6 1.6 a3.2 3.2 0 1 1 -3.2 -3.2" fill="none" stroke="#1c0b3a" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M66 28 L74 36 M74 28 L66 36" stroke="#1c0b3a" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M52 44 Q58 40 64 46 Q70 52 76 42 Q72 56 62 54 Q54 52 52 44Z" fill="#7a1030" stroke="#1c0b3a" stroke-width="2" stroke-linejoin="round"/>
      <path d="M62 50 Q66 58 70 50Z" fill="#ff6aa8" stroke="#1c0b3a" stroke-width="1.6" stroke-linejoin="round"/>
    </g>
  </g>
</svg>`,
};

function hasHeroArt(cls) { return !!HERO_ART[cls]; }
/* Sprite de combat : dessin si la classe en a un, sinon emblème rond */
function heroSprite(cls) { return HERO_ART[cls] || emblem(cls, 'big'); }
