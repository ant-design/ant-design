import React, { useState } from 'react';
import { Tooltip } from 'antd';

import type { ProgressProps } from '..';
import Progress from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { handleGradient, sortGradient } from '../Line';
import { ProgressTypes } from '../progress';

describe('Progress', () => {
  mountTest(Progress);
  rtlTest(Progress);

  beforeEach(() => {
    resetWarned();
  });

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

  it('render strokeWidth of progress', () => {
    const { container } = render(<Progress type="circle" percent={30} strokeWidth={50} />);
    expect(container).toMatchSnapshot();
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
      <Progress strokeColor={{ from: '#108ee9', to: '#87d068' }} percent={50} type="line" />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
    rerender(
      <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} percent={50} type="line" />,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render normal progress', () => {
    const { container: wrapper } = render(<Progress status="normal" />);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render trailColor progress', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container: wrapper } = render(<Progress status="normal" trailColor="#ffffff" />);
    expect(wrapper.firstChild).toMatchSnapshot();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `trailColor` is deprecated. Please use `railColor` instead.',
    );

    errSpy.mockRestore();
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
    expect(handleGradient({ from: 'test', to: 'test' }).background).toBe(
      'linear-gradient(to right, test, test)',
    );
    expect(handleGradient({}).background).toBe('linear-gradient(to right, #1677FF, #1677FF)');
    expect(handleGradient({ from: 'test', to: 'test', '0%': 'test' }).background).toBe(
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

  it('steps should be changeable', () => {
    const { container: wrapper, rerender } = render(<Progress steps={5} percent={60} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(3);
    rerender(<Progress steps={5} percent={40} />);
    expect(wrapper.querySelectorAll('.ant-progress-steps-item-active').length).toBe(2);
  });

  it('steps should be changeable when has strokeColor', () => {
    const { container, rerender } = render(
      <Progress steps={5} percent={60} strokeColor="#1677ff" />,
    );
    const eles = container.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item');
    expect(eles[0]).toHaveStyle({ backgroundColor: 'rgb(22, 119, 255)' });
    rerender(<Progress steps={5} percent={40} strokeColor="#1677ff" />);
    expect(eles[2]).toHaveStyle({ backgroundColor: '' });
    expect(eles[1]).toHaveStyle({ backgroundColor: 'rgb(22, 119, 255)' });
  });

  it('steps should support trailColor', () => {
    const { container } = render(<Progress steps={5} percent={20} trailColor="#1890ee" />);
    expect(container.querySelectorAll<HTMLDivElement>('.ant-progress-steps-item')[1]).toHaveStyle({
      backgroundColor: 'rgb(24, 144, 238)',
    });
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
    const { container } = render(<Progress steps={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should warnning if use `width` prop', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress percent={60} width={100} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `width` is deprecated. Please use `size` instead.',
    );
  });

  it('should warnning if use `strokeWidth` prop in type Line', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress percent={60} strokeWidth={10} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] `strokeWidth` is deprecated. Please use `size` instead.',
    );
  });

  it('should warnning if pass number[] into `size` in type Circle', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress size={[60, 20]} type="circle" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] Type "circle" and "dashboard" do not accept array as `size`, please use number or preset size instead.',
    );
  });

  it('should not warning if not pass the `size` prop in type Circle', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    errorSpy.mockClear();
    render(<Progress type="circle" />);
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should warnning if pass number[] into `size` in type dashboard', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress size={[60, 20]} type="dashboard" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] Type "circle" and "dashboard" do not accept array as `size`, please use number or preset size instead.',
    );
  });
  it('should warnning if pass object into `size` in type dashboard', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Progress size={{ width: 60, height: 20 }} type="dashboard" />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Progress] Type "circle" and "dashboard" do not accept object as `size`, please use number or preset size instead.',
    );
  });

  it('should update the percentage based on the value of percent', () => {
    const Content: React.FC = () => {
      const [percent, setPercent] = useState(0);

      return (
        <>
          {ProgressTypes.map((type) => (
            <Progress key={type} type={type} percent={percent} success={{ percent: 30 }} />
          ))}
          <button type="button" onClick={() => setPercent(10)}>
            Change Percent
          </button>
        </>
      );
    };

    const { container } = render(<Content />);
    expect(container.querySelectorAll('[title="0%"]')).toHaveLength(ProgressTypes.length);
    // Change Percent
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(container.querySelectorAll('[title="10%"]')).toHaveLength(ProgressTypes.length);
  });

  describe('github issues', () => {
    // https://github.com/ant-design/ant-design/issues/30685
    it('Rendered more hooks than during the previous render', () => {
      expect(() => {
        const { rerender } = render(
          <Progress percent={60} success={{ percent: 0 }} type="circle" />,
        );
        rerender(<Progress percent={60} success={{ percent: 10 }} type="circle" />);
      }).not.toThrow();
    });

    // https://github.com/ant-design/ant-design/issues/40377
    it('should not throw error when percent is null', () => {
      expect(() => {
        render(<Progress percent={null as unknown as number} />);
      }).not.toThrow();
    });
  });

  describe('progress size', () => {
    const App = (props: { size: ProgressProps['size'] }) => (
      <>
        <Progress size={props.size} />
        <Progress size={props.size} steps={3} />
        <Progress type="circle" size={props.size} />
        <Progress type="dashboard" size={props.size} />
      </>
    );

    const { container, rerender } = render(<App size={30} />);
    expect(container.querySelector('.ant-progress-steps .ant-progress-steps-item')).toHaveStyle({
      width: '30px',
      height: '30px',
    });
    expect(container.querySelectorAll('.ant-progress-circle .ant-progress-body')[0]).toHaveStyle({
      width: '30px',
      height: '30px',
    });
    expect(container.querySelectorAll('.ant-progress-circle .ant-progress-body')[1]).toHaveStyle({
      width: '30px',
      height: '30px',
    });

    rerender(<App size={[60, 20]} />);

    expect(container.querySelector('.ant-progress-line .ant-progress-body')).toHaveStyle({
      width: '60px',
    });
    expect(container.querySelector('.ant-progress-line .ant-progress-rail')).toHaveStyle({
      height: '20px',
    });
    expect(container.querySelector('.ant-progress-steps .ant-progress-steps-item')).toHaveStyle({
      width: '60px',
      height: '20px',
    });
    expect(container.querySelectorAll('.ant-progress-circle .ant-progress-body')[0]).toHaveStyle({
      width: '60px',
      height: '60px',
    });
    expect(container.querySelectorAll('.ant-progress-circle .ant-progress-body')[1]).toHaveStyle({
      width: '60px',
      height: '60px',
    });

    rerender(<App size={{ width: 60, height: 20 }} />);

    expect(container.querySelector('.ant-progress-line .ant-progress-body')).toHaveStyle({
      width: '60px',
    });
    expect(container.querySelector('.ant-progress-line .ant-progress-rail')).toHaveStyle({
      height: '20px',
    });
    expect(container.querySelector('.ant-progress-steps .ant-progress-steps-item')).toHaveStyle({
      width: '60px',
      height: '20px',
    });
  });

  it('no strict warning', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { rerender } = render(
      <Tooltip title="当前已使用60%">
        <Progress percent={60} type="circle" />
      </Tooltip>,
    );
    rerender(
      <Tooltip title="当前已使用60%">
        <Progress percent={60} type="circle" />
      </Tooltip>,
    );
    expect(errSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('findDOMNode is deprecated in StrictMode'),
    );
    errSpy.mockRestore();
  });

  it('should be accessible', () => {
    const { container: wrapper, rerender } = render(
      <Progress percent={70} aria-label="My progress" />,
    );
    let progress = wrapper.querySelector('[role="progressbar"]');
    expect(progress).toHaveAttribute('aria-label', 'My progress');
    expect(progress).toHaveAttribute('aria-valuenow', '70');

    rerender(
      <>
        <span id="progressLabel">My progress</span>
        <Progress percent={90} aria-labelledby="progressLabel" />
      </>,
    );
    progress = wrapper.querySelector('[role="progressbar"]');
    expect(progress).toHaveAttribute('aria-labelledby', 'progressLabel');
    expect(progress).toHaveAttribute('aria-valuenow', '90');
  });

  it('circle progress should accept steps', () => {
    const { container } = render(<Progress percent={70} steps={{ count: 5, gap: 5 }} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('circle progress steps can be number', () => {
    const { container } = render(<Progress percent={70} steps={5} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show inner info position', () => {
    const { container, rerender } = render(
      <Progress
        percent={0}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[200, 20]}
      />,
    );
    expect(
      container.querySelector('.ant-progress-line-align-center.ant-progress-line-position-inner'),
    ).toBeTruthy();

    rerender(
      <Progress
        percent={100}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[400, 20]}
      />,
    );
    expect(container.querySelector('.ant-progress-indicator-inner')).toBeTruthy();

    rerender(<Progress percent={100} percentPosition={{ align: 'center', type: 'outer' }} />);
    expect(container.querySelector('.ant-progress-body-layout-bottom')).toBeTruthy();
  });

  it('render inner info position', () => {
    const { container } = render(
      <Progress
        percent={100}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={[400, 20]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render multi-value progress', () => {
    const { container } = render(
      <Progress
        percent={[
          { value: 40, status: 'success' },
          { value: 30, status: 'active' },
          { value: 20, status: 'exception' },
        ]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render multi-value progress with custom strokeColor', () => {
    const { container } = render(
      <Progress
        percent={[
          { value: 25, status: 'success', strokeColor: '#52c41a' },
          { value: 35, status: 'active', strokeColor: '#1890ff' },
          { value: 15, status: 'exception', strokeColor: '#ff4d4f' },
        ]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should calculate total percent from multi-value array', () => {
    const { container } = render(
      <Progress
        percent={[
          { value: 30, status: 'success' },
          { value: 50, status: 'active' },
          { value: 20, status: 'normal' },
        ]}
        showInfo
      />,
    );
    const indicator = container.querySelector('.ant-progress-indicator');
    expect(indicator?.textContent).toBe('100%');
  });

  it('should maintain backward compatibility with single number percent', () => {
    const { container } = render(<Progress percent={50} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should warn when using multi-value with circle type', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Progress
        type="circle"
        percent={[
          { value: 40, status: 'success' },
          { value: 30, status: 'active' },
        ]}
      />,
    );
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('should warn when using multi-value with dashboard type', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Progress
        type="dashboard"
        percent={[
          { value: 40, status: 'success' },
          { value: 30, status: 'active' },
        ]}
      />,
    );
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });
});
