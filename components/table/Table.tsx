import * as React from 'react';
import classNames from 'classnames';
import RcTable, { Column, ColumnGroup } from 'rc-table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import Pagination, { PaginationConfig } from '../pagination';
import { ConfigContext } from '../config-provider/context';
import usePagination, { DEFAULT_PAGE_SIZE } from './hooks/usePagination';
import useLazyKVMap from './hooks/useLazyKVMap';
import { TableRowSelection, GetRowKey, ColumnsType } from './interface';
import useSelection, { SELECTION_ALL, SELECTION_INVERT } from './hooks/useSelection';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useTitleColumns from './hooks/useTitleColumns';

const EMPTY_LIST: any[] = [];

export interface TableProps<RecordType> extends Omit<RcTableProps<RecordType>, 'transformColumns'> {
  dropdownPrefixCls?: string;
  dataSource?: RcTableProps<RecordType>['data'];
  pagination?: false | PaginationConfig;

  // TODO: handle this
  onChange?: () => void;
  rowSelection?: TableRowSelection<RecordType>;
}

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const {
    prefixCls: customizePrefixCls,
    dropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey,
    rowClassName,
    columns,
  } = props;
  const rawData: RecordType[] = dataSource || EMPTY_LIST;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)[rowKey as string];
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(rawData, getRowKey);

  // ============================ Sorter =============================
  const [transformSorterColumns, sortedData, sorterTitleProps] = useSorter<RecordType>({
    prefixCls,
    columns: columns || [],
    data: rawData,
  });

  // ============================ Filter ============================
  const [transformFilterColumns, mergedData] = useFilter<RecordType>({
    prefixCls,
    dropdownPrefixCls,
    columns: columns || [],
    data: sortedData,
  });

  // ============================ Column ============================
  const columnTitleProps = React.useMemo(
    () => ({
      ...sorterTitleProps,
    }),
    [sorterTitleProps],
  );
  const [transformTitleColumns] = useTitleColumns(columnTitleProps);

  // ========================== Pagination ==========================
  // TODO: handle this
  const [mergedPagination, setMergedPagination] = usePagination(mergedData.length, pagination);

  // ============================= Data =============================
  const pageData = React.useMemo<RecordType[]>(() => {
    const { current = 1, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination;
    // TODO: ajax mode
    const currentPageData = mergedData.slice((current - 1) * pageSize, current * pageSize);
    return currentPageData;
  }, [mergedData, mergedPagination.current, mergedPagination.pageSize]);

  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(rowSelection, {
    prefixCls,
    data: mergedData,
    pageData,
    getRowKey,
    getRecordByKey,
  });

  const internalRowClassName = (record: RecordType, index: number, indent: number) => {
    let mergedRowClassName;
    if (typeof rowClassName === 'function') {
      mergedRowClassName = classNames(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = classNames(rowClassName);
    }

    return classNames(
      {
        [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index)),
      },
      mergedRowClassName,
    );
  };

  // ============================ Render ============================
  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      return transformTitleColumns(
        transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns))),
      );
    },
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns],
  );

  let paginationNode;
  if (pagination !== false) {
    paginationNode = <Pagination className={`${prefixCls}-pagination`} {...mergedPagination} />;
  }

  return (
    <div className={`${prefixCls}-wrapper`}>
      <RcTable<RecordType>
        {...props}
        prefixCls={prefixCls}
        data={pageData}
        transformColumns={transformColumns}
        rowKey={getRowKey}
        rowClassName={internalRowClassName}
      />
      {paginationNode}
    </div>
  );
}

Table.defaultProps = {
  rowKey: 'key',
};

Table.SELECTION_ALL = SELECTION_ALL;
Table.SELECTION_INVERT = SELECTION_INVERT;
Table.Column = Column;
Table.ColumnGroup = ColumnGroup;

export default Table;
