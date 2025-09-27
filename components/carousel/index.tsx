import * as React from 'react';
import type { Settings } from '@ant-design/react-slick';
import SlickCarousel from '@ant-design/react-slick';
import { clsx } from 'clsx';

import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useStyle, { DotDuration } from './style';

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPlacement = 'top' | 'bottom' | 'start' | 'end';

// Carousel
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass' | 'autoplay'> {
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  rootClassName?: string;
  id?: string;
  slickGoTo?: number;
  /** @deprecated Please use `dotPlacement` instead  */
  dotPosition?: DotPlacement | 'left' | 'right';
  dotPlacement?: DotPlacement;
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
    dotPosition,
    dotPlacement,
    vertical,
    rootClassName,
    className: customClassName,
    style,
    id,
    autoplay = false,
    autoplaySpeed = 3000,
    rtl,
    ...otherProps
  } = props;

  const mergedDotPlacement = React.useMemo(() => {
    const placement: DotPlacement | 'left' | 'right' = dotPlacement ?? dotPosition ?? 'bottom';
    switch (placement) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return placement;
    }
  }, [dotPosition, dotPlacement]);

  const mergedVertical =
    vertical ?? (mergedDotPlacement === 'start' || mergedDotPlacement === 'end');

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

  // ========================== Warn ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Carousel');

    warning.deprecated(!dotPosition, 'dotPosition', 'dotPlacement');
  }

  const newProps = {
    vertical: mergedVertical,
    className: clsx(customClassName, contextClassName),
    style: { ...contextStyle, ...style },
    autoplay: !!autoplay,
    ...otherProps,
  };

  if (newProps.effect === 'fade') {
    newProps.fade = true;
  }

  const prefixCls = getPrefixCls('carousel', newProps.prefixCls);

  const enableDots = !!dots;
  const dsClass = clsx(
    dotsClass,
    `${dotsClass}-${mergedDotPlacement}`,
    typeof dots === 'boolean' ? false : dots?.className,
  );

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const className = clsx(
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

  return (
    <div className={className} id={id} style={dotDurationStyle}>
      <SlickCarousel
        ref={slickRef}
        {...newProps}
        dots={enableDots}
        dotsClass={dsClass}
        arrows={arrows}
        prevArrow={prevArrow ?? <ArrowButton aria-label={isRTL ? 'next' : 'prev'} />}
        nextArrow={nextArrow ?? <ArrowButton aria-label={isRTL ? 'prev' : 'next'} />}
        draggable={draggable}
        verticalSwiping={mergedVertical}
        autoplaySpeed={autoplaySpeed}
        waitForAnimate={waitForAnimate}
        rtl={isRTL}
      />
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Carousel.displayName = 'Carousel';
}

export default Carousel;
