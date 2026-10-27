/* =====================================================================
   AMAKNA IDLE — DONNÉES DU JEU
   Tout le contenu (classes, sorts, monstres, zones, objets, recettes)
   est déclaré ici. Pour ajouter du contenu, il suffit
   d'ajouter des entrées : le moteur et l'interface s'adaptent seuls.
   ===================================================================== */

const STATS = ['vit', 'sag', 'deg'];
/* Sagesse : chaque point donne +0,5 % d'XP */
const SAG_XP = 0.5;
/* Anciennes caractéristiques élémentaires (Force, Intelligence, Chance, Agilité)
   fusionnées en une seule : Dégâts. Sert à migrer les anciennes sauvegardes. */
const OLD_ELEM_STATS = ['for', 'int', 'cha', 'agi'];
function convertOldStats(o) {
  const out = {}; let pui = 0; const el = [];
  for (const [k, v] of Object.entries(o)) { if (OLD_ELEM_STATS.includes(k)) el.push(v); else if (k === 'pui') pui += v; else if (k === 'sag') out.sag = (out.sag || 0) + v * 2; else out[k] = (out[k] || 0) + v; }
  if (el.length || pui) { const m = el.length ? Math.max(...el) : 0; out.deg = pui + m + Math.round((el.reduce((a, b) => a + b, 0) - m) * 0.3); }
  return out;
}
const STAT_LABEL = {
  vit: 'Vitalité', sag: 'Sagesse', deg: 'Dégâts', res: '% Résistance', pp: 'Prospection', crit: '% Critique', soin: 'Soins', dmg: 'Dommages fixes', pa: 'PA',
};
const STAT_SHORT = { vit: 'Vit', sag: 'Sag', deg: 'Dég', res: 'Rés', pp: 'PP', crit: 'Crit', soin: 'Soin', dmg: 'Dom', pa: 'PA' };
/* Élément des sorts : purement visuel, tous utilisent la stat Dégâts */
const STAT_ELEM = { for: 'Terre', int: 'Feu', cha: 'Eau', agi: 'Air' };
/* Coût en points de capital pour +1 dans la caractéristique */
const STAT_COST = { vit: 1, sag: 1, deg: 1 };
const CAPITAL_PER_LEVEL = 5;
const MAX_LEVEL = 200;

/* --------------------------------------------------------------------
   CLASSES & SORTS
   type: dmg | aoe | poison | drain | heal | buff
   stat: caractéristique qui augmente l'effet
   lvl: niveau du héros requis ; cd: tours de recharge ; max: lancers/tour
   -------------------------------------------------------------------- */
