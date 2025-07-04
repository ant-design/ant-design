import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Upload image', () => {
  imageDemoTest('upload', { skip: ['crop-image.tsx'] });
});
