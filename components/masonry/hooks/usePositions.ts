import * as React from 'react';

/**
 * Auto arrange the items in the masonry layout.
 * Always get stable positions by order
 * instead of dynamic adjust for next item height.
 */
export default function usePositions(
  columnCount: number,
  verticalGutter: number,
  itemHeights: number[],
): [itemPositions: { column: number; top: number }[], totalHeight: number] {
  return React.useMemo(() => {
    // Disabled the rule since `fill` is safe here
    // but `Array.from` will increase bundle size.
    // eslint-disable-next-line unicorn/no-new-array
    const columnHeights = new Array(columnCount).fill(0) as number[];
    const itemPositions: { column: number; top: number }[] = [];

    for (let i = 0; i < itemHeights.length; i += 1) {
      const itemHeight = itemHeights[i];

      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const top = columnHeights[shortestColumnIndex];
      itemPositions.push({
        column: shortestColumnIndex,
        top,
      });
      columnHeights[shortestColumnIndex] += itemHeight + verticalGutter;
    }

    return [itemPositions, Math.max(0, Math.max(...columnHeights) - verticalGutter)];
  }, [columnCount, itemHeights]);
}
