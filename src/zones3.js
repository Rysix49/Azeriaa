/* =====================================================================
   NOUVELLES TERRES (niveaux 128 → 192) — suite de la route principale après Frigost
   Trois régions, chacune = une zone de la route + une sous-zone + un donjon :
     Forêt de Pandala (128-146)      + Étang des Carpes Célestes (130-148)  + Pagode du Dragon de Jade
     Dunes des Ossements (150-168)   + Mines d'Ocre (152-170)               + Tombeau du Pharaon Éternel
     Ruelles de Srambad (172-190)    + Roseraie Noire (174-192)             + Manoir du Comte Vespéral
   Même mécanique que zones2.js : une zone a 3 monstres + un gros monstre (zone.archiBase, base de l'archimonstre) ;
   le boss du donjon porte relique et Dofus ; le gros monstre d'une sous-zone porte une relique très rare.
   Les stats d'objets suivent la courbe des panoplies précédentes : PV ≈ 1,5 × niveau, dégâts d'armure ≈ 0,62 × niveau,
   dégâts d'arme ≈ 1,35 × niveau. Les niveaux de métier des recettes restent ≤ 100 (MAX_JOB_LEVEL).
   ===================================================================== */

/* ---------------------------- Ressources ---------------------------- */
Object.assign(RESOURCES, {
  /* Forêt de Pandala */
  pousse_bambou:    { name: 'Pousse de Bambou', icon: '🎋', value: 122 },
  queue_kitsou:     { name: 'Queue de Kitsou', icon: '🦊', value: 128 },
  plume_tengu:      { name: 'Plume de Tengu', icon: '🪶', value: 134 },
  perle_jade:       { name: 'Perle du Dragon de Jade', icon: '🟢', value: 1000, rare: true },
  /* Étang des Carpes Célestes */
  petale_lotus:     { name: 'Pétale de Lotus', icon: '🪷', value: 124 },
  ecaille_koi:      { name: 'Écaille de Koï', icon: '🐠', value: 130 },
  plume_heron:      { name: 'Plume de Héron', icon: '🦩', value: 136 },
  ecaille_carpe:    { name: 'Écaille Dorée de la Carpe-Dragon', icon: '🐟', value: 1000, rare: true },
  /* Dunes des Ossements */
  carapace_doree:   { name: 'Carapace de Scarabosse', icon: '🪲', value: 140 },
  croc_dune:        { name: 'Croc de Crocodaille', icon: '🦷', value: 146 },
  bandelette:       { name: 'Bandelette Maudite', icon: '🩹', value: 152 },
  ankh_or:          { name: "Ankh d'Or Maudit", icon: '☥', value: 1100, rare: true },
  /* Mines d'Ocre */
  pepite_ocre:      { name: "Pépite d'Ocre", icon: '🟠', value: 144 },
  cristal_ocre:     { name: "Cristal d'Ocre", icon: '🔶', value: 150 },
  ecaille_roche:    { name: 'Écaille de Ver de Roche', icon: '🪨', value: 156 },
  coeur_ocre:       { name: "Cœur du Colosse d'Ocre", icon: '🧡', value: 1100, rare: true },
  /* Ruelles de Srambad */
  poil_ombre:       { name: "Poil d'Ombre", icon: '🐀', value: 164 },
  aile_vampyro:     { name: 'Aile de Vampyro', icon: '🦇', value: 170 },
  eclat_gargouille: { name: 'Éclat de Gargouille', icon: '🗿', value: 176 },
  croc_comte:       { name: 'Croc du Comte Vespéral', icon: '🩸', value: 1250, rare: true },
  /* Roseraie Noire */
  petale_noir:      { name: 'Pétale Noir', icon: '🥀', value: 168 },
  poussiere_nuit:   { name: 'Poussière de Papillon de Nuit', icon: '✨', value: 174 },
  paille_maudite:   { name: 'Paille Maudite', icon: '🌾', value: 180 },
  epine_reine:      { name: 'Épine de la Reine des Roses', icon: '🌹', value: 1250, rare: true },
  /* Clefs des donjons (fabriquées par le Bricoleur) */
  clef_dragon_jade: { name: 'Clef de la Pagode du Dragon de Jade', icon: '🗝️', value: 800, key: true },
  clef_pharaon:     { name: 'Clef du Tombeau du Pharaon Éternel', icon: '🗝️', value: 950, key: true },
  clef_comte:       { name: 'Clef du Manoir du Comte Vespéral', icon: '🗝️', value: 1100, key: true },
});

