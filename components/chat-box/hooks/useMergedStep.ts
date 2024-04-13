import React from 'react';

import type { ChatBoxProps, StepOption } from '..';

const defaultStepOption: StepOption = {
  step: 1,
  interval: 100,
};

const useMergedStep = (step: ChatBoxProps['step']) => {
  const mergedStep = React.useMemo<StepOption | false>(() => {
    if (step && typeof step === 'object') {
      return { ...defaultStepOption, ...step };
    }
    if (step === true) {
      return defaultStepOption;
    }
    return false;
  }, [step]);
  return mergedStep;
};

export default useMergedStep;
