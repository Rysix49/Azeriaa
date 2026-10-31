# Amakna Idle — guide pour Claude

Jeu idle de fan (thème Dofus), un seul fichier `index.html`, en français. L'utilisateur parle français (GitHub : Rysix49).

## Sites
- Officiel : https://azeriaa.pages.dev (branche `main`)
- Test : https://dev.azeriaa.pages.dev (branche `dev`)
- Hébergement Cloudflare Pages + base D1 « azeriaa » (voir `.github/workflows/cloudflare.yml`, dossier `functions/`).
- Un bouton « Publier sur le site officiel » dans le jeu de test mène à la demande de fusion `dev` → `main` (ouverte automatiquement par `auto-pr.yml`). L'utilisateur la fusionne lui-même.

## Workflow
1. `git checkout dev && git pull` (toujours travailler sur `dev`, jamais directement sur `main`).
2. Modifier les sources dans `src/` (ne jamais éditer `index.html` à la main).
3. `sh src/build.sh ..` régénère `index.html` et `version.json` à la racine. Les deux sont commités.
4. Commit + `git push origin dev` → déploiement automatique sur le site de test.
5. Dire à l'utilisateur ce qui a changé et de recharger la page de test.

Commits : trailers `Co-Authored-By: Claude <modèle> <noreply@anthropic.com>` et `Claude-Session: <url de la session>` (suivre le rappel d'attribution de la session).

## Sources (`src/`)
- `data.js` : classes (iop, cra, zobal, sacrieur, enutrof, ecaflip, sram, xelor, steamer — l'Eniripsa a été supprimée), sorts, monstres, objets, recettes, taux de drop (`GEAR_DROP_RATE*`, déjà ×3).
- `zones2.js` : sous-zones et zones de la route principale (Wabbits, Blops, Kanniboul, Porcos, Dragoeufs, Frigost), donjons, archimonstres, ressources.
- `zones3.js` : suite de la route principale après Frigost (niveaux 128–194). Régions **Pandala** (Forêt de Pandala + sous-zone Étang des Carpes Célestes + donjon Pagode du Dragon de Jade), **Dunes** (Dunes des Ossements + Mines d'Ocre + Tombeau du Pharaon Éternel), **Srambad** (Ruelles de Srambad + Roseraie Noire + Manoir du Comte Vespéral). Contient ressources, clefs de donjon, 27 monstres, zones/sous-zones/donjons, archimonstres, 6 panoplies (`SETS`, 5 pièces chacune, 2–5 pièces de bonus), 6 reliques, 4 Dofus (Émeraude 144, Ocre 166, Pourpre 188, Ébène 190 ; stats fixes `[v,v]`), recettes (métiers 94–100), `GEAR_DROPS` et `RELIC_DROPS` (reliques de sous-zone : 0,0005 sur le gros monstre ; boss de donjon : relique 0,02 + Dofus 0,002). Courbe d'équilibrage vérifiée par simulation hors navigateur (même progression que Frigost aux paliers 1–4) : le moteur se charge dans `vm` avec `data.js zones2.js zones3.js skilltrees.js engine.js`, sans DOM.
- `engine.js` : combat et calculs (dégâts, passifs de classe). Les ressources de classe qui se gardent d'un combat à l'autre (grains du Xélor, Ferveur du Zobal, Trèfles de l'Ecaflip…) sont stockées sur le héros (`h.grains`, `h.ferv`…), pas seulement dans `h.fight`, qui est recréé à chaque combat.
- `ui2.js`, `ui3.js` : interface principale. `cbhud.js` : HUD de combat v3 (frise de portraits, grimoire, journal). `carte.js`, `carte2.js` : carte du monde. `atelier.js` (forge, Forgemage, Boulanger), `recolte.js` (Paysan, Alchimiste), `talents.js` (onglet « Talents » : interface des arbres de classe).
- `skilltrees.js` : talents de classe — `CLASS_TREES[classe]` = 3 voies × 13 talents (le 8e de la liste est le talent clé, 3 points ; ids stables `classe_voieN`, les 5 derniers ont été ajoutés et placés par `SK_ORDER`), 1 point tous les 3 niveaux (66 au niveau 200). Chaque bonus est une clé de stat (`furyGain`, `faceDmg`, `turretDmg`…) libellée dans `SKILL_STAT` ; `skillTotals(h)` (engine.js) les fusionne dans `heroTotals`, et le moteur les lit via `t.<clé>` (rollSpell, castSpell, monsterTurn, jauges de classe, tourelles…). Pour ajouter un bonus : le déclarer dans `SKILL_STAT`, l'utiliser dans un talent, le lire dans engine.js. Les anciens points (arbre générique) sont remboursés par `migrate()`.
- `skillicons.js` + `skillicons_a.js` … `skillicons_e.js` + `skillicons.css` : icônes dessinées (SVG originaux, jamais d'emoji) des talents et des voies. `SK_G[nom]` = glyphe 32×32 (classes de palette `k0–k4`, `g1–g3`, `r1–r3`, `b1–b3`…, contour sombre commun via `.gi path`), `SK_B[nom]` = pastille 16×16 dessinée en bas à droite. Une icône de talent est une « spec » `glyphe` ou `glyphe|pastille` (ex. `bloodrop|flame`) ; `skIco(spec, classeCss)` renvoie le `<svg class="gi">` (ou `<span class="gi-fb">?</span>` si le glyphe est inconnu). Dans `skilltrees.js`, les champs icône des voies et des talents sont des specs (pas d'emoji) ; chaque spec doit rester unique dans le jeu. Pour ajouter une icône : créer le glyphe dans le fichier `skillicons_*.js` voulu, l'utiliser dans `skilltrees.js`, puis vérifier le rendu (Playwright) ; `skillicons.css` règle les tailles par emplacement (nœud, clé en losange, détail, carte, onglet) y compris mobile.
- `style2.css`, `style3.css` : styles (la fenêtre de combat `.scene` est dézoomée à 82 %) ; `gen_mobile.py` en dérive la version mobile. Ordre de concaténation dans `build.sh`.
- `monart.js` : sprites SVG animés des monstres d'Incarnam et des premières zones (`MON_ART[id]`). `monart2.js` : monstres des sous-zones, générés par familles (blops, wabbits, kanniboul, porcos, dragoeufs, mansots). `monart3a.js` / `monart3b.js` / `monart3c.js` : les 27 monstres dessinés de Pandala/Étang, Dunes/Mines, Srambad/Roseraie ; `monart3z.js` fait pointer chaque archimonstre vers le sprite de sa base. `heroart*.js`, `art*.js`, `skin.js` : héros, icônes, équipements, apparences.
- `art4a.js` … `art4d.js` : dessins (`ITEM_ART[id]`, viewBox 32) des panoplies, reliques et Dofus de `zones3.js` (Pandala+Étang, Dunes+Mines, Srambad+Roseraie, reliques/Dofus) et couleurs de panoplie `SET_COL`. Les aides locales sont préfixées `_b4*`, `_c4*`, `_dofusArt2`. Chaque objet de panoplie doit avoir un dessin, une recette et un drop.
- `carte3.js` : décor (`wmScenery3`) et animations (`wmAnim3`) des nouvelles régions de la carte. La carte fait maintenant `WM_W = 2560` (`.wm` : `aspect-ratio 2560/470`, `min-width` 2185 px, 2092 px sur mobile) ; positions dans `WM_POS` (carte.js), couleurs de région dans `WM_REG` et `THEME` (ui2.js). Une animation CSS écrase l'attribut `transform` : envelopper l'élément animé dans un `<g class="wm-…">`.
- `spellfx.js` : effets de sorts. `stmfx.js` : Steamer (tourelles, Pression, Surcharge). `update.js` : bandeau de mise à jour.

## Sprites de monstres
- SVG original, `viewBox="0 0 128 128"`, classe racine `ms ms-<id>`, ids de dégradés préfixés par 2 lettres propres au monstre.
- Parties animées par classes CSS : `p-hop`, `p-body`, `p-torso`, `p-eye`, `p-shadow`, `p-feathers` (particules de coup), plus `p-jaw`, `p-limb`, `p-antenna`, `p-leaves`, `p-quills`, `p-glow`, `p-wing`, `p-tail`…
- Piège connu : `.ms * { transform-box: fill-box }` — un `transform="rotate(a cx cy)"` en attribut est décalé. Pour faire tourner des éléments, positionner chaque élément directement ou utiliser `style="transform:rotate(..);transform-origin:50% 50%"`.
- Vérifier le rendu en le dessinant avec Playwright (déjà installé) avant de dire que c'est corrigé.

## Règles impératives
- Ne jamais intégrer d'assets Ankama/Dofus (SWF, PNG extraits, etc.). Pas de monstres conçus pour être reconnaissables comme les personnages Dofus. Les noms de monstres et de zones restent le seul lien avec Dofus.
- Ne jamais afficher le token Cloudflare dans le chat : il vit uniquement dans les secrets GitHub (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`).
- Sur mobile, l'utilisateur teste depuis son téléphone : penser à la mise en page étroite.

## Historique résumé
Refonte des stats (Force/Intel/Chance/Agi fusionnées en Dégâts ; Sagesse = XP ; Prospection), passifs de classe (Iop colère, Cra focus/Tir Parfait, Sacrieur Stigmates/Berserk, Sram, Ecaflip pile/face, Xélor sablier/Éclat du temps, Zobal masques/Ferveur, Steamer tourelles), migration Netlify → Cloudflare, sprites originaux pour tous les monstres (oiseau Tofu validé comme référence de style), carte refaite avec sous-zones et donjons, métiers (Récolte, Boulanger, Forgemage), arbre de talents par classe (onglet Talents), écran Combats v3, Dofus Turquoise, régions Pandala / Dunes / Srambad (niveaux 128–194) avec leurs sous-zones, donjons, panoplies dessinées, reliques et Dofus (Émeraude, Ocre, Pourpre, Ébène).
