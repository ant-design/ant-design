import * as React from 'react';
import classNames from 'classnames';
import { FilterFilled } from '@ant-design/icons';
import { TransformColumns, ColumnsType, ColumnType, ColumnTitleProps } from '../interface';
import { getColumnPos, renderColumnTitle } from '../util';

function addFilterTitle<RecordType>(
  prefixCls: string,
  column: ColumnType<RecordType>,
): ColumnType<RecordType> {
  return {
    ...column,
    title: (renderProps: ColumnTitleProps<RecordType>) => {
      return (
        <div className={classNames(`${prefixCls}-column-filter`)}>
          <span className={`${prefixCls}-column-title`}>
            {renderColumnTitle(column.title, renderProps)}
          </span>
          <span role="button" className={classNames(`${prefixCls}-filter-trigger`)}>
            <FilterFilled />
          </span>
        </div>
      );
    },
  };
}

function injectFilter<RecordType>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('filters' in column) {
      return addFilterTitle(prefixCls, column);
    } else if ('filterDropdown' in column) {
      return addFilterTitle(prefixCls, column);
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
