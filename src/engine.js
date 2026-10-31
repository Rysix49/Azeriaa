/* =====================================================================
   AMAKNA IDLE — MOTEUR
   Aucune dépendance au DOM : tout est testable hors navigateur.
   ===================================================================== */

const SAVE_VERSION = 2; // 2 : stats élémentaires fusionnées en Dégâts
const STEP_MS = 550;            // durée d'une action de combat
const REGEN_FULL_MS = 4500;    // temps pour récupérer 100 % des PV
const DEATH_REST_MS = 20000;    // repos après une défaite
const OFFLINE_CAP_MS = 20 * 60 * 1000;   // progression hors-ligne : 20 min maximum
const MAX_TURNS = 60;

const rnd = (a, b) => a + Math.random() * (b - a);
const irnd = (a, b) => Math.floor(rnd(a, b + 1));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uid = () => Math.random().toString(36).slice(2, 10);

/* ---------------------------- Courbes ---------------------------- */
function xpToNext(lvl) { return 2 * Math.floor((16 * Math.pow(lvl, 2.25) + 20 * lvl) * (1 + Math.pow(lvl / 35, 2))); }
function jobXpToNext(lvl) { return Math.floor(40 * Math.pow(lvl, 1.7)); }

const _monCache = {};
function monsterStats(mid) {
  if (_monCache[mid]) return _monCache[mid];
  const m = MONSTERS[mid]; const l = m.lvl;
  const hp = Math.round((12 + l * 8 + l * l * 0.12) * (m.hpm || 1));
  const avg = (2.5 + l * 0.8 + l * l * 0.003) * (m.dm || 1);
  const xp = Math.round((10 + l * 6 + l * l * 1.9) * (m.hpm || 1) * (m.boss ? 1.5 : 1));
  const kamas = [Math.round(l * 1.5 + 2), Math.round(l * 3 + 6)].map(k => m.boss ? k * 8 : k);
  const mu = m.mult || 1, rw = m.archi ? ARCHI_REWARD : 1; // archimonstre : PV et dégâts ×2, XP et kamas ×6
  return (_monCache[mid] = { hp: hp * mu, dmin: Math.max(1, Math.round(avg * 0.8 * mu)), dmax: Math.round(avg * 1.2 * mu), xp: xp * rw, kamas: kamas.map(k => k * rw), res: m.res || 0 });
}

/* ---------------------------- État ---------------------------- */
function newState() {
  return {
    v: SAVE_VERSION,
    kamas: 200,
    archi: null,            // archimonstre repéré : { zone, mid, hero }
    res: { clef_bouftou: 1 },
    mastery: {},            // recette (id de l'objet) -> nombre de fabrications
    gear: [],               // instances d'équipement : { uid, id, stats }
    jobs: Object.fromEntries([...Object.keys(JOBS), ...Object.keys(GATHER_JOBS)].map(j => [j, { lvl: 1, xp: 0 }])),
    heroes: [],
    quests: {},             // id -> true quand réclamé
    stats: { kills: {}, totalKills: 0, obtained: {}, crafted: 0, kamasEarned: 0, fights: 0, deaths: 0 },
    created: Date.now(),
    lastTick: Date.now(),
    settings: { autoSell: false },
  };
}

function newHero(st, name, cls) {
  const h = {
    id: uid(), name, cls, lvl: 1, xp: 0, capital: 0, auto: CLASSES[cls].main,
    base: { vit: 0, sag: 0, deg: 0 },
    equip: {}, hp: 0, act: null, fight: null, wait: 0, restTotal: 0, resting: false,
    log: [], session: null,
  };
  h.hp = heroTotals(st, h).maxHp;
  return h;
}

function maxHeroLevel(s) { return s.heroes.reduce((m, h) => Math.max(m, h.lvl), 0); }
function maxSetCount(s) {
  let best = 0;
  for (const h of s.heroes) for (const c of Object.values(setCounts(s, h))) best = Math.max(best, c);
  return best;
}
function gearById(st, id) { return st.gear.find(g => g.uid === id); }
function setCounts(st, h) {
  const c = {};
  for (const slot of SLOTS) {
    const g = h.equip[slot] && gearById(st, h.equip[slot]);
    if (g && ITEMS[g.id].set) c[ITEMS[g.id].set] = (c[ITEMS[g.id].set] || 0) + 1;
  }
  return c;
}
function setBonus(setId, count) {
  const b = SETS[setId].bonus; let best = null;
  for (const k of Object.keys(b)) if (count >= +k) best = b[k];
  return best || {};
}

/* Statistiques totales d'un héros (base + équipement + panoplies + passif) */
function heroTotals(st, h) {
  const t = { vit: 0, sag: 0, deg: 0, res: 0, pp: 0, crit: 0, soin: 0, dmg: 0, pa: 0, kamas: 0 };
  for (const s of STATS) t[s] += h.base[s];
  for (const slot of SLOTS) {
    const g = h.equip[slot] && gearById(st, h.equip[slot]);
    if (g) for (const [k, v] of Object.entries(g.stats)) t[k] = (t[k] || 0) + v;
  }
  for (const [set, n] of Object.entries(setCounts(st, h))) for (const [k, v] of Object.entries(setBonus(set, n))) t[k] = (t[k] || 0) + v;
  const sk = skillTotals(h); for (const k in sk) t[k] = (t[k] || 0) + sk[k];
  if (h.food && h.food.left > 0 && RESOURCES[h.food.id]) { const fm = 1 + (sk.foodPow || 0) / 100; for (const [k, v] of Object.entries(RESOURCES[h.food.id].food.fx)) t[k] = (t[k] || 0) + v * fm; }
  for (const slot of DOFUS_SLOTS) { const g = h.dofus && h.dofus[slot] && gearById(st, h.dofus[slot]); if (g) for (const [k, v] of Object.entries(g.stats)) t[k] = (t[k] || 0) + v; }
  const rel = h.relic && gearById(st, h.relic);
  if (rel) for (const [k, v] of Object.entries(rel.stats)) t[k] = (t[k] || 0) + v;
  const cl = CLASSES[h.cls];
  if (cl.passive && cl.passive.stats) for (const [k, v] of Object.entries(cl.passive.stats)) t[k] = (t[k] || 0) + v;
  t.maxHp = Math.round((50 + h.lvl * 6) * cl.hpMult + t.vit);
  if (t.hpPct) t.maxHp = Math.round(t.maxHp * (1 + t.hpPct / 100));
  t.pa = 6 + (h.lvl >= 100 ? 1 : 0) + t.pa;
  t.critPct = clamp(3 + t.crit, 0, 50);
  t.dodgePct = clamp(t.dodge || 0, 0, 35);
  t.resPct = clamp(t.res, 0, 50);
  t.ppTotal = 100 + t.pp;
  t.xpBonus = Math.round((t.sag * SAG_XP + (t.xpPct || 0)) * 10) / 10;
  return t;
}

function spellsOf(h) { return CLASSES[h.cls].spells; }
function spellUnlocked(h, sp) { return h.lvl >= sp.lvl; }

/* ---------------------------- Activités ---------------------------- */
function findPlace(type, id) { return type === 'dungeon' ? DUNGEONS.find(d => d.id === id) : type === 'harvest' ? CROPS.find(c => c.id === id) : ZONES.find(z => z.id === id); }

function setActivity(st, h, type, id, tier = 0) {
  h.fight = null; h.resting = false; h.wait = 0; h.restTotal = 0; h.nextArchi = null;
  h.hp = heroTotals(st, h).maxHp;
  h.act = type ? { type, id, room: 0, tier: type === 'zone' ? clamp(+tier || 0, 0, SUBZONES.length - 1) : 0 } : null;
  h.session = type ? { start: Date.now(), xp: 0, kamas: 0, kills: 0, runs: 0 } : null;
  h.log = [];
  /* l'archimonstre s'enfuit quand plus aucun héros n'est dans sa zone */
  if (st.archi && !st.heroes.some(x => x.act && x.act.type === 'zone' && x.act.id === st.archi.zone)) st.archi = null;
  if (type === 'harvest') h.wait = harvestMs(st, h);
}

function pickGroup(zone, h) {
  const r = Math.random();
  const size = r < 0.4 ? 1 : r < 0.78 ? 2 : 3;
  const out = [];
  for (let i = 0; i < size; i++) out.push(zone.monsters[irnd(0, zone.monsters.length - 1)]);
  return out;
}

function tierOf(h) { return SUBZONES[(h.act && h.act.tier) || 0] || SUBZONES[0]; }
function subName(place, act) { return act && act.type === 'zone' ? `${place.name} ${(act.tier || 0) + 1}` : place.name; }

/* Historique récent des gains (5 min) pour calculer des taux « par heure » qui réagissent vite */
function sessionEvent(h, xp, kamas, n) {
  const s = h.session, now = Date.now();
  (s.ev = s.ev || []).push([now, xp, kamas, n]);
  while (s.ev.length && now - s.ev[0][0] > 300000) s.ev.shift();
}
const RATE_WINDOW_MS = 120000;
/* Taux par heure sur les 2 dernières minutes (ou depuis le début si plus récent) */
function sessionRates(h) {
  const s = h.session; if (!s) return null;
  const now = Date.now(), win = Math.max(1000, Math.min(RATE_WINDOW_MS, now - s.start));
  let xp = 0, kamas = 0, n = 0;
  for (const [t, x, k, c] of s.ev || []) if (now - t <= win) { xp += x; kamas += k; n += c; }
  const f = 3600000 / win;
  return { xp: xp * f, kamas: kamas * f, n: n * f };
}

function startFight(st, h, ev) {
  const place = findPlace(h.act.type, h.act.id);
  let group;
  if (h.act.type === 'dungeon') {
    if (h.act.room === 0) {
      if ((st.res[place.key] || 0) <= 0) {
        ev.log(h, `Plus de ${RESOURCES[place.key].name} : ${h.name} quitte le donjon.`, 'warn');
        ev.stopped && ev.stopped(h, 'Plus de clef');
        setActivity(st, h, null);
        return false;
      }
      st.res[place.key]--;
      ev.log(h, `${h.name} entre dans ${place.name} (clef utilisée).`, 'info');
    }
    group = h.act.room < place.rooms.length ? place.rooms[h.act.room] : place.boss;
  } else {
    if (h.nextArchi && h.act.type === 'zone' && MONSTERS[h.nextArchi]) group = [h.nextArchi];
    else group = pickGroup(place, h);
    h.nextArchi = null;
  }
  h.fight = {
    mons: group.map(mid => { const ms = monsterStats(mid); const hp = Math.round(ms.hp * tierOf(h).hp); return { mid, hp, max: hp, poison: null }; }),
    tier: h.act.tier || 0, turn: 1, phase: 0, buffs: [], cds: {}, casts: {},
  };
  if (h.cls === 'xelor') h.fight.grains = h.grains || 0; // le sablier se garde d'un combat à l'autre
  if (h.cls === 'sram') { h.fight.invis = true; h.fight.trap = irnd(0, group.length - 1); }
  if (h.cls === 'enutrof') h.fight.treasure = irnd(0, group.length - 1);
  if (h.cls === 'zobal') { h.mask = h.mask || 'rire'; h.ferv = Math.max(1, h.ferv || 1); }
  if (h.cls === 'steamer') stmInit(h, heroTotals(st, h), h.fight);
  const names = group.map(m => MONSTERS[m].name);
  if (group.length === 1 && MONSTERS[group[0]].archi) { h.fight.archi = true; ev.log(h, `👹 ARCHIMONSTRE ! ${h.name} affronte ${names[0]}.`, 'boss'); }
  else ev.log(h, `Combat contre ${names.join(', ')}.`, 'start');
  return true;
}

/* ---------------------------- Combat ---------------------------- */
function buffTotal(f, k) { return f.buffs.reduce((s, b) => s + (b.stats[k] || 0), 0); }

/* Passifs de classe : puissance bonus selon la situation du combat */
function passivePui(h, t, f) {
  if (h.cls === 'iop' && f) return (f.rage || 0) * 12;
  if (h.cls === 'enutrof') return Math.floor((t.pp || 0) / 10); // L'or fait la force : +1 % de dégâts par 10 Prospection
  return 0;
}
function spellPower(h, t, f, sp) {
  const deg = t.deg + (f ? buffTotal(f, 'deg') : 0) + passivePui(h, t, f);
  const scale = (1 + h.lvl * 0.045) * (1 + deg / 100);
  return { scale, avg: ((sp.min + sp.max) / 2) * scale + t.dmg };
}

