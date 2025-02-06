import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('rate', {
  // waiting for rc-rate fix
  disabledRules: ['listitem'],
});
