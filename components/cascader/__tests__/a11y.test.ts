import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('cascader demo a11y', () => {
  // skip _InternalPanelDoNotUseOrYouWillBeFired
  accessibilityDemoTest('cascader', { skip: ['render-panel.tsx'] });
});
