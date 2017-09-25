import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Spin from '../spin';
import Pagination from '../pagination';
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

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  loading?: boolean;
  loadMore?: React.ReactNode;
  pagination?: any;
  prefixCls?: string;
  grid?: ListGridType;
  itemLayout?: string;
  rowKey?: any;
  dataSource: any;
  renderItem: any;
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  private keys = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
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

  render() {
    const {
      bordered = true,
      className,
      children,
      loading = false,
      itemLayout,
      loadMore,
      pagination = false,
      prefixCls = 'ant-list',
      grid,
      dataSource = [],
      rowKey,
      renderItem,
      ...rest,
    } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-grid`]: grid,
    });

    const paginationContent = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination} />
      </div>
    );

    const childrenList = React.Children.map(dataSource.map((item: any, index) => this.renderItem(item, index)),
      (child: any, index) => React.cloneElement(child, {
        key: this.keys[index],
      }),
    );

    const childrenContent = grid ? (
      <Row gutter={grid.gutter}>{childrenList}</Row>
    ) : childrenList;

    const content = loading ? (
      <Spin>
        {childrenContent}
        {loadMore}
        {(!loadMore && pagination) && paginationContent}
      </Spin>
    ) : (
      <div>
        {childrenContent}
        {loadMore}
        {(!loadMore && pagination) && paginationContent}
      </div>
    );

    return (
      <div className={classString} {...rest}>
        {content}
        {children}
      </div>
    );
  }
}