/* ---------------------------- Monstres ---------------------------- */
Object.assign(MONSTERS, {
  /* Forêt de Pandala (128-146) — bambou, esprits-renards, tengus, tanuki */
  bambouto:      { name: 'Bambouto', icon: '🎋', lvl: 128, hpm: 1.1, dm: 1.15, drops: [['pousse_bambou', 0.5], ['queue_kitsou', 0.12]] },
  kitsou:        { name: 'Kitsou Nufu', icon: '🦊', lvl: 133, hpm: 1.0, dm: 1.4, drops: [['queue_kitsou', 0.45], ['plume_tengu', 0.12]] },
  tengu:         { name: 'Tengu Corbeau', icon: '🐦', lvl: 138, hpm: 1.5, dm: 1.1, res: 8, drops: [['plume_tengu', 0.45], ['pousse_bambou', 0.12]] },
  tanukoui:      { name: 'Tanukoui San', icon: '🦝', lvl: 144, hpm: 2.6, dm: 1.3, res: 14, big: true, // base de l'archimonstre de la zone
                   drops: [['plume_tengu', 0.8], ['queue_kitsou', 0.6], ['pousse_bambou', 0.6]] },
  dragon_jade:   { name: 'Dragon de Jade', icon: '🐉', lvl: 146, hpm: 3.2, dm: 1.25, res: 15, big: true, boss: true, // boss de donjon
                   drops: [['perle_jade', 0.3], ['plume_tengu', 0.8], ['queue_kitsou', 0.6], ['pousse_bambou', 0.6]] },

  /* Étang des Carpes Célestes (130-148) — lotus, koï, héron */
  rainette_lotus:{ name: 'Rainette Lotus', icon: '🐸', lvl: 130, hpm: 1.3, dm: 1.05, res: 6, drops: [['petale_lotus', 0.5], ['ecaille_koi', 0.12]] },
  koi_celeste:   { name: 'Koï Céleste', icon: '🐠', lvl: 135, hpm: 1.0, dm: 1.35, drops: [['ecaille_koi', 0.45], ['plume_heron', 0.12]] },
  heron_pecheur: { name: 'Héron Pêcheur', icon: '🦩', lvl: 140, hpm: 1.2, dm: 1.3, drops: [['plume_heron', 0.45], ['petale_lotus', 0.12]] },
  carpe_dragon:  { name: 'Carpe-Dragon Impériale', icon: '🐟', lvl: 146, hpm: 2.5, dm: 1.25, res: 14, big: true,
                   drops: [['ecaille_carpe', 0.3], ['ecaille_koi', 0.8], ['plume_heron', 0.6], ['petale_lotus', 0.6]] },

  /* Dunes des Ossements (150-168) — scarabées d'or, crocodailles, momies, sphinx */
  scarabosse:    { name: 'Scarabosse Doré', icon: '🪲', lvl: 150, hpm: 1.2, dm: 1.15, res: 8, drops: [['carapace_doree', 0.5], ['bandelette', 0.12]] },
  crocodaille:   { name: 'Crocodaille des Dunes', icon: '🐊', lvl: 155, hpm: 1.6, dm: 1.15, res: 10, drops: [['croc_dune', 0.45], ['carapace_doree', 0.12]] },
  momie:         { name: 'Momie Errante', icon: '🧟', lvl: 160, hpm: 1.1, dm: 1.4, drops: [['bandelette', 0.45], ['croc_dune', 0.12]] },
  sphinx_gardien:{ name: 'Sphinx Gardien', icon: '🦁', lvl: 166, hpm: 2.7, dm: 1.3, res: 15, big: true, // base de l'archimonstre de la zone
                   drops: [['bandelette', 0.8], ['croc_dune', 0.6], ['carapace_doree', 0.6]] },
  pharaon:       { name: 'Pharaon Éternel', icon: '👑', lvl: 168, hpm: 3.2, dm: 1.3, res: 16, big: true, boss: true, // boss de donjon
                   drops: [['ankh_or', 0.3], ['bandelette', 0.8], ['croc_dune', 0.6], ['carapace_doree', 0.6]] },

  /* Mines d'Ocre (152-170) — taupes, golems de cristal, vers de roche */
  taupe_mineuse: { name: 'Taupe Mineuse', icon: '⛏️', lvl: 152, hpm: 1.15, dm: 1.2, drops: [['pepite_ocre', 0.5], ['cristal_ocre', 0.12]] },
  golem_ocre:    { name: "Golem d'Ocre", icon: '🗿', lvl: 158, hpm: 1.8, dm: 1.0, res: 12, drops: [['cristal_ocre', 0.45], ['pepite_ocre', 0.12]] },
  ver_roche:     { name: 'Ver de Roche', icon: '🪱', lvl: 164, hpm: 1.2, dm: 1.4, drops: [['ecaille_roche', 0.45], ['cristal_ocre', 0.12]] },
  colosse_cristal:{ name: 'Colosse de Cristal', icon: '💠', lvl: 170, hpm: 2.6, dm: 1.3, res: 15, big: true,
                   drops: [['coeur_ocre', 0.3], ['ecaille_roche', 0.8], ['cristal_ocre', 0.6], ['pepite_ocre', 0.6]] },

  /* Ruelles de Srambad (172-190) — rats cagoulés, vampyros, gargouilles, ombre vorace */
  rat_cagoule:   { name: 'Rat Cagoulé', icon: '🐀', lvl: 172, hpm: 1.0, dm: 1.3, drops: [['poil_ombre', 0.5], ['aile_vampyro', 0.12]] },
  vampyro:       { name: 'Vampyro', icon: '🦇', lvl: 177, hpm: 1.1, dm: 1.4, drops: [['aile_vampyro', 0.45], ['eclat_gargouille', 0.12]] },
  gargouille:    { name: 'Gargouille de Srambad', icon: '🗿', lvl: 182, hpm: 1.8, dm: 1.15, res: 14, drops: [['eclat_gargouille', 0.45], ['poil_ombre', 0.12]] },
  ombre_vorace:  { name: 'Ombre Vorace', icon: '👤', lvl: 188, hpm: 2.5, dm: 1.35, res: 14, big: true, // base de l'archimonstre de la zone
                   drops: [['eclat_gargouille', 0.8], ['aile_vampyro', 0.6], ['poil_ombre', 0.6]] },
  comte_vesperal:{ name: 'Comte Vespéral', icon: '🧛', lvl: 190, hpm: 3.3, dm: 1.3, res: 16, big: true, boss: true, // boss de donjon
                   drops: [['croc_comte', 0.3], ['eclat_gargouille', 0.8], ['aile_vampyro', 0.6], ['poil_ombre', 0.6]] },

  /* Roseraie Noire (174-192) — roses épineuses, papillons de nuit, épouvantails */
  rose_epineuse: { name: 'Rose Épineuse', icon: '🌹', lvl: 174, hpm: 1.2, dm: 1.25, res: 8, drops: [['petale_noir', 0.5], ['poussiere_nuit', 0.12]] },
  papillon_nuit: { name: 'Papillon de Nuit', icon: '🦋', lvl: 180, hpm: 1.0, dm: 1.4, drops: [['poussiere_nuit', 0.45], ['paille_maudite', 0.12]] },
  epouvantail:   { name: 'Épouvantail Carnivore', icon: '🎃', lvl: 185, hpm: 1.6, dm: 1.2, res: 10, drops: [['paille_maudite', 0.45], ['petale_noir', 0.12]] },
  reine_roses:   { name: 'Reine des Roses Noires', icon: '🥀', lvl: 190, hpm: 2.6, dm: 1.3, res: 15, big: true,
                   drops: [['epine_reine', 0.3], ['paille_maudite', 0.8], ['poussiere_nuit', 0.6], ['petale_noir', 0.6]] },
});

