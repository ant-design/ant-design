import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

// Ref: https://github.com/ant-design/ant-design/issues/56858
// Ensure that deep subpath type imports like `antd/es/theme/interface`
// resolve correctly under `moduleResolution: "bundler"` and `"node16"`.
//
// This catches regressions where an `exports` field in package.json
// breaks TypeScript type resolution for directory-based subpath imports.
// TypeScript's exports-based resolution does NOT perform directory/index
// lookups, so wildcard patterns like `"./es/*": { "types": "./es/*.d.ts" }`
// fail for modules that use index.d.ts in subdirectories
// (e.g. `es/theme/interface/index.d.ts`).

const rootDir = path.resolve(__dirname, '../../');
const esDir = path.join(rootDir, 'es');

interface PackageJson {
  exports?: Record<string, unknown>;
}

if (!fs.existsSync(esDir)) {
  console.error(chalk.red('`es` directory not found. Please run build first.'));
  process.exit(1);
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'),
) as PackageJson;

if (!packageJson.exports) {
  console.error(chalk.red('`exports` field not found in package.json.'));
  process.exit(1);
}

const directoryEntrypoints: string[] = [];

const collectDirectoryEntrypoints = (directory: string) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) {
      return;
    }

    const entryPath = path.join(directory, entry.name);
    const indexPath = path.join(entryPath, 'index.js');

    if (fs.existsSync(indexPath)) {
      directoryEntrypoints.push(path.relative(esDir, entryPath).split(path.sep).join('/'));
    }

    collectDirectoryEntrypoints(entryPath);
  });
};

collectDirectoryEntrypoints(esDir);

for (const subpath of directoryEntrypoints) {
  const esExport = packageJson.exports[`./es/${subpath}`];
  const libExport = packageJson.exports[`./lib/${subpath}`];

  if (
    JSON.stringify(esExport) !==
    JSON.stringify({
      types: `./es/${subpath}/index.d.ts`,
      browser: `./es/${subpath}/index.js`,
      import: `./es/${subpath}/index.js`,
      require: `./lib/${subpath}/index.js`,
      node: `./lib/${subpath}/index.js`,
      default: `./es/${subpath}/index.js`,
    })
  ) {
    throw new Error(
      `Missing or stale directory export for ./es/${subpath}. Run \`npm run generate:exports\` after compiling.`,
    );
  }

  if (
    JSON.stringify(libExport) !==
    JSON.stringify({
      types: `./lib/${subpath}/index.d.ts`,
      default: `./lib/${subpath}/index.js`,
    })
  ) {
    throw new Error(
      `Missing or stale directory export for ./lib/${subpath}. Run \`npm run generate:exports\` after compiling.`,
    );
  }
}

if (packageJson.exports['./BUG_VERSIONS.json'] !== './BUG_VERSIONS.json') {
  throw new Error('`BUG_VERSIONS.json` is published but missing from package exports.');
}

const testCases = [
  {
    label: 'directory-based subpath (moduleResolution: bundler)',
    code: [
      `import type { AliasToken } from 'antd/es/theme/interface';`,
      `import Button from 'antd/es/button';`,
      `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
      `const _button: typeof Button = Button;`,
    ],
    compilerOptions: { moduleResolution: 'bundler' },
  },
  {
    label: 'directory-based subpath (moduleResolution: node16)',
    code: [
      `import type { AliasToken } from 'antd/es/theme/interface';`,
      `import Button from 'antd/es/button';`,
      `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
      `const _button: typeof Button = Button;`,
    ],
    compilerOptions: { module: 'node16', moduleResolution: 'node16' },
  },
  {
    label: 'file-based subpath (moduleResolution: bundler)',
    code: [
      `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
      `import Search from 'antd/es/input/Search';`,
      `const _config: ThemeConfig = {};`,
      `const _search: typeof Search = Search;`,
    ],
    compilerOptions: { moduleResolution: 'bundler' },
  },
  {
    label: 'file-based subpath (moduleResolution: node16)',
    code: [
      `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
      `import Search from 'antd/es/input/Search';`,
      `const _config: ThemeConfig = {};`,
      `const _search: typeof Search = Search;`,
    ],
    compilerOptions: { module: 'node16', moduleResolution: 'node16' },
  },
];

