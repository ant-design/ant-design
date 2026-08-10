import React from 'react';
import type { Page } from 'puppeteer';

import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';
import CustomizeClearDebug from '../demo/customize-clear-debug';

const customizeClearDebugFilename = 'components/auto-complete/demo/customize-clear-debug.tsx';
const customizeClearSelector = '.ant-select-customize.ant-select-allow-clear';

const expectContentNotShifted = async (testPage: Page) => {
  const marginInlineEnd = await testPage.evaluate((selector) => {
    const content = document.querySelector<HTMLElement>(selector);

    if (!content) {
      throw new Error(`Missing content: ${selector}`);
    }

    return getComputedStyle(content).marginInlineEnd;
  }, `${customizeClearSelector} .ant-select-content`);

  expect(marginInlineEnd).toBe('0px');
};

describe('AutoComplete image', () => {
  describe('customize input clear hover', () => {
    imageTest(
      React.createElement(CustomizeClearDebug),
      'auto-complete-customize-clear-debug-hover',
      customizeClearDebugFilename,
      {
        beforeScreenshot: expectContentNotShifted,
        hoverSelector: customizeClearSelector,
      },
    );
  });

  imageDemoTest('auto-complete', {
    skip: ['row-selection-debug.tsx'],
  });
});
