import type { Settings } from '@ant-design/react-slick';
import SlickCarousel from '@ant-design/react-slick';
import classNames from 'classnames';
import * as React from 'react';
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

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  (
    {
      dots = true,
      arrows = false,
      draggable = false,
      waitForAnimate = false,
      dotPosition = 'bottom',
      vertical = dotPosition === 'left' || dotPosition === 'right',
      rootClassName,
      ...props
    },
    ref,
  ) => {
    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const slickRef = React.useRef<any>();

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

    const prevCount = React.useRef(React.Children.count(props.children));

    React.useEffect(() => {
      if (prevCount.current !== React.Children.count(props.children)) {
        goTo(props.initialSlide || 0, false);
        prevCount.current = React.Children.count(props.children);
      }
    }, [props.children]);

    const newProps = {
      vertical,
      ...props,
    };

    if (newProps.effect === 'fade') {
      newProps.fade = true;
    }

    const prefixCls = getPrefixCls('carousel', newProps.prefixCls);
    const dotsClass = 'slick-dots';

    const enableDots = !!dots;
    const dsClass = classNames(
      dotsClass,
      `${dotsClass}-${dotPosition}`,
      typeof dots === 'boolean' ? false : dots?.className,
    );

    const [wrapSSR, hashId] = useStyle(prefixCls);

    const className = classNames(
      prefixCls,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-vertical`]: newProps.vertical,
      },
      hashId,
      rootClassName,
    );

    return wrapSSR(
      <div className={className}>
        <SlickCarousel
          ref={slickRef}
          {...newProps}
          dots={enableDots}
          dotsClass={dsClass}
          arrows={arrows}
          draggable={draggable}
          waitForAnimate={waitForAnimate}
        />
      </div>,
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Carousel.displayName = 'Carousel';
}

export default Carousel;
