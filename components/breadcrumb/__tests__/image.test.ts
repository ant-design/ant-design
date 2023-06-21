import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Breadcrumb image', () => {
  imageDemoTest('breadcrumb', { skip: ['react-router.tsx'] });
});
