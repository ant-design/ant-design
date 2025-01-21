import * as React from 'react';
import type { Settings } from '@ant-design/react-slick';
import SlickCarousel from '@ant-design/react-slick';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useStyle from './style';

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

// Carousel
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
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
}

export interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void;
  next: () => void;
  prev: () => void;
  autoPlay: (palyType?: 'update' | 'leave' | 'blur') => void;
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
    prevArrow = <ArrowButton aria-label="prev" />,
    nextArrow = <ArrowButton aria-label="next" />,
    draggable = false,
    waitForAnimate = false,
    dotPosition = 'bottom',
    vertical = dotPosition === 'left' || dotPosition === 'right',
    rootClassName,
    className: customClassName,
    style,
    id,
    ...otherProps
  } = props;
  const { getPrefixCls, direction, carousel } = React.useContext(ConfigContext);
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

  const prevCount = React.useRef<number>(React.Children.count(props.children));

  React.useEffect(() => {
    if (prevCount.current !== React.Children.count(props.children)) {
      goTo(props.initialSlide || 0, false);
      prevCount.current = React.Children.count(props.children);
    }
  }, [props.children]);

  const newProps = {
    vertical,
    className: classNames(customClassName, carousel?.className),
    style: { ...carousel?.style, ...style },
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
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-vertical`]: newProps.vertical,
    },
    hashId,
    cssVarCls,
    rootClassName,
  );

  return wrapCSSVar(
    <div className={className} id={id}>
      <SlickCarousel
        ref={slickRef}
        {...newProps}
        dots={enableDots}
        dotsClass={dsClass}
        arrows={arrows}
        prevArrow={prevArrow}
        nextArrow={nextArrow}
        draggable={draggable}
        verticalSwiping={vertical}
        waitForAnimate={waitForAnimate}
      />
    </div>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Carousel.displayName = 'Carousel';
}

export default Carousel;
