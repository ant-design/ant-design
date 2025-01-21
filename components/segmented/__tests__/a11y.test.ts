import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('segmented', {
  disabledRules: ['aria-allowed-attr'],
  skip: ['custom.tsx', 'size-consistent.tsx'],
});
