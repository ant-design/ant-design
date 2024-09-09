import React from 'react';

import type { PanelProps } from '../interface';

function getPtg(str: string) {
  return Number(str.slice(0, -1)) / 100;
}

/**
 * Save the size state.
 * Align the size into flex percentage base.
 */
export default function useSizes(items: PanelProps[], containerSize: number) {
  const propSizes = items.map((item) => item.size);
  const limitSizes = items.map((item) => [item.min, item.max]);

  const itemsCount = items.length;

  const ptg2px = (ptg: number) => ptg * containerSize;

  // We do not need care the size state match the `items` length in `useState`.
  // It will calculate later.
  const [innerSizes, setInnerSizes] = React.useState<(string | number | undefined)[]>(() =>
    items.map((item) => item.defaultSize),
  );
  const sizes = React.useMemo(() => {
    const mergedSizes = [];

    for (let i = 0; i < itemsCount; i += 1) {
      mergedSizes[i] = propSizes[i] ?? innerSizes[i];
    }

    return mergedSizes;
  }, [itemsCount, innerSizes, propSizes]);

  // Post handle the size. Will do:
  // 1. Convert all the px into percentage if not empty.
  // 2. Get rest percentage for exist percentage.
  // 3. Fill the rest percentage into empty item.
  const postPercentSizes = React.useMemo(() => {
    let ptgList: (number | undefined)[] = [];
    let emptyCount = 0;

    // Fill default percentage
    for (let i = 0; i < itemsCount; i += 1) {
      const itemSize = sizes[i];

      if (typeof itemSize === 'string' && itemSize.endsWith('%')) {
        ptgList[i] = getPtg(itemSize);
      } else if (itemSize || itemSize === 0) {
        const num = Number(itemSize);
        if (!Number.isNaN(num)) {
          ptgList[i] = num / containerSize;
        }
      } else {
        emptyCount += 1;
        ptgList[i] = undefined;
      }
    }

    const totalPtg = ptgList.reduce((acc: number, ptg) => acc + (ptg || 0), 0);

    if (totalPtg > 1 || !emptyCount) {
      // If total percentage is larger than 1, we will scale it down.
      const scale = 1 / totalPtg;
      ptgList = ptgList.map((ptg) => (ptg === undefined ? 0 : ptg * scale));
    } else {
      // If total percentage is smaller than 1, we will fill the rest.
      const avgRest = (1 - totalPtg) / emptyCount;
      ptgList = ptgList.map((ptg) => (ptg === undefined ? avgRest : ptg));
    }

    return ptgList as number[];
  }, [sizes, containerSize]);

  const postPxSizes = React.useMemo(
    () => postPercentSizes.map(ptg2px),
    [postPercentSizes, containerSize],
  );

  // ======================== Resize ========================
  function getLimitSize(str: string | number | undefined, defaultLimit: number) {
    if (typeof str === 'string') {
      return ptg2px(getPtg(str));
    }
    return str ?? defaultLimit;
  }

  // Real px sizes
  const [cacheSizes, setCacheSizes] = React.useState<number[]>([]);

  /**
   * When start drag, check the direct is `start` or `end`.
   * This will handle when 2 splitter bar are in the same position.
   */
  const [movingIndex, setMovingIndex] = React.useState<{
    index: number;
    confirmed: boolean;
  } | null>(null);

  const getPxSizes = () => postPercentSizes.map(ptg2px);

  const onOffsetStart = (index: number) => {
    setCacheSizes(getPxSizes());
    setMovingIndex({
      index,
      confirmed: false,
    });
  };

  const onOffsetUpdate = (index: number, offset: number) => {
    // We need to know what the real index is.
    if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
      // Search for the real index
      if (offset > 0) {
        setMovingIndex({
          index,
          confirmed: true,
        });
      } else {
        for (let i = index; i >= 0; i -= 1) {
          if (cacheSizes[i] > 0) {
            setMovingIndex({
              index: i,
              confirmed: true,
            });
            break;
          }
        }
      }
    }
    const mergedIndex = movingIndex?.index ?? index;

    const numSizes = [...cacheSizes];
    const nextIndex = mergedIndex + 1;

    // Get boundary
    const startMinSize = getLimitSize(limitSizes[mergedIndex][0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
    const startMaxSize = getLimitSize(limitSizes[mergedIndex][1], containerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex][1], containerSize);

    let mergedOffset = offset;

    // Align with the boundary
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

    setInnerSizes(numSizes);

    return numSizes;
  };

  const onOffsetEnd = () => {
    setMovingIndex(null);
  };

  // ======================= Collapse =======================
  const onCollapse = (index: number, type: 'start' | 'end') => {
    const currentSizes = getPxSizes();

    const currentIndex = type === 'start' ? index : index + 1;
    const targetIndex = type === 'start' ? index + 1 : index;

    const currentSize = currentSizes[currentIndex];
    const targetSize = currentSizes[targetIndex];

    if (currentSize !== 0 && targetSize !== 0) {
      // Collapse directly
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
    } else {
      const totalSize = currentSize + targetSize;

      const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
      const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], containerSize);
      const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
      const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], containerSize);

      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = (limitEnd - limitStart) / 2;

      currentSizes[currentIndex] -= halfOffset;
      currentSizes[targetIndex] += halfOffset;
    }

    setInnerSizes(currentSizes);

    return currentSizes;
  };

  return [
    postPercentSizes,
    postPxSizes,
    movingIndex?.index,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
  ] as const;
}
