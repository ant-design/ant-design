import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import { resetWarned } from '../../_util/warning';
import rtlTest from '../../../tests/shared/rtlTest';

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
    const wrapper = mount(<TimePicker addon={addon} open />);

    expect(wrapper.find('.my-btn').length).toBeTruthy();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: TimePicker] `addon` is deprecated. Please use `renderExtraFooter` instead.',
    );
  });

  it('not render clean icon when allowClear is false', () => {
    const wrapper = mount(
      <TimePicker defaultValue={dayjs('2000-01-01 00:00:00')} allowClear={false} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('clearIcon should render correctly', () => {
    const clearIcon = <div className="test-clear-icon">test</div>;
    const wrapper = mount(<TimePicker clearIcon={clearIcon} />);
    expect(wrapper.find('Picker').last().prop('clearIcon')).toEqual(
      <div className="test-clear-icon">test</div>,
    );
  });

  it('prop locale should works', () => {
    const locale = {
      placeholder: 'Избери дата',
    };
    const wrapper = mount(
      <TimePicker defaultValue={dayjs('2000-01-01 00:00:00')} open locale={locale} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should pass popupClassName prop to Picker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const wrapper = mount(
      <TimePicker
        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    expect(wrapper.find('Picker').last().prop('dropdownClassName')).toEqual(popupClassName);
  });

  it('should pass popupClassName prop to RangePicker as dropdownClassName prop', () => {
    const popupClassName = 'myCustomClassName';
    const wrapper = mount(
      <TimePicker.RangePicker
        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
        popupClassName={popupClassName}
      />,
    );
    expect(wrapper.find('RangePicker').at(1).prop('dropdownClassName')).toEqual(popupClassName);
  });

  it('should support bordered', () => {
    const wrapper = mount(
      <TimePicker
        className="custom-class"
        defaultValue={dayjs('2000-01-01 00:00:00')}
        bordered={false}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
