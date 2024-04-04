import React from 'react';
import { substr } from 'runes2';

import type { OTPProps } from '.';

const useSingleValue = (valueCells: string[], mask?: OTPProps['mask']) => {
  const getSingleValue = React.useCallback(
    (index: number) => {
      if (!valueCells[index]) {
        return '';
      }
      if (typeof mask === 'string') {
        if (mask.length === 1) {
          return mask;
        }
        if (mask.length > 1) {
          return substr(mask, 0, 1); // 使用第三方库兼容 emoji
        }
      }
      return valueCells[index] || '';
    },
    [mask, valueCells],
  );
  return getSingleValue;
};

export default useSingleValue;
