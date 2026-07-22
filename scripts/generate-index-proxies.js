const fs = require('node:fs');
const path = require('node:path');

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

function generateIndexProxies(outputDir, moduleType) {
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

generateIndexProxies('es', 'module');
generateIndexProxies('lib', 'commonjs');
