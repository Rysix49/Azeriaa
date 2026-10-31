/* =====================================================================
   FAMILIERS
   Un compagnon par héros. Il se nourrit de ressources de butin, gagne
   des niveaux et donne des caractéristiques à son maître. Plus un
   familier est puissant, plus les ressources qu'il réclame sont de haut
   niveau (butin des zones de son palier). Chargé après heroic.js.

   - st.pets[id] = { meals }          familiers adoptés (repas reçus au total)
   - h.pet = id                        familier porté par le héros (un seul)
   - stats : valeurs au niveau maximal, calibrées par palier avec
     tools/equip_audit.cjs (budget de puissance, voir CLAUDE.md)
   ===================================================================== */
const PET_MAXLVL = 50;      // niveau maximal d'un familier
const PET_BASE = 0.12;      // part des stats maximales dès l'adoption (niveau 1)
const PET_TREAT = 12;       // repas apportés par une friandise (ressource rare)
const PET_CURVE = 1.35;     // les niveaux coûtent de plus en plus de repas
/* budget : % de puissance de combat au niveau maximal ; meals : repas pour passer du niveau 1 au niveau maximal ;
   adopt : kamas pour l'adopter */
const PET_TIERS = [null,
  { name: 'Commun', col: '#a8b3a6', budget: 5, meals: 2500, adopt: 500 },
  { name: 'Peu commun', col: '#6fc46a', budget: 6.5, meals: 6000, adopt: 5000 },
  { name: 'Rare', col: '#5aa8ef', budget: 8, meals: 11000, adopt: 30000 },
  { name: 'Épique', col: '#b57aef', budget: 9.5, meals: 18000, adopt: 150000 },
  { name: 'Légendaire', col: '#f0a93a', budget: 11, meals: 36000, adopt: 600000 },
  { name: 'Mythique', col: '#ff5a6e', budget: 12.5, meals: 54000, adopt: 2500000 },
];
/* lvl : niveau du meilleur héros requis pour l'adopter ; diet : ressources de butin acceptées (1 repas chacune) ;
   treats : ressources rares acceptées (friandises, PET_TREAT repas chacune) */
