import React from 'react';
import { getDOM, getNodeRef, supportRef, useComposeRef } from '@rc-component/util';

import { cloneElement } from '../../_util/reactNode';

/**
 * Merge the child ref with an internal ref and expose the resolved DOM node.
 *
 * @returns A tuple containing the renderable child node and the DOM node resolved from its ref.
 */
const useChildDom = (
  children: React.ReactNode,
): [childNode: React.ReactNode, domNode: HTMLElement | SVGElement | null] => {
  const [domNode, setDomNode] = React.useState<HTMLElement | SVGElement | null>(null);
  const childNode = React.isValidElement(children) ? children : null;
  const internalRef = React.useCallback(
    (node: React.ReactInstance | HTMLElement | SVGElement | null) => {
      const nextDom = getDOM(node);

      setDomNode((prevDom) => (prevDom === nextDom ? prevDom : nextDom));
    },
    [],
  );
  const mergedRef = useComposeRef(childNode ? getNodeRef(childNode) : null, internalRef);

  if (!childNode || !supportRef(childNode)) {
    return [children, domNode];
  }

  return [cloneElement(childNode, { ref: mergedRef }), domNode];
};

export default useChildDom;
