/* =====================================================================
   SOUS-ZONES DE LA CARTE — des coins de Dofus rattachés aux zones principales
   Chaque sous-zone a ses monstres, un GROS MONSTRE (avec archimonstre), sa panoplie et sa relique.
   Sous-zones : Île des Wabbits · Lac des Blops · Village Kanniboul
   Zones normales (suite de la route principale) : Territoire des Porcos · Sanctuaire des Dragoeufs · Frigost
   Trois gros monstres ont leur propre DONJON (Dragon Cochon, Crocabulia, Mansot Royal) : ils n'apparaissent
   plus dans leur zone, qui a un autre gros monstre (zone.archiBase) dont l'archimonstre est la version ×2.
   Les niveaux de métier des recettes restent ≤ 100 (MAX_JOB_LEVEL).
   ===================================================================== */

/* ---------------------------- Ressources ---------------------------- */
Object.assign(RESOURCES, {
  /* Île des Wabbits */
  oreille_wabbit:     { name: 'Oreille de Wabbit', icon: '🐰', value: 14 },
  carotte_doree:      { name: 'Carotte Dorée', icon: '🥕', value: 18 },
  fourrure_wabbit:    { name: 'Fourrure de Wabbit', icon: '🐇', value: 22 },
  couronne_wabbit:    { name: 'Couronne du Wa Wabbit', icon: '⚜️', value: 280, rare: true },
  /* Lac des Blops */
  gelee_coco:         { name: 'Gelée de Blop Coco', icon: '🥥', value: 26 },
  gelee_griotte:      { name: 'Gelée de Blop Griotte', icon: '🍒', value: 28 },
  gelee_indigo:       { name: 'Gelée de Blop Indigo', icon: '🫐', value: 30 },
  gelee_reinette:     { name: 'Gelée de Blop Reinette', icon: '🍏', value: 32 },
  gelee_multicolore:  { name: 'Gelée Royale Multicolore', icon: '🌈', value: 420, rare: true },
  /* Village Kanniboul */
  pointe_javelot:     { name: 'Pointe de Javelot', icon: '🔱', value: 44 },
  plume_kanniboul:    { name: 'Plume de Kanniboul', icon: '🦚', value: 48 },
  masque_tribal:      { name: 'Masque Tribal', icon: '🎭', value: 52 },
  totem_ebil:         { name: "Totem d'Ebil", icon: '🗿', value: 560, rare: true },
  /* Territoire des Porcos */
  couenne_porsalu:    { name: 'Couenne de Porsalu', icon: '🥓', value: 62 },
  jambon_farle:       { name: 'Jambon de Farle', icon: '🍖', value: 68 },
  groin_dorgan:       { name: 'Groin de Don Dorgan', icon: '🐽', value: 74 },
  ecaille_cochon:     { name: 'Écaille du Dragon Cochon', icon: '🐉', value: 640, rare: true },
  /* Sanctuaire des Dragoeufs */
  coquille_dragoeuf:  { name: 'Coquille de Dragoeuf', icon: '🥚', value: 82 },
  ecaille_dore:       { name: 'Écaille de Dragoss Doré', icon: '🐲', value: 90 },
  braise_dragueuse:   { name: 'Braise de Dragueuse', icon: '🔥', value: 96 },
  oeuf_crocabulia:    { name: 'Œuf de Crocabulia', icon: '🪺', value: 780, rare: true },
  /* Frigost */
  poil_mansot:        { name: 'Poil de Mansot', icon: '🧣', value: 104 },
  croc_givre:         { name: 'Croc de Givre', icon: '🧊', value: 110 },
  eclat_givre:        { name: 'Éclat de Glace Éternelle', icon: '💎', value: 116 },
  cristal_mansot:     { name: 'Cristal du Mansot Royal', icon: '🔷', value: 900, rare: true },
  /* Clefs des donjons de sous-zone (fabriquées par le Bricoleur) */
  clef_dragon_cochon: { name: 'Clef du Repaire du Dragon Cochon', icon: '🗝️', value: 300, key: true },
  clef_crocabulia:    { name: "Clef de l'Antre de Crocabulia", icon: '🗝️', value: 450, key: true },
  clef_mansot:        { name: "Clef de l'Excavation du Mansot Royal", icon: '🗝️', value: 650, key: true },
});

/* ---------------------------- Monstres ----------------------------
   big : gros monstre de la sous-zone (il porte la relique ; son archimonstre est le ×2 de la sous-zone) */
