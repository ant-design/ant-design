import React from 'react';
import type { ProgressProps } from '..';
import Progress from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { handleGradient, sortGradient } from '../Line';
import ProgressSteps from '../Steps';
import { render } from '../../../tests/utils';

describe('Progress', () => {
  mountTest(Progress);
  rtlTest(Progress);

  it('successPercent should decide the progress status when it exists', () => {
    const { container: wrapper, rerender } = render(
      <Progress percent={100} success={{ percent: 50 }} />,
    );
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(0);

    rerender(<Progress percent={50} success={{ percent: 100 }} />);
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(1);

    rerender(<Progress percent={100} success={{ percent: 0 }} />);
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(0);
  });

  it('render out-of-range progress', () => {
    const { container: wrapper } = render(<Progress percent={120} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render out-of-range progress with info', () => {
    const { container: wrapper } = render(<Progress percent={120} showInfo />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render negative progress', () => {
    const { container: wrapper } = render(<Progress percent={-20} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render negative successPercent', () => {
    const { container: wrapper } = render(<Progress percent={50} success={{ percent: -20 }} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render format', () => {
    const { container: wrapper } = render(
      <Progress
        percent={50}
        success={{ percent: 10 }}
        format={(percent, successPercent) => `${percent} ${successPercent}`}
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render strokeColor', () => {
    const { container: wrapper, rerender } = render(
      <Progress type="circle" percent={50} strokeColor="red" />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
    rerender(
      <Progress
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
        percent={50}
        type="line"
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
    rerender(
      <Progress
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={50}
        type="line"
      />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render normal progress', () => {
    const { container: wrapper } = render(<Progress status="normal" />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render trailColor progress', () => {
    const { container: wrapper } = render(<Progress status="normal" trailColor="#ffffff" />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render successColor progress', () => {
    const { container: wrapper } = render(
      <Progress percent={60} success={{ percent: 30, strokeColor: '#ffffff' }} />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render successColor progress type="circle"', () => {
    const { container: wrapper } = render(
      <Progress percent={60} type="circle" success={{ percent: 30, strokeColor: '#ffffff' }} />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render successColor progress type="dashboard"', () => {
    const { container: wrapper } = render(
      <Progress percent={60} type="dashboard" success={{ percent: 30, strokeColor: '#ffffff' }} />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render dashboard zero gapDegree', () => {
    const { container: wrapper } = render(<Progress type="dashboard" gapDegree={0} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render dashboard 295 gapDegree', () => {
    const { container: wrapper } = render(<Progress type="dashboard" gapDegree={295} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render dashboard 296 gapDegree', () => {
    const { container: wrapper } = render(<Progress type="dashboard" gapDegree={296} />);
    expect(wrapper.firstChild).toMatchSnapshot();
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
    const { container: wrapper } = render(<Progress percent={100} />);
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/issues/15950
  it('should show success status when percent is 100 and status is undefined', () => {
    const { container: wrapper } = render(<Progress percent={100} status={undefined} />);
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(1);
  });

  // https://github.com/ant-design/ant-design/pull/15951#discussion_r273062969
  it('should show success status when status is invalid', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container: wrapper } = render(
      <Progress percent={100} status={'invalid' as ProgressProps['status']} />,
    );
    expect(wrapper.querySelectorAll('.ant-progress-status-success')).toHaveLength(1);
    errorSpy.mockRestore();
  });

  it('should support steps', () => {
    const { container: wrapper } = render(<Progress steps={3} />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('steps should be changable', () => {
    const { container: wrapper, rerender } = render(<Progress steps={5} percent={60} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(3);
    rerender(<Progress steps={5} percent={40} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(2);
  });

  it('steps should be changable when has strokeColor', () => {
    const { container: wrapper, rerender } = render(
      <Progress steps={5} percent={60} strokeColor="#1890ff" />,
    );
    expect(
      wrapper.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item')[0].style.backgroundColor,
    ).toBe('rgb(24, 144, 255)');
    rerender(<Progress steps={5} percent={40} strokeColor="#1890ff" />);
    expect(
      wrapper.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item')[2].style.backgroundColor,
    ).toBe('');
    expect(
      wrapper.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item')[1].style.backgroundColor,
    ).toBe('rgb(24, 144, 255)');
  });

  it('steps should support trailColor', () => {
    const { container: wrapper } = render(<Progress steps={5} percent={20} trailColor="#1890ee" />);
    expect(
      wrapper.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item')[1].style.backgroundColor,
    ).toBe('rgb(24, 144, 238)');
  });

  it('should display correct step', () => {
    const { container: wrapper, rerender } = render(<Progress steps={9} percent={22.22} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(2);
    rerender(<Progress steps={9} percent={33.33} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(3);
    rerender(<Progress steps={9} percent={44.44} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(4);
  });

  it('steps should have default percent 0', () => {
    const { container } = render(<ProgressSteps steps={0} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should warnning if use `progress` in success', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress percent={60} success={{ progress: 30 }} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `success.progress` is deprecated. Please use `success.percent` instead.',
    );
  });

  it('should warnning if use `progress` in success in type Circle', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress percent={60} success={{ progress: 30 }} type="circle" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `success.progress` is deprecated. Please use `success.percent` instead.',
    );
  });

  // https://github.com/ant-design/ant-design/issues/30685
  describe('github issues', () => {
    it('"Rendered more hooks than during the previous render"', () => {
      expect(() => {
        const { rerender } = render(
          <Progress percent={60} success={{ percent: 0 }} type="circle" />,
        );
        rerender(<Progress percent={60} success={{ percent: 10 }} type="circle" />);
      }).not.toThrow();
    });
  });
});
