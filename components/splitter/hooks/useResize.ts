import * as React from 'react';

import type { ItemType } from './useItems';
import type { ResizableInfo } from './useResizable';
import { getPtg } from './useSizes';

export default function useResize(
  items: ItemType[],
  resizableInfos: ResizableInfo[],
  percentSizes: number[],
  containerSize: number,
  updateSizes: (sizes: number[]) => void,
) {
  const limitSizes = items.map((item) => [item.min, item.max]);

  const ptg2px = (ptg: number) => ptg * containerSize;

  // ======================== Resize ========================
  function getLimitSize(str: string | number | undefined, defaultLimit: number) {
    if (typeof str === 'string') {
      return ptg2px(getPtg(str));
    }
    return str ?? defaultLimit;
  }

  // Real px sizes
  const [cacheSizes, setCacheSizes] = React.useState<number[]>([]);
  // cache collapsed size
  const [collapsedSizes, setCollapsedSizes] = React.useState<number[]>([]);
  /**
   * When start drag, check the direct is `start` or `end`.
   * This will handle when 2 splitter bar are in the same position.
   */
  const [movingIndex, setMovingIndex] = React.useState<{
    index: number;
    confirmed: boolean;
  } | null>(null);

  const getPxSizes = () => percentSizes.map(ptg2px);

  const onOffsetStart = (index: number) => {
    setCacheSizes(getPxSizes());
    setMovingIndex({
      index,
      confirmed: false,
    });
  };

  const onOffsetUpdate = (index: number, offset: number) => {
    // First time trigger move index update is not sync in the state
    let confirmedIndex: number | null = null;

    // We need to know what the real index is.
    if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
      // Search for the real index
      if (offset > 0) {
        confirmedIndex = index;
        setMovingIndex({
          index,
          confirmed: true,
        });
      } else {
        for (let i = index; i >= 0; i -= 1) {
          if (cacheSizes[i] > 0 && resizableInfos[i].resizable) {
            confirmedIndex = i;
            setMovingIndex({
              index: i,
              confirmed: true,
            });
            break;
          }
        }
      }
    }
    const mergedIndex = confirmedIndex ?? movingIndex?.index ?? index;

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

    updateSizes(numSizes);

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
    // get the min and max value of the current and target
    const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
    const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], containerSize);
    const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
    const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], containerSize);
    const totalSize = currentSize + targetSize;
    if (currentSize !== 0 && targetSize !== 0) {
      // Collapse directly
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
      const tmpSizes = [];
      /**
       *
       * Record the size information before folding for subsequent recovery
       *
       */
      /**
       * if currentSize is between currentSizeMin and currentSizeMax, and
       * targetSize is between targetSizeMin and targetSizeMax, then set tmpSizes[currentIndex]
       *  and tmpSizes[targetIndex] to currentSize and targetSize respectively
       */
      if (
        currentSize >= currentSizeMin &&
        currentSize <= currentSizeMax &&
        targetSize >= targetSizeMin &&
        targetSize <= targetSizeMax
      ) {
        tmpSizes[currentIndex] = currentSize;
        tmpSizes[targetIndex] = targetSize;
      } else if (currentSize < currentSizeMin) {
        /**
         * if currentSize is less than currentSizeMin, then set tmpSizes[currentIndex] to currentSizeMin, and the remaining space is allocated to tmpSizes[targetIndex]
         */
        tmpSizes[currentIndex] = currentSizeMin;
        tmpSizes[targetIndex] = totalSize - currentSizeMin;
      } else if (currentSize > currentSizeMax) {
        /**
         * if currentSize is greater than currentSizeMax, then set tmpSizes[currentIndex] to currentSizeMax, and the remaining space is allocated to tmpSizes[targetIndex]
         */
        tmpSizes[currentIndex] = currentSizeMax;
        tmpSizes[targetIndex] = totalSize - currentSizeMax;
      } else if (targetSize < targetSizeMin) {
        /**
         * if targetSize is less than targetSizeMin, then set tmpSizes[targetIndex] to targetSizeMin, and the remaining space is allocated to tmpSizes[currentIndex]
         */
        tmpSizes[targetIndex] = targetSizeMin;
        tmpSizes[currentIndex] = totalSize - targetSizeMin;
      } else {
        /**
         * if targetSize is greater than targetSizeMax, then set tmpSizes[targetIndex] to targetSizeMax, and the remaining space is allocated to tmpSizes[currentIndex]
         */
        tmpSizes[targetIndex] = targetSizeMax;
        tmpSizes[currentIndex] = totalSize - targetSizeMax;
      }
      setCollapsedSizes(tmpSizes);
    } else if (collapsedSizes[currentIndex] !== void 0 && collapsedSizes[targetIndex] !== void 0) {
      /**
       * if the size information before folding is recorded,
       * then the size information before folding is restored
       */
      currentSizes[currentIndex] = collapsedSizes[currentIndex];
      currentSizes[targetIndex] = collapsedSizes[targetIndex];
      // reset the size information
      setCollapsedSizes([]);
    } else {
      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = (limitEnd - limitStart) / 2;
      currentSizes[currentIndex] -= halfOffset;
      currentSizes[targetIndex] += halfOffset;
    }

    updateSizes(currentSizes);

    return currentSizes;
  };

  return [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex?.index] as const;
}
