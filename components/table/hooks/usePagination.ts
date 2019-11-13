import { useState } from 'react';
import { PaginationProps } from '../../pagination';
import { TablePaginationConfig } from '../interface';

export const DEFAULT_PAGE_SIZE = 10;

export default function usePagination(
  total: number,
  pagination?: TablePaginationConfig | false,
): [TablePaginationConfig, () => void] {
  const [innerPagination, setInnerPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total,
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

    if (pagination && pagination.onChange) {
      pagination.onChange(...args);
    }
  };

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
    refreshPagination,
  ];
}
