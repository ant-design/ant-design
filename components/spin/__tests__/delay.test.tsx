import { render } from '@testing-library/react';
import React from 'react';
import { debounce } from 'throttle-debounce';
import Spin from '..';
import { waitFakeTimer } from '../../../tests/utils';

vi.mock('throttle-debounce', async (importOriginal) => {
  const { debounce: debounceOriginal } = await importOriginal<typeof import('throttle-debounce')>();
  return {
    debounce: vi.fn(debounceOriginal),
  };
});

describe('delay spinning', () => {
  it("should render with delay when it's mounted with spinning=true and delay", () => {
    const { container } = render(<Spin spinning delay={500} />);
    expect(container.querySelector('.ant-spin')?.classList.contains('ant-spin-spinning')).toEqual(
      false,
    );
  });

  it('should render when delay is init set', async () => {
    vi.useFakeTimers();
    const { container } = render(<Spin spinning delay={100} />);

    expect(container.querySelector('.ant-spin-spinning')).toBeFalsy();

    await waitFakeTimer();

    expect(container.querySelector('.ant-spin-spinning')).toBeTruthy();

    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should cancel debounce function when unmount', () => {
    const debouncedFn: any = vi.fn();
    const cancel = vi.fn();
    debouncedFn.cancel = cancel;
    vi.mocked(debounce).mockReturnValueOnce(debouncedFn);
    const { unmount } = render(<Spin spinning delay={100} />);

    expect(cancel).not.toHaveBeenCalled();
    unmount();
    expect(cancel).toHaveBeenCalled();
  });

  it('should close immediately', async () => {
    vi.useFakeTimers();
    const { container, rerender } = render(<Spin spinning delay={500} />);

    await waitFakeTimer();
    expect(container.querySelector('.ant-spin-spinning')).toBeTruthy();

    rerender(<Spin spinning={false} delay={500} />);
    expect(container.querySelector('.ant-spin-spinning')).toBeFalsy();
  });
});
