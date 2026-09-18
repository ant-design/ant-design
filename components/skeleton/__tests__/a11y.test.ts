import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('skeleton', {
  // we can set aria attribute to fix it
  skip: ['list.tsx', 'element.tsx'],
});
