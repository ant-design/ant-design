import * as React from 'react';
import classNames from 'classnames';
import { TransformColumns, ColumnsType, ColumnType } from '../interface';
import { getColumnPos } from '../util';

function addFilterTitle<RecordType>(column: ColumnType<RecordType>): ColumnType<RecordType> {
  const { filters } = column;
}

function injectFilter<RecordType>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('filters' in column) {
      return addFilterTitle(column);
    } else if ('filterDropdown' in column) {
    }

    return column;
  });
}

interface FilterConfig<RecordType> {
  prefixCls: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
}

function useFilter<RecordType>({
  prefixCls,
  data,
}: FilterConfig<RecordType>): [TransformColumns<RecordType>, RecordType[]] {
  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>) => injectFilter(prefixCls, innerColumns),
    [],
  );

  return [transformColumns, data];
}

export default useFilter;
