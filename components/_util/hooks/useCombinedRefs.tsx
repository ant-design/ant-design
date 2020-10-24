import * as React from 'react';
import { fillRef } from '../ref';

function useCombinedRefs<T>(
  ...refs: Array<React.MutableRefObject<T> | ((instance: T) => void) | null>
) {
  const targetRef = React.useRef<T>();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      fillRef(ref, targetRef.current);
    });
  }, [refs]);

  return targetRef;
}

export default useCombinedRefs;
