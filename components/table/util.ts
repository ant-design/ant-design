/* eslint-disable import/prefer-default-export */
import { ColumnType, ColumnTitle, ColumnTitleProps, Key } from './interface';

export function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }
  const dataIndex = column.dataIndex as string | number | React.Key[] | undefined;

  if (dataIndex) {
    return Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex;
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
