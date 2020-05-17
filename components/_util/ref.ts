import * as React from 'react';

export function fillRef<T>(ref: React.Ref<T>, node: T) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    (ref as any).current = node;
  }
}

export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  return (node: T) => {
    refs.forEach(ref => {
      fillRef(ref, node);
    });
  };
}

export function useCombinedRefs(
  ...refs: Array<React.MutableRefObject<unknown> | ((instance: unknown) => void) | null>
) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      fillRef(ref, targetRef.current);
    });
  }, [refs]);

  return targetRef;
}
