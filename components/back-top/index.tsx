import * as React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean; // Only for test. Don't use it.
}

export default class BackTop extends React.Component<BackTopProps, any> {
  static defaultProps = {
    visibilityHeight: 400,
  };

  state = {
    visible: false,
  };

  scrollEvent: any;

  node: HTMLDivElement;

  componentDidMount() {
    this.bindScrollEvent();
  }

  componentDidUpdate(prevProps: BackTopProps) {
    const { target } = this.props;
    if (prevProps.target !== target) {
      this.bindScrollEvent();
    }
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
    (this.handleScroll as any).cancel();
  }

  bindScrollEvent() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
    const { target } = this.props;
    const getTarget = target || this.getDefaultTarget;
    const container = getTarget();
    this.scrollEvent = addEventListener(container, 'scroll', (e: React.UIEvent<HTMLElement>) => {
      this.handleScroll(e);
    });
    this.handleScroll({
      target: container,
    });
  }

  getVisible() {
    if ('visible' in this.props) {
      return this.props.visible;
    }
    return this.state.visible;
  }

  getDefaultTarget = () => {
    return this.node && this.node.ownerDocument ? this.node.ownerDocument : window;
  };

  saveDivRef = (node: HTMLDivElement) => {
    this.node = node;
  };

  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, target } = this.props;
    scrollTo(0, {
      getContainer: target || this.getDefaultTarget,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  @throttleByAnimationFrameDecorator()
  handleScroll(e: React.UIEvent<HTMLElement> | { target: any }) {
    const { visibilityHeight = 0 } = this.props;
    const scrollTop = getScroll(e.target, true);
    this.setState({
      visible: scrollTop > visibilityHeight,
    });
  }

  renderChildren({ prefixCls }: { prefixCls: string }) {
    const { children } = this.props;
    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`} />
      </div>
    );
    return (
      <Animate component="" transitionName="fade">
        {this.getVisible() ? <div>{children || defaultElement}</div> : null}
      </Animate>
    );
  }

  renderBackTop = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className = '' } = this.props;
    const prefixCls = getPrefixCls('back-top', customizePrefixCls);
    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(this.props, [
      'prefixCls',
      'className',
      'children',
      'visibilityHeight',
      'target',
      'visible',
    ]);

    return (
      <div {...divProps} className={classString} onClick={this.scrollToTop} ref={this.saveDivRef}>
        {this.renderChildren({ prefixCls })}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBackTop}</ConfigConsumer>;
  }
}
