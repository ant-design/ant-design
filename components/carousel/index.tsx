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
  /** 动画效果函数，可取 scrollx, fade */
  effect?: CarouselEffect;
  /** 是否显示面板指示点 */
  dots?: boolean;
  /** 垂直显示 */
  vertical?: boolean;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 动画效果 */
  easing?: string;
  /** 切换面板的回调 */
  beforeChange?: (from: number, to: number) => void;
  /** 切换面板的回调 */
  afterChange?: (current: number) => void;
  /** 行内样式 */
  style?: React.CSSProperties;
  prefixCls?: string;
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
