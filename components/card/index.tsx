import React, { Component, Children } from 'react';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import omit from 'omit.js';
import Grid from './Grid';
import Meta from './Meta';
import Tabs from '../tabs';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

export type CardType = 'inner';

export interface CardTabListType {
  key: string;
  tab: React.ReactNode;
}

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
  tabList?: CardTabListType[];
  onTabChange?: (key: string) => void;
}

export default class Card extends Component<CardProps> {
  static Grid: typeof Grid = Grid;
  static Meta: typeof Meta = Meta;
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
  onTabChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
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
        <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
          <span>{action}</span>
        </li>
      ),
    );
    return actionList;
  }
  render() {
    const {
      prefixCls = 'ant-card', className, extra, bodyStyle, noHovering = true, title, loading,
      bordered = true, type, cover, actions, tabList, children, ...others,
    } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-hovering`]: !noHovering,
      [`${prefixCls}-wider-padding`]: this.state.widerPadding,
      [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
      [`${prefixCls}-contain-grid`]: this.isContainGrid(),
      [`${prefixCls}-type-${type}`]: !!type,
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
    const tabs = tabList && tabList.length ? (
        <Tabs className={`${prefixCls}-head-tabs`} onChange={this.onTabChange}>
          {tabList.map(item => <Tabs.TabPane tab={item.tab} key={item.key} />)}
        </Tabs>
      ) : null;
    if (!title && !tabs) {
      head = null;
    } else {
      head = typeof title === 'string' ? (
        <div className={`${prefixCls}-head`}>
          <h3 className={`${prefixCls}-head-title`}>{title}</h3>
          {tabs}
        </div>
      ) : (
        <div className={`${prefixCls}-head`}>
          <div className={`${prefixCls}-head-title`}>{title}</div>
          {tabs}
        </div>
      );
    }
    const extraDom = extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null;
    const coverDom = cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null;
    const mainContent = (
      <div>
        {head}
        {extraDom}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {loading ? loadingBlock : <div>{coverDom}{children}</div>}
        </div>
      </div>
    );
    const actionDom = actions && actions.length ?
      <ul className={`${prefixCls}-actions`}>{this.getAction(actions)}</ul> : null;
    const divProps = omit(others, [
      'onTabChange',
    ]);
    return (
      <div {...divProps} className={classString} ref={this.saveRef}>
        {mainContent}
        {actionDom}
      </div>
    );
  }
}
