import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tabs', {
  // waiting for fix
  skip: ['custom-indicator.tsx', 'extra.tsx', 'nest.tsx', 'custom-tab-bar-node.tsx'],
});