function rollSpell(h, t, f, sp, monRes) {
  const { scale } = spellPower(h, t, f, sp);
  let v = rnd(sp.min, sp.max) * scale + t.dmg;
  const crit = Math.random() * 100 < t.critPct + (h.cls === 'cra' && f ? (h.focus || 0) * CRA_FOCUS_CRIT : 0) + (h.cls === 'ecaflip' ? (h.clover || 0) * 3 : 0) + (h.cls === 'zobal' && f && (h.ferv || 0) >= ZOB_FERV_MAX ? ZOB_APOTHEOSE_CRIT : 0);
  if (crit) v *= (h.cls === 'cra' ? 1.8 : 1.5) + (t.critDmg || 0) / 100;
  if (h.cls === 'sram' && f && f.invis && sp.type !== 'heal') v *= 1 + SRAM_INVIS_DMG / 100;
  if (h.cls === 'ecaflip' && f && f.coin === 'face' && sp.type !== 'heal') v *= ECA_FACE_DMG; // Face : +40 % de dégâts
  if (t.dmgPct && sp.type !== 'heal') v *= 1 + t.dmgPct / 100;
  if (h.cls === 'sacrieur' && sp.type !== 'heal') v *= 1 + SAC_STIG_DMG * ((f && f.stig) || 0) / 100; // Stigmates : +8 % de dégâts finaux chacun
  if (h.cls === 'zobal' && f && zobMask(h) === 'rire' && sp.type !== 'heal') v *= 1 + (ZOB_RIRE_DMG + ZOB_FERV_STEP * (h.ferv || 1)) / 100; // Masque Rieur
  if (monRes) v *= 1 - monRes / 100;
  return { v: Math.max(1, Math.round(v)), crit };
}

function heroTurn(st, h, t, ev) {
  const f = h.fight;
  if (f.pendHeal) colosseHeal(st, h); // filet de sécurité : un Colosse interrompu rend quand même ses PV
  for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k]--;
  let pre = '';
  if (t.regen && h.hp < t.maxHp) { const r = Math.min(t.maxHp - h.hp, Math.round(t.maxHp * t.regen / 100)); h.hp += r; pre += `Relique +${r} PV · `; }
  if (h.cls === 'zobal') pre += zobTurnStart(h, t, f, ev);
  if (h.cls === 'steamer') f.elems = [];
  if (h.cls === 'sacrieur') { // Pacte de sang : il se saigne volontairement (jamais sous 40 % de PV) et gagne un Stigmate
    f.stig = f.stig || 0;
    if (h.hp > t.maxHp * SAC_PACT_FLOOR) {
      const loss = Math.max(1, Math.min(Math.round(t.maxHp * SAC_PACT_LOSS), Math.round(h.hp - t.maxHp * SAC_PACT_FLOOR)));
      h.hp -= loss; gainBlood(h, loss, t.maxHp); f.stig = Math.min(SAC_STIG_MAX, f.stig + 1); f.bloodSeq = (f.bloodSeq || 0) + 1; pre += `🩸 Pacte de sang −${loss} PV · `;
    }
  }
  const xel = h.cls === 'xelor';
  const aliveBefore = f.mons.filter(m => m.hp > 0).length;
  if (xel) f.hpMark = h.hp;
  const actions = [];
  const phase = (gainGrains) => {
  f.casts = {};
  let pa = t.pa;
  if (gainGrains) { f.turnCasts = 0; f.turnCrits = 0; }
  for (let guard = 0; guard < 12; guard++) {
    const alive = f.mons.filter(m => m.hp > 0);
    if (!alive.length) break;
    const usable = spellsOf(h).filter(sp => spellUnlocked(h, sp) && sp.pa <= pa && !(f.cds[sp.id] > 0)
      && (sp.max_ == null || (f.casts[sp.id] || 0) < sp.max_));
    if (!usable.length) break;
    const hpRatio = h.hp / t.maxHp;
    const target = h.cls === 'cra' ? craPrey(f, alive) : h.cls === 'enutrof' ? enuTarget(f, alive) : alive.reduce((a, b) => (b.hp < a.hp ? b : a));
    let best = null, bestVal = -1;
    for (const sp of usable) {
      const { avg } = spellPower(h, t, f, sp);
      let val = 0;
      if (sp.type === 'dmg') val = Math.min(avg, target.hp * 1.2);
      else if (sp.type === 'aoe') val = alive.reduce((s, m) => s + Math.min(avg, m.hp), 0);
      else if (sp.type === 'poison') val = target.poison ? 0 : Math.min(avg * sp.turns, target.hp) * 0.9;
      else if (sp.type === 'drain') val = Math.min(avg, target.hp) + (hpRatio < 0.8 ? avg * 0.5 : 0);
      else if (sp.type === 'heal') val = hpRatio < 0.55 ? avg * 2.5 : hpRatio < 0.8 ? avg * 0.4 : 0;
      else if (sp.type === 'buff') {
        const already = f.buffs.some(b => b.id === sp.id);
        const totalHp = alive.reduce((s, m) => s + m.hp, 0);
        val = already ? 0 : totalHp > t.pa * 8 ? 9999 : 0;
      }
      if (h.cls === 'steamer' && val > 0) val *= stmSpellBonus(h, f, sp, alive);
      if (h.cls === 'cra' && sp.type === 'dmg' && (h.focus || 0) >= CRA_FOCUS_MAX) val = Math.max(val, 1) * 6; // garde le Tir Parfait pour la proie
      val = val / sp.pa;
      if (val > bestVal) { bestVal = val; best = sp; }
    }
    if (!best || bestVal <= 0) break;
    pa -= best.pa;
    f.casts[best.id] = (f.casts[best.id] || 0) + 1;
    if (best.cd) f.cds[best.id] = best.cd + 1;
    const tgts = best.type === 'aoe' ? alive.map(m => f.mons.indexOf(m)) : [f.mons.indexOf(target)];
    const pf0 = f.perfectSeq || 0;
    const line = castSpell(st, h, t, best, target, alive);
    actions.push(line);
    let stm = null;
    if (h.cls === 'steamer' && best.type !== 'buff' && best.type !== 'heal') { stm = stmActivate(h, t, f, best, target); if (stm && stm.text) actions.push(stm.text); }
    if (h.cls === 'ecaflip' && f.double && (best.type === 'dmg' || best.type === 'aoe')) { // Quitte ou Double gagné : le sort frappe deux fois
      const al2 = f.mons.filter(m => m.hp > 0);
      if (al2.length) actions.push('🎲×2 ' + castSpell(st, h, t, best, target.hp > 0 ? target : al2[0], al2));
    }
    if (h.cls === 'zobal' && zobMask(h) === 'farce' && (best.type === 'dmg' || best.type === 'aoe') && Math.random() * 100 < ZOB_FARCE_CHANCE + ZOB_FERV_STEP * (h.ferv || 1)) { // Masque Farceur : le sort est lancé deux fois
      const al2 = f.mons.filter(m => m.hp > 0);
      if (al2.length) { f.farceSeq = (f.farceSeq || 0) + 1; actions.push('🤪×2 ' + castSpell(st, h, t, best, target.hp > 0 ? target : al2[0], al2)); }
    }
    if (h.cls === 'zobal' && best.type !== 'buff' && best.type !== 'heal' && Math.random() < ZOB_FERV_CHANCE) zobGain(h); // Ferveur : 50 % de chances de +1 à chaque attaque lancée
    enuChest(h, f, actions);
    if (best.type !== 'buff' && best.type !== 'heal') { f.turnCasts = (f.turnCasts || 0) + 1; if (/ CC/.test(line)) f.turnCrits = (f.turnCrits || 0) + 1; }
    f.fxSeq = (f.fxSeq || 0) + 1;
    (f.fx = f.fx || []).push({ n: f.fxSeq, id: best.id, t: tgts, pf: (f.perfectSeq || 0) > pf0 ? 1 : 0, tur: stm ? stm.shots : null }); // pf : ce tir est le Tir Parfait (la cinématique le joue à la place)
    if (f.fx.length > 16) f.fx.shift();
    if (xel && gainGrains) f.grains = Math.min(12, (f.grains || 0) + best.pa + (best.grains || 0));
  }
  };
  if (h.cls === 'ecaflip') ecaToss(h, t, f, actions);
  if (h.cls === 'enutrof') {
    enuChest(h, f, actions);
    if ((h.purse || 0) >= ENU_PURSE_MAX && f.mons.some(m => m.hp > 0)) { actions.push(enuJackpot(h, t, f)); enuChest(h, f, actions); }
  }
  const rwPre = xel ? f.mons.map(m => m.hp) : null;
  phase(true);
  const rewind = xel && (f.grains || 0) >= 12 && f.mons.some(m => m.hp > 0); // sablier plein : le Rembobinage se déclenche tout de suite, sans attendre le tour suivant
  if (rewind) f.grains -= 12;
  if (rewind) { f.rewinds = (f.rewinds || 0) + 1; f.rwInfo = { n: f.rewinds, at: f.fxSeq || 0, pre: rwPre, mid: f.mons.map(m => m.hp) }; /* pour la cinématique : PV avant / après le premier jet, et dernier sort avant le retour dans le temps */ h.chrono = Math.min(CHRONO_MAX, (h.chrono || 0) + 1); actions.push('⏳ Rembobinage !'); for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k]--; phase(false); }
  if (xel) h.grains = f.grains || 0;
  if (h.cls === 'sacrieur') { // Soif de sang : chaque ennemi achevé rend des PV
    const kills = aliveBefore - f.mons.filter(m => m.hp > 0).length;
    if (kills > 0 && h.hp < t.maxHp) { const r = Math.min(t.maxHp - h.hp, Math.round(t.maxHp * SAC_THIRST * kills)); h.hp += r; actions.push(`🧛 Soif de sang +${r} PV`); }
  }
  if (h.cls === 'enutrof' && (f.turnCasts || 0) > 0) enuGain(h, 1 + ((f.turnCrits || 0) > 0 ? 1 : 0)); // Cupidité : 1 pièce par tour offensif, +1 sur coup critique
  if (h.cls === 'iop' && actions.length && (f.rage || 0) < 5) { f.rage = (f.rage || 0) + 1; actions.push(`Rage ${f.rage}/5`); }
  if (h.cls === 'iop' && actions.length) gainFury(h, f.turnCasts || 0, f.turnCrits || 0, f.mons.length);
  if (h.cls === 'sram') {
    const wasInvis = f.invis; f.invis = false;
    const kills = aliveBefore - f.mons.filter(m => m.hp > 0).length;
    if (wasInvis && actions.length) pre += 'Frappe de l’ombre ! ';
    if (kills > 0 && sramVanish(f)) actions.push('💨 Disparition');
  }
  ev.log(h, pre + (actions.length ? actions.join(' · ') : `${h.name} passe son tour.`), 'hero');
}

function castSpell(st, h, t, sp, target, alive) {
  const f = h.fight;
  const tag = r => `${r.v}${r.crit ? ' CC' : ''}`;
  if (sp.type === 'buff') {
    f.buffs.push({ id: sp.id, stats: sp.buff, turns: sp.turns });
    return `${sp.name} (${Object.entries(sp.buff).map(([k, v]) => `+${v} ${STAT_SHORT[k]}`).join(', ')})`;
  }
  if (sp.type === 'heal') {
    const r = rollSpell(h, t, f, sp, 0);
    const v = Math.round(r.v * (1 + t.soin / 100)) + t.soin;
    const before = h.hp; h.hp = Math.min(t.maxHp, h.hp + v);
    return `${sp.name} +${h.hp - before} PV`;
  }
  const xel = h.cls === 'xelor';
  const distort = (m, r) => {
    if (!xel) return '';
    if (m.frozen) r.v = Math.round(r.v * 1.25);
    if (m.hp - r.v > 0 && !m.frozen && Math.random() * 100 < 12 + (sp.freeze || 0)) { m.frozen = true; return '❄'; }
    return '';
  };
  if (sp.type === 'aoe') {
    const parts = alive.map(m => { const r = rollSpell(h, t, f, sp, monsterStats(m.mid).res); if (m.crack) r.v = Math.round(r.v * STM_CRACK); const fz = distort(m, r); m.hp = Math.max(0, m.hp - r.v); return tag(r) + fz; });
    if (h.cls === 'cra' && alive.includes(f.mons[f.mark])) h.focus = Math.min(CRA_FOCUS_MAX, (h.focus || 0) + 1);
    return `${sp.name} → ${parts.join('/')}`;
  }
  if (h.cls === 'cra' && sp.type === 'dmg' && f.mons.indexOf(target) === f.mark && (h.focus || 0) >= CRA_FOCUS_MAX) return perfectShot(h, t, f, sp, target);
  const r = rollSpell(h, t, f, sp, monsterStats(target.mid).res);
  if (target.crack) r.v = Math.round(r.v * STM_CRACK);
  if (h.cls === 'cra' && f.mons.indexOf(target) === f.mark && sp.type !== 'aoe') h.focus = Math.min(CRA_FOCUS_MAX, (h.focus || 0) + 1);
  if (sp.type === 'poison') {
    target.poison = { dmg: r.v, turns: sp.turns };
    return `${sp.name} sur ${MONSTERS[target.mid].name} (${r.v}/tour)`;
  }
  const fz = distort(target, r);
  target.hp = Math.max(0, target.hp - r.v);
  let s = `${sp.name} ${tag(r)}${fz ? ` ❄ ${MONSTERS[target.mid].name} figé` : ''}`;
  if (sp.type === 'drain') { const heal = Math.round(r.v / 2); h.hp = Math.min(t.maxHp, h.hp + heal); s += ` (+${heal} PV)`; }
  return s;
}

