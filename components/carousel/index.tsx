import * as React from 'react';
import type { Settings } from '@ant-design/react-slick';
import SlickCarousel from '@ant-design/react-slick';
import classNames from 'classnames';

import { useComponentConfig } from '../config-provider/context';
import useStyle, { DotDuration } from './style';

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

// Carousel
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass' | 'autoplay'> {
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  rootClassName?: string;
  id?: string;
  slickGoTo?: number;
  dotPosition?: DotPosition;
  children?: React.ReactNode;
  dots?: boolean | { className?: string };
  waitForAnimate?: boolean;
  autoplay?: boolean | { dotDuration?: boolean };
}

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void;
  next: () => void;
  prev: () => void;
  autoPlay: (playType?: 'update' | 'leave' | 'blur') => void;
  innerSlider: any;
}

const dotsClass = 'slick-dots';

interface ArrowType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  currentSlide?: number;
  slideCount?: number;
}

const ArrowButton: React.FC<ArrowType> = ({ currentSlide, slideCount, ...rest }) => (
  <button type="button" {...rest} />
);

const Carousel = React.forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const {
    dots = true,
    arrows = false,
    prevArrow,
    nextArrow,
    draggable = false,
    waitForAnimate = false,
    dotPosition = 'bottom',
    vertical = dotPosition === 'left' || dotPosition === 'right',
    rootClassName,
    className: customClassName,
    style,
    id,
    autoplay = false,
    autoplaySpeed = 3000,
    rtl,
    ...otherProps
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('carousel');
  const slickRef = React.useRef<any>(null);

  const goTo = (slide: number, dontAnimate = false) => {
    slickRef.current.slickGoTo(slide, dontAnimate);
  };

  React.useImperativeHandle(
    ref,
    () => ({
      goTo,
      autoPlay: slickRef.current.innerSlider.autoPlay,
      innerSlider: slickRef.current.innerSlider,
      prev: slickRef.current.slickPrev,
      next: slickRef.current.slickNext,
    }),
    [slickRef.current],
  );
  const { children, initialSlide = 0 } = props;
  const count = React.Children.count(children);
  const isRTL = (rtl ?? direction === 'rtl') && !vertical;

  React.useEffect(() => {
    if (count > 0) {
      const newIndex = isRTL ? count - initialSlide - 1 : initialSlide;
      goTo(newIndex, false);
    }
  }, [count, initialSlide, isRTL]);

  const newProps = {
    vertical,
    className: classNames(customClassName, contextClassName),
    style: { ...contextStyle, ...style },
    autoplay: !!autoplay,
    ...otherProps,
  };

  if (newProps.effect === 'fade') {
    newProps.fade = true;
  }

  const prefixCls = getPrefixCls('carousel', newProps.prefixCls);

  const enableDots = !!dots;
  const dsClass = classNames(
    dotsClass,
    `${dotsClass}-${dotPosition}`,
    typeof dots === 'boolean' ? false : dots?.className,
  );

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const className = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: isRTL,
      [`${prefixCls}-vertical`]: newProps.vertical,
    },
    hashId,
    cssVarCls,
    rootClassName,
  );

  const mergedShowDuration =
    autoplay && (typeof autoplay === 'object' ? autoplay.dotDuration : false);

  const dotDurationStyle: React.CSSProperties = mergedShowDuration
    ? { [DotDuration]: `${autoplaySpeed}ms` }
    : {};

  // When the drawing is first performed, the browser will skip the changes to `transform`.
  // https://github.com/ant-design/ant-design/issues/55540
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (autoplay && typeof autoplay === 'object' && autoplay.dotDuration && containerRef.current) {
      const activeNode = containerRef.current.querySelector<HTMLElement>(
        '.slick-dots li.slick-active',
      );

      if (activeNode) {
        activeNode.classList.remove('slick-active');
        void activeNode.offsetWidth; // reflow
        activeNode.classList.add('slick-active');
      }
    }
  }, [autoplay]);

  return wrapCSSVar(
    <div ref={containerRef} className={className} id={id} style={dotDurationStyle}>
      <SlickCarousel
        ref={slickRef}
        {...newProps}
        dots={enableDots}
        dotsClass={dsClass}
        arrows={arrows}
        prevArrow={prevArrow ?? <ArrowButton aria-label={isRTL ? 'next' : 'prev'} />}
        nextArrow={nextArrow ?? <ArrowButton aria-label={isRTL ? 'prev' : 'next'} />}
        draggable={draggable}
        verticalSwiping={vertical}
        autoplaySpeed={autoplaySpeed}
        waitForAnimate={waitForAnimate}
        rtl={isRTL}
      />
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Carousel.displayName = 'Carousel';
}

export default Carousel;
