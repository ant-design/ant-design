import { accessibilityDemoTest } from '../../../tests/shared/accessibilityTest';

describe('badge demo a11y', () => {
  accessibilityDemoTest('badge', { skip: ['no-wrapper.tsx', 'change.tsx'] });
});
