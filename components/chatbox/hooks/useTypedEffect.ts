import React from 'react';

import type { TypingOption } from '..';

const useTypedEffect = (content?: string, mergedTyping?: Required<TypingOption> | false) => {
  const [typedContent, setTypedContent] = React.useState<string>('');
  const [showCursor, setShowCursor] = React.useState<boolean>(false);

  const timerRef = React.useRef<ReturnType<typeof setInterval>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  React.useEffect(() => {
    if (!content || !mergedTyping) {
      return;
    }
    setShowCursor(true);
    let stepCount = 0;
    const { step, interval } = mergedTyping;
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
  }, [content, mergedTyping]);

  return { typedContent, showCursor };
};

export default useTypedEffect;
