import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Menu image', () => {
  imageDemoTest('menu', { skip: ['scrollable-submenu.tsx'] });
  imageDemoTest('menu', {
    only: ['scrollable-submenu.tsx'],
    openTriggerClassName: 'scrollable-submenu-popup',
  });
});
