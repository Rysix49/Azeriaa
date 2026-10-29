# Site de test et publication

- **Site public** : https://azeriaa.pages.dev (branche `main`)
- **Site de test** : https://dev.azeriaa.pages.dev (branche `dev`)

1. Chaque nouveauté est envoyée sur `dev`, avec une demande de fusion `dev` → `main` ouverte (numéro N).
2. Netlify publie l'aperçu sur `deploy-preview-N--azeriaa.netlify.app`, et `/test` y redirige (règle dans `netlify.toml`).
3. Pour publier : la demande est fusionnée, `main` reçoit les nouveautés, et `/test` passe au numéro N+1 pour la prochaine série.

Le site de test a ses propres comptes et son propre chat (magasins Netlify Blobs suffixés `-dev`).
