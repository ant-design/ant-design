// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
import assign from 'object-assign';
import debounce from 'lodash.debounce';

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill(mediaQuery: string): MediaQueryList {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import SlickCarousel from 'react-slick';
import React from 'react';

export type CarouselEffect = 'scrollx' | 'fade';
// Carousel
export interface CarouselProps {
  effect?: CarouselEffect;
  dots?: boolean;
  vertical?: boolean;
  autoplay?: boolean;
  easing?: string;
  beforeChange?: (from: number, to: number) => void;
  afterChange?: (current: number) => void;
  style?: React.CSSProperties;
  prefixCls?: string;
  accessibility?: boolean;
  nextArrow?: HTMLElement | any;
  prevArrow?: HTMLElement | any;
  pauseOnHover?: boolean;
  className?: string;
  adaptiveHeight?: boolean;
  arrows?: boolean;
  autoplaySpeed?: number;
  centerMode?: boolean;
  centerPadding?: string | any;
  cssEase?: string | any;
  dotsClass?: string;
  draggable?: boolean;
  fade?: boolean;
  focusOnSelect?: boolean;
  infinite?: boolean;
  initialSlide?: number;
  lazyLoad?: boolean;
  rtl?: boolean;
  slide?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  speed?: number;
  swipe?: boolean;
  swipeToSlide?: boolean;
  touchMove?: boolean;
  touchThreshold?: number;
  variableWidth?: boolean;
  useCSS?: boolean;
  slickGoTo?: number;
}

export default class Carousel extends React.Component<CarouselProps, any> {
  static defaultProps = {
    dots: true,
    arrows: false,
    prefixCls: 'ant-carousel',
    draggable: false,
  };

  refs: {
    slick: any,
  };

  constructor() {
    super();
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      (this.onWindowResized as any).cancel();
    }
  }

  onWindowResized = () => {
    // Fix https://github.com/ant-design/ant-design/issues/2550
    const { slick } = this.refs;
    const { autoplay } = this.props;
    if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
      slick.innerSlider.autoPlay();
    }
  }

  render() {
    let props = assign({}, this.props);

    if (props.effect === 'fade') {
      props.fade = true;
    }

    let className = props.prefixCls;
    if (props.vertical) {
      className = `${className} ${className}-vertical`;
    }

    return (
      <div className={className}>
        <SlickCarousel ref="slick" {...props} />
      </div>
    );
  }
}