const CLASSES = {
  iop: {
    name: 'Iop', role: 'Guerrier impétueux', main: 'deg', elem: 'for', hpMult: 1.1, color: '#d0533f',
    desc: 'Frappe fort et sans détour. Ses sorts de zone nettoient les groupes.',
    passive: { name: 'Rage Croissante · Colère de Iop', points: [['🔥','Rage Croissante','Chaque tour où il attaque : +12 Dégâts jusqu’à la fin du combat (5 cumuls max, +60).'],['😡','Jauge de Fureur','Chaque tour où il attaque remplit la jauge (+4, et +3 par coup critique). Elle se garde d’un combat à l’autre (quelques minutes de combat pour la remplir).'],['⚔️','Colère de Iop','Jauge pleine : clique sur l’épée au-dessus du Iop pour faire tomber une lame colossale sur tous les ennemis. Ignore les résistances, +25 % de critique, Rage portée au max.']], desc: 'Chaque tour où il attaque, le Iop gagne +12 Dégâts jusqu’à la fin du combat (max 5 cumuls, soit +60 Dégâts).' },
    spells: [
      { id: 'pression', name: 'Pression', lvl: 1, pa: 3, min: 7, max: 11, stat: 'for', type: 'dmg', max_: 2 },
      { id: 'compulsion', name: 'Compulsion', lvl: 4, pa: 2, type: 'buff', buff: { deg: 40 }, turns: 3, cd: 5 },
      { id: 'epee_divine', name: 'Épée Divine', lvl: 9, pa: 3, min: 8, max: 12, stat: 'for', type: 'aoe', max_: 1 },
      { id: 'colere', name: 'Épée du Destin', lvl: 20, pa: 6, min: 38, max: 52, stat: 'for', type: 'dmg', cd: 3 },
      { id: 'epee_celeste', name: 'Épée Céleste', lvl: 35, pa: 4, min: 16, max: 22, stat: 'for', type: 'aoe', max_: 1 },
    ],
  },
  cra: {
    name: 'Cra', role: 'Archère précise', main: 'deg', elem: 'agi', hpMult: 0.95, color: '#5c9a45',
    desc: 'Tire de loin, empoisonne et esquive. Critiques fréquents.',
    passive: { name: 'Traque · Tir Parfait', points: [['🎯','Proie marquée','Clique sur un monstre pour en faire sa proie : ses sorts à cible unique la visent en priorité. Sans choix de ta part, elle traque le plus faible.'],['🔭','Concentration','Chaque sort qui touche la proie ajoute 1 point de Concentration (max 5) : +6 % de critique par point. Elle se garde même quand la proie meurt ou qu’un nouveau combat commence… mais changer de proie toi-même la remet à zéro.'],['🏹','Tir Parfait','À 5 de Concentration, le tir suivant sur la proie est un critique garanti ×3 qui ignore les résistances. Les dégâts en trop transpercent la proie et touchent l’ennemi suivant.'],['🦅','Œil de Lynx','+5 % de critique ; ses critiques infligent ×1,8 au lieu de ×1,5.']], desc: 'Marque une proie, accumule la Concentration et décoche un Tir Parfait qui transperce.', stats: { crit: 5 } },
    spells: [
      { id: 'fleche_magique', name: 'Flèche Magique', lvl: 1, pa: 3, min: 6, max: 10, stat: 'agi', type: 'dmg', max_: 2 },
      { id: 'fleche_empoisonnee', name: 'Flèche Empoisonnée', lvl: 5, pa: 2, min: 4, max: 6, stat: 'agi', type: 'poison', turns: 3, cd: 2 },
      { id: 'fleche_explosive', name: 'Flèche Explosive', lvl: 12, pa: 4, min: 9, max: 13, stat: 'agi', type: 'aoe', max_: 1 },
      { id: 'fleche_punitive', name: 'Flèche Punitive', lvl: 25, pa: 5, min: 30, max: 40, stat: 'agi', type: 'dmg', cd: 2 },
      { id: 'pluie_fleches', name: 'Pluie de Flèches', lvl: 40, pa: 5, min: 18, max: 24, stat: 'agi', type: 'aoe', cd: 1 },
    ],
  },
  eniripsa: {
    name: 'Eniripsa', role: 'Soigneuse', main: 'deg', elem: 'int', hpMult: 0.95, color: '#c96fa8',
    desc: 'Ses mots blessent et soignent. Très résistante sur la durée.',
    passive: { name: 'Souffle Vital', points: [['💗','Souffle Vital','Régénère 4 % de ses PV max au début de chaque tour.'],['✨','Soins renforcés','Ses soins sont augmentés de 25 %.']], desc: 'Régénère 4 % de ses PV max au début de chaque tour. Ses soins sont augmentés de 25 %.' },
    spells: [
      { id: 'mot_blessant', name: 'Mot Blessant', lvl: 1, pa: 3, min: 6, max: 9, stat: 'int', type: 'dmg', max_: 2 },
      { id: 'mot_soignant', name: 'Mot Soignant', lvl: 1, pa: 3, min: 10, max: 14, stat: 'int', type: 'heal', max_: 1 },
      { id: 'mot_stimulant', name: 'Mot Stimulant', lvl: 8, pa: 2, type: 'buff', buff: { deg: 30, res: 10 }, turns: 3, cd: 5 },
      { id: 'mot_interdit', name: 'Mot Interdit', lvl: 15, pa: 4, min: 15, max: 20, stat: 'int', type: 'dmg', max_: 1 },
      { id: 'mot_regeneration', name: 'Mot de Régénération', lvl: 30, pa: 4, min: 30, max: 40, stat: 'int', type: 'heal', cd: 3 },
      { id: 'mot_tourmente', name: 'Mot Tourmenté', lvl: 45, pa: 4, min: 14, max: 18, stat: 'int', type: 'aoe', max_: 1 },
    ],
  },
  sacrieur: {
    name: 'Sacrieur', role: 'Berserker endurant', main: 'deg', elem: 'for', hpMult: 1.35, color: '#a32f2f',
    desc: 'Énormément de vie. Vole la vie de ses adversaires.',
    passive: { name: 'Souffrance', points: [['🩸','Souffrance','+1 % de dégâts finaux par % de PV manquant.'],['⚔️','Rage du sang','À 30 % de vie, ses dégâts sont multipliés par 1,7.']], desc: '+1 % de dégâts finaux par % de PV manquant.' },
    spells: [
      { id: 'assaut', name: 'Assaut', lvl: 1, pa: 3, min: 6, max: 9, stat: 'for', type: 'dmg', max_: 2 },
      { id: 'absorption', name: 'Absorption', lvl: 3, pa: 3, min: 6, max: 8, stat: 'for', type: 'drain', max_: 1 },
      { id: 'chatiment', name: 'Châtiment Forcé', lvl: 10, pa: 2, type: 'buff', buff: { deg: 50 }, turns: 2, cd: 4 },
      { id: 'fureur', name: 'Fureur', lvl: 18, pa: 4, min: 20, max: 28, stat: 'for', type: 'dmg', max_: 1 },
      { id: 'douleur_cuisante', name: 'Douleur Cuisante', lvl: 32, pa: 4, min: 13, max: 18, stat: 'for', type: 'aoe', max_: 1 },
    ],
  },
  enutrof: {
    name: 'Enutrof', role: 'Chercheur de trésors', main: 'deg', elem: 'cha', hpMult: 1.1, color: '#c9962e',
    desc: 'Trouve plus de butin et de kamas que quiconque.',
    passive: { name: 'Flair du Trésor', points: [['🔎','Prospection','+40 Prospection.'],['💰','Double butin','12 % de chance qu’un monstre lâche ses ressources en double.']], desc: '+40 Prospection. 12 % de chance qu’un monstre vaincu lâche ses ressources en double.', stats: { pp: 40 } },
    spells: [
      { id: 'lancer_pieces', name: 'Lancer de Pièces', lvl: 1, pa: 2, min: 5, max: 8, stat: 'cha', type: 'dmg', max_: 3 },
      { id: 'pelle_animee', name: 'Pelle Animée', lvl: 6, pa: 4, min: 15, max: 20, stat: 'cha', type: 'dmg', max_: 1 },
      { id: 'pelle_fantomatique', name: 'Pelle Fantomatique', lvl: 14, pa: 3, min: 7, max: 10, stat: 'cha', type: 'aoe', max_: 1 },
      { id: 'fortune', name: 'Coffre Animé', lvl: 22, pa: 2, type: 'buff', buff: { deg: 35, res: 8 }, turns: 3, cd: 5 },
      { id: 'pelle_jugement', name: 'Pelle du Jugement', lvl: 36, pa: 5, min: 34, max: 44, stat: 'cha', type: 'dmg', cd: 2 },
    ],
  },
  sram: {
    name: 'Sram', role: 'Assassin sournois', main: 'deg', elem: 'agi', hpMult: 0.9, color: '#6a5fb5',
    desc: 'Poisons et coups critiques. Rapporte plus de kamas.',
    passive: { name: 'Embuscade', points: [['🗡️','Embuscade','Au premier tour de chaque combat, tous ses dégâts sont doublés.'],['🪙','Pickpocket','+25 % de kamas gagnés.']], desc: 'Au premier tour de chaque combat, tous ses dégâts sont doublés. +25 % de kamas gagnés.', stats: { kamas: 25 } },
    spells: [
      { id: 'sournoiserie', name: 'Sournoiserie', lvl: 1, pa: 3, min: 7, max: 10, stat: 'agi', type: 'dmg', max_: 2 },
      { id: 'poison_paralysant', name: 'Poison Paralysant', lvl: 6, pa: 2, min: 5, max: 7, stat: 'agi', type: 'poison', turns: 3, cd: 1 },
      { id: 'arnaque', name: 'Arnaque', lvl: 13, pa: 4, min: 15, max: 20, stat: 'agi', type: 'dmg', max_: 1 },
      { id: 'piege_masse', name: 'Piège de Masse', lvl: 24, pa: 4, min: 12, max: 16, stat: 'agi', type: 'aoe', max_: 1 },
      { id: 'attaque_mortelle', name: 'Attaque Mortelle', lvl: 38, pa: 6, min: 50, max: 65, stat: 'agi', type: 'dmg', cd: 3 },
    ],
  },
  xelor: {
    name: 'Xélor', role: 'Mage du temps', main: 'deg', elem: 'int', hpMult: 0.95, color: '#3f73c4',
    desc: 'Accumule du temps à chaque sort, fige ses ennemis et rejoue des tours entiers.',
    passive: { name: 'Sablier Temporel', points: [['⏳','Grains du temps','Chaque PA dépensé ajoute 1 grain au sablier (12 max).'],['🔁','Rembobinage','Sablier plein : il le vide et rejoue un tour complet, sans regagner de grains.'],['❄️','Distorsion','12 % de chance de figer la cible : elle passe sa prochaine attaque.'],['🎯','Temps arrêté','Une cible figée subit +25 % de dégâts.'],['🌀','Paradoxe','Une fois par combat : s’il tombe à 0 PV avec 6 grains ou plus, il revient aux PV du début de son tour (30 % minimum).']], desc: 'Chaque PA dépensé ajoute 1 grain au sablier (12 max). Sablier plein : au début de son tour, le Xélor le vide et rejoue un tour complet, sans regagner de grains. Ses coups ont 12 % de chance de figer la cible (elle passe sa prochaine attaque) et une cible figée subit +25 % de dégâts. Paradoxe, une fois par combat : s’il tombe à 0 PV avec au moins 6 grains, il revient aux PV du début de son tour (30 % au minimum).' },
    spells: [
      { id: 'aiguille', name: 'Aiguille', lvl: 1, pa: 3, min: 6, max: 9, stat: 'int', type: 'dmg', max_: 2 },
      { id: 'gelure', name: 'Gelure', lvl: 4, pa: 2, min: 3, max: 5, stat: 'int', type: 'dmg', freeze: 30, max_: 1 },
      { id: 'poussiere', name: 'Poussière Temporelle', lvl: 10, pa: 3, min: 6, max: 9, stat: 'int', type: 'aoe', max_: 1 },
      { id: 'momification', name: 'Momification', lvl: 18, pa: 2, type: 'buff', buff: { res: 20, deg: 15 }, turns: 2, cd: 5 },
      { id: 'horloge', name: 'Horloge', lvl: 26, pa: 4, min: 18, max: 24, stat: 'int', type: 'dmg', grains: 3, max_: 1 },
      { id: 'rayon_obscur', name: 'Rayon Obscur', lvl: 40, pa: 5, min: 30, max: 40, stat: 'int', type: 'dmg', cd: 2 },
    ],
  },
};

