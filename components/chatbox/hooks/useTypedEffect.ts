import React from 'react';

import type { TypingOption } from '../interface';

const useTypedEffect = (content?: string, mergedTyping?: Required<TypingOption> | false) => {
  const [typedContent, setTypedContent] = React.useState<string>('');
  const [showCursor, setShowCursor] = React.useState<boolean>(mergedTyping !== false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  React.useEffect(() => {
    if (!content || !mergedTyping) {
      return;
    }
    setShowCursor(true);
    let stepCount = 0;
    const { step, interval } = mergedTyping;

    const typedTimer = () => {
      stepCount += step;
      setTypedContent(content.slice(0, stepCount) ?? '');
      if (stepCount < content.length) {
        timerRef.current = setTimeout(typedTimer, interval);
      } else {
        setShowCursor(false);
      }
    };

    typedTimer();

    return () => {
      clearTimer();
      setShowCursor(false);
    };
  }, [content, mergedTyping]);

  return { typedContent, showCursor };
};

export default useTypedEffect;
