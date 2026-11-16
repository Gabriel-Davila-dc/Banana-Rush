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
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="manifest" href="manifest.webmanifest">
<style>html,body{margin:0;height:100%}[hidden]{display:none!important}</style>
</head>
<body>
`;

fs.mkdirSync(out, {recursive: true});
fs.writeFileSync(path.join(out, 'index.html'), head + game + '\n</body>\n</html>\n');
fs.rmSync(path.join(out, 'assets'), {recursive: true, force: true});
fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), {recursive: true});
// service worker: depois de abrir uma vez, o jogo abre sem internet.
// O jogo (index.html) vem da rede quando dá, para pegar a versão nova; texturas, modelos e o three.js ficam guardados.
const ver = Date.now().toString(36);
fs.writeFileSync(path.join(out, 'sw.js'), `const V = 'bananal-${ver}';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(V).then(c => c.addAll(['./', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png']).catch(() => {}))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('bananal-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url), page = r.mode === 'navigate';
  if (page || (u.origin === location.origin && /[.](html|webmanifest)$/.test(u.pathname))){
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(page ? './' : r, cp)); return res; }).catch(() => caches.match(page ? './' : r)));
    return;
  }
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok || res.type === 'opaque'){ const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })));
});
`);
console.log('site/ pronta: index.html + assets/ + sw.js');
