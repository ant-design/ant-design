import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('flex', {
  // waiting for rc-segmented fix
  skip: ['align.tsx'],
});
