// Disabled the rule since `fill` is safe here
// but `Array.from` will increase bundle size.
/* eslint-disable unicorn/no-new-array */

import * as React from 'react';

export type ItemHeightData = [key: React.Key, height: number];

export type ItemPositions = Map<
  React.Key,
  {
    column: number;
    top: number;
  }
>;

/**
 * Auto arrange the items in the masonry layout.
 * Always get stable positions by order
 * instead of dynamic adjust for next item height.
 */
export default function usePositions(
  itemHeights: ItemHeightData[],
  columnCount: number,
  verticalGutter: number,
  sequential?: boolean,
  // ): [itemPositions: { column: number; top: number }[], totalHeight: number] {
): [itemPositions: ItemPositions, totalHeight: number] {
  // ==================== Sequential ====================
  const [buckets, setBuckets] = React.useState<React.Key[][]>(new Array(columnCount).fill([]));

  React.useEffect(() => {
    setBuckets(new Array(columnCount).fill([]));
  }, [columnCount]);

  // ==================== Auto Order ====================
  const [orderItemPositions, orderTotalHeight] = React.useMemo(() => {
    if (sequential) {
      return [null, null];
    }

    const columnHeights = new Array(columnCount).fill(0) as number[];
    const itemPositions: ItemPositions = new Map();

    for (let i = 0; i < itemHeights.length; i += 1) {
      const [itemKey, itemHeight] = itemHeights[i];

      const targetColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

      const top = columnHeights[targetColumnIndex];
      itemPositions.set(itemKey, {
        column: targetColumnIndex,
        top,
      });

      columnHeights[targetColumnIndex] += itemHeight + verticalGutter;
    }

    
    return [itemPositions, Math.max(0, Math.max(...columnHeights) - verticalGutter)];
  }, [columnCount, itemHeights]);

  return [orderItemPositions!, orderTotalHeight!];
}
