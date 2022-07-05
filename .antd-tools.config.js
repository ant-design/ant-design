const fs = require('fs');
const path = require('path');

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
  dist: {
    finalize: finalizeDist,
  },
  bail: true,
};
