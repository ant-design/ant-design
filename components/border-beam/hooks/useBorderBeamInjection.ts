import React from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import raf from '@rc-component/util/lib/raf';
import { supportRef } from '@rc-component/util/lib/ref';

import { canElementHostBorderBeam, canHTMLTagHostBorderBeam } from '../util';

type UseBorderBeamInjectionOptions = {
  children: React.ReactNode;
  hostElement: HTMLElement | null;
};

const useBorderBeamInjection = ({ children, hostElement }: UseBorderBeamInjectionOptions) => {
  const childType = React.isValidElement(children) ? children.type : null;
  const childKey = React.isValidElement(children) ? children.key : null;
  const isHostElement = React.isValidElement(children) && typeof children.type === 'string';
  const childTagName = isHostElement ? (children.type as string) : null;
  const canInjectByType =
    React.isValidElement(children) &&
    supportRef(children) &&
    (!childTagName || canHTMLTagHostBorderBeam(childTagName));
  const [fallbackToWrapper, setFallbackToWrapper] = React.useState(false);
  const canInjectIntoChild = canInjectByType && !fallbackToWrapper;

  // A child type/key change means React is switching to a new decorated target, so rerun the
  // one-time direct-injection decision for that instance.
  useLayoutEffect(() => {
    setFallbackToWrapper(false);
  }, [childKey, childType]);

  // Make the direct-injection decision once per child instance. If the host never resolves or
  // cannot safely contain the holder, fall back to wrapper mode and stay there.
  useLayoutEffect(() => {
    if (!canInjectByType || fallbackToWrapper) {
      return;
    }

    if (!hostElement) {
      const frameId = raf(() => {
        setFallbackToWrapper(true);
      });

      return () => {
        raf.cancel(frameId);
      };
    }
    if (!canElementHostBorderBeam(hostElement)) {
      setFallbackToWrapper(true);
    }
  }, [canInjectByType, fallbackToWrapper, hostElement]);

  return {
    canInjectIntoChild,
  };
};

export default useBorderBeamInjection;
