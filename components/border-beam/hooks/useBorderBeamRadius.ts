import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import raf from '@rc-component/util/lib/raf';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import throttleByAnimationFrame from '../../_util/throttleByAnimationFrame';
import { getComputedRadius, hasRadiusValue, toCSSLength } from '../util';

type UseBorderBeamRadiusOptions = {
  prefixCls: string;
  configuredRadius: React.CSSProperties['borderRadius'] | undefined;
  children: React.ReactNode;
};

// Reuse a stable empty target when inferred radius tracking is disabled.
const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];

// Watch the wrapper for child replacement and class/style driven radius updates.
const ROOT_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
  attributes: true,
  attributeFilter: ['class', 'style'],
};

// Watch the inferred child for its own class/style driven radius updates.
const CHILD_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class', 'style'],
};

const useBorderBeamRadius = ({
  prefixCls,
  configuredRadius,
  children,
}: UseBorderBeamRadiusOptions) => {
  // Explicit configuration always wins and doubles as the client-side fallback before inference settles.
  const configuredTrackRadius = toCSSLength(configuredRadius, '0px');
  // Only infer from DOM when the caller does not provide a radius upfront.
  const needMeasureChildRadius = configuredRadius === undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [observedChildElement, setObservedChildElement] = React.useState<HTMLElement>();
  const [measuredChildRadius, setMeasuredChildRadius] = React.useState<string>();
  // Prevent SSR from exposing a long-lived 0px beam before the first client measurement finishes.
  const [forceBeamVisible, setForceBeamVisible] = React.useState(false);
  const prevNeedMeasureChildRadiusRef = React.useRef(needMeasureChildRadius);
  const needMeasureChanged = prevNeedMeasureChildRadiusRef.current !== needMeasureChildRadius;
  // The beam stays hidden during the initial inferred-radius window, then becomes visible once
  // either a measured radius exists or the client-side fallback timeout releases it.
  const beamVisible =
    !needMeasureChildRadius ||
    measuredChildRadius !== undefined ||
    (!needMeasureChanged && forceBeamVisible);

  prevNeedMeasureChildRadiusRef.current = needMeasureChildRadius;

  const setRootNode = useEvent((node: HTMLDivElement | null) => {
    rootRef.current = node;

    setRootElement((prevNode) => (prevNode === node ? prevNode : node));
  });

  const syncMeasuredChildRadius = useEvent(() => {
    const currentRootElement = rootRef.current;
    const childElement = Array.from(currentRootElement?.children ?? []).find(
      (node) => !node.classList.contains(`${prefixCls}-beam`),
    ) as HTMLElement | undefined;

    setObservedChildElement((prevChildElement) =>
      prevChildElement === childElement ? prevChildElement : childElement,
    );

    const rootRadius = currentRootElement
      ? getComputedRadius(window.getComputedStyle(currentRootElement))
      : undefined;
    const nextChildRadius = childElement
      ? getComputedRadius(window.getComputedStyle(childElement))
      : undefined;
    // Prefer the wrapper radius when it is already styled, otherwise follow the first child.
    const nextMeasuredRadius = hasRadiusValue(rootRadius) ? rootRadius : nextChildRadius;

    setMeasuredChildRadius((prevRadius) => {
      if (prevRadius === nextMeasuredRadius) {
        return prevRadius;
      }

      return nextMeasuredRadius;
    });
  });

  const scheduleMeasuredChildRadiusSync = React.useMemo(
    () => throttleByAnimationFrame(syncMeasuredChildRadius),
    [syncMeasuredChildRadius],
  );

  useLayoutEffect(() => {
    let fallbackFrameId: number | null = null;

    if (!needMeasureChildRadius) {
      setObservedChildElement((prevChildElement) =>
        prevChildElement === undefined ? prevChildElement : undefined,
      );
      setMeasuredChildRadius((prevRadius) => (prevRadius === undefined ? prevRadius : undefined));
      setForceBeamVisible((prevVisible) => (prevVisible ? false : prevVisible));

      return;
    }

    if (needMeasureChanged) {
      setForceBeamVisible((prevVisible) => (prevVisible ? false : prevVisible));
    }

    // Measure immediately after commit, then queue one more pass so class-driven styles that land
    // on the next frame still have a chance to update the beam radius before it becomes visible.
    syncMeasuredChildRadius();
    scheduleMeasuredChildRadiusSync();

    if (measuredChildRadius === undefined && !forceBeamVisible) {
      // Release the hidden beam on the next client frame so true zero-radius containers still render.
      fallbackFrameId = raf(() => {
        fallbackFrameId = null;
        setForceBeamVisible(true);
      });
    }

    return () => {
      if (fallbackFrameId !== null) {
        raf.cancel(fallbackFrameId);
      }
    };
  }, [
    children,
    forceBeamVisible,
    measuredChildRadius,
    needMeasureChanged,
    needMeasureChildRadius,
    rootElement,
    scheduleMeasuredChildRadiusSync,
    syncMeasuredChildRadius,
  ]);

  const onChildMutate = useEvent(() => {
    scheduleMeasuredChildRadiusSync();
  });

  React.useEffect(
    () => () => {
      scheduleMeasuredChildRadiusSync.cancel();
    },
    [scheduleMeasuredChildRadiusSync],
  );

  const rootMutationTarget =
    needMeasureChildRadius && rootElement ? rootElement : EMPTY_MUTATION_TARGETS;
  const childMutationTarget =
    needMeasureChildRadius && observedChildElement ? observedChildElement : EMPTY_MUTATION_TARGETS;

  useMutateObserver(rootMutationTarget, onChildMutate, ROOT_MUTATION_OBSERVER_OPTIONS);
  useMutateObserver(childMutationTarget, onChildMutate, CHILD_MUTATION_OBSERVER_OPTIONS);

  React.useEffect(() => {
    if (!needMeasureChildRadius || typeof ResizeObserver === 'undefined') {
      return;
    }

    // Keep percentage or class-driven radii in sync when the wrapper/child geometry changes later.
    const resizeObserver = new ResizeObserver(scheduleMeasuredChildRadiusSync);

    if (rootElement) {
      resizeObserver.observe(rootElement);
    }

    if (observedChildElement && observedChildElement !== rootElement) {
      resizeObserver.observe(observedChildElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [needMeasureChildRadius, observedChildElement, rootElement, scheduleMeasuredChildRadiusSync]);

  // Before inference resolves, fall back to the configured radius so CSS vars stay deterministic.
  const trackRadius = needMeasureChildRadius
    ? measuredChildRadius || configuredTrackRadius
    : configuredTrackRadius;

  return {
    beamVisible,
    setRootNode,
    trackRadius,
  };
};

export default useBorderBeamRadius;
