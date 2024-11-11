import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('avatar demo a11y', () => {
  accessibilityDemoTest('avatar', { disabledRules: ['image-alt'] });
});
