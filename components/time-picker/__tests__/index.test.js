import React from 'react';
import { mount, render } from 'enzyme';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import TimePicker from '..';

describe('TimePicker', () => {
  it('renders addon correctly', () => {
    const addon = () => (<button>Ok</button>);
    const wrapper = mount(<TimePicker addon={addon} />);
    const rcTimePicker = wrapper.find(RcTimePicker);
    const addonWrapper = render(rcTimePicker.props().addon());

    expect(addonWrapper).toMatchSnapshot();
  });
});
