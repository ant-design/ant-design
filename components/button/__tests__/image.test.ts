import { describe } from 'vitest';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Button image', () => {
  imageDemoTest('button', { skip: ['loading.tsx'] });
});
