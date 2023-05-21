import { defineConfig } from 'vitest/config';
import { commonConfig } from './vitest.config';

export default defineConfig({
  ...commonConfig,
  test: {
    include: ['**/image.test.*'],
    globals: true,
    setupFiles: ['./tests/setup.ts', './tests/setupPuppeteer.ts'],
    environment: 'jsdom',
  },
});
