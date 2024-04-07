import React from 'react';

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
          // 这里需要兼容 emoji，不能直接用 mask.charAt(0)
          return [...mask][0];
        }
      }
      return valueCells[index] || '';
    },
    [mask, valueCells],
  );
  return getSingleValue;
};

export default useOTPSingleValue;
