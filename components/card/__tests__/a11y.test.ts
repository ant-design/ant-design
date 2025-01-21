import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('card', {
  disabledRules: ['button-name', 'image-alt'],
  skip: ['tabs.tsx'],
});
