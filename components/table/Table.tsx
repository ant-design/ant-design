import * as React from 'react';
import RcTable, { Column, ColumnGroup } from 'rc-table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';
import Checkbox, { CheckboxProps } from '../checkbox';
import Pagination, { PaginationConfig } from '../pagination';
import { ConfigContext } from '../config-provider/context';
import usePagination, { DEFAULT_PAGE_SIZE } from './hooks/usePagination';
import { TableRowSelection, ColumnsType, Key } from './interface';

const EMPTY_LIST: any[] = [];

export interface TableProps<RecordType> extends RcTableProps<RecordType> {
  dataSource?: RcTableProps<RecordType>['data'];
  pagination?: false | PaginationConfig;

  // TODO: handle this
  onChange?: () => void;
  rowSelection?: TableRowSelection<RecordType>;
}

function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const { prefixCls: customizePrefixCls, dataSource, pagination, rowSelection, rowKey } = props;
  const mergedData: RecordType[] = dataSource || EMPTY_LIST;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('table', customizePrefixCls);

  // ============================ RowKey ============================
  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)[rowKey as string];
  }, [rowKey]);

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

  // =========================== Checkbox ===========================
  const { selectedRowKeys, getCheckboxProps } = rowSelection || {};

  const [innerSelectedKeys, setInnerSelectedKeys] = React.useState<Key[]>();
  const mergedSelectedKeys = selectedRowKeys || innerSelectedKeys || EMPTY_LIST;

  const transformColumns = React.useCallback(
    (columns: ColumnsType<RecordType>) => {
      if (!rowSelection) {
        return columns;
      }

      // Support selection
      const keySet = new Set(mergedSelectedKeys);

      // Get all checkbox props
      const checkboxPropsMap = new Map<Key, Partial<CheckboxProps>>();
      pageData.forEach((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = getCheckboxProps ? getCheckboxProps(record) : null;
        checkboxPropsMap.set(key, checkboxProps || {});
      });

      // Record key only need check with enabled
      const recordKeys = pageData
        .map(getRowKey)
        .filter(key => !checkboxPropsMap.get(key)!.disabled);
      const checkedCurrentAll = recordKeys.every(key => keySet.has(key));
      const checkedCurrentSome = recordKeys.some(key => keySet.has(key));

      const onSelectAllChange = () => {
        if (checkedCurrentAll) {
          recordKeys.forEach(key => {
            keySet.delete(key);
          });
        } else {
          recordKeys.forEach(key => {
            keySet.add(key);
          });
        }
        setInnerSelectedKeys(Array.from(keySet));
      };

      return [
        {
          title: (
            <Checkbox
              checked={checkedCurrentAll}
              indeterminate={!checkedCurrentAll && checkedCurrentSome}
              onChange={onSelectAllChange}
            />
          ),
          render: (_: RecordType, record: RecordType, index: number) => {
            const key = getRowKey(record, index);

            return (
              <Checkbox
                {...checkboxPropsMap.get(key)}
                checked={keySet.has(key)}
                onChange={() => {
                  if (keySet.has(key)) {
                    keySet.delete(key);
                  } else {
                    keySet.add(key);
                  }
                  setInnerSelectedKeys(Array.from(keySet));
                }}
              />
            );
          },
        },
        ...columns,
      ];
    },
    [getRowKey, pageData, rowSelection, innerSelectedKeys, mergedSelectedKeys],
  );

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
