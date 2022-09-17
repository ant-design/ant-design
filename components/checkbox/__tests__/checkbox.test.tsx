import React from 'react';
import Checkbox from '..';
import Form from '../../form';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

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

  it('checkbox should be given priority to own disabled props when it in a disabled form', () => {
    const wrapper = render(
      <Form disabled>
        <Checkbox disabled={false} />
      </Form>,
    );
    expect(wrapper.container.querySelectorAll('[disabled]').length).toBe(0);
    const wrapper2 = render(
      <Form disabled>
        <Checkbox />
      </Form>,
    );
    expect(wrapper2.container.querySelectorAll('[disabled]').length).toBe(1);
    const wrapper3 = render(
      <Form>
        <Checkbox disabled />
      </Form>,
    );
    expect(wrapper3.container.querySelectorAll('[disabled]').length).toBe(1);
  });
});
