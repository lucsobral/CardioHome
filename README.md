# CardioHome — Exames cardiológicos em casa

Site estático (HTML5 + CSS3 + JavaScript puro, sem frameworks nem dependências de build) da **CardioHome**, serviço de exames cardiológicos domiciliares (Holter, MAPA, VOP e ECG) da CardioHome para Recife e Região Metropolitana.

É uma **página única** navegada por âncoras (`#exames`, `#comparativo`, `#como-funciona`, `#duvidas`, `#contato`), com um comparativo de custo/tempo entre ir até a clínica e receber o técnico em casa. Usa a paleta roxo/violeta da logo (`--color-home`), exceto no hero de vídeo, que mantém o degradê azul.

## Estrutura de pastas

```
/
├── index.html                 Página única da CardioHome
├── .htaccess                  Força charset UTF-8 nas respostas (Apache)
├── css/
│   ├── base.css / base.min.css          Reset, variáveis, tipografia, componentes base
│   ├── layout.css / layout.min.css      Header, nav, footer, hero, blocos comuns
│   └── cardiohome.css / cardiohome.min.css   Cor de marca violeta, hero de vídeo,
│                                             tabela comparativa e FAQ
├── js/
│   └── main.js / main.min.js  Menu responsivo, accordion, scroll suave
├── assets/
│   ├── fonts/    Inter (self-hosted, subconjunto latin, variável)
│   ├── icons/    Favicons
│   ├── img/      Logo CardioHome (header e rodapé) e poster do vídeo do hero
│   └── video/    Vídeo de fundo do hero
└── scripts/
    └── minify.js   Gera os arquivos *.min.css / *.min.js a partir dos fontes
```

`index.html` referencia os arquivos `*.min.css` / `*.min.js` (versão de produção). Depois de editar um arquivo-fonte em `css/` ou `js/`, rode:

```bash
node scripts/minify.js
```

`base.css` e `layout.css` vieram do site institucional e ainda contêm algumas regras usadas apenas lá (ex.: hero padrão, dropdown de menu, formulários). Elas não atrapalham e podem ser podadas com calma.

## Como visualizar localmente

Não há build nem dependências para instalar. Basta servir a pasta como arquivos estáticos:

```bash
# Opção 1 — servidor embutido do Node
npx serve .

# Opção 2 — servidor embutido do Python
python -m http.server 8000
```

Depois acesse `http://localhost:PORTA/`. Abrir o `index.html` com duplo clique (`file://`) também funciona, mas alguns navegadores restringem o mapa incorporado nesse modo — prefira um servidor local.

## Pendências antes de publicar

- **Domínio:** em `index.html`, o `canonical`, o `og:url` e o campo `url` do schema.org apontam para `https://www.cardiohomepe.com.br/`. Se o site for publicado sem o `www` (ou com outro subdomínio), ajuste os três.
- **Contato:** telefone, WhatsApp e e-mail são **placeholders** (`(81) 9.0000-0000` / `wa.me/5581900000000` / `cardiohome@gmail.com`), sinalizados com um aviso na seção `#contato`. Substitua pelos canais definitivos.
- Não há imagem social (`og:image`) de 1200×630 — recomenda-se adicionar uma antes de compartilhar links em redes sociais.
- Não há horário de funcionamento publicado; se existir, adicione ao rodapé, à seção `#contato` e ao schema.org (`openingHours`).
- Vale confirmar se há uma lista de cidades/bairros específica dentro de Recife e Região Metropolitana para a seção de área de atendimento.

## Acessibilidade e SEO

- HTML5 semântico, um único `<h1>`, `skip link`, `aria-expanded` no menu e no accordion.
- Meta title/description, Open Graph e `canonical`.
- Dados estruturados (`schema.org`): `MedicalBusiness`.
- Fonte Inter self-hosted (subconjunto latin, variável) com `font-display: swap` e `preload`, para não depender de terceiros e manter bom LCP.
- O vídeo do hero é `muted`, `autoplay`, `loop`, `playsinline`, com poster estático de fallback e ocultado quando o usuário prefere movimento reduzido (`prefers-reduced-motion`).
