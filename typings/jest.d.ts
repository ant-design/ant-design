import type * as React from 'react';

/// <reference types="jest-environment-puppeteer" />
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations: () => R;
      toHaveStyle: (css: string | React.CSSProperties | Record<string, unknown>) => R;
    }
  }
}