Object.assign(MONSTERS, {
  /* Île des Wabbits (22-34) */
  wabbit:        { name: 'Wabbit', icon: '🐰', lvl: 22, hpm: 0.9, dm: 1.1, drops: [['oreille_wabbit', 0.5], ['carotte_doree', 0.15]] },
  black_wabbit:  { name: 'Black Wabbit', icon: '🐇', lvl: 26, hpm: 1, dm: 1.2, drops: [['carotte_doree', 0.45], ['oreille_wabbit', 0.2]] },
  wo_wabbit:     { name: 'Wo Wabbit', icon: '🐰', lvl: 30, hpm: 1.4, dm: 1.05, res: 8, drops: [['fourrure_wabbit', 0.45], ['carotte_doree', 0.15]] },
  wa_wabbit:     { name: 'Wa Wabbit', icon: '👑', lvl: 34, hpm: 2.3, dm: 1.2, res: 12, big: true, drops: [['couronne_wabbit', 0.3], ['fourrure_wabbit', 0.8], ['carotte_doree', 0.5]] },

  /* Lac des Blops (37-50) */
  blop_coco:     { name: 'Blop Coco', icon: '🟤', lvl: 37, hpm: 1.25, dm: 0.95, drops: [['gelee_coco', 0.5]] },
  blop_griotte:  { name: 'Blop Griotte', icon: '🔴', lvl: 40, hpm: 1.1, dm: 1.15, drops: [['gelee_griotte', 0.5]] },
  blop_indigo:   { name: 'Blop Indigo', icon: '🔵', lvl: 43, hpm: 1.15, dm: 1.1, res: 8, drops: [['gelee_indigo', 0.5]] },
  blop_reinette: { name: 'Blop Reinette', icon: '🟢', lvl: 46, hpm: 1.2, dm: 1.05, drops: [['gelee_reinette', 0.5]] },
  blop_royal:    { name: 'Blop Multicolore Royal', icon: '🌈', lvl: 50, hpm: 2.5, dm: 1.15, res: 12, big: true,
                   drops: [['gelee_multicolore', 0.3], ['gelee_coco', 0.6], ['gelee_griotte', 0.6], ['gelee_indigo', 0.6], ['gelee_reinette', 0.6]] },

  /* Village Kanniboul — Île de Moon (54-66) */
  kanniboul_jav:    { name: 'Kanniboul Jav', icon: '🗡️', lvl: 54, hpm: 1, dm: 1.2, drops: [['pointe_javelot', 0.45], ['masque_tribal', 0.12]] },
  kanniboul_ark:    { name: 'Kanniboul Ark', icon: '🏹', lvl: 58, hpm: 0.9, dm: 1.3, drops: [['plume_kanniboul', 0.45], ['pointe_javelot', 0.12]] },
  kanniboul_sarbak: { name: 'Kanniboul Sarbak', icon: '🎯', lvl: 62, hpm: 1, dm: 1.25, drops: [['masque_tribal', 0.45], ['plume_kanniboul', 0.12]] },
  kanniboul_ebil:   { name: 'Kanniboul Ebil', icon: '👺', lvl: 66, hpm: 2.4, dm: 1.2, res: 12, big: true,
                      drops: [['totem_ebil', 0.3], ['masque_tribal', 0.8], ['plume_kanniboul', 0.6], ['pointe_javelot', 0.6]] },

  /* Territoire des Porcos (74-88) */
  porsalu:       { name: 'Porsalu', icon: '🐖', lvl: 74, hpm: 1.1, dm: 1.15, drops: [['couenne_porsalu', 0.45], ['jambon_farle', 0.12]] },
  cochon_farle:  { name: 'Cochon de Farle', icon: '🐷', lvl: 78, hpm: 1.5, dm: 0.95, res: 8, drops: [['jambon_farle', 0.45], ['couenne_porsalu', 0.15]] },
  don_dorgan:    { name: 'Don Dorgan', icon: '🎩', lvl: 82, hpm: 1.2, dm: 1.3, drops: [['groin_dorgan', 0.45], ['jambon_farle', 0.12]] },
  verrat_guerre: { name: 'Verrat de Guerre', icon: '🐗', lvl: 86, hpm: 2.4, dm: 1.25, res: 12, big: true, // base de l'archimonstre de la zone
                   drops: [['groin_dorgan', 0.8], ['jambon_farle', 0.6], ['couenne_porsalu', 0.6]] },
  dragon_cochon: { name: 'Dragon Cochon', icon: '🐲', lvl: 88, hpm: 3, dm: 1.2, res: 14, big: true, boss: true, // boss de donjon
                   drops: [['ecaille_cochon', 0.3], ['groin_dorgan', 0.8], ['jambon_farle', 0.6], ['couenne_porsalu', 0.6]] },

  /* Sanctuaire des Dragoeufs (90-104) */
  dragoeuf_guerrier: { name: 'Dragoeuf Guerrier', icon: '🥚', lvl: 90, hpm: 1.3, dm: 1.2, res: 8, drops: [['coquille_dragoeuf', 0.45], ['ecaille_dore', 0.12]] },
  dragoss_dore:      { name: 'Dragoss Doré', icon: '🐲', lvl: 94, hpm: 1.1, dm: 1.25, drops: [['ecaille_dore', 0.45], ['coquille_dragoeuf', 0.12]] },
  dragueuse:         { name: 'Dragueuse', icon: '🔥', lvl: 98, hpm: 1.0, dm: 1.4, drops: [['braise_dragueuse', 0.45], ['ecaille_dore', 0.12]] },
  mere_dragoeuf:     { name: 'Mère Dragoeuf', icon: '🐉', lvl: 102, hpm: 2.5, dm: 1.3, res: 14, big: true, // base de l'archimonstre de la zone
                       drops: [['braise_dragueuse', 0.8], ['ecaille_dore', 0.6], ['coquille_dragoeuf', 0.6]] },
  crocabulia:        { name: 'Crocabulia', icon: '🐊', lvl: 104, hpm: 3.1, dm: 1.25, res: 15, big: true, boss: true, // boss de donjon
                       drops: [['oeuf_crocabulia', 0.3], ['braise_dragueuse', 0.8], ['ecaille_dore', 0.6], ['coquille_dragoeuf', 0.6]] },

  /* Frigost — Excavation du Mansot Royal (108-126) */
  timansot:      { name: 'Timansot', icon: '🧸', lvl: 108, hpm: 1.0, dm: 1.2, drops: [['poil_mansot', 0.45], ['croc_givre', 0.12]] },
  mansobese:     { name: 'Mansobèse', icon: '🦣', lvl: 113, hpm: 1.7, dm: 0.95, res: 10, drops: [['croc_givre', 0.45], ['poil_mansot', 0.15]] },
  shamansot:     { name: 'Shamansot', icon: '🧙', lvl: 118, hpm: 1.0, dm: 1.4, drops: [['eclat_givre', 0.45], ['poil_mansot', 0.12]] },
  mansot_colosse: { name: 'Mansot Colosse', icon: '🦣', lvl: 124, hpm: 2.6, dm: 1.3, res: 14, big: true, // base de l'archimonstre de la zone
                   drops: [['eclat_givre', 0.8], ['croc_givre', 0.6], ['poil_mansot', 0.6]] },
  mansot_royal:  { name: 'Mansot Royal', icon: '👑', lvl: 126, hpm: 3.2, dm: 1.25, res: 15, big: true, boss: true, // boss de donjon
                   drops: [['cristal_mansot', 0.3], ['eclat_givre', 0.8], ['croc_givre', 0.6], ['poil_mansot', 0.6]] },
});

