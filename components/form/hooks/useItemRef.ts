import * as React from 'react';
import { composeRef, getNodeRef } from '@rc-component/util/lib/ref';

import { isPlainObject } from '../../_util/is';
import { FormContext } from '../context';
import type { InternalNamePath } from '../interface';

const useItemRef = () => {
  const { itemRef } = React.useContext(FormContext);
  const cacheRef = React.useRef<{
    name?: string;
    originRef?: React.Ref<any>;
    ref?: React.Ref<any>;
  }>({});

  const getRef = (name: InternalNamePath, children: any) => {
    // Outer caller already check the `supportRef`
    const childrenRef: React.Ref<React.ReactElement<any>> =
      children && isPlainObject<React.ReactElement<any>>(children) && getNodeRef(children);

    const nameStr = name.join('_');
    if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
      cacheRef.current.name = nameStr;
      cacheRef.current.originRef = childrenRef;
      cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
    }

    return cacheRef.current.ref;
  };

  return getRef;
};

export default useItemRef;
