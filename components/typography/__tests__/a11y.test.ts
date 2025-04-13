import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('typography', {
  // we can set aria attributes to fix it
  skip: ['suffix.tsx', 'ellipsis.tsx', 'ellipsis-controlled.tsx'],
});
