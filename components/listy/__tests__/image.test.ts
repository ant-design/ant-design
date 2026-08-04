import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Listy image', () => {
  imageDemoTest('listy', {
    skip: ['virtual.tsx', 'infinite.tsx'],
  });
});
