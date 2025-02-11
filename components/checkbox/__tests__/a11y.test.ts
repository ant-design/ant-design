import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('checkbox', {
  // we can set aria attributes to fix it
  skip: ['custom-line-width.tsx', 'disabled.tsx'],
});