function monsterTurn(st, h, t, m, ev) {
  const def = MONSTERS[m.mid], ms = monsterStats(m.mid);
  const f = h.fight;
  let line = '';
  if (m.poison) {
    m.hp = Math.max(0, m.hp - m.poison.dmg);
    line += `${def.name} subit ${m.poison.dmg} (poison). `;
    if (--m.poison.turns <= 0) m.poison = null;
    if (m.hp <= 0) { ev.log(h, line + `${def.name} succombe.${h.cls === 'sram' && sramVanish(f) ? ' 💨 Disparition' : ''}`, 'mon'); return; }
  }
  if (m.burn) { // Brûlure du Steamer
    m.hp = Math.max(0, m.hp - m.burn.dmg);
    line += `${def.name} brûle : −${m.burn.dmg}. `;
    if (--m.burn.turns <= 0) m.burn = null;
    if (m.hp <= 0) { ev.log(h, line + `${def.name} succombe.`, 'mon'); return; }
  }
  const wet = m.wet > 0; if (wet) m.wet--; // Trempé : −20 % de dégâts infligés
  if (m.bribed) { m.bribed = false; ev.log(h, line + `${def.name} se jette sur les pièces d’or et oublie d’attaquer.`, 'mon'); return; }
  if (m.mag) { m.mag = false; f.magSeq = (f.magSeq || 0) + 1; ev.log(h, line + `${def.name} est collé à la tourelle tactique et ne peut pas agir.`, 'hero'); return; }
  if (m.frozen) { m.frozen = false; ev.log(h, line + `${def.name} est figé dans le temps et ne peut pas agir.`, 'mon'); return; }
  f.monAct = { n: ((f.monAct && f.monAct.n) || 0) + 1, i: f.mons.indexOf(m) }; // pour l'animation d'attaque
  if (h.cls === 'sram' && f.trap === f.mons.indexOf(m)) {
    f.trap = -1;
    const tr = rollSpell(h, t, f, SRAM_TRAP, 0);
    m.hp = Math.max(0, m.hp - tr.v);
    f.trapFx = { n: (f.trapFx ? f.trapFx.n : 0) + 1, i: f.mons.indexOf(m), v: tr.v };
    ev.log(h, line + `🪤 ${def.name} déclenche le piège de ${h.name} : −${tr.v}${tr.crit ? ' CC' : ''} et perd son tour !${m.hp <= 0 && sramVanish(f) ? ' 💨 Disparition' : ''}`, 'hero');
    return;
  }
  if (h.cls === 'sram' && f.invis && Math.random() < 0.3) { f.missSeq = (f.missSeq || 0) + 1; ev.log(h, line + `${def.name} frappe dans le vide : ${h.name} est invisible.`, 'mon'); return; }
  if (Math.random() * 100 < t.dodgePct) { f.dodgeSeq = (f.dodgeSeq || 0) + 1; ev.log(h, line + `${h.name} esquive ${def.name}.`, 'mon'); return; }
  let dmg = rnd(ms.dmin, ms.dmax) * (SUBZONES[f.tier || 0] || SUBZONES[0]).dmg;
  let special = false;
  if (def.boss && f.turn % 3 === 0) { dmg *= 1.8; special = true; }
  const res = clamp(t.resPct + buffTotal(f, 'res'), 0, 60);
  dmg = Math.max(1, Math.round(dmg * (1 - res / 100) * (wet ? STM_WET : 1)));
  if (h.cls === 'zobal' && zobMask(h) === 'larme') dmg = Math.max(1, Math.round(dmg * (1 - (ZOB_LARME_DEF + ZOB_FERV_STEP * (h.ferv || 1)) / 100))); // Masque Pleureur
  if (h.cls === 'ecaflip') {
    if (f.coin === 'pile') dmg = Math.max(1, Math.round(dmg * ECA_PILE_DEF)); // Pile : −35 % de dégâts subis
    if (h.hp - dmg <= 0 && Math.random() < 0.2 + 0.04 * (h.clover || 0)) { // Neuf Vies
      f.lifeSeq = (f.lifeSeq || 0) + 1; h.wait += ECA_LIFE_MS; // laisse la pirouette des Neuf Vies se jouer
      ev.log(h, line + `🐾 Neuf Vies ! ${h.name} retombe sur ses pattes : le coup de ${def.name} est évité.`, 'win');
      return;
    }
  }
  if (h.cls === 'steamer' && stmDecoy(h, f, def, line, dmg, special, ev)) return; // une tourelle encaisse le coup à sa place
  const hpBefore = h.hp;
  h.hp = Math.max(0, h.hp - dmg);
  gainBlood(h, hpBefore - h.hp, t.maxHp); // Sacrieur : chaque PV perdu remplit la jauge de Sang versé
  ev.log(h, line + `${def.name} ${special ? 'déchaîne sa fureur' : 'frappe'} : −${dmg} PV.`, special ? 'boss' : 'mon');
  if (h.cls === 'sacrieur') {
    f.stig = Math.min(SAC_STIG_MAX, (f.stig || 0) + 1); // chaque coup reçu grave un Stigmate
    const back = Math.min(m.hp, Math.max(1, Math.round(dmg * SAC_REFLECT))); // Douleur partagée
    m.hp -= back; f.reflectSeq = (f.reflectSeq || 0) + 1;
    ev.log(h, `🪞 Douleur partagée : ${def.name} subit ${back}${m.hp <= 0 ? ' et succombe' : ''}.`, 'hero');
    if (h.hp <= 0 && !f.martyr) { // Martyre : le coup fatal est évité, le sang explose sur tous les ennemis
      f.martyr = true; f.martyrSeq = (f.martyrSeq || 0) + 1; f.stig = SAC_STIG_MAX;
      h.hp = Math.max(1, Math.round(t.maxHp * SAC_MARTYR_HP));
      const blast = Math.max(1, Math.round(t.maxHp * SAC_MARTYR_BLAST));
      for (const o of f.mons) if (o.hp > 0) o.hp = Math.max(0, o.hp - blast);
      ev.log(h, `☠️ MARTYRE ! ${h.name} survit avec ${h.hp} PV et son sang explose : −${blast} PV à tous les ennemis.`, 'win');
    }
  }
  if (h.hp <= 0 && h.cls === 'enutrof' && !f.bribed && (h.purse || 0) >= ENU_BRIBE_MIN) {
    const spent = h.purse; h.purse = 0; f.bribed = true; f.bribeSeq = (f.bribeSeq || 0) + 1;
    h.hp = Math.max(1, Math.round(t.maxHp * 0.15));
    f.mons.forEach(o => { if (o.hp > 0) o.bribed = true; });
    ev.log(h, `🤝 Pot-de-vin ! ${h.name} jette ${spent} 🪙 : les ennemis se ruent sur l’or et il s’en tire avec ${h.hp} PV.`, 'win');
  }
  if (h.hp <= 0 && h.cls === 'xelor' && !f.paradox && (f.grains || 0) >= 6) {
    f.paradox = true; f.grains = 0; h.grains = 0;
    h.hp = Math.max(f.hpMark || 0, Math.round(t.maxHp * 0.3));
    ev.log(h, `⏳ Paradoxe ! ${h.name} remonte le temps et revient à ${h.hp} PV.`, 'win');
  }
}

/* ---------------------- Chance du Matou de l'Ecaflip ----------------------
   Chaque tour : pièce. Face = +40 % de dégâts ; Pile = −35 % de dégâts subis et +1 Trèfle
   (h.clover, gardés d'un combat à l'autre). À 6 Trèfles : Quitte ou Double. */
const ECA_CLOVER_MAX = 6, ECA_FACE_DMG = 1.4, ECA_PILE_DEF = 0.65;
const ECA_GAMBLE_MS = 900, ECA_LIFE_MS = 700; // pauses pour les animations de Quitte ou Double et de Neuf Vies
function ecaToss(h, t, f, actions) {
  f.double = false;
  if ((h.clover || 0) >= ECA_CLOVER_MAX) {
    h.clover = 0;
    const win = Math.random() < 0.6;
    f.gambleSeq = (f.gambleSeq || 0) + 1; f.gambleFx = { n: f.gambleSeq, win };
    if (win) { f.double = true; actions.push('🎲 Quitte ou Double : GAGNÉ ! Ses sorts frappent deux fois'); }
    else { const loss = Math.max(0, Math.min(h.hp - 1, Math.round(t.maxHp * 0.08))); h.hp -= loss; actions.push(`🎲 Quitte ou Double : perdu… −${loss} PV`); }
  }
  const face = Math.random() < 0.5 + 0.04 * (h.clover || 0);
  f.coin = face ? 'face' : 'pile'; f.coinSeq = (f.coinSeq || 0) + 1; f.coinFx = { n: f.coinSeq, face };
  if (!face) h.clover = Math.min(ECA_CLOVER_MAX, (h.clover || 0) + 1);
  actions.push(face ? '😼 FACE ! +40 % de dégâts' : `🙀 PILE ! −35 % de dégâts subis · 🍀 ${h.clover}/${ECA_CLOVER_MAX}`);
}

/* ---------------------- Fièvre de l'Or de l'Enutrof ----------------------
   Un ennemi cache un trésor (f.treasure) que l'Enutrof vise en priorité.
   Chaque sort remplit la bourse (h.purse, gardée d'un combat à l'autre) :
   pleine = Jackpot, 5+ = Pot-de-vin possible contre un coup fatal. */
const FINISH_ANIM_MS = 950;   // délai gardé avant de conclure un combat, pour voir l'animation du dernier coup
const JACKPOT_ANIM_MS = 2900; // durée de la cinématique du Jackpot (ui2.js : playJackpot)
/* Sacrieur : Pacte de sang, Stigmates, Douleur partagée, Soif de sang, Martyre */
const SAC_STIG_MAX = 6, SAC_STIG_DMG = 8, SAC_PACT_LOSS = 0.05, SAC_PACT_FLOOR = 0.4, SAC_REFLECT = 0.3, SAC_THIRST = 0.08, SAC_MARTYR_HP = 0.12, SAC_MARTYR_BLAST = 0.2;

/* ---------------------- Zobal : masques, Ferveur et Rupture ----------------------
   h.mask : 'rire' | 'larme' | 'farce' (persiste). h.ferv : Ferveur (1..10, persiste entre les combats), +4 % d'effet par point.
   Changer de masque en combat (setMask) programme une Rupture : au prochain tour, la Ferveur explose sur tous les ennemis. */
const ZOB_FERV_MAX = 10, ZOB_FERV_CHANCE = 0.5, ZOB_FERV_HOLD = 20000, ZOB_FERV_STEP = 4, ZOB_RIRE_DMG = 12, ZOB_LARME_DEF = 10, ZOB_LARME_HEAL = 0.5, ZOB_FARCE_CHANCE = 15, ZOB_APOTHEOSE_CRIT = 15, ZOB_RUPTURE = 6;
const ZOB_MASKS = { rire: { name: 'Masque Rieur', icon: '😆' }, larme: { name: 'Masque Pleureur', icon: '😢' }, farce: { name: 'Masque Farceur', icon: '🤪' } };
const ZOB_RUPTURE_SPELL = { id: 'rupture', name: 'Rupture', min: 1, max: 1, type: 'aoe' };
function zobGain(h) { if ((h.ferv || 1) < ZOB_FERV_MAX) { h.ferv = (h.ferv || 1) + 1; if (h.ferv >= ZOB_FERV_MAX) h.fervT = ZOB_FERV_HOLD; } } // pleine, la Ferveur tient 20 s
function zobMask(h) { return ZOB_MASKS[h.mask] ? h.mask : 'rire'; }
function setMask(h, m) {
  if (h.cls !== 'zobal' || !ZOB_MASKS[m] || zobMask(h) === m) return false;
  const f = h.fight, n = h.ferv || 1;
  if (f && f.mons.some(x => x.hp > 0)) { f.rupt = (f.rupt || 0) + n; f.maskSeq = (f.maskSeq || 0) + 1; }
  h.ferv = Math.max(1, Math.floor(n / 2)); h.fervT = 0; // la moitié de la Ferveur passe au nouveau masque
  h.mask = m;
  return true;
}
/* Début de tour : Rupture en attente + soin du Masque Pleureur. Retourne le texte du journal */
function zobTurnStart(h, t, f, ev) {
  let pre = '';
  if (f.rupt) {
    const n = f.rupt; f.rupt = 0; f.ruptSeq = (f.ruptSeq || 0) + 1;
    const { scale } = spellPower(h, t, f, ZOB_RUPTURE_SPELL), parts = [];
    for (const m of f.mons) if (m.hp > 0) { const v = Math.max(1, Math.round(ZOB_RUPTURE * n * scale * (1 - monsterStats(m.mid).res / 100))); m.hp = Math.max(0, m.hp - v); parts.push(v); }
    pre += `💥 RUPTURE (Ferveur ${n}) ${parts.join('/')} · `;
  }
  if (zobMask(h) === 'larme' && h.hp < t.maxHp) { const r = Math.min(t.maxHp - h.hp, Math.max(1, Math.round(t.maxHp * (ZOB_LARME_HEAL * (h.ferv || 1)) / 100))); h.hp += r; pre += `😢 Larmes +${r} PV · `; }
  return pre;
}

