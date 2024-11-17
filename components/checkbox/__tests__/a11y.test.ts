import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('a11y demo test', () => {
  // skip debug demo
  accessibilityDemoTest('checkbox', { skip: ['custom-line-width.tsx'] });
});
