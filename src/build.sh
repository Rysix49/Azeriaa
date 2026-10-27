#!/bin/sh
# Assemble le jeu en un seul fichier index.html.
cd "$(dirname "$0")"
BUILD_ID=$(date +%s)
OUT_DIR=.
[ -n "$1" ] && OUT_DIR="$1"
{
cat <<'HEAD'
<meta charset="utf-8">
<title>Amakna Idle</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta id="vp" name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#11140e">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grenze:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap">
HEAD
echo '<style id="css-new">'; cat style2.css; python3 gen_mobile.py style2.css; echo '</style>'
echo '<div id="app"></div>'
echo '<div class="toasts" id="toasts" aria-live="polite"></div>'
echo '<div class="modal-back" id="modal" hidden></div>'
echo '<script>'
echo "const BUILD_ID = '$BUILD_ID';"
cat data.js engine.js art.js monart.js skin.js update.js
echo '(function () {'
cat spellfx.js ui2.js
echo '})();'
echo '</script>'
} > "$OUT_DIR/index.html"
echo "{\"build\":\"$BUILD_ID\"}" > "$OUT_DIR/version.json"
