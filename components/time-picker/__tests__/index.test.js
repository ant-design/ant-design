import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import { resetWarned } from '../../_util/devWarning';
import rtlTest from '../../../tests/shared/rtlTest';
import { act } from 'react-dom/test-utils';

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
      <TimePicker defaultValue={moment('2000-01-01 00:00:00')} allowClear={false} />,
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
      <TimePicker defaultValue={moment('2000-01-01 00:00:00')} open locale={locale} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should pass dropdownClassName prop to Picker', () => {
    const dropdownClassName = 'myCustomClassName';
    const wrapper = mount(
      <TimePicker
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        dropdownClassName={dropdownClassName}
      />,
    );
    expect(wrapper.find('Picker').last().prop('dropdownClassName')).toEqual(dropdownClassName);
  });

  it('should pass dropdownClassName prop to RangePicker', () => {
    const dropdownClassName = 'myCustomClassName';
    const wrapper = mount(
      <TimePicker.RangePicker
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        dropdownClassName={dropdownClassName}
      />,
    );
    expect(wrapper.find('.ant-picker-range').length).toEqual(1);

    wrapper.find('.ant-picker-range').simulate('click');
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.ant-picker-dropdown').last(0).hasClass('myCustomClassName')).toBeTruthy();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support bordered', () => {
    const wrapper = mount(
      <TimePicker
        className="custom-class"
        defaultValue={moment('2000-01-01 00:00:00')}
        bordered={false}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
