import React from 'react';
import { mount } from 'enzyme';
import Carousel from '..';

describe('Carousel', () => {
  it('should has innerSlider', () => {
    const wrapper = mount(<Carousel><div /></Carousel>);
    const { innerSlider } = wrapper.node;
    const innerSliderFromRefs = wrapper.node.refs.slick.innerSlider;
    expect(innerSlider).toBe(innerSliderFromRefs);
    expect(typeof innerSlider.slickNext).toBe('function');
  });
});
