import React from 'react';

import { isNonNullable } from '../../_util/is';
import type { AnyObject } from '../../_util/type';
import type { ColumnTitleProps, FilterValue } from '../interface';

const useColumnTitleProps = <RecordType extends AnyObject = AnyObject>(
  sorterTitleProps: ColumnTitleProps<RecordType>,
  filters: Record<string, FilterValue | null>,
) => {
  const columnTitleProps = React.useMemo<ColumnTitleProps<RecordType>>(() => {
    const mergedFilters: Record<string, FilterValue> = {};
    Object.keys(filters).forEach((filterKey) => {
      const value = filters[filterKey];
      if (isNonNullable(value)) {
        mergedFilters[filterKey] = value;
      }
    });
    return { ...sorterTitleProps, filters: mergedFilters };
  }, [sorterTitleProps, filters]);
  return columnTitleProps;
};

export default useColumnTitleProps;
