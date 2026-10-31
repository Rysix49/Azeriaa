/* ====================================================================
   DONJONS HÉROÏQUES
   Chaque donjon existe en version héroïque : mêmes salles, mêmes monstres mais de niveau ×2
   (PV et dégâts suivent la courbe de niveau, plus un réglage par donjon dans HEROIC_TUNE),
   un boss qui s'enrage après quelques tours, et le meilleur butin du jeu au bout.
   Les monstres héroïques sont des copies `h_<id>` des monstres de base (même dessin, nimbe rouge en CSS).
   ==================================================================== */
const HEROIC_COST = 2;        // clefs consommées à chaque entrée
const HEROIC_XP_MULT = 3;     // XP calculée sur le niveau d'origine du monstre, puis ×3 (pas sur le niveau ×2)
const HEROIC_ENRAGE_TURN = 12; // le boss s'enrage : à partir de ce tour, +12 % de dégâts par tour supplémentaire
const HEROIC_ENRAGE_STEP = 0.12;
const HEROIC_STASIS = 0.001;  // chance, pour chaque objet du butin, qu'il tombe stasifié (stats ×2) à chaque fin de donjon
/* Multiplicateur du budget de puissance des objets héroïques par rang de donjon (1 = Bouftou … 8 = Comte), voir tools/equip_audit.cjs */
const HEROIC_POWER = [1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72];

/* Réglage par donjon : hp / dm = multiplicateurs ajoutés au niveau ×2, res = résistance ajoutée (points), rec = niveau conseillé */
const HEROIC_TUNE = {
  dj_bouftou:       { hp: 2.6, dm: 2.6, res: 0, rec: 35 },
  dj_bwork:         { hp: 2.4, dm: 2.4, res: 0, rec: 65 },
  dj_dragon_cochon: { hp: 2.5, dm: 2.5, res: 0, rec: 100 },
  dj_crocabulia:    { hp: 2.58, dm: 2.58, res: 0, rec: 118 },
  dj_mansot:        { hp: 2.45, dm: 2.45, res: 0, rec: 140 },
  dj_dragon_jade:   { hp: 3.1, dm: 3.1, res: 0, rec: 160 },
  dj_pharaon:       { hp: 4.45, dm: 4.45, res: 0, rec: 182 },
  dj_comte:         { hp: 4.3, dm: 4.3, res: 0, rec: 198 },
};

const HDUNGEONS = [];
const HERO_OF = {};   // id du donjon normal -> id du donjon héroïque
const HERO_BASE = {}; // id du donjon héroïque -> id du donjon normal
const HEROIC_LOOT = {}; // id du donjon héroïque -> [[objet, chance par donjon terminé]] (rempli plus bas)

function heroicMon(mid, T) {
  const hid = 'h_' + mid, b = MONSTERS[mid];
  if (MONSTERS[hid]) return hid;
  MONSTERS[hid] = {
    ...b, lvl: b.lvl * 2, xpl: b.lvl, xhpm: b.hpm || 1, xpmul: HEROIC_XP_MULT, hpm: (b.hpm || 1) * T.hp, dm: (b.dm || 1) * T.dm,
    res: Math.min(60, (b.res || 0) + T.res), heroic: true, hbase: mid,
    drops: b.drops.map(([r, c]) => [r, Math.min(1, c * 1.5)]),
  };
  return hid;
}

for (const d of DUNGEONS.slice()) {
  const T = HEROIC_TUNE[d.id]; if (!T) continue;
  const rooms = d.rooms.map(r => r.map(m => heroicMon(m, T))), boss = d.boss.map(m => heroicMon(m, T));
  const id = 'dh_' + d.id.slice(3), ml = [...rooms.flat(), ...boss].map(m => MONSTERS[m].lvl);
  HDUNGEONS.push({
    id, name: d.name + ' héroïque', region: d.region, lvl: [T.rec, T.rec + 10], mlvl: [Math.min(...ml), Math.max(...ml)], key: d.key, keys: HEROIC_COST,
    rooms, boss, bonusXp: d.bonusXp, heroic: true, base: d.id,
    text: 'Le même donjon, mais ses habitants ont le double de niveau et le boss s’enrage. Réservé aux meilleurs, pour le meilleur butin du jeu. Deux clefs par entrée.',
  });
  HERO_OF[d.id] = id; HERO_BASE[id] = d.id;
}

