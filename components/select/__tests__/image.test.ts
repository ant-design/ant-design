import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Select image', () => {
  imageDemoTest('select', {
    mobile: ['basic.tsx'],
    skip: ['debug-flip-shift.tsx'],
  });
});