/* ---------------------------- Zones, sous-zones ---------------------------- */
ZONES.push(
  { id: 'pandala', name: 'Forêt de Pandala', region: 'Pandala', lvl: [128, 146], monsters: ['bambouto', 'kitsou', 'tengu'], archiBase: 'tanukoui',
    text: "Bambouseraies brumeuses, pagodes rouges et esprits-renards : la forêt de Pandala ne se traverse pas en silence. Au cœur des bambous, la pagode du Dragon de Jade veille." },
  { id: 'etang', sub: true, parent: 'pandala', name: 'Étang des Carpes Célestes', region: 'Etang', lvl: [130, 148], monsters: ['rainette_lotus', 'koi_celeste', 'heron_pecheur', 'carpe_dragon'],
    text: "Un étang de lotus où les carpes rêvent de devenir dragons. Les rainettes y coassent des prières, et le héron attend, immobile, que l'une d'elles remonte la cascade." },
  { id: 'dunes', name: 'Dunes des Ossements', region: 'Dunes', lvl: [150, 168], monsters: ['scarabosse', 'crocodaille', 'momie'], archiBase: 'sphinx_gardien',
    text: "Sous un soleil de plomb, les dunes cachent des os blanchis, des scarabées d'or et un tombeau que personne ne pille deux fois." },
  { id: 'mines', sub: true, parent: 'dunes', name: "Mines d'Ocre", region: 'Ocre', lvl: [152, 170], monsters: ['taupe_mineuse', 'golem_ocre', 'ver_roche', 'colosse_cristal'],
    text: "Des galeries oubliées où l'ocre scintille dans le noir. Les taupes creusent toujours, et le colosse de cristal n'aime pas les visiteurs." },
  { id: 'srambad', name: 'Ruelles de Srambad', region: 'Srambad', lvl: [172, 190], monsters: ['rat_cagoule', 'vampyro', 'gargouille'], archiBase: 'ombre_vorace',
    text: "Des ruelles étroites, des lanternes rouges et des ombres qui ne sont pas toujours les vôtres. Tout au bout, le manoir du Comte Vespéral." },
  { id: 'roseraie', sub: true, parent: 'srambad', name: 'Roseraie Noire', region: 'Roseraie', lvl: [174, 192], monsters: ['rose_epineuse', 'papillon_nuit', 'epouvantail', 'reine_roses'],
    text: "Un jardin où les roses poussent noires, et où les épouvantails n'ont pas peur des oiseaux : ils les mangent." },
);
Object.assign(ARCHI_NAMES, {
  pandala: 'Tanukoui San Légendaire', etang: 'Carpe-Dragon Céleste Primordiale',
  dunes: 'Sphinx Gardien Éternel', mines: 'Colosse de Cristal Primordial',
  srambad: 'Ombre Vorace Légendaire', roseraie: 'Reine des Roses Noires Éternelle',
});
for (const z of ZONES) if (!ARCHIS[z.id]) addArchi(z);

