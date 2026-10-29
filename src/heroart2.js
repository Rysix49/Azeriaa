/* =====================================================================
   AMAKNA IDLE — STEAMER : le personnage et ses trois tourelles (dessins originaux)
   HERO_ART.steamer : ingénieur des abysses dans son scaphandre de laiton, chaudière de Stasis dans le dos,
   manomètre sur la poitrine, antenne qui commande les tourelles, canon à vapeur.
   STM_TURRET[slot] : tourelles Offensive / Défensive / Tactique en 3 niveaux (I, II, III visibles en CSS via data-lv).
   Les parties animées portent des classes p-* (voir style3.css).
   ===================================================================== */
HERO_ART.steamer = `<svg class="hs hs-steamer" viewBox="0 0 128 128" aria-hidden="true">
  <defs>
    <linearGradient id="smBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".38" stop-color="#e2b04a"/><stop offset=".78" stop-color="#a8701c"/><stop offset="1" stop-color="#6a4208"/></linearGradient>
    <linearGradient id="smBrassH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4c0e"/><stop offset=".25" stop-color="#f4cf74"/><stop offset=".5" stop-color="#fff2c0"/><stop offset=".75" stop-color="#d9a238"/><stop offset="1" stop-color="#7a4c0e"/></linearGradient>
    <linearGradient id="smCopper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a3012"/><stop offset=".22" stop-color="#e98f55"/><stop offset=".45" stop-color="#ffcf9a"/><stop offset=".7" stop-color="#c4642e"/><stop offset="1" stop-color="#5e260c"/></linearGradient>
    <linearGradient id="smSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfd9e3"/><stop offset=".5" stop-color="#7d8b99"/><stop offset="1" stop-color="#363f4a"/></linearGradient>
    <linearGradient id="smSuit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#58bfc2"/><stop offset=".45" stop-color="#2a8089"/><stop offset="1" stop-color="#103f4a"/></linearGradient>
    <linearGradient id="smSuitD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f8f97"/><stop offset=".6" stop-color="#17565f"/><stop offset="1" stop-color="#0a2a33"/></linearGradient>
    <linearGradient id="smLeather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8703a"/><stop offset="1" stop-color="#4a2a12"/></linearGradient>
    <radialGradient id="smSkin" cx="40%" cy="34%" r="78%"><stop offset="0" stop-color="#ffe2c0"/><stop offset=".7" stop-color="#f0b080"/><stop offset="1" stop-color="#c47c4c"/></radialGradient>
    <linearGradient id="smStache" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb870"/><stop offset=".55" stop-color="#e0702a"/><stop offset="1" stop-color="#8a3408"/></linearGradient>
    <radialGradient id="smGlass" cx="35%" cy="28%" r="85%"><stop offset="0" stop-color="#f4fcff" stop-opacity=".62"/><stop offset=".45" stop-color="#9fe0ff" stop-opacity=".16"/><stop offset="1" stop-color="#2a7ab8" stop-opacity=".34"/></radialGradient>
    <radialGradient id="smCore" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#fff0ff"/><stop offset=".3" stop-color="#d9a8ff"/><stop offset=".7" stop-color="#8a3df0"/><stop offset="1" stop-color="#3a0f8a"/></radialGradient>
    <radialGradient id="smGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d9a8ff" stop-opacity=".95"/><stop offset=".5" stop-color="#9b5cff" stop-opacity=".45"/><stop offset="1" stop-color="#7a3cff" stop-opacity="0"/></radialGradient>
    <radialGradient id="smCream" cx="40%" cy="32%" r="80%"><stop offset="0" stop-color="#fffdf0"/><stop offset=".7" stop-color="#efe3bf"/><stop offset="1" stop-color="#b9a572"/></radialGradient>
    <radialGradient id="smLamp" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#ffe27a"/><stop offset="1" stop-color="#ff9a1a" stop-opacity="0"/></radialGradient>
    <radialGradient id="smFlash" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#ffe9a0"/><stop offset=".65" stop-color="#ff9a2e" stop-opacity=".85"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>
    <radialGradient id="smSteam" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".6" stop-color="#e4eef6" stop-opacity=".6"/><stop offset="1" stop-color="#cfdce8" stop-opacity="0"/></radialGradient>
    <clipPath id="smWin"><ellipse cx="73" cy="35" rx="10.4" ry="11.6"/></clipPath>
    <clipPath id="smCoreClip"><circle cx="32" cy="72" r="6.6"/></clipPath>
  </defs>
  <ellipse class="p-shadow" cx="62" cy="119" rx="38" ry="5" fill="#000" opacity=".32"/>

  <g class="p-hop">

  <!-- chaudière de Stasis dans le dos : cheminées, tuyaux, hublot violet -->
  <g class="p-tank" stroke="#2a1006" stroke-width="2" stroke-linejoin="round">
    <g class="p-chim">
      <path d="M21.5 52 V30 H28.5 V52Z" fill="url(#smCopper)"/>
      <path d="M19.5 31 Q19 25 20.5 24 H29.5 Q31 25 30.5 31Z" fill="url(#smBrass)"/>
      <path d="M35.5 54 V37 H41.5 V54Z" fill="url(#smCopper)"/>
      <path d="M33.8 38 Q33.4 33 34.8 32 H42.2 Q43.6 33 43.2 38Z" fill="url(#smBrass)"/>
      <path d="M23 31 V47 M37 38 V50" stroke="#fff" stroke-opacity=".4" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    </g>
    <path d="M18 62 Q18 50 32 50 Q46 50 46 62 V88 Q46 98 32 98 Q18 98 18 88Z" fill="url(#smCopper)"/>
    <path d="M18 60 H46 M18 90 H46" stroke="#8a5a14" stroke-width="3.4" fill="none"/>
    <path d="M18 60 H46 M18 90 H46" stroke="url(#smBrassH)" stroke-width="2" fill="none"/>
    <path d="M18 75 H46" stroke="#5e260c" stroke-width="1.2" opacity=".55" fill="none"/>
    <g fill="#ffe9a0" stroke="#6a4208" stroke-width=".8"><circle cx="21" cy="60" r="1.5"/><circle cx="43" cy="60" r="1.5"/><circle cx="21" cy="90" r="1.5"/><circle cx="43" cy="90" r="1.5"/></g>
    <circle cx="32" cy="72" r="9.2" fill="url(#smBrass)"/>
    <circle cx="32" cy="72" r="7" fill="#1a0a3a" stroke="#4a2a08" stroke-width="1.2"/>
    <circle class="p-coreglow" cx="32" cy="72" r="13" fill="url(#smGlow)" stroke="none"/>
    <g clip-path="url(#smCoreClip)" stroke="none">
      <circle class="p-core" cx="32" cy="72" r="6.6" fill="url(#smCore)"/>
      <g class="p-swirl" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.1" stroke-linecap="round"><path d="M32 72 Q36 66 31 64"/><path d="M32 72 Q26 70 28 66"/><path d="M32 72 Q34 78 39 75"/></g>
    </g>
    <path d="M27.4 67.6 Q29 66 31 65.6" stroke="#fff" stroke-opacity=".7" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <g stroke="#2a1006" stroke-width="1" opacity=".7"><path d="M25 94 H39 M25 96.4 H39"/></g>
    <path class="p-vale" d="M46 66 h4 v6 h-4Z" fill="url(#smBrass)"/>
  </g>
  <g class="p-puffs" fill="url(#smSteam)" stroke="none">
    <circle class="pf pf1" cx="25" cy="24" r="4.6"/><circle class="pf pf2" cx="25" cy="24" r="4.6"/><circle class="pf pf3" cx="25" cy="24" r="4.6"/>
    <circle class="pf pf4" cx="38.5" cy="31" r="4"/><circle class="pf pf5" cx="38.5" cy="31" r="4"/><circle class="pf pf6" cx="38.5" cy="31" r="4"/>
  </g>

  <!-- tuyau souple de la chaudière au casque -->
  <path d="M48 40 Q38 38 40 54" fill="none" stroke="#2a1006" stroke-width="5.6" stroke-linecap="round"/>
  <path d="M48 40 Q38 38 40 54" fill="none" stroke="#7d8b99" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M48 40 Q38 38 40 54" fill="none" stroke="#2a3038" stroke-width="3.6" stroke-linecap="round" stroke-dasharray="1.2 2.2"/>

  <!-- jambes et lourdes bottes de scaphandrier -->
  <g stroke="#0a2a33" stroke-width="2" stroke-linejoin="round">
    <path d="M47 92 H60 L59 106 H48Z" fill="url(#smSuitD)"/>
    <path d="M70 92 H83 L82 106 H71Z" fill="url(#smSuit)"/>
    <rect x="45.4" y="104" width="16" height="5" rx="2" fill="url(#smBrassH)" stroke="#5a3a08"/>
    <rect x="68.4" y="104" width="16" height="5" rx="2" fill="url(#smBrassH)" stroke="#5a3a08"/>
    <path d="M42 108 H62 V112 Q74 112 74 117.4 Q74 120.4 70 120.4 H45 Q41 120.4 41 116 Q41 110 42 108Z" fill="url(#smSteel)"/>
    <path d="M66 108 H86 V112 Q99 112 99 117.4 Q99 120.4 95 120.4 H68 Q64 120.4 64 116 Q64 110 66 108Z" fill="url(#smSteel)"/>
    <path d="M89 113 Q99 112.6 99 117.4 Q99 120.4 95 120.4 H89Z" fill="url(#smBrass)"/>
    <path d="M66 113 Q76 112.6 76 117.4 Q76 120.4 72 120.4 H66Z" fill="url(#smBrass)" opacity="0"/>
    <path d="M42 118 H72 M64 118 H97" stroke="#1a1f26" stroke-width="2" fill="none"/>
    <g fill="#e8eef4" stroke="#363f4a" stroke-width=".8"><circle cx="48" cy="112" r="1.1"/><circle cx="55" cy="112" r="1.1"/><circle cx="72" cy="112" r="1.1"/><circle cx="79" cy="112" r="1.1"/></g>
  </g>

  <g class="p-torso">

  <!-- torse : combinaison étanche, sangles de cuir, manomètre de pression -->
  <path d="M45 58 Q64 49 84 58 L87 80 Q87 94 81 99 H47 Q41 94 41 80Z" fill="url(#smSuit)" stroke="#0a2a33" stroke-width="2" stroke-linejoin="round"/>
  <path d="M47 60 Q56 54 68 54 Q58 60 52 76 Q49 86 50 96 Q44 92 44 80Z" fill="#9ef0ee" opacity=".22"/>
  <path d="M43 90 H85 V99 Q64 103 43 99Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M44 94 H84" stroke="#e6b86a" stroke-opacity=".5" stroke-width="1" stroke-dasharray="2 2.4" fill="none"/>
  <g>
    <path d="M53 55 L61 72 L67 72 L60 54Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M77 55 L71 71 L66 70 L70 54Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M55 58 L61 71 M74 57 L70 69" stroke="#e6b86a" stroke-opacity=".6" stroke-width=".9" stroke-dasharray="1.6 2" fill="none"/>
  </g>
  <g class="p-gauge">
    <circle cx="66" cy="76" r="11" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="1.8"/>
    <circle cx="66" cy="76" r="8.6" fill="url(#smCream)" stroke="#5a3a08" stroke-width="1"/>
    <path d="M59.4 81.4 A8.4 8.4 0 0 1 59.4 70.6" fill="none" stroke="#3a8a4a" stroke-width="2.2" opacity=".8" transform="rotate(0 66 76)"/>
    <path d="M70.2 69 A8.4 8.4 0 0 1 74 76" fill="none" stroke="#ffb02e" stroke-width="2.2" opacity=".9"/>
    <path d="M74 76 A8.4 8.4 0 0 1 71 82.6" fill="none" stroke="#e03a2a" stroke-width="2.2" opacity=".95"/>
    <g stroke="#3a2a14" stroke-width=".9" stroke-linecap="round"><path d="M66 68.2 v1.6"/><path d="M72 70 l-1 1.2"/><path d="M60 70 l1 1.2"/><path d="M74.6 76 h-1.6"/><path d="M57.4 76 h1.6"/><path d="M72.6 82 l-1.1 -1"/><path d="M59.4 82 l1.1 -1"/></g>
    <g class="p-needle"><path d="M66 76 L66 69.2" stroke="#b01a14" stroke-width="1.5" stroke-linecap="round"/><path d="M66 76 L66 80" stroke="#3a2a14" stroke-width="1.3" stroke-linecap="round"/></g>
    <circle cx="66" cy="76" r="2" fill="url(#smBrass)" stroke="#4a2a08" stroke-width=".8"/>
    <path d="M59.4 70.4 Q62 67.4 66 67" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="#ffe9a0" stroke="#6a4208" stroke-width=".6"><circle cx="66" cy="65.2" r="1"/><circle cx="76.8" cy="76" r="1"/><circle cx="66" cy="86.8" r="1"/><circle cx="55.2" cy="76" r="1"/></g>
  </g>
  <rect x="62" y="91" width="9" height="8" rx="1.8" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="1.4"/><rect x="64.5" y="93.2" width="4" height="3.6" rx=".8" fill="#2a1606"/>
  <path d="M46 94 q-4 4 -2 11 h7 q1 -6 -1 -11Z" fill="#8a5a32" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M76 94 q4 -1 7 1 l-.6 7 q-3.6 1.8 -6.6 0Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M77.4 99 H81.6" stroke="#e6b86a" stroke-opacity=".6" stroke-width=".9" stroke-linecap="round"/>

  <!-- collerette de laiton -->
  <path d="M50 54 Q64 49 78 54 L79 59 Q64 64 49 59Z" fill="url(#smBrassH)" stroke="#4a2a08" stroke-width="1.6" stroke-linejoin="round"/>
  <g fill="#fff2c0" stroke="#6a4208" stroke-width=".6"><circle cx="54" cy="57.6" r="1"/><circle cx="60" cy="59" r="1"/><circle cx="66" cy="59.4" r="1"/><circle cx="72" cy="58.6" r="1"/></g>

  <!-- épaulières -->
  <g stroke="#4a2a08" stroke-width="1.8" stroke-linejoin="round">
    <path d="M40 62 Q41 53 49 54 Q54 58 52 66 Q44 68 40 62Z" fill="url(#smBrass)"/>
    <path d="M78 55 Q86 52 90 59 Q91 66 84 68 Q78 64 78 55Z" fill="url(#smBrass)"/>
    <g fill="#fff2c0" stroke="#6a4208" stroke-width=".6"><circle cx="45" cy="58" r="1.1"/><circle cx="85" cy="59" r="1.1"/></g>
  </g>

  <!-- bras arrière : la main sur le levier du boîtier de commande -->
  <g class="p-armB">
    <rect x="34" y="82" width="19" height="14" rx="2.4" fill="url(#smSteel)" stroke="#1a1f26" stroke-width="1.8"/>
    <rect x="36" y="84" width="15" height="4" rx="1" fill="#10161c"/>
    <circle class="p-led l1" cx="39" cy="86" r="1.5" fill="#ff4a3a"/><circle class="p-led l2" cx="43.5" cy="86" r="1.5" fill="#ffc83a"/><circle class="p-led l3" cx="48" cy="86" r="1.5" fill="#46f0d0"/>
    <path d="M36 91 H51 M36 93.6 H51" stroke="#1a1f26" stroke-width="1" opacity=".7"/>
    <g class="p-lever">
      <path d="M44 82 L50 68" stroke="#1a1f26" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M44 82 L50 68" stroke="url(#smSteel)" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="50.4" cy="67" r="3.8" fill="#d8301e" stroke="#4a0a06" stroke-width="1.4"/><circle cx="49.2" cy="65.8" r="1.2" fill="#ffb0a0"/>
    </g>
    <path d="M47 61 Q41 70 47 72" fill="none" stroke="#0a2a33" stroke-width="9" stroke-linecap="round"/>
    <path d="M47 61 Q41 70 47 72" fill="none" stroke="url(#smSuitD)" stroke-width="6.4" stroke-linecap="round"/>
    <path d="M47.6 70.6 Q50.6 70 51.2 67.4 Q51 64.2 48.2 64.6 Q45.6 66 46.4 69Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
  </g>

  <!-- tête : casque de laiton, hublot, moustache rousse -->
  <g class="p-face">
    <path d="M45 33 Q45 12 65 12 Q85 12 85 33 Q85 54 66 54 Q45 54 45 33Z" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M48 28 Q50 17 62 15" fill="none" stroke="#fff6c8" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M47 42 Q50 51 64 52" fill="none" stroke="#5a3408" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>
    <path d="M49 25 Q65 18 82 26" fill="none" stroke="#6a4208" stroke-opacity=".55" stroke-width="1.2"/>
    <ellipse cx="73" cy="35" rx="12.4" ry="13.6" fill="url(#smBrassH)" stroke="#4a2a08" stroke-width="1.8"/>
    <ellipse cx="73" cy="35" rx="10.4" ry="11.6" fill="#7a4a1a"/>
    <g clip-path="url(#smWin)">
      <rect x="62" y="22" width="24" height="26" fill="url(#smSkin)"/>
      <path d="M62 22 H86 V30 Q74 25 62 30Z" fill="#8a3a0a" opacity=".16"/>
      <g class="p-eye"><ellipse cx="69.6" cy="33.4" rx="3" ry="3.5" fill="#fff" stroke="#3a1a08" stroke-width="1"/><circle cx="70.6" cy="33.8" r="1.9" fill="#2a8aa0"/><circle cx="70.9" cy="33.9" r=".95" fill="#0a1a20"/><circle cx="71.4" cy="32.9" r=".6" fill="#fff"/></g>
      <g class="p-eye"><ellipse cx="78" cy="33.4" rx="2.5" ry="3.2" fill="#fff" stroke="#3a1a08" stroke-width="1"/><circle cx="78.8" cy="33.8" r="1.7" fill="#2a8aa0"/><circle cx="79" cy="33.9" r=".85" fill="#0a1a20"/><circle cx="79.4" cy="32.9" r=".55" fill="#fff"/></g>
      <path class="p-brow" d="M65.4 28.4 Q69.6 26 73.4 28.2 M75 28.2 Q78.4 26.2 82 28.6" fill="none" stroke="#c4561a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M74 35 Q76.4 38.4 79.4 38.2" fill="none" stroke="#b86a40" stroke-width="1.2" stroke-linecap="round"/>
      <path class="p-stache" d="M66.4 41 Q71 38.2 76.4 40.6 Q81.6 38.4 86 42 Q85 45.6 79.4 44.6 Q76.4 43.4 75.6 41.8 Q71 45 66.4 41Z" fill="url(#smStache)" stroke="#6a2a06" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M69.6 47 Q74 49.4 79 47.4" fill="none" stroke="#8a3a1e" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <ellipse cx="73" cy="35" rx="10.4" ry="11.6" fill="url(#smGlass)"/>
    <path d="M65 28 Q66.4 23.4 72 22.6" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="2" stroke-linecap="round"/>
    <path d="M80.6 44 Q83 40 83.4 36" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.4" stroke-linecap="round"/>
    <g fill="#fff2c0" stroke="#6a4208" stroke-width=".6"><circle cx="73" cy="21.2" r="1.1"/><circle cx="82" cy="25" r="1.1"/><circle cx="85" cy="35" r="1.1"/><circle cx="82" cy="45" r="1.1"/><circle cx="73" cy="49" r="1.1"/><circle cx="63.6" cy="45" r="1.1"/><circle cx="61" cy="35" r="1.1"/><circle cx="63.6" cy="25" r="1.1"/></g>
    <!-- lampe de casque -->
    <g class="p-lampg">
      <path d="M60 14 Q64 6 70 8 L72 14Z" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="1.6" stroke-linejoin="round"/>
      <ellipse class="p-lamp" cx="71.4" cy="11" rx="2.6" ry="3.4" fill="url(#smLamp)"/>
    </g>
    <!-- antenne de commande des tourelles -->
    <g class="p-ant">
      <path d="M52 17 L49 5" stroke="#2a1006" stroke-width="3.4" stroke-linecap="round"/><path d="M52 17 L49 5" stroke="url(#smSteel)" stroke-width="1.8" stroke-linecap="round"/>
      <circle class="p-bulbglow" cx="48.6" cy="4.4" r="6" fill="url(#smGlow)"/>
      <circle class="p-bulb" cx="48.6" cy="4.4" r="2.8" fill="url(#smCore)" stroke="#4a1a8a" stroke-width="1"/>
      <circle class="p-ring r1" cx="48.6" cy="4.4" r="3" fill="none" stroke="#d9a8ff" stroke-width="1.3" opacity="0"/><circle class="p-ring r2" cx="48.6" cy="4.4" r="3" fill="none" stroke="#fff" stroke-width="1" opacity="0"/>
    </g>
    <!-- soupape arrière -->
    <g>
      <path d="M45 30 H39 V36 H45" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="1.6" stroke-linejoin="round"/>
      <circle class="p-vent" cx="38" cy="33" r="2.2" fill="url(#smSteam)"/>
    </g>
  </g>

  <!-- bras avant : canon à vapeur -->
  <g class="p-arm">
    <g class="p-cannon">
      <path d="M96 66 H116 Q123 66 123 70.4 Q123 74.8 116 74.8 H96Z" fill="url(#smBrassH)" stroke="#4a2a08" stroke-width="2" stroke-linejoin="round"/>
      <path d="M100 66 V74.8 M106 66 V74.8 M112 66 V74.8" stroke="#8a5a14" stroke-width="1.6" fill="none"/>
      <path d="M108.6 65 H111 V76 H108.6Z" fill="url(#smCopper)" stroke="#4a2a08" stroke-width="1.2"/>
      <path d="M98 67.8 H118" stroke="#fff6c8" stroke-opacity=".8" stroke-width="1.4" stroke-linecap="round"/>
      <ellipse cx="121.8" cy="70.4" rx="2.8" ry="4.6" fill="#2a1606" stroke="#4a2a08" stroke-width="1.2"/>
      <ellipse cx="121.2" cy="70.4" rx="1.4" ry="2.9" fill="#0a0604"/>
      <path d="M102 65 V60.6 H108 V65" fill="url(#smBrass)" stroke="#4a2a08" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M94 74.8 H112 Q113 82 105 82.4 H98 Q94 82 94 76Z" fill="url(#smCopper)" stroke="#4a2a08" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M96 77 H110" stroke="#fff" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="100" cy="79" r="1.4" fill="#ffe9a0" stroke="#6a4208" stroke-width=".6"/>
      <path d="M92 76 q-2 6 3 8" fill="none" stroke="#2a1606" stroke-width="2" stroke-linecap="round"/>
      <g class="p-flash"><circle cx="124" cy="70.4" r="9" fill="url(#smFlash)"/><path d="M124 62.6 L125.8 68.4 L132.6 70.4 L125.8 72.4 L124 78.2 L122.2 72.4 L115.4 70.4 L122.2 68.4Z" fill="#fff6c8" opacity=".95"/></g>
      <circle class="p-muz" cx="124" cy="70.4" r="3.6" fill="url(#smSteam)"/>
    </g>
    <path d="M82 61 Q92 70 98 69" fill="none" stroke="#0a2a33" stroke-width="10" stroke-linecap="round"/>
    <path d="M82 61 Q92 70 98 69" fill="none" stroke="url(#smSuit)" stroke-width="7.4" stroke-linecap="round"/>
    <path d="M84 59 Q92 66 96 66.6" fill="none" stroke="#bff6f2" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="89.6" y="63.4" width="7" height="12.4" rx="2.6" fill="url(#smBrassH)" stroke="#4a2a08" stroke-width="1.4" style="transform-box:view-box" transform="rotate(14 93 69)"/>
    <path d="M97 66.6 Q103 64.4 104 70.4 Q104 75.6 98 75.6 Q94 72.6 97 66.6Z" fill="url(#smLeather)" stroke="#2a1606" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M99.6 67.8 Q102 70 99.6 73.4" fill="none" stroke="#e6b86a" stroke-opacity=".6" stroke-width=".9" stroke-linecap="round"/>
  </g>

  </g><!-- /p-torso -->

  </g><!-- /p-hop -->
</svg>`;

