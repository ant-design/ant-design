import { useState } from 'react';
import { PaginationConfig } from '../../pagination';

export const DEFAULT_PAGE_SIZE = 10;

export default function usePagination(
  total: number,
  pagination?: PaginationConfig | false,
): [PaginationConfig, (pagination: PaginationConfig) => void] {
  const [innerPagination, setInnerPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total,
  });

  if (pagination === false) {
    return [{}, setInnerPagination];
  }

  return [
    {
      ...pagination,
      ...innerPagination,
    },
    setInnerPagination,
  ];
}
