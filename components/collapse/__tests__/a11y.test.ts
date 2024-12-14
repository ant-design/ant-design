import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('collapse demo a11y', () => {
  accessibilityDemoTest('collapse', { skip: ['extra.tsx'] });
});
