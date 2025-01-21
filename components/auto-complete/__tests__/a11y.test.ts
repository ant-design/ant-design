import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('auto-complete demo a11y', () => {
  accessibilityDemoTest('auto-complete', {
    disabledRules: ['label'],
    skip: ['render-panel.tsx', 'custom.tsx'],
  });
});
