import * as React from 'react';
import debounce from 'lodash/debounce';
import SlickCarousel, { Settings } from '@ant-design/react-slick';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

// Carousel
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
  effect?: CarouselEffect;
  style?: React.CSSProperties;
  prefixCls?: string;
  slickGoTo?: number;
  dotPosition?: DotPosition;
  children?: React.ReactNode;
  dots?:
    | boolean
    | {
        className?: string;
      };
}

interface CarouselState {
  current: number;
}

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
  static defaultProps = {
    dots: true,
    arrows: false,
    draggable: false,
  };

  innerSlider: any;

  private slick: any;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      current: props.initialSlide || 0,
    };
    this.onWindowResized = debounce(this.onWindowResized, 500, {
      leading: false,
    });
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
    const { current } = this.state;
    const newLength = React.Children.count(prevProps.children);
    if (current > newLength - 1) {
      const { initialSlide = 0 } = this.props;
      const useIdx = initialSlide < newLength ? initialSlide : 0;
      this.goTo(useIdx, false);
    }
  }

  componentWillUnmount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
      (this.onWindowResized as any).cancel();
    }
  }

  getDotPosition(): DotPosition {
    const { dotPosition = 'bottom' } = this.props;
    return dotPosition;
  }

  saveSlick = (node: any) => {
    this.slick = node;
  };

  onWindowResized = () => {
    // Fix https://github.com/ant-design/ant-design/issues/2550
    const { autoplay } = this.props;
    if (autoplay && this.slick && this.slick.innerSlider && this.slick.innerSlider.autoPlay) {
      this.slick.innerSlider.autoPlay();
    }
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

  afterChange = (current: number) => {
    this.setState({
      current,
    });
    const { afterChange } = this.props;
    if (typeof afterChange === 'function') {
      afterChange(current);
    }
  };

  renderCarousel = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const props = {
      ...this.props,
    };

    if (props.effect === 'fade') {
      props.fade = true;
    }

    const prefixCls = getPrefixCls('carousel', props.prefixCls);
    const dotsClass = 'slick-dots';
    const dotPosition = this.getDotPosition();
    props.vertical = dotPosition === 'left' || dotPosition === 'right';

    const enableDots = !!props.dots;
    const dsClass = classNames(
      dotsClass,
      `${dotsClass}-${dotPosition || 'bottom'}`,
      typeof props.dots === 'boolean' ? false : props.dots?.className,
    );

    const className = classNames(prefixCls, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-vertical`]: props.vertical,
    });

    return (
      <div className={className}>
        <SlickCarousel
          ref={this.saveSlick}
          {...props}
          afterChange={this.afterChange}
          dots={enableDots}
          dotsClass={dsClass}
        />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCarousel}</ConfigConsumer>;
  }
}
