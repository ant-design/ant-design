import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('flex demo a11y', () => {
  accessibilityDemoTest('flex', {
    disabledRules: ['aria-required-children'],
    // waiting for segmented fix
    skip: ['align.tsx'],
  });
});
