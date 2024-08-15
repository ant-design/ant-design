import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Popover image', () => {
  imageDemoTest('popover', {
    onlyViewport: ['shift.tsx', 'arrow-point-at-center.tsx'],
  });
});
