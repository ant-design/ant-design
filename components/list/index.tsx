import * as React from 'react';
import classNames from 'classnames';
import Spin, { SpinProps } from '../spin';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { Breakpoint, responsiveArray } from '../_util/responsiveObserve';
import { RenderEmptyHandler, ConfigContext } from '../config-provider';
import Pagination, { PaginationConfig } from '../pagination';
import { Row } from '../grid';
import Item from './Item';

export { ListItemProps, ListItemMetaProps } from './Item';

export type ColumnCount = number;

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

export interface ListConsumerProps {
  grid?: any;
  itemLayout?: string;
}

export const ListContext = React.createContext<ListConsumerProps>({});

export const ListConsumer = ListContext.Consumer;

function List<T>({
  pagination = false as ListProps<any>['pagination'],
  prefixCls: customizePrefixCls,
  bordered = false,
  split = true,
  className,
  children,
  itemLayout,
  loadMore,
  grid,
  dataSource = [],
  size,
  header,
  footer,
  loading = false,
  rowKey,
  renderItem,
  locale,
  ...rest
}: ListProps<T>) {
  const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

  const [paginationCurrent, setPaginationCurrent] = React.useState(
    paginationObj.defaultCurrent || 1,
  );
  const [paginationSize, setPaginationSize] = React.useState(paginationObj.defaultPageSize || 10);

  const { getPrefixCls, renderEmpty, direction } = React.useContext(ConfigContext);

  const defaultPaginationProps = {
    current: 1,
    total: 0,
  };

  const keys: { [key: string]: string } = {};

  const triggerPaginationEvent = (eventName: string) => (page: number, pageSize: number) => {
    setPaginationCurrent(page);
    setPaginationSize(pageSize);
    if (pagination && (pagination as any)[eventName]) {
      (pagination as any)[eventName](page, pageSize);
    }
  };

  const onPaginationChange = triggerPaginationEvent('onChange');

  const onPaginationShowSizeChange = triggerPaginationEvent('onShowSizeChange');

  const renderInnerItem = (item: any, index: number) => {
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

    keys[index] = key;

    return renderItem(item, index);
  };

  const isSomethingAfterLastItem = () => !!(loadMore || pagination || footer);

  const renderEmptyFunc = (prefixCls: string, renderEmptyHandler: RenderEmptyHandler) => (
    <div className={`${prefixCls}-empty-text`}>
      {(locale && locale.emptyText) || renderEmptyHandler('List')}
    </div>
  );

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

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: isLoading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem(),
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const paginationProps = {
    ...defaultPaginationProps,
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
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationShowSizeChange}
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

  const screens = useBreakpoint();
  const currentBreakpoint = React.useMemo(() => {
    for (let i = 0; i < responsiveArray.length; i += 1) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (screens[breakpoint]) {
        return breakpoint;
      }
    }
    return undefined;
  }, [screens]);

  const colStyle = React.useMemo(() => {
    if (!grid) {
      return undefined;
    }
    const columnCount =
      currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;
    if (columnCount) {
      return {
        width: `${100 / columnCount}%`,
        maxWidth: `${100 / columnCount}%`,
      };
    }
  }, [grid?.column, currentBreakpoint]);

  let childrenContent = isLoading && <div style={{ minHeight: 53 }} />;
  if (splitDataSource.length > 0) {
    const items = splitDataSource.map((item: any, index: number) => renderInnerItem(item, index));
    const childrenList = React.Children.map(items, (child: any, index) => (
      <div key={keys[index]} style={colStyle}>
        {child}
      </div>
    ));
    childrenContent = grid ? (
      <Row gutter={grid.gutter}>{childrenList}</Row>
    ) : (
      <ul className={`${prefixCls}-items`}>{items}</ul>
    );
  } else if (!children && !isLoading) {
    childrenContent = renderEmptyFunc(prefixCls, renderEmpty);
  }

  const paginationPosition = paginationProps.position || 'bottom';

  return (
    <ListContext.Provider value={{ grid, itemLayout }}>
      <div className={classString} {...rest}>
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
    </ListContext.Provider>
  );
}

List.Item = Item;

export default List;
