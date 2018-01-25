import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('Checkbox', () => {
  focusTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <Checkbox
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
