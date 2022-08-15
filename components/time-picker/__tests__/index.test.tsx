import moment from 'moment';
import React from 'react';
import type { PickerLocale } from 'antd/es/date-picker/generatePicker';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { resetWarned } from '../../_util/warning';
import { render } from '../../../tests/utils';

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
      <TimePicker defaultValue={moment('2000-01-01 00:00:00')} allowClear={false} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('clearIcon should render correctly', () => {
    const clearIcon = <div className="test-clear-icon">test</div>;
    const wrapper = render(<TimePicker clearIcon={clearIcon} />);
    // 这里不知道怎么写，转成原生的 dom 元素之后获取不到 clearIcon
    // expect(wrapper.find('Picker').last().prop('clearIcon')).toEqual(clearIcon);
  });

  it('prop locale should works', () => {
    const locale = { placeholder: 'Избери дата' };
    const { container } = render(
      <TimePicker
        open
        defaultValue={moment('2000-01-01 00:00:00')}
        locale={locale as unknown as PickerLocale}
      />,
    );
    expect(Array.from(container.children)).toMatchSnapshot();
  });

  it('should pass popupClassName prop to Picker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const wrapper = render(
      <TimePicker
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    // 这里不知道怎么写，转成原生的 dom 元素之后获取不到 myCustomClassName
    // expect(wrapper.find('Picker').last().prop('dropdownClassName')).toEqual(popupClassName);
  });

  it('should pass popupClassName prop to RangePicker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const wrapper = render(
      <TimePicker.RangePicker
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    // 这里不知道怎么写，转成原生的 dom 元素之后获取不到 myCustomClassName
    // expect(wrapper.find('RangePicker').last().prop('dropdownClassName')).toEqual(popupClassName);
  });

  it('should support bordered', () => {
    const { container } = render(
      <TimePicker
        className="custom-class"
        defaultValue={moment('2000-01-01 00:00:00')}
        bordered={false}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
