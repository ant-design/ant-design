import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '..';
import focusTest from '../../../tests/shared/focusTest';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';

describe('Checkbox', () => {
  focusTest(Checkbox);
  mountTest(Checkbox);

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
      'Warning: [antd: Checkbox] `value` is not validate prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });
});