/* --------------------------------------------------------------------
   RESSOURCES (butin, clés)
   -------------------------------------------------------------------- */
const RESOURCES = {
  plume_tofu:       { name: 'Plume de Tofu', icon: '🪶', value: 2 },
  laine_bouftou:    { name: 'Laine de Bouftou', icon: '🧶', value: 3 },
  cuir_bouftou:     { name: 'Cuir de Bouftou', icon: '🟫', value: 4 },
  peau_larve:       { name: 'Peau de Larve Bleue', icon: '🫧', value: 2 },
  petale_pissenlit: { name: 'Pétale Diabolique', icon: '🌼', value: 3 },
  dard_moskito:     { name: 'Dard de Moskito', icon: '📍', value: 6 },
  patte_arakne:     { name: "Patte d'Arakne", icon: '🕸️', value: 7 },
  chapeau_champ:    { name: 'Chapeau de Champ Champ', icon: '🍄', value: 8 },
  ecorce_abra:      { name: "Écorce d'Abraknyde", icon: '🪵', value: 11 },
  pic_prespic:      { name: 'Pic de Prespic', icon: '🌵', value: 12 },
  defense_sanglier: { name: 'Défense de Sanglier', icon: '🦷', value: 14 },
  queue_ecurouille: { name: "Queue d'Écurouille", icon: '🐿️', value: 12 },
  plume_kwak:       { name: 'Plume de Kwak', icon: '❄️', value: 18 },
  carapace_scara:   { name: 'Carapace de Scarafeuille', icon: '🛡️', value: 20 },
  fragment_craq:    { name: 'Fragment de Craqueleur', icon: '🪨', value: 22 },
  oreille_bwork:    { name: 'Oreille de Bwork', icon: '👂', value: 25 },
  poil_koalak:      { name: 'Poils de Koalak', icon: '🧤', value: 34 },
  peau_kanigrou:    { name: 'Peau de Kanigrou', icon: '🎒', value: 38 },
  croc_mufafah:     { name: 'Croc de Mufafah', icon: '🦴', value: 42 },
  os_chafer:        { name: 'Os de Chafer', icon: '💀', value: 50 },
  gelee_bleutee:    { name: 'Gelée Bleutée', icon: '🍮', value: 55 },
  ectoplasme:       { name: 'Ectoplasme', icon: '👻', value: 70 },
  laine_royale:     { name: 'Laine du Bouftou Royal', icon: '👑', value: 150, rare: true },
  corne_royale:     { name: 'Corne du Bouftou Royal', icon: '📯', value: 220, rare: true },
  nattes_bworkette: { name: 'Nattes de Bworkette', icon: '🎀', value: 450, rare: true },
  clef_bouftou:     { name: 'Clef du Donjon Bouftou', icon: '🗝️', value: 30, key: true },
  clef_bwork:       { name: 'Clef du Village Bwork', icon: '🔑', value: 120, key: true },
};

/* --------------------------------------------------------------------
   MONSTRES
   lvl, hpm (multiplicateur PV), dm (multiplicateur dégâts), res (%)
   drops: [ressource, chance de base 0-1]
   -------------------------------------------------------------------- */
