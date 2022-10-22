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

export function renderColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  if (typeof title === 'function') {
    return title(props);
  }
  // fix: #38155
  if (React.isValidElement(title)) {
    // if title is a React Element, we should get first text content as result,
    // if there has not text content in React Element, return origin title
    return getElementFirstTextContent(title) || title;
  }

  return title;
}
