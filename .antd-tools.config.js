const fs = require('fs');
const path = require('path');

function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './es'))) {
    // Build less entry file: dist/antd.less
    fs.copyFileSync(
      path.join(process.cwd(), 'components', 'style', 'reset.css'),
      path.join(process.cwd(), 'es', 'style', 'reset.css'),
    );
  }
}

function finalizeDist() {
  if (fs.existsSync(path.join(__dirname, './dist'))) {
    // Build less entry file: dist/antd.less
    fs.copyFileSync(
      path.join(process.cwd(), 'components', 'style', 'reset.css'),
      path.join(process.cwd(), 'dist', 'reset.css'),
    );
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
