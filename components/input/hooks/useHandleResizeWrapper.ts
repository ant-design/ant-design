import { TextAreaRef } from 'rc-textarea';
import React from 'react';

type ResizeWrapperHandler = (rcTextArea: TextAreaRef | null) => void;

const ELEMENT_GAP = 2;

export default function useHandleResizeWrapper(): { handleResizeWrapper: ResizeWrapperHandler } {
  const prevWidthRef = React.useRef<number | null>(null);

  const handleResizeWrapper: ResizeWrapperHandler = React.useCallback((rcTextArea) => {
    if (!rcTextArea) return;
    if (rcTextArea.resizableTextArea.textArea.style.width.includes('px')) {
      const width = parseInt(rcTextArea.resizableTextArea.textArea.style.width.replace('px', ''));
      if (rcTextArea.nativeElement.offsetWidth - width < ELEMENT_GAP) {
        // The textarea's width is increased
        rcTextArea.nativeElement.style.width = `${width + ELEMENT_GAP}px`;
        prevWidthRef.current = width;
      } else if (rcTextArea.nativeElement.offsetWidth - width > ELEMENT_GAP) {
        // The textarea's width is decreased
        rcTextArea.nativeElement.style.width = `${width + ELEMENT_GAP}px`;
        prevWidthRef.current = width;
      }
    }
  }, []);

  return { handleResizeWrapper };
}
