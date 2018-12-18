import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('Checkbox', () => {
  focusTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(<Checkbox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.find('label').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('label').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
