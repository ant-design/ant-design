import React from 'react';
import Switch from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

vi.mock('rc-util/es/Dom/isVisible', () => {
  const mockFn = () => true;
  return {
    default: mockFn,
  };
});

describe('Switch', () => {
  focusTest(Switch, { refFocus: true });
  mountTest(Switch);
  rtlTest(Switch);

  it('should has click wave effect', () => {
    vi.useFakeTimers();
    const { container } = render(<Switch />);
    fireEvent.click(container.querySelector('.ant-switch')!);
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(document.querySelector('.ant-wave')).toBeTruthy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const props = { value: true } as any;
    render(<Switch {...props} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Switch] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });
});
