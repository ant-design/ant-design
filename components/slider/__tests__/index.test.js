import React from 'react';
import { render, mount } from 'enzyme';
import Slider from '..';

describe('Slider', () => {
  it('should show tooltip when hovering slider handler', () => {
    const wrapper = mount(
      <Slider defaultValue={30} />
    );
    wrapper.find('.ant-slider-handle').at(0).simulate('mouseEnter');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    wrapper.find('.ant-slider-handle').at(0).simulate('mouseLeave');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });
});
