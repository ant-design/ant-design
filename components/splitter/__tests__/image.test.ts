import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Splitter image', () => {
  imageDemoTest('splitter', { skip: ['size-mix'] });
});
