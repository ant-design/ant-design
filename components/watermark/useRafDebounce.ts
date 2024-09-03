import React from 'react';
import { useEvent } from 'rc-util';
import raf from 'rc-util/lib/raf';

/**
 * Callback will only execute last one for each raf
 */
export default function useRafDebounce(callback: VoidFunction) {
  const executeRef = React.useRef(false);
  const rafRef = React.useRef<number>();

  const wrapperCallback = useEvent(callback);

  return () => {
    if (executeRef.current) {
      return;
    }

    executeRef.current = true;
    wrapperCallback();

    rafRef.current = raf(() => {
      executeRef.current = false;
    });
  };
}
