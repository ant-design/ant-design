import React, { Component } from 'react';
import classNames from 'classnames';
import VirtualList from 'react-tiny-virtual-list';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

import Spin from '../spin';
import Icon from '../icon';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

export interface InfiniteProps {
  hasMore: boolean;
  loading: boolean;
  onLoad: any;
  dataSource: any;
  height: string | number;
  width?: string | number;
  itemHeight: string | number;
  renderItem: any;
  id?: string;
  bordered?: boolean;
  className?: string;
  prefixCls?: string;
}

export default class Infinite extends Component<InfiniteProps> {
  timeout: any;

  events = [
    'scroll',
    'touchstart',
    'touchmove',
    'touchend',
  ];

  eventHandlers = {};

  private node: any;

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(this.node);
    });
  }

  componentWillUnmount() {
    this.clearEventListeners();
    clearTimeout(this.timeout);
    (this.infiniteLoad as any).cancel();
  }

  renderItem = ({ index, style }) => {
    const { dataSource, renderItem } = this.props;

    return (
      <div key={`list-infinite-${index}`} style={style}>
        {renderItem(dataSource[index])}
      </div>
    );
  }

  getNode = (n) => {
    this.node = n;
  }

  setTargetEventListeners(target) {
    if (!target) {
      return;
    }
    this.clearEventListeners();

    this.events.forEach(eventName => {
      this.eventHandlers[eventName] = addEventListener(target.rootNode, eventName, this.infiniteLoad);
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
  infiniteLoad(e) {
    e.preventDefault();
    e.stopPropagation();

    const { onLoad, loading } = this.props;
    const targetElement = this.node.rootNode;

    if (loading || !targetElement) {
      return;
    }

    const contentHeight = targetElement.firstChild.offsetHeight;
    const scrollTop = targetElement.scrollTop;
    const rootHeight = targetElement.offsetHeight;

    if (contentHeight - (scrollTop + rootHeight) < 10) {
      onLoad();
    }
  }

  render() {
    const {
      bordered = true,
      className,
      dataSource,
      prefixCls = 'ant-list',
      width = '100%',
      height = 100,
      hasMore,
      itemHeight,
      loading,
      onLoad,
      renderItem,
      ...rest,
    } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-infinite`]: true,
      [`${prefixCls}-bordered`]: bordered,
    });

    const emptyContent = (<div className={`${prefixCls}-empty`}>
      <Icon type="frown-o" /> 暂无数据
    </div>);

    const vContent = (
      <VirtualList
        ref={this.getNode}
        width={width}
        height={height}
        itemCount={dataSource.length}
        itemSize={itemHeight}
        renderItem={this.renderItem}
      />
    );

    return (
      <div className={classString} {...rest}>
        {(dataSource.length < 1 && !loading) ? emptyContent : vContent}
        {(loading && hasMore) && (<div className={`${prefixCls}-infinite-loading`}><Spin /></div>)}
      </div>
    );
  }
}
