import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Tag image', () => {
  imageDemoTest('tag', { skip: ['status.tsx'] });
});
