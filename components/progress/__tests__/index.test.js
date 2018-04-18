import React from 'react';
import { mount } from 'enzyme';
import Progress from '..';

describe('Progress', () => {
  it('successPercent should decide the progress status when it exists', async () => {
    const wrapper = mount(<Progress percent={100} successPercent={50} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(0);

    wrapper.setProps({ percent: 50, successPercent: 100 });
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);
  });

  it('render out-of-range progress', async () => {
    const wrapper = mount(<Progress percent={120} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render out-of-range progress with info', async () => {
    const wrapper = mount(<Progress percent={120} showInfo />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render negetive progress', async () => {
    const wrapper = mount(<Progress percent={-20} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render negetive successPercent', async () => {
    const wrapper = mount(<Progress percent={50} successPercent={-20} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
