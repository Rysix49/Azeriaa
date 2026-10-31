#!/usr/bin/env node
/* Audit d'équilibrage de l'équipement d'Amakna Idle.
   Usage : node tools/equip_audit.cjs            → liste les objets/panoplies hors budget (écart > 8 %)
           node tools/equip_audit.cjs --all      → liste tout
           node tools/equip_audit.cjs suggest <emplacement> <niveau>   → valeur de budget pour un nouvel objet

   Principe : chaque objet vaut un certain gain de « puissance de combat » (dégâts × survie) pour un héros de
   référence de son niveau, plus une valeur d'utilitaire (prospection, sagesse, kamas, XP, vitesse).
   Cette valeur doit suivre le budget de son emplacement (constant avec le niveau, rampe au début du jeu).
   Reliques : 16 + 0,14 × niveau. Dofus : idem − 2. Panoplies : bonus cumulé 8 / 25 / 46 / 72 % (5 pièces),
   8 / 26 / 50 (4 pièces), 9 / 28 (3 pièces), 6 / 18 / 40 (6 pièces). Plus de détails dans CLAUDE.md. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const SRC = path.join(__dirname, '..', 'src') + path.sep;
let src = ['data.js', 'zones2.js', 'zones3.js', 'balmig.js', 'skilltrees.js', 'engine.js'].map(f => fs.readFileSync(SRC + f, 'utf8')).join('\n;\n') + '\n;globalThis.__x={ITEMS,SETS};';
const ctx = { console, Math, Date, Object, Array, JSON, Number, String, Set, Map, parseInt, parseFloat, isNaN, setTimeout }; ctx.globalThis = ctx;
vm.createContext(ctx); vm.runInContext(src, ctx);
const { ITEMS, SETS } = ctx.__x;

const HP_MULT = 1.05;
const UTIL = { pp: 0.04, sag: 0.03, xpPct: 0.06, kamas: 0.03, speed: 0.5 }; // % de puissance par point de stat
const COMBAT = ['coiffe', 'cape', 'amulette', 'anneau', 'bottes', 'ceinture', 'arme'];
const interp = (pts, L) => { if (L <= pts[0][0]) return pts[0][1]; for (let i = 1; i < pts.length; i++) if (L <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (L - x0) / (x1 - x0); } return pts[pts.length - 1][1]; };
const BUDGET = {
  coiffe: [[1, 12], [10, 22], [24, 24], [999, 24]],
  cape: [[1, 4], [10, 13], [25, 16], [40, 19.5], [60, 20], [999, 20]],
  amulette: [[1, 10], [15, 17], [40, 19], [60, 19.8], [999, 19.8]],
  ceinture: [[1, 5], [16, 9], [42, 12], [60, 15], [80, 16], [999, 16]],
  bottes: [[1, 9], [12, 14], [26, 17.5], [60, 20], [114, 21.5], [999, 21.5]],
  anneau: [[1, 4.7], [14, 6], [46, 8], [98, 9.5], [999, 10]],
  arme: [[3, 8.5], [15, 14], [25, 16.5], [34, 17.5], [45, 18], [999, 18]],
};
const RELIC_B = L => 16 + 0.14 * L, DOFUS_B = L => RELIC_B(L) - 2;
const SET_B = { 3: { 2: 9, 3: 28 }, 4: { 2: 8, 3: 26, 4: 50 }, 5: { 2: 8, 3: 25, 4: 46, 5: 72 }, 6: { 2: 6, 4: 18, 6: 40 } };

const mid = r => (r[0] + r[1]) / 2;
const vec = it => Object.fromEntries(Object.entries(it.stats).map(([k, r]) => [k, mid(r)]));
function totals(L, vs) {
  const t = { vit: 0, deg: 5 * (L - 1), res: 0, pp: 0, crit: 0, dodge: 0, regen: 0, speed: 0, dmgPct: 0, critDmg: 0 };
  for (const v of vs) for (const [k, x] of Object.entries(v)) t[k] = (t[k] || 0) + x;
  t.maxHp = (50 + 6 * L) * HP_MULT + t.vit; return t;
}
function power(L, t) {
  const crit = Math.min(50, 3 + t.crit) / 100;
  const off = 10 * (1 + L * 0.045) * (1 + t.deg / 100) * (1 + crit * (0.5 + t.critDmg / 100)) * (1 + t.dmgPct / 100) * ((6 + (L >= 100 ? 1 : 0)) / 6);
  return off * t.maxHp / (1 - Math.min(50, t.res) / 100) / (1 - Math.min(35, t.dodge) / 100) * (1 + t.regen * 0.06);
}
const util = v => Object.entries(UTIL).reduce((s, [k, w]) => s + (v[k] || 0) * w, 0);
function loadout(L, excludeId, slot) { // meilleur objet de niveau <= L par emplacement
  const best = {};
  for (const [id, i] of Object.entries(ITEMS)) { if (i.relic || i.dofus || i.harvest || !COMBAT.includes(i.slot) || i.lvl > L || id === excludeId) continue; if (!best[i.slot] || i.lvl > ITEMS[best[i.slot]].lvl) best[i.slot] = id; }
  const vs = []; for (const [s, id] of Object.entries(best)) { if (s === slot && slot !== 'anneau') continue; vs.push(vec(ITEMS[id])); if (s === 'anneau' && slot !== 'anneau') vs.push(vec(ITEMS[id])); } return vs;
}
const value = (L, base, v) => (power(L, totals(L, [...base, v])) / power(L, totals(L, base)) - 1) * 100 + util(v);

if (process.argv[2] === 'suggest') {
  const slot = process.argv[3], L = +process.argv[4];
  if (!BUDGET[slot] || !L) { console.log('usage : suggest <coiffe|cape|amulette|anneau|bottes|ceinture|arme> <niveau>'); process.exit(1); }
  const base = loadout(L, null, slot);
  console.log(`${slot} niveau ${L} : budget ${interp(BUDGET[slot], L).toFixed(1)} % de puissance (utilitaires compris)`);
  for (const k of ['deg', 'vit']) { let lo = 0, hi = 5000; for (let i = 0; i < 50; i++) { const m = (lo + hi) / 2; if (value(L, base, { [k]: m }) < interp(BUDGET[slot], L)) lo = m; else hi = m; } console.log(`  tout en ${k} : ${Math.round(lo)} (valeur moyenne ; jets à ±17,5 %)`); }
  process.exit(0);
}
const all = process.argv.includes('--all'); let bad = 0;
const show = (label, v, target) => { const dev = (v / target - 1) * 100; const flag = Math.abs(dev) > 8; if (flag) bad++; if (flag || all) console.log(`${flag ? '⚠' : ' '} ${label.padEnd(36)} valeur ${v.toFixed(1).padStart(5)} / budget ${target.toFixed(1).padStart(5)}  (${dev >= 0 ? '+' : ''}${dev.toFixed(0)} %)`); };
for (const [id, i] of Object.entries(ITEMS)) {
  if (i.harvest) continue;
  const L = i.lvl;
  if (COMBAT.includes(i.slot)) { if (L <= 1) continue; show(`${id} (${i.slot} ${L})`, value(L, loadout(L, id, i.slot), vec(i)), interp(BUDGET[i.slot], L)); }
  else if (i.relic) { if (L <= 1) continue; show(`${id} (relique ${L})`, value(L, loadout(L, null, 'relique'), vec(i)), RELIC_B(L)); }
  else if (i.dofus) show(`${id} (Dofus ${L})`, value(L, loadout(L, null, 'dofus'), vec(i)), DOFUS_B(L));
}
for (const [sid, s] of Object.entries(SETS)) {
  if (sid === 'aventurier') continue;
  const its = Object.values(ITEMS).filter(i => i.set === sid), N = its.length, L = Math.round(its.reduce((a, i) => a + i.lvl, 0) / N);
  for (const [n, b] of Object.entries(s.bonus)) show(`panoplie ${sid} ${n}p`, value(L, loadout(L, null, 'set'), b), (SET_B[N] || {})[n] || 0);
}
console.log(bad ? `\n${bad} élément(s) hors budget (> 8 %).` : '\nTout est dans le budget.');
process.exit(bad ? 1 : 0);
