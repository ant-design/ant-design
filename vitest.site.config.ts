import { defineConfig } from 'vitest/config';
import { commonConfig } from './vitest.config';

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    include: ['scripts/check-site.ts'],
    globals: true,
    environment: 'node',
  },
});
