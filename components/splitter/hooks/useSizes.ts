import React from 'react';
import { useEvent, useMergedState } from 'rc-util';

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

  // ======================== Resize ========================
  const ptg2px = (ptg: number) => ptg * containerSize;

  // Real px sizes
  const [cacheSizes, setCacheSizes] = React.useState<number[]>([]);

  const getPxSizes = () => postPercentSizes.map(ptg2px);

  const onOffsetStart = useEvent(() => {
    setCacheSizes(getPxSizes());
  });

  const onOffsetUpdate = useEvent((index: number, offset: number) => {
    const numSizes = [...cacheSizes];
    const nextIndex = index + 1;

    function getLimitSize(str: string | number | undefined, defaultLimit: number) {
      if (typeof str === 'string') {
        return ptg2px(getPtg(str));
      }
      return str ?? defaultLimit;
    }

    // Get boundary
    const startMinSize = getLimitSize(limitSizes[index][0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
    const startMaxSize = getLimitSize(limitSizes[index][1], containerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex][1], containerSize);

    let mergedOffset = offset;

    // Align with the boundary
    if (numSizes[index] + mergedOffset < startMinSize) {
      mergedOffset = startMinSize - numSizes[index];
    }
    if (numSizes[nextIndex] - mergedOffset < endMinSize) {
      mergedOffset = numSizes[nextIndex] - endMinSize;
    }
    if (numSizes[index] + mergedOffset > startMaxSize) {
      mergedOffset = startMaxSize - numSizes[index];
    }
    if (numSizes[nextIndex] - mergedOffset > endMaxSize) {
      mergedOffset = numSizes[nextIndex] - endMaxSize;
    }

    // Do offset
    numSizes[index] += mergedOffset;
    numSizes[nextIndex] -= mergedOffset;

    setInnerSizes(numSizes);
  });

  const onOffsetEnd = useEvent(() => {});

  return [postPercentSizes, onOffsetStart, onOffsetUpdate, onOffsetEnd] as const;
}
