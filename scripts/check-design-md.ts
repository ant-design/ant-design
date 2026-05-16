import { execSync } from 'node:child_process';
import path from 'node:path';

const target = path.resolve(process.cwd(), 'public/design.md');

try {
  execSync(`npx --no-install design.md lint "${target}"`, { stdio: 'inherit' });
} catch {
  process.exitCode = 1;
}
