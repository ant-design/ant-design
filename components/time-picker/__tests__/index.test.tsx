import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

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
});
