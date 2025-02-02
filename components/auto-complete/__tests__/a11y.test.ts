import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('auto-complete', {
  disabledRules: ['label'],
  skip: ['render-panel.tsx', 'custom.tsx'],
});
