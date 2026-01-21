import * as React from 'react';

import type { ItemType } from './useItems';
import type { ResizableInfo } from './useResizable';
import { getPtg } from './useSizes';

/**
 * Handle user drag resize logic.
 */
export default function useResize(
  items: ItemType[],
  resizableInfos: ResizableInfo[],
  percentSizes: number[],
  containerSize: number | undefined,
  updateSizes: (sizes: number[]) => void,
  reverse: boolean,
) {
  const limitSizes = items.map((item) => [item.min, item.max]);

  const mergedContainerSize = containerSize || 0;
  const ptg2px = (ptg: number) => ptg * mergedContainerSize;

  // ======================== Resize ========================
  function getLimitSize(str: string | number | undefined, defaultLimit: number) {
    if (typeof str === 'string') {
      return ptg2px(getPtg(str));
    }
    return str ?? defaultLimit;
  }

  // Real px sizes
  const [cacheSizes, setCacheSizes] = React.useState<number[]>([]);
  const cacheCollapsedSize = React.useRef<number[]>([]);

  /**
   * When start drag, check the direct is `start` or `end`.
   * This will handle when 2 splitter bar are in the same position.
   */
  const [movingIndex, setMovingIndex] = React.useState<{
    index: number;
    confirmed: boolean;
  } | null>(null);

  const getPxSizes = () => percentSizes.map(ptg2px);

  const onOffsetConfirm = (index: number, offset: number) => {
    let confirmedIndex: number | null = null;

    if (offset > 0) {
      confirmedIndex = index;
      setMovingIndex({
        index,
        confirmed: true,
      });
    } else if (offset < 0) {
      for (let i = index; i >= 0; i -= 1) {
        if (cacheSizes[i] > 0 && resizableInfos[i].resizable) {
          confirmedIndex = i;
          setMovingIndex({
            index: i,
            confirmed: true,
          });
          break;
        }
      }
    }

    return confirmedIndex ?? index;
  };

  const onOffsetStart = (index: number) => {
    setCacheSizes(getPxSizes());
    setMovingIndex({
      index,
      confirmed: false,
    });
  };

  const onOffsetUpdate = (index: number, offset: number) => {
    // First time trigger move index update is not sync in the state
    let confirmedIndex: number | null = null;

    // We need to know what the real index is.
    if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
      confirmedIndex = onOffsetConfirm(index, offset);
    }
    const mergedIndex = confirmedIndex ?? movingIndex?.index ?? index;

    const numSizes = [...cacheSizes];
    const nextIndex = mergedIndex + 1;

    // Get boundary
    const startMinSize = getLimitSize(limitSizes[mergedIndex][0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
    const startMaxSize = getLimitSize(limitSizes[mergedIndex][1], mergedContainerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex][1], mergedContainerSize);

    let mergedOffset = offset;

    // 如果配置了 step，检查是否满足步进条件
    // if (step !== undefined) {
    //   const stepPx = stepToPixels(step);

    //   // 规则1：偏移量绝对值必须 >= stepPx 才调整
    //   if (Math.abs(mergedOffset) < stepPx) {
    //     // 偏移量 < stepPx，不调整（保持原始 offset）
    //     mergedOffset = 0;
    //   } else {
    //     // 规则2：检查拖拽方向上的可用空间
    //     let maxAvailableSpace = 0;
    //     if (mergedOffset > 0) {
    //       // 向右拖拽：下一个面板的可用空间
    //       maxAvailableSpace = numSizes[nextIndex] - endMinSize;
    //     } else if (mergedOffset < 0) {
    //       // 向左拖拽：当前面板的可用空间
    //       maxAvailableSpace = numSizes[mergedIndex] - startMinSize;
    //     }

    //     // 规则3：如果可用空间 < stepPx，不允许调整
    //     if (maxAvailableSpace < stepPx) {
    //       mergedOffset = 0;
    //     }
    //     // 如果可用空间 >= stepPx，保持 offset（已经在 SplitBar 中按 step 取整）
    //   }
    // }

    // Align with the boundary (boundary check always applies after step)
    if (numSizes[mergedIndex] + mergedOffset < startMinSize) {
      mergedOffset = startMinSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset < endMinSize) {
      mergedOffset = numSizes[nextIndex] - endMinSize;
    }
    if (numSizes[mergedIndex] + mergedOffset > startMaxSize) {
      mergedOffset = startMaxSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset > endMaxSize) {
      mergedOffset = numSizes[nextIndex] - endMaxSize;
    }

    // Do offset
    numSizes[mergedIndex] += mergedOffset;
    numSizes[nextIndex] -= mergedOffset;
    updateSizes(numSizes);

    return numSizes;
  };

  const onOffsetEnd = () => {
    setMovingIndex(null);
  };

  // ======================= Collapse =======================
  const onCollapse = (index: number, type: 'start' | 'end') => {
    const currentSizes = getPxSizes();
    const adjustedType = reverse ? (type === 'start' ? 'end' : 'start') : type;

    const currentIndex = adjustedType === 'start' ? index : index + 1;
    const targetIndex = adjustedType === 'start' ? index + 1 : index;

    const currentSize = currentSizes[currentIndex];
    const targetSize = currentSizes[targetIndex];

    if (currentSize !== 0 && targetSize !== 0) {
      // Collapse directly
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
      cacheCollapsedSize.current[index] = currentSize;
    } else {
      const totalSize = currentSize + targetSize;

      const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
      const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], mergedContainerSize);
      const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
      const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], mergedContainerSize);

      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = targetSizeMin || (limitEnd - limitStart) / 2;

      const targetCacheCollapsedSize = cacheCollapsedSize.current[index];
      const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;

      const shouldUseCache =
        targetCacheCollapsedSize &&
        targetCacheCollapsedSize <= targetSizeMax &&
        targetCacheCollapsedSize >= targetSizeMin &&
        currentCacheCollapsedSize <= currentSizeMax &&
        currentCacheCollapsedSize >= currentSizeMin;

      if (shouldUseCache) {
        currentSizes[targetIndex] = targetCacheCollapsedSize;
        currentSizes[currentIndex] = currentCacheCollapsedSize;
      } else {
        currentSizes[currentIndex] -= halfOffset;
        currentSizes[targetIndex] += halfOffset;
      }
    }

    updateSizes(currentSizes);

    return currentSizes;
  };

  return [
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
    movingIndex?.index,
    onOffsetConfirm,
  ] as const;
}
