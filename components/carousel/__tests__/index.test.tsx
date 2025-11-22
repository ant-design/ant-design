import React from 'react';

import type { CarouselRef, DotPlacement } from '..';
import Carousel from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

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

  it('no dom recognize warning', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Carousel arrows>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>,
    );
    await waitFakeTimer();
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  describe('should works for dotDuration', () => {
    it('should not show dot duration', () => {
      const { container } = render(
        <Carousel autoplay>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carousel>,
      );
      const ele = container.querySelector<HTMLElement>('.ant-carousel')!;
      expect(getComputedStyle(ele).getPropertyValue('--dot-duration')).toBeFalsy();
    });

    it('should show dot duration with default autoplaySpeed', () => {
      const { container } = render(
        <Carousel autoplay={{ dotDuration: true }}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carousel>,
      );
      const ele = container.querySelector<HTMLElement>('.ant-carousel')!;
      expect(getComputedStyle(ele).getPropertyValue('--dot-duration')).toBe('3000ms');
    });

    it('should show dot duration with custom autoplaySpeed', () => {
      const { container } = render(
        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </Carousel>,
      );
      const ele = container.querySelector<HTMLElement>('.ant-carousel')!;
      expect(getComputedStyle(ele).getPropertyValue('--dot-duration')).toBe('5000ms');
    });
  });

  describe('Carousel dot placement', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    const Demo = (props: any) => (
      <Carousel {...props}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );

    const warningStr =
      'Warning: [antd: Carousel] `dotPosition` is deprecated. Please use `dotPlacement` instead.';

    it.each<{
      props: {
        dotPosition?: DotPlacement | 'left' | 'right';
        dotPlacement?: DotPlacement;
      };
      expectedClass: string;
      shouldWarn: boolean;
    }>([
      { props: { dotPosition: 'left' }, expectedClass: 'slick-dots-start', shouldWarn: true },
      { props: { dotPosition: 'right' }, expectedClass: 'slick-dots-end', shouldWarn: true },
      { props: { dotPlacement: 'start' }, expectedClass: 'slick-dots-start', shouldWarn: false },
      { props: { dotPlacement: 'end' }, expectedClass: 'slick-dots-end', shouldWarn: false },
      {
        props: { dotPosition: 'left', dotPlacement: 'end' },
        expectedClass: 'slick-dots-end',
        shouldWarn: true,
      },
    ])('placement combinations', ({ props, expectedClass, shouldWarn }) => {
      const { container } = render(<Demo {...props} />);
      const carousel = container.querySelector('.slick-dots');
      expect(carousel).toHaveClass(expectedClass);

      if (shouldWarn) {
        expect(consoleSpy).toHaveBeenCalledWith(warningStr);
      } else {
        expect(consoleSpy).not.toHaveBeenCalled();
      }
    });

    describe('vertical calculation', () => {
      it.each<{
        placement?: DotPlacement;
        expectedVertical: boolean;
      }>([
        { placement: 'start', expectedVertical: true },
        { placement: 'end', expectedVertical: true },
        { placement: 'top', expectedVertical: false },
        { placement: 'bottom', expectedVertical: false },
      ])(
        'should set vertical=$expectedVertical for $placement',
        ({ placement, expectedVertical }) => {
          const { container } = render(<Demo dotPlacement={placement} />);
          const carousel = container.querySelector('.ant-carousel-vertical');

          if (expectedVertical) {
            expect(carousel).toBeTruthy();
          } else {
            expect(carousel).toBeFalsy();
          }
        },
      );
    });
  });
  describe('RTL Direction', () => {
    it('should trigger correct slide change when clicking arrows in RTL', async () => {
      const { container } = render(
        <ConfigProvider direction="rtl">
          <Carousel rtl arrows initialSlide={1}>
            <div>Slide 1</div>
            <div>Slide 2</div>
            <div>Slide 3</div>
          </Carousel>
        </ConfigProvider>,
      );

      expect(container.querySelector('.ant-carousel-rtl')).toBeTruthy();

      const prevArrow = container.querySelector<HTMLDivElement>('.slick-prev');
      const nextArrow = container.querySelector<HTMLDivElement>('.slick-next');

      expect(prevArrow).toHaveAttribute('aria-label', 'next');
      expect(nextArrow).toHaveAttribute('aria-label', 'prev');

      expect(container.querySelector('.slick-active')?.textContent).toBe('Slide 2');
      fireEvent.click(prevArrow!);
      expect(container.querySelector('.slick-active')?.textContent).toBe('Slide 3');
      fireEvent.click(nextArrow!);
      expect(container.querySelector('.slick-active')?.textContent).toBe('Slide 2');
    });
  });
});
