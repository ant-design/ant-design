import React from 'react';
import type { Page } from 'puppeteer';

import ClearSuffixDebug from '../demo/clear-suffix-debug';
import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';

const clearSuffixDebugFilename = 'components/select/demo/clear-suffix-debug.tsx';
const interactiveSuffixSelector = '.ant-select-show-arrow';

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

describe('Select image', () => {
  imageDemoTest('select', {
    mobile: ['basic.tsx'],
    skip: ['debug-flip-shift.tsx'],
  });

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

    describe('touch', () => {
      beforeAll(async () => {
        await jestPuppeteer.resetPage();
      });

      imageTest(
        React.createElement(ClearSuffixDebug),
        'select-clear-suffix-debug-touch',
        clearSuffixDebugFilename,
        { beforeScreenshot: expectSuffixNotHitTarget, mobile: true },
      );
    });
  });
});
