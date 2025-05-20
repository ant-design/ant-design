import * as React from 'react';
import { INTERNAL_HOOKS } from '@rc-component/table';
import type { Reference as RcReference, TableProps as RcTableProps } from '@rc-component/table';
import { convertChildrenToColumns } from '@rc-component/table/lib/hooks/useColumns';
import omit from '@rc-component/util/lib/omit';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import useProxyImperativeHandle from '../_util/hooks/useProxyImperativeHandle';
import type { Breakpoint } from '../_util/responsiveObserver';
import scrollTo from '../_util/scrollTo';
import type { AnyObject } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import { useLocale } from '../locale';
import defaultLocale from '../locale/en_US';
import Pagination from '../pagination';
import type { SemanticName as PaginationSemanticType } from '../pagination/Pagination';
import type { SpinProps } from '../spin';
import Spin from '../spin';
import { useToken } from '../theme/internal';
import renderExpandIcon from './ExpandIcon';
import useContainerWidth from './hooks/useContainerWidth';
import type { FilterConfig, FilterState } from './hooks/useFilter';
import useFilter, { getFilterData } from './hooks/useFilter';
import useLazyKVMap from './hooks/useLazyKVMap';
import usePagination, { DEFAULT_PAGE_SIZE, getPaginationParam } from './hooks/usePagination';
import useSelection from './hooks/useSelection';
import type { SortState } from './hooks/useSorter';
import useSorter, { getSortData } from './hooks/useSorter';
import useTitleColumns from './hooks/useTitleColumns';
import type {
  ColumnsType,
  ColumnTitleProps,
  ColumnType,
  ExpandableConfig,
  ExpandType,
  FilterValue,
  GetPopupContainer,
  GetRowKey,
  RefInternalTable,
  SorterResult,
  SorterTooltipProps,
  SortOrder,
  TableAction,
  TableCurrentDataSource,
  TableLocale,
  TablePaginationConfig,
  TableRowSelection,
} from './interface';
import RcTable from './RcTable';
import RcVirtualTable from './RcTable/VirtualTable';
import useStyle from './style';

export type { ColumnsType, TablePaginationConfig };

const EMPTY_LIST: AnyObject[] = [];

interface ChangeEventInfo<RecordType = AnyObject> {
  pagination: {
    current?: number;
    pageSize?: number;
    total?: number;
  };
  filters: Record<string, FilterValue | null>;
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[];

  filterStates: FilterState<RecordType>[];
  sorterStates: SortState<RecordType>[];

  resetPagination: (current?: number, pageSize?: number) => void;
}

export type SemanticName =
  | 'root'
  | 'section'
  | 'header'
  | 'title'
  | 'footer'
  | 'body'
  | 'content'
  | 'item';
export interface TableProps<RecordType = AnyObject>
  extends Omit<
    RcTableProps<RecordType>,
    | 'transformColumns'
    | 'internalHooks'
    | 'internalRefs'
    | 'data'
    | 'columns'
    | 'scroll'
    | 'emptyText'
    | 'classNames'
    | 'styles'
  > {
  classNames?: Partial<Record<SemanticName, string>> & {
    pagination?: Partial<Record<PaginationSemanticType, string>>;
  };
  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    pagination?: Partial<Record<PaginationSemanticType, React.CSSProperties>>;
  };
  dropdownPrefixCls?: string;
  dataSource?: RcTableProps<RecordType>['data'];
  columns?: ColumnsType<RecordType>;
  pagination?: false | TablePaginationConfig;
  loading?: boolean | SpinProps;
  size?: SizeType;
  bordered?: boolean;
  locale?: TableLocale;
  rootClassName?: string;

  onChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    extra: TableCurrentDataSource<RecordType>,
  ) => void;
  rowSelection?: TableRowSelection<RecordType>;

  getPopupContainer?: GetPopupContainer;
  scroll?: RcTableProps<RecordType>['scroll'] & {
    scrollToFirstRowOnChange?: boolean;
  };
  sortDirections?: SortOrder[];
  showSorterTooltip?: boolean | SorterTooltipProps;
  virtual?: boolean;
}

type SemanticType = {
  classNames: Required<Record<SemanticName, string>> & {
    pagination: Required<Record<PaginationSemanticType, string>>;
  };
  styles: Required<Record<SemanticName, React.CSSProperties>> & {
    pagination: Required<Record<PaginationSemanticType, React.CSSProperties>>;
  };
};