/* ---------------------------- Sous-zones, puis zones Porcos / Dragoeufs / Frigost ---------------------------- */
ZONES.push(
  { id: 'wabbits', sub: true, parent: 'abraknydes', name: 'Île des Wabbits', region: 'Wabbits', lvl: [21, 34], monsters: ['wabbit', 'black_wabbit', 'wo_wabbit', 'wa_wabbit'],
    text: 'Une île verdoyante où les lapins ont pris le pouvoir. Le Wa Wabbit règne sur son château de carottes.' },
  { id: 'blops', sub: true, parent: 'cania', name: 'Lac des Blops', region: 'Blops', lvl: [36, 50], monsters: ['blop_coco', 'blop_griotte', 'blop_indigo', 'blop_reinette', 'blop_royal'],
    text: 'Dans les eaux troubles du lac de Cania, les blops de toutes les couleurs se dandinent autour de leur souverain multicolore.' },
  { id: 'kanniboul', sub: true, parent: 'koalaks', name: 'Village Kanniboul', region: 'Moon', lvl: [52, 66], monsters: ['kanniboul_jav', 'kanniboul_ark', 'kanniboul_sarbak', 'kanniboul_ebil'],
    text: "Au cœur de l'île de Moon, une tribu masquée défend son village à coups de javelots, de flèches et de sarbacanes." },
  { id: 'porcos', name: 'Territoire des Porcos', region: 'Porcos', lvl: [72, 88], monsters: ['porsalu', 'cochon_farle', 'don_dorgan'], archiBase: 'verrat_guerre',
    text: "Fermes, boue et lard : le territoire des Porcos. Un verrat de guerre rôde, et le repaire du Dragon Cochon n'est pas loin." },
  { id: 'dragoeufs', name: 'Sanctuaire des Dragoeufs', region: 'Dragoeufs', lvl: [90, 106], monsters: ['dragoeuf_guerrier', 'dragoss_dore', 'dragueuse'], archiBase: 'mere_dragoeuf',
    text: "Un sanctuaire de coquilles brûlantes où les œufs éclosent en dragons. L'antre de Crocabulia s'ouvre au fond de la couvée." },
  { id: 'frigost', name: 'Frigost', region: 'Frigost', lvl: [108, 126], monsters: ['timansot', 'mansobese', 'shamansot'], archiBase: 'mansot_colosse',
    text: "Sur la banquise de Frigost, les Mansots creusent l'excavation de leur roi. Prévois un gros manteau." },
);
Object.assign(ARCHI_NAMES, {
  wabbits: 'Wa Wabbit Impérial', blops: 'Blop Prismatique Primordial', kanniboul: 'Ebil le Dévoreur',
  porcos: 'Verrat de Guerre Légendaire', dragoeufs: 'Mère Dragoeuf Primordiale', frigost: 'Mansot Colosse Éternel',
});
for (const z of ZONES) if (!ARCHIS[z.id]) addArchi(z);

