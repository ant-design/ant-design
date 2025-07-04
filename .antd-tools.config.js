const fs = require('fs');
const path = require('path');

const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');
const tokenStatisticPath = path.join(process.cwd(), 'components', 'version', 'token.json');
const tokenMetaPath = path.join(process.cwd(), 'components', 'version', 'token-meta.json');

function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './es'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'es', 'style', 'reset.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'es', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'es', 'version', 'token-meta.json'));
  }

  if (fs.existsSync(path.join(__dirname, './lib'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'lib', 'style', 'reset.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'lib', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'lib', 'version', 'token-meta.json'));
  }
}

function finalizeDist() {
  if (fs.existsSync(path.join(__dirname, './dist'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'dist', 'reset.css'));
  }
}

module.exports = {
  compile: {
    finalize: finalizeCompile,
  },
  dist: {
    finalize: finalizeDist,
  },
  bail: true,
};
