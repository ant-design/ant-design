import React, { Component } from 'react';
import classNames from 'classnames';

import Spin from '../spin';
import Icon from '../icon';
import Pagination from '../pagination';
import Button from '../button';

import Item from './Item';

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
  style?: React.CSSProperties;
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

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
    } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
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

    const loadingContent = (
      <div className={`${prefixCls}-spin`}>
        <Spin />
      </div>
    );

    return (
      <div className={classString}>
        {loading && loadingContent}
        {!loading && children}
        {showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
      </div>
    );
  }
}
