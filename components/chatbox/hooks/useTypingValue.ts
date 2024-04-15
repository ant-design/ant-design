import React from 'react';

import type { ChatboxProps, TypingOption } from '..';

const defaultTypingOption: Required<TypingOption> = {
  step: 1,
  interval: 100,
};

const useTypingValue = (typing: ChatboxProps['typing']) => {
  const mergedTyping = React.useMemo<Required<TypingOption> | false>(() => {
    if (typing && typeof typing === 'object') {
      return { ...defaultTypingOption, ...typing };
    }
    if (typing === true) {
      return defaultTypingOption;
    }
    return false;
  }, [typing]);
  return mergedTyping;
};

export default useTypingValue;
