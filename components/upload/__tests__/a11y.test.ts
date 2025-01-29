import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('upload', {
  // Skip due to external dependency issue
  skip: ['drag-sorting.tsx'],
});
