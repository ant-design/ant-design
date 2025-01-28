import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('pagination', {
  // waiting for rc-pagination fix
  skip: ['simple.tsx'],
});
