/* =====================================================================
   AMAKNA IDLE — MOTEUR
   Aucune dépendance au DOM : tout est testable hors navigateur.
   ===================================================================== */

const SAVE_VERSION = 2; // 2 : stats élémentaires fusionnées en Dégâts
const STEP_MS = 550;            // durée d'une action de combat
const REGEN_FULL_MS = 9000;    // temps pour récupérer 100 % des PV
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
  return (_monCache[mid] = { hp, dmin: Math.max(1, Math.round(avg * 0.8)), dmax: Math.round(avg * 1.2), xp, kamas, res: m.res || 0 });
}

/* ---------------------------- État ---------------------------- */
function newState() {
  return {
    v: SAVE_VERSION,
    kamas: 200,
    res: { clef_bouftou: 1 },
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
  if (h.food && h.food.left > 0 && RESOURCES[h.food.id]) { const f = RESOURCES[h.food.id].food; if (f.speed) t.speed = (t.speed || 0) + f.speed; }
  const rel = h.relic && gearById(st, h.relic);
  if (rel) for (const [k, v] of Object.entries(rel.stats)) t[k] = (t[k] || 0) + v;
  const cl = CLASSES[h.cls];
  if (cl.passive && cl.passive.stats) for (const [k, v] of Object.entries(cl.passive.stats)) t[k] = (t[k] || 0) + v;
  t.maxHp = Math.round((50 + h.lvl * 6) * cl.hpMult + t.vit);
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
  h.fight = null; h.resting = false; h.wait = 0; h.restTotal = 0;
  h.hp = heroTotals(st, h).maxHp;
  h.act = type ? { type, id, room: 0, tier: type === 'zone' ? clamp(+tier || 0, 0, SUBZONES.length - 1) : 0 } : null;
  h.session = type ? { start: Date.now(), xp: 0, kamas: 0, kills: 0, runs: 0 } : null;
  h.log = [];
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
    group = pickGroup(place, h);
  }
  h.fight = {
    mons: group.map(mid => { const ms = monsterStats(mid); const hp = Math.round(ms.hp * tierOf(h).hp); return { mid, hp, max: hp, poison: null }; }),
    tier: h.act.tier || 0, turn: 1, phase: 0, buffs: [], cds: {}, casts: {},
  };
  const names = group.map(m => MONSTERS[m].name);
  ev.log(h, `Combat contre ${names.join(', ')}.`, 'start');
  return true;
}

/* ---------------------------- Combat ---------------------------- */
function buffTotal(f, k) { return f.buffs.reduce((s, b) => s + (b.stats[k] || 0), 0); }

/* Passifs de classe : puissance bonus selon la situation du combat */
function passivePui(h, t, f) {
  if (h.cls === 'iop' && f) return (f.rage || 0) * 12;
  if (h.cls === 'sacrieur') return Math.round(clamp(1 - h.hp / t.maxHp, 0, 1) * 100);
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
  const crit = Math.random() * 100 < t.critPct;
  if (crit) v *= h.cls === 'cra' ? 1.8 : 1.5;
  if (h.cls === 'sram' && f && f.turn === 1 && sp.type !== 'heal') v *= 2;
  if (h.cls === 'eniripsa' && sp.type === 'heal') v *= 1.25;
  if (t.dmgPct && sp.type !== 'heal') v *= 1 + t.dmgPct / 100;
  if (monRes) v *= 1 - monRes / 100;
  return { v: Math.max(1, Math.round(v)), crit };
}

