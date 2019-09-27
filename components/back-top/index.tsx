import * as React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';

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

  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { target = getDefaultTarget, onClick } = this.props;
    scrollTo(0, {
      getContainer: target,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  handleScroll = () => {
    const { visibilityHeight, target = getDefaultTarget } = this.props;
    const scrollTop = getScroll(target(), true);
    this.setState({
      visible: scrollTop > (visibilityHeight as number),
    });
  };

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
