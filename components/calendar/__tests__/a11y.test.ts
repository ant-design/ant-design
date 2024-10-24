import { accessibilityDemoTest } from '../../../tests/shared/accessibilityTest';

describe('calendar demo a11y', () => {
  accessibilityDemoTest('calendar', { skip: ['customize-header.tsx', 'lunar.tsx'] });
});
