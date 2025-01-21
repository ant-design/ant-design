import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

describe('grid demo a11y', () => {
  accessibilityDemoTest('grid', {
    // waiting for slider fix
    skip: ['playground.tsx'],
  });
});
