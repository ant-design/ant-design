import type * as React from 'react';
import 'jest-puppeteer';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations: () => R;
      toHaveStyle: (css: string | React.CSSProperties | Record<string, unknown>) => R;
    }
  }
}
