import React from 'react';
import { mount, render } from 'enzyme';
import Radio, { Group, Button } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';

describe('Radio', () => {
  focusTest(Radio);
  mountTest(Radio);
  mountTest(Group);
  mountTest(Button);

  it('should render correctly', () => {
    const wrapper = render(<Radio className="customized">Test</Radio>);
    expect(wrapper).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(<Radio onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.find('label').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('label').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
