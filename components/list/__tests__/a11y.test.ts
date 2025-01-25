import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('list', {
  // waiting for fix
  skip: ['infinite-load.tsx'],
  // we can set alt for img in list demo
  disabledRules: ['image-alt'],
});
