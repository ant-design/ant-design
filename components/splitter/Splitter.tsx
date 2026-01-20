/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ResizeObserver from '@rc-component/resize-observer';
import { useEvent } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic, useOrientation } from '../_util/hooks';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useItems from './hooks/useItems';
import useResizable from './hooks/useResizable';
import useResize from './hooks/useResize';
import useSizes from './hooks/useSizes';
import type {
  SplitterClassNamesType,
  SplitterProps,
  SplitterSemanticDraggerClassNames,
  SplitterStylesType,
} from './interface';
import { InternalPanel } from './Panel';
import SplitBar from './SplitBar';
import useStyle from './style';

const Splitter: React.FC<React.PropsWithChildren<SplitterProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    style,
    styles,
    layout,
    orientation,
    vertical,
    children,
    draggerIcon,
    collapsibleIcon,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
    lazy,
    step,
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('splitter');
  const prefixCls = getPrefixCls('splitter', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ======================== Direct ========================
  const [mergedOrientation, isVertical] = useOrientation(orientation, vertical, layout);

  const isRTL = direction === 'rtl';
  const reverse = !isVertical && isRTL;

  // ====================== Items Data ======================
  const items = useItems(children);

  // >>> Warning for uncontrolled
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Splitter');

    const existSize = items.some((item) => item.size !== undefined);
    const existUndefinedSize = items.some((item) => item.size === undefined);

    if (existSize && existUndefinedSize && !onResize) {
      warning(
        false,
        'usage',
        'When part of `Splitter.Panel` has `size`, `onResize` is required or change `size` to `defaultSize`.',
      );
    }
    warning.deprecated(!layout, 'layout', 'orientation');
  }

  // ====================== Container =======================
  const [containerSize, setContainerSize] = useState<number | undefined>();

  const onContainerResize: GetProp<typeof ResizeObserver, 'onResize'> = (size) => {
    const { offsetWidth, offsetHeight } = size;
    const containerSize = isVertical ? offsetHeight : offsetWidth;
    // Skip when container has no size, Such as nested in a hidden tab panel
    // to fix: https://github.com/ant-design/ant-design/issues/51106
    if (containerSize === 0) {
      return;
    }
    setContainerSize(containerSize);
  };

  // ========================= Size =========================
  const [panelSizes, itemPxSizes, itemPtgSizes, itemPtgMinSizes, itemPtgMaxSizes, updateSizes] =
    useSizes(items, containerSize);

  // ====================== Resizable =======================
  const resizableInfos = useResizable(items, itemPxSizes, reverse);

  const [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex] = useResize(
    items,
    resizableInfos,
    itemPtgSizes,
    containerSize,
    updateSizes,
    reverse,
  );

  // ======================== Events ========================
  // Store sizes and offset limits at drag start for step threshold checking
  const dragStartSizesRef = React.useRef<number[]>([]);
  const offsetMinMaxRef = React.useRef<{ min: number; max: number } | null>(null);
  const stepPxRef = React.useRef<number | null>(null);

  // Common function to calculate step snapping offset
  const calculateStepSnap = useEvent(
    (index: number, offset: number): { snappedOffset: number; isSnapped: boolean } => {
      // Check if step snapping should be applied
      if (
        stepPxRef.current === null ||
        !offsetMinMaxRef.current ||
        dragStartSizesRef.current.length === 0
      ) {
        return { snappedOffset: offset, isSnapped: false };
      }

      const stepPx = stepPxRef.current;
      const SNAP_THRESHOLD = 10; // ±10px threshold

      // Find the effective panel index when panels overlap
      // If the current panel size is 0, use the previous non-zero panel
      let effectivePanelIndex = index;
      if (dragStartSizesRef.current[index] === 0) {
        for (let i = index - 1; i >= 0; i -= 1) {
          if (dragStartSizesRef.current[i] > 0) {
            effectivePanelIndex = i;
            break;
          }
        }
      }

      // Calculate cumulative size from left edge to the previous splitter bar
      // Use effectivePanelIndex instead of index for correct positioning
      let cumulativeSize = 0;
      for (let i = 0; i < effectivePanelIndex; i += 1) {
        cumulativeSize += dragStartSizesRef.current[i];
      }

      const currentPanelSize = dragStartSizesRef.current[effectivePanelIndex];
      const currentSize = cumulativeSize + currentPanelSize + offset;

      // Calculate dynamic min/max range
      const stepMin = cumulativeSize;
      // When dragging, stepMax should consider the offset range
      // Use offsetMinMaxRef to determine the actual maximum position
      const maxAllowedOffset = offsetMinMaxRef.current.max;
      const stepMax = cumulativeSize + currentPanelSize + maxAllowedOffset;

      // Calculate relative position from previous splitter bar
      const relativePosition = currentSize - cumulativeSize;

      // Calculate which step multiples relativePosition is between
      const multiplier = Math.floor(relativePosition / stepPx);
      let lowerThreshold = cumulativeSize + multiplier * stepPx;
      let upperThreshold = cumulativeSize + (multiplier + 1) * stepPx;

      // Special handling for effectivePanelIndex=0: ensure 0 is always considered as a threshold
      // When dragging panel1 to the left, it should snap to 0
      // Use effectivePanelIndex instead of index to handle overlapping splitbars
      if (effectivePanelIndex === 0) {
        // Check if currentSize is close to 0 (within threshold)
        const distanceToZero = Math.abs(currentSize - 0);
        if (distanceToZero <= SNAP_THRESHOLD) {
          lowerThreshold = 0;
        } else if (lowerThreshold < 0) {
          lowerThreshold = 0;
        }
      }

      // Special handling: ensure stepMax is always considered as a threshold
      const distanceToMax = Math.abs(currentSize - stepMax);
      if (distanceToMax <= SNAP_THRESHOLD) {
        upperThreshold = stepMax;
      }

      // Calculate distance to both thresholds
      const distanceToLower = Math.abs(currentSize - lowerThreshold);
      const distanceToUpper = Math.abs(currentSize - upperThreshold);

      // Snap to the nearest threshold if within ±10px
      let targetSize: number | null = null;
      if (distanceToLower <= SNAP_THRESHOLD) {
        targetSize = lowerThreshold;
      } else if (distanceToUpper <= SNAP_THRESHOLD) {
        targetSize = upperThreshold;
      }

      // Convert target size back to offset
      if (targetSize !== null) {
        // Verify targetSize is within the dynamic step range
        // Special case: for effectivePanelIndex=0, allow snapping to 0 even if it's less than stepMin
        // Use effectivePanelIndex instead of index to handle overlapping splitbars
        const isWithinRange =
          effectivePanelIndex === 0 && targetSize === 0
            ? true
            : targetSize >= stepMin && targetSize <= stepMax;

        if (isWithinRange) {
          const targetOffset = targetSize - cumulativeSize - currentPanelSize;

          // For effectivePanelIndex=0 snapping to 0, allow negative offset even if it's less than offsetMin
          // This allows panel1 to snap to 0 width
          // Use effectivePanelIndex instead of index to handle overlapping splitbars
          const isSnapToZero = effectivePanelIndex === 0 && targetSize === 0;
          const isWithinOffsetLimits = isSnapToZero
            ? targetOffset <= offsetMinMaxRef.current.max // Only check max limit
            : targetOffset >= offsetMinMaxRef.current.min &&
              targetOffset <= offsetMinMaxRef.current.max;

          if (isWithinOffsetLimits) {
            return { snappedOffset: targetOffset, isSnapped: true };
          }
        }
      }

      return { snappedOffset: offset, isSnapped: false };
    },
  );

  // Function to calculate snapped offset for lazy mode preview
  const calculateSnappedOffset = useEvent((index: number, offset: number): number => {
    const { snappedOffset } = calculateStepSnap(index, offset);
    return snappedOffset;
  });

  // Helper function to convert step value to pixels
  const stepToPixels = useEvent((stepValue: number | string): number => {
    if (typeof stepValue === 'string' && stepValue.endsWith('%')) {
      const percent = Number(stepValue.slice(0, -1)) / 100;
      return (containerSize || 0) * percent;
    }
    return Number(stepValue);
  });

  // Helper function to convert size limit to pixels
  const limitToPixels = useEvent(
    (limit: number | string | undefined, defaultLimit: number): number => {
      if (typeof limit === 'string' && limit.endsWith('%')) {
        const percent = Number(limit.slice(0, -1)) / 100;
        return (containerSize || 0) * percent;
      }
      if (typeof limit === 'number') {
        return limit;
      }
      return defaultLimit;
    },
  );

  const onInternalResizeStart = useEvent((index: number) => {
    // Save current sizes at drag start
    dragStartSizesRef.current = [...itemPxSizes];

    // Calculate offset min and max based on panel min/max limits
    const panelIndex = index;
    const nextPanelIndex = panelIndex + 1;

    if (panelIndex < items.length && nextPanelIndex < items.length && containerSize) {
      // When panels overlap (e.g., panel2 width=0), find which non-zero panel is being dragged
      // This must be calculated first to determine correct offset limits
      let effectivePanelIndex = panelIndex;

      // If current panel size is 0, look backwards to find the first non-zero panel
      // This handles the case when splitbars overlap
      if (itemPxSizes[panelIndex] === 0) {
        for (let i = panelIndex - 1; i >= 0; i -= 1) {
          if (itemPxSizes[i] > 0) {
            effectivePanelIndex = i;
            break;
          }
        }
      }

      // Use effectivePanelIndex to calculate offset limits for step snapping
      // This ensures limits match the panel that will actually be resized
      const effectiveNextPanelIndex = effectivePanelIndex + 1;
      const startSize = itemPxSizes[effectivePanelIndex];
      const endSize = itemPxSizes[effectiveNextPanelIndex];

      // Get min/max limits for both panels
      const startMin = limitToPixels(items[effectivePanelIndex]?.min, 0);
      const startMax = limitToPixels(items[effectivePanelIndex]?.max, containerSize);
      const endMin = limitToPixels(items[effectiveNextPanelIndex]?.min, 0);
      const endMax = limitToPixels(items[effectiveNextPanelIndex]?.max, containerSize);

      // Calculate offset limits
      // offset = newStartSize - startSize
      // newStartSize >= startMin => offset >= startMin - startSize
      // newStartSize <= startMax => offset <= startMax - startSize
      // newEndSize >= endMin => endSize - offset >= endMin => offset <= endSize - endMin
      // newEndSize <= endMax => endSize - offset <= endMax => offset >= endSize - endMax
      const offsetMin = Math.max(startMin - startSize, endSize - endMax);
      const offsetMax = Math.min(startMax - startSize, endSize - endMin);

      offsetMinMaxRef.current = { min: offsetMin, max: offsetMax };

      if (step && step.length > 0 && effectivePanelIndex < step.length) {
        const panelStep = step[effectivePanelIndex];
        if (panelStep !== undefined) {
          stepPxRef.current = stepToPixels(panelStep);
        } else {
          stepPxRef.current = null;
        }
      } else {
        stepPxRef.current = null;
      }
    } else {
      offsetMinMaxRef.current = null;
      stepPxRef.current = null;
    }

    onOffsetStart(index);
    onResizeStart?.(itemPxSizes);
  });

  const onInternalResizeUpdate = useEvent((index: number, offset: number, lazyEnd?: boolean) => {
    let finalOffset = offset;
    let isSnapped = false;

    // Apply step snapping if step is configured
    if (step) {
      const result = calculateStepSnap(index, offset);
      finalOffset = result.snappedOffset;
      isSnapped = result.isSnapped;
    }

    // Only skip update if step is configured for this index and not snapped
    // When panels overlap, use effectivePanelIndex to check if step exists
    // This ensures snapping behavior is preserved when splitbars overlap
    let effectivePanelIndex = index;
    if (dragStartSizesRef.current.length > 0 && dragStartSizesRef.current[index] === 0) {
      for (let i = index - 1; i >= 0; i -= 1) {
        if (dragStartSizesRef.current[i] > 0) {
          effectivePanelIndex = i;
          break;
        }
      }
    }
    const hasStepForIndex =
      step && step.length > effectivePanelIndex && step[effectivePanelIndex] !== undefined;

    if (!hasStepForIndex || isSnapped) {
      // Update with final offset
      const nextSizes = onOffsetUpdate(index, finalOffset);

      if (lazyEnd) {
        onResizeEnd?.(nextSizes);
      } else {
        onResize?.(nextSizes);
      }
    }
  });

  const onInternalResizeEnd = useEvent((lazyEnd?: boolean) => {
    onOffsetEnd();

    if (!lazyEnd) {
      onResizeEnd?.(itemPxSizes);
    }
  });

  const onInternalCollapse = useEvent((index: number, type: 'start' | 'end') => {
    const nextSizes = onCollapse(index, type);
    onResize?.(nextSizes);
    onResizeEnd?.(nextSizes);
    const collapsed = nextSizes.map((size) => Math.abs(size) < Number.EPSILON);
    props.onCollapse?.(collapsed, nextSizes);
  });

  // =========== Merged Props for Semantic ==========
  const mergedProps: SplitterProps = {
    ...props,
    vertical: isVertical,
    orientation: mergedOrientation,
  };

  // ======================== Styles ========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SplitterClassNamesType,
    SplitterStylesType,
    SplitterProps
  >(
    [contextClassNames, classNames],
    [contextStyles, styles],
    { props: mergedProps },
    {
      // Convert `classNames.dragger: 'a'` to
      // `classNames.dragger: { default: 'a' }`
      dragger: {
        _default: 'default',
      },
    },
  );

  const containerClassName = clsx(
    prefixCls,
    className,
    `${prefixCls}-${mergedOrientation}`,
    {
      [`${prefixCls}-rtl`]: isRTL,
    },
    rootClassName,
    mergedClassNames.root,
    contextClassName,
    cssVarCls,
    rootCls,
    hashId,
  );

  // ======================== Render ========================
  const maskCls = `${prefixCls}-mask`;

  const stackSizes = React.useMemo(() => {
    const mergedSizes: number[] = [];

    let stack = 0;
    const len = items.length;
    for (let i = 0; i < len; i += 1) {
      stack += itemPtgSizes[i];
      mergedSizes.push(stack);
    }

    return mergedSizes;
  }, [itemPtgSizes, items.length]);

  const mergedStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  return (
    <ResizeObserver onResize={onContainerResize}>
      <div style={mergedStyle} className={containerClassName}>
        {items.map((item, idx) => {
          const panelProps = {
            ...item,
            className: clsx(mergedClassNames.panel, item.className),
            style: { ...mergedStyles.panel, ...item.style },
          };

          // Panel
          const panel = (
            <InternalPanel {...panelProps} prefixCls={prefixCls} size={panelSizes[idx]} />
          );

          // Split Bar
          let splitBar: React.ReactElement | null = null;

          const resizableInfo = resizableInfos[idx];
          if (resizableInfo) {
            const ariaMinStart = (stackSizes[idx - 1] || 0) + itemPtgMinSizes[idx];
            const ariaMinEnd = (stackSizes[idx + 1] || 100) - itemPtgMaxSizes[idx + 1];

            const ariaMaxStart = (stackSizes[idx - 1] || 0) + itemPtgMaxSizes[idx];
            const ariaMaxEnd = (stackSizes[idx + 1] || 100) - itemPtgMinSizes[idx + 1];

            splitBar = (
              <SplitBar
                lazy={lazy}
                index={idx}
                active={movingIndex === idx}
                prefixCls={prefixCls}
                rootPrefixCls={rootPrefixCls}
                vertical={isVertical}
                resizable={resizableInfo.resizable}
                draggerStyle={mergedStyles.dragger}
                draggerClassName={mergedClassNames.dragger as SplitterSemanticDraggerClassNames}
                draggerIcon={draggerIcon}
                collapsibleIcon={collapsibleIcon}
                ariaNow={stackSizes[idx] * 100}
                ariaMin={Math.max(ariaMinStart, ariaMinEnd) * 100}
                ariaMax={Math.min(ariaMaxStart, ariaMaxEnd) * 100}
                startCollapsible={resizableInfo.startCollapsible}
                endCollapsible={resizableInfo.endCollapsible}
                showStartCollapsibleIcon={resizableInfo.showStartCollapsibleIcon}
                showEndCollapsibleIcon={resizableInfo.showEndCollapsibleIcon}
                onOffsetStart={onInternalResizeStart}
                onOffsetUpdate={(index, offsetX, offsetY, lazyEnd) => {
                  let offset = isVertical ? offsetY : offsetX;
                  if (reverse) {
                    offset = -offset;
                  }
                  onInternalResizeUpdate(index, offset, lazyEnd);
                }}
                onOffsetEnd={onInternalResizeEnd}
                onCollapse={onInternalCollapse}
                containerSize={containerSize || 0}
                onCalculateSnappedOffset={step ? calculateSnappedOffset : undefined}
              />
            );
          }

          return (
            <React.Fragment key={`split-panel-${idx}`}>
              {panel}
              {splitBar}
            </React.Fragment>
          );
        })}

        {/* Fake mask for cursor */}
        {typeof movingIndex === 'number' && (
          <div aria-hidden className={clsx(maskCls, `${maskCls}-${mergedOrientation}`)} />
        )}
      </div>
    </ResizeObserver>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Splitter.displayName = 'Splitter';
}

export default Splitter;
