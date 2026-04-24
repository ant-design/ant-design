import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import throttleByAnimationFrame from '../../_util/throttleByAnimationFrame';
import { getComputedRadius, hasRadiusValue } from '../util';

type UseBorderBeamGeometryOptions = {
  hostElement: HTMLElement | null;
  targetElement: HTMLElement | null;
  canInjectIntoChild: boolean;
  children: React.ReactNode;
  measureKey: string;
};

const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];
const HOST_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class', 'style'],
};
const TARGET_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class', 'style'],
};
const ANCESTOR_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class', 'style'],
};

const useBorderBeamGeometry = ({
  hostElement,
  targetElement,
  canInjectIntoChild,
  children,
  measureKey,
}: UseBorderBeamGeometryOptions) => {
  const [measuredTargetRadius, setMeasuredTargetRadius] = React.useState<string>();
  const [needPositionPatch, setNeedPositionPatch] = React.useState(false);
  const [positionResolved, setPositionResolved] = React.useState(!canInjectIntoChild);

  const syncGeometry = useEvent(() => {
    const hostStyle = hostElement ? window.getComputedStyle(hostElement) : null;

    // 定位补丁只看 host：直插时 holder 被塞进 child，wrapper 时 beam 是 wrapper 的子节点。
    // 即使圆角跟随内部 target，包含块也必须由 host 提供。
    if (!hostElement) {
      setNeedPositionPatch(false);
      setPositionResolved(!canInjectIntoChild);
    } else {
      setNeedPositionPatch(hostStyle?.position === 'static');
      setPositionResolved(true);
    }

    // 圆角默认跟随实际视觉目标；但 wrapper 自身如果已经有显式圆角（来自 style/class/token），
    // 应优先尊重 wrapper，否则无法覆盖那些不接受 className/style 的三方组件。
    const hostRadius = hostStyle ? getComputedRadius(hostStyle) : undefined;
    const targetRadius = targetElement
      ? getComputedRadius(window.getComputedStyle(targetElement))
      : undefined;
    const nextMeasuredRadius =
      targetElement && targetElement !== hostElement && hasRadiusValue(hostRadius)
        ? hostRadius
        : (targetRadius ?? hostRadius);

    setMeasuredTargetRadius((prevRadius) =>
      prevRadius === nextMeasuredRadius ? prevRadius : nextMeasuredRadius,
    );
  });

  const scheduleGeometrySync = React.useMemo(
    () => throttleByAnimationFrame(syncGeometry),
    [syncGeometry],
  );

  useLayoutEffect(() => {
    syncGeometry();

    if (hostElement || targetElement) {
      // 再排一帧，覆盖 className/style 刚落 DOM 但计算样式下一帧才稳定的情况。
      scheduleGeometrySync();
    }
  }, [
    canInjectIntoChild,
    children,
    hostElement,
    measureKey,
    targetElement,
    syncGeometry,
    scheduleGeometrySync,
  ]);

  React.useEffect(
    () => () => {
      scheduleGeometrySync.cancel();
    },
    [scheduleGeometrySync],
  );

  const onGeometryMutate = useEvent(() => {
    scheduleGeometrySync();
  });

  const hostMutationTarget = hostElement || EMPTY_MUTATION_TARGETS;
  const targetMutationTarget =
    targetElement && targetElement !== hostElement ? targetElement : EMPTY_MUTATION_TARGETS;
  const ancestorMutationTargets = React.useMemo(() => {
    if (!targetElement) {
      return EMPTY_MUTATION_TARGETS;
    }

    const targets: HTMLElement[] = [];
    let currentAncestor = targetElement.parentElement;

    while (currentAncestor) {
      targets.push(currentAncestor);
      currentAncestor = currentAncestor.parentElement;
    }

    return targets;
  }, [targetElement]);

  useMutateObserver(hostMutationTarget, onGeometryMutate, HOST_MUTATION_OBSERVER_OPTIONS);
  useMutateObserver(targetMutationTarget, onGeometryMutate, TARGET_MUTATION_OBSERVER_OPTIONS);
  // 祖先 class/style 变化可能只影响 CSS 变量，不会触发 BorderBeam 自身 rerender。
  // 只监听属性变化，不监听子树，避免为了这个装饰效果引入过重观察。
  useMutateObserver(ancestorMutationTargets, onGeometryMutate, ANCESTOR_MUTATION_OBSERVER_OPTIONS);

  React.useEffect(() => {
    if ((!hostElement && !targetElement) || typeof ResizeObserver === 'undefined') {
      return;
    }

    // 百分比 / calc 圆角会随尺寸变化重新计算，因此尺寸变化也需要刷新轨迹半径。
    const resizeObserver = new ResizeObserver(scheduleGeometrySync);

    if (hostElement) {
      resizeObserver.observe(hostElement);
    }

    if (targetElement && targetElement !== hostElement) {
      resizeObserver.observe(targetElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [hostElement, scheduleGeometrySync, targetElement]);

  return {
    beamVisible: measuredTargetRadius !== undefined,
    needPositionPatch,
    positionResolved,
    trackRadius: measuredTargetRadius || '0px',
  };
};

export default useBorderBeamGeometry;
