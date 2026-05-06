import * as React from 'react';
import type { CSSProperties } from 'react';
import ResizeObserver from '@rc-component/resize-observer';
import type { ResizeObserverProps } from '@rc-component/resize-observer';
import { clsx } from 'clsx';

import MasonryItem from './MasonryItem';
import type { ItemHeightData } from './hooks/usePositions';
import type { MasonryRenderItem } from './Masonry';
import type { MasonryItemType } from './MasonryItem';
import { getMasonryItemStyle } from './utils';

interface VirtualMasonryProps<ItemDataType = any> {
  prefixCls: string;
  itemWithPositions: MasonryRenderItem<ItemDataType>[];
  setItemRef: (key: React.Key, element: HTMLDivElement | null) => void;
  itemRender?: (itemInfo: MasonryItemType<ItemDataType> & { index: number }) => React.ReactNode;
  mergedClassName?: string;
  mergedStyle?: React.CSSProperties;
  collectItemSize: VoidFunction;
  horizontalGutter: number;
  verticalGutter: number;
  columnCount: number;
  totalHeight: number;
  itemHeights: ItemHeightData[];
  onScrollStateChange?: (scrolling: boolean) => void;
  varName: (unit: string, fallbackVar?: string) => string;
  varRef: (unit: string, fallbackVar?: string) => string;
}

const VirtualMasonry = <ItemDataType,>(props: VirtualMasonryProps<ItemDataType>) => {
  const {
    prefixCls,
    itemWithPositions,
    setItemRef,
    itemRender,
    mergedClassName,
    mergedStyle,
    collectItemSize,
    horizontalGutter,
    verticalGutter,
    columnCount,
    totalHeight,
    itemHeights,
    onScrollStateChange,
    varName,
    varRef,
  } = props;
  const holderRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);
  const lastScrollTopRef = React.useRef(0);
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down');
  const scrollStopTimerRef = React.useRef<number | null>(null);
  const scrollRafRef = React.useRef<number | null>(null);

  const heightMap = React.useMemo(() => {
    const map = new Map<React.Key, number>();
    itemHeights.forEach(([key, height]) => {
      map.set(key, height);
    });
    return map;
  }, [itemHeights]);

  const onHolderResize: ResizeObserverProps['onResize'] = (sizeInfo) => {
    setViewportHeight(sizeInfo.offsetHeight || 0);
  };

  React.useEffect(
    () => () => {
      if (scrollStopTimerRef.current !== null) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    },
    [],
  );

  const estimatedItemHeight = React.useMemo(() => {
    const measured = itemHeights.map(([, height]) => height).filter((height) => height > 0);
    if (measured.length) {
      return measured.reduce((total, current) => total + current, 0) / measured.length;
    }
    return 120;
  }, [itemHeights]);

  const itemBounds = React.useMemo(() => {
    const bounds = itemWithPositions
      .filter(
        (
          record,
        ): record is MasonryRenderItem<ItemDataType> & {
          position: { column: number; top: number };
        } => Boolean(record.position),
      )
      .map((record) => {
        const top = record.position.top;
        const itemHeight =
          heightMap.get(record.itemKey) ?? record.item.height ?? estimatedItemHeight;
        return {
          record,
          top,
          height: itemHeight + verticalGutter,
          bottom: top + itemHeight + verticalGutter,
        };
      });

    bounds.sort((a, b) => a.top - b.top);
    return bounds;
  }, [estimatedItemHeight, heightMap, itemWithPositions, verticalGutter]);

  const visibleItems = React.useMemo(() => {
    const baseOverscan = Math.max(viewportHeight * 0.8, estimatedItemHeight * 3);
    const overscanTop = scrollDirection === 'up' ? baseOverscan * 2 : baseOverscan;
    const overscanBottom = scrollDirection === 'down' ? baseOverscan * 2 : baseOverscan;
    const start = Math.max(0, scrollTop - overscanTop);
    const end = scrollTop + viewportHeight + overscanBottom;

    const lowerBoundByTop = (target: number) => {
      let left = 0;
      let right = itemBounds.length;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (itemBounds[mid].top < target) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      return left;
    };

    // Item bounds are sorted by `top`, not by `bottom`.
    // Expand the start lookup by max span height to avoid skipping tall items
    // that start above viewport but still intersect current window.
    const maxSpanHeight =
      itemBounds.length > 0 ? Math.max(...itemBounds.map((item) => item.height)) : 0;
    const startIndex = lowerBoundByTop(start - maxSpanHeight - 1);
    const result: MasonryRenderItem<ItemDataType>[] = [];
    for (let index = startIndex; index < itemBounds.length; index += 1) {
      const current = itemBounds[index];
      if (current.top > end + 1) {
        break;
      }
      if (current.bottom >= start - 1) {
        result.push(current.record);
      }
    }
    return result;
  }, [estimatedItemHeight, itemBounds, scrollDirection, scrollTop, viewportHeight]);

  return (
    <ResizeObserver onResize={onHolderResize}>
      <div
        ref={holderRef}
        data-testid="virtual-list"
        className={`${prefixCls}-virtual-holder`}
        style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
        onScroll={(event) => {
          const nextTop = event.currentTarget.scrollTop;
          if (scrollRafRef.current !== null) {
            window.cancelAnimationFrame(scrollRafRef.current);
          }
          scrollRafRef.current = window.requestAnimationFrame(() => {
            setScrollDirection(nextTop >= lastScrollTopRef.current ? 'down' : 'up');
            lastScrollTopRef.current = nextTop;
            setScrollTop(nextTop);
          });

          if (scrollStopTimerRef.current !== null) {
            window.clearTimeout(scrollStopTimerRef.current);
          }
          onScrollStateChange?.(true);
          scrollStopTimerRef.current = window.setTimeout(() => {
            onScrollStateChange?.(false);
            collectItemSize();
          }, 120);
        }}
      >
        <div
          className={`${prefixCls}-virtual-inner`}
          style={{ height: totalHeight, position: 'relative' }}
        >
          {visibleItems.map((record) => {
            const columnIndex = record.position?.column ?? 0;
            const top = record.position?.top ?? 0;

            const itemStyle: CSSProperties = {
              ...mergedStyle,
              ...getMasonryItemStyle({
                varName,
                varRef,
                horizontalGutter,
                columnCount,
                columnIndex,
                top,
              }),
            };

            return (
              <MasonryItem
                prefixCls={prefixCls}
                key={record.itemKey}
                item={record.item}
                style={itemStyle}
                className={clsx(mergedClassName, `${prefixCls}-item-fade`)}
                ref={(ele) => {
                  setItemRef(record.itemKey, ele);
                }}
                index={record.itemIndex}
                itemRender={itemRender}
                column={columnIndex}
                onResize={collectItemSize}
              />
            );
          })}
        </div>
      </div>
    </ResizeObserver>
  );
};

export default VirtualMasonry;
