import * as React from 'react';
import { TransformColumns, ColumnTitleProps, ColumnsType } from '../interface';
import { renderColumnTitle } from '../util';

function fillTitle<RecordType>(
  columns: ColumnsType<RecordType>,
  columnTitleProps: ColumnTitleProps<RecordType>,
) {
  return columns.map(column => {
    const cloneColumn = { ...column };

    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);

    if ('children' in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }

    return cloneColumn;
  });
}

export default function useTitleColumns<RecordType>(
  columnTitleProps: ColumnTitleProps<RecordType>,
): [TransformColumns<RecordType>] {
  const filledColumns = React.useCallback(
    (columns: ColumnsType<RecordType>) => fillTitle(columns, columnTitleProps),
    [columnTitleProps],
  );

  return [filledColumns];
}
