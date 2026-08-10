import React from 'react';
import type { Page } from 'puppeteer';

import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';
import CustomizeClearDebug from '../demo/customize-clear-debug';

const customizeClearDebugFilename = 'components/auto-complete/demo/customize-clear-debug.tsx';
const customizeClearSelector = '.ant-select-customize.ant-select-allow-clear';
const customizeClearInputSelector = `${customizeClearSelector}:has(input.ant-select-input)`;
const customizeClearTextAreaSelector = `${customizeClearSelector}:has(textarea.ant-select-input)`;

const hoverAndExpectContentNotShifted = async (testPage: Page, selector: string) => {
  await testPage.hover(selector);

  const { hovered, marginInlineEnd } = await testPage.evaluate((rootSelector) => {
    const root = document.querySelector<HTMLElement>(rootSelector);

    if (!root) {
      throw new Error(`Missing root: ${rootSelector}`);
    }

    const content = root.querySelector<HTMLElement>('.ant-select-content');

    if (!content) {
      throw new Error(`Missing content: ${rootSelector}`);
    }

    return {
      hovered: root.matches(':hover'),
      marginInlineEnd: getComputedStyle(content).marginInlineEnd,
    };
  }, selector);

  expect(hovered).toBe(true);
  expect(marginInlineEnd).toBe('0px');
};

const expectContentNotShifted = async (testPage: Page) => {
  await hoverAndExpectContentNotShifted(testPage, customizeClearInputSelector);
  await hoverAndExpectContentNotShifted(testPage, customizeClearTextAreaSelector);
};

describe('AutoComplete image', () => {
  describe('customize input clear hover', () => {
    imageTest(
      React.createElement(CustomizeClearDebug),
      'auto-complete-customize-clear-debug-hover',
      customizeClearDebugFilename,
      { beforeScreenshot: expectContentNotShifted },
    );
  });

  imageDemoTest('auto-complete', {
    skip: ['customize-clear-debug.tsx', 'row-selection-debug.tsx'],
  });
});