/* ---------------------- Colosse de Sang (jauge de Sang versé) ----------------------
   Chaque PV perdu par le Sacrieur (Pacte de sang, coups reçus) remplit la jauge ; elle persiste entre les combats.
   Pleine, le joueur déclenche l'attaque à la main : le Sacrieur sacrifie 35 % de ses PV actuels, passe en Berserk et un colosse
   de sang écrase tous les ennemis (dégâts accrus par le sang sacrifié et les Stigmates, résistances ignorées). */
const SAC_BLOOD_MAX = 300, SAC_BLOOD_RATE = 0.6, SAC_COLOSSE_COST = 0.35, SAC_COLOSSE_BLOOD = 1.25;
const COLOSSE_SPELL = { id: 'colosse_ult', name: 'Colosse de Sang', min: 110, max: 150, type: 'aoe' };
function gainBlood(h, lost, maxHp) { if (h.cls === 'sacrieur' && lost > 0 && maxHp > 0) h.blood = Math.min(SAC_BLOOD_MAX, (h.blood || 0) + lost / maxHp * 100 * SAC_BLOOD_RATE); }
function bloodReady(h) { return h.cls === 'sacrieur' && (h.blood || 0) >= SAC_BLOOD_MAX; }
/* Soif de sang du Colosse : rend les PV différés (idempotent) */
function colosseHeal(st, h) {
  const f = h.fight; if (!f || !f.pendHeal) return 0;
  const t = heroTotals(st, h), r = Math.min(Math.max(0, t.maxHp - h.hp), f.pendHeal); h.hp += r; f.pendHeal = 0; return r;
}
/* Déclenche l'attaque. Retourne { hits, pay, heal } (ou null si impossible) */
function unleashColosse(st, h, ev) {
  const f = h.fight;
  if (!bloodReady(h) || !f || !f.mons.some(m => m.hp > 0)) return null;
  const t = heroTotals(st, h);
  const pay = Math.max(0, Math.min(Math.round(h.hp * SAC_COLOSSE_COST), Math.round(h.hp) - 1)); // le sacrifice ne tue jamais
  h.hp -= pay; f.stig = SAC_STIG_MAX; // le sang appelle le sang : Berserk garanti
  const { scale } = spellPower(h, t, f, COLOSSE_SPELL), mult = 1 + SAC_STIG_DMG * f.stig / 100;
  let kills = 0;
  const hits = f.mons.map(m => {
    if (m.hp <= 0) return null;
    const crit = Math.random() * 100 < t.critPct + 25;
    let v = (rnd(COLOSSE_SPELL.min, COLOSSE_SPELL.max) * scale + t.dmg + pay * SAC_COLOSSE_BLOOD) * mult;
    if (crit) v *= 1.5 + (t.critDmg || 0) / 100;
    if (t.dmgPct) v *= 1 + t.dmgPct / 100;
    v = Math.max(1, Math.round(v)); // ignore les résistances
    m.hp = Math.max(0, m.hp - v); if (m.hp <= 0) kills++;
    return { v, crit };
  });
  const heal = Math.round(t.maxHp * SAC_THIRST * kills); f.pendHeal = heal; // le soin n'est appliqué qu'à la fin de la cinématique (colosseHeal)
  h.blood = 0; h.bloodCount = (h.bloodCount || 0) + 1; f.ult = (f.ult || 0) + 1; f.colosse = (f.colosse || 0) + 1;
  ev.log(h, `🩸 COLOSSE DE SANG ! −${pay} PV sacrifiés · ${hits.filter(Boolean).map(x => x.v + (x.crit ? ' CC' : '')).join(' / ')}${heal ? ` · 🧛 +${heal} PV` : ''}`, 'boss');
  return { hits, pay, heal };
}
/* Xélor, Éclat du temps : 4 rembobinages remplissent le sablier ; plein, il se brise et le Xélor vit 10 combats d'un coup. */
const CHRONO_MAX = 4, CHRONO_FIGHTS = 10;
function chronoReady(h) { return h.cls === 'xelor' && (h.chrono || 0) >= CHRONO_MAX && !!h.act && h.act.type === 'zone'; }
function chronoBurst(st, h, ev) {
  const place = findPlace('zone', h.act.id);
  const keep = { fight: h.fight, resting: h.resting, restTotal: h.restTotal, wait: h.wait };
  const sum = { n: CHRONO_FIGHTS, xp: 0, kamas: 0, loot: {}, gear: [], lvl0: h.lvl };
  const quiet = Object.assign({}, ev, { log() {}, reward(_h, xp, k, loot, gear) {
    sum.xp += xp; sum.kamas += k; for (const [r, c] of Object.entries(loot)) sum.loot[r] = (sum.loot[r] || 0) + c; for (const g of gear) sum.gear.push(g);
    ev.reward && ev.reward(_h, xp, k, loot, gear);
  } });
  h.chrono = 0;
  for (let i = 0; i < CHRONO_FIGHTS; i++) {
    h.fight = { mons: pickGroup(place, h).map(mid => { const ms = monsterStats(mid); const hp = Math.round(ms.hp * tierOf(h).hp); return { mid, hp, max: hp, poison: null }; }), tier: h.act.tier || 0, turn: 1, phase: 0, buffs: [], cds: {}, casts: {} };
    resolveWin(st, h, quiet);
  }
  h.fight = keep.fight; h.resting = keep.resting; h.restTotal = keep.restTotal; h.wait = keep.wait;
  sum.lvlUps = h.lvl - sum.lvl0;
  ev.log(h, `⌛ Éclat du temps : ${CHRONO_FIGHTS} combats d'un coup ! +${fmt(sum.xp)} XP, +${fmt(sum.kamas)} K${sum.gear.length ? `, ${sum.gear.length} objet(s)` : ''}`, 'win');
  return sum;
}
const ENU_PURSE_MAX = 10, ENU_BRIBE_MIN = 5, ENU_RUSH = 30;
const ENU_JACKPOT = { id: 'pluie_or', name: 'Pluie d’Or', min: 14, max: 20, type: 'aoe' };
function enuTarget(f, alive) {
  const c = f.mons[f.treasure];
  return c && c.hp > 0 ? c : alive.reduce((a, b) => (b.hp < a.hp ? b : a));
}
function enuGain(h, n) { h.purse = Math.min(ENU_PURSE_MAX, (h.purse || 0) + n); }
/* Le porteur du trésor est tombé : le coffre s'ouvre (une seule fois par combat) */
function enuChest(h, f, actions) {
  if (f.treasure == null || f.treasure < 0 || f.chest) return;
  const c = f.mons[f.treasure]; if (!c || c.hp > 0) return;
  f.chest = true; f.chestSeq = (f.chestSeq || 0) + 1;
  enuGain(h, 2);
  const more = f.mons.some(m => m.hp > 0);
  if (more) f.buffs.push({ id: 'ruee_or', stats: { deg: ENU_RUSH }, turns: 4 });
  actions.push(`🗺️ Coffre ouvert ! +2 🪙${more ? ` · Ruée vers l’or (+${ENU_RUSH} Dégâts)` : ''}`);
}
function enuJackpot(h, t, f) {
  const alive = f.mons.filter(m => m.hp > 0);
  const hits = [];
  const parts = alive.map(m => { const r = rollSpell(h, t, f, ENU_JACKPOT, monsterStats(m.mid).res); m.hp = Math.max(0, m.hp - r.v); hits.push({ i: f.mons.indexOf(m), v: r.v, crit: r.crit }); return `${r.v}${r.crit ? ' CC' : ''}`; });
  h.purse = 0; f.jackpots = (f.jackpots || 0) + 1; f.jackSeq = (f.jackSeq || 0) + 1;
  f.jackFx = { n: f.jackSeq, hits }; // pour la cinématique
  return `🎰 JACKPOT ! Pluie d’Or → ${parts.join('/')}`;
}

/* ---------------------- Ombre & Pièges du Sram ---------------------- */
const SRAM_INVIS_DMG = 15;
/* Une élimination rend le Sram invisible (s'il reste des ennemis) */
function sramVanish(f) { if (!f.mons.some(m => m.hp > 0)) return false; f.invis = true; f.vanishSeq = (f.vanishSeq || 0) + 1; return true; }
const SRAM_TRAP = { id: 'piege_sournois', name: 'Piège sournois', min: 9, max: 13, type: 'dmg' };

/* ---------------------- Traque du Cra ----------------------
   Le joueur choisit une proie (f.mark). Chaque tir dessus donne de la
   Concentration (h.focus). À 5, le prochain tir est un Tir Parfait qui transperce. */
const CRA_FOCUS_MAX = 5, CRA_FOCUS_CRIT = 6;
function craPrey(f, alive) {
  const cur = f.mons[f.mark];
  if (cur && cur.hp > 0) return cur;
  const t = alive.reduce((a, b) => (b.hp < a.hp ? b : a)); // la traque continue
  f.mark = f.mons.indexOf(t);
  return t;
}
function setPrey(h, idx) {
  const f = h.fight; if (!f || h.cls !== 'cra') return false;
  const m = f.mons[idx]; if (!m || m.hp <= 0 || f.mark === idx) return false;
  f.mark = idx; h.focus = 0; f.manual = true;
  return true;
}
function perfectShot(h, t, f, sp, target) {
  const { scale } = spellPower(h, t, f, sp);
  let v = (rnd(sp.min, sp.max) * scale + t.dmg) * 3;
  if (t.dmgPct) v *= 1 + t.dmgPct / 100;
  v = Math.max(1, Math.round(v));
  const ti = f.mons.indexOf(target);
  const over = Math.max(0, v - target.hp);
  target.hp = Math.max(0, target.hp - v);
  let pierce = null, s = `🏹 TIR PARFAIT ! ${sp.name} ${v} CC`;
  if (over > 0) {
    const next = f.mons.filter(m => m.hp > 0).sort((a, b) => a.hp - b.hp)[0];
    if (next) { const pv = Math.max(1, Math.round(over)); next.hp = Math.max(0, next.hp - pv); pierce = { i: f.mons.indexOf(next), v: pv }; s += ` → transperce ${MONSTERS[next.mid].name} (${pv})`; }
  }
  h.focus = 0;
  f.perfectSeq = (f.perfectSeq || 0) + 1;
  f.perfect = { n: f.perfectSeq, t: ti, v, pierce };
  return s;
}

/* ---------------------- Colère de Iop (jauge de Fureur) ----------------------
   Chaque tour où le Iop attaque remplit sa jauge (+ bonus par coup critique).
   La jauge persiste entre les combats. Pleine, le joueur déclenche l'attaque
   à la main : une épée colossale frappe tous les ennemis. */
const FURY_MAX = 300;
const FURY_PER_TURN = 4, FURY_PER_CRIT = 3;
function gainFury(h, casts, crits, nMons = 1) {
  const before = h.fury || 0;
  h.fury = Math.min(FURY_MAX, before + (casts ? FURY_PER_TURN * (1 + nMons) / 3 : 0) + crits * FURY_PER_CRIT);
}
function furyReady(h) { return h.cls === 'iop' && (h.fury || 0) >= FURY_MAX; }
const COLERE_SPELL = { id: 'colere_ult', name: 'Colère de Iop', min: 140, max: 180, type: 'aoe' };
/* Déclenche l'attaque. Retourne les dégâts infligés (ou null si impossible) */
function unleashFury(st, h, ev) {
  const f = h.fight;
  if (!furyReady(h) || !f) return null;
  const alive = f.mons.filter(m => m.hp > 0);
  if (!alive.length) return null;
  const t = heroTotals(st, h);
  f.rage = 5; // la colère porte la Rage au maximum
  const { scale } = spellPower(h, t, f, COLERE_SPELL);
  const hits = f.mons.map(m => {
    if (m.hp <= 0) return null;
    const crit = Math.random() * 100 < t.critPct + 25;
    let v = rnd(COLERE_SPELL.min, COLERE_SPELL.max) * scale + t.dmg;
    if (crit) v *= 1.5 + (t.critDmg || 0) / 100;
    if (t.dmgPct) v *= 1 + t.dmgPct / 100;
    v = Math.max(1, Math.round(v)); // ignore les résistances
    m.hp = Math.max(0, m.hp - v);
    return { v, crit };
  });
  h.fury = 0;
  h.furyCount = (h.furyCount || 0) + 1;
  f.ult = (f.ult || 0) + 1;
  ev.log(h, `⚔️ COLÈRE DE IOP ! ${hits.filter(Boolean).map(x => x.v + (x.crit ? ' CC' : '')).join(' / ')}`, 'boss');
  return hits;
}

/* ---------------------- Steamer : tourelles, Vapeur et Surcharge Stasis ----------------------
   Trois tourelles (Offensive, Défensive, Tactique) dont la progression est gardée à vie (h.turXp : activations cumulées).
   Elles ne tirent jamais seules : chaque sort d'attaque les ACTIVE, et elles tirent avec l'élément du sort (Feu, Terre ou Eau).
   Chaque élément laisse un état sur l'ennemi touché : Feu = Brûlure, Terre = Fissure, Eau = Trempé.
   Feu sur un ennemi Trempé, ou Eau sur un ennemi en Brûlure : VAPEUR (explosion sur tous les ennemis).
   Chaque activation remplit la Pression (h.steam, gardée d'un combat à l'autre) ; pleine, le joueur déclenche la Surcharge Stasis.
   Un ennemi sur 4 s'en prend à une tourelle plutôt qu'au Steamer (f.tur : PV des tourelles pour ce combat). */
