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
    expect(errorSpy).toBeCalledWith(
      'Warning: `allowEmpty` in TimePicker is deprecated. Please use `allowClear` instead.',
    );
  });

  it('not render clean icon when allowClear is false', () => {
    const wrapper = mount(
      <TimePicker defaultValue={moment('2000-01-01 00:00:00')} allowClear={false} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
