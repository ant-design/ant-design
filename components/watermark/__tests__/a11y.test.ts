import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('watermark', {
  // we can add aria attributes to fix it
  skip: ['custom.tsx'],
});
