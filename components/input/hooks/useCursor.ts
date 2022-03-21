// Simplicated version of: https://github.com/react-component/input-number/blob/master/src/hooks/useCursor.ts

import React from 'react';
export function useCursor(getInputElement: () => HTMLTextAreaElement | undefined) {
  const [endText, setEndText] = React.useState<string | null>(null);

  function recordCursor() {
    const inputElement = getInputElement();
    if (!inputElement) {
      setEndText(null);
      return;
    }
    const cursorPosition = inputElement.selectionEnd;
    setEndText(inputElement.value.slice(cursorPosition));
  }

  function resetCursor() {
    const inputElement = getInputElement();
    if (!inputElement) {
      setEndText(null);
      return;
    }
    const {value} = inputElement;
    if (endText && value.endsWith(endText)) {
      const newCursorPosition = value.length - endText.length;
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      setEndText(null);
    }
  }

  return [recordCursor, resetCursor];
}
