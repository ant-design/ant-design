// Disabled the rule since `fill` is safe here
// but `Array.from` will increase bundle size.
/* eslint-disable unicorn/no-new-array */

import * as React from 'react';
import type { Key } from 'react';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

export type ItemHeightData = [key: Key, height: number];

export type ItemPositions = Map<
  Key,
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
  // // ==================== Sequential ====================
  // const [bucketsInfo, setBucketsInfo] = React.useState<[buckets: Key[][], existKeys: Set<Key>]>([
  //   [],
  //   new Set(),
  // ]);

  // useLayoutEffect(() => {
  //   setBucketsInfo((prevBucketsInfo) => {
  //     const [prevBuckets, prevExistKeys] = prevBucketsInfo;

  //     // Not change if all keys are exist.
  //     // We do not need consider item remove
  //     // Since Masonry only render the item in `items`
  //     if (itemHeights.every(([itemKey]) => prevExistKeys.has(itemKey))) {
  //       return prevBucketsInfo;
  //     }

  //     let nextBuckets =
  //       prevBucketsInfo.length === columnCount ? prevBucketsInfo : new Array(columnCount).fill([]);

  //     // Clean up item if key are not in the itemHeights
  //     const existKeys = itemHeights.map(([key]) => key);
  //     nextBuckets = nextBuckets.map((bucket: Key[]) => {
  //       const nextBucket: Key[] = [];

  //       // Fill new bucket and remove from existKeys
  //       // We will reuse the `existKeys` later
  //       bucket.forEach((key) => {
  //         const existIndex = existKeys.indexOf(key);
  //         if (existIndex !== -1) {
  //           nextBucket.push(key);
  //           existKeys.splice(existIndex, 1);
  //         }
  //       });

  //       return nextBucket;
  //     });

  //     //
  //     return prevBucketsInfo;
  //   });
  // }, [columnCount, itemHeights]);

  // const [sequentialItemPositions, sequentialTotalHeight] = React.useMemo(() => {
  //   if (!sequential) {
  //     return [null, null];
  //   }

  //   const [buckets] = bucketsInfo;
  //   const itemPositions: ItemPositions = new Map();
  //   const existKeys = new Set(itemHeights.map(([key]) => key));

  //   buckets.forEach((bucket, bucketIndex) => {
  //     bucket.forEach((key) => {
  //       if (existKeys.has(key)) {
  //         itemPositions.set(key, {
  //           column: bucketIndex,
  //           top: 0,
  //         });
  //       }
  //     });
  //   });

  //   return [itemPositions, 0];
  // }, [sequential, bucketsInfo, itemHeights, columnCount, verticalGutter]);

  // ==================== Auto Order ====================
  const [orderItemPositions, orderTotalHeight] = React.useMemo(() => {
    // if (sequential) {
    //   return [null, null];
    // }

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
  }, [sequential, columnCount, itemHeights, verticalGutter]);

  // ====================== Return ======================
  return [orderItemPositions!, orderTotalHeight!];
}
