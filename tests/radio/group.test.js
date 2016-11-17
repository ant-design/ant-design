import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../../components/radio';
import RadioGroup from '../../components/radio/group';

describe('Radio', () => {
  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <RadioGroup
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Radio/>
      </RadioGroup>
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