function heroTurn(st, h, t, ev) {
  const f = h.fight;
  for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k]--;
  let pre = '';
  if (t.regen && h.hp < t.maxHp) { const r = Math.min(t.maxHp - h.hp, Math.round(t.maxHp * t.regen / 100)); h.hp += r; pre += `Relique +${r} PV · `; }
  if (h.cls === 'eniripsa' && h.hp < t.maxHp) { const r = Math.min(t.maxHp - h.hp, Math.round(t.maxHp * 0.04)); h.hp += r; pre = `Souffle Vital +${r} PV · `; }
  const xel = h.cls === 'xelor';
  if (xel) f.hpMark = h.hp;
  const rewind = xel && (f.grains || 0) >= 12;
  if (rewind) f.grains -= 12;
  const actions = [];
  const phase = (gainGrains) => {
  f.casts = {};
  let pa = t.pa;
  for (let guard = 0; guard < 12; guard++) {
    const alive = f.mons.filter(m => m.hp > 0);
    if (!alive.length) break;
    const usable = spellsOf(h).filter(sp => spellUnlocked(h, sp) && sp.pa <= pa && !(f.cds[sp.id] > 0)
      && (sp.max_ == null || (f.casts[sp.id] || 0) < sp.max_));
    if (!usable.length) break;
    const hpRatio = h.hp / t.maxHp;
    const target = alive.reduce((a, b) => (b.hp < a.hp ? b : a));
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
      val = val / sp.pa;
      if (val > bestVal) { bestVal = val; best = sp; }
    }
    if (!best || bestVal <= 0) break;
    pa -= best.pa;
    f.casts[best.id] = (f.casts[best.id] || 0) + 1;
    if (best.cd) f.cds[best.id] = best.cd + 1;
    const tgts = best.type === 'aoe' ? alive.map(m => f.mons.indexOf(m)) : [f.mons.indexOf(target)];
    actions.push(castSpell(st, h, t, best, target, alive));
    f.fxSeq = (f.fxSeq || 0) + 1;
    (f.fx = f.fx || []).push({ n: f.fxSeq, id: best.id, t: tgts });
    if (f.fx.length > 16) f.fx.shift();
    if (xel && gainGrains) f.grains = Math.min(12, (f.grains || 0) + best.pa + (best.grains || 0));
  }
  };
  phase(true);
  if (rewind && f.mons.some(m => m.hp > 0)) { f.rewinds = (f.rewinds || 0) + 1; actions.push('⏳ Rembobinage !'); for (const k of Object.keys(f.cds)) if (f.cds[k] > 0) f.cds[k]--; phase(false); }
  if (h.cls === 'iop' && actions.length && (f.rage || 0) < 5) { f.rage = (f.rage || 0) + 1; actions.push(`Rage ${f.rage}/5`); }
  if (h.cls === 'sram' && f.turn === 1 && actions.length) pre += 'Embuscade ! ';
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
    const parts = alive.map(m => { const r = rollSpell(h, t, f, sp, monsterStats(m.mid).res); const fz = distort(m, r); m.hp = Math.max(0, m.hp - r.v); return tag(r) + fz; });
    return `${sp.name} → ${parts.join('/')}`;
  }
  const r = rollSpell(h, t, f, sp, monsterStats(target.mid).res);
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
    if (m.hp <= 0) { ev.log(h, line + `${def.name} succombe.`, 'mon'); return; }
  }
  if (m.frozen) { m.frozen = false; ev.log(h, line + `${def.name} est figé dans le temps et ne peut pas agir.`, 'mon'); return; }
  if (Math.random() * 100 < t.dodgePct) { ev.log(h, line + `${h.name} esquive ${def.name}.`, 'mon'); return; }
  let dmg = rnd(ms.dmin, ms.dmax) * (SUBZONES[f.tier || 0] || SUBZONES[0]).dmg;
  let special = false;
  if (def.boss && f.turn % 3 === 0) { dmg *= 1.8; special = true; }
  const res = clamp(t.resPct + buffTotal(f, 'res'), 0, 60);
  dmg = Math.max(1, Math.round(dmg * (1 - res / 100)));
  h.hp = Math.max(0, h.hp - dmg);
  ev.log(h, line + `${def.name} ${special ? 'déchaîne sa fureur' : 'frappe'} : −${dmg} PV.`, special ? 'boss' : 'mon');
  if (h.hp <= 0 && h.cls === 'xelor' && !f.paradox && (f.grains || 0) >= 6) {
    f.paradox = true; f.grains = 0;
    h.hp = Math.max(f.hpMark || 0, Math.round(t.maxHp * 0.3));
    ev.log(h, `⏳ Paradoxe ! ${h.name} remonte le temps et revient à ${h.hp} PV.`, 'win');
  }
}

