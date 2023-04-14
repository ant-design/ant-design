import { describe } from 'vitest';
import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Steps image', () => {
  imageDemoTest('steps', { skip: ['icon.tsx'] });
});
