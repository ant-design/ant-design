import { EXPAND_COLUMN, INTERNAL_COL_DEFINE } from '@rc-component/table';
import { isNonNullable } from '@rc-component/util';
import { isFunction, isPlainObject } from '../_util/is';
import type { AnyObject } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';
import type {
  ColumnGroupType,
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

export interface ColumnPosNode {
  pos: string;
  children?: (ColumnPosNode | undefined)[];
}

/**
 * Rendered columns can differ from the `columns` prop: Table removes columns hidden by
 * `responsive`, and rc-table removes `hidden` columns at every level and inserts the expand column.
 * Map each rendered column back to its position in `baseColumns`, so the positional key of a column
 * without `key` or `dataIndex` matches the one used to collect its sorter and filter states.
 */
export const getColumnPosTree = <RecordType extends AnyObject = AnyObject>(
  renderColumns: ColumnsType<RecordType>,
  baseColumns: ColumnsType<RecordType>,
  visibleColumns: ColumnsType<RecordType>,
  pos?: string,
): (ColumnPosNode | undefined)[] => {
  // rc-table drops `EXPAND_COLUMN` placeholders and `hidden` columns, and keeps the others in order
  const originColumns = visibleColumns.filter(
    (column) => column !== EXPAND_COLUMN && !column.hidden,
  );
  let originIndex = 0;
  let baseIndex = -1;

  return renderColumns.map((column: any) => {
    if (column[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN') {
      return undefined;
    }
    const originColumn = originColumns[originIndex];
    originIndex += 1;
    // `originColumns` keeps the order of `baseColumns`. Search after the previous match, so a column
    // object used twice keeps both positions
    baseIndex = baseColumns.indexOf(originColumn, baseIndex + 1);

    const columnPos = getColumnPos(baseIndex, pos);
    const originChildren = (originColumn as ColumnGroupType<RecordType>).children;
    return {
      pos: columnPos,
      children:
        column.children && originChildren
          ? getColumnPosTree(column.children, originChildren, originChildren, columnPos)
          : undefined,
    };
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
