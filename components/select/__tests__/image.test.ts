import React from 'react';
import type { Page } from 'puppeteer';

import ClearSuffixDebug from '../demo/clear-suffix-debug';
import LineHeightDebug from '../demo/line-height-debug';
import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';

const clearSuffixDebugFilename = 'components/select/demo/clear-suffix-debug.tsx';
const lineHeightDebugFilename = 'components/select/demo/line-height-debug.tsx';
const interactiveSuffixSelector = '.ant-select-show-arrow';
const singleSelector = '.ant-select-single';
const multipleSelector = '.ant-select-multiple';

const expectSuffixNotHitTarget = async (testPage: Page) => {
  const suffixHit = await testPage.evaluate((selector) => {
    const suffix = document.querySelector<HTMLElement>(selector);

    if (!suffix) {
      throw new Error(`Missing suffix: ${selector}`);
    }

    const { left, top, width, height } = suffix.getBoundingClientRect();
    const target = document.elementFromPoint(left + width / 4, top + height / 2);

    return target === suffix || suffix.contains(target);
  }, `${interactiveSuffixSelector} .ant-select-suffix`);

  expect(suffixHit).toBe(false);
};

const expectHeightKeepsControlHeight = async (testPage: Page) => {
  const heights = await testPage.evaluate(
    (selectors) =>
      selectors.map((selector) => {
        const select = document.querySelector<HTMLElement>(selector);

        if (!select) {
          throw new Error(`Missing select: ${selector}`);
        }

        const controlHeight = getComputedStyle(select).getPropertyValue('--ant-select-height');

        return [select.getBoundingClientRect().height, Number.parseFloat(controlHeight)];
      }),
    [singleSelector, multipleSelector],
  );

  heights.forEach(([height, controlHeight]) => {
    expect(height).toBe(controlHeight);
  });
};

describe('Select image', () => {
  describe('clear suffix hover', () => {
    describe('interactive suffix', () => {
      imageTest(
        React.createElement(ClearSuffixDebug),
        'select-clear-suffix-debug-interactive-hover',
        clearSuffixDebugFilename,
        {
          beforeScreenshot: expectSuffixNotHitTarget,
          hoverSelector: interactiveSuffixSelector,
        },
      );
    });

    describe('no suffix', () => {
      imageTest(
        React.createElement(ClearSuffixDebug),
        'select-clear-suffix-debug-no-suffix-hover',
        clearSuffixDebugFilename,
        { hoverSelector: '.ant-select-allow-clear:not(.ant-select-show-arrow)' },
      );
    });
  });

  describe('custom line height token', () => {
    imageTest(
      React.createElement(LineHeightDebug),
      'select-line-height-debug',
      lineHeightDebugFilename,
      { beforeScreenshot: expectHeightKeepsControlHeight },
    );
  });

  imageDemoTest('select', {
    mobile: ['basic.tsx'],
    skip: ['debug-flip-shift.tsx', 'line-height-debug.tsx'],
  });

  describe('clear suffix touch', () => {
    imageTest(
      React.createElement(ClearSuffixDebug),
      'select-clear-suffix-debug-touch',
      clearSuffixDebugFilename,
      { beforeScreenshot: expectSuffixNotHitTarget, mobile: true },
    );
  });
});