const MONSTERS = {
  tofu:          { name: 'Tofu', icon: '🐥', lvl: 2, hpm: 0.8, dm: 0.8, drops: [['plume_tofu', 0.5]] },
  larve_bleue:   { name: 'Larve Bleue', icon: '🐛', lvl: 3, hpm: 1, dm: 0.8, drops: [['peau_larve', 0.5]] },
  bouftou:       { name: 'Bouftou', icon: '🐑', lvl: 5, hpm: 1.1, dm: 1, drops: [['laine_bouftou', 0.6], ['cuir_bouftou', 0.3]] },
  pissenlit:     { name: 'Pissenlit Diabolique', icon: '🌼', lvl: 7, hpm: 0.9, dm: 1.1, drops: [['petale_pissenlit', 0.45]] },

  boufton_blanc: { name: 'Boufton Blanc', icon: '🐏', lvl: 10, hpm: 1, dm: 1, drops: [['laine_bouftou', 0.5], ['cuir_bouftou', 0.4]] },
  moskito:       { name: 'Moskito', icon: '🦟', lvl: 12, hpm: 0.8, dm: 1.15, drops: [['dard_moskito', 0.5]] },
  arakne:        { name: 'Arakne', icon: '🕷️', lvl: 14, hpm: 1, dm: 1, drops: [['patte_arakne', 0.45]] },
  champ_champ:   { name: 'Champ Champ', icon: '🍄', lvl: 17, hpm: 1.2, dm: 0.9, drops: [['chapeau_champ', 0.45]] },

  ecurouille:    { name: 'Écurouille', icon: '🐿️', lvl: 20, hpm: 0.9, dm: 1.05, drops: [['queue_ecurouille', 0.45]] },
  prespic:       { name: 'Prespic', icon: '🦔', lvl: 23, hpm: 1, dm: 1.05, res: 5, drops: [['pic_prespic', 0.45]] },
  abraknyde:     { name: 'Abraknyde', icon: '🌳', lvl: 27, hpm: 1.4, dm: 0.9, res: 10, drops: [['ecorce_abra', 0.5]] },
  sanglier:      { name: 'Sanglier', icon: '🐗', lvl: 30, hpm: 1.1, dm: 1.15, drops: [['defense_sanglier', 0.4]] },

  kwak:          { name: 'Kwak de Glace', icon: '🐦', lvl: 33, hpm: 0.9, dm: 1.1, drops: [['plume_kwak', 0.45]] },
  scarafeuille:  { name: 'Scarafeuille Vert', icon: '🪲', lvl: 37, hpm: 1.1, dm: 1, res: 10, drops: [['carapace_scara', 0.45]] },
  craqueleur:    { name: 'Craqueleur', icon: '🗿', lvl: 42, hpm: 1.6, dm: 0.85, res: 15, drops: [['fragment_craq', 0.4]] },
  bwork:         { name: 'Bwork', icon: '👹', lvl: 46, hpm: 1.1, dm: 1.2, drops: [['oreille_bwork', 0.4]] },

  koalak:        { name: 'Koalak Immature', icon: '🐨', lvl: 52, hpm: 1, dm: 1, drops: [['poil_koalak', 0.4]] },
  kanigrou:      { name: 'Kanigrou', icon: '🦘', lvl: 58, hpm: 1.1, dm: 1.1, drops: [['peau_kanigrou', 0.4]] },
  mufafah:       { name: 'Mufafah', icon: '🐺', lvl: 64, hpm: 1.2, dm: 1.15, res: 10, drops: [['croc_mufafah', 0.4]] },

  chafer:        { name: 'Chafer', icon: '💀', lvl: 72, hpm: 1, dm: 1.05, drops: [['os_chafer', 0.45]] },
  gelee:         { name: 'Gelée Bleue', icon: '🍮', lvl: 80, hpm: 1.4, dm: 0.9, res: 15, drops: [['gelee_bleutee', 0.4]] },
  fantome:       { name: 'Fantôme Pandore', icon: '👻', lvl: 90, hpm: 1, dm: 1.2, drops: [['ectoplasme', 0.35]] },
  chafer_lancier:{ name: 'Chafer Lancier', icon: '☠️', lvl: 98, hpm: 1.2, dm: 1.2, res: 10, drops: [['os_chafer', 0.5], ['ectoplasme', 0.15]] },

  /* Donjons */
  bouftou_chef:  { name: 'Chef de Guerre Bouftou', icon: '🐑', lvl: 16, hpm: 1.5, dm: 1.1, drops: [['laine_bouftou', 0.9], ['cuir_bouftou', 0.7]] },
  bouftou_royal: { name: 'Bouftou Royal', icon: '👑', lvl: 22, hpm: 3, dm: 1.1, boss: true, res: 10, drops: [['laine_royale', 0.6], ['corne_royale', 0.3]] },
  bwork_mage:    { name: 'Bwork Mage', icon: '🧙', lvl: 44, hpm: 0.9, dm: 1.3, drops: [['oreille_bwork', 0.5]] },
  bwork_archer:  { name: 'Bwork Archer', icon: '🏹', lvl: 45, hpm: 1, dm: 1.2, drops: [['oreille_bwork', 0.5]] },
  bworkette:     { name: 'Bworkette', icon: '👺', lvl: 52, hpm: 3, dm: 1.15, boss: true, res: 15, drops: [['nattes_bworkette', 0.5], ['oreille_bwork', 1]] },
};

/* --------------------------------------------------------------------
   ZONES & DONJONS
   -------------------------------------------------------------------- */
const ZONES = [
  { id: 'incarnam', name: "Prairies d'Incarnam", region: 'Incarnam', lvl: [1, 8], monsters: ['tofu', 'larve_bleue', 'bouftou', 'pissenlit'],
    text: "Les premiers pas de tout aventurier, sous les nuages d'Incarnam." },
  { id: 'astrub', name: "Champs d'Astrub", region: 'Astrub', lvl: [9, 18], monsters: ['boufton_blanc', 'moskito', 'arakne', 'champ_champ'],
    text: "Les champs autour de la cité d'Astrub grouillent de bestioles." },
  { id: 'abraknydes', name: 'Forêt des Abraknydes', region: 'Amakna', lvl: [19, 32], monsters: ['ecurouille', 'prespic', 'abraknyde', 'sanglier'],
    text: 'Des arbres qui marchent, et ils ne sont pas aimables.' },
  { id: 'cania', name: 'Plaines de Cania', region: 'Cania', lvl: [33, 48], monsters: ['kwak', 'scarafeuille', 'craqueleur', 'bwork'],
    text: 'Vastes plaines rocheuses battues par le vent.' },
  { id: 'koalaks', name: 'Montagne des Koalaks', region: 'Koalak', lvl: [50, 68], monsters: ['koalak', 'kanigrou', 'mufafah'],
    text: 'Une jungle d’altitude pleine de bêtes sauvages.' },
  { id: 'sidimote', name: 'Landes de Sidimote', region: 'Sidimote', lvl: [70, 100], monsters: ['chafer', 'gelee', 'fantome', 'chafer_lancier'],
    text: 'Terres maudites où les morts ne restent pas couchés.' },
];

/* Sous-zones : chaque zone existe en 3 niveaux de difficulté.
   Par palier : PV des monstres ×2, dégâts ×1,5, chance d'équipement ×2. */
const SUBZONES = [
  { hp: 1, dmg: 1, drop: 1 },
  { hp: 2, dmg: 1.5, drop: 2 },
  { hp: 4, dmg: 2.25, drop: 4 },
  { hp: 8, dmg: 3.375, drop: 8 },
];

const DUNGEONS = [
  { id: 'dj_bouftou', name: 'Donjon des Bouftous', region: 'Astrub', lvl: [14, 25], key: 'clef_bouftou',
    rooms: [['bouftou', 'bouftou', 'boufton_blanc'], ['boufton_blanc', 'boufton_blanc', 'bouftou_chef'], ['bouftou_chef', 'bouftou_chef', 'boufton_blanc']],
    boss: ['bouftou_royal', 'bouftou_chef'], bonusXp: 1.5,
    text: "Le repaire du Bouftou Royal. Une clef est consommée à chaque entrée." },
  { id: 'dj_bwork', name: 'Village des Bworks', region: 'Cania', lvl: [42, 55], key: 'clef_bwork',
    rooms: [['bwork', 'bwork_archer'], ['bwork', 'bwork_mage', 'bwork_archer'], ['bwork_mage', 'bwork_mage', 'bwork']],
    boss: ['bworkette', 'bwork_mage'], bonusXp: 1.5,
    text: 'La Bworkette règne sur ce village bruyant. Une clef par entrée.' },
];

/* --------------------------------------------------------------------
   ÉQUIPEMENTS
   stats: { stat: [min, max] } — le jet est tiré à la fabrication
   -------------------------------------------------------------------- */
const SLOTS = ['coiffe', 'cape', 'amulette', 'anneau1', 'anneau2', 'ceinture', 'bottes', 'arme'];
const SLOT_LABEL = { coiffe: 'Coiffe', cape: 'Cape', amulette: 'Amulette', anneau1: 'Anneau', anneau2: 'Anneau', ceinture: 'Ceinture', bottes: 'Bottes', arme: 'Arme' };
const SLOT_ICON = { relique: '🔮', outil: '🪓', gants: '🧤', sac: '👝', coiffe: '🎩', cape: '🧥', amulette: '📿', anneau: '💍', ceinture: '🎗️', bottes: '👢', arme: '🗡️' };

