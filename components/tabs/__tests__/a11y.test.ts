import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tabs', {
  // waiting for fix
  disabledRules: ['aria-required-children'],
  skip: ['custom-indicator.tsx', 'custom-tab-bar-node.tsx', 'nest.tsx'],
});
