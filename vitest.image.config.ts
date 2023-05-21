import { defineConfig } from 'vitest/config';
import { commonConfig } from './vitest.config';

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    include: ['components/*/__tests__/image.test.{ts,tsx}'],
    globals: true,
    setupFiles: ['./tests/setup.ts', './tests/setupPuppeteer.ts'],
    environment: 'jsdom',
  },
});
