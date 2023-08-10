import React from 'react';
import type { CarouselRef } from '..';
import Carousel from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';

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
    const ref = React.createRef<CarouselRef>();
    render(
      <Carousel ref={ref}>
        <div />
      </Carousel>,
    );
    const { innerSlider } = ref.current || {};
    expect(typeof innerSlider.slickNext).toBe('function');
  });

  it('should support id property', () => {
    const { container } = render(
      <Carousel id="my-carousel">
        <div />
      </Carousel>,
    );
    expect(container.querySelector('.ant-carousel')?.getAttribute('id')).toBe('my-carousel');
  });

  it('should has prev, next and go function', async () => {
    const ref = React.createRef<CarouselRef>();
    render(
      <Carousel ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { prev, next, goTo } = ref.current || {};
    expect(typeof prev).toBe('function');
    expect(typeof next).toBe('function');
    expect(typeof goTo).toBe('function');
    expect(ref.current?.innerSlider.state.currentSlide).toBe(0);
    ref.current?.goTo(2);
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(2);
    // wait for animation to be finished
    await waitFakeTimer();
    ref.current?.prev();
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(1);
    await waitFakeTimer();
    ref.current?.next();
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(2);
  });

  it('should trigger autoPlay after window resize', async () => {
    const ref = React.createRef<CarouselRef>();
    render(
      <Carousel autoplay ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(ref.current?.innerSlider, 'autoPlay');
    window.resizeTo(1000, window.outerHeight);
    expect(spy).not.toHaveBeenCalled();
    await waitFakeTimer();
    expect(spy).toHaveBeenCalled();
  });

  it('cancel resize listener when unmount', async () => {
    const { unmount } = render(
      <Carousel autoplay>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const spy = jest.spyOn(window, 'removeEventListener');
    unmount();
    expect(spy).toHaveBeenCalled();
  });

  describe('should works for dotPosition', () => {
    (['left', 'right', 'top', 'bottom'] as const).forEach((dotPosition) => {
      // eslint-disable-next-line jest/valid-title
      it(dotPosition, () => {
        const { container } = render(
          <Carousel dotPosition={dotPosition}>
            <div />
          </Carousel>,
        );
        container.normalize();
        expect(container.firstChild).toMatchSnapshot();
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
    it('use dots to provide dotsClass', () => {
      const { container } = render(
        <Carousel dots={{ className: 'customDots' }}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carousel>,
      );
      expect(container.querySelector('.slick-dots')).toHaveClass('customDots');
    });
  });

  it('should not wait for the animation', async () => {
    const ref = React.createRef<CarouselRef>();
    render(
      <Carousel ref={ref}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    const { prev, next, goTo } = ref.current || {};
    expect(typeof prev).toBe('function');
    expect(typeof next).toBe('function');
    expect(typeof goTo).toBe('function');
    expect(ref.current?.innerSlider.state.currentSlide).toBe(0);
    ref.current?.goTo(1);
    ref.current?.goTo(2);
    ref.current?.goTo(1);
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(1);
    ref.current?.prev();
    ref.current?.next();
    ref.current?.next();
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(2);
    ref.current?.prev();
    await waitFakeTimer();
    expect(ref.current?.innerSlider.state.currentSlide).toBe(1);
  });
});