/* ---------------------------- Donjons des gros monstres ---------------------------- */
DUNGEONS.push(
  { id: 'dj_dragon_cochon', name: 'Repaire du Dragon Cochon', region: 'Porcos', lvl: [82, 92], key: 'clef_dragon_cochon',
    rooms: [['porsalu', 'porsalu', 'cochon_farle'], ['cochon_farle', 'don_dorgan'], ['don_dorgan', 'don_dorgan', 'porsalu']],
    boss: ['dragon_cochon', 'don_dorgan'], bonusXp: 1.5,
    text: 'Au fond des porcheries, le Dragon Cochon couve son trésor de lard et de pièces d’or. Une clef par entrée.' },
  { id: 'dj_crocabulia', name: 'Antre de Crocabulia', region: 'Dragoeufs', lvl: [98, 108], key: 'clef_crocabulia',
    rooms: [['dragoeuf_guerrier', 'dragoeuf_guerrier', 'dragoss_dore'], ['dragoss_dore', 'dragueuse'], ['dragueuse', 'dragueuse', 'dragoeuf_guerrier']],
    boss: ['crocabulia', 'dragueuse'], bonusXp: 1.5,
    text: 'Crocabulia, mi-crocodile mi-dragon, garde la couvée dans une caverne brûlante. Une clef par entrée.' },
  { id: 'dj_mansot', name: 'Excavation du Mansot Royal', region: 'Frigost', lvl: [120, 130], key: 'clef_mansot',
    rooms: [['timansot', 'timansot', 'mansobese'], ['mansobese', 'shamansot'], ['shamansot', 'shamansot', 'timansot']],
    boss: ['mansot_royal', 'shamansot'], bonusXp: 1.5,
    text: 'Sous la glace, le Mansot Royal siège sur un trône de cristal. Une clef par entrée.' },
);

/* ---------------------------- Panoplies ---------------------------- */
Object.assign(SETS, {
  wabbit:    { name: 'Panoplie du Wabbit',    bonus: { 2: { vit: 30, pp: 12 }, 3: { deg: 30, vit: 60, pp: 20 }, 4: { deg: 50, vit: 100, pp: 30, dodge: 3 }, 5: { deg: 70, vit: 140, pp: 40, dodge: 5, crit: 2 } } },
  blop:      { name: 'Panoplie Blop',         bonus: { 2: { vit: 30, res: 3 }, 3: { deg: 35, vit: 110 }, 4: { deg: 65, vit: 130, res: 6 }, 5: { deg: 95, vit: 150, res: 8, regen: 1 } } },
  kanniboul: { name: 'Panoplie Kanniboul',    bonus: { 2: { deg: 30, vit: 30 }, 3: { deg: 80, vit: 85, crit: 3 }, 4: { deg: 130, vit: 140, dodge: 3, crit: 4 }, 5: { deg: 180, vit: 200, dodge: 5, crit: 6 } } },
  porcos:    { name: 'Panoplie du Porcos',    bonus: { 2: { vit: 80 }, 3: { deg: 70, vit: 160 }, 4: { deg: 110, vit: 210, res: 7 }, 5: { deg: 170, vit: 290, res: 10, kamas: 10 } } },
  dragoeuf:  { name: 'Panoplie du Dragoeuf',  bonus: { 2: { vit: 95 }, 3: { deg: 75, vit: 200 }, 4: { deg: 150, vit: 300, crit: 3 }, 5: { deg: 190, vit: 360, res: 8, crit: 5 } } },
  mansot:    { name: 'Panoplie du Mansot',    bonus: { 2: { vit: 110 }, 3: { deg: 60, vit: 160, res: 6 }, 4: { deg: 130, vit: 270, res: 9 }, 5: { deg: 180, vit: 340, res: 12, dodge: 4 } } },
});

