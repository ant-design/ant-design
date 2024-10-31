import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('alert demo a11y', () => {
  accessibilityDemoTest('alert', { disabledRules: ['button-name'] });
});
