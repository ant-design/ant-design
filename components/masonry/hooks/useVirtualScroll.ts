import * as React from 'react';
import raf from '@rc-component/util/lib/raf';

import type { Key } from '../Masonry';

export interface ItemPosition {
  key: Key;
  top: number;
  column: number;
}

export interface UseVirtualScrollProps {
  /** Container height in pixels */
  containerHeight: number;
  /** Estimated item height for unmeasured items */
  itemHeight: number;
  /** Sorted array of item positions (sorted by top) */
  sortedPositions: ItemPosition[];
  /** Total content height */
  totalHeight: number;
  /** Number of items to render outside visible area */
  buffer?: number;
  /** Number of columns */
  columnCount: number;
  /** Callback when scroll reaches near the end */
  onScrollEnd?: () => void;
}

export interface UseVirtualScrollReturn {
  /** Current scroll top position */
  scrollTop: number;
  /** Set of visible item keys */
  visibleKeys: Set<Key>;
  /** Scroll event handler */
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Binary search to find the first item whose top position is >= target
 */
function binarySearchStart(positions: ItemPosition[], target: number): number {
  let left = 0;
  let right = positions.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (positions[mid].top < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Binary search to find the last item whose top position is <= target
 */
function binarySearchEnd(positions: ItemPosition[], target: number): number {
  let left = 0;
  let right = positions.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (positions[mid].top <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/**
 * Hook for virtual scroll functionality in Masonry component.
 * Uses binary search for O(log n) visible range calculation.
 */
export default function useVirtualScroll(props: UseVirtualScrollProps): UseVirtualScrollReturn {
  const {
    containerHeight,
    itemHeight,
    sortedPositions,
    totalHeight,
    buffer,
    columnCount,
    onScrollEnd,
  } = props;

  const [scrollTop, setScrollTop] = React.useState(0);
  const rafRef = React.useRef<number>(0);
  const lastScrollEndTriggeredRef = React.useRef(false);

  // Calculate effective buffer (default: columnCount * 2 rows worth of items)
  const effectiveBuffer = React.useMemo(() => {
    if (buffer !== undefined) {
      return buffer * itemHeight;
    }
    return columnCount * 2 * itemHeight;
  }, [buffer, columnCount, itemHeight]);

  // Calculate visible keys using binary search
  const visibleKeys = React.useMemo(() => {
    const keys = new Set<Key>();

    if (sortedPositions.length === 0 || containerHeight <= 0) {
      return keys;
    }

    const viewStart = Math.max(0, scrollTop - effectiveBuffer);
    const viewEnd = scrollTop + containerHeight + effectiveBuffer;

    // Use binary search to find the range of visible items
    const startIdx = Math.max(0, binarySearchStart(sortedPositions, viewStart) - columnCount);
    const endIdx = Math.min(
      sortedPositions.length,
      binarySearchEnd(sortedPositions, viewEnd) + columnCount,
    );

    for (let i = startIdx; i < endIdx; i++) {
      keys.add(sortedPositions[i].key);
    }

    return keys;
  }, [sortedPositions, scrollTop, containerHeight, effectiveBuffer, columnCount]);

  // Scroll handler with requestAnimationFrame for 60fps
  const onScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const newScrollTop = target.scrollTop;

      // Cancel previous raf
      if (rafRef.current) {
        raf.cancel(rafRef.current);
      }

      rafRef.current = raf(() => {
        setScrollTop(newScrollTop);

        // Check if near end for infinite loading
        if (onScrollEnd) {
          const scrollBottom = newScrollTop + containerHeight;
          const threshold = totalHeight - containerHeight; // Near the end

          if (scrollBottom >= threshold && !lastScrollEndTriggeredRef.current) {
            lastScrollEndTriggeredRef.current = true;
            onScrollEnd();
          } else if (scrollBottom < threshold) {
            lastScrollEndTriggeredRef.current = false;
          }
        }
      });
    },
    [containerHeight, totalHeight, onScrollEnd],
  );

  // Cleanup raf on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current) {
        raf.cancel(rafRef.current);
      }
    };
  }, []);

  return {
    scrollTop,
    visibleKeys,
    onScroll,
  };
}
