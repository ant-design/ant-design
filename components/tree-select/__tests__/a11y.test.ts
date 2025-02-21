import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('tree-select', {
  // we can set aria attributes to fix it
  disabledRules: ['label'],
  // skip internal debug demo
  skip: ['render-panel.tsx'],
});