/* ---------------------------- Équipements & reliques ---------------------------- */
Object.assign(ITEMS, {
  /* Panoplie du Wabbit — oreilles, pattes et carottes */
  coiffe_wabbit:   { icon: '🐰', name: 'Coiffe du Wabbit', slot: 'coiffe', lvl: 24, set: 'wabbit', stats: { deg: [14, 21], vit: [39, 55], pp: [10, 16] } },
  bottes_wabbit:   { icon: '🐾', name: 'Pattes de Wabbit', slot: 'bottes', lvl: 26, set: 'wabbit', stats: { deg: [21, 32], vit: [16, 25], dodge: [2, 4] } },
  anneau_wabbit:   { icon: '🥕', name: 'Anneau de la Carotte Dorée', slot: 'anneau', lvl: 28, set: 'wabbit', stats: { deg: [17, 27], pp: [14, 22] } },
  cape_wabbit:     { icon: '🧥', name: 'Cape du Wa Wabbit', slot: 'cape', lvl: 32, set: 'wabbit', stats: { vit: [50, 72], sag: [14, 26], pp: [12, 20] } },
  sceptre_wabbit:  { icon: '🔱', name: 'Sceptre du Wa Wabbit', slot: 'arme', lvl: 34, set: 'wabbit', stats: { deg: [50, 72], crit: [1, 2] } },
  relique_wabbit:  { name: 'Patte de Lapin du Wa Wabbit', slot: 'relique', lvl: 30, relic: true, stats: { vit: [41, 59], pp: [15, 25], dodge: [4, 7], kamas: [15, 25] } },

  /* Panoplie Blop — une couleur par pièce, la masse est multicolore */
  coiffe_blop:     { icon: '🟤', name: 'Coiffe Blop Coco', slot: 'coiffe', lvl: 38, set: 'blop', stats: { deg: [15, 23], vit: [54, 77], res: [2, 4] } },
  cape_blop:       { icon: '🔴', name: 'Cape Blop Griotte', slot: 'cape', lvl: 40, set: 'blop', stats: { deg: [29, 45], vit: [39, 55], pp: [14, 22] } },
  amulette_blop:   { icon: '🔵', name: 'Amulette Blop Indigo', slot: 'amulette', lvl: 44, set: 'blop', stats: { vit: [63, 89], pp: [16, 28], res: [3, 5] } },
  anneau_blop:     { icon: '🟢', name: 'Anneau Blop Reinette', slot: 'anneau', lvl: 46, set: 'blop', stats: { deg: [27, 41], sag: [8, 14], pp: [18, 30] } },
  masse_blop:      { icon: '🌈', name: 'Masse du Blop Multicolore', slot: 'arme', lvl: 49, set: 'blop', stats: { deg: [59, 85], vit: [15, 24] } },
  relique_blop:    { name: 'Cœur Prismatique du Blop Royal', slot: 'relique', lvl: 48, relic: true, stats: { vit: [24, 38], res: [5, 8], regen: [1, 2] } },

  /* Panoplie Kanniboul — os, plumes et masques */
  coiffe_kanniboul:  { icon: '🎭', name: 'Masque du Kanniboul', slot: 'coiffe', lvl: 54, set: 'kanniboul', stats: { deg: [36, 51], vit: [75, 107], crit: [1, 2] } },
  cape_kanniboul:    { icon: '🦚', name: 'Pagne de Plumes', slot: 'cape', lvl: 58, set: 'kanniboul', stats: { deg: [20, 32], vit: [68, 96], dodge: [2, 4] } },
  ceinture_kanniboul:{ icon: '🦴', name: "Ceinture d'Os", slot: 'ceinture', lvl: 60, set: 'kanniboul', stats: { deg: [37, 52], vit: [48, 68] } },
  bottes_kanniboul:  { icon: '🥾', name: 'Sandales du Chasseur', slot: 'bottes', lvl: 62, set: 'kanniboul', stats: { deg: [46, 66], vit: [39, 55], dodge: [3, 5] } },
  lance_kanniboul:   { icon: '🔱', name: "Javelot d'Ebil", slot: 'arme', lvl: 64, set: 'kanniboul', stats: { deg: [87, 123], crit: [2, 4] } },
  relique_kanniboul: { name: "Totem d'Ebil", slot: 'relique', lvl: 62, relic: true, stats: { deg: [46, 66], crit: [3, 6], dmgPct: [10, 16] } },

  /* Panoplie du Porcos — lard, boucle et grosse chaîne dorée */
  coiffe_porcos:   { icon: '🎩', name: 'Chapeau de Don Dorgan', slot: 'coiffe', lvl: 76, set: 'porcos', stats: { deg: [43, 61], vit: [107, 152], pp: [24, 38] } },
  cape_porcos:     { icon: '🧥', name: 'Redingote de Farle', slot: 'cape', lvl: 78, set: 'porcos', stats: { vit: [108, 154], sag: [24, 40], res: [2, 4] } },
  ceinture_porcos: { icon: '🎗️', name: 'Ceinture du Porsalu', slot: 'ceinture', lvl: 80, set: 'porcos', stats: { deg: [45, 64], vit: [68, 96] } },
  amulette_porcos: { icon: '📿', name: 'Médaillon du Porcos', slot: 'amulette', lvl: 82, set: 'porcos', stats: { vit: [97, 138], pp: [28, 46], res: [4, 6] } },
  rotissoire_cochon:{ icon: '🍖', name: 'Rôtissoire du Dragon Cochon', slot: 'arme', lvl: 88, set: 'porcos', stats: { deg: [96, 136], vit: [26, 41] } },
  /* Dofus : objet à part (emplacements Dofus du héros), pas de jet : les stats sont fixes */
  dofus_turquoise: { name: 'Dofus Turquoise', slot: 'dofus', lvl: 80, dofus: true, stats: { crit: [22, 22], critDmg: [60, 60] } },
  relique_porcos:  { name: 'Tirelire du Dragon Cochon', slot: 'relique', lvl: 80, relic: true, stats: { deg: [33, 47], vit: [166, 237], kamas: [50, 80] } },

  /* Panoplie du Dragoeuf — coquille, ailes et braise */
  coiffe_dragoeuf:  { icon: '🥚', name: 'Coquille du Dragoeuf', slot: 'coiffe', lvl: 90, set: 'dragoeuf', stats: { deg: [43, 62], vit: [109, 155], res: [2, 4] } },
  cape_dragoeuf:    { icon: '🦇', name: 'Ailes de Dragoss', slot: 'cape', lvl: 94, set: 'dragoeuf', stats: { vit: [116, 165], sag: [34, 54], dodge: [3, 5] } },
  amulette_dragoeuf:{ icon: '📿', name: 'Collier de Dragueuse', slot: 'amulette', lvl: 96, set: 'dragoeuf', stats: { deg: [43, 62], vit: [106, 151], pp: [30, 50] } },
  anneau_dragoeuf:  { icon: '💍', name: 'Anneau de Dragoss Doré', slot: 'anneau', lvl: 98, set: 'dragoeuf', stats: { deg: [57, 81], pp: [32, 52], crit: [1, 2] } },
  croc_crocabulia:  { icon: '🦷', name: 'Croc de Crocabulia', slot: 'arme', lvl: 104, set: 'dragoeuf', stats: { deg: [125, 178], crit: [3, 5] } },
  relique_dragoeuf: { name: 'Œuf de Crocabulia', slot: 'relique', lvl: 100, relic: true, stats: { vit: [123, 175], dmgPct: [8, 12], speed: [10, 16] } },

  /* Panoplie du Mansot — fourrure, givre et glace éternelle */
  coiffe_mansot:   { icon: '🧣', name: 'Capuche du Mansot', slot: 'coiffe', lvl: 108, set: 'mansot', stats: { deg: [49, 70], vit: [119, 170], res: [3, 5] } },
  cape_mansot:     { icon: '🧥', name: 'Manteau du Mansot', slot: 'cape', lvl: 112, set: 'mansot', stats: { vit: [130, 184], sag: [40, 62], res: [3, 5] } },
  bottes_mansot:   { icon: '🥾', name: 'Bottes de Givre', slot: 'bottes', lvl: 114, set: 'mansot', stats: { deg: [66, 94], vit: [81, 116], dodge: [4, 6] } },
  ceinture_mansot: { icon: '🎗️', name: 'Ceinture de Glace', slot: 'ceinture', lvl: 118, set: 'mansot', stats: { deg: [56, 80], vit: [85, 121], pp: [36, 58] } },
  masse_mansot:    { icon: '🔨', name: 'Masse du Mansot Royal', slot: 'arme', lvl: 126, set: 'mansot', stats: { deg: [143, 204], crit: [3, 6] } },
  relique_mansot:  { name: 'Cœur de Givre du Mansot Royal', slot: 'relique', lvl: 120, relic: true, stats: { vit: [89, 126], res: [5, 8], dodge: [3, 5], dmgPct: [8, 12] } },
});

