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
  // 2. Consider min/max constraints when calculating sizes.
  // 3. Fill the rest percentage into flexible items respecting constraints.
  const postPercentSizes = React.useMemo(() => {
    if (!mergedContainerSize) {
      // If no container size, return default distribution
      const ptgList: (number | undefined)[] = [];
      let emptyCount = 0;

      for (let i = 0; i < itemsCount; i += 1) {
        const itemSize = sizes[i];

        if (isPtg(itemSize)) {
          ptgList[i] = getPtg(itemSize);
        } else if (itemSize || itemSize === 0) {
          const num = Number(itemSize);
          if (!Number.isNaN(num)) {
            ptgList[i] = num / 100; // fallback percentage
          }
        } else {
          emptyCount += 1;
          ptgList[i] = undefined;
        }
      }

      const totalPtg = ptgList.reduce<number>((acc, ptg) => acc + (ptg || 0), 0);

      if (totalPtg > 1 || !emptyCount) {
        const scale = 1 / totalPtg;
        return ptgList.map((ptg) => (ptg === undefined ? 0 : ptg * scale)) as number[];
      } else {
        const avgRest = (1 - totalPtg) / emptyCount;
        return ptgList.map((ptg) => (ptg === undefined ? avgRest : ptg)) as number[];
      }
    }

    // Step 1: Calculate base sizes and categorize panels
    const baseSizes: number[] = [];
    const isFlexible: boolean[] = [];
    let totalFixedSize = 0;

    for (let i = 0; i < itemsCount; i += 1) {
      const item = items[i];
      const itemSize = sizes[i];

      // Get min/max constraints in pixels
      const minPx = isPtg(item.min) ? getPtg(item.min) * mergedContainerSize : (item.min || 0);
      const maxPx = isPtg(item.max) ? getPtg(item.max) * mergedContainerSize : (item.max || mergedContainerSize);

      if (itemSize !== undefined) {
        // Panel has explicit size (fixed)
        let explicitPx: number;
        if (isPtg(itemSize)) {
          explicitPx = getPtg(itemSize) * mergedContainerSize;
        } else {
          explicitPx = Number(itemSize);
        }

        // Special case: if explicit size is 0, it means collapsed - don't apply min constraint
        if (explicitPx === 0) {
          baseSizes[i] = 0;
          isFlexible[i] = false;
          // Don't add to totalFixedSize for collapsed panels
        } else {
          // For collapsible panels, respect min constraint when calculating initial size
          // Ensure explicit size respects min/max constraints
          const constrainedSize = Math.max(minPx, Math.min(maxPx, explicitPx));
          baseSizes[i] = constrainedSize;
          isFlexible[i] = false;
          totalFixedSize += constrainedSize;
        }
      } else {
        // Panel has no explicit size (flexible), start with min size
        baseSizes[i] = minPx;
        isFlexible[i] = true;
        totalFixedSize += minPx;
      }
    }

    // Step 2: Distribute remaining space to flexible panels
    let remainingSpace = mergedContainerSize - totalFixedSize;
    const flexiblePanels = isFlexible.map((flex, index) => flex ? index : -1).filter(index => index !== -1);

    if (remainingSpace > 0 && flexiblePanels.length > 0) {
      // Distribute remaining space iteratively, respecting max constraints
      while (remainingSpace > 0 && flexiblePanels.length > 0) {
        const spacePerPanel = remainingSpace / flexiblePanels.length;
        let distributedThisRound = 0;
        const panelsToRemove: number[] = [];

        for (let i = 0; i < flexiblePanels.length; i += 1) {
          const panelIndex = flexiblePanels[i];
          const item = items[panelIndex];
          const maxPx = isPtg(item.max) ? getPtg(item.max) * mergedContainerSize : (item.max || mergedContainerSize);

          const potentialNewSize = baseSizes[panelIndex] + spacePerPanel;

          if (potentialNewSize <= maxPx) {
            // Panel can accept full allocation
            baseSizes[panelIndex] = potentialNewSize;
            distributedThisRound += spacePerPanel;
          } else {
            // Panel hits max constraint, give it max and remove from flexible list
            const actualAllocation = maxPx - baseSizes[panelIndex];
            baseSizes[panelIndex] = maxPx;
            distributedThisRound += actualAllocation;
            panelsToRemove.push(i);
          }
        }

        // Remove panels that hit max constraint
        for (let i = panelsToRemove.length - 1; i >= 0; i -= 1) {
          flexiblePanels.splice(panelsToRemove[i], 1);
        }

        remainingSpace -= distributedThisRound;

        // If no space was distributed, break to avoid infinite loop
        if (distributedThisRound === 0) {
          break;
        }
      }
    }

    // Convert pixel sizes to percentages
    return baseSizes.map(size => size / mergedContainerSize);
  }, [sizes, mergedContainerSize, items, itemsCount]);

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
