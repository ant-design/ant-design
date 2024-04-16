import React from 'react';

import type { ChatboxProps, TypingOption } from '../interface';

function isObject(value: any): value is Record<PropertyKey, any> {
  return value && typeof value === 'object';
}

const defaultTypingOption: Required<TypingOption> = {
  step: 1,
  interval: 100,
};

const useTypingValue = (typing: ChatboxProps['typing']) => {
  const mergedTyping = React.useMemo<Required<TypingOption> | false>(
    () => {
      if (isObject(typing)) {
        return { ...defaultTypingOption, ...typing };
      }
      if (typing === true) {
        return defaultTypingOption;
      }
      return false;
    },
    isObject(typing) ? [typing.interval, typing.step] : [typing],
  );
  return mergedTyping;
};

export default useTypingValue;
