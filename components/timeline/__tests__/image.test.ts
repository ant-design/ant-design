import { describe } from 'vitest';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Timeline image', () => {
  imageDemoTest('timeline', { skip: ['pending.tsx'] });
});
