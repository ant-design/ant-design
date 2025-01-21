import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('segmented demo a11y', () => {
  accessibilityDemoTest('segmented', {
    disabledRules: ['aria-allowed-attr'],
    skip: ['custom.tsx', 'size-consistent.tsx'],
  });
});
