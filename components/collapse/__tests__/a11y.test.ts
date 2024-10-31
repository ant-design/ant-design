import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('collapse demo a11y', () => {
  // wait for rc-collapse fix
  accessibilityDemoTest('collapse', { skip: ['collapsible.tsx'] });
});
