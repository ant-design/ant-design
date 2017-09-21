import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import InfiniteScroll from 'react-infinite-scroller';

import Spin from '../spin';
import Icon from '../icon';
import Pagination from '../pagination';
import Button from '../button';
import { Row } from '../grid';

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

export interface Infinite {
  onLoad: any;
  loading?: boolean;
  hasMore?: boolean;
}

export interface Virtualized {
  itemHeight: number;
}

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  loading?: boolean;
  showLoadMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: React.FormEventHandler<any>;
  pagination?: any;
  prefixCls?: string;
  grid?: ListGridType;
  itemLayout?: string;
  rowKey?: any;
  dataSource: any;
  renderItem: any;
  infinite?: Infinite;
  virtualized?: Virtualized;
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  private vnode: any;
  private root: any;

  private keys = {};
  private loadedRowsMap = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }

  getVNode = n => {
    this.vnode = n;
  }
  getRoot = n => {
    this.root = n;
  }

  renderItem = (item, index) => {
    const { dataSource, renderItem, rowKey } = this.props;
    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(dataSource[index]);
    } else if (typeof rowKey === 'string') {
      key = dataSource[rowKey];
    } else {
      key = dataSource.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  }

  renderVItem = ({ index, key, style }) => {
    const { dataSource, renderItem } = this.props;

    return (
      <div key={key} style={style}>
        {renderItem(dataSource[index], index)}
      </div>
    );
  }

  isRowLoaded = ({ index }) => {
    return !!this.loadedRowsMap[index];
  }

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { infinite } = this.props;

    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }

    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);

      for (let i = startIndex; i <= stopIndex; i++) {
        // 2 means loaded
        this.loadedRowsMap[i] = 2;
      }

      if (infinite) {
        infinite.onLoad(() => {
          promiseResolver();
        });
      }
    }, 0);

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
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
      dataSource = [],
      rowKey,
      infinite,
      virtualized,
      renderItem,
      ...rest,
      } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-grid`]: grid,
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

    let childrenContent;
    if (virtualized && virtualized.itemHeight) {

      const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
        <VList
          autoHeight
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          overscanRowCount={2}
          rowCount={dataSource.length}
          rowHeight={virtualized.itemHeight}
          rowRenderer={this.renderVItem}
          onRowsRendered={onRowsRendered}
          scrollTop={scrollTop}
          width={width}
        />
      );

      const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
        <AutoSizer disableHeight>
          {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
        </AutoSizer>
      );

      let virtualizedContent = (
        <WindowScroller scrollElement={null}>
          {autoSize}
        </WindowScroller>
      );

      if (infinite && infinite.onLoad) {
        const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={dataSource.length}
          >
            {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
          </InfiniteLoader>
        );

        virtualizedContent = (
          <WindowScroller scrollElement={null}>
            {infiniteLoader}
          </WindowScroller>
        );
      }

      childrenContent = virtualizedContent;

    } else {
      const childrenList = React.Children.map(dataSource.map((item: any, index) => this.renderItem(item, index)),
        (child: any, index) => React.cloneElement(child, {
          key: this.keys[index],
        }),
      );

      let normalContent;
      if (infinite && infinite.onLoad) {
        normalContent = (
          <InfiniteScroll
            pageStart={0}
            loadMore={infinite.onLoad}
            hasMore={(!infinite.loading) && infinite.hasMore}
          >
            {childrenList}
          </InfiniteScroll>
        );
      } else {
        normalContent = childrenList;
      }

      childrenContent = grid ? (
        <Row gutter={grid.gutter}>{normalContent}</Row>
      ) : normalContent;
    }

    const content = loading ? (
      <Spin>
        {childrenContent}
        {showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
      </Spin>
    ) : (
      <div>
        {childrenContent}
        {showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
      </div>
    );

    return (
      <div className={classString} {...rest}>
        <div ref={this.getRoot}>
          {content}
          {infinite && infinite.loading && <Spin className={`${prefixCls}-infinite-loading-spin`} />}
        </div>
      </div>
    );
  }
}
