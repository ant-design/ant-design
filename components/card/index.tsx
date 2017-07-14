import React, { Component } from 'react';
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
  children?: any;
  id?: string;
  className?: string;
}

export default class Card extends Component<CardProps, any> {
  static Grid: typeof Grid = Grid;
  container: any;
  resizeEvent: any;
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
  }
  @throttleByAnimationFrameDecorator()
  updateWiderPadding() {
    // 936 is a magic card width pixer number indicated by designer
    const BOUDARY_PX = 936;
    if (this.container.offsetWidth >= BOUDARY_PX && !this.state.widerPadding) {
      this.setState({ widerPadding: true });
    }
    if (this.container.offsetWidth < BOUDARY_PX && this.state.widerPadding) {
      this.setState({ widerPadding: false });
    }
  }
  saveRef = (node) => {
    this.container = node;
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
    });

    if (loading) {
      children = (
        <div>
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
    if (!title) {
      head = null;
    } else {
      head = typeof title === 'string' ? (
        <div className={`${prefixCls}-head`}>
          <h3 className={`${prefixCls}-head-title`}>{title}</h3>
        </div>
      ) : (
        <div className={`${prefixCls}-head`}>
          <div className={`${prefixCls}-head-title`}>{title}</div>
        </div>
      );
    }

    return (
      <div {...others} className={classString} ref={this.saveRef}>
        {head}
        {extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
        <div className={`${prefixCls}-body`} style={bodyStyle}>{children}</div>
      </div>
    );
  }
}
