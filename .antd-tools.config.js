const fs = require('fs');
const path = require('path');
const { replaceStyleKeys, isStyleFile } = require('./scripts/generate-envPrepare-util');

// =================================================================
// ==                            Style                            ==
// =================================================================
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

// =================================================================
// ==                         Mini Bundle                         ==
// =================================================================

// Convert `style/xxx.ts` file to hashed map to min bundle size
function transformTSFile(file) {
  if (!isStyleFile(file.path)) {
    return;
  }

  const cloneFile = file.clone();

  // Replacement
  const replacedContent = replaceStyleKeys(file.contents.toString());

  if (file.path.includes('date-picker')) {
    console.log('replacedContent', replacedContent);
    process.exit(1);
  }

  cloneFile.contents = Buffer.from(replacedContent);
  return cloneFile;
}

module.exports = {
  compile: {
    finalize: finalizeCompile,
    transformTSFile,
  },
  dist: {
    finalize: finalizeDist,
  },

  bail: true,
};
