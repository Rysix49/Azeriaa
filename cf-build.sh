#!/bin/sh
# Construction pour Cloudflare Pages : seuls les fichiers du site sont publiés (dossier dist).
# Les fonctions serveur (chat, comptes, avatars) sont dans functions/ et détectées automatiquement.
set -e
rm -rf dist && mkdir dist
cp index.html version.json _headers dist/
cp cf_redirects dist/_redirects
