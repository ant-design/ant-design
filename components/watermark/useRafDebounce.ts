import React from 'react';
import { raf, useEvent } from '@rc-component/util';

/**
 * Callback will only execute last one for each raf
 */
export default function useRafDebounce(callback: VoidFunction) {
  const executeRef = React.useRef(false);

  const wrapperCallback = useEvent(callback);

  return () => {
    if (executeRef.current) {
      return;
    }

    executeRef.current = true;
    wrapperCallback();

    raf(() => {
      executeRef.current = false;
    });
  };
}
