import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tree', {
  skip: [
    // Skip large data demos to prevent test timeout
    'virtual-scroll.tsx',
    'big-data.tsx',
  ],
});