/* ---------------------------------------------------------------------
   Les trois tourelles. Chaque dessin contient les 3 niveaux : les parties .from2 / .from3 n'apparaissent
   qu'à partir du niveau II / III (le CSS lit data-lv sur le .tur parent). Dessinées tournées vers la droite.
   --------------------------------------------------------------------- */
const STM_TU_DEFS = `<defs>
  <linearGradient id="tuBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b8"/><stop offset=".4" stop-color="#e2b04a"/><stop offset=".8" stop-color="#a8701c"/><stop offset="1" stop-color="#6a4208"/></linearGradient>
  <linearGradient id="tuBrassH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4c0e"/><stop offset=".28" stop-color="#f4cf74"/><stop offset=".52" stop-color="#fff2c0"/><stop offset=".78" stop-color="#d9a238"/><stop offset="1" stop-color="#7a4c0e"/></linearGradient>
  <linearGradient id="tuBrassV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4c0e"/><stop offset=".3" stop-color="#f4cf74"/><stop offset=".55" stop-color="#fff2c0"/><stop offset=".8" stop-color="#c8902c"/><stop offset="1" stop-color="#6a4208"/></linearGradient>
  <linearGradient id="tuCopper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a3012"/><stop offset=".22" stop-color="#e98f55"/><stop offset=".46" stop-color="#ffcf9a"/><stop offset=".72" stop-color="#c4642e"/><stop offset="1" stop-color="#5e260c"/></linearGradient>
  <linearGradient id="tuCopperV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffcf9a"/><stop offset=".35" stop-color="#e98f55"/><stop offset=".75" stop-color="#b4562a"/><stop offset="1" stop-color="#5e260c"/></linearGradient>
  <linearGradient id="tuSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8e2ec"/><stop offset=".5" stop-color="#8190a0"/><stop offset="1" stop-color="#3a4450"/></linearGradient>
  <linearGradient id="tuSteelV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6eef6"/><stop offset=".45" stop-color="#8d9bab"/><stop offset="1" stop-color="#3a4450"/></linearGradient>
  <linearGradient id="tuSteelD" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a323c"/><stop offset=".4" stop-color="#7a8898"/><stop offset="1" stop-color="#242b34"/></linearGradient>
  <radialGradient id="tuPlate" cx="45%" cy="35%" r="75%"><stop offset="0" stop-color="#9aa8b8"/><stop offset=".6" stop-color="#5a6674"/><stop offset="1" stop-color="#2a323c"/></radialGradient>
  <radialGradient id="tuCore" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#fff0ff"/><stop offset=".3" stop-color="#d9a8ff"/><stop offset=".7" stop-color="#8a3df0"/><stop offset="1" stop-color="#3a0f8a"/></radialGradient>
  <radialGradient id="tuGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d9a8ff" stop-opacity=".95"/><stop offset=".5" stop-color="#9b5cff" stop-opacity=".45"/><stop offset="1" stop-color="#7a3cff" stop-opacity="0"/></radialGradient>
  <radialGradient id="tuTeal" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#f0fff8"/><stop offset=".3" stop-color="#9af0cc"/><stop offset=".7" stop-color="#1fb88a"/><stop offset="1" stop-color="#0a5a48"/></radialGradient>
  <radialGradient id="tuTealGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#9af0cc" stop-opacity=".95"/><stop offset=".5" stop-color="#2fe0a8" stop-opacity=".45"/><stop offset="1" stop-color="#1fb88a" stop-opacity="0"/></radialGradient>
  <linearGradient id="tuLiquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8ffe4"/><stop offset=".5" stop-color="#2fe0a8"/><stop offset="1" stop-color="#0a8a68"/></linearGradient>
  <radialGradient id="tuFlash" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#ffe9a0"/><stop offset=".65" stop-color="#ff9a2e" stop-opacity=".85"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>
  <radialGradient id="tuSteam" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#e4eef6" stop-opacity=".6"/><stop offset="1" stop-color="#cfdce8" stop-opacity="0"/></radialGradient>
  <radialGradient id="tuShield" cx="50%" cy="50%" r="50%"><stop offset=".55" stop-color="#9af0cc" stop-opacity="0"/><stop offset=".9" stop-color="#9af0cc" stop-opacity=".3"/><stop offset="1" stop-color="#d8fff0" stop-opacity=".7"/></radialGradient>
  <linearGradient id="tuMagR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a7a"/><stop offset=".6" stop-color="#d8301e"/><stop offset="1" stop-color="#6a0a06"/></linearGradient>
  <linearGradient id="tuMagB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ac8ff"/><stop offset=".6" stop-color="#2a6ad8"/><stop offset="1" stop-color="#0a1a6a"/></linearGradient>
</defs>`;
const STM_TU_GROUND = `<ellipse cx="36" cy="64.5" rx="30" ry="6" fill="#000" opacity=".3"/>
  <ellipse cx="36" cy="62" rx="27" ry="6.2" fill="url(#tuPlate)" stroke="#1a1f26" stroke-width="1.8"/>
  <ellipse cx="36" cy="60.6" rx="22" ry="4.4" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1"/>
  <g fill="#e8eef4" stroke="#363f4a" stroke-width=".7"><circle cx="14" cy="62" r="1.5"/><circle cx="58" cy="62" r="1.5"/><circle cx="25" cy="66" r="1.4"/><circle cx="47" cy="66" r="1.4"/></g>`;
