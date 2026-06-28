import React from 'react';
import { render } from '@testing-library/react';
import { debounce } from 'throttle-debounce';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import Spin from '..';
import { waitFakeTimer } from '../../../tests/utils';

vi.mock('throttle-debounce', async () => {
  const actual = await vi.importActual<typeof import('throttle-debounce')>('throttle-debounce');

  return {
    ...actual,
    debounce: vi.fn((...args: Parameters<typeof actual.debounce>) => actual.debounce(...args)),
  };
});

describe('delay spinning', () => {
  it("should render with delay when it's mounted with spinning=true and delay", () => {
    const { container } = render(<Spin spinning delay={500} />);
    expect(container.querySelector('.ant-spin')).not.toHaveClass('ant-spin-spinning');
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
    const debouncedFn = vi.fn();
    const cancel = vi.fn();
    (debouncedFn as any).cancel = cancel;
    (debounce as Mock).mockReturnValueOnce(debouncedFn);
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
