import React from 'react';
import { debounce } from 'throttle-debounce';

import Spin from '..';
import { act, render } from '../../../tests/utils';

jest.mock('throttle-debounce');
(debounce as jest.Mock).mockImplementation((...args: any[]) =>
  jest.requireActual('throttle-debounce').debounce(...args),
);

describe('minDuration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should keep spinning until minDuration has elapsed', () => {
    const { container, rerender } = render(<Spin spinning minDuration={500} />);

    act(() => jest.advanceTimersByTime(200));
    rerender(<Spin spinning={false} minDuration={500} />);

    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');

    act(() => jest.advanceTimersByTime(299));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');

    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');
  });

  it('should close immediately when minDuration has elapsed', () => {
    const { container, rerender } = render(<Spin spinning minDuration={500} />);

    act(() => jest.advanceTimersByTime(500));
    rerender(<Spin spinning={false} minDuration={500} />);

    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');
  });

  it('should start minDuration after delay', () => {
    const { container, rerender } = render(<Spin spinning delay={200} minDuration={500} />);

    act(() => jest.advanceTimersByTime(199));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');

    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');

    act(() => jest.advanceTimersByTime(100));
    rerender(<Spin spinning={false} delay={200} minDuration={500} />);

    act(() => jest.advanceTimersByTime(399));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');

    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');
  });

  it('should not restart delay when minDuration changes', () => {
    const { container, rerender } = render(<Spin spinning delay={500} minDuration={500} />);

    act(() => jest.advanceTimersByTime(400));
    rerender(<Spin spinning delay={500} minDuration={1000} />);

    act(() => jest.advanceTimersByTime(99));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');

    act(() => jest.advanceTimersByTime(1));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');
  });

  it('should not apply minDuration when spinning ends before delay', () => {
    const { container, rerender } = render(<Spin spinning delay={500} minDuration={1000} />);

    act(() => jest.advanceTimersByTime(100));
    rerender(<Spin spinning={false} delay={500} minDuration={1000} />);
    act(() => jest.advanceTimersByTime(1000));

    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');
  });

  it('should preserve the current visible period when spinning becomes true again', () => {
    const { container, rerender } = render(<Spin spinning minDuration={500} />);

    act(() => jest.advanceTimersByTime(100));
    rerender(<Spin spinning={false} minDuration={500} />);

    act(() => jest.advanceTimersByTime(100));
    rerender(<Spin spinning minDuration={500} />);

    act(() => jest.advanceTimersByTime(300));
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'true');

    rerender(<Spin spinning={false} minDuration={500} />);
    expect(container.querySelector('.ant-spin')).toHaveAttribute('aria-busy', 'false');
  });
});
