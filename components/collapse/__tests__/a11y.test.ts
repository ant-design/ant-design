import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('collapse demo a11y', () => {
  accessibilityDemoTest('collapse', { disabledRules: ['label'] });
});
