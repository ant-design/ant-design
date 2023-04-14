import { describe } from 'vitest';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('ConfigProvider image', () => {
  imageDemoTest('config-provider', { skip: ['direction.tsx'] });
});
