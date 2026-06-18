import * as React from 'react';
import { EXPAND_COLUMN } from '@rc-component/table';
import { mergeProps, omit } from '@rc-component/util';

import type { AnyObject } from '../../_util/type';
import type { ColumnGroupType, ColumnsType, ColumnType } from '../interface';
import { SELECTION_COLUMN } from './useSelection';

const useFilledColumns = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  column?: Partial<ColumnType<RecordType>>,
) =>
  React.useMemo(() => {
    if (!column) {
      return columns;
    }

    const fillColumns = (currentColumns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
      currentColumns.map((col) => {
        if (col === SELECTION_COLUMN || col === EXPAND_COLUMN) {
          return col;
        }

        if ('children' in col && Array.isArray(col.children)) {
          const mergedColumn = mergeProps(
            column as Partial<ColumnGroupType<RecordType>>,
            col as Partial<ColumnGroupType<RecordType>>,
          ) as ColumnGroupType<RecordType>;

          return {
            ...mergedColumn,
            children: fillColumns(col.children),
          } as ColumnGroupType<RecordType>;
        }

        const columnWithoutChildren = omit(column as Partial<ColumnGroupType<RecordType>>, [
          'children',
        ]) as Partial<ColumnType<RecordType>>;

        return mergeProps(
          columnWithoutChildren,
          col as Partial<ColumnType<RecordType>>,
        ) as ColumnType<RecordType>;
      });

    return fillColumns(columns);
  }, [columns, column]);

export default useFilledColumns;
