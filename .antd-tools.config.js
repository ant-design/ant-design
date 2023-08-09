const fs = require('fs');
const path = require('path');
const styleMap = require('./~tmpSheet.json');

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
const KEY_LIST = Object.keys(styleMap);

// Convert `style/xxx.ts` file to hashed map to min bundle size
function transformTSFile(file) {
  if (!/components\/[^/]+\/style/.test(file.path)) {
    return;
  }

  const cloneFile = file.clone();

  // Replacement
  let matched = false;
  let leftQuota = 0;
  const lines = file.contents.toString().split('\n');
  const parsedLines = lines.map((line) => {
    let newLine = line;

    // Only start when called `return {}` which is in the CSSObject

    if (newLine.includes(' return {') || newLine.includes(' => ({')) {
      leftQuota += 1;
      return newLine;
    }

    if (leftQuota === 0) {
      return newLine;
    }

    if (newLine.trim().endsWith('{')) {
      leftQuota += 1;
    } else if (newLine.trim().startsWith('}')) {
      leftQuota -= 1;
    }

    KEY_LIST.forEach((key) => {
      const keyMatch = ` ${key}: `;
      if (newLine.includes(keyMatch)) {
        matched = true;
        newLine = newLine.replace(keyMatch, ` [r.${styleMap[key]}]: `);
      }
    });

    return newLine;
  });

  if (matched) {
    const content = [`import r from '../../style/sheet';`, ...parsedLines].join('\n');
    // if (file.path.includes('/notification/')) {
    //   console.log(content);
    //   process.exit(1);
    // }
    cloneFile.contents = Buffer.from(content);
    return cloneFile;
  }
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
