import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('progress', {
  // we can set aria attribute to fix it
  disabledRules: ['aria-progressbar-name'],
  // we can set aria attribute to fix it
  skip: ['circle-steps.tsx'],
});
