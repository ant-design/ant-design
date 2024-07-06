import { useTransition, useState } from 'react';

const useLayoutState = <S>(
  defaultState: any,
): [...ReturnType<typeof useState<S>>, isPending: boolean] => {
  const [state, setState] = useState<S>(defaultState);
  const [isPending, startTransition] = useTransition();

  const setLayoutState: typeof setState = (...setStateArgs) => {
    startTransition(() => {
      setState(...setStateArgs);
    });
  };

  return [state, setLayoutState as ReturnType<typeof useState<S>>[1], isPending];
};

export default useLayoutState;
