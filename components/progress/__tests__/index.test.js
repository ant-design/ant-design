import React from 'react';
import { mount } from 'enzyme';
import Progress from '..';
import { handleGradient, sortGradient } from '../Line';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Progress', () => {
  mountTest(Progress);
  rtlTest(Progress);

  it('successPercent should decide the progress status when it exists', () => {
    const wrapper = mount(<Progress percent={100} success={{ percent: 50 }} />);
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(0);

    wrapper.setProps({ percent: 50, success: { percent: 100 } });
    expect(wrapper.find('.ant-progress-status-success')).toHaveLength(1);

    wrapper.setProps({ percent: 100, success: { percent: 0 } });
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

  it('render negative progress', () => {
    const wrapper = mount(<Progress percent={-20} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render negative successPercent', () => {
    const wrapper = mount(<Progress percent={50} success={{ percent: -20 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render format', () => {
    const wrapper = mount(
      <Progress
        percent={50}
        success={{ percent: 10 }}
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

  it('render trailColor progress', () => {
    const wrapper = mount(<Progress status="normal" trailColor="#ffffff" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render successColor progress', () => {
    const wrapper = mount(
      <Progress percent={60} success={{ percent: 30, strokeColor: '#ffffff' }} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render dashboard zero gapDegree', () => {
    const wrapper = mount(<Progress type="dashboard" gapDegree={0} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render dashboard 295 gapDegree', () => {
    const wrapper = mount(<Progress type="dashboard" gapDegree={295} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render dashboard 296 gapDegree', () => {
    const wrapper = mount(<Progress type="dashboard" gapDegree={296} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('get correct line-gradient', () => {
    expect(handleGradient({ from: 'test', to: 'test' }).backgroundImage).toBe(
      'linear-gradient(to right, test, test)',
    );
    expect(handleGradient({}).backgroundImage).toBe('linear-gradient(to right, #1890FF, #1890FF)');
    expect(handleGradient({ from: 'test', to: 'test', '0%': 'test' }).backgroundImage).toBe(
      'linear-gradient(to right, test 0%)',
    );
  });

  it('sort gradients correctly', () => {
    expect(sortGradient({ '10%': 'test10', '30%': 'test30', '20%': 'test20' })).toBe(
      'test10 10%, test20 20%, test30 30%',
    );
    expect(sortGradient({ '10%': 'test10', '30%': 'test30', '20%': 'test20', dummy: 'test' })).toBe(
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

  it('should support steps', () => {
    const wrapper = mount(<Progress steps={3} />);
    expect(wrapper).toMatchRenderedSnapshot();
  });

  it('steps should be changable', () => {
    const wrapper = mount(<Progress steps={5} percent={60} />);
    expect(wrapper.find('.ant-progress-steps-item-active').length).toBe(3);
    wrapper.setProps({ percent: 40 });
    expect(wrapper.find('.ant-progress-steps-item-active').length).toBe(2);
  });

  it('steps should be changable when has strokeColor', () => {
    const wrapper = mount(<Progress steps={5} percent={60} strokeColor="#1890ff" />);
    expect(wrapper.find('.ant-progress-steps-item').at(0).getDOMNode().style.backgroundColor).toBe(
      'rgb(24, 144, 255)',
    );
    wrapper.setProps({ percent: 40 });
    expect(wrapper.find('.ant-progress-steps-item').at(2).getDOMNode().style.backgroundColor).toBe(
      '',
    );
    expect(wrapper.find('.ant-progress-steps-item').at(1).getDOMNode().style.backgroundColor).toBe(
      'rgb(24, 144, 255)',
    );
  });

  it('should warnning if use `progress` in success', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Progress percent={60} success={{ progress: 30 }} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `success.progress` is deprecated. Please use `success.percent` instead.',
    );
  });

  it('should warnning if use `progress` in success in type Circle', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Progress percent={60} success={{ progress: 30 }} type="circle" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `success.progress` is deprecated. Please use `success.percent` instead.',
    );
  });
});
