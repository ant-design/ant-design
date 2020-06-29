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

export function usePrevious<T = undefined>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
