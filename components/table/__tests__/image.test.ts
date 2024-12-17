import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Table image', () => {
  imageDemoTest('table', { skip: ['virtual-list.tsx', 'table-row-selection-debug.tsx'] });
});
