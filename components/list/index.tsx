import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Spin, { SpinProps } from '../spin';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';

import Pagination, { PaginationConfig } from '../pagination';
import { Row } from '../grid';

import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

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

export type ListItemLayout = 'horizontal' | 'vertical';

export interface ListProps<T> {
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  dataSource?: T[];
  extra?: React.ReactNode;
  grid?: ListGridType;
  id?: string;
  itemLayout?: ListItemLayout;
  loading?: boolean | SpinProps;
  loadMore?: React.ReactNode;
  pagination?: PaginationConfig | false;
  prefixCls?: string;
  rowKey?: ((item: T) => string) | string;
  renderItem?: (item: T, index: number) => React.ReactNode;
  size?: ListSize;
  split?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  locale?: ListLocale;
}

export interface ListLocale {
  emptyText: React.ReactNode | (() => React.ReactNode);
}

interface ListState {
  paginationCurrent: number;
  paginationSize: number;
}

export default class List<T> extends React.Component<ListProps<T>, ListState> {
  static Item: typeof Item = Item;

  static childContextTypes = {
    grid: PropTypes.any,
    itemLayout: PropTypes.string,
  };

  static defaultProps = {
    dataSource: [],
    bordered: false,
    split: true,
    loading: false,
    pagination: false as ListProps<any>['pagination'],
  };

  defaultPaginationProps = {
    current: 1,
    total: 0,
  };

  private keys: { [key: string]: string } = {};

  private onPaginationChange = this.triggerPaginationEvent('onChange');

  private onPaginationShowSizeChange = this.triggerPaginationEvent('onShowSizeChange');

  constructor(props: ListProps<T>) {
    super(props);

    const { pagination } = props;
    const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

    this.state = {
      paginationCurrent: paginationObj.defaultCurrent || 1,
      paginationSize: paginationObj.defaultPageSize || 10,
    };
  }

  getChildContext() {
    return {
      grid: this.props.grid,
      itemLayout: this.props.itemLayout,
    };
  }

  triggerPaginationEvent(eventName: string) {
    return (page: number, pageSize: number) => {
      const { pagination } = this.props;
      this.setState({
        paginationCurrent: page,
        paginationSize: pageSize,
      });
      if (pagination && (pagination as any)[eventName]) {
        (pagination as any)[eventName](page, pageSize);
      }
    };
  }

  renderItem = (item: any, index: number) => {
    const { renderItem, rowKey } = this.props;
    if (!renderItem) return null;

    let key;

    if (typeof rowKey === 'function') {
      key = rowKey(item);
    } else if (typeof rowKey === 'string') {
      key = item[rowKey];
    } else {
      key = item.key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    this.keys[index] = key;

    return renderItem(item, index);
  };

  isSomethingAfterLastItem() {
    const { loadMore, pagination, footer } = this.props;
    return !!(loadMore || pagination || footer);
  }

  renderEmpty = (prefixCls: string, renderEmpty: RenderEmptyHandler) => {
    const { locale } = this.props;

    return (
      <div className={`${prefixCls}-empty-text`}>
        {(locale && locale.emptyText) || renderEmpty('List')}
      </div>
    );
  };

  renderList = ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => {
    const { paginationCurrent, paginationSize } = this.state;
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
      dataSource = [],
      size,
      header,
      footer,
      loading,
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
        break;
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
      pageSize: paginationSize,
      ...(pagination || {}),
    };

    const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
    if (paginationProps.current > largestPage) {
      paginationProps.current = largestPage;
    }
    const paginationContent = pagination ? (
      <div className={`${prefixCls}-pagination`}>
        <Pagination
          {...paginationProps}
          onChange={this.onPaginationChange}
          onShowSizeChange={this.onPaginationShowSizeChange}
        />
      </div>
    ) : null;

    let splitDataSource = [...dataSource];
    if (pagination) {
      if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
        splitDataSource = [...dataSource].splice(
          (paginationProps.current - 1) * paginationProps.pageSize,
          paginationProps.pageSize,
        );
      }
    }

    let childrenContent;
    childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
    if (splitDataSource.length > 0) {
      const items = splitDataSource.map((item: any, index: number) => this.renderItem(item, index));

      const childrenList: Array<React.ReactNode> = [];
      React.Children.forEach(items, (child: any, index) => {
        childrenList.push(
          React.cloneElement(child, {
            key: this.keys[index],
          }),
        );
      });

      childrenContent = grid ? (
        <Row gutter={grid.gutter}>{childrenList}</Row>
      ) : (
        <ul className={`${prefixCls}-items`}>{childrenList}</ul>
      );
    } else if (!children && !isLoading) {
      childrenContent = this.renderEmpty(prefixCls, renderEmpty);
    }

    const paginationPosition = paginationProps.position || 'bottom';

    return (
      <div className={classString} {...omit(rest, ['rowKey', 'renderItem', 'locale'])}>
        {(paginationPosition === 'top' || paginationPosition === 'both') && paginationContent}
        {header && <div className={`${prefixCls}-header`}>{header}</div>}
        <Spin {...loadingProp}>
          {childrenContent}
          {children}
        </Spin>
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        {loadMore ||
          ((paginationPosition === 'bottom' || paginationPosition === 'both') && paginationContent)}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderList}</ConfigConsumer>;
  }
}
