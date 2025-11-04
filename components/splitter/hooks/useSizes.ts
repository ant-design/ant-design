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

  const itemsCount = items.length;

  const mergedContainerSize = containerSize || 0;
  const ptg2px = (ptg: number) => ptg * mergedContainerSize;

  const prevContainerSizeRef = React.useRef<number | undefined>(undefined);


  // We do not need care the size state match the `items` length in `useState`.
  // It will calculate later.
  const [innerSizes, setInnerSizes] = React.useState<(string | number | undefined)[]>(() =>
    items.map((item) => item.defaultSize),
  );

  React.useEffect(() => {
    const prevSize = prevContainerSizeRef.current;

    if (!prevSize || !containerSize || prevSize === containerSize) {
      prevContainerSizeRef.current = containerSize;
      return;
    }

    const hasPixelValue = innerSizes.some(
      (size) => typeof size === 'number' && size > 0
    );

    if (hasPixelValue) {
      const updatedSizes = innerSizes.map((size) => {
        if (typeof size === 'number') {
          const percentage = size / prevSize;
          return percentage * containerSize;
        }
        return size;
      });

      setInnerSizes(updatedSizes);
    }

    prevContainerSizeRef.current = containerSize;
  }, [containerSize, innerSizes]);

  const sizes = React.useMemo(() => {
    const mergedSizes: PanelProps['size'][] = [];

    for (let i = 0; i < itemsCount; i += 1) {
      mergedSizes[i] = propSizes[i] ?? innerSizes[i];
    }

    return mergedSizes;
  }, [itemsCount, innerSizes, propSizes]);

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
  }, [sizes, mergedContainerSize, postPercentMinSizes, postPercentMaxSizes]);

  const postPxSizes = React.useMemo(
    () => postPercentSizes.map(ptg2px),
    [postPercentSizes, mergedContainerSize],
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
