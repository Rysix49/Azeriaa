/* ---------------------------------------------------------------------
   ÉQUILIBRAGE DE L'ÉQUIPEMENT — migration des sauvegardes
   BAL_OLD : plages de stats (min, max) de chaque objet AVANT le rééquilibrage de l'équipement
   (budget de puissance par emplacement et par niveau, voir tools/equip_budget.js et CLAUDE.md).
   À la première ouverture d'une ancienne sauvegarde (state.bal < BAL_VERSION), chaque objet possédé
   est converti dans les nouvelles plages en gardant la qualité de son jet (et la part de surjet forgemagie).
   Pour un futur rééquilibrage : incrémenter BAL_VERSION et remplacer BAL_OLD par les plages d'avant.
   --------------------------------------------------------------------- */
const BAL_VERSION = 2;
const BAL_OLD = {
  amulette_blop: { vit: [55, 84], res: [3, 5], pp: [16, 28] },
  amulette_bouftou: { deg: [8, 14], vit: [20, 30], pp: [8, 14] },
  amulette_craqueleur: { vit: [50, 80], res: [3, 5], pp: [15, 26] },
  amulette_dragoeuf: { deg: [40, 58], vit: [100, 140], pp: [30, 50] },
  amulette_dunes: { deg: [60, 86], vit: [170, 240], pp: [48, 76] },
  amulette_mines: { deg: [64, 90], vit: [172, 246], res: [4, 6], pp: [50, 80] },
  amulette_pandala: { deg: [50, 70], vit: [150, 214], pp: [40, 64] },
  amulette_porcos: { vit: [90, 130], res: [4, 6], pp: [28, 46] },
  amulette_roseraie: { deg: [70, 98], vit: [196, 276], pp: [54, 86] },
  anneau_arakne: { deg: [8, 16], pp: [8, 13] },
  anneau_blop: { deg: [28, 40], pp: [18, 30], sag: [8, 14] },
  anneau_dragoeuf: { deg: [52, 72], pp: [32, 52], crit: [1, 2] },
  anneau_ecurouille: { deg: [14, 24], pp: [11, 19] },
  anneau_etang: { deg: [70, 98], pp: [42, 66], crit: [1, 2] },
  anneau_mufafah: { deg: [37, 53], pp: [23, 39] },
  anneau_roseraie: { deg: [86, 120], pp: [56, 90], crit: [1, 3] },
  arc_moskito: { deg: [22, 36], crit: [1, 2] },
  baton_abraknyde: { deg: [35, 55] },
  baton_debutant: { deg: [7, 15] },
  bottes_dunes: { deg: [72, 100], vit: [104, 146], dodge: [5, 8] },
  bottes_kanigrou: { deg: [40, 55], vit: [30, 45], dodge: [3, 5] },
  bottes_kanniboul: { deg: [42, 58], vit: [34, 50], dodge: [3, 5] },
  bottes_mansot: { deg: [58, 80], vit: [70, 100], dodge: [4, 6] },
  bottes_mines: { deg: [74, 102], vit: [106, 150], dodge: [4, 6] },
  bottes_moskito: { deg: [8, 14], vit: [8, 14], dodge: [1, 3] },
  bottes_pandala: { deg: [62, 86], vit: [88, 126], dodge: [5, 7] },
  bottes_sanglier: { deg: [15, 25], res: [2, 4], vit: [10, 20] },
  bottes_scara: { vit: [30, 45], res: [3, 5], sag: [10, 20] },
  bottes_srambad: { deg: [82, 114], vit: [120, 168], dodge: [6, 9] },
  bottes_wabbit: { deg: [18, 28], vit: [14, 22], dodge: [2, 4] },
  cape_abraknyde: { vit: [25, 40], sag: [12, 24] },
  cape_blop: { deg: [24, 36], vit: [30, 46], pp: [14, 22] },
  cape_bouftou: { vit: [15, 25], sag: [6, 12] },
  cape_chafer: { vit: [90, 130], sag: [30, 50], pp: [26, 44] },
  cape_dragoeuf: { vit: [100, 144], sag: [34, 54], dodge: [3, 5] },
  cape_dunes: { vit: [164, 234], sag: [54, 82], res: [3, 5] },
  cape_etang: { vit: [142, 202], sag: [46, 70], dodge: [4, 6] },
  cape_kanniboul: { deg: [20, 32], vit: [66, 98], dodge: [2, 4] },
  cape_kwak: { deg: [29, 42], pp: [14, 24] },
  cape_mansot: { vit: [120, 170], sag: [40, 62], res: [3, 5] },
  cape_pandala: { vit: [144, 204], sag: [48, 72], dodge: [4, 6] },
  cape_porcos: { vit: [80, 116], sag: [24, 40], res: [2, 4] },
  cape_roseraie: { vit: [190, 268], sag: [62, 94], res: [3, 5] },
  cape_srambad: { vit: [188, 264], sag: [62, 92], dodge: [4, 6] },
  cape_wabbit: { vit: [30, 46], sag: [14, 26], pp: [12, 20] },
  casque_bwork: { deg: [15, 25], vit: [45, 65] },
  ceinture_bwork: { deg: [10, 15], vit: [30, 45] },
  ceinture_champ: { vit: [15, 25], sag: [10, 20] },
  ceinture_ecto: { deg: [29, 48], pp: [29, 49] },
  ceinture_etang: { deg: [58, 82], vit: [96, 138], pp: [40, 62] },
  ceinture_kanniboul: { deg: [30, 46], vit: [40, 58] },
  ceinture_mansot: { deg: [54, 76], vit: [80, 116], pp: [36, 58] },
  ceinture_mines: { deg: [70, 98], vit: [114, 164], pp: [48, 76] },
  ceinture_porcos: { deg: [32, 50], vit: [52, 72] },
  ceinture_srambad: { deg: [78, 110], vit: [124, 176], pp: [54, 86] },
  coiffe_blop: { deg: [14, 22], vit: [52, 74], res: [2, 4] },
  coiffe_bouftou: { deg: [5, 10], vit: [20, 35] },
  coiffe_dragoeuf: { deg: [36, 52], vit: [90, 130], res: [2, 4] },
  coiffe_dunes: { deg: [66, 94], vit: [160, 228], res: [3, 6] },
  coiffe_etang: { deg: [54, 78], vit: [136, 194], res: [3, 5] },
  coiffe_kanniboul: { deg: [24, 36], vit: [50, 76], crit: [1, 2] },
  coiffe_koalak: { deg: [20, 30], vit: [60, 90], pp: [20, 34] },
  coiffe_mansot: { deg: [46, 66], vit: [110, 160], res: [3, 5] },
  coiffe_mines: { deg: [68, 96], vit: [162, 230], pp: [40, 64] },
  coiffe_pandala: { deg: [56, 80], vit: [138, 196], res: [3, 5] },
  coiffe_porcos: { deg: [28, 42], vit: [70, 104], pp: [24, 38] },
  coiffe_prespic: { deg: [10, 15], vit: [30, 45], res: [1, 3], pp: [12, 20] },
  coiffe_roseraie: { deg: [76, 108], vit: [184, 262], res: [3, 6] },
  coiffe_srambad: { deg: [76, 106], vit: [184, 258], dodge: [3, 5] },
  coiffe_wabbit: { deg: [12, 18], vit: [32, 48], pp: [10, 16] },
  croc_crocabulia: { deg: [100, 140], crit: [3, 5] },
  dofus_ebene: { crit: [15, 15], dodge: [8, 8], speed: [15, 15] },
  dofus_emeraude: { vit: [450, 450], res: [10, 10], regen: [1, 1] },
  dofus_ocre: { deg: [110, 110], pp: [45, 45], kamas: [15, 15], xpPct: [8, 8] },
  dofus_pourpre: { deg: [220, 220], dmgPct: [14, 14], critDmg: [50, 50] },
  epee_boisaille: { deg: [7, 15] },
  epee_chafer: { deg: [76, 104], crit: [3, 5] },
  eventail_carpe: { deg: [138, 194], crit: [3, 6] },
  fouet_epines: { deg: [176, 250], crit: [5, 9] },
  hache_bwork: { deg: [60, 90], crit: [1, 3] },
  katana_jade: { deg: [142, 200], crit: [4, 7] },
  khepesh_pharaon: { deg: [164, 230], crit: [5, 8] },
  lance_kanniboul: { deg: [68, 98], crit: [2, 4] },
  marteau_bouftou: { deg: [25, 43], vit: [10, 20] },
  masse_blop: { deg: [66, 98], vit: [15, 30] },
  masse_mansot: { deg: [120, 168], crit: [3, 6] },
  pelle_champ: { deg: [22, 36], pp: [8, 14] },
  pioche_ocre: { deg: [160, 228], crit: [4, 7] },
  rapiere_comte: { deg: [180, 256], crit: [6, 10] },
  relique_abra: { regen: [2, 3], vit: [30, 50] },
  relique_blop: { regen: [3, 4], res: [5, 8], vit: [40, 70] },
  relique_bouftou: { xpPct: [15, 20], vit: [20, 40] },
  relique_bworkette: { deg: [10, 20], dmgPct: [12, 18] },
  relique_carpe: { regen: [3, 5], dodge: [6, 9], vit: [120, 190] },
  relique_chafer: { kamas: [30, 50], pp: [30, 50], xpPct: [5, 10] },
  relique_comte: { dmgPct: [22, 30], crit: [4, 7], dodge: [5, 8] },
  relique_craq: { res: [6, 10], vit: [40, 60] },
  relique_dragoeuf: { speed: [18, 28], dmgPct: [12, 18], vit: [80, 120] },
  relique_dragon_jade: { dmgPct: [16, 22], res: [8, 12], crit: [3, 5] },
  relique_kanigrou: { deg: [15, 25], speed: [15, 25] },
  relique_kanniboul: { deg: [20, 35], dmgPct: [10, 16], crit: [3, 6] },
  relique_mansot: { res: [8, 12], dmgPct: [14, 20], dodge: [4, 7] },
  relique_mines: { kamas: [60, 100], pp: [50, 80], xpPct: [8, 14] },
  relique_pharaon: { dmgPct: [18, 24], speed: [14, 22], vit: [150, 220] },
  relique_porcos: { kamas: [50, 80], vit: [80, 130] },
  relique_roseraie: { regen: [4, 6], dmgPct: [12, 18], vit: [200, 300] },
  relique_wabbit: { kamas: [15, 25], dodge: [4, 7], pp: [15, 25] },
  rotissoire_cochon: { deg: [78, 112], vit: [20, 35] },
  sceptre_wabbit: { deg: [45, 68], crit: [1, 2] },
};

function balRemapGear(g) {
  const old = BAL_OLD[g.id], def = ITEMS[g.id];
  if (!old || !def) return;
  let tot = 0, n = 0;
  for (const [k, [a, b]] of Object.entries(old)) if (g.stats[k] !== undefined && b > a) { tot += Math.max(0, Math.min(1, (g.stats[k] - a) / (b - a))); n++; }
  const q0 = n ? tot / n : 0.5; // qualité moyenne : sert aux stats que l'objet n'avait pas encore
  const out = {};
  for (const [k, [na, nb]] of Object.entries(def.stats)) {
    const o = old[k], v = g.stats[k];
    if (g.stasis) out[k] = nb * 2;
    else if (o && v !== undefined && o[1] > o[0]) out[k] = v <= o[1] ? Math.round(na + (nb - na) * Math.max(0, v - o[0]) / (o[1] - o[0])) : Math.round(nb + (v - o[1]) * (nb / o[1])); // au-delà du max : surjet
    else if (o && v !== undefined) out[k] = na; // stat fixe (Dofus)
    else out[k] = Math.round(na + (nb - na) * q0);
  }
  g.stats = out;
}
