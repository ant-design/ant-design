import { execSync } from 'node:child_process';
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
  process.exit(0);
}

// Use a stable temp path inside the project (same convention as check-cssinjs.tsx)
// so leftover files are visible and easy to clean up if the process is interrupted.
const tmpDir = path.join(`${__filename}.tmp`);
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(tmpDir, { recursive: true });

try {
  // Simulate an npm-installed antd by creating a node_modules/antd symlink
  // so that `import from 'antd/es/...'` triggers package.json exports resolution
  const nodeModulesDir = path.join(tmpDir, 'node_modules');
  const antdLinkDir = path.join(nodeModulesDir, 'antd');
  fs.mkdirSync(nodeModulesDir, { recursive: true });
  fs.symlinkSync(rootDir, antdLinkDir, 'junction');

  // tsconfig with moduleResolution: "bundler" (default for Vite projects)
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

  // Test file that imports types via package name (same as downstream consumers)
  // - Directory-based subpath: antd/es/theme/interface → es/theme/interface/index.d.ts
  // - File-based subpath: antd/es/config-provider/context → es/config-provider/context.d.ts
  fs.writeFileSync(
    path.join(tmpDir, 'test-types.ts'),
    [
      `import type { AliasToken } from 'antd/es/theme/interface';`,
      `import type { ThemeConfig } from 'antd/es/config-provider/context';`,
      // Verify the imported types are not empty/any by checking known properties
      `const _check: Pick<AliasToken, 'colorText' | 'fontSize' | 'controlHeight' | 'screenXS'> = {} as AliasToken;`,
      `const _config: ThemeConfig = {};`,
    ].join('\n'),
  );

  const tscBin = path.join(rootDir, 'node_modules', '.bin', 'tsc');
  execSync(`${tscBin} --project ${path.join(tmpDir, 'tsconfig.json')} --noEmit`, {
    cwd: tmpDir,
    stdio: 'pipe',
    timeout: 30_000,
  });

  console.log(chalk.green('✨ Deep subpath type resolution passed (moduleResolution: bundler).'));
} catch (error: any) {
  console.error(
    chalk.red(
      'Deep subpath type resolution failed under moduleResolution: "bundler". ' +
        'This is likely caused by a misconfigured `exports` field in package.json. ' +
        'See https://github.com/ant-design/ant-design/issues/56868 for details.',
    ),
  );
  console.error(chalk.red(error.stdout?.toString() || error.message));
  process.exit(1);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
