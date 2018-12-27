import React from 'react';
import { mount } from 'enzyme';
import Progress from '..';

describe('Progress', () => {
  it('successPercent should decide the progress status when it exists', () => {
    const wrapper = mount(<Progress percent={100} successPercent={50} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(0);

    wrapper.setProps({ percent: 50, successPercent: 100 });
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);
  });

  it('render out-of-range progress', () => {
    const wrapper = mount(<Progress percent={120} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render out-of-range progress with info', () => {
    const wrapper = mount(<Progress percent={120} showInfo />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render negetive progress', () => {
    const wrapper = mount(<Progress percent={-20} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render negetive successPercent', () => {
    const wrapper = mount(<Progress percent={50} successPercent={-20} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render format', () => {
    const wrapper = mount(
      <Progress
        percent={50}
        successPercent={10}
        format={(percent, successPercent) => `${percent} ${successPercent}`}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render strokeColor', () => {
    const wrapper = mount(<Progress type="circle" percent={50} strokeColor="red" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render normal progress', () => {
    const wrapper = mount(<Progress status="normal" />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
