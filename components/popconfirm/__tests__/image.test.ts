import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Popconfirm image', () => {
  imageDemoTest('popconfirm', {
    onlyViewport: ['shift.tsx'],
  });
});
