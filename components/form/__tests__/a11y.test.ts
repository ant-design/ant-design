import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('form', {
  // waiting for fix
  disabledRules: ['label', 'aria-allowed-attr', 'button-name', 'listitem', 'aria-input-field-name'],
});
