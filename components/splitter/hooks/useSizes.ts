import React from 'react';

import type { PanelProps } from '../interface';
import { autoPtgSizes } from './sizeUtil';

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
  const propCollapsed = items.map((item) => item.collapsed);

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
      if (propCollapsed[i]) {
        mergedSizes[i] = 0;
      } else {
        mergedSizes[i] = propSizes[i] ?? innerSizes[i];
      }
    }

    return mergedSizes;
  }, [itemsCount, innerSizes, propSizes, propCollapsed]);

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

  // Post handle the size. Will do:
  // 1. Convert all the px into percentage if not empty.
  // 2. Get rest percentage for exist percentage.
  // 3. Fill the rest percentage into empty item.
  const postPercentSizes = React.useMemo(() => {
    const ptgList: (number | undefined)[] = [];

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
        ptgList[i] = undefined;
      }
    }

    // Use autoPtgSizes to handle the undefined sizes
    return autoPtgSizes(ptgList, postPercentMinSizes, postPercentMaxSizes);
  }, [itemsCount, sizes, mergedContainerSize, postPercentMinSizes, postPercentMaxSizes]);

  const postPxSizes = React.useMemo(
    () => postPercentSizes.map(ptg2px),
    [postPercentSizes, mergedContainerSize],
  );

  // If ssr, we will use the size from developer config first.
  const panelSizes = React.useMemo(
    () => (containerSize ? postPxSizes : sizes),
    [postPxSizes, sizes, containerSize],
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
