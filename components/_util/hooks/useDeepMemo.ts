import * as React from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export default function useDeepMemo<T>(
  memoFn: () => T,
  dep: any,
  options: { clone: boolean } = {
    clone: false,
  },
) {
  const { clone } = options;
  const ref = React.useRef<T>();
  if (!ref.current || !isEqual(dep, ref.current)) {
    let val = memoFn();
    if (clone) {
      val = cloneDeep(val);
    }
    ref.current = val;
  }

  return ref.current;
}
