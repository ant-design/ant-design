/// <reference types="jest-environment-puppeteer" />

declare namespace jest {
  interface Matchers<R> {
    toHaveNoViolations: () => R;
  }
}
