import { useState } from 'react';
import { PaginationConfig, PaginationProps } from '../../pagination';

export const DEFAULT_PAGE_SIZE = 10;

export default function usePagination(
  total: number,
  pagination?: PaginationConfig | false,
): [PaginationConfig] {
  const [innerPagination, setInnerPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total,
  });

  if (pagination === false) {
    return [{}];
  }

  const mergedPagination = {
    ...innerPagination,
    ...(typeof pagination === 'object' ? pagination : null),
  };

  const onInternalChange: PaginationProps['onChange'] = (...args) => {
    const [current] = args;
    setInnerPagination({
      ...mergedPagination,
      current,
    });

    if (pagination && pagination.onChange) {
      pagination.onChange(...args);
    }
  };

  return [
    {
      ...mergedPagination,
      onChange: onInternalChange,
    },
  ];
}
