import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('calendar', {
  // fix in another pr
  disabledRules: ['label'],
});
