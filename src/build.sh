#!/bin/sh
# Assemble le jeu en un seul fichier index.html.
# Les deux interfaces (nouvelle = ui2.js + style2.css, classique = ui.js + style.css)
# sont incluses ; skin.js choisit laquelle démarrer.
cd "$(dirname "$0")"
{
cat <<'HEAD'
<title>Amakna Idle</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta id="vp" name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#11140e">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grenze:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap">
HEAD
echo '<style id="css-new" media="not all">'; cat style2.css; python3 gen_mobile.py style2.css; echo '</style>'
echo '<style id="css-classic" media="not all">'; cat style.css; echo '</style>'
echo '<div id="app"></div>'
echo '<div class="toasts" id="toasts" aria-live="polite"></div>'
echo '<div class="modal-back" id="modal" hidden></div>'
echo '<script>'
cat data.js engine.js art.js skin.js
echo 'function bootClassic() {'
echo "document.getElementById('app').innerHTML = CLASSIC_SHELL;"
cat ui.js
echo '}'
echo 'function bootNew() {'
cat ui2.js
echo '}'
echo '(SKIN === "classic" ? bootClassic : bootNew)();'
echo '</script>'
} > ../index.html
