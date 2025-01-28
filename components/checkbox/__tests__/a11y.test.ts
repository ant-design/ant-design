import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('checkbox', {
  // skip debug demo
  skip: ['custom-line-width.tsx', 'disabled.tsx'],
});
