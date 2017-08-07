import React, { Component, Children } from 'react';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Grid from './Grid';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

export type CardType = 'inner';

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
  type?: CardType;
  cover?: React.ReactNode;
  actions?: Array<React.ReactNode>;
  avatar?: React.ReactNode;
  description?: React.ReactNode;
  extraContent?: React.ReactNode;
}

export default class Card extends Component<CardProps> {
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
  getAction(actions) {
    if (!actions || !actions.length) {
      return null;
    }
    const actionList = actions.map((action, index) => (
              <li style={{ flex: `1 1 ${100 / actions.length}%` }} key={`action-${index}`}>
                <span>{action}</span>
              </li>
            ),
          );
    return actionList;
  }
  render() {
    const {
      prefixCls = 'ant-card', className, extra, bodyStyle, noHovering, title, loading,
      bordered = true, type, cover, avatar, description, extraContent, actions, children, ...others,
    } = this.props;

    const builtIn = !children;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-no-hovering`]: noHovering,
      [`${prefixCls}-wider-padding`]: this.state.widerPadding,
      [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
      [`${prefixCls}-contain-grid`]: this.isContainGrid(),
      [`${prefixCls}-type-${type}`]: !!type,
      [`${prefixCls}-built-in`]: builtIn,
    });

    const loadingBlock = (
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

    const extraDom = extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
    const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
    const avatarDom = avatar ? <div className={`${prefixCls}-built-in-avatar`}>{avatar}</div> : null;
    const descriptionDom = description ?
      <div className={`${prefixCls}-built-in-description`}>{description}</div> : null;
    const extraContentDom = extraContent ?
      <div className={`${prefixCls}-built-in-extra-content`}>{extraContent}</div> : null;

    let mainContent;
    const builtInContentDetail = head || descriptionDom ?
            <div className={`${prefixCls}-built-in-detail`}>
              {extraDom}
              {head}
              {descriptionDom}
              {extraContentDom}
            </div> : null;
    const builtInContent = (
      <div>
        {coverDom}
        <div className={`${prefixCls}-built-in-content`}>
          {avatarDom}
          {builtInContentDetail}
        </div>
      </div>
    );
    if (builtIn) {
      mainContent = (
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {loading ? loadingBlock : builtInContent}
        </div>
      );
    } else {
      mainContent = (
        <div>
          {head}
          {extraDom}
          <div className={`${prefixCls}-body`} style={bodyStyle}>
            {loading ? loadingBlock : <div>{coverDom}{children}</div>}
          </div>
        </div>
      );
    }
    const actionDom = actions && actions.length ?
      <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul> : null;

    return (
      <div {...others} className={classString} ref={this.saveRef}>
        {mainContent}
        {actionDom}
      </div>
    );
  }
}