const PETS = {
  tofunet:    { name: 'Tofunet', tier: 1, lvl: 1, col: '#f6d44a', stats: { vit: 5, sag: 37, xpPct: 18.5 }, diet: ['plume_tofu', 'peau_larve', 'petale_pissenlit'], treats: ['corne_royale'],
    desc: 'Un poussin curieux qui picore tout ce qui traîne. Il apprend vite et fait profiter son maître de son goût pour le savoir.' },
  bouftounet: { name: 'Bouftounet', tier: 1, lvl: 1, col: '#e9d9b4', stats: { vit: 7, regen: 0.2 }, diet: ['laine_bouftou', 'cuir_bouftou', 'dard_moskito'], treats: ['laine_royale'],
    desc: 'Un agneau tout rond, doux comme un nuage. Il broute les blessures de son maître.' },
  wabbinou:   { name: 'Wabbinou', tier: 2, lvl: 20, col: '#9fb4d6', stats: { deg: 17, crit: 4.5 }, diet: ['oreille_wabbit', 'carotte_doree', 'fourrure_wabbit'], treats: ['couronne_wabbit'],
    desc: 'Un lapereau aux oreilles immenses. Il repère les points faibles avant tout le monde.' },
  blopinet:   { name: 'Blopinet', tier: 2, lvl: 20, col: '#4fc3d9', stats: { hpPct: 4, regen: 0.4 }, diet: ['gelee_coco', 'gelee_griotte', 'gelee_indigo', 'gelee_reinette'], treats: ['gelee_multicolore'],
    desc: 'Une gelée rieuse et rebondissante qui amortit les coups et recolle ce qui se déchire.' },
  prespicou:  { name: 'Prespicou', tier: 2, lvl: 20, col: '#c07a4a', stats: { dodge: 3.5, deg: 12 }, diet: ['pic_prespic', 'ecorce_abra', 'defense_sanglier', 'plume_kwak'], treats: [],
    desc: 'Un petit hérisson nerveux, toujours prêt à se rouler en boule ou à piquer l’ennemi.' },
  koalachon:  { name: 'Koalachon', tier: 3, lvl: 45, col: '#9aa4b0', stats: { vit: 33, res: 3 }, diet: ['poil_koalak', 'peau_kanigrou', 'croc_mufafah', 'oreille_bwork'], treats: ['nattes_bworkette'],
    desc: 'Un ourson grincheux qui s’accroche à son maître comme à un eucalyptus. Rien ne l’ébranle.' },
  kanibou:    { name: 'Kanibou', tier: 3, lvl: 45, col: '#d9573a', stats: { crit: 6.5, critDmg: 49.5 }, diet: ['plume_kanniboul', 'masque_tribal', 'pointe_javelot', 'fragment_craq'], treats: ['totem_ebil'],
    desc: 'Un petit sauvage planqué derrière un masque trop grand. Il guette l’instant du coup fatal.' },
  porcinet:   { name: 'Porcinet', tier: 3, lvl: 45, col: '#f4a3b5', stats: { vit: 25, pp: 72, kamas: 60 }, diet: ['couenne_porsalu', 'jambon_farle', 'os_chafer', 'groin_dorgan'], treats: ['ecaille_cochon'],
    desc: 'Un goret au flair infaillible. Il renifle le butin et l’argent à des lieues à la ronde.' },
  dragonnet:  { name: 'Dragonnet', tier: 4, lvl: 80, col: '#e0533a', stats: { deg: 48, dmgPct: 4 }, diet: ['coquille_dragoeuf', 'ecaille_dore', 'braise_dragueuse'], treats: ['oeuf_crocabulia'],
    desc: 'Un bébé dragon encore coiffé de sa coquille. Ses ronflements crachent déjà des étincelles.' },
  mansotin:   { name: 'Mansotin', tier: 4, lvl: 80, col: '#8fc6ec', stats: { res: 4.5, hpPct: 4 }, diet: ['poil_mansot', 'croc_givre', 'eclat_givre'], treats: ['cristal_mansot'],
    desc: 'Un ourson des neiges au pelage givré. Son maître ne sent ni le froid ni les coups.' },
  fantomino:  { name: 'Fantomino', tier: 4, lvl: 80, col: '#b9b6ee', stats: { dodge: 6, speed: 5.5 }, diet: ['ectoplasme', 'gelee_bleutee', 'groin_dorgan'], treats: [],
    desc: 'Un petit fantôme à lanterne. Insaisissable, il devance les coups et presse le pas de son maître.' },
  kitsounet:  { name: 'Kitsounet', tier: 5, lvl: 125, col: '#f09a4a', stats: { deg: 92, sag: 80, xpPct: 20 }, diet: ['queue_kitsou', 'plume_tengu', 'pousse_bambou'], treats: ['perle_jade'],
    desc: 'Un renardeau-esprit aux queues de feu follet. Sa sagesse est plus ancienne que la forêt.' },
  carpette:   { name: 'Carpette', tier: 5, lvl: 125, col: '#ff8a4a', stats: { vit: 66, pp: 89, kamas: 60, xpPct: 20 }, diet: ['ecaille_koi', 'petale_lotus', 'plume_heron'], treats: ['ecaille_carpe'],
    desc: 'Une carpe dorée qui nage dans sa bulle, portée par la chance. Là où elle passe, la fortune suit.' },
  scarabin:   { name: 'Scarabin', tier: 5, lvl: 125, col: '#e0b23a', stats: { vit: 68, hpPct: 3, res: 3 }, diet: ['carapace_doree', 'bandelette', 'croc_dune', 'pepite_ocre'], treats: ['ankh_or', 'coeur_ocre'],
    desc: 'Un scarabée sacré à la carapace gravée de hiéroglyphes. Sa cuirasse a vu passer des siècles.' },
  ombrelin:   { name: 'Ombrelin', tier: 6, lvl: 165, col: '#7c4dbd', stats: { deg: 70, crit: 6.5, critDmg: 28.5 }, diet: ['poil_ombre', 'aile_vampyro', 'poussiere_nuit'], treats: ['croc_comte'],
    desc: 'Une chauve-souris d’ombre aux yeux incandescents. Elle fond sur les proies que son maître désigne.' },
  rosette:    { name: 'Rosette', tier: 6, lvl: 165, col: '#b01e4a', stats: { dmgPct: 5, regen: 0.6, vit: 72 }, diet: ['petale_noir', 'eclat_gargouille', 'paille_maudite'], treats: ['epine_reine'],
    desc: 'Une fée aux épines noires. Chacune de ses roses referme les plaies et pique les ennemis.' },
};
if (!STAT_LABEL.hpPct) { STAT_LABEL.hpPct = '% PV max'; STAT_SHORT.hpPct = '% PV'; }

const PET_ART = {};   // PET_ART[id] : SVG animé (art6*.js)
const PET_CSS = {};   // PET_CSS[id] : CSS propre à un dessin (injecté au démarrage par petInjectCss)
const petTier = id => PET_TIERS[PETS[id].tier];
function petInjectCss() {
  if (typeof document === 'undefined' || document.getElementById('pet-css')) return;
  const s = document.createElement('style'); s.id = 'pet-css'; s.textContent = Object.values(PET_CSS).join('\n'); document.head.appendChild(s);
}
/* Sprite d'un familier : classe `still` pour une version sans animation (listes) */
function petSprite(id, cls = '') {
  const a = PET_ART[id];
  return a ? `<span class="pet-spr ${cls}" aria-hidden="true">${a}</span>` : `<span class="pet-spr pet-fb ${cls}" aria-hidden="true">🐾</span>`;
}

