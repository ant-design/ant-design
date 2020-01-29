import React from 'react';
import { mount } from 'enzyme';
import Progress from '..';
import { handleGradient, sortGradient } from '../Line';
import mountTest from '../../../tests/shared/mountTest';

describe('Progress', () => {
  mountTest(Progress);

  it('successPercent should decide the progress status when it exists', () => {
    const wrapper = mount(<Progress percent={100} successPercent={50} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(0);

    wrapper.setProps({ percent: 50, successPercent: 100 });
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);

    wrapper.setProps({ percent: 100, successPercent: 0 });
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(0);
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
    wrapper.setProps({
      strokeColor: {
        from: '#108ee9',
        to: '#87d068',
      },
      type: 'line',
    });
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('render normal progress', () => {
    const wrapper = mount(<Progress status="normal" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('get correct line-gradient', () => {
    expect(handleGradient({ from: 'test', to: 'test' }).backgroundImage).toBe(
      'linear-gradient(to right, test, test)',
    );
    expect(handleGradient({}).backgroundImage).toBe('linear-gradient(to right, #1890ff, #1890ff)');
    expect(handleGradient({ from: 'test', to: 'test', '0%': 'test' }).backgroundImage).toBe(
      'linear-gradient(to right, test 0%)',
    );
  });

  it('sort gradients correctly', () => {
    expect(sortGradient({ '10%': 'test10', '30%': 'test30', '20%': 'test20' })).toBe(
      'test10 10%, test20 20%, test30 30%',
    );
  });

  it('should show success status when percent is 100', () => {
    const wrapper = mount(<Progress percent={100} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/15950
  it('should show success status when percent is 100 and status is undefined', () => {
    const wrapper = mount(<Progress percent={100} status={undefined} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/pull/15951#discussion_r273062969
  it('should show success status when status is invalid', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = mount(<Progress percent={100} status="invalid" />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);
    errorSpy.mockRestore();
  });
});
