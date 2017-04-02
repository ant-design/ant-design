import React from 'react';
import { mount } from 'enzyme';
import Search from '../search';

describe('Search', () => {
  it('should show cross icon when input value exists', () => {
    const wrapper = mount(<Search value={''} />);

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ value: 'a' });

    expect(wrapper).toMatchSnapshot();
  });
});
