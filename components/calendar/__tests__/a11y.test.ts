import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('calendar', {
  // waiting for rc-picker fix
  skip: ['week.tsx'],
  // fix in another pr
  disabledRules: ['label'],
});
