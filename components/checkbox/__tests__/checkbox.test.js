import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '..';
import focusTest from '../../../tests/shared/focusTest';
import { resetWarned } from '../../_util/devWarning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Checkbox', () => {
  focusTest(Checkbox, { refFocus: true });
  mountTest(Checkbox);
  rtlTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(<Checkbox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.find('label').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('label').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Checkbox value />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });

  it('should support data-*、aria-* and custom attribute', () => {
    const wrapper = mount(<Checkbox data-text="123" aria-hidden="true" />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
