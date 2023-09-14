import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('float-button image', () => {
  imageDemoTest('float-button', { splitTheme: true, onlyViewport: ['back-top.tsx'] });
});