const STM_SLOTS = ['off', 'def', 'tac'];
const STM_UNLOCK = { off: 1, def: 12, tac: 24 };
const STM_NAMES = { off: 'Tourelle offensive', def: 'Tourelle défensive', tac: 'Tourelle tactique' };
const STM_ROMAN = ['', 'I', 'II', 'III'];
const STM_EVO = [80, 400];                // activations pour passer niveau II puis III
const STM_ELEM = { int: 'feu', for: 'terre', cha: 'eau' };
const STM_ELEM_ICON = { feu: '🔥', terre: '⛰️', eau: '💧' };
const STM_BARREL = 0.10;                  // part d'un sort par canon de l'Offensive (1 canon par niveau)
const STM_HEAL = [0, 0.012, 0.017, 0.022]; // part des PV max rendue par la Défensive (×1,5 avec l'Eau)
const STM_MAG = [0, 0.13, 0.19, 0.25];    // chances de magnétiser un ennemi par activation de la Tactique
const STM_BURN = 0.22, STM_BURN_TURNS = 2, STM_CRACK = 1.15, STM_WET = 0.85, STM_WET_TURNS = 2;
const STM_VAPOR_SPELL = { id: 'vapeur', name: 'Vapeur', min: 7, max: 10, type: 'aoe' };
const STM_STEAM_MAX = 320, STM_STEAM_ACT = 3, STM_STEAM_VAPOR = 10;
const STM_DECOY = 0.14, STM_TUR_HP = 0.2, STM_TUR_HPMULT = [0, 1, 1.35, 1.8];
const STM_SURGE = { id: 'surcharge', name: 'Surcharge Stasis', min: 40, max: 54, type: 'aoe' };
const STM_SURGE_HEAL = 0.3;
function stmXp(h) { return h.turXp || (h.turXp = { off: 0, def: 0, tac: 0 }); }
function stmBaseLvl(h, s) { const x = stmXp(h)[s] || 0; return x >= STM_EVO[1] ? 3 : x >= STM_EVO[0] ? 2 : 1; }
function stmBoost(f) { return !!(f && f.buffs && f.buffs.some(b => b.id === 'evolution')); }
function stmLvl(h, f, s) { return Math.min(3, stmBaseLvl(h, s) + (stmBoost(f) ? 1 : 0)); }
function stmHas(h, s) { return h.lvl >= STM_UNLOCK[s]; }
function stmAlive(f, s) { const T = f && f.tur && f.tur[s]; return !!T && T.hp > 0; }
function steamReady(h) { return h.cls === 'steamer' && (h.steam || 0) >= STM_STEAM_MAX; }
/* Début de combat : les tourelles sont déployées, réparées à neuf */
function stmInit(h, t, f) {
  f.tur = {}; f.elems = [];
  for (const s of STM_SLOTS) if (stmHas(h, s)) { const max = Math.max(1, Math.round(t.maxHp * STM_TUR_HP * STM_TUR_HPMULT[stmBaseLvl(h, s)])); f.tur[s] = { hp: max, max }; }
}
/* Le Steamer préfère les sorts qui changent d'élément, et surtout ceux qui déclenchent la Vapeur */
function stmSpellBonus(h, f, sp, alive) {
  const el = STM_ELEM[sp.stat]; if (!el) return 1;
  let b = (f.elems || []).includes(el) ? 1 : 1.2;
  if (stmAlive(f, 'off') && alive.some(m => (el === 'feu' && m.wet > 0) || (el === 'eau' && m.burn))) b *= 1.5;
  return b;
}
function stmVapor(h, t, f, m, out) {
  m.burn = null; m.wet = 0;
  const hits = [];
  for (const o of f.mons) if (o.hp > 0) {
    const r = rollSpell(h, t, f, STM_VAPOR_SPELL, monsterStats(o.mid).res);
    const v = Math.max(1, Math.round(r.v * (o.crack ? STM_CRACK : 1)));
    o.hp = Math.max(0, o.hp - v); hits.push({ i: f.mons.indexOf(o), v });
  }
  h.steam = Math.min(STM_STEAM_MAX, (h.steam || 0) + STM_STEAM_VAPOR);
  f.vapSeq = (f.vapSeq || 0) + 1;
  out.push({ i: f.mons.indexOf(m), hits });
}
/* Effet d'élément d'un tir de tourelle sur un ennemi encore debout */
function stmElemHit(h, t, f, m, el, rv, vapors) {
  if (m.hp <= 0) return;
  if (el === 'feu') { if (m.wet > 0) { if (!vapors.length) stmVapor(h, t, f, m, vapors); return; } m.burn = { dmg: Math.max(1, Math.round(rv * STM_BURN)), turns: STM_BURN_TURNS }; }
  else if (el === 'eau') { if (m.burn) { if (!vapors.length) stmVapor(h, t, f, m, vapors); return; } m.wet = STM_WET_TURNS; }
  else m.crack = true;
}
/* Active les tourelles après un sort d'attaque. Retourne { text, shots } (shots sert aux animations) */
function stmActivate(h, t, f, sp, target) {
  const el = STM_ELEM[sp.stat]; if (!el || !f.tur) return null;
  (f.elems = f.elems || []).push(el);
  const shots = [], txt = [], vapors = [];
  for (const s of STM_SLOTS) {
    if (!stmHas(h, s) || !stmAlive(f, s)) continue;
    const alive = f.mons.filter(m => m.hp > 0);
    if (!alive.length) break;
    const L = stmLvl(h, f, s), shot = { s, el, lvl: L, t: [], v: [] };
    if (s === 'off') {
      const order = [target && target.hp > 0 ? target : null, ...alive.slice().sort((a, b) => a.hp - b.hp)].filter((m, i, a) => m && a.indexOf(m) === i), parts = [];
      for (let b = 0; b < L; b++) {
        let m = order[b % order.length]; if (!m || m.hp <= 0) m = f.mons.find(x => x.hp > 0); if (!m) break;
        const r = rollSpell(h, t, f, sp, monsterStats(m.mid).res);
        const v = Math.max(1, Math.round(r.v * STM_BARREL * (m.crack ? STM_CRACK : 1)));
        m.hp = Math.max(0, m.hp - v); shot.t.push(f.mons.indexOf(m)); shot.v.push(v); parts.push(v + (r.crit ? ' CC' : ''));
        stmElemHit(h, t, f, m, el, r.v, vapors);
      }
      txt.push(`${STM_ELEM_ICON[el]} Offensive ${parts.join('+')}`);
    } else if (s === 'def') {
      let heal = 0, rep = 0;
      if (h.hp < t.maxHp) { heal = Math.min(t.maxHp - h.hp, Math.max(1, Math.round(t.maxHp * STM_HEAL[L] * (el === 'eau' ? 1.5 : 1)))); h.hp += heal; }
      for (const o of STM_SLOTS) {
        const T = o !== 'def' && f.tur[o]; if (!T) continue;
        if (T.hp > 0 && T.hp < T.max) { const r = Math.min(T.max - T.hp, Math.round(T.max * 0.15 * L)); T.hp += r; rep += r; }
        else if (T.hp <= 0 && L >= 3) { T.hp = Math.round(T.max * 0.25); rep += T.hp; (shot.revive = shot.revive || []).push(o); }
      }
      shot.heal = heal; shot.rep = rep; shot.t = [];
      txt.push(`Défensive${heal ? ' +' + heal + ' PV' : ''}${rep ? ' 🔧' : ''}`);
    } else {
      const foe = alive.filter(m => !m.mag).sort((a, b) => b.hp - a.hp)[0];
      if (foe) {
        const d = MONSTERS[foe.mid], chance = STM_MAG[L] * (d.boss || d.archi ? 0.5 : 1);
        shot.t.push(f.mons.indexOf(foe));
        if (Math.random() < chance) { foe.mag = true; shot.mag = true; txt.push(`🧲 Tactique : ${d.name} magnétisé`); }
      }
    }
    h.steam = Math.min(STM_STEAM_MAX, (h.steam || 0) + STM_STEAM_ACT);
    const before = stmBaseLvl(h, s); stmXp(h)[s]++; const after = stmBaseLvl(h, s);
    if (after > before) { f.evoSeq = (f.evoSeq || 0) + 1; f.evoFx = { n: f.evoSeq, s, lvl: after }; shot.evo = after; txt.push(`🔧 ${STM_NAMES[s]} niveau ${STM_ROMAN[after]} !`); }
    shots.push(shot);
  }
  if (vapors.length) txt.push(`♨️ VAPEUR ${vapors[0].hits.map(x => x.v).join('/')}`);
  return { text: txt.join(' · '), shots: Object.assign(shots, { vapor: vapors[0] || null }) };
}
/* Un ennemi s'en prend à une tourelle plutôt qu'au Steamer. Retourne true si le coup est encaissé par une tourelle */
function stmDecoy(h, f, def, line, dmg, special, ev) {
  if (!f.tur || Math.random() >= STM_DECOY) return false;
  const live = STM_SLOTS.filter(s => stmHas(h, s) && stmAlive(f, s)); if (!live.length) return false;
  const s = live[irnd(0, live.length - 1)], T = f.tur[s], real = Math.min(T.hp, dmg);
  T.hp = Math.max(0, T.hp - dmg);
  f.decoySeq = (f.decoySeq || 0) + 1; f.decoyFx = { n: f.decoySeq, s, v: real, broke: T.hp <= 0 };
  ev.log(h, line + `${def.name} ${special ? 'déchaîne sa fureur' : 'frappe'} la ${STM_NAMES[s].toLowerCase()} : −${real}${T.hp <= 0 ? ' · 💥 hors service !' : ''}`, 'mon');
  return true;
}
/* Surcharge Stasis : toutes les tourelles tirent une salve Eau, Feu puis Terre sur tous les ennemis */
function unleashSurge(st, h, ev) {
  const f = h.fight;
  if (!steamReady(h) || !f || !f.mons.some(m => m.hp > 0)) return null;
  const t = heroTotals(st, h);
  for (const s of STM_SLOTS) if (f.tur && f.tur[s]) f.tur[s].hp = f.tur[s].max; // la surcharge remet tout en état
  const { scale } = spellPower(h, t, f, STM_SURGE), mult = 1 + 0.2 * (stmLvl(h, f, 'off') - 1);
  const res = { volleys: [], vapor: null, heal: 0, mag: [] };
  const vapors = [];
  for (const el of ['eau', 'feu', 'terre']) {
    const hits = f.mons.map((m, i) => {
      if (m.hp <= 0) return null;
      const crit = Math.random() * 100 < t.critPct + 20;
      let v = (rnd(STM_SURGE.min, STM_SURGE.max) * scale + t.dmg) * mult;
      if (crit) v *= 1.5 + (t.critDmg || 0) / 100;
      if (t.dmgPct) v *= 1 + t.dmgPct / 100;
      if (m.crack) v *= STM_CRACK;
      v = Math.max(1, Math.round(v)); // ignore les résistances
      m.hp = Math.max(0, m.hp - v);
      if (m.hp > 0) { if (el === 'eau') m.wet = STM_WET_TURNS; else if (el === 'terre') m.crack = true; else if (!m.wet) m.burn = { dmg: Math.max(1, Math.round(v * STM_BURN)), turns: STM_BURN_TURNS }; }
      return { i, v, crit };
    });
    res.volleys.push({ el, hits });
    if (el === 'feu' && f.mons.some(m => m.hp > 0 && m.wet > 0)) { // le feu sur des ennemis trempés : la Vapeur explose
      const v = { i: -1, hits: [] };
      for (const o of f.mons) if (o.hp > 0 && o.wet > 0) {
        const r = rollSpell(h, t, f, STM_VAPOR_SPELL, 0); const d = Math.max(1, Math.round(r.v * 1.6 * (o.crack ? STM_CRACK : 1)));
        o.hp = Math.max(0, o.hp - d); o.wet = 0; o.burn = null; v.hits.push({ i: f.mons.indexOf(o), v: d });
      }
      f.vapSeq = (f.vapSeq || 0) + 1; res.vapor = v; vapors.push(v);
    }
  }
  if (stmHas(h, 'def')) { const heal = Math.min(t.maxHp - h.hp, Math.round(t.maxHp * STM_SURGE_HEAL)); if (heal > 0) { h.hp += heal; res.heal = heal; } }
  if (stmHas(h, 'tac')) f.mons.forEach((m, i) => { if (m.hp > 0) { m.mag = true; res.mag.push(i); } });
  for (const s of STM_SLOTS) if (stmHas(h, s)) { stmXp(h)[s] += 4; }
  h.steam = 0; h.surgeCount = (h.surgeCount || 0) + 1; f.ult = (f.ult || 0) + 1; f.surge = (f.surge || 0) + 1;
  const part = v => v.hits.filter(Boolean).map(x => x.v + (x.crit ? ' CC' : '')).join('/');
  ev.log(h, `💥 SURCHARGE STASIS ! 💧 ${part(res.volleys[0])} · 🔥 ${part(res.volleys[1])} · ⛰️ ${part(res.volleys[2])}${res.vapor ? ` · ♨️ VAPEUR ${res.vapor.hits.map(x => x.v).join('/')}` : ''}${res.heal ? ` · +${res.heal} PV` : ''}${res.mag.length ? ' · 🧲' : ''}`, 'boss');
  return res;
}

