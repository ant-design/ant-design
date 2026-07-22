const fs = require('node:fs');
const path = require('node:path');

const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');
const antdCssPath = path.join(process.cwd(), 'components', 'style', 'antd.css');
const tokenStatisticPath = path.join(process.cwd(), 'components', 'version', 'token.json');
const tokenMetaPath = path.join(process.cwd(), 'components', 'version', 'token-meta.json');

function hasDefaultExport(source) {
  if (/(?:^|\n)export default\b/m.test(source)) {
    return true;
  }

  const reExportPattern = /(?:^|\n)export\s*\{([^}]*)\}\s+from/gm;
  let match = reExportPattern.exec(source);

  while (match) {
    const hasDefault = match[1].split(',').some((specifier) => {
      const normalized = specifier.trim();
      return normalized === 'default' || /\bas\s+default$/.test(normalized);
    });

    if (hasDefault) {
      return true;
    }

    match = reExportPattern.exec(source);
  }

  return false;
}

function generateIndexProxiesFor(outputDir, moduleType) {
  const outputPath = path.join(process.cwd(), outputDir);
  const indexFiles = [];

  const collectIndexFiles = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        collectIndexFiles(entryPath);
      } else if (entry.name === 'index.js' && directory !== outputPath) {
        indexFiles.push(entryPath);
      }
    });
  };

  collectIndexFiles(outputPath);

  indexFiles.forEach((indexFile) => {
    const directory = path.dirname(indexFile);
    const importPath = `./${path.basename(directory)}/index`;
    const declarationIndex = path.join(directory, 'index.d.ts');
    const source = fs.readFileSync(indexFile, 'utf8');
    const directive = source.trimStart().startsWith('"use client";') ? '"use client";\n\n' : '';

    if (moduleType === 'commonjs') {
      fs.writeFileSync(
        `${directory}.js`,
        `${directive}module.exports = require('${importPath}');\n`,
      );
    } else {
      const exports = [`export * from '${importPath}';`];

      if (hasDefaultExport(source)) {
        exports.push(`export { default } from '${importPath}';`);
      }

      fs.writeFileSync(`${directory}.js`, `${directive}${exports.join('\n')}\n`);
    }

    if (fs.existsSync(declarationIndex)) {
      const declaration = fs.readFileSync(declarationIndex, 'utf8');
      const exports = [`export * from '${importPath}';`];

      if (hasDefaultExport(declaration)) {
        exports.push(`export { default } from '${importPath}';`);
      }

      fs.writeFileSync(`${directory}.d.ts`, `${exports.join('\n')}\n`);
    }
  });
}

function generateIndexProxies() {
  generateIndexProxiesFor('es', 'module');
  generateIndexProxiesFor('lib', 'commonjs');
}

function finalizeCompile() {
  if (fs.existsSync(path.join(__dirname, './es'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'es', 'style', 'reset.css'));
    fs.copyFileSync(antdCssPath, path.join(process.cwd(), 'es', 'style', 'antd.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'es', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'es', 'version', 'token-meta.json'));
  }

  if (fs.existsSync(path.join(__dirname, './lib'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'lib', 'style', 'reset.css'));
    fs.copyFileSync(antdCssPath, path.join(process.cwd(), 'lib', 'style', 'antd.css'));
    fs.copyFileSync(tokenStatisticPath, path.join(process.cwd(), 'lib', 'version', 'token.json'));
    fs.copyFileSync(tokenMetaPath, path.join(process.cwd(), 'lib', 'version', 'token-meta.json'));
  }
}

function finalizeDist() {
  if (fs.existsSync(path.join(__dirname, './dist'))) {
    fs.copyFileSync(restCssPath, path.join(process.cwd(), 'dist', 'reset.css'));
    fs.copyFileSync(antdCssPath, path.join(process.cwd(), 'dist', 'antd.css'));
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
  generateIndexProxies,
};
