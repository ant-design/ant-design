import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('card demo a11y', () => {
  accessibilityDemoTest('card', {
    disabledRules: ['button-name', 'image-alt'],
    skip: ['tabs.tsx'],
  });
});
