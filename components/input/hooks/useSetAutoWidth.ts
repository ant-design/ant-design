import React from 'react';
import { TextAreaRef } from 'rc-textarea';

export default function useSetAutoWidth(
  innerRef: React.RefObject<TextAreaRef | null>,
  active: boolean,
): { setAutoWidth: () => void } {
  React.useLayoutEffect(() => {
    if (active && innerRef.current) {
      innerRef.current.resizableTextArea.textArea.style.width = `${innerRef.current.resizableTextArea.textArea.offsetWidth}px`;
    }
  }, [active, innerRef]);

  const setAutoWidth = React.useCallback(() => {
    if (active && innerRef.current) {
      innerRef.current.nativeElement.style.width = 'auto';
    }
  }, [active, innerRef]);

  return { setAutoWidth };
}
