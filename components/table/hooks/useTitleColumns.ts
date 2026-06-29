import * as React from 'react';
import type { AnyObject } from 'antd/es/_util/type';

import type {
  ColumnGroupType,
  ColumnsType,
  ColumnTitleProps,
  ColumnType,
  TransformColumns,
} from '../interface';
import { renderColumnTitle } from '../util';

const fillTitle = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  columnTitleProps: ColumnTitleProps<RecordType>,
) => {
  const finalColumns = columns.map((column) => {
    const cloneColumn: ColumnGroupType<RecordType> | ColumnType<RecordType> = { ...column };
    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);
    if ('children' in cloneColumn) {
      cloneColumn.children = fillTitle<RecordType>(cloneColumn.children, columnTitleProps);
    }
    return cloneColumn;
  });
  return finalColumns;
};

const useTitleColumns = <RecordType extends AnyObject = AnyObject>(
  columnTitleProps: ColumnTitleProps<RecordType>,
) => {
  const filledColumns = React.useCallback<TransformColumns<RecordType>>(
    (columns) => fillTitle<RecordType>(columns, columnTitleProps),
    [columnTitleProps],
  );
  return [filledColumns] as const;
};

export default useTitleColumns;
