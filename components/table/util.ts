import { isFunction, isNonNullable, isPlainObject } from '../_util/is';
import type { AnyObject } from '../_util/type';
import type { SizeType } from '../config-provider/SizeContext';
import type { SpinProps } from '../spin';
import type {
  ColumnTitle,
  ColumnTitleProps,
  ColumnType,
  FilterValue,
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

export const getMergedFilters = (filters: Record<string, FilterValue | null>) => {
  const mergedFilters: Record<string, FilterValue> = {};
  Object.keys(filters).forEach((filterKey) => {
    const value = filters[filterKey];
    if (isNonNullable(value)) {
      mergedFilters[filterKey] = value;
    }
  });
  return mergedFilters;
};

export const getSpinProps = (loading?: boolean | SpinProps): SpinProps => {
  if (typeof loading === 'boolean') {
    return { spinning: loading };
  }
  if (isPlainObject<SpinProps>(loading)) {
    return { spinning: true, ...loading };
  }
  return {};
};
