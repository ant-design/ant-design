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

if (!fs.existsSync(esDir)) {
  console.error(chalk.red('`es` directory not found. Please run build first.'));
  process.exit(1);
}

const testCases = [
  {
    label: 'directory-based subpath (moduleResolution: bundler)',
    code: [
      `import type { AliasToken } from 'antd/es/theme/interface';`,
      `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
    ],
    compilerOptions: { moduleResolution: 'bundler' },
  },
  {
    label: 'directory-based subpath (moduleResolution: node16)',
    code: [
      `import type { AliasToken } from 'antd/es/theme/interface';`,
      `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
    ],
    compilerOptions: { module: 'node16', moduleResolution: 'node16' },
  },
  {
    label: 'file-based subpath (moduleResolution: bundler)',
    code: [
      `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
      `const _config: ThemeConfig = {};`,
    ],
    compilerOptions: { moduleResolution: 'bundler' },
  },
  {
    label: 'file-based subpath (moduleResolution: node16)',
    code: [
      `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
      `const _config: ThemeConfig = {};`,
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