/* Avance le combat d'une action. Retourne 'win' | 'lose' | null */
function fightStep(st, h, ev) {
  const f = h.fight, t = heroTotals(st, h);
  let jackpot = false;
  if (f.phase === 0) {
    const jk0 = f.jackSeq || 0, gm0 = f.gambleSeq || 0;
    heroTurn(st, h, t, ev);
    jackpot = (f.jackSeq || 0) > jk0;
    if ((f.gambleSeq || 0) > gm0) h.wait += ECA_GAMBLE_MS; // Quitte ou Double : on attend la fin du jeu de dés
    f.phase = 1;
  } else {
    // cherche le prochain monstre vivant à jouer
    while (f.phase <= f.mons.length && f.mons[f.phase - 1].hp <= 0) f.phase++;
    if (f.phase <= f.mons.length) { monsterTurn(st, h, t, f.mons[f.phase - 1], ev); f.phase++; }
    if (f.phase > f.mons.length) {
      f.phase = 0; f.turn++;
      f.buffs.forEach(b => b.turns--); f.buffs = f.buffs.filter(b => b.turns > 0);
    }
  }
  if (f.mons.every(m => m.hp <= 0)) {
    // Un Jackpot vient d'achever le combat : on laisse la cinématique se jouer avant de conclure
    if (jackpot) { f.fin = true; h.wait += JACKPOT_ANIM_MS; return null; }
    // Dernier coup (sort, poison, piège) : on laisse l'attaque et la chute des ennemis se jouer avant de conclure
    if (!f.fin) { f.fin = true; h.wait += FINISH_ANIM_MS; return null; }
    return 'win';
  }
  if (h.hp <= 0) return 'lose';
  if (f.turn > MAX_TURNS) return 'lose';
  return null;
}

function addRes(st, id, n) {
  st.res[id] = (st.res[id] || 0) + n;
  st.stats.obtained[id] = (st.stats.obtained[id] || 0) + n;
}

function gainXp(st, h, xp, ev) {
  if (h.lvl >= MAX_LEVEL) return;
  h.xp += xp;
  while (h.lvl < MAX_LEVEL && h.xp >= xpToNext(h.lvl)) {
    h.xp -= xpToNext(h.lvl);
    h.lvl++;
    h.capital += CAPITAL_PER_LEVEL;
    if (h.auto) autoAllocate(h);
    const newSpells = spellsOf(h).filter(sp => sp.lvl === h.lvl);
    if (h.cls === 'steamer') for (const s of STM_SLOTS) if (STM_UNLOCK[s] === h.lvl && h.lvl > 1) { ev.log(h, `⚙️ Nouvelle tourelle : ${STM_NAMES[s]} !`, 'win'); ev.turretNew && ev.turretNew(h, s); }
    ev.levelup && ev.levelup(h, newSpells);
  }
}

function autoAllocate(h) {
  const s = h.auto; const c = STAT_COST[s];
  while (h.capital >= c) { h.base[s]++; h.capital -= c; }
}

function resolveWin(st, h, ev) {
  const t = heroTotals(st, h);
  const f = h.fight;
  const place = findPlace(h.act.type, h.act.id);
  let xp = 0, kamas = 0; const loot = {}; const gearLoot = [];
  for (const m of f.mons) {
    const def = MONSTERS[m.mid], ms = monsterStats(m.mid);
    const gap = h.lvl - def.lvl;
    const pen = gap > 10 ? clamp(1 - (gap - 10) * 0.06, 0.1, 1) : 1;
    xp += ms.xp * pen;
    const chest = h.cls === 'enutrof' && f.mons.indexOf(m) === f.treasure; // Carte au trésor : kamas ×1,5, 35 % de ressources en double
    kamas += irnd(ms.kamas[0], ms.kamas[1]) * (chest ? 1.5 : 1);
    const ab = def.archi ? 3 : 1; // archimonstre : ressources ×3 (et en double), équipement bien plus fréquent
    for (const [rid, ch] of def.drops) if (Math.random() < Math.min(1, ch * ab * t.ppTotal / 100)) loot[rid] = (loot[rid] || 0) + (def.archi ? 2 : chest && Math.random() < 0.35 ? 2 : 1);
    for (const [rid, rc] of (RELIC_DROPS[def.base || m.mid] || [])) if (Math.random() < rc * (def.archi ? 20 : 1) * (SUBZONES[f.tier || 0] || SUBZONES[0]).drop * t.ppTotal / 100) {
      const g = rollItem(rid); st.gear.push(g); gearLoot.push(g);
    }
    const gd = GEAR_DROPS[def.base || m.mid];
    if (gd && Math.random() < (def.boss || def.archi ? GEAR_DROP_RATE_BOSS : GEAR_DROP_RATE) * (SUBZONES[f.tier || 0] || SUBZONES[0]).drop * t.ppTotal / 100) {
      const g = rollItem(gd[irnd(0, gd.length - 1)]); st.gear.push(g); gearLoot.push(g);
      st.stats.gearDropped = (st.stats.gearDropped || 0) + 1;
    }
    if (gd) for (const iid of gd) if (Math.random() < STASIS_RATE * (SUBZONES[f.tier || 0] || SUBZONES[0]).drop * t.ppTotal / 100) {
      const g = rollStasis(iid); st.gear.push(g); gearLoot.push(g);
      st.stats.stasisDropped = (st.stats.stasisDropped || 0) + 1;
    }
    st.stats.kills[m.mid] = (st.stats.kills[m.mid] || 0) + 1;
    st.stats.totalKills++;
  }
  const n = f.mons.length;
  xp *= (1 + (n - 1) * 0.15) * (1 + t.xpBonus / 100) * (place.bonusXp || 1);
  kamas = Math.round(kamas * (1 + ((t.kamas || 0) + 10 * (f.jackpots || 0)) / 100)); // chaque Jackpot : +10 % de kamas
  xp = Math.round(xp);
  st.kamas += kamas; st.stats.kamasEarned += kamas; st.stats.fights++;
  for (const [rid, c] of Object.entries(loot)) addRes(st, rid, c);
  if (h.session) { h.session.xp += xp; h.session.kamas += kamas; h.session.kills += n; sessionEvent(h, xp, kamas, n); }
  const lootTxt = Object.entries(loot).map(([r, c]) => `${c}× ${RESOURCES[r].name}`).join(', ');
  ev.log(h, `Victoire ! +${fmt(xp)} XP, +${fmt(kamas)} K${lootTxt ? ' · ' + lootTxt : ''}`, 'win');
  if (f.archi) { st.archi = null; st.stats.archis = (st.stats.archis || 0) + 1; ev.log(h, `🏆 ${MONSTERS[f.mons[0].mid].name} est vaincu !`, 'boss'); }
  else if (h.act.type === 'zone' && !st.archi && ARCHIS[h.act.id] && Math.random() < ARCHI_RATE) { // 1 % : un archimonstre est repéré
    st.archi = { zone: h.act.id, mid: ARCHIS[h.act.id], hero: h.id };
    ev.log(h, `👹 Un archimonstre est repéré : ${MONSTERS[ARCHIS[h.act.id]].name} !`, 'boss'); ev.archiFound && ev.archiFound(h, ARCHIS[h.act.id]);
  }
  for (const g of gearLoot) ev.log(h, `Objet trouvé : ${ITEMS[g.id].name}${g.stasis ? ' (STASIFIÉ)' : ''} !`, 'boss');
  ev.reward && ev.reward(h, xp, kamas, loot, gearLoot);
  gainXp(st, h, xp, ev);
  if (h.act.type === 'dungeon') {
    h.act.room++;
    if (h.act.room > place.rooms.length) {
      h.act.room = 0; h.act.fails = 0;
      if (h.session) h.session.runs++;
      ev.log(h, `${place.name} terminé !`, 'boss');
      ev.dungeonDone && ev.dungeonDone(h, place);
    }
  }
  h.fight = null;
  const t2 = heroTotals(st, h);
  const missing = 1 - h.hp / t2.maxHp;
  h.resting = true;
  h.restTotal = Math.max(400, missing * REGEN_FULL_MS / (1 + (t2.speed || 0) / 100));
  h.wait += h.restTotal;
}

function resolveLose(st, h, ev) {
  st.stats.deaths++;
  ev.log(h, `${h.name} est vaincu et doit se reposer.${h.fight && h.fight.archi ? ' L’archimonstre t’attend toujours.' : ''}`, 'lose');
  ev.defeat && ev.defeat(h);
  h.fight = null; h.hp = 0;
  if (h.act.type === 'dungeon') {
    h.act.room = 0;
    h.act.fails = (h.act.fails || 0) + 1;
    if (h.act.fails >= 3) {
      ev.log(h, `${h.name} abandonne le donjon après 3 défaites d'affilée.`, 'warn');
      ev.stopped && ev.stopped(h, '3 défaites de suite en donjon, trop difficile pour l’instant');
      setActivity(st, h, null);
      return;
    }
  }
  h.resting = true; h.restTotal = DEATH_REST_MS; h.wait += DEATH_REST_MS;
}

/* Avance un héros de dt millisecondes. */
/* Quantité récoltée : augmente de 1 tous les 10 niveaux au-dessus du palier */
function cropQty(st, c) { const lv = st.jobs[c.job].lvl; return [1, 1 + Math.floor(Math.max(0, lv - c.lvl) / 10)]; }
function harvestMastery(st, c) {
  const n = (st.mastery && st.mastery['h_' + c.id]) || 0; let i = 0;
  HARVEST_RANKS.forEach((r, k) => { if (n >= r.at) i = k; });
  return { n, i, rank: HARVEST_RANKS[i], next: HARVEST_RANKS[i + 1] || null, name: HARVEST_RANK_NAMES[c.job][i] };
}
function doHarvest(st, h, ev) {
  const c = findPlace('harvest', h.act.id); const job = st.jobs[c.job];
  if (job.lvl < c.lvl) { ev.stopped && ev.stopped(h, `${GATHER_JOBS[c.job].name} niveau ${c.lvl} requis`); setActivity(st, h, null); return; }
  const ht = harvestTotals(st, h), m0 = harvestMastery(st, c);
  const [a, b] = cropQty(st, c); let n = irnd(a, b) + (Math.random() * 100 < ht.rqty ? 1 : 0) + (Math.random() * 100 < m0.rank.qty ? 1 : 0);
  const alm = almanaxCrop(c.job, job.lvl) === c.id; if (alm) n *= ALMANAX_MULT;
  const miracle = Math.random() * 100 < MIRACLE_BASE + m0.rank.mir + (ht.rmir || 0); if (miracle) n *= 3;
  const gx = Math.max(1, Math.round(c.xp * (1 + ht.rxp / 100))) * (miracle ? 2 : 1);
  addRes(st, c.id, n);
  job.xp += gx;
  let up = false;
  while (job.lvl < MAX_JOB_LEVEL && job.xp >= jobXpToNext(job.lvl)) { job.xp -= jobXpToNext(job.lvl); job.lvl++; up = true; }
  st.stats.harvested = (st.stats.harvested || 0) + n;
  st.mastery = st.mastery || {}; st.mastery['h_' + c.id] = m0.n + 1;
  const m1 = harvestMastery(st, c), rankUp = m1.i > m0.i;
  if (miracle) st.stats.miracles = (st.stats.miracles || 0) + 1;
  h.hseq = (h.hseq || 0) + 1; h.hlast = { id: c.id, n, xp: gx, miracle, alm, rankUp: rankUp ? m1.name : null };
  if (h.session) { h.session.xp += gx; h.session.kills += n; sessionEvent(h, gx, 0, n); }
  ev.log(h, `${h.name} récolte ${n}× ${c.name} (+${gx} XP ${GATHER_JOBS[c.job].name})${miracle ? ' ✨ Récolte miraculeuse !' : ''}${alm ? ' · Almanax ×2' : ''}.`, miracle ? 'boss' : 'win');
  if (rankUp) ev.harvrank && ev.harvrank(h, c, m1.name);
  if (up) ev.jobup && ev.jobup(c.job, job.lvl);
}

function stepMs(st, h) { const sp = heroTotals(st, h).speed || 0; return STEP_MS / (1 + sp / 100); }

function tickHero(st, h, dt, ev, maxActions = 200000) {
  if (h.cls === 'zobal' && h.fervT > 0) { h.fervT -= dt; if (h.fervT <= 0) { h.fervT = 0; h.ferv = 1; } } // Ferveur pleine : elle retombe après 20 s
  if (h.food) { h.food.left -= dt; if (h.food.left <= 0) { h.food = null; ev.foodEnd && ev.foodEnd(h); } }
  if (!h.act) { h.hp = heroTotals(st, h).maxHp; return; }
  if (h.act.type === 'harvest') {
    h.hp = heroTotals(st, h).maxHp; h.wait -= dt; let k = 0;
    while (h.wait <= 0 && h.act && k++ < maxActions) { doHarvest(st, h, ev); if (h.act) h.wait += harvestMs(st, h); }
    return;
  }
  h.wait -= dt;
  let n = 0;
  while (h.wait <= 0 && h.act && n++ < maxActions) {
    if (h.resting || !h.fight) {
      h.resting = false;
      h.hp = heroTotals(st, h).maxHp;
      if (!startFight(st, h, ev)) return;
      h.wait += stepMs(st, h);
      continue;
    }
    const r = fightStep(st, h, ev);
    if (r === 'win') resolveWin(st, h, ev);
    else if (r === 'lose') resolveLose(st, h, ev);
    else h.wait += stepMs(st, h);
  }
  if (n >= maxActions) h.wait = 0;
}

