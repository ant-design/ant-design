import React from 'react';

import type { ChatBoxProps, StepOption } from '..';

const defaultStepOptions: StepOption = {
  step: 1,
  interval: 100,
};

const useMergedStep = (step: ChatBoxProps['step']) => {
  const mergedStep = React.useMemo<StepOption | false>(() => {
    if (step && typeof step === 'object') {
      return { ...defaultStepOptions, ...step };
    }
    if (step === true) {
      return defaultStepOptions;
    }
    return false;
  }, [step]);
  return mergedStep;
};

export default useMergedStep;
