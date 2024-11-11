import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

// skip _InternalPanelDoNotUseOrYouWillBeFired
accessibilityDemoTest('color-picker', { skip: ['pure-panel.tsx'] });
