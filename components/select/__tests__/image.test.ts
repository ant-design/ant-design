import React from 'react';
import type { Page } from 'puppeteer';

import ClearSuffixDebug from '../demo/clear-suffix-debug';
import LineHeightDebug from '../demo/line-height-debug';
import imageTest, { imageDemoTest } from '../../../tests/shared/imageTest';

const clearSuffixDebugFilename = 'components/select/demo/clear-suffix-debug.tsx';
const lineHeightDebugFilename = 'components/select/demo/line-height-debug.tsx';
const interactiveSuffixSelector = '.ant-select-show-arrow';
const selectSelector = '.ant-select';
const singleSelector = '.ant-select-single';

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

const expectLineHeightKeepsControlHeight = async (testPage: Page) => {
  const selects = await testPage.evaluate(
    (selector, singleClsSelector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)).map((select) => {
        const content = select.querySelector<HTMLElement>(`${selector}-content`);

        if (!content) {
          throw new Error(`Missing content: ${selector}`);
        }

        const style = getComputedStyle(select);
        const readVar = (name: string) => Number.parseFloat(style.getPropertyValue(name));

        return {
          single: select.matches(singleClsSelector),
          height: select.getBoundingClientRect().height,
          controlHeight: readVar('--ant-select-height'),
          contentLineHeight: Number.parseFloat(getComputedStyle(content).lineHeight),
          tokenLineHeight: readVar('--ant-select-font-size') * readVar('--ant-select-line-height'),
        };
      }),
    selectSelector,
    singleSelector,
  );

  expect(selects).not.toHaveLength(0);

  selects.forEach(({ single, height, controlHeight, contentLineHeight, tokenLineHeight }) => {
    expect(height).toBe(controlHeight);

    if (single) {
      expect(contentLineHeight).toBeCloseTo(tokenLineHeight, 3);
    }
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
      { beforeScreenshot: expectLineHeightKeepsControlHeight },
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
