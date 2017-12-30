import React from 'react';
import { mount } from 'enzyme';
import Carousel from '..';

describe('Carousel', () => {
  it('should has innerSlider', () => {
    const wrapper = mount(<Carousel><div /></Carousel>);
    const { innerSlider } = wrapper.instance();
    const innerSliderFromRefs = wrapper.instance().slick.innerSlider;
    expect(innerSlider).toBe(innerSliderFromRefs);
    expect(typeof innerSlider.slickNext).toBe('function');
  });
});
