import React from 'react';

import type { ChatboxProps, StepOption } from '..';

const defaultStepOption: Required<StepOption> = {
  step: 1,
  interval: 100,
};

const useStep = (step: ChatboxProps['step']) => {
  const mergedStep = React.useMemo<Required<StepOption> | false>(() => {
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

export default useStep;
