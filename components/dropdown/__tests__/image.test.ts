import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Dropdown image', () => {
  imageDemoTest('dropdown', { skip: ['dropdown-button.tsx'] });
});
