import { mount } from 'enzyme';
import React from 'react';
import Carousel from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, sleep } from '../../../tests/utils';

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
    await sleep(500);
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
    const spy = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
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
      const { rerender, container } = render(<Carousel />);
      expect(container.querySelector('.slick-active')).toBeFalsy();

      // Update children
      rerender(
        <Carousel>
          <div />
        </Carousel>,
      );
      expect(container.querySelector('.slick-active')).toBeTruthy();
    });

    it('should keep initialSlide', () => {
      const { rerender, container } = render(<Carousel initialSlide={1} />);
      rerender(
        <Carousel initialSlide={1}>
          <div key="1" />
          <div key="2" />
          <div key="3" />
        </Carousel>,
      );
      expect(container.querySelectorAll('.slick-dots li')[1]).toHaveClass('slick-active');
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
