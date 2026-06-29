import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Statistic image', () => {
  imageDemoTest('statistic', {
    ssr: ['timer.tsx'],
  });
});