/* ---------------------------- Butin héroïque (objets exclusifs, dessins dans art5a/b/c.js) ---------------------------- */
Object.assign(ITEMS, {
  hx_fleau_bouftou      : { icon: SLOT_ICON['arme'], name: 'Fléau du Bouftou Royal', slot: 'arme', lvl: 33, heroic: true, hr: 1, stats: { deg: [50, 72], vit: [17, 25] } },
  hx_anneau_laine       : { icon: SLOT_ICON['anneau'], name: 'Anneau de Toison Royale', slot: 'anneau', lvl: 33, heroic: true, hr: 1, stats: { deg: [21, 31], vit: [8, 12], crit: [1, 1] } },
  hx_relique_bouftou    : { name: 'Couronne du Bouftou Royal', slot: 'relique', lvl: 33, heroic: true, hr: 1, relic: true, stats: { vit: [54, 76], deg: [24, 34], xpPct: [7, 9], res: [2, 4] } },
  hx_hache_bworkette    : { icon: SLOT_ICON['arme'], name: 'Hache-Totem de la Bworkette', slot: 'arme', lvl: 63, heroic: true, hr: 2, stats: { deg: [97, 137], crit: [4, 6], vit: [19, 27] } },
  hx_ceinture_bwork     : { icon: SLOT_ICON['ceinture'], name: 'Ceinture de Chef de Guerre', slot: 'ceinture', lvl: 63, heroic: true, hr: 2, stats: { vit: [65, 93], deg: [32, 46], res: [2, 4] } },
  hx_relique_bworkette  : { name: 'Tambour de Guerre de la Bworkette', slot: 'relique', lvl: 63, heroic: true, hr: 2, relic: true, stats: { deg: [48, 68], dmgPct: [18, 26], crit: [2, 4] } },
  hx_tranchoir_cochon   : { icon: SLOT_ICON['arme'], name: 'Tranchoir du Dragon Cochon', slot: 'arme', lvl: 98, heroic: true, hr: 3, stats: { deg: [144, 204], vit: [58, 82] } },
  hx_cape_lard          : { icon: SLOT_ICON['cape'], name: 'Cape de Lard Doré', slot: 'cape', lvl: 98, heroic: true, hr: 3, stats: { vit: [134, 190], deg: [47, 67], kamas: [13, 19], res: [4, 6] } },
  hx_relique_cochon     : { name: 'Coffre du Dragon Cochon', slot: 'relique', lvl: 98, heroic: true, hr: 3, relic: true, stats: { vit: [276, 392], deg: [55, 79], kamas: [83, 118], pp: [68, 98] } },
  hx_machoire_croca     : { icon: SLOT_ICON['arme'], name: 'Mâchoire de Crocabulia', slot: 'arme', lvl: 116, heroic: true, hr: 4, stats: { deg: [186, 264], crit: [7, 11] } },
  hx_bottes_braise      : { icon: SLOT_ICON['bottes'], name: 'Bottes d\'Écailles Ardentes', slot: 'bottes', lvl: 116, heroic: true, hr: 4, stats: { vit: [130, 184], deg: [78, 110], dodge: [7, 9] } },
  hx_relique_croca      : { name: 'Écaille de Braise Primordiale', slot: 'relique', lvl: 116, heroic: true, hr: 4, relic: true, stats: { vit: [154, 220], dmgPct: [12, 18], speed: [18, 26], deg: [46, 66] } },
  hx_dofus_cawotte      : { name: 'Dofus Cawotte', slot: 'dofus', lvl: 116, heroic: true, hr: 4, dofus: true, stats: { deg: [246, 246], crit: [15, 15], dmgPct: [12, 12] } },
  hx_sceptre_givre      : { icon: SLOT_ICON['arme'], name: 'Sceptre du Trône de Givre', slot: 'arme', lvl: 138, heroic: true, hr: 5, stats: { deg: [182, 259], crit: [7, 11], vit: [45, 65] } },
  hx_coiffe_givre       : { icon: SLOT_ICON['coiffe'], name: 'Couronne de Givre Éternel', slot: 'coiffe', lvl: 138, heroic: true, hr: 5, stats: { vit: [172, 246], deg: [78, 110], res: [8, 12] } },
  hx_relique_mansot     : { name: 'Trône de Cristal du Mansot Royal', slot: 'relique', lvl: 138, heroic: true, hr: 5, relic: true, stats: { vit: [149, 213], res: [7, 11], dodge: [6, 8], dmgPct: [11, 15], deg: [30, 42] } },
  hx_dofus_vulbis       : { name: 'Dofus Vulbis', slot: 'dofus', lvl: 138, heroic: true, hr: 5, dofus: true, stats: { vit: [278, 278], res: [11, 11], dodge: [11, 11] } },
  hx_lame_jade          : { icon: SLOT_ICON['arme'], name: 'Lame du Dragon Empereur', slot: 'arme', lvl: 158, heroic: true, hr: 6, stats: { deg: [208, 296], crit: [11, 15], vit: [41, 59] } },
  hx_amulette_jade      : { icon: SLOT_ICON['amulette'], name: 'Pendentif du Dragon de Jade', slot: 'amulette', lvl: 158, heroic: true, hr: 6, stats: { vit: [177, 253], deg: [71, 101], res: [7, 11], pp: [26, 38] } },
  hx_relique_jade       : { name: 'Orbe Impérial du Dragon de Jade', slot: 'relique', lvl: 158, heroic: true, hr: 6, relic: true, stats: { deg: [153, 217], res: [11, 15], crit: [6, 8], dmgPct: [17, 24] } },
  hx_dofus_kaliptus     : { name: 'Dofus Kaliptus', slot: 'dofus', lvl: 158, heroic: true, hr: 6, dofus: true, stats: { deg: [354, 354], vit: [283, 283], res: [11, 11] } },
  hx_sceptre_pharaon    : { icon: SLOT_ICON['arme'], name: 'Sceptre Ouas d\'Éternité', slot: 'arme', lvl: 180, heroic: true, hr: 7, stats: { deg: [255, 363], crit: [12, 18] } },
  hx_anneau_scarabee    : { icon: SLOT_ICON['anneau'], name: 'Anneau du Scarabée Sacré', slot: 'anneau', lvl: 180, heroic: true, hr: 7, stats: { deg: [134, 192], vit: [60, 86], crit: [2, 4] } },
  hx_relique_pharaon    : { name: 'Sarcophage Miniature du Pharaon', slot: 'relique', lvl: 180, heroic: true, hr: 7, relic: true, stats: { vit: [212, 302], dmgPct: [21, 31], speed: [21, 31], res: [7, 9] } },
  hx_dofus_argente      : { name: 'Dofus Argenté', slot: 'dofus', lvl: 180, heroic: true, hr: 7, dofus: true, stats: { vit: [320, 320], deg: [192, 192], dodge: [16, 16], speed: [19, 19] } },
  hx_rapiere_sang       : { icon: SLOT_ICON['arme'], name: 'Rapière du Sang Éternel', slot: 'arme', lvl: 196, heroic: true, hr: 8, stats: { deg: [220, 314], crit: [17, 25], vit: [33, 47] } },
  hx_cape_nuit          : { icon: SLOT_ICON['cape'], name: 'Cape de Nuit du Comte', slot: 'cape', lvl: 196, heroic: true, hr: 8, stats: { vit: [151, 215], deg: [68, 96], dodge: [7, 11], res: [4, 6] } },
  hx_relique_comte      : { name: 'Calice de Sang du Comte Vespéral', slot: 'relique', lvl: 196, heroic: true, hr: 8, relic: true, stats: { deg: [161, 229], dodge: [8, 12], crit: [8, 12], dmgPct: [24, 34], vit: [81, 115] } },
  hx_dofus_cauchemar    : { name: 'Dofus Cauchemar', slot: 'dofus', lvl: 196, heroic: true, hr: 8, dofus: true, stats: { deg: [270, 270], crit: [22, 22], critDmg: [54, 54], dmgPct: [16, 16] } },
});

