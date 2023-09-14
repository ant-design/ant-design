import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Select image', () => {
  imageDemoTest('select', {
    skip: ['basic.tsx'],
    onlyViewPort: ['debug-flip-shift.tsx'],
  });
});