/* Valeur de PV affichée pendant le repos (régénération progressive) */
function displayHp(st, h) {
  const t = heroTotals(st, h);
  if (h.resting && h.restTotal > 0) {
    const p = clamp(1 - h.wait / h.restTotal, 0, 1);
    return Math.round(h.hp + (t.maxHp - h.hp) * p);
  }
  return h.hp;
}

/* ---------------------------- Hors-ligne ---------------------------- */
function simulateOffline(st, ms) {
  ms = Math.min(ms, OFFLINE_CAP_MS);
  const sum = { ms, xp: 0, kamas: 0, kills: 0, loot: {}, levels: {}, deaths: 0, runs: 0, harvest: {}, gear: [] };
  if (ms < 5000) return sum;
  const startLv = Object.fromEntries(st.heroes.map(h => [h.id, h.lvl]));
  const ev = {
    log() {},
    reward(h, xp, k, loot, gear = []) { sum.gear.push(...gear); sum.xp += xp; sum.kamas += k; sum.kills += h.fight.mons.length; for (const [r, c] of Object.entries(loot)) sum.loot[r] = (sum.loot[r] || 0) + c; },
    defeat() { sum.deaths++; },
    dungeonDone() { sum.runs++; },
  };
  const res0 = { ...st.res }; const jobs0 = Object.fromEntries(Object.entries(st.jobs).map(([k, j]) => [k, j.lvl]));
  for (const h of st.heroes) tickHero(st, h, ms, ev, 1e6);
  for (const c of CROPS) { const d = (st.res[c.id] || 0) - (res0[c.id] || 0) - (sum.loot[c.id] || 0); if (d > 0) sum.harvest[c.id] = d; }
  sum.jobs = Object.entries(st.jobs).filter(([k, j]) => j.lvl > jobs0[k]).map(([k, j]) => [k, jobs0[k], j.lvl]);
  for (const h of st.heroes) if (h.lvl > startLv[h.id]) sum.levels[h.name] = [startLv[h.id], h.lvl];
  return sum;
}

/* ---------------------------- Actions joueur ---------------------------- */
/* Faire manger un consommable à un héros (remplace l'effet en cours) */
function eat(st, h, id) {
  const r = RESOURCES[id]; if (!r || !r.food) return 'Cet objet ne se mange pas.';
  if ((st.res[id] || 0) < 1) return `Plus de ${r.name}.`;
  st.res[id]--; if (!st.res[id]) delete st.res[id];
  const ms = Math.round(r.food.ms * (1 + (skillTotals(h).foodDur || 0) / 100));
  h.food = { id, left: ms, total: ms };
  return null;
}

function canRecruit(st) { return st.heroes.length < RECRUIT_COST.length && st.kamas >= RECRUIT_COST[st.heroes.length]; }
function recruit(st, name, cls) {
  if (st.heroes.length >= RECRUIT_COST.length) return 'Nombre maximum de héros atteint.';
  const cost = RECRUIT_COST[st.heroes.length];
  if (st.kamas < cost) return `Il faut ${fmt(cost)} kamas.`;
  st.kamas -= cost;
  const h = newHero(st, name, cls);
  st.heroes.push(h);
  return h;
}

function allocate(h, stat, n) {
  const c = STAT_COST[stat];
  const k = Math.min(n, Math.floor(h.capital / c));
  if (k <= 0) return 0;
  h.base[stat] += k; h.capital -= k * c;
  return k;
}
function resetStats(st, h) {
  for (const s of STATS) { h.capital += h.base[s] * STAT_COST[s]; h.base[s] = 0; }
  h.hp = Math.min(h.hp, heroTotals(st, h).maxHp);
}

function canCraft(st, r, times = 1) {
  if (st.jobs[r.job].lvl < r.lvl) return false;
  return Object.entries(r.ing).every(([id, n]) => (st.res[id] || 0) >= n * times);
}
function maxCraftable(st, r) {
  if (st.jobs[r.job].lvl < r.lvl) return 0;
  return Math.min(...Object.entries(r.ing).map(([id, n]) => Math.floor((st.res[id] || 0) / n)));
}
function rollItem(id, floor = 0, perfect = false) {
  const def = ITEMS[id]; const stats = {};
  for (const [k, [a, b]] of Object.entries(def.stats)) stats[k] = perfect ? b : Math.round(a + (b - a) * (floor + (1 - floor) * Math.random()));
  return { uid: uid(), id, stats };
}
function masteryOf(st, out) {
  const n = (st.mastery && st.mastery[out]) || 0; let i = 0;
  MASTERY_RANKS.forEach((r, k) => { if (n >= r.at) i = k; });
  return { n, i, rank: MASTERY_RANKS[i], next: MASTERY_RANKS[i + 1] || null };
}
function gainJobXp(st, jobId, xp) {
  const job = st.jobs[jobId]; job.xp += xp; let lvUp = false;
  while (job.lvl < MAX_JOB_LEVEL && job.xp >= jobXpToNext(job.lvl)) { job.xp -= jobXpToNext(job.lvl); job.lvl++; lvUp = true; }
  return lvUp;
}
function rollStasis(id) {
  const def = ITEMS[id]; const stats = {};
  for (const [k, [, b]] of Object.entries(def.stats)) stats[k] = b * 2;
  return { uid: uid(), id, stats, stasis: true };
}
function itemQuality(g) {
  if (g.stasis) return 1;
  const def = ITEMS[g.id]; let tot = 0, n = 0;
  for (const [k, [a, b]] of Object.entries(def.stats)) { tot += b === a ? 1 : (g.stats[k] - a) / (b - a); n++; }
  return n ? tot / n : 1;
}
function craft(st, r) {
  if (!canCraft(st, r)) return null;
  for (const [id, n] of Object.entries(r.ing)) st.res[id] -= n;
  const job = st.jobs[r.job];
  const ingCount = Object.values(r.ing).reduce((a, b) => a + b, 0);
  const xp = Math.round((10 + ingCount * 3) * (1 + r.lvl / 10) * (job.lvl - r.lvl > 20 ? 0.3 : 1));
  const lvUp = gainJobXp(st, r.job, xp);
  st.stats.crafted++;
  const m0 = masteryOf(st, r.out); st.mastery = st.mastery || {}; st.mastery[r.out] = m0.n + 1;
  const m1 = masteryOf(st, r.out), rankUp = m1.i > m0.i ? m1.rank : null;
  let result, perfect = false;
  if (RESOURCES[r.out]) {
    let qty = 1, golden = false, daily = false;
    if (RESOURCES[r.out].food) { // Fournée dorée (maîtrise) : ×2 ; Plat du jour : une portion offerte
      golden = Math.random() < m0.rank.perf; daily = platDuJour(st.jobs[r.job].lvl) === r.out; if (golden) qty *= 2; if (daily) qty += 1; perfect = golden;
    }
    addRes(st, r.out, qty); result = { res: r.out, qty, golden, daily };
  }
  else { perfect = Math.random() < m0.rank.perf; const g = rollItem(r.out, m0.rank.floor, perfect); st.gear.push(g); result = { gear: g }; }
  return { ...result, xp, lvUp, perfect, rankUp };
}

/* ---------- Forgemage : Brisage (objet -> runes) et Forgemagie (runes -> jets) ---------- */
function forgeable(g) { const d = ITEMS[g.id]; return !!d && !d.relic && !d.harvest && !d.dofus; }
function brisageRunes(g) { // moyenne des runes obtenues par stat (avant aléa)
  const d = ITEMS[g.id], out = {};
  for (const [k, v] of Object.entries(g.stats)) if (RUNES[k]) out[k] = v / RUNES[k].step * 0.55;
  return out;
}
function brisage(st, uid) {
  const g = gearById(st, uid); if (!g || !forgeable(g)) return 'Cet objet ne peut pas être brisé.';
  if (equippedBy(st, uid)) return 'Déséquipe l’objet avant de le briser.';
  const lvl = st.jobs.forgemage.lvl, got = {}; let tot = 0;
  for (const [k, avg] of Object.entries(brisageRunes(g))) { const n = Math.max(0, Math.round(avg * (0.7 + Math.random() * 0.6) * (1 + lvl * 0.005))); if (n) { got[k] = n; tot += n; } }
  if (!tot) { const top = Object.keys(brisageRunes(g)).sort((a, b) => g.stats[b] / RUNES[b].step - g.stats[a] / RUNES[a].step)[0]; if (top) got[top] = 1; }
  st.gear = st.gear.filter(x => x.uid !== uid);
  for (const [k, n] of Object.entries(got)) addRes(st, 'rune_' + k, n);
  const xp = Math.round(6 + ITEMS[g.id].lvl * 1.6), lvUp = gainJobXp(st, 'forgemage', xp);
  return { id: g.id, runes: got, xp, lvUp, stasis: !!g.stasis };
}
function forgeInfo(st, g, k) {
  const d = ITEMS[g.id], r = RUNES[k], rg = d.stats[k];
  if (!r || !rg) return { ok: false, why: 'Pas de rune pour cette caractéristique.' };
  const [a, b] = rg, cur = g.stats[k], cap = Math.max(b, Math.floor(b * FM_OVER)), gain = Math.min(r.step, cap - cur);
  const have = st.res['rune_' + k] || 0, cost = Math.round(5 + d.lvl * 2);
  if (gain < 1) return { ok: false, why: 'Surjet maximal atteint.', cur, a, b, cap, step: r.step, have, cost, gain: 0, chance: 0 };
  const frac = (cur + gain - b) / Math.max(1, cap - b);
  const base = frac <= 0 ? 0.85 : 0.55 - 0.47 * Math.min(1, frac);
  const chance = Math.min(0.95, base + Math.min(0.12, st.jobs.forgemage.lvl * 0.0012));
  return { ok: have >= 1 && st.kamas >= cost, why: have < 1 ? 'Il te faut une rune.' : st.kamas < cost ? 'Kamas insuffisants.' : '', cur, a, b, cap, step: r.step, have, cost, gain, chance, over: frac > 0 };
}
function forgemagie(st, uid, k) {
  const g = gearById(st, uid); if (!g || !forgeable(g)) return null;
  const inf = forgeInfo(st, g, k); if (!inf.ok) return { err: inf.why };
  st.res['rune_' + k] -= 1; if (!st.res['rune_' + k]) delete st.res['rune_' + k];
  st.kamas -= inf.cost;
  const xp = Math.round(4 + ITEMS[g.id].lvl * 0.8); const lvUp = gainJobXp(st, 'forgemage', xp);
  let kind, lost = null, gain = 0;
  if (Math.random() < inf.chance) {
    const crit = !inf.over && Math.random() < 0.12; gain = Math.min(crit ? inf.step * 2 : inf.step, inf.cap - inf.cur);
    g.stats[k] += gain; g.fm = true; kind = crit ? 'crit' : 'ok';
  } else {
    kind = 'fail';
    if (inf.over && Math.random() < 0.4) {
      const cands = Object.keys(g.stats).filter(o => o !== k && g.stats[o] > ITEMS[g.id].stats[o][0]);
      if (cands.length) { const o = cands[irnd(0, cands.length - 1)], n = Math.min(g.stats[o] - ITEMS[g.id].stats[o][0], Math.max(1, Math.ceil(g.stats[o] * 0.08))); g.stats[o] -= n; g.fm = true; lost = { k: o, n }; kind = 'cfail'; }
    }
  }
  return { kind, k, gain, lost, xp, lvUp, chance: inf.chance, g };
}

function itemValue(g) { const d = ITEMS[g.id]; return Math.round((20 + d.lvl * d.lvl * 1.5) * (0.6 + itemQuality(g) * 0.8) * (g.stasis ? 10 : 1)); }
function sellRes(st, id, n) {
  n = Math.min(n, st.res[id] || 0); if (n <= 0) return 0;
  st.res[id] -= n; if (!st.res[id]) delete st.res[id];
  const k = n * RESOURCES[id].value; st.kamas += k; st.stats.kamasEarned += k; return k;
}
function equippedBy(st, gearUid) { return st.heroes.find(h => h.relic === gearUid || Object.values(h.equip).includes(gearUid) || Object.values(h.hequip || {}).includes(gearUid) || Object.values(h.dofus || {}).includes(gearUid)); }
function sellGear(st, gearUid) {
  if (equippedBy(st, gearUid)) return 0;
  const i = st.gear.findIndex(g => g.uid === gearUid); if (i < 0) return 0;
  const k = itemValue(st.gear[i]); st.gear.splice(i, 1); st.kamas += k; st.stats.kamasEarned += k; return k;
}

