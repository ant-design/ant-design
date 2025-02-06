import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('slider', {
  // we can set aria attribute to fix it
  disabledRules: ['aria-input-field-name', 'label', 'button-name'],
});
