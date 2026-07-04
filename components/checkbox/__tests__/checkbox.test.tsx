import React from 'react';
import { vi } from 'vitest';

import Checkbox from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';

describe('Checkbox', () => {
  focusTest(Checkbox, { refFocus: true });
  mountTest(Checkbox);
  rtlTest(Checkbox);

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('responses hover events', () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    const { container } = render(
      <Checkbox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />,
    );

    fireEvent.mouseEnter(container.querySelector('label')!);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelector('label')!);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Checkbox value />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/50768
  it('onFocus / onBlur', () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();

    const { container } = render(<Checkbox onBlur={onBlur} onFocus={onFocus} />);
    const inputEl = container.querySelector('input')!;

    fireEvent.focus(inputEl);
    fireEvent.blur(inputEl);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should reflect indeterminate state correctly', () => {
    const { rerender, container } = render(<Checkbox indeterminate />);

    const checkboxInput = container.querySelector('input')!;
    expect(checkboxInput.indeterminate).toBe(true);

    rerender(<Checkbox indeterminate={false} />);

    expect(checkboxInput.indeterminate).toBe(false);
  });

  it('event bubble should not trigger twice', () => {
    const onClick = vi.fn();
    const onRootClick = vi.fn();

    const { container } = render(
      <div onClick={onRootClick}>
        <Checkbox onClick={onClick} />
      </div>,
    );

    // Click on label
    fireEvent.click(container.querySelector('label')!);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRootClick).toHaveBeenCalledTimes(1);
    act(() => {
      vi.runAllTimers();
    });

    // Click on input
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onRootClick).toHaveBeenCalledTimes(2);
    act(() => {
      vi.runAllTimers();
    });

    // Click on input again
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(onRootClick).toHaveBeenCalledTimes(3);
  });
});
