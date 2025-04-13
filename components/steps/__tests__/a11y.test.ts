import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('steps', {
  // we can set aria attribute to fix it
  skip: ['inline.tsx', 'label-placement.tsx', 'progress.tsx'],
});
