import * as React from 'react';
import { composeRef, getNodeRef, supportRef } from 'rc-util/lib/ref';

import { FormContext } from '../context';
import type { InternalNamePath } from '../interface';

export default function useItemRef() {
  const { itemRef } = React.useContext(FormContext);
  const cacheRef = React.useRef<{
    name?: string;
    originRef?: React.Ref<any>;
    ref?: React.Ref<any>;
  }>({});

  function getRef(name: InternalNamePath, children: any) {
    const childrenRef: React.Ref<React.ReactElement> = supportRef(children)
      ? getNodeRef(children)
      : null;
    const nameStr = name.join('_');
    if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
      cacheRef.current.name = nameStr;
      cacheRef.current.originRef = childrenRef;
      cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
    }

    return cacheRef.current.ref;
  }

  return getRef;
}
