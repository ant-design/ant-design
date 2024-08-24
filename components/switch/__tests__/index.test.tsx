import React from 'react';

import Switch from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';

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

  it('should be controlled by value', () => {
    const mockChangeHandler = jest.fn();

    const { getByRole } = render(<Switch value onChange={mockChangeHandler} />);

    const switchNode = getByRole('switch');
    expect(switchNode).toBeTruthy();
    expect(getByRole('switch')).toBeChecked();

    fireEvent.click(switchNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(false, expect.anything());
    // controlled component, so still true after click
    expect(getByRole('switch')).toBeChecked();
  });

  it('should be uncontrolled by defaultValue', () => {
    const mockChangeHandler = jest.fn();

    const { getByRole } = render(<Switch defaultValue onChange={mockChangeHandler} />);

    const switchNode = getByRole('switch');
    expect(switchNode).toBeTruthy();
    expect(getByRole('switch')).toBeChecked();

    fireEvent.click(switchNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(false, expect.anything());
    // uncontrolled component, so false after click
    expect(getByRole('switch')).not.toBeChecked();
  });

  it('have static property for type detecting', () => {
    expect(Switch.__ANT_SWITCH).toBeTruthy();
  });

  it('inner element have min-height', () => {
    const { container, rerender } = render(<Switch unCheckedChildren="0" size="small" />);
    expect(container.querySelector('.ant-switch-inner-unchecked')).toHaveStyle('min-height: 16px');

    rerender(<Switch unCheckedChildren="0" />);
    expect(container.querySelector('.ant-switch-inner-unchecked')).toHaveStyle('min-height: 22px');
  });
});