/* ---------------------------- Recettes (coût ×CRAFT_COST_MULT appliqué ici) ---------------------------- */
{
  const R = [
    /* Wabbits */
    { out: 'coiffe_wabbit', job: 'tailleur', lvl: 20, ing: { oreille_wabbit: 14, fourrure_wabbit: 6 } },
    { out: 'bottes_wabbit', job: 'cordonnier', lvl: 22, ing: { fourrure_wabbit: 12, carotte_doree: 6 } },
    { out: 'anneau_wabbit', job: 'bijoutier', lvl: 24, ing: { carotte_doree: 12, oreille_wabbit: 6 } },
    { out: 'cape_wabbit', job: 'tailleur', lvl: 27, ing: { fourrure_wabbit: 16, oreille_wabbit: 10, carotte_doree: 4 } },
    { out: 'sceptre_wabbit', job: 'forgeron', lvl: 30, ing: { couronne_wabbit: 1, carotte_doree: 14, fourrure_wabbit: 8 } },
    /* Blops */
    { out: 'coiffe_blop', job: 'tailleur', lvl: 33, ing: { gelee_coco: 14, gelee_reinette: 6 } },
    { out: 'cape_blop', job: 'tailleur', lvl: 35, ing: { gelee_griotte: 14, gelee_coco: 8 } },
    { out: 'amulette_blop', job: 'bijoutier', lvl: 38, ing: { gelee_indigo: 12, gelee_griotte: 8, gelee_reinette: 4 } },
    { out: 'anneau_blop', job: 'bijoutier', lvl: 40, ing: { gelee_reinette: 12, gelee_indigo: 8 } },
    { out: 'masse_blop', job: 'forgeron', lvl: 43, ing: { gelee_multicolore: 1, gelee_coco: 8, gelee_griotte: 8, gelee_indigo: 8, gelee_reinette: 8 } },
    /* Kanniboul */
    { out: 'coiffe_kanniboul', job: 'tailleur', lvl: 46, ing: { masque_tribal: 12, plume_kanniboul: 6 } },
    { out: 'cape_kanniboul', job: 'tailleur', lvl: 50, ing: { plume_kanniboul: 14, masque_tribal: 6, pointe_javelot: 4 } },
    { out: 'ceinture_kanniboul', job: 'cordonnier', lvl: 52, ing: { pointe_javelot: 12, masque_tribal: 8 } },
    { out: 'bottes_kanniboul', job: 'cordonnier', lvl: 54, ing: { plume_kanniboul: 10, pointe_javelot: 10 } },
    { out: 'lance_kanniboul', job: 'forgeron', lvl: 56, ing: { totem_ebil: 1, pointe_javelot: 16, masque_tribal: 8, plume_kanniboul: 8 } },
    /* Porcos */
    { out: 'coiffe_porcos', job: 'tailleur', lvl: 64, ing: { groin_dorgan: 10, couenne_porsalu: 8 } },
    { out: 'cape_porcos', job: 'tailleur', lvl: 66, ing: { jambon_farle: 14, couenne_porsalu: 10 } },
    { out: 'ceinture_porcos', job: 'cordonnier', lvl: 68, ing: { couenne_porsalu: 12, jambon_farle: 8 } },
    { out: 'amulette_porcos', job: 'bijoutier', lvl: 70, ing: { groin_dorgan: 12, jambon_farle: 8 } },
    { out: 'rotissoire_cochon', job: 'forgeron', lvl: 76, ing: { ecaille_cochon: 1, groin_dorgan: 14, jambon_farle: 12, couenne_porsalu: 10 } },
    /* Dragoeufs */
    { out: 'coiffe_dragoeuf', job: 'tailleur', lvl: 78, ing: { coquille_dragoeuf: 14, ecaille_dore: 6 } },
    { out: 'cape_dragoeuf', job: 'tailleur', lvl: 80, ing: { ecaille_dore: 14, coquille_dragoeuf: 8 } },
    { out: 'amulette_dragoeuf', job: 'bijoutier', lvl: 82, ing: { braise_dragueuse: 10, ecaille_dore: 8 } },
    { out: 'anneau_dragoeuf', job: 'bijoutier', lvl: 84, ing: { braise_dragueuse: 12, coquille_dragoeuf: 8 } },
    { out: 'croc_crocabulia', job: 'forgeron', lvl: 90, ing: { oeuf_crocabulia: 1, braise_dragueuse: 14, ecaille_dore: 12, coquille_dragoeuf: 10 } },
    /* Frigost */
    { out: 'coiffe_mansot', job: 'tailleur', lvl: 92, ing: { poil_mansot: 14, croc_givre: 6 } },
    { out: 'cape_mansot', job: 'tailleur', lvl: 94, ing: { poil_mansot: 16, eclat_givre: 6 } },
    { out: 'bottes_mansot', job: 'cordonnier', lvl: 96, ing: { croc_givre: 14, poil_mansot: 8 } },
    { out: 'ceinture_mansot', job: 'cordonnier', lvl: 98, ing: { eclat_givre: 12, croc_givre: 8 } },
    { out: 'masse_mansot', job: 'forgeron', lvl: 100, ing: { cristal_mansot: 1, eclat_givre: 14, croc_givre: 12, poil_mansot: 10 } },
    /* Clefs de donjon (Bricoleur) */
    { out: 'clef_dragon_cochon', job: 'bricoleur', lvl: 60, ing: { groin_dorgan: 10, jambon_farle: 8, couenne_porsalu: 8 } },
    { out: 'clef_crocabulia', job: 'bricoleur', lvl: 80, ing: { braise_dragueuse: 10, ecaille_dore: 8, coquille_dragoeuf: 8 } },
    { out: 'clef_mansot', job: 'bricoleur', lvl: 100, ing: { eclat_givre: 10, croc_givre: 8, poil_mansot: 8 } },
  ];
  for (const r of R) { for (const k of Object.keys(r.ing)) r.ing[k] *= CRAFT_COST_MULT; RECIPES.push(r); }
}

