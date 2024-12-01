import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tree', {
  skip: ['virtual-scroll.tsx', 'big-data.tsx'],
  disabledRules: ['button-name', 'label'],
});
