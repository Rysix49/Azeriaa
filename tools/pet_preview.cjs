#!/usr/bin/env node
/* Aperçu des dessins de familiers (Playwright).
   Usage : node tools/pet_preview.cjs <dossier de sortie> [id ...]
   Sans id : tous les familiers de src/pets.js. Produit <dossier>/pets.png : chaque familier en grand (160 px),
   en taille de combat (60 px) et en liste (40 px), sur fond de scène sombre et sur fond clair, animations figées
   à deux instants différents. Sert aussi à vérifier le rendu avant de publier. */
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..', 'src') + path.sep;
const out = process.argv[2]; if (!out) { console.log('usage : node tools/pet_preview.cjs <dossier> [id ...]'); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
const ids = process.argv.slice(3);
const art = fs.readdirSync(SRC).filter(f => /^art6.*\.js$/.test(f)).sort().map(f => fs.readFileSync(SRC + f, 'utf8')).join('\n');
const js = 'const STAT_LABEL={},STAT_SHORT={},MONSTERS={};\n' + fs.readFileSync(SRC + 'pets.js', 'utf8') + '\n' + art;
const css = fs.readFileSync(SRC + 'petart.css', 'utf8');
const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{margin:0;background:#1b2016;color:#eee;font:12px sans-serif}
.row{display:flex;align-items:flex-end;gap:14px;padding:10px 14px;border-bottom:1px solid #ffffff18}
.row b{width:92px;font-size:13px}
.sc{display:flex;align-items:flex-end;gap:10px;padding:10px 12px;border-radius:10px;background:linear-gradient(180deg,#3d5a40 0%,#3d5a40 58%,#26351f 58.4%,#26351f 100%)}
.lt{background:#efe6cf}
</style><body><div id="root"></div><script>${js}
petInjectCss();
const want=${JSON.stringify(ids)};
const list=(want.length?want:Object.keys(PETS));
document.getElementById('root').innerHTML=list.map(id=>'<div class="row"><b>'+id+'<br><small>'+(PET_ART[id]?'ok':'MANQUE')+'</small></b>'
 +'<div class="sc"><span style="--ps:160px">'+petSprite(id)+'</span></div>'
 +'<div class="sc"><span style="--ps:60px">'+petSprite(id)+'</span><span style="--ps:60px">'+petSprite(id,'still')+'</span></div>'
 +'<div class="sc lt"><span style="--ps:40px">'+petSprite(id,'still')+'</span><span style="--ps:64px">'+petSprite(id,'still')+'</span></div></div>').join('');
</script>`;
const hf = path.join(out, 'preview.html'); fs.writeFileSync(hf, html);
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 400 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + hf); await p.waitForTimeout(700);
  await p.screenshot({ path: path.join(out, 'pets.png'), fullPage: true });
  await p.waitForTimeout(900);
  await p.screenshot({ path: path.join(out, 'pets_t2.png'), fullPage: true });
  console.log(errs.length ? 'ERREURS :\n' + errs.join('\n') : 'aucune erreur JS', '→', path.join(out, 'pets.png'));
  await b.close();
})();
