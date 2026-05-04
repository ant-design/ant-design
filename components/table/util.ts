import { isFunction, isNonNullable, isPlainObject } from '../_util/is';
import type { AnyObject } from '../_util/type';
import type { ColumnTitle, ColumnTitleProps, ColumnType, Key } from './interface';

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
  if (isFunction(title)) {
    return title(props);
  }
  return title;
};

/**
 * Safe get column title
 *
 * Should filter object
 *
 * @param title
 */
export const safeColumnTitle = <RecordType extends AnyObject = AnyObject>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) => {
  const result = renderColumnTitle<RecordType>(title, props);
  if (isPlainObject<RecordType>(result) || Array.isArray(result)) {
    return '';
  }
  return result;
};
