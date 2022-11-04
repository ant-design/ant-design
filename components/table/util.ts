/* eslint-disable import/prefer-default-export */
import React from 'react';
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

/**
 * Get first text content in Element
 *
 * @param node
 * @returns
 */
function getElementFirstTextContent(node: React.ReactElement): string {
  if (!node || !node.props || !node.props.children) return '';
  if (typeof node.props.children === 'string') return node.props.children;
  return (
    node.props.children?.map?.((item: React.ReactElement) =>
      getElementFirstTextContent(item),
    )?.[0] || ''
  );
}

/**
 * Render title by first content
 *
 * @param title
 * @returns
 */
export function renderColumnTitleWithFirstContent<RecordType>(title: ColumnTitle<RecordType>) {
  if (React.isValidElement(title)) {
    return getElementFirstTextContent(title);
  }
  return title;
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
