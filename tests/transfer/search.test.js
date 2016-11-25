import React, { Component } from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Search from '../../components/transfer/search';

describe('Search', () => {
  it('shows cross icon when user inputting', () => {
    const wrapper = mount(<Search value />);

    expect(mountToJson(wrapper)).toMatchSnapshot();

    wrapper.setProps({ value: 'a' });

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });
});