const SETS = {
  aventurier: { name: "Panoplie de l'Aventurier", bonus: { 2: { vit: 10 }, 4: { vit: 20, sag: 20 }, 6: { deg: 20, vit: 30, sag: 30 } } },
  bouftou:    { name: 'Panoplie du Bouftou', bonus: { 2: { vit: 20 }, 3: { deg: 15, vit: 30 }, 4: { deg: 40, vit: 40, res: 5 } } },
  abraknyde:  { name: 'Panoplie Abraknyde', bonus: { 2: { sag: 20 }, 3: { deg: 20, sag: 30 }, 4: { deg: 30, sag: 40, res: 5 } } },
  bwork:      { name: 'Panoplie du Bwork', bonus: { 2: { deg: 20 }, 3: { deg: 30, vit: 50 }, 4: { deg: 80, vit: 80 } } },
  koalak:     { name: 'Panoplie Koalak', bonus: { 2: { deg: 25 }, 3: { deg: 75, crit: 3 } } },
  chafer:     { name: 'Panoplie du Chafer', bonus: { 2: { vit: 80 }, 3: { deg: 50, vit: 120, res: 8 } } },
};

/* Équipement de récolte : emplacements séparés, bonus aux métiers de récolte.
   rxp = % XP de métier · rqty = % de chance de +1 ressource · rspd = % vitesse de récolte
   lvl = niveau de Paysan requis */
const HARVEST_SLOTS = ['outil', 'gants', 'sac'];
const HARVEST_SLOT_LABEL = { outil: 'Outil', gants: 'Gants', sac: 'Sac' };
Object.assign(STAT_LABEL, { rxp: '% XP de récolte', rqty: '% Quantité récoltée', rspd: '% Vitesse de récolte' });
Object.assign(STAT_SHORT, { rxp: '% XP récolte', rqty: '% Qté', rspd: '% Vitesse' });

/* --------------------------------------------------------------------
   RELIQUES — un seul emplacement par héros, effets uniques et puissants.
   Elles ne se fabriquent pas : drop extrêmement rare (voir RELIC_DROPS).
   -------------------------------------------------------------------- */
Object.assign(STAT_LABEL, { kamas: '% Kamas gagnés', xpPct: '% XP gagnée', dmgPct: '% Dégâts finaux', dodge: '% Esquive', regen: '% PV régénérés / tour', speed: '% Vitesse de combat' });
Object.assign(STAT_SHORT, { kamas: '% Kamas', xpPct: '% XP', dmgPct: '% Dégâts', dodge: '% Esquive', regen: '% Régén.', speed: '% Vitesse combat' });