/* ---------------------------- Niveaux ---------------------------- */
const petMealsAt = (id, lvl) => lvl <= 1 ? 0 : Math.ceil(petTier(id).meals * Math.pow((lvl - 1) / (PET_MAXLVL - 1), PET_CURVE));
function petLevel(id, meals) { let l = 1; while (l < PET_MAXLVL && meals >= petMealsAt(id, l + 1)) l++; return l; }
/* Progression du familier adopté : niveau, repas dans le niveau courant / nécessaires pour le suivant */
function petInfo(st, id) {
  const e = st.pets && st.pets[id]; if (!e) return null;
  const lvl = petLevel(id, e.meals), max = lvl >= PET_MAXLVL, a = petMealsAt(id, lvl), b = max ? a : petMealsAt(id, lvl + 1);
  return { lvl, max, meals: e.meals, into: e.meals - a, span: max ? 0 : b - a, toMax: Math.max(0, petTier(id).meals - e.meals) };
}
const petPower = lvl => PET_BASE + (1 - PET_BASE) * (lvl - 1) / (PET_MAXLVL - 1);
const PET_INT = ['vit', 'deg', 'sag', 'pp', 'kamas', 'dmg', 'pa'];
const petStatVal = (k, v, lvl) => { const x = v * petPower(lvl); return PET_INT.includes(k) ? Math.round(x) : Math.round(x * 10) / 10; };
/* Caractéristiques d'un familier à un niveau donné (niveau maximal par défaut) */
function petStatsAt(id, lvl = PET_MAXLVL) { return Object.fromEntries(Object.entries(PETS[id].stats).map(([k, v]) => [k, petStatVal(k, v, lvl)])); }
function petTotals(st, h) {
  if (!h.pet || !PETS[h.pet] || !st.pets || !st.pets[h.pet]) return null;
  return petStatsAt(h.pet, petLevel(h.pet, st.pets[h.pet].meals));
}
const petOwner = (st, id) => st.heroes.find(h => h.pet === id) || null;

/* ---------------------------- Actions ---------------------------- */
const petDietIds = id => [...PETS[id].diet, ...(PETS[id].treats || [])];
const petMealsOf = (id, rid) => (PETS[id].treats || []).includes(rid) ? PET_TREAT : PETS[id].diet.includes(rid) ? 1 : 0;
function canAdopt(st, id) {
  const p = PETS[id]; if (!p || (st.pets && st.pets[id])) return 'Déjà adopté';
  if (maxHeroLevel(st) < p.lvl) return `Il faut un héros de niveau ${p.lvl}`;
  if (st.kamas < petTier(id).adopt) return 'Pas assez de kamas';
  return '';
}
function adoptPet(st, id) {
  const why = canAdopt(st, id); if (why) return why;
  st.kamas -= petTier(id).adopt; st.pets = st.pets || {}; st.pets[id] = { meals: 0, t: Date.now() };
  return '';
}
/* Nourrit le familier avec n ressources (au plus ce qu'il faut pour atteindre le niveau maximal).
   Retourne { n, meals, lvl0, lvl1 } ou une chaîne d'erreur. */
function feedPet(st, id, rid, n) {
  const e = st.pets && st.pets[id]; if (!e) return 'Familier non adopté';
  const per = petMealsOf(id, rid); if (!per) return 'Il ne mange pas ça';
  const have = st.res[rid] || 0; if (have <= 0) return 'Plus de ressource';
  const lvl0 = petLevel(id, e.meals), need = Math.max(0, petTier(id).meals - e.meals);
  if (need <= 0) return 'Niveau maximal atteint';
  n = Math.min(Math.max(1, Math.floor(n)), have, Math.ceil(need / per));
  st.res[rid] = have - n; if (st.res[rid] <= 0) delete st.res[rid];
  e.meals = Math.min(petTier(id).meals, e.meals + n * per);
  st.stats.petMeals = (st.stats.petMeals || 0) + n;
  return { n, meals: n * per, lvl0, lvl1: petLevel(id, e.meals) };
}
/* Équipe le familier sur un héros (le retire d'un autre héros s'il en portait un) ; id = null pour le déséquiper */
function setHeroPet(st, h, id) {
  if (!id) { h.pet = null; return true; }
  if (!PETS[id] || !st.pets || !st.pets[id]) return false;
  for (const o of st.heroes) if (o.pet === id) o.pet = null;
  h.pet = id; return true;
}
/* Où trouver une ressource : niveau du premier monstre qui la lâche et noms des monstres (hors archimonstres et héroïques) */
let _petSrc = null;
function petFoodInfo(rid) {
  if (!_petSrc) {
    _petSrc = {};
    for (const [mid, m] of Object.entries(MONSTERS)) { if (m.heroic || m.archi) continue; for (const [r] of (m.drops || [])) { const s = _petSrc[r] || (_petSrc[r] = { lvl: 999, from: [] }); s.lvl = Math.min(s.lvl, m.lvl); s.from.push([m.lvl, m.name]); } }
    for (const s of Object.values(_petSrc)) s.from = s.from.sort((a, b) => a[0] - b[0]).map(x => x[1]).slice(0, 2);
  }
  return _petSrc[rid] || { lvl: 0, from: [] };
}
