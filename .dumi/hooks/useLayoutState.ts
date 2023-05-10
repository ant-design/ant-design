import { startTransition, useState } from 'react';

const useLayoutState = <S>(
  ...args: Parameters<typeof useState<S>>
): ReturnType<typeof useState<S>> => {
  const [state, setState] = useState<S>(...args);

  const setLayoutState: typeof setState = (...setStateArgs) => {
    startTransition(() => {
      setState(...setStateArgs);
    });
  };

  return [state, setLayoutState];
};

export default useLayoutState;
