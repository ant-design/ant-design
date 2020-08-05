import React from 'react';
import { mount } from 'enzyme';
import TransButton from '../transButton';

describe('transButton component', () => {
  it('disabled should update style', () => {
    const wrapper = mount(<TransButton disabled />);
    expect(wrapper.find('div').first().props().style).toEqual(
      expect.objectContaining({ pointerEvents: 'none' }),
    );
  });
});
