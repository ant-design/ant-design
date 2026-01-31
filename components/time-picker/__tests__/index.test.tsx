import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { TimePickerProps, TimePickerSemanticType } from '..';
import TimePicker from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

dayjs.extend(customParseFormat);

describe('TimePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  focusTest(TimePicker, { refFocus: true });
  mountTest(TimePicker);
  rtlTest(TimePicker);

  it('warning for addon', () => {
    resetWarned();
    const addon = () => (
      <button className="my-btn" type="button">
        OK
      </button>
    );
    const { container } = render(<TimePicker addon={addon} open />);
    expect(container.querySelectorAll('.my-btn').length).toBeTruthy();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: TimePicker] `addon` is deprecated. Please use `renderExtraFooter` instead.',
    );
  });

  it('not render clean icon when allowClear is false', () => {
    const { container } = render(
      <TimePicker defaultValue={dayjs('2000-01-01 00:00:00')} allowClear={false} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('clearIcon should render correctly', () => {
    const clearIcon = <div className="test-clear-icon">test</div>;
    const { container } = render(
      <TimePicker clearIcon={clearIcon} value={dayjs('00:00:00', 'HH:mm:ss')} />,
    );
    expect(container.querySelector('.test-clear-icon')).toBeTruthy();
  });

  it('prop locale should works', () => {
    const locale = {
      placeholder: 'Избери дата',
    };
    const { container } = render(
      <TimePicker defaultValue={dayjs('2000-01-01 00:00:00')} open locale={locale as any} />,
    );
    expect(Array.from(container.children)).toMatchSnapshot();
  });

  it('should pass popupClassName prop to Picker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const { container } = render(
      <TimePicker
        open
        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    expect(container.querySelector(`.${popupClassName}`)).toBeTruthy();
  });

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

  it('should support bordered', () => {
    const { container } = render(
      <TimePicker
        className="custom-class"
        defaultValue={dayjs('2000-01-01 00:00:00')}
        bordered={false}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should support classNames and styles', () => {
    const testClassNames: TimePickerProps['classNames'] = {
      root: 'test-root',
      prefix: 'test-prefix',
      input: 'test-input',
      suffix: 'test-suffix',
    };
    const testPopupClassNames: NonNullable<TimePickerSemanticType['classNames']>['popup'] = {
      root: 'test-popup-root',
      content: 'test-popup-content',
      item: 'test-popup-item',
    };
    const mergedTestClassNames: TimePickerProps['classNames'] = {
      ...testClassNames,
      popup: testPopupClassNames,
    };

    const testStyles: TimePickerProps['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      prefix: { color: 'rgb(0, 0, 255)' },
      input: { color: 'rgb(0, 255, 0)' },
      suffix: { color: 'rgb(255, 255, 0)' },
    };
    const testPopupStyles: NonNullable<TimePickerSemanticType['styles']>['popup'] = {
      root: { color: 'rgb(128, 0, 128)' },
      content: { color: 'rgb(0, 255, 255)' },
      item: { color: 'rgb(255, 0, 255)' },
    };
    const mergedTestStyles: TimePickerProps['styles'] = {
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

    // Test TimePicker
    const { container } = render(
      <TimePicker
        open
        classNames={mergedTestClassNames}
        styles={mergedTestStyles}
        prefix="prefix"
        defaultValue={dayjs('2000-01-01 00:00:00')}
      />,
    );

    testSelectors.forEach(({ key, selector }) => {
      checkElement(
        container,
        selector,
        (testClassNames as Record<string, string>)[key],
        (testStyles as Record<string, React.CSSProperties>)[key],
      );
    });
    testPopupSelectors.forEach(({ key, selector }) => {
      checkElement(
        container,
        selector,
        (testPopupClassNames as any)[key],
        (testPopupStyles as any)[key],
      );
    });

    // Test TimePicker.RangePicker
    const { container: rangePickerContainer } = render(
      <TimePicker.RangePicker
        open
        classNames={mergedTestClassNames}
        styles={mergedTestStyles}
        prefix="prefix"
      />,
    );

    testSelectors.forEach(({ key, selector }) => {
      checkElement(
        rangePickerContainer,
        selector,
        (testClassNames as Record<string, string>)[key],
        (testStyles as Record<string, React.CSSProperties>)[key],
      );
    });
    testPopupSelectors.forEach(({ key, selector }) => {
      checkElement(
        rangePickerContainer,
        selector,
        testPopupClassNames[key] as string,
        testPopupStyles[key] as React.CSSProperties,
      );
    });
  });

  it('should merge context and component classNames and styles correctly', () => {
    const componentClassNames = {
      root: 'component-root',
      prefix: 'component-prefix',
    };

    const componentStyles = {
      root: { padding: '8px' },
      prefix: { color: 'red' },
    };

    const { container } = render(
      <TimePicker
        classNames={componentClassNames}
        styles={componentStyles}
        prefix={<span>Prefix</span>}
        defaultValue={dayjs('10:20:30', 'HH:mm:ss')}
      />,
    );

    const rootElement = container.querySelector('.ant-picker');
    expect(rootElement).toHaveClass('component-root');
    expect(rootElement).toHaveStyle('padding: 8px');

    const prefixElement = container.querySelector('.ant-picker-prefix');
    expect(prefixElement).toHaveClass('component-prefix');
    expect(prefixElement).toHaveStyle('color: rgb(255, 0, 0)');
  });
});