/** Same as `TableProps` but we need record parent render times */
export interface InternalTableProps<RecordType = AnyObject> extends TableProps<RecordType> {
  _renderTimes: number;
}

const InternalTable = <RecordType extends AnyObject = AnyObject>(
  props: InternalTableProps<RecordType>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    classNames,
    styles,
    size: customizeSize,
    bordered,
    dropdownPrefixCls: customizeDropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey: customizeRowKey,
    rowClassName,
    columns,
    children,
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale,
    showSorterTooltip = { target: 'full-header' },
    virtual,
  } = props;

  const warning = devUseWarning('Table');

  const baseColumns = React.useMemo(
    () => columns || (convertChildrenToColumns(children) as ColumnsType<RecordType>),
    [columns, children],
  );
  const needResponsive = React.useMemo(
    () => baseColumns.some((col: ColumnType<RecordType>) => col.responsive),
    [baseColumns],
  );

  const screens = useBreakpoint(needResponsive);

  const mergedColumns = React.useMemo(() => {
    const matched = new Set(Object.keys(screens).filter((m) => screens[m as Breakpoint]));

    return baseColumns.filter((c) => !c.responsive || c.responsive.some((r) => matched.has(r)));
  }, [baseColumns, screens]);

  const tableProps: TableProps<RecordType> = omit(props, ['className', 'style', 'columns']);

  const { locale: contextLocale = defaultLocale, table } =
    React.useContext<ConfigConsumerProps>(ConfigContext);

  const {
    getPrefixCls,
    direction,
    renderEmpty,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('table');

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      pagination: {
        _default: 'root',
      },
    },
  ) as [SemanticType['classNames'], SemanticType['styles']];

  const mergedSize = useSize(customizeSize);
  const tableLocale: TableLocale = { ...contextLocale.Table, ...locale };
  const [globalLocale] = useLocale('global', defaultLocale.global);
  const rawData: readonly RecordType[] = dataSource || EMPTY_LIST;

  const prefixCls = getPrefixCls('table', customizePrefixCls);
  const dropdownPrefixCls = getPrefixCls('dropdown', customizeDropdownPrefixCls);

  const [, token] = useToken();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedExpandable: ExpandableConfig<RecordType> = {
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex,
    ...expandable,
    expandIcon: expandable?.expandIcon ?? table?.expandable?.expandIcon,
  };
  const { childrenColumnName = 'children' } = mergedExpandable;

  const expandType = React.useMemo<ExpandType>(() => {
    if (rawData.some((item) => item?.[childrenColumnName])) {
      return 'nest';
    }

    if (expandedRowRender || expandable?.expandedRowRender) {
      return 'row';
    }

    return null;
  }, [rawData]);

  const internalRefs: NonNullable<RcTableProps['internalRefs']> = {
    body: React.useRef<HTMLDivElement>(null),
  } as NonNullable<RcTableProps['internalRefs']>;

  // ============================ Width =============================
  const getContainerWidth = useContainerWidth(prefixCls);

  // ============================= Refs =============================
  const rootRef = React.useRef<HTMLDivElement>(null);
  const tblRef = React.useRef<RcReference>(null);

  useProxyImperativeHandle(ref, () => ({
    ...tblRef.current!,
    nativeElement: rootRef.current!,
  }));

  // ============================ RowKey ============================
  const rowKey = customizeRowKey || table?.rowKey || 'key';

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(typeof rowKey === 'function' && rowKey.length > 1),
      'usage',
      '`index` parameter of `rowKey` function is deprecated. There is no guarantee that it will work as expected.',
    );
  }

  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => record?.[rowKey as string];
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey);

  // ============================ Events =============================
  const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {};

  const triggerOnChange = (
    info: Partial<ChangeEventInfo<RecordType>>,
    action: TableAction,
    reset = false,
  ) => {
    const changeInfo = {
      ...changeEventInfo,
      ...info,
    };

    if (reset) {
      changeEventInfo.resetPagination?.();

      // Reset event param
      if (changeInfo.pagination?.current) {
        changeInfo.pagination.current = 1;
      }

      // Trigger pagination events
      if (pagination) {
        pagination.onChange?.(1, changeInfo.pagination?.pageSize!);
      }
    }

    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current!,
      });
    }

    onChange?.(changeInfo.pagination!, changeInfo.filters!, changeInfo.sorter!, {
      currentDataSource: getFilterData(
        getSortData(rawData, changeInfo.sorterStates!, childrenColumnName),
        changeInfo.filterStates!,
        childrenColumnName,
      ),
      action,
    });
  };

  /**
   * Controlled state in `columns` is not a good idea that makes too many code (1000+ line?) to read
   * state out and then put it back to title render. Move these code into `hooks` but still too
   * complex. We should provides Table props like `sorter` & `filter` to handle control in next big
   * version.
   */

  // ============================ Sorter =============================
  const onSorterChange = (
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    sorterStates: SortState<RecordType>[],
  ) => {
    triggerOnChange(
      {
        sorter,
        sorterStates,
      },
      'sort',
      false,
    );
  };
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = useSorter<RecordType>({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ['ascend', 'descend'],
    tableLocale,
    showSorterTooltip,
    globalLocale,
  });
  const sortedData = React.useMemo(
    () => getSortData(rawData, sortStates, childrenColumnName),
    [rawData, sortStates],
  );

  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;

  // ============================ Filter ============================
  const onFilterChange: FilterConfig<RecordType>['onFilterChange'] = (filters, filterStates) => {
    triggerOnChange({ filters, filterStates }, 'filter', true);
  };

  const [transformFilterColumns, filterStates, filters] = useFilter<RecordType>({
    prefixCls,
    locale: tableLocale,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    rootClassName: cls(rootClassName, rootCls),
  });
  const mergedData = getFilterData(sortedData, filterStates, childrenColumnName);

  changeEventInfo.filters = filters;
  changeEventInfo.filterStates = filterStates;

  // ============================ Column ============================
  const columnTitleProps = React.useMemo<ColumnTitleProps<RecordType>>(() => {
    const mergedFilters: Record<string, FilterValue> = {};
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey]!;
      }
    });
    return {
      ...sorterTitleProps,
      filters: mergedFilters,
    };
  }, [sorterTitleProps, filters]);

  const [transformTitleColumns] = useTitleColumns(columnTitleProps);

  // ========================== Pagination ==========================
  const onPaginationChange = (current: number, pageSize: number) => {
    triggerOnChange(
      {
        pagination: { ...changeEventInfo.pagination, current, pageSize },
      },
      'paginate',
    );
  };

  const [mergedPagination, resetPagination] = usePagination(
    mergedData.length,
    onPaginationChange,
    pagination,
  );

  changeEventInfo.pagination =
    pagination === false ? {} : getPaginationParam(mergedPagination, pagination);

  changeEventInfo.resetPagination = resetPagination;

  // ============================= Data =============================
  const pageData = React.useMemo<RecordType[]>(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }

    const { current = 1, total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination;
    warning(current > 0, 'usage', '`current` should be positive number.');

    // Dynamic table data
    if (mergedData.length < total!) {
      if (mergedData.length > pageSize) {
        warning(
          false,
          'usage',
          '`dataSource` length is less than `pagination.total` but large than `pagination.pageSize`. Please make sure your config correct data with async mode.',
        );
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }

    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [
    !!pagination,
    mergedData,
    mergedPagination?.current,
    mergedPagination?.pageSize,
    mergedPagination?.total,
  ]);

  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(
    {
      prefixCls,
      data: mergedData,
      pageData,
      getRowKey,
      getRecordByKey,
      expandType,
      childrenColumnName,
      locale: tableLocale,
      getPopupContainer: getPopupContainer || getContextPopupContainer,
    },
    rowSelection,
  );

  const internalRowClassName = (record: RecordType, index: number, indent: number) => {
    let mergedRowClassName: string;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = cls(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = cls(rowClassName);
    }

    return cls(
      {
        [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index)),
      },
      mergedRowClassName,
    );
  };

  // ========================== Expandable ==========================

  // Pass origin render status into `@rc-component/table`, this can be removed when refactor with `@rc-component/table`
  (mergedExpandable as any).__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;

  // Customize expandable icon
  mergedExpandable.expandIcon =
    mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale!);

  // Adjust expand icon index, no overwrite expandIconColumnIndex if set.
  if (expandType === 'nest' && mergedExpandable.expandIconColumnIndex === undefined) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
  } else if (mergedExpandable.expandIconColumnIndex! > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex! -= 1;
  }

  // Indent size
  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = typeof indentSize === 'number' ? indentSize : 15;
  }

  // ============================ Render ============================
  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
      transformTitleColumns(
        transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns))),
      ),
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns],
  );

  let topPaginationNode: React.ReactNode;
  let bottomPaginationNode: React.ReactNode;
  if (pagination !== false && mergedPagination?.total) {
    let paginationSize: TablePaginationConfig['size'];
    if (mergedPagination.size) {
      paginationSize = mergedPagination.size;
    } else {
      paginationSize = mergedSize === 'small' || mergedSize === 'middle' ? 'small' : undefined;
    }

    const renderPagination = (position: string) => (
      <Pagination
        {...mergedPagination}
        classNames={mergedClassNames.pagination}
        styles={mergedStyles.pagination}
        className={cls(
          `${prefixCls}-pagination ${prefixCls}-pagination-${position}`,
          mergedPagination.className,
        )}
        size={paginationSize}
      />
    );
    const defaultPosition = direction === 'rtl' ? 'left' : 'right';
    const { position } = mergedPagination;
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find((p) => p.includes('top'));
      const bottomPos = position.find((p) => p.includes('bottom'));
      const isDisable = position.every((p) => `${p}` === 'none');
      if (!topPos && !bottomPos && !isDisable) {
        bottomPaginationNode = renderPagination(defaultPosition);
      }
      if (topPos) {
        topPaginationNode = renderPagination(topPos.toLowerCase().replace('top', ''));
      }
      if (bottomPos) {
        bottomPaginationNode = renderPagination(bottomPos.toLowerCase().replace('bottom', ''));
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition);
    }
  }

  // >>>>>>>>> Spinning
  let spinProps: SpinProps | undefined;
  if (typeof loading === 'boolean') {
    spinProps = {
      spinning: loading,
    };
  } else if (typeof loading === 'object') {
    spinProps = {
      spinning: true,
      ...loading,
    };
  }

  const wrappercls = cls(
    cssVarCls,
    rootCls,
    `${prefixCls}-wrapper`,
    contextClassName,
    {
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
  );

  const mergedStyle: React.CSSProperties = { ...mergedStyles.root, ...contextStyle, ...style };

  const emptyText =
    typeof locale?.emptyText !== 'undefined'
      ? locale.emptyText
      : renderEmpty?.('Table') || <DefaultRenderEmpty componentName="Table" />;

  // ========================== Render ==========================
  const TableComponent = virtual ? RcVirtualTable : RcTable;

  // >>> Virtual Table props. We set height here since it will affect height collection
  const virtualProps: { listItemHeight?: number } = {};

  const listItemHeight = React.useMemo(() => {
    const { fontSize, lineHeight, lineWidth, padding, paddingXS, paddingSM } = token;
    const fontHeight = Math.floor(fontSize * lineHeight);

    switch (mergedSize) {
      case 'middle':
        return paddingSM * 2 + fontHeight + lineWidth;

      case 'small':
        return paddingXS * 2 + fontHeight + lineWidth;

      default:
        return padding * 2 + fontHeight + lineWidth;
    }
  }, [token, mergedSize]);

  if (virtual) {
    virtualProps.listItemHeight = listItemHeight;
  }

  return (
    <div ref={rootRef} className={wrappercls} style={mergedStyle}>
      <Spin spinning={false} {...spinProps}>
        {topPaginationNode}
        <TableComponent
          {...virtualProps}
          {...tableProps}
          classNames={mergedClassNames as RcTableProps<RecordType>['classNames']}
          styles={mergedStyles as RcTableProps<RecordType>['styles']}
          ref={tblRef}
          columns={mergedColumns as RcTableProps<RecordType>['columns']}
          direction={direction}
          expandable={mergedExpandable}
          prefixCls={prefixCls}
          className={cls(
            {
              [`${prefixCls}-middle`]: mergedSize === 'middle',
              [`${prefixCls}-small`]: mergedSize === 'small',
              [`${prefixCls}-bordered`]: bordered,
              [`${prefixCls}-empty`]: rawData.length === 0,
            },
            cssVarCls,
            rootCls,
            hashId,
          )}
          data={pageData}
          rowKey={getRowKey}
          rowClassName={internalRowClassName}
          emptyText={emptyText}
          // Internal
          internalHooks={INTERNAL_HOOKS}
          internalRefs={internalRefs}
          transformColumns={transformColumns as any}
          getContainerWidth={getContainerWidth}
        />
        {bottomPaginationNode}
      </Spin>
    </div>
  );
};

export default React.forwardRef(InternalTable) as RefInternalTable;
