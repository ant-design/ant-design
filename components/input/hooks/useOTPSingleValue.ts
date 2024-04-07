import React from 'react';
import { substr } from 'runes2';

import type { OTPProps } from '../OTP';

const useOTPSingleValue = (valueCells: string[], mask?: OTPProps['mask']) => {
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
          // 需要使用第三方库兼容 emoji，不能直接用 mask.charAt(0)
          return substr(mask, 0, 1);
        }
      }
      return valueCells[index] || '';
    },
    [mask, valueCells],
  );
  return getSingleValue;
};

export default useOTPSingleValue;
