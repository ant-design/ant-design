import React from 'react';

// Annotate the return type so the generated declaration does not reference
// React.ActionDispatch, which only exists in @types/react 19 and broke v5
// consumers compiling with @types/react 16-18 (#59881).
export const useForceUpdate = (): [number, () => void] => {
  const [count, setCount] = React.useState(0);
  return [count, () => setCount((c) => c + 1)];
};
