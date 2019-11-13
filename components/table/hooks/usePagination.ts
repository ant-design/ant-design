import { useState } from 'react';
import { PaginationProps } from '../../pagination';
import { TablePaginationConfig } from '../interface';

export const DEFAULT_PAGE_SIZE = 10;

export default function usePagination(
  total: number,
  pagination?: TablePaginationConfig | false,
  onChange: (current: number, pageSize: number) => void,
): [TablePaginationConfig, () => void] {
  const [innerPagination, setInnerPagination] = useState<TablePaginationConfig>(() => {
    const paginationObj = pagination && typeof pagination === 'object' ? pagination : {};

    return {
      current: 'defaultCurrent' in paginationObj ? paginationObj.defaultCurrent : 1,
      pageSize:
        'defaultPageSize' in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE,
      total,
    };
  });

  if (pagination === false) {
    return [{}, () => {}];
  }

  const mergedPagination = {
    ...innerPagination,
    ...(typeof pagination === 'object' ? pagination : null),
  };

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

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
      onShowSizeChange: onInternalShowSizeChange,
    },
    refreshPagination,
  ];
}
