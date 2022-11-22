const fs = require('fs');
const path = require('path');

const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');

function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './es'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'es', 'style', 'reset.css'));
  }

  if (fs.existsSync(path.join(__dirname, './lib'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'lib', 'style', 'reset.css'));
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