/* Butin : [objet, chance à chaque fin de donjon héroïque]. Multiplié par la prospection. 1 pièce d'armure + 1 arme + 1 relique par donjon, un Dofus du rang 4 au rang 8. */
Object.assign(HEROIC_LOOT, {
  dh_bouftou: [['hx_fleau_bouftou', 0.03], ['hx_anneau_laine', 0.03], ['hx_relique_bouftou', 0.02]],
  dh_bwork: [['hx_hache_bworkette', 0.03], ['hx_ceinture_bwork', 0.03], ['hx_relique_bworkette', 0.02]],
  dh_dragon_cochon: [['hx_tranchoir_cochon', 0.03], ['hx_cape_lard', 0.03], ['hx_relique_cochon', 0.02]],
  dh_crocabulia: [['hx_machoire_croca', 0.03], ['hx_bottes_braise', 0.03], ['hx_relique_croca', 0.02], ['hx_dofus_cawotte', 0.006]],
  dh_mansot: [['hx_sceptre_givre', 0.03], ['hx_coiffe_givre', 0.03], ['hx_relique_mansot', 0.02], ['hx_dofus_vulbis', 0.006]],
  dh_dragon_jade: [['hx_lame_jade', 0.03], ['hx_amulette_jade', 0.03], ['hx_relique_jade', 0.02], ['hx_dofus_kaliptus', 0.006]],
  dh_pharaon: [['hx_sceptre_pharaon', 0.03], ['hx_anneau_scarabee', 0.03], ['hx_relique_pharaon', 0.02], ['hx_dofus_argente', 0.006]],
  dh_comte: [['hx_rapiere_sang', 0.03], ['hx_cape_nuit', 0.03], ['hx_relique_comte', 0.02], ['hx_dofus_cauchemar', 0.006]],
});
