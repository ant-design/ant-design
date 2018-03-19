import React from 'react';
import { mount } from 'enzyme';
import Carousel from '..';

describe('Carousel', () => {
  it('should have innerSlider', () => {
    const wrapper = mount(<Carousel><div /></Carousel>);
    const { innerSlider } = wrapper.instance();
    const innerSliderFromRefs = wrapper.instance().slick.innerSlider;
    expect(innerSlider).toBe(innerSliderFromRefs);
    expect(typeof innerSlider.slickNext).toBe('function');
  });
  
  it('should have exposed slick methods', () => {
    const wrapper = mount(<Carousel><div /></Carousel>);
    const { next, prev, goTo } = wrapper.instance();
    expect(typeof next).toBe('function');
    expect(typeof prev).toBe('function');
    expect(typeof goTo).toBe('function');
  });
});
