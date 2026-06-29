import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('pagination', {
  // waiting for @rc-component/pagination fix
  skip: ['simple.tsx'],
});
