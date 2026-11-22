import * as React from 'react';
import type { AnyObject } from 'antd/es/_util/type';

import type { ColumnGroupType, ColumnsType, ColumnTitleProps, ColumnType } from '../interface';
import { renderColumnTitle } from '../util';

const useTitleColumns = <RecordType extends AnyObject = AnyObject>(
  columnTitleProps: ColumnTitleProps<RecordType>,
) => {
  return React.useCallback(
    (columns: ColumnsType<RecordType>, treeColumnIndex: number) => {
      let leafIndex = 0;
      const fillTitle = (column: ColumnsType<RecordType>[number]) => {
        const cloneColumn: ColumnGroupType<RecordType> | ColumnType<RecordType> = { ...column };
        cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);
        if ('children' in cloneColumn && cloneColumn.children.length) {
          cloneColumn.children = cloneColumn.children.map(fillTitle);
        } else if (leafIndex++ === treeColumnIndex && !column.ellipsis) {
          cloneColumn.onCell = (record, index) => ({
            ...column.onCell?.(record, index),
            'data-table-tree-cell': true,
          });
        }
        return cloneColumn;
      };
      return columns.map(fillTitle);
    },
    [columnTitleProps],
  );
};

export default useTitleColumns;
