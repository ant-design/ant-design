import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Layout image', () => {
  imageDemoTest('layout', { skip: ['fixed-sider.tsx'] });
});
