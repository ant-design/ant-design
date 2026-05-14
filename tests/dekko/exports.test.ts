import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

// Ref: https://github.com/ant-design/ant-design/issues/56858
// Ensure that deep subpath type imports like `antd/es/theme/interface`
// resolve correctly under moduleResolution: "bundler".
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
  console.log(chalk.yellow('⏭ `es` directory not found, skipping exports type check.'));
} else {
  const tmpDir = `${__filename}.tmp`;
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // Symlink node_modules/antd → project root so `import from 'antd/es/...'` triggers package.json exports
    const nodeModulesDir = path.join(tmpDir, 'node_modules');
    const antdLinkDir = path.join(nodeModulesDir, 'antd');
    fs.mkdirSync(nodeModulesDir, { recursive: true });
    fs.symlinkSync(rootDir, antdLinkDir, 'junction');

    // moduleResolution: "bundler" — Vite default
    fs.writeFileSync(
      path.join(tmpDir, 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            moduleResolution: 'bundler',
            strict: true,
            skipLibCheck: true,
            noEmit: true,
          },
        },
        null,
        2,
      ),
    );

    // Test directory-based and file-based deep subpath type imports
    fs.writeFileSync(
      path.join(tmpDir, 'test-types.ts'),
      [
        `import type { AliasToken } from 'antd/es/theme/interface';`,
        `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
        `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
        `const _config: ThemeConfig = {};`,
      ].join('\n'),
    );

    const tscBin = path.join(rootDir, 'node_modules', '.bin', 'tsc');
    execFileSync(tscBin, ['--project', path.join(tmpDir, 'tsconfig.json'), '--noEmit'], {
      cwd: tmpDir,
      stdio: 'pipe',
      timeout: 30_000,
    });

    console.log(chalk.green('✨ Deep subpath type resolution passed (moduleResolution: bundler).'));
  } catch (error: unknown) {
    const detail =
      (error as { stdout?: Buffer })?.stdout?.toString() ||
      (error instanceof Error ? error.message : String(error));
    console.error(
      chalk.red(
        'Deep subpath type resolution failed under moduleResolution: "bundler". ' +
          'This is likely caused by a misconfigured `exports` field in package.json. ' +
          'See https://github.com/ant-design/ant-design/issues/56858 for details.',
      ),
    );
    console.error(chalk.red(detail));
    process.exit(1);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}
