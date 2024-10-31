import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('auto-complete demo a11y', () => {
  // wait for fix
  accessibilityDemoTest('auto-complete', { skip: ['custom.tsx'] });
});
