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
});