/* ---------------------------- Donjons ---------------------------- */
DUNGEONS.push(
  { id: 'dj_dragon_jade', name: 'Pagode du Dragon de Jade', region: 'Pandala', lvl: [140, 150], key: 'clef_dragon_jade',
    rooms: [['bambouto', 'bambouto', 'kitsou'], ['kitsou', 'tengu'], ['tengu', 'tengu', 'bambouto']],
    boss: ['dragon_jade', 'tengu'], bonusXp: 1.5,
    text: 'Au sommet de la pagode, le Dragon de Jade veille sur sa perle. Une clef par entrée.' },
  { id: 'dj_pharaon', name: 'Tombeau du Pharaon Éternel', region: 'Dunes', lvl: [162, 172], key: 'clef_pharaon',
    rooms: [['scarabosse', 'scarabosse', 'crocodaille'], ['crocodaille', 'momie'], ['momie', 'momie', 'scarabosse']],
    boss: ['pharaon', 'momie'], bonusXp: 1.5,
    text: 'Dans la chambre funéraire, le Pharaon Éternel attend ses visiteurs depuis dix mille ans. Une clef par entrée.' },
  { id: 'dj_comte', name: 'Manoir du Comte Vespéral', region: 'Srambad', lvl: [184, 194], key: 'clef_comte',
    rooms: [['rat_cagoule', 'rat_cagoule', 'vampyro'], ['vampyro', 'gargouille'], ['gargouille', 'gargouille', 'rat_cagoule']],
    boss: ['comte_vesperal', 'vampyro'], bonusXp: 1.5,
    text: 'Le Comte Vespéral reçoit à la tombée de la nuit, et ses invités ne repartent jamais. Une clef par entrée.' },
);

/* ---------------------------- Panoplies ---------------------------- */
Object.assign(SETS, {
  pandala:  { name: 'Panoplie de Pandala',          bonus: { 2: { vit: 130 }, 3: { deg: 60, vit: 160, res: 8 }, 4: { deg: 130, vit: 290, res: 11 }, 5: { deg: 180, vit: 360, res: 14, dodge: 5 } } },
  etang:    { name: 'Panoplie de la Carpe Céleste', bonus: { 2: { vit: 55, res: 4 }, 3: { deg: 110, vit: 250 }, 4: { deg: 180, vit: 330, res: 7 }, 5: { deg: 230, vit: 410, res: 10, regen: 1 } } },
  dunes:    { name: 'Panoplie des Dunes',           bonus: { 2: { vit: 160 }, 3: { deg: 70, vit: 200, res: 8 }, 4: { deg: 160, vit: 360, res: 11 }, 5: { deg: 250, vit: 500, res: 14, crit: 4 } } },
  mines:    { name: "Panoplie du Mineur d'Ocre",    bonus: { 2: { vit: 140, pp: 30 }, 3: { deg: 140, vit: 270, pp: 45 }, 4: { deg: 250, vit: 490, pp: 65, kamas: 8 }, 5: { deg: 370, vit: 740, pp: 90, kamas: 14 } } },
  srambad:  { name: 'Panoplie de Srambad',          bonus: { 2: { vit: 160 }, 3: { deg: 110, vit: 280, dodge: 3 }, 4: { deg: 210, vit: 460, dodge: 5 }, 5: { deg: 320, vit: 610, dodge: 7, crit: 6 } } },
  roseraie: { name: 'Panoplie de la Roseraie Noire', bonus: { 2: { vit: 40, regen: 1 }, 3: { deg: 140, vit: 320 }, 4: { deg: 230, vit: 440, regen: 1 }, 5: { deg: 310, vit: 550, crit: 5, regen: 2 } } },
});

