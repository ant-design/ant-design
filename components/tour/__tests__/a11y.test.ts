import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tour', {
  // we can set aria attributes to fix it
  skip: ['gap.tsx'],
});