function slotsFor(itemSlot) { return itemSlot === 'anneau' ? ['anneau1', 'anneau2'] : [itemSlot]; }
function equip(st, h, gearUid, wanted) {
  const g = gearById(st, gearUid); if (!g) return 'Objet introuvable.';
  const def = ITEMS[g.id];
  if (def.relic) {
    if (h.lvl < def.lvl) return `Niveau ${def.lvl} requis.`;
    const other = equippedBy(st, gearUid); if (other) unequipUid(other, gearUid);
    h.relic = gearUid; return null;
  }
  if (def.dofus) {
    if (h.lvl < def.lvl) return `Niveau ${def.lvl} requis.`;
    const other = equippedBy(st, gearUid); if (other) unequipUid(other, gearUid);
    h.dofus = h.dofus || {};
    const dup = DOFUS_SLOTS.find(s => h.dofus[s] && gearById(st, h.dofus[s])?.id === g.id); // pas deux fois le même Dofus
    const free = dup || (wanted && DOFUS_SLOTS.includes(wanted) ? wanted : (DOFUS_SLOTS.find(s => !h.dofus[s]) || DOFUS_SLOTS[0]));
    h.dofus[free] = gearUid;
    const t = heroTotals(st, h); h.hp = Math.min(h.hp, t.maxHp);
    if (!h.act) h.hp = t.maxHp;
    return null;
  }
  if (def.harvest) {
    if (st.jobs.paysan.lvl < def.lvl) return `Paysan niveau ${def.lvl} requis.`;
    const other = equippedBy(st, gearUid); if (other) unequipUid(other, gearUid);
    h.hequip = h.hequip || {}; h.hequip[def.slot] = gearUid; return null;
  }
  if (h.lvl < def.lvl) return `Niveau ${def.lvl} requis.`;
  const other = equippedBy(st, gearUid); if (other) unequipUid(other, gearUid);
  const slots = slotsFor(def.slot);
  // pas deux fois le même anneau
  if (def.slot === 'anneau') {
    const dup = slots.find(s => h.equip[s] && gearById(st, h.equip[s])?.id === g.id);
    if (dup) { h.equip[dup] = gearUid; return null; }
  }
  const free = (wanted && slots.includes(wanted)) ? wanted : (slots.find(s => !h.equip[s]) || slots[0]);
  h.equip[free] = gearUid;
  const t = heroTotals(st, h); h.hp = Math.min(h.hp, t.maxHp);
  if (!h.act) h.hp = t.maxHp;
  return null;
}
function unequipUid(h, gearUid) { if (h.relic === gearUid) h.relic = null; if (h.dofus) for (const s of DOFUS_SLOTS) if (h.dofus[s] === gearUid) delete h.dofus[s]; for (const s of SLOTS) if (h.equip[s] === gearUid) delete h.equip[s]; if (h.hequip) for (const s of HARVEST_SLOTS) if (h.hequip[s] === gearUid) delete h.hequip[s]; }
function harvestTotals(st, h) { const t = { rxp: 0, rqty: 0, rspd: 0, rmir: 0 }; const sk = skillTotals(h); for (const k in t) t[k] += sk[k] || 0; if (h.food && h.food.left > 0 && RESOURCES[h.food.id]) for (const [k, v] of Object.entries(RESOURCES[h.food.id].food.fx)) if (k in t) t[k] += v * (1 + (sk.foodPow || 0) / 100); for (const s of HARVEST_SLOTS) { const g = h.hequip && h.hequip[s] && gearById(st, h.hequip[s]); if (g) for (const [k, v] of Object.entries(g.stats)) t[k] = (t[k] || 0) + v; } return t; }
function harvestMs(st, h) { return Math.round(HARVEST_MS / (1 + harvestTotals(st, h).rspd / 100)); }
/* Puissance globale d'un héros (dégâts × robustesse × utilité) calculée sur ses vrais totaux : sets, PA et critiques compris */
function heroPower(st, h) {
  const t = heroTotals(st, h);
  const base = 10 * (1 + h.lvl * 0.045);
  let off = (base * (1 + t.deg / 100) + t.dmg) * (1 + t.critPct / 200) * (1 + (t.dmgPct || 0) / 100) * (t.pa / 6);
  const def = t.maxHp / (1 - t.resPct / 100) / (1 - t.dodgePct / 100) * (1 + (t.regen || 0) / 20);
  const util = 1 + t.pp / 100 * 0.12 + t.xpBonus / 100 * 0.08 + (t.kamas || 0) / 100 * 0.1;
  return off * Math.sqrt(def) * util * (1 + (t.speed || 0) / 100 * 0.5);
}
/* Équipe pour chaque emplacement l'objet qui rend le héros le plus puissant (sans déséquiper les autres héros). Renvoie le nombre de changements. */
function bestEquip(st, h) {
  const before = { ...h.equip }; let changed = true, passes = 0;
  const pool = st.gear.filter(g => { const d = ITEMS[g.id]; if (d.relic || d.harvest || d.dofus || h.lvl < d.lvl) return false; const by = equippedBy(st, g.uid); return !by || by.id === h.id; });
  while (changed && passes++ < 5) {
    changed = false;
    for (const slot of SLOTS) {
      const type = slot.startsWith('anneau') ? 'anneau' : slot;
      const cur = h.equip[slot]; let best = cur, bestP = heroPower(st, h);
      for (const g of pool) {
        if (ITEMS[g.id].slot !== type || g.uid === cur) continue;
        const other = Object.entries(h.equip).find(([s, u]) => u === g.uid && s !== slot);
        if (other) continue; // déjà porté sur un autre emplacement
        if (type === 'anneau') { const sib = slot === 'anneau1' ? 'anneau2' : 'anneau1'; const sg = h.equip[sib] && gearById(st, h.equip[sib]); if (sg && sg.id === g.id) continue; }
        const keep = h.equip[slot]; h.equip[slot] = g.uid; const p = heroPower(st, h);
        if (p > bestP * 1.0001) { bestP = p; best = g.uid; }
        if (keep) h.equip[slot] = keep; else delete h.equip[slot];
      }
      if (best && best !== cur) { h.equip[slot] = best; changed = true; }
    }
  }
  h.hp = Math.min(h.hp, heroTotals(st, h).maxHp);
  if (!h.act) h.hp = heroTotals(st, h).maxHp;
  return SLOTS.filter(s => before[s] !== h.equip[s]).length;
}
function unequipSlot(st, h, slot) { delete h.equip[slot]; h.hp = Math.min(h.hp, heroTotals(st, h).maxHp); }


/* ---------------------------- Sauvegarde ---------------------------- */
function serialize(st) {
  const copy = JSON.parse(JSON.stringify(st));
  for (const h of copy.heroes) h.log = h.log.slice(-10);
  return JSON.stringify(copy);
}
function migrate(obj) {
  const base = newState();
  const st = Object.assign(base, obj);
  st.stats = Object.assign(newState().stats, obj.stats || {});
  for (const j of [...Object.keys(JOBS), ...Object.keys(GATHER_JOBS)]) if (!st.jobs[j]) st.jobs[j] = { lvl: 1, xp: 0 };
  st.mastery = st.mastery || {};
  st.heroes = st.heroes.filter(h => CLASSES[h.cls]); // classe supprimée (Eniripsa) : le héros disparaît de la sauvegarde
  for (const h of st.heroes) {
    h.log = h.log || []; h.hequip = h.hequip || {}; h.dofus = h.dofus || {};
    // v8 : Force/Intelligence/Chance/Agilité fusionnées en Dégâts → points de capital remboursés
    const ob = h.base || {};
    if ((obj.v || 1) < 2 || OLD_ELEM_STATS.some(k => k in ob)) {
      let cap = 0; for (const [k, v] of Object.entries(ob)) cap += v * (k === 'sag' ? 3 : 1);
      h.base = { vit: 0, sag: 0, deg: 0 }; h.capital = (h.capital || 0) + cap;
      if (OLD_ELEM_STATS.includes(h.auto)) h.auto = 'deg';
      if (h.auto) autoAllocate(h);
    }
    if (h.fight && h.fight.buffs) for (const b of h.fight.buffs) if (b.stats && 'pui' in b.stats) b.stats = convertOldStats(b.stats);
    // contenu supprimé entre versions : on nettoie
    if (h.act && !findPlace(h.act.type, h.act.id)) setActivity(st, h, null);
    if (h.fight && h.fight.mons.some(m => !MONSTERS[m.mid])) h.fight = null;
  }
  st.gear = st.gear.filter(g => ITEMS[g.id]);
  for (const g of st.gear) migrateGear(g, (obj.v || 1) < 2);
  for (const k of Object.keys(st.res)) if (!RESOURCES[k]) delete st.res[k];
  st.v = SAVE_VERSION;
  return st;
}
/* Convertit un objet d'une ancienne version (stats élémentaires, sans prospection) */
function migrateGear(g, old) {
  const def = ITEMS[g.id];
  if (old || Object.keys(g.stats).some(k => OLD_ELEM_STATS.includes(k) || k === 'pui')) g.stats = convertOldStats(g.stats);
  const q = Math.max(0, Math.min(1, itemQualityRaw(g, def)));
  for (const [k, [a, b]] of Object.entries(def.stats)) {
    if (g.stats[k] === undefined) g.stats[k] = g.stasis ? b * 2 : Math.round(a + (b - a) * q);
    else g.stats[k] = g.stasis ? b * 2 : Math.max(a, Math.min(g.fm ? Math.max(b, Math.floor(b * FM_OVER)) : b, g.stats[k]));
  }
  for (const k of Object.keys(g.stats)) if (!(k in def.stats)) delete g.stats[k];
}
function itemQualityRaw(g, def) { let tot = 0, n = 0; for (const [k, [a, b]] of Object.entries(def.stats)) if (g.stats[k] !== undefined) { tot += b === a ? 1 : (g.stats[k] - a) / (b - a); n++; } return n ? tot / n : 0.5; }
function exportSave(st) { return btoa(unescape(encodeURIComponent(serialize(st)))); }
function importSave(str) { return migrate(JSON.parse(decodeURIComponent(escape(atob(str.trim()))))); }

/* ---------------------------- Format ---------------------------- */
function fmt(n) {
  n = Math.round(n);
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace('.', ',') + ' M';
  return n.toLocaleString('fr-FR');
}
function fmtDur(ms) {
  const s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h) return `${h} h ${String(m).padStart(2, '0')}`;
  if (m) return `${m} min ${String(s % 60).padStart(2, '0')}`;
  return `${s} s`;
}

if (typeof module !== 'undefined') module.exports = {};


/* ---------- Arbre de compétences ---------- */
function skillPoints(h) { return Math.floor(h.lvl / SKILL_LEVELS_PER_POINT); }
function skillRanks(h) { return h.skills || (h.skills = {}); }
function skillSpent(h) { let s = 0; for (const id in (h.skills || {})) { const n = SKILL_NODE[id]; if (n) s += h.skills[id] * n.cost; } return s; }
function skillBranchSpent(h, bid) { let s = 0; for (const id in (h.skills || {})) { const n = SKILL_NODE[id]; if (n && n.branch === bid) s += h.skills[id] * n.cost; } return s; }
function skillFree(h) { return skillPoints(h) - skillSpent(h); }
function skillCheck(h, id) {
  const n = SKILL_NODE[id]; if (!n) return 'Compétence inconnue.';
  const rk = h.skills || {};
  if ((rk[id] || 0) >= n.max) return 'Rang maximal atteint.';
  if (n.req.length && !n.req.some(q => rk[q] > 0)) return 'Apprends d’abord une compétence reliée.';
  const gate = SKILL_GATE[n.r]; if (skillBranchSpent(h, n.branch) < gate) return `Dépense ${gate} points dans cette voie pour ouvrir cette ligne.`;
  if (skillFree(h) < n.cost) return n.cost > 1 ? `Il faut ${n.cost} points.` : 'Plus de point de compétence.';
  return null;
}
function skillRank(st, h, id) { const err = skillCheck(h, id); if (err) return err; const rk = skillRanks(h); rk[id] = (rk[id] || 0) + 1; return null; }
function skillTotals(h) {
  const t = {}, rk = h.skills; if (!rk) return t;
  const bs = {}; let tot = 0;
  for (const id in rk) { const n = SKILL_NODE[id], r = rk[id]; if (!n || !r) continue; for (const k in n.fx) t[k] = (t[k] || 0) + n.fx[k] * r; bs[n.branch] = (bs[n.branch] || 0) + r * n.cost; tot += r * n.cost; }
  for (const b of SKILL_BRANCHES) { const sp = bs[b.id] || 0; for (const k in b.per) t[k] = (t[k] || 0) + b.per[k] * sp; for (const [at, fx] of b.mile) if (sp >= at) for (const k in fx) t[k] = (t[k] || 0) + fx[k]; }
  for (const [at, fx] of SKILL_GLOBAL) if (tot >= at) for (const k in fx) t[k] = (t[k] || 0) + fx[k];
  return t;
}
function skillRespecCost(h) { const sp = skillSpent(h); return sp ? Math.round(h.lvl * 40 + sp * 60) : 0; }
function skillRespec(st, h) { const c = skillRespecCost(h); if (!c) return 'Aucun point dépensé.'; if (st.kamas < c) return `Il te faut ${fmt(c)} kamas.`; st.kamas -= c; h.skills = {}; return null; }