const tmpDir = `${__filename}.tmp`;
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

try {
  // Symlink node_modules/antd → project root so `import from 'antd/es/...'` resolves through package.json
  const nodeModulesDir = path.join(tmpDir, 'node_modules');
  const antdLinkDir = path.join(nodeModulesDir, 'antd');
  fs.mkdirSync(nodeModulesDir, { recursive: true });
  fs.symlinkSync(rootDir, antdLinkDir, 'junction');

  const tscBin = path.join(rootDir, 'node_modules', '.bin', 'tsc');

  for (const { label, code, compilerOptions } of testCases) {
    fs.writeFileSync(path.join(tmpDir, 'test-types.ts'), code.join('\n'));

    fs.writeFileSync(
      path.join(tmpDir, 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            ...compilerOptions,
            strict: true,
            skipLibCheck: true,
            noEmit: true,
          },
        },
        null,
        2,
      ),
    );

    execFileSync(tscBin, ['--project', path.join(tmpDir, 'tsconfig.json'), '--noEmit'], {
      cwd: tmpDir,
      stdio: 'pipe',
      timeout: 30_000,
    });
    console.log(chalk.green(`✨ ${label} passed.`));
  }

  execFileSync(
    process.execPath,
    [
      '-e',
      `const entries = [${[
        'antd',
        'antd/es',
        'antd/es/input/Search',
        'antd/es/theme/interface',
        'antd/lib',
        'antd/lib/input/Search',
        'antd/locale',
        'antd/locale/en_US',
        'antd/BUG_VERSIONS.json',
        'antd/package.json',
      ]
        .map((entry) => JSON.stringify(entry))
        .join(',')}];
entries.forEach((entry) => require.resolve(entry));
const inputFromEs = require('antd/es/input');
const inputFromLib = require('antd/lib/input');
if (inputFromEs !== inputFromLib) {
  throw new Error('CommonJS explicit es and lib directory imports must resolve to the same module.');
}`,
    ],
    {
      cwd: tmpDir,
      stdio: 'pipe',
      timeout: 30_000,
    },
  );
  console.log(chalk.green('✨ CommonJS package exports passed.'));

  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `const expected = new Map([
  ['antd/es', '/es/index.js'],
  ['antd/es/input', '/es/input/index.js'],
  ['antd/es/input/Search', '/es/input/Search.js'],
]);
for (const [entry, suffix] of expected) {
  const resolved = new URL(import.meta.resolve(entry)).pathname;
  if (!resolved.endsWith(suffix)) {
    throw new Error(\`\${entry} resolved to \${resolved}, expected an ES path ending in \${suffix}\`);
  }
}`,
    ],
    {
      cwd: tmpDir,
      stdio: 'pipe',
      timeout: 30_000,
    },
  );
  console.log(chalk.green('✨ Node ESM package export conditions passed.'));

  execFileSync(
    process.execPath,
    [
      '--conditions=browser',
      '--input-type=module',
      '-e',
      `const expected = new Map([
  ['antd/es', '/es/index.js'],
  ['antd/es/input', '/es/input/index.js'],
  ['antd/es/input/Search', '/es/input/Search.js'],
]);
for (const [entry, suffix] of expected) {
  const resolved = new URL(import.meta.resolve(entry)).pathname;
  if (!resolved.endsWith(suffix)) {
    throw new Error(\`\${entry} resolved to \${resolved}, expected an ES path ending in \${suffix}\`);
  }
}`,
    ],
    {
      cwd: tmpDir,
      stdio: 'pipe',
      timeout: 30_000,
    },
  );
  console.log(chalk.green('✨ Browser ESM package export conditions passed.'));
} catch (error: unknown) {
  const detail =
    (error as { stdout?: Buffer })?.stdout?.toString() ||
    (error instanceof Error ? error.message : String(error));
  console.error(
    chalk.red(
      'Deep subpath type resolution failed. ' +
        'This is likely caused by a misconfigured `exports` field in package.json. ' +
        'See https://github.com/ant-design/ant-design/issues/56858 for details.',
    ),
  );
  console.error(chalk.red(detail));
  process.exit(1);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
