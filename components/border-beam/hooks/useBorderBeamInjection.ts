import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import raf from '@rc-component/util/lib/raf';
import { supportRef } from '@rc-component/util/lib/ref';

type UseBorderBeamInjectionOptions = {
  children: React.ReactNode;
  rootElement: HTMLElement | null;
};

const useBorderBeamInjection = ({ children, rootElement }: UseBorderBeamInjectionOptions) => {
  const childType = React.isValidElement(children) ? children.type : null;
  const childKey = React.isValidElement(children) ? children.key : null;
  const isHostElement = React.isValidElement(children) && typeof children.type === 'string';
  const [fallbackToWrapper, setFallbackToWrapper] = React.useState(false);
  const canInjectIntoChild =
    React.isValidElement(children) && supportRef(children) && !fallbackToWrapper;

  // Reset the wrapper fallback when the rendered child actually changes.
  useLayoutEffect(() => {
    setFallbackToWrapper(false);
  }, [childKey, childType]);

  // Non-host components may expose the DOM ref asynchronously, so wait one frame before falling
  // back to the outer wrapper. This only answers whether the beam can be injected into the child.
  useLayoutEffect(() => {
    if (!React.isValidElement(children) || !canInjectIntoChild) {
      return;
    }

    if (!rootElement) {
      if (isHostElement) {
        return;
      }

      const frameId = raf(() => {
        setFallbackToWrapper(true);
      });

      return () => {
        raf.cancel(frameId);
      };
    }
  }, [canInjectIntoChild, children, isHostElement, rootElement]);

  return {
    canInjectIntoChild,
  };
};

export default useBorderBeamInjection;
