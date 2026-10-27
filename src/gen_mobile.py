# Génère les règles « format téléphone forcé » : chaque règle des blocs
# @media (max-width: …) de style2.css est recopiée sous :root[data-layout="mobile"].
import re, sys
css = open(sys.argv[1]).read()
out = []
for m in re.finditer(r'@media\s*\(max-width:\s*(\d+)px\)\s*\{', css):
    i = m.end(); depth = 1; j = i
    while depth:
        if css[j] == '{': depth += 1
        elif css[j] == '}': depth -= 1
        j += 1
    body = css[i:j-1]
    for sel, decl in re.findall(r'([^{}]+)\{([^{}]*)\}', body):
        sels = ', '.join(':root[data-layout="mobile"] ' + s.strip() for s in sel.split(','))
        out.append(f'{sels} {{{decl}}}')
print('/* Format téléphone forcé (généré depuis les règles mobiles) */')
print('\n'.join(out))
print(':root[data-layout="mobile"] #app, :root[data-layout="mobile"] .bottom-nav { max-width: 460px; margin-inline: auto; }')
print(':root[data-layout="mobile"] body { background: #090b07; }')
print(':root[data-layout="mobile"] #app { background: var(--bg); box-shadow: 0 0 0 1px var(--line), 0 0 60px #000; }')