const STM_TURRET = {
/* ---- Offensive : canon à vapeur (I : un canon · II : deux canons, blindage, cheminée · III : trois canons, noyau de Stasis, cristal) ---- */
off: `<svg class="tur-svg tu-off" viewBox="0 0 72 72" aria-hidden="true">${STM_TU_DEFS}
  ${STM_TU_GROUND}
  <path d="M25 61 L30 49 H42 L47 61Z" fill="url(#tuSteelD)" stroke="#1a1f26" stroke-width="1.7" stroke-linejoin="round"/>
  <ellipse cx="36" cy="49" rx="10" ry="3.2" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1.5"/>
  <g class="tu-body">
    <g class="from2 tu-chim"><path d="M19 31 V20 H25 V31Z" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.6" stroke-linejoin="round"/><path d="M17.6 21 Q17.2 17 18.6 16.4 H25.4 Q26.8 17 26.4 21Z" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1.3"/><circle class="tu-puff" cx="22" cy="15" r="3.4" fill="url(#tuSteam)"/><circle class="tu-puff p2" cx="22" cy="15" r="3.4" fill="url(#tuSteam)"/></g>
    <path d="M14 39 Q14 31 22 31 H42 Q50 31 50 39 V43 Q50 51 42 51 H22 Q14 51 14 43Z" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M20 31 V51 M44 31 V51" stroke="#8a5a14" stroke-width="3.4" fill="none"/><path d="M20 31 V51 M44 31 V51" stroke="url(#tuBrassH)" stroke-width="2" fill="none"/>
    <path d="M16 36 Q22 33 30 33" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>
    <g fill="#ffe9a0" stroke="#6a4208" stroke-width=".6"><circle cx="20" cy="35" r="1.1"/><circle cx="44" cy="35" r="1.1"/><circle cx="20" cy="47" r="1.1"/><circle cx="44" cy="47" r="1.1"/></g>
    <circle cx="31" cy="29.6" r="4.6" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1.3"/><circle cx="31" cy="29.6" r="3.3" fill="#f6ecc8" stroke="#6a4208" stroke-width=".6"/><path class="tu-needle" d="M31 29.6 L33.2 27.6" stroke="#c01a14" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M13 36 q-3 -4 -1.5 -8" fill="none" stroke="#2a1006" stroke-width="2.4" stroke-linecap="round"/><path d="M13 36 q-3 -4 -1.5 -8" fill="none" stroke="#7d8b99" stroke-width="1.2" stroke-linecap="round"/>
    <circle class="tu-bulbglow" cx="11.4" cy="26.6" r="5" fill="url(#tuGlow)"/><circle class="tu-bulb" cx="11.4" cy="26.6" r="2.4" fill="url(#tuCore)" stroke="#4a1a8a" stroke-width=".9"/>
    <circle class="tu-ring r1" cx="11.4" cy="26.6" r="2.6" fill="none" stroke="#d9a8ff" stroke-width="1.1" opacity="0"/>
    <g class="from3"><circle class="tu-coreglow" cx="32" cy="42" r="9" fill="url(#tuGlow)"/><circle cx="32" cy="42" r="5.6" fill="#1a0a3a" stroke="url(#tuBrass)" stroke-width="1.8"/><circle class="tu-core" cx="32" cy="42" r="4" fill="url(#tuCore)"/><path d="M29.6 40 Q31 38.8 33 39" stroke="#fff" stroke-opacity=".8" stroke-width="1" fill="none" stroke-linecap="round"/></g>
    <g class="from3 tu-crystal"><path d="M40.6 21 L44 26.6 L40.6 33 L37.2 26.6Z" fill="url(#tuCore)" stroke="#4a1a8a" stroke-width="1.1" stroke-linejoin="round"/><path d="M40.6 21 L40.6 33 M37.2 26.6 H44" stroke="#fff" stroke-opacity=".5" stroke-width=".6"/><circle cx="40.6" cy="26.6" r="7" fill="url(#tuGlow)" opacity=".6"/></g>
    <g class="tu-barrels">
      <g class="from3"><path d="M49 32.4 H65 V38 H49Z" fill="url(#tuBrassV)" stroke="#4a2a08" stroke-width="1.4" stroke-linejoin="round"/><path d="M65 31.4 H68 V39 H65Z" fill="url(#tuSteelV)" stroke="#1a1f26" stroke-width="1.2"/></g>
      <path d="M49 38.6 H65 V44.2 H49Z" fill="url(#tuBrassV)" stroke="#4a2a08" stroke-width="1.4" stroke-linejoin="round"/><path d="M65 37.6 H68 V45.2 H65Z" fill="url(#tuSteelV)" stroke="#1a1f26" stroke-width="1.2"/>
      <g class="from2"><path d="M49 44.8 H65 V50.4 H49Z" fill="url(#tuBrassV)" stroke="#4a2a08" stroke-width="1.4" stroke-linejoin="round"/><path d="M65 43.8 H68 V51.4 H65Z" fill="url(#tuSteelV)" stroke="#1a1f26" stroke-width="1.2"/></g>
      <g class="tu-band"><path d="M55 38 V44.8" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M55 38 V44.8" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/>
      <g class="from2"><path d="M55 44.2 V50.8" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M55 44.2 V50.8" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/></g>
      <g class="from3"><path d="M55 32 V38.6" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M55 32 V38.6" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/></g></g>
      <path class="from3 tu-spin" d="M59.6 32.6 V50.2" stroke="#1a1f26" stroke-width="2.4" stroke-dasharray="2.4 2" stroke-linecap="butt"/>
      <path d="M50 40 H64" stroke="#fff" stroke-opacity=".7" stroke-width="1" stroke-linecap="round"/>
    </g>
    <g class="from2"><path d="M48 28 L53 30.4 V52 L48 53Z" fill="url(#tuSteel)" stroke="#1a1f26" stroke-width="1.5" stroke-linejoin="round"/><g fill="#e8eef4" stroke="#363f4a" stroke-width=".6"><circle cx="50.6" cy="33" r="1"/><circle cx="50.6" cy="48" r="1"/></g></g>
    <g class="tu-flash"><circle cx="68.4" cy="41.4" r="10" fill="url(#tuFlash)"/><path d="M68.4 31 L70 38.6 L78.4 41.4 L70 44.2 L68.4 51.8 L66.8 44.2 L58.4 41.4 L66.8 38.6Z" fill="#fff6c8" opacity=".95"/></g>
    <circle class="tu-muz" cx="68" cy="41.4" r="3.4" fill="url(#tuSteam)"/>
  </g>
</svg>`,
/* ---- Défensive : pylône de secours (I : cuve et dôme · II : bouclier et tuyaux · III : rotor de réparation et cristal) ---- */
def: `<svg class="tur-svg tu-def" viewBox="0 0 72 72" aria-hidden="true">${STM_TU_DEFS}
  ${STM_TU_GROUND}
  <ellipse class="from2 tu-shield" cx="36" cy="40" rx="31" ry="31" fill="url(#tuShield)" stroke="#bffbe4" stroke-opacity=".5" stroke-width="1"/>
  <path d="M24 61 L27 54 H45 L48 61Z" fill="url(#tuSteelD)" stroke="#1a1f26" stroke-width="1.7" stroke-linejoin="round"/>
  <g class="from2"><path d="M24 44 Q12 44 13 54" fill="none" stroke="#1a1f26" stroke-width="5.4" stroke-linecap="round"/><path d="M24 44 Q12 44 13 54" fill="none" stroke="#7d8b99" stroke-width="3.4" stroke-linecap="round"/><path d="M24 44 Q12 44 13 54" fill="none" stroke="#2a3038" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1.2 2.2"/><rect x="9" y="52" width="9" height="8" rx="2" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.4"/>
    <path d="M48 44 Q60 44 59 54" fill="none" stroke="#1a1f26" stroke-width="5.4" stroke-linecap="round"/><path d="M48 44 Q60 44 59 54" fill="none" stroke="#7d8b99" stroke-width="3.4" stroke-linecap="round"/><path d="M48 44 Q60 44 59 54" fill="none" stroke="#2a3038" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1.2 2.2"/><rect x="54" y="52" width="9" height="8" rx="2" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.4"/></g>
  <g class="tu-body">
    <path d="M24 28 Q24 20 36 20 Q48 20 48 28 V55 H24Z" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.9" stroke-linejoin="round"/>
    <path d="M24 26 H48 M24 52 H48" stroke="#8a5a14" stroke-width="3.6" fill="none"/><path d="M24 26 H48 M24 52 H48" stroke="url(#tuBrassH)" stroke-width="2.1" fill="none"/>
    <g fill="#ffe9a0" stroke="#6a4208" stroke-width=".6"><circle cx="27" cy="26" r="1.1"/><circle cx="45" cy="26" r="1.1"/><circle cx="27" cy="52" r="1.1"/><circle cx="45" cy="52" r="1.1"/></g>
    <rect x="29" y="29" width="14" height="21" rx="6.4" fill="#06241e" stroke="url(#tuBrass)" stroke-width="2.2"/>
    <circle class="tu-coreglow" cx="36" cy="39.5" r="13" fill="url(#tuTealGlow)"/>
    <clipPath id="tuLiqClip"><rect x="30.4" y="30.4" width="11.2" height="18.2" rx="5.2"/></clipPath>
    <g clip-path="url(#tuLiqClip)"><g class="tu-liq"><path d="M28 40 Q32 37.6 36 40 T44 40 V52 H28Z" fill="url(#tuLiquid)"/><path d="M28 40 Q32 37.6 36 40 T44 40" fill="none" stroke="#e8fff6" stroke-width="1.2" opacity=".8"/></g></g>
    <path class="tu-cross" d="M36 34 V45 M30.8 39.5 H41.2" stroke="#fff" stroke-width="2.8" stroke-linecap="round" opacity=".92"/>
    <path d="M31.4 33.4 Q32 31.6 34 31" stroke="#fff" stroke-opacity=".8" stroke-width="1.3" fill="none" stroke-linecap="round"/>
    <path d="M26.4 34 Q27 30 30 28" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M26 21 Q26 14 36 14 Q46 14 46 21Z" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M30 18 Q33 15.4 37 15.6" fill="none" stroke="#fff6c8" stroke-opacity=".85" stroke-width="1.4" stroke-linecap="round"/>
    <g class="tu-wheel"><circle cx="36" cy="12" r="4.2" fill="none" stroke="#4a2a08" stroke-width="3"/><circle cx="36" cy="12" r="4.2" fill="none" stroke="url(#tuBrass)" stroke-width="1.6"/><path d="M36 7.8 V16.2 M31.8 12 H40.2" stroke="#4a2a08" stroke-width="1.6" stroke-linecap="round"/></g>
    <circle class="tu-bulbglow" cx="49.4" cy="31" r="5" fill="url(#tuTealGlow)"/><circle class="tu-bulb" cx="49.4" cy="31" r="2.2" fill="url(#tuTeal)" stroke="#0a5a48" stroke-width=".9"/><path d="M48 33 L48.2 40" stroke="#7d8b99" stroke-width="1.6" stroke-linecap="round"/>
    <g class="from3 tu-rotor"><path d="M36 11 V6" stroke="#4a2a08" stroke-width="3" stroke-linecap="round"/><path d="M36 11 V6" stroke="url(#tuBrass)" stroke-width="1.6" stroke-linecap="round"/>
      <g class="tu-arms"><path d="M36 6 H16" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M36 6 H16" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/><path d="M36 6 H56" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M36 6 H56" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 2.4 q-4 3.6 0 7 l3 -1.4 q-1.4 -2.2 0 -4.2Z" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1"/><path d="M59 2.4 q4 3.6 0 7 l-3 -1.4 q1.4 -2.2 0 -4.2Z" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1"/></g>
      <circle cx="36" cy="6" r="2.4" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1"/></g>
    <g class="from3 tu-crystal"><path d="M36 -2 L39.2 3 L36 9 L32.8 3Z" fill="url(#tuTeal)" stroke="#0a5a48" stroke-width="1" stroke-linejoin="round"/></g>
    <g class="tu-flash"><circle cx="36" cy="38" r="20" fill="url(#tuTealGlow)"/></g>
  </g>
</svg>`,
/* ---- Tactique : Magnétor (I : fer à cheval · II : bobines et parabole · III : anneaux en orbite et tiges de Tesla) ---- */
tac: `<svg class="tur-svg tu-tac" viewBox="0 0 72 72" aria-hidden="true">${STM_TU_DEFS}
  ${STM_TU_GROUND}
  <g class="from3 tu-tesla"><path d="M20 56 V30" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M20 56 V30" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/><circle class="tu-bulbglow" cx="20" cy="27" r="6" fill="url(#tuGlow)"/><circle class="tu-bulb" cx="20" cy="27" r="3" fill="url(#tuCore)" stroke="#4a1a8a" stroke-width=".9"/>
    <path d="M58 56 V26" stroke="#1a1f26" stroke-width="3.6" stroke-linecap="round"/><path d="M58 56 V26" stroke="url(#tuSteelV)" stroke-width="2" stroke-linecap="round"/><circle class="tu-bulbglow" cx="58" cy="23" r="6" fill="url(#tuGlow)"/><circle class="tu-bulb" cx="58" cy="23" r="3" fill="url(#tuCore)" stroke="#4a1a8a" stroke-width=".9"/></g>
  <path d="M28 61 L31 50 H41 L44 61Z" fill="url(#tuSteelD)" stroke="#1a1f26" stroke-width="1.7" stroke-linejoin="round"/>
  <path d="M33 50 V44 H39 V50" fill="url(#tuSteel)" stroke="#1a1f26" stroke-width="1.6" stroke-linejoin="round"/>
  <ellipse cx="36" cy="50" rx="9.4" ry="3" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width="1.4"/>
  <g class="tu-body">
    <g class="from3 tu-orbit"><ellipse cx="34" cy="36" rx="25" ry="8" fill="none" stroke="#c58aff" stroke-opacity=".8" stroke-width="1.6" stroke-dasharray="5 4"/><ellipse cx="34" cy="36" rx="25" ry="8" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".7" style="transform-box:view-box" transform="rotate(60 34 36)"/></g>
    <path d="M46 25 H31 Q20 25 20 36 Q20 47 31 47 H46" fill="none" stroke="#1a1f26" stroke-width="11" stroke-linecap="butt" stroke-linejoin="round"/>
    <path d="M46 25 H31 Q20 25 20 36 Q20 47 31 47 H46" fill="none" stroke="url(#tuSteelV)" stroke-width="8" stroke-linecap="butt" stroke-linejoin="round"/>
    <path d="M30 22.6 Q21 23 18 33" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.5" stroke-linecap="round" transform="translate(1 1)"/>
    <g class="tu-coil"><rect x="33" y="20.6" width="11" height="9.8" rx="2" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.4"/><path d="M36 20.6 V30.4 M39.4 20.6 V30.4 M42.6 20.6 V30.4" stroke="#5e260c" stroke-width="1" opacity=".7"/>
      <rect x="33" y="41.6" width="11" height="9.8" rx="2" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.4"/><path d="M36 41.6 V51.4 M39.4 41.6 V51.4 M42.6 41.6 V51.4" stroke="#5e260c" stroke-width="1" opacity=".7"/></g>
    <g class="from2 tu-coil2"><rect x="15.6" y="31" width="9.6" height="10" rx="2" fill="url(#tuCopper)" stroke="#2a1006" stroke-width="1.4"/><path d="M18.6 31 V41 M21.4 31 V41" stroke="#5e260c" stroke-width="1" opacity=".7"/></g>
    <path d="M44.6 21.4 H51 V29.8 H44.6Z" fill="url(#tuMagR)" stroke="#3a0604" stroke-width="1.5" stroke-linejoin="round"/><path d="M50.2 21.4 V29.8" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>
    <path d="M44.6 42.2 H51 V50.6 H44.6Z" fill="url(#tuMagB)" stroke="#06103a" stroke-width="1.5" stroke-linejoin="round"/><path d="M50.2 42.2 V50.6" stroke="#fff" stroke-opacity=".7" stroke-width="1.6"/>
    <circle class="tu-bulbglow" cx="52" cy="35.6" r="9" fill="url(#tuGlow)"/>
    <path class="tu-arc" d="M52 30 L55.4 33.4 L51 35.4 L56 38 L52 42" fill="none" stroke="#e6c8ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="tu-arc a2" d="M52 30 L48.6 33 L53.6 36 L49 38.6 L52 42" fill="none" stroke="#9b5cff" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="from2 tu-dish"><path d="M30 18 Q36 8 44 12 L41 18Z" fill="url(#tuSteel)" stroke="#1a1f26" stroke-width="1.4" stroke-linejoin="round"/><path d="M36 17.6 V21" stroke="#1a1f26" stroke-width="2" stroke-linecap="round"/><circle cx="43" cy="9.6" r="1.8" fill="url(#tuBrass)" stroke="#4a2a08" stroke-width=".8"/></g>
    <g class="tu-flash"><circle cx="52" cy="35.6" r="18" fill="url(#tuGlow)"/></g>
  </g>
</svg>`
};
