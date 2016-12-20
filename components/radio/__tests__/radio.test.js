import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../radio';

describe('Radio', () => {
  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <Radio
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
