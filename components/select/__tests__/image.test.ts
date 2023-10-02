import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Select image', () => {
  imageDemoTest('select', {
    splitTheme: ['debug-flip-shift.tsx'],
  });
});
