import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('List image', () => {
  imageDemoTest('list', { skip: ['loadmore.md'] });
});
