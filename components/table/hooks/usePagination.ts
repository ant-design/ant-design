import { useState } from 'react';
import { PaginationProps, PaginationConfig } from '../../pagination';
import { TablePaginationConfig } from '../interface';

export const DEFAULT_PAGE_SIZE = 10;

export function getPaginationParam(
  pagination: PaginationConfig | boolean | undefined,
  mergedPagination: PaginationConfig,
) {
  const param: any = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize,
  };
  const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

  Object.keys(paginationObj).forEach(pageProp => {
    const value = (mergedPagination as any)[pageProp];

    if (typeof value !== 'function') {
      param[pageProp] = value;
    }
  });

  return param;
}

export default function usePagination(
  total: number,
  pagination: TablePaginationConfig | false | undefined,
  onChange: (current: number, pageSize: number) => void,
): [TablePaginationConfig, () => void] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === 'object' ? pagination : {};

  const [innerPagination, setInnerPagination] = useState<TablePaginationConfig>(() => {
    return {
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize:
        'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE,
    };
  });

  // ============ Basic Pagination Config ============
  const mergedPagination = {
    ...innerPagination,
    ...paginationObj,
    total: paginationTotal > 0 ? paginationTotal : total,
  };

  if (!paginationTotal) {
    // Reset `current` if data length changed. Only reset when paginationObj do not have total
    const maxPage = Math.ceil(total / mergedPagination.pageSize!);
    if (maxPage < mergedPagination.current!) {
      mergedPagination.current = 1;
    }
  }

  const refreshPagination = (current: number = 1) => {
    setInnerPagination({
      ...mergedPagination,
      current,
    });
  };

  const onInternalChange: PaginationProps['onChange'] = (...args) => {
    const [current] = args;
    refreshPagination(current);

    onChange(current, args[1] || mergedPagination.pageSize!);

    if (pagination && pagination.onChange) {
      pagination.onChange(...args);
    }
  };

  const onInternalShowSizeChange: PaginationProps['onShowSizeChange'] = (...args) => {
    const [, pageSize] = args;
    setInnerPagination({
      ...mergedPagination,
      current: 1,
      pageSize,
    });

    onChange(1, pageSize);

    if (pagination && pagination.onShowSizeChange) {
      pagination.onShowSizeChange(...args);
    }
  };

  if (pagination === false) {
    return [{}, () => {}];
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
      onShowSizeChange: onInternalShowSizeChange,
    },
    refreshPagination,
  ];
}
