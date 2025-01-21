import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('checkbox demo a11y', () => {
  // skip debug demo
  accessibilityDemoTest('checkbox', { skip: ['custom-line-width.tsx', 'disabled.tsx'] });
});
