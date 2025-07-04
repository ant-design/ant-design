import React from 'react';

import type { PanelProps } from '../interface';

export function getPtg(str: string) {
  return Number(str.slice(0, -1)) / 100;
}

function isPtg(itemSize: string | number | undefined): itemSize is string {
  return typeof itemSize === 'string' && itemSize.endsWith('%');
}

/**
 * Save the size state.
 * Align the size into flex percentage base.
 */
export default function useSizes(items: PanelProps[], containerSize?: number) {
  const propSizes = items.map((item) => item.size);

  const itemsCount = items.length;

  const mergedContainerSize = containerSize || 0;
  const ptg2px = (ptg: number) => ptg * mergedContainerSize;

  // We do not need care the size state match the `items` length in `useState`.
  // It will calculate later.
  const [innerSizes, setInnerSizes] = React.useState<(string | number | undefined)[]>(() =>
    items.map((item) => item.defaultSize),
  );
  const sizes = React.useMemo(() => {
    const mergedSizes: PanelProps['size'][] = [];

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

      if (isPtg(itemSize)) {
        ptgList[i] = getPtg(itemSize);
      } else if (itemSize || itemSize === 0) {
        const num = Number(itemSize);
        if (!Number.isNaN(num)) {
          ptgList[i] = num / mergedContainerSize;
        }
      } else {
        emptyCount += 1;
        ptgList[i] = undefined;
      }
    }

    const totalPtg = ptgList.reduce<number>((acc, ptg) => acc + (ptg || 0), 0);

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
  }, [sizes, mergedContainerSize]);

  const postPxSizes = React.useMemo(
    () => postPercentSizes.map(ptg2px),
    [postPercentSizes, mergedContainerSize],
  );

  const postPercentMinSizes = React.useMemo(
    () =>
      items.map((item) => {
        if (isPtg(item.min)) {
          return getPtg(item.min);
        }
        return (item.min || 0) / mergedContainerSize;
      }),
    [items, mergedContainerSize],
  );

  const postPercentMaxSizes = React.useMemo(
    () =>
      items.map((item) => {
        if (isPtg(item.max)) {
          return getPtg(item.max);
        }
        return (item.max || mergedContainerSize) / mergedContainerSize;
      }),
    [items, mergedContainerSize],
  );

  // If ssr, we will use the size from developer config first.
  const panelSizes = React.useMemo(
    () => (containerSize ? postPxSizes : sizes),
    [postPxSizes, containerSize],
  );

  return [
    panelSizes,
    postPxSizes,
    postPercentSizes,
    postPercentMinSizes,
    postPercentMaxSizes,
    setInnerSizes,
  ] as const;
}
