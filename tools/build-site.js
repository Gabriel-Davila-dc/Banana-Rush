// Monta a pasta site/ (pronta para hospedar) a partir do jogo e das texturas.
// Uso: node tools/build-site.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'site');
const game = fs.readFileSync(path.join(root, 'colheita-bananeira.html'), 'utf8');

const head = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Colheita no Bananal: cuide do bananal, colha os cachos e monte sua equipe.">
<meta name="theme-color" content="#2f6b2a">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<style>html,body{margin:0;height:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;

fs.mkdirSync(out, {recursive: true});
fs.writeFileSync(path.join(out, 'index.html'), head + game + '\n</body>\n</html>\n');
fs.rmSync(path.join(out, 'assets'), {recursive: true, force: true});
fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), {recursive: true});
console.log('site/ pronta: index.html + assets/');