const ITEMS = {
  /* Reliques */
  relique_tofu:     { name: 'Plume du Tofu Céleste', slot: 'relique', lvl: 1, relic: true, stats: { dodge: [5, 8], speed: [5, 10] } },
  relique_bouftou:  { name: "Toison d'Or du Bouftou Royal", slot: 'relique', lvl: 15, relic: true, stats: { xpPct: [15, 20], vit: [20, 40] } },
  relique_abra:     { name: "Graine d'Abraknyde Millénaire", slot: 'relique', lvl: 20, relic: true, stats: { regen: [2, 3], vit: [30, 50] } },
  relique_craq:     { name: 'Noyau de Craqueleur', slot: 'relique', lvl: 35, relic: true, stats: { res: [6, 10], vit: [40, 60] } },
  relique_bworkette:{ name: 'Cœur de Bworkette', slot: 'relique', lvl: 45, relic: true, stats: { deg: [10, 20], dmgPct: [12, 18] } },
  relique_kanigrou: { name: 'Sablier du Kanigrou', slot: 'relique', lvl: 55, relic: true, stats: { deg: [15, 25], speed: [15, 25] } },
  relique_chafer:   { name: 'Lanterne des Âmes', slot: 'relique', lvl: 70, relic: true, stats: { kamas: [30, 50], pp: [30, 50], xpPct: [5, 10] } },

  /* Récolte */
  faux_paysan:     { name: 'Faux du Paysan', slot: 'outil', lvl: 1, harvest: true, stats: { rspd: [5, 10], rxp: [5, 10] } },
  faux_avoine:     { name: "Faux d'Avoine", slot: 'outil', lvl: 20, harvest: true, stats: { rspd: [10, 18], rxp: [10, 15], rqty: [5, 10] } },
  faux_seigle:     { name: 'Grande Faux de Seigle', slot: 'outil', lvl: 50, harvest: true, stats: { rspd: [18, 28], rxp: [15, 25], rqty: [10, 20] } },
  gants_paille:    { name: 'Gants de Paille', slot: 'gants', lvl: 1, harvest: true, stats: { rxp: [5, 10] } },
  gants_houblon:   { name: 'Gants de Houblonnier', slot: 'gants', lvl: 30, harvest: true, stats: { rxp: [12, 20], rspd: [4, 8] } },
  sac_ble:         { name: 'Sac de Jute', slot: 'sac', lvl: 1, harvest: true, stats: { rqty: [5, 10] } },
  sac_lin:         { name: 'Besace de Lin', slot: 'sac', lvl: 40, harvest: true, stats: { rqty: [15, 25], rxp: [5, 10] } },

  /* Niveau 1 — Aventurier */
  coiffe_aventurier:   { icon: '🧢', name: "Coiffe de l'Aventurier", slot: 'coiffe', lvl: 1, set: 'aventurier', stats: { vit: [5, 12] } },
  cape_aventurier:     { icon: '🧣', name: "Cape de l'Aventurier", slot: 'cape', lvl: 1, set: 'aventurier', stats: { deg: [2, 5], sag: [2, 8] } },
  amulette_aventurier: { icon: '📿', name: "Amulette de l'Aventurier", slot: 'amulette', lvl: 1, set: 'aventurier', stats: { deg: [3, 6], vit: [3, 6] } },
  anneau_aventurier:   { icon: '💍', name: "Anneau de l'Aventurier", slot: 'anneau', lvl: 1, set: 'aventurier', stats: { deg: [4, 7], pp: [4, 7] } },
  bottes_aventurier:   { icon: '👢', name: "Bottes de l'Aventurier", slot: 'bottes', lvl: 1, set: 'aventurier', stats: { deg: [2, 5], vit: [3, 6] } },
  ceinture_aventurier: { icon: '🎗️', name: "Ceinture de l'Aventurier", slot: 'ceinture', lvl: 1, set: 'aventurier', stats: { deg: [4, 7] } },
  baton_debutant:      { icon: '🪄', name: 'Bâton du Débutant', slot: 'arme', lvl: 3, stats: { deg: [7, 15] } },
  epee_boisaille:      { icon: '🗡️', name: 'Épée de Boisaille', slot: 'arme', lvl: 3, stats: { deg: [7, 15] } },

  /* Niveau 10-20 */
  coiffe_bouftou:      { icon: '🎩', name: 'Coiffe du Bouftou', slot: 'coiffe', lvl: 10, set: 'bouftou', stats: { deg: [5, 10], vit: [20, 35] } },
  cape_bouftou:        { icon: '🧥', name: 'Cape du Bouftou', slot: 'cape', lvl: 10, set: 'bouftou', stats: { vit: [15, 25], sag: [6, 12] } },
  amulette_bouftou:    { icon: '🧿', name: 'Amulette du Bouftou', slot: 'amulette', lvl: 15, set: 'bouftou', stats: { deg: [8, 14], vit: [20, 30], pp: [8, 14] } },
  marteau_bouftou:     { icon: '🔨', name: 'Marteau du Bouftou', slot: 'arme', lvl: 18, set: 'bouftou', stats: { deg: [25, 43], vit: [10, 20] } },
  bottes_moskito:      { icon: '🥾', name: 'Bottes Moskito', slot: 'bottes', lvl: 12, stats: { deg: [8, 14], vit: [8, 14], dodge: [1, 3] } },
  anneau_arakne:       { icon: '💠', name: "Anneau d'Arakne", slot: 'anneau', lvl: 14, stats: { deg: [8, 16], pp: [8, 13] } },
  ceinture_champ:      { icon: '🌾', name: 'Ceinture Champêtre', slot: 'ceinture', lvl: 16, stats: { vit: [15, 25], sag: [10, 20] } },
  arc_moskito:         { icon: '🏹', name: 'Arc Moskito', slot: 'arme', lvl: 15, stats: { deg: [22, 36], crit: [1, 2] } },
  pelle_champ:         { icon: '⛏️', name: 'Pelle des Champs', slot: 'arme', lvl: 15, stats: { deg: [22, 36], pp: [8, 14] } },

  /* Niveau 25-35 */
  baton_abraknyde:     { icon: '🌿', name: 'Bâton Abraknyde', slot: 'arme', lvl: 25, set: 'abraknyde', stats: { deg: [35, 55] } },
  cape_abraknyde:      { icon: '🍃', name: 'Cape Abraknyde', slot: 'cape', lvl: 25, set: 'abraknyde', stats: { vit: [25, 40], sag: [12, 24] } },
  anneau_ecurouille:   { icon: '🌰', name: "Anneau d'Écurouille", slot: 'anneau', lvl: 25, set: 'abraknyde', stats: { deg: [14, 24], pp: [11, 19] } },
  bottes_sanglier:     { icon: '🐾', name: 'Bottes du Sanglier', slot: 'bottes', lvl: 30, set: 'abraknyde', stats: { deg: [15, 25], res: [2, 4], vit: [10, 20] } },
  coiffe_prespic:      { icon: '👒', name: 'Coiffe Prespic', slot: 'coiffe', lvl: 28, stats: { deg: [10, 15], vit: [30, 45], res: [1, 3], pp: [12, 20] } },

  /* Niveau 40-55 */
  hache_bwork:         { icon: '🪓', name: 'Hache du Bwork', slot: 'arme', lvl: 45, set: 'bwork', stats: { deg: [60, 90], crit: [1, 3] } },
  casque_bwork:        { icon: '⛑️', name: 'Casque du Bwork', slot: 'coiffe', lvl: 42, set: 'bwork', stats: { deg: [15, 25], vit: [45, 65] } },
  ceinture_bwork:      { icon: '⛓️', name: 'Ceinture du Bwork', slot: 'ceinture', lvl: 42, set: 'bwork', stats: { deg: [10, 15], vit: [30, 45] } },
  amulette_craqueleur: { icon: '🪬', name: 'Amulette du Craqueleur', slot: 'amulette', lvl: 40, set: 'bwork', stats: { vit: [50, 80], res: [3, 5], pp: [15, 26] } },
  cape_kwak:           { icon: '🧊', name: 'Cape Kwakwa', slot: 'cape', lvl: 35, stats: { deg: [29, 42], pp: [14, 24] } },
  bottes_scara:        { icon: '🩴', name: 'Bottes Scarafeuille', slot: 'bottes', lvl: 38, stats: { vit: [30, 45], res: [3, 5], sag: [10, 20] } },

  /* Niveau 55-70 */
  coiffe_koalak:       { icon: '🎓', name: 'Coiffe Koalak', slot: 'coiffe', lvl: 55, set: 'koalak', stats: { deg: [20, 30], vit: [60, 90], pp: [20, 34] } },
  bottes_kanigrou:     { icon: '🦶', name: 'Bottes Kanigrou', slot: 'bottes', lvl: 60, set: 'koalak', stats: { deg: [40, 55], vit: [30, 45], dodge: [3, 5] } },
  anneau_mufafah:      { icon: '🔶', name: 'Anneau Mufafah', slot: 'anneau', lvl: 65, set: 'koalak', stats: { deg: [37, 53], pp: [23, 39] } },

  /* Niveau 75-100 */
  cape_chafer:         { icon: '🦇', name: 'Cape du Chafer', slot: 'cape', lvl: 75, set: 'chafer', stats: { vit: [90, 130], sag: [30, 50], pp: [26, 44] } },
  ceinture_ecto:       { icon: '🌀', name: 'Ceinture Ectoplasmique', slot: 'ceinture', lvl: 85, set: 'chafer', stats: { deg: [29, 48], pp: [29, 49] } },
  epee_chafer:         { icon: '⚔️', name: 'Épée du Chafer', slot: 'arme', lvl: 90, set: 'chafer', stats: { deg: [76, 104], crit: [3, 5] } },
};

/* --------------------------------------------------------------------
   MÉTIERS & RECETTES
   -------------------------------------------------------------------- */
const JOBS = {
  tailleur:   { name: 'Tailleur', makes: 'Coiffes et capes' },
  bijoutier:  { name: 'Bijoutier', makes: 'Amulettes et anneaux' },
  cordonnier: { name: 'Cordonnier', makes: 'Bottes et ceintures' },
  forgeron:   { name: 'Forgeron', makes: 'Armes' },
  bricoleur:  { name: 'Bricoleur', makes: 'Clefs de donjon' },
  boulanger:  { name: 'Boulanger', makes: 'Pains et consommables' },
};
const MAX_JOB_LEVEL = 100;

/* --------------------------------------------------------------------
   RÉCOLTE — métiers de récolte et leurs ressources (paliers à la Dofus)
   lvl : niveau de métier requis · xp : XP de métier par récolte
   -------------------------------------------------------------------- */
