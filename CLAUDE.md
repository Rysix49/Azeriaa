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
- `data.js`, `zones2.js` : classes, sorts, monstres, zones, objets, recettes.
- `engine.js` : combat et calculs (dégâts, passifs de classe).
- `ui2.js`, `ui3.js`, `carte*.js`, `atelier.js`, `recolte.js`, `talents.js` : interface.
- `style2.css`, `style3.css` : styles ; `gen_mobile.py` en dérive la version mobile.
- `monart.js`, `monart2.js` : sprites SVG animés des monstres (`MON_ART[id]`). `heroart*.js`, `art*.js`, `skin.js` : héros, icônes, apparences.
- `spellfx.js`, `stmfx.js` : effets de sorts. `update.js` : bandeau de mise à jour.

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
Refonte des stats (Force/Intel/Chance/Agi fusionnées en Dégâts ; Sagesse = XP ; Prospection), passifs de classe (Iop colère, Cra focus, Sacrieur, Sram, Ecaflip pile/face), migration Netlify → Cloudflare, sprites originaux pour tous les monstres (oiseau Tofu validé comme référence de style).
