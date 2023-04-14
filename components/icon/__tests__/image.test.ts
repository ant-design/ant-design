import { describe } from 'vitest';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Icon image', () => {
  imageDemoTest('icon', { skip: ['basic.tsx'] });
});
