import React from 'react';
import { shallow, mount } from 'enzyme';
import Checkbox from '..';

describe('Checkbox', () => {
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

  it('CheckGroup should work', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={onChange} />
    );
    wrapper.find('.ant-checkbox-input').at(0).simulate('change');
    expect(onChange).toBeCalledWith(['Apple']);
    wrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Pear']);
    wrapper.find('.ant-checkbox-input').at(2).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Pear', 'Orange']);
    wrapper.find('.ant-checkbox-input').at(1).simulate('change');
    expect(onChange).toBeCalledWith(['Apple', 'Orange']);
  });
});