const GATHER_JOBS = {
  paysan: { name: 'Paysan', makes: 'Céréales', icon: '🌾', text: 'Fauche les champs d’Amakna. Chaque céréale se débloque à un palier de métier.' },
};
const HARVEST_MS = 4000;   // durée d'une récolte
const CROPS = [
  { id: 'ble',     job: 'paysan', name: 'Blé',     icon: '🌾', lvl: 1,  xp: 5,  value: 2,  where: "Champs d'Astrub" },
  { id: 'orge',    job: 'paysan', name: 'Orge',    icon: '🌿', lvl: 10, xp: 10, value: 4,  where: 'Champs de Bonta' },
  { id: 'avoine',  job: 'paysan', name: 'Avoine',  icon: '🍂', lvl: 20, xp: 15, value: 6,  where: 'Plaine des Porkass' },
  { id: 'houblon', job: 'paysan', name: 'Houblon', icon: '🍃', lvl: 30, xp: 20, value: 9,  where: 'Champs de Brâkmar' },
  { id: 'lin',     job: 'paysan', name: 'Lin',     icon: '🪻', lvl: 40, xp: 25, value: 12, where: 'Champs de Madrestam' },
  { id: 'seigle',  job: 'paysan', name: 'Seigle',  icon: '🌱', lvl: 50, xp: 30, value: 16, where: 'Plaines de Cania' },
  { id: 'riz',     job: 'paysan', name: 'Riz',     icon: '🍚', lvl: 50, xp: 30, value: 16, where: 'Rizières de Pandala' },
  { id: 'malt',    job: 'paysan', name: 'Malt',    icon: '🌰', lvl: 60, xp: 35, value: 21, where: 'Champs de Sufokia' },
  { id: 'chanvre', job: 'paysan', name: 'Chanvre', icon: '🍀', lvl: 70, xp: 40, value: 27, where: 'Landes de Sidimote' },
];
/* XP de récolte divisée par 5 */
for (const c of CROPS) c.xp = Math.max(1, Math.round(c.xp / 5));
for (const c of CROPS) RESOURCES[c.id] = { name: c.name, icon: c.icon, value: c.value, crop: true };

const RECIPES = [
  { out: 'coiffe_aventurier', job: 'tailleur', lvl: 1, ing: { laine_bouftou: 3, plume_tofu: 2 } },
  { out: 'cape_aventurier', job: 'tailleur', lvl: 1, ing: { laine_bouftou: 4, peau_larve: 2 } },
  { out: 'amulette_aventurier', job: 'bijoutier', lvl: 1, ing: { plume_tofu: 3, petale_pissenlit: 2 } },
  { out: 'anneau_aventurier', job: 'bijoutier', lvl: 1, ing: { peau_larve: 3, petale_pissenlit: 2 } },
  { out: 'bottes_aventurier', job: 'cordonnier', lvl: 1, ing: { cuir_bouftou: 3, peau_larve: 2 } },
  { out: 'ceinture_aventurier', job: 'cordonnier', lvl: 1, ing: { cuir_bouftou: 2, laine_bouftou: 3 } },
  { out: 'baton_debutant', job: 'forgeron', lvl: 1, ing: { petale_pissenlit: 4, plume_tofu: 4 } },
  { out: 'epee_boisaille', job: 'forgeron', lvl: 1, ing: { cuir_bouftou: 4, laine_bouftou: 3 } },
  { out: 'clef_bouftou', job: 'bricoleur', lvl: 1, ing: { laine_bouftou: 10, cuir_bouftou: 5, plume_tofu: 5 } },

  { out: 'coiffe_bouftou', job: 'tailleur', lvl: 8, ing: { laine_bouftou: 15, cuir_bouftou: 8, laine_royale: 1 } },
  { out: 'cape_bouftou', job: 'tailleur', lvl: 8, ing: { laine_bouftou: 15, cuir_bouftou: 10, plume_tofu: 6 } },
  { out: 'amulette_bouftou', job: 'bijoutier', lvl: 10, ing: { cuir_bouftou: 10, laine_royale: 2, petale_pissenlit: 6 } },
  { out: 'marteau_bouftou', job: 'forgeron', lvl: 12, ing: { corne_royale: 1, cuir_bouftou: 15, laine_bouftou: 20 } },
  { out: 'bottes_moskito', job: 'cordonnier', lvl: 8, ing: { dard_moskito: 8, patte_arakne: 4 } },
  { out: 'anneau_arakne', job: 'bijoutier', lvl: 10, ing: { patte_arakne: 8, chapeau_champ: 4 } },
  { out: 'ceinture_champ', job: 'cordonnier', lvl: 12, ing: { chapeau_champ: 8, cuir_bouftou: 6 } },
  { out: 'arc_moskito', job: 'forgeron', lvl: 10, ing: { dard_moskito: 10, patte_arakne: 5 } },
  { out: 'pelle_champ', job: 'forgeron', lvl: 10, ing: { chapeau_champ: 8, dard_moskito: 6 } },

  { out: 'baton_abraknyde', job: 'forgeron', lvl: 20, ing: { ecorce_abra: 20, pic_prespic: 8 } },
  { out: 'cape_abraknyde', job: 'tailleur', lvl: 20, ing: { ecorce_abra: 15, queue_ecurouille: 8 } },
  { out: 'anneau_ecurouille', job: 'bijoutier', lvl: 20, ing: { queue_ecurouille: 10, ecorce_abra: 6 } },
  { out: 'bottes_sanglier', job: 'cordonnier', lvl: 24, ing: { defense_sanglier: 10, pic_prespic: 6 } },
  { out: 'coiffe_prespic', job: 'tailleur', lvl: 22, ing: { pic_prespic: 12, defense_sanglier: 4 } },

  { out: 'clef_bwork', job: 'bricoleur', lvl: 20, ing: { oreille_bwork: 8, carapace_scara: 6, fragment_craq: 4 } },
  { out: 'cape_kwak', job: 'tailleur', lvl: 30, ing: { plume_kwak: 15, carapace_scara: 4 } },
  { out: 'bottes_scara', job: 'cordonnier', lvl: 32, ing: { carapace_scara: 12, plume_kwak: 6 } },
  { out: 'amulette_craqueleur', job: 'bijoutier', lvl: 34, ing: { fragment_craq: 12, plume_kwak: 6 } },
  { out: 'casque_bwork', job: 'tailleur', lvl: 36, ing: { oreille_bwork: 12, carapace_scara: 10 } },
  { out: 'ceinture_bwork', job: 'cordonnier', lvl: 36, ing: { oreille_bwork: 10, fragment_craq: 8 } },
  { out: 'hache_bwork', job: 'forgeron', lvl: 40, ing: { nattes_bworkette: 1, oreille_bwork: 15, fragment_craq: 10 } },

  { out: 'coiffe_koalak', job: 'tailleur', lvl: 48, ing: { poil_koalak: 15, croc_mufafah: 6 } },
  { out: 'bottes_kanigrou', job: 'cordonnier', lvl: 52, ing: { peau_kanigrou: 15, poil_koalak: 8 } },
  { out: 'anneau_mufafah', job: 'bijoutier', lvl: 56, ing: { croc_mufafah: 12, peau_kanigrou: 8 } },

  { out: 'cape_chafer', job: 'tailleur', lvl: 65, ing: { os_chafer: 20, ectoplasme: 5 } },
  { out: 'ceinture_ecto', job: 'cordonnier', lvl: 72, ing: { ectoplasme: 10, gelee_bleutee: 8 } },
  { out: 'epee_chafer', job: 'forgeron', lvl: 78, ing: { os_chafer: 25, gelee_bleutee: 10, ectoplasme: 6 } },
];

