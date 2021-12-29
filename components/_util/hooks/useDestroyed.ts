import * as React from 'react';

export default function useDestroyed() {
  const mountedRef = React.useRef<boolean>(true);

  React.useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  return () => !mountedRef.current;
}
