import React from 'react';

import type { StepOption } from '..';

const useTyped = (content?: string, mergedStep?: StepOption | false) => {
  const [typedContent, setTypedContent] = React.useState<string>('');
  const [showCursor, setShowCursor] = React.useState<boolean>(false);

  const timerRef = React.useRef<ReturnType<typeof setInterval>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  React.useEffect(() => {
    if (!content || !mergedStep) {
      return;
    }
    setShowCursor(true);
    let stepCount = 0;
    const { step, interval } = mergedStep;
    timerRef.current = setInterval(() => {
      stepCount += step;
      setTypedContent(content.slice(0, stepCount) ?? '');
      if (stepCount >= content.length) {
        clearTimer();
        setShowCursor(false);
      }
    }, interval);
    return () => {
      clearTimer();
      setShowCursor(false);
    };
  }, [content, mergedStep]);

  return { typedContent, showCursor } as const;
};

export default useTyped;