RECIPES.push(
  { out: 'faux_paysan', job: 'forgeron', lvl: 1, ing: { ble: 10, cuir_bouftou: 3 } },
  { out: 'gants_paille', job: 'tailleur', lvl: 1, ing: { ble: 12, laine_bouftou: 3 } },
  { out: 'sac_ble', job: 'tailleur', lvl: 1, ing: { ble: 15, peau_larve: 3 } },
  { out: 'faux_avoine', job: 'forgeron', lvl: 15, ing: { avoine: 15, orge: 10, defense_sanglier: 4 } },
  { out: 'gants_houblon', job: 'tailleur', lvl: 25, ing: { houblon: 15, patte_arakne: 6 } },
  { out: 'sac_lin', job: 'tailleur', lvl: 35, ing: { lin: 20, carapace_scara: 5 } },
  { out: 'faux_seigle', job: 'forgeron', lvl: 45, ing: { seigle: 20, riz: 10, fragment_craq: 8 } },
);

/* Multiplicateur du coût en ressources de toutes les recettes */
const CRAFT_COST_MULT = 3;
for (const r of RECIPES) for (const k of Object.keys(r.ing)) r.ing[k] *= CRAFT_COST_MULT;

/* --------------------------------------------------------------------
   BOULANGER — consommables (hors multiplicateur de coût ci-dessus)
   food : effet quand un héros le mange. speed = % de vitesse de combat, ms = durée
   -------------------------------------------------------------------- */
RESOURCES.pain_ble = { name: 'Pain de Blé', icon: '🍞', value: 150, food: { speed: 100, ms: 10 * 60 * 1000, desc: 'Vitesse de combat ×2 pendant 10 min' } };
RECIPES.push({ out: 'pain_ble', job: 'boulanger', lvl: 1, ing: { ble: 100 } });


/* --------------------------------------------------------------------
   DROPS D'ÉQUIPEMENT (très rares) — monstre -> objets, dans le thème de sa zone
   Chance de base par monstre vaincu (modifiée par la prospection).
   -------------------------------------------------------------------- */
const GEAR_DROP_RATE = 0.002;
const GEAR_DROP_RATE_BOSS = 0.03;
/* Forme stasifiée : stats = 2 × jet maximum. Chance par objet et par monstre,
   multipliée par la difficulté de la sous-zone et la prospection. */
const STASIS_RATE = 0.0001;
const GEAR_DROPS = {
  tofu: ['amulette_aventurier', 'coiffe_aventurier'],
  larve_bleue: ['anneau_aventurier', 'cape_aventurier', 'baton_debutant'],
  bouftou: ['ceinture_aventurier', 'coiffe_aventurier', 'epee_boisaille'],
  pissenlit: ['bottes_aventurier', 'amulette_aventurier', 'baton_debutant'],
  boufton_blanc: ['cape_bouftou', 'coiffe_bouftou'],
  moskito: ['bottes_moskito', 'arc_moskito'],
  arakne: ['anneau_arakne'],
  champ_champ: ['ceinture_champ', 'pelle_champ'],
  bouftou_chef: ['cape_bouftou', 'coiffe_bouftou'],
  bouftou_royal: ['amulette_bouftou', 'marteau_bouftou', 'coiffe_bouftou'],
  ecurouille: ['anneau_ecurouille'],
  prespic: ['coiffe_prespic'],
  abraknyde: ['baton_abraknyde', 'cape_abraknyde'],
  sanglier: ['bottes_sanglier'],
  kwak: ['cape_kwak'],
  scarafeuille: ['bottes_scara'],
  craqueleur: ['amulette_craqueleur'],
  bwork: ['casque_bwork', 'ceinture_bwork'],
  bwork_mage: ['ceinture_bwork'],
  bwork_archer: ['casque_bwork'],
  bworkette: ['hache_bwork', 'casque_bwork', 'amulette_craqueleur'],
  koalak: ['coiffe_koalak'],
  kanigrou: ['bottes_kanigrou'],
  mufafah: ['anneau_mufafah'],
  chafer: ['cape_chafer'],
  gelee: ['ceinture_ecto'],
  fantome: ['ceinture_ecto', 'cape_chafer'],
  chafer_lancier: ['epee_chafer', 'cape_chafer'],
};

/* Drops de reliques : [relique, chance] par monstre (×difficulté de sous-zone ×prospection) */
const RELIC_DROPS = {
  tofu: [['relique_tofu', 0.0005]],
  bouftou_royal: [['relique_bouftou', 0.02]],
  abraknyde: [['relique_abra', 0.0005]],
  craqueleur: [['relique_craq', 0.0005]],
  bworkette: [['relique_bworkette', 0.02]],
  kanigrou: [['relique_kanigrou', 0.0005]],
  chafer_lancier: [['relique_chafer', 0.0005]],
};

/* Coût de recrutement des héros (index = nombre de héros déjà possédés) */
const RECRUIT_COST = [0, 4000, 30000, 160000];

const HERO_NAMES = [
  'Brakmouth', 'Pimprenelle', 'Tarnak', 'Mirabulle', 'Fendrel', 'Oswyna', 'Garrok', 'Sélénia', 'Kryssa', 'Bolgo', 'Elyndre', 'Patouf',
  'Arkanis', 'Bérénice', 'Calvok', 'Dorinette', 'Escarbouille', 'Fanrir', 'Gribouille', 'Hestiane', 'Ixoral', 'Jorvik', 'Kalinka', 'Loumir',
  'Mortimus', 'Nymphéa', 'Orgalius', 'Plumerette', 'Quentarn', 'Rhubarbe', 'Sylvorn', 'Tibaldine', 'Ulrak', 'Vaïmoana', 'Wolfgar', 'Xélandra',
  'Yrgos', 'Zéphirine', 'Agrippa', 'Brindille', 'Cornebouc', 'Darkéon', 'Églantine', 'Frimousse', 'Gromalt', 'Hirondelle', 'Isengrin', 'Jasmora',
  'Korvax', 'Lavandine', 'Malakor', 'Noisette', 'Obéron', 'Pistache', 'Ragnulf', 'Sarcelle', 'Torgal', 'Ursulka', 'Velours', 'Wrenna',
  'Azalée', 'Bastok', 'Cerisette', 'Draknor', 'Ebonix', 'Flocon', 'Gaïamène', 'Hargnor', 'Iris', 'Jabot', 'Kestrel', 'Lumina',
  'Mandrak', 'Nébuleuse', 'Olgrim', 'Paprika', 'Quartzine', 'Rouquin', 'Saphyra', 'Tonnerre', 'Ulysse', 'Vortan', 'Willow', 'Yzalis',
];
