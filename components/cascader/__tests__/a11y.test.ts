import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('cascader', {
  // we can set aria-label to fix it
  disabledRules: ['label'],
  // skip internal demo
  skip: ['render-panel.tsx'],
});
