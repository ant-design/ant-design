import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
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
  const configuredTrackRadius = toCSSLength(configuredRadius, '0px');
  const needMeasureChildRadius = configuredRadius === undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [observedChildElement, setObservedChildElement] = React.useState<HTMLElement>();
  const [measuredChildRadius, setMeasuredChildRadius] = React.useState<string>();

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
    if (!needMeasureChildRadius) {
      setObservedChildElement((prevChildElement) =>
        prevChildElement === undefined ? prevChildElement : undefined,
      );
      setMeasuredChildRadius((prevRadius) => (prevRadius === undefined ? prevRadius : undefined));
      return;
    }

    syncMeasuredChildRadius();
    scheduleMeasuredChildRadiusSync();
  }, [needMeasureChildRadius, scheduleMeasuredChildRadiusSync, syncMeasuredChildRadius]);

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || !rootElement) {
      return;
    }

    // Re-measure after the DOM commit so late-mounted children do not miss the initial sync window.
    syncMeasuredChildRadius();
    // Retry on the next frame to avoid reading computed radius before class-based styles finish applying.
    scheduleMeasuredChildRadiusSync();
  }, [
    children,
    needMeasureChildRadius,
    rootElement,
    scheduleMeasuredChildRadiusSync,
    syncMeasuredChildRadius,
  ]);

  const onChildMutate = useEvent(() => {
    scheduleMeasuredChildRadiusSync();
  });

  useLayoutEffect(
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

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || typeof ResizeObserver === 'undefined') {
      return;
    }

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

  const trackRadius = needMeasureChildRadius
    ? measuredChildRadius || configuredTrackRadius
    : configuredTrackRadius;

  return {
    setRootNode,
    trackRadius,
  };
};

export default useBorderBeamRadius;
