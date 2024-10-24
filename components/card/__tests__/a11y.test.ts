import { accessibilityDemoTest } from '../../../tests/shared/accessibilityTest';

describe('card demo a11y', () => {
  accessibilityDemoTest('card', { skip: ['loading.tsx', 'meta.tsx', 'tabs.tsx'] });
});
