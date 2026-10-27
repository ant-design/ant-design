import { EXPAND_COLUMN, INTERNAL_COL_DEFINE } from '@rc-component/table';
import { isNonNullable } from '@rc-component/util';
import { isFunction, isPlainObject } from '../_util/is';
import type { AnyObject } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';
import type {
  ColumnsType,
  ColumnTitle,
  ColumnTitleProps,
  ColumnType,
  Key,
  TablePaginationPlacement,
  TablePaginationPosition,
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

/**
 * Rendered columns can differ from the `columns` prop: columns hidden by `responsive` are removed
 * and the expand column is inserted. Map each rendered top-level column back to its position in
 * `baseColumns`, so the positional key of a column without `key` or `dataIndex` matches the one
 * used to collect its sorter and filter states.
 */
export const getColumnPosList = <RecordType extends AnyObject = AnyObject>(
  renderColumns: ColumnsType<RecordType>,
  visibleColumns: ColumnsType<RecordType>,
  baseColumns: ColumnsType<RecordType>,
): string[] => {
  // rc-table replaces or removes `EXPAND_COLUMN` placeholders and keeps the other columns in order
  const originColumns = visibleColumns.filter((column) => column !== EXPAND_COLUMN);
  let originIndex = 0;

  return renderColumns.map((column: any, index) => {
    if (column[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN') {
      return getColumnPos(index);
    }
    const baseIndex = baseColumns.indexOf(originColumns[originIndex]);
    originIndex += 1;
    return getColumnPos(baseIndex === -1 ? index : baseIndex);
  });
};

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
 * @description Safe get column title, Should filter object
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

export const normalizePlacement = (pos: TablePaginationPlacement | TablePaginationPosition) => {
  const lowerPos = pos.toLowerCase();
  if (lowerPos.includes('center')) {
    return 'center';
  }
  return lowerPos.includes('left') || lowerPos.includes('start') ? 'start' : 'end';
};

export const getPaginationSize = (paginationSize: SizeType, mergedSize: SizeType): SizeType => {
  if (paginationSize) {
    return paginationSize;
  }
  if (mergedSize === 'small' || mergedSize === 'medium') {
    return 'small';
  }
  return undefined;
};
