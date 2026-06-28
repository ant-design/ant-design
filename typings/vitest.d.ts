/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />

/* eslint-disable vars-on-top */

import type * as React from 'react';
import type { Page } from 'puppeteer';

declare global {
  var page: Page;
  var vitestPuppeteer: {
    resetPage: () => Promise<void>;
  };
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations: () => T;
    toHaveStyle: (css: string | React.CSSProperties | Record<string, unknown>) => T;
  }
}
