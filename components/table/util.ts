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

export const fillColumnDefaults = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  columnDefaults?: Partial<ColumnType<RecordType>>,
): ColumnsType<RecordType> => {
  if (!columnDefaults) {
    return columns;
  }

  return columns.map((column) => {
    if (column === SELECTION_COLUMN || column === EXPAND_COLUMN) {
      return column;
    }

    if ('children' in column && Array.isArray(column.children)) {
      const mergedColumn = mergeProps(
        columnDefaults as Partial<ColumnGroupType<RecordType>>,
        column as Partial<ColumnGroupType<RecordType>>,
      ) as ColumnGroupType<RecordType>;

      return {
        ...mergedColumn,
        children: fillColumnDefaults(column.children, columnDefaults),
      } as ColumnGroupType<RecordType>;
    }

    const columnDefaultsWithoutChildren = omit(
      columnDefaults as Partial<ColumnGroupType<RecordType>>,
      ['children'],
    ) as Partial<ColumnType<RecordType>>;

    return mergeProps(
      columnDefaultsWithoutChildren,
      column as Partial<ColumnType<RecordType>>,
    ) as ColumnType<RecordType>;
  });
};
