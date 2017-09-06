import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

import Spin from '../spin';
import Icon from '../icon';
import Pagination from '../pagination';
import Button from '../button';
import { Row } from '../grid';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

import Item from './Item';

export interface ListGridType {
  gutter?: number;
  column?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
  xs?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
  sm?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
  md?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
  lg?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
  xl?: 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
}

export interface InfinitePropType {
  onLoad?: any;
  loading?: boolean;
  offset?: number;
}

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  itemLayout: string;
  loading?: boolean;
  showLoadMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: React.FormEventHandler<any>;
  pagination?: any;
  prefixCls?: string;
  grid?: ListGridType;
  infinite?: InfinitePropType;
}

function getDefaultTarget() {
  return typeof window !== 'undefined' ?
    window : null;
}

function getOffsetTop(element?: HTMLElement): number {
  if (!element) {
    return 0;
  }

  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return rect.top - docElem.clientTop;
  }

  return rect.top;
}

function getViewportHeight() {
  const win = getDefaultTarget();
  if (!win) {
    return 0;
  }
  return Math.max(win.document.documentElement.clientHeight, win.innerHeight || 0);
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  scrollEvent: any;
  resizeEvent: any;
  timeout: any;
  node: any;

  events = [
    'resize',
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
    'pageshow',
    'load',
  ];
  infiniteLoaded = false;
  eventHandlers = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }

  componentDidMount() {
    if (!this.isInfinite()) {
      return;
    }
    const target = getDefaultTarget;

    // Wait for parent component ref has its value
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(target);
    });
  }

  componentWillUnmount() {
    if (!this.isInfinite()) {
      return;
    }
    this.clearEventListeners();
    clearTimeout(this.timeout);
    (this.infiniteLoad as any).cancel();
  }

  getNode = (n) => {
    this.node = n;
  }

  isInfinite() {
    const { infinite } = this.props;
    return infinite && (typeof infinite.onLoad === 'function');
  }

  setTargetEventListeners(getTarget) {
    const target = getTarget();
    if (!target) {
      return;
    }
    this.clearEventListeners();

    this.events.forEach(eventName => {
      this.eventHandlers[eventName] = addEventListener(target, eventName, this.infiniteLoad);
    });
  }

  clearEventListeners() {
    this.events.forEach(eventName => {
      const handler = this.eventHandlers[eventName];
      if (handler && handler.remove) {
        handler.remove();
      }
    });
  }

  @throttleByAnimationFrameDecorator()
  infiniteLoad() {
    const { infinite = {} } = this.props;
    const targetElement = this.node;

    if (this.infiniteLoaded || !targetElement) {
      return;
    }

    const viewportHeight = getViewportHeight();
    const eleOffsetTop = getOffsetTop(targetElement);
    const bottomPositionY = eleOffsetTop + targetElement.offsetHeight - viewportHeight + (infinite.offset || 0);

    if (bottomPositionY < 0) {
      this.infiniteLoaded = true;
      infinite.onLoad(() => {
        this.infiniteLoaded = false;
      });
    }
  }

  render() {
    const {
      bordered = true,
      className,
      children,
      loading = false,
      itemLayout,
      showLoadMore = false,
      loadingMore = false,
      onLoadMore = (() => {
      }),
      pagination = false,
      prefixCls = 'ant-list',
      grid,
      infinite = {},
      ...rest,
    } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-infinite`]: infinite.onLoad,
    });

    const moreButton = (
      <Button onClick={onLoadMore}>
        <Icon type="loading"/>
        加载中...
      </Button>
    );

    const moreContent = (
      <div className={`${prefixCls}-more`}>
        {loadingMore ? moreButton : <Button onClick={onLoadMore}>加载更多...</Button>}
      </div>
    );

    const paginationContent = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination} />
      </div>
    );

    const childrenContent = grid ? (
      <Row gutter={grid.gutter}>{children}</Row>
    ) : children;

    const content = loading ? (
      <Spin size="large">
        {childrenContent}
        {showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
      </Spin>
      ) : (
      <div>
        {childrenContent}
        {showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
        {infinite.loading && (<div className={`${prefixCls}-spin`}><Spin /></div>)}
      </div>
    );

    return (
      <div className={classString} {...rest} ref={this.getNode}>
        {content}
      </div>
    );
  }
}
