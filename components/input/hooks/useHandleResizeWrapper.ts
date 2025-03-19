import React from 'react';
import type { TextAreaRef } from '@rc-component/textarea';
import raf from '@rc-component/util/lib/raf';

type ResizeWrapperHandler = (rcTextArea: TextAreaRef | null) => void;

const ELEMENT_GAP = 2;

const adjustElementWidth = (width: number, wrapper: HTMLElement): void => {
  if (wrapper.offsetWidth - width < ELEMENT_GAP) {
    // The textarea's width is increased
    wrapper.style.width = `${width + ELEMENT_GAP}px`;
  } else if (wrapper.offsetWidth - width > ELEMENT_GAP) {
    // The textarea's width is decreased
    wrapper.style.width = `${width + ELEMENT_GAP}px`;
  }
};

const useHandleResizeWrapper = () => {
  const handleResizeWrapper = React.useCallback<ResizeWrapperHandler>((rcTextArea) => {
    if (!rcTextArea) {
      return;
    }
    if (rcTextArea.resizableTextArea.textArea.style.width.includes('px')) {
      const width = Number.parseInt(
        rcTextArea.resizableTextArea.textArea.style.width.replace(/px/, ''),
      );
      raf(() => adjustElementWidth(width, rcTextArea.nativeElement));
    }
  }, []);
  return handleResizeWrapper;
};

export default useHandleResizeWrapper;
