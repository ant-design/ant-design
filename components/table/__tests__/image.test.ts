import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Table image', () => {
  imageDemoTest('table', { skip: ['virtual-list.tsx', 'row-selection-debug.tsx'] });
});
