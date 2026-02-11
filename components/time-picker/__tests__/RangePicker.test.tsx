import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

dayjs.extend(customParseFormat);

const { RangePicker } = TimePicker;

describe('TimeRangePicker', () => {
  focusTest(RangePicker, { refFocus: true, blurDelay: 110 });

  it('should pass popupClassName prop to RangePicker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const { container } = render(
      <TimePicker.RangePicker
        open
        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    expect(container.querySelector(`.${popupClassName}`)).toBeTruthy();
  });

  it('should support classNames and styles', () => {
    const testClassNames = {
      root: 'test-root',
      prefix: 'test-prefix',
      input: 'test-input',
      suffix: 'test-suffix',
    };
    const testPopupClassNames = {
      root: 'test-popup-root',
      content: 'test-popup-content',
      item: 'test-popup-item',
    };
    const mergedTestClassNames = {
      ...testClassNames,
      popup: testPopupClassNames,
    };

    const testStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(0, 0, 255)' },
      input: { color: 'rgb(0, 255, 0)' },
      suffix: { color: 'rgb(255, 255, 0)' },
    };
    const testPopupStyles = {
      root: { color: 'rgb(128, 0, 128)' },
      content: { color: 'rgb(0, 255, 255)' },
      item: { color: 'rgb(255, 0, 255)' },
    };
    const mergedTestStyles = {
      ...testStyles,
      popup: testPopupStyles,
    };

    const checkElement = (
      container: HTMLElement,
      selector: string,
      className: string,
      style: React.CSSProperties,
    ): void => {
      const element = container.querySelector(selector);
      expect(element).toHaveClass(className);
      const styleString = Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join('; ');
      expect(element).toHaveStyle(styleString);
    };
    const testSelectors: { key: keyof typeof testClassNames; selector: string }[] = [
      { key: 'root', selector: '.ant-picker' },
      { key: 'prefix', selector: '.ant-picker-prefix' },
      { key: 'input', selector: '.ant-picker-input input' },
      { key: 'suffix', selector: '.ant-picker-suffix' },
    ];

    const testPopupSelectors: {
      key: keyof typeof testPopupClassNames;
      selector: string;
    }[] = [
      { key: 'root', selector: '.ant-picker-dropdown' },
      { key: 'content', selector: '.ant-picker-content' },
      { key: 'item', selector: '.ant-picker-time-panel-cell' },
    ];

    const { container } = render(
      <TimePicker.RangePicker
        open
        classNames={mergedTestClassNames}
        styles={mergedTestStyles}
        prefix="prefix"
      />,
    );

    testSelectors.forEach(({ key, selector }) => {
      checkElement(container, selector, testClassNames[key], testStyles[key]);
    });
    testPopupSelectors.forEach(({ key, selector }) => {
      checkElement(container, selector, testPopupClassNames[key], testPopupStyles[key]);
    });
  });

  describe('suffixIcon', () => {
    it('should support suffixIcon prop', () => {
      const { container } = render(<RangePicker suffixIcon="foobar" />);
      expect(container.querySelector('.ant-picker-suffix')!.textContent).toBe('foobar');
    });

    it('should support suffixIcon prop in config provider', () => {
      const { container } = render(
        <ConfigProvider timePicker={{ suffixIcon: 'foobar' }}>
          <RangePicker />
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-picker-suffix')!.textContent).toBe('foobar');
    });

    it('should omit DatePicker suffixIcon prop in config provider', () => {
      const { container } = render(
        <ConfigProvider timePicker={{ suffixIcon: 'time' }} datePicker={{ suffixIcon: 'date' }}>
          <RangePicker />
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-picker-suffix')!.textContent).toBe('time');
    });

    it('should prefer suffixIcon prop over config provider', () => {
      const { container } = render(
        <ConfigProvider timePicker={{ suffixIcon: 'foobar' }}>
          <RangePicker suffixIcon="bamboo" />
        </ConfigProvider>,
      );
      expect(container.querySelector('.ant-picker-suffix')!.textContent).toBe('bamboo');
    });
  });
});
