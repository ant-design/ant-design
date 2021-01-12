import * as React from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export default function useDeepMemo<T, U>(
  memoFn: () => T,
  dep: U,
  options: { clone: boolean } = {
    clone: false,
  },
) {
  const { clone } = options;
  const ref = React.useRef<{
    dep?: U;
    value?: T;
    clonedDep?: U;
  }>({});
  const { current } = ref;
  if (!current.value || !isEqual(dep, clone ? current.clonedDep : current.dep)) {
    if (clone) {
      current.clonedDep = cloneDeep(dep);
    } else {
      current.dep = dep;
    }

    current.value = memoFn();
  }

  return current.value;
}
