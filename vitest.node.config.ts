import { defineConfig } from 'vitest/config';
import { commonConfig } from './vitest.config';

export default defineConfig({
  ...commonConfig,
  test: {
    include: ['**/node.test.{ts,tsx}'],
    environment: 'node',
    globals: true,
    deps: {},
  },
});
