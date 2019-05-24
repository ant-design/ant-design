import * as React from 'react';
import debounce from 'lodash/debounce';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Settings } from 'react-slick';
import warning from '../_util/warning';

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
// Use require over import (will be lifted up)
// make sure matchMedia polyfill run before require('react-slick')
// Fix https://github.com/ant-design/ant-design/issues/6560
// Fix https://github.com/ant-design/ant-design/issues/3308
const SlickCarousel = require('react-slick').default;

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

// Carousel
export interface CarouselProps extends Settings {
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  slickGoTo?: number;
  dotPosition?: DotPosition;
  children?: React.ReactNode;
}

export default class Carousel extends React.Component<CarouselProps, {}> {
  static defaultProps = {
    dots: true,
    arrows: false,
    draggable: false,
  };

  innerSlider: any;

  private slick: any;

  constructor(props: CarouselProps) {
    super(props);
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });

    if ('vertical' in this.props) {
      warning(
        !this.props.vertical,
        'Carousel',
        '`vertical` is deprecated, please use `dotPosition` instead.',
      );
    }
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    // https://github.com/ant-design/ant-design/issues/7191
    this.innerSlider = this.slick && this.slick.innerSlider;
  }

  componentDidUpdate(prevProps: CarouselProps) {
    if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
      this.goTo(this.props.initialSlide || 0, false);
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
    const { autoplay } = this.props;
    if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
      this.slick.innerSlider.autoPlay();
    }
  };

  saveSlick = (node: any) => {
    this.slick = node;
  };

  next() {
    this.slick.slickNext();
  }

  prev() {
    this.slick.slickPrev();
  }

  goTo(slide: number, dontAnimate = false) {
    this.slick.slickGoTo(slide, dontAnimate);
  }

  getDotPosition(): DotPosition {
    if (this.props.dotPosition) {
      return this.props.dotPosition;
    } else if ('vertical' in this.props) {
      return this.props.vertical ? 'right' : 'bottom';
    }
    return 'bottom';
  }

  renderCarousel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const props = {
      ...this.props,
    };

    if (props.effect === 'fade') {
      props.fade = true;
    }

    let className = getPrefixCls('carousel', props.prefixCls);
    const dotsClass = 'slick-dots';
    const dotPosition = this.getDotPosition();
    props.vertical = dotPosition === 'left' || dotPosition === 'right';
    props.dotsClass = `${dotsClass} ${dotsClass}-${dotPosition || 'bottom'}`;
    if (props.vertical) {
      className = `${className} ${className}-vertical`;
    }

    return (
      <div className={className}>
        <SlickCarousel ref={this.saveSlick} {...props} />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCarousel}</ConfigConsumer>;
  }
}
