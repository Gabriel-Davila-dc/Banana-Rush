# Colheita no Bananal

Jogo 3D de navegador sobre a rotina de um bananal do Vale do Itajaí (SC). Você escolhe o cacho gordo, corta com a foice de bananicultor, leva até a carreta do trator e cuida do bananal ao longo das estações: corte, desembigar, banho, ensacar, desbrota e desfolha.

Feito em HTML + JavaScript com [three.js](https://threejs.org) r128, sem instalar nada para jogar. Funciona no computador (teclado e mouse) e no celular (toque).

## Como jogar

- **Andar:** `W A S D` ou setas (no celular, o controle à esquerda)
- **Cortar:** segure `Espaço` e solte na faixa verde
- **Pegar / entregar o cacho:** toque `Espaço`
- **Câmera:** `V` troca entre 1ª e 3ª pessoa
- **Correr:** `Shift`

## Estrutura

| Caminho | O que é |
|---|---|
| `colheita-bananeira.html` | O jogo inteiro (código e interface) |
| `assets/` | Texturas, céu e modelos 3D |
| `site/` | Versão pronta para hospedar (gerada pelo build) |
| `tools/build-site.js` | Monta a pasta `site/` |
| `netlify.toml` | Configuração do Netlify |
| `.github/workflows/pages.yml` | Publicação automática no GitHub Pages |

## Gerar a versão web

Precisa do [Node.js](https://nodejs.org) 18 ou mais novo.

```bash
node tools/build-site.js
```

Isso cria `site/index.html` e copia `assets/` para `site/assets/`. Esses dois são gerados e ficam fora do git.

Para testar no computador, sirva a pasta `site/` com qualquer servidor estático, por exemplo:

```bash
npx serve site
```

## Hospedar

**Netlify:** em *Add new site → Import an existing project*, escolha este repositório. O `netlify.toml` já diz para rodar o build e publicar a pasta `site`. Cada push na `main` atualiza o site.

**GitHub Pages:** em *Settings → Pages → Build and deployment*, escolha **Source: GitHub Actions**. O workflow `pages.yml` roda o build e publica a cada push na `main`. O link fica `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.

## Créditos

- Texturas, céu panorâmico e modelos 3D (folhagem, pedra, caixa): [Poly Haven](https://polyhaven.com), licença CC0.
- Biblioteca 3D: [three.js](https://github.com/mrdoob/three.js), licença MIT.
- Fontes: Lilita One e Rubik, via Google Fonts (licença OFL).
