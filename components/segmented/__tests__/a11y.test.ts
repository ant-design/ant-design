import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('segmented', {
  // we can add aria attributes to fix it
  skip: ['custom.tsx', 'size-consistent.tsx'],
  // waiting for rc-segmented fix
  disabledRules: ['aria-allowed-attr'],
});