/* ---------------------------- Équipements, reliques & Dofus ----------------------------
   Pour chaque pièce, la description du dessin attendu est donnée en commentaire (art4a-c.js). */
Object.assign(ITEMS, {
  /* Panoplie de Pandala — jade, bambou, laque rouge et or */
  coiffe_pandala:   { icon: '👒', name: 'Kasa de Bambou', slot: 'coiffe', lvl: 130, set: 'pandala', stats: { deg: [57, 82], vit: [141, 201], res: [3, 5] } },
  cape_pandala:     { icon: '🧥', name: 'Haori du Kitsou', slot: 'cape', lvl: 134, set: 'pandala', stats: { vit: [138, 197], sag: [48, 72], dodge: [4, 6] } },
  bottes_pandala:   { icon: '👡', name: 'Geta du Tengu', slot: 'bottes', lvl: 138, set: 'pandala', stats: { deg: [64, 91], vit: [92, 131], dodge: [5, 7] } },
  amulette_pandala: { icon: '🍶', name: 'Gourde du Tanukoui', slot: 'amulette', lvl: 142, set: 'pandala', stats: { deg: [52, 74], vit: [158, 225], pp: [40, 64] } },
  katana_jade:      { icon: '🗡️', name: 'Katana du Dragon de Jade', slot: 'arme', lvl: 146, set: 'pandala', stats: { deg: [158, 225], crit: [4, 7] } },
  relique_dragon_jade: { name: 'Perle du Dragon de Jade', slot: 'relique', lvl: 146, relic: true, stats: { deg: [101, 143], res: [6, 9], crit: [3, 5], dmgPct: [12, 16] } },
  dofus_emeraude:   { name: 'Dofus Émeraude', slot: 'dofus', lvl: 144, dofus: true, stats: { vit: [280, 280], res: [8, 8], regen: [1, 1] } },

  /* Panoplie de la Carpe Céleste — lotus rose, écailles de koï orange, eau turquoise */
  coiffe_etang:     { icon: '🪷', name: 'Couronne de Lotus', slot: 'coiffe', lvl: 132, set: 'etang', stats: { deg: [57, 82], vit: [143, 204], res: [3, 5] } },
  cape_etang:       { icon: '🐠', name: 'Nageoires de Koï', slot: 'cape', lvl: 136, set: 'etang', stats: { vit: [140, 200], sag: [46, 70], dodge: [4, 6] } },
  ceinture_etang:   { icon: '🎗️', name: "Ceinture d'Écailles", slot: 'ceinture', lvl: 138, set: 'etang', stats: { deg: [59, 84], vit: [99, 141], pp: [40, 62] } },
  anneau_etang:     { icon: '💍', name: "Anneau de Perle d'Eau", slot: 'anneau', lvl: 142, set: 'etang', stats: { deg: [72, 103], pp: [42, 66], crit: [1, 2] } },
  eventail_carpe:   { icon: '🪭', name: 'Éventail de la Carpe-Dragon', slot: 'arme', lvl: 146, set: 'etang', stats: { deg: [164, 233], crit: [3, 6] } },
  relique_carpe:    { name: 'Perle Céleste de la Carpe-Dragon', slot: 'relique', lvl: 140, relic: true, stats: { vit: [235, 335], dodge: [4, 6], regen: [1, 2] } },

  /* Panoplie des Dunes — or, lin, lapis, ankh et sable */
  coiffe_dunes:     { icon: '👑', name: 'Némès du Scarabosse', slot: 'coiffe', lvl: 152, set: 'dunes', stats: { deg: [66, 94], vit: [161, 229], res: [3, 6] } },
  cape_dunes:       { icon: '🧣', name: 'Linceul Royal', slot: 'cape', lvl: 156, set: 'dunes', stats: { vit: [184, 263], sag: [54, 82], res: [3, 5] } },
  amulette_dunes:   { icon: '📿', name: "Ousekh d'Or", slot: 'amulette', lvl: 160, set: 'dunes', stats: { deg: [63, 89], vit: [176, 250], pp: [48, 76] } },
  bottes_dunes:     { icon: '👡', name: 'Sandales de Sable', slot: 'bottes', lvl: 162, set: 'dunes', stats: { deg: [76, 108], vit: [110, 157], dodge: [5, 8] } },
  khepesh_pharaon:  { icon: '🗡️', name: 'Khépesh du Pharaon Éternel', slot: 'arme', lvl: 168, set: 'dunes', stats: { deg: [170, 242], crit: [5, 8] } },
  relique_pharaon:  { name: 'Ankh du Pharaon Éternel', slot: 'relique', lvl: 168, relic: true, stats: { vit: [225, 320], dmgPct: [14, 18], speed: [12, 18] } },
  dofus_ocre:       { name: 'Dofus Ocre', slot: 'dofus', lvl: 166, dofus: true, stats: { deg: [310, 310], pp: [70, 70], dmgPct: [12, 12], kamas: [20, 20], xpPct: [10, 10] } },

  /* Panoplie du Mineur d'Ocre — cuir, fer, lampe, cristaux ocre et cyan */
  coiffe_mines:     { icon: '⛑️', name: 'Casque de Mineur à Lampe', slot: 'coiffe', lvl: 154, set: 'mines', stats: { deg: [80, 113], vit: [190, 271], pp: [40, 64] } },
  ceinture_mines:   { icon: '🎗️', name: 'Ceinture à Outils', slot: 'ceinture', lvl: 158, set: 'mines', stats: { deg: [68, 97], vit: [113, 160], pp: [48, 76] } },
  bottes_mines:     { icon: '🥾', name: 'Bottes à Crampons', slot: 'bottes', lvl: 160, set: 'mines', stats: { deg: [85, 121], vit: [124, 177], dodge: [4, 6] } },
  amulette_mines:   { icon: '💎', name: "Pendentif d'Ocre", slot: 'amulette', lvl: 164, set: 'mines', stats: { deg: [42, 59], vit: [113, 161], pp: [50, 80], res: [4, 6] } },
  pioche_ocre:      { icon: '⛏️', name: "Pioche de Cristal d'Ocre", slot: 'arme', lvl: 170, set: 'mines', stats: { deg: [178, 253], crit: [4, 7] } },
  relique_mines:    { name: "Cœur de Cristal d'Ocre", slot: 'relique', lvl: 160, relic: true, stats: { deg: [119, 170], vit: [357, 509], pp: [60, 90], kamas: [60, 100], xpPct: [8, 14] } },

  /* Panoplie de Srambad — cuir noir, prune, argent et lanternes rouges */
  coiffe_srambad:   { icon: '🥷', name: 'Capuche du Rat Cagoulé', slot: 'coiffe', lvl: 172, set: 'srambad', stats: { deg: [74, 105], vit: [179, 255], dodge: [3, 5] } },
  cape_srambad:     { icon: '🦇', name: 'Cape de Vampyro', slot: 'cape', lvl: 176, set: 'srambad', stats: { vit: [167, 238], sag: [62, 92], dodge: [4, 6] } },
  ceinture_srambad: { icon: '🎗️', name: 'Ceinturon de Dagues', slot: 'ceinture', lvl: 180, set: 'srambad', stats: { deg: [72, 103], vit: [115, 164], pp: [54, 86] } },
  bottes_srambad:   { icon: '🥾', name: "Bottes Feutrées d'Ombre", slot: 'bottes', lvl: 184, set: 'srambad', stats: { deg: [74, 106], vit: [109, 156], dodge: [6, 9] } },
  rapiere_comte:    { icon: '🗡️', name: 'Rapière du Comte Vespéral', slot: 'arme', lvl: 190, set: 'srambad', stats: { deg: [177, 252], crit: [6, 10] } },
  relique_comte:    { name: 'Médaillon du Comte Vespéral', slot: 'relique', lvl: 190, relic: true, stats: { deg: [146, 209], dodge: [4, 7], crit: [4, 7], dmgPct: [16, 22] } },
  dofus_pourpre:    { name: 'Dofus Pourpre', slot: 'dofus', lvl: 188, dofus: true, stats: { deg: [290, 290], critDmg: [50, 50], dmgPct: [14, 14] } },
  dofus_ebene:      { name: 'Dofus Ébène', slot: 'dofus', lvl: 190, dofus: true, stats: { vit: [210, 210], dodge: [10, 10], crit: [18, 18], speed: [15, 15] } },

  /* Panoplie de la Roseraie Noire — pétales noirs, épines, rouge sang et vert sombre */
  coiffe_roseraie:  { icon: '🥀', name: "Couronne d'Épines Noires", slot: 'coiffe', lvl: 176, set: 'roseraie', stats: { deg: [72, 103], vit: [175, 249], res: [3, 6] } },
  cape_roseraie:    { icon: '🧥', name: 'Cape de Pétales Noirs', slot: 'cape', lvl: 180, set: 'roseraie', stats: { vit: [186, 265], sag: [62, 94], res: [3, 5] } },
  amulette_roseraie:{ icon: '📿', name: 'Pendentif de Rose Noire', slot: 'amulette', lvl: 184, set: 'roseraie', stats: { deg: [66, 94], vit: [185, 263], pp: [54, 86] } },
  anneau_roseraie:  { icon: '💍', name: "Bague d'Épine", slot: 'anneau', lvl: 186, set: 'roseraie', stats: { deg: [78, 111], pp: [56, 90], crit: [1, 3] } },
  fouet_epines:     { icon: '🌹', name: "Fouet d'Épines de la Reine", slot: 'arme', lvl: 190, set: 'roseraie', stats: { deg: [184, 262], crit: [5, 9] } },
  relique_roseraie: { name: 'Rose Éternelle de la Reine', slot: 'relique', lvl: 182, relic: true, stats: { vit: [268, 382], dmgPct: [10, 14], regen: [1, 2] } },
});

