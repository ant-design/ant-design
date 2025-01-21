import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('calendar demo a11y', () => {
  accessibilityDemoTest('calendar', {
    // waiting for rc-picker fix
    skip: ['week.tsx'],
    // fix in another pr
    disabledRules: ['label'],
  });
});
