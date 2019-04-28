import React from 'react';
import { mount } from 'enzyme';
import Carousel from '..';

describe('Carousel', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should has innerSlider', () => {
    const wrapper = mount(
      <Carousel>
        <div />
      </Carousel>,
    );
    const { innerSlider } = wrapper.instance();
    const innerSliderFromRefs = wrapper.instance().slick.innerSlider;
    expect(innerSlider).toBe(innerSliderFromRefs);
    expect(typeof innerSlider.slickNext).toBe('function');
  });

  it('should has prev, next and go function', () => {
    const wrapper = mount(
      <Carousel>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { prev, next, goTo } = wrapper.instance();
    expect(typeof prev).toBe('function');
    expect(typeof next).toBe('function');
    expect(typeof goTo).toBe('function');
    expect(wrapper.instance().slick.innerSlider.state.currentSlide).toBe(0);
    wrapper.instance().goTo(2);
    jest.runAllTimers();
    expect(wrapper.instance().slick.innerSlider.state.currentSlide).toBe(2);
    wrapper.instance().prev();
    jest.runAllTimers();
    expect(wrapper.instance().slick.innerSlider.state.currentSlide).toBe(1);
    wrapper.instance().next();
    jest.runAllTimers();
    expect(wrapper.instance().slick.innerSlider.state.currentSlide).toBe(2);
  });

  it('should trigger autoPlay after window resize', async () => {
    jest.useRealTimers();
    const wrapper = mount(
      <Carousel autoplay>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(wrapper.instance().slick.innerSlider, 'autoPlay');
    window.resizeTo(1000);
    expect(spy).not.toHaveBeenCalled();
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(spy).toHaveBeenCalled();
  });

  it('cancel resize listener when unmount', async () => {
    const wrapper = mount(
      <Carousel autoplay>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { onWindowResized } = wrapper.instance();
    const spy = jest.spyOn(wrapper.instance().onWindowResized, 'cancel');
    const spy2 = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith('resize', onWindowResized);
  });
});
