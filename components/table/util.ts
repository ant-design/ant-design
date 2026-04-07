import { EXPAND_COLUMN } from '@rc-component/table';
import { mergeProps, omit } from '@rc-component/util';

import isNonNullable from '../_util/isNonNullable';
import type { AnyObject } from '../_util/type';
import { SELECTION_COLUMN } from './hooks/useSelection';
import type {
  ColumnGroupType,
  ColumnsType,
  ColumnTitle,
  ColumnTitleProps,
  ColumnType,
  Key,
} from './interface';

export const getColumnKey = <RecordType extends AnyObject = AnyObject>(
  column: ColumnType<RecordType>,
  defaultKey: string,
) => {
  if ('key' in column && isNonNullable(column.key)) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : (column.dataIndex as Key);
  }
  return defaultKey;
};

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`;
}

export const renderColumnTitle = <RecordType extends AnyObject = AnyObject>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) => {
  if (typeof title === 'function') {
    return title(props);
  }
  return title;
};

/**
 * Safe get column title
 *
 * Should filter [object Object]
 *
 * @param title
 */
export const safeColumnTitle = <RecordType extends AnyObject = AnyObject>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) => {
  const res = renderColumnTitle<RecordType>(title, props);
  if (Object.prototype.toString.call(res) === '[object Object]') {
    return '';
  }
  return res;
};

export const fillColumn = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  column?: Partial<ColumnType<RecordType>>,
): ColumnsType<RecordType> => {
  if (!column) {
    return columns;
  }

  return columns.map((col) => {
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
        children: fillColumn(col.children, column),
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
};
