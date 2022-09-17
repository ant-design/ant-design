import React from 'react';
import Switch from '..';
import Form from '../../form';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep, fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

describe('Switch', () => {
  focusTest(Switch, { refFocus: true });
  mountTest(Switch);
  rtlTest(Switch);

  it('should has click wave effect', async () => {
    const { container } = render(<Switch />);
    fireEvent.click(container.querySelector('.ant-switch')!);
    await sleep(0);
    expect(container.querySelector('button')!.getAttribute('ant-click-animating')).toBe('true');
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
  it('switch should be given priority to own disabled props when it in a disabled form', () => {
    const wrapper = render(
      <Form disabled>
        <Switch disabled={false} />
      </Form>,
    );
    expect(wrapper.container.querySelectorAll('[disabled]').length).toBe(0);
    const wrapper2 = render(
      <Form disabled>
        <Switch />
      </Form>,
    );
    expect(wrapper2.container.querySelectorAll('[disabled]').length).toBe(1);
    const wrapper3 = render(
      <Form>
        <Switch disabled />
      </Form>,
    );
    expect(wrapper3.container.querySelectorAll('[disabled]').length).toBe(1);
  });
});
