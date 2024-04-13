import React from 'react';

import type { ChatBoxProps, StepOption } from '..';

const defaultOption: StepOption = {
  step: 1,
  interval: 100,
};

const useMergedStep = (step: ChatBoxProps['step']) => {
  const mergedStep = React.useMemo<StepOption | false>(() => {
    if (step && typeof step === 'object') {
      return { ...defaultOption, ...step };
    }
    if (step === true) {
      return defaultOption;
    }
    return false;
  }, [step]);
  return mergedStep;
};

export default useMergedStep;
