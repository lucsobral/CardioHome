// Minificador simples para os arquivos CSS/JS do site (sem dependências externas).
// Uso: node scripts/minify.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function minifyCSS(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '') // comentários
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJS(src) {
  // Remove comentários de linha e de bloco preservando strings/URLs simples,
  // depois colapsa espaços em branco redundantes entre tokens.
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

const cssFiles = ['base.css', 'layout.css', 'cardiohome.css'];
cssFiles.forEach((file) => {
  const src = fs.readFileSync(path.join(root, 'css', file), 'utf8');
  const out = minifyCSS(src);
  const outName = file.replace('.css', '.min.css');
  fs.writeFileSync(path.join(root, 'css', outName), out);
  console.log('css/' + outName + ' (' + out.length + ' bytes)');
});

const jsFiles = ['main.js'];
jsFiles.forEach((file) => {
  const src = fs.readFileSync(path.join(root, 'js', file), 'utf8');
  const out = minifyJS(src);
  const outName = file.replace('.js', '.min.js');
  fs.writeFileSync(path.join(root, 'js', outName), out);
  console.log('js/' + outName + ' (' + out.length + ' bytes)');
});