/* Avance le combat d'une action. Retourne 'win' | 'lose' | null */
function fightStep(st, h, ev) {
  const f = h.fight, t = heroTotals(st, h);
  if (f.phase === 0) {
    heroTurn(st, h, t, ev);
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
  if (f.mons.every(m => m.hp <= 0)) return 'win';
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
    kamas += irnd(ms.kamas[0], ms.kamas[1]);
    const dbl = h.cls === 'enutrof' && Math.random() < 0.12 ? 2 : 1;
    for (const [rid, ch] of def.drops) if (Math.random() < Math.min(1, ch * t.ppTotal / 100)) loot[rid] = (loot[rid] || 0) + dbl;
    for (const [rid, rc] of (RELIC_DROPS[m.mid] || [])) if (Math.random() < rc * (SUBZONES[f.tier || 0] || SUBZONES[0]).drop * t.ppTotal / 100) {
      const g = rollItem(rid); st.gear.push(g); gearLoot.push(g);
    }
    const gd = GEAR_DROPS[m.mid];
    if (gd && Math.random() < (def.boss ? GEAR_DROP_RATE_BOSS : GEAR_DROP_RATE) * (SUBZONES[f.tier || 0] || SUBZONES[0]).drop * t.ppTotal / 100) {
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
  kamas = Math.round(kamas * (1 + (t.kamas || 0) / 100));
  xp = Math.round(xp);
  st.kamas += kamas; st.stats.kamasEarned += kamas; st.stats.fights++;
  for (const [rid, c] of Object.entries(loot)) addRes(st, rid, c);
  if (h.session) { h.session.xp += xp; h.session.kamas += kamas; h.session.kills += n; sessionEvent(h, xp, kamas, n); }
  const lootTxt = Object.entries(loot).map(([r, c]) => `${c}× ${RESOURCES[r].name}`).join(', ');
  ev.log(h, `Victoire ! +${fmt(xp)} XP, +${fmt(kamas)} K${lootTxt ? ' · ' + lootTxt : ''}`, 'win');
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
  ev.log(h, `${h.name} est vaincu et doit se reposer.`, 'lose');
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
function doHarvest(st, h, ev) {
  const c = findPlace('harvest', h.act.id); const job = st.jobs[c.job];
  if (job.lvl < c.lvl) { ev.stopped && ev.stopped(h, `${GATHER_JOBS[c.job].name} niveau ${c.lvl} requis`); setActivity(st, h, null); return; }
  const ht = harvestTotals(st, h);
  const [a, b] = cropQty(st, c); const n = irnd(a, b) + (Math.random() * 100 < ht.rqty ? 1 : 0);
  const gx = Math.max(1, Math.round(c.xp * (1 + ht.rxp / 100)));
  addRes(st, c.id, n);
  job.xp += gx;
  let up = false;
  while (job.lvl < MAX_JOB_LEVEL && job.xp >= jobXpToNext(job.lvl)) { job.xp -= jobXpToNext(job.lvl); job.lvl++; up = true; }
  st.stats.harvested = (st.stats.harvested || 0) + n;
  if (h.session) { h.session.xp += gx; h.session.kills += n; sessionEvent(h, gx, 0, n); }
  ev.log(h, `${h.name} récolte ${n}× ${c.name} (+${gx} XP ${GATHER_JOBS[c.job].name}).`, 'win');
  if (up) ev.jobup && ev.jobup(c.job, job.lvl);
}

function stepMs(st, h) { const sp = heroTotals(st, h).speed || 0; return STEP_MS / (1 + sp / 100); }

function tickHero(st, h, dt, ev, maxActions = 200000) {
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
  h.food = { id, left: r.food.ms, total: r.food.ms };
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
function rollItem(id) {
  const def = ITEMS[id]; const stats = {};
  for (const [k, [a, b]] of Object.entries(def.stats)) stats[k] = irnd(a, b);
  return { uid: uid(), id, stats };
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
  job.xp += xp;
  let lvUp = false;
  while (job.lvl < MAX_JOB_LEVEL && job.xp >= jobXpToNext(job.lvl)) { job.xp -= jobXpToNext(job.lvl); job.lvl++; lvUp = true; }
  st.stats.crafted++;
  let result;
  if (RESOURCES[r.out]) { addRes(st, r.out, 1); result = { res: r.out }; }
  else { const g = rollItem(r.out); st.gear.push(g); result = { gear: g }; }
  return { ...result, xp, lvUp };
}

function itemValue(g) { const d = ITEMS[g.id]; return Math.round((20 + d.lvl * d.lvl * 1.5) * (0.6 + itemQuality(g) * 0.8) * (g.stasis ? 10 : 1)); }
function sellRes(st, id, n) {
  n = Math.min(n, st.res[id] || 0); if (n <= 0) return 0;
  st.res[id] -= n; if (!st.res[id]) delete st.res[id];
  const k = n * RESOURCES[id].value; st.kamas += k; st.stats.kamasEarned += k; return k;
}
function equippedBy(st, gearUid) { return st.heroes.find(h => h.relic === gearUid || Object.values(h.equip).includes(gearUid) || Object.values(h.hequip || {}).includes(gearUid)); }
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
function unequipUid(h, gearUid) { if (h.relic === gearUid) h.relic = null; for (const s of SLOTS) if (h.equip[s] === gearUid) delete h.equip[s]; if (h.hequip) for (const s of HARVEST_SLOTS) if (h.hequip[s] === gearUid) delete h.hequip[s]; }
function harvestTotals(st, h) { const t = { rxp: 0, rqty: 0, rspd: 0 }; for (const s of HARVEST_SLOTS) { const g = h.hequip && h.hequip[s] && gearById(st, h.hequip[s]); if (g) for (const [k, v] of Object.entries(g.stats)) t[k] = (t[k] || 0) + v; } return t; }
function harvestMs(st, h) { return Math.round(HARVEST_MS / (1 + harvestTotals(st, h).rspd / 100)); }
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
  for (const h of st.heroes) {
    h.log = h.log || []; h.hequip = h.hequip || {};
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
    else g.stats[k] = g.stasis ? b * 2 : Math.max(a, Math.min(b, g.stats[k]));
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
