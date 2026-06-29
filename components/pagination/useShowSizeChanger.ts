import { useMemo } from 'react';

import type { PaginationProps } from '.';
import { isPlainObject } from '../_util/is';
import type { SelectProps } from '../select';

export default function useShowSizeChanger(showSizeChanger?: PaginationProps['showSizeChanger']) {
  return useMemo<[show: boolean | undefined, selectProps: SelectProps | undefined]>(() => {
    if (typeof showSizeChanger === 'boolean') {
      return [showSizeChanger, {}];
    }

    if (isPlainObject(showSizeChanger)) {
      return [true, showSizeChanger];
    }

    return [undefined, undefined];
  }, [showSizeChanger]);
}
