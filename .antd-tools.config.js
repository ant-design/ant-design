const fs = require('node:fs');
const path = require('node:path');

const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');
const antdCssPath = path.join(process.cwd(), 'components', 'style', 'antd.css');
const tokenStatisticPath = path.join(process.cwd(), 'components', 'version', 'token.json');
const tokenMetaPath = path.join(process.cwd(), 'components', 'version', 'token-meta.json');

function collectDirectoryEntrypoints(outputDir) {
  const outputPath = path.join(process.cwd(), outputDir);
  const entrypoints = [];

  const collect = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        collect(entryPath);
      } else if (entry.name === 'index.js' && directory !== outputPath) {
        entrypoints.push(path.relative(outputPath, directory).split(path.sep).join('/'));
      }
    });
  };

  collect(outputPath);

  return entrypoints.sort();
}

function generatePackageExports() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const directoryEntrypoints = collectDirectoryEntrypoints('es');
  const baseExports = Object.entries(packageJson.exports).filter(
    ([subpath]) => !/^\.\/(?:es|lib)\/(?!\*)/.test(subpath),
  );
  const esExports = {};
  const libExports = {};

  directoryEntrypoints.forEach((subpath) => {
    const libIndex = path.join(process.cwd(), 'lib', subpath, 'index.js');

    if (!fs.existsSync(libIndex)) {
      throw new Error(`Missing CommonJS directory entrypoint: lib/${subpath}/index.js`);
    }

    esExports[`./es/${subpath}`] = {
      types: `./es/${subpath}/index.d.ts`,
      browser: `./es/${subpath}/index.js`,
      node: `./lib/${subpath}/index.js`,
      import: `./es/${subpath}/index.js`,
      require: `./lib/${subpath}/index.js`,
      default: `./es/${subpath}/index.js`,
    };
    libExports[`./lib/${subpath}`] = {
      types: `./lib/${subpath}/index.d.ts`,
      default: `./lib/${subpath}/index.js`,
    };
  });

  const exports = {};

  baseExports.forEach(([subpath, target]) => {
    exports[subpath] = target;

    if (subpath === './es/*') {
      Object.assign(exports, esExports);
    } else if (subpath === './lib/*') {
      Object.assign(exports, libExports);
    }
  });

  packageJson.exports = exports;
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
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
  generatePackageExports,
};
