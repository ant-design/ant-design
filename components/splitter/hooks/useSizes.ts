import React from 'react';
import { isNonNullable } from '@rc-component/util';

import type { PanelProps } from '../interface';
import { autoPtgSizes, limitPtgSizes } from './sizeUtil';

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
    // If any panel has a `size` passed as a prop, use `propSizes` and calculate all other panel sizes that don't have a `size` defined by the prop.
    // If no panel has received a value for the `size` prop, use `innerSizes`.
    return propSizes.some(isNonNullable) ? propSizes : innerSizes;
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

    // Re-clamp explicit sizes below `min` back up: they were stored as
    // absolute px values (e.g. from a drag) and re-based on the current
    // container size, which can otherwise scale them below `min`
    // (see https://github.com/ant-design/ant-design/issues/59083).
    // `undefined` (auto) entries are left for `autoPtgSizes` to fill.
    // Use autoPtgSizes to handle the undefined sizes
    return autoPtgSizes(
      limitPtgSizes(ptgList, postPercentMinSizes, postPercentMaxSizes),
      postPercentMinSizes,
      postPercentMaxSizes,
    );
  }, [itemsCount, sizes, mergedContainerSize, postPercentMinSizes, postPercentMaxSizes]);

  const postPxSizes = React.useMemo(() => {
    const pxSizes = postPercentSizes.map(ptg2px);
    // Absorb float dust (e.g. 290.00000000000006 from a 290/440 split) into
    // one panel so both the total and the snapshots stay exact. Browser
    // sub-pixel rendering is unaffected at this magnitude. Only tiny
    // round-off is absorbed: a real leftover from `max` clamping (e.g. two
    // max-200 panels in a 1000px container leaving 600px unassigned) must
    // NOT be written into a panel (see #59083 review).
    const total = pxSizes.reduce((sum, size) => sum + size, 0);
    const dust = total - mergedContainerSize;
    const tolerance = Number.EPSILON * mergedContainerSize * pxSizes.length;
    if (dust !== 0 && Math.abs(dust) <= tolerance && pxSizes.length) {
      // Prefer a panel that stays within its `max` after absorbing;
      // fall back to the last panel.
      let target = pxSizes.length - 1;
      for (let i = pxSizes.length - 1; i >= 0; i -= 1) {
        const max = postPercentMaxSizes[i] * mergedContainerSize;
        if (pxSizes[i] - dust <= max) {
          target = i;
          break;
        }
      }
      pxSizes[target] -= dust;
    }
    return pxSizes;
  }, [postPercentSizes, mergedContainerSize, postPercentMaxSizes]);

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
