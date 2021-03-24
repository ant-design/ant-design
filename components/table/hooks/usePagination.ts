import { useState } from 'react';
import { PaginationProps } from '../../pagination';
import { TablePaginationConfig } from '../interface';

export const DEFAULT_PAGE_SIZE = 10;

export function getPaginationParam(
  pagination: TablePaginationConfig | boolean | undefined,
  mergedPagination: TablePaginationConfig,
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

function extendsObject<T extends Object>(...list: T[]) {
  const result: T = {} as T;

  list.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = (obj as any)[key];
        if (val !== undefined) {
          (result as any)[key] = val;
        }
      });
    }
  });

  return result;
}

export default function usePagination(
  total: number,
  pagination: TablePaginationConfig | false | undefined,
  onChange: (current: number, pageSize: number) => void,
): [TablePaginationConfig, () => void] {
  const { total: paginationTotal = 0, ...paginationObj } =
    pagination && typeof pagination === 'object' ? pagination : {};

  const [innerPagination, setInnerPagination] = useState<{
    current?: number;
    pageSize?: number;
  }>(() => ({
    current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
    pageSize:
      'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE,
  }));

  // ============ Basic Pagination Config ============
  const mergedPagination = extendsObject<Partial<TablePaginationConfig>>(
    innerPagination,
    paginationObj,
    {
      total: paginationTotal > 0 ? paginationTotal : total,
    },
  );

  if (!paginationTotal) {
    // Reset `current` if data length changed. Only reset when paginationObj do not have total
    const maxPage = Math.ceil(total / mergedPagination.pageSize!);
    if (maxPage < mergedPagination.current!) {
      mergedPagination.current = 1;
    }
  }

  const refreshPagination = (current: number = 1, pageSize?: number) => {
    setInnerPagination({
      current,
      pageSize: pageSize || mergedPagination.pageSize,
    });
  };

  const onInternalChange: PaginationProps['onChange'] = (current, pageSize) => {
    const paginationPageSize = mergedPagination?.pageSize;
    if (pageSize && pageSize !== paginationPageSize) {
      current = 1;
    }
    if (pagination && pagination.onChange) pagination.onChange(current, pageSize);

    refreshPagination(current, pageSize);
    onChange(current, pageSize || paginationPageSize!);
  };

  if (pagination === false) {
    return [{}, () => {}];
  }

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
    refreshPagination,
  ];
}
