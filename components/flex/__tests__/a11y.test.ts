import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('flex', {
  disabledRules: ['aria-required-children'],
  // waiting for segmented fix
  skip: ['align.tsx'],
});
