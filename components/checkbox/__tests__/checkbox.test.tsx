import React from 'react';

import Checkbox from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';

describe('Checkbox', () => {
  focusTest(Checkbox, { refFocus: true });
  mountTest(Checkbox);
  rtlTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

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

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Checkbox value />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });

  it('onFocus', () => {
    const onFocus = jest.fn();

    const { container } = render(<Checkbox onFocus={onFocus} />);
    const inputEl = container.querySelector('input')!;

    fireEvent.focus(inputEl);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('onBlur', () => {
    const onBlur = jest.fn();

    const { container } = render(<Checkbox onBlur={onBlur} />);
    const inputEl = container.querySelector('input')!;

    fireEvent.focus(inputEl);
    fireEvent.blur(inputEl);

    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
