import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Affix image', () => {
  imageDemoTest('affix', {
    onlyViewport: ['debug.tsx'],
  });
});
