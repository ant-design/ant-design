import React from 'react';
import { mount } from 'enzyme';
import Avatar from '..';

describe('Avatar Render', () => {
  it('Render long string correctly', () => {
    const wrapper = mount(<Avatar>TestString</Avatar>);
    const children = wrapper.find('.ant-avatar-string');
    expect(children.length).toBe(1);
  });
});
