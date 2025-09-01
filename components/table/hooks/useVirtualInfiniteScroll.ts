import { RefObject, useEffect, useRef } from 'react';

export interface UseVirtualInfiniteScrollProps {
  /**
   * Callback triggered when the virtual scrollbar reaches the bottom.
   * Typically used to fetch/load more data.
   */
  onLoadMore: () => void | Promise<void>;

  /**
   * Whether more data is available to load.
   * If false, `onLoadMore` will not be triggered.
   */
  hasMore: boolean;

  /**
   * Whether a load request is currently in progress.
   * Prevents duplicate calls while loading.
   */
  loading: boolean;

  /**
   * Extra offset (in pixels) before the bottom to trigger `onLoadMore`.
   * Useful if you want to start fetching slightly earlier.
   * @default 0
   */
  offset?: number;

  /**
   * Throttle delay (in ms) for scroll events.
   * Prevents `onLoadMore` from firing too often.
   * @default 200
   */
  throttleDelay?: number;

  /**
   * Ref to the virtual scrollbar container element (preferred).
   * Use this when you can directly pass a React ref.
   */
  scrollbarRef?: RefObject<HTMLElement>;

  /**
   * CSS selector for the virtual scrollbar container.
   * Used as a fallback when `scrollbarRef` is not available.
   */
  scrollbarSelector?: string;

  /**
   * CSS selector for the scrollbar thumb inside the container.
   */
  thumbSelector?: string;

  /**
   * Enable/disable debug console logs.
   * @default false
   */
  debug?: boolean;

  /**
   * Whether the infinite scroll is active.
   * If false, no listeners are attached.
   * @default false
   */
  enabled?: boolean;
}

export const useVirtualInfiniteScroll = ({
  onLoadMore,
  hasMore,
  loading,
  offset = 0,
  throttleDelay = 200,
  scrollbarRef,
  scrollbarSelector,
  thumbSelector = 'div',
  debug = false,
  enabled = false,
}: UseVirtualInfiniteScrollProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      /* istanbul ignore next */
      if (debug) {
        // eslint-disable-next-line no-console
        console.log('[InfiniteScroll] disabled ❌');
      }
      return;
    }

    const scrollbar =
      scrollbarRef?.current ??
      (scrollbarSelector ? document.querySelector(scrollbarSelector) : null);

    const thumb = scrollbar?.querySelector(thumbSelector) as HTMLElement | null;

    /* istanbul ignore next */
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('[InfiniteScroll] init:', {
        foundScrollbar: !!scrollbar,
        foundThumb: !!thumb,
      });
    }

    if (!scrollbar || !thumb) return;

    const checkPosition = () => {
      if (loading || !hasMore) return;

      const thumbTop = parseFloat(thumb.style.top || '0');
      const thumbHeight = parseFloat(thumb.style.height || '0');
      const scrollbarHeight = scrollbar.clientHeight;

      /* istanbul ignore next */
      if (debug) {
        // eslint-disable-next-line no-console
        console.log('[InfiniteScroll] thumb position:', {
          thumbTop,
          thumbHeight,
          scrollbarHeight,
          threshold: scrollbarHeight - offset,
        });
      }

      if (thumbTop + thumbHeight >= scrollbarHeight - offset) {
        /* istanbul ignore next */
        if (debug) {
          // eslint-disable-next-line no-console
          console.log('[InfiniteScroll] Triggering onLoadMore 🚀');
        }
        onLoadMore?.();
      }
    };

    const throttledCheck = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(checkPosition, throttleDelay);
    };

    const observer = new MutationObserver(throttledCheck);

    observer.observe(thumb, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      observer.disconnect();
      /* istanbul ignore next */
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    onLoadMore,
    hasMore,
    loading,
    offset,
    throttleDelay,
    scrollbarRef,
    scrollbarSelector,
    thumbSelector,
    debug,
    enabled,
  ]);
};