/* ---------------------------- Recettes (coût ×CRAFT_COST_MULT appliqué ici) ---------------------------- */
{
  const R = [
    /* Pandala */
    { out: 'coiffe_pandala', job: 'tailleur', lvl: 94, ing: { pousse_bambou: 14, queue_kitsou: 6 } },
    { out: 'cape_pandala', job: 'tailleur', lvl: 96, ing: { queue_kitsou: 16, pousse_bambou: 8 } },
    { out: 'bottes_pandala', job: 'cordonnier', lvl: 98, ing: { plume_tengu: 14, pousse_bambou: 8 } },
    { out: 'amulette_pandala', job: 'bijoutier', lvl: 98, ing: { plume_tengu: 12, queue_kitsou: 8 } },
    { out: 'katana_jade', job: 'forgeron', lvl: 100, ing: { perle_jade: 1, plume_tengu: 14, queue_kitsou: 12, pousse_bambou: 10 } },
    /* Étang des Carpes Célestes */
    { out: 'coiffe_etang', job: 'tailleur', lvl: 94, ing: { petale_lotus: 14, ecaille_koi: 6 } },
    { out: 'cape_etang', job: 'tailleur', lvl: 96, ing: { ecaille_koi: 14, petale_lotus: 8 } },
    { out: 'ceinture_etang', job: 'cordonnier', lvl: 97, ing: { ecaille_koi: 12, plume_heron: 8 } },
    { out: 'anneau_etang', job: 'bijoutier', lvl: 98, ing: { plume_heron: 12, petale_lotus: 8 } },
    { out: 'eventail_carpe', job: 'forgeron', lvl: 100, ing: { ecaille_carpe: 1, plume_heron: 14, ecaille_koi: 12, petale_lotus: 10 } },
    /* Dunes des Ossements */
    { out: 'coiffe_dunes', job: 'tailleur', lvl: 95, ing: { carapace_doree: 14, bandelette: 6 } },
    { out: 'cape_dunes', job: 'tailleur', lvl: 97, ing: { bandelette: 16, carapace_doree: 8 } },
    { out: 'amulette_dunes', job: 'bijoutier', lvl: 98, ing: { croc_dune: 12, bandelette: 8 } },
    { out: 'bottes_dunes', job: 'cordonnier', lvl: 99, ing: { croc_dune: 14, carapace_doree: 8 } },
    { out: 'khepesh_pharaon', job: 'forgeron', lvl: 100, ing: { ankh_or: 1, croc_dune: 14, bandelette: 12, carapace_doree: 10 } },
    /* Mines d'Ocre */
    { out: 'coiffe_mines', job: 'tailleur', lvl: 95, ing: { pepite_ocre: 14, cristal_ocre: 6 } },
    { out: 'ceinture_mines', job: 'cordonnier', lvl: 97, ing: { cristal_ocre: 12, ecaille_roche: 8 } },
    { out: 'bottes_mines', job: 'cordonnier', lvl: 98, ing: { ecaille_roche: 14, pepite_ocre: 8 } },
    { out: 'amulette_mines', job: 'bijoutier', lvl: 99, ing: { cristal_ocre: 12, ecaille_roche: 8 } },
    { out: 'pioche_ocre', job: 'forgeron', lvl: 100, ing: { coeur_ocre: 1, cristal_ocre: 14, ecaille_roche: 12, pepite_ocre: 10 } },
    /* Ruelles de Srambad */
    { out: 'coiffe_srambad', job: 'tailleur', lvl: 96, ing: { poil_ombre: 14, aile_vampyro: 6 } },
    { out: 'cape_srambad', job: 'tailleur', lvl: 97, ing: { aile_vampyro: 16, poil_ombre: 8 } },
    { out: 'ceinture_srambad', job: 'cordonnier', lvl: 98, ing: { eclat_gargouille: 12, poil_ombre: 8 } },
    { out: 'bottes_srambad', job: 'cordonnier', lvl: 99, ing: { aile_vampyro: 12, eclat_gargouille: 10 } },
    { out: 'rapiere_comte', job: 'forgeron', lvl: 100, ing: { croc_comte: 1, eclat_gargouille: 14, aile_vampyro: 12, poil_ombre: 10 } },
    /* Roseraie Noire */
    { out: 'coiffe_roseraie', job: 'tailleur', lvl: 96, ing: { petale_noir: 14, paille_maudite: 6 } },
    { out: 'cape_roseraie', job: 'tailleur', lvl: 97, ing: { poussiere_nuit: 16, petale_noir: 8 } },
    { out: 'amulette_roseraie', job: 'bijoutier', lvl: 99, ing: { poussiere_nuit: 12, paille_maudite: 8 } },
    { out: 'anneau_roseraie', job: 'bijoutier', lvl: 99, ing: { petale_noir: 12, poussiere_nuit: 8 } },
    { out: 'fouet_epines', job: 'forgeron', lvl: 100, ing: { epine_reine: 1, paille_maudite: 14, poussiere_nuit: 12, petale_noir: 10 } },
    /* Clefs de donjon (Bricoleur) */
    { out: 'clef_dragon_jade', job: 'bricoleur', lvl: 96, ing: { plume_tengu: 10, queue_kitsou: 8, pousse_bambou: 8 } },
    { out: 'clef_pharaon', job: 'bricoleur', lvl: 98, ing: { croc_dune: 10, bandelette: 8, carapace_doree: 8 } },
    { out: 'clef_comte', job: 'bricoleur', lvl: 100, ing: { eclat_gargouille: 10, aile_vampyro: 8, poil_ombre: 8 } },
  ];
  for (const r of R) { for (const k of Object.keys(r.ing)) r.ing[k] *= CRAFT_COST_MULT; RECIPES.push(r); }
}

