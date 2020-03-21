import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import { resetWarned } from '../../_util/warning';
import rtlTest from '../../../tests/shared/rtlTest';

describe('TimePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  focusTest(TimePicker, true);
  mountTest(TimePicker);
  rtlTest(TimePicker);

  it('warning for addon', () => {
    resetWarned();
    const addon = () => (
      <button className="my-btn" type="button">
        Ok
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
    expect(wrapper.find('Picker').prop('clearIcon')).toEqual(
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
});
