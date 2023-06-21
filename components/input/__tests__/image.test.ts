import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Input image', () => {
  imageDemoTest('input', { skip: ['search-input-loading.tsx'] });
});
