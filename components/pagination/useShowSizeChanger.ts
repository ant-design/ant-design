import { useMemo } from 'react';

import type { PaginationProps } from '.';
import type { SelectProps } from '../select';

export default function useShowSizeChanger(showSizeChanger?: PaginationProps['showSizeChanger']) {
  return useMemo<[show: boolean | undefined, selectProps: SelectProps | undefined]>(() => {
    if (typeof showSizeChanger === 'boolean') {
      return [showSizeChanger, {}];
    }

    if (showSizeChanger && typeof showSizeChanger === 'object') {
      return [true, showSizeChanger];
    }

    return [undefined, undefined];
  }, [showSizeChanger]);
}
