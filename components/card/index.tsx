import React, { Component, Children } from 'react';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Grid from './Grid';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

export interface CardProps {
  prefixCls?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  loading?: boolean;
  noHovering?: boolean;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export default class Card extends Component<CardProps, {}> {
  static Grid: typeof Grid = Grid;
  container: HTMLDivElement;
  resizeEvent: any;
  updateWiderPaddingCalled: boolean;
  state = {
    widerPadding: false,
  };
  componentDidMount() {
    this.updateWiderPadding();
    this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
  }
  componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
    (this.updateWiderPadding as any).cancel();
  }
  @throttleByAnimationFrameDecorator()
  updateWiderPadding() {
    if (!this.container) {
      return;
    }
    // 936 is a magic card width pixer number indicated by designer
    const WIDTH_BOUDARY_PX = 936;
    if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
      this.setState({ widerPadding: true }, () => {
        this.updateWiderPaddingCalled = true; // first render without css transition
      });
    }
    if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
      this.setState({ widerPadding: false }, () => {
        this.updateWiderPaddingCalled = true; // first render without css transition
      });
    }
  }
  saveRef = (node: HTMLDivElement) => {
    this.container = node;
  }
  isContainGrid() {
    let containGrid;
    Children.forEach(this.props.children, (element: JSX.Element) => {
      if (element && element.type && element.type === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  }
  render() {
    const {
      prefixCls = 'ant-card', className, extra, bodyStyle, noHovering,
      title, loading, bordered = true, ...others,
    } = this.props;
    let children = this.props.children;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-no-hovering`]: noHovering,
      [`${prefixCls}-wider-padding`]: this.state.widerPadding,
      [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
      [`${prefixCls}-contain-grid`]: this.isContainGrid(),
    });

    if (loading) {
      children = (
        <div className={`${prefixCls}-loading-content`}>
          <p className={`${prefixCls}-loading-block`} style={{ width: '94%' }} />
          <p>
            <span className={`${prefixCls}-loading-block`} style={{ width: '28%' }} />
            <span className={`${prefixCls}-loading-block`} style={{ width: '62%' }} />
          </p>
          <p>
            <span className={`${prefixCls}-loading-block`} style={{ width: '22%' }} />
            <span className={`${prefixCls}-loading-block`} style={{ width: '66%' }} />
          </p>
          <p>
            <span className={`${prefixCls}-loading-block`} style={{ width: '56%' }} />
            <span className={`${prefixCls}-loading-block`} style={{ width: '39%' }} />
          </p>
          <p>
            <span className={`${prefixCls}-loading-block`} style={{ width: '21%' }} />
            <span className={`${prefixCls}-loading-block`} style={{ width: '15%' }} />
            <span className={`${prefixCls}-loading-block`} style={{ width: '40%' }} />
          </p>
        </div>
      );
    }

    let head;
    if (title || extra) {
      head = (
        <div className={`${prefixCls}-head`}>
          {title ? <div className={`${prefixCls}-head-title`}>{title}</div> : null}
          {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
        </div>
      );
    }

    return (
      <div {...others} className={classString} ref={this.saveRef}>
        {head}
        <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
      </div>
    );
  }
}
