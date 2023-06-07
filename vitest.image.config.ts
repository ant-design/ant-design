import { defineConfig } from 'vitest/config';
import { commonConfig } from './vitest.config';

export default defineConfig({
  test: {
    ...commonConfig.test,
    include: ['components/config-provider/__tests__/image.test.{ts,tsx}'],
    globals: true,
    setupFiles: ['./tests/setupPuppeteer.ts'],
    environment: 'jsdom',
    maxThreads: 2,
    minThreads: 2,
  },
});
