import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('badge demo a11y', () => {
  accessibilityDemoTest('badge', { disabledRules: ['button-name'] });
});
