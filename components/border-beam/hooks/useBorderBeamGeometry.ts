import React from 'react';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import raf from '@rc-component/util/lib/raf';

import { getComputedRadius, hasRadiusValue, isHTMLElement } from '../util';

type UseBorderBeamGeometryOptions = {
  prefixCls: string;
  hostElement: HTMLElement | null;
  canInjectIntoChild: boolean;
};

const getMeasureTargetElement = (
  prefixCls: string,
  hostElement: HTMLElement,
  canInjectIntoChild: boolean,
) => {
  if (canInjectIntoChild) {
    return hostElement;
  }

  return (
    (Array.from(hostElement.children).find(
      (node) =>
        isHTMLElement(node) &&
        !node.classList.contains(`${prefixCls}-beam`) &&
        !node.classList.contains(`${prefixCls}-holder`),
    ) as HTMLElement | undefined) ?? hostElement
  );
};

const useBorderBeamGeometry = ({
  prefixCls,
  hostElement,
  canInjectIntoChild,
}: UseBorderBeamGeometryOptions) => {
  const [measuredTargetRadius, setMeasuredTargetRadius] = React.useState<string>();

  const syncGeometry = useEvent(() => {
    if (!hostElement) {
      setMeasuredTargetRadius(undefined);
      return;
    }

    const hostStyle = window.getComputedStyle(hostElement);
    const targetElement = getMeasureTargetElement(prefixCls, hostElement, canInjectIntoChild);

    // Follow the visually rendered target by default, but prefer an explicit wrapper radius
    // when wrapper mode is active so third-party children that ignore className/style can still
    // be decorated with a deterministic track radius.
    const hostRadius = getComputedRadius(hostStyle);
    const targetRadius = getComputedRadius(window.getComputedStyle(targetElement));
    const nextMeasuredRadius =
      targetElement && targetElement !== hostElement && hasRadiusValue(hostRadius)
        ? hostRadius
        : (targetRadius ?? hostRadius);

    setMeasuredTargetRadius((prevRadius) =>
      prevRadius === nextMeasuredRadius ? prevRadius : nextMeasuredRadius,
    );
  });

  useLayoutEffect(() => {
    syncGeometry();

    if (hostElement) {
      // Measure one extra frame to cover initial cases where the class is mounted but the
      // computed style is not fully settled yet. Do not keep watching after that.
      const frameId = raf(syncGeometry);

      return () => {
        raf.cancel(frameId);
      };
    }
  }, [canInjectIntoChild, hostElement, prefixCls, syncGeometry]);

  return {
    beamVisible: measuredTargetRadius !== undefined,
    trackRadius: measuredTargetRadius || '0px',
  };
};

export default useBorderBeamGeometry;
