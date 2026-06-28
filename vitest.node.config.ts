import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

import baseConfig from './vitest.config';

const r = (p: string) => resolve(__dirname, p);
const base = baseConfig as any;

export default defineConfig({
  ...base,
  test: {
    ...base.test,
    environment: 'node',
    setupFiles: [r('tests/setup.ts')],
    include: ['components/**/__tests__/node.test.{ts,tsx}'],
    exclude: ['**/node_modules/**'],
  },
});