/* ---------------------------- Butin ---------------------------- */
Object.assign(GEAR_DROPS, {
  bambouto: ['coiffe_pandala', 'bottes_pandala'], kitsou: ['cape_pandala', 'coiffe_pandala'], tengu: ['bottes_pandala', 'amulette_pandala'],
  tanukoui: ['amulette_pandala', 'cape_pandala', 'bottes_pandala'], dragon_jade: ['katana_jade', 'amulette_pandala', 'coiffe_pandala'],
  rainette_lotus: ['coiffe_etang', 'ceinture_etang'], koi_celeste: ['cape_etang', 'anneau_etang'], heron_pecheur: ['anneau_etang', 'ceinture_etang'],
  carpe_dragon: ['eventail_carpe', 'cape_etang', 'coiffe_etang'],
  scarabosse: ['coiffe_dunes', 'bottes_dunes'], crocodaille: ['bottes_dunes', 'cape_dunes'], momie: ['cape_dunes', 'amulette_dunes'],
  sphinx_gardien: ['amulette_dunes', 'coiffe_dunes', 'cape_dunes'], pharaon: ['khepesh_pharaon', 'amulette_dunes', 'bottes_dunes'],
  taupe_mineuse: ['coiffe_mines', 'bottes_mines'], golem_ocre: ['amulette_mines', 'ceinture_mines'], ver_roche: ['ceinture_mines', 'bottes_mines'],
  colosse_cristal: ['pioche_ocre', 'amulette_mines', 'coiffe_mines'],
  rat_cagoule: ['coiffe_srambad', 'ceinture_srambad'], vampyro: ['cape_srambad', 'bottes_srambad'], gargouille: ['ceinture_srambad', 'bottes_srambad'],
  ombre_vorace: ['coiffe_srambad', 'cape_srambad', 'ceinture_srambad'], comte_vesperal: ['rapiere_comte', 'cape_srambad', 'coiffe_srambad'],
  rose_epineuse: ['coiffe_roseraie', 'anneau_roseraie'], papillon_nuit: ['cape_roseraie', 'amulette_roseraie'], epouvantail: ['cape_roseraie', 'anneau_roseraie'],
  reine_roses: ['fouet_epines', 'coiffe_roseraie', 'amulette_roseraie'],
});
Object.assign(RELIC_DROPS, {
  carpe_dragon: [['relique_carpe', 0.0005]], colosse_cristal: [['relique_mines', 0.0005]], reine_roses: [['relique_roseraie', 0.0005]], // gros monstres de sous-zone
  dragon_jade: [['relique_dragon_jade', 0.02], ['dofus_emeraude', 0.002]],                                 // boss de donjon : relique + Dofus
  pharaon: [['relique_pharaon', 0.02], ['dofus_ocre', 0.002]],
  comte_vesperal: [['relique_comte', 0.02], ['dofus_pourpre', 0.002], ['dofus_ebene', 0.0015]],
});
