import React from 'react';
import Switch from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

jest.mock('rc-util/lib/Dom/isVisible', () => {
  const mockFn = () => true;
  return mockFn;
});

describe('Switch', () => {
  focusTest(Switch, { refFocus: true });
  mountTest(Switch);
  rtlTest(Switch);

  it('should has click wave effect', () => {
    jest.useFakeTimers();
    const { container } = render(<Switch />);
    fireEvent.click(container.querySelector('.ant-switch')!);
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Second time for raf to render wave effect
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(document.querySelector('.ant-wave')).toBeTruthy();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const props = { value: true } as any;
    render(<Switch {...props} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Switch] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });

  it('have static property for type detecting', () => {
    expect(Switch.__ANT_SWITCH).toBeTruthy();
  });
});
