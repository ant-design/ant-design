import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('skeleton', {
  // waiting for fix
  disabledRules: ['empty-heading'],
  // we can set aria attribute to fix it
  skip: ['list.tsx', 'element.tsx'],
});
