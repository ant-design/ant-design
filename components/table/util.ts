/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { ColumnType, ColumnTitle, ColumnTitleProps } from './interface';

const JOIN_KEY = String(Math.random());

export function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join(JOIN_KEY) : column.dataIndex;
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
