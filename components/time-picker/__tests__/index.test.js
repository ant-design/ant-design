import React from 'react';
import { mount, render } from 'enzyme';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
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
      'Warning: `allowEmpty` is deprecated. Please use `allowClear` instead.',
    );
  });
});
