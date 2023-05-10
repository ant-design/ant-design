import { useState } from 'react';
import type { PaginationProps } from '../../pagination';
import extendsObject from '../../_util/extendsObject';
import type { TablePaginationConfig } from '../interface';

export const DEFAULT_PAGE_SIZE = 10;

export function getPaginationParam(
  mergedPagination: TablePaginationConfig,
  pagination?: TablePaginationConfig | boolean,
) {
  const param: any = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize,
  };

  const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

  Object.keys(paginationObj).forEach((pageProp: keyof typeof paginationObj) => {
    const value = mergedPagination[pageProp];

    if (typeof value !== 'function') {
      param[pageProp] = value;
    }
  });

  return param;
}

function usePagination(
  total: number,
  onChange: (current: number, pageSize: number) => void,
  pagination?: TablePaginationConfig | false,
): readonly [TablePaginationConfig, (current?: number, pageSize?: number) => void] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === 'object' ? pagination : {};

  const [innerPagination, setInnerPagination] = useState<{ current?: number; pageSize?: number }>(
    () => ({
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize:
        'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE,
    }),
  );

  // ============ Basic Pagination Config ============
  const mergedPagination = extendsObject<Partial<TablePaginationConfig>>(
    innerPagination,
    paginationObj,
    {
      total: paginationTotal > 0 ? paginationTotal : total,
    },
  );

  // Reset `current` if data length or pageSize changed
  const maxPage = Math.ceil((paginationTotal || total) / mergedPagination.pageSize!);
  if (mergedPagination.current! > maxPage) {
    // Prevent a maximum page count of 0
    mergedPagination.current = maxPage || 1;
  }

  const refreshPagination = (current?: number, pageSize?: number) => {
    setInnerPagination({
      current: current ?? 1,
      pageSize: pageSize || mergedPagination.pageSize,
    });
  };

  const onInternalChange: PaginationProps['onChange'] = (current, pageSize) => {
    if (pagination) {
      pagination.onChange?.(current, pageSize);
    }
    refreshPagination(current, pageSize);
    onChange(current, pageSize || mergedPagination?.pageSize!);
  };

  if (pagination === false) {
    return [{}, () => {}] as const;
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
    refreshPagination,
  ] as const;
}

export default usePagination;
