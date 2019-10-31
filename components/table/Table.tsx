import * as React from 'react';
import classNames from 'classnames';
import RcTable, { Column, ColumnGroup } from 'rc-table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import Pagination, { PaginationConfig } from '../pagination';
import { ConfigContext } from '../config-provider/context';
import usePagination, { DEFAULT_PAGE_SIZE } from './hooks/usePagination';
import useLazyKVMap from './hooks/useLazyKVMap';
import { TableRowSelection, GetRowKey } from './interface';
import useSelection from './hooks/useSelection';

const EMPTY_LIST: any[] = [];

export interface TableProps<RecordType> extends RcTableProps<RecordType> {
  dataSource?: RcTableProps<RecordType>['data'];
  pagination?: false | PaginationConfig;

  // TODO: handle this
  onChange?: () => void;
  rowSelection?: TableRowSelection<RecordType>;
}

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const {
    prefixCls: customizePrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey,
    rowClassName,
  } = props;
  const mergedData: RecordType[] = dataSource || EMPTY_LIST;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);

  // ============================ RowKey ============================
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)[rowKey as string];
  }, [rowKey]);

  const [getRecordByKey] = useLazyKVMap(mergedData, getRowKey);

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
  const [transformColumns, selectedKeySet] = useSelection(rowSelection, {
    prefixCls,
    data: pageData,
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

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;

export default Table;
