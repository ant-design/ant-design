import React from 'react';
import { mount } from 'enzyme';
import Carousel from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Carousel', () => {
  mountTest(Carousel);
  rtlTest(Carousel);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should has innerSlider', () => {
    const ref = React.createRef();
    mount(
      <Carousel ref={ref}>
        <div />
      </Carousel>,
    );
    const { innerSlider } = ref.current;
    expect(typeof innerSlider.slickNext).toBe('function');
  });

  it('should has prev, next and go function', () => {
    const ref = React.createRef();
    mount(
      <Carousel ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { prev, next, goTo } = ref.current;
    expect(typeof prev).toBe('function');
    expect(typeof next).toBe('function');
    expect(typeof goTo).toBe('function');
    expect(ref.current.innerSlider.state.currentSlide).toBe(0);
    ref.current.goTo(2);
    jest.runAllTimers();
    expect(ref.current.innerSlider.state.currentSlide).toBe(2);
    ref.current.prev();
    jest.runAllTimers();
    expect(ref.current.innerSlider.state.currentSlide).toBe(1);
    ref.current.next();
    jest.runAllTimers();
    expect(ref.current.innerSlider.state.currentSlide).toBe(2);
  });

  it('should trigger autoPlay after window resize', async () => {
    jest.useRealTimers();
    const ref = React.createRef();
    mount(
      <Carousel autoplay ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(ref.current.innerSlider, 'autoPlay');
    window.resizeTo(1000);
    expect(spy).not.toHaveBeenCalled();
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(spy).toHaveBeenCalled();
  });

  describe('should works for dotPosition', () => {
    ['left', 'right', 'top', 'bottom'].forEach(dotPosition => {
      // eslint-disable-next-line jest/valid-title
      it(dotPosition, () => {
        const wrapper = mount(
          <Carousel dotPosition={dotPosition}>
            <div />
          </Carousel>,
        );
        expect(wrapper.render()).toMatchSnapshot();
      });
    });
  });

  describe('should active when children change', () => {
    it('should active', () => {
      const wrapper = mount(<Carousel />);
      wrapper.setProps({
        children: <div />,
      });
      wrapper.update();
      expect(wrapper.find('.slick-active').length).toBeTruthy();
    });

    it('should keep initialSlide', () => {
      // react unsafe lifecycle don't works in React 15
      // https://github.com/akiran/react-slick/commit/97988e897750e1d8f7b10a86b655f50d75d38298
      if (process.env.REACT === '15') {
        return;
      }
      const wrapper = mount(<Carousel initialSlide={1} />);
      wrapper.setProps({
        children: [<div key="1" />, <div key="2" />, <div key="3" />],
      });
      wrapper.update();
      expect(wrapper.find('.slick-dots li').at(1).hasClass('slick-active')).toBeTruthy();
    });
  });

  describe('dots precise control by plain object', () => {
    it('use dots to provide dotsClasse', () => {
      const wrapper = mount(
        <Carousel dots={{ className: 'customDots' }}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carousel>,
      );
      wrapper.update();
      expect(wrapper.find('.slick-dots').hasClass('customDots')).toBeTruthy();
    });
  });
});
