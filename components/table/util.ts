/* eslint-disable import/prefer-default-export */
import type { ColumnTitle, ColumnTitleProps, ColumnType, Key } from './interface';

export function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }
  if (column.dataIndex) {
    return (Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex) as Key;
  }

  return defaultKey;
}

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`;
}

export function renderColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}

/**
 * Safe get column title
 *
 * Should filter [object Object]
 *
 * @param title
 * @returns
 */
export function safeColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  const res = renderColumnTitle(title, props);
  if (Object.prototype.toString.call(res) === '[object Object]') return '';
  return res;
}
