import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('table', {
  skip: ['virtual-list.tsx'],
  // waiting for fix
  disabledRules: ['label', 'empty-table-header', 'nested-interactive', 'button-name'],
});
