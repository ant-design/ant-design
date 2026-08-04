import React from 'react';

import Basic from '../demo/basic';
import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';

describe('Descriptions image', () => {
  imageTest(
    React.createElement(Basic),
    'descriptions-basic',
    'components/descriptions/demo/basic.tsx',
    {
      beforeScreenshot: async (testPage) => {
        const widths = await testPage.$$eval(
          '.ant-descriptions-view > table > tbody > tr:first-child > .ant-descriptions-item',
          (cells) => cells.map((cell) => cell.getBoundingClientRect().width),
        );

        expect(widths).toHaveLength(3);
        expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(1);
      },
    },
  );

  imageDemoTest('descriptions', { skip: ['basic.tsx'] });
});
