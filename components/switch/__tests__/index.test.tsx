import React from 'react';
import Switch from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { waitFakeTimer, fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

describe('Switch', () => {
  focusTest(Switch, { refFocus: true });
  mountTest(Switch);
  rtlTest(Switch);

  it('should has click wave effect', async () => {
    jest.useFakeTimers();
    const { container } = render(<Switch />);
    fireEvent.click(container.querySelector('.ant-switch')!);
    await waitFakeTimer();
    expect(container.querySelector('button')!.getAttribute('ant-click-animating')).toBe('true');
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
});
