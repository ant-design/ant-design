import React from 'react';
import { mount, render } from 'enzyme';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import moment from 'moment';
import TimePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('TimePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  focusTest(TimePicker);

  it('renders addon correctly', () => {
    const addon = () => <button type="button">Ok</button>;
    const wrapper = mount(<TimePicker addon={addon} />);
    const rcTimePicker = wrapper.find(RcTimePicker);
    const addonWrapper = render(rcTimePicker.props().addon());

    expect(addonWrapper).toMatchSnapshot();
  });

  it('allowEmpty deprecated', () => {
    mount(<TimePicker allowEmpty />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: TimePicker] `allowEmpty` is deprecated. Please use `allowClear` instead.',
    );
  });

  it('not render clean icon when allowClear is false', () => {
    const wrapper = mount(
      <TimePicker defaultValue={moment('2000-01-01 00:00:00')} allowClear={false} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('handleChange should work correctly', done => {
    const date = moment('2000-01-01 00:00:00');
    const onChange = (value, formattedValue) => {
      expect(value).toBe(date);
      expect(formattedValue).toBe(date.format('HH:mm:ss'));
      done();
    };
    const wrapper = mount(<TimePicker onChange={onChange} />).instance();
    wrapper.handleChange(date);
  });

  it('handleOpenClose should work correctly', done => {
    const onOpenChange = open => {
      expect(open).toBe(true);
      done();
    };
    const wrapper = mount(<TimePicker onOpenChange={onOpenChange} />).instance();
    wrapper.handleOpenClose({ open: true });
  });

  it('clearIcon should render correctly', () => {
    const clearIcon = <div className="test-clear-icon">test</div>;
    const wrapper = mount(<TimePicker clearIcon={clearIcon} />);
    expect(wrapper.find('Picker').prop('clearIcon')).toEqual(
      <div className="test-clear-icon ant-time-picker-clear">test</div>,
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
