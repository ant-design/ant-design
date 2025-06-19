import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('steps', {
  // we can set aria attribute to fix it
  skip: ['inline.tsx', 'title-placement.tsx', 'progress.tsx'],
});