/* ---------------------------- Butin ---------------------------- */
Object.assign(GEAR_DROPS, {
  wabbit: ['coiffe_wabbit', 'bottes_wabbit'], black_wabbit: ['anneau_wabbit', 'coiffe_wabbit'], wo_wabbit: ['cape_wabbit', 'bottes_wabbit'],
  wa_wabbit: ['sceptre_wabbit', 'cape_wabbit', 'anneau_wabbit'],
  blop_coco: ['coiffe_blop'], blop_griotte: ['cape_blop'], blop_indigo: ['amulette_blop'], blop_reinette: ['anneau_blop'],
  blop_royal: ['masse_blop', 'amulette_blop', 'cape_blop'],
  kanniboul_jav: ['bottes_kanniboul', 'ceinture_kanniboul'], kanniboul_ark: ['cape_kanniboul', 'bottes_kanniboul'], kanniboul_sarbak: ['coiffe_kanniboul', 'ceinture_kanniboul'],
  kanniboul_ebil: ['lance_kanniboul', 'coiffe_kanniboul', 'cape_kanniboul'],
  porsalu: ['ceinture_porcos'], cochon_farle: ['cape_porcos', 'ceinture_porcos'], don_dorgan: ['coiffe_porcos', 'amulette_porcos'],
  verrat_guerre: ['cape_porcos', 'ceinture_porcos', 'amulette_porcos'],
  dragon_cochon: ['rotissoire_cochon', 'amulette_porcos', 'coiffe_porcos'],
  dragoeuf_guerrier: ['coiffe_dragoeuf'], dragoss_dore: ['cape_dragoeuf', 'anneau_dragoeuf'], dragueuse: ['amulette_dragoeuf', 'anneau_dragoeuf'],
  mere_dragoeuf: ['cape_dragoeuf', 'anneau_dragoeuf', 'coiffe_dragoeuf'],
  crocabulia: ['croc_crocabulia', 'amulette_dragoeuf', 'cape_dragoeuf'],
  timansot: ['bottes_mansot', 'ceinture_mansot'], mansobese: ['coiffe_mansot', 'cape_mansot'], shamansot: ['cape_mansot', 'ceinture_mansot'],
  mansot_colosse: ['coiffe_mansot', 'bottes_mansot', 'ceinture_mansot'],
  mansot_royal: ['masse_mansot', 'coiffe_mansot', 'bottes_mansot'],
});
Object.assign(RELIC_DROPS, {
  wa_wabbit: [['relique_wabbit', 0.0005]], blop_royal: [['relique_blop', 0.0005]], kanniboul_ebil: [['relique_kanniboul', 0.0005]],
  dragon_cochon: [['relique_porcos', 0.02], ['dofus_turquoise', 0.002]], crocabulia: [['relique_dragoeuf', 0.02]], mansot_royal: [['relique_mansot', 0.02]], // boss de donjon, comme le Bouftou Royal
});
