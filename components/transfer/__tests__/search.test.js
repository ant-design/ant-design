import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Search from '../search';

describe('Search', () => {
  it('should show cross icon when input value exists', () => {
    const wrapper = mount(<Search value={''} />);

    expect(mountToJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({ value: 'a' });

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
