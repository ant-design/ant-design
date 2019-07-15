import * as React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import raf from 'raf';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getScroll from '../_util/getScroll';

const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getDefaultTarget() {
  return window;
}

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean; // Only for test. Don't use it.
}

export default class BackTop extends React.Component<BackTopProps, any> {
  static defaultProps = {
    visibilityHeight: 400,
  };

  scrollEvent: any;

  constructor(props: BackTopProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getCurrentScrollTop = () => {
    const getTarget = this.props.target || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      return window.pageYOffset || document.body.scrollTop || document.documentElement!.scrollTop;
    }
    return (targetNode as HTMLElement).scrollTop;
  };

  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        raf(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    raf(frameFunc);
    (this.props.onClick || noop)(e);
  };

  setScrollTop(value: number) {
    const getTarget = this.props.target || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement!.scrollTop = value;
    } else {
      (targetNode as HTMLElement).scrollTop = value;
    }
  }

  handleScroll = () => {
    const { visibilityHeight, target = getDefaultTarget } = this.props;
    const scrollTop = getScroll(target(), true);
    this.setState({
      visible: scrollTop > (visibilityHeight as number),
    });
  };

  componentDidMount() {
    const getTarget = this.props.target || getDefaultTarget;
    this.scrollEvent = addEventListener(getTarget(), 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  renderBackTop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '', children } = this.props;
    const prefixCls = getPrefixCls('back-top', customizePrefixCls);
    const classString = classNames(prefixCls, className);

    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`} />
      </div>
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(this.props, [
      'prefixCls',
      'className',
      'children',
      'visibilityHeight',
      'target',
      'visible',
    ]);

    const visible = 'visible' in this.props ? this.props.visible : this.state.visible;

    const backTopBtn = visible ? (
      <div {...divProps} className={classString} onClick={this.scrollToTop}>
        {children || defaultElement}
      </div>
    ) : null;

    return (
      <Animate component="" transitionName="fade">
        {backTopBtn}
      </Animate>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBackTop}</ConfigConsumer>;
  }
}
