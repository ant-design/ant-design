import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('AutoComplete image', () => {
  imageDemoTest('auto-complete', {
    skip: ['row-selection-debug.tsx'],
  });
});
