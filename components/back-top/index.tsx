import * as React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';

const reqAnimFrame = (() => {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame;
  }
  const a = ['moz', 'ms', 'webkit'];
  const raf = a.filter(key => `${key}RequestAnimationFrame` in window);
  return raf[0] ? window[`${raf[0]}RequestAnimationFrame`] :
    ((callback) => window.setTimeout(callback, 1000 / 60));
})();

const currentScrollTop = () => {
  return  window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
};

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  } else {
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
  }
};

function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method];
  }

  return ret;
}

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: (event) => void;
  target?: () => HTMLElement | Window;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default class BackTop extends React.Component<BackTopProps, any> {
  static defaultProps = {
    onClick() {},
    visibilityHeight: 400,
    target() {
      return window;
    },
    prefixCls: 'ant-back-top',
  };

  scrollEvent: any;

  constructor(props) {
    super(props);
    const scrollTop = getScroll(props.target(), true);
    this.state = {
      visible: scrollTop > props.visibilityHeight,
    };
  }

  scrollToTop = (e) => {
    const scrollTop = currentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        reqAnimFrame(frameFunc);
      }
    };
    reqAnimFrame(frameFunc);
    this.props.onClick(e);
  }

  setScrollTop(value) {
    const targetNode = this.props.target();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      (targetNode as HTMLElement).scrollTop = value;
    }
  }

  handleScroll = () => {
    const { visibilityHeight, target } = this.props;
    const scrollTop = getScroll(target(), true);
    this.setState({
      visible: scrollTop > visibilityHeight,
    });
  }

  componentDidMount() {
    this.scrollEvent = addEventListener(this.props.target(), 'scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const classString = classNames({
      [prefixCls]: true,
      [className]: !!className,
    });

    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <Icon className={`${prefixCls}-icon`} type="to-top" />
      </div>
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(this.props, [
      'prefixCls',
      'className',
      'children',
      'visibilityHeight',
    ]);

    return (
      <Animate component="" transitionName="fade">
        {
          this.state.visible ?
            <div {...divProps} className={classString} onClick={this.scrollToTop}>
              {children || defaultElement}
            </div>
          : null
        }
      </Animate>
    );
  }
}
