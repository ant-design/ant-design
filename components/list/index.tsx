import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { SpinProps } from '../spin';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import defaultLocale from '../locale-provider/default';

import Spin from '../spin';
import Pagination, { PaginationConfig } from '../pagination';
import { Row } from '../grid';

import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type ColumnType =
  | 'gutter'
  | 'column'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl';

export interface ListGridType {
  gutter?: number;
  column?: ColumnCount;
  xs?: ColumnCount;
  sm?: ColumnCount;
  md?: ColumnCount;
  lg?: ColumnCount;
  xl?: ColumnCount;
  xxl?: ColumnCount;
}

export type ListSize = 'small' | 'default' | 'large';

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  dataSource: any;
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: string;
  loading?: boolean | SpinProps;
  loadMore?: React.ReactNode;
  pagination?: PaginationConfig;
  prefixCls?: string;
  rowKey?: any;
  renderItem: any;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: Object;
}

export interface ListLocale {
  emptyText: string;
}

export default class List extends React.Component<ListProps> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
  };

  static defaultProps = {
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    pagination: false,
  };

  state = {
    paginationCurrent: 1,
  };

  defaultPaginationProps = {
    current: 1,
    pageSize: 10,
    onChange: (page: number, pageSize: number) => {
      const { pagination } = this.props;
      this.setState({
        paginationCurrent: page,
      });
      if (pagination && pagination.onChange) {
        pagination.onChange(page, pageSize);
      }
    },
    total: 0,
  };

  private keys: { [key: string]: string } = {};

  getChildContext() {
    return {
      grid: this.props.grid,
    };
  }

  renderItem = (item: React.ReactElement<any>, index: number) => {
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

  isSomethingAfterLastItem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }

  renderEmpty = (prefixCls: string, contextLocale: ListLocale) => {
    const locale = { ...contextLocale, ...this.props.locale };
    return (
      <div className={`${prefixCls}-empty-text`}>
        {locale.emptyText}
      </div>
    );
  }

  renderList = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { paginationCurrent } = this.state;
    const {
      prefixCls: customizePrefixCls,
      bordered,
      split,
      className,
      children,
      itemLayout,
      loadMore,
      pagination,
      grid,
      dataSource,
      size,
      rowKey,
      renderItem,
      header,
      footer,
      loading,
      locale,
      ...rest
    } = this.props;

    const prefixCls = getPrefixCls('list', customizePrefixCls);
    let loadingProp = loading;
    if (typeof loadingProp === 'boolean') {
      loadingProp = {
        spinning: loadingProp,
      };
    }
    const isLoading = loadingProp && loadingProp.spinning;

    // large => lg
    // small => sm
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
      default:
        break;
    }

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-something-after-last-item`]: this.isSomethingAfterLastItem(),
    });

    const paginationProps = {
      ...this.defaultPaginationProps,
      total: dataSource.length,
      current: paginationCurrent,
      ...pagination || {},
    };

    const largestPage = Math.ceil(
      paginationProps.total / paginationProps.pageSize,
    );
    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }
    const paginationContent = pagination ? (
      <div className={`${prefixCls}-pagination`}>
        <Pagination
          {...paginationProps}
          onChange={this.defaultPaginationProps.onChange}
        />
      </div>
    ) : null;

    let splitDataSource = [...dataSource];
    if (pagination) {
      if (
        dataSource.length >
        (paginationProps.current - 1) * paginationProps.pageSize
      ) {
        splitDataSource = [...dataSource].splice(
          (paginationProps.current - 1) * paginationProps.pageSize,
          paginationProps.pageSize,
        );
      }
    }

    let childrenContent;
    childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item: any, index: number) =>
        this.renderItem(item, index),
      );

      const childrenList: Array<React.ReactNode> = [];
      React.Children.forEach(items, (child: any, index) => {
        childrenList.push(React.cloneElement(child, {
          key: this.keys[index],
        }));
      });

      childrenContent = grid ? (
        <Row gutter={grid.gutter}>{childrenList}</Row>
      ) : (
        childrenList
      );
    } else if (!children && !isLoading) {
      childrenContent = (
        <LocaleReceiver
          componentName="Table"
          defaultLocale={defaultLocale.Table}
        >
          {(contextLocale: ListLocale) => (
            this.renderEmpty(prefixCls, contextLocale)
          )}
        </LocaleReceiver>
      );
    }

    const paginationPosition = paginationProps.position || 'bottom';

    return (
      <div className={classString} {...rest}>
        {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        <Spin {...loadingProp}>
          {childrenContent}
          {children}
        </Spin>
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        {loadMore || (paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderList}
      </ConfigConsumer>
    );
  }
}
