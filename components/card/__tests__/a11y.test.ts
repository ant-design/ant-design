import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('card', {
  disabledRules: ['image-alt'],
  skip: ['tabs.tsx'],
});
