import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('table', {
  skip: ['virtual-list.tsx', 'dynamic-settings.tsx'],
  // waiting for fix
  disabledRules: ['label', 'empty-table-header', 'nested-interactive', 'button-name'],
});
